---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-16
updated: 2026-05-25
last_verified: 2026-05-25
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
  - "scripts/build-widget.mjs"
  - "src/widget/classic-loader.js"
  - "src/widget/index.js"
  - "src/widget/loader.js"
  - "src/widget/core/lazy-modules.js"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/registry.js"
  - "src/widget/core/settings.js"
  - "src/widget/surfaces/index.js"
  - "src/widget/surfaces/reviews-main.surface.js"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/events.js"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "public/widget.js"
  - "public/widget-runtime/build-manifest.json"
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
    cold direct entry because `#renuvex-pr-styles` (carrying the `.renuvex-pr-star` display rule)
    was injected only by the PDP `render.js` path. Fixed: the badge factory now
    self-injects `#renuvex-pr-badge-styles`. Re-verified. Not an ADR_0013 regression. See
    [[Bug_Listing_Badge_Stars_Direct_Load]].
  - Context7 `/microsoft/playwright` and `/getsentry/sentry-javascript` were used
    only for the test/triage method, per the guardrail.
- Optional Phase 1 closeout benchmark: re-inspect Protein Ocean/Yotpo read-only
  before Phase 2 planning, but do not treat it as a pass/fail test for this app.
  Protein Ocean is one merchant storefront and may include one-off Yotpo/theme
  choices; record only comparable lessons in [[Yotpo_Protein_Ocean_Widget_Research]]
  and keep dev-store verification as the Phase 1 source of truth.

### Phase 2 — Physical module split — Implemented & verified (2026-05-17)

Authoritative implementation checklist: [[Phase_2_Widget_Module_Split_Plan]].

- Implemented build direction: `public/widget.js` remains a classic ikas-compatible
  loader, while `public/widget-runtime/runtime.js` and
  `public/widget-runtime/chunks/*` are ESM split outputs. This follows the ikas
  developer feedback: keep one storefront script record and use Storefront Events
  as the context source; do not require merchant theme edits or multiple script
  records per module.
- Implemented lazy boundaries: `reviews-main`, `listing-badge`, and preview render
  are loaded through `core/lazy-modules.js`; the registry now supports async
  mounts and isolates rejected lazy imports.
- Implemented event follow-up: `VIEW_SEARCH_RESULTS` is handled beside verified
  `VIEW_LISTING`; both emit product-array listing context into the surface layer.
- Implemented adapter follow-up: Ozy listing placement rules moved behind
  `themes/ozy/adapter.js` and `themes/current-adapter.js`. This remains fallback
  seed data, not a universal ikas theme contract.
- Updated 2026-05-25: the PDP `rating-badge` is now independent from the review
  section mount. It still reuses the PDP review payload in `render.js`, but it
  injects before the opt-in `<div data-renuvex-widget="reviews"></div>` check, so
  missing review mount hides only the review section, not the product-title badge.
  A fully separate registry surface remains optional future work.
- Deferred: `events.js` rename to `core/spa-nav.js`, loader/module cache headers,
  script lifecycle reconciliation, and stale `--theme` alias cleanup remain Phase
  3 work.
- Current verification: `pnpm build:widget`, a manifest boundary assertion, and
  scoped ESLint on changed widget/build files passed. `pnpm lint` itself is not a
  valid gate today because `next lint` fails under the repo's Next.js 16 setup.
- Verified live on the dev store 2026-05-17: PDP/category/search cold entries,
  PDP↔PDP SPA navigation, and a mobile spot check all passed; the Sentry
  post-test check was clean. Full results in [[Phase_2_Widget_Module_Split_Plan]].
- `core/settings.js` now de-dupes the in-flight settings request shared by the
  reviews-main and listing-badge surfaces — a PDP with product carousels
  previously fetched `/api/public/settings` twice.

### Phase 3 — Cache, versioning, ikas script lifecycle — Implemented & verified (2026-05-18)

Full closeout record: [[Phase_3_Widget_Lifecycle_Hardening]]. Source landed in
commit `1700d789` (2026-05-17); live dev-store verification on the Ozy theme
passed 2026-05-18 (cache headers, PDP/category/home badge flow, cron auth guard).
Two residual operational items remain: authenticated cron run after `CRON_SECRET`
is set, and deployed transfer-size re-measurement.


- Done — 2026-05-17: `vercel.json` `headers` sets `/widget.js` and the stable
  `/widget-runtime/runtime.js` compatibility shim to `max-age=300,
  must-revalidate`; content-hashed `/widget-runtime/runtime-*.js` and
  `/widget-runtime/chunks/*` are `max-age=31536000, immutable`. See
  [[Caching_And_Performance]].
- Done — 2026-05-17: ikas script lifecycle is non-destructive. The source no
  longer defines or calls zero-argument `deleteStorefrontJSScript`; OAuth,
  manual inject, daily maintenance, and explicit reconcile share
  `ensureStorefrontScripts()` and use create/update only. The daily maintenance
  cron handles storefronts created after
  install when the merchant has at least one tracked script id.
- Done — 2026-05-17 (commit `ce9508d`): removed the dead `themes/ozy/listing-selector.js` entry from the `--theme` build alias in `build-widget.mjs`. The broader `--theme=new-theme` scaffold (no `themes/new-theme/` folder) remains an open question, not a Phase 3 blocker.
- Done — 2026-05-17: canonical product identity is defined by
  [[ADR_0015_Canonical_Product_Identity]] as `(storeId, productId)`. Reviews are
  product-level, not variant-level; slug/name are display snapshots.
- Before changing script lifecycle code, re-run ikas MCP list + introspect for
  StorefrontJSScript operations. The public docs expose `listStorefrontJSScript`,
  `saveStorefrontJSScript`, and `deleteStorefrontJSScript(storefrontIdList)`, while
  the active MCP exposes `create/update/delete` with different delete semantics
  and the generated project client intentionally defines only `create/update`.
  Resolve that mismatch before any destructive cleanup.
- Active MCP still does not expose `listStorefrontJSScript`, so reconciliation
  cannot safely search ikas-side script records by name/content yet. Until ikas
  exposes a verified list/delete contract, DB-map loss is repaired explicitly by
  manual re-inject; cron skips a completely empty map to avoid blind duplicate
  creation.
- All script-record writes in the lifecycle/reconciliation work must build the
  `<script src>` through `buildStorefrontWidgetScript()` in
  [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts) (added in
  `960fd44`). Do not rebuild the widget URL inline — that helper is what keeps
  localhost and non-HTTPS origins out of real storefront script records.
- Done — 2026-05-17: final ordering choice is `isHighPriority: false`; `order`
  is not set because the active input type does not expose it. This review app
  does not manage consent/cookies and does not need to run before Facebook/Google
  scripts.
- Done — 2026-05-17: listing badge injection filters invisible links before
  injecting badges, so the hidden Ozy `passive` search-results container is not
  decorated.
- Non-code follow-ups tracked here so they are not lost: (a) a merchant onboarding
  instruction to disable the storefront theme's own native review block, which
  otherwise renders empty next to the app widget; (b) re-measure the deployed
  widget transfer size after the hashed runtime deploy, replacing the
  `177763`-byte 2026-05-15 pre-split baseline before claiming a live performance
  win.
- See [[Yotpo_Style_Widget_Modular_Architecture]].

## Related Source Files
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [src/widget/classic-loader.js](src/widget/classic-loader.js)
- [src/widget/index.js](src/widget/index.js)
- [src/widget/loader.js](src/widget/loader.js)
- [src/widget/core/lazy-modules.js](src/widget/core/lazy-modules.js)
- [src/widget/core/storefront-context.js](src/widget/core/storefront-context.js)
- [src/widget/core/registry.js](src/widget/core/registry.js)
- [src/widget/core/settings.js](src/widget/core/settings.js)
- [src/widget/surfaces/index.js](src/widget/surfaces/index.js)
- [src/widget/surfaces/reviews-main.surface.js](src/widget/surfaces/reviews-main.surface.js)
- [src/widget/surfaces/listing-badge.surface.js](src/widget/surfaces/listing-badge.surface.js)
- [src/widget/events.js](src/widget/events.js)
- [src/widget/reviews-section/bootstrap.js](src/widget/reviews-section/bootstrap.js)
- [src/widget/themes/ozy/adapter.js](src/widget/themes/ozy/adapter.js)
- [public/widget-runtime/build-manifest.json](public/widget-runtime/build-manifest.json)

## Related Notes
- [[Decision_Index]]
- [[Widget_Architecture]]
- [[Yotpo_Style_Widget_Modular_Architecture]]
- [[Ikas_Storefront_Events]]
- [[Phase_1_Widget_Runtime_Audit]]
- [[Phase_2_Widget_Module_Split_Plan]]
- [[Phase_3_Widget_Lifecycle_Hardening]]
- [[ADR_0002_Widget_Injection_Strategy]]
- [[ADR_0011_Widget_Touch_Feedback_And_Focus_Modality]]
