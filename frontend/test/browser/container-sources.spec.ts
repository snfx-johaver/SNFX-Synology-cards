import { expect, test } from "@playwright/test";
import { createFixture } from "../fixture";
import type { BaseSynologyCard } from "../../src/dashboard-cards-base";
import type { SynologyCardEditor } from "../../src/dashboard-cards-editor";
import type { HomeAssistant } from "../../src/ha-types";

test("source selection hides Docker per card and preserves legacy Portainer settings", async ({ page }) => {
  await page.goto("/test/browser/fixture.html");
  await page.waitForFunction(() => customElements.get("synology-dashboard-card"));
  await page.evaluate((fixture) => {
    const hass = fixture as HomeAssistant;
    hass.callService = async () => undefined;
    const card = document.createElement("synology-dashboard-card") as BaseSynologyCard;
    card.setConfig({ type: "custom:synology-dashboard-card", server: "nas", portainer_endpoint: "synEndpoint" });
    card.hass = hass;
    const editor = document.createElement("synology-dashboard-card-editor") as SynologyCardEditor;
    editor.setConfig(card.config);
    editor.hass = hass;
    editor.addEventListener("config-changed", () => card.setConfig(editor._config!));
    document.querySelector("#cards")!.append(card, editor);
  }, JSON.parse(JSON.stringify(createFixture())));
  await expect(page.getByRole("tab", { name: "Docker", exact: true })).toBeVisible();
  await expect(page.getByLabel("Container source", { exact: true })).toHaveValue("portainer");
  await page.getByLabel("Container source", { exact: true }).selectOption("disabled");
  await expect(page.getByRole("tab", { name: "Docker", exact: true })).toHaveCount(0);
  await expect(page.getByLabel("Portainer endpoint", { exact: true })).toHaveCount(0);
  await expect(page.getByLabel("Container layout", { exact: true })).toHaveCount(0);
  await page.getByLabel("Container source", { exact: true }).selectOption("portainer");
  await expect(page.getByLabel("Portainer endpoint", { exact: true })).toHaveValue("synEndpoint");
  await page.getByRole("tab", { name: "Docker", exact: true }).click();
  await expect(page.getByText("Plex", { exact: true })).toBeVisible();
  await expect(page.getByText("Unraid Plex", { exact: true })).toHaveCount(0);
});

test("manual entities render without device registries, update live, and call only mapped controls", async ({ page }) => {
  await page.goto("/test/browser/fixture.html");
  await page.waitForFunction(() => customElements.get("synology-docker-card"));
  await page.evaluate(() => {
    const entity = (entity_id: string, state: string, unit?: string) => ({
      entity_id, state, attributes: unit ? { unit_of_measurement: unit } : {}, last_changed: "", last_updated: "",
    });
    const hass: HomeAssistant = {
      states: {
        "sensor.container_status": entity("sensor.container_status", "stopped"),
        "sensor.container_cpu": entity("sensor.container_cpu", "12.345", "%"),
        "sensor.container_memory": entity("sensor.container_memory", "512", "MiB"),
        "button.container_start": entity("button.container_start", "unknown"),
        "script.container_stop": entity("script.container_stop", "off"),
      },
      callService: async (domain, service, data) => {
        document.body.dataset.lastAction = JSON.stringify({ domain, service, data });
      },
    };
    const card = document.createElement("synology-dashboard-card") as BaseSynologyCard;
    card.setConfig({
      type: "custom:synology-dashboard-card", container_source: "manual", tabs: ["docker"], view_mode: "list",
      containers: [{
        name: "Manual media", status_entity: "sensor.container_status", stopped_state: "stopped",
        cpu_entity: "sensor.container_cpu", memory_entity: "sensor.container_memory",
        start_entity: "button.container_start", stop_entity: "script.container_stop",
      }],
    });
    card.hass = hass;
    document.querySelector("#cards")!.append(card);
  });
  await expect(page.getByText("Manual media", { exact: true })).toBeVisible();
  await expect(page.getByText("12.35% CPU", { exact: true })).toBeVisible();
  await expect(page.getByText("0.54 GB", { exact: true })).toBeVisible();
  await expect(page.getByTitle("Restart Manual media")).toHaveCount(0);
  await page.getByTitle("Start Manual media").click();
  await expect(page.locator("body")).toHaveAttribute("data-last-action", /"domain":"button","service":"press"/);
  await page.evaluate(() => {
    const card = document.querySelector("synology-dashboard-card") as BaseSynologyCard;
    card.hass = { ...card.hass!, states: { ...card.hass!.states, "sensor.container_status": {
      ...card.hass!.states["sensor.container_status"]!, state: "running",
    } } };
  });
  await expect(page.getByTitle("Stop Manual media")).toBeEnabled();
  page.once("dialog", (dialog) => dialog.dismiss());
  await page.getByTitle("Stop Manual media").click();
  await expect(page.locator("body")).toHaveAttribute("data-last-action", /"domain":"button"/);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByTitle("Stop Manual media").click();
  await expect(page.locator("body")).toHaveAttribute("data-last-action", /"domain":"script","service":"turn_on"/);
  await page.evaluate(() => {
    const card = document.querySelector("synology-dashboard-card") as BaseSynologyCard;
    card.hass = { ...card.hass!, states: { ...card.hass!.states, "sensor.container_status": {
      ...card.hass!.states["sensor.container_status"]!, state: "restarting",
    } } };
  });
  await expect(page.getByTitle("Start Manual media")).toBeDisabled();
  await expect(page.getByText("restarting", { exact: true })).toBeVisible();
});

test("manual editor mappings survive save, source switches and container removal", async ({ page }) => {
  await page.goto("/test/browser/fixture.html");
  await page.waitForFunction(() => customElements.get("synology-docker-card-editor"));
  await page.evaluate(() => {
    const editor = document.createElement("synology-docker-card-editor") as SynologyCardEditor;
    editor.hass = { states: {}, callService: async () => undefined };
    editor.setConfig({ type: "custom:synology-docker-card", container_source: "manual" });
    editor.addEventListener("config-changed", () => document.body.dataset.config = JSON.stringify(editor._config));
    document.querySelector("#cards")!.append(editor);
  });
  await page.getByRole("button", { name: "Add container", exact: true }).click();
  await page.getByLabel("Name (optional)", { exact: true }).fill("Manual test");
  await page.evaluate(() => {
    const editor = document.querySelector("synology-docker-card-editor") as SynologyCardEditor;
    editor.shadowRoot!.querySelector("ha-entity-picker")!.dispatchEvent(
      new CustomEvent("value-changed", { detail: { value: "sensor.custom" } }),
    );
    editor.setConfig(editor._config!);
  });
  expect(JSON.parse((await page.locator("body").getAttribute("data-config"))!).containers).toEqual([
    { name: "Manual test", status_entity: "sensor.custom" },
  ]);
  await page.getByLabel("Container source", { exact: true }).selectOption("disabled");
  await expect(page.getByRole("button", { name: "Add container", exact: true })).toHaveCount(0);
  await page.getByLabel("Container source", { exact: true }).selectOption("manual");
  await expect(page.getByLabel("Name (optional)", { exact: true })).toHaveValue("Manual test");
  await page.getByRole("button", { name: "Remove container 1", exact: true }).click();
  expect(JSON.parse((await page.locator("body").getAttribute("data-config"))!).containers).toEqual([]);
});
