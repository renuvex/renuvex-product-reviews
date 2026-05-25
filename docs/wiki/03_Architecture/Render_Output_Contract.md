---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-25
updated: 2026-05-25
last_verified: 2026-05-25
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
source_files:
  - "src/widget/core/helpers.js"
  - "src/widget/core/badge.js"
  - "src/widget/icons/star-sprite.js"
  - "src/widget/review-layouts/_shared.js"
  - "src/widget/product-widget/rating-badge.js"
  - "src/widget/product-widget/styles.js"
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
- **No empty `style=""`** attributes; size/color come from CSS variables/classes, emit `style` only when a value exists.

## Styling
- **Class-first.** Color/layout/sizing via classes + component-scope CSS variables (`--renuvex-pr-badge-icon-size`, `--renuvex-pr-review-star-color`). Inline `style` only for genuinely per-instance dynamic values.
- Star wrapper layout lives in `.renuvex-pr-stars` / `.renuvex-pr-stars-partial` classes, not inline.

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
- PDP injects `application/ld+json` `AggregateRating` ([src/widget/product-widget/rating-badge.js](src/widget/product-widget/rating-badge.js)); `<time datetime>` on review dates complements it. This is **shipped** (Competitor_Feature_Matrix previously listed it as planned).

## Admin vs storefront
Storefront HTML is **not** reused verbatim in the admin panel (React/TSX `PreviewStars`, `BadgePreview`). Share the *source* (ICONS registry, design tokens, settings) — not the markup. True-fidelity preview is the `/preview` iframe rendering the real widget.

## Verify after changes
`pnpm build:widget` (HMR does not rebundle the widget) → live check on the dev store (`dev-mertcopper.ikas.shop`) that surfaces render, read-more/image work by **keyboard**, badges intact, no `missing_after_render` regression → `pnpm exec tsc --noEmit` + `pnpm lint` + `node scripts/wiki-audit.mjs`.
