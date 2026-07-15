import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { site } from "./src/config/site.ts";

export default defineConfig({
  site: site.url,
  output: "static",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Homepage gets highest priority
        if (item.url === `${site.url}/`) {
          item.changefreq = "daily";
          item.priority = 1.0;
        } // Content pages
        else if (item.url.includes("/history") || item.url.includes("/usage")) {
          item.changefreq = "monthly";
          item.priority = 0.8;
        } // Other pages
        else if (
          item.url.includes("/alternatives") ||
          item.url.includes("/lorem-ipsum-api") ||
          item.url.includes("/dummy-text-generator-ui") ||
          item.url.includes("/placeholder-text-figma")
        ) {
          item.changefreq = "monthly";
          item.priority = 0.6;
        } // Programmatic use-case pages (lower priority, larger set)
        else if (item.url.includes("/lorem-ipsum-for/")) {
          item.changefreq = "monthly";
          item.priority = 0.5;
        } // Legal/static pages
        else if (
          item.url.includes("/privacy") ||
          item.url.includes("/terms") ||
          item.url.includes("/contact")
        ) {
          item.changefreq = "yearly";
          item.priority = 0.3;
        }
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: "esbuild",
    },
  },
});
