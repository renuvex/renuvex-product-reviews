---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-15
last_verified: 2026-05-15
confidence: high
tags:
  - widget
  - storefront
related:
  - "[[Index]]"
  - "[[Widget_Architecture]]"
  - "[[Widget_Files_Map]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
source_files:
  - "src/widget/index.js"
  - "src/widget/product-widget/bootstrap.js"
  - "src/widget/listing-badges/index.js"
  - "public/widget.js"
  - "src/components/home-page/widgets/widgetDefs.ts"
---

# Storefront Widget Overview

## Summary
A single bundled `widget.js` that runs on every storefront page. The deployed widget measured `177763` bytes during the 2026-05-15 audit. It detects context and renders one of three things: product review block (PDP), rating badge near the title, or listing-page rating badges. The PDP review block also includes a separate photo review detail lightbox. All other widget concepts (carousel/popup/Q&A) are partially scaffolded or unverified; see [[Open_Questions]].

## Where the widget runs
- **Product detail pages** — full review block with summary, list, photo strip, photo detail lightbox, "Write a Review" CTA, and inline rating badge near title.
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
Per-widget settings live in `WidgetSettings(storeId, widgetId).settings: Json`. Schema source of truth: [src/components/home-page/widgets/widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts). Categories include layout choice (summary / review), color tokens (basic + advanced tier), titles, icon choices, sizing ranges, toggles for sections (photo strip, etc.).

Settings UI in admin: [src/components/home-page/widgets/editor/SettingsPanel.tsx](src/components/home-page/widgets/editor/SettingsPanel.tsx).

## Render lifecycle
See [[Widget_Architecture]] for full details. Key points:
- Single esbuild IIFE, runs at `DOMContentLoaded`.
- MutationObserver re-bootstraps on SPA-style theme nav.
- Layout-aware settings via `supports` declarations on each layout — admin hides irrelevant fields.
- Real-time preview via `IKR_SETTINGS_UPDATE` postMessage.

## Notes
- The widget assumes one product per page on PDP. Multi-product layouts (looks/sets) need a redesign.
- Bundle size is the most-watched performance metric. Adding heavy features means measure first.
- Don't introduce a framework without an ADR.
- Future Yotpo-style expansion should move toward one loader plus lazy modules, not a larger single `widget.js`. See [[Yotpo_Style_Widget_Modular_Architecture]].

## Related Source Files
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js)
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

## Change Log
- 2026-05-15: Updated deployed bundle size observation and linked the modular loader target architecture from the Yotpo/Protein Ocean research pass.
- 2026-05-10: Documented the PDP photo review detail lightbox as a separate storefront widget surface. Related note: [[Product_Review_Lightbox]], related bug: [[Bug_Review_Detail_Lightbox_Risks]].
