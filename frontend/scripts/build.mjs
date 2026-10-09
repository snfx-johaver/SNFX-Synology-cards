import { build } from "vite";
import { copyFile, mkdir } from "node:fs/promises";

await build();
await build({ mode: "dsm" });
await mkdir("../dist", { recursive: true });
await copyFile("../custom_components/synology_cards/www/synology-cards.js", "../dist/synology-cards.js");
