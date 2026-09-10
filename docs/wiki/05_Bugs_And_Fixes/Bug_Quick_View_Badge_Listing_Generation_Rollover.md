---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-09-09
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - bug
  - widget
  - listing-badge
  - quick-view
  - product-identity
related:
  - "[[Bug_Index]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[ADR_0038_Runtime_Attested_Storefront_Placement]]"
  - "[[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]"
source_files:
  - "src/widget/placement/capability.js"
  - "tests/widget-placement-capability.spec.ts"
  - "tests/widget-product-id-cross-browser.spec.ts"
---

# Bug - Quick-view badge lost across generation and modal lifetime

## Agent Brief

The first live Product ID runtime canary exposed a same-route listing-generation
availability failure. PR #39 fixed, merged, and deployed that boundary. The
next real Ozy canary then proved the correct Product ID badge mounted, but it
disappeared while the same modal remained open. Instrumentation showed the
badge mounted at about `460 ms`, the exact modal/title nodes never changed, and
the slot was removed at about `14.48 s` after the 10-second discovery TTL was
re-evaluated on a later mutation. Commit `0705f819` makes TTL expiry pre-bind
only. The bug remains active until the replacement Worker and live modal
lifetime canary pass.

## Symptom

On `https://dev-mertcopper.ikas.shop/clothing`, clicking an exact attested Ozy
product card opened one visible `.add-to-basket-modal` with the matching strict
`h1.product-name`. Before PR #39, same-route event replacement left the modal
safely blank. After PR #39 and Worker version
`fcb63b3a-eeab-4c19-ad7f-5112b3c95f08`, the modal received the correct Product
ID badge and rating, then lost the slot while remaining visibly open. No wrong
Product ID was displayed.

## Root Cause

There were two sequential availability causes:

1. `VIEW_LISTING` advanced `renuvexPrListingGeneration` and atomically replaced
   the clicked link's attestation. The old resolver required generation
   equality even when the exact target and sealed Product ID were unchanged.
   PR #39 fixed this with strict same-target/same-ID rebinding.
2. `reconcileModalPlacementContext()` applied one 10-second TTL to both modal
   discovery and an already bound modal. Production instrumentation assigned
   stable node identities to the modal and title, observed the correct slot at
   about `460 ms`, and observed its removal at about `14.48 s` immediately
   after a later natural mutation. The modal/title identities and Product ID
   had not changed. The TTL therefore revoked valid placement based only on
   elapsed time.

Neither cause was slug identity or wrong-product placement; both failed closed
as availability loss.

## Fix

PR #39 made the click context seal Product ID from the current valid resolved
proof, or from the current event-backed candidate while its proof is loading.
Candidate comparison is split into exact target equality and generation
equality. A modal context may adopt a newer candidate only when adapter, epoch,
exact container/card/link/href/slug/title/mount references are unchanged, the
newer proof validates, and its Product ID equals the sealed clicked Product ID.

Commit `0705f819` separates strict DOM-target validation from current listing
generation validation. The 10-second timeout now applies only while no exact
modal has bound. A bound modal remains valid through elapsed time and non-link
interactions inside that same modal, but every mutation still revalidates the
adapter, epoch, source card/link/href/title/mount, exact modal/title, and Product
ID proof.

A generation change with no sealed ID, a changed/conflicting Product ID, a
recycled or disconnected link/card, an outside/unattested click, a hidden,
closed, replaced, retitled, or duplicate modal, or any changed target remains
fail-closed. Resolver-in-flight quick-view within the original generation
remains supported and seals the ID only after safe promotion.

## Verification

- A pre-fix regression that emits the same Product ID in a new listing
  generation after click failed with zero modal slots; it passes after the fix.
- A lifecycle slug-resolved card followed by same-link event-ID enrichment
  receives the exact Product ID-stamped modal badge.
- A different Product ID generation updates the listing badge but leaves the
  already opened modal without a badge.
- Full placement capability suite: `49/49`, including bound-modal TTL survival,
  unbound discovery expiry, internal-modal interaction, and disconnected source
  retirement.
- Critical five-browser matrix: one aggregate command completed `20/20` with
  clean `exit 0` for Chromium desktop, Firefox desktop, WebKit desktop, Pixel
  Android, and iPhone WebKit after test-only commit `0851bd58` delegated page
  closure to the Playwright fixture.
- Full unit suite: `124` files / `822/822`; two unrelated 5-second tests that
  later timed out under a combined high-load rerun passed targeted `10/10`.
- Widget network `37/37`, runtime `62/62`, interactions `39/39`, and admin
  preview `6/6` passed.
- TypeScript, lint (`0` errors, `7` pre-existing warnings), codegen, generated
  drift, `build:widget:ci`, Next.js `build:ci`, Worker `11/11` contract/types/dry
  run, and artifact budgets pass. Rating-badge graph is `64,961 / 65,000` bytes.

## Open Production Gates

PR #39 (`e34017bc`, merged as `81068849`) and its Vercel/Worker rollout are
complete. The modal-lifetime fix is commit `0705f819` on
`codex/badge-quick-view-lifetime`, with candidate runtime
`widget-runtime/runtime-NTBNXPCD.js` and SHA-256
`255893670c8ec36517802fa32e12feb1a609d96358bf98f43c92af4218ed9e35`.
It still requires PR/CI, automatic backend deployment verification, separately
approved Worker deployment, and a fresh live Ozy quick-view lifetime canary.
Keep this bug `active` until the modal keeps exactly one slot and badge carrying
the same non-empty Product ID as the clicked card beyond the former TTL, with
exact title adjacency and no forbidden placement or unexpected
console/widget-error signal.
