# SEO, Ads & Backlink Update — 2026-07-15

## Context

Session goal: strengthen organic traffic and Google AdSense revenue (the site's
primary monetization) while adding secondary backlinks to `requiems.xyz`
(Requiems API) and `bobadilla.tech` (the agency), and general polish requested
along the way. Scope grew across the session from a focused SEO/ads pass into
feature work (ipsum theme variations, programmatic SEO pages, analytics) and
several rounds of UI feedback on a new terminal/code-block component.

## 1. Focused SEO + ads + backlink polish

- **Fixed dead backlinks**: every link to Requiems API pointed at
  `requiems-api.xyz`, which doesn't resolve (DNS failure, confirmed via fetch).
  Live domain is `requiems.xyz`. Replaced across Footer, index, alternatives,
  contact, README, CLAUDE.md.
- **Mobile anchor ad**: CLAUDE.md documented 4 ad placements, only 3 existed.
  Built `AdMobileAnchor.astro` (dismissible, sitewide via `BaseLayout`). Found
  and fixed a real bug: the ad still fired `adsbygoogle.push()` while hidden
  (`display:none`) on desktop, throwing a console error on every page load —
  guarded with a `matchMedia` check so it only pushes when actually visible on
  mobile.
- **Ads on content pages**: `history.astro`, `usage.astro`, `alternatives.astro`
  had zero ads despite being real content pages. Added one in-content
  `AdContainer` each.
- **Backlink CTAs**: added contextual dev-tools CTA to `usage.astro`, a soft
  "Built by Bobadilla Tech" line to `history.astro` (alternatives already had
  one).
- **FAQ schema**: added `FAQPage` JSON-LD to `usage.astro` and
  `alternatives.astro` for richer SERP presence.
- **Visual elevation**: refined `.glass-card` hover (theme-aware glow via
  `color-mix`, smoother easing), added a subtle animated gradient-mesh behind
  the homepage hero. Colors/tokens in `global.css` left untouched per explicit
  decision (keep existing blue/purple system, not a reskin).

## 2. Alternatives page credibility fix

The "Popular Alternatives" section (Bacon/Cat/Hipster/Corporate/Gamer/Movie
Ipsum) presented themed generators with no links, reading as made-up. Verified
each one live:

- Real and linked: `baconipsum.com`, `catipsum.com`, `hipsum.co`,
  `moviesipsum.com`.
- Dead, replaced with real equivalents: `corporateipsum.com` →
  `corporatelorem.kovah.de`; `gamer-ipsum.com` →
  `placeholdertext.org/themed/gaming-ipsum`.

## 3. Company icons

No clean SVG logo existed in either sibling repo (`bobadilla.tech`,
`requiems-api`) — only raster PNGs. Copied `bobadilla-tech-logo.png` and
`requiems-api-logo.png` into `public/images/`, applied across Footer, index,
usage, alternatives, and history. Later added `gopher.png` (user supplied) for
Lorelai, replacing the 📦 emoji everywhere it appeared.

## 4. Feature batch (user picked all 4 when asked to prioritize)

- **Ipsum theme variations**: Pirate, Tech, Startup word banks (`word-bank.ts`),
  refactored `LoremGenerator` to accept a themed opening phrase, added a "Style"
  selector in `GeneratorControls.astro` that auto-hides for non-text units.
- **3 new SEO pages**: `/lorem-ipsum-api`, `/dummy-text-generator-ui`,
  `/placeholder-text-figma` — each with real content, an ad slot, FAQ schema,
  linked from Footer + homepage.
- **Analytics + click tracking**: GA4 scaffold in `BaseHead.astro` (placeholder
  measurement ID, same "configure later" pattern as AdSense — verified the
  placeholder ID doesn't throw errors the way AdSense's does). Copy-button
  clicks fire a `copy_click` event (unit/theme/format params), guarded so it's a
  no-op without GA4/behind ad blockers.
- **Programmatic SEO — scoped down deliberately**: built the infrastructure
  (`use-cases.ts` + `[slug].astro` dynamic route + hub page at
  `/lorem-ipsum-for`) but shipped 13 genuinely differentiated pages instead of
  100+. Thin near-duplicate templated pages are a doorway-page pattern search
  engines penalize — the opposite of the goal. Each page has distinct tips and a
  unique FAQ answer.

## 5. Keyboard shortcut discoverability

Real bug: the copy button's hint literally said **Ctrl+C** (system copy) when
the actual bound shortcut is **Ctrl+K** (chosen deliberately in code to avoid
clashing with system copy). Both hints were also `display:none` on mobile —
meaning mobile visitors never saw shortcut hints at all. Fixed the mislabel,
added a persistent tips line that stays visible on mobile. Later added Mac
detection (`navigator.userAgent`) to swap `Ctrl+G`/`Ctrl+K` → `⌘+G`/`⌘+K`
client-side for Mac visitors, everyone else keeps `Ctrl`.

## 6. Code block / terminal component (iterated several times on feedback)

- Built `CodeBlock.astro` wrapping Astro's built-in Shiki `<Code>` (zero client
  JS), dual light/dark theming tied to the site's existing `data-theme`
  convention. Caught and fixed a bug where light mode showed no highlighting at
  all (only wrote the dark-mode CSS override).
- Built `TerminalCommand.astro` for single-line shell commands (macOS
  traffic-light chrome, copy button) after the original Shiki-wrapped version
  broke mid-path on narrow cards.
  - Round 2: fixed the copy button scrolling out of view (classic flexbox
    `min-width` gotcha).
  - Round 3: fixed a forced horizontal scrollbar — command now wraps naturally
    instead.
  - Round 4: dropped Shiki highlighting entirely after "almost impossible to
    read" feedback — turned out to be overcorrection.
  - Round 5: restored highlighting using the `dracula` theme instead of
    `github-dark` — the earlier readability complaint was likely the blue-heavy
    github-dark palette (blue-on-dark is a known perceptual sharpness issue even
    when contrast ratio math checks out), not highlighting itself. Dracula's
    green/yellow/purple palette has no blue and reads clearly.
- Added a copy button to `CodeBlock.astro` too (was missing from the multi-line
  JS/Python/Go examples).

## 7. Requiems API key documentation (real bugs found by reading `../requiems-api`)

The original code examples were wrong on inspection of the actual API repo:

- Wrong host: examples used `requiems.xyz` (the dashboard/marketing site); the
  real API lives on **`api.requiems.xyz`**.
- Missing auth: every request needs a `requiems-api-key` header — examples had
  none, and the FAQ text incorrectly said "no API key setup required."
- Wrong response shape: guessed `{ text }`, real shape is
  `{ data: { text, ... } }`.

Fixed all curl/JS/Python examples, added a real "Get Your Free API Key →" CTA to
`requiems.xyz/users/sign_up` (free tier: 500 requests/month, no credit card,
confirmed in their docs).

## 8. Misc fixes

- **OG image**: `og-image.png` was 2400×1260 but the gradient/text content was
  only rasterized at 1200×630 in the top-left corner — roughly 75% of the image
  was blank white space. Regenerated directly from the existing SVG source at
  the correct 1200×630 via `rsvg-convert` (also dropped file size from 590KB to
  76KB).

## Verification

Every change in this session was verified with `pnpm build` + `pnpm astro check`
(0 errors throughout) and browser-driven checks via Playwright — screenshots in
light/dark/mobile, DOM assertions for ad slots/links/schema, and functional
checks (theme switching produces correctly-themed text, copy buttons actually
copy, tracking event fires with correct params, Mac vs non-Mac shortcut
display).
