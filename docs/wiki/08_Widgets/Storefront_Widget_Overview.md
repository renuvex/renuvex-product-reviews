---
type: widget
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-28
last_verified: 2026-06-28
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
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/lazy-modules.js"
  - "workers/widget-delivery/src/index.ts"
  - "src/widget/rating-badge/index.js"
  - "src/widget/reviews-section/bootstrap.js"
  - "src/widget/reviews-section/review-form-modal/copy.js"
  - "src/widget/listing-badges/index.js"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
  - "src/components/home-page/widgets/widgetDefs.ts"
---

# Storefront Widget Overview

## Summary
A single ikas-injected `widget.js` URL that runs on every storefront page. As of Phase 2 implementation work on 2026-05-17, `public/widget.js` is a small classic compatibility loader and the actual runtime/modules live under `public/widget-runtime/*` as ESM chunks. As of the 2026-06-28 Cloudflare Worker delivery preparation, the widget has a split-origin contract: `STOREFRONT_WIDGET_BASE_URL` is the script/static-asset origin and `STOREFRONT_WIDGET_API_BASE_URL` is the backend/API origin embedded into the widget build. The deployed pre-Phase-2 widget measured `177763` bytes during the 2026-05-15 audit. The runtime detects context and renders product review block (PDP), rating badge near the title, or listing/search rating badges. The PDP review block also includes a separate photo/video review detail lightbox. All other widget concepts (carousel/popup/Q&A) are partially scaffolded or unverified; see [[Open_Questions]].

## Where the widget runs
- **Product detail pages** — independent PDP rating badge near title plus optional explicit-mount review block with summary, list, media gallery, photo/video detail lightbox, and "Write a Review" CTA.
- **Collection / search / listing pages** — small star+count badges injected next to product titles in cards.
- **Preview iframe** (`/preview`) — same code, with `window.__ikasPreviewMode = true`.

## Six widget ids (from `widgetDefs.ts`)
| id | Status | Description |
|---|---|---|
| `reviews` | ✅ shipped | The PDP review block (summary + list + form) |
| `badge` | ✅ shipped | Rating badge near product title |
| `summary` | ✅ shipped | Summary-only layouts (subset) |
| `carousel` | ❓ unverified | Registered but implementation depth unknown |
| `popup` | ❓ unverified | Registered but implementation depth unknown |
| `qa` | ❓ unverified | Registered but flow undefined ([[Open_Questions]]) |

## What's customizable
Per-widget settings live in `WidgetSettings(storeId, widgetId).settings: Json`. Schema source of truth: [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts). Categories include layout choice (summary / review), color tokens (basic + advanced tier), titles, icon choices, sizing ranges, toggles for sections such as the media gallery.

Settings UI in admin: [src/components/home-page/widgets/editor/SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx).

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
- Asset imports stay on the script origin (`https://widget.renuvex.app`). Public API, upload, submit, metrics, and widget-error calls use the explicit API origin (`https://app.renuvex.app`) when `STOREFRONT_WIDGET_API_BASE_URL` is set; unset falls back to script origin for rollback/local compatibility.
- MutationObserver re-bootstraps on SPA-style theme nav.
- Layout-aware settings via `supports` declarations on each layout — admin hides irrelevant fields.
- Real-time preview via `RENUVEX_PR_SETTINGS_UPDATE` postMessage.

## Cloudflare Worker Delivery Target
Cloudflare Worker Static Assets is the planned delivery layer for `widget.renuvex.app`. The Worker is intentionally asset-only in v1:
- allowed: `/widget.js`, `/widget-runtime/runtime.js`, `/widget-runtime/runtime-*.js`, `/widget-runtime/chunks/*.js`, `/widget-runtime/build-manifest.json`, `/__health`;
- denied: `/api/*` and every other path, returning fail-closed `404`;
- no secrets, DB, Mux, QStash, Cloudinary, or R2 bindings.

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
- [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts)

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
- 2026-06-28: Added the Cloudflare Worker asset-delivery target and split-origin contract. `widget.renuvex.app` is the static widget origin, while `app.renuvex.app` remains the backend/API/upload origin.
- 2026-06-21: Documented the Turkish-first localization boundary. The current widget has no i18n layer; future English/German support requires a string catalog, locale source, and accessibility-string migration.
- 2026-05-24/25: Updated widget identity notes for ADR_0020. Renuvex Product Reviews is the active namespace; legacy preview-message aliases were removed during the contract cleanup.
- 2026-05-17: Phase 3 source hardening implemented: non-destructive script lifecycle, daily maintenance reconcile, hashed runtime entry with stable shim, and hidden-link listing badge filter. Post-deploy verification/transfer-size measurement remains.
- 2026-05-17: Phase 2 module split implemented and verified: `public/widget.js` stays as the ikas-compatible loader URL, while `public/widget-runtime/*` carries ESM runtime/chunks. Dev-store/Sentry verification passed.
- 2026-05-15: Updated deployed bundle size observation and linked the modular loader target architecture from the Yotpo/Protein Ocean research pass.
- 2026-05-10: Documented the PDP photo review detail lightbox as a separate storefront widget surface. Related note: [[Product_Review_Lightbox]], related bug: [[Bug_Review_Detail_Lightbox_Risks]].
