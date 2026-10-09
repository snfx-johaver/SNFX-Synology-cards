import type { CardConfig } from "./config";
import type { DeviceRegistryEntry, EntityRegistryEntry, HassEntity, HomeAssistant } from "./ha-types";

export interface Registries {
  devices: Record<string, DeviceRegistryEntry>;
  entities: Record<string, EntityRegistryEntry>;
}

const registryRequests = new WeakMap<object, Promise<Registries>>();

export async function loadRegistries(hass: HomeAssistant, refresh = false): Promise<Registries> {
  if (!hass.callWS) return { devices: hass.devices ?? {}, entities: hass.entities ?? {} };
  const key = hass.connection ?? hass.callWS;
  if (refresh) registryRequests.delete(key);
  let request = registryRequests.get(key);
  if (!request) {
    request = Promise.all([
      hass.callWS<DeviceRegistryEntry[]>({ type: "config/device_registry/list" }),
      hass.callWS<EntityRegistryEntry[]>({ type: "config/entity_registry/list" }),
    ]).then(([devices, entities]) => ({
      devices: Object.fromEntries(devices.map((device) => [device.id, device])),
      entities: Object.fromEntries(entities.map((entity) => [entity.entity_id, entity])),
    }));
    registryRequests.set(key, request);
    request.catch(() => registryRequests.delete(key));
  }
  return request;
}

export function belongsTo(device: DeviceRegistryEntry | undefined, parentId: string, devices: Registries["devices"]): boolean {
  const visited = new Set<string>();
  while (device && !visited.has(device.id)) {
    if (device.id === parentId) return true;
    visited.add(device.id);
    device = device.via_device_id ? devices[device.via_device_id] : undefined;
  }
  return false;
}

export function hasDomain(device: DeviceRegistryEntry, domain: string): boolean {
  return device.identifiers?.some(([identifierDomain]) => identifierDomain === domain) ?? false;
}

export function synologyDevices(registries: Registries): DeviceRegistryEntry[] {
  return Object.values(registries.devices).filter((device) =>
    hasDomain(device, "synology_dsm") && !device.via_device_id
  );
}

export function portainerEndpoints(registries: Registries): DeviceRegistryEntry[] {
  return Object.values(registries.devices).filter((device) =>
    hasDomain(device, "portainer") && device.model === "Endpoint"
  );
}

export function entityMatches(entity: EntityRegistryEntry, key: string): boolean {
  if (entity.translation_key === key) return true;
  // Full registry entries retain stable integration keys even after an entity is renamed.
  const uniqueId = entity.unique_id ?? "";
  return uniqueId.endsWith(`_${key}`) || uniqueId.includes(`:${key}_`) || uniqueId.endsWith(`:${key}`);
}

export function deviceEntity(
  hass: HomeAssistant | undefined, registries: Registries, deviceId: string | undefined,
  key: string, domain?: string, platform = "synology_dsm"
): HassEntity | undefined {
  if (!hass || !deviceId) return undefined;
  const candidates = Object.values(registries.entities).filter((entity) =>
    entity.device_id === deviceId && entity.platform === platform &&
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

export function percentage(entity?: HassEntity): number | undefined {
  const value = numeric(entity);
  return value === undefined ? undefined : Math.round(Math.max(0, Math.min(100, value)));
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

export function formatBytes(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return "Unavailable";
  const unit = value >= 1e12 ? "TB" : value >= 1e9 ? "GB" : value >= 1e6 ? "MB" : value >= 1e3 ? "kB" : "B";
  return `${(value / byteUnits[unit]!).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unit}`;
}

export function formatRate(entity?: HassEntity): string {
  const value = numeric(entity);
  const unit = entity?.attributes.unit_of_measurement;
  if (value === undefined || typeof unit !== "string") return "Unavailable";
  const base = unit.replace(/\/s$/, "");
  const multiplier = byteUnits[base];
  if (multiplier === undefined) return formatValue(entity);
  return `${formatBytes(value * multiplier)}/s`;
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
    device.id !== server.id && hasDomain(device, "synology_dsm") && belongsTo(device, server.id, registries.devices)
  );
}

export function volumeData(hass: HomeAssistant | undefined, config: CardConfig, registries: Registries) {
  return nasChildren(config, registries).filter((device) =>
    Object.values(registries.entities).some((entity) =>
      entity.device_id === device.id && entity.platform === "synology_dsm" &&
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
