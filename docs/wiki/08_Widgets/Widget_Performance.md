---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-03
last_verified: 2026-07-03
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
  - "[[Storefront_CDN_Performance_Benchmark]]"
source_files:
  - "scripts/build-widget.mjs"
  - "scripts/check-widget-runtime.mjs"
  - "scripts/check-widget-performance-budget.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "config/widget-performance-budget.json"
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
  - "src/widget/core/listing-viewport-gate.js"
  - "src/widget/core/rating-summary.js"
  - "src/widget/listing-badges/fallback-candidates.js"
  - "src/widget/surfaces/reviews-main.surface.js"
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
  - "docs/wiki/10_Research/Widget_Transfer_Measurement_2026-05-29.md"
---

# Widget Performance

## Summary
The widget runs on every storefront page in the world that hosts our merchants. Bundle size, time to interactive, and request fan-out are the three numbers that matter.

## Current footprint
- Phase 3 local build output on 2026-05-17: `public/widget.js` is a classic compatibility loader (~1.6 KB), `public/widget-runtime/runtime.js` is a tiny stable shim, the active ESM entry is content-hashed (`runtime-*.js`, ~9.6 KB), and heavy PDP/product rendering is behind lazy ESM chunks.
- `public/widget-runtime/build-manifest.json` records output bytes and import kinds. In the local build, the runtime entry has dynamic imports for rating badge, product bootstrap, listing badges, and preview/product render.
- The deployed pre-Phase-2 legacy Vercel alias `widget.js?...` response measured `177763` bytes on 2026-05-15. Re-measure current `https://widget.renuvex.app/widget.js` before claiming live performance improvement.
- Initial requests on PDP with a review mount: settings, ratings, reviews, and the media-gallery fetch. Badge-only PDPs use settings + ratings and skip the review render/BIG chunks plus reviews/media-gallery APIs (ADR_0024).
- A PDP that also has product carousels mounts the listing-badge surface alongside reviews-main; `core/settings.js` shares one in-flight settings request across both surfaces, so `/api/public/settings` is fetched once, not twice (fixed 2026-05-17).
- Initial requests on listing page: 1 (`/api/public/ratings-by-slug` — bulk).
- Image upload: client-direct browser upload to AWS S3 with server-issued presigned POST; no image bytes proxy through our server.
- 2026-05-24 (ADR_0019): read-only rating stars render via one injected SVG `<symbol>` sprite + `<use>` instead of inlining the full `<path>` per star. Measured before the change on the live dev store: ~76 KB of duplicated `<path>` data on a busy PDP (10 reviews) and ~4.6 KB per listing badge (linear in catalog size). The sprite defines the geometry once, so each star becomes a small `<use>` ref. Re-measure live DOM path bytes after deploy.
- 2026-05-27 (ADR_0024): PDP title badge is separated into a `rating-badge-*` lazy chunk. If the merchant omits `<div data-renuvex-widget="reviews"></div>`, the storefront avoids review render/BIG chunks and the reviews/media-gallery API calls. `reviews-section/bootstrap.js` must not statically import `render.js`; it dynamically imports the renderer only after the explicit mount check and review fetch path.
- 2026-05-27 follow-up: review/media-gallery fetch helpers live in `reviews-section/reviews-api.js`, not bootstrap. The 2-second listing fallback in `loader.js` now requires product-card-like DOM candidates (same-origin product-like links with nearby images) before loading the listing-badges entry chunk, reducing false-positive loads on clean PDPs.
- 2026-05-28 CI guard, updated 2026-05-29: `pnpm test:widget-smoke` is the executable network/chunk contract. It asserts that badge-only PDPs skip `render-*` and `/api/public/reviews`, badge-disabled PDPs keep JSON-LD when the explicit review section renders, unsupported auto-placement skips visual badges while explicit reviews can still support JSON-LD, and generic-link pages do not trigger the listing fallback chunk.
- 2026-05-28 quality gate expansion: `pnpm test:ci` now adds runtime layout smoke, lightbox/wizard flows, admin preview/settings checks, and public API/theme-state unit tests around the network contract. This catches regressions in behavior and lazy boundaries but does not enforce byte budgets yet.
- 2026-05-28 transfer evidence: `pnpm test:widget-smoke` attaches `widget-transfer-evidence.json` for mount-present/mount-absent and badge-on/badge-off local harness scenarios. This is evidence for regressions and review, not a hard CDN transfer-size budget.
- 2026-05-29 deployed evidence: `pnpm measure:deployed-widget` measured the real deployed widget and immutable runtime chunks while mocking merchant HTML and `/api/public/*` responses. The historical run used the legacy pre-custom-domain Vercel alias; current runs default to `https://widget.renuvex.app`. Latest controlled run is recorded in [[Widget_Transfer_Measurement_2026-05-29]]. It confirms the review render chunk and reviews API calls are skipped when the explicit review mount is absent. After the structured-data split, badge-disabled + review-mounted PDPs still call `/api/public/ratings` once for JSON-LD; badge-disabled + mount-absent PDPs skip ratings and JSON-LD.
- 2026-05-29 fallback determinism: the legacy 2-second listing fallback candidate probe lives in `listing-badges/fallback-candidates.js` and is covered by negative tests for generic links, external links, nav/footer links, one product-like link, and product-like links without nearby media. Positive product-card DOM still loads the listing chunk and calls `ratings-by-slug`.
- 2026-05-29 surface contract gate: `tests/unit/widget-surface-contracts.test.ts` fails if a new `src/widget/surfaces/*.surface.js` file is added without declaring which test layer covers it.
- 2026-05-31 clean PDP routing: `PRODUCT` `PAGE_VIEW` no longer loads the `listing-badges-*` entry chunk on clean PDPs. The listing surface accepts page events only for listing-like page types (`INDEX`, `CATEGORY`, `BRAND`, `SEARCH`), while observer and fallback probes ignore widget-owned hash/query links such as the PDP badge's `#renuvex-reviews` anchor. Listing event and product-card fallback paths remain covered by network smoke.
- 2026-06-01 `PAGE_VIEW` semantic dedupe: same-page duplicate `PAGE_VIEW` events inside 800 ms are still suppressed, but distinct fast transitions are no longer delayed until the 2-second listing fallback. The network smoke suite covers both outcomes.
- 2026-06-07 media read path: widget request/response shape is unchanged, but public `hasImages=true` reads now use indexed `Review.hasImages` and images are formatted from normalized `ReviewMedia` first. This is a backend read-path optimization for media-gallery / photo-filter scale, not a widget bundle change.
- 2026-06-08 filtered count read path: widget request/response shape is unchanged, but `/api/public/reviews` now returns exact `totalCount` / `totalPages` from `ProductReviewSummary` buckets instead of raw `Review.count()`, including rating+photo filter combinations. This is a backend read-path optimization, not a widget bundle change.
- 2026-06-27/2026-07-01 media display/filter path: media gallery fetches use `hasMedia=true` only when the first review summary reports media exists; if `ProductReviewSummary.mediaReviewCount === 0`, the deferred gallery read is skipped. Existing approved videos are still not hidden by disabling new uploads. The shopper-facing filter uses `ProductReviewSummary.mediaReviewCount > photoReviewCount` to decide between `Fotoğraf ve Video` / `hasMedia=true` and `Fotoğraflı` / `hasImages=true`, keeping totals read-model backed instead of raw `Review.count()`.
- 2026-07-03 AWS image teardown: widget upload/register no longer emits Cloudinary upload fields or trusts Cloudinary render URLs. New image media uses AWS `variantManifest` descriptors and public URLs under `https://media.renuvex.app/review-images/v1/public/...`; public reads stay DB-only.

- 2026-06-28 CDN latency snapshot: Cloudflare Worker V2 delivery is functionally live, but local Turkey measurements routed `widget.renuvex.app` to Cloudflare `FRA` and showed materially higher median TTFB than the sampled Yotpo CDN reference. Treat this as a dated decision-support snapshot, not a global CDN verdict. See [[Storefront_CDN_Performance_Benchmark]] before deciding on AWS CloudFront/S3 canary work.
- 2026-06-29/2026-07-01 storefront first-render isolation: the Yotpo comparison did not support blaming missing cache headers, Supabase, Redis, QStash, Mux, or DB writes for first visible review-widget delay. The verified blocker was `reviews-section/bootstrap.js` waiting for both the main review request and `fetchMixedMediaGalleryReviews(...hasMedia=true&limit=15)` before the first render. The source now renders the main review payload first, schedules the media gallery read after first render via `src/widget/core/scheduler.js`, skips that deferred read when `mediaReviewCount === 0`, and hydrates only `.renuvex-pr-media-gallery-section` through an append-only `renderDeferredMediaGallery()` path when media exists. It does not rebuild the summary, filter, write button, review list, or current focus state when the delayed gallery arrives. `pnpm test:widget-smoke` covers delayed and skipped media-gallery paths and the V2 test harness routes `STOREFRONT_WIDGET_READ_API_BASE_URL` separately from backend/write origin. See [[Storefront_CDN_Performance_Benchmark]].
- 2026-07-01 CLS hardening: controlled Chrome/Playwright checks on the dev ikas PDP found that blocking the Renuvex widget script did not materially reduce the live ~0.53 CLS, while blocking `Visa.svg` reduced only a small part of it. Treat the current large CLS as an ikas/theme layout-reservation issue, not a Renuvex runtime regression. Renuvex still reserves its own explicit review mount early: `bootstrap.js` creates the owned `product-reviews` slot and `#renuvex-reviews` shell after settings confirm the review widget is enabled, before the review API and render chunk finish. The shell is intentionally not an animated skeleton; it is a quiet layout reservation. When `mediaReviewCount > 0`, the first render also reserves a hidden media-gallery section and the deferred media read replaces that section in place. When `mediaReviewCount === 0`, no media-gallery slot or fetch is created.
- 2026-07-01 post-deploy startup/CLS baseline: after the layout-reservation Worker deploy, `scripts/measure-storefront-waterfall.mjs` measured the dev ikas PDP 10 times. Review widget visible median was `2267 ms`, first-render median was `18 ms`, and visible-from-render median was `16 ms`. Classification was `CDN/client-to-edge` for 9 runs and `injection/discovery` for 1 run. Chrome DevTools still reported CLS `0.55`, with the worst cluster tied to an unsized ikas `Visa.svg`; third-party main-thread time was about `1296 ms` for `myikas.com` and `101 ms` for `renuvex.app`. Keep the next optional Renuvex source optimization scoped to below-the-fold listing/product-slider lazy hydration; do not treat DB, Redis, QStash, Mux, or Supabase as first-load culprits.
- 2026-07-01 below-the-fold listing/product-slider lazy hydration: listing badge candidates now pass through `core/listing-viewport-gate.js` before loading the `listing-badges-*` chunk. Critical PDP surfaces remain eager: the PDP title badge, structured data, explicit review widget, and visible review/media area are not delayed. Far below-the-fold product slider/listing candidates do not create badge placeholders, download the listing badge chunk, or call the bulk rating API until they enter the `400px` near-viewport margin. The `400px` value was verified in the local harness at a 1366x768 viewport: a row around 332px below the viewport hydrated, while a row around 432px below the viewport waited. This is a cost and main-thread reduction for visitors who never scroll to lower product carousels; it is not expected to solve ikas/theme CLS or Cloudflare TR-to-FRA routing.
- 2026-07-01 post-viewport-gate baseline: after the `400px` listing viewport gate Worker deploy, the dev ikas PDP was measured 10 more times. Review widget visible median was `2422 ms`, first-render median was `14 ms`, visible-from-render median was `12 ms`, and automatic classification was `CDN/client-to-edge` for all 10 runs. Chrome DevTools recorded LCP around `1.49-1.55s` and CLS `0.55`; the largest layout-shift event scored about `0.478` and the trace still included ikas payment icon requests such as `Visa.svg` in the shift window. Live Network confirmed that the initial PDP load did not request the `listing-badges-*` chunk. Treat the viewport gate as working and the remaining large CLS as host/theme layout reservation, not a Renuvex insertion regression.
- 2026-07-01 settings read-cache post-deploy baseline: after `/api/public/settings` became a Worker-cacheable pure read, `scripts/measure-storefront-waterfall.mjs` measured the dev ikas PDP 10 more times and now also records browser-local CLS through `PerformanceObserver`. Settings duration median improved from `155 ms` to `96 ms` and P95 from `292 ms` to `244 ms`; review widget visible median was `2355 ms`. CLS median remained `0.5569`, matching a Chrome DevTools MCP trace (`0.57`) and still pointing at host/theme layout areas rather than the Renuvex widget slot. Treat settings read-cache as a verified settings-path win, not as the primary lever for first visible widget timing or total CLS.
- 2026-07-02 ikas script discovery follow-up: ikas support confirmed `StorefrontJSScript.isHighPriority` only prioritizes an app script before other app scripts such as Facebook/Google and that ikas currently has no official app mechanism for head-level `preconnect`, `dns-prefetch`, `preload`, or `modulepreload`. Keep `isHighPriority=false` unless a future cookie/consent or measured priority requirement appears; this does not change the Cloudflare Worker/static/read-cache architecture.
- 2026-07-01 widget performance budget gate: `pnpm budget:widget` now enforces local, deterministic artifact budgets from `config/widget-performance-budget.json` after `pnpm build:widget`. The gate covers loader/runtime size, always-loaded graph size, review/bootstrap/listing/rating/structured-data graph size, review render size, lazy Mux/player dynamic graph size, largest single output, and manifest output count. It is intentionally not a live storefront timing gate: `pnpm budget:widget:network` runs the deployed synthetic request budget in warn mode because CDN route, local network, and edge compression can drift outside a commit's control.
- 2026-06-29 live 10-run follow-up: after the first-render isolation deploy, `scripts/measure-storefront-waterfall.mjs` measured the dev ikas PDP 10 times. Runs 2-10 showed review widget visible median `2249 ms`, Renuvex read API max TTFB median `136 ms`, settings max TTFB median `145 ms`, and ikas storefront max TTFB median `879 ms`. This supports keeping read/API work out of the critical path and treating remaining delay as host-page/CDN-path/chunk-sequencing work, not DB/QStash/Mux write-path work. See [[Storefront_CDN_Performance_Benchmark]].
- 2026-06-30 startup timeline instrumentation: the widget now has opt-in `renuvexPerf=1` / `localStorage.renuvexPerf=1` startup markers for script discovery, classic loader execution, runtime import, settings, reviews API, render import, first render, visible widget, and deferred media gallery. The markers stay browser-local in `window.__renuvexPerfTimeline` and do not send network telemetry. `scripts/measure-storefront-waterfall.mjs` enables the flag during measurements and can summarize repeated runs, so the next live evidence can classify the remaining delay as injection/discovery, CDN/client-to-edge, chunk graph, read API/cache/backend, or render/main-thread/host pressure.
- 2026-06-30 chunk graph audit: esbuild code splitting is based on the current ESM dependency graph, not future placeholder files. Dynamic imports become lazily loaded chunks and shared code can become small shared chunks when multiple entry points need it. The audit found one real source-level issue: `reviews-main` detected any product context and loaded `reviews-section/bootstrap.js` even when the explicit `<div data-renuvex-widget="reviews">` mount was absent. `src/widget/surfaces/reviews-main.surface.js` now requires both product context and an explicit reviews mount before importing the bootstrap module; `loader.js` still replays the surface if the mount is inserted later. `pnpm test:widget-smoke` covers mount-absent PDPs skipping `bootstrap-*` / `render-*` chunks and the late-mount replay path.
- 2026-06-29 Yotpo home/category DevTools follow-up: the reference storefront's home and category pages use lightweight rating/star surfaces and carousel data, not the full PDP review/media API path. The observed Yotpo loader and `staticw2` widget shell still had TTL-0 cache behavior, while versioned star-rating assets used `max-age=31536000`. Preserve Renuvex's bulk ratings model and keep review/media/Mux code behind explicit PDP review mounts or future explicit widgets. See [[Storefront_CDN_Performance_Benchmark]].
- 2026-06-29 multi-provider DevTools follow-up: Okendo, Judge.me, Yotpo, and ikas-native examples all support the same split: long-cache static/versioned assets, dynamic review APIs that are often no-cache/no-store or POST GraphQL, and lightweight home/category surfaces. The finding argues for Renuvex first-render isolation and lazy media/lightbox work before KV, write-path edge moves, or provider/CDN swaps. See [[Storefront_CDN_Performance_Benchmark]].

## 2026-05-15 Live Observations

Dev store smoke test:

- storefront HTML included one widget script tag from the legacy pre-custom-domain Vercel alias
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
- **Image variants**: prefer pre-generated AWS `variants/srcset` descriptors over post-load resizing or ad hoc URL transformation.
- **Media read model**: future media-heavy widgets should read `ReviewMedia` metadata/variant descriptors or a dedicated read model, not parse `Review.images` text or call provider Admin APIs from storefront reads.
- **Review list pagination**: load-more should use `nextCursor` / cursor requests. Keep legacy `page` only for compatibility or explicit numbered pagination UI.
- **Review list counts**: exact totals should come from `ProductReviewSummary` buckets. Do not add public `Review.count()` fan-out for new storefront filters without first extending the read model.
- **Module split**: current Phase 2 work uses one classic ikas-compatible loader plus lazy ESM modules. New major surfaces such as Q&A, media gallery upgrades, review summaries, analytics, and schema should follow the same loader/registry pattern.

## Anti-patterns to avoid
- Per-card requests on listing pages → quadratic cost.
- Synchronous DOM mutations in tight loops without `requestAnimationFrame` batching.
- Adding `<link>` or `<style>` elements that block paint — inject styles at end of body or via `adoptedStyleSheets`.
- Polling. Use the existing MutationObserver pattern.

## Measurement ideas
- Add a `?w=<bundle-version>` to widget script src and report a Vercel Analytics event on first run, including bundle size + first-render time.
- Lighthouse CI for a representative storefront page.
- Keep hard CI budgets on deterministic local widget artifacts. Use deployed/network measurements as report evidence unless several production samples prove a stable threshold that should block merges.
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
- [[Storefront_CDN_Performance_Benchmark]]
