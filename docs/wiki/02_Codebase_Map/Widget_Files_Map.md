---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-18
last_verified: 2026-05-18
confidence: high
source_files:
  - "scripts/build-widget.mjs"
  - "src/widget/classic-loader.js"
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/settings.js"
  - "src/widget/core/link-scope.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/dom.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/listing-badges/ratings.js"
  - "src/widget/themes/ozy/adapter.js"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
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
Storefront widget source under `src/widget/*`. Plain JavaScript (.js), built by esbuild as a classic compatibility loader at [public/widget.js](public/widget.js) plus an ESM runtime/chunks under [public/widget-runtime/](public/widget-runtime/). Modular: a `core/` runtime, lazy-loaded `product-widget/` and `listing-badges/` surfaces, swappable `review-layouts` and `summary-layouts`, and `themes/` for theme-specific fallback selectors/styles.

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
│  ├─ config.js                   # PUBLIC_API_KEY + API_BASE from <script src=...> (SSR-safe)
│  ├─ storefront-context.js       # Single Storefront Events owner.
│  ├─ registry.js                 # Surface registry; supports async lazy mounts.
│  ├─ lazy-modules.js             # Dynamic import boundaries for widget modules.
│  ├─ settings.js                 # Shared public settings fetch/cache.
│  ├─ link-scope.js              # Shared scoped link discovery for listing DOM fallbacks.
│  ├─ state.js                    # Module-level mutable state (currentSettings, currentProductId, ...)
│  ├─ fetch.js                    # API helpers (calls /api/public/*)
│  ├─ cache.js                    # sessionStorage wrapper with in-memory fallback (cacheGet/cacheSet)
│  ├─ helpers.js                  # Misc utilities + trusted review image URL helpers
│  └─ badge.js                    # Generic badge primitive
│
├─ product-widget/
│  ├─ bootstrap.js                # Mount widget into product detail anchor
│  ├─ render.js                   # Top-level render orchestrator (summary + list + modal CTA)
│  ├─ rating-badge.js             # Star+count badge above product title
│  ├─ title-finder.js             # Heuristic to locate product title in any theme
│  ├─ review-modal.js             # Photo review detail lightbox
│  └─ review-form-modal/
│     ├─ index.js                 # Modal entry
│     ├─ modal-shell.js           # Modal chrome (overlay, close, focus trap, toast)
│     ├─ progress-bar.js          # Step indicator + footer buttons (Skip/Continue/Next). Button role switches based on step validity and pending upload state.
│     ├─ wizard-state.js          # Step state machine
│     ├─ styles.js                # Inline CSS for modal + toast animations
│     └─ steps/                   # Individual wizard steps
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
│  ├─ card/                       # ★ default
│  ├─ gallery/                    # photo-first
│  └─ list/
│     ├─ index.js
│     └─ styles.js
│
├─ summary-layouts/
│  ├─ index.js                    # Layout registry + meta (used by `layoutKey + supports`)
│  ├─ shared/                     # Common summary primitives (rating bar chart, etc.)
│  ├─ classic/
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
      └─ styles.js                # Theme-specific styles
```

## Key concepts

### Bootstrap path
`classic-loader.js` -> `public/widget.js` -> dynamic import of `widget-runtime/runtime.js`. The runtime initializes base styles/error reporting, then `loader.js` registers lightweight surfaces, subscribes to Storefront Events through `core/storefront-context.js`, and lazy-loads modules through `core/lazy-modules.js`.

### Preview mode
`index.js` checks `window.__ikasPreviewMode === true`. In preview:
- Listens for `RENUVEX_PR_SETTINGS_UPDATE` postMessage and accepts legacy `IKR_SETTINGS_UPDATE`
- Posts back `RENUVEX_PR_WIDGET_READY` and legacy `IKR_WIDGET_READY` once mounted
- Bootstraps with `'mock-product'` and a fixture product name

### Layout-aware settings (important)
- `summary-layouts/index.js` and `review-layouts/index.js` each export a registry where every layout declares `supports: { title: true, photoStrip: false, ... }`.
- Admin settings panel ([widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts)) uses `showWhen: { layoutKey: 'summaryLayout', supports: 'title' }` to read those flags.
- ⚠️ When you add a new layout, declare `supports` keys for everything any setting could check. Otherwise admin shows fields that have no effect.

### Theme variant
`scripts/build-widget.mjs` aliases `themes/ozy/styles.js` to a different theme folder when `--theme=new-theme`. Output: `widget-new-theme.js`. **The `themes/new-theme/` directory does not exist on disk** — only `themes/ozy/` is present. So `pnpm build:widget --theme=new-theme` would currently fail. The starter scaffold expects the user to add `themes/new-theme/` as a sibling. Source code imports directly from `../themes/ozy/...` (verified: `render.js` and `listing-badges/inject.js`). How runtime selects between `widget.js` and `widget-new-theme.js` is also unclear — see [[Open_Questions]].

## What lives in `public/`
- [public/widget.js](public/widget.js) — built classic loader (committed). Don't hand-edit.
- [public/widget-runtime/runtime.js](public/widget-runtime/runtime.js) — built ESM runtime entry. Don't hand-edit.
- [public/widget-runtime/chunks/](public/widget-runtime/chunks/) — built lazy chunks. Don't hand-edit.
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json) — build output report including bytes and import kinds.
- [public/renuvex-pr-test.js](public/renuvex-pr-test.js) — small local test harness for the widget.
- [public/logo.svg](public/logo.svg)

## Notes
- `core/state.js` holds module-level mutable state (`currentSettings`, `currentProductId`, `currentReviewsData`, ...). Acceptable because the widget is a single-page-singleton. When refactoring, treat these as the runtime state — re-renders must consume them.
- Review submission is modal-only. The legacy inline/page form was removed from `src/widget/product-widget/`; all write CTAs open `review-form-modal/`.
- `review-modal.js` is the photo review detail lightbox, not the review submission wizard. Keep this distinction clear when changing modal behavior. See [[Product_Review_Lightbox]].
- Review/rating and filter icons are split under `src/widget/icons/`. Import new code from [icons/index.js](src/widget/icons/index.js); [icons.js](src/widget/icons.js) remains only as a compatibility re-export.
- Review image rendering must go through `getTrustedReviewImages()` / `getFirstTrustedReviewImage()` in [helpers.js](src/widget/core/helpers.js). Do not add layout-local `https://` or `data:image` checks.
- Listing DOM discovery shared by listing badges and the MutationObserver must go through [link-scope.js](src/widget/core/link-scope.js); do not reintroduce whole-document `document.querySelectorAll('a[href]')` scans.
- Always test changes both in `/preview` AND on a real ikas storefront — preview mode skips the mutation observer and theme integrations.
- The widget is **plain JS**. No TS, no React. Don't introduce a framework without rationale (bundle size + cold-start hit).

## Related Source Files
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js)
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
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
- 2026-05-24: Added [icons/star-sprite.js](src/widget/icons/star-sprite.js) — read-only rating stars render via a single injected SVG `<symbol>` sprite referenced by `<use>` instead of inlining `<path>` per star. Renderers (`partialStarsHTML`, `starsHTML`, `renderStarRow`) call `ensureStarSprite` + emit `starUseSvg`; `ICONS` strings stay the single source (admin preview + sprite both derive from them). Related: [[ADR_0019_Icon_Sprite_Rendering]].
- 2026-05-18: Added [core/link-scope.js](src/widget/core/link-scope.js) so listing badges and the MutationObserver share scoped link discovery; active builds no longer use whole-document `document.querySelectorAll('a[href]')` for listing re-render checks.
- 2026-05-17: Listing badge files now use canonical ikas product ids from Storefront Events for rating fetches; slug remains DOM fallback only. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Phase 2 module split implemented and verified. `public/widget.js` is the classic loader, `public/widget-runtime/*` contains ESM runtime/chunks, and lazy boundaries live in `core/lazy-modules.js`.
- 2026-05-12: Split the storefront icon registry into [review-icons.js](src/widget/icons/review-icons.js), [filter-icons.js](src/widget/icons/filter-icons.js), and [icons/index.js](src/widget/icons/index.js). [icons.js](src/widget/icons.js) now remains as a compatibility re-export.
- 2026-05-10: Documented the trusted review image helpers in [helpers.js](src/widget/core/helpers.js). Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-05: Removed the legacy inline/page review form from the widget source map. Review submission is now modal-only via [review-form-modal/](src/widget/product-widget/review-form-modal/). Related source: [render.js](src/widget/product-widget/render.js), [write-action.js](src/widget/summary-layouts/shared/write-action.js).
- 2026-05-10: Corrected `review-modal.js` from "multi-step review modal" to photo review detail lightbox and linked [[Product_Review_Lightbox]]. Related source: [review-modal.js](src/widget/product-widget/review-modal.js).
