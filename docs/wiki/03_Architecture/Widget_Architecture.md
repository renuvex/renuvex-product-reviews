---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-28
last_verified: 2026-05-28
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
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
source_files:
  - "scripts/build-widget.mjs"
  - "src/widget/classic-loader.js"
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/error-reporter.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/core/config.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/settings.js"
  - "src/widget/core/link-scope.js"
  - "src/widget/core/health.js"
  - "src/widget/observer.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/styles.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/dom.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/generic/adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/lib/storefront-theme.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
---

# Widget Architecture

## Summary
A classic ikas-compatible storefront entry (`public/widget.js`) loaded by every storefront page, which imports an ESM runtime and lazy chunks from `public/widget-runtime/*`. It detects context (product page, listing/search page, preview iframe), fetches per-merchant settings, and renders summaries, listings, badges, the review submission modal, and the photo review detail lightbox. The runtime is intentionally framework-free.

As of 2026-05-23, public settings also return `runtime.themeAdapterKey/source`. The backend resolves this from ikas Admin API `listStorefront.themes[].isMainTheme` during script reconciliation and stores the non-sensitive result in `StoreSettings.storefrontTheme`. Ozy remains the verified adapter; unknown active themes use a conservative generic adapter.

As of the 2026-05-17 Phase 2 implementation work, local build output is split:
`public/widget.js` is a small classic loader, `public/widget-runtime/runtime.js`
is the ESM runtime entry, and PDP/listing modules are lazy chunks. The deployed
pre-Phase-2 widget measured `177763` bytes on 2026-05-15; re-measure after
deployment before claiming live performance improvement.

## Responsibilities
- Inject summary + reviews on **product detail pages**
- Inject star+count badges into **listing-page product cards**
- Inject a **rating badge** above the product title
- Open a **multi-step review modal** with image upload
- Open a **photo review detail lightbox** for review images and photo-strip thumbnails
- React to **SPA-style theme nav** via MutationObserver
- Run in **preview mode** for live admin customization

## Runtime modules

| Module | Purpose |
|---|---|
| [src/widget/index.js](src/widget/index.js) | Thin entry. Side-effect inits (ADR_0011 order) + preview/prod branch. Delegates to `loader.js`. |
| [loader.js](src/widget/loader.js) | Orchestration. `startWidget()` (prod) / `startPreview()` (admin iframe). Wires context → registry (ADR_0013). |
| [core/storefront-context.js](src/widget/core/storefront-context.js) | Single owner of `window.IkasEvents` subscription; exposes page/product context (`onProductView`/`onPageView`) + DOM fallback (ADR_0013). |
| [core/registry.js](src/widget/core/registry.js) | Surface registry (`rating-badge`, `reviews-main`, `listing-badge`) with guarded async mounts. |
| [core/lazy-modules.js](src/widget/core/lazy-modules.js) | Dynamic import boundary owner for reviews, listing, badge, and preview render modules. |
| [core/settings.js](src/widget/core/settings.js) | Shared public settings fetch/cache used by lazy modules without pulling PDP render code. |
| [core/health.js](src/widget/core/health.js) | Runtime health marker, visibility telemetry, and bounded one-shot DOM-removal self-heal helpers for badge surfaces. |
| [surfaces/](src/widget/surfaces/) | Thin surface descriptors (`detect`/`mount`) that lazy-load implementation modules. |
| [core/config.js](src/widget/core/config.js) | `PUBLIC_API_KEY` and `API_BASE` parsed from own `<script src>`. |
| [core/state.js](src/widget/core/state.js) | Module-level mutable state (current product, settings, reviews, paging, canonical lightbox review collection). |
| [core/fetch.js](src/widget/core/fetch.js) | API helpers calling `/api/public/*`. |
| [core/cache.js](src/widget/core/cache.js) | `sessionStorage` wrapper with in-memory fallback (private browsing / quota exceeded). Persists across same-tab navigations. |
| [core/helpers.js](src/widget/core/helpers.js) | Shared display helpers, including trusted review image URL filtering for storefront render paths. |
| [icons/](src/widget/icons/) | Public icon API plus split review/rating and filter icon registries shared by runtime and admin preview. |
| [observer.js](src/widget/observer.js) | MutationObserver to re-render listing badges on SPA theme nav; uses scoped listing link discovery instead of whole-document link scans. |
| [events.js](src/widget/events.js) | SPA history patch (stale rating-badge cleanup) + quick-view modal badge plumbing. IkasEvents handling moved to `core/storefront-context.js` (ADR_0013). |
| [rating-badge/](src/widget/rating-badge/) | Independent PDP rating badge surface. Fetches one-product rating summaries and owns badge DOM + JSON-LD cleanup. |
| [reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js) | Reviews section entry. Fetches settings, checks the explicit reviews mount, fetches initial review/photo-strip data, then dynamically imports `render.js`. |
| [reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js) | Shared reviews/photoStrip fetch helpers, cache handling, preview fallback, and explicit review-fetch error result. |
| [reviews-section/render.js](src/widget/reviews-section/render.js) | Compose summary + reviews + modal CTA based on settings; handles filter/sort/load-more fetches through `reviews-api.js`. |
| [core/product-title.js](src/widget/core/product-title.js) | Heuristic to find product title element across themes. |
| [reviews-section/review-modal.js](src/widget/reviews-section/review-modal.js) | Photo review detail lightbox. Distinct from the submission wizard. |
| [reviews-section/review-form-modal/](src/widget/reviews-section/review-form-modal/) | Multi-step submission wizard (steps + progress + state machine). |
| [listing-badges/](src/widget/listing-badges/) | Listing-page badge bootstrap, scoped link discovery, bulk fetch, slot reservation, injection. |
| [review-layouts/](src/widget/review-layouts/) | `card` / `gallery` / `list` review item layouts (registry in `index.js`). |
| [summary-layouts/](src/widget/summary-layouts/) | `classic` / `compact` / `hero` / `minimal` / `split` summary layouts. |
| [themes/current-adapter.js](src/widget/themes/current-adapter.js) | Runtime-selected adapter registry. Defaults to Ozy unless public settings select `generic`. |
| [themes/generic/](src/widget/themes/generic/) | Conservative unknown-theme adapter; avoids Ozy-specific selectors and relies on generic scoped link/title heuristics. |
| [reviews-section/styles.js](src/widget/reviews-section/styles.js) | Shared Renuvex review widget CSS. Theme-agnostic; imported by PDP review render. |
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
core/config.js    → PUBLIC_API_KEY, API_BASE
        │
        ▼
index.js  (error-reporter / base-reset / input-modality side-effects)
        │
        ▼
loader.js
  ├── if preview: startPreview() -> RENUVEX_PR_SETTINGS_UPDATE listener; bootstrap('mock-product')
  └── else: startWidget()
        ├── registerCoreSurfaces()      (rating-badge, reviews-main, listing-badge)
        ├── initStorefrontContext()     (subscribe window.IkasEvents + DOM fallback)
        ├── attachHistoryListener / attachModalBadgeListener / startMutationObserver
        └── onProductView / onPageView  → registry.mountMatching(context)
        │
        ▼ (productView context → rating-badge surface)
rating-badge/index.js
  ├── fetch /api/public/settings  (cached)
  ├── settings + theme auto-placement gates
  ├── fetch /api/public/ratings?productIds=<one>
  └── rating-badge/inject.js (badge DOM + JSON-LD)

        ▼ (productView context → reviews-main surface)
reviews-section/bootstrap.js
  ├── fetch /api/public/settings  (cached)
  ├── explicit <div data-renuvex-widget="reviews"> mount gate
  ├── reviews-section/reviews-api.js fetches reviews + photoStrip
  ├── core/state.js ← write currentSettings, currentReviewsData, ...
  └── dynamic import render.js (chooses layouts from settings)
```

Phase 1 of [[ADR_0013_Modular_Widget_Loader_Architecture]] introduced the loader +
surface registry + Storefront Events context layer. Phase 2 implementation landed
on 2026-05-17: build output now uses a classic compatibility loader plus ESM
runtime/chunks, `VIEW_SEARCH_RESULTS` is handled beside verified `VIEW_LISTING`,
and listing placement rules moved into the Ozy fallback adapter. Phase 2 was
verified live on the dev store on 2026-05-17 (browser + Sentry post-test); see
[[Phase_2_Widget_Module_Split_Plan]].

## Layout-aware settings (key concept)

Each layout registers `supports: { title: true, photoStrip: false, ... }` in its layout `index.js`. Admin settings panel uses `showWhen: { layoutKey, supports }` in [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts) to hide irrelevant fields. This means **adding a new setting often means deciding which layouts support it** — not editing settings rendering code.

## Preview mode protocol

```
admin iframe          widget.js (preview)
   │                       │
   │  window.postMessage   │
   ├── RENUVEX_PR_SETTINGS_UPDATE→│ merge into currentSettings → re-render
   │                       │
   │ ←── RENUVEX_PR_WIDGET_READY ─│ once mounted
```

Preview iframe HTML lives at [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts). It loads `widget.js?publicApiKey=preview&v=<timestamp>` (timestamp busts cache so admin sees fresh code on each open).

## Caching strategy
- `/api/public/settings` and `/api/public/reviews` set `Cache-Control: s-maxage=60, stale-while-revalidate=300` (Vercel CDN).
- Widget side: `sessionStorage` (with in-memory fallback) cache in `core/cache.js` — survives same-tab navigation; settings stay fresh for 5 minutes and can be reused stale for up to 24 hours during transient settings fetch failures.
- Review fetch failures use stale cached review data when available; without stale data, `reviews-api.js fetchReviews()` returns an explicit error result so `render.js` can show a retryable error state instead of an empty list.
- No localStorage caching today (could be added for repeat visits).

## Build
- [scripts/build-widget.mjs](scripts/build-widget.mjs) drives esbuild.
- Output: classic loader (`public/widget.js`) plus ESM runtime/chunks
  (`public/widget-runtime/*`), ES2017, minified in prod, banner with build timestamp.
- The build injects `__RENUVEX_PR_WIDGET_VERSION__` from the build timestamp; the runtime exposes it through `window.__RENUVEX_PRODUCT_REVIEWS__` and widget-error health events.
- Validation: post-build `node --check` for the classic loader plus esbuild ESM
  bundling and `public/widget-runtime/build-manifest.json` output metadata.

## Notes
- The widget is the **highest-leverage code surface** in the codebase (every storefront load executes it). Bundle size and TTI matter.
- Don't introduce a framework (React, Preact, Lit) without an explicit ADR. The vanilla approach is a deliberate trade-off — see [[ADR_0002_Widget_Injection_Strategy]].
- DOM identification (product id, slug, title) uses Storefront Events first and theme/DOM fallbacks second. When fixing a "widget doesn't show on theme X" issue, inspect `core/storefront-context.js`, `product-title.js`, and the active theme adapter before changing review bootstrap.
- Browser conflict hardening is diagnostic and bounded: badge render paths report visibility/dom-conflict events and try one remount if a rendered badge node is removed; they do not loop against aggressive third-party scripts. The visibility probe re-resolves the **current** owned node when it fires (not the originally injected reference), so a self-heal/theme re-render that swaps the element does not produce a false `missing_after_render`. See [[Bug_Listing_Badge_Missing_After_Render]].
- The widget assumes a single product per page on PDP. Multi-product pages (looks/sets) would need a redesign.
- Review submission has a single runtime path: all write CTAs open the multi-step modal. The legacy inline/page form path was removed to reduce storefront bundle complexity.
- Icon selection is centralized under [src/widget/icons/](src/widget/icons/): review/rating icons live in `review-icons.js`, filter button icons live in `filter-icons.js`, and consumers import through `icons/index.js`. The old [icons.js](src/widget/icons.js) file is a compatibility re-export only.
- The photo review detail lightbox has its own runtime path and risk profile; see [[Product_Review_Lightbox]] and [[Bug_Review_Detail_Lightbox_Risks]] before changing image navigation, responsive breakpoints, viewport sizing, scroll containment, body scroll locking, focus management, or history behavior. Card/list/gallery navigation is scoped to the active sort/filter state's loaded review collection; the lightbox does not fetch unloaded pages by itself.
- Lightbox layout uses a three-tier responsive contract in the Ozy theme: desktop two-column at `801px+`, stacked tablet/landscape at `641px-800px`, and fullscreen mobile at `640px` and below with `vh` / `svh` / `dvh` viewport-unit fallbacks.
- Review image rendering depends on a trusted Cloudinary cloud policy. The cloud name is a build-time constant injected by [scripts/build-widget.mjs](scripts/build-widget.mjs) as `__RENUVEX_PR_DEFAULT_CLOUDINARY_CLOUD_NAME__`. It is not threaded through settings, no runtime setter exists, and there is no per-store image-policy cache. Settings endpoint outages cannot remove images. Layout code should use `getTrustedReviewImages()` instead of local URL prefix checks. See [[ADR_0006_Trusted_Review_Image_URL_Policy]], [[ADR_0008_Cloud_Name_Build_Time_Only]], and [[Bug_Cloud_Name_Silent_Image_Filter]].
- A 2026-05-15 Yotpo/Protein Ocean research pass showed that mature review widgets use a small loader, declarative placeholder instances, separate static widget modules, and dynamic review/rating/Q&A APIs. New major widget surfaces should follow the Phase 2 loader/lazy-module pattern in [[Yotpo_Style_Widget_Modular_Architecture]] rather than being statically imported by the always-loaded runtime.

## Related Source Files
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js) (built)
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json) (built)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts)

## Obsidian Links
- [[Storefront_Widget_Overview]]
- [[Product_Review_Widget]]
- [[Product_Review_Lightbox]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[ADR_0008_Cloud_Name_Build_Time_Only]]
- [[ADR_0013_Modular_Widget_Loader_Architecture]]
- [[Ikas_Widget_Injection_Notes]]
- [[Ikas_Storefront_Events]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Yotpo_Protein_Ocean_Widget_Research]]

## Change Log
- 2026-05-28: Renamed the review-section implementation to `src/widget/reviews-section/` and moved the shared PDP title finder to `src/widget/core/product-title.js`. Public script URL, mount contract, settings schema, backend APIs, and ikas integration are unchanged.
- 2026-05-27: Follow-up hardening after [[ADR_0024_Badge_Review_Surface_Separation]]. Review/photoStrip API helpers moved from `reviews-section/bootstrap.js` to `reviews-section/reviews-api.js`, so bootstrap remains mount-gate orchestration and `render.js` can reuse the same fetch contract without importing bootstrap. The 2-second listing fallback in `loader.js` now probes for product-card-like candidates instead of any generic link. Widget error forwarding now captures script/chunk resource-load errors and route/visibility/online context to diagnose rare DevTools "error script" reports.
- 2026-05-25: `probeWidgetVisibility` now evaluates the live owned node at probe time (via a `resolveCurrent` resolver at each call site) instead of the originally injected element, fixing a high-volume false-positive `missing_after_render` that fired after the one-shot self-heal / theme re-render swapped the badge element. Root cause proven mount-mode-independent and verified on the dev store. The bounded one-shot self-heal was left unchanged. See [[Bug_Listing_Badge_Missing_After_Render]].
- 2026-05-25: Renuvex hard namespace cleanup completed for source and active generated widget assets. Preview events use `RENUVEX_PR_*`, health global is `window.__RENUVEX_PRODUCT_REVIEWS__`, and build defines are `__RENUVEX_PR_*`.
- 2026-05-23: Added runtime health marker, badge visibility probes, widget-error health telemetry, and one-shot badge self-heal for third-party DOM removal; the build now injects a widget version marker.
- 2026-05-18: Listing badge hardening reduced CLS and DOM scan cost: candidate links and the MutationObserver re-render gate are scoped to theme containers/main content, and invisible badge slots are reserved while rating data loads.
- 2026-05-18: Reduced widget settings stale tolerance from 7 days to 24 hours in `core/settings.js`.
- 2026-05-17: Phase 3 source hardening implemented: `widget.js` now points at a content-hashed ESM runtime, stable `runtime.js` remains as a short-cache shim, script lifecycle is create/update-only, and hidden listing links are filtered before badge injection.
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
