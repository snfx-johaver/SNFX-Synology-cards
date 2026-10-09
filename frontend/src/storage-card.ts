import { html, nothing, type TemplateResult } from "lit";
import { STORAGE_CARD_TAG, STORAGE_EDITOR_TAG } from "./config";
import { BaseSynologyCard } from "./dashboard-cards-base";
import { SynologyStorageCardEditor } from "./dashboard-cards-editor";
import { bytes, deviceEntity, entityMatches, formatBytes, formatValue, nasChildren, percentage, storageSummary, usable, volumeData } from "./data";
import { iconTemplate, mdiHarddisk } from "./icons";
import { registerDashboardCard } from "./register-dashboard-card";

export class SynologyStorageCard extends BaseSynologyCard {
  static override editorTag = STORAGE_EDITOR_TAG;

  protected override render(): TemplateResult {
    const volumes = volumeData(this.hass, this.config, this.registries);
    const summary = storageSummary(this.hass, this.config, this.registries);
    const disks = nasChildren(this.config, this.registries).filter((device) =>
      Object.values(this.registries.entities).some((entity) => entity.device_id === device.id &&
        (entityMatches(entity, "disk_status") || entity.entity_id.endsWith("_disk_status")))
    );
    return html`<ha-card>
      ${this.renderHeader(this.config.title || "Storage Volumes & Disks",
        `${formatBytes(summary.used)} used of ${formatBytes(summary.total)}`, mdiHarddisk,
        html`<span class="badge badge-standby">${volumes.length} Volumes • ${disks.length} Drives</span>`)}
      ${this.renderErrors()}
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="display:flex;justify-content:space-between;font-size:.76rem;font-weight:600"><span>Total Volume Capacity</span><span>${summary.percent === undefined ? "Unavailable" : `${summary.percent}%`}</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, summary.percent ?? 0)}%"></div></div>
      </div>
      <div class="item-list">${volumes.map((volume) => {
        const pct = percentage(volume.usage);
        const total = bytes(volume.total);
        const used = bytes(volume.used);
        const status = usable(volume.status) ? volume.status!.state : "Unavailable";
        const normal = ["normal", "healthy"].includes(status.toLowerCase());
        return html`<div class="list-row" style="flex-direction:column;align-items:stretch;gap:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <button class="btn" ?disabled=${!volume.usage} @click=${() => volume.usage && this.openMoreInfo(volume.usage.entity_id)}>${iconTemplate(mdiHarddisk, 16)} ${volume.device.name_by_user || volume.device.name}</button>
            <span class="badge ${!usable(volume.status) ? "badge-standby" : normal ? "badge-online" : "badge-warning"}">${status}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.75rem"><span>${formatBytes(used)} / ${formatBytes(total)}</span><span>${pct === undefined ? "--" : `${pct}%`}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${pct ?? 0}%"></div></div>
          <div style="font-size:.72rem;color:var(--synology-subtext)">${total !== undefined && used !== undefined ? `${formatBytes(Math.max(0, total - used))} free • ` : ""}Average drive temperature: ${formatValue(volume.temperature)}</div>
        </div>`;
      })}</div>
      <div class="divider"></div>
      <div class="section-title">Physical Drives</div>
      <div class="item-list">${disks.map((device) => {
        const get = (key: string, domain = "sensor") => deviceEntity(this.hass, this.registries, device.id, key, domain);
        const status = get("disk_status");
        const smart = get("disk_smart_status");
        const temp = get("disk_temp");
        const badSectors = get("disk_exceed_bad_sector_thr", "binary_sensor");
        const life = get("disk_below_remain_life_thr", "binary_sensor");
        const warning = [badSectors, life].some((entity) => usable(entity) && entity!.state === "on") ||
          [status, smart].some((entity) => usable(entity) && !["normal", "healthy", "good"].includes(entity!.state.toLowerCase()));
        const known = usable(status);
        return html`<div class="list-row" style="flex-direction:column;align-items:stretch;gap:10px">
          <div class="row-left" style="min-width:0">
            <div style="color:var(--synology-accent)">${iconTemplate(mdiHarddisk, 20)}</div>
            <div style="display:flex;flex-direction:column;min-width:0">
              <button class="btn" style="justify-content:flex-start;white-space:normal;text-align:left" ?disabled=${!status} @click=${() => status && this.openMoreInfo(status.entity_id)}>${device.name_by_user || device.name}</button>
              <span style="font-size:.7rem;color:var(--synology-subtext)">${device.model || ""}</span>
            </div>
          </div>
          <div class="row-right" style="flex-wrap:wrap;justify-content:flex-start">
            <button class="btn" ?disabled=${!temp} @click=${() => temp && this.openMoreInfo(temp.entity_id)}>${formatValue(temp)}</button>
            <span class="badge ${!known ? "badge-standby" : warning ? "badge-warning" : "badge-online"}">${warning ? "Attention needed" : formatValue(status)}</span>
            <button class="btn" ?disabled=${!smart} @click=${() => smart && this.openMoreInfo(smart.entity_id)}>SMART: ${formatValue(smart)}</button>
          </div>
          <div style="width:100%;font-size:.72rem;color:var(--synology-subtext)">
            Bad-sector threshold: ${usable(badSectors) ? badSectors!.state === "on" ? "Exceeded" : "Not exceeded" : "Unavailable"} •
            Remaining-life threshold: ${usable(life) ? life!.state === "on" ? "Below threshold" : "Not below threshold" : "Unavailable"}
          </div>
        </div>`;
      })}</div>
      ${!volumes.length && !disks.length ? this.renderNotice("No DSM volumes or drives found for the selected NAS. Enable its storage entities, then refresh discovery.") : nothing}
      ${this.renderCapability("DSM does not expose scrub/rebuild progress, drive capacity usage, read/write I/O or spin controls as Home Assistant entities. Enable disabled SMART and volume total-size sensors to fill those supported fields.")}
    </ha-card>`;
  }
}

registerDashboardCard({
  tag: STORAGE_CARD_TAG, editorTag: STORAGE_EDITOR_TAG, card: SynologyStorageCard, editor: SynologyStorageCardEditor,
  name: "Synology Storage & Disks Card", description: "Volumes, physical drive temperatures, SMART and threshold alerts.",
});
