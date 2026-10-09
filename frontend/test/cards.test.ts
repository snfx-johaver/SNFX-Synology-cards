import { afterEach, describe, expect, it, vi } from "vitest";
import "../src/index";
import { BaseSynologyCard } from "../src/dashboard-cards-base";
import { SynologyCardEditor } from "../src/dashboard-cards-editor";
import { belongsTo, bytes, deviceEntity, formatBytes, formatRate, loadRegistries, percentage, safeUrl, storageSummary, synologyDevices } from "../src/data";
import { createFixture, state } from "./fixture";
import type { CardConfig } from "../src/config";
import type { HomeAssistant } from "../src/ha-types";
import * as discovery from "../src/data";
import { html, type PropertyValues } from "lit";

afterEach(() => document.body.replaceChildren());

async function mount(tag: string, config: Partial<CardConfig> = {}, hass = createFixture()) {
  const card = document.createElement(tag) as BaseSynologyCard;
  card.setConfig({ type: `custom:${tag}`, server: "nas", portainer_endpoint: "synEndpoint", ...config });
  card.hass = hass;
  document.body.append(card);
  await card.updateComplete;
  await card.updateComplete;
  return card;
}

describe("Scoped discovery and values", () => {
  it("uses registry metadata for renamed entities and refuses other platforms", () => {
    const hass = createFixture();
    const registries = { devices: hass.devices!, entities: hass.entities! };
    expect(deviceEntity(hass, registries, "nas", "cpu_total_load")?.state).toBe("18");
    expect(deviceEntity(hass, registries, "unraid", "cpu_usage")).toBeUndefined();
  });
  it("traverses stack descendants without crossing endpoints or looping", () => {
    const devices = createFixture().devices!;
    expect(belongsTo(devices.plex, "synEndpoint", devices)).toBe(true);
    expect(belongsTo(devices.unraidPlex, "synEndpoint", devices)).toBe(false);
    devices.stack!.via_device_id = "plex";
    expect(belongsTo(devices.plex, "synEndpoint", devices)).toBe(false);
  });
  it("discovers a linked NAS and storage using parent-device relationships", async () => {
    const hass = createFixture();
    hass.devices!.nas!.via_device_id = "unraid";
    for (const id of ["volume", "disk", "disk2"]) {
      const device = hass.devices![id]!;
      delete device.via_device_id;
      device.parent_device_id = "nas";
      delete device.model;
    }
    const registries = { devices: hass.devices!, entities: hass.entities! };
    expect(synologyDevices(registries).map((device) => device.id)).toEqual(["nas", "nas2"]);
    expect(belongsTo(hass.devices!.disk, "nas", hass.devices!)).toBe(true);
    expect(belongsTo(hass.devices!.volume2, "nas", hass.devices!)).toBe(false);
    const card = await mount("synology-storage-card", {}, hass);
    expect(card.shadowRoot!.textContent).toContain("1 Volumes");
    expect(card.shadowRoot!.textContent).toContain("2 Drives");
    expect(card.shadowRoot!.textContent).toContain("SMART: normal");
    expect(card.shadowRoot!.textContent).not.toContain("Other NAS");
    hass.devices!.nas!.parent_device_id = "disk";
    expect(belongsTo(hass.devices!.disk, "nas2", hass.devices!)).toBe(false);
  });
  it("normalizes units, weights volumes, and rejects partial aggregates", () => {
    const hass = createFixture();
    const registries = { devices: hass.devices!, entities: hass.entities! };
    expect(storageSummary(hass, { type: "", server: "nas" }, registries)).toEqual({ total: 8e12, used: 2e12, percent: 25 });
    hass.devices!.volume2!.via_device_id = "nas";
    expect(storageSummary(hass, { type: "", server: "nas" }, registries)).toEqual({ total: 108e12, used: 92e12, percent: 85 });
    expect(bytes(state("sensor.x", "1", "TiB"))).toBe(1024 ** 4);
    expect(formatRate(hass.states["sensor.rx"])).toBe("1.25 MB/s");
    expect(formatRate(state("sensor.x", "1024", "KiB/s"))).toBe("1.05 MB/s");
    expect(formatRate(state("sensor.x", "unavailable", "kB/s"))).toBe("Unavailable");
    delete hass.states["sensor.volume_total"];
    expect(storageSummary(hass, { type: "", server: "nas" }, registries).percent).toBeUndefined();
  });
  it("rounds CPU precision and formats byte sizes as GB or TB with at most two decimals", () => {
    expect(percentage(state("sensor.cpu", "18.126789", "%"), 2)).toBe(18.13);
    expect(percentage(state("sensor.cpu", "unavailable", "%"), 2)).toBeUndefined();
    expect(formatBytes(bytes(state("sensor.memory", "512", "MB")))).toBe("0.51 GB");
    expect(formatBytes(bytes(state("sensor.memory", "512", "MiB")))).toBe("0.54 GB");
    expect(formatBytes(bytes(state("sensor.memory", "8000", "MB")))).toBe("8 GB");
    expect(formatBytes(1.234567e12)).toBe("1.23 TB");
    expect(formatBytes(undefined)).toBe("Unavailable");
  });
  it("only allows HTTP(S) DSM links", () => {
    expect(safeUrl("javascript:alert(1)")).toBeUndefined();
    expect(safeUrl("https://nas.example:5001")).toBe("https://nas.example:5001/");
  });
  it("loads full registries once per HA connection and supports refresh", async () => {
    const fixture = createFixture();
    const callWS = vi.fn(async (message: Record<string, unknown>) =>
      message.type === "config/device_registry/list" ? Object.values(fixture.devices!) : Object.values(fixture.entities!)
    );
    const hass = { ...fixture, connection: {}, callWS } as HomeAssistant;
    await Promise.all([loadRegistries(hass), loadRegistries(hass)]);
    expect(callWS).toHaveBeenCalledTimes(2);
    await loadRegistries(hass, true);
    expect(callWS).toHaveBeenCalledTimes(4);
  });
  it("indexes registry metadata once instead of scanning every entity per device and render", () => {
    const hass = createFixture();
    for (let i = 0; i < 5000; i++) {
      const id = `unrelated_${i}`;
      hass.devices![id] = { id, name: id, identifiers: [["other", id]] };
      hass.entities![`sensor.${id}`] = { entity_id: `sensor.${id}`, device_id: id, platform: "other" };
    }
    let scans = 0;
    const entities = new Proxy(hass.entities!, { ownKeys(target) { scans++; return Reflect.ownKeys(target); } });
    const registries = { devices: hass.devices!, entities };
    const first = synologyDevices(registries);
    for (let i = 0; i < 100; i++) {
      expect(synologyDevices(registries)).toBe(first);
      expect(deviceEntity(hass, registries, "nas", "cpu_total_load")?.state).toBe("18");
    }
    expect(scans).toBe(1);
  });
  it("recognizes DSM devices through scoped entities when identifiers are omitted", async () => {
    const hass = createFixture();
    for (const device of Object.values(hass.devices!)) delete device.identifiers;
    const registries = { devices: hass.devices!, entities: hass.entities! };
    expect(synologyDevices(registries).map((device) => device.id)).toEqual(["nas", "nas2"]);
    const card = await mount("synology-storage-card", {}, hass);
    expect(card.shadowRoot!.textContent).toContain("1 Volumes");
    expect(card.shadowRoot!.textContent).toContain("2 Drives");
    expect(card.shadowRoot!.textContent).not.toContain("Other NAS");
  });
});

describe("Cards", () => {
  it("skips unrelated updates but renders NAS readings and explicit mappings when they change", async () => {
    class CountingCard extends BaseSynologyCard {
      updates = 0;
      protected override render() {
        return html`<span>${this.getEntity("cpu_usage")?.state}</span>`;
      }
      protected override updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        this.updates++;
      }
    }
    customElements.define("synology-counting-test-card", CountingCard);
    const hass = createFixture();
    const card = await mount("synology-counting-test-card", {}, hass) as CountingCard;
    const initial = card.updates;
    for (let i = 0; i < 100; i++) {
      card.hass = { ...hass, states: { ...hass.states, "sensor.unrelated": state("sensor.unrelated", String(i)) } };
      await card.updateComplete;
    }
    expect(card.updates).toBe(initial);
    card.hass = { ...hass, states: { ...hass.states, "sensor.renamed_cpu": state("sensor.renamed_cpu", "22", "%") } };
    await card.updateComplete;
    expect(card.updates).toBe(initial + 1);
    expect(card.shadowRoot!.querySelector("span")!.textContent).toBe("22");
    card.setConfig({ type: "custom:synology-counting-test-card", server: "nas", entities: { cpu_usage: "sensor.manual" } });
    await card.updateComplete;
    card.hass = { ...hass, states: { ...hass.states, "sensor.manual": state("sensor.manual", "33", "%") } };
    await card.updateComplete;
    expect(card.shadowRoot!.querySelector("span")!.textContent).toBe("33");
  });
  it("registers only the four supported cards and their visual editors", () => {
    expect(window.customCards).toHaveLength(4);
    for (const entry of window.customCards!) {
      expect(entry.type.startsWith("synology-")).toBe(true);
      expect(customElements.get(`${entry.type}-editor`)).toBeDefined();
      const ctor = customElements.get(entry.type) as CustomElementConstructor & { getStubConfig(): CardConfig };
      expect(ctor.getStubConfig().type).toBe(`custom:${entry.type}`);
    }
    expect(customElements.get("unraid-server-card")).toBeUndefined();
    expect(customElements.get("synology-ups-card")).toBeUndefined();
    expect(customElements.get("synology-ups-card-editor")).toBeUndefined();
    expect(customElements.get("synology-network-card")).toBeUndefined();
    expect(customElements.get("synology-network-card-editor")).toBeUndefined();
    expect(customElements.get("synology-shares-card")).toBeUndefined();
    expect(customElements.get("synology-vm-card")).toBeUndefined();
  });
  it("defaults every card to full width and automatic height", () => {
    for (const entry of window.customCards!) {
      const card = document.createElement(entry.type) as BaseSynologyCard;
      card.setConfig({ type: `custom:${entry.type}` });
      expect(card.getGridOptions()).toEqual({ columns: "full", rows: "auto", min_columns: 3 });
    }
  });
  it("renders real overview values, not healthy/zero fallbacks", async () => {
    const hass = createFixture();
    const card = await mount("synology-server-card", {}, hass);
    expect(card.shadowRoot!.textContent).toContain("18.00%");
    expect(card.shadowRoot!.textContent).toContain("25%");
    expect(card.shadowRoot!.textContent).not.toContain("99%");
    hass.states["sensor.renamed_cpu"] = state("sensor.renamed_cpu", "unavailable", "%");
    hass.states["binary_sensor.security"] = state("binary_sensor.security", "unavailable");
    card.hass = { ...hass };
    await card.updateComplete;
    expect(card.shadowRoot!.querySelector(".ring-content")!.textContent).toBe("--");
    expect(card.shadowRoot!.textContent).toContain("Security: Unavailable");
  });
  it("does not select a NAS arbitrarily and invalid saved selections do not fall back", async () => {
    const card = await mount("synology-server-card", { server: "" });
    expect(card.shadowRoot!.textContent).toContain("Select your Synology");
    expect(card.shadowRoot!.textContent).not.toContain("18.00%");
    card.setConfig({ type: "custom:synology-server-card", server: "deleted" });
    await card.updateComplete;
    expect(card.shadowRoot!.textContent).not.toContain("18.00%");
  });
  it("renders SMART, temperature, volume and threshold states", async () => {
    const card = await mount("synology-storage-card");
    const text = card.shadowRoot!.textContent!;
    expect(text).toContain("SMART: normal");
    expect(text).toContain("34 °C");
    expect(text).toContain("Not exceeded");
    expect(text).not.toContain("Other NAS");
    expect(text).not.toContain("Unavailable fields");
    expect(card.shadowRoot!.querySelector("details")).toBeNull();
  });
  it("does not mistake unavailable disk status for healthy", async () => {
    const hass = createFixture();
    hass.states["sensor.disk_status"] = state("sensor.disk_status", "unavailable");
    const card = await mount("synology-storage-card", {}, hass);
    expect(card.shadowRoot!.textContent).toContain("Unavailable");
  });
  it("requires explicit Portainer selection and excludes Unraid, stack switches and unavailable controls", async () => {
    const card = await mount("synology-docker-card");
    expect(card.shadowRoot!.textContent).toContain("Plex");
    expect(card.shadowRoot!.textContent).not.toContain("Unraid Plex");
    expect(card.shadowRoot!.textContent).toContain("1 unavailable");
    expect(card.shadowRoot!.textContent).not.toContain("Unavailable fields");
    expect(card.shadowRoot!.querySelector("details")).toBeNull();
    expect(card.shadowRoot!.querySelector<HTMLButtonElement>('[title="Start Offline"]')!.disabled).toBe(true);
    card.setConfig({ type: "custom:synology-docker-card", server: "nas" });
    await card.updateComplete;
    expect(card.shadowRoot!.textContent).toContain("No endpoint is selected automatically");
    expect(card.shadowRoot!.querySelectorAll(".container-tile")).toHaveLength(0);
  });
  it("uses entity-based start and restart actions and reports service failure", async () => {
    const hass = createFixture();
    hass.callService = vi.fn().mockResolvedValue(undefined);
    const card = await mount("synology-docker-card", {}, hass);
    card.shadowRoot!.querySelector<HTMLButtonElement>('[title="Start Nginx"]')!.click();
    await Promise.resolve();
    expect(hass.callService).toHaveBeenCalledWith("switch", "turn_on", { entity_id: "switch.nginx" });
    card.shadowRoot!.querySelector<HTMLButtonElement>('[title="Restart Plex"]')!.click();
    await Promise.resolve();
    expect(hass.callService).toHaveBeenCalledWith("button", "press", { entity_id: "button.plex_restart" });
    hass.callService = vi.fn().mockRejectedValue(new Error("Permission denied"));
    card.shadowRoot!.querySelector<HTMLButtonElement>('[title="Start Nginx"]')!.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await card.updateComplete;
    expect(card.shadowRoot!.querySelector('[role="alert"]')?.textContent).toContain("Permission denied");
  });
  it("confirms stop, and cancelling sends no action", async () => {
    const hass = createFixture();
    hass.callService = vi.fn();
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const card = await mount("synology-docker-card", {}, hass);
    card.shadowRoot!.querySelector<HTMLButtonElement>('[title="Stop Plex"]')!.click();
    expect(hass.callService).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });
  it("formats CPU and memory consistently across overview, storage and Docker cards", async () => {
    const hass = createFixture();
    hass.states["sensor.renamed_cpu"] = state("sensor.renamed_cpu", "18.126789", "%");
    hass.states["sensor.ram_total"] = state("sensor.ram_total", "8000", "MB");
    hass.states["sensor.ram_available"] = state("sensor.ram_available", "4000", "MB");
    hass.states["sensor.plex_cpu"] = state("sensor.plex_cpu", "12.345678", "%");
    hass.states["sensor.volume_total"] = state("sensor.volume_total", "8000", "MB");
    hass.states["sensor.volume_used"] = state("sensor.volume_used", "1234.567", "MB");
    const overview = await mount("synology-server-card", {}, hass);
    expect(overview.shadowRoot!.textContent).toContain("18.13%");
    expect(overview.shadowRoot!.textContent).toContain("4 GB / 8 GB");
    const docker = await mount("synology-docker-card", { view_mode: "list" }, hass);
    expect(docker.shadowRoot!.textContent).toContain("12.35% CPU");
    expect(docker.shadowRoot!.textContent).toContain("0.54 GB");
    expect(docker.shadowRoot!.textContent).not.toContain("MiB");
    const storage = await mount("synology-storage-card", {}, hass);
    expect(storage.shadowRoot!.textContent).toContain("1.23 GB / 8 GB");
  });
  it("never treats cumulative CPU time as CPU percentage", async () => {
    const hass = createFixture();
    hass.states["sensor.plex_cpu"]!.attributes.unit_of_measurement = "ns";
    const card = await mount("synology-docker-card", { view_mode: "list" }, hass);
    const rows = card.shadowRoot!.querySelectorAll(".list-row");
    expect(rows[0]!.textContent).not.toContain("% CPU");
  });
  it("renders aggregate download and upload items on the primary card without claiming link state", async () => {
    const card = await mount("synology-server-card");
    expect(card.shadowRoot!.textContent).toContain("Download");
    expect(card.shadowRoot!.textContent).toContain("Upload");
    expect(card.shadowRoot!.textContent).toContain("1.25 MB/s");
    expect(card.shadowRoot!.textContent).toContain("500 kB/s");
    expect(card.shadowRoot!.textContent).not.toContain("Connected");
  });
  it("honors hidden tabs and passes endpoint configuration to the embedded Docker card", async () => {
    const card = await mount("synology-dashboard-card", { tabs: ["docker", "storage"] });
    expect(card.shadowRoot!.querySelectorAll('[role="tab"]')).toHaveLength(2);
    expect(card.shadowRoot!.textContent).not.toContain("UPS Power");
    expect(card.shadowRoot!.querySelector('[role="tab"]')!.textContent).not.toContain("Network");
    const dockerTab = [...card.shadowRoot!.querySelectorAll<HTMLButtonElement>('[role="tab"]')].find((button) => button.textContent!.includes("Docker"))!;
    dockerTab.click();
    await card.updateComplete;
    const child = card.shadowRoot!.querySelector("synology-docker-card") as BaseSynologyCard;
    await child.updateComplete;
    await child.updateComplete;
    expect(child.config.portainer_endpoint).toBe("synEndpoint");
    expect(child.shadowRoot!.textContent).not.toContain("Unraid Plex");
    card.setConfig({ type: "custom:synology-dashboard-card", tabs: [] });
    await card.updateComplete;
    expect(card.shadowRoot!.textContent).toContain("All tabs are hidden");
  });
  it("shows actionable registry failure instead of silently falling back", async () => {
    const hass = createFixture();
    hass.callWS = vi.fn().mockRejectedValue(new Error("Registry denied"));
    const card = await mount("synology-server-card", {}, hass);
    await new Promise((resolve) => setTimeout(resolve, 0));
    await card.updateComplete;
    expect(card.shadowRoot!.querySelector('[role="alert"]')!.textContent).toContain("Registry denied");
  });
});

describe("Visual editor", () => {
  it("does not render the editor again for unrelated sensor updates", async () => {
    class CountingEditor extends SynologyCardEditor {
      renders = 0;
      protected override render() { this.renders++; return super.render(); }
    }
    customElements.define("synology-counting-test-editor", CountingEditor);
    const editor = document.createElement("synology-counting-test-editor") as CountingEditor;
    const hass = createFixture();
    editor.hass = hass;
    editor.setConfig({ type: "custom:synology-dashboard-card", server: "nas", portainer_endpoint: "synEndpoint" });
    document.body.append(editor);
    await editor.updateComplete;
    const initial = editor.renders;
    for (let i = 0; i < 100; i++) {
      editor.hass = { ...hass, states: { ...hass.states, "sensor.unrelated": state("sensor.unrelated", String(i)) } };
      await editor.updateComplete;
    }
    expect(editor.renders).toBe(initial);
    expect(editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="Synology NAS"]')!.value).toBe("nas");
    expect(editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="Synology Portainer endpoint"]')!.value).toBe("synEndpoint");
  });
  it("does not restart discovery on state updates, and refresh reaches existing cards", async () => {
    const fixture = createFixture();
    const connection = {};
    const callWS = vi.fn(async (message: Record<string, unknown>) =>
      message.type === "config/device_registry/list" ? Object.values(fixture.devices!) : Object.values(fixture.entities!)
    );
    const hass = { ...fixture, connection, callWS } as HomeAssistant;
    const load = vi.spyOn(discovery, "loadRegistries");
    const card = await mount("synology-storage-card", {}, hass);
    const editor = document.createElement("synology-storage-card-editor") as SynologyCardEditor;
    editor.setConfig({ type: "custom:synology-storage-card" });
    editor.hass = hass;
    document.body.append(editor);
    await editor.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    await editor.updateComplete;
    expect(editor.shadowRoot!.querySelectorAll("option")).toHaveLength(3);
    for (let i = 0; i < 30; i++) {
      card.hass = { ...hass };
      editor.hass = { ...hass };
      await Promise.all([card.updateComplete, editor.updateComplete]);
    }
    expect(load).toHaveBeenCalledTimes(2);
    expect(callWS).toHaveBeenCalledTimes(2);
    const oldRegistries = card.registries;
    editor.shadowRoot!.querySelector<HTMLButtonElement>("button")!.click();
    await new Promise((resolve) => setTimeout(resolve, 0));
    card.hass = { ...hass };
    await card.updateComplete;
    expect(callWS).toHaveBeenCalledTimes(4);
    expect(card.registries).not.toBe(oldRegistries);
    expect(card.registries).toBe(editor.registries);
    load.mockRestore();
  });
  it("keeps a single discovery in flight while HA states change and populates the selector when it finishes", async () => {
    const fixture = createFixture();
    let finish!: () => void;
    const pending = new Promise<void>((resolve) => { finish = resolve; });
    const callWS = vi.fn(async (message: Record<string, unknown>) => {
      await pending;
      return message.type === "config/device_registry/list" ? Object.values(fixture.devices!) : Object.values(fixture.entities!);
    });
    const hass = { ...fixture, connection: {}, callWS } as HomeAssistant;
    const load = vi.spyOn(discovery, "loadRegistries");
    const editor = document.createElement("synology-storage-card-editor") as SynologyCardEditor;
    editor.setConfig({ type: "custom:synology-storage-card" });
    editor.hass = hass;
    document.body.append(editor);
    await editor.updateComplete;
    for (let i = 0; i < 20; i++) {
      editor.hass = { ...hass };
      await editor.updateComplete;
    }
    expect(load).toHaveBeenCalledTimes(1);
    expect(editor.shadowRoot!.querySelector<HTMLSelectElement>("select")!.disabled).toBe(true);
    finish();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await editor.updateComplete;
    const select = editor.shadowRoot!.querySelector<HTMLSelectElement>("select")!;
    expect(select.disabled).toBe(false);
    expect([...select.options].map((option) => option.value)).toEqual(["", "nas", "nas2"]);
    select.value = "nas";
    select.dispatchEvent(new Event("change"));
    await editor.updateComplete;
    expect(select.value).toBe("nas");
    expect(load).toHaveBeenCalledTimes(1);
    load.mockRestore();
  });
  it("displays saved device and layout selections on its first render", async () => {
    const editor = document.createElement("synology-dashboard-card-editor") as SynologyCardEditor;
    editor.hass = createFixture();
    editor.setConfig({ type: "custom:synology-dashboard-card", server: "nas2", portainer_endpoint: "synEndpoint", view_mode: "list" });
    document.body.append(editor);
    await editor.updateComplete;
    expect(editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="Synology NAS"]')!.value).toBe("nas2");
    expect(editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="Synology Portainer endpoint"]')!.value).toBe("synEndpoint");
    expect(editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="Container layout"]')!.value).toBe("list");
  });
  it("saves endpoint, layout, tab visibility and mappings as config-changed", async () => {
    const editor = document.createElement("synology-dashboard-card-editor") as SynologyCardEditor;
    editor.hass = createFixture();
    editor.setConfig({ type: "custom:synology-dashboard-card" });
    document.body.append(editor);
    await editor.updateComplete;
    const listener = vi.fn();
    editor.addEventListener("config-changed", listener);
    const select = editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="Synology Portainer endpoint"]')!;
    select.value = "synEndpoint";
    select.dispatchEvent(new Event("change"));
    await editor.updateComplete;
    expect(listener.mock.lastCall![0].detail.config.portainer_endpoint).toBe("synEndpoint");
    const layout = editor.shadowRoot!.querySelector<HTMLSelectElement>('[aria-label="Container layout"]')!;
    layout.value = "list";
    layout.dispatchEvent(new Event("change"));
    await editor.updateComplete;
    expect(listener.mock.lastCall![0].detail.config.view_mode).toBe("list");
    const picker = editor.shadowRoot!.querySelector("ha-entity-picker")!;
    picker.dispatchEvent(new CustomEvent("value-changed", { detail: { value: "sensor.manual_cpu" } }));
    expect(listener.mock.lastCall![0].detail.config.entities.cpu_usage).toBe("sensor.manual_cpu");
    const storageCheckbox = [...editor.shadowRoot!.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')].find((input) => input.parentElement?.textContent?.includes("Storage & Disks"))!;
    storageCheckbox.checked = false;
    storageCheckbox.dispatchEvent(new Event("change"));
    expect(listener.mock.lastCall![0].detail.config.tabs).toEqual(["overview", "docker"]);
  });
});
