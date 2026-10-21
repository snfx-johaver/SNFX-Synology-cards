export const SERVER_CARD_TAG = "synology-server-card";
export const SERVER_EDITOR_TAG = "synology-server-card-editor";

export const STORAGE_CARD_TAG = "synology-storage-card";
export const STORAGE_EDITOR_TAG = "synology-storage-card-editor";

export const DOCKER_CARD_TAG = "synology-docker-card";
export const DOCKER_EDITOR_TAG = "synology-docker-card-editor";

export const DASHBOARD_CARD_TAG = "synology-dashboard-card";
export const DASHBOARD_EDITOR_TAG = "synology-dashboard-card-editor";

export interface ManualContainerConfig {
  name?: string;
  status_entity: string;
  running_state?: string;
  stopped_state?: string;
  cpu_entity?: string;
  memory_entity?: string;
  power_entity?: string;
  start_entity?: string;
  stop_entity?: string;
  restart_entity?: string;
}

export function containerStates(container: ManualContainerConfig): { running: string; stopped: string } {
  const binary = ["switch", "binary_sensor", "input_boolean"].includes(container.status_entity.split(".")[0]!);
  return {
    running: container.running_state || (binary ? "on" : "running"),
    stopped: container.stopped_state || (binary ? "off" : "exited"),
  };
}

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
  container_source?: "disabled" | "portainer" | "manual";
  containers?: ManualContainerConfig[];
  entities?: Record<string, string>;
  tabs?: string[];
  [key: string]: unknown;
}

export function containerSource(config: CardConfig): NonNullable<CardConfig["container_source"]> {
  return config.container_source ?? (config.portainer_endpoint ? "portainer"
    : config.containers?.length ? "manual" : config.type.includes("docker") ? "portainer" : "disabled");
}
