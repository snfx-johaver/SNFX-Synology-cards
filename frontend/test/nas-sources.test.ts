import { afterEach, describe, expect, it, vi } from "vitest";
import "../src/index";
import { html, type PropertyValues } from "lit";
import { BaseSynologyCard } from "../src/dashboard-cards-base";
import { SynologyCardEditor } from "../src/dashboard-cards-editor";
import { nasSource, type CardConfig } from "../src/config";
import { driveData, nasDevices, overviewEntity, qnapGroups, selectedDevice, storageSummary, volumeData } from "../src/data";
import { formatUptime } from "../src/server-card";
import { createFixture, state } from "./fixture";
import { createQnapFixture } from "./qnap-fixture";
import type { HomeAssistant } from "../src/ha-types";

afterEach(() => document.body.replaceChildren());

async function mount(tag: string, config: Partial<CardConfig>, hass: HomeAssistant) {
  const card = document.createElement(tag) as BaseSynologyCard;
  card.setConfig({ type: `custom:${tag}`, ...config });
  card.hass = hass;
  document.body.append(card);
  await card.updateComplete;
  await card.updateComplete;
  return card;
}

describe("NAS data sources", () => {
  it("keeps legacy Synology discovery and separates same-name QNAP servers by registry ID", () => {
    const hass = createQnapFixture();
    const registries = { devices: hass.devices!, entities: hass.entities! };
    expect(nasSource({ type: "" })).toBe("synology_dsm");
    expect(nasDevices(registries, "synology_dsm").map((device) => device.id)).toEqual(["nas", "nas2"]);
    expect(nasDevices(registries, "qnap").map((device) => device.id)).toEqual(["qnap", "qnap2"]);
    expect(selectedDevice({ type: "", nas_source: "qnap", server: "nas" }, registries)).toBeUndefined();
    expect(selectedDevice({ type: "", nas_source: "qnap", server: "missing" }, registries)).toBeUndefined();
    expect(selectedDevice({ type: "", nas_source: "manual", server: "nas" }, registries)).toBeUndefined();
    expect(selectedDevice({ type: "", nas_source: "qnap" }, registries)).toBeUndefined();
  });
  it("maps QNAP CPU/memory/system keys without treating health status as Security Advisor", async () => {
    const hass = createQnapFixture();
    const config: CardConfig = { type: "", nas_source: "qnap", server: "qnap" };
    const registries = { devices: hass.devices!, entities: hass.entities! };
    expect(overviewEntity(hass, config, registries, "cpu_usage")?.entity_id).toBe("sensor.q_cpu_renamed");
    expect(overviewEntity(hass, config, registries, "security_status")).toBeUndefined();
    const card = await mount("synology-server-card", config, hass);
    expect(card.shadowRoot!.textContent).toContain("17.13%");
    expect(card.shadowRoot!.textContent).toContain("4.29 GB / 8.59 GB");
    expect(card.shadowRoot!.textContent).toContain("QTS 5.2");
    expect(card.shadowRoot!.textContent).toContain("Status: GOOD");
    expect(card.shadowRoot!.textContent).not.toContain("Security Advisor");
    expect(card.shadowRoot!.textContent).not.toContain("DSM Version");
    expect(card.shadowRoot!.textContent).not.toContain("99.00%");
  });
  it("groups all QNAP volumes and drives on the NAS without mixing servers, even when entities are renamed", async () => {
    const hass = createQnapFixture();
    for (const entity of Object.values(hass.entities!)) {
      if (entity.platform === "qnap") delete entity.translation_key;
    }
    const registries = { devices: hass.devices!, entities: hass.entities! };
    const config: CardConfig = { type: "", nas_source: "qnap", server: "qnap" };
    expect(volumeData(hass, config, registries).map((volume) => volume.device.name)).toEqual(["Backup", "Data_Volume_1"]);
    expect(driveData(hass, config, registries).map((drive) => drive.name)).toEqual(["NVMe_2", "SATA 1"]);
    expect(storageSummary(hass, config, registries)).toEqual({ total: 10e12, used: 2.5e12, percent: 25 });
    const card = await mount("synology-storage-card", config, hass);
    const text = card.shadowRoot!.textContent!;
    expect(text).toContain("2 Volumes");
    expect(text).toContain("2 Drives");
    expect(text).toContain("SMART: GOOD");
    expect(text).toContain("Attention needed");
    expect(text).toContain("QNAP fixture drive");
    expect(text).not.toContain("OTHER NAS VOLUME");
    expect(text).not.toContain("Bad-sector threshold");
    expect(text).not.toContain("Average drive temperature");
    delete hass.states["sensor.renamed_Backup_total"];
    expect(storageSummary(hass, config, registries).percent).toBeUndefined();
  });
  it("requires a network interface when ambiguous, retains bit units and never falls back from a stale selection", () => {
    const hass = createQnapFixture();
    const registries = { devices: hass.devices!, entities: hass.entities! };
    const config: CardConfig = { type: "", nas_source: "qnap", server: "qnap" };
    expect(qnapGroups(registries, "qnap", "network").map((nic) => nic.id)).toEqual(["bond0", "eth0"]);
    expect(overviewEntity(hass, config, registries, "network_rx")).toBeUndefined();
    expect(overviewEntity(hass, { ...config, network_interface: "eth0" }, registries, "network_rx")?.state).toBe("1250000");
    expect(overviewEntity(hass, { ...config, network_interface: "missing" }, registries, "network_rx")).toBeUndefined();
    expect(overviewEntity(hass, { ...config, entities: { network_rx: "sensor.rx" } }, registries, "network_rx")?.state).toBe("1250");
  });
  it("uses no automatic NAS readings in manual mode and hides unmapped overview details", async () => {
    const hass = createFixture();
    hass.states["sensor.custom_cpu"] = state("sensor.custom_cpu", "28.1234", "%");
    hass.states["sensor.custom_model"] = state("sensor.custom_model", "Custom NAS");
    hass.states["sensor.custom_health"] = state("sensor.custom_health", "maintenance");
    const config: CardConfig = {
      type: "", nas_source: "manual", name: "My NAS", server: "nas",
      entities: { cpu_usage: "sensor.custom_cpu", model: "sensor.custom_model", system_status: "sensor.custom_health" },
    };
    const card = await mount("synology-server-card", config, hass);
    const text = card.shadowRoot!.textContent!;
    expect(text).toContain("My NAS");
    expect(text).toContain("28.12%");
    expect(text).toContain("Custom NAS");
    expect(text).toContain("Status: maintenance");
    expect(text).not.toContain("Select your Synology");
    expect(text).not.toContain("Security Advisor");
    expect(text).not.toContain("Memory");
    expect(text).not.toContain("18.00%");
    expect(card.shadowRoot!.querySelectorAll(".ring-card")).toHaveLength(1);
    expect(card.shadowRoot!.querySelector(".badge-online")).toBeNull();
  });
  it("maps manual storage explicitly, computes only complete weighted totals and hides unsupported drive fields", async () => {
    const hass = createFixture();
    const config: CardConfig = {
      type: "", nas_source: "manual",
      volumes: [{ name: "Explicit volume", total_entity: "sensor.volume_total", used_entity: "sensor.volume_used" }],
      drives: [{ name: "Explicit drive", smart_entity: "sensor.disk_smart", temperature_entity: "sensor.disk_temp" }],
    };
    const registries = { devices: hass.devices!, entities: hass.entities! };
    expect(storageSummary(hass, config, registries)).toEqual({ total: 8e12, used: 2e12, percent: 25 });
    const card = await mount("synology-storage-card", config, hass);
    const text = card.shadowRoot!.textContent!;
    expect(text).toContain("Explicit volume");
    expect(text).toContain("25%");
    expect(text).toContain("Explicit drive");
    expect(text).toContain("SMART: normal");
    expect(text).not.toContain("Bad-sector threshold");
    expect(text).not.toContain("DiskStation");
    expect(text).not.toContain("Unavailable");
    expect(storageSummary(hass, { ...config, volumes: [...config.volumes!, { total_entity: "sensor.other_volume_total" }] }, registries).percent).toBeUndefined();
  });
  it("does not substitute capacity-derived percentages for explicit missing mappings or CPU time for utilization", async () => {
    const hass = createFixture();
    hass.states["sensor.cpu_time"] = state("sensor.cpu_time", "1234", "s");
    const config: CardConfig = {
      type: "", nas_source: "manual",
      entities: { cpu_usage: "sensor.cpu_time", storage_usage: "sensor.missing" },
      volumes: [{ total_entity: "sensor.volume_total", used_entity: "sensor.volume_used", usage_entity: "sensor.missing" }],
    };
    const overview = await mount("synology-server-card", config, hass);
    expect([...overview.shadowRoot!.querySelectorAll(".ring-content")].map((ring) => ring.textContent)).toEqual(["--", "--"]);
    const storage = await mount("synology-storage-card", config, hass);
    const row = storage.shadowRoot!.querySelector(".list-row")!;
    expect(row.textContent).toContain("--");
    expect(row.textContent).not.toContain("25%");
  });
  it("displays manual memory capacities and derives utilization only when no explicit percentage is mapped", async () => {
    const hass = createFixture();
    const config: CardConfig = {
      type: "", nas_source: "manual",
      entities: { memory_total_real: "sensor.ram_total", memory_available_real: "sensor.ram_available" },
    };
    const card = await mount("synology-server-card", config, hass);
    expect(card.shadowRoot!.textContent).toContain("42%");
    expect(card.shadowRoot!.textContent).toContain("3.61 GB / 8.59 GB");
    card.setConfig({ ...config, entities: { ...config.entities, ram_usage: "sensor.missing" } });
    await card.updateComplete;
    expect(card.shadowRoot!.querySelector(".ring-content")!.textContent).toBe("--");
  });
  it("tracks QNAP and manual overview/storage changes while ignoring unrelated updates", async () => {
    class CountingNasCard extends BaseSynologyCard {
      renders = 0;
      protected override render() { this.renders++; return html`${this.getEntity("cpu_usage")?.state}`; }
      protected override updated(changes: PropertyValues<this>) { super.updated(changes); }
    }
    customElements.define("nas-source-counting-test", CountingNasCard);
    const hass = createQnapFixture();
    const card = await mount("nas-source-counting-test", { nas_source: "qnap", server: "qnap" }, hass) as CountingNasCard;
    const initial = card.renders;
    for (let i = 0; i < 100; i++) {
      card.hass = { ...hass, states: { ...hass.states, "sensor.unrelated": state("sensor.unrelated", String(i)) } };
      await card.updateComplete;
    }
    expect(card.renders).toBe(initial);
    hass.states["sensor.q_cpu_renamed"] = state("sensor.q_cpu_renamed", "55", "%");
    card.hass = { ...hass };
    await card.updateComplete;
    expect(card.shadowRoot!.textContent).toContain("55");
    card.setConfig({
      type: "nas-source-counting-test", nas_source: "manual",
      volumes: [{ total_entity: "sensor.volume_total" }], drives: [{ smart_entity: "sensor.disk_smart" }],
    });
    await card.updateComplete;
    for (const [id, value] of [["sensor.volume_total", "10"], ["sensor.disk_smart", "warning"]]) {
      const previous = card.renders;
      hass.states[id!] = state(id!, value!);
      card.hass = { ...hass };
      await card.updateComplete;
      expect(card.renders).toBe(previous + 1);
    }
  });
  it("rejects invalid NAS source, unsafe URLs and malformed manual storage entity mappings", () => {
    const card = document.createElement("synology-storage-card") as BaseSynologyCard;
    expect(() => card.setConfig(JSON.parse('{"type":"custom:synology-storage-card","nas_source":"invalid"}'))).toThrow("NAS source");
    expect(() => card.setConfig({ type: "", management_url: "javascript:alert(1)" })).toThrow("HTTP");
    expect(() => card.setConfig(JSON.parse('{"type":"","volumes":[null]}'))).toThrow("entity mapping");
    expect(() => card.setConfig({ type: "", drives: [{ bad_sectors_entity: "sensor.x" }] })).toThrow("Unsupported entity");
    expect(() => card.setConfig({ type: "", volumes: [{ total_entity: "switch.x" }] })).toThrow("Unsupported entity");
  });
  it("supports timestamp and unit-aware duration uptime rather than assuming every number means seconds", () => {
    expect(formatUptime(state("sensor.x", "48", "h"))).toBe("2d 0h");
    expect(formatUptime(state("sensor.x", "120", "min"))).toBe("2h 0m");
    expect(formatUptime(state("sensor.x", "1", "d"))).toBe("1d 0h");
    expect(formatUptime(state("sensor.x", "90", "s"))).toBe("1m");
    expect(formatUptime(state("sensor.x", "2", "unknown"))).toBe("Unavailable");
  });
  it("initializes an unambiguous QNAP-only picker stub without guessing a container endpoint", async () => {
    const hass = createQnapFixture();
    for (const [id, device] of Object.entries(hass.devices!)) {
      if (id !== "qnap" && device.identifiers?.some(([domain]) => ["qnap", "synology_dsm"].includes(domain))) delete hass.devices![id];
    }
    const ctor = customElements.get("synology-dashboard-card") as CustomElementConstructor & {
      getStubConfig(hass: HomeAssistant): Promise<CardConfig>;
    };
    expect(await ctor.getStubConfig(hass)).toEqual({ type: "custom:synology-dashboard-card", server: "qnap", nas_source: "qnap" });
  });
});

describe("Visual NAS editor", () => {
  it("changes NAS system via the UI, clears incompatible NAS mappings and preserves containers and layout", async () => {
    const editor = document.createElement("synology-dashboard-card-editor") as SynologyCardEditor;
    editor.setConfig({
      type: "custom:synology-dashboard-card", server: "nas", portainer_endpoint: "synEndpoint",
      entities: { cpu_usage: "sensor.renamed_cpu" }, volumes: [{ total_entity: "sensor.volume_total" }],
      view_mode: "list", title: "Control center",
    });
    editor.hass = createQnapFixture();
    document.body.append(editor);
    await editor.updateComplete;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    const source = editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="NAS system"]')!;
    expect(source.value).toBe("synology_dsm");
    source.value = "qnap";
    source.dispatchEvent(new Event("change"));
    await editor.updateComplete;
    expect(editor._config).toEqual({
      type: "custom:synology-dashboard-card", nas_source: "qnap", portainer_endpoint: "synEndpoint",
      view_mode: "list", title: "Control center",
    });
    const device = editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="QNAP NAS"]')!;
    expect([...device.options].map((option) => option.value)).toEqual(["", "qnap", "qnap2"]);
    device.value = "qnap";
    device.dispatchEvent(new Event("change"));
    await editor.updateComplete;
    expect(listener.mock.lastCall![0].detail.config.server).toBe("qnap");
    const nic = editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="Network interface"]')!;
    nic.value = "eth0";
    nic.dispatchEvent(new Event("change"));
    expect(editor._config!.network_interface).toBe("eth0");
    source.value = "manual";
    source.dispatchEvent(new Event("change"));
    await editor.updateComplete;
    expect(editor.shadowRoot!.querySelector('[aria-label="QNAP NAS"]')).toBeNull();
    expect(editor.shadowRoot!.textContent).toContain("Manual volumes");
    expect(editor.shadowRoot!.textContent).toContain("Manual drives");
    expect(editor.shadowRoot!.textContent).toContain("Overview entity mappings");
  });
  it("adds, maps and removes manual volumes and drives using entity pickers", async () => {
    const editor = document.createElement("synology-storage-card-editor") as SynologyCardEditor;
    editor.setConfig({ type: "custom:synology-storage-card", nas_source: "manual" });
    editor.hass = createFixture();
    document.body.append(editor);
    await editor.updateComplete;
    const button = (text: string) => [...editor.shadowRoot!.querySelectorAll<HTMLButtonElement>("button")].find((element) => element.textContent === text)!;
    button("Add volume").click();
    button("Add drive").click();
    await editor.updateComplete;
    const fieldsets = editor.shadowRoot!.querySelectorAll("fieldset");
    fieldsets[0]!.querySelector("ha-entity-picker")!.dispatchEvent(new CustomEvent("value-changed", { detail: { value: "sensor.volume_pct" } }));
    fieldsets[1]!.querySelector("ha-entity-picker")!.dispatchEvent(new CustomEvent("value-changed", { detail: { value: "sensor.disk_status" } }));
    await editor.updateComplete;
    expect(editor._config!.volumes).toEqual([{ usage_entity: "sensor.volume_pct" }]);
    expect(editor._config!.drives).toEqual([{ status_entity: "sensor.disk_status" }]);
    button("Remove volume 1").click();
    button("Remove drive 1").click();
    expect(editor._config!.volumes).toEqual([]);
    expect(editor._config!.drives).toEqual([]);
  });
});
