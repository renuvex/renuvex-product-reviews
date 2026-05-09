---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
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
Storefront widget source under `src/widget/*`. Plain JavaScript (.js), bundled by esbuild into a single IIFE at [public/widget.js](public/widget.js). Modular: a `core/` runtime, a `product-widget/` for product detail pages, `listing-badges/` for collection pages, swappable `review-layouts/` and `summary-layouts/`, and `themes/` for theme-specific selectors/styles.

## Tree

```
src/widget/
├─ index.js                       # 🟢 Entry. Detects preview vs prod; attaches observer/events.
├─ events.js                      # Document-level click/scroll wiring
├─ icons.js                       # SVG icon registry; also imported by widgetDefs.ts (admin)
├─ observer.js                    # MutationObserver — re-bootstraps widget on SPA-style theme nav
│
├─ core/
│  ├─ config.js                   # PUBLIC_API_KEY + API_BASE from <script src=...> (SSR-safe)
│  ├─ state.js                    # Module-level mutable state (currentSettings, currentProductId, ...)
│  ├─ fetch.js                    # API helpers (calls /api/public/*)
│  ├─ cache.js                    # sessionStorage wrapper with in-memory fallback (cacheGet/cacheSet)
│  ├─ helpers.js                  # Misc utilities
│  └─ badge.js                    # Generic badge primitive
│
├─ product-widget/
│  ├─ bootstrap.js                # Mount widget into product detail anchor
│  ├─ render.js                   # Top-level render orchestrator (summary + list + modal CTA)
│  ├─ rating-badge.js             # Star+count badge above product title
│  ├─ title-finder.js             # Heuristic to locate product title in any theme
│  ├─ review-modal.js             # Open the multi-step review modal
│  └─ review-form-modal/
│     ├─ index.js                 # Modal entry
│     ├─ modal-shell.js           # Modal chrome (overlay, close, focus trap, toast)
│     ├─ progress-bar.js          # Step indicator (form-step bar; recently themed)
│     ├─ wizard-state.js          # Step state machine
│     ├─ styles.js                # Inline CSS for modal + toast animations
│     └─ steps/                   # Individual wizard steps
│
├─ listing-badges/
│  ├─ index.js                    # Bootstrap (find product cards on listing pages)
│  ├─ collect.js                  # Discover candidate cards (theme-agnostic heuristics)
│  ├─ ratings.js                  # Bulk fetch via /api/public/ratings-by-slug
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
   └─ ozy/
      ├─ theme.js                 # Theme-specific selectors / hooks
      └─ styles.js                # Theme-specific styles
```

## Key concepts

### Bootstrap path
`index.js` → `attachEvents` + `attachModalBadgeListener` + `startMutationObserver` → on relevant DOM event, the observer calls `bootstrap()` which detects current product, fetches reviews, calls `render()`.

### Preview mode
`index.js` checks `window.__ikasPreviewMode === true`. In preview:
- Listens for `IKR_SETTINGS_UPDATE` postMessage
- Posts back `IKR_WIDGET_READY` once mounted
- Bootstraps with `'mock-product'` and a fixture product name

### Layout-aware settings (important)
- `summary-layouts/index.js` and `review-layouts/index.js` each export a registry where every layout declares `supports: { title: true, photoStrip: false, ... }`.
- Admin settings panel ([widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts)) uses `showWhen: { layoutKey: 'summaryLayout', supports: 'title' }` to read those flags.
- ⚠️ When you add a new layout, declare `supports` keys for everything any setting could check. Otherwise admin shows fields that have no effect.

### Theme variant
`scripts/build-widget.mjs` aliases `themes/ozy/listing-selector.js` and `themes/ozy/styles.js` to a different theme folder when `--theme=new-theme`. Output: `widget-new-theme.js`. **The `themes/new-theme/` directory does not exist on disk** — only `themes/ozy/` is present. So `pnpm build:widget --theme=new-theme` would currently fail. The starter scaffold expects the user to add `themes/new-theme/` as a sibling. Source code imports directly from `../themes/ozy/...` (verified: `render.js` and `listing-badges/inject.js`). How runtime selects between `widget.js` and `widget-new-theme.js` is also unclear — see [[Open_Questions]].

## What lives in `public/`
- [public/widget.js](public/widget.js) — built bundle (committed). Don't hand-edit.
- [public/ikr-test.js](public/ikr-test.js) — small local test harness for the widget.
- [public/logo.svg](public/logo.svg)

## Notes
- `core/state.js` holds module-level mutable state (`currentSettings`, `currentProductId`, `currentReviewsData`, ...). Acceptable because the widget is a single-page-singleton. When refactoring, treat these as the runtime state — re-renders must consume them.
- Review submission is modal-only. The legacy inline/page form was removed from `src/widget/product-widget/`; all write CTAs open `review-form-modal/`.
- Always test changes both in `/preview` AND on a real ikas storefront — preview mode skips the mutation observer and theme integrations.
- The widget is **plain JS**. No TS, no React. Don't introduce a framework without rationale (bundle size + cold-start hit).

## Related Source Files
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts)

## Obsidian Links
- [[Widget_Architecture]]
- [[Storefront_Widget_Overview]]
- [[Product_Review_Widget]]
- [[Listing_Rating_Widget]]
- [[Widget_Customization]]
- [[ADR_0002_Widget_Injection_Strategy]]

## Change Log
- 2026-05-05: Removed the legacy inline/page review form from the widget source map. Review submission is now modal-only via [review-form-modal/](src/widget/product-widget/review-form-modal/). Related source: [render.js](src/widget/product-widget/render.js), [write-action.js](src/widget/summary-layouts/shared/write-action.js).
