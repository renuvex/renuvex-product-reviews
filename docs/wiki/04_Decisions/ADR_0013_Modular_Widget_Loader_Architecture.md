---
type: decision
project: ikas-review-app
status: active
created: 2026-05-16
updated: 2026-05-17
last_verified: 2026-05-17
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
  - "[[Phase_1_Widget_Runtime_Audit]]"
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
Accepted. Phase 1 implementation landed in commit `a68704e` and was runtime-verified
on the dev store on 2026-05-17 — F.3–F.6 + audits A/C/G passed; audit B surfaced and
fixed a pre-existing listing-badge bug ([[Bug_Listing_Badge_Stars_Direct_Load]]).
Full results: [[Phase_1_Widget_Runtime_Audit]].

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
- The runtime listing event type was an open item; **resolved 2026-05-17** by live
  dev-store verification: `VIEW_LISTING` IS a real runtime event on category pages and is
  the event carrying `productDetails[]`. `core/storefront-context.js` is correct — no
  change. (Search pages emit `VIEW_SEARCH_RESULTS` with the same product-array shape, which
  the widget does not yet handle — a Phase 2 item.) See [[Phase_1_Widget_Runtime_Audit]].
- `review-form` and `media-gallery` remain on-demand sub-surfaces opened from within
  `reviews-main`; they are not registry surfaces in Phase 1.
- **Follow-up (Phase 2):** ESM migration + esbuild code-splitting + `render.js` decoupling +
  real lazy-loaded modules; `rating-badge` becomes an independent surface; `events.js` may be
  renamed to `core/spa-nav.js`.
- **Follow-up (Phase 3):** cache/versioning strategy and ikas script lifecycle hardening
  (blanket `deleteStorefrontJSScript`, `listStorefrontJSScript` reconciliation). See
  [[Yotpo_Style_Widget_Modular_Architecture]].

## Phased Rollout Status

Durable roadmap for the modular widget loader work. Each phase is a separate plan;
only Phase 1 is decided and implemented by this ADR. Phase 2 and Phase 3 are
direction, not yet committed designs.

Official-alignment guardrail: ikas public docs and direct ikas developer feedback
support the overall direction (one storefront script, Storefront Events as context,
query-param based script configuration), but the phase gates below keep runtime
event names and StorefrontJSScript schema differences as explicit verification
items before later phases harden around them. The audit checklist lives in
[[Phase_1_Widget_Runtime_Audit]].

### Phase 1 — Internal separation — ✅ Implemented (2026-05-16) & runtime-verified (2026-05-17)

Loader + surface registry + single Storefront Events context module. Single IIFE
bundle preserved; zero behavior change.

- Done: `ADR_0013`, `loader.js`, `core/storefront-context.js`, `core/registry.js`,
  `surfaces/{index,reviews-main.surface,listing-badge.surface}`; `index.js` thinned;
  `events.js` drained to the SPA history patch + modal badge plumbing;
  `getProductFromPage` removed from `bootstrap.js`.
- Verified: `pnpm build:widget` (single IIFE, syntax-checked) + `/preview` smoke test.
- Verified live (2026-05-17, dev store `dev-mertcopper.ikas.shop`): F.3–F.6 +
  audits A/B/C/G — full results in [[Phase_1_Widget_Runtime_Audit]].
  - Event types: `VIEW_LISTING` IS a real runtime event carrying `productDetails[]`
    on category pages — `IKAS_EVENT` in `storefront-context.js` is correct, no
    change. `PAGE_VIEW.data` = `{ url, pageType, customer }`. Search pages emit
    `VIEW_SEARCH_RESULTS` (same product-array shape) — a Phase 2 follow-up, not a
    Phase 1 blocker.
  - PDP render, SPA-nav cleanup, listing-badge render, MutationObserver re-mount,
    and placement (no header/footer/hero/banner/cart leakage) all passed. No double
    render. Sentry post-test check clean.
  - Audit B surfaced a **pre-existing** bug — listing badge stars rendered 0×0 on
    cold direct entry because `#ikr-styles` (carrying the `.ikr-star` display rule)
    was injected only by the PDP `render.js` path. Fixed: the badge factory now
    self-injects `#ikr-badge-styles`. Re-verified. Not an ADR_0013 regression. See
    [[Bug_Listing_Badge_Stars_Direct_Load]].
  - Context7 `/microsoft/playwright` and `/getsentry/sentry-javascript` were used
    only for the test/triage method, per the guardrail.
- Optional Phase 1 closeout benchmark: re-inspect Protein Ocean/Yotpo read-only
  before Phase 2 planning, but do not treat it as a pass/fail test for this app.
  Protein Ocean is one merchant storefront and may include one-off Yotpo/theme
  choices; record only comparable lessons in [[Yotpo_Protein_Ocean_Widget_Research]]
  and keep dev-store verification as the Phase 1 source of truth.

### Phase 2 — Physical module split — ⏳ Planned

Authoritative implementation checklist: [[Phase_2_Widget_Module_Split_Plan]].

- Migrate the build from IIFE to ESM so esbuild code-splitting works.
- Keep `widget.js?publicApiKey=...` compatible. Do not replace it with a pure ESM
  file unless ikas script loading with `type="module"` is proven; prefer a small
  classic compatibility loader that loads the ESM runtime/chunks.
- Decouple `render.js` (~670 lines) from the layout ecosystem.
- Real lazy-loaded widget modules behind the registry — the performance win:
  pages stop paying for code they do not use.
- `rating-badge` becomes an independent surface (Phase 1 keeps it inside `render.js`
  because the aggregate rating/count is produced by that render pass).
- Add `VIEW_SEARCH_RESULTS` handling beside verified `VIEW_LISTING`; both carry
  `productDetails[]` in runtime audit results.
- `events.js` may be renamed to `core/spa-nav.js`.
- Do not make Phase 2 depend on `VIEW_LISTING` or any future ikas Studio `data-*`
  attributes. Listing module detection should use verified Storefront Events and
  `PAGE_VIEW` page type first, with DOM/theme heuristics only as fallback.
- Move listing placement selectors into an explicit theme adapter/fallback contract
  (`findListingContainers`, `findListingTitle`, `ignoreContainers`) before adding
  more listing-like surfaces. Do not keep expanding scattered Ozy-specific
  allowlist/blocklist rules as the primary app strategy.
- Keep the currently injected `widget.js?publicApiKey=...` path compatible until a
  separate loader URL rollout and cache/versioning plan is ready.
- Before committing to module boundaries, compare them against any updated
  Protein Ocean/Yotpo observations, but accept only patterns that still fit a
  reusable ikas app model across many merchants.

### Phase 3 — Cache, versioning, ikas script lifecycle — ⏳ Planned

- Cache split: short cache for the loader, long-immutable cache for versioned modules.
- ikas script lifecycle hardening: remove the blanket zero-argument
  `deleteStorefrontJSScript`, add `listStorefrontJSScript` reconciliation, handle
  storefronts created after install.
- Fix the stale `--theme` build alias (`themes/ozy/listing-selector.js` does not exist).
- Define a canonical product identity contract (`storeId` / `ikasProductId` /
  `ikasVariantId` / `slug`).
- Before changing script lifecycle code, re-run ikas MCP list + introspect for
  StorefrontJSScript operations. The public docs expose `listStorefrontJSScript`,
  `saveStorefrontJSScript`, and `deleteStorefrontJSScript(storefrontIdList)`, while
  the current generated client exposes `create/update/delete` with different delete
  semantics. Resolve that mismatch before any destructive cleanup.
- Reconciliation should search ikas script records by predictable name/content as
  well as the local `storefrontScripts` DB map, so DB loss or manual merchant edits
  do not force unsafe blanket deletion.
- Document the final `isHighPriority` / `order` choice. Current guidance says this
  review widget does not need to preempt Facebook/Google scripts, so priority should
  remain deliberate rather than implicit.
- See [[Yotpo_Style_Widget_Modular_Architecture]].

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
- [[Phase_1_Widget_Runtime_Audit]]
- [[Phase_2_Widget_Module_Split_Plan]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]
