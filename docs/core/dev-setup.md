# Dev Setup

## Running locally

```bash
pnpm install
pnpm dev       # http://localhost:4321
pnpm build     # production build
pnpm preview   # preview the production build
pnpm astro check  # TypeScript/Astro validation
```

## Testing the generator

1. **Generator**: change count/unit/format/style, try preset buttons, toggle
   "Start with classic opening", click Generate or press `Ctrl+G` (`⌘+G` on
   Mac).
2. **Copy**: click "Copy to Clipboard" or press `Ctrl+K` (`⌘+K` on Mac).
3. **Dark mode**: click the sun/moon icon in the header — persists to
   `localStorage`.
4. **Responsive**: resize the browser, or run `pnpm dev --host` to test on a
   real mobile device on the same network.

## First-time configuration

Before deploying for real:

- Update `site` in `astro.config.mjs` to your actual domain.
- AdSense Publisher ID + ad slot IDs — see
  [`adsense-setup.md`](./adsense-setup.md).
- GA4 measurement ID in `BaseHead.astro` (same placeholder-now pattern as
  AdSense) if you want the `copy_click` analytics event to actually report
  anywhere.

For SEO/content strategy see [`seo-optimization.md`](./seo-optimization.md); for
shipping it see [`deployment.md`](./deployment.md).

## Customization

**Colors/theme** — CSS variables in `src/styles/global.css`:

```css
:root {
  --accent: #3b82f6;
  --accent-hover: #2563eb;
  /* ... */
}
```

**Word banks** — `src/lib/word-bank.ts` (classic Latin + pirate/tech/startup
themes). **Generator logic** — `src/lib/lorem-generator.ts`.

## Troubleshooting

**Build errors**

```bash
rm -rf node_modules pnpm-lock.yaml dist
pnpm install
pnpm build
```

**TypeScript errors**

```bash
pnpm astro check
```

**Dev server won't start / port in use**

```bash
lsof -ti:4321 | xargs kill -9
pnpm dev
```
