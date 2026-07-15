# Lorem Ipsum Generator 🎨

A modern, blazing-fast Lorem Ipsum generator with email, URL, and domain
generation capabilities. Built with Astro 5, featuring glassmorphism design,
dark mode, and exceptional SEO. Optimized for Google Ads revenue.

![Lorem Ipsum Generator](https://lorem-ipsum.bobadilla.tech/images/og-image.png)

🔗 **Live Demo**:
[lorem-ipsum.bobadilla.tech](https://lorem-ipsum.bobadilla.tech)

## ✨ Features

- **⚡ Lightning Fast** - Static site generation with Astro 5
- **🎨 Modern UI** - Glassmorphism design with smooth animations
- **🌙 Dark Mode** - Auto-detects system preference with toggle
- **📱 Fully Responsive** - Perfect experience on all devices
- **💰 Ad-Optimized** - 4 strategic Google AdSense placements
- **🔍 SEO-Friendly** - Comprehensive meta tags, structured data, and sitemap
- **⌨️ Keyboard Shortcuts** - Ctrl+G to generate, Ctrl+K to copy
- **📝 Multiple Formats** - Export as plain text, HTML, or Markdown
- **📧 Multiple Generators** - Lorem Ipsum text, email addresses, URLs, and
  domain names
- **🚀 Zero JS by default** - Astro Islands architecture for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/bobadilla-tech/lorem-ipsum-generator-app.git
cd lorem-ipsum-generator-app

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The site will be available at `http://localhost:4321`

## 📁 Project Structure

```
lorem-ipsum/
├── public/                  # Static assets
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer, BaseHead, AdContainer
│   │   └── generator/      # GeneratorControls, OutputDisplay
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   ├── lorem-generator.ts  # Core generation algorithm
│   │   └── word-bank.ts        # Latin word corpus
│   ├── pages/
│   │   ├── index.astro         # Homepage with generator
│   │   ├── history.astro       # Lorem Ipsum history
│   │   ├── usage.astro         # Usage guide
│   │   └── alternatives.astro  # Alternative generators
│   ├── scripts/
│   │   └── generator-interactive.ts  # Client-side functionality
│   └── styles/
│       └── global.css          # Global styles and CSS variables
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## 🎯 Core Algorithm

The generator supports multiple types of placeholder content:

### Lorem Ipsum Text

Uses Gaussian distribution to create natural-looking text:

- **Sentences**: Average 15 words (±5 words standard deviation)
- **Paragraphs**: Average 5 sentences (±2 sentences standard deviation)
- **Word Bank**: 180+ classical Latin words from Cicero's "De finibus bonorum et
  malorum" (45 BC)

### Random Data Generation

- **Email Addresses**: Generates realistic fake email addresses with common
  providers
- **URLs**: Creates random URLs with realistic paths and TLDs
- **Domain Names**: Generates random domain names with various TLDs (.com, .net,
  .org, .io, etc.)

```typescript
// Generate 5 paragraphs with Lorem Ipsum opening
const text = loremGenerator.generate({
  count: 5,
  unit: "paragraphs",
  startWithLorem: true,
  format: "plain",
});

// Generate 10 random email addresses
const emails = loremGenerator.generate({
  count: 10,
  unit: "emails",
  startWithLorem: false,
  format: "plain",
});
```

## 💰 Google AdSense Setup

### 1. Add Your AdSense Account

Edit `src/components/layout/AdContainer.astro`:

```typescript
const adClient = "ca-pub-XXXXXXXXXXXXXXXXX"; // Replace with your Publisher ID
```

### 2. Update Ad Slot IDs

Edit `src/pages/index.astro` and replace the ad slot IDs:

```astro
<AdContainer adSlot="YOUR_AD_SLOT_ID" />
```

### 3. Add ads.txt

Create `public/ads.txt` with your AdSense verification:

```
google.com, pub-XXXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

## 🔍 SEO Optimization

### Meta Tags & Structured Data

The site includes comprehensive SEO optimization:

- Title tags & meta descriptions
- Open Graph & Twitter Cards
- Schema.org JSON-LD structured data
- Canonical URLs
- XML sitemap (auto-generated)

### Domain Configuration

The site is configured for `https://lorem-ipsum.bobadilla.tech` in
`astro.config.mjs`:

```javascript
export default defineConfig({
  site: "https://lorem-ipsum.bobadilla.tech",
  integrations: [sitemap()],
  // ...
});
```

### Submit to Search Engines

After deployment:

1. **Google Search Console**: https://search.google.com/search-console
2. **Bing Webmaster Tools**: https://www.bing.com/webmasters

## 🎨 Customization

### Colors & Theme

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --accent: #3b82f6; /* Primary accent color */
  --accent-hover: #2563eb; /* Hover state */
  /* ... */
}
```

### Content

- **Homepage**: `src/pages/index.astro`
- **Educational Pages**: `src/pages/history.astro`, `usage.astro`,
  `alternatives.astro`
- **Generator Logic**: `src/lib/lorem-generator.ts`

### Add More Words

Extend the word bank in `src/lib/word-bank.ts`:

```typescript
export const LOREM_WORDS: string[] = [
  "lorem",
  "ipsum",
  "dolor", // ... add more Latin words
];
```

## 🚀 Deployment

### Cloudflare Pages (Recommended)

1. Connect GitHub repository to Cloudflare Pages
2. Build settings:
   - **Build command**: `pnpm build`
   - **Output directory**: `dist`
   - **Node version**: 18 or 20

### Netlify

```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = "dist"
```

### Vercel

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist"
}
```

### GitHub Pages

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

## 📊 Performance

Target metrics (easily achievable):

- **Lighthouse Score**: > 95/100
- **Page Load Time**: < 2 seconds
- **Core Web Vitals**: All "Good"
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1

Run audit:

```bash
pnpm build
pnpm preview
# Open Lighthouse in Chrome DevTools
```

## ⌨️ Keyboard Shortcuts

- **Ctrl+G** (or Cmd+G): Generate Lorem Ipsum
- **Ctrl+K** (or Cmd+K): Copy to clipboard
- Theme toggle persists to localStorage

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml dist
pnpm install
pnpm build
```

### TypeScript Errors

```bash
# Check TypeScript
pnpm astro check
```

### Dev Server Issues

```bash
# Kill existing processes
lsof -ti:4321 | xargs kill -9

# Restart dev server
pnpm dev
```

## 🙏 Acknowledgments

- **Cicero** - For "De finibus bonorum et malorum" (45 BC)
- **Astro Team** - For the amazing static site generator
- **[Lorelai](https://github.com/bobadilla-tech/lorelai)** - Bobadilla Tech's Go
  library for Lorem Ipsum generation (inspiration for this project)

## 🔗 Related Projects

- **[Lorelai](https://github.com/bobadilla-tech/lorelai)** - Lorem Ipsum
  generator library for Go
- **[Requiems API](https://requiems.xyz)** - Enterprise API solutions by
  Bobadilla Tech

---

Built with ❤️ by [Bobadilla Tech](https://bobadilla.tech) |
[GitHub](https://github.com/bobadilla-tech) | [Website](https://bobadilla.tech)
