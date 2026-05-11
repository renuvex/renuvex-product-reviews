---
type: widget
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-11
tags:
  - widget
  - architecture
related:
  - "[[Index]]"
  - "[[Storefront_Widget_Overview]]"
  - "[[Widget_Files_Map]]"
  - "[[ADR_0002_Widget_Injection_Strategy]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
---

# Widget Architecture

## Summary
A single esbuild-bundled IIFE (`public/widget.js`) loaded by every storefront page. It detects context (product page, listing page, preview iframe), fetches per-merchant settings, and renders summaries, listings, badges, the review submission modal, and the photo review detail lightbox. The bundle is intentionally framework-free.

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
| [src/widget/index.js](src/widget/index.js) | Entry. Branches preview vs prod. Wires events + observer. |
| [core/config.js](src/widget/core/config.js) | `PUBLIC_API_KEY` and `API_BASE` parsed from own `<script src>`. |
| [core/state.js](src/widget/core/state.js) | Module-level mutable state (current product, settings, reviews, paging, canonical lightbox review collection). |
| [core/fetch.js](src/widget/core/fetch.js) | API helpers calling `/api/public/*`. |
| [core/cache.js](src/widget/core/cache.js) | `sessionStorage` wrapper with in-memory fallback (private browsing / quota exceeded). Persists across same-tab navigations. |
| [core/helpers.js](src/widget/core/helpers.js) | Shared display helpers, including trusted review image URL filtering for storefront render paths. |
| [observer.js](src/widget/observer.js) | MutationObserver to re-bootstrap on SPA theme nav. |
| [events.js](src/widget/events.js) | Document-level click handlers (review CTA, modal triggers). |
| [product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js) | Decide whether current page is a product page; mount widget. |
| [product-widget/render.js](src/widget/product-widget/render.js) | Compose summary + reviews + modal CTA based on settings. |
| [product-widget/title-finder.js](src/widget/product-widget/title-finder.js) | Heuristic to find product title element across themes. |
| [product-widget/review-modal.js](src/widget/product-widget/review-modal.js) | Photo review detail lightbox. Distinct from the submission wizard. |
| [product-widget/review-form-modal/](src/widget/product-widget/review-form-modal/) | Multi-step submission wizard (steps + progress + state machine). |
| [listing-badges/](src/widget/listing-badges/) | Listing-page badge bootstrap, slug discovery, bulk fetch, injection. |
| [review-layouts/](src/widget/review-layouts/) | `card` / `gallery` / `list` review item layouts (registry in `index.js`). |
| [summary-layouts/](src/widget/summary-layouts/) | `classic` / `compact` / `hero` / `minimal` / `split` summary layouts. |
| [themes/ozy/](src/widget/themes/ozy/) | Theme-specific selectors and styles. Default. |

## Lifecycle

```
Storefront HTML loads <script async>
        │
        ▼
core/config.js    → PUBLIC_API_KEY, API_BASE
        │
        ▼
index.js
  ├── if preview: subscribe IKR_SETTINGS_UPDATE; bootstrap('mock-product')
  └── else: attachEvents → attachModalBadgeListener → startMutationObserver
        │
        ▼ (on relevant DOM change / load)
product-widget/bootstrap.js
  ├── detect productId via URL/meta/JSON-LD
  ├── fetch /api/public/settings  (cached)
  ├── fetch /api/public/reviews?storeId&productId
  ├── core/state.js ← write currentSettings, currentReviewsData, ...
  └── render.js (chooses layouts from settings)
```

## Layout-aware settings (key concept)

Each layout registers `supports: { title: true, photoStrip: false, ... }` in its layout `index.js`. Admin settings panel uses `showWhen: { layoutKey, supports }` in [widgetDefs.ts](src/components/home-page/widgets/widgetDefs.ts) to hide irrelevant fields. This means **adding a new setting often means deciding which layouts support it** — not editing settings rendering code.

## Preview mode protocol

```
admin iframe          widget.js (preview)
   │                       │
   │  window.postMessage   │
   ├── IKR_SETTINGS_UPDATE→│ merge into currentSettings → re-render
   │                       │
   │ ←── IKR_WIDGET_READY ─│ once mounted
```

Preview iframe HTML lives at [src/app/(preview)/preview/route.ts](src/app/(preview)/preview/route.ts). It loads `widget.js?publicApiKey=preview&v=<timestamp>` (timestamp busts cache so admin sees fresh code on each open).

## Caching strategy
- `/api/public/settings` and `/api/public/reviews` set `Cache-Control: s-maxage=60, stale-while-revalidate=300` (Vercel CDN).
- Widget side: `sessionStorage` (with in-memory fallback) cache in `core/cache.js` — survives same-tab navigation.
- Review fetch failures use stale cached review data when available; without stale data, `fetchReviews()` returns an explicit error result so `render.js` can show a retryable error state instead of an empty list.
- No localStorage caching today (could be added for repeat visits).

## Build
- [scripts/build-widget.mjs](scripts/build-widget.mjs) drives esbuild.
- Format: IIFE, ES2017, minified in prod, banner with build timestamp.
- Validation: post-build `node --check` syntax test before saving output.

## Notes
- The widget is the **highest-leverage code surface** in the codebase (every storefront load executes it). Bundle size and TTI matter.
- Don't introduce a framework (React, Preact, Lit) without an explicit ADR. The vanilla approach is a deliberate trade-off — see [[ADR_0002_Widget_Injection_Strategy]].
- DOM identification (product id, slug, title) uses heuristics — themes vary. When fixing a "widget doesn't show on theme X" issue, the heuristics in `bootstrap.js` and `title-finder.js` are the usual culprits.
- The widget assumes a single product per page on PDP. Multi-product pages (looks/sets) would need a redesign.
- Review submission has a single runtime path: all write CTAs open the multi-step modal. The legacy inline/page form path was removed to reduce storefront bundle complexity.
- The photo review detail lightbox has its own runtime path and risk profile; see [[Product_Review_Lightbox]] and [[Bug_Review_Detail_Lightbox_Risks]] before changing image navigation, body scroll locking, focus management, or history behavior. Card/list/gallery navigation is scoped to the active sort/filter state's loaded review collection; the lightbox does not fetch unloaded pages by itself.
- Review image rendering depends on `imagePolicy.cloudName` from `/api/public/settings`; layout code should use `getTrustedReviewImages()` instead of local URL prefix checks. See [[ADR_0006_Trusted_Review_Image_URL_Policy]].

## Related Source Files
- [src/widget/](src/widget/)
- [public/widget.js](public/widget.js) (built)
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
- [[Ikas_Widget_Injection_Notes]]

## Change Log
- 2026-05-11: Documented lightbox focus management as part of the widget runtime risk profile after adding modal dialog semantics and focus trapping. Related bug: [[Bug_Lightbox_Focus_Trap_Accessibility]].
- 2026-05-11: Documented the review fetch error-state contract: stale data is preferred, otherwise the widget renders a retryable error state instead of an empty review list. Related bug: [[Bug_Review_Fetch_Error_Empty_State]].
- 2026-05-11: Documented `loadedLightboxReviews` as widget runtime state for card/list/gallery lightbox navigation across all currently loaded reviews. Related note: [[Product_Review_Lightbox]].
- 2026-05-10: Documented trusted review image URL filtering as part of widget runtime architecture. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-05: Updated the widget architecture note after removing the legacy inline/page review form. Review submission is now modal-only.
- 2026-05-06: Removed `primaryColor`/`primaryTextColor` from the widget runtime (they were not in the admin schema and only created confusion). `styles.js` double-var fallback chains rely on `--ikr-text`/`--ikr-bg` as fixed fallbacks; these vars are kept in `render.js` with hardcoded defaults so the CSS chains stay intact. An initial attempt to flatten the chains to single-layer broke 32 CSS fallback expressions due to a shell-escape bug in the replacement script; reverted to original `styles.js` and restored the legacy vars as fixed fallbacks instead. Related source: [render.js](src/widget/product-widget/render.js), [styles.js](src/widget/themes/ozy/styles.js).
- 2026-05-10: Documented the photo review detail lightbox as a separate widget runtime path and linked its open audit risks. Related source: [review-modal.js](src/widget/product-widget/review-modal.js), related note: [[Product_Review_Lightbox]].
