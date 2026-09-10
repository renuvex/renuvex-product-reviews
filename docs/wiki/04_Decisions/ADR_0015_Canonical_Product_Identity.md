---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-17
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - adr
  - product-identity
  - widget
  - ikas
related:
  - "[[Decision_Index]]"
  - "[[ADR_0003_Review_Data_Model]]"
  - "[[Ikas_Storefront_Events]]"
  - "[[Listing_Rating_Widget]]"
  - "[[ADR_0037_Product_Lifecycle_Evidence_And_Tombstones]]"
  - "[[Badge_Product_ID_Closeout_Acceptance_2026-09-09]]"
  - "[[Bug_Quick_View_Badge_Listing_Generation_Rollover]]"
source_files:
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/app/api/webhooks/ikas/products/route.ts"
  - "src/app/api/admin/sync-products/route.ts"
  - "src/app/api/oauth/callback/ikas/route.ts"
  - "src/lib/product-snapshots.ts"
  - "src/lib/product-reconciliation.ts"
  - "src/widget/core/storefront-context.js"
  - "src/widget/placement/capability.js"
  - "src/widget/listing-badges/index.js"
  - "src/widget/listing-badges/ratings.js"
  - "prisma/models/product-lifecycle.prisma"
---

# ADR_0015 - Canonical Product Identity

## Agent Brief

The only review identity is `(storeId, productId)`. A listing card slug may be
used once to discover a Product ID when the current Ikas event omitted it, but
the slug is never a review join key, rating-cache key, or visible badge
identity. A visible PDP, listing, or quick-view badge and its owned slot must
carry the same non-empty `data-renuvex-product-id`; unresolved, stale,
conflicting, or malformed identity produces no badge.

## Status
Accepted

The canonical identity decision is merged and live. PR #39's strict
same-target/same-Product-ID generation fix is also merged and deployed through
`origin/main` `81068849`, but its live canary exposed a second quick-view
availability issue: the correct badge was removed after the modal-discovery TTL
even though the bound modal and title were unchanged. Source commit `0705f819`
limits that TTL to pre-bind discovery and is locally verified. Production
closeout remains open until this follow-up passes PR/CI, approved Worker
rollout, both canaries, lifecycle continuity, and Sentry alert verification.

## Date
2026-05-17

## Context
Reviews are product-scoped. The database already stores the stable ikas product
UUID in `Review.productId`, but listing badges previously resolved reviews by
`Review.slug`. That made listing/search badges depend on a merchant-editable SEO
slug. If a product slug changed, PDP reviews still worked because they queried by
`productId`, while listing badges queried the new slug against old review rows and
showed no rating.

The 2026-05-17 dev-store runtime check confirmed that ikas Storefront Events
listing/search payloads carry stable product ids in `productDetails[].id`.
Official ikas docs also show `PRODUCT_VIEW.data.productDetail.id` as the product
identity field.

## Decision
The canonical review product identity is:

```text
(storeId, productId)
```

Where:
- `storeId` is the merchant/store identifier used throughout this app.
- `productId` is the ikas product UUID.
- `slug` and `productName` are denormalized display/search snapshots only. They
  must not be used as the primary join key for review reads when `productId` is
  available.

Listing/search badges use the canonical path:
1. `core/storefront-context.js` atomically replaces the current
   `VIEW_LISTING`/`VIEW_SEARCH_RESULTS` map and increments its generation. The
   same slug plus the same Product ID is valid; the same slug plus different or
   malformed Product IDs is an identity conflict.
2. `placement/capability.js` first creates an exact DOM placement candidate.
   Event-backed candidates use their current-generation Product ID. ID-less
   candidates carry only a one-shot slug discovery input.
3. `listing-badges/ratings.js` reads event-backed products through
   `/api/public/ratings?productIds=...`. The slug endpoint returns the resolved
   Product ID with its rating summary.
4. After the response, the runtime revalidates epoch, event generation,
   adapter, container, exact link/href slug, title, and mount point. Only then
   does it promote the candidate to an immutable Product ID proof and mutate
   the DOM.
5. Both public endpoints read rating summaries only by `productId`; neither
   path queries `Review.slug`.

Quick-view seals the clicked Product ID from a valid resolved proof, or from the
current event-backed candidate while that proof is still loading. If a
same-route listing event advances the generation while the modal is open, the
context may rebind only when the adapter, epoch, exact container/card/link/href,
slug, title, and mount target are unchanged, the replacement proof is valid,
and its Product ID equals the sealed clicked Product ID. A generation change
without a sealed Product ID, or any changed/conflicting Product ID, fails
closed. A resolver may still finish within the original generation and seal its
promoted Product ID.

The 10-second modal-discovery TTL applies only while no exact modal has bound to
the click context. Once one strict modal/title instance binds, elapsed time is
not an identity signal: the context remains valid only while the exact
adapter/epoch/card/link/href/title/mount and sealed Product ID proof continue to
validate. A non-link interaction inside that same bound modal preserves the
context; an outside click, changed navigation link, disconnected source card,
hidden/closed/replaced/retitled modal, duplicate visible modal, changed target,
or changed Product ID retires it and removes its owned badge.

The backward-compatible `/api/public/ratings-by-slug` endpoint remains only as
a discovery fallback for DOM-only paths where Ikas Events did not provide
Product IDs. Its successful shape is
`{ data: { [slug]: { productId, avg, count } } }`. A safely resolved product
with no approved reviews still returns its Product ID with `avg: "0.0"` and
`count: 0`; this proves identity without authorizing a visible badge. Missing,
stale, unknown, tombstoned, conflicting, or installation-mismatched evidence
omits that slug entirely.

`ProductSnapshot` evidence is maintained by bounded install/manual/daily
reconciliation and exact provider reads after ikas product webhook wakeups.
Deletion creates a tombstone; a tombstoned id that reappears becomes
`identity_conflict`. See
[[ADR_0037_Product_Lifecycle_Evidence_And_Tombstones]] for the lifecycle and
rollout gates that supersede the old direct-slug fallback decision.

## Reasoning
Product ids are the strongest available provider identifier; slugs are mutable.
Ikas does not publish an id-reuse guarantee, so a tombstoned id that reappears
is treated as conflict rather than automatically reactivated. Using slugs as
identity makes review visibility depend on unrelated SEO edits. Keeping
`(storeId, productId)` as the read key matches the PDP path and avoids a
destructive review data migration because existing reviews already carry
`productId`.

Keeping `slug` and `productName` as snapshots preserves useful admin/display
context and backward-compatible DOM fallback behavior, without letting mutable
fields define identity.

## Alternatives Considered
- **Continue slug-based listing reads** - rejected. This keeps the root cause and
  only works while merchants never rename slugs.
- **Rewrite old review slugs on slug change** - rejected as the primary strategy.
  It treats the symptom, still uses a mutable field as identity, and requires
  perfect webhook/backfill behavior.
- **Add a Product read model before changing the widget** - sequenced after the
  widget product-id path. The read model is now implemented as the completeness
  layer for DOM-only fallback and product name/slug freshness.

## Consequences
- New listing/search badge reads are robust to future slug renames when ikas
  Storefront Events provide `productDetails[].id`.
- The public API now has a product-id bulk endpoint with the same short edge cache
  policy as other public read routes.
- `Review` has a new `[storeId, productId, status]` index to cover the hot
  product-id rating lookup.
- DOM-only listing fallback resolves a slug only through one fresh
  `active_verified` snapshot. Missing, stale, unknown, or conflicting evidence
  returns no rating rather than attaching historical reviews by slug.
- Session rating cache entries live under
  `renuvex_pr_ratings_v3_<storeId>`, are keyed only by Product ID, and expire
  independently after five minutes. The runtime neither reads/migrates the v2
  slug cache nor persists slug-to-ID mappings.
- A successful unresolved proof is suppressed for five minutes only on the
  same live DOM candidate. HTTP, 429, 5xx, malformed-response, and network
  failures remain retryable on a later meaningful event or mutation.
- Visible badge ownership is auditable in the DOM: its Renuvex slot and inner
  badge carry an identical `data-renuvex-product-id`.
- Quick-view continuity across a listing-generation refresh is identity-bound,
  not slug-bound: only an exact unchanged target with the already sealed same
  Product ID may survive the refresh.
- Quick-view discovery timeout is not a bound-modal lifetime. Once the exact
  modal is attested, continued ownership depends on live DOM and Product ID
  proof validation rather than elapsed wall-clock time.
- The local `ProductSnapshot` table is lifecycle evidence. Ikas remains the
  current-product source of truth; webhook misses converge through DB-owned
  reconciliation rather than a request-scoped full backfill.
- Install-time work creates/reuses an installation-fenced run after the OAuth
  callback response and publishes only its opaque id. Catalog pages are handled
  by bounded QStash continuations; scheduled sweeps recover accepted DB work
  after a dispatch/runtime interruption.
- Reviews remain product-level, not variant-level. `ikasVariantId` is not part of
  the review identity unless a future product requirement explicitly changes the
  domain model.

## Related Source Files
- [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)
- [src/app/api/webhooks/ikas/products/route.ts](src/app/api/webhooks/ikas/products/route.ts)
- [src/app/api/admin/sync-products/route.ts](src/app/api/admin/sync-products/route.ts)
- [src/lib/product-snapshots.ts](src/lib/product-snapshots.ts)
- [src/widget/core/storefront-context.js](src/widget/core/storefront-context.js)
- [src/widget/core/state.js](src/widget/core/state.js)
- [src/widget/placement/capability.js](src/widget/placement/capability.js)
- [src/widget/listing-badges/ratings.js](src/widget/listing-badges/ratings.js)
- [src/widget/listing-badges/index.js](src/widget/listing-badges/index.js)
- [prisma/models/reviews.prisma](prisma/models/reviews.prisma)
- [prisma/migrations/20260517120000_add_review_product_status_index/migration.sql](prisma/migrations/20260517120000_add_review_product_status_index/migration.sql)
- [prisma/migrations/20260517133000_add_product_snapshot/migration.sql](prisma/migrations/20260517133000_add_product_snapshot/migration.sql)

## Related Notes
- [[Decision_Index]]
- [[ADR_0003_Review_Data_Model]]
- [[Ikas_Storefront_Events]]
- [[Listing_Rating_Widget]]
