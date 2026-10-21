import { html, nothing, type TemplateResult } from "lit";
import { nasSource, STORAGE_CARD_TAG, STORAGE_EDITOR_TAG } from "./config";
import { BaseSynologyCard } from "./dashboard-cards-base";
import { SynologyStorageCardEditor } from "./dashboard-cards-editor";
import { bytes, driveData, formatBytes, formatValue, percentage, storageSummary, usable, volumeData } from "./data";
import { iconTemplate, mdiHarddisk } from "./icons";
import { registerDashboardCard } from "./register-dashboard-card";

export class SynologyStorageCard extends BaseSynologyCard {
  static override editorTag = STORAGE_EDITOR_TAG;

  protected override render(): TemplateResult {
    const volumes = volumeData(this.hass, this.config, this.registries);
    const summary = storageSummary(this.hass, this.config, this.registries);
    const disks = driveData(this.hass, this.config, this.registries);
    const synology = nasSource(this.config) === "synology_dsm";
    const aggregate = synology || volumes.some((volume) => volume.total || volume.used) ||
      (nasSource(this.config) === "manual" && !!this.config.volumes?.some((volume) => volume.total_entity || volume.used_entity));
    return html`<ha-card>
      ${this.renderHeader(this.config.title || "Storage Volumes & Disks",
        aggregate ? `${formatBytes(summary.used)} used of ${formatBytes(summary.total)}` : "", mdiHarddisk,
        html`<span class="badge badge-standby">${volumes.length} Volumes • ${disks.length} Drives</span>`)}
      ${this.renderErrors()}
      ${aggregate ? html`<div style="display:flex;flex-direction:column;gap:4px">
        <div style="display:flex;justify-content:space-between;font-size:.76rem;font-weight:600"><span>Total Volume Capacity</span><span>${summary.percent === undefined ? "Unavailable" : `${summary.percent}%`}</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, summary.percent ?? 0)}%"></div></div>
      </div>` : nothing}
      <div class="item-list">${volumes.map((volume, index) => {
        const total = bytes(volume.total);
        const used = bytes(volume.used);
        const mapping = nasSource(this.config) === "manual" ? this.config.volumes?.[index] : undefined;
        const mappedPct = mapping && volume.usage?.attributes.unit_of_measurement !== "%" ? undefined : percentage(volume.usage);
        const pct = volume.usage || mapping?.usage_entity ? mappedPct
          : total !== undefined && used !== undefined && total > 0 ? Math.round(Math.min(100, used / total * 100)) : undefined;
        const showSize = synology || volume.total || volume.used || mapping?.total_entity || mapping?.used_entity;
        const showPct = synology || volume.usage || mapping?.usage_entity || (total !== undefined && used !== undefined);
        const infoEntity = volume.usage ?? volume.total ?? volume.used ?? volume.status;
        const status = usable(volume.status) ? volume.status!.state : "Unavailable";
        const normal = ["normal", "healthy"].includes(status.toLowerCase());
        const warning = mapping ? ["warning", "bad", "failed", "critical", "faulty", "degraded"].includes(status.toLowerCase()) : !normal;
        return html`<div class="list-row" style="flex-direction:column;align-items:stretch;gap:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <button class="btn" ?disabled=${!infoEntity} @click=${() => infoEntity && this.openMoreInfo(infoEntity.entity_id)}>${iconTemplate(mdiHarddisk, 16)} ${volume.device.name_by_user || volume.device.name}</button>
            ${synology || volume.status || mapping?.status_entity ? html`<span class="badge ${!usable(volume.status) ? "badge-standby" : normal ? "badge-online" : warning ? "badge-warning" : "badge-standby"}">${status}</span>` : nothing}
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.75rem">${showSize ? html`<span>${formatBytes(used)} / ${formatBytes(total)}</span>` : nothing}${showPct ? html`<span>${pct === undefined ? "--" : `${pct}%`}</span>` : nothing}</div>
          ${showPct ? html`<div class="progress-bar"><div class="progress-fill" style="width:${pct ?? 0}%"></div></div>` : nothing}
          <div style="font-size:.72rem;color:var(--synology-subtext)">${total !== undefined && used !== undefined ? `${formatBytes(Math.max(0, total - used))} free` : ""}
            ${synology || volume.temperature || mapping?.temperature_entity ? html` • Average drive temperature: ${formatValue(volume.temperature)}` : nothing}</div>
          ${mapping && !Object.entries(mapping).some(([key, value]) => key.endsWith("_entity") && value) ? html`<span>Choose this volume's entities in the card editor.</span>` : nothing}
        </div>`;
      })}</div>
      ${disks.length ? html`<div class="divider"></div><div class="section-title">Physical Drives</div>` : nothing}
      <div class="item-list">${disks.map((drive, index) => {
        const { status, smart, temperature: temp, badSectors, remainingLife: life } = drive;
        const mapping = nasSource(this.config) === "manual" ? this.config.drives?.[index] : undefined;
        const health = [status, smart].filter((entity) => usable(entity));
        const normal = health.length > 0 && health.every((entity) => ["normal", "healthy", "good"].includes(entity!.state.toLowerCase()));
        const warning = [badSectors, life].some((entity) => usable(entity) && entity!.state === "on") ||
          health.some((entity) => nasSource(this.config) === "manual"
            ? ["warning", "bad", "failed", "critical", "faulty", "degraded"].includes(entity!.state.toLowerCase())
            : !["normal", "healthy", "good"].includes(entity!.state.toLowerCase()));
        const known = status ? usable(status) : usable(smart);
        const infoEntity = status ?? smart ?? temp;
        return html`<div class="list-row" style="flex-direction:column;align-items:stretch;gap:10px">
          <div class="row-left" style="min-width:0">
            <div style="color:var(--synology-accent)">${iconTemplate(mdiHarddisk, 20)}</div>
            <div style="display:flex;flex-direction:column;min-width:0">
              <button class="btn" style="justify-content:flex-start;white-space:normal;text-align:left" ?disabled=${!infoEntity} @click=${() => infoEntity && this.openMoreInfo(infoEntity.entity_id)}>${drive.name}</button>
              <span style="font-size:.7rem;color:var(--synology-subtext)">${drive.model || ""}</span>
            </div>
          </div>
          <div class="row-right" style="flex-wrap:wrap;justify-content:flex-start">
            ${synology || temp || mapping?.temperature_entity ? html`<button class="btn" ?disabled=${!temp} @click=${() => temp && this.openMoreInfo(temp.entity_id)}>${formatValue(temp)}</button>` : nothing}
            ${synology || status || smart || mapping?.status_entity || mapping?.smart_entity ? html`<span class="badge ${!known ? "badge-standby" : warning ? "badge-warning" : normal ? "badge-online" : "badge-standby"}">${warning ? "Attention needed" : formatValue(status ?? smart)}</span>` : nothing}
            ${synology || smart || mapping?.smart_entity ? html`<button class="btn" ?disabled=${!smart} @click=${() => smart && this.openMoreInfo(smart.entity_id)}>SMART: ${formatValue(smart)}</button>` : nothing}
          </div>
          ${synology || badSectors || life || mapping?.bad_sectors_entity || mapping?.remaining_life_entity ? html`<div style="width:100%;font-size:.72rem;color:var(--synology-subtext)">
            ${synology || badSectors || mapping?.bad_sectors_entity ? html`Bad-sector threshold: ${usable(badSectors) ? badSectors!.state === "on" ? "Exceeded" : "Not exceeded" : "Unavailable"}` : nothing}
            ${synology || life || mapping?.remaining_life_entity ? html` • Remaining-life threshold: ${usable(life) ? life!.state === "on" ? "Below threshold" : "Not below threshold" : "Unavailable"}` : nothing}
          </div>` : nothing}
          ${mapping && !Object.entries(mapping).some(([key, value]) => key.endsWith("_entity") && value) ? html`<span>Choose this drive's entities in the card editor.</span>` : nothing}
        </div>`;
      })}</div>
      ${!volumes.length && !disks.length ? this.renderNotice(nasSource(this.config) === "manual" ? "Add volumes or drives using entity pickers in the card editor."
        : `No ${synology ? "DSM" : "QNAP"} volumes or drives found for the selected NAS. Enable its storage entities, then refresh discovery.`) : nothing}
    </ha-card>`;
  }
}

registerDashboardCard({
  tag: STORAGE_CARD_TAG, editorTag: STORAGE_EDITOR_TAG, card: SynologyStorageCard, editor: SynologyStorageCardEditor,
  name: "NAS Storage & Disks Card", description: "Synology DSM, QNAP or manually mapped volumes, drive temperatures and SMART readings.",
});
