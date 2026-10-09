export const SERVER_CARD_TAG = "synology-server-card";
export const SERVER_EDITOR_TAG = "synology-server-card-editor";

export const STORAGE_CARD_TAG = "synology-storage-card";
export const STORAGE_EDITOR_TAG = "synology-storage-card-editor";

export const DOCKER_CARD_TAG = "synology-docker-card";
export const DOCKER_EDITOR_TAG = "synology-docker-card-editor";

export const DASHBOARD_CARD_TAG = "synology-dashboard-card";
export const DASHBOARD_EDITOR_TAG = "synology-dashboard-card-editor";

export interface CardConfig {
  type: string;
  server?: string;
  name?: string;
  title?: string;
  view_mode?: "grid" | "list";
  show_system_info?: boolean;
  show_motherboard?: boolean;
  embedded?: boolean;
  hide_header?: boolean;
  portainer_endpoint?: string;
  entities?: Record<string, string>;
  tabs?: string[];
  [key: string]: unknown;
}
