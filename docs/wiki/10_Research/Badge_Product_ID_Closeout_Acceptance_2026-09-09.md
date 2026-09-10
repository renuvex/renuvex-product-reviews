---
type: research
project: renuvex-product-reviews
status: active
created: 2026-09-09
updated: 2026-09-10
last_verified: 2026-09-10
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

This is the single acceptance ledger for the Badge Product ID closeout. PR #40
merged the bound-modal lifetime fix as main `559a7d4b`; PR and main CI, exact
Vercel deployment, separately approved Worker deployment, runtime hashes, and
the complete first desktop/mobile canary now pass. The former `~14.48 s`
quick-view disappearance is resolved: the exact Product ID badge remained
bound for 94 seconds on desktop and beyond the former TTL plus an internal
modal interaction at `412x915`. Keep this record open until one natural Product
Lifecycle reconciliation, Canary 2, and Sentry alert delivery verification all
pass.

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
| Quick-view generation follow-up | PR #39; implementation `e34017bc`, docs `c4f3edbd`, merge `81068849`; deployed to Vercel and Worker |
| PR #39 runtime | `widget-runtime/runtime-U5U3V66L.js`, SHA-256 `d9ff0341bffc3bbfa2b0064a67a149bc13feaea477e050b9e73dc313b339ee8c` |
| Bound-modal lifetime follow-up | PR #40; implementation `0705f819`; Playwright fixture teardown `0851bd58`; documentation `e3da31d9`; merged as `559a7d4be329911c255213cf9e16c17a7c5a4777` |
| Current live runtime | `widget-runtime/runtime-NTBNXPCD.js`, SHA-256 `255893670c8ec36517802fa32e12feb1a609d96358bf98f43c92af4218ed9e35`; stable SHA-256 `8574dffac188277751ef435d17c6dd15c7acce3b0382fd4b304fe65e25b526e4`; loader SHA-256 `1cc976dbebbc9238ac894a2c2c37ad6743178da88ffb6fcbf1006a2941b2c998`; manifest SHA-256 `e0ad4ed5dee8bce5271eca8dc3f11457970b6d3dc8c15575bd8962fab14a8f94` |
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
fail-closed. The 10-second modal timeout limits only discovery before an exact
modal binds. A bound modal remains authorized only through continuous exact
DOM and Product ID proof validation; elapsed time or a non-link interaction
inside that same modal is not an identity invalidation.

## Local And CI Evidence

PR #37 established the full closeout baseline and PR #39 established strict
same-ID generation continuity. The bound-modal lifetime follow-up reran the
risk-focused and broad local gates below before PR.

| Gate | Result |
|---|---|
| Widget build | PASS; CI/production-origin manifest entry `runtime-47TOVECU.js` |
| Focused public API/health/static units | PASS, 79 tests |
| Full unit suite | PASS, 124 files / 822 tests |
| Widget network smoke | PASS, 37 tests |
| Widget runtime smoke | PASS, 62 tests |
| Widget interactions | PASS, 39 tests |
| Admin preview smoke | PASS, 6 tests |
| Full placement capability | PASS; `49/49`, including bound-modal TTL survival, unbound discovery expiry, internal interaction, and disconnected-source retirement |
| Five-browser critical matrix | PASS; one aggregate command completed `20/20` with clean `exit 0` across Chromium, Firefox, desktop WebKit, Pixel Android, and iPhone WebKit after commit `0851bd58` removed redundant explicit page closure and left teardown to the Playwright fixture. |
| Performance budget | PASS with production origins; always-loaded `84,844 / 85,000`, listing-badges `72,218 / 75,000`, rating-badge `64,961 / 65,000` bytes; all other limits passed |
| Worker contract | PASS, 11 tests; types generated; Wrangler deploy dry-run passed without deployment |
| Typecheck / lint | PASS; TypeScript clean, ESLint 0 errors with 7 pre-existing React warnings |
| Generated drift | PASS; `build:widget:ci` reproduced the committed runtime with zero drift |
| Application build | PASS; migration-free Next.js 16.2.1 `build:ci` completed |
| Wiki audit | PASS with 0 errors; 25 repository-health warnings remain outside this closeout |
| PR/main CI | PASS for merged work; PR #37 Quality Gate `34380648250`, Database Compatibility `34380648240`, PR #38 browser gate `34385396805`, and final main Quality Gate `34389119540` all passed |
| Bound-modal lifetime broad gates | PASS at `0705f819`: full unit `124` files / `822/822`; network `37/37`; runtime `62/62`; interactions `39/39`; admin preview `6/6`; TypeScript; lint with `0` errors and `7` pre-existing warnings; codegen and generated widget drift zero; Worker `11/11` contract/types/dry-run; budget; `build:widget:ci`; full Next.js 16.2.1 `build:ci`; and wiki audit with `0` errors / `25` unrelated repository-health warnings. A later combined high-load local rerun timed out two unrelated 5-second unit cases; both immediately passed targeted `10/10`, so this runner fluctuation is recorded rather than hidden. PR #40 run `34425217861` passed all 12 jobs; main run `34425766672` passed the exact merge SHA. |

## Backend-First Production Evidence

PR #37 merged on 2026-09-09. Its linked Vercel production deployment
`dpl_Ty2ktp2Ug2HsqBs7WQwXwAWipqoQ` reached `READY` for the exact merge commit
`f70bd7c4fab69af9d084e06d1a57b5250aed7349` and assigned the
`https://app.renuvex.app` alias. The previous backend rollback boundary remains
deployment `dpl_CvrfYUUR1iwNFLAPY3B6QeYwswUA` at `a602db8d`.

PR #38 then merged at `6f3b169d5921f1bd13dae7626fb4975e2cc00465`.
Production deployment `dpl_HW1RreoWvKou1QWcQDr6LJcBECzK` reached `READY` for
that exact commit at the time of the first rollout.

PR #39 then merged as
`81068849af30eb1357a3fcd291890d37917b188e`. Main Quality Gate
`34401732146` passed, and Vercel production deployment
`dpl_FEZcU1VLA1YzedHp6vRQWWNbnVZF` reached `READY` for that exact commit and
the `https://app.renuvex.app` alias. Origin and Worker slug probes remained
identical and retained `Cache-Control: no-store` plus Worker
`X-Renuvex-Edge-Cache: BYPASS` for reviewed and zero-review products.

PR #40 merged as
`559a7d4be329911c255213cf9e16c17a7c5a4777`. PR Quality Gate run
`34425217861` passed all 12 jobs, and main run `34425766672` passed the exact
merge SHA. Vercel production deployment
`dpl_gm1mn5TsUdvmJyvHitv3gnhoEuYh` reached `READY` and `PROMOTED` for that
commit on `https://app.renuvex.app`. Post-deploy origin and Worker probes again
returned identical Product ID-bearing bodies; origin and Worker were
`no-store`, and the Worker remained `X-Renuvex-Edge-Cache: BYPASS`.

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

### PR #39 Worker rollout and lifetime diagnostic

After separate approval, PR #39 runtime `runtime-U5U3V66L.js` was deployed as
Worker version `fcb63b3a-eeab-4c19-ad7f-5112b3c95f08` at 100% traffic. Its
immutable SHA-256 was
`d9ff0341bffc3bbfa2b0064a67a149bc13feaea477e050b9e73dc313b339ee8c`;
stable runtime SHA-256 was
`977a7bfccf575d36c97579525ea162a7ae28a681add2c146513b3f243f7080ff`;
loader SHA-256 was
`afdbb96b30ecbb5a7617fbc2ef8da4d9a4f41ae6027ac53dd4691fc51ed7e772`.
The PR #35/#36 rollback version remains
`e83a40d3-5ea9-4707-b12d-a5d7ec2a9bc6`.

Fresh live evidence after that rollout:

- Category: nine visible listing badges; every slot and inner badge carried the
  same non-empty Product ID; zero mismatches, duplicate direct slots,
  placeholders, or forbidden placements.
- PDP `/premium-shortsg`: exactly one title-adjacent slot/badge carrying Product
  ID `37fb6e3d-6085-4ac1-b0eb-7aaa63ada934` and `4.0 (93 yorum)`; zero forbidden
  slots.
- Quick-view: the same Product ID and rating initially appeared, then the badge
  disappeared while the visible modal stayed open.

A headless production diagnostic observed the modal at about `133 ms`, added
the correct slot at about `460 ms`, and removed it at about `14,482 ms`. The
modal node, title node, exact title, link, and Product ID remained unchanged.
A widget-error request followed removal. This isolated the remaining cause to
the 10-second modal discovery TTL being applied to an already bound modal when
a later natural DOM mutation invoked reconciliation. It was not title-node
replacement, slug identity, or Product ID mismatch.

Commit `0705f819` changes the timeout to pre-bind discovery only and preserves
non-link interaction inside the exact bound modal. PR #40 merged and deployed
that source through the backend and the separately approved Worker rollout
below.

### PR #40 Worker rollout and Canary 1

After explicit approval, `pnpm worker:widget:deploy` completed with exit `0`
and moved 100% of Worker traffic to version
`b7e942eb-c638-422f-8e8b-51afffaba4ba` in deployment
`b5a4945b-622f-4dce-a046-7ab3ac44bc64`. Live `widget.js`, stable runtime,
immutable runtime, and manifest hashes matched the merged artifacts. The
retained PR #35/#36 rollback version remains
`e83a40d3-5ea9-4707-b12d-a5d7ec2a9bc6`; no rollback was required.

Fresh Canary 1 evidence:

- Desktop category: nine visible listing badges, zero missing or mismatched
  Product IDs, zero forbidden slots, and no console warnings/errors. One
  `/ratings` request batched all 12 event Product IDs; quick-view reused that
  identity/cache and emitted no `widget-error` request.
- Desktop PDP `/premium-shortsg`: one title-adjacent
  `product-title-rating` slot and inner badge, both carrying Product ID
  `37fb6e3d-6085-4ac1-b0eb-7aaa63ada934` and `4.0/93`; zero forbidden slots
  and no console warning/error.
- Desktop homepage scroll/slider/infinite-scroll: 29 visible badges in the
  interactive check and 23 in a separate network run; every visible slot and
  inner badge had matching Product IDs. ID-less Ozy cards caused exactly one
  bulk `/ratings-by-slug` discovery request, then rendered Product ID-bound
  badges. No per-card request or `widget-error` request occurred.
- Desktop search for `Premium`: one visible result badge with the same Product
  ID and `4.0/93`, zero missing/mismatched/forbidden slots, and no console
  warning/error.
- Desktop quick-view: one exact `h1.product-name` modal slot retained that
  Product ID and rating at 31 seconds and 94 seconds, including after a
  non-link interaction inside the modal. The route remained the category URL
  and no duplicate slot or console warning/error appeared.
- Fresh mobile Chromium at a measured `412x915`: category badges had zero
  missing/mismatched IDs; quick-view retained one exact Product ID slot at
  initial bind, 17 seconds, and after an internal title click; closing the
  modal left zero visible modal and zero retained modal slots. Mobile PDP,
  homepage scroll/infinite-scroll, and `Premium` search also passed with exact
  Product IDs and no widget request failure, page exception, forbidden slot,
  or `widget-error` request.
- The mobile run observed a separate HTTP 404 for Ikas theme asset
  `cdn.myikas.com/.../image_180.webp` and aborted Ikas `sendEventV2` requests
  during navigation. Neither originated from Renuvex or affected badge/API
  behavior; they are recorded rather than misreported as widget errors.

The local Sentry read-only check could not inspect event tags because the
configured organization token returned HTTP `401 Invalid org token`. No Sentry
rule or project setting was mutated.

## Production Gates

| Gate | Required evidence | Status |
|---|---|---|
| Backend deploy | Closeout commit and Vercel deployment ID | PASS through PR #40/main `559a7d4b`; Vercel `dpl_gm1mn5TsUdvmJyvHitv3gnhoEuYh` is `READY` and `PROMOTED` for the exact merge SHA. |
| Origin slug API | Product ID-bearing and zero-review responses; `no-store`; old-runtime compatibility | PASS |
| Worker pre-runtime check | Same body through read origin; `X-Renuvex-Edge-Cache: BYPASS`; no HIT | PASS |
| First Worker runtime deploy | Approved deployment/version and immutable runtime hash | PASS; version `a025a9a4-216d-470b-b67c-9167d58f538a`, deployment `5c297724-18c4-46b3-8420-9614662f446b`, runtime SHA-256 recorded above |
| Final lifetime Worker deploy | Approved deployment/version and exact merged runtime hash | PASS; version `b7e942eb-c638-422f-8e8b-51afffaba4ba`, deployment `b5a4945b-622f-4dce-a046-7ab3ac44bc64`, immutable SHA-256 `255893670c8ec36517802fa32e12feb1a609d96358bf98f43c92af4218ed9e35` |
| Canary 1 | Fresh desktop/mobile PDP `/premium-shortsg`, category `/clothing`, homepage scroll, search, slider/infinite-scroll, and quick-view DOM/network/console evidence | PASS; desktop and measured `412x915` mobile checks passed. Quick-view remained exact and single beyond the former TTL and after an internal interaction; close cleanup passed. Widget/API network was batched and error-free. One unrelated missing Ikas theme image is recorded above. |
| Quick-view generation follow-up | Exact same-target/same-Product-ID generation rebinding, regression tests, PR/CI, backend and Worker rollout | DEPLOYED through PR #39/main `81068849`, Vercel `dpl_FEZcU1VLA1YzedHp6vRQWWNbnVZF`, Worker `fcb63b3a-eeab-4c19-ad7f-5112b3c95f08`; initial badge placement passed and exposed the separate bound-lifetime issue. |
| Bound-modal lifetime follow-up | Discovery TTL is pre-bind only; bound modal survives elapsed time/internal interactions; changed/disconnected identity still retires | DEPLOYED/PASS through PR #40, exact main/Vercel verification, Worker version `b7e942eb-c638-422f-8e8b-51afffaba4ba`, and Canary 1. |
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
