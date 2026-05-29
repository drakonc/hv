import { defineConfig } from "astro/config";

const isDev = process.env.NODE_ENV !== "production";

export default defineConfig({
  output: "static",
  site: "https://drakonc.github.io",
  base: isDev ? "/" : "/hv",
});
