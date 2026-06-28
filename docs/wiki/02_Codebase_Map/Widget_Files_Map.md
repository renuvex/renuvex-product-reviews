---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-28
last_verified: 2026-06-28
confidence: high
source_files:
  - "scripts/build-widget.mjs"
  - "scripts/prepare-widget-worker-assets.mjs"
  - "wrangler.widget.jsonc"
  - "src/widget/classic-loader.js"
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/origins.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/settings.js"
  - "src/widget/core/rating-summary.js"
  - "src/widget/core/link-scope.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/dom.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/listing-badges/ratings.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/reviews-api.js"
  - "src/widget/reviews-section/render.js"
  - "src/widget/reviews-section/render/theme-vars.js"
  - "src/widget/reviews-section/render/size-presets.js"
  - "src/widget/reviews-section/render/states.js"
  - "src/widget/reviews-section/render/media-gallery.js"
  - "src/widget/reviews-section/render/handlers.js"
  - "src/widget/reviews-section/render/request-token.js"
  - "src/widget/reviews-section/styles.js"
  - "src/widget/reviews-section/styles/base.js"
  - "src/widget/reviews-section/styles/summary-controls.js"
  - "src/widget/reviews-section/styles/review-primitives.js"
  - "src/widget/reviews-section/styles/states.js"
  - "src/widget/reviews-section/styles/media-gallery.js"
  - "src/widget/reviews-section/styles/lightbox.js"
  - "src/widget/shared/base-reset.js"
  - "src/widget/review-layouts/card/styles.js"
  - "src/widget/summary-layouts/index.js"
  - "src/widget/summary-layouts/shared/bar-chart.js"
  - "src/widget/summary-layouts/shared/actions-block.js"
  - "src/widget/summary-layouts/shared/popover-registry.js"
  - "src/widget/summary-layouts/classic/styles.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/rating-badge/inject.js"
  - "src/widget/structured-data/index.js"
  - "src/widget/structured-data/jsonld.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/widget/themes/ozy/theme.js"
  - "src/widget/themes/generic/adapter.js"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
  - "workers/widget-delivery/src/index.ts"
tags:
  - widget
  - storefront
related:
  - "[[Index]]"
  - "[[Widget_Architecture]]"
  - "[[Storefront_Widget_Overview]]"
---

# Widget Files Map

## Summary
Storefront widget source under `src/widget/*`. Plain JavaScript (.js), built by esbuild as a classic compatibility loader at [public/widget.js](public/widget.js) plus an ESM runtime/chunks under [public/widget-runtime/](public/widget-runtime/). Modular: a `core/` runtime, lazy-loaded `rating-badge/`, `structured-data/`, `reviews-section/`, and `listing-badges/` surfaces, swappable `review-layouts` and `summary-layouts`, and `themes/` for theme-specific fallback selectors/adapters. `reviews-section/render.js` is the top-level render orchestrator; its builders (theme CSS vars, size presets, non-list states, media gallery, request race-token) and its render-rerunning interaction handlers (retry/filter/sort, via `render/handlers.js` `createReviewHandlers({render})` — render injected so there is no circular import) live under `reviews-section/render/*.js`. Load-more stays inline in render.js because it inserts DOM incrementally rather than re-running render. `reviews-section/styles.js` remains the `CLASSIC_CSS` aggregator; shared review-section CSS ownership lives under `reviews-section/styles/*.js`. Layout-specific CSS lives in `review-layouts/*/styles.js` and `summary-layouts/*/styles.js` (card/classic defaults included). Neither belongs inside a theme adapter folder.

## Tree

```
src/widget/
├─ classic-loader.js              # Classic ikas script entry; imports ESM runtime.
├─ index.js                       # ESM runtime entry. Detects preview vs prod.
├─ loader.js                      # Orchestrates context, registry, observer, lazy modules.
├─ events.js                      # Document-level click/scroll wiring
├─ icons.js                       # Backward-compatible icon API re-export
├─ icons/
│  ├─ index.js                    # Public icon API for runtime + admin preview
│  ├─ review-icons.js             # Review/rating ICONS registry (filled + empty SVG pairs)
│  ├─ star-sprite.js              # SVG <symbol> sprite for rating stars (<use>) — ADR_0019
│  └─ filter-icons.js             # Filter button FILTER_ICONS registry (single-state SVGs)
├─ observer.js                    # MutationObserver — re-bootstraps widget on SPA-style theme nav
│
├─ core/
│  ├─ config.js                   # PUBLIC_API_KEY + ASSET_BASE + API_BASE (SSR-safe)
│  ├─ origins.js                  # Script asset origin + explicit API origin normalization
│  ├─ storefront-context.js       # Single Storefront Events owner.
│  ├─ registry.js                 # Surface registry; supports async lazy mounts.
│  ├─ lazy-modules.js             # Dynamic import boundaries for widget modules.
│  ├─ settings.js                 # Shared public settings fetch/cache.
│  ├─ link-scope.js              # Shared scoped link discovery for listing DOM fallbacks.
│  ├─ state.js                    # Module-level mutable state (currentSettings, currentProductId, ...)
│  ├─ fetch.js                    # API helpers (calls API_BASE /api/public/*)
│  ├─ cache.js                    # sessionStorage wrapper with in-memory fallback (cacheGet/cacheSet)
│  ├─ product-title.js            # Shared PDP title finder for badge placement and adapters
│  ├─ helpers.js                  # Misc utilities + trusted review image URL helpers
│  ├─ rating-summary.js           # Shared one-product approved rating summary fetch/cache
│  └─ badge.js                    # Generic badge primitive
│
├─ reviews-section/
│  ├─ bootstrap.js                # Reviews section entry: settings, mount gate, initial fetch orchestration
│  ├─ reviews-api.js              # Reviews/media-gallery fetch helpers and explicit fetch-error result
│  ├─ render.js                   # Top-level render orchestrator (summary + list + modal CTA). Imports pure builders from render/*.
│  ├─ render/                     # Builders + handlers extracted from render.js
│  │  ├─ theme-vars.js            # applyManualTheme + hexToRgba: admin color settings → --renuvex-pr-* CSS vars
│  │  ├─ size-presets.js          # SIZE_PRESETS + THUMBNAIL_PRESETS tables
│  │  ├─ states.js                # Disabled, product-empty, filtered-empty, and fetch-error DOM builders
│  │  ├─ media-gallery.js         # buildMediaGallery(opts): media gallery section (openReviewModal/wireLightboxTrigger via DI)
│  │  ├─ handlers.js              # createReviewHandlers({render}): retry/filter/sort handlers that re-run render (DI, no cycle)
│  │  └─ request-token.js         # reviewRequestSeq race-token (beginReviewRequest/isCurrentReviewRequest)
│  ├─ styles.js                  # CLASSIC_CSS aggregator for shared review-section CSS
│  ├─ styles/
│  │  ├─ base.js                 # Widget root, text safety, icons, mobile padding tokens
│  │  ├─ summary-controls.js     # Shared bar chart, write action, filter menu, rating-bar focus/count CSS
│  │  ├─ review-primitives.js    # Shared review stars, replies, read-more, pagination/load-more primitives
│  │  ├─ states.js               # Non-list state CSS: product-empty, filtered-empty, fetch-error
│  │  ├─ media-gallery.js        # Media gallery title, arrows, thumbnails
│  │  └─ lightbox.js             # Photo review lightbox CSS
│  ├─ review-modal.js             # Photo review detail lightbox
│  └─ review-form-modal/
│     ├─ index.js                 # Modal entry
│     ├─ modal-shell.js           # Modal chrome (overlay, close, focus trap, toast)
│     ├─ progress-bar.js          # Step indicator + footer buttons (Skip/Continue/Next). Button role switches based on step validity and pending upload state.
│     ├─ wizard-state.js          # Step state machine
│     ├─ styles.js                # Inline CSS for modal + toast animations
│     └─ steps/                   # Individual wizard steps
│
├─ rating-badge/
│  ├─ index.js                    # PDP badge surface entry: settings gates + ratings fetch
│  └─ inject.js                   # PDP title badge DOM injection and cleanup
│
├─ structured-data/
│  ├─ index.js                    # Product AggregateRating JSON-LD surface entry
│  └─ jsonld.js                   # Owned JSON-LD builder, injection, cleanup
│
├─ listing-badges/
│  ├─ index.js                    # Bootstrap (find product cards on listing pages)
│  ├─ dom.js                      # Scoped link discovery + visibility helpers
│  ├─ collect.js                  # Discover candidate cards and merge event product ids
│  ├─ ratings.js                  # Bulk fetch via /api/public/ratings, slug fallback only
│  └─ inject.js                   # Inject star badges into discovered cards
│
├─ review-layouts/
│  ├─ index.js                    # Layout registry + meta (`supports` map drives layout-aware settings)
│  ├─ _shared.js                  # Common review item rendering
│  ├─ card/                       # ★ default (index.js + styles.js)
│  ├─ gallery/                    # photo-first
│  └─ list/
│     ├─ index.js
│     └─ styles.js
│
├─ summary-layouts/
│  ├─ index.js                    # Layout registry + meta (used by `layoutKey + supports`)
│  ├─ shared/                     # Common summary primitives (rating bar chart, actions, popover registry)
│  ├─ classic/                    # default summary layout (index.js + styles.js)
│  ├─ compact/
│  ├─ hero/
│  ├─ minimal/
│  └─ split/
│
└─ themes/
   ├─ current-adapter.js           # Active theme adapter selector.
   └─ ozy/
      ├─ adapter.js               # Ozy fallback DOM placement adapter.
      ├─ theme.js                 # Theme-specific selectors / hooks
      └─ styles.js                # Ozy override placeholder / compatibility re-export
```

## Key concepts

### Bootstrap path
`classic-loader.js` -> `public/widget.js` -> dynamic import of `widget-runtime/runtime.js`. The runtime initializes base styles/error reporting, then `loader.js` registers lightweight surfaces, subscribes to Storefront Events through `core/storefront-context.js`, and lazy-loads modules through `core/lazy-modules.js`.

### Preview mode
`index.js` checks `window.__ikasPreviewMode === true`. In preview:
- Listens for `RENUVEX_PR_SETTINGS_UPDATE` postMessage
- Posts back `RENUVEX_PR_WIDGET_READY` once mounted
- Bootstraps with `'mock-product'` and a fixture product name

### Layout-aware settings (important)
- `summary-layouts/index.js` and `review-layouts/index.js` each export a registry where every layout declares support metadata such as `supports: { title: true, thumbnailSize: false, ... }`.
- Admin settings panel ([widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts)) uses `showWhen: { layoutKey: 'summaryLayout', supports: 'title' }` to read those flags.
- ⚠️ When you add a new layout, declare `supports` keys for everything any setting could check. Otherwise admin shows fields that have no effect.

### Theme variant
Runtime theme selection is not a per-theme bundle split. The live widget receives `runtime.themeAdapterKey/source` from public settings and selects the adapter through `themes/current-adapter.js`. The historical `--theme=new-theme` build alias still exists in [scripts/build-widget.mjs](scripts/build-widget.mjs), but it is not the current adapter model. Base review widget CSS imports from the `reviews-section/styles.js` aggregator; owned shared modules live under `reviews-section/styles/`. `themes/ozy/styles.js` is only a compatibility re-export / future Ozy override placeholder.

## What lives in `public/`
- [public/widget.js](public/widget.js) — built classic loader (committed). Don't hand-edit.
- [public/widget-runtime/runtime.js](public/widget-runtime/runtime.js) — built ESM runtime entry. Don't hand-edit.
- [public/widget-runtime/chunks/](public/widget-runtime/chunks/) — built lazy chunks. Don't hand-edit.
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json) — build output report including bytes and import kinds.
- [public/logo.svg](public/logo.svg)

## Cloudflare Worker asset delivery
`widget.renuvex.app` is prepared to become a Cloudflare Worker Static Assets origin. The repo-level pieces are:
- [src/widget/core/origins.js](src/widget/core/origins.js) keeps static asset origin and public API origin separate;
- [scripts/build-widget.mjs](scripts/build-widget.mjs) injects `STOREFRONT_WIDGET_API_BASE_URL` into the widget build when set;
- [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs) copies only widget runtime files into `.tmp/widget-worker-assets`;
- [workers/widget-delivery/src/index.ts](workers/widget-delivery/src/index.ts) serves only the widget asset surface and fails closed for `/api/*`;
- [wrangler.widget.jsonc](wrangler.widget.jsonc) owns Worker Static Assets config without routes, domains, secrets, or data bindings.

## Notes
- `core/state.js` holds module-level mutable state (`currentSettings`, `currentProductId`, `currentReviewsData`, ...). Acceptable because the widget is a single-page-singleton. When refactoring, treat these as the runtime state — re-renders must consume them.
- Review submission is modal-only. The legacy inline/page form was removed from `src/widget/reviews-section/`; all write CTAs open `review-form-modal/`.
- `review-modal.js` is the photo review detail lightbox, not the review submission wizard. Keep this distinction clear when changing modal behavior. See [[Product_Review_Lightbox]].
- Review/rating, filter, and UI chrome icons are split under `src/widget/icons/`. Import new code from [icons/index.js](src/widget/icons/index.js); [icons.js](src/widget/icons.js) remains only as a compatibility re-export. `tests/unit/widget-icon-sprite.test.ts` pins the registry to Phosphor 256-grid/currentColor SVGs and rejects old Lucide 24-grid or Unicode X/arrow glyphs.
- Review image rendering must go through `getTrustedReviewImages()` / `getFirstTrustedReviewImage()` in [helpers.js](src/widget/core/helpers.js). Do not add layout-local `https://` or `data:image` checks.
- Listing DOM discovery shared by listing badges and the MutationObserver must go through [link-scope.js](src/widget/core/link-scope.js); do not reintroduce whole-document `document.querySelectorAll('a[href]')` scans.
- Always test changes both in `/preview` AND on a real ikas storefront — preview mode skips the mutation observer and theme integrations.
- The widget is **plain JS**. No TS, no React. Don't introduce a framework without rationale (bundle size + cold-start hit).

## Related Source Files
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js)
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs)
- [workers/widget-delivery/src/index.ts](workers/widget-delivery/src/index.ts)
- [wrangler.widget.jsonc](wrangler.widget.jsonc)
- [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts)

## Obsidian Links
- [[Widget_Architecture]]
- [[Storefront_Widget_Overview]]
- [[Product_Review_Widget]]
- [[Product_Review_Lightbox]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]

## Change Log
- 2026-06-28: Added the widget split-origin files and Cloudflare Worker Static Assets delivery map. `config.js` now exposes `ASSET_BASE` and `API_BASE`; Worker delivery remains asset-only and fail-closed for `/api/*`.
- 2026-06-11: Moved review-section non-list state CSS into [reviews-section/styles/states.js](src/widget/reviews-section/styles/states.js). [reviews-section/styles.js](src/widget/reviews-section/styles.js) remains the `CLASSIC_CSS` aggregator; [reviews-section/styles/review-primitives.js](src/widget/reviews-section/styles/review-primitives.js) no longer owns empty/error state selectors.
- 2026-06-02: Clarified shared filter action semantics: touch/pen filter options activate on `pointerdown` with the same-gesture shield, while desktop mouse options activate on normal `click` so filters can reopen immediately after sort-triggered summary renders.
- 2026-06-01: Hardened summary shared primitives: [summary-layouts/shared/popover-registry.js](src/widget/summary-layouts/shared/popover-registry.js) now exposes a handle lifecycle contract, [summary-layouts/shared/bar-chart.js](src/widget/summary-layouts/shared/bar-chart.js) exposes keyboard/ARIA toggle semantics, and [reviews-section/styles/summary-controls.js](src/widget/reviews-section/styles/summary-controls.js) owns bar focus/count resilience.
- 2026-06-01: Added same-gesture press-through shielding to [summary-layouts/shared/popover-registry.js](src/widget/summary-layouts/shared/popover-registry.js) and [shared/base-reset.js](src/widget/shared/base-reset.js): touch/pen filter option activation keeps normal future `:active` feedback but temporarily blocks controls exposed under the dismissed menu.
- 2026-06-01: Split shared review-section CSS ownership into [reviews-section/styles/](src/widget/reviews-section/styles/) modules while keeping [reviews-section/styles.js](src/widget/reviews-section/styles.js) as the `CLASSIC_CSS` aggregator and preserving injection order.
- 2026-05-31: Added [review-layouts/card/styles.js](src/widget/review-layouts/card/styles.js) so card/default review CSS ownership matches list/gallery while shared review primitives remain in [reviews-section/styles.js](src/widget/reviews-section/styles.js).
- 2026-05-31: Added [summary-layouts/classic/styles.js](src/widget/summary-layouts/classic/styles.js) so classic/default summary CSS ownership matches the other summary layout folders while shared review CSS remains in [reviews-section/styles.js](src/widget/reviews-section/styles.js).
- 2026-05-28: Renamed the broad PDP implementation folder to [reviews-section/](src/widget/reviews-section/) and moved the shared PDP title finder to [core/product-title.js](src/widget/core/product-title.js). Public widget mount/API contracts stayed unchanged.
- 2026-05-27: Added [reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js) to make the reviews-section folder boundary explicit: `bootstrap.js` owns review mount orchestration, `reviews-api.js` owns review/media-gallery data access, and `render.js` owns review-section UI interactions.
- 2026-05-24: Added [icons/star-sprite.js](src/widget/icons/star-sprite.js) — read-only rating stars render via a single injected SVG `<symbol>` sprite referenced by `<use>` instead of inlining `<path>` per star. Renderers (`partialStarsHTML`, `starsHTML`, `renderStarRow`) call `ensureStarSprite` + emit `starUseSvg`; `ICONS` strings stay the single source (admin preview + sprite both derive from them). Related: [[ADR_0019_Icon_Sprite_Rendering]].
- 2026-05-18: Added [core/link-scope.js](src/widget/core/link-scope.js) so listing badges and the MutationObserver share scoped link discovery; active builds no longer use whole-document `document.querySelectorAll('a[href]')` for listing re-render checks.
- 2026-05-17: Listing badge files now use canonical ikas product ids from Storefront Events for rating fetches; slug remains DOM fallback only. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Phase 2 module split implemented and verified. `public/widget.js` is the classic loader, `public/widget-runtime/*` contains ESM runtime/chunks, and lazy boundaries live in `core/lazy-modules.js`.
- 2026-05-12: Split the storefront icon registry into [review-icons.js](src/widget/icons/review-icons.js), [filter-icons.js](src/widget/icons/filter-icons.js), and [icons/index.js](src/widget/icons/index.js). [icons.js](src/widget/icons.js) now remains as a compatibility re-export.
- 2026-05-10: Documented the trusted review image helpers in [helpers.js](src/widget/core/helpers.js). Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-05: Removed the legacy inline/page review form from the widget source map. Review submission is now modal-only via [review-form-modal/](src/widget/reviews-section/review-form-modal/). Related source: [render.js](src/widget/reviews-section/render.js), [write-action.js](src/widget/summary-layouts/shared/write-action.js).
- 2026-05-10: Corrected `review-modal.js` from "multi-step review modal" to photo review detail lightbox and linked [[Product_Review_Lightbox]]. Related source: [review-modal.js](src/widget/reviews-section/review-modal.js).
