---
type: decision
project: ikas-review-app
status: active
created: 2026-05-16
updated: 2026-05-16
last_verified: 2026-05-16
confidence: high
tags:
  - adr
  - widget
  - loader
  - storefront-events
related:
  - "[[Decision_Index]]"
  - "[[Widget_Architecture]]"
  - "[[Yotpo_Style_Widget_Modular_Architecture]]"
  - "[[Ikas_Storefront_Events]]"
  - "[[ADR_0002_Widget_Injection_Strategy]]"
source_files:
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/registry.js"
  - "src/widget/surfaces/index.js"
  - "src/widget/events.js"
---

# ADR_0013 — Modular Widget Loader Architecture

## Status
Accepted

## Date
2026-05-16

## Context
The storefront widget ships as a single esbuild IIFE bundle (`public/widget.js`, ~177KB) built
from `src/widget/index.js`. Every storefront surface — PDP review block, product-title rating
badge, listing-page badges, review submission modal, photo lightbox, preview mode — lives in
that one bundle.

Two problems motivate a change:

1. **Event/context handling is scattered.** ikas `IkasEvents` subscription, SPA history
   patching, and product/page detection are spread across `events.js`, `bootstrap.js`, and
   `observer.js`, with heuristic polling chains (`IkasEvents`-not-ready poll, `__NEXT_DATA__`
   poll) as fallbacks. There is no single owner of "what page / what product".
2. **The bundle has no internal seams.** Adding future surfaces (Q&A, carousel, richer media)
   to the same eagerly-evaluated bundle makes every storefront page pay for code it may not use.

A direct ikas developer answer (2026-05-16, recorded in [[Ikas_Storefront_Script_Capabilities]])
established the durable direction: **Storefront Events is the official, supported mechanism for
page/product context.** ikas does not expose stable `data-*` attributes for page areas today
(planned via ikas Studio, not broadly available). The permanent architecture must therefore make
Storefront Events the primary context source, with DOM/theme heuristics as fallback only.

This ADR covers **Phase 1** of that architecture: an internal structural refactor. It does not
change the bundle's physical shape.

## Decision
Restructure the widget runtime into three internal layers, while keeping the build output as a
**single IIFE `public/widget.js`**:

1. **Storefront Events context layer** (`src/widget/core/storefront-context.js`) — the single
   owner of `window.IkasEvents.subscribe(...)`, the not-ready polling fallback, and page/product
   context. Exposes `onProductView`, `onPageView`, `getProductContext()`, `getCurrentContext()`.
   Event-type string constants live in one frozen object so a future correction is a one-line
   change.
2. **Surface registry** (`src/widget/core/registry.js`) — an in-bundle registry of widget
   surfaces described by `{ key, detect, mount, unmount? }`.
3. **Loader** (`src/widget/loader.js`) — thin orchestration: init config → init context →
   route context events to the registry. `src/widget/index.js` becomes a thin entry that wires
   side-effect imports and branches preview vs. production.

The Phase 1 registry contains exactly two surfaces: **`reviews-main`** and **`listing-badge`**.

This ADR **extends** [[ADR_0002_Widget_Injection_Strategy]]; it does not supersede it. ADR_0002's
decision — one ikas-injected `StorefrontJSScript` pointing at one project-owned script — remains
correct. The injected `<script src=".../widget.js?publicApiKey=...">` URL is unchanged.

**Phase 1 is explicitly NOT:** ESM migration, esbuild code-splitting, physical lazy-loading, or
any storefront behavior change. The registry is structural indirection inside one bundle, not a
code-splitting boundary.

## Reasoning
- **Phased, low-risk.** A physical split requires ESM output (IIFE cannot code-split) and
  decoupling the 670-line `render.js` from its layouts. Doing the internal separation first
  makes the eventual physical split mechanical and reviewable, without a risky big-bang rewrite.
- **Storefront Events is ikas-sanctioned.** Centralizing the subscription removes duplicated
  polling logic and gives one verifiable place for the page/product contract — aligned with
  direct ikas guidance rather than DOM-class heuristics.
- **Zero behavior change is testable.** Because the bundle stays one IIFE with one shared
  `state.js` instance, the refactor is provably output-identical: the call chain
  `PRODUCT_VIEW → bootstrap → render → injectRatingBadge` is preserved, just routed through the
  registry.

## Alternatives Considered
- **Physical split now (ESM + code-splitting) in Phase 1** — would deliver the performance win
  immediately, but requires ESM output, a separate loader stub, and decoupling `render.js` from
  the layout ecosystem. High friction, high regression risk. Rejected for Phase 1; deferred to
  Phase 2.
- **`rating-badge` as a Phase 1 registry surface** — rejected. `injectRatingBadge()` consumes
  the average/count produced by the `render.js` pass. A standalone mount would re-fetch
  settings+reviews (duplicate network) or race `render` (stale counts). It stays inside
  `render.js` for Phase 1 and becomes an independent surface in Phase 2 once `render.js` is
  decoupled.
- **Moving the SPA history patch into the context module** — rejected. The
  `history.pushState/replaceState` patch is deliberately decoupled from `IkasEvents` (it cleans
  the stale rating badge precisely because `PRODUCT_VIEW` can arrive late). It stays in
  `events.js`.
- **Keep the status quo** — rejected. Scattered event handling and a seamless monolith block
  the durable Storefront-Events-first architecture.

## Consequences
- New files: `src/widget/core/storefront-context.js`, `src/widget/core/registry.js`,
  `src/widget/loader.js`, `src/widget/surfaces/{index,reviews-main.surface,listing-badge.surface}.js`.
- `src/widget/index.js` becomes a thin entry; `src/widget/events.js` keeps only
  `attachModalBadgeListener` + the SPA history patch; `bootstrap.js` drops the
  `getProductFromPage` export (logic moves into the context module as a fallback).
- `core/state.js` is untouched — its exports are imported directly by 7+ layout files, so the
  shared mutable state stays in place for Phase 1.
- The exact runtime listing event type is an **open item**: the code currently subscribes to
  `VIEW_LISTING`, which is not in the official event list (`VIEW_CATEGORY` / `VIEW_SEARCH_RESULTS`
  are). The context module isolates event-type strings so this is a one-line fix after live
  verification on a dev store. See [[Ikas_Storefront_Events]].
- `review-form` and `media-gallery` remain on-demand sub-surfaces opened from within
  `reviews-main`; they are not registry surfaces in Phase 1.
- **Follow-up (Phase 2):** ESM migration + esbuild code-splitting + `render.js` decoupling +
  real lazy-loaded modules; `rating-badge` becomes an independent surface; `events.js` may be
  renamed to `core/spa-nav.js`.
- **Follow-up (Phase 3):** cache/versioning strategy and ikas script lifecycle hardening
  (blanket `deleteStorefrontJSScript`, `listStorefrontJSScript` reconciliation). See
  [[Yotpo_Style_Widget_Modular_Architecture]].

## Related Source Files
- [src/widget/index.js](src/widget/index.js)
- [src/widget/loader.js](src/widget/loader.js)
- [src/widget/core/storefront-context.js](src/widget/core/storefront-context.js)
- [src/widget/core/registry.js](src/widget/core/registry.js)
- [src/widget/surfaces/index.js](src/widget/surfaces/index.js)
- [src/widget/events.js](src/widget/events.js)
- [src/widget/product-widget/bootstrap.js](src/widget/product-widget/bootstrap.js)

## Related Notes
- [[Decision_Index]]
- [[Widget_Architecture]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Ikas_Storefront_Events]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]
