---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-20
last_verified: 2026-05-18
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
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[ADR_0016_Rating_Visual_System]]"
source_files:
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/dom.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/listing-badges/ratings.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/core/link-scope.js"
  - "src/widget/observer.js"
  - "src/widget/core/storefront-context.js"
  - "src/app/api/public/ratings/route.ts"
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
| [dom.js](src/widget/listing-badges/dom.js) | Scoped link discovery from theme product containers, with `main` fallback instead of whole-document scans |
| [core/link-scope.js](src/widget/core/link-scope.js) | Shared scoped link collection used by listing badges and the MutationObserver re-render gate |
| [collect.js](src/widget/listing-badges/collect.js) | Build product targets from scoped candidate links and merge Storefront Events product ids |
| [ratings.js](src/widget/listing-badges/ratings.js) | Bulk fetch `/api/public/ratings?productIds=...`; falls back to slug only when no product id exists |
| [inject.js](src/widget/listing-badges/inject.js) | Insert star+count badge into each card |
| [listing-badge.surface.js](src/widget/surfaces/listing-badge.surface.js) | Lazy surface descriptor for page/listing/search contexts |
| [themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js) | Ozy fallback placement adapter for container/title/ignore rules |

## API
- Primary endpoint: `GET /api/public/ratings?storeId=<id>&productIds=a,b,c` ([src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)).
- Fallback endpoint: `GET /api/public/ratings-by-slug?storeId=<id>&slugs=a,b,c` ([src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)) for DOM-only contexts where ikas Events did not provide product ids. The endpoint first resolves current slugs through `ProductSnapshot`, then reads reviews by `productId`; legacy direct `Review.slug` lookup is last resort only.
- Server groups approved reviews by `productId`, returns `{ productId: { avg: '4.5', count: 12 } }` on the primary path.
- Bulk fetch (one request per batch) instead of per-card requests.
- Max 100 ids/slugs per request — server-side cap.

## Identity Contract
- Canonical review product identity is `(storeId, productId)`; see [[ADR_0015_Canonical_Product_Identity]].
- `core/storefront-context.js` records `VIEW_LISTING` and `VIEW_SEARCH_RESULTS` `productDetails[]` as `slug -> { productId, name }`.
- `slug` and `productName` are display snapshots only. They are still useful for DOM matching and modal title matching, but they are not the primary review join key when `productId` is present.

## Performance notes
- Single API call per listing page = small fixed cost regardless of # of products on screen.
- Server caches at edge with `s-maxage=60, stale-while-revalidate=300`.
- DOM discovery is scoped to theme product containers first, then `main/[role=main]` fallback; it no longer starts from every link in the whole document.
- MutationObserver re-render checks use the same scoped discovery path, so lazy product-card changes do not trigger a whole-document `document.querySelectorAll('a[href]')` scan.
- Badge slots are reserved before rating data finishes loading and replaced in place when real ratings arrive, reducing listing-card layout shift.

## Settings
Listing badges have no dedicated `widgetId`. Visibility is gated by the `badge`
widget's `enabled` toggle ([index.js](src/widget/listing-badges/index.js)). The
star **icon** and **color** come from the global rating visual system — the
`reviews` widget's `reviewIcon` / `reviewStarColor` — which `index.js` resolves
(`getIconFromSettings`) and applies via the single `--ikr-review-star-color`
CSS variable before injecting badges. Badge stars are no longer hardcoded to
`star:classic`. See [[ADR_0016_Rating_Visual_System]].

## Notes
- Card discovery heuristics (in `collect.js`) vary by theme. Edge cases:
  - Themes that lazy-load cards with IntersectionObserver — handled by our MutationObserver.
  - Themes that render slugs differently from product URLs — verify slug parsing.
- If a card moves (e.g., theme reflows), the badge may end up in a stale position. Watch for re-injection logic.
- DOM-only fallback is snapshot-backed: current slug resolves to product id through `ProductSnapshot`. If a snapshot is missing, legacy direct slug lookup remains as a compatibility path.
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
- [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Widget_Architecture]]
- [[Caching_And_Performance]]
- [[Ikas_Theme_Limitations]]
- [[Bug_Listing_Badge_Stars_Direct_Load]]
- [[Phase_1_Widget_Runtime_Audit]]
- [[Phase_2_Widget_Module_Split_Plan]]
- [[ADR_0015_Canonical_Product_Identity]]

## Change Log
- 2026-05-19: Listing badge star icon + color are now single-sourced from the `reviews` widget (`reviewIcon`/`reviewStarColor`) instead of a hardcoded `star:classic` and the dead `badge.color`. `index.js` parses the icon and sets the star color CSS variables on the listing path itself, so cold listing entry shows the correct icon/color without depending on the PDP `render.js`. `iconPair` is threaded through `injectBadges` → `createBadgeEl`. See [[ADR_0016_Rating_Visual_System]].
- 2026-05-18: Post-deploy live retest on `dev-mertcopper.ikas.shop` confirmed `runtime-2RGD2H4S.js`, visible listing badges on `/clothing` desktop/mobile, and zero widget-sourced `document.querySelectorAll('a[href]')` calls.
- 2026-05-18: Follow-up O8 live test found the MutationObserver still calling whole-document `document.querySelectorAll('a[href]')` from the runtime. Fixed by sharing scoped link discovery through `core/link-scope.js`; active generated runtime now avoids that scan.
- 2026-05-18: Reduced listing badge layout shift and DOM scan cost. `dom.js` now scopes candidate link discovery to theme product containers/main content, and `index.js`/`inject.js` reserve invisible badge slots while ratings are in flight before replacing them with real badges.
- 2026-05-17: Listing/search badges now prefer canonical product-id rating reads via `/api/public/ratings?productIds=...`. `ratings-by-slug` remains only as DOM fallback. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: DOM fallback now uses `ProductSnapshot` before legacy slug reads, backed by ikas product webhooks/backfill.
- 2026-05-17: Phase 2 implementation and live verification closed: listing badges lazy-load through `listing-badge.surface.js` and `core/lazy-modules.js`; `VIEW_SEARCH_RESULTS` product arrays are handled beside verified `VIEW_LISTING`; Ozy allowlist/blocklist rules moved into `themes/ozy/adapter.js`.
- 2026-05-17: Cold-entry missing-star bug fixed — the badge factory (`core/badge.js`) now self-injects its star CSS via `ensureBadgeStyles()` (`#ikr-badge-styles`), no longer depending on the PDP-only `#ikr-styles`. Live placement audit on home/category/search/clothing found no false positives. See [[Bug_Listing_Badge_Stars_Direct_Load]], [[Phase_1_Widget_Runtime_Audit]].
- 2026-05-17: Documented the old Ozy selector allowlist/blocklist risk. Phase 1 must test false positives/negatives across menus, footer, banners, sliders, category/search grids, and merchant-added sections; Phase 2 should move this into a structured adapter/fallback layer.
- 2026-05-17: Added Phase 1 cold-entry verification note for listing badges missing star icons on direct home/category/listing entry. Related bug: [[Bug_Listing_Badge_Stars_Direct_Load]].
