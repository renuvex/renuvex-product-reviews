---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - widget
  - listing
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Widget_Architecture]]"
---

# Listing Rating Widget

## Summary
Star+count badge injected into product cards on collection / search / category pages. Drives social proof outside the PDP. Implemented under [src/widget/listing-badges/](src/widget/listing-badges/).

## Components
| File | Role |
|---|---|
| [index.js](src/widget/listing-badges/index.js) | Bootstrap (decide if current page is a listing page) |
| [collect.js](src/widget/listing-badges/collect.js) | Discover candidate product cards via theme-agnostic heuristics |
| [ratings.js](src/widget/listing-badges/ratings.js) | Bulk fetch `/api/public/ratings-by-slug?slugs=...` |
| [inject.js](src/widget/listing-badges/inject.js) | Insert star+count badge into each card |

## API
- Endpoint: `GET /api/public/ratings-by-slug?storeId=<id>&slugs=a,b,c` ([src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts))
- Server: groups approved reviews by slug, returns `{ slug: { avg: '4.5', count: 12 } }`.
- Bulk fetch (one request per page) instead of per-card requests.
- Max 100 slugs per request — server-side cap.

## Performance notes
- Single API call per listing page = small fixed cost regardless of # of products on screen.
- Server caches at edge with `s-maxage=60, stale-while-revalidate=300`.
- DOM injection uses `requestAnimationFrame` or batched mutations where appropriate (verify in `inject.js`).

## Settings
Listing widget is currently **not separately configurable** in the admin (no dedicated `widgetId`); it inherits style from the `badge` widget settings or the global theme. ❓ Confirm by reading [src/widget/listing-badges/inject.js](src/widget/listing-badges/inject.js) before relying on this.

## Notes
- Card discovery heuristics (in `collect.js`) vary by theme. Edge cases:
  - Themes that lazy-load cards with IntersectionObserver — handled by our MutationObserver.
  - Themes that render slugs differently from product URLs — verify slug parsing.
- If a card moves (e.g., theme reflows), the badge may end up in a stale position. Watch for re-injection logic.

## Related Source Files
- [src/widget/listing-badges/](src/widget/listing-badges/)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Widget_Architecture]]
- [[Caching_And_Performance]]
- [[Ikas_Theme_Limitations]]
