import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { type CardConfig } from "./config";
import { fireEvent, type HomeAssistant } from "./ha-types";
import { cachedRegistries, loadRegistries, portainerEndpoints, synologyDevices, type Registries } from "./data";
import { PORTAINER_ENABLED } from "./features";
import { live } from "lit/directives/live.js";

export const mappingFields: Record<string, string> = {
  cpu_usage: "CPU utilization (%)", ram_usage: "Memory utilization (%)",
  system_temperature: "System temperature", uptime: "Uptime / up since",
  memory_total_real: "Total RAM", memory_available_real: "Available RAM",
  storage_usage: "Storage utilization (%) override", security_status: "Security Advisor (on = attention)",
  network_rx: "Download rate", network_tx: "Upload rate",
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
  `;
  constructor() {
    super();
    this.registries = { devices: {}, entities: {} };
    this.error = "";
    this.loading = false;
  }
  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("hass") && this.hass) {
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
  protected override render(): TemplateResult {
    if (!this._config) return html``;
    const config = this._config;
    const devices = synologyDevices(this.registries);
    const endpoints = PORTAINER_ENABLED ? portainerEndpoints(this.registries) : [];
    const dashboard = config.type.includes("dashboard");
    const docker = PORTAINER_ENABLED && (dashboard || config.type.includes("docker"));
    const availableTabs = Object.entries(tabNames).filter(([key]) => PORTAINER_ENABLED || key !== "docker");
    const fields = dashboard || config.type.includes("server") ? Object.entries(mappingFields) : [];
    return html`<div class="card-config">
      ${this.error ? html`<div role="alert">${this.error}</div>` : nothing}
      <label>Synology NAS<select aria-label="Synology NAS" ?disabled=${this.loading} .value=${live(config.server || "")}
        @change=${(event: Event) => this.changed("server", (event.target as HTMLSelectElement).value)}>
        <option value="">${this.loading ? "Loading Synology devices..." : devices.length === 1 ? `Auto: ${devices[0]!.name}` : "Select a Synology DSM NAS"}</option>
        ${devices.map((device) => html`<option value=${device.id} ?selected=${config.server === device.id}>${device.name_by_user || device.name}</option>`)}
        ${config.server && !devices.some((device) => device.id === config.server) ? html`<option value=${config.server} selected>Unavailable: ${config.server}</option>` : nothing}
      </select></label>
      ${!this.loading && !this.error && !devices.length ? html`<p>No Synology DSM NAS found in the device/entity registries. Use Refresh entity discovery to retry.</p>` : nothing}
      ${docker ? html`<label>Synology Portainer endpoint<select aria-label="Synology Portainer endpoint" ?disabled=${this.loading} .value=${live(config.portainer_endpoint || "")}
        @change=${(event: Event) => this.changed("portainer_endpoint", (event.target as HTMLSelectElement).value)}>
        <option value="">Select explicitly (required for Docker)</option>
        ${endpoints.map((endpoint) => html`<option value=${endpoint.id} ?selected=${config.portainer_endpoint === endpoint.id}>${endpoint.name_by_user || endpoint.name}</option>`)}
        ${config.portainer_endpoint && !endpoints.some((endpoint) => endpoint.id === config.portainer_endpoint) ? html`<option value=${config.portainer_endpoint} selected>Unavailable: ${config.portainer_endpoint}</option>` : nothing}
      </select></label><p>Select the Synology endpoint, not Unraid. Only its descendant container devices are included, including containers nested in stacks.</p>` : nothing}
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
      ${fields.length ? html`<details><summary>Entity mappings (optional)</summary>
        <p>Blank uses device-scoped DSM discovery. Overrides are explicit and may reference any entity you choose.</p>
        ${fields.map(([key, label]) => html`<label>${label}<ha-entity-picker .hass=${this.hass}
          .value=${config.entities?.[key] || ""} .includeDomains=${[key === "security_status" ? "binary_sensor" : "sensor"]} .allowCustomEntity=${true}
          @value-changed=${(event: CustomEvent<{ value?: string }>) => this.mappingChanged(key, event.detail.value || "")}></ha-entity-picker></label>`)}
      </details>` : nothing}
      <button ?disabled=${this.loading} @click=${() => this.load(true)}>${this.loading ? "Loading device discovery..." : "Refresh entity discovery"}</button>
    </div>`;
  }
}
export class SynologyServerCardEditor extends SynologyCardEditor {}
export class SynologyStorageCardEditor extends SynologyCardEditor {}
export class SynologyDockerCardEditor extends SynologyCardEditor {}
export class SynologyDashboardCardEditor extends SynologyCardEditor {}
