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
  - "[[Bug_Quick_View_Badge_Listing_Generation_Rollover]]"
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

This is the single acceptance ledger for the Badge Product ID closeout. PR #37,
PR #38, the backend-first rollout, and the first approved Worker runtime rollout
are complete. The first live canary passed PDP/category/home surfaces but found
an actual Ozy quick-view availability regression during a same-route listing
generation rollover. Its strict local fix does not equal Production closure.
Keep this record open until the follow-up PR/CI and approved Worker rollout, a
complete first canary, one natural Product Lifecycle reconciliation, the second
canary, and Sentry alert verification all pass.

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
| Product ID implementation | `e7491dff` |
| CI-origin runtime and budget | `6ccf9ad7` |
| Documentation evidence | `63202dd3` |
| Merged closeout | PR #37, merge commit `f70bd7c4fab69af9d084e06d1a57b5250aed7349` |
| CI recovery | PR #38, merge commit `6f3b169d5921f1bd13dae7626fb4975e2cc00465` |
| First deployed Product ID runtime | `widget-runtime/runtime-47TOVECU.js` |
| Quick-view follow-up | `codex/badge-quick-view-closeout` from exact `origin/main` `6f3b169d`; implementation commit `e34017bc`; not deployed |
| Current follow-up runtime candidate | `widget-runtime/runtime-U5U3V66L.js`, SHA-256 `d9ff0341bffc3bbfa2b0064a67a149bc13feaea477e050b9e73dc313b339ee8c`, committed at `e34017bc` |
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
modal/title/token and retires stale modal slots. It seals Product ID from a
valid proof or current event identity. A later listing generation may replace
the modal candidate only for the exact unchanged target and a valid proof whose
Product ID equals that sealed clicked ID. A changed or unsealed Product ID stays
fail-closed.

## Local And CI Evidence

PR #37 established the full closeout baseline. The quick-view follow-up has
rerun the risk-focused gates below; the remaining broad local gates are still
required before commit and PR.

| Gate | Result |
|---|---|
| Widget build | PASS; CI/production-origin manifest entry `runtime-47TOVECU.js` |
| Focused public API/health/static units | PASS, 79 tests |
| Full unit suite | PASS, 124 files / 822 tests |
| Widget network smoke | PASS, 37 tests |
| Widget runtime smoke | PASS, 62 tests |
| Widget interactions | PASS, 39 tests |
| Admin preview smoke | PASS, 6 tests |
| Full placement capability | PASS; PR #37 baseline 43 tests, quick-view follow-up 45 tests |
| Five-browser critical matrix | PASS on follow-up, 20 tests across Chromium, Firefox, desktop WebKit, Pixel Android, and iPhone WebKit |
| Performance budget | PASS on follow-up; always-loaded `84,825 / 85,000`, listing-badges `72,196 / 75,000`, rating-badge `64,939 / 65,000` bytes; all other limits passed |
| Worker contract | PASS, 11 tests; types generated; Wrangler deploy dry-run passed without deployment |
| Typecheck / lint | PASS; TypeScript clean, ESLint 0 errors with 7 pre-existing React warnings |
| Generated drift | PASS; `build:widget:ci` reproduced the committed runtime with zero drift |
| Application build | PASS; migration-free Next.js 16.2.1 `build:ci` completed |
| Wiki audit | PASS with 0 errors; 25 repository-health warnings remain outside this closeout |
| PR/main CI | PASS for merged work; PR #37 Quality Gate `34380648250`, Database Compatibility `34380648240`, PR #38 browser gate `34385396805`, and final main Quality Gate `34389119540` all passed |
| Quick-view follow-up broad gates | PASS: 124 files / 822 unit tests, 144 combined network/runtime/interactions/admin browser tests, TypeScript, lint with 0 errors and 7 pre-existing warnings, codegen no drift, Worker 11-test contract/types/dry-run, budget, wiki audit 0 errors, and diff check. After commit `e34017bc`, full Next.js 16.2.1 `build:ci` and independent `build:widget:ci` both passed with generated widget drift at zero. |

## Backend-First Production Evidence

PR #37 merged on 2026-09-09. Its linked Vercel production deployment
`dpl_Ty2ktp2Ug2HsqBs7WQwXwAWipqoQ` reached `READY` for the exact merge commit
`f70bd7c4fab69af9d084e06d1a57b5250aed7349` and assigned the
`https://app.renuvex.app` alias. The previous backend rollback boundary remains
deployment `dpl_CvrfYUUR1iwNFLAPY3B6QeYwswUA` at `a602db8d`.

PR #38 then merged at `6f3b169d5921f1bd13dae7626fb4975e2cc00465`.
Production deployment `dpl_HW1RreoWvKou1QWcQDr6LJcBECzK` reached `READY` for
that exact commit and holds the current `https://app.renuvex.app` alias.

| Probe | Result |
|---|---|
| Origin reviewed product | `/api/public/ratings-by-slug` resolved `premium-shortsg` to Product ID `37fb6e3d-6085-4ac1-b0eb-7aaa63ada934`, `avg: "4.0"`, `count: 93`; HTTP `200`, `Cache-Control: no-store` |
| Worker reviewed product | Returned the identical Product ID/rating body; HTTP `200`, `Cache-Control: no-store`, `X-Renuvex-Edge-Cache: BYPASS` |
| Worker zero-review product | Resolved `basic-cap-1` to Product ID `286da97c-ee9d-4d92-98d8-13585822a38a`, `avg: "0.0"`, `count: 0`; HTTP `200`, `no-store`, `BYPASS` |
| Backend-first compatibility | Before the Worker mutation, the retained PR #35/#36 runtime ignored the additive Product ID response field and kept zero-count results hidden. This gate passed before the Product ID runtime rollout. |

Post-merge Database Compatibility run `34383106863` passed. Quality Gate run
`34383106857` failed on both the initial attempt and failed-job rerun before any
browser test started: the GitHub-hosted Ubuntu runner's preinstalled Google
Chrome APT repository returned `Hash Sum mismatch` during Playwright's
`--with-deps` step. A separate CI-only follow-up routes browser installation
through a narrow runner-source guard; it does not change application or widget
runtime behavior. PR #38 Quality Gate run `34385396805` passed all 12 jobs on
commit `e7adc045`, including every Chromium/WebKit install and the browser tests
that the broken repository metadata had previously suppressed. This closes the
runner-source incident at PR level. PR #38 merged as `6f3b169d`; its final main
Quality Gate run `34389119540` passed all 12 jobs.

## First Worker Rollout And Canary

After explicit approval, `pnpm worker:widget:deploy` deployed the PR #37/#38
assets to Worker `renuvex-widget-assets` at 100% traffic:

| Item | Evidence |
|---|---|
| Worker version | `a025a9a4-216d-470b-b67c-9167d58f538a` |
| Worker deployment | `5c297724-18c4-46b3-8420-9614662f446b`, created `2026-09-09T18:48:52.562366Z` |
| Immutable runtime | `widget-runtime/runtime-47TOVECU.js`, SHA-256 `bf7feef03114f66d9cab055cbf82d88ea227ff29bddaf5e58d518a09455e62b3` |
| Stable runtime | `widget-runtime/runtime.js`, SHA-256 `ffea22a2859278d8b40f3eb6281cae75131e8973e6bb0ec5cb24b2982c5cba5a` |
| Loader | `widget.js`, SHA-256 `10a7f6df97d5b2493014f239b7ebe331dadb493686c2bb9200cc51736d642d8c` |
| Retained safe runtime | `runtime-7SWRHBZ4.js`, SHA-256 `3d142275ed311c810d8f69d003e65e9a9b80d15968b482901b498d8956056b22` |
| Delivery health | `/__health` returned HTTP `200` and `no-store`; manifest and immutable hash matched; old runtime remained available |
| Slug API after rollout | Origin and Worker bodies remained identical; Worker returned `no-store`, `BYPASS`, and dynamic cache status |

Fresh desktop live checks produced:

- PDP `/premium-shortsg`: one exact title-adjacent badge; slot and badge Product
  ID `37fb6e3d-6085-4ac1-b0eb-7aaa63ada934`; `4.0/93`; no console warnings or
  errors.
- Category `/clothing`: four visible listing badges with correct Product IDs and
  ratings; zero mismatches, duplicates, placeholders, or forbidden placements;
  one bulk slug read rather than per-card requests; no console warnings/errors.
- Homepage scroll/slider/infinite-scroll: viewport gating held before scroll;
  24 badges after scroll; zero mismatches, forbidden placements, duplicates, or
  placeholders; bulk slug read; no console warnings/errors.
- Actual Ozy quick-view: the exact card click opened one visible strict modal,
  but no modal badge appeared after six seconds. No wrong badge appeared and no
  console error was observed. Canary 1 was therefore not accepted. See
  [[Bug_Quick_View_Badge_Listing_Generation_Rollover]].

The local Sentry read-only check could not inspect event tags because the
configured organization token returned HTTP `401 Invalid org token`. No Sentry
rule or project setting was mutated.

## Production Gates

| Gate | Required evidence | Status |
|---|---|---|
| Backend deploy | Closeout commit and Vercel deployment ID | PASS; current main `6f3b169d`, `dpl_HW1RreoWvKou1QWcQDr6LJcBECzK`, `READY` |
| Origin slug API | Product ID-bearing and zero-review responses; `no-store`; old-runtime compatibility | PASS |
| Worker pre-runtime check | Same body through read origin; `X-Renuvex-Edge-Cache: BYPASS`; no HIT | PASS |
| First Worker runtime deploy | Approved deployment/version and immutable runtime hash | PASS; version `a025a9a4-216d-470b-b67c-9167d58f538a`, deployment `5c297724-18c4-46b3-8420-9614662f446b`, runtime SHA-256 recorded above |
| Canary 1 | Fresh desktop/mobile PDP `/premium-shortsg`, category `/clothing`, homepage scroll, search, slider/infinite-scroll, and quick-view DOM/network/console evidence | INCOMPLETE; desktop PDP/category/home/slider/infinite-scroll passed, actual quick-view availability failed, and required mobile/search completion was not claimed |
| Quick-view follow-up | Exact same-target/same-Product-ID generation rebinding, regression tests, PR/CI, backend and Worker rollout | SOURCE/LOCAL PASS at `e34017bc`: 45 placement, 20 critical cross-browser, all broad and reproducibility gates pass; PR/CI, backend verification, and separately approved Worker replacement remain pending |
| Lifecycle continuity | One natural daily reconciliation completed without identity drift/conflict | PENDING |
| Canary 2 | Repeat the same fresh-session canary after lifecycle reconciliation | PENDING |
| Sentry alerts | `identity-conflict` first event and other three health types at 10 events / 5 minutes to maintainer email | PENDING EXPLICIT APPROVAL; current read-only org token returned HTTP 401 and no rule was changed |
| Final wiki state | Commit, CI, deployment, runtime hash, both canaries, lifecycle, and alert evidence recorded; status changed to Production verified | PENDING |

For every live visible badge, record the exact Product ID on slot and inner
badge, exact title adjacency, expected rating/count, one owned slot, zero badge
in header/nav/footer/cart/banner, and no unexpected console/widget-error event.

## Rollback Boundary

- First disable the affected store's existing Badge toggle.
- For runtime regressions, roll the Worker only to the known-safe PR #35/#36
  runtime retained by the build contract. Before the quick-view follow-up, the
  exact safe Worker version is `e83a40d3-5ea9-4707-b12d-a5d7ec2a9bc6`.
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
