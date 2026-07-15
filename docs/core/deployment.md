# Deployment

## Cloudflare Pages (recommended)

1. Connect the GitHub repository to Cloudflare Pages.
2. Build settings:
   - **Build command**: `pnpm build`
   - **Output directory**: `dist`
   - **Node version**: 18 or 20
3. Deploy command: leave blank (automatic).

This is a Pages project, not Workers — no `wrangler.toml` needed.

## Netlify

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"
```

## Vercel

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist"
}
```

## GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Performance targets

- **Lighthouse score**: > 95/100
- **Page load**: < 2 seconds
- **Core Web Vitals**: all "Good" (LCP < 2.5s, FID < 100ms, CLS < 0.1)

Run an audit before/after deploying:

```bash
pnpm build
pnpm preview
# Open Chrome DevTools > Lighthouse
```

## Pre-deploy checklist

- [ ] `pnpm build` succeeds with no errors
- [ ] Real AdSense Publisher ID + ad slot IDs set (see `adsense-setup.md`)
- [ ] `astro.config.mjs` `site` matches the real domain
- [ ] OG image renders correctly in a social share preview
- [ ] Sitemap submitted to Search Console / Bing Webmaster Tools
