# Claude Development Guide - Lorem Ipsum Generator

This document provides context for future Claude sessions working on this
project.

## Project Overview

**Lorem Ipsum Generator** - A modern, ad-optimized web application for
generating Lorem Ipsum text, random emails, URLs, and domain names. Built with
Astro 5, designed for passive income through Google AdSense.

- **Live Site**: https://lorem-ipsum.bobadilla.tech
- **GitHub**: https://github.com/bobadilla-tech/lorem-ipsum-generator-app
- **Inspiration**: [Lorelai](https://github.com/bobadilla-tech/lorelai) (Go
  library)

## Tech Stack & Architecture

### Core Technologies

- **Astro 5.x** - Static site generator (chosen for SEO and performance)
- **TypeScript** - Strict mode enabled
- **pnpm** - Package manager (NOT npm or yarn)
- **Cloudflare Pages** - Deployment platform

### Why Astro?

- Ships ~0KB JavaScript by default (Islands architecture)
- Excellent SEO capabilities (meta tags, structured data, sitemaps)
- Blazing fast static site generation
- Built-in image optimization
- Easy to deploy (free hosting on Cloudflare/Netlify/Vercel)

## Project Structure

```
lorem-ipsum/
├── public/
│   ├── images/
│   │   ├── og-image.png       # 1200x630 PNG for social media
│   │   └── og-image.svg       # Original SVG (keep for reference)
│   ├── favicon.svg
│   └── robots.txt              # Points to sitemap
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BaseHead.astro     # SEO meta tags, OG tags
│   │   │   ├── Header.astro       # Navigation, dark mode toggle
│   │   │   ├── Footer.astro       # Bobadilla Tech branding
│   │   │   └── AdContainer.astro  # Google AdSense wrapper
│   │   └── generator/
│   │       ├── GeneratorControls.astro  # Input controls
│   │       └── OutputDisplay.astro      # Generated text display
│   ├── layouts/
│   │   └── BaseLayout.astro       # Main page wrapper
│   ├── lib/
│   │   ├── lorem-generator.ts     # Core generation algorithm
│   │   └── word-bank.ts           # 180+ Latin words
│   ├── pages/                     # File-based routing
│   │   ├── index.astro           # Homepage + generator
│   │   ├── history.astro         # SEO content
│   │   ├── usage.astro           # SEO content
│   │   ├── alternatives.astro    # SEO content
│   │   ├── privacy.astro         # Legal
│   │   ├── terms.astro           # Legal
│   │   └── contact.astro         # Contact info
│   ├── scripts/
│   │   └── generator-interactive.ts  # Client-side logic
│   └── styles/
│       └── global.css            # CSS variables, theme
├── astro.config.mjs              # Astro config + sitemap
├── package.json
└── tsconfig.json
```

## Core Features

### 1. Lorem Ipsum Generation

- **Algorithm**: Gaussian distribution for natural text variation
  - Sentences: 15 words ±5 (standard deviation)
  - Paragraphs: 5 sentences ±2
- **Word Bank**: 180+ Latin words from Cicero's "De finibus bonorum et malorum"
  (45 BC)
- **Options**:
  - Count selector (1-100)
  - Unit: words, sentences, paragraphs, emails, URLs, domains
  - "Start with Lorem Ipsum" toggle (classic opening)
  - Format: Plain Text, HTML, Markdown

### 2. Random Data Generators

- **Emails**: Realistic fake addresses (gmail, yahoo, hotmail, outlook,
  example.com)
- **URLs**: Random domains with paths (blog, about, products, etc.)
- **Domains**: Random names with TLDs (.com, .net, .org, .io, .dev, .app, .co,
  .tech, .info, .biz)

### 3. UI/UX Features

- **Glassmorphism Design**: Modern frosted glass effects
- **Dark Mode**: System preference detection + localStorage toggle
- **Keyboard Shortcuts**:
  - `Ctrl+G` (Cmd+G) - Generate text
  - `Ctrl+K` (Cmd+K) - Copy to clipboard
- **Preset Buttons**: Quick generation (1, 3, 5, 10 paragraphs/emails/URLs)
- **Copy to Clipboard**: Visual feedback on success
- **Responsive**: Mobile-first design

### 4. Google AdSense Integration

- **4 Strategic Placements**:
  1. Leaderboard (728x90) - Between generator and content
  2. Sticky Sidebar (300x250) - Desktop only
  3. In-Content Rectangle (300x250) - Between sections
  4. Mobile Anchor - Bottom banner (mobile only, dismissible)
- **Revenue Projection**: ~$437/month at 10K visitors (conservative estimate)
- **Configuration**: `src/components/layout/AdContainer.astro`
  - Update `adClient` with your Publisher ID
  - Update `adSlot` IDs in page files

## SEO Optimization

### Meta Tags (BaseHead.astro)

- Title tags (unique per page)
- Meta descriptions (155 characters)
- Keywords (5-10 per page)
- Canonical URLs (prevents duplicate content)
- Open Graph tags (Facebook, LinkedIn)
- Twitter Cards (summary_large_image)

### Structured Data (JSON-LD)

- Schema.org WebApplication markup
- Author: Bobadilla Tech
- Feature list (all generators)
- Price: Free

### Sitemap Configuration

- **Auto-generated** by @astrojs/sitemap
- **Priority Weights**:
  - Homepage: 1.0 (daily updates)
  - History/Usage: 0.8 (monthly updates)
  - Alternatives: 0.6 (monthly updates)
  - Privacy/Terms/Contact: 0.3 (yearly updates)
- **Includes**: lastmod, changefreq, priority
- **Submit to**:
  - Google Search Console: `sitemap-index.xml`
  - Bing Webmaster Tools: `sitemap-index.xml`

### robots.txt

- Allows all crawlers
- Points to sitemap-index.xml

## Important Development Notes

### Package Manager

**ALWAYS use pnpm**, never npm or yarn:

```bash
pnpm install
pnpm dev
pnpm build
```

### Git Best Practices

- `.astro/` is gitignored (auto-generated files)
- `dist/` is gitignored (build output)
- Commit messages include co-authorship:
  ```
  Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
  ```

### Image Requirements

- **OG Image**: Must be PNG (1200x630), not SVG
  - Social media platforms don't support SVG
  - Located at `/public/images/og-image.png`
- **Favicon**: SVG is fine (`/public/favicon.svg`)

### Build Configuration

- **Minification**: esbuild (NOT terser - not installed)
- **Output**: static
- **CSS**: Compressed
- **HTML**: Compressed

### Cloudflare Pages Deployment

- **Build Command**: `pnpm build`
- **Build Output**: `dist`
- **Deploy Command**: Leave blank (automatic)
- **No wrangler.toml needed** (removed - this is Pages, not Workers)

## Branding & Links

### Bobadilla Tech Integration

- **Footer**: Company branding with links
- **"For Developers" Section**:
  - [Lorelai](https://github.com/bobadilla-tech/lorelai) - Go library
  - [Requiems API](https://requiems-api.xyz) - Enterprise API
  - Social links: GitHub, LinkedIn, Website
- **Contact Page**: Full company info

### Design System

**CSS Variables** (global.css):

```css
/* Light Mode */
--accent: #3b82f6 (blue) --bg-primary: #ffffff --bg-secondary: #f1f5f9
  --text-primary: #0f172a --text-secondary: #475569 /* Dark Mode */ --accent:
  #60a5fa --bg-primary: #0f172a --bg-secondary: #1e293b --text-primary: #f8fafc
  --text-secondary: #cbd5e1;
```

## Known Issues & Gotchas

### 1. Astro Script Warnings

Two harmless warnings appear during build:

- AdContainer.astro:23 - `async` attribute on script
- BaseHead.astro:51 - `type` attribute on JSON-LD script **Solution**: Ignore
  these - they're just hints, not errors

### 2. Social Media Image

- Must use PNG, not SVG
- WhatsApp/Facebook/Twitter won't show SVG previews
- Always test sharing after deployment

### 3. Cloudflare Pages vs Workers

- This is a **Pages project**, not Workers
- Don't use `wrangler deploy` or Workers config
- Pages auto-deploys from Git

## Performance Targets

- **Lighthouse Score**: > 95/100
- **Page Load**: < 2 seconds
- **Core Web Vitals**: All "Good"
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

## Future Enhancements (CHANGELOG.md)

### Phase 2 (Optional)

- [ ] Google Analytics 4 integration
- [ ] Additional generator features (names, addresses)
- [ ] API endpoint for programmatic access
- [ ] Chrome extension
- [ ] More content pages
- [ ] Blog section

### Future Ideas

- [ ] User accounts and preferences
- [ ] Custom word lists
- [ ] Export to PDF
- [ ] Figma plugin integration
- [ ] Multi-language support

## Common Commands

```bash
# Development
pnpm dev                 # Start dev server (localhost:4321)
pnpm build              # Build for production
pnpm preview            # Preview production build

# Type Checking
pnpm astro check        # TypeScript + Astro validation

# Git
git status              # Check changes
git add -A              # Stage all
git commit -m "msg"     # Commit
git push                # Push to GitHub (triggers Cloudflare deploy)
```

## Important Files to Know

1. **astro.config.mjs** - Main config, sitemap settings
2. **src/lib/lorem-generator.ts** - Core generation logic
3. **src/components/layout/BaseHead.astro** - SEO meta tags
4. **src/scripts/generator-interactive.ts** - Client-side functionality
5. **src/styles/global.css** - Design system, CSS variables
6. **package.json** - Dependencies and scripts

## Testing Checklist Before Push

- [ ] `pnpm build` succeeds without errors
- [ ] All generators work (text, emails, URLs, domains)
- [ ] Copy to clipboard functions
- [ ] Dark mode toggle works
- [ ] Preset buttons work
- [ ] Mobile responsive (test viewport)
- [ ] No console errors

## SEO Checklist After Deployment

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Test social media sharing (WhatsApp, Twitter, LinkedIn)
- [ ] Verify OG image appears in previews
- [ ] Check robots.txt is accessible
- [ ] Verify all pages indexed

## AdSense Setup (When Ready)

1. **Get AdSense Account Approved**
   - Need existing traffic (deploy first, get users)
   - Apply at https://adsense.google.com

2. **Update AdSense IDs**
   - Edit `src/components/layout/AdContainer.astro`
   - Replace `ca-pub-XXXXXXXXXXXXXXXXX` with your Publisher ID
   - Update ad slot IDs in page files

3. **Add ads.txt**
   - Create `/public/ads.txt`
   - Add verification line from AdSense dashboard

## Domain & Hosting

- **Domain**: lorem-ipsum.bobadilla.tech
- **Hosting**: Cloudflare Pages
- **SSL**: Automatic (Cloudflare)
- **CDN**: Global (Cloudflare)
- **Cost**: $0 (free tier)

## Related Projects

- **Lorelai**: https://github.com/bobadilla-tech/lorelai (Go library
  inspiration)
- **Requiems API**: https://requiems-api.xyz (Enterprise API by Bobadilla Tech)
- **Bobadilla Tech**: https://bobadilla.tech (Company website)

---

**Last Updated**: 2026-01-30 **Current Version**: 1.0.0 **Maintainer**:
Bobadilla Tech
