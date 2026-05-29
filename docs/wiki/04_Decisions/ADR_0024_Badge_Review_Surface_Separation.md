---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-27
updated: 2026-05-29
last_verified: 2026-05-29
confidence: high
tags:
  - adr
  - widget
  - performance
  - lazy-loading
  - badge
related:
  - "[[Decision_Index]]"
  - "[[ADR_0013_Modular_Widget_Loader_Architecture]]"
  - "[[ADR_0016_Rating_Visual_System]]"
  - "[[ADR_0022_Placement_Allowlist_And_Lazy_Resync]]"
  - "[[ADR_0023_Widget_Lifecycle_Gating_Contract]]"
  - "[[Widget_Performance]]"
  - "[[Test_Strategy]]"
source_files:
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/core/rating-summary.js"
  - "src/widget/structured-data/index.js"
  - "src/widget/structured-data/jsonld.js"
  - "src/widget/surfaces/rating-badge.surface.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/surfaces/index.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/events.js"
  - "src/widget/loader.js"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "playwright.widget.config.ts"
  - ".github/workflows/widget-smoke.yml"
  - "public/widget-runtime/build-manifest.json"
---

# ADR 0024: Badge / Review Section Surface Separation

## Status
Accepted (2026-05-27).

## Context
The PDP rating badge and the review section were still partially coupled after the opt-in review mount work. A merchant could enable the badge and omit `<div data-renuvex-widget="reviews"></div>`, but the product surface still paid for review-section orchestration before the badge could render.

That is a legitimate merchant setup: some stores want only the lightweight title rating on PDPs and no full reviews block in the page. Competitor review apps generally model badges and review sections as separate storefront surfaces with separate lazy chunks.

## Decision
The PDP rating badge is now its own storefront surface.

- `rating-badge.surface.js` detects `ctx.trigger === 'product'` and loads a dedicated `rating-badge-*` chunk.
- `rating-badge/index.js` owns settings fetch, badge enabled gate, `isAutoPlacementEnabled()` gate, one-product `/api/public/ratings` fetch, and the final call into `injectRatingBadge`.
- `rating-badge/inject.js` owns PDP badge DOM cleanup and injection.
- `reviews-section/render.js` no longer injects the PDP badge or derives a rating summary from the full reviews payload.
- `reviews-section/bootstrap.js` now returns before `fetchReviews` / `fetchPhotoStripReviews` when the explicit reviews mount is absent, and dynamically imports `render.js` only after that mount check and the review fetches. This import boundary is required; a static `render.js` import pulls the review content chunk back into the bootstrap path.
- `reviews-section/reviews-api.js` owns shared review/photoStrip fetch helpers and the explicit review-fetch error result, so `bootstrap.js` remains orchestration and `render.js` can reuse the same data contract.
- `loader.js` keeps the 2-second listing-badges fallback but requires product-card-like DOM candidates (same-origin product-like link + nearby image, at least two unique products) so clean PDPs do not eagerly load the listing-badges chunk.

## Reasoning
- The review section and the badge have different ownership: the review section is explicit-mount, shadow-isolated, and heavy; the badge is auto-placed, light DOM, and small.
- The existing `/api/public/ratings` endpoint is the right data source for the badge-only path. It avoids mining a title badge summary from the full reviews response.
- Cleanup must belong to the owning surface. If review bootstrap removes badge DOM or JSON-LD, it races independent surfaces and can remove their result after render. Badge DOM cleanup belongs to the badge surface; JSON-LD cleanup now belongs to the structured-data surface.
- The review bootstrap chunk must stay light. Mount gating alone is not enough if bootstrap statically imports the review renderer, because the browser downloads the heavy render chunk before the function can return.
- 2026-05-29 update: JSON-LD moved out of the badge feature into the independent structured-data surface. `AggregateRating` can be valid when a visible review section renders even if the merchant disables the visual badge.
- Old content-hashed runtime files are not manually deleted. `scripts/build-widget.mjs` intentionally keeps unreferenced immutable assets for seven days so cached loaders do not 404 during deploy overlap.

## Consequences
- Badge-only PDPs download the lightweight rating-badge chunk and call `settings + ratings`, not the review render/BIG chunks or review/photoStrip endpoints.
- PDPs with a review mount still load both surfaces: rating badge first, then review bootstrap/render.
- Badge disabled, unsupported themes, no ratings, and rating fetch failures clean stale PDP badge DOM before returning. Structured-data gates and cleans JSON-LD separately.
- SPA pathname changes clean the new owned-slot/class badge and owned JSON-LD without importing either lazy implementation chunk from `events.js`; when chunks are already loaded, `window.__renuvexPrCleanupPdpBadge` and `window.__renuvexPrCleanupStructuredData` run the richer cleanup paths.
- `ADR_0023` remains the lifecycle contract; this ADR retroactively applies it to the PDP badge.
- Follow-up hardening keeps the same public behavior but makes the ownership boundaries explicit: badge surface owns badge cleanup/injection, review bootstrap owns only review-section orchestration, `reviews-api.js` owns review/photoStrip data access, and `loader.js` owns the legacy listing fallback probe.

## Alternatives Considered
- Keep badge inside review render: rejected because badge-only merchants still pay review-section network and chunk costs.
- Gate the surface descriptor by settings before loading the badge chunk: rejected for the same reason as ADR_0023; settings belongs inside the entry chunk.
- Server-side badge rendering: rejected because the current ikas integration is script-injection based and has no product-template server hook.
- Manual deletion of old runtime hash files: rejected because content-hashed files are immutable deploy-overlap assets. The build script retention policy is the safety mechanism.

## Verification
- `rg "injectRatingBadge\\(" src/widget` shows only `rating-badge/inject.js` definition/self-heal and `rating-badge/index.js` caller.
- `public/widget-runtime/build-manifest.json` includes `entryPoint: "src/widget/rating-badge/index.js"` for the active `rating-badge-*` chunk.
- `pnpm test:widget-smoke` covers the browser-visible ADR contract: mount present loads review APIs/render chunk; mount absent keeps visual badge and skips review APIs/render chunk; badge disabled skips visual badge while the structured-data surface can still fetch ratings when an explicit review section is visible; unsupported auto-placement skips visual badge while explicit reviews can still support JSON-LD.
- `pnpm test:widget-runtime` and `pnpm test:widget-interactions` add review-section render/layout and lightbox/wizard coverage around the same split, so review-section changes do not accidentally re-couple badge behavior.
- `pnpm build:widget`, `node --check public/widget.js`, `pnpm exec tsc --noEmit`, `pnpm lint`, `git diff --check`, and `node scripts/wiki-audit.mjs --changed-source-check`.
- Smoke scenarios: Ozy PDP with mount, Ozy PDP without mount, badge disabled, unsupported/generic theme, SPA PDP-to-PDP navigation, and clean PDP listing fallback.

## Related Source Files
- [src/widget/rating-badge/index.js](src/widget/rating-badge/index.js)
- [src/widget/rating-badge/inject.js](src/widget/rating-badge/inject.js)
- [src/widget/core/rating-summary.js](src/widget/core/rating-summary.js)
- [src/widget/structured-data/index.js](src/widget/structured-data/index.js)
- [src/widget/structured-data/jsonld.js](src/widget/structured-data/jsonld.js)
- [src/widget/surfaces/rating-badge.surface.js](src/widget/surfaces/rating-badge.surface.js)
- [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js)
- [src/widget/reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js)
- [src/widget/reviews-section/render.js](src/widget/reviews-section/render.js)
- [src/widget/events.js](src/widget/events.js)
- [src/widget/loader.js](src/widget/loader.js)
