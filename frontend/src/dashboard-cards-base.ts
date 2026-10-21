import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { containerSource, containerStates, nasSource, nasSourceNames, usesRegistryDiscovery, type CardConfig } from "./config";
import { dashboardCardStyles } from "./dashboard-cards-styles";
import { fireEvent, type HassEntity, type HomeAssistant } from "./ha-types";
import { belongsTo, cachedRegistries, loadRegistries, nasDevices, overviewEntity, safeUrl, selectedDevice, type Registries } from "./data";
import { iconTemplate } from "./icons";

export abstract class BaseSynologyCard extends LitElement {
  static override styles = dashboardCardStyles;
  static editorTag = "";
  static async getConfigElement(this: { editorTag: string }): Promise<HTMLElement> {
    return document.createElement(this.editorTag);
  }
  static async getStubConfig(this: { editorTag: string }, hass?: HomeAssistant): Promise<CardConfig> {
    const config: CardConfig = { type: `custom:${this.editorTag.replace(/-editor$/, "")}` };
    if (hass) {
      const registries = await loadRegistries(hass);
      const synology = nasDevices(registries, "synology_dsm");
      const qnap = nasDevices(registries, "qnap");
      if (synology.length + qnap.length === 1) {
        config.server = (synology[0] ?? qnap[0])!.id;
        if (qnap.length) config.nas_source = "qnap";
      }
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
    if (usesRegistryDiscovery(this.config) && !this.hass.callWS && (previous.devices !== this.hass.devices || previous.entities !== this.hass.entities)) return true;
    const snapshot = usesRegistryDiscovery(this.config) ? cachedRegistries(this.hass) : undefined;
    if (snapshot && snapshot !== this.registries) return true;
    this.updateWatchedEntities();
    return this.watchedEntities.some((id) => this.renderedStates.get(id) !== this.hass!.states[id]);
  }

  private updateWatchedEntities(): void {
    if (this.watchedConfig !== this.config || this.watchedRegistries !== this.registries) {
      const server = this.getActiveDevice()?.id;
      const docker = this.config.type.includes("docker") || this.config.type.includes("dashboard");
      const source = docker ? containerSource(this.config) : "disabled";
      const endpoint = source === "portainer" ? this.config.portainer_endpoint : undefined;
      const ids = new Set(Object.values(this.config.entities ?? {}));
      if (nasSource(this.config) === "manual") {
        for (const item of [...(this.config.volumes ?? []), ...(this.config.drives ?? [])]) {
          for (const [key, value] of Object.entries(item)) {
            if (key.endsWith("_entity") && value) ids.add(value);
          }
        }
      }
      if (source === "manual") {
        for (const container of this.config.containers ?? []) {
          for (const [key, value] of Object.entries(container)) {
            if (key.endsWith("_entity") && value) ids.add(value);
          }
        }
      }
      for (const entity of Object.values(this.registries.entities)) {
        const device = entity.device_id ? this.registries.devices[entity.device_id] : undefined;
        if ((server && entity.platform === nasSource(this.config) && belongsTo(device, server, this.registries.devices)) ||
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
    if ((changes.has("hass") || changes.has("config")) && this.hass) {
      if (!usesRegistryDiscovery(this.config)) {
        this.requestVersion++;
        this.registryKey = undefined;
        this.registryError = "";
        return;
      }
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
    if (config.nas_source !== undefined && !Object.hasOwn(nasSourceNames, config.nas_source)) {
      throw new Error("NAS source must be synology_dsm, qnap or manual");
    }
    if (config.server !== undefined && typeof config.server !== "string") throw new Error("Select a NAS device registry ID");
    for (const key of ["name", "network_interface", "management_url"] as const) {
      if (config[key] !== undefined && typeof config[key] !== "string") throw new Error(`${key} must be a string`);
    }
    if (config.management_url && !safeUrl(config.management_url)) throw new Error("NAS management URL must use HTTP or HTTPS");
    for (const key of ["volumes", "drives"] as const) {
      const items = config[key];
      if (items === undefined) continue;
      if (!Array.isArray(items)) throw new Error(`Manual ${key} must be a list`);
      for (const item of items) {
        if (!item || typeof item !== "object" || Array.isArray(item)) throw new Error(`Each manual ${key} entry must be an entity mapping`);
        for (const [field, value] of Object.entries(item)) {
          if (typeof value !== "string") throw new Error(`Manual ${key} ${field} must be a string`);
          const domain = ["bad_sectors_entity", "remaining_life_entity"].includes(field) ? "binary_sensor" : "sensor";
          if (field.endsWith("_entity") && value && !new RegExp(`^${domain}\\.[a-z0-9_]+$`).test(value)) {
            throw new Error(`Unsupported entity for ${key} ${field}: ${value}`);
          }
        }
      }
    }
    if (config.portainer_endpoint !== undefined && typeof config.portainer_endpoint !== "string") throw new Error("Select a Portainer endpoint device registry ID");
    if (config.view_mode !== undefined && !["grid", "list"].includes(config.view_mode)) throw new Error("Container layout must be grid or list");
    if (config.container_source !== undefined && !["disabled", "portainer", "manual"].includes(config.container_source)) {
      throw new Error("Container source must be disabled, portainer or manual");
    }
    if (config.containers !== undefined) {
      if (!Array.isArray(config.containers)) throw new Error("Manual containers must be a list");
      const domains: Record<string, string[]> = {
        status_entity: ["sensor", "binary_sensor", "switch", "input_boolean"],
        cpu_entity: ["sensor"], memory_entity: ["sensor"], power_entity: ["switch"],
        start_entity: ["button", "input_button", "script"], stop_entity: ["button", "input_button", "script"],
        restart_entity: ["button", "input_button", "script"],
      };
      for (const container of config.containers) {
        if (!container || typeof container !== "object" || typeof container.status_entity !== "string") {
          throw new Error("Each manual container needs a status entity");
        }
        for (const [key, value] of Object.entries(container)) {
          if (typeof value !== "string") throw new Error(`Container ${key} must be a string`);
          if (value && domains[key] && (!/^[a-z_]+\.[a-z0-9_]+$/.test(value) || !domains[key]!.includes(value.split(".")[0]!))) {
            throw new Error(`Unsupported entity for container ${key}: ${value}`);
          }
        }
        const states = containerStates(container);
        if (states.running === states.stopped) {
          throw new Error("Running and stopped states must be different");
        }
      }
    }
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
    return overviewEntity(this.hass, this.config, this.registries, key, domain);
  }
  protected openMoreInfo(entityId: string): void { fireEvent(this, "hass-more-info", { entityId }); }
  protected async runAction(domain: string, service: string, entityId: string): Promise<void> {
    this.actionError = "";
    if (!this.hass) { this.actionError = "Home Assistant is not connected."; return; }
    const state = this.hass.states[entityId];
    if (!state || state.state === "unavailable" || (!["button", "input_button", "script"].includes(domain) && state.state === "unknown")) {
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
