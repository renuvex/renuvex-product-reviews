---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-08-10
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
  - "src/widget/core/context-epoch.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/settings.js"
  - "src/widget/core/namespace.js"
  - "src/widget/core/rating-summary.js"
  - "src/widget/core/listing-viewport-gate.js"
  - "src/widget/placement/capability.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/ratings.js"
  - "src/widget/listing-badges/strict-inject.js"
  - "src/widget/preview/scenes.js"
  - "src/widget/preview/index.js"
  - "src/widget/preview/document.js"
  - "src/widget/preview/fixtures.js"
  - "src/app/(preview)/preview/[widgetId]/[scene]/route.ts"
  - "src/lib/widgets/preview-routes.ts"
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

## Agent Brief

Use this page only to locate storefront runtime ownership. Start with
`classic-loader.js` for the stable loader, `loader.js` and `core/*` for
lifecycle/context, the named surface folder for rendering, and
`themes/ozy/adapter.js` for verified automatic placement. Build output is the
loader plus manifest-selected ESM runtime/chunks; never hand-edit artifacts or
delete retained hashes without checking `scripts/build-widget.mjs`.

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
│  ├─ config.js                   # PUBLIC_API_KEY + ASSET_BASE + API_BASE + READ_API_BASE (SSR-safe)
│  ├─ origins.js                  # Script asset origin + explicit API origin normalization
│  ├─ storefront-context.js       # Single Storefront Events owner.
│  ├─ registry.js                 # Surface registry; supports async lazy mounts.
│  ├─ lazy-modules.js             # Dynamic import boundaries for widget modules.
│  ├─ settings.js                 # Shared public settings fetch/cache.
│  ├─ context-epoch.js           # Canonical storefront context invalidation and stale-async guard.
│  ├─ listing-viewport-gate.js   # Near-viewport gate for below-the-fold listing/product-slider badges.
│  ├─ state.js                    # Module-level mutable state (currentSettings, currentProductId, ...)
│  ├─ fetch.js                    # API helpers used by API_BASE/READ_API_BASE callers
│  ├─ cache.js                    # sessionStorage wrapper with in-memory fallback (cacheGet/cacheSet)
│  ├─ product-title.js            # Shared PDP title finder for badge placement and adapters
│  ├─ helpers.js                  # Misc utilities + trusted review image URL helpers
│  ├─ rating-summary.js           # Shared one-product approved rating summary fetch/cache
│  └─ badge.js                    # Generic badge primitive
│
├─ placement/
│  └─ capability.js               # Strict PDP/listing/modal placement proofs and revalidation.
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
│  ├─ index.js                    # Strict proof collection, bulk ratings, and guarded injection
│  ├─ ratings.js                  # Bulk fetch via /api/public/ratings, slug fallback only
│  ├─ strict-inject.js            # Production injection from revalidated proof targets
│  └─ inject.js                   # Isolated preview fixture injection helper
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
      ├─ adapter.js               # Ozy strict placement adapter and runtime signature.
      ├─ theme.js                 # Theme-specific selectors / hooks
      └─ styles.js                # Ozy override placeholder / compatibility re-export
```

## Key concepts

### Bootstrap path
`classic-loader.js` -> `public/widget.js` -> dynamic import of `widget-runtime/runtime.js`. The runtime initializes base styles/error reporting, then `loader.js` registers lightweight surfaces, subscribes to Storefront Events through `core/storefront-context.js`, and lazy-loads modules through `core/lazy-modules.js`.

### Preview mode
`index.js` checks `window.__ikasPreviewMode === true` and delegates to
`loader.js`. The preview path is scene-driven:
- `preview/scenes.js` is the registry (`reviews/reviews`, `badge/pdp`,
  `badge/listing`) and owns protocol version `1`.
- The iframe accepts only exact-parent, exact-same-origin messages that match
  its frozen widget/scene context.
- `RENUVEX_PR_WIDGET_READY` starts the handshake;
  `RENUVEX_PR_PREVIEW_RENDER` carries the complete resolved widget settings
  map; `RENUVEX_PR_PREVIEW_RENDERED` / `RENUVEX_PR_PREVIEW_ERROR` finish it.
- `preview/index.js` calls the real Reviews, PDP Badge, or Listing Badge
  renderer against deterministic local fixtures. Settings and review pages
  stay in memory; preview does not call public settings/reviews APIs.
- `RENUVEX_PR_PREVIEW_RESET_SCROLL` restores the iframe to the top after an
  editor reset without remounting or persisting preview state.

### Layout-aware settings (important)
- `summary-layouts/index.js` and `review-layouts/index.js` each export a registry where every layout declares support metadata such as `supports: { title: true, thumbnailSize: false, ... }`.
- Admin settings panel ([catalog.ts](src/lib/widgets/catalog.ts)) uses `showWhen: { layoutKey: 'summaryLayout', supports: 'title' }` to read those flags.
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
`widget.renuvex.app` is the live Cloudflare Worker Static Assets origin for storefront widget delivery. The repo-level pieces are:
- [src/widget/core/origins.js](src/widget/core/origins.js) keeps static asset origin and public API origin separate;
- [scripts/build-widget.mjs](scripts/build-widget.mjs) injects `STOREFRONT_WIDGET_API_BASE_URL` and `STOREFRONT_WIDGET_READ_API_BASE_URL` into the widget build; if the read value is unset, it falls back to `STOREFRONT_WIDGET_BASE_URL`;
- [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs) copies only widget runtime files into `.tmp/widget-worker-assets`;
- [workers/widget-delivery/src/index.ts](workers/widget-delivery/src/index.ts) serves the widget asset surface and V2 allowlisted public read paths, while failing closed for every other `/api/*` path;
- [wrangler.widget.jsonc](wrangler.widget.jsonc) owns Worker Static Assets config without routes, domains, secrets, or data bindings.

## Notes
- `core/state.js` holds module-level mutable state (`currentSettings`, `currentProductId`, `currentReviewsData`, ...). Acceptable because the widget is a single-page-singleton. When refactoring, treat these as the runtime state — re-renders must consume them.
- Review submission is modal-only. The legacy inline/page form was removed from `src/widget/reviews-section/`; all write CTAs open `review-form-modal/`.
- `review-modal.js` is the photo review detail lightbox, not the review submission wizard. Keep this distinction clear when changing modal behavior. See [[Product_Review_Lightbox]].
- Review/rating, filter, and UI chrome icons are split under `src/widget/icons/`. Import new code from [icons/index.js](src/widget/icons/index.js); [icons.js](src/widget/icons.js) remains only as a compatibility re-export. `tests/unit/widget-icon-sprite.test.ts` pins the registry to Phosphor 256-grid/currentColor SVGs and rejects old Lucide 24-grid or Unicode X/arrow glyphs.
- Review image rendering must go through `getTrustedReviewImages()` / `getFirstTrustedReviewImage()` in [helpers.js](src/widget/core/helpers.js). Do not add layout-local `https://` or `data:image` checks.
- Production listing discovery must go through [placement/capability.js](src/widget/placement/capability.js). The existing MutationObserver is only a debounced coordinator; it must not reintroduce whole-document link scans or generic `main`, class-substring, or text-match placement authority.
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
- [src/app/(preview)/preview/[widgetId]/[scene]/route.ts](src/app/(preview)/preview/[widgetId]/[scene]/route.ts)
- [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts) — temporary validated legacy redirect

## Obsidian Links
- [[Widget_Architecture]]
- [[Storefront_Widget_Overview]]
- [[Product_Review_Widget]]
- [[Product_Review_Lightbox]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
