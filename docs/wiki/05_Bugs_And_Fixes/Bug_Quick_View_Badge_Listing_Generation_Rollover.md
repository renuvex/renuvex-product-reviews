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

## Status

Resolved and live-verified on desktop and mobile on 2026-09-10. The broader
Product ID closeout gates remain in the linked acceptance record.

## Agent Brief

The first live Product ID runtime canary exposed a same-route listing-generation
availability failure, and the next canary exposed discovery TTL revoking an
unchanged bound modal at about `14.48 s`. PR #39 fixed the generation boundary;
PR #40 merged commit `0705f819`, which makes TTL expiry pre-bind only. Approved
Worker version `b7e942eb-c638-422f-8e8b-51afffaba4ba` is live. Desktop and
`412x915` canaries retained exactly one correctly Product ID-bound quick-view
badge beyond the former TTL and after internal interaction, then removed the
slot on close. This bug is resolved; the broader Product ID rollout record
still owns lifecycle, Canary 2, and Sentry alert gates.

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

## Production Resolution Evidence

PR #40 merged the fix as main
`559a7d4be329911c255213cf9e16c17a7c5a4777`; PR run `34425217861` and main run
`34425766672` passed. Vercel deployment
`dpl_gm1mn5TsUdvmJyvHitv3gnhoEuYh` is `READY/PROMOTED`. After separate
approval, Worker deployment `b5a4945b-622f-4dce-a046-7ab3ac44bc64` moved 100%
traffic to version `b7e942eb-c638-422f-8e8b-51afffaba4ba`, serving
`widget-runtime/runtime-NTBNXPCD.js` with SHA-256
`255893670c8ec36517802fa32e12feb1a609d96358bf98f43c92af4218ed9e35`.

Desktop quick-view retained one exact title-adjacent slot and badge with
Product ID `37fb6e3d-6085-4ac1-b0eb-7aaa63ada934` at 31 and 94 seconds. A fresh
`412x915` mobile run passed initial bind, 17 seconds, an internal title click,
and modal-close cleanup with zero duplicate/forbidden slot, widget request
failure, page exception, or `widget-error` request. The unrelated missing Ikas
theme image recorded by the mobile browser is not a Renuvex runtime failure.
