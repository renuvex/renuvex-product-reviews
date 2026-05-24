---
type: decision
project: ikas-review-app
status: active
created: 2026-05-24
updated: 2026-05-24
last_verified: 2026-05-24
confidence: high
tags:
  - adr
  - widget
  - rating
  - svg
  - performance
  - accessibility
related:
  - "[[Decision_Index]]"
  - "[[ADR_0016_Rating_Visual_System]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[Product_Rating_Badge]]"
  - "[[Listing_Rating_Widget]]"
  - "[[Widget_Performance]]"
source_files:
  - "src/widget/icons/star-sprite.js"
  - "src/widget/icons/review-icons.js"
  - "src/widget/core/helpers.js"
  - "src/widget/core/badge.js"
  - "src/widget/product-widget/rating-badge.js"
  - "src/widget/summary-layouts/shared/bar-chart.js"
  - "src/widget/summary-layouts/classic/index.js"
---

# ADR_0019 — Icon Sprite Rendering for Rating Stars (+ badge a11y/correctness)

## Status
Accepted

## Date
2026-05-24

## Context
Every read-only rating star was rendered by **inlining the full SVG `<path d="…">`** (~765 bytes of coordinate data) per star, on every surface. The geometry is identical for all five stars of a row and for every rating display on the page, so the live DOM carried the same path string dozens of times.

Measured on the live dev store (`dev-mertcopper.ikas.shop`, playwright):
- **PDP `/premium-shortsg` (10 reviews): 75,924 bytes of `<path>` data, 125 paths, 0 `<use>`, 0 `<symbol>`.** The review list alone was 58,351 bytes.
- **Listing `/clothing`: ~4.6 KB of path data per product badge** (~13 KB for 3 badges) — linear in catalog size; a real 30–50-product collection page would carry ~130–230 KB of duplicated path data.

Competitor research: Loox uses an SVG **symbol sprite** (`<symbol>` defined once + `<use href="#id">`) — the canonical, W3C-standard icon-reuse technique. Yotpo inlines per star (like us) and additionally renders a per-star `<linearGradient>` with random ids for fractional fill; that gradient approach **forces** inlining because a shared symbol cannot take per-instance gradient ids. Our half-star engine uses `clip-path` on a wrapper element (ADR_0016), which composes cleanly with a shared sprite.

[[ADR_0016_Rating_Visual_System]] owns the visual identity (icon family, color, half-star engine); [[ADR_0017_Badge_Architecture]] owns badge structure (mount, class-first styling, component-scope tokens). This ADR owns the **delivery mechanism** of the star geometry and the accessibility/correctness of the badge container.

## Decision

### 1. Star geometry is delivered via an SVG symbol sprite
A new module [src/widget/icons/star-sprite.js](src/widget/icons/star-sprite.js) exposes `ensureStarSprite(iconPair)` and `starUseSvg(state)`:
- `ensureStarSprite` derives **two `<symbol>`s** (`#ikr-sym-star-full`, `#ikr-sym-star-outline`) from the active icon's existing `ICONS` SVG strings (regex `<svg…>`→`<symbol…>`, preserving `viewBox` + fill/stroke), parses them with `DOMParser` (`image/svg+xml`), and injects one hidden `<div id="ikr-icon-sprite">` into `document.body`. Idempotent and **keyed by the icon geometry**, so a live-preview icon swap replaces the symbols in place. Hidden via `position:absolute;width:0;height:0;overflow:hidden` (never `display:none`, which breaks `<use>` rendering).
- `starUseSvg('full'|'outline')` returns `<svg class="ikr-star-svg" viewBox="0 0 256 256" aria-hidden="true"><use href="#…"/></svg>`.

The read-only star renderers in [src/widget/core/helpers.js](src/widget/core/helpers.js) (`partialStarsHTML`, `starsHTML`) and [src/widget/icons/review-icons.js](src/widget/icons/review-icons.js) (`renderStarRow`) call `ensureStarSprite` at the top (so the symbol exists before the returned `<use>` markup is inserted — **correct-by-construction**, no race, no rollout gate) and emit `starUseSvg(...)` instead of the inline string. The `clip-path` half-star engine is unchanged: bg layer `<use href="#…outline">`, fg layer `<use href="#…full">` + `clip-path:inset(0 50% 0 0)` on the wrapper.

The `ICONS` registry strings stay intact — they remain the single source the symbols are derived from **and** the source the admin React preview (`icon-preview.tsx`, `IconSelect.tsx`) renders directly. Single source of truth (ADR_0016) is preserved; only widget-side delivery changed.

### 2. Accessibility: sr-only label + aria-labelledby (decorative stars)
Adopted from Yotpo's class-leading pattern:
- `buildRatingA11yLabel(avg, count)` (helpers.js) returns `{ id, html }` — a visually-hidden `.ikr-sr-only` `<span>` carrying the rating sentence as **real text** (translation-tool friendly, unlike `aria-label`), with a per-instance unique id.
- `partialStarsHTML` wrappers are `aria-hidden="true"` (decorative); the PDP badge (`<a>`) and listing badge (`<div>`) reference the sr-only span via `aria-labelledby`.
- `starsHTML` (review cards / modal — no other rating text nearby) gets `role="img"` + `aria-label` so it always has an accessible name with no per-consumer edits.
- Summary layouts already render the average + count as visible text, so their decorative stars need no extra label.

### 3. PDP badge correctness (refines ADR_0017)
- **No `role="figure"` on the PDP badge.** It is a real scroll-to-reviews `<a>`; `role="figure"` suppressed its link role for assistive tech. It keeps its link role and is named by `aria-labelledby`. (The non-interactive listing `<div>` keeps `role="figure"`.)
- **No static `id="ikr-rating-badge"`.** Duplicate-id risk if two badges ever render; cleanup now selects by `.ikr-rating-badge--pdp`.
- **Alignment via `data-ikr-align` + CSS** (Loox-style `data-alignment`) instead of an inline `justify-content` style on the badge.

### 4. Scope: a unified icon system (all widget icons)
`star-sprite.js` is the single icon sprite for the whole widget. Every
widget-owned icon is defined once as a `<symbol>` and referenced via `<use>`:
- **Rating stars** (heavily repeated — the real DOM win): badges, review cards,
  modal, and all summary layouts incl. the distribution **bar chart**
  (`bar-chart.js`, 25 stars/chart). Via `ensureStarSprite` + `starUseSvg`.
- **Interactive form rating picker** (`step-rating.js`): now also `<use>` — only
  the icon markup changed; the WebKit-hardened pointer/touch/keyboard activation
  logic is untouched.
- **One-off UI icons** via `iconUseSvg(svgString)` (length + double-hashed `<symbol>`,
  injected once): filter funnel (`actions-block.js`), compact chevron, modal
  close (`modal-shell.js`), wizard back arrow (`progress-bar.js`), photo
  upload/plus (`step-photos.js`). These give ~no DOM win (single instances) but
  unify the mechanism; `iconUseSvg` preserves each icon's
  `viewBox`/`width`/`height`/stroke so rendering is byte-identical.
- **Sole exception:** the widget-*disabled* empty-state placeholder
  (`render.js`) stays inline — it renders only when the merchant turns the
  widget OFF (never customer-facing) and carries a one-off inline `style`.

`iconUseSvg` and `ensureStarSprite` write into the **same** `#ikr-icon-sprite`
container but manage symbols individually: a live-preview star-icon swap replaces
only the two star symbols and never clobbers the one-off icon symbols.

## Reasoning
- A shared `<symbol>` + `<use>` removes per-instance geometry duplication: the PDP star DOM drops from ~76 KB of path data to ~2 KB (geometry once + tiny refs), verified in a real browser (`useCount` 6, `pathCount` 0, half-star clip intact, geometry paints).
- `clip-path` half-stars are kept (not Yotpo's gradient) precisely because they compose with a shared symbol; gradient fill would force re-inlining and reintroduce the random-id smell.
- sr-only + `aria-labelledby` gives real, translatable label text and stops screen readers announcing five "image" nodes.
- Keeping `ICONS` strings as the single source means the admin preview and the sprite never diverge, and adding the sprite needed **no build-script change** (geometry is bundled as JS strings as before).

## Alternatives Considered
- **Per-star `<linearGradient>` fill (Yotpo).** Smooth fractional fill but requires a unique gradient id per star → incompatible with a shared sprite, more DOM, id-collision workarounds. Rejected.
- **External `.svg` sprite file referenced by URL.** Adds a network request and a same-origin/CORS surface for `<use>`; our geometry is tiny and already in the JS bundle. Rejected.
- **Keep the interactive picker inline.** Initially considered to avoid touching recently-hardened tap/focus logic; superseded by the follow-up icon-unification commit because only markup changed and the WebKit-safe event logic stayed intact.
- **Keep inlining (status quo).** Valid and shipped by Yotpo, but leaves the measured listing/PDP DOM bloat unaddressed. Rejected.

## Consequences
- Star geometry now depends on `#ikr-icon-sprite` existing in the DOM. `ensureStarSprite` runs synchronously inside every read-only renderer before its `<use>` markup is inserted, so the dependency is satisfied by construction; there is no flag/gate to retire.
- Theme-agnostic: the sprite lives in shared `icons/` core, not in any theme adapter or per-theme bundle. **Future themes beyond ozy inherit it automatically** — a new theme implements only DOM mount/selectors (see [[ADR_0017_Badge_Architecture]] / current-adapter), never icon rendering.
- Generic one-off symbol ids include source length plus two independent hash passes, and injected symbols carry a source key. The icon set is still trusted/local, but this avoids silent reuse if the helper is later called with a different SVG that collides with an existing id.
- SEO unaffected: the `AggregateRating` JSON-LD in [rating-badge.js](src/widget/product-widget/rating-badge.js) is independent of the visual DOM.
- **Amends [[ADR_0017_Badge_Architecture]]** for the PDP badge: its "every badge gets `role=figure` + `aria-label`", the static `id="ikr-rating-badge"`, and the inline `justify-content` are superseded here (link role, `aria-labelledby` sr-only, `data-ikr-align`). The listing badge's `role="figure"` and `pointer-events:none` card-link behavior are unchanged.
- Dual `data-renuvex-*`/`data-ikr-*` markers are untouched (still ADR_0018 migration debt; retire later via expand/contract).
- After any `src/widget` edit, run `pnpm build:widget` (HMR does not rebundle the widget).

## Related Source Files
- [src/widget/icons/star-sprite.js](src/widget/icons/star-sprite.js)
- [src/widget/icons/review-icons.js](src/widget/icons/review-icons.js)
- [src/widget/core/helpers.js](src/widget/core/helpers.js)
- [src/widget/core/badge.js](src/widget/core/badge.js)
- [src/widget/product-widget/rating-badge.js](src/widget/product-widget/rating-badge.js)

## Related Notes
- [[Decision_Index]]
- [[ADR_0016_Rating_Visual_System]]
- [[ADR_0017_Badge_Architecture]]
- [[Product_Rating_Badge]]
- [[Listing_Rating_Widget]]
- [[Widget_Performance]]
