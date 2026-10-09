import type { CardConfig } from "./config";
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
    if (!hasDomain(device, "synology_dsm") && !entities.length) return false;
    if (entities.some((entity) => ["cpu_total_load", "memory_real_usage", "uptime"].some((key) => entityMatches(entity, key)))) return true;
    return !device.parent_device_id && !device.via_device_id &&
      !entities.some((entity) => ["volume_percentage_used", "volume_status", "disk_status"].some((key) => entityMatches(entity, key)));
  });
  const index = {
    entitiesByDevice, synology,
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
  const devices = synologyDevices(registries);
  if (config.server) return devices.find((device) => device.id === config.server);
  return devices.length === 1 ? devices[0] : undefined;
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
  const server = selectedDevice(config, registries);
  if (!server) return [];
  return Object.values(registries.devices).filter((device) =>
    device.id !== server.id &&
    (hasDomain(device, "synology_dsm") || deviceEntities(registries, device.id).some((entity) => entity.platform === "synology_dsm")) &&
    belongsTo(device, server.id, registries.devices)
  );
}

export function volumeData(hass: HomeAssistant | undefined, config: CardConfig, registries: Registries) {
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
