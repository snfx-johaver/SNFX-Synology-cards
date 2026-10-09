import type { DeviceRegistryEntry, HassEntity, HomeAssistant } from "../src/ha-types";

export function createFixture(): HomeAssistant {
  const device = (id: string, domain: string, name: string, model: string, parent?: string): DeviceRegistryEntry =>
    ({ id, name, model, identifiers: [[domain, id]], via_device_id: parent, sw_version: "DSM 7.2.2", configuration_url: "https://nas.example:5001" });
  const hass: HomeAssistant = {
    states: {}, entities: {},
    devices: {
      nas: device("nas", "synology_dsm", "DiskStation", "DS923+"),
      nas2: device("nas2", "synology_dsm", "Other NAS", "DS220+"),
      volume: device("volume", "synology_dsm", "DiskStation (Volume 1)", "DS923+", "nas"),
      volume2: device("volume2", "synology_dsm", "Other NAS (Volume 1)", "DS220+", "nas2"),
      disk: device("disk", "synology_dsm", "DiskStation (Drive 1)", "WD Red Plus", "nas"),
      disk2: device("disk2", "synology_dsm", "DiskStation (Drive 2)", "WD Red Plus", "nas"),
      synEndpoint: device("synEndpoint", "portainer", "Synology Docker", "Endpoint"),
      unraidEndpoint: device("unraidEndpoint", "portainer", "Unraid Docker", "Endpoint"),
      stack: device("stack", "portainer", "Media", "Stack", "synEndpoint"),
      plex: device("plex", "portainer", "Plex", "Container", "stack"),
      nginx: device("nginx", "portainer", "Nginx", "Container", "synEndpoint"),
      offline: device("offline", "portainer", "Offline", "Container", "synEndpoint"),
      unraidPlex: device("unraidPlex", "portainer", "Unraid Plex", "Container", "unraidEndpoint"),
      unraid: device("unraid", "unraid", "Tower", "Unraid"),
    },
    callService: async () => undefined,
  };
  const add = (id: string, deviceId: string, key: string, state: string, unit?: string, platform?: string) => {
    hass.states[id] = {
      entity_id: id, state, attributes: unit ? { unit_of_measurement: unit } : {},
      last_changed: "", last_updated: "",
    };
    hass.entities![id] = {
      entity_id: id, device_id: deviceId, platform: platform ?? (deviceId.includes("Endpoint") || ["plex", "nginx", "unraidPlex", "offline"].includes(deviceId) ? "portainer" : "synology_dsm"),
      translation_key: key, unique_id: `${deviceId}_${key}`,
    };
  };
  add("sensor.renamed_cpu", "nas", "cpu_total_load", "18", "%");
  add("sensor.other_cpu", "nas2", "cpu_total_load", "99", "%");
  add("sensor.memory", "nas", "memory_real_usage", "42", "%");
  add("sensor.ram_total", "nas", "memory_total_real", "8", "GiB");
  add("sensor.ram_available", "nas", "memory_available_real", "4.64", "GiB");
  add("sensor.temp", "nas", "temperature", "38", "°C");
  add("sensor.uptime", "nas", "uptime", "2026-10-01T00:00:00Z");
  add("binary_sensor.security", "nas", "status", "off");
  add("sensor.rx", "nas", "network_down", "1250", "kB/s");
  add("sensor.tx", "nas", "network_up", "0.5", "MB/s");
  add("sensor.volume_pct", "volume", "volume_percentage_used", "25", "%");
  add("sensor.volume_total", "volume", "volume_size_total", "8", "TB");
  add("sensor.volume_used", "volume", "volume_size_used", "2000", "GB");
  add("sensor.volume_status", "volume", "volume_status", "normal");
  add("sensor.volume_temp", "volume", "volume_disk_temp_avg", "34", "°C");
  add("sensor.other_volume_total", "volume2", "volume_size_total", "100", "TB");
  add("sensor.other_volume_used", "volume2", "volume_size_used", "90", "TB");
  add("sensor.other_volume_pct", "volume2", "volume_percentage_used", "90", "%");
  for (const diskId of ["disk", "disk2"]) {
    add(`sensor.${diskId}_status`, diskId, "disk_status", "normal");
    add(`sensor.${diskId}_smart`, diskId, "disk_smart_status", "normal");
    add(`sensor.${diskId}_temp`, diskId, "disk_temp", "34", "°C");
    add(`binary_sensor.${diskId}_bad`, diskId, "disk_exceed_bad_sector_thr", "off");
    add(`binary_sensor.${diskId}_life`, diskId, "disk_below_remain_life_thr", "off");
  }
  for (const container of ["plex", "nginx", "unraidPlex", "offline"]) {
    add(`switch.${container}`, container, "container", container === "offline" ? "unavailable" : container === "nginx" ? "off" : "on");
    add(`button.${container}_restart`, container, "restart_container", "unknown");
    // Button states are timestamps or unknown before their first press: unknown is still actionable.
    add(`sensor.${container}_state`, container, "container_state", container === "offline" ? "unavailable" : container === "nginx" ? "exited" : "running");
    add(`sensor.${container}_cpu`, container, "cpu_usage_total", "12.5", "%");
    add(`sensor.${container}_memory`, container, "memory_usage", "512", "MiB");
    add(`sensor.${container}_image`, container, "image", "example/image:latest");
  }
  add("sensor.unraid_cpu", "unraid", "cpu_usage", "99", "%", "unraid");
  return hass;
}

export function state(id: string, value: string, unit?: string): HassEntity {
  return { entity_id: id, state: value, attributes: unit ? { unit_of_measurement: unit } : {}, last_changed: "", last_updated: "" };
}
