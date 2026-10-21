import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { containerSource, nasSource, nasSourceNames, usesRegistryDiscovery, type CardConfig, type ManualContainerConfig, type ManualDriveConfig, type ManualVolumeConfig, type NasSource } from "./config";
import { fireEvent, type HomeAssistant } from "./ha-types";
import { cachedRegistries, loadRegistries, nasDevices, portainerEndpoints, qnapGroups, selectedDevice, type Registries } from "./data";
import { live } from "lit/directives/live.js";

export const mappingFields: Record<string, string> = {
  cpu_usage: "CPU utilization (%)", ram_usage: "Memory utilization (%)",
  system_temperature: "System temperature", uptime: "Uptime / up since",
  memory_total_real: "Total RAM", memory_available_real: "Available RAM",
  memory_used: "Used RAM",
  storage_usage: "Storage utilization (%) override", security_status: "Security Advisor (on = attention)",
  network_rx: "Download rate", network_tx: "Upload rate",
  system_status: "System status (shown as reported)", model: "NAS model", software_version: "Firmware version",
};
const tabNames: Record<string, string> = {
  overview: "Overview", storage: "Storage & Disks", docker: "Docker",
};

export class SynologyCardEditor extends LitElement {
  static override properties = {
    hass: { attribute: false }, _config: { state: true }, registries: { state: true }, error: { state: true }, loading: { state: true },
  };
  declare hass?: HomeAssistant;
  declare _config?: CardConfig;
  declare registries: Registries;
  declare error: string;
  declare loading: boolean;
  private registryKey?: object;
  private requestVersion = 0;
  static override styles = css`
    .card-config { display:flex;flex-direction:column;gap:14px;padding:8px 0;color:var(--primary-text-color); }
    label { display:flex;flex-direction:column;gap:6px;font-size:.85rem; }
    select, input[type=text] { padding:8px 12px;border-radius:6px;border:1px solid var(--divider-color);
      background:var(--card-background-color);color:var(--primary-text-color);font:inherit;max-width:100%; }
    .checkbox-row { flex-direction:row;align-items:center;gap:10px; }
    input[type=checkbox] { accent-color:#0086d6; }
    p { font-size:.8rem;color:var(--secondary-text-color);margin:0; }
    details { display:flex;flex-direction:column; } details label { margin-top:10px; }
    fieldset { min-width:0;border:1px solid var(--divider-color);border-radius:6px;padding:12px;display:flex;flex-direction:column;gap:10px; }
    a { color:var(--primary-color,#0086d6); }
  `;
  constructor() {
    super();
    this.registries = { devices: {}, entities: {} };
    this.error = "";
    this.loading = false;
  }
  override willUpdate(changes: PropertyValues<this>): void {
    if ((changes.has("hass") || changes.has("_config")) && this.hass && this._config) {
      if (!usesRegistryDiscovery(this._config)) {
        this.requestVersion++;
        this.registryKey = undefined;
        this.loading = false;
        this.error = "";
        return;
      }
      const key = this.hass.connection ?? this.hass.callWS ?? this.hass;
      if (!this.hass.callWS) this.registries = { devices: this.hass.devices ?? {}, entities: this.hass.entities ?? {} };
      else if (key !== this.registryKey) { this.registryKey = key; void this.load(); }
      else {
        const snapshot = cachedRegistries(this.hass);
        if (snapshot) this.registries = snapshot;
      }
    }
  }
  private async load(refresh = false): Promise<void> {
    if (!this.hass) return;
    const version = ++this.requestVersion;
    this.error = "";
    this.loading = true;
    try {
      const result = await loadRegistries(this.hass, refresh);
      if (version === this.requestVersion) this.registries = result;
    } catch (error) {
      if (version === this.requestVersion) this.error = `Registry discovery failed: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      if (version === this.requestVersion) this.loading = false;
    }
  }
  setConfig(config: CardConfig): void { this._config = { ...config }; }
  protected override shouldUpdate(changes: PropertyValues<this>): boolean {
    if (changes.size !== 1 || !changes.has("hass")) return true;
    const previous = changes.get("hass");
    if (!previous || !this.hass) return true;
    if ((previous.connection ?? previous.callWS) !== (this.hass.connection ?? this.hass.callWS)) return true;
    if (!this._config || !usesRegistryDiscovery(this._config)) return false;
    if (!this.hass.callWS) return previous.devices !== this.hass.devices || previous.entities !== this.hass.entities;
    const snapshot = cachedRegistries(this.hass);
    return !!snapshot && snapshot !== this.registries;
  }
  private changed(key: string, value: unknown): void {
    if (!this._config) return;
    this._config = { ...this._config, [key]: value };
    fireEvent(this, "config-changed", { config: this._config });
  }
  private mappingChanged(key: string, value: string): void {
    const entities = { ...this._config?.entities };
    if (value) entities[key] = value;
    else delete entities[key];
    this.changed("entities", entities);
  }
  private nasSourceChanged(source: NasSource): void {
    if (!this._config || source === nasSource(this._config)) return;
    const config = { ...this._config, nas_source: source };
    // Never reuse one integration's NAS or metric mappings as another system's data.
    for (const key of ["server", "network_interface", "entities", "volumes", "drives", "management_url", "name"] as const) delete config[key];
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }
  private storageMappingChanged(kind: "volumes" | "drives", index: number, key: string, value: string): void {
    const items = [...(this._config?.[kind] ?? [])];
    items[index] = { ...items[index], [key]: value };
    this.changed(kind, items);
  }
  private renderManualStorage(kind: "volumes" | "drives"): TemplateResult {
    const label = kind === "volumes" ? "Volume" : "Drive";
    const fields: [keyof (ManualVolumeConfig & ManualDriveConfig), string][] = kind === "volumes" ? [
      ["usage_entity", "Usage (%)"], ["total_entity", "Total capacity"], ["used_entity", "Used capacity"],
      ["status_entity", "Volume status"], ["temperature_entity", "Average drive temperature"],
    ] : [
      ["status_entity", "Drive status"], ["smart_entity", "SMART status"], ["temperature_entity", "Drive temperature"],
      ["model_entity", "Drive model"], ["bad_sectors_entity", "Bad-sector threshold (on = exceeded)"],
      ["remaining_life_entity", "Remaining-life threshold (on = below threshold)"],
    ];
    const items: (ManualVolumeConfig & ManualDriveConfig)[] = this._config?.[kind] ?? [];
    return html`<details><summary>Manual ${kind}</summary>
      <p>Add ${kind} and select their entities. All fields are optional; unmapped readings stay hidden.
        Capacity entities must report bytes or a byte-size unit. Storage totals require used and total capacity for every volume.</p>
      ${items.map((item, index) => html`<fieldset><legend>${label} ${index + 1}</legend>
        <label>${label} name (optional)<input type="text" .value=${live(item.name || "")}
          @input=${(event: Event) => this.storageMappingChanged(kind, index, "name", (event.target as HTMLInputElement).value)}></label>
        ${fields.map(([key, fieldLabel]) => html`<label>${fieldLabel}<ha-entity-picker .hass=${this.hass}
          .label=${fieldLabel} .value=${item[key] || ""}
          .includeDomains=${[["bad_sectors_entity", "remaining_life_entity"].includes(key) ? "binary_sensor" : "sensor"]}
          .allowCustomEntity=${true}
          @value-changed=${(event: CustomEvent<{ value?: string }>) => this.storageMappingChanged(kind, index, key, event.detail.value || "")}></ha-entity-picker></label>`)}
        <button @click=${() => this.changed(kind, this._config![kind]!.filter((_, i) => i !== index))}>Remove ${label.toLowerCase()} ${index + 1}</button>
      </fieldset>`)}
      <button @click=${() => this.changed(kind, [...(this._config?.[kind] ?? []), {}])}>Add ${label.toLowerCase()}</button>
    </details>`;
  }
  private containerChanged(index: number, key: keyof ManualContainerConfig, value: string): void {
    const containers = [...(this._config?.containers ?? [])];
    containers[index] = { ...containers[index]!, [key]: value };
    this.changed("containers", containers);
  }
  private renderManualContainers(): TemplateResult {
    const fields: [keyof ManualContainerConfig, string, string[]][] = [
      ["status_entity", "Status entity (required)", ["sensor", "binary_sensor", "switch", "input_boolean"]],
      ["cpu_entity", "CPU utilization entity (%)", ["sensor"]],
      ["memory_entity", "Memory usage entity (bytes, kB, MB, GB, etc.)", ["sensor"]],
      ["power_entity", "Start/stop switch (optional)", ["switch"]],
      ["start_entity", "Start action entity (optional)", ["button", "input_button", "script"]],
      ["stop_entity", "Stop action entity (optional)", ["button", "input_button", "script"]],
      ["restart_entity", "Restart action entity (optional)", ["button", "input_button", "script"]],
    ];
    return html`<p>Choose entities exposed by your container integration. Only status is required.
      Optional controls must target this container; separate start/stop actions take precedence over its switch.
      Unknown or transitional states never enable start/stop.</p>
      ${(this._config?.containers ?? []).map((container, index) => html`<fieldset>
        <legend>Container ${index + 1}</legend>
        <label>Name (optional)<input type="text" .value=${live(container.name || "")}
          @input=${(event: Event) => this.containerChanged(index, "name", (event.target as HTMLInputElement).value)}></label>
        ${fields.map(([key, label, domains]) => html`<label>${label}<ha-entity-picker .hass=${this.hass}
          .label=${label} .value=${container[key] || ""} .includeDomains=${domains} .allowCustomEntity=${true}
          @value-changed=${(event: CustomEvent<{ value?: string }>) => this.containerChanged(index, key, event.detail.value || "")}></ha-entity-picker></label>`)}
        <label>Running state<input type="text" placeholder="on for binary/switch; running for sensors"
          .value=${live(container.running_state || "")}
          @input=${(event: Event) => this.containerChanged(index, "running_state", (event.target as HTMLInputElement).value)}></label>
        <label>Stopped state<input type="text" placeholder="off for binary/switch; exited for sensors"
          .value=${live(container.stopped_state || "")}
          @input=${(event: Event) => this.containerChanged(index, "stopped_state", (event.target as HTMLInputElement).value)}></label>
        <button @click=${() => this.changed("containers", this._config!.containers!.filter((_, i) => i !== index))}>Remove container ${index + 1}</button>
      </fieldset>`)}
      <button @click=${() => this.changed("containers", [...(this._config?.containers ?? []), { status_entity: "" }])}>Add container</button>`;
  }
  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const config = this._config;
    const nas = nasSource(config);
    const devices = nasDevices(this.registries, nas);
    const nasLabel = nas === "synology_dsm" ? "Synology NAS" : "QNAP NAS";
    const endpoints = portainerEndpoints(this.registries);
    const dashboard = config.type.includes("dashboard");
    const containerCard = config.type.includes("docker");
    const source = containerSource(config);
    const docker = (dashboard || containerCard) && source !== "disabled";
    const availableTabs = Object.entries(tabNames).filter(([key]) => source !== "disabled" || key !== "docker");
    const fields = dashboard || config.type.includes("server") ? Object.entries(mappingFields).filter(([key]) =>
      nas === "synology_dsm" ? !["system_status", "memory_used"].includes(key) : key !== "security_status") : [];
    const network = nas === "qnap" ? qnapGroups(this.registries, selectedDevice(config, this.registries)?.id, "network") : [];
    return html`<div class="card-config">
      ${this.error ? html`<div role="alert">${this.error}</div>` : nothing}
      ${!containerCard ? html`<label>NAS system<select aria-label="NAS system" .value=${live(nas)}
        @change=${(event: Event) => this.nasSourceChanged((event.target as HTMLSelectElement).value as NasSource)}>
        ${Object.entries(nasSourceNames).map(([value, label]) => html`<option value=${value} ?selected=${nas === value}>${label}</option>`)}
      </select></label>
      <p>Changing NAS system clears NAS/device, overview and storage mappings to prevent mixing servers. Container settings and layout are kept.</p>
      ${nas !== "manual" ? html`<label>${nasLabel}<select aria-label=${nasLabel} ?disabled=${this.loading} .value=${live(config.server || "")}
        @change=${(event: Event) => {
          const next = { ...config, server: (event.target as HTMLSelectElement).value };
          delete next.network_interface;
          this._config = next;
          fireEvent(this, "config-changed", { config: next });
        }}>
        <option value="">${this.loading ? "Loading NAS devices..." : devices.length === 1 ? `Auto: ${devices[0]!.name}` : `Select a ${nasSourceNames[nas]} NAS`}</option>
        ${devices.map((device) => html`<option value=${device.id} ?selected=${config.server === device.id}>${device.name_by_user || device.name}</option>`)}
        ${config.server && !devices.some((device) => device.id === config.server) ? html`<option value=${config.server} selected>Unavailable: ${config.server}</option>` : nothing}
      </select></label>
      ${!this.loading && !this.error && !devices.length ? html`<p>No ${nasSourceNames[nas]} NAS found. Configure the
        <a href=${`https://www.home-assistant.io/integrations/${nas}/`} target="_blank" rel="noopener noreferrer">${nasSourceNames[nas]} integration</a>
        and refresh entity discovery.</p>` : nothing}` : html`
        <label>NAS name (optional)<input type="text" .value=${live(config.name || "")}
          @input=${(event: Event) => this.changed("name", (event.target as HTMLInputElement).value)}></label>
        <label>NAS management URL (optional)<input type="text" placeholder="https://nas.example"
          .value=${live(config.management_url || "")}
          @change=${(event: Event) => this.changed("management_url", (event.target as HTMLInputElement).value)}></label>
        <p>Pick entities exposed by any Home Assistant integration. No device selection or name matching is required.</p>`}
      ${nas === "qnap" && fields.length ? html`<label>Network interface<select aria-label="Network interface" .value=${live(config.network_interface || "")}
        @change=${(event: Event) => this.changed("network_interface", (event.target as HTMLSelectElement).value)}>
        <option value="">${network.length === 1 ? `Auto: ${network[0]!.id}` : "Select explicitly when more than one interface exists"}</option>
        ${network.map((nic) => html`<option value=${nic.id} ?selected=${config.network_interface === nic.id}>${nic.id}</option>`)}
        ${config.network_interface && !network.some((nic) => nic.id === config.network_interface) ? html`<option value=${config.network_interface} selected>Unavailable: ${config.network_interface}</option>` : nothing}
      </select></label><p>QNAP exposes per-interface traffic; interfaces are not summed to avoid double-counting bonds.
        Enable optional QNAP capacity, uptime, drive and network entities if needed.</p>` : nothing}
      ${nas === "manual" ? html`${this.renderManualStorage("volumes")}
        ${dashboard || config.type.includes("storage") ? this.renderManualStorage("drives") : nothing}` : nothing}
      ` : nothing}
      ${dashboard || containerCard ? html`<label>Container source<select aria-label="Container source" .value=${live(source)}
        @change=${(event: Event) => this.changed("container_source", (event.target as HTMLSelectElement).value)}>
        <option value="disabled" ?selected=${source === "disabled"}>Disabled</option>
        <option value="portainer" ?selected=${source === "portainer"}>Portainer (automatic discovery)</option>
        <option value="manual" ?selected=${source === "manual"}>Manual entities (any container integration)</option>
      </select></label>` : nothing}
      ${docker && source === "portainer" ? html`<label>Portainer endpoint<select aria-label="Portainer endpoint" ?disabled=${this.loading} .value=${live(config.portainer_endpoint || "")}
        @change=${(event: Event) => this.changed("portainer_endpoint", (event.target as HTMLSelectElement).value)}>
        <option value="">Select explicitly (required for Docker)</option>
        ${endpoints.map((endpoint) => html`<option value=${endpoint.id} ?selected=${config.portainer_endpoint === endpoint.id}>${endpoint.name_by_user || endpoint.name}</option>`)}
        ${config.portainer_endpoint && !endpoints.some((endpoint) => endpoint.id === config.portainer_endpoint) ? html`<option value=${config.portainer_endpoint} selected>Unavailable: ${config.portainer_endpoint}</option>` : nothing}
      </select></label><p>Select the endpoint for the intended NAS. Only its descendant container devices are included, including containers nested in stacks.</p>
      ${!this.loading && !endpoints.length ? html`<p>No Portainer endpoints found. Configure the
        <a href="https://www.home-assistant.io/integrations/portainer/" target="_blank" rel="noopener noreferrer">Home Assistant Portainer integration</a>,
        enable its entities and refresh discovery, or choose Manual entities.</p>` : nothing}` : nothing}
      ${docker && source === "manual" ? this.renderManualContainers() : nothing}
      <label>Custom title<input type="text" .value=${config.title || ""} @input=${(event: Event) => this.changed("title", (event.target as HTMLInputElement).value)}></label>
      ${docker ? html`<label>Container layout<select aria-label="Container layout" .value=${config.view_mode || "grid"} @change=${(event: Event) => this.changed("view_mode", (event.target as HTMLSelectElement).value)}>
        <option value="grid" ?selected=${config.view_mode !== "list"}>Grid</option><option value="list" ?selected=${config.view_mode === "list"}>List (CPU / memory details)</option></select></label>` : nothing}
      ${dashboard || config.type.includes("server") ? html`<label class="checkbox-row"><input type="checkbox" .checked=${config.show_system_info !== false}
        @change=${(event: Event) => this.changed("show_system_info", (event.target as HTMLInputElement).checked)}>Show system details</label>` : nothing}
      ${dashboard ? html`<details><summary>Visible dashboard tabs</summary>
        ${availableTabs.map(([key, name]) => html`<label class="checkbox-row"><input type="checkbox" .checked=${(config.tabs ?? availableTabs.map(([key]) => key)).includes(key)}
          @change=${(event: Event) => {
            const selected = new Set(config.tabs ?? availableTabs.map(([key]) => key));
            if ((event.target as HTMLInputElement).checked) selected.add(key); else selected.delete(key);
            this.changed("tabs", availableTabs.map(([key]) => key).filter((tab) => selected.has(tab)));
          }}>${name}</label>`)}
      </details>` : nothing}
      ${fields.length ? html`<details ?open=${nas === "manual"}><summary>${nas === "manual" ? "Overview entity mappings" : "Entity mappings (optional)"}</summary>
        <p>${nas === "manual" ? "Select only the readings you want to display. Unmapped readings stay hidden. CPU and usage must be percentages; capacity must use byte-size units. Uptime accepts a timestamp or a duration in s/min/h/d."
          : "Blank uses device-scoped NAS discovery. Overrides are explicit and may reference any entity you choose."}</p>
        ${fields.map(([key, label]) => html`<label>${label}<ha-entity-picker .hass=${this.hass}
          .label=${label} .value=${config.entities?.[key] || ""} .includeDomains=${[key === "security_status" ? "binary_sensor" : "sensor"]} .allowCustomEntity=${true}
          @value-changed=${(event: CustomEvent<{ value?: string }>) => this.mappingChanged(key, event.detail.value || "")}></ha-entity-picker></label>`)}
      </details>` : nothing}
      ${usesRegistryDiscovery(config) ? html`<button ?disabled=${this.loading} @click=${() => this.load(true)}>${this.loading ? "Loading device discovery..." : "Refresh entity discovery"}</button>` : nothing}
    </div>`;
  }
}
export class SynologyServerCardEditor extends SynologyCardEditor {}
export class SynologyStorageCardEditor extends SynologyCardEditor {}
export class SynologyDockerCardEditor extends SynologyCardEditor {}
export class SynologyDashboardCardEditor extends SynologyCardEditor {}
