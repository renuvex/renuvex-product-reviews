---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-19
tags:
  - widget
  - badge
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Listing_Rating_Widget]]"
  - "[[Bug_Product_Widget_Missing_Auto_Mount]]"
  - "[[ADR_0016_Rating_Visual_System]]"
---

# Product Rating Badge

## Summary
Small inline `★ rating · count` shown on the product detail page near the product title. Implemented by [src/widget/product-widget/rating-badge.js](src/widget/product-widget/rating-badge.js), placed via heuristics in [title-finder.js](src/widget/product-widget/title-finder.js).

## Settings (`badge` widgetId)
Settings live under `WidgetSettings.settings` with `widgetId='badge'`. Source schema: [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts).

Fields:
- `enabled` — toggle; also gates the listing/card badges.
- `size` — small / medium / large; affects this PDP title badge only.

The star **icon** and **color** are NOT on this widget. They come from the
global rating visual system — the `reviews` widget's `reviewIcon` /
`reviewStarColor`. `render.js` resolves the icon pair (`getIconFromSettings`)
and passes it into `injectRatingBadge`; the star color is applied through the
`--ikr-review-star-color` CSS variable. See [[ADR_0016_Rating_Visual_System]].

## Where it appears
- Product detail page only.
- Anchored next to the product title via title-finder heuristic.
- Updated when the product detail loads or SPA-nav fires the observer.
- The product-title badge is injected at the end of the PDP review render path. The review widget now auto-creates its missing mount anchor so badge injection is not blocked by theme anchor drift. Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].

## Notes
- If a merchant theme has unusual title markup, the badge may attach to the wrong element. The fix is in [title-finder.js](src/widget/product-widget/title-finder.js).
- The badge fetches the same data already loaded by the product review widget (it shares `currentReviewsData` in [core/state.js](src/widget/core/state.js)) — no extra request.

## Related Source Files
- [src/widget/product-widget/rating-badge.js](src/widget/product-widget/rating-badge.js)
- [src/widget/product-widget/title-finder.js](src/widget/product-widget/title-finder.js)
- [src/widget/core/state.js](src/widget/core/state.js)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[Bug_Product_Widget_Missing_Auto_Mount]]

## Change Log
- 2026-05-19: Star icon + color removed from the `badge` widget; they are now single-sourced from the `reviews` widget (`reviewIcon`/`reviewStarColor`). `render.js` passes the resolved icon pair into `injectRatingBadge`. Fixed the icon-parse bug — `rating-badge.js` no longer passes an unparsed `type:style` value to `getIconStyle`, so non-`star` icons (heart, leaf, crown, …) render correctly. See [[ADR_0016_Rating_Visual_System]].
- 2026-05-11: Documented that PDP badge visibility depends on the review render path and is protected by the self-mounting review anchor fallback. Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].
