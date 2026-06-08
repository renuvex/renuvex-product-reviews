---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-01
last_verified: 2026-06-01
confidence: high
tags:
  - widget
  - performance
related:
  - "[[Index]]"
  - "[[Caching_And_Performance]]"
  - "[[Widget_Architecture]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Yotpo_Protein_Ocean_Widget_Research]]"
source_files:
  - "scripts/build-widget.mjs"
  - "scripts/check-widget-runtime.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "playwright.widget.config.ts"
  - "vitest.config.ts"
  - "tests/widget-harness.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/unit/widget-surface-contracts.test.ts"
  - ".github/workflows/widget-smoke.yml"
  - "src/widget/classic-loader.js"
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/observer.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/core/settings.js"
  - "src/widget/core/rating-summary.js"
  - "src/widget/listing-badges/fallback-candidates.js"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/structured-data/index.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/lib/review-media.ts"
  - "scripts/backfill-review-media.mjs"
  - "docs/wiki/10_Research/Widget_Transfer_Measurement_2026-05-29.md"
---

# Widget Performance

## Summary
The widget runs on every storefront page in the world that hosts our merchants. Bundle size, time to interactive, and request fan-out are the three numbers that matter.

## Current footprint
- Phase 3 local build output on 2026-05-17: `public/widget.js` is a classic compatibility loader (~1.6 KB), `public/widget-runtime/runtime.js` is a tiny stable shim, the active ESM entry is content-hashed (`runtime-*.js`, ~9.6 KB), and heavy PDP/product rendering is behind lazy ESM chunks.
- `public/widget-runtime/build-manifest.json` records output bytes and import kinds. In the local build, the runtime entry has dynamic imports for rating badge, product bootstrap, listing badges, and preview/product render.
- The deployed pre-Phase-2 `https://new-ikas-app.vercel.app/widget.js?...` response measured `177763` bytes on 2026-05-15. Re-measure after deployment before claiming live performance improvement.
- Initial requests on PDP with a review mount: settings, ratings, reviews, and photoStrip. Badge-only PDPs use settings + ratings and skip the review render/BIG chunks plus reviews/photoStrip APIs (ADR_0024).
- A PDP that also has product carousels mounts the listing-badge surface alongside reviews-main; `core/settings.js` shares one in-flight settings request across both surfaces, so `/api/public/settings` is fetched once, not twice (fixed 2026-05-17).
- Initial requests on listing page: 1 (`/api/public/ratings-by-slug` — bulk).
- Image upload: client-direct to Cloudinary; no proxy through our server.
- 2026-05-24 (ADR_0019): read-only rating stars render via one injected SVG `<symbol>` sprite + `<use>` instead of inlining the full `<path>` per star. Measured before the change on the live dev store: ~76 KB of duplicated `<path>` data on a busy PDP (10 reviews) and ~4.6 KB per listing badge (linear in catalog size). The sprite defines the geometry once, so each star becomes a small `<use>` ref. Re-measure live DOM path bytes after deploy.
- 2026-05-27 (ADR_0024): PDP title badge is separated into a `rating-badge-*` lazy chunk. If the merchant omits `<div data-renuvex-widget="reviews"></div>`, the storefront avoids review render/BIG chunks and the reviews/photoStrip API calls. `reviews-section/bootstrap.js` must not statically import `render.js`; it dynamically imports the renderer only after the explicit mount check and review fetch path.
- 2026-05-27 follow-up: review/photoStrip fetch helpers live in `reviews-section/reviews-api.js`, not bootstrap. The 2-second listing fallback in `loader.js` now requires product-card-like DOM candidates (same-origin product-like links with nearby images) before loading the listing-badges entry chunk, reducing false-positive loads on clean PDPs.
- 2026-05-28 CI guard, updated 2026-05-29: `pnpm test:widget-smoke` is the executable network/chunk contract. It asserts that badge-only PDPs skip `render-*` and `/api/public/reviews`, badge-disabled PDPs keep JSON-LD when the explicit review section renders, unsupported auto-placement skips visual badges while explicit reviews can still support JSON-LD, and generic-link pages do not trigger the listing fallback chunk.
- 2026-05-28 quality gate expansion: `pnpm test:ci` now adds runtime layout smoke, lightbox/wizard flows, admin preview/settings checks, and public API/theme-state unit tests around the network contract. This catches regressions in behavior and lazy boundaries but does not enforce byte budgets yet.
- 2026-05-28 transfer evidence: `pnpm test:widget-smoke` attaches `widget-transfer-evidence.json` for mount-present/mount-absent and badge-on/badge-off local harness scenarios. This is evidence for regressions and review, not a hard CDN transfer-size budget.
- 2026-05-29 deployed evidence: `pnpm measure:deployed-widget` measures the real deployed `https://new-ikas-app.vercel.app/widget.js` and immutable runtime chunks while mocking merchant HTML and `/api/public/*` responses. Latest controlled run is recorded in [[Widget_Transfer_Measurement_2026-05-29]]. It confirms the review render chunk and reviews API calls are skipped when the explicit review mount is absent. After the structured-data split, badge-disabled + review-mounted PDPs still call `/api/public/ratings` once for JSON-LD; badge-disabled + mount-absent PDPs skip ratings and JSON-LD.
- 2026-05-29 fallback determinism: the legacy 2-second listing fallback candidate probe lives in `listing-badges/fallback-candidates.js` and is covered by negative tests for generic links, external links, nav/footer links, one product-like link, and product-like links without nearby media. Positive product-card DOM still loads the listing chunk and calls `ratings-by-slug`.
- 2026-05-29 surface contract gate: `tests/unit/widget-surface-contracts.test.ts` fails if a new `src/widget/surfaces/*.surface.js` file is added without declaring which test layer covers it.
- 2026-05-31 clean PDP routing: `PRODUCT` `PAGE_VIEW` no longer loads the `listing-badges-*` entry chunk on clean PDPs. The listing surface accepts page events only for listing-like page types (`INDEX`, `CATEGORY`, `BRAND`, `SEARCH`), while observer and fallback probes ignore widget-owned hash/query links such as the PDP badge's `#renuvex-reviews` anchor. Listing event and product-card fallback paths remain covered by network smoke.
- 2026-06-01 `PAGE_VIEW` semantic dedupe: same-page duplicate `PAGE_VIEW` events inside 800 ms are still suppressed, but distinct fast transitions are no longer delayed until the 2-second listing fallback. The network smoke suite covers both outcomes.
- 2026-06-07 media read path: widget request/response shape is unchanged, but public `hasImages=true` reads now use indexed `Review.hasImages` and images are formatted from normalized `ReviewMedia` first. This is a backend read-path optimization for photo strip / photo filter scale, not a widget bundle change.

## 2026-05-15 Live Observations

Dev store smoke test:

- storefront HTML included one `new-ikas-app.vercel.app/widget.js` script tag
- homepage DOM had listing badges mounted
- product page DOM had `#ikas-reviews-widget` and `#ikas-reviews-anchor`
- public settings, reviews, and ratings endpoints returned 200
- deployed widget response header was `Cache-Control: public, max-age=0, must-revalidate` — **current again as of 2026-06-02 for stable entrypoints**: `vercel.json` now revalidates `/widget.js` and `/widget-runtime/runtime.js` while keeping content-hashed runtime/chunks immutable; see [[Caching_And_Performance]]

Yotpo/Protein Ocean reference:

- Yotpo uses many small versioned modules instead of one ever-growing widget bundle
- static Yotpo modules used long cache headers such as `max-age=31536000`
- dynamic review/rating/Q&A API responses used `max-age=0, no-cache, no-store`
- page runtime loaded star rating, main reviews, Q&A, media gallery, filters, CSS overrides, fonts, and pixels as separate resources

## Hot levers
- **Bundle size**: avoid heavy deps. The widget is plain JS — no framework. Don't add one without an ADR.
- **Edge cache TTL**: currently 60s. Trade-off vs moderation latency. Don't lower without reason; consider raising for read-heavy merchants.
- **Listing-page badges**: bulk endpoint with single round-trip — preserve this pattern when adding features.
- **Image transformations**: prefer Cloudinary URL params (`f_auto,q_auto,w_400`) over post-load resizing.
- **Media read model**: future media-heavy widgets should read `ReviewMedia` or a dedicated read model, not parse `Review.images` text.
- **Review list pagination**: load-more should use `nextCursor` / cursor requests. Keep legacy `page` only for compatibility or explicit numbered pagination UI.
- **Module split**: current Phase 2 work uses one classic ikas-compatible loader plus lazy ESM modules. New major surfaces such as Q&A, media gallery upgrades, review summaries, analytics, and schema should follow the same loader/registry pattern.

## Anti-patterns to avoid
- Per-card requests on listing pages → quadratic cost.
- Synchronous DOM mutations in tight loops without `requestAnimationFrame` batching.
- Adding `<link>` or `<style>` elements that block paint — inject styles at end of body or via `adoptedStyleSheets`.
- Polling. Use the existing MutationObserver pattern.

## Measurement ideas
- Add a `?w=<bundle-version>` to widget script src and report a Vercel Analytics event on first run, including bundle size + first-render time.
- Lighthouse CI for a representative storefront page.
- Promote the current transfer evidence attachment to hard budgets only after live CDN headers and gzip/brotli variance are measured over multiple deploys.
- Keep running `pnpm measure:deployed-widget` after runtime-affecting deploys. Treat the result as evidence until several production samples are stable enough for a byte budget.

## Notes
- When adding a feature, ask: "Does this need to ship to every page, or only to PDPs?" Listing-only / PDP-only branches matter.
- Heavy code paths should stay behind the ESM lazy module boundary and should not be statically imported by `src/widget/loader.js`, `src/widget/index.js`, or always-loaded core modules.
- Browser support target is ES2017 (per esbuild config). Don't use newer syntax that wouldn't transpile.

## Related Source Files
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js)
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)

## Obsidian Links
- [[Caching_And_Performance]]
- [[Widget_Architecture]]
- [[ADR_0027_Review_Media_Read_Model]]
- [[ADR_0028_Review_Cursor_Pagination]]
- [[Test_Strategy]]
- [[Storefront_Widget_Overview]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Yotpo_Protein_Ocean_Widget_Research]]
