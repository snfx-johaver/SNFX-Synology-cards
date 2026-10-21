import { html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { containerSource, containerStates, DOCKER_CARD_TAG, DOCKER_EDITOR_TAG } from "./config";
import { BaseSynologyCard } from "./dashboard-cards-base";
import { SynologyDockerCardEditor } from "./dashboard-cards-editor";
import { belongsTo, bytes, deviceEntity, formatBytes, formatValue, hasDomain, numeric, usable } from "./data";
import { iconTemplate, mdiDocker, mdiPower, mdiRestart, mdiViewGrid, mdiViewList } from "./icons";
import { registerDashboardCard } from "./register-dashboard-card";

interface ContainerItem {
  id: string;
  name: string;
  isRunning: boolean;
  isStopped: boolean;
  available: boolean;
  status: string;
  image?: string;
  statusEntityId: string;
  switchEntityId?: string;
  startEntityId?: string;
  stopEntityId?: string;
  restartEntityId?: string;
  cpuPct?: number;
  memoryUsage?: string;
}

export class SynologyDockerCard extends BaseSynologyCard {
  static override editorTag = DOCKER_EDITOR_TAG;
  static override properties = {
    ...BaseSynologyCard.properties, _filter: { state: true }, _viewMode: { state: true },
  };
  declare _filter: "all" | "running" | "stopped";
  declare _viewMode: "grid" | "list";
  constructor() {
    super();
    this._filter = "all";
    this._viewMode = "grid";
  }
  override willUpdate(changes: PropertyValues<this>): void {
    super.willUpdate(changes);
    if (changes.has("config")) {
      const previous = changes.get("config");
      if (previous?.view_mode !== this.config.view_mode) this._viewMode = this.config.view_mode || "grid";
    }
  }
  private getManualContainers(): ContainerItem[] {
    return (this.config.containers ?? []).filter((container) => container.status_entity).map((container, index) => {
      const status = this.hass?.states[container.status_entity];
      const states = containerStates(container);
      const cpu = this.hass?.states[container.cpu_entity ?? ""];
      const memory = this.hass?.states[container.memory_entity ?? ""];
      const memoryBytes = bytes(memory);
      return {
        id: `manual-${index}`,
        name: container.name || String(status?.attributes.friendly_name || container.status_entity),
        statusEntityId: container.status_entity,
        status: usable(status) ? status!.state : "Unavailable",
        isRunning: usable(status) && status!.state === states.running,
        isStopped: usable(status) && status!.state === states.stopped,
        available: usable(status),
        switchEntityId: container.power_entity,
        startEntityId: container.start_entity,
        stopEntityId: container.stop_entity,
        restartEntityId: container.restart_entity,
        cpuPct: cpu?.attributes.unit_of_measurement === "%" ? numeric(cpu) : undefined,
        memoryUsage: memoryBytes !== undefined ? formatBytes(memoryBytes) : undefined,
      };
    });
  }
  private getContainers(): ContainerItem[] {
    const source = containerSource(this.config);
    if (source === "disabled") return [];
    if (source === "manual") return this.sortContainers(this.getManualContainers());
    const endpoint = this.config.portainer_endpoint ? this.registries.devices[this.config.portainer_endpoint] : undefined;
    if (!endpoint || !hasDomain(endpoint, "portainer") || endpoint.model !== "Endpoint") return [];
    const list: ContainerItem[] = [];
    for (const device of Object.values(this.registries.devices)) {
      if (!hasDomain(device, "portainer") || device.model !== "Container" || !belongsTo(device, endpoint.id, this.registries.devices)) continue;
      const get = (key: string, domain: string) => deviceEntity(this.hass, this.registries, device.id, key, domain, "portainer");
      const sw = get("container", "switch");
      if (!sw) continue;
      const restart = get("restart_container", "button") ?? get("restart", "button");
      const cpu = get("cpu_usage_total", "sensor");
      const memory = get("memory_usage", "sensor");
      const memoryBytes = bytes(memory);
      const state = get("container_state", "sensor");
      const image = get("image", "sensor");
      list.push({
        id: device.id, name: device.name_by_user || device.name,
        isRunning: sw.state === "on", isStopped: sw.state === "off", available: usable(sw),
        status: usable(state) ? state!.state : usable(sw) ? sw.state === "on" ? "Running" : "Stopped" : "Unavailable",
        image: usable(image) ? image!.state : undefined,
        switchEntityId: sw.entity_id,
        statusEntityId: sw.entity_id,
        // A button's unknown state means it has never been pressed, not that it is unavailable.
        restartEntityId: restart && restart.state !== "unavailable" ? restart.entity_id : undefined,
        cpuPct: cpu?.attributes.unit_of_measurement === "%" ? numeric(cpu) : undefined,
        memoryUsage: usable(memory) ? (memoryBytes !== undefined ? formatBytes(memoryBytes) : formatValue(memory)) : undefined,
      });
    }
    return this.sortContainers(list);
  }
  private sortContainers(list: ContainerItem[]): ContainerItem[] {
    return list.sort((a, b) => Number(b.isRunning) - Number(a.isRunning) || a.name.localeCompare(b.name));
  }
  private actionAvailable(entityId?: string): boolean {
    if (!entityId) return false;
    const entity = this.hass?.states[entityId];
    return !!entity && entity.state !== "unavailable" &&
      (["button", "input_button", "script"].includes(entityId.split(".")[0]!) || entity.state !== "unknown");
  }
  private triggerEntity(entityId: string): void {
    const domain = entityId.split(".")[0]!;
    void this.runAction(domain, domain === "script" ? "turn_on" : "press", entityId);
  }
  private handlePower(container: ContainerItem): void {
    if (!container.available || (!container.isRunning && !container.isStopped)) return;
    if (container.isRunning && !confirm(`Are you sure you want to stop container "${container.name}"?`)) return;
    const action = container.isRunning ? container.stopEntityId : container.startEntityId;
    if (action) this.triggerEntity(action);
    else if (container.switchEntityId) void this.runAction("switch", container.isRunning ? "turn_off" : "turn_on", container.switchEntityId);
  }
  private handleRestart(container: ContainerItem): void {
    if (!container.available || !container.restartEntityId) return;
    this.triggerEntity(container.restartEntityId);
  }
  private status(container: ContainerItem): TemplateResult {
    return html`<span class="badge ${!container.available ? "badge-standby" : container.isRunning ? "badge-online" : "badge-standby"}">${container.status}</span>`;
  }
  private controls(container: ContainerItem, compact: boolean): TemplateResult {
    const power = container.isRunning ? container.stopEntityId || container.switchEntityId
      : container.isStopped ? container.startEntityId || container.switchEntityId
      : container.switchEntityId || container.startEntityId || container.stopEntityId;
    return html`<div class="row-right" style="gap:4px">
      ${container.restartEntityId ? html`<button class=${compact ? "btn-icon" : "btn"} ?disabled=${!container.available || !this.actionAvailable(container.restartEntityId)}
        title="Restart ${container.name}" @click=${() => this.handleRestart(container)}>
        ${iconTemplate(mdiRestart, compact ? 14 : 13)}${compact ? nothing : "Restart"}
      </button>` : nothing}
      ${power ? html`<button class=${compact ? "btn-icon" : container.isRunning ? "btn" : "btn btn-primary"}
        ?disabled=${!container.available || (!container.isRunning && !container.isStopped) || !this.actionAvailable(power)} title="${container.isRunning ? "Stop" : "Start"} ${container.name}"
        @click=${() => this.handlePower(container)}>
        ${iconTemplate(mdiPower, compact ? 14 : 13)}${compact ? nothing : container.isRunning ? "Stop" : "Start"}
      </button>` : nothing}
    </div>`;
  }
  protected override render(): TemplateResult {
    const containers = this.getContainers();
    const source = containerSource(this.config);
    const running = containers.filter((container) => container.isRunning).length;
    const stopped = containers.filter((container) => container.isStopped).length;
    const unavailable = containers.filter((container) => !container.available).length;
    const filtered = containers.filter((container) =>
      this._filter === "all" || (this._filter === "running" ? container.isRunning : container.isStopped)
    );
    return html`<ha-card>
      ${this.renderHeader(this.config.title || "Docker Containers", `${running} running • ${stopped} stopped • ${unavailable} unavailable`, mdiDocker,
        html`<span class="badge ${running ? "badge-online" : "badge-standby"}">${running} Running</span>`)}
      ${this.renderErrors()}
      ${source === "disabled" ? this.renderNotice("Container support is disabled. Choose a container source in the card editor.")
        : source === "manual" ? (!containers.length ? this.renderNotice("Add containers and select their status entities in the card editor.") : nothing)
        : !this.config.portainer_endpoint ? this.renderNotice("Select the Portainer endpoint belonging to your NAS in the card editor. No endpoint is selected automatically.")
        : !containers.length ? this.renderNotice("No container switches found under the selected Portainer endpoint. Check the endpoint selection and enable its container switch entities.") : nothing}
      ${source === "manual" && this.config.containers?.some((container) => !container.status_entity) ? this.renderNotice("A manual container is missing its required status entity. Complete its mapping in the card editor.") : nothing}
      ${source !== "disabled" ? html`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <div style="display:flex;gap:4px">
          <button class="tab-btn ${this._filter === "all" ? "active" : ""}" @click=${() => this._filter = "all"}>All (${containers.length})</button>
          <button class="tab-btn ${this._filter === "running" ? "active" : ""}" @click=${() => this._filter = "running"}>Running (${running})</button>
          <button class="tab-btn ${this._filter === "stopped" ? "active" : ""}" @click=${() => this._filter = "stopped"}>Stopped (${stopped})</button>
        </div>
        <button class="btn-icon" title="Toggle View Mode" @click=${() => this._viewMode = this._viewMode === "grid" ? "list" : "grid"}>
          ${iconTemplate(this._viewMode === "grid" ? mdiViewList : mdiViewGrid, 18)}
        </button>
      </div>
      ${this._viewMode === "grid" ? html`<div class="container-grid">${filtered.map((container) => html`
        <div class="container-tile">
          <div style="display:flex;align-items:center;gap:8px;min-width:0">
            <span class="status-dot ${!container.available ? "unknown" : container.isRunning ? "online" : "offline"}"></span>
            <button class="tile-name btn" style="padding:0;background:transparent;border:0" title=${container.image ? `${container.name} • ${container.image}` : container.name}
              @click=${() => this.openMoreInfo(container.statusEntityId)}>${container.name}</button>
          </div>
          ${this.status(container)}${this.controls(container, true)}
        </div>`)}
      </div>` : html`<div class="item-list">${filtered.map((container) => html`
        <div class="list-row container-list-row">
          <div class="row-left" style="flex-wrap:wrap;gap:8px">
            <span class="status-dot ${!container.available ? "unknown" : container.isRunning ? "online" : "offline"}"></span>
            <button class="btn" title=${container.image || container.name} @click=${() => this.openMoreInfo(container.statusEntityId)}>${container.name}</button>
            ${container.cpuPct !== undefined ? html`<span style="font-size:.72rem;color:var(--synology-subtext)">${container.cpuPct.toFixed(2)}% CPU</span>` : nothing}
            ${container.memoryUsage ? html`<span style="font-size:.72rem;color:var(--synology-subtext)">${container.memoryUsage}</span>` : nothing}
            ${this.status(container)}
          </div>${this.controls(container, false)}
        </div>`)}
      </div>`}` : nothing}
    </ha-card>`;
  }
}
export function registerDockerCard(): void {
  registerDashboardCard({
    tag: DOCKER_CARD_TAG, editorTag: DOCKER_EDITOR_TAG, card: SynologyDockerCard, editor: SynologyDockerCardEditor,
    name: "NAS Docker Containers Card", description: "Portainer discovery or manually mapped container entities with optional controls.",
  });
}
