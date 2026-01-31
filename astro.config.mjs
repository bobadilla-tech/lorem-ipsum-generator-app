import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lorem-ipsum.bobadilla.tech',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Homepage gets highest priority
        if (item.url === 'https://lorem-ipsum.bobadilla.tech/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        }
        // Content pages
        else if (item.url.includes('/history') || item.url.includes('/usage')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        }
        // Other pages
        else if (item.url.includes('/alternatives')) {
          item.changefreq = 'monthly';
          item.priority = 0.6;
        }
        // Legal/static pages
        else if (item.url.includes('/privacy') || item.url.includes('/terms') || item.url.includes('/contact')) {
          item.changefreq = 'yearly';
          item.priority = 0.3;
        }
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
    },
  },
});
