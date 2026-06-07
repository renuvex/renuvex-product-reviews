---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-06-07
updated: 2026-06-07
last_verified: 2026-06-07
confidence: high
tags:
  - adr
  - database
  - performance
  - review-media
related:
  - "[[Decision_Index]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
  - "[[ADR_0026_Product_Review_Summary_Read_Model]]"
  - "[[Database_Schema]]"
  - "[[Backend_API_Map]]"
source_files:
  - "prisma/schema.prisma"
  - "prisma/migrations/20260607120000_add_review_media_read_model/migration.sql"
  - "src/lib/review-media.ts"
  - "src/lib/review-summary.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/admin/reviews/route.ts"
  - "src/app/api/admin/cleanup-images/route.ts"
  - "scripts/backfill-review-media.mjs"
---

# ADR_0027 - Review Media Read Model

## Status
Accepted

## Context
`Review.images` was originally a TEXT field containing `JSON.stringify(string[])`. That was simple, but public `hasImages=true` reads had to use string `contains` checks against the JSON text. This is not the right long-term shape for stores with many photo reviews, photo strips, media-heavy widgets, or indexed photo filters.

ADR_0026 introduced `ProductReviewSummary` for aggregate rating reads. The remaining media-specific gap was a normalized media table and an indexable "this review has trusted images" facet.

## Decision
Add a normalized media read model while keeping the public API response shape stable:

- `Review.hasImages` is the indexed boolean facet for public photo-review filters.
- `ReviewMedia` stores trusted review image URLs with `reviewId`, `storeId`, `productId`, `publicId`, `position`, and `visible`.
- Public `GET /api/public/reviews?hasImages=true` filters on `Review.hasImages`, not `Review.images contains`.
- Public review responses still return `images: string[]`; formatting reads `ReviewMedia` first and falls back to legacy `Review.images` during migration/backfill.
- Review submit writes `Review`, `Review.images` legacy mirror, `Review.hasImages`, `ReviewMedia`, pending-upload cleanup, and summary update in one transaction.
- Admin status transitions update `ReviewMedia.visible` in the same transaction as the review status and summary update.
- `Review.images` remains as a legacy mirror for compatibility and migration safety; it is not the long-term query source.
- `scripts/backfill-review-media.mjs` repairs existing data from trusted legacy image URLs and updates `ProductReviewSummary.photoReviewCount`.

## Reasoning
- Mature review platforms expose media as structured data and support indexed media facets such as "has photos", not text scans over serialized arrays.
- The migration is additive and deploy-safe: old code ignores the new column/table, new code keeps legacy fallback while backfill completes.
- `ReviewMedia.publicId` gives cleanup and future media widgets a durable Cloudinary source of truth.
- `Review.hasImages` keeps the hot public photo filter on the `Review` list query without requiring a relation filter or JSON text scan.
- Visibility belongs to media rows because pending/rejected reviews can have attached media that must not show in public photo surfaces.

## Alternatives Considered
- Keep `Review.images` TEXT and add a trigram/GIN-like text index: still encodes application semantics inside a serialized blob and does not give cleanup or future media widgets a durable media entity.
- Query `ReviewMedia` relation filters only and skip `Review.hasImages`: normalized, but the current public review list still pages over `Review`; the boolean facet keeps the existing list query simple and indexable.
- Drop `Review.images` immediately: breaking and unnecessary. Expand/contract should happen only after a later cleanup phase proves no runtime or ops fallback uses the legacy mirror.
- Move to cursor pagination in the same phase: correct future work, but separable from the media data model and not needed to remove the text-scan filter.

## Consequences
- New write paths that attach or detach review media must keep `Review.hasImages`, `ReviewMedia`, and `ProductReviewSummary.photoReviewCount` consistent.
- After migration deploy, run `pnpm reviews:media:backfill` to populate `ReviewMedia` and repair legacy rows.
- Monthly Cloudinary fallback cleanup should prefer `ReviewMedia.publicId`; legacy `Review.images` remains only a transition fallback.
- Cursor/keyset pagination remains a future public API performance phase.

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/20260607120000_add_review_media_read_model/migration.sql](prisma/migrations/20260607120000_add_review_media_read_model/migration.sql)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [src/lib/review-summary.ts](src/lib/review-summary.ts)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/admin/reviews/route.ts](src/app/api/admin/reviews/route.ts)
- [src/app/api/admin/cleanup-images/route.ts](src/app/api/admin/cleanup-images/route.ts)
- [scripts/backfill-review-media.mjs](scripts/backfill-review-media.mjs)
