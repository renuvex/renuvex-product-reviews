---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-05-25
tags:
  - bug
  - widget
  - storefront
  - reliability
related:
  - "[[Bug_Index]]"
  - "[[Product_Review_Widget]]"
  - "[[Product_Rating_Badge]]"
  - "[[Widget_Files_Map]]"
---

# Bug - Product Widget Missing Auto Mount

## Date
2026-05-11

## Status
Fixed on 2026-05-11. **Superseded 2026-05-25:** the auto-mount / self-mount behavior described here was intentionally removed in favor of an **opt-in** review mount — the review section now renders only where the merchant places `<div data-renuvex-widget="reviews"></div>` (no auto-create, no `main`/`body` fallback). The PDP rating badge is now decoupled and auto-places on the product title independently (gated by the badge widget toggle). See [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]] and [[Log]].

## Area
Storefront widget, product detail page, review block, product rating badge

## Symptoms
After deploy, the product detail review area and the rating badge under the product title could both disappear.

## Scenario
1. The widget script loads on a product detail page and detects the product correctly.
2. `/api/public/settings` and `/api/public/reviews` can still return usable data.
3. The merchant theme does not include `#ikas-reviews-anchor`, or the anchor is removed by a theme/template change.
4. [render.js](src/widget/product-widget/render.js) used to return early when the anchor was missing.
5. Because the return happened before `injectRatingBadge(...)`, both the review block and the product-title badge disappeared together.

## Root Cause
[render.js](src/widget/product-widget/render.js) treated `#ikas-reviews-anchor` as mandatory. The widget was therefore coupled to a manually present theme anchor even though the script itself is auto-injected into storefronts.

## Fix
Historical 2026-05-11 fix, now superseded by the 2026-05-25 opt-in mount contract:

[render.js](src/widget/product-widget/render.js) now calls `getOrCreateReviewsAnchor()`:

- If `#ikas-reviews-anchor` exists, it uses it.
- If not, it creates the anchor with `data-renuvex-auto-anchor="1"`.
- The generated anchor is inserted after the theme product container selector from [theme.js](src/widget/themes/ozy/theme.js).
- If the product container cannot be found, it falls back to `main` or `body`.

This keeps existing merchant-provided anchors compatible while making the PDP review block self-mounting.

## Files Changed
- [src/widget/product-widget/render.js](src/widget/product-widget/render.js)
- [public/widget.js](public/widget.js)

## Prevention
- Current contract: the review section intentionally depends on an explicit `<div data-renuvex-widget="reviews"></div>` mount.
- Product rating badge injection must not be indirectly blocked by review block mount-point lookup.
- Smoke test product pages both with and without `<div data-renuvex-widget="reviews"></div>`: missing mount should hide only the review section, not the PDP title badge.

## Related Notes
- [[Product_Review_Widget]]
- [[Product_Rating_Badge]]
- [[Widget_Files_Map]]
- [[Bug_Index]]

## Change Log
- 2026-05-25: Marked the self-mounting behavior as superseded by the opt-in review mount contract and independent PDP badge injection.
- 2026-05-11: Fixed by adding self-mounting fallback anchor creation in [render.js](src/widget/product-widget/render.js).
