import { createFixture, state } from "./fixture";

// Core QNAP sensor schema: all sensors share one NAS device, including indexed NICs/volumes/drives.
// https://github.com/home-assistant/core/blob/2026.10.2/homeassistant/components/qnap/sensor.py
export function createQnapFixture() {
  const hass = createFixture();
  for (const [id, serial] of [["qnap", "serial_a"], ["qnap2", "serial_b"]]) {
    hass.devices![id!] = {
      id: id!, name: "QNAP Server", manufacturer: "QNAP", model: "TS-464",
      sw_version: "QTS 5.2", identifiers: [["qnap", serial!]],
    };
  }
  const add = (id: string, key: string, value: string, unit?: string, group?: string, device = "qnap") => {
    hass.states[id] = state(id, value, unit);
    hass.entities![id] = {
      entity_id: id, device_id: device, platform: "qnap", translation_key: key,
      unique_id: `${device === "qnap" ? "serial_a" : "serial_b"}_${key}${group === undefined ? "" : `_${group}`}`,
    };
  };
  add("sensor.q_cpu_renamed", "cpu_usage", "17.1267", "%");
  add("sensor.q2_cpu_renamed", "cpu_usage", "99", "%", undefined, "qnap2");
  add("sensor.q_memory_pct", "memory_percent_used", "50", "%");
  add("sensor.q_memory_size", "memory_size", "8192", "MiB");
  add("sensor.q_memory_free", "memory_free", "4096", "MiB");
  add("sensor.q_temp", "system_temp", "40", "°C");
  add("sensor.q_status", "status", "GOOD");
  add("sensor.q_uptime", "uptime", "2026-10-01T00:00:00Z");
  for (const [id, total, used] of [["Data_Volume_1", "8", "2"], ["Backup", "2", "0.5"]]) {
    add(`sensor.renamed_${id}_pct`, "volume_percentage_used", "25", "%", id);
    add(`sensor.renamed_${id}_total`, "volume_size_total", total!, "TB", id);
    add(`sensor.renamed_${id}_used`, "volume_size_used", used!, "TB", id);
  }
  add("sensor.other_qnap_volume", "volume_percentage_used", "98", "%", "OTHER NAS VOLUME", "qnap2");
  for (const [index, name] of ["SATA 1", "NVMe_2"].entries()) {
    add(`sensor.renamed_disk_${index}_smart`, "drive_smart_status", index ? "WARNING" : "GOOD", undefined, name);
    add(`sensor.renamed_disk_${index}_temp`, "drive_temp", String(32 + index), "°C", name);
    hass.states[`sensor.renamed_disk_${index}_smart`]!.attributes.Model = "QNAP fixture drive";
  }
  for (const nic of ["eth0", "bond0"]) {
    add(`sensor.renamed_${nic}_rx`, "network_rx", nic === "eth0" ? "1250000" : "9000000", "B/s", nic);
    add(`sensor.renamed_${nic}_tx`, "network_tx", "1", "Mbit/s", nic);
  }
  return hass;
}
