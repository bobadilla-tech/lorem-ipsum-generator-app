# Changelog

## [Unreleased] - 2026-07-15

### Changed

- ✅ Rebranded visual theme to match bobadilla.tech: gold accent
  (`#e6be1a`) on near-black background (`#0b0505`) in dark mode, warm
  gold-tinted palette in light mode
- ✅ Adopted Sora (headings) and Space Grotesk (body) fonts, loaded via
  Google Fonts in `BaseHead.astro`
- ✅ Replaced all blue/purple accent gradients with the brand gold
  gradient (`--accent` → `--accent-hover`)
- ✅ Button/badge/CTA text on gold backgrounds switched from white to
  `#0b0505` for contrast, matching bobadilla.tech's `Button.tsx` gold
  variant
- ✅ Light/dark mode toggle retained; both themes retheme to the gold
  brand palette instead of the old blue palette

## [1.0.0] - 2026-01-30

### Added

- ✅ Complete Lorem Ipsum generator with Gaussian distribution algorithm
- ✅ Modern glassmorphism UI with improved light mode
- ✅ Dark mode with system preference detection
- ✅ Multiple output formats (Plain Text, HTML, Markdown)
- ✅ Keyboard shortcuts (Ctrl+G, Ctrl+K)
- ✅ Copy to clipboard functionality
- ✅ Preset generation buttons (1, 3, 5, 10 paragraphs)
- ✅ Real-time character and word counts
- ✅ Google AdSense integration (4 strategic placements)
- ✅ Comprehensive SEO (meta tags, structured data, sitemap)

### Pages Created

- ✅ **Homepage** (`/`) - Generator with educational content
- ✅ **History** (`/history`) - 2000-year history of Lorem Ipsum
- ✅ **Usage Guide** (`/usage`) - Best practices for designers
- ✅ **Alternatives** (`/alternatives`) - Other placeholder text generators
- ✅ **Privacy Policy** (`/privacy`) - GDPR compliant privacy policy
- ✅ **Terms of Service** (`/terms`) - Terms and conditions
- ✅ **Contact** (`/contact`) - Contact information and developer links

### Bobadilla Tech Integration

- ✅ Company branding in footer with links
- ✅ "For Developers" section with improved styling
- ✅ Lorelai Go library promotion
- ✅ Enterprise API showcase
- ✅ Social media links (GitHub, LinkedIn, Website)

### Improvements

- ✅ Enhanced light mode styling with better contrast
- ✅ Improved "For Developers" section with:
  - Better card design with hover effects
  - Gradient backgrounds
  - Improved badges and buttons
  - Code examples with proper styling
  - Social links with hover animations
- ✅ Fixed format output to properly display HTML and Markdown
- ✅ Improved glass-card effects with better backdrop blur
- ✅ Enhanced shadows and hover states
- ✅ Better color contrast for accessibility

### Technical

- Built with Astro 5.x
- TypeScript strict mode
- pnpm package manager
- Zero JavaScript by default (Islands architecture)
- Optimized for performance (< 2s load time)
- SEO-ready with structured data

## What's Next

### Phase 2 (Optional)

- [ ] Google Analytics 4 integration
- [ ] Additional generator features (emails, URLs, domains)
- [ ] API endpoint for programmatic access
- [ ] Chrome extension
- [ ] More content pages
- [ ] Blog section

### Future Enhancements

- [ ] User accounts and preferences
- [ ] Custom word lists
- [ ] Export to PDF
- [ ] Integration with design tools (Figma plugin)
- [ ] Multi-language support
