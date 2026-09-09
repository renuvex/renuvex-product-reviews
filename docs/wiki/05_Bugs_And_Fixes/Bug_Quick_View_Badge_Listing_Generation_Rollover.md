---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-09-09
updated: 2026-09-09
last_verified: 2026-09-09
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

# Bug - Quick-view badge lost on listing generation rollover

## Agent Brief

The first live Product ID runtime canary opened the real Ozy quick-view modal
from an already attested product card, but no quick-view badge appeared. The
runtime stayed fail-closed and did not place a wrong badge. Ozy emitted a
same-route listing event that re-attested the exact clicked link under a new
generation; the modal context still required the old generation. The local fix
allows rebinding only for the exact unchanged target and an already sealed
identical Product ID. It is not production-closed until the follow-up Worker
runtime and live modal canary pass.

## Symptom

On `https://dev-mertcopper.ikas.shop/clothing`, clicking an exact attested Ozy
product card opened one visible `.add-to-basket-modal` with the matching strict
`h1.product-name`. After six seconds the modal contained no Renuvex listing
rating slot. The listing badge remained correct, there was no wrong-product
badge, and no unexpected browser console error was observed.

## Root Cause

`VIEW_LISTING` advances `renuvexPrListingGeneration` and atomically replaces the
current attestation map. The card click captured the prior exact candidate and
generation. During modal opening, Ozy emitted another same-route listing event
for the same link and Product ID, producing a valid replacement proof under the
new generation. `resolveModalPlacementProof()` required full candidate equality,
including the old generation, so the valid replacement could never authorize
the modal. This was an availability failure caused by an intentionally strict
stale-proof guard, not slug-based identity or wrong-product placement.

## Fix

The click context now seals Product ID from the current valid resolved proof, or
from the current event-backed candidate while its proof is loading. Candidate
comparison is split into exact target equality and generation equality. A modal
context may adopt a newer candidate only when adapter, epoch, exact
container/card/link/href/slug/title/mount references are unchanged, the newer
proof validates, and its Product ID equals the sealed clicked Product ID.

A generation change with no sealed ID, a changed/conflicting Product ID, a
recycled link/card, or any changed target remains fail-closed. Resolver-in-flight
quick-view within the original generation remains supported and seals the ID
only after safe promotion.

## Verification

- A pre-fix regression that emits the same Product ID in a new listing
  generation after click failed with zero modal slots; it passes after the fix.
- A lifecycle slug-resolved card followed by same-link event-ID enrichment
  receives the exact Product ID-stamped modal badge.
- A different Product ID generation updates the listing badge but leaves the
  already opened modal without a badge.
- Full placement capability suite: 45 passed.
- Critical five-browser matrix: 20 passed across Chromium desktop, Firefox
  desktop, WebKit desktop, Pixel Android, and iPhone WebKit.
- Widget artifact budgets pass; the rating-badge graph is `64,939 / 65,000`
  bytes.

## Open Production Gates

The fix is source-only on `codex/badge-quick-view-closeout`. It still requires
PR/CI, automatic backend deployment verification, separately approved Worker
deployment, and a fresh live Ozy quick-view canary. Keep this bug `active` until
the modal displays exactly one slot and badge carrying the same non-empty
Product ID as the clicked card, with exact title adjacency and no forbidden
surface placement or unexpected console/widget-error signal.
