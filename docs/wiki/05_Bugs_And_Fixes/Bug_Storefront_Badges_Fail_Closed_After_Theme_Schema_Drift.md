---
type: bug
project: renuvex-product-reviews
status: active
created: 2026-08-09
updated: 2026-09-10
last_verified: 2026-09-08
confidence: high
tags:
  - bug
  - widget
  - storefront
  - badge
  - theme-adapter
  - ikas
related:
  - "[[Bug_Index]]"
  - "[[Current_Status]]"
  - "[[Ikas_Theme_Limitations]]"
  - "[[Product_Rating_Badge]]"
  - "[[Listing_Rating_Widget]]"
  - "[[ADR_0038_Runtime_Attested_Storefront_Placement]]"
  - "[[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]"
source_files:
  - "src/lib/storefront-theme.ts"
  - "src/app/api/public/settings/route.ts"
  - "src/widget/themes/current-adapter.js"
  - "src/widget/themes/ozy/adapter.js"
  - "src/widget/placement/capability.js"
  - "src/widget/rating-badge/index.js"
  - "src/widget/listing-badges/index.js"
  - "tests/widget-placement-capability.spec.ts"
---

# Bug - Storefront Badges Fail Closed After Theme Schema Drift

## Status

Fixed and live-verified for Ozy badge availability. Product ID propagation is
deployed and Canary 1 passed; the remaining closeout gates are tracked in
[[Badge_Product_ID_Closeout_Acceptance_2026-09-09]].

## Agent Brief

Ikas removed the active-theme fields that had selected the Ozy adapter. The
security response correctly failed closed but temporarily removed automatic
PDP/listing badge availability. PR #35 restored supported Ozy placement through
strict runtime attestation rather than stale metadata or broad selectors; PR
#36 fixed proof-scoped request dedupe. Live Ozy PDP/category/home checks passed.
Unknown or ambiguous themes still fail closed.

## Symptoms

Read-only dev-store checks on 2026-08-09 found healthy script injection,
canonical PDP Product ID, exact rating data, and explicit review rendering, but
zero automatic PDP, category, homepage, or slider badge slots. Public settings
reported `generic_unknown`, `autoPlacementEnabled: false`, and
`reviewsMountEnabled: true`.

## Root Cause

The live Ikas v1/v2 `Storefront` schema no longer exposed the active-theme
fields used by the original provider allowlist. Historical theme metadata could
not safely prove the current DOM, and Product Lifecycle reconciliation could not
recreate provider fields that no longer existed. Disabling automatic placement
was correct for integrity but incomplete for feature availability.

## Fix

PR #35 (`b18c0e08d00c480b6006d7e8cbca031df7188aca`) introduced the versioned
`placementPolicy` and one strict runtime-detectable Ozy adapter. Policy chooses
an adapter strategy only; exact PDP/card/modal title and mount proofs are still
required before requests and mutation. Generic, unknown, ambiguous, stale, and
broad-selector paths remain no-ops. PR #36
(`cac45aec64b57b087089f1792f0add50238619f2`) tied duplicate suppression to the
exact candidate so slider/style mutations do not fan out reads.

The combined baseline is present in `origin/main` `a602db8d`. Live Ozy PDP,
category, and homepage placement was verified on 2026-09-08.

## Product ID Follow-Up

The availability fix initially left one narrower gap: an ID-less strict
homepage/slider card could resolve rating data by lifecycle-safe slug without
propagating the discovered Product ID into the visible badge DOM. The
2026-09-09 closeout changes the endpoint and runtime so slug is one-shot
discovery only and every visible badge is Product ID-backed. That follow-up is
not Production-verified until the separate acceptance record closes.

## Prevention

- Provider schema drift must pass both fail-closed safety and live feature
  availability acceptance.
- Ozy is the only runtime-detectable adapter until another theme has bounded
  signatures, negative fixtures, browser coverage, and a live canary.
- Product identity and DOM placement remain independent proofs; neither slug nor
  title text may bridge the other boundary.
- A runtime change is not closed by local/CI tests alone. Origin, Worker,
  immutable hash, live DOM/network, lifecycle continuity, and alerting evidence
  are required.

## Related Notes

- [[ADR_0038_Runtime_Attested_Storefront_Placement]]
- [[ADR_0015_Canonical_Product_Identity]]
- [[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]
