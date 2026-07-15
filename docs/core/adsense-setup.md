# Google AdSense Setup

The site ships with 4 ad placements, all wired but pointed at placeholder IDs
until you configure a real AdSense account.

## Placements

| Placement                      | Component        | Where                                                                                                                                                |
| ------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Leaderboard (728x90)           | `AdContainer`    | `index.astro`, after the hero                                                                                                                        |
| Sticky sidebar (300x250)       | `AdContainer`    | `index.astro`, desktop only                                                                                                                          |
| In-content rectangle (300x250) | `AdContainer`    | every content page (`history`, `usage`, `alternatives`, `lorem-ipsum-api`, `dummy-text-generator-ui`, `placeholder-text-figma`, `lorem-ipsum-for/*`) |
| Mobile anchor (bottom banner)  | `AdMobileAnchor` | sitewide via `BaseLayout`, mobile only, dismissible                                                                                                  |

## 1. Add your Publisher ID

Edit `src/components/layout/AdContainer.astro` and
`src/components/layout/AdMobileAnchor.astro`:

```typescript
const adClient = "ca-pub-XXXXXXXXXXXXXXXXX"; // Replace with your Publisher ID
```

## 2. Update ad slot IDs

Every `<AdContainer adSlot="...">` / `<AdMobileAnchor adSlot="...">` call across
the page files currently uses a placeholder numeric slot ID. Replace each with
the real slot ID from your AdSense dashboard.

## 3. Add `ads.txt`

Create `public/ads.txt`:

```
google.com, pub-XXXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

## Known placeholder-ID behavior

Until a real Publisher ID is set, the browser console will show a handful of
harmless script errors from AdSense's own script trying to fill fake ad units —
this is expected and resolves once real IDs are in place. The mobile anchor is
guarded so it only calls `adsbygoogle.push()` when actually visible (checked via
`matchMedia`), so it doesn't add extra console noise on desktop.
