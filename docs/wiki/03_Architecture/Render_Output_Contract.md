---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-25
updated: 2026-07-02
last_verified: 2026-07-02
confidence: high
tags:
  - widget
  - html
  - accessibility
  - contract
  - standard
related:
  - "[[Index]]"
  - "[[Widget_Architecture]]"
  - "[[ADR_0016_Rating_Visual_System]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[ADR_0018_Widget_Ownership_And_Placement_Resilience]]"
  - "[[ADR_0019_Icon_Sprite_Rendering]]"
  - "[[Competitor_Pricing_And_Plans]]"
source_files:
  - "src/widget/core/shadow.js"
  - "src/widget/core/helpers.js"
  - "src/widget/core/badge.js"
  - "src/widget/icons/star-sprite.js"
  - "src/widget/review-layouts/_shared.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/structured-data/jsonld.js"
  - "src/widget/reviews-section/styles.js"
---

# Render Output Contract

The storefront widget injects HTML into a third-party (ikas) theme it does not control. This page is the **standard every rendered surface must follow** so CSS, JS event-binding, re-render/self-heal, debugging, and theme-compatibility stay reliable. Verified live against competitors (Loox/Yotpo/Judge.me/Okendo) on 2026-05-25; our pattern mirrors Loox and is leaner than the rest.

## Namespace & class naming
- **Prefix everything** with `renuvex-pr-`. No unprefixed classes on injected nodes.
- **BEM-ish**: `block__element--modifier` → `renuvex-pr-rating-badge`, `renuvex-pr-rating-badge__label`, `renuvex-pr-rating-badge--pdp` / `--listing`.
- One namespaced wrapper per surface; layout-specific classes may extend (`renuvex-pr-review-list-*`).

## `data-renuvex-*` attributes (ownership + hooks)
Required because ikas gives no stable mount point/slot ([[ADR_0018_Widget_Ownership_And_Placement_Resilience]]). Use **namespaced** `data-renuvex-*` (never generic `data-rating` — collision risk; Loox uses generic and we intentionally don't):
- Identity/ownership: `data-renuvex-app`, `data-renuvex-slot`, `data-renuvex-store-id`, `data-renuvex-surface`, `data-renuvex-product-id`, `data-renuvex-product-slug`.
- Render data/CSS hook: `data-renuvex-rating`, `data-renuvex-count`, `data-renuvex-align` (alignment via attr + CSS, Loox-style — not inline `justify-content`).
- **Stable test/selector hook (recommended, gap today):** add `data-renuvex-testid` on primary surfaces. Competitors (Loox `data-testid`) expose stable hooks; our a11y label ids are random and unsuitable for e2e/theme targeting.

## Icons (stars and all widget icons)
- **Single SVG `<symbol>` sprite** (`#renuvex-pr-icon-sprite`), referenced via `<use href="#renuvex-pr-sym-…">`. Never inline full `<path>` per use site ([[ADR_0019_Icon_Sprite_Rendering]] — measured 76 KB→~2 KB).
- Read-only stars: `partialStarsHTML` (clip-path half-star) for averages/badges; `starsHTML`/`renderStarRow` for whole-star rows. Both call `ensureStarSprite` first.
- Every widget-owned use-site SVG must carry an intrinsic size fallback. Shared helpers emit `width="1em" height="1em" focusable="false"` unless the trusted source SVG already defines explicit dimensions. This prevents offline refresh / partial-load / no-style states from letting an SVG expand to viewport-sized layout. Do not hand-roll raw `<svg><use></use></svg>` markup.
- **No empty `style=""`** attributes; size/color come from CSS variables/classes, emit `style` only when a value exists.

## Media thumbnail intrinsic sizing
- Widget-owned review thumbnails must be produced through `createMediaThumbnail()`; do not hand-roll raw `<img>` / poster markup in layouts.
- Keep source quality and display fallback dimensions separate:
  - `sourceWidth` / `sourceHeight` are for AWS image/Mux media variants and responsive `srcset`;
  - `displayWidth` / `displayHeight` are the small HTML `width` / `height` fallback used when CSS is missing or delayed.
- Never use source quality constants such as `REVIEW_MEDIA_THUMB_WIDTH` or `GALLERY_TILE_WIDTH` directly as HTML display fallback dimensions. The current fallback contract is 110x110 for square card media and 110x147 for portrait list/gallery/media-gallery tiles.
- Normal CSS remains the source of truth for final styled size; intrinsic attributes only bound degraded/offline/partial-load rendering and help reserve a stable aspect ratio.

## Styling
- **Class-first.** Color/layout/sizing via classes + component-scope CSS variables (`--renuvex-pr-badge-icon-size`, `--renuvex-pr-review-star-color`). Inline `style` only for genuinely per-instance dynamic values.
- Star wrapper layout lives in `.renuvex-pr-stars` / `.renuvex-pr-stars-partial` classes, not inline.

## Shadow content style gate
- Every user-visible Shadow DOM surface must fail quiet if its shadow stylesheet is missing or not applied. Do not append raw visible review/modal content directly to a shadow root.
- Review section content must live under `[data-renuvex-shadow-content]`, created through `getOrCreateShadowContent()` in [shadow.js](src/widget/core/shadow.js). The helper hides the wrapper by inline fallback; `HOST_RESET_CSS` reveals it only when the shadow stylesheet exists in that root.
- Body-level overlays such as the lightbox and review-form wizard must be appended through `appendGatedShadowOverlay()`. The helper hides raw overlay DOM by inline fallback; `HOST_RESET_CSS` reveals overlays with their intended flex display only when styles are present.
- This contract is not a loading skeleton. It is a degraded-state guard for offline refresh / partial-load / missing-style snapshots: shoppers should see either the styled widget or the quiet reserved shell, never native gray controls or raw unstyled widget DOM.

## Accessibility
- Decorative star rows: `aria-hidden="true"`; the **container** carries the name via sr-only text + `aria-labelledby` (translation-friendly, preferred) or `role="img"`+`aria-label` where there is no nearby text.
- **Interactive elements must be real controls**: clickable scroll-to-reviews badge = `<a href="#renuvex-reviews">`; toggles/actions = `<button type="button">` (never `<span onclick>`); images that open the lightbox get `role="button"` + `tabindex="0"` + `aria-label` + Enter/Space handler.
- Focus-visible outlines on interactive controls.

## Element per surface
| Surface | Outermost element |
|---|---|
| Rating badge (clickable, PDP) | `<a href="#renuvex-reviews">` |
| Listing badge (non-interactive) | `<div role="figure">` (+ `pointer-events:none`) |
| Review card | `<article>` |
| Review summary / reviews widget root | `<section aria-label>` |
| Date | `<time datetime="<ISO>">` |
| Read-more / filter / write toggles | `<button type="button">` |
| Carousel (future) | `<section>` + `<ul>/<li>`, each review `<article>` |
| Sticky/floating (future) | `<aside>` / `role="complementary"` |

## Shared builders (single source — avoid per-layout drift)
- Clamped body + keyboard read-more: `buildClampedBody(text, className, { onReadMore })` ([src/widget/review-layouts/_shared.js](src/widget/review-layouts/_shared.js)).
- Merchant reply: `buildReplyEl(reply, onReadMore)` (same file).
- Stars: `partialStarsHTML` / `starsHTML` ([src/widget/core/helpers.js](src/widget/core/helpers.js)); badge factory `createBadgeEl` ([src/widget/core/badge.js](src/widget/core/badge.js)).

## SEO
- PDP Product `AggregateRating` JSON-LD is owned by the independent structured-data surface ([src/widget/structured-data/jsonld.js](src/widget/structured-data/jsonld.js)); the visual rating badge no longer writes schema. `<time datetime>` on review dates complements it. This is **shipped** (previous competitor matrix notes listed it as planned).

## Admin vs storefront
Small schema-choice illustrations in the settings UI may remain React/TSX,
but live widget preview does not maintain a second renderer. The `/preview`
iframe invokes the production Reviews, PDP Badge, and Listing Badge renderers
against deterministic fixture markup/data. Therefore renderer markup, CSS,
icons, and settings behavior are shared; fixture merchant-page structure is
not presented as a universal storefront-theme guarantee.

## Verify after changes
`pnpm build:widget` (HMR does not rebundle the widget) → live check on the dev store (`dev-mertcopper.ikas.shop`) that surfaces render, read-more/image work by **keyboard**, badges intact, no `missing_after_render` regression → `pnpm exec tsc --noEmit` + `pnpm lint` + `node scripts/wiki-audit.mjs`.
