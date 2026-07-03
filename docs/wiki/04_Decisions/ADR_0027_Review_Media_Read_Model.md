---
type: decision
project: renuvex-product-reviews
status: superseded
created: 2026-06-07
updated: 2026-07-03
last_verified: 2026-07-03
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
  - "[[ADR_0029_Review_Media_Metadata]]"
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
---

# ADR_0027 - Review Media Read Model

## Status
Accepted; superseded for image-provider behavior by [[ADR_0034_AWS_Review_Image_Migration]].

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
- `scripts/audit-legacy-review-media.mjs` classifies remaining legacy rows without mutation.
- `scripts/reconcile-legacy-review-media.mjs` performs copy-first reconciliation for approved legacy global `review_images/...` assets, but only with explicit store scope, `--allowLegacyGlobal`, `--apply`, and real Cloudinary API credentials. Missing source assets stop strict mode; test-store cleanup used the explicit `--dropMissingLegacy` flag.

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
- Move to cursor pagination in the same phase: correct future work, but separable from the media data model and not needed to remove the text-scan filter. It was later implemented by [[ADR_0028_Review_Cursor_Pagination]].

## Consequences
- New write paths that attach or detach review media must keep `Review.hasImages`, `ReviewMedia`, and `ProductReviewSummary.photoReviewCount` consistent.
- After migration deploy, run `pnpm reviews:media:backfill --cloudName=<cloudinaryCloudName>` to populate `ReviewMedia` and repair legacy rows. The script rejects placeholder cloud names so it cannot silently backfill against the wrong trusted tenant policy.
- If `Review.images` still contains old global `review_images/...` URLs, run `pnpm reviews:media:audit --cloudName=<cloudinaryCloudName>` and then use the copy-first reconciliation flow documented in [[Legacy_Review_Media_Reconciliation]]. Do not expand the trusted-image policy to accept global paths.
- Monthly Cloudinary fallback cleanup should prefer `ReviewMedia.publicId`; legacy `Review.images` remains only a transition fallback.
- Review-list cursor/keyset pagination is now handled by [[ADR_0028_Review_Cursor_Pagination]].
- Review media dimensions, format, bytes, thumbnail URL exposure, and signed upload-response verification are additive follow-up work covered by [[ADR_0029_Review_Media_Metadata]].
- 2026-07-03: the Cloudinary reconciliation scripts listed in the historical decision were removed during the AWS-only image teardown. New image writes/read paths use AWS `ReviewMedia.variantManifest` and the AWS cleanup family model from [[ADR_0034_AWS_Review_Image_Migration]].

## Legacy Reconciliation Status
2026-06-08 initial audit with `--cloudName=dtn7jhhuy` found 30 non-empty legacy `Review.images` rows, 43 total legacy URLs, 3 tenant-scoped trusted URLs already normalized into `ReviewMedia`, and 40 old global `review_images/...` URLs across 27 approved reviews. Duplicate public IDs, orphan `ReviewMedia`, and summary photo-count mismatches were all zero.

The test-store apply copied 10 available legacy assets into tenant-scoped paths, dropped 30 missing Cloudinary source URLs with `--dropMissingLegacy`, repaired 1 summary row, and post-apply audit verified 13 tenant-scoped URLs, 13 `ReviewMedia` rows, zero global legacy URLs, zero orphan media, and zero photo-count mismatches.

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/20260607120000_add_review_media_read_model/migration.sql](prisma/migrations/20260607120000_add_review_media_read_model/migration.sql)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [src/lib/review-summary.ts](src/lib/review-summary.ts)
- [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)
- [src/app/api/admin/reviews/route.ts](src/app/api/admin/reviews/route.ts)
- [src/app/api/admin/cleanup-images/route.ts](src/app/api/admin/cleanup-images/route.ts)
