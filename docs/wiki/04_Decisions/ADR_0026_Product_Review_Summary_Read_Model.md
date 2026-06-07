---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-06-06
updated: 2026-06-06
last_verified: 2026-06-06
confidence: high
tags:
  - adr
  - database
  - performance
  - public-api
related:
  - "[[Decision_Index]]"
  - "[[ADR_0003_Review_Data_Model]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[Backend_API_Map]]"
  - "[[Database_Schema]]"
source_files:
  - "prisma/schema.prisma"
  - "src/lib/review-summary.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/app/api/admin/reviews/route.ts"
  - "scripts/rebuild-product-review-summaries.mjs"
---

# ADR_0026 - Product Review Summary Read Model

## Status
Accepted

## Context
Public storefront reads happen on PDP, listing/search, and structured-data paths. The raw `Review` table remains the durable source of truth, but repeatedly computing public badge and summary values from `Review.count()` / `Review.groupBy()` makes hot read paths scale with review volume and page traffic.

The widget already separates visual surfaces (`rating-badge`, `reviews-main`, `structured-data`) and preserves public response contracts. The missing backend piece was a product-level read model for `count`, `average`, and rating distribution.

## Decision
Add `ProductReviewSummary` as a per `(storeId, productId)` aggregate read model:

- `Review` remains the source of truth.
- Public badge, structured-data, and review summary distribution read product aggregates from `ProductReviewSummary`.
- Public review list rows still come from `Review`; filtered `totalCount` remains a scoped `Review.count()` in this phase.
- Review submit, admin status transitions, and approved review delete update the summary in the same transaction as the raw review change.
- First-summary writes use `upsert` rather than `findUnique -> create`, so concurrent first approvals for the same product do not fail on the `(storeId, productId)` unique key.
- A repeatable repair script can rebuild summaries from approved review rows.

## Reasoning
- Mature review systems use bottomline/aggregate read paths for storefront rating badges and structured data rather than recomputing distribution from the full review table on every page view.
- The table is additive and deploy-safe: old code ignores it, new code can read it after migration/backfill.
- Keeping raw `Review` as source of truth preserves moderation, audit-by-row behavior, and future reprocessing.
- Summary updates are tied to visibility, not edits that do not affect public rating math. `merchantReply` changes are aggregate no-ops.

## Alternatives Considered
- Keep using `Review.groupBy()` on public reads: simpler, but scales public reads with raw review volume.
- Add Redis read-through cache first: useful later, but cache misses still hit the same aggregate scans and invalidation becomes harder.
- Move immediately to `ReviewMedia` and cursor pagination: correct future work, but too large for the first aggregate phase.
- Database triggers: centralizes consistency, but hides application intent and complicates Prisma/unit testing. Application transaction helpers are explicit and testable.

## Consequences
- New write paths that change review public visibility must call the summary helper in the same transaction.
- A summary repair script is part of operations and should be run after suspicious imports/manual DB edits.
- `photoReviewCount` exists for future media surfaces, but `Review.images` remains TEXT JSON in this phase. A later `ReviewMedia` or indexed `hasImages` phase should replace string-based image filtering.
- Cursor/keyset pagination remains a future public API performance phase; this ADR does not change the current response shape.

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [src/lib/review-summary.ts](src/lib/review-summary.ts)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)
- [src/app/api/admin/reviews/route.ts](src/app/api/admin/reviews/route.ts)
- [scripts/rebuild-product-review-summaries.mjs](scripts/rebuild-product-review-summaries.mjs)

## Related Notes
- [[Database_Schema]]
- [[Database_Map]]
- [[Backend_API_Map]]
- [[Test_Strategy]]
