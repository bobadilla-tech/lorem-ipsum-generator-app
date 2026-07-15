# Export to PDF / CSV / TXT / JS (client-side only)

## Goal

Add export buttons next to "Copy to Clipboard" so users download generated
output as `.txt`, `.csv`, `.pdf`, or `.js`. No server/API involved — all
generation happens in the browser via `Blob` downloads (txt/csv/js) and
`jspdf` (pdf).

## Scope

- `src/components/generator/OutputDisplay.astro` — export button group (UI
  only, no logic).
- `src/scripts/generator-interactive.ts` — wire up click handlers, build the
  file content per format, trigger download via a temporary `<a>` + `URL.createObjectURL`.
- `package.json` — add `jspdf` as a runtime dependency (only client lib
  needed; everything else uses native `Blob`).

## Format details

| Format | Content | Notes |
|---|---|---|
| TXT | Raw generated text (current `outputEl.textContent`) | Same as copy-to-clipboard content |
| CSV | One row per line/paragraph of output, single `text` column, RFC4180-quoted | Splits on `\n`, filters empty lines |
| JS | `export const loremIpsum = \`...\`;` template literal with generated text | Backticks/backslashes in content escaped |
| PDF | Generated text laid out with `jspdf`, auto word-wrapped, multi-page if needed | Uses `doc.splitTextToSize` + `doc.text` |

All four disabled (or no-op) when output is empty/placeholder — same guard
already used by `copyToClipboard`.

## UI placement

Add a "Export" group of 4 small buttons under `.output-actions` in
`OutputDisplay.astro`, reusing `.button.button-secondary` styling so it
matches Copy/Clear. Icons: simple download glyph, label text differs
(TXT / CSV / JS / PDF). On mobile they stack like existing buttons.

## Filename

`lorem-ipsum-<timestamp>.<ext>`, e.g. `lorem-ipsum-1752591600000.pdf`.

## Ads: hide when adClient is unset

`AdContainer.astro` and `AdMobileAnchor.astro` currently hardcode
`adClient = "ca-pub-XXXXXXXXXXXXXXXXX"` (placeholder, no real AdSense
account yet per CLAUDE.md AdSense Setup section). Both components render
their `<ins class="adsbygoogle">` and load the AdSense script unconditionally
today, which is wasted/broken until a real publisher ID is set.

Fix: guard each component's markup — if `adClient` is still the default
placeholder string, render nothing (no script tag, no `<ins>`, no wrapper
div). Once a real `ca-pub-...` ID is set, ads render as before. No config
flag needed — the placeholder string itself is the signal.

## Out of scope

- No new npm deps beyond `jspdf`.
- No server/API export endpoint (explicitly client-side only per request).
- No changes to `lorem-generator.ts` generation algorithm.
