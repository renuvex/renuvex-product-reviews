---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-25
last_verified: 2026-05-25
tags:
  - widget
  - badge
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Listing_Rating_Widget]]"
  - "[[Bug_Product_Widget_Missing_Auto_Mount]]"
  - "[[ADR_0016_Rating_Visual_System]]"
  - "[[ADR_0017_Badge_Architecture]]"
  - "[[ADR_0019_Icon_Sprite_Rendering]]"
  - "[[ADR_0024_Badge_Review_Surface_Separation]]"
---

# Product Rating Badge

## Summary
Small inline star rating and count shown on the product detail page near the product title. The surface entry is [src/widget/rating-badge/index.js](src/widget/rating-badge/index.js), DOM injection lives in [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js), and placement uses [product-title.js](src/widget/core/product-title.js).

## Settings (`badge` widgetId)
Settings live under `WidgetSettings.settings` with `widgetId='badge'`. Source schema: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts).

Fields:
- `enabled` — toggle; also gates the listing/card badges.
- `size` — small / medium / large; applies to **both** the PDP title badge and listing-card badges via shared `SIZE_MAP` (icon + text together). See [[ADR_0016_Rating_Visual_System]].
- `mobileOverride` (toggle) + `mobileSize` (small/medium/large) — opt-in mobile preset. When on, an `@media (max-width:640px)` block in `<style id="renuvex-pr-badge-tokens">` overrides desktop tokens. See [[ADR_0017_Badge_Architecture]].
- `alignment`, `showValue`, `showCount` — additional display knobs introduced in PR-1; consumed by future iterations.

The star **icon** and **color** are NOT on this widget. They come from the
global rating visual system - the `reviews` widget's `reviewIcon` /
`reviewStarColor`. The badge surface resolves the icon pair (`getIconFromSettings`)
and passes it into `injectRatingBadge`; the star color is applied through the
`--renuvex-pr-review-star-color` CSS variable. See [[ADR_0016_Rating_Visual_System]].

## Where it appears
- Product detail page only.
- Anchored next to the product title via product-title heuristic.
- Updated when the product detail loads or SPA-nav fires the observer.
- The product-title badge is a separate `badge` feature and its own lazy surface. It auto-places on the product title and is gated by the `badge` widget toggle plus `autoPlacementEnabled`, not by the review-section mount.
- The review section is opt-in through `<div data-renuvex-widget="reviews"></div>`. If that mount is missing, the review section does not render, but the PDP title badge can still render. Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].

## Notes
- If a merchant theme has unusual title markup, the badge may attach to the wrong element. The fix is in [product-title.js](src/widget/core/product-title.js).
- The badge uses `/api/public/ratings?productIds=<id>` instead of the full review payload. That keeps badge-only PDPs off the heavy review-section fetch/render path. See [[ADR_0024_Badge_Review_Surface_Separation]].
- Star glyphs render via a shared SVG `<symbol>` sprite (`<use>` into `#renuvex-pr-icon-sprite`), not inline `<path>`. The badge is a real link named by an sr-only `aria-labelledby` span (no `role="figure"`, no static `id`); alignment comes from `data-renuvex-align`. See [[ADR_0019_Icon_Sprite_Rendering]].

## Related Source Files
- [src/widget/rating-badge/index.js](src/widget/rating-badge/index.js)
- [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js)
- [src/widget/surfaces/rating-badge.surface.js](src/widget/surfaces/rating-badge.surface.js)
- [src/widget/core/product-title.js](src/widget/core/product-title.js)
- [src/widget/core/state.js](src/widget/core/state.js)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[Bug_Product_Widget_Missing_Auto_Mount]]

## Change Log
- 2026-05-27: [[ADR_0024_Badge_Review_Surface_Separation]] split the PDP badge into its own product surface and lazy chunk. It now fetches summary data through `/api/public/ratings` and owns stale badge/JSON-LD cleanup.
- 2026-05-25: PDP title badge was decoupled from the review-section mount. It injects before the opt-in `<div data-renuvex-widget="reviews"></div>` check and remains controlled by the `badge` widget toggle.
- 2026-05-24: Stars now render via the shared SVG `<symbol>` sprite (`<use>`); the PDP badge dropped `role="figure"`, the static `static id`, and the inline `justify-content` for a link role + sr-only `aria-labelledby` + `data-renuvex-align`. See [[ADR_0019_Icon_Sprite_Rendering]].
- 2026-05-19: Star icon + color removed from the `badge` widget; they are now single-sourced from the `reviews` widget (`reviewIcon`/`reviewStarColor`). Fixed the icon-parse bug - the PDP badge no longer passes an unparsed `type:style` value to `getIconStyle`, so non-`star` icons (heart, leaf, crown, ...) render correctly. See [[ADR_0016_Rating_Visual_System]].
- 2026-05-11: Documented that PDP badge visibility depends on the review render path and is protected by the self-mounting review anchor fallback. Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].
