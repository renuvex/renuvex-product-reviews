---
type: research
project: renuvex-product-reviews
status: active
created: 2026-09-09
updated: 2026-09-09
last_verified: 2026-09-09
confidence: high
tags:
  - widget
  - badge
  - product-identity
  - acceptance
  - rollout
related:
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[ADR_0038_Runtime_Attested_Storefront_Placement]]"
  - "[[Listing_Rating_Widget]]"
  - "[[Product_Rating_Badge]]"
  - "[[Sentry_Operations]]"
  - "[[Test_Strategy]]"
source_files:
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/app/api/public/widget-error/route.ts"
  - "src/widget/core/storefront-context.js"
  - "src/widget/core/listing-proof-request-state.js"
  - "src/widget/placement/capability.js"
  - "src/widget/listing-badges/ratings.js"
  - "src/widget/listing-badges/strict-inject.js"
  - "src/widget/rating-badge/inject.js"
  - "tests/widget-placement-capability.spec.ts"
  - "tests/widget-product-id-cross-browser.spec.ts"
  - "playwright.placement.config.ts"
  - ".github/workflows/widget-smoke.yml"
  - ".github/workflows/media-cross-browser.yml"
---

# Badge Product ID Closeout Acceptance - 2026-09-09

## Agent Brief

This is the single acceptance ledger for the Badge Product ID closeout. Source
implementation and local evidence do not equal Production closure. Keep this
acceptance record operationally open until the backend-first rollout, separately approved Worker
rollout, two live canaries around one natural Product Lifecycle reconciliation,
and Sentry alert verification all pass.

## Scope And Invariant

- Canonical identity is only `(storeId, productId)`.
- Slug is one-shot discovery for a strict ID-less card, never a review query,
  persistent cache, dedupe, slot, or visible badge identity.
- Every visible PDP, listing, and quick-view badge and its Renuvex slot carry the
  same non-empty `data-renuvex-product-id`.
- Missing, malformed, stale, unresolved, tombstoned, conflicting, or ambiguous
  identity/placement fails closed.
- Ozy is the only runtime-detectable automatic-placement adapter.
- Product Lifecycle Release A supplies the resolver evidence. Release B is out
  of scope; this work is one closeout PR, not a new lifecycle release.

## Baseline

| Item | Evidence |
|---|---|
| Base | `origin/main` `a602db8daf3b8bd0480b5857b5f4e8ae6765c6c3` |
| Strict placement | PR #35, `b18c0e08d00c480b6006d7e8cbca031df7188aca` |
| Request dedupe | PR #36, `cac45aec64b57b087089f1792f0add50238619f2` |
| Work branch | `codex/badge-product-id-closeout` |
| Current local runtime | `widget-runtime/runtime-47TOVECU.js` (CI/production-origin build) |
| Existing live evidence | PR #35/#36 Ozy PDP, category, and homepage placement passed before this closeout |

## Source Contract

The slug endpoint returns
`{ data: { [slug]: { productId, avg, count } } }` only after current
installation/coverage/lifecycle evidence safely resolves the slug. A resolved
zero-review product returns Product ID plus `0.0/0`; unsafe evidence omits the
slug. Rating summaries are read only by Product ID and `Review.slug` is not
queried.

The runtime promotes a strict DOM candidate to an immutable Product ID proof
only after response-time revalidation of epoch, event generation, adapter,
container, exact link/href slug, title, and mount. Product ID-only v3 cache
entries have per-entry five-minute TTLs; v2 slug cache and persistent
slug-to-ID mappings are unused. Quick-view binds the exact clicked link to one
modal/title/token and retires stale modal slots.

## Local Evidence

| Gate | Result |
|---|---|
| Widget build | PASS; CI/production-origin manifest entry `runtime-47TOVECU.js` |
| Focused public API/health/static units | PASS, 79 tests |
| Full unit suite | PASS, 124 files / 822 tests |
| Widget network smoke | PASS, 37 tests |
| Widget runtime smoke | PASS, 62 tests |
| Widget interactions | PASS, 39 tests |
| Admin preview smoke | PASS, 6 tests |
| Full placement capability | PASS, 43 tests |
| Five-browser critical matrix | PASS, 20 tests across Chromium, Firefox, desktop WebKit, Pixel Android, and iPhone WebKit |
| Performance budget | PASS; rating-badge static graph `64,837 / 65,000` bytes and all other limits passed |
| Worker contract | PASS, 11 tests; types generated; Wrangler deploy dry-run passed without deployment |
| Typecheck / lint | PASS; TypeScript clean, ESLint 0 errors with 7 pre-existing React warnings |
| Generated drift / application build / wiki audit | Pending final clean-tree verification |
| PR CI | Pending branch publication |

## Production Gates

| Gate | Required evidence | Status |
|---|---|---|
| Backend deploy | Closeout commit and Vercel deployment ID | PENDING APPROVAL/PR |
| Origin slug API | Product ID-bearing and zero-review responses; `no-store`; old-runtime compatibility | PENDING |
| Worker pre-runtime check | Same body through read origin; `X-Renuvex-Edge-Cache: BYPASS`; no HIT | PENDING |
| Worker runtime deploy | Approved deployment/version and immutable runtime hash | PENDING EXPLICIT APPROVAL |
| Canary 1 | Fresh desktop/mobile PDP `/premium-shortsg`, category `/clothing`, homepage scroll, search, slider/infinite-scroll, and quick-view DOM/network/console evidence | PENDING |
| Lifecycle continuity | One natural daily reconciliation completed without identity drift/conflict | PENDING |
| Canary 2 | Repeat the same fresh-session canary after lifecycle reconciliation | PENDING |
| Sentry alerts | `identity-conflict` first event and other three health types at 10 events / 5 minutes to maintainer email | PENDING EXPLICIT APPROVAL |
| Final wiki state | Commit, CI, deployment, runtime hash, both canaries, lifecycle, and alert evidence recorded; status changed to Production verified | PENDING |

For every live visible badge, record the exact Product ID on slot and inner
badge, exact title adjacency, expected rating/count, one owned slot, zero badge
in header/nav/footer/cart/banner, and no unexpected console/widget-error event.

## Rollback Boundary

- First disable the affected store's existing Badge toggle.
- For runtime regressions, roll the Worker only to the known-safe PR #35/#36
  runtime retained by the build contract.
- For API regressions, roll back the Vercel backend.
- Never restore the pre-PR #35 broad-selector runtime.
- Worker deploy/rollback/purge, Vercel deploy/rollback, and Sentry alert changes
  are external mutations and require explicit approval.

## Official Contract References

- [Ikas Storefront Events](https://builders.ikas.com/docs/storefront-events):
  supported browser event subscription/context boundary.
- [Shopify theme app extensions](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions)
  and [app blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks/app-blocks):
  global comparison for platform-owned merchant placement primitives.
- [Okendo Reviews Widget](https://docs.okendo.io/on-site/on-site-widgets/reviews-widget)
  and [Storefront JavaScript API](https://docs.okendo.io/on-site/storefront-javascript-api/widget-plus-window-api):
  global comparison for Product ID-bound review widgets.
- [Sentry event enrichment](https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/enriching-events):
  tag filtering and fingerprint grouping contract.

Ikas currently lacks a confirmed universal app-block-equivalent mount point.
The Product ID binding pattern is global; the strict Ozy adapter is the
project-specific Ikas compatibility layer and does not authorize other themes.
