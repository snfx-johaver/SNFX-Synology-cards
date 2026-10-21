import { html, nothing, type TemplateResult } from "lit";
import { nasSource, SERVER_CARD_TAG, SERVER_EDITOR_TAG } from "./config";
import { BaseSynologyCard } from "./dashboard-cards-base";
import { SynologyServerCardEditor } from "./dashboard-cards-editor";
import { bytes, formatBytes, formatRate, formatValue, percentage, safeUrl, storageSummary, usable, volumeData } from "./data";
import type { HassEntity } from "./ha-types";
import { mdiServer } from "./icons";
import { registerDashboardCard } from "./register-dashboard-card";

export function formatUptime(entity?: HassEntity): string {
  if (!usable(entity)) return "Unavailable";
  const value = entity!.state.trim();
  const durations: Record<string, number> = { ms: .001, s: 1, min: 60, h: 3600, d: 86400 };
  const unit = entity!.attributes.unit_of_measurement;
  const multiplier = unit === undefined ? 1 : typeof unit === "string" ? durations[unit] : undefined;
  const seconds = /^\d+(\.\d+)?$/.test(value)
    ? multiplier === undefined ? NaN : Number(value) * multiplier : (Date.now() - Date.parse(value)) / 1000;
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
    const source = nasSource(this.config);
    const synology = source === "synology_dsm";
    const manual = source === "manual";
    const device = this.getActiveDevice();
    const show = (key: string, entity?: HassEntity) => synology || !!entity || !!this.config.entities?.[key];
    const percent = (entity?: HassEntity, decimals = 0) => manual && entity?.attributes.unit_of_measurement !== "%"
      ? undefined : percentage(entity, decimals);
    const cpu = this.getEntity("cpu_usage", "sensor");
    const ram = this.getEntity("ram_usage", "sensor");
    const temperature = this.getEntity("system_temperature", "sensor");
    const uptime = this.getEntity("uptime", "sensor");
    const security = this.getEntity("security_status", "binary_sensor");
    const status = this.getEntity("system_status", "sensor");
    const model = this.getEntity("model", "sensor");
    const version = this.getEntity("software_version", "sensor");
    const totalMemory = this.getEntity("memory_total_real", "sensor");
    const freeMemory = this.getEntity("memory_available_real", "sensor");
    const usedMemory = this.getEntity("memory_used", "sensor");
    const rx = this.getEntity("network_rx");
    const tx = this.getEntity("network_tx");
    const totalBytes = bytes(totalMemory);
    const freeBytes = bytes(freeMemory);
    const usedBytes = usedMemory || this.config.entities?.memory_used ? bytes(usedMemory)
      : totalBytes !== undefined && freeBytes !== undefined ? Math.max(0, totalBytes - freeBytes) : undefined;
    const memoryConfigured = show("ram_usage", ram) || ["memory_total_real", "memory_available_real", "memory_used"]
      .some((key) => this.config.entities?.[key]);
    const memoryPct = manual && !this.config.entities?.ram_usage && totalBytes !== undefined && totalBytes > 0 && usedBytes !== undefined
      ? Math.round(Math.max(0, Math.min(100, usedBytes / totalBytes * 100))) : percent(ram);
    const memoryText = totalBytes !== undefined && usedBytes !== undefined ? `${formatBytes(usedBytes)} / ${formatBytes(totalBytes)}`
      : synology ? "Enable total/free memory sensors for capacity"
      : [totalBytes !== undefined ? `Total: ${formatBytes(totalBytes)}` : "", freeBytes !== undefined ? `Free: ${formatBytes(freeBytes)}` : "",
        usedBytes !== undefined ? `Used: ${formatBytes(usedBytes)}` : ""].filter(Boolean).join(" • ");
    const storage = storageSummary(this.hass, this.config, this.registries);
    const storageEntity = this.getEntity("storage_usage", "sensor");
    const storagePct = storageEntity || this.config.entities?.storage_usage ? percent(storageEntity) : storage.percent;
    const health = !usable(security) ? "Unavailable" : security!.state === "off" ? "Safe" : "Attention needed";
    const managementUrl = safeUrl(this.config.management_url || device?.configuration_url);
    const modelName = this.config.entities?.model ? (usable(model) ? model!.state : "Unavailable") : device?.model;
    const softwareVersion = this.config.entities?.software_version ? (usable(version) ? version!.state : "Unavailable") : device?.sw_version;
    const hasStorage = synology || !!storageEntity || !!this.config.entities?.storage_usage ||
      volumeData(this.hass, this.config, this.registries).some((volume) => volume.total || volume.used) ||
      (manual && this.config.volumes?.some((volume) => volume.total_entity || volume.used_entity));
    return html`<ha-card>
      ${this.renderHeader(this.config.title || this.config.name || device?.name_by_user || device?.name || (synology ? "Synology NAS" : source === "qnap" ? "QNAP NAS" : "NAS"),
        [modelName || (synology ? "DSM" : source === "qnap" ? "QNAP" : "Manual entities"), show("uptime", uptime) ? `Up ${formatUptime(uptime)}` : ""].filter(Boolean).join(" • "), mdiServer,
        synology ? html`<span class="badge ${!usable(security) ? "badge-standby" : security!.state === "off" ? "badge-online" : "badge-warning"}">Security: ${health}</span>`
          : show("system_status", status) ? html`<span class="badge badge-standby">Status: ${formatValue(status)}</span>` : undefined)}
      ${this.renderErrors()}
      ${!manual && !device ? this.renderNotice(`Select your ${synology ? "Synology DSM" : "QNAP"} NAS in the card editor. No cross-server entity matching is performed.`) : nothing}
      ${manual && !Object.values(this.config.entities ?? {}).some(Boolean) ? this.renderNotice("Choose overview entities in the card editor. No NAS device or automatic entity matching is required in manual mode.") : nothing}
      <div class="rings-grid">
        ${show("cpu_usage", cpu) ? this.ring("CPU Load", percent(cpu, 2), show("system_temperature", temperature) ? `System: ${formatValue(temperature)}` : "", cpu, 2) : nothing}
        ${memoryConfigured ? this.ring("Memory", memoryPct, memoryText, ram ?? usedMemory ?? totalMemory ?? freeMemory) : nothing}
        ${hasStorage ? this.ring("Volume Storage", storagePct, storage.total !== undefined ? `${formatBytes(storage.used)} / ${formatBytes(storage.total)}` : synology ? "Enable every volume's total-size sensor" : "", storageEntity) : nothing}
      </div>
      ${this.config.show_system_info !== false ? html`<div class="divider"></div><div class="detail-grid">
        ${synology || modelName || this.config.entities?.model ? this.detail("NAS Model", modelName || "Unavailable", model) : nothing}
        ${synology || softwareVersion || this.config.entities?.software_version ? this.detail(synology ? "DSM Version" : "Firmware Version", softwareVersion || "Unavailable", version) : nothing}
        ${show("uptime", uptime) ? this.detail("System Uptime", formatUptime(uptime), uptime) : nothing}
        ${show("system_temperature", temperature) ? this.detail("System Temperature", formatValue(temperature), temperature) : nothing}
        ${show("network_rx", rx) ? this.detail("Download", formatRate(rx), rx) : nothing}
        ${show("network_tx", tx) ? this.detail("Upload", formatRate(tx), tx) : nothing}
        ${synology ? this.detail("Security Advisor", health, security) : show("system_status", status) ? this.detail("System Status", formatValue(status), status) : nothing}
        ${managementUrl ? html`<div class="detail-item"><span class="detail-label">${synology ? "DSM Management" : "NAS Management"}</span><a class="detail-val" href=${managementUrl} target="_blank" rel="noreferrer" style="color:var(--synology-accent)">${synology ? "Open DSM" : "Open NAS"}</a></div>` : nothing}
      </div>` : nothing}
    </ha-card>`;
  }
}

registerDashboardCard({
  tag: SERVER_CARD_TAG, editorTag: SERVER_EDITOR_TAG, card: SynologyServerCard, editor: SynologyServerCardEditor,
  name: "NAS Server Overview Card", description: "Synology DSM, QNAP or manually mapped CPU, memory, storage and system readings.",
});
