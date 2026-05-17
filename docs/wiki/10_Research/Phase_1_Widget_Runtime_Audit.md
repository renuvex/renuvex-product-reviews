---
type: research
project: ikas-review-app
status: active
created: 2026-05-17
updated: 2026-05-17
last_verified: 2026-05-17
confidence: medium
tags:
  - research
  - widget
  - phase-1
  - storefront-events
  - listing-badge
related:
  - "[[ADR_0013_Modular_Widget_Loader_Architecture]]"
  - "[[Ikas_Storefront_Events]]"
  - "[[Ikas_Storefront_Script_Capabilities]]"
  - "[[Listing_Rating_Widget]]"
  - "[[Bug_Listing_Badge_Stars_Direct_Load]]"
  - "[[Sentry_Operations]]"
source_files:
  - "src/widget/core/storefront-context.js"
  - "src/widget/loader.js"
  - "src/widget/surfaces/listing-badge.surface.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/listing-badges/inject.js"
  - "src/widget/core/badge.js"
  - "src/widget/core/helpers.js"
  - "src/widget/core/state.js"
  - "src/lib/ikas-client/graphql-requests.ts"
  - "src/lib/ikas-client/generated/graphql.ts"
---

# Phase 1 Widget Runtime Audit

## Summary

This page records the research needed to close [[ADR_0013_Modular_Widget_Loader_Architecture]]
Phase 1 and enter Phase 2 with cause-and-effect clarity. It separates confirmed
documentation/schema facts from runtime behavior that still needs live dev-store
verification.

No storefront browser test was run while creating this note. No source code,
database, deployment, package, or generated GraphQL file was changed.

> **Update 2026-05-17 — audit executed.** The runtime audits below were since run
> on the live dev store; results are in the next section.

## Runtime Audit Results — 2026-05-17

Phase 1 runtime audits A/B/C/G were run on the live dev store
`dev-mertcopper.ikas.shop` against the Phase 1 bundle (served from
`localhost:3000/widget.js`; byte-identical to committed `public/widget.js`).
Method: Playwright (navigation, DOM/computed-style inspection, console + network
capture) plus a read-only `window.IkasEvents` probe.

### A. Storefront Events payloads — verified

| Event | `data` fields (runtime) | Carries product list |
|---|---|---|
| `PAGE_VIEW` | `url`, `pageType`, `customer` | — |
| `PRODUCT_VIEW` | `productDetail` (`id`, `name`, …) | — |
| `VIEW_LISTING` | `productDetails[]` | yes (category listings) |
| `VIEW_CATEGORY` | `categoryPath`, `category` | no |
| `VIEW_SEARCH_RESULTS` | `searchKeyword`, `productDetails[]` | yes (search listings) |
| `SEARCH` | `searchKeyword` | — |

`pageType` runtime values observed: `INDEX`, `PRODUCT`, `CATEGORY`, `SEARCH`.

- **`VIEW_LISTING` is a real runtime event.** It fires on category pages and is
  the event that carries the category product array. The earlier assumption (that
  `VIEW_LISTING` was invalid versus `VIEW_CATEGORY` / `VIEW_SEARCH_RESULTS`) was
  wrong — `VIEW_CATEGORY` also fires but carries only `categoryPath`/`category`,
  not products. `IKAS_EVENT.LISTING_VIEW = 'VIEW_LISTING'` in
  `core/storefront-context.js` is **correct; no code change**.
- **Search pages emit `VIEW_SEARCH_RESULTS`, not `VIEW_LISTING`.** The widget only
  subscribes to `VIEW_LISTING`, so on search pages it does not capture product
  names into `ikrSlugMap`. Search badges still render (DOM link fallback in
  `collectSlugs`), so this is not a broken-badge defect — but Phase 2 events-first
  work should also handle `VIEW_SEARCH_RESULTS` (`data.productDetails[]`, same shape).

Gate (A): real event names and payload shapes documented. ✓

### B. Listing badge visual audit — bug found and fixed

Cold direct entry to home/category/search rendered listing badges as `avg (count)`
text with **0×0 star SVGs**. Root cause confirmed and fixed — see
[[Bug_Listing_Badge_Stars_Direct_Load]]. Post-fix: cold home/category stars render
`13×13`; `--ikr-badge-color` set; no duplicate `[data-ikr-listing-badge]`.

Visual evidence is archived with the bug note:
[before fix](../assets/cold-home-listing-badge-no-stars.png) and
[after fix](../assets/cold-home-listing-badge-FIXED.png).

Gate (B): [[Bug_Listing_Badge_Stars_Direct_Load]] is fixed and re-verified. ✓

### C. Listing placement false positive/negative audit — clean

On home, `/shorts`, `/search`, and `/clothing`, every `[data-ikr-listing-badge]`
and every processed `[data-ikr-badge]` link was inside a whitelisted product
container — **zero** badges in header/nav, footer, hero/banner/marquee, or
cart/basket. Only the reviewed product received badges (expected — others have 0
reviews). The MutationObserver was confirmed to fire on dynamic node insertion and
re-run the badge pipeline.

Gate (C): no false positives on the audited dev-store surfaces. ✓ (The Ozy
allowlist/blocklist is still theme-specific — Phase 2 theme-adapter work stands.)

### F.3 / F.6 — PDP + regression

PDP renders the review block, product-title rating badge, and JSON-LD
`AggregateRating`; SPA navigation cleans the stale rating badge + JSON-LD; no
double render (rating badge / JSON-LD / summary / title each count 1). Console
across the whole session: only unrelated `favicon.ico` / theme-image 404s — no
`widget.js`, widget, or `/api/public/*` errors. `widget.js` and
`/api/public/settings` returned `200`.

### G. Sentry post-test check — clean

No new issues in project `yorum-paneli` (`lastSeen:-24h` → 0 results). The only
`tags[source]:widget` issue is `YORUM-PANELI-3`, a resolved 5-day-old intentional
smoke test. As this note warned, a clean Sentry result does not by itself prove
Phase 1 — the stars bug (B) rendered 0×0 without throwing, so it produced no
Sentry event; the browser DOM audit caught it.

Gate (G): no new Sentry runtime/API issue. ✓

## Confirmed Evidence

| Topic | Evidence | Confidence |
|---|---|---|
| Storefront script support | Official Storefront API says ikas can save and embed JavaScript in storefront themes and documents `StorefrontJSScript` with `scriptContent`, `isHighPriority`, `order`, `name`, and `storefrontId`. Source: <https://ikas.dev/docs/api/admin-api/storefronts> | High |
| Storefront script listing in public docs | Official Storefront API documents `listStorefrontJSScript(storefrontId): [StorefrontJSScript!]!`. | High |
| Public docs script mutations | Official Storefront API documents `saveStorefrontJSScript(input)` and `deleteStorefrontJSScript(storefrontIdList)`. | High |
| Current MCP script mutations | ikas MCP introspection on 2026-05-17 exposes `createStorefrontJSScript(input)`, `updateStorefrontJSScript(input)`, and zero-argument `deleteStorefrontJSScript`. | High |
| MCP listing gap | ikas MCP list/introspect on 2026-05-17 did not expose `listStorefrontJSScript`; `introspect("listStorefrontJSScript")` returned invalid operation. | High |
| Current generated client | [generated/graphql.ts](src/lib/ikas-client/generated/graphql.ts) includes `listStorefront`, `createStorefrontJSScript`, and `updateStorefrontJSScript`; source no longer defines the zero-argument delete mutation. | High |
| Storefront Events doc tokens | The current builders docs HTML fetched on 2026-05-17 contains `IkasEvents`, `IKAS_EVENT_TYPE`, `IKAS_PAGE_TYPE`, `PAGE_VIEW`, `PRODUCT_VIEW`, `VIEW_CATEGORY`, and `VIEW_SEARCH_RESULTS`. | Medium-high |
| Context7 Playwright docs | Context7 `/microsoft/playwright` docs checked on 2026-05-17 for Phase 1 smoke-test evidence: web-first assertions, screenshots, trace capture, console, DOM snapshot, and network inspection are relevant. | High |
| Context7 Sentry JavaScript docs | Context7 `/getsentry/sentry-javascript` docs checked on 2026-05-17 for post-test triage: tags, context, breadcrumbs, captured exceptions/messages, and event enrichment are relevant. | High |
| `VIEW_LISTING` resolved | Runtime audit (2026-05-17) confirmed `VIEW_LISTING` IS emitted by the dev storefront on category pages and carries `productDetails[]`. The official docs list is incomplete, not contradictory; `VIEW_CATEGORY` also fires but without products. `core/storefront-context.js` is correct — no change. See Runtime Audit Results §A. | High |
| Listing badge placement guard | [inject.js](src/widget/listing-badges/inject.js) injects only inside `THEME_PRODUCT_CONTAINERS`, with header/nav/cart/banner/single-product skip rules. | High |
| Listing badge star render path | [badge.js](src/widget/core/badge.js) builds listing stars through `getIconStyle('star','classic')` -> `partialStarsHTML(...)`; the text `avg (count)` is inserted in the same badge element. | High |

## Not Fully Known Yet

Updated 2026-05-17 after the runtime audit (see Runtime Audit Results above).

- ~~Which event type the dev storefront emits for category/search listing~~ —
  **Resolved.** Category: `VIEW_LISTING` (+ `VIEW_CATEGORY`). Search:
  `VIEW_SEARCH_RESULTS` (+ `SEARCH`). See Audit A.
- ~~What field shape `PAGE_VIEW.data` uses~~ — **Resolved.** `data` =
  `{ url, pageType, customer }`; `pageType` ∈ `INDEX | PRODUCT | CATEGORY | SEARCH`.
- ~~Why cold direct listing entry renders `avg (count)` without star icons~~ —
  **Resolved and fixed.** `#ikr-styles` (carrying the `.ikr-star` `display` rule)
  was injected only by the PDP `render.js` path. See
  [[Bug_Listing_Badge_Stars_Direct_Load]].
- The current Ozy allowlist/blocklist showed **no false positives** on the audited
  dev-store surfaces (Audit C), but it is still a theme-specific selector set, not
  an ikas-wide contract. Phase 2 theme-adapter work stands.
- We are **not 100% sure** how to implement safe script reconciliation yet because
  official public docs and current MCP/generated client expose different
  StorefrontJSScript operation names and delete arguments. (Not audited — Phase 3.)
- We are **not 100% sure** whether Protein Ocean/Yotpo observations generalize to
  a reusable ikas app. Treat them as benchmark input only.

## Required Phase 1 Runtime Audits

### A. Storefront Events Payload Audit

Run on `https://dev-mertcopper.ikas.shop/` after the Phase 1 bundle is deployed.
Capture event `type`, `data`, URL, navigation source, and timestamp for:

- direct home page load
- direct category page load
- direct search/listing page load if available
- direct PDP load
- home/category -> PDP SPA navigation
- PDP -> home/category/listing SPA navigation
- lazy-loaded product slider or infinite-scroll product cards

Acceptance gate: document the real event names and payload shapes before changing
`IKAS_EVENT` or Phase 2 listing module boundaries.

### B. Listing Badge Visual Audit

Check listing badge render on cold direct entry and after PDP navigation:

- star SVG exists in DOM
- star SVG is visible by computed style
- `--ikr-badge-color` is set before/when badge is injected
- `avg (count)` text remains aligned with the star row
- no duplicate `[data-ikr-listing-badge]` is inserted after remount

Acceptance gate: [[Bug_Listing_Badge_Stars_Direct_Load]] is either fixed or has a
confirmed root cause before Phase 2 module splitting starts.

### C. Listing Placement False Positive/Negative Audit

Inspect these surfaces on the dev storefront:

- header and menu
- footer
- hero/banner/marquee blocks
- cart/basket and quick-view areas
- editorial/content blocks with product links
- product sliders
- single-product home section
- category grid
- search grid
- lazy-loaded/infinite-scroll product cards
- any merchant-added custom section with product links

Acceptance gate: false positives and false negatives are documented, even if the
fix is deferred to the Phase 2 theme adapter work.

### D. Phase 2 Dependency Map

Before physical ESM/code-splitting work, map these dependencies:

- `reviews-main` -> `bootstrap.js` -> `render.js` -> layouts, write form, media,
  modal, `rating-badge`
- `listing-badge` -> `collect.js` / `ratings.js` / `inject.js` -> `core/badge.js`
  -> icons and `partialStarsHTML`
- shared mutable state in [state.js](src/widget/core/state.js)
- shared fetch/cache/config dependencies
- CSS/style injection paths needed before lazy module mount

Acceptance gate: no module should be split until its shared state, CSS, and icon
dependencies are explicit.

### E. StorefrontJSScript Schema Reconciliation

Before Phase 3 lifecycle work:

- re-run ikas MCP `list`
- introspect create/update/delete script operations
- confirm whether `listStorefrontJSScript` exists in the active schema
- compare MCP with official docs and generated client
- decide whether to add a query document and run codegen
- avoid destructive cleanup until delete semantics are proven

Acceptance gate: no blanket or destructive script cleanup is changed until this
schema mismatch is resolved.

### F. Context7 Documentation Check

Use Context7 when Phase 1 work touches external library behavior, not as a
replacement for ikas-specific evidence.

Use Context7 for:

- Playwright/browser automation details: web-first assertions, screenshots,
  console and network capture, trace/video evidence, and DOM-state verification
  across SPA navigation and lazy-loaded content.
- Sentry JavaScript/Next.js behavior: tags, contexts, breadcrumbs, captured
  exceptions/messages, event enrichment, and post-test issue triage.
- Next.js/App Router behavior if a Phase 1 finding crosses from storefront
  runtime into panel/API implementation.

Do not use Context7 as the deciding source for:

- ikas Storefront Events event names or payload shape
- StorefrontJSScript mutation/query availability
- ikas theme DOM contracts

Those remain governed by official ikas docs, ikas MCP introspection, direct ikas
developer feedback, generated client state, and live dev-store runtime evidence.

Acceptance gate: if Phase 1 tests or follow-up fixes depend on Playwright,
Sentry, Next.js, or another third-party library behavior, record the Context7
library id and the checked topic in this audit before Phase 1 is closed.

### G. Sentry Post-Test Check

Run after the browser/Playwright Phase 1 test pass, not instead of it. Sentry is a
supporting signal for thrown errors and API failures; it does not prove visual DOM
correctness.

Check Sentry for:

- new widget-originated issues with `tags[source]:widget`
- events mentioning `widget.js`
- `/api/public/widget-error` reports
- server/API errors from `/api/public/settings`, `/api/public/ratings-by-slug`,
  `/api/public/reviews`, and `/api/public/widget-error`
- errors around `IkasEvents` handling, `renderListingBadges`, `injectBadges`,
  `createBadgeEl`, icon rendering, or public API fetch failures

Context7 note: current Sentry JavaScript docs confirm that tags, context,
breadcrumbs, and captured exceptions/messages are the relevant SDK-level signals
for this triage. The actual issue search still happens in the project's Sentry
organization/project.

Limitations:

- A clean Sentry result does **not** prove Phase 1 passes.
- Sentry may not catch missing stars if the DOM renders without throwing.
- Sentry may not catch badges injected into the wrong section.
- Sentry may not catch an event-name mismatch if fallback code hides the failure.

Acceptance gate: record "no new Sentry runtime/API issue found" or link any new
issue to the relevant Phase 1 bug/audit note. Browser DOM, console, network, and
visual checks remain the primary source of truth.

## Phase Fit

- Phase 1 closes runtime truth: event names, payloads, cold listing render,
  placement false positives/negatives. Context7 supports the Playwright/Sentry
  test method, while Sentry itself is used only as post-test error telemetry.
- Phase 2 uses that truth to create module boundaries and structured
  theme-adapter fallback.
- Phase 3 uses confirmed StorefrontJSScript schema to harden injection,
  reconciliation, cache, and rollback.

## Related Notes

- [[ADR_0013_Modular_Widget_Loader_Architecture]]
- [[Ikas_Storefront_Events]]
- [[Ikas_Storefront_Script_Capabilities]]
- [[Listing_Rating_Widget]]
- [[Bug_Listing_Badge_Stars_Direct_Load]]
- [[Yotpo_Protein_Ocean_Widget_Research]]
- [[Sentry_Operations]]
