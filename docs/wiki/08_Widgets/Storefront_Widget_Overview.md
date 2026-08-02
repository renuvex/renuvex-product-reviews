---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-08-02
last_verified: 2026-08-02
confidence: high
tags:
  - widget
  - storefront
related:
  - "[[Index]]"
  - "[[Widget_Architecture]]"
  - "[[Widget_Files_Map]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Open_Questions]]"
  - "[[Roadmap]]"
source_files:
  - "scripts/build-widget.mjs"
  - "scripts/prepare-widget-worker-assets.mjs"
  - "wrangler.widget.jsonc"
  - "src/widget/classic-loader.js"
  - "src/widget/core/origins.js"
  - "src/widget/core/settings.js"
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/lazy-modules.js"
  - "workers/widget-delivery/src/index.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/storefront-theme/lazy-sync/route.ts"
  - "src/widget/rating-badge/index.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/review-form-modal/copy.js"
  - "src/widget/listing-badges/index.js"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
  - "src/lib/widgets/catalog.ts"
  - "src/app/(preview)/preview/[widgetId]/[scene]/route.ts"
---

# Storefront Widget Overview

## Summary
A single ikas-injected `widget.js` URL that runs on every storefront page. As of Phase 2 implementation work on 2026-05-17, `public/widget.js` is a small classic compatibility loader and the actual runtime/modules live under `public/widget-runtime/*` as ESM chunks. As of the 2026-06-28 Cloudflare Worker cutover, the widget has a split-origin contract: `STOREFRONT_WIDGET_BASE_URL` is the script/static-asset origin, `STOREFRONT_WIDGET_API_BASE_URL` is the backend/API origin embedded into the widget build, and optional `STOREFRONT_WIDGET_READ_API_BASE_URL` is the cacheable settings/ratings/reviews read origin for Worker V2. The deployed pre-Phase-2 widget measured `177763` bytes during the 2026-05-15 audit. The runtime detects context and renders product review block (PDP), rating badge near the title, or listing/search rating badges. The PDP review block also includes a separate photo/video review detail lightbox. All other widget concepts (carousel/popup/Q&A) are partially scaffolded or unverified; see [[Open_Questions]].

## Where the widget runs
- **Product detail pages** — independent PDP rating badge near title plus optional explicit-mount review block with summary, list, media gallery, photo/video detail lightbox, and "Write a Review" CTA.
- **Collection / search / listing pages** — small star+count badges injected next to product titles in cards.
- **Preview iframe** (`/preview/<widgetId>/<scene>`) — build-time fixture plus production
  renderer modules against deterministic fixture markup/data, with
  `window.__ikasPreviewMode = true`.

## Six catalog widget IDs
| id | Status | Description |
|---|---|---|
| `reviews` | available + configurable | The PDP review block (summary + list + form) |
| `badge` | available + configurable | Rating badge near product title |
| `carousel` | planned | Catalog-visible only; no settings/read/write surface |
| `popup` | planned | Catalog-visible only; no settings/read/write surface |
| `qa` | planned | Catalog-visible only; no settings/read/write surface |
| `summary` | planned | Separate widget product is not shipped; summary layouts remain internal to `reviews` |

## What's customizable
Per-widget settings live in `WidgetSettings(storeId, widgetId).settings: Json`. Schema source of truth: [src/lib/widgets/catalog.ts](src/lib/widgets/catalog.ts). Categories include layout choice (summary / review), color tokens (basic + advanced tier), titles, icon choices, sizing ranges, toggles for sections such as the media gallery.

`GET /api/public/settings` queries only the available + configurable catalog
allowlist (currently `reviews` and `badge`) and applies a second response guard.
Legacy planned or unknown DB rows are retained but cannot reach storefront
configuration. Release availability, merchant `enabled`, and future plan or
tenant entitlement are separate concepts.

Settings UI in admin: [src/features/widget-management/components/editor/SettingsPanel.tsx](src/features/widget-management/components/editor/SettingsPanel.tsx).

## Language And Localization Boundary
The storefront widget is Turkish-first today. There is no runtime i18n layer, no locale resolver, and no `{ locale -> strings }` catalog. A small set of visible review-form labels is merchant-editable through widget settings, but most visible strings, dates (`tr-TR`), number formatting, and accessibility names are still hardcoded in the widget source.

Future English, German, or other-language support must be implemented as a real localization layer, not as ad-hoc copy changes. The expected migration is:
- define a string catalog such as `tr`, `en`, `de`;
- choose a language source, preferably ikas storefront locale or a merchant setting tied to per-storefront settings;
- migrate visible strings and accessibility strings together;
- prefer sr-only text plus `aria-labelledby` for accessible names that should survive browser translation, and only use `aria-label` when it is also localized.

Detailed scope and source evidence live in [[Open_Questions]] under "Widget i18n / accessibility-string localization" and in [[Roadmap]] under "Multi-language widget UI".

## Render lifecycle
See [[Widget_Architecture]] for full details. Key points:
- `public/widget.js` classic loader imports `public/widget-runtime/runtime.js`; PDP badge, review section, and listing modules are lazy chunks.
- Asset imports stay on the script origin (`https://widget.renuvex.app`). Upload, submit, metrics, video, widget-error, and theme lazy-sync calls use the explicit API origin (`https://app.renuvex.app`) when `STOREFRONT_WIDGET_API_BASE_URL` is set; unset falls back to script origin for rollback/local compatibility. Settings, ratings, and reviews list reads use `STOREFRONT_WIDGET_READ_API_BASE_URL` when set; after Worker V2 cutover the build also falls back to `STOREFRONT_WIDGET_BASE_URL`, and only then to the API origin.
- MutationObserver re-bootstraps on SPA-style theme nav.
- Layout-aware settings via `supports` declarations on each layout — admin hides irrelevant fields.
- Real-time preview through the versioned, exact-same-origin scene protocol.
  The implemented scene registry covers Reviews plus Badge PDP/listing and
  carries the complete resolved settings map.

## Cloudflare Worker Delivery Target
Cloudflare Worker Static Assets is the live delivery layer for `widget.renuvex.app`. V1 is asset-only:
- allowed: `/widget.js`, `/widget-runtime/runtime.js`, `/widget-runtime/runtime-*.js`, `/widget-runtime/chunks/*.js`, `/widget-runtime/build-manifest.json`, `/__health`;
- denied: `/api/*` and every other path, returning fail-closed `404`;
- no secrets, DB, Mux, QStash, image-provider, or R2 bindings.

V2 source supports an allowlisted read-through cache for `GET /api/public/settings`, `GET /api/public/ratings`, `GET /api/public/ratings-by-slug`, and `GET /api/public/reviews`. `GET /api/public/settings` is safe to cache only because theme sync moved to `POST /api/public/storefront-theme/lazy-sync` on the backend/control-plane origin. Every write/upload/video/widget-error/lazy-sync route stays on `app.renuvex.app`. The Worker remains fail-closed for non-allowlisted `/api/*` paths.

The prepared asset directory is generated by [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs), which copies current manifest outputs plus retained committed runtime hashes. Do not deploy the full `public/` tree.

## Notes
- The widget assumes one product per page on PDP. Multi-product layouts (looks/sets) need a redesign.
- Bundle size is the most-watched performance metric. Adding heavy features means measure first.
- Don't introduce a framework without an ADR.
- Future Yotpo-style expansion should follow the current one-loader plus lazy-module direction, not static imports into the always-loaded runtime. See [[Yotpo_Style_Widget_Modular_Architecture]].

## Related Source Files
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js)
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json)
- [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs)
- [workers/widget-delivery/src/index.ts](workers/widget-delivery/src/index.ts)
- [wrangler.widget.jsonc](wrangler.widget.jsonc)
- [src/lib/widgets/catalog.ts](src/lib/widgets/catalog.ts)

## Obsidian Links
- [[Widget_Architecture]]
- [[Widget_Files_Map]]
- [[Product_Review_Widget]]
- [[Product_Review_Lightbox]]
- [[Product_Rating_Badge]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[Widget_Performance]]
- [[Structured_Data_And_Rich_Snippets]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Open_Questions]]
- [[Roadmap]]

## Change Log
- 2026-07-01: Settings reads joined the read-origin contract after theme sync was split out. `GET /api/public/settings` returns `runtime.themeSyncDue`; the widget sends any lazy theme sync as a non-blocking POST to the backend API origin.
- 2026-06-28: Added the Cloudflare Worker V2 public-read cache source contract. `widget.renuvex.app` remains the static widget origin and can become the selected ratings/reviews read origin after Worker/env cutover; `app.renuvex.app` remains backend/API/upload/write origin.
- 2026-06-21: Documented the Turkish-first localization boundary. The current widget has no i18n layer; future English/German support requires a string catalog, locale source, and accessibility-string migration.
- 2026-05-24/25: Updated widget identity notes for ADR_0020. Renuvex Product Reviews is the active namespace; legacy preview-message aliases were removed during the contract cleanup.
- 2026-05-17: Phase 3 source hardening implemented: non-destructive script lifecycle, daily maintenance reconcile, hashed runtime entry with stable shim, and hidden-link listing badge filter. Post-deploy verification/transfer-size measurement remains.
- 2026-05-17: Phase 2 module split implemented and verified: `public/widget.js` stays as the ikas-compatible loader URL, while `public/widget-runtime/*` carries ESM runtime/chunks. Dev-store/Sentry verification passed.
- 2026-05-15: Updated deployed bundle size observation and linked the modular loader target architecture from the Yotpo/Protein Ocean research pass.
- 2026-05-10: Documented the PDP photo review detail lightbox as a separate storefront widget surface. Related note: [[Product_Review_Lightbox]], related bug: [[Bug_Review_Detail_Lightbox_Risks]].
