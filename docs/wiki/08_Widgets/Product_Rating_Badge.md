---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
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
  - "[[ADR_0038_Runtime_Attested_Storefront_Placement]]"
source_files:
  - "src/lib/widgets/catalog.ts"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/placement/capability.js"
  - "src/widget/core/badge.js"
---

# Product Rating Badge

## Agent Brief

The PDP badge is a Product ID surface. Production injection requires a current
strict title/mount proof whose `productId` exactly equals the rating request's
Product ID. The owned slot and visible badge both expose that same non-empty
`data-renuvex-product-id`; missing, malformed, stale, or mismatched identity
produces no badge.

## Summary
Small inline star rating and count shown on the product detail page near the product title. The surface entry is [src/widget/rating-badge/index.js](src/widget/rating-badge/index.js), DOM injection lives in [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js), and production placement proof lives in [capability.js](src/widget/placement/capability.js). Product `AggregateRating` JSON-LD is no longer owned by this badge; it lives in the independent [[Structured_Data_And_Rich_Snippets]] surface.

## Settings (`badge` widgetId)
Settings live under `WidgetSettings.settings` with `widgetId='badge'`. Source schema: [catalog.ts](src/lib/widgets/catalog.ts).

Fields:
- `enabled` — toggle; also gates the listing/card badges.
- `size` — small / medium / large; applies to **both** the PDP title badge and listing-card badges via shared `SIZE_MAP` (icon + text together). See [[ADR_0016_Rating_Visual_System]].
- `mobileOverride` (toggle) + `mobileSize` (small/medium/large) — opt-in mobile preset. When on, an `@media (max-width:640px)` block in `<style id="renuvex-pr-badge-tokens">` overrides desktop tokens. See [[ADR_0017_Badge_Architecture]].
- `alignment` — explicitly controls the badge row alignment on PDP and listing
  surfaces.
- `showValue`, `showCount` — independently control the visible numeric rating
  and review count while the accessible rating label remains available.

The star **icon** and **color** are NOT on this widget. They come from the
global rating visual system - the `reviews` widget's `reviewIcon` /
`reviewStarColor`. The badge surface resolves the icon pair (`getIconFromSettings`)
and passes it into `injectRatingBadge`; the star color is applied through the
`--renuvex-pr-review-star-color` CSS variable. See [[ADR_0016_Rating_Visual_System]].

## Where it appears
- Product detail page only.
- Anchored next to the exact title/mount pair returned by the selected strict placement provider.
- `injectRatingBadge` revalidates the proof and requires
  `productId === placementProof.productId` before mutation. Both the
  `product-title-rating` slot and its inner badge carry that Product ID.
- Updated when the product detail loads or SPA-nav fires the observer.
- The product-title badge is a separate `badge` feature and lazy surface. It is gated by the merchant toggle, versioned placement policy, exact proof, and post-request stale revalidation; it is independent of the review-section mount.
- The review section is opt-in through `<div data-renuvex-widget="reviews"></div>`. If that mount is missing, the review section does not render, but the PDP title badge can still render. Related bug: [[Bug_Product_Widget_Missing_Auto_Mount]].

## Notes
- Unsupported, partial, or ambiguous title markup is a no-op. Add or amend a strict adapter only after cross-theme negative fixtures and browser availability evidence; do not widen `core/product-title.js`, which is retained for preview only.
- The badge uses `/api/public/ratings?productIds=<id>` instead of the full review payload. That keeps badge-only PDPs off the heavy review-section fetch/render path. See [[ADR_0024_Badge_Review_Surface_Separation]].
- Star glyphs render via a shared SVG `<symbol>` sprite (`<use>` into `#renuvex-pr-icon-sprite`), not inline `<path>`. The badge is a real link named by an sr-only `aria-labelledby` span (no `role="figure"`, no static `id`); alignment comes from `data-renuvex-align`. See [[ADR_0019_Icon_Sprite_Rendering]].
- Admin customization uses the shared production-renderer iframe. The `Ürün`
  scene invokes `injectRatingBadge`; the `Liste` scene invokes the listing
  badge injector on three fixture cards. There is no separate React badge mock.
- `ensureBadgeTokens()` establishes base badge CSS before writing configured
  size tokens. This order is required so a cold first render applies the saved
  desktop/mobile size instead of letting base defaults win the cascade.

## Related Source Files
- [src/widget/rating-badge/index.js](src/widget/rating-badge/index.js)
- [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js)
- [src/widget/surfaces/rating-badge.surface.js](src/widget/surfaces/rating-badge.surface.js)
- [src/widget/placement/capability.js](src/widget/placement/capability.js)
- [src/widget/core/state.js](src/widget/core/state.js)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[Bug_Product_Widget_Missing_Auto_Mount]]
