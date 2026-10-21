import { nasSource, type CardConfig, type NasSource } from "./config";
import type { DeviceRegistryEntry, EntityRegistryEntry, HassEntity, HomeAssistant } from "./ha-types";

export interface Registries {
  devices: Record<string, DeviceRegistryEntry>;
  entities: Record<string, EntityRegistryEntry>;
}

const registryRequests = new WeakMap<object, Promise<Registries>>();
const registrySnapshots = new WeakMap<object, Registries>();

export function cachedRegistries(hass: HomeAssistant): Registries | undefined {
  const key = hass.connection ?? hass.callWS;
  return key ? registrySnapshots.get(key) : undefined;
}

interface RegistryIndex {
  entitiesByDevice: Map<string, EntityRegistryEntry[]>;
  synology: DeviceRegistryEntry[];
  qnap: DeviceRegistryEntry[];
  endpoints: DeviceRegistryEntry[];
}
const registryIndexes = new WeakMap<Registries["devices"], WeakMap<Registries["entities"], RegistryIndex>>();

function registryIndex(registries: Registries): RegistryIndex {
  let indexes = registryIndexes.get(registries.devices);
  if (!indexes) {
    indexes = new WeakMap();
    registryIndexes.set(registries.devices, indexes);
  }
  const cached = indexes.get(registries.entities);
  if (cached) return cached;
  const entitiesByDevice = new Map<string, EntityRegistryEntry[]>();
  for (const entity of Object.values(registries.entities)) {
    if (!entity.device_id) continue;
    const list = entitiesByDevice.get(entity.device_id) ?? [];
    list.push(entity);
    entitiesByDevice.set(entity.device_id, list);
  }
  const synology = Object.values(registries.devices).filter((device) => {
    const entities = entitiesByDevice.get(device.id)?.filter((entity) => entity.platform === "synology_dsm") ?? [];
    return entities.some((entity) => [
      "cpu_total_load", "cpu_user_load", "cpu_system_load",
      "memory_real_usage", "memory_total_real", "memory_available_real",
      "temperature", "uptime",
    ].some((key) => entityMatches(entity, key)));
  });
  const index = {
    entitiesByDevice, synology,
    qnap: Object.values(registries.devices).filter((device) =>
      entitiesByDevice.get(device.id)?.some((entity) => entity.platform === "qnap" &&
        ["cpu_usage", "memory_percent_used", "system_temp", "uptime"].some((key) => entityMatches(entity, key))) ?? false),
    endpoints: Object.values(registries.devices).filter((device) => hasDomain(device, "portainer") && device.model === "Endpoint"),
  };
  indexes.set(registries.entities, index);
  return index;
}

export function deviceEntities(registries: Registries, deviceId: string): EntityRegistryEntry[] {
  return registryIndex(registries).entitiesByDevice.get(deviceId) ?? [];
}

export async function loadRegistries(hass: HomeAssistant, refresh = false): Promise<Registries> {
  if (!hass.callWS) return { devices: hass.devices ?? {}, entities: hass.entities ?? {} };
  const key = hass.connection ?? hass.callWS;
  if (refresh) registryRequests.delete(key);
  let request = registryRequests.get(key);
  if (!request) {
    request = Promise.all([
      hass.callWS<DeviceRegistryEntry[]>({ type: "config/device_registry/list" }),
      hass.callWS<EntityRegistryEntry[]>({ type: "config/entity_registry/list" }),
    ]).then(([devices, entities]) => {
      const registries = {
        devices: Object.fromEntries(devices.map((device) => [device.id, device])),
        entities: Object.fromEntries(entities.map((entity) => [entity.entity_id, entity])),
      };
      if (registryRequests.get(key) === request) registrySnapshots.set(key, registries);
      return registries;
    });
    registryRequests.set(key, request);
    request.catch(() => {
      if (registryRequests.get(key) === request) registryRequests.delete(key);
    });
  }
  return request;
}

export function belongsTo(device: DeviceRegistryEntry | undefined, parentId: string, devices: Registries["devices"]): boolean {
  const visited = new Set<string>();
  while (device && !visited.has(device.id)) {
    if (device.id === parentId) return true;
    visited.add(device.id);
    const ancestorId = device.parent_device_id ?? device.via_device_id;
    device = ancestorId ? devices[ancestorId] : undefined;
  }
  return false;
}

export function hasDomain(device: DeviceRegistryEntry, domain: string): boolean {
  return device.identifiers?.some(([identifierDomain]) => identifierDomain === domain) ?? false;
}

export function synologyDevices(registries: Registries): DeviceRegistryEntry[] {
  return registryIndex(registries).synology;
}

export function nasDevices(registries: Registries, source: NasSource): DeviceRegistryEntry[] {
  return source === "synology_dsm" ? synologyDevices(registries) : source === "qnap" ? registryIndex(registries).qnap : [];
}

export function portainerEndpoints(registries: Registries): DeviceRegistryEntry[] {
  return registryIndex(registries).endpoints;
}

export function entityMatches(entity: EntityRegistryEntry, key: string): boolean {
  if (entity.translation_key === key) return true;
  // Full registry entries retain stable integration keys even after an entity is renamed.
  const uniqueId = entity.unique_id ?? "";
  return uniqueId.endsWith(`_${key}`) || uniqueId.includes(`:${key}_`) || uniqueId.endsWith(`:${key}`) ||
    (!entity.translation_key && !uniqueId && entity.entity_id.endsWith(`_${key}`));
}

export function deviceEntity(
  hass: HomeAssistant | undefined, registries: Registries, deviceId: string | undefined,
  key: string, domain?: string, platform = "synology_dsm"
): HassEntity | undefined {
  if (!hass || !deviceId) return undefined;
  const candidates = deviceEntities(registries, deviceId).filter((entity) =>
    entity.platform === platform &&
    (!domain || entity.entity_id.startsWith(`${domain}.`))
  );
  const registry = candidates.find((entity) => entityMatches(entity, key));
  if (registry) return hass.states[registry.entity_id];
  // Older/compact frontend registries omit translation keys and unique IDs.
  const suffix = candidates.find((entity) => entity.entity_id.endsWith(`_${key}`));
  return suffix ? hass.states[suffix.entity_id] : undefined;
}

export function selectedDevice(config: CardConfig, registries: Registries): DeviceRegistryEntry | undefined {
  const devices = nasDevices(registries, nasSource(config));
  if (config.server) return devices.find((device) => device.id === config.server);
  return devices.length === 1 ? devices[0] : undefined;
}

const overviewKeys: Record<Exclude<NasSource, "manual">, Record<string, string>> = {
  synology_dsm: {
    cpu_usage: "cpu_total_load", ram_usage: "memory_real_usage", system_temperature: "temperature",
    security_status: "status", network_rx: "network_down", network_tx: "network_up",
  },
  qnap: {
    cpu_usage: "cpu_usage", ram_usage: "memory_percent_used", system_temperature: "system_temp",
    memory_total_real: "memory_size", memory_available_real: "memory_free", memory_used: "memory_used",
    system_status: "status",
  },
};

const qnapGroupKeys = {
  volumes: ["volume_percentage_used", "volume_size_total", "volume_size_used", "volume_size_free"],
  drives: ["drive_smart_status", "drive_temp"],
  network: ["network_rx", "network_tx", "network_link_status"],
};

interface QnapGroup {
  id: string;
  entities: Record<string, string>;
}
const qnapGroupCache = new WeakMap<EntityRegistryEntry[], Record<keyof typeof qnapGroupKeys, QnapGroup[]>>();

export function qnapGroups(registries: Registries, deviceId: string | undefined, kind: keyof typeof qnapGroupKeys): QnapGroup[] {
  if (!deviceId) return [];
  const entries = deviceEntities(registries, deviceId);
  let cached = qnapGroupCache.get(entries);
  if (!cached) {
    const collect = (keys: string[]): QnapGroup[] => {
      const groups = new Map<string, QnapGroup>();
      for (const entity of entries) {
        if (entity.platform !== "qnap" || !entity.entity_id.startsWith("sensor.") || !entity.unique_id) continue;
        for (const key of keys) {
          if (entity.translation_key && entity.translation_key !== key) continue;
          // QNAP keeps all NICs/volumes/drives on one NAS device: <serial>_<key>_<monitor_device>.
          const marker = `_${key}_`;
          const offset = entity.unique_id.indexOf(marker);
          const id = offset >= 0 ? entity.unique_id.slice(offset + marker.length) : "";
          if (!id) continue;
          const group = groups.get(id) ?? { id, entities: {} };
          group.entities[key] = entity.entity_id;
          groups.set(id, group);
          break;
        }
      }
      return [...groups.values()].sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    };
    cached = { volumes: collect(qnapGroupKeys.volumes), drives: collect(qnapGroupKeys.drives), network: collect(qnapGroupKeys.network) };
    qnapGroupCache.set(entries, cached);
  }
  return cached[kind];
}

export function overviewEntity(
  hass: HomeAssistant | undefined, config: CardConfig, registries: Registries, key: string, domain?: string,
): HassEntity | undefined {
  const mapped = config.entities?.[key];
  if (mapped) return hass?.states[mapped];
  const source = nasSource(config);
  if (source === "manual") return undefined;
  if (["model", "software_version"].includes(key) || (source === "qnap" && key === "security_status") ||
      (source === "synology_dsm" && key === "system_status")) return undefined;
  const deviceId = selectedDevice(config, registries)?.id;
  if (source === "qnap" && ["network_rx", "network_tx"].includes(key)) {
    const interfaces = qnapGroups(registries, deviceId, "network");
    const nic = config.network_interface ? interfaces.find((group) => group.id === config.network_interface)
      : interfaces.length === 1 ? interfaces[0] : undefined;
    const id = nic?.entities[key];
    return id ? hass?.states[id] : undefined;
  }
  return deviceEntity(hass, registries, deviceId, overviewKeys[source][key] ?? key, domain, source);
}

export function usable(entity?: HassEntity): boolean {
  return !!entity && !["unknown", "unavailable", "none", ""].includes(entity.state.toLowerCase());
}

export function numeric(entity?: HassEntity): number | undefined {
  if (!usable(entity)) return undefined;
  const value = Number(entity!.state);
  return Number.isFinite(value) ? value : undefined;
}

export function percentage(entity?: HassEntity, decimals = 0): number | undefined {
  const value = numeric(entity);
  return value === undefined ? undefined : Number(Math.max(0, Math.min(100, value)).toFixed(decimals));
}

export function formatValue(entity?: HassEntity): string {
  return usable(entity) ? `${entity!.state}${entity!.attributes.unit_of_measurement ? ` ${entity!.attributes.unit_of_measurement}` : ""}` : "Unavailable";
}

const byteUnits: Record<string, number> = {
  B: 1, kB: 1e3, KB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12,
  KiB: 1024, MiB: 1024 ** 2, GiB: 1024 ** 3, TiB: 1024 ** 4,
};

export function bytes(entity?: HassEntity): number | undefined {
  const value = numeric(entity);
  const unit = entity?.attributes.unit_of_measurement;
  const multiplier = typeof unit === "string" ? byteUnits[unit] : undefined;
  return value !== undefined && multiplier !== undefined ? value * multiplier : undefined;
}

export function formatBytes(value: number | undefined, minimumUnit: "B" | "GB" = "GB"): string {
  if (value === undefined || !Number.isFinite(value)) return "Unavailable";
  const unit = value >= 1e12 ? "TB" : value >= 1e9 || minimumUnit === "GB" ? "GB" : value >= 1e6 ? "MB" : value >= 1e3 ? "kB" : "B";
  return `${(value / byteUnits[unit]!).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unit}`;
}

export function formatRate(entity?: HassEntity): string {
  const value = numeric(entity);
  const unit = entity?.attributes.unit_of_measurement;
  if (value === undefined || typeof unit !== "string") return "Unavailable";
  const base = unit.replace(/\/s$/, "");
  const multiplier = byteUnits[base];
  if (multiplier === undefined) return formatValue(entity);
  return `${formatBytes(value * multiplier, "B")}/s`;
}

export function safeUrl(url: string | null | undefined): string | undefined {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}

export function nasChildren(config: CardConfig, registries: Registries): DeviceRegistryEntry[] {
  if (nasSource(config) !== "synology_dsm") return [];
  const server = selectedDevice(config, registries);
  if (!server) return [];
  return Object.values(registries.devices).filter((device) =>
    device.id !== server.id &&
    (hasDomain(device, "synology_dsm") || deviceEntities(registries, device.id).some((entity) => entity.platform === "synology_dsm")) &&
    belongsTo(device, server.id, registries.devices)
  );
}

export interface VolumeData {
  device: { id: string; name: string; name_by_user?: string | null };
  usage?: HassEntity;
  status?: HassEntity;
  total?: HassEntity;
  used?: HassEntity;
  temperature?: HassEntity;
}

export function volumeData(hass: HomeAssistant | undefined, config: CardConfig, registries: Registries): VolumeData[] {
  const source = nasSource(config);
  if (source === "manual") return (config.volumes ?? []).map((volume, index) => ({
    device: { id: `manual-volume-${index}`, name: volume.name || `Volume ${index + 1}` },
    usage: hass?.states[volume.usage_entity ?? ""], status: hass?.states[volume.status_entity ?? ""],
    total: hass?.states[volume.total_entity ?? ""], used: hass?.states[volume.used_entity ?? ""],
    temperature: hass?.states[volume.temperature_entity ?? ""],
  }));
  if (source === "qnap") return qnapGroups(registries, selectedDevice(config, registries)?.id, "volumes").map((group) => ({
    device: { id: group.id, name: group.id },
    usage: hass?.states[group.entities.volume_percentage_used ?? ""],
    total: hass?.states[group.entities.volume_size_total ?? ""],
    used: hass?.states[group.entities.volume_size_used ?? ""],
  }));
  return nasChildren(config, registries).filter((device) =>
    deviceEntities(registries, device.id).some((entity) =>
      entity.platform === "synology_dsm" &&
      (entityMatches(entity, "volume_percentage_used") || entity.entity_id.endsWith("_volume_percentage_used"))
    )
  ).map((device) => {
    const get = (key: string) => deviceEntity(hass, registries, device.id, key, "sensor");
    return {
      device, usage: get("volume_percentage_used"), status: get("volume_status"),
      total: get("volume_size_total"), used: get("volume_size_used"),
      temperature: get("volume_disk_temp_avg"),
    };
  });
}

export interface DriveData {
  id: string;
  name: string;
  model?: string;
  status?: HassEntity;
  smart?: HassEntity;
  temperature?: HassEntity;
  badSectors?: HassEntity;
  remainingLife?: HassEntity;
}

export function driveData(hass: HomeAssistant | undefined, config: CardConfig, registries: Registries): DriveData[] {
  const source = nasSource(config);
  if (source === "manual") return (config.drives ?? []).map((drive, index) => {
    const model = hass?.states[drive.model_entity ?? ""];
    return {
      id: `manual-drive-${index}`, name: drive.name || `Drive ${index + 1}`,
      model: usable(model) ? model!.state : undefined,
      status: hass?.states[drive.status_entity ?? ""], smart: hass?.states[drive.smart_entity ?? ""],
      temperature: hass?.states[drive.temperature_entity ?? ""],
      badSectors: hass?.states[drive.bad_sectors_entity ?? ""], remainingLife: hass?.states[drive.remaining_life_entity ?? ""],
    };
  });
  if (source === "qnap") return qnapGroups(registries, selectedDevice(config, registries)?.id, "drives").map((group) => {
    const smart = hass?.states[group.entities.drive_smart_status ?? ""];
    const temperature = hass?.states[group.entities.drive_temp ?? ""];
    const model = smart?.attributes.Model ?? temperature?.attributes.Model;
    return { id: group.id, name: group.id, model: typeof model === "string" ? model : undefined, smart, temperature };
  });
  return nasChildren(config, registries).filter((device) =>
    deviceEntities(registries, device.id).some((entity) => entity.platform === "synology_dsm" &&
      (entityMatches(entity, "disk_status") || entity.entity_id.endsWith("_disk_status")))
  ).map((device) => {
    const get = (key: string, domain = "sensor") => deviceEntity(hass, registries, device.id, key, domain);
    return {
      id: device.id, name: device.name_by_user || device.name, model: device.model ?? undefined,
      status: get("disk_status"), smart: get("disk_smart_status"), temperature: get("disk_temp"),
      badSectors: get("disk_exceed_bad_sector_thr", "binary_sensor"), remainingLife: get("disk_below_remain_life_thr", "binary_sensor"),
    };
  });
}

export function storageSummary(hass: HomeAssistant | undefined, config: CardConfig, registries: Registries) {
  const volumes = volumeData(hass, config, registries);
  const totals = volumes.map((volume) => bytes(volume.total));
  const used = volumes.map((volume) => bytes(volume.used));
  if (!volumes.length || totals.some((value) => value === undefined) || used.some((value) => value === undefined)) {
    return { total: undefined, used: undefined, percent: undefined };
  }
  const total = totals.reduce<number>((sum, value) => sum + value!, 0);
  const usedBytes = used.reduce<number>((sum, value) => sum + value!, 0);
  return { total, used: usedBytes, percent: total > 0 ? Math.round(usedBytes / total * 100) : undefined };
}
