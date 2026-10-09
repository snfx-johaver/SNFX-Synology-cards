import { css } from "lit";

export const themeTokens = css`
  :host {
    --synology-primary: #0086d6;
    --synology-accent: #0086d6;
    --synology-online: var(--success-color, #2ecc71);
    --synology-warning: var(--warning-color, #f39c12);
    --synology-error: var(--error-color, #e74c3c);
    --synology-standby: var(--disabled-text-color, #7f8c8d);
    --synology-info: var(--info-color, #3498db);
    --synology-card-bg: var(--ha-card-background, var(--card-background-color, #1c1c20));
    --synology-border: var(--ha-card-border-color, var(--divider-color, rgba(255, 255, 255, 0.08)));
    --synology-radius: var(--ha-card-border-radius, 12px);
    --synology-text: var(--primary-text-color, #e1e1e6);
    --synology-subtext: var(--secondary-text-color, #8a8a93);
  }
`;
