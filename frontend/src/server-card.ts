import { html, nothing, type TemplateResult } from "lit";
import { SERVER_CARD_TAG, SERVER_EDITOR_TAG } from "./config";
import { BaseSynologyCard } from "./dashboard-cards-base";
import { SynologyServerCardEditor } from "./dashboard-cards-editor";
import { bytes, formatBytes, formatRate, formatValue, percentage, safeUrl, storageSummary, usable } from "./data";
import type { HassEntity } from "./ha-types";
import { mdiServer } from "./icons";
import { registerDashboardCard } from "./register-dashboard-card";

export function formatUptime(entity?: HassEntity): string {
  if (!usable(entity)) return "Unavailable";
  const value = entity!.state.trim();
  const seconds = /^\d+(\.\d+)?$/.test(value) ? Number(value) : (Date.now() - Date.parse(value)) / 1000;
  if (!Number.isFinite(seconds) || seconds < 0) return "Unavailable";
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds % 86400 / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  return days ? `${days}d ${hours}h` : hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

export class SynologyServerCard extends BaseSynologyCard {
  static override editorTag = SERVER_EDITOR_TAG;

  private ring(label: string, value: number | undefined, subtext: string, entity?: HassEntity, decimals = 0): TemplateResult {
    return html`<div class="ring-card" role=${entity ? "button" : "none"} tabindex=${entity ? "0" : "-1"}
      @click=${() => entity && this.openMoreInfo(entity.entity_id)}
      @keydown=${(event: KeyboardEvent) => {
        if (entity && ["Enter", " "].includes(event.key)) { event.preventDefault(); this.openMoreInfo(entity.entity_id); }
      }}>
      <div class="ring-gauge" style="--pct: ${value ?? 0}; --ring-color: ${value === undefined ? "var(--synology-border)" : value > 85 ? "var(--synology-warning)" : "var(--synology-accent)"}">
        <span class="ring-content">${value === undefined ? "--" : `${value.toFixed(decimals)}%`}</span>
      </div><span class="ring-label">${label}</span><span class="ring-subtext">${subtext}</span>
    </div>`;
  }
  private detail(label: string, value: string, entity?: HassEntity): TemplateResult {
    return html`<div class="detail-item" role=${entity ? "button" : "none"} tabindex=${entity ? "0" : "-1"}
      @click=${() => entity && this.openMoreInfo(entity.entity_id)}
      @keydown=${(event: KeyboardEvent) => {
        if (entity && ["Enter", " "].includes(event.key)) { event.preventDefault(); this.openMoreInfo(entity.entity_id); }
      }}><span class="detail-label">${label}</span><span class="detail-val">${value}</span></div>`;
  }
  protected override render(): TemplateResult {
    const device = this.getActiveDevice();
    const cpu = this.getEntity("cpu_usage", "sensor");
    const ram = this.getEntity("ram_usage", "sensor");
    const temperature = this.getEntity("system_temperature", "sensor");
    const uptime = this.getEntity("uptime", "sensor");
    const security = this.getEntity("security_status", "binary_sensor");
    const totalMemory = this.getEntity("memory_total_real", "sensor");
    const freeMemory = this.getEntity("memory_available_real", "sensor");
    const totalBytes = bytes(totalMemory);
    const freeBytes = bytes(freeMemory);
    const storage = storageSummary(this.hass, this.config, this.registries);
    const storageEntity = this.getEntity("storage_usage", "sensor");
    const storagePct = storageEntity ? percentage(storageEntity) : storage.percent;
    const health = !usable(security) ? "Unavailable" : security!.state === "off" ? "Safe" : "Attention needed";
    const dsmUrl = safeUrl(device?.configuration_url);
    return html`<ha-card>
      ${this.renderHeader(this.config.title || device?.name_by_user || device?.name || "Synology NAS",
        `${device?.model || "DSM"} • Up ${formatUptime(uptime)}`, mdiServer,
        html`<span class="badge ${!usable(security) ? "badge-standby" : security!.state === "off" ? "badge-online" : "badge-warning"}">Security: ${health}</span>`)}
      ${this.renderErrors()}
      ${!device ? this.renderNotice("Select your Synology DSM NAS in the card editor. No cross-server entity matching is performed.") : nothing}
      <div class="rings-grid">
        ${this.ring("CPU Load", percentage(cpu, 2), `System: ${formatValue(temperature)}`, cpu, 2)}
        ${this.ring("Memory", percentage(ram), totalBytes !== undefined && freeBytes !== undefined ? `${formatBytes(Math.max(0, totalBytes - freeBytes))} / ${formatBytes(totalBytes)}` : "Enable total/free memory sensors for capacity", ram)}
        ${this.ring("Volume Storage", storagePct, storage.total !== undefined ? `${formatBytes(storage.used)} / ${formatBytes(storage.total)}` : "Enable every volume's total-size sensor", storageEntity)}
      </div>
      ${this.config.show_system_info !== false ? html`<div class="divider"></div><div class="detail-grid">
        ${this.detail("NAS Model", device?.model || "Unavailable")}
        ${this.detail("DSM Version", device?.sw_version || "Unavailable")}
        ${this.detail("System Uptime", formatUptime(uptime), uptime)}
        ${this.detail("System Temperature", formatValue(temperature), temperature)}
        ${this.detail("Download", formatRate(this.getEntity("network_rx")), this.getEntity("network_rx"))}
        ${this.detail("Upload", formatRate(this.getEntity("network_tx")), this.getEntity("network_tx"))}
        ${this.detail("Security Advisor", health, security)}
        ${dsmUrl ? html`<div class="detail-item"><span class="detail-label">DSM Management</span><a class="detail-val" href=${dsmUrl} target="_blank" rel="noreferrer" style="color:var(--synology-accent)">Open DSM</a></div>` : nothing}
      </div>` : nothing}
    </ha-card>`;
  }
}

registerDashboardCard({
  tag: SERVER_CARD_TAG, editorTag: SERVER_EDITOR_TAG, card: SynologyServerCard, editor: SynologyServerCardEditor,
  name: "Synology Server Overview Card", description: "DSM CPU, memory, volume capacity, security and uptime.",
});
