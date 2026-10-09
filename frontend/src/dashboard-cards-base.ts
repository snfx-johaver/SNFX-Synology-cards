import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { type CardConfig } from "./config";
import { dashboardCardStyles } from "./dashboard-cards-styles";
import { fireEvent, type HassEntity, type HomeAssistant } from "./ha-types";
import { belongsTo, cachedRegistries, deviceEntity, loadRegistries, selectedDevice, synologyDevices, type Registries } from "./data";
import { iconTemplate } from "./icons";

const entityKeys: Record<string, string> = {
  cpu_usage: "cpu_total_load", ram_usage: "memory_real_usage",
  system_temperature: "temperature", uptime: "uptime",
  security_status: "status", network_rx: "network_down", network_tx: "network_up",
};

export abstract class BaseSynologyCard extends LitElement {
  static override styles = dashboardCardStyles;
  static editorTag = "";
  static async getConfigElement(this: { editorTag: string }): Promise<HTMLElement> {
    return document.createElement(this.editorTag);
  }
  static async getStubConfig(this: { editorTag: string }, hass?: HomeAssistant): Promise<CardConfig> {
    const config: CardConfig = { type: `custom:${this.editorTag.replace(/-editor$/, "")}` };
    if (hass) {
      const devices = synologyDevices(await loadRegistries(hass));
      if (devices.length === 1) config.server = devices[0]!.id;
    }
    return config;
  }
  static override properties = {
    hass: { attribute: false }, config: { attribute: false },
    registries: { state: true }, registryError: { state: true }, actionError: { state: true },
  };
  declare hass?: HomeAssistant;
  declare config: CardConfig;
  declare registries: Registries;
  declare registryError: string;
  declare actionError: string;
  private registryKey?: object;
  private requestVersion = 0;
  private watchedConfig?: CardConfig;
  private watchedRegistries?: Registries;
  private watchedEntities: string[] = [];
  private renderedStates = new Map<string, HassEntity | undefined>();

  constructor() {
    super();
    this.config = { type: "" };
    this.registries = { devices: {}, entities: {} };
    this.registryError = "";
    this.actionError = "";
  }

  protected override shouldUpdate(changes: PropertyValues<this>): boolean {
    if (changes.size !== 1 || !changes.has("hass")) return true;
    const previous = changes.get("hass");
    if (!previous || !this.hass) return true;
    if ((previous.connection ?? previous.callWS) !== (this.hass.connection ?? this.hass.callWS)) return true;
    if (!this.hass.callWS && (previous.devices !== this.hass.devices || previous.entities !== this.hass.entities)) return true;
    const snapshot = cachedRegistries(this.hass);
    if (snapshot && snapshot !== this.registries) return true;
    this.updateWatchedEntities();
    return this.watchedEntities.some((id) => this.renderedStates.get(id) !== this.hass!.states[id]);
  }

  private updateWatchedEntities(): void {
    if (this.watchedConfig !== this.config || this.watchedRegistries !== this.registries) {
      const server = this.getActiveDevice()?.id;
      const docker = this.config.type.includes("docker") || this.config.type.includes("dashboard");
      const endpoint = docker ? this.config.portainer_endpoint : undefined;
      const ids = new Set(Object.values(this.config.entities ?? {}));
      for (const entity of Object.values(this.registries.entities)) {
        const device = entity.device_id ? this.registries.devices[entity.device_id] : undefined;
        if ((server && entity.platform === "synology_dsm" && belongsTo(device, server, this.registries.devices)) ||
            (endpoint && entity.platform === "portainer" && belongsTo(device, endpoint, this.registries.devices))) ids.add(entity.entity_id);
      }
      this.watchedEntities = [...ids];
      this.watchedConfig = this.config;
      this.watchedRegistries = this.registries;
    }
  }

  protected override updated(changes: PropertyValues<this>): void {
    super.updated(changes);
    this.updateWatchedEntities();
    this.renderedStates = new Map(this.watchedEntities.map((id) => [id, this.hass?.states[id]]));
  }

  override willUpdate(changes: PropertyValues<this>): void {
    super.willUpdate(changes);
    this.toggleAttribute("embedded", !!this.config.embedded);
    if (changes.has("hass") && this.hass) {
      const key = this.hass.connection ?? this.hass.callWS ?? this.hass;
      if (!this.hass.callWS) {
        this.registries = { devices: this.hass.devices ?? {}, entities: this.hass.entities ?? {} };
      } else if (key !== this.registryKey) {
        this.registryKey = key;
        void this.refreshRegistries();
      } else {
        const snapshot = cachedRegistries(this.hass);
        if (snapshot) this.registries = snapshot;
      }
    }
  }

  protected async refreshRegistries(refresh = false): Promise<void> {
    if (!this.hass) return;
    const version = ++this.requestVersion;
    this.registryError = "";
    try {
      const registries = await loadRegistries(this.hass, refresh);
      if (version === this.requestVersion) this.registries = registries;
    } catch (error) {
      if (version === this.requestVersion) this.registryError = `Cannot load Home Assistant registries: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  setConfig(config: CardConfig): void {
    if (!config || typeof config.type !== "string") throw new Error("Invalid card configuration");
    if (config.server !== undefined && typeof config.server !== "string") throw new Error("Select a Synology device registry ID");
    if (config.portainer_endpoint !== undefined && typeof config.portainer_endpoint !== "string") throw new Error("Select a Portainer endpoint device registry ID");
    if (config.view_mode !== undefined && !["grid", "list"].includes(config.view_mode)) throw new Error("Container layout must be grid or list");
    if (config.entities && Object.values(config.entities).some((id) => typeof id !== "string")) {
      throw new Error("Entity mappings must contain entity ID strings");
    }
    if (config.tabs && (!Array.isArray(config.tabs) || config.tabs.some((tab) => !["overview", "storage", "docker"].includes(tab)))) {
      throw new Error("Invalid dashboard tabs");
    }
    this.config = { ...config };
    this.toggleAttribute("embedded", !!config.embedded);
  }
  getCardSize(): number { return 4; }
  getGridOptions() { return { columns: "full", rows: "auto", min_columns: 3 }; }
  protected getActiveDevice() { return selectedDevice(this.config, this.registries); }
  protected getEntity(key: string, domain?: string) {
    const mapped = this.config.entities?.[key];
    if (mapped) return this.hass?.states[mapped];
    return deviceEntity(this.hass, this.registries, this.getActiveDevice()?.id, entityKeys[key] ?? key, domain);
  }
  protected openMoreInfo(entityId: string): void { fireEvent(this, "hass-more-info", { entityId }); }
  protected async runAction(domain: string, service: string, entityId: string): Promise<void> {
    this.actionError = "";
    if (!this.hass) { this.actionError = "Home Assistant is not connected."; return; }
    const state = this.hass.states[entityId];
    if (!state || state.state === "unavailable" || (domain !== "button" && state.state === "unknown")) {
      this.actionError = `Cannot ${service}: ${entityId} is unavailable.`;
      return;
    }
    try {
      await this.hass.callService(domain, service, { entity_id: entityId });
    } catch (error) {
      this.actionError = `${service} failed: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
  protected pressButton(entityId: string): Promise<void> { return this.runAction("button", "press", entityId); }
  protected renderNotice(message: string): TemplateResult {
    return html`<div class="empty-state">${message}</div>`;
  }
  protected renderErrors(): TemplateResult {
    return html`${this.registryError ? html`<div role="alert" class="empty-state">${this.registryError} <button class="btn" @click=${() => this.refreshRegistries(true)}>Retry</button></div>` : nothing}
      ${this.actionError ? html`<div role="alert" class="empty-state">${this.actionError}</div>` : nothing}`;
  }
  protected renderHeader(title: string, subtitle: string, iconPath: string, badge?: TemplateResult): TemplateResult | typeof nothing {
    if (this.config.embedded || this.config.hide_header) return nothing;
    return html`<div class="header"><div class="header-main">
      <div class="header-icon">${iconTemplate(iconPath, 22)}</div>
      <div class="header-titles"><span class="header-title">${title}</span><span class="header-subtitle">${subtitle}</span></div>
    </div>${badge ? html`<div class="header-actions">${badge}</div>` : nothing}</div>`;
  }
}
