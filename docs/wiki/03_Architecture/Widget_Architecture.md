---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-29
last_verified: 2026-07-29
confidence: high
tags:
  - widget
  - architecture
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Widget_Files_Map]]"
  - "[[ADR_0002_Widget_Injection_Strategy]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[ADR_0013_Modular_Widget_Loader_Architecture]]"
  - "[[Bug_Lightbox_Tablet_Viewport_And_Scroll]]"
  - "[[Bug_Cloud_Name_Silent_Image_Filter]]"
  - "[[Bug_Review_Widget_SPA_Health_Probe_False_Positive]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Test_Strategy]]"
source_files:
  - "scripts/build-widget.mjs"
  - "scripts/prepare-widget-worker-assets.mjs"
  - "wrangler.widget.jsonc"
  - "vercel.json"
  - "scripts/check-widget-runtime.mjs"
  - "playwright.widget.config.ts"
  - "vitest.config.ts"
  - "tests/widget-harness.ts"
  - "tests/widget-network-smoke.spec.ts"
  - "tests/widget-runtime-smoke.spec.ts"
  - "tests/widget-interaction-smoke.spec.ts"
  - "tests/admin-preview-smoke.spec.ts"
  - "tests/unit/public-api-routes.test.ts"
  - "tests/unit/storefront-theme.test.ts"
  - "tests/unit/widget-icon-sprite.test.ts"
  - "tests/unit/widget-popover-registry.test.ts"
  - "tests/unit/widget-health.test.ts"
  - "tests/unit/widget-asset-cache.test.ts"
  - ".github/workflows/widget-smoke.yml"
  - "src/widget/classic-loader.js"
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/error-reporter.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/core/config.js"
  - "src/widget/core/origins.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/settings.js"
  - "src/widget/core/rating-summary.js"
  - "src/widget/core/link-scope.js"
  - "src/widget/core/health.js"
  - "src/widget/observer.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/styles.js"
  - "src/widget/reviews-section/styles/base.js"
  - "src/widget/reviews-section/styles/summary-controls.js"
  - "src/widget/reviews-section/styles/review-primitives.js"
  - "src/widget/reviews-section/styles/media-gallery.js"
  - "src/widget/reviews-section/styles/lightbox.js"
  - "src/widget/shared/base-reset.js"
  - "src/widget/summary-layouts/shared/bar-chart.js"
  - "src/widget/summary-layouts/shared/actions-block.js"
  - "src/widget/summary-layouts/shared/popover-registry.js"
  - "src/widget/summary-layouts/compact/index.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/structured-data/index.js"
  - "src/widget/structured-data/jsonld.js"
  - "src/widget/surfaces/structured-data.surface.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/dom.js"
  - "src/widget/icons/index.js"
  - "src/widget/icons/review-icons.js"
  - "src/widget/icons/filter-icons.js"
  - "src/widget/icons/ui-icons.js"
  - "src/widget/icons/star-sprite.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/lib/storefront-theme.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "workers/widget-delivery/src/index.ts"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
---

# Widget Architecture

## Agent Brief
Use this page when a task touches the storefront widget loader, runtime modules,
surface lifecycle, Shadow DOM, Cloudflare Worker delivery, widget build output,
or widget smoke gates. Current truth: widget assets are delivered by the
Cloudflare Worker path, runtime chunks are content-hashed, and old runtime files
are intentionally retained for cache safety. Start with `src/widget/loader.js`,
`src/widget/index.js`, `scripts/build-widget.mjs`, and focused widget tests from
`source_files`; then follow imports for the touched surface. Source/runtime
behavior wins over this page.

## Summary
A classic ikas-compatible storefront entry (`public/widget.js`) loaded by every storefront page, which imports an ESM runtime and lazy chunks from `public/widget-runtime/*`. It detects context (product page, listing/search page, preview iframe), fetches per-merchant settings, and renders summaries, listings, badges, the review submission modal, and the photo review detail lightbox. The runtime is intentionally framework-free.

As of 2026-05-23, public settings also return `runtime.themeAdapterKey/source`. The backend resolves this from ikas Admin API `listStorefront.themes[].isMainTheme` during script reconciliation and stores the non-sensitive result in `StoreSettings.storefrontTheme`. Ozy remains the verified adapter; unknown active themes use a conservative generic adapter.

As of the 2026-05-17 Phase 2 implementation work, local build output is split:
`public/widget.js` is a small classic loader, `public/widget-runtime/runtime.js`
is the ESM runtime entry, and PDP/listing modules are lazy chunks. The deployed
pre-Phase-2 widget measured `177763` bytes on 2026-05-15; re-measure after
deployment before claiming live performance improvement.

As of [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]], storefront widget
delivery has a split-origin contract. `widget.renuvex.app` is the script/asset
origin; `app.renuvex.app` remains the backend API, upload, Mux, QStash, DB, and
webhook origin. V2 source also defines a separate cacheable read origin through
`STOREFRONT_WIDGET_READ_API_BASE_URL`. If unset, read calls fall back to
`STOREFRONT_WIDGET_API_BASE_URL`, so the code can deploy before the Worker read
proxy is activated. The classic loader imports runtime assets from the script
origin, settings/ratings/reviews reads can use the read origin, and
write/upload/video/lazy-sync calls plus loader import-error reports use the API
origin.

## Responsibilities
- Inject summary + reviews on **product detail pages**
- Inject star+count badges into **listing-page product cards**
- Inject a **rating badge** above the product title
- Open a **multi-step review modal** with image upload
- Open a **photo/video review detail lightbox** for review media and media-gallery thumbnails
- React to **SPA-style theme nav** via MutationObserver
- Run in **preview mode** for live admin customization

## Runtime modules

| Module | Purpose |
|---|---|
| [src/widget/index.js](src/widget/index.js) | Thin entry. Side-effect inits (ADR_0011 order) + preview/prod branch. Delegates to `loader.js`. |
| [loader.js](src/widget/loader.js) | Orchestration. `startWidget()` (prod) / `startPreview()` (admin iframe). Production wires context -> registry (ADR_0013); preview enforces the versioned same-origin parent protocol and lazy-loads the selected scene renderer. |
| [core/storefront-context.js](src/widget/core/storefront-context.js) | Single owner of `window.IkasEvents` subscription; exposes page/product context (`onProductView`/`onPageView`) + DOM fallback (ADR_0013). `PAGE_VIEW` duplicates are suppressed by semantic `pageType + pathname/search`, not by global time alone. |
| [core/registry.js](src/widget/core/registry.js) | Surface registry (`rating-badge`, `reviews-main`, `structured-data`, `listing-badge`) with guarded async mounts plus key-targeted mounting for explicit review-mount replay. |
| [core/lazy-modules.js](src/widget/core/lazy-modules.js) | Dynamic import boundary owner for reviews, listing, badge, structured-data, and preview render modules. |
| [core/settings.js](src/widget/core/settings.js) | Shared public settings fetch/cache used by lazy modules without pulling PDP render code. |
| [core/rating-summary.js](src/widget/core/rating-summary.js) | Shared one-product approved rating summary fetch used by visual badge and structured-data surfaces without duplicate API calls. |
| [core/health.js](src/widget/core/health.js) | Runtime health marker, visibility telemetry, and bounded one-shot DOM-removal self-heal helpers for badge surfaces. |
| [surfaces/](src/widget/surfaces/) | Thin surface descriptors (`detect`/`mount`) that lazy-load implementation modules. |
| [core/config.js](src/widget/core/config.js) | `PUBLIC_API_KEY`, `ASSET_BASE`, `API_BASE`, and `READ_API_BASE` resolved from the owned `<script src>` plus optional build-time origins. |
| [core/origins.js](src/widget/core/origins.js) | Single owner for storefront widget asset/API/read-API origin separation. |
| [core/state.js](src/widget/core/state.js) | Module-level mutable state (current product, settings, reviews, paging, canonical lightbox review collection). |
| [core/fetch.js](src/widget/core/fetch.js) | API helpers calling `/api/public/*`. |
| [core/cache.js](src/widget/core/cache.js) | `sessionStorage` wrapper with in-memory fallback (private browsing / quota exceeded). Persists across same-tab navigations. |
| [core/helpers.js](src/widget/core/helpers.js) | Shared display helpers, including trusted review image URL filtering for storefront render paths. |
| [icons/](src/widget/icons/) | Public icon API plus split review/rating and filter icon registries shared by runtime and admin preview. |
| [observer.js](src/widget/observer.js) | MutationObserver to re-render listing badges on SPA theme nav; uses scoped listing link discovery instead of whole-document link scans. |
| [events.js](src/widget/events.js) | SPA history patch (stale PDP surface cleanup for review content, rating badge, and structured data) + quick-view modal badge plumbing. IkasEvents handling moved to `core/storefront-context.js` (ADR_0013). |
| [rating-badge/](src/widget/rating-badge/) | Independent PDP rating badge surface. Fetches one-product rating summaries and owns only visual badge DOM cleanup/injection. |
| [structured-data/](src/widget/structured-data/) | Independent Product `AggregateRating` JSON-LD surface. Emits only when the rich-snippet toggle, approved ratings, and visible/expected Renuvex rating content gates pass. |
| [reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js) | Reviews section entry. Fetches settings, checks the explicit reviews mount, resets per-product review state, fetches initial review/media-gallery data, guards each async boundary against stale product/path bootstraps, then dynamically imports `render.js`. |
| [reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js) | Shared reviews/media-gallery fetch helpers, cache handling, preview fallback, and explicit review-fetch error result. |
| [reviews-section/render.js](src/widget/reviews-section/render.js) | Compose summary + reviews + modal CTA based on settings; handles filter/sort/load-more fetches through `reviews-api.js`. |
| [core/product-title.js](src/widget/core/product-title.js) | Heuristic to find product title element across themes. |
| [reviews-section/review-modal.js](src/widget/reviews-section/review-modal.js) | Photo review detail lightbox. Distinct from the submission wizard. |
| [reviews-section/review-form-modal/](src/widget/reviews-section/review-form-modal/) | Multi-step submission wizard (steps + progress + state machine). |
| [listing-badges/](src/widget/listing-badges/) | Listing-page badge bootstrap, scoped link discovery, bulk fetch, slot reservation, injection. |
| [preview/](src/widget/preview/) | Preview scene registry, deterministic local fixtures, shared fixture document, and adapters that invoke production Reviews/PDP Badge/Listing Badge renderers without DB or provider reads. |
| [review-layouts/](src/widget/review-layouts/) | `card` / `gallery` / `list` review item layouts (registry in `index.js`). |
| [summary-layouts/](src/widget/summary-layouts/) | `classic` / `compact` / `hero` / `minimal` / `split` summary layouts. |
| [summary-layouts/shared/](src/widget/summary-layouts/shared/) | Shared summary primitives: rating bar chart, write/filter actions, write-form opener, and popover registry. |
| [themes/current-adapter.js](src/widget/themes/current-adapter.js) | Runtime-selected adapter registry. Defaults to Ozy unless public settings select `generic`. |
| [themes/generic/](src/widget/themes/generic/) | Conservative unknown-theme adapter; avoids Ozy-specific selectors and relies on generic scoped link/title heuristics. |
| [reviews-section/styles.js](src/widget/reviews-section/styles.js) | Stable `CLASSIC_CSS` aggregator for shared review-section CSS. Owned CSS modules live under [reviews-section/styles/](src/widget/reviews-section/styles/). |
| [themes/ozy/](src/widget/themes/ozy/) | Ozy selectors plus fallback adapter. Theme-specific CSS should only live here if it is a real Ozy override. |

## Lifecycle

```
Storefront HTML loads <script async>
        │
        ▼
public/widget.js classic loader
        │ dynamic import
        ▼
public/widget-runtime/runtime.js
        │
        ▼
core/config.js    → PUBLIC_API_KEY, ASSET_BASE, API_BASE, READ_API_BASE
        │
        ▼
index.js  (error-reporter / base-reset / input-modality side-effects)
        │
        ▼
loader.js
  ├── if preview: exact-origin/versioned scene handshake -> lazy preview renderer
  └── else: startWidget()
        ├── registerCoreSurfaces()      (rating-badge, reviews-main, structured-data, listing-badge)
        ├── initStorefrontContext()     (subscribe window.IkasEvents + DOM fallback)
        ├── attachHistoryListener / attachModalBadgeListener / startMutationObserver
        └── onProductView / onPageView  → registry.mountMatching(context)
        │
        ▼ (productView context → rating-badge surface)
rating-badge/index.js
  ├── fetch /api/public/settings  (cached)
  ├── settings + theme auto-placement gates
  ├── core/rating-summary.js fetch /api/public/ratings?productIds=<one>
  └── rating-badge/inject.js (visual badge DOM)

        ▼ (productView context → structured-data surface)
structured-data/index.js
  ├── fetch /api/public/settings  (cached)
  ├── richSnippetsEnabled + visible rating/review surface gates
  ├── core/rating-summary.js shared summary promise/cache
  └── structured-data/jsonld.js (owned Product AggregateRating JSON-LD)

        ▼ (productView context → reviews-main surface)
reviews-section/bootstrap.js
  ├── fetch /api/public/settings  (cached)
  ├── explicit <div data-renuvex-widget="reviews"> mount gate
  ├── reviews-section/reviews-api.js fetches reviews + media gallery
  ├── core/state.js ← write currentSettings, currentReviewsData, ...
  └── dynamic import render.js (chooses layouts from settings)
```

PDP review lifecycle note: the explicit review mount can arrive after a
`PRODUCT_VIEW` event during SPA navigation. `loader.js` watches for that mount
and replays only the `reviews-main` surface with the latest product context;
`rating-badge`, `structured-data`, and listing surfaces are not replayed. Inside
`reviews-section/bootstrap.js`, a product/path bootstrap guard and per-product
state reset protect the initial reviews/media-gallery fetch from stale previous
product completions.

Phase 1 of [[ADR_0013_Modular_Widget_Loader_Architecture]] introduced the loader +
surface registry + Storefront Events context layer. Phase 2 implementation landed
on 2026-05-17: build output now uses a classic compatibility loader plus ESM
runtime/chunks, `VIEW_SEARCH_RESULTS` is handled beside verified `VIEW_LISTING`,
and listing placement rules moved into the Ozy fallback adapter. Phase 2 was
verified live on the dev store on 2026-05-17 (browser + Sentry post-test); see
[[Phase_2_Widget_Module_Split_Plan]].

## Layout-aware settings (key concept)

Each layout registers support metadata such as `supports: { title: true, thumbnailSize: false, ... }` in its layout `index.js`. Admin settings panel uses `showWhen: { layoutKey, supports }` in [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts) to hide irrelevant fields. This means **adding a new setting often means deciding which layouts support it** — not editing settings rendering code.

## Summary interaction contracts

- `summary-layouts/shared/popover-registry.js` owns light-dismiss and one-at-a-time behavior for summary popovers. `registerPopover(opts)` returns a handle `{ unregister, notifyOpening }`; consumers call `handle.notifyOpening()` when opening and `handle.unregister()` only at a real teardown point. One-shot producers such as the shared filter menu do not unregister on dismiss; stale entries are purged centrally once their DOM is disconnected by a full summary re-render.
- Every registered `close()` function must return `true` only when it closed an open popover and `false` when the popover was already closed. The dismiss-click swallow logic depends on this boolean.
- Touch/pen filter option activation closes on `pointerdown` for WebKit and physical-mobile reliability, then calls `swallowNextDismissGesture(scope)`: the trailing compat click is swallowed, and `base-reset.js` uses the scoped `[data-renuvex-pr-dismiss-gesture]` attribute to temporarily neutralize pointer/active state on controls exposed under the closing menu. Desktop mouse selection intentionally stays on the normal `click` event, so a sort-triggered render cannot leave the filter button behind a short-lived pointer shield. Pointer blocking is broad during touch/pen shielding, but forced `opacity:1` is deliberately narrower so stateful controls such as dimmed rating bar rows keep their selected-filter opacity. This is scoped to the current review shadow content and does not disable normal ADR_0011 `:active` feedback for real future taps.
- Rating bar rows in `summary-layouts/shared/bar-chart.js` are interactive toggle controls: `role=button`, `tabindex=0`, `aria-pressed`, and Enter/Space activation. A selected rating bar filters the review list but keeps the PDP badge count, summary total, and bar distribution tied to the unfiltered rating summary/all-count contract. Inactive rows use the explicit `.renuvex-pr-bar-dimmed` visual state class instead of inline opacity so shared gesture/reset CSS cannot accidentally erase the selected-filter visual state.
- Compact summary uses two different panel contracts: desktop is a registered popover with light-dismiss and grow-out animation, while mobile is a flow accordion. On mobile, rating-bar filters may re-render the review section but the accordion stays open until the user closes it with the compact trigger/chevron; the desktop grow-out animation is disabled so the bar chart does not flicker during filter redraws.
- Bar chart count cells use tabular numbers and an elastic minimum width. `--renuvex-pr-col-count` remains the layout-local minimum column token; long localized counts can grow without forcing the track to overlap text.

## Future Widget Surface Rules

Future storefront widgets must follow the same surface-isolation contract as the current review, badge, structured-data, and listing surfaces.

1. Prefer explicit mounts first. A known mount such as `data-renuvex-widget="reviews"` is safer than DOM heuristics and should be the default for large widgets.
2. Use auto-placement only for lightweight surfaces that naturally belong near existing storefront DOM, such as listing badges or title badges. Auto-placement is allowed, but it is a higher-risk path and must fail closed when the DOM is ambiguous.
3. Keep `surface.detect()` cheap. It may inspect context and small DOM signals, but it must not import heavy modules, fetch data, mutate DOM, or start long async work.
4. Lazy-load implementation modules from `surface.mount()` only after the surface is proven relevant. New carousel, Q&A, media, story, or analytics widgets must not be statically imported by `src/widget/index.js`, `src/widget/loader.js`, or always-loaded core modules.
5. Treat ikas Storefront Events as the primary signal and DOM heuristics as fallback. Before changing placement logic, inspect `core/storefront-context.js`, `themes/current-adapter.js`, the active theme adapter, and `listing-badges/fallback-candidates.js`.
6. Any new heuristic must define both positive and negative tests in `tests/widget-network-smoke.spec.ts`. At minimum, cover duplicate events, missing mount, late mount, generic links, nav/header/footer links, single product-like links, and unsupported-theme fail-closed behavior when relevant.
7. Every new `src/widget/surfaces/*.surface.js` descriptor must be covered by the surface contract gate in `tests/unit/widget-surface-contracts.test.ts`.
8. Preserve request fan-out rules. Listing/category/home surfaces should use bulk or aggregate reads; do not add per-card public API requests. High-read surfaces should use `ProductReviewSummary` or a dedicated read model before reaching production scale.
9. Do not mix write/upload/video paths into storefront read surfaces. Upload, submit, Mux, image-provider, QStash, webhook, and admin flows stay on the backend/write origin unless a separate ADR changes that contract.
10. Keep the user-visible widget resilient to duplicate script injection. New global listeners, history patches, MutationObservers, and singleton registries need idempotency guards comparable to the existing registry key guard and history `__renuvexPrPatched` guard.
11. Keep critical surfaces eager and below-the-fold social-proof surfaces lazy. PDP review mounts, PDP rating badges, structured data, and visible review/media content should not wait for viewport gates. Decorative or lower-page surfaces such as listing/product-slider badges must use the shared viewport-aware lazy hydration pattern and should not download their feature chunk or call public reads until the shopper is near them.
12. Auto-placement must stay fail-closed. If a theme, product card, slider, or DOM context cannot be positively identified, the surface must skip rendering instead of guessing. The failure mode should be no badge/no widget, not duplicated badges, wrong-product badges, or layout movement in unrelated nav/header/footer/cart/account areas.
13. Every new storefront surface must update the performance budget intentionally. Run `pnpm budget:widget` after `pnpm build:widget`; if a graph or byte limit needs to grow, update `config/widget-performance-budget.json` with a reason in the same change. Do not hide a real graph regression by silently increasing limits.
14. Every new storefront surface must include network smoke coverage before production. The tests must prove both the positive path and the negative/no-load path: required chunks/API load when the surface is relevant, and they do not load for missing mounts, unsupported themes, ambiguous auto-placement, or below-the-fold candidates that have not entered the viewport gate.
15. Resource identity and route changes must clear stale visible content before async reads finish. When a PDP path changes, `events.js` clears already-rendered review shadow content into the existing quiet shell immediately, before a delayed `PRODUCT_VIEW` can arrive. When a PDP surface later receives a different canonical `productId`, it should keep the owned slot/reservation shell but remove any previously rendered product content immediately, reset surface state for the new identity, and ignore late responses from older identities. Duplicate events for the same identity must stay idempotent and must not clear already-correct content.

### Future Widget Lifecycle Matrix

Future agents must classify a storefront surface before changing lifecycle, placement, or caching code. Do not copy the PDP review reset behavior blindly into every widget; choose the row that matches the surface.

| Surface class | Examples | Route/resource transition behavior | Reservation behavior | Async/data guard | Official basis |
| --- | --- | --- | --- | --- | --- |
| Primary PDP content | Review section, future Q&A section, large media/story block mounted in a known slot | Clear old visible content immediately when pathname or canonical product identity changes. Keep the owned slot and reset surface state for the new identity. | Keep a quiet reserved shell; do not show the previous product while the next product is loading. | Ignore late responses from older identities and keep duplicate same-product events idempotent. | [React state reset](https://react.dev/learn/preserving-and-resetting-state), [React stale state guidance](https://react.dev/learn/you-might-not-need-an-effect), [web.dev CLS optimization](https://web.dev/articles/optimize-cls), [MDN History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API). |
| Small PDP adjunct | Product-title rating badge, compact trust badge near product title | Remove or clear old badge on route change, then re-inject for the new product after the current product context is confirmed. | No large blank section; reserve only the badge's owned inline footprint if it already exists. | Key DOM ownership by product identity and skip ambiguous contexts. | [MDN History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API), [React state reset](https://react.dev/learn/preserving-and-resetting-state). |
| Metadata/non-visual surface | JSON-LD structured data, future SEO metadata emitters | Remove stale metadata on route change; emit again only for the current eligible product and current response. | None; this surface is non-visual. | Never let old product metadata remain after SPA navigation. | [MDN pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState), [MDN popstate](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event). |
| Listing/home/category social proof | Listing badges, product-slider badges, future below-the-fold carousel badges | Do not render until a trusted listing/card context exists. For below-the-fold candidates, wait until the candidate enters the shared viewport gate. | Far below-the-fold candidates do not create visible placeholders. Near/visible candidates may reserve the small badge footprint. | Use bulk reads, duplicate guards, fail-closed theme/card detection, and viewport waiting that is distinct from `rendered`. | [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), [MDN rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin). |
| Overlay/modal surface | Lightbox, review wizard, future story viewer | Scope overlay state to the currently opened media/review collection. Close or reset overlays on route teardown unless the user action explicitly keeps them open. | Overlay layout is independent from PDP flow; do not reserve page space for closed overlays. | Do not allow close, route change, or stale media responses to mutate a newer overlay instance. | [React state reset](https://react.dev/learn/preserving-and-resetting-state). |

When adding a new widget, update tests for both positive and negative paths before production: the surface must load when its trigger is valid, must not load when the trigger is absent or ambiguous, and must clear stale visible content when its resource identity changes.

This rule set comes from the 2026-06-29/30 storefront performance and chunk-graph audits: mature review widgets keep static modules split, dynamic data separate, and heavy surfaces behind explicit or strongly proven triggers.

## Preview mode protocol

```
admin editor                         widget.js (preview iframe)
   │                                          │
   │ ←── RENUVEX_PR_WIDGET_READY v1 ──────────│
   │                                          │
   ├── RENUVEX_PR_PREVIEW_RENDER v1 ─────────►│
   │   widgetId + scene + full settings map   │ production renderer + fixtures
   │                                          │
   │ ←── PREVIEW_RENDERED / PREVIEW_ERROR ────│
   │                                          │
   ├── RENUVEX_PR_PREVIEW_RESET_SCROLL v1 ───►│ scroll to top
```

Preview iframe HTML lives at
[src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts).
`widget` and `scene` must exist in the registry or the route returns `404`.
The document loads `widget.js?publicApiKey=preview&v=<timestamp>` so each open
uses a fresh loader. Both directions require the exact same origin, exact
window source, protocol version, widget id, and scene. Wildcard target origins,
sessionStorage handoff, and `/api/preview/*` storage are not part of the
contract.

The preview invokes production render functions and CSS, but it intentionally
uses a controlled fixture page and deterministic review/rating data. This
proves renderer/settings behavior without charging or mutating Postgres,
Ikas, AWS, Mux, Redis, or QStash. It does not prove compatibility with every
merchant theme DOM; real storefront smoke remains a separate acceptance layer.

## Caching strategy
- `PRODUCT_VIEW` does not invalidate review browser cache directly. Review cache keys and the 60 second TTL contract are owned by `reviews-api.js`; `storefront-context.js` must not write non-matching base keys or add broad prefix invalidation without a separate cache-contract change.
- The Cloudflare Worker delivery path mirrors the widget static cache contract. V2 permits only selected cacheable public reads (`settings`, `ratings`, `ratings-by-slug`, `reviews`) through an allowlisted read-through cache. `/api/public/settings` is cacheable only because it is a pure read and lazy theme sync moved to `POST /api/public/storefront-theme/lazy-sync`. Upload, submit, video, widget-error, lazy-sync, admin, webhook, Mux, image-provider, and QStash paths must stay on `API_BASE`.
- `/api/public/settings` and `/api/public/reviews` set `Cache-Control: s-maxage=60, stale-while-revalidate=300` (Vercel CDN).
- Public badge, structured-data, and review summary distribution reads use the backend `ProductReviewSummary` read model. Widget response fields stay the same, but new high-read widget surfaces should prefer explicit aggregate/read-model endpoints over repeated raw `Review.groupBy()` scans. See [[ADR_0026_Product_Review_Summary_Read_Model]].
- Widget side: `sessionStorage` (with in-memory fallback) cache in `core/cache.js` — survives same-tab navigation; settings stay fresh for 5 minutes and can be reused stale for up to 24 hours during transient settings fetch failures.
- Review fetch failures use stale cached review data when available; without stale data, `reviews-api.js fetchReviews()` returns an explicit error result so `render.js` can show a retryable error state instead of an empty list.
- Review UI interactions in `render.js` guard async sort/filter/retry/load-more responses with a request token and active state snapshot; late responses cannot mutate a newer active selection. Load-more also compares returned ids against the active loaded review collection before inserting DOM nodes.
- PDP product transitions are route- and identity-aware. On SPA pathname changes, `events.js` clears any rendered review shadow content into the existing quiet `#renuvex-reviews` shell before a delayed ikas product event can arrive. If a previously rendered review widget belongs to product A and ikas later emits `PRODUCT_VIEW` for product B, `bootstrap.js` keeps the same shell and product guards active before settings or reviews fetches complete. This prevents product A reviews from staying visible on product B while preserving the layout reservation. Same-path variant/query changes and same-product duplicate `PRODUCT_VIEW` events are left intact.
- No localStorage caching today (could be added for repeat visits).

## Build
- [scripts/build-widget.mjs](scripts/build-widget.mjs) drives esbuild.
- Output: classic loader (`public/widget.js`) plus ESM runtime/chunks
  (`public/widget-runtime/*`), ES2017, minified in prod, banner with build timestamp.
- The build injects `__RENUVEX_PR_API_BASE_URL__` from `STOREFRONT_WIDGET_API_BASE_URL` and `__RENUVEX_PR_READ_API_BASE_URL__` from `STOREFRONT_WIDGET_READ_API_BASE_URL`. After Worker V2 cutover, the read value should be `https://widget.renuvex.app`; if it is unset, the build falls back to `STOREFRONT_WIDGET_BASE_URL`, then runtime falls back to the API origin.
- The build injects `__RENUVEX_PR_WIDGET_VERSION__` from the build timestamp; the runtime exposes it through `window.__RENUVEX_PRODUCT_REVIEWS__` and widget-error health events.
- Validation: post-build `node --check` for the classic loader plus esbuild ESM
  bundling and `public/widget-runtime/build-manifest.json` output metadata.
- Worker assets are prepared by [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs), which copies only the widget loader, runtime manifest, current manifest outputs, and retained committed runtime hashes into `.tmp/widget-worker-assets`. Do not deploy the full `public/` directory.

## CI smoke gate
- `pnpm test:widget-smoke` runs Playwright against the built public widget assets (`public/widget.js` + `public/widget-runtime/*`) instead of importing source modules directly.
- The test fixture serves the loader/runtime from a fake widget origin and an ikas-like merchant page from a fake merchant origin, then intercepts public API calls. This verifies the browser-visible network contract, CORS behavior, dynamic import boundaries, DOM output, and manifest entry points.
- Covered scenarios: review mount present, review mount absent, badge disabled, unsupported auto-placement with explicit review mount, and generic-link pages where the legacy listing fallback must not load `listing-badges-*`.
- Additional Playwright suites cover layout/render pairwise smoke (`pnpm test:widget-runtime`), lightbox + review wizard flows (`pnpm test:widget-interactions`), and admin preview/settings behavior (`pnpm test:admin-preview`). Vitest covers public API routes and storefront theme-state helpers (`pnpm test:unit`).
- `pnpm test:ci` runs the automated browser + unit layers together. `.github/workflows/widget-smoke.yml` runs `pnpm build:widget`, installs Chromium, runs `pnpm test:ci`, syntax-checks generated widget assets with `pnpm check:widget-js`, then runs `tsc`, `lint`, and `git diff --check`. Wiki audit remains a local gate because this repo intentionally ignores local agent rule files such as `AGENTS.md`.
- See [[Test_Strategy]] for the layer-by-layer contract and what still requires manual-auth or live post-deploy smoke.

## Notes
- The widget is the **highest-leverage code surface** in the codebase (every storefront load executes it). Bundle size and TTI matter.
- Don't introduce a framework (React, Preact, Lit) without an explicit ADR. The vanilla approach is a deliberate trade-off — see [[ADR_0002_Widget_Injection_Strategy]].
- DOM identification (product id, slug, title) uses Storefront Events first and theme/DOM fallbacks second. When fixing a "widget doesn't show on theme X" issue, inspect `core/storefront-context.js`, `product-title.js`, and the active theme adapter before changing review bootstrap.
- Browser conflict hardening is diagnostic and bounded: badge render paths report visibility/dom-conflict events and try one remount if a rendered badge node is removed; they do not loop against aggressive third-party scripts. The visibility probe re-resolves the **current** owned node when it fires (not the originally injected reference), so a self-heal/theme re-render that swaps the element does not produce a false `missing_after_render`. Surfaces with an explicit SPA lifecycle may also provide a relevance predicate: the review surface suppresses only probes retired by an intentional route/product transition, while a relevant missing node still reports. See [[Bug_Listing_Badge_Missing_After_Render]] and [[Bug_Review_Widget_SPA_Health_Probe_False_Positive]].
- The widget assumes a single product per page on PDP. Multi-product pages (looks/sets) would need a redesign.
- Review submission has a single runtime path: all write CTAs open the multi-step modal. The legacy inline/page form path was removed to reduce storefront bundle complexity.
- Icon selection is centralized under [src/widget/icons/](src/widget/icons/): review/rating icons live in `review-icons.js`, filter button icons live in `filter-icons.js`, UI chrome icons live in `ui-icons.js`, and consumers import through `icons/index.js`. The old [icons.js](src/widget/icons.js) file is a compatibility re-export only. `tests/unit/widget-icon-sprite.test.ts` pins the registry to Phosphor 256-grid, `currentColor`, documented stroke weights (regular `16`, compact-only down caret `24`), and no legacy Lucide/Unicode X/arrow glyphs.
- The photo review detail lightbox has its own runtime path and risk profile; see [[Product_Review_Lightbox]] and [[Bug_Review_Detail_Lightbox_Risks]] before changing image navigation, responsive breakpoints, viewport sizing, scroll containment, body scroll locking, focus management, or history behavior. Card/list/gallery navigation is scoped to the active sort/filter state's loaded review collection; the lightbox does not fetch unloaded pages by itself.
- Lightbox layout uses a three-tier responsive contract in the Ozy theme: desktop two-column at `801px+`, stacked tablet/landscape at `641px-800px`, and fullscreen mobile at `640px` and below with `vh` / `svh` / `dvh` viewport-unit fallbacks.
- Review image rendering depends on AWS public media descriptors returned by `/api/public/reviews`. The widget trusts only approved `media.renuvex.app` public variant URLs and should use `getTrustedReviewMedia()` / `media[].variants` instead of local URL prefix checks. See [[ADR_0034_AWS_Review_Image_Migration]].
- A 2026-05-15 Yotpo/Protein Ocean research pass showed that mature review widgets use a small loader, declarative placeholder instances, separate static widget modules, and dynamic review/rating/Q&A APIs. New major widget surfaces should follow the Phase 2 loader/lazy-module pattern in [[Yotpo_Style_Widget_Modular_Architecture]] rather than being statically imported by the always-loaded runtime.

## Related Source Files
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js) (built)
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json) (built)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs)
- [workers/widget-delivery/src/index.ts](workers/widget-delivery/src/index.ts)
- [wrangler.widget.jsonc](wrangler.widget.jsonc)
- [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Product_Review_Widget]]
- [[Product_Review_Lightbox]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[Test_Strategy]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[ADR_0008_Cloud_Name_Build_Time_Only]]
- [[ADR_0013_Modular_Widget_Loader_Architecture]]
- [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]
- [[Ikas_Widget_Injection_Notes]]
- [[Ikas_Storefront_Events]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Yotpo_Protein_Ocean_Widget_Research]]

## Change Log
- 2026-07-29: Review-widget visibility probes now carry route/product lifecycle relevance. Intentional SPA retirement no longer emits `missing_after_render`; unexpected removal still does. Unit coverage pins both outcomes and network smoke holds the transition open past the probe window. See [[Bug_Review_Widget_SPA_Health_Probe_False_Positive]].
- 2026-07-02: Post-deploy manual acceptance confirmed on the real dev storefront after the Worker deploy for commit `6426f631` and runtime `runtime-OUK3LLII.js`: fast PDP product transitions now show the neutral reserved shell instead of the previous product's review cards while the next product data loads.
- 2026-07-02: Added route- and identity-aware PDP review transition reset. On SPA pathname changes, rendered review shadow content is cleared into the existing reserved shell immediately, even before the next `PRODUCT_VIEW` arrives. On later product identity changes, the previous `productId` content stays cleared while new settings/reviews finish loading; duplicate same-product events remain idempotent and late responses stay guarded by the existing bootstrap token.
- 2026-07-01: Tightened below-the-fold listing/product-slider badge viewport gating to `rootMargin: "400px 0px"`. This keeps critical PDP surfaces eager while preventing distant product sliders from loading the listing badge chunk or bulk ratings API before the shopper gets close enough to scroll into them.
- 2026-07-01: Added the storefront layout-reservation rule after the CLS audit. New storefront surfaces must reserve a stable owned slot before hydrating dynamic content. The PDP review surface now creates its quiet `#renuvex-reviews` shell before review data/render completion, and media gallery uses a hidden placeholder when the summary says media exists. This is not a loading skeleton; it is a CLS guard. Listing badges already follow the same pattern with invisible reserved slots.
- 2026-06-30: Added future widget surface rules after the storefront performance and chunk-graph audits. New widget surfaces should prefer explicit mounts, keep detection cheap, lazy-load implementations, fail closed for ambiguous auto-placement, and add positive/negative network smoke coverage before production.
- 2026-07-01: Settings reads joined the read-origin contract after theme sync was split out into `POST /api/public/storefront-theme/lazy-sync`. Widget asset, backend API, and read API origins are separate; the read origin is `widget.renuvex.app` for settings/ratings/reviews, while write/upload/video/error/lazy-sync calls stay on `app.renuvex.app`.
- 2026-06-06: Public rating/summary aggregate reads moved to the backend `ProductReviewSummary` read model. Widget response contracts are unchanged; future high-read surfaces should define their aggregate read model before adding public fan-out. Related: [[ADR_0026_Product_Review_Summary_Read_Model]].
- 2026-06-02: Corrected shared summary filter pointer semantics after desktop testing: touch/pen filter options still activate on `pointerdown` with the same-gesture shield, while desktop mouse options activate on normal `click` so every summary layout can reopen the filter immediately after a sort-triggered render. Related bug: [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]].
- 2026-06-02: Strengthened compact/mobile rating-bar visual state: inactive filtered rows now use the explicit `.renuvex-pr-bar-dimmed` CSS state class, and stable widget entrypoints revalidate on reload while hashed runtime chunks stay immutable. Related bug: [[Bug_Filter_Menu_Shadow_DOM_Light_Dismiss]].
- 2026-06-01: Hardened summary interaction contracts: popover registry handles now own `notifyOpening` identity and real teardown, disconnected entries are purged after summary re-renders, rating bar rows are keyboard/ARIA toggle controls, and count columns use tabular numbers with elastic minimum width. Related bug: [[Bug_Summary_Popover_Registry_Lifecycle_Contract]].
- 2026-06-01: Fixed `PAGE_VIEW` lifecycle dedupe so same-page duplicate events inside 800 ms are suppressed, while distinct fast transitions such as `PRODUCT -> CATEGORY` still reach the surface registry immediately. Related bug: [[Bug_Widget_Page_View_Semantic_Dedupe]].
- 2026-06-01: Split shared review-section CSS into owned modules under [reviews-section/styles/](src/widget/reviews-section/styles/) while preserving the `CLASSIC_CSS` export, shadow injection order, DOM/class names, and public settings contract.
- 2026-05-31: Review read lifecycle hardening added stale-response guards for sort/filter/retry/load-more and duplicate-id filtering before load-more DOM insertion. Related bug: [[Bug_Review_Read_Lifecycle_Stale_Responses]].
- 2026-05-28: Expanded automated quality gates from network-only smoke to layered Playwright + Vitest coverage: widget runtime layouts, lightbox/wizard flows, admin preview/settings, public API routes, and theme-state helpers. CI now runs `pnpm test:ci` plus generated widget syntax checks.
- 2026-05-28: Renamed the review-section implementation to `src/widget/reviews-section/` and moved the shared PDP title finder to `src/widget/core/product-title.js`. Public script URL, mount contract, settings schema, backend APIs, and ikas integration are unchanged.
- 2026-05-28: Added `pnpm test:widget-smoke` and the `Widget Smoke` GitHub Actions workflow. The gate protects the ADR_0023/ADR_0024 network contract by exercising the deployed public loader/runtime shape in a browser fixture.
- 2026-05-27: Follow-up hardening after [[ADR_0024_Badge_Review_Surface_Separation]]. Review/media-gallery API helpers moved from `reviews-section/bootstrap.js` to `reviews-section/reviews-api.js`, so bootstrap remains mount-gate orchestration and `render.js` can reuse the same fetch contract without importing bootstrap. The 2-second listing fallback in `loader.js` now probes for product-card-like candidates instead of any generic link. Widget error forwarding now captures script/chunk resource-load errors and route/visibility/online context to diagnose rare DevTools "error script" reports.
- 2026-05-25: `probeWidgetVisibility` now evaluates the live owned node at probe time (via a `resolveCurrent` resolver at each call site) instead of the originally injected element, fixing a high-volume false-positive `missing_after_render` that fired after the one-shot self-heal / theme re-render swapped the badge element. Root cause proven mount-mode-independent and verified on the dev store. The bounded one-shot self-heal was left unchanged. See [[Bug_Listing_Badge_Missing_After_Render]].
- 2026-05-25: Renuvex hard namespace cleanup completed for source and active generated widget assets. Preview events use `RENUVEX_PR_*`, health global is `window.__RENUVEX_PRODUCT_REVIEWS__`, and build defines are `__RENUVEX_PR_*`.
- 2026-05-23: Added runtime health marker, badge visibility probes, widget-error health telemetry, and one-shot badge self-heal for third-party DOM removal; the build now injects a widget version marker.
- 2026-05-18: Listing badge hardening reduced CLS and DOM scan cost: candidate links and the MutationObserver re-render gate are scoped to theme containers/main content, and invisible badge slots are reserved while rating data loads.
- 2026-05-18: Reduced widget settings stale tolerance from 7 days to 24 hours in `core/settings.js`.
- 2026-05-17: Phase 3 source hardening implemented: `widget.js` now points at a content-hashed ESM runtime, stable `runtime.js` remains as a revalidated compatibility shim, script lifecycle is create/update-only, and hidden listing links are filtered before badge injection.
- 2026-05-17: Phase 2 module split verified live on the dev store — PDP/category/search cold entries, PDP↔PDP SPA navigation, and a mobile spot check passed; Sentry post-test check clean. Phase 2 is closed. `core/settings.js` now shares one in-flight settings request between the reviews-main and listing-badge surfaces, so a PDP with product carousels fetches settings once instead of twice. See [[Phase_2_Widget_Module_Split_Plan]].
- 2026-05-17: Phase 2 module split implementation started. Build output is now a classic `public/widget.js` loader plus ESM `public/widget-runtime/*` chunks; async lazy surface mounts, `VIEW_SEARCH_RESULTS`, shared settings, and the Ozy fallback adapter are implemented.
- 2026-05-16: Phase 1 of [[ADR_0013_Modular_Widget_Loader_Architecture]] — internal loader + surface registry + single Storefront Events context module. New files: `loader.js`, `core/storefront-context.js`, `core/registry.js`, `surfaces/*`. `index.js` is now a thin entry; `events.js` keeps only the SPA history patch + modal badge plumbing; `getProductFromPage` removed from `bootstrap.js`. Build output stays a single IIFE — no ESM/splitting/lazy-load. Verified via `pnpm build:widget` + `/preview` smoke test; live storefront verification pending deploy.
- 2026-05-15: Added architecture note from Yotpo/Protein Ocean live research. Current single-bundle architecture remains the source of truth, but future large widget surfaces should follow [[Yotpo_Style_Widget_Modular_Architecture]].
- 2026-05-12: Split widget icon architecture into [src/widget/icons/review-icons.js](src/widget/icons/review-icons.js), [src/widget/icons/filter-icons.js](src/widget/icons/filter-icons.js), and [src/widget/icons/index.js](src/widget/icons/index.js), with [src/widget/icons.js](src/widget/icons.js) retained as a compatibility re-export.
- 2026-05-11: Cloud-name runtime contract removed. The widget now consumes a build-time injected constant only; settings response, runtime cache, setter, and warn helper all deleted (~90 lines). Related ADR: [[ADR_0008_Cloud_Name_Build_Time_Only]]. Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: Documented the durable review image policy contract after adding build-time cloud fallback and widget-side last-valid policy cache. (Superseded same day by ADR_0008.) Related bug: [[Bug_Cloud_Name_Silent_Image_Filter]].
- 2026-05-11: Documented the lightbox three-tier responsive contract and viewport-unit fallback after updating [styles.js](src/widget/reviews-section/styles.js). Related bug: [[Bug_Lightbox_Tablet_Viewport_And_Scroll]].
- 2026-05-11: Documented lightbox focus management as part of the widget runtime risk profile after adding modal dialog semantics and focus trapping. Related bug: [[Bug_Lightbox_Focus_Trap_Accessibility]].
- 2026-05-11: Documented the review fetch error-state contract: stale data is preferred, otherwise the widget renders a retryable error state instead of an empty review list. Related bug: [[Bug_Review_Fetch_Error_Empty_State]].
- 2026-05-11: Documented `loadedLightboxReviews` as widget runtime state for card/list/gallery lightbox navigation across all currently loaded reviews. Related note: [[Product_Review_Lightbox]].
- 2026-05-10: Documented trusted review image URL filtering as part of widget runtime architecture. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-05: Updated the widget architecture note after removing the legacy inline/page review form. Review submission is now modal-only.
- 2026-05-06: Removed `primaryColor`/`primaryTextColor` from the widget runtime (they were not in the admin schema and only created confusion). Historical note: this first used legacy fixed CSS fallback vars, but [[ADR_0020_Renuvex_Product_Reviews_Namespace_Migration]] later moved the active runtime contract to `--renuvex-pr-*`. Related source: [render.js](src/widget/reviews-section/render.js), [styles.js](src/widget/reviews-section/styles.js).
- 2026-05-10: Documented the photo review detail lightbox as a separate widget runtime path and linked its open audit risks. Related source: [review-modal.js](src/widget/reviews-section/review-modal.js), related note: [[Product_Review_Lightbox]].
