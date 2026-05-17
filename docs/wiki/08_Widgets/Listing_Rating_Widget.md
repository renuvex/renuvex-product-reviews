---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-17
last_verified: 2026-05-17
confidence: high
tags:
  - widget
  - listing
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Widget_Architecture]]"
  - "[[Bug_Listing_Badge_Stars_Direct_Load]]"
  - "[[Phase_1_Widget_Runtime_Audit]]"
  - "[[Phase_2_Widget_Module_Split_Plan]]"
source_files:
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/listing-badges/ratings.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/widget/themes/ozy/theme.js"
---

# Listing Rating Widget

## Summary
Star+count badge injected into product cards on collection / search / category pages. Drives social proof outside the PDP. Implemented under [src/widget/listing-badges/](src/widget/listing-badges/). As of Phase 2 implementation work on 2026-05-17, listing badges are lazy-loaded through the surface registry instead of being part of the initial runtime.

## Components
| File | Role |
|---|---|
| [index.js](src/widget/listing-badges/index.js) | Bootstrap (decide if current page is a listing page) |
| [collect.js](src/widget/listing-badges/collect.js) | Discover candidate product cards via theme-agnostic heuristics |
| [ratings.js](src/widget/listing-badges/ratings.js) | Bulk fetch `/api/public/ratings-by-slug?slugs=...` |
| [inject.js](src/widget/listing-badges/inject.js) | Insert star+count badge into each card |
| [listing-badge.surface.js](src/widget/surfaces/listing-badge.surface.js) | Lazy surface descriptor for page/listing/search contexts |
| [themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js) | Ozy fallback placement adapter for container/title/ignore rules |

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
- Cold direct entry to home/category/search pages once rendered listing badges as `avg (count)` text without star icons (`.ikr-star` spans were 0×0). Root cause: `#ikr-styles` — which carries the `.ikr-star` `display:inline-flex` rule — was injected only by the PDP `render.js` path. Fixed 2026-05-17: `core/badge.js` self-injects `#ikr-badge-styles` via `ensureBadgeStyles()`, independent of the PDP path. See [[Bug_Listing_Badge_Stars_Direct_Load]].
- The full Phase 1 listing audit checklist lives in [[Phase_1_Widget_Runtime_Audit]].

## Selector Allowlist / Blocklist Risk

Current listing badge placement is guarded by an Ozy fallback adapter:

- Allowlist seed: [THEME_PRODUCT_CONTAINERS](src/widget/themes/ozy/theme.js) limits injection to known product-list, slider, infinite-scroll, single-product, and product-block containers.
- Blocklist methods in [themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js) skip header/nav, basket/cart, banner/hero/marquee, and most non-title links inside the single-product section.
- Title detection still uses the adapter title selector first, then generic `productTitle` / `productName` class patterns, exact product-name text, and structural leaf-node fallback in [inject.js](src/widget/listing-badges/inject.js).

This protects against obvious footer/menu/header false positives, but it is not a complete cross-theme contract. If a merchant adds a new section with product-name links, or a theme reuses product-like classes in editorial/menu/footer areas, badges may be injected in unrelated places or missed in valid product cards. Phase 2 moved the rules into a structured adapter/fallback layer, but dev-store/browser verification still has to prove that cold home/category/search, SPA navigation, lazy sliders, and merchant-added sections behave correctly with the ESM split runtime.

## Related Source Files
- [src/widget/listing-badges/](src/widget/listing-badges/)
- [src/widget/surfaces/listing-badge.surface.js](src/widget/surfaces/listing-badge.surface.js)
- [src/widget/themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Widget_Architecture]]
- [[Caching_And_Performance]]
- [[Ikas_Theme_Limitations]]
- [[Bug_Listing_Badge_Stars_Direct_Load]]
- [[Phase_1_Widget_Runtime_Audit]]
- [[Phase_2_Widget_Module_Split_Plan]]

## Change Log
- 2026-05-17: Phase 2 implementation started: listing badges are now lazy-loaded through `listing-badge.surface.js` and `core/lazy-modules.js`; `VIEW_SEARCH_RESULTS` product arrays are handled beside verified `VIEW_LISTING`; Ozy allowlist/blocklist rules moved into `themes/ozy/adapter.js`. Live dev-store/network/Sentry verification is still required before closing Phase 2.
- 2026-05-17: Cold-entry missing-star bug fixed — the badge factory (`core/badge.js`) now self-injects its star CSS via `ensureBadgeStyles()` (`#ikr-badge-styles`), no longer depending on the PDP-only `#ikr-styles`. Live placement audit on home/category/search/clothing found no false positives. See [[Bug_Listing_Badge_Stars_Direct_Load]], [[Phase_1_Widget_Runtime_Audit]].
- 2026-05-17: Documented the old Ozy selector allowlist/blocklist risk. Phase 1 must test false positives/negatives across menus, footer, banners, sliders, category/search grids, and merchant-added sections; Phase 2 should move this into a structured adapter/fallback layer.
- 2026-05-17: Added Phase 1 cold-entry verification note for listing badges missing star icons on direct home/category/listing entry. Related bug: [[Bug_Listing_Badge_Stars_Direct_Load]].
