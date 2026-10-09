import { expect, test } from "@playwright/test";
import { createFixture } from "../fixture";
import type { HomeAssistant } from "../../src/ha-types";
import type { BaseSynologyCard } from "../../src/dashboard-cards-base";
import type { CardConfig } from "../../src/config";

async function mount(page: import("@playwright/test").Page, tag: string, extra: Partial<CardConfig> = {}) {
  const fixture = createFixture();
  await page.goto("/test/browser/fixture.html");
  await page.waitForFunction(() => customElements.get("synology-dashboard-card"));
  await page.evaluate(({ tag, fixture, extra }) => {
    const hass = fixture as HomeAssistant;
    hass.callService = async (domain, service, data) => {
      document.body.dataset.lastAction = JSON.stringify({ domain, service, data });
    };
    const card = document.createElement(tag) as BaseSynologyCard;
    card.setConfig({ type: `custom:${tag}`, server: "nas", portainer_endpoint: "synEndpoint", ...extra });
    card.hass = hass;
    document.querySelector("#cards")!.append(card);
  }, { tag, fixture: JSON.parse(JSON.stringify(fixture)), extra });
}

test("desktop dashboard rings, tab switching and blue branding", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await mount(page, "synology-dashboard-card");
  await expect(page.getByText("18%", { exact: true })).toBeVisible();
  await expect(page.getByText("42%", { exact: true })).toBeVisible();
  await expect(page.getByText("Download", { exact: true })).toBeVisible();
  await expect(page.getByText("Upload", { exact: true })).toBeVisible();
  await expect(page.getByText("1.25 MB/s", { exact: true })).toBeVisible();
  await expect(page.getByText("500 kB/s", { exact: true })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Network", exact: true })).toHaveCount(0);
  expect(await page.locator(".ring-gauge").first().evaluate((element) => getComputedStyle(element).getPropertyValue("--synology-accent").trim())).toBe("#0086d6");
  await page.getByRole("tab", { name: "Storage & Disks" }).click();
  await expect(page.getByText("SMART: normal")).toHaveCount(2);
  await page.getByRole("tab", { name: "Docker", exact: true }).click();
  await expect(page.getByText("Plex", { exact: true })).toBeVisible();
  await expect(page.getByText("Unraid Plex", { exact: true })).toHaveCount(0);
  await page.getByTitle("Start Nginx", { exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-last-action", /"entity_id":"switch.nginx"/);
  await page.getByTitle("Restart Plex", { exact: true }).click();
  await expect(page.locator("body")).toHaveAttribute("data-last-action", /"entity_id":"button.plex_restart"/);
  await page.screenshot({ path: "test-results/synology-docker-desktop.png", fullPage: true });
  expect(errors).toEqual([]);
});

test("mobile cards do not overflow and controls remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mount(page, "synology-dashboard-card");
  await expect(page.getByText("18%", { exact: true })).toBeVisible();
  await page.screenshot({ path: "test-results/synology-overview-mobile.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.getByRole("tab", { name: "Storage & Disks" }).click();
  await expect(page.getByText("SMART: normal").first()).toBeVisible();
  await page.screenshot({ path: "test-results/synology-storage-mobile.png", fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.getByRole("tab", { name: "Docker", exact: true }).click();
  await expect(page.getByTitle("Start Offline", { exact: true })).toBeDisabled();
  await page.getByTitle("Toggle View Mode").click();
  await expect(page.getByText("12.5% CPU").first()).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test("more-info keyboard interaction and only supported dashboard tabs", async ({ page }) => {
  await mount(page, "synology-dashboard-card");
  await page.evaluate(() => document.addEventListener("hass-more-info", (event) => {
    document.body.dataset.moreInfo = (event as CustomEvent<{ entityId: string }>).detail.entityId;
  }));
  await page.locator(".ring-card").first().focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("body")).toHaveAttribute("data-more-info", "sensor.renamed_cpu");
  await expect(page.getByRole("tab")).toHaveCount(3);
  await expect(page.getByRole("tab", { name: "Shares", exact: true })).toHaveCount(0);
  await expect(page.getByRole("tab", { name: "VMs", exact: true })).toHaveCount(0);
});

test("visual editor preserves selections and entity overrides", async ({ page }) => {
  await mount(page, "synology-server-card");
  await page.evaluate(() => {
    const card = document.querySelector("synology-server-card") as BaseSynologyCard;
    const editor = document.createElement("synology-dashboard-card-editor") as HTMLElement & {
      hass?: HomeAssistant; setConfig(config: CardConfig): void;
    };
    editor.hass = card.hass;
    editor.setConfig({ type: "custom:synology-dashboard-card" });
    editor.addEventListener("config-changed", (event) => {
      document.body.dataset.editorConfig = JSON.stringify((event as CustomEvent<{ config: CardConfig }>).detail.config);
    });
    document.querySelector("#cards")!.replaceChildren(editor);
  });
  await page.getByLabel("Synology NAS", { exact: true }).selectOption("nas");
  await page.getByLabel("Synology Portainer endpoint", { exact: true }).selectOption("synEndpoint");
  await page.getByLabel("Container layout", { exact: true }).selectOption("list");
  await page.getByText("Visible dashboard tabs", { exact: true }).click();
  await page.getByLabel("Storage & Disks", { exact: true }).uncheck();
  const config = await page.locator("body").getAttribute("data-editor-config");
  expect(JSON.parse(config!)).toMatchObject({ server: "nas", portainer_endpoint: "synEndpoint", view_mode: "list" });
  expect(JSON.parse(config!).tabs).toEqual(["overview", "docker"]);
});
