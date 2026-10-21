import { expect, test } from "@playwright/test";
import { createQnapFixture } from "../qnap-fixture";
import type { BaseSynologyCard } from "../../src/dashboard-cards-base";
import type { SynologyCardEditor } from "../../src/dashboard-cards-editor";
import type { HomeAssistant } from "../../src/ha-types";

async function mountEditor(page: import("@playwright/test").Page) {
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
    editor.addEventListener("config-changed", () => {
      card.setConfig(editor._config!);
      document.body.dataset.config = JSON.stringify(editor._config);
    });
    document.querySelector("#cards")!.append(card, editor);
  }, JSON.parse(JSON.stringify(createQnapFixture())));
}

test("NAS system UI selects QNAP and scopes volumes, drives and interfaces without changing containers", async ({ page }) => {
  await mountEditor(page);
  await expect(page.getByText("18.00%", { exact: true })).toBeVisible();
  await expect(page.getByLabel("NAS system", { exact: true })).toHaveValue("synology_dsm");
  await page.getByLabel("NAS system", { exact: true }).selectOption("qnap");
  await expect(page.getByText("18.00%", { exact: true })).toHaveCount(0);
  await expect(page.getByLabel("QNAP NAS", { exact: true }).locator("option")).toHaveCount(3);
  await page.getByLabel("QNAP NAS", { exact: true }).selectOption("qnap");
  await expect(page.getByText("17.13%", { exact: true })).toBeVisible();
  await expect(page.getByText("QTS 5.2", { exact: true })).toBeVisible();
  await expect(page.getByText("Security Advisor", { exact: true })).toHaveCount(0);
  await expect(page.getByText("1.25 MB/s", { exact: true })).toHaveCount(0);
  await page.getByLabel("Network interface", { exact: true }).selectOption("eth0");
  await expect(page.getByText("1.25 MB/s", { exact: true })).toBeVisible();
  await expect(page.getByText("1 Mbit/s", { exact: true })).toBeVisible();
  await page.getByRole("tab", { name: "Storage & Disks" }).click();
  await expect(page.getByRole("button", { name: "Backup", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Data_Volume_1", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "NVMe_2", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "SATA 1", exact: true })).toBeVisible();
  await expect(page.getByText("SMART: GOOD", { exact: true })).toBeVisible();
  await expect(page.getByText("OTHER NAS VOLUME", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Bad-sector threshold:", { exact: false })).toHaveCount(0);
  await page.getByRole("tab", { name: "Docker", exact: true }).click();
  await expect(page.getByText("Plex", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Portainer endpoint", { exact: true })).toHaveValue("synEndpoint");
  await page.getByLabel("NAS system", { exact: true }).selectOption("synology_dsm");
  await page.getByLabel("Synology NAS", { exact: true }).selectOption("nas");
  await page.getByRole("tab", { name: "Overview", exact: true }).click();
  await expect(page.getByText("18.00%", { exact: true })).toBeVisible();
});

test("manual NAS overview, volumes and drives can be configured entirely in the visual editor", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mountEditor(page);
  await page.getByLabel("Container source", { exact: true }).selectOption("disabled");
  await page.getByLabel("NAS system", { exact: true }).selectOption("manual");
  await expect(page.getByLabel("Synology NAS", { exact: true })).toHaveCount(0);
  await page.getByLabel("NAS name (optional)", { exact: true }).fill("My manual NAS");
  await page.evaluate(() => {
    const editor = document.querySelector("synology-dashboard-card-editor") as SynologyCardEditor;
    const picker = [...editor.shadowRoot!.querySelectorAll<HTMLElement & { label: string }>("ha-entity-picker")]
      .find((element) => element.label === "CPU utilization (%)")!;
    picker.dispatchEvent(new CustomEvent("value-changed", { detail: { value: "sensor.q_cpu_renamed" } }));
  });
  await expect(page.getByText("17.13%", { exact: true })).toBeVisible();
  await page.getByText("Manual volumes", { exact: true }).click();
  await page.getByRole("button", { name: "Add volume", exact: true }).click();
  await page.getByLabel("Volume name (optional)", { exact: true }).fill("Manual volume");
  await page.getByText("Manual drives", { exact: true }).click();
  await page.getByRole("button", { name: "Add drive", exact: true }).click();
  await page.getByLabel("Drive name (optional)", { exact: true }).fill("Manual drive");
  await page.evaluate(() => {
    const editor = document.querySelector("synology-dashboard-card-editor") as SynologyCardEditor;
    const set = (label: string, value: string) => {
      const picker = [...editor.shadowRoot!.querySelectorAll<HTMLElement & { label: string }>("ha-entity-picker")]
        .find((element) => element.label === label)!;
      picker.dispatchEvent(new CustomEvent("value-changed", { detail: { value } }));
    };
    set("Total capacity", "sensor.volume_total");
    set("Used capacity", "sensor.volume_used");
    set("SMART status", "sensor.disk_smart");
    set("Drive temperature", "sensor.disk_temp");
  });
  await page.getByRole("tab", { name: "Storage & Disks" }).click();
  await expect(page.getByRole("button", { name: "Manual volume", exact: true })).toBeVisible();
  await expect(page.getByText("2 TB / 8 TB", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Manual drive", exact: true })).toBeVisible();
  await expect(page.getByText("SMART: normal", { exact: true })).toBeVisible();
  const config = JSON.parse((await page.locator("body").getAttribute("data-config"))!);
  expect(config).toMatchObject({
    nas_source: "manual", name: "My manual NAS", container_source: "disabled",
    entities: { cpu_usage: "sensor.q_cpu_renamed" },
    volumes: [{ name: "Manual volume", total_entity: "sensor.volume_total", used_entity: "sensor.volume_used" }],
    drives: [{ name: "Manual drive", smart_entity: "sensor.disk_smart", temperature_entity: "sensor.disk_temp" }],
  });
  await page.evaluate(() => {
    const card = document.querySelector("synology-dashboard-card") as BaseSynologyCard;
    const editor = document.querySelector("synology-dashboard-card-editor") as SynologyCardEditor;
    const config = JSON.parse(document.body.dataset.config!);
    card.setConfig(config);
    editor.setConfig(config);
  });
  await expect(page.getByLabel("NAS system", { exact: true })).toHaveValue("manual");
  await expect(page.getByLabel("NAS name (optional)", { exact: true })).toHaveValue("My manual NAS");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test("manual NAS cards do not require registry discovery and keep mapped readings live", async ({ page }) => {
  await page.goto("/test/browser/fixture.html");
  await page.waitForFunction(() => customElements.get("synology-dashboard-card"));
  await page.evaluate(() => {
    const hass: HomeAssistant = {
      states: { "sensor.manual": { entity_id: "sensor.manual", state: "10", attributes: { unit_of_measurement: "%" }, last_changed: "", last_updated: "" } },
      callWS: async () => { throw new Error("Registry must not be requested in manual mode"); },
      callService: async () => undefined,
    };
    const card = document.createElement("synology-dashboard-card") as BaseSynologyCard;
    card.setConfig({ type: "custom:synology-dashboard-card", nas_source: "manual", entities: { cpu_usage: "sensor.manual" } });
    card.hass = hass;
    const editor = document.createElement("synology-dashboard-card-editor") as SynologyCardEditor;
    editor.setConfig(card.config);
    editor.hass = hass;
    document.querySelector("#cards")!.append(card, editor);
  });
  await expect(page.getByText("10.00%", { exact: true })).toBeVisible();
  await expect(page.getByRole("alert")).toHaveCount(0);
  await page.evaluate(() => {
    const card = document.querySelector("synology-dashboard-card") as BaseSynologyCard;
    card.hass = { ...card.hass!, states: { ...card.hass!.states, "sensor.manual": { ...card.hass!.states["sensor.manual"]!, state: "20" } } };
  });
  await expect(page.getByText("20.00%", { exact: true })).toBeVisible();
  await expect(page.getByRole("alert")).toHaveCount(0);
});
