import { html, nothing, type TemplateResult } from "lit";
import { DASHBOARD_CARD_TAG, DASHBOARD_EDITOR_TAG } from "./config";
import { BaseSynologyCard } from "./dashboard-cards-base";
import { SynologyDashboardCardEditor } from "./dashboard-cards-editor";
import { iconTemplate, mdiDocker, mdiHarddisk, mdiServer } from "./icons";
import { registerDashboardCard } from "./register-dashboard-card";
import { PORTAINER_ENABLED } from "./features";
import "./server-card";
import "./storage-card";

const tabs = [
  { key: "overview", label: "Overview", icon: mdiServer },
  { key: "storage", label: "Storage & Disks", icon: mdiHarddisk },
  { key: "docker", label: "Docker", icon: mdiDocker },
];

export class SynologyDashboardCard extends BaseSynologyCard {
  static override editorTag = DASHBOARD_EDITOR_TAG;
  static override properties = { ...BaseSynologyCard.properties, _activeTab: { state: true } };
  declare _activeTab: string;
  constructor() { super(); this._activeTab = "overview"; }
  protected override render(): TemplateResult {
    const device = this.getActiveDevice();
    const visible = tabs.filter((tab) => (PORTAINER_ENABLED || tab.key !== "docker") && (!this.config.tabs || this.config.tabs.includes(tab.key)));
    const active = visible.some((tab) => tab.key === this._activeTab) ? this._activeTab : visible[0]?.key;
    const child = (type: string) => ({ ...this.config, title: undefined, type: `custom:synology-${type}-card`, embedded: true });
    return html`<ha-card style="gap:12px">
      ${this.renderHeader(`${this.config.title || device?.name_by_user || device?.name || "Synology NAS"} Dashboard`, "Unified Synology Control Center", mdiServer)}
      ${this.renderErrors()}
      <div class="tab-strip" role="tablist" aria-label="Synology dashboard">
        ${visible.map((tab) => html`<button role="tab" aria-selected=${active === tab.key} class="tab-btn ${active === tab.key ? "active" : ""}"
          @click=${() => this._activeTab = tab.key}>${iconTemplate(tab.icon, 14)} ${tab.label}</button>`)}
      </div><div role="tabpanel">
        ${active === "overview" ? html`<synology-server-card .hass=${this.hass} .config=${child("server")}></synology-server-card>` : nothing}
        ${active === "storage" ? html`<synology-storage-card .hass=${this.hass} .config=${child("storage")}></synology-storage-card>` : nothing}
        ${active === "docker" ? html`<synology-docker-card .hass=${this.hass} .config=${child("docker")}></synology-docker-card>` : nothing}
        ${!active ? this.renderNotice("All tabs are hidden. Enable tabs in the card editor.") : nothing}
      </div>
    </ha-card>`;
  }
}
registerDashboardCard({
  tag: DASHBOARD_CARD_TAG, editorTag: DASHBOARD_EDITOR_TAG, card: SynologyDashboardCard, editor: SynologyDashboardCardEditor,
  name: "Synology Unified Dashboard Card", description: "Tabbed Synology DSM and endpoint-scoped Portainer dashboard.",
});
