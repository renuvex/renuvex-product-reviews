---
type: decision
project: ikas-review-app
status: active
created: 2026-05-17
updated: 2026-05-17
last_verified: 2026-05-17
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
source_files:
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/widget/core/storefront-context.js"
  - "src/widget/listing-badges/collect.js"
  - "src/widget/listing-badges/ratings.js"
  - "prisma/schema.prisma"
---

# ADR_0015 - Canonical Product Identity

## Status
Accepted

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

Listing/search badges now prefer the canonical path:
1. `core/storefront-context.js` records `slug -> { productId, name }` from
   `VIEW_LISTING` and `VIEW_SEARCH_RESULTS`.
2. `listing-badges/collect.js` merges DOM-discovered slugs with event-provided
   product ids.
3. `listing-badges/ratings.js` calls `/api/public/ratings?productIds=...` for
   products that have ids.
4. `/api/public/ratings` groups approved reviews by `Review.productId`.

The legacy `/api/public/ratings-by-slug` endpoint remains only as a fallback for
DOM-only paths where ikas Events did not provide product ids.

## Reasoning
Product ids are stable; slugs are mutable. Using slugs as identity makes review
visibility depend on unrelated SEO edits. Keeping `(storeId, productId)` as the
read key matches the PDP path, matches ikas product identity semantics, and avoids
a destructive review data migration because existing reviews already carry
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
- **Add a Product read model before changing the widget** - deferred. A local
  Product table is useful for DOM-only fallback, fresh product names, and missed
  event recovery, but it is not required to fix the dominant event-backed listing
  path.

## Consequences
- New listing/search badge reads are robust to future slug renames when ikas
  Storefront Events provide `productDetails[].id`.
- The public API now has a product-id bulk endpoint with the same short edge cache
  policy as other public read routes.
- `Review` has a new `[storeId, productId, status]` index to cover the hot
  product-id rating lookup.
- DOM-only listing fallback remains slug-based until a Product read model is
  implemented. That follow-up should use ikas product webhooks plus a backfill or
  reconciliation job; the local table should be a cache/read model, not the
  source of truth.
- Reviews remain product-level, not variant-level. `ikasVariantId` is not part of
  the review identity unless a future product requirement explicitly changes the
  domain model.

## Related Source Files
- [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)
- [src/widget/core/storefront-context.js](src/widget/core/storefront-context.js)
- [src/widget/core/state.js](src/widget/core/state.js)
- [src/widget/listing-badges/collect.js](src/widget/listing-badges/collect.js)
- [src/widget/listing-badges/ratings.js](src/widget/listing-badges/ratings.js)
- [src/widget/listing-badges/index.js](src/widget/listing-badges/index.js)
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/20260517120000_add_review_product_status_index/migration.sql](prisma/migrations/20260517120000_add_review_product_status_index/migration.sql)

## Related Notes
- [[Decision_Index]]
- [[ADR_0003_Review_Data_Model]]
- [[Ikas_Storefront_Events]]
- [[Listing_Rating_Widget]]
