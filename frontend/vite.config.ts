import { defineConfig } from "vitest/config";
import { readFileSync } from "node:fs";

const bundledLicenses = [...new Set(
  ["lit", "lit-html", "lit-element", "@lit/reactive-element", "@mdi/js"].map((name) =>
    readFileSync(new URL(`./node_modules/${name}/LICENSE`, import.meta.url), "utf8").trim()
  )
)].join("\n\n");
const apacheLicense = readFileSync(new URL("../LICENSE", import.meta.url), "utf8").trim();
const licenseBanner = `/*!\nSNFX Synology Cards, Apache-2.0.\nAdapted from ruaan-deysel/ha-unraid, revision c816d9fd113df51c66ffde050a8dba52c799b2e1.\nModified for Synology DSM, Portainer and standalone HACS distribution.\n\n${apacheLicense}\n\nBundled third-party licenses (Lit and Material Design Icons):\n\n${bundledLicenses}\n*/`;

function finalizeBundle() {
  return {
    name: "finalize-bundle",
    generateBundle(_options: unknown, bundle: Record<string, { type: string; code?: string }>) {
      for (const file of Object.values(bundle)) {
        if (file.type === "chunk" && file.code) {
          // Replace minified `[ \t\n\f\r]` with "[ \\t\\n\\f\\r]" to eliminate literal trailing whitespace
          file.code = file.code.replace(/`\[ \t\n\\f\\r\]`/g, '"[ \\t\\n\\f\\r]"');
          file.code = `${licenseBanner}\n${file.code}`.replace(/\r\n/g, "\n");
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [finalizeBundle()],
  build: {
    modulePreload: false,
    outDir: "../dist",
    emptyOutDir: true,
    target: "es2022",
    minify: true,
    sourcemap: false,
    reportCompressedSize: false,
    rollupOptions: {
      input: {
        "synology-cards": "src/index.ts",
      },
      output: {
        format: "es",
        entryFileNames: "[name].js",
        chunkFileNames: "[name]-[hash].js",
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["test/setup.ts"],
    include: ["test/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      exclude: ["src/index.ts"],
      thresholds: { lines: 80 },
      reporter: ["text-summary"],
    },
  },
});
