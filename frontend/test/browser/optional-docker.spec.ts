import { expect, test } from "@playwright/test";
import { createFixture } from "../fixture";
import type { BaseSynologyCard } from "../../src/dashboard-cards-base";
import type { SynologyCardEditor } from "../../src/dashboard-cards-editor";
import type { HomeAssistant } from "../../src/ha-types";

test("DSM-only installation does not register Docker cards or expose Docker settings", async ({ page }) => {
  await page.goto("/test/browser/fixture-dsm.html");
  await page.waitForFunction(() => customElements.get("synology-dashboard-card"));
  await page.evaluate((fixture) => {
    const hass = fixture as HomeAssistant;
    hass.callService = async () => undefined;
    const card = document.createElement("synology-dashboard-card") as BaseSynologyCard;
    // Old saved Docker selections cannot reactivate disabled features.
    card.setConfig({ type: "custom:synology-dashboard-card", server: "nas", tabs: ["docker", "overview", "storage"], portainer_endpoint: "synEndpoint" });
    card.hass = hass;
    const editor = document.createElement("synology-dashboard-card-editor") as SynologyCardEditor;
    editor.setConfig(card.config);
    editor.hass = hass;
    document.querySelector("#cards")!.append(card, editor);
  }, JSON.parse(JSON.stringify(createFixture())));
  expect(await page.evaluate(() => window.customCards?.map((card) => card.type))).toEqual([
    "synology-server-card", "synology-storage-card", "synology-dashboard-card",
  ]);
  expect(await page.evaluate(() => customElements.get("synology-docker-card") !== undefined)).toBe(false);
  expect(await page.evaluate(() => customElements.get("synology-docker-card-editor") !== undefined)).toBe(false);
  await expect(page.getByRole("tab")).toHaveCount(2);
  await expect(page.getByRole("tab", { name: "Docker", exact: true })).toHaveCount(0);
  await expect(page.getByLabel("Synology Portainer endpoint", { exact: true })).toHaveCount(0);
  await expect(page.getByLabel("Container layout", { exact: true })).toHaveCount(0);
  await page.getByText("Visible dashboard tabs", { exact: true }).click();
  await expect(page.getByRole("checkbox", { name: "Docker", exact: true })).toHaveCount(0);
  await page.getByRole("tab", { name: "Storage & Disks" }).click();
  await expect(page.getByText("SMART: normal")).toHaveCount(2);
});
