---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-30
tags:
  - adr
  - database
related:
  - "[[Decision_Index]]"
  - "[[Database_Schema]]"
---

# ADR_0003 — Review Data Model

## Status
Accepted

## Date
2026-05-05 (documenting inherited model with several iterations visible in migrations)

## Context
We need to store reviews submitted from any storefront product page, allow public read by `(storeId, productId)` and `(storeId, slug)` shapes (the listing badge endpoint), allow admin moderation (status workflow), and persist images.

Constraints:
- Multi-tenant on `storeId` (== ikas merchantId).
- Public widget reads on every product/listing page hit — must be fast.
- Image storage is external (Cloudinary).

## Decision
Single denormalized `Review` table:
- `id` uuid PK, `storeId`, `productId`, `slug`, `productName?`, `rating`, `status` (string), `title?`, `comment? VARCHAR(2000)`, `merchantReply? VARCHAR(2000)`, `author`, `email?`, `images?` (TEXT, JSON-stringified array), timestamps.
- Indexes: `[storeId, productId]`, `[storeId, slug]`, `[storeId, status]`, `[storeId, slug, status]`.
- `status` is a string ('pending'|'approved'|'rejected'), not a Postgres enum.
- `storeId == merchantId` everywhere — no separate Store table.
- `productName` and `slug` are **denormalized snapshots** of ikas product data, captured at submit time.

## Reasoning
- **Single table** is the right answer for the current shape. Reviews are a flat, append-mostly entity. No need for joins on the hot path.
- **String status** avoids migrations every time we add a transition state. TS keeps type-safety in code; DB stays flexible.
- **Denormalized `productName` and `slug`** — public widget needs them and we don't want to round-trip ikas Admin GraphQL on every read.
- **`images` as TEXT JSON** — the simplest possible solution; no relation needed for current features (display, gallery on PDP). Migrate to a `ReviewImage` table when we want CDN-resize variants per image, ordering, captions, etc.
- **`storeId == merchantId`** — simplifies tenancy. The cost: if ikas later supports per-storefront-per-merchant settings we might fork; today the small cost is preferable to upfront over-modeling.
- **Index choices** mirror real query shapes (see [[Database_Schema]]). Composite indexes were added after observed slowness.

## Alternatives Considered
- **Postgres `status` enum** — adds migration friction; rejected.
- **`ReviewImage` separate table** — added complexity not yet justified.
- **`Product` table with reviews FK** — would normalize `productName` and `slug`, but we don't authoritatively own product data. Pulled from ikas as needed; storing it would create stale-data concerns.
- **Soft delete (`deletedAt`)** — chose hard delete for now. Reconsider if we need audit / restore.

## Consequences
- `productName` is a snapshot — stale if a merchant renames a product. Need a future webhook-driven sync or admin "refresh names" job.
- The image format is fragile: every reader must `try/catch JSON.parse`. Already done at API and admin code paths; reviewers should keep this pattern.
- Index churn is real (visible in migrations). New query shapes should be considered carefully — verify with `EXPLAIN ANALYZE` before adding indexes.
- The model assumes one product per page (PDP). Multi-product pages (sets/looks) won't fit cleanly.
- `helpful` feature was added then reverted (visible in migrations 20260408*) — if we re-add it, plan to re-introduce as a separate `ReviewVote` table rather than columns on `Review`.

## Related Source Files
- [prisma/models/reviews.prisma](prisma/models/reviews.prisma)
- [prisma/migrations/](prisma/migrations/)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts)
- [src/app/api/admin/reviews/route.ts](src/app/api/admin/reviews/route.ts)

## Related Notes
- [[Database_Schema]]
- [[Database_Map]]
- [[API_Design]]
