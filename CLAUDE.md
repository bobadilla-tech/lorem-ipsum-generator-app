# Lorem Ipsum Generator

A modern, ad-optimized web application for generating Lorem Ipsum text, random
emails, URLs, and domain names. Built with Astro 5, designed for passive income
through Google AdSense.

## Tech Stack & Architecture

- **Astro** - Static site generator (chosen for SEO and performance)
- **TypeScript** - Strict mode enabled
- **pnpm** - Package manager (NOT npm or yarn)
- **GitHub Pages** - Deployment platform

### Why Astro?

- Ships ~0KB JavaScript by default (Islands architecture)
- Excellent SEO capabilities (meta tags, structured data, sitemaps)
- Blazing fast static site generation
- Built-in image optimization
- Easy to deploy (free hosting on GitHub Pages, Netlify, or Vercel)

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

### GitHub Pages Deployment

- **Workflow**: `.github/workflows/deploy.yml` - builds with `pnpm build`,
  deploys `dist` via `actions/deploy-pages@v4` on every push to `main`
- **Custom domain**: `public/CNAME` (`lorem-ipsum.bobadilla.tech`) - must
  stay committed, GitHub Pages reads it from the deployed artifact
- **Node version**: pinned via `.nvmrc`, used by the workflow's
  `setup-node` step
- Separate `ci.yml` runs lint/typecheck/build on every push and PR

## Branding & Links

### Bobadilla Tech Integration

- **Footer**: Company branding with links
- **"For Developers" Section**:
  - [Lorelai](https://github.com/bobadilla-tech/lorelai): Go library
  - [Requiems API](https://requiems.xyz): Enterprise API
  - Social links: GitHub, LinkedIn, Website
- **Contact Page**: Full company info

### Design System

Styling matches [bobadilla.tech](https://bobadilla.tech) branding: gold
accent on near-black in dark mode, a warm gold-tinted palette in light
mode. Fonts are Sora (headings) and Space Grotesk (body), loaded via
Google Fonts in `BaseHead.astro`. Buttons/badges on a gold background
use dark text (`#0b0505`), not white, for contrast — mirrors the
`gold` variant in bobadilla.tech's `Button.tsx`.

**CSS Variables** (global.css):

```css
/* Light Mode */
--accent: #c9a916 (gold-dark) --bg-primary: #fffdf7 --bg-secondary: #f7f2e4
  --text-primary: #1a1512 --text-secondary: #5c5650 /* Dark Mode */
  --accent: #e6be1a (gold) --accent-hover: #ffeea8 (gold-light)
  --bg-primary: #0b0505 --bg-secondary: #1a1210
  --text-primary: #dbdbd7 --text-secondary: #9c9c98;

/* Fonts */
--font-heading: "Sora", ... --font-sans: "Space Grotesk", ...
```

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
git push                # Push to GitHub (triggers GitHub Pages deploy)
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
- **Hosting**: GitHub Pages
