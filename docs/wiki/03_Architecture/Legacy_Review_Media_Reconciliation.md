---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-06-08
updated: 2026-06-08
last_verified: 2026-06-08
confidence: high
tags:
  - review-media
  - cloudinary
  - operations
related:
  - "[[ADR_0027_Review_Media_Read_Model]]"
  - "[[Database_Map]]"
  - "[[Backend_API_Map]]"
  - "[[Test_Strategy]]"
source_files:
  - "scripts/audit-legacy-review-media.mjs"
  - "scripts/reconcile-legacy-review-media.mjs"
  - "scripts/review-media-reconciliation-lib.mjs"
  - "tests/unit/review-media-reconciliation.test.ts"
---

# Legacy Review Media Reconciliation

## Summary
Legacy review image rows must not be normalized by simply trusting old `Review.images` URLs. The accepted media model is tenant-scoped:

```text
review_images/stores/<storeId>/...
```

If a legacy row uses the old global `review_images/...` path, the asset must either be copied into the tenant-scoped path and then written back to `Review.images` / `ReviewMedia`, or left as an explicitly documented legacy-only record. Do not widen the storefront trusted-image policy to accept global paths.

## Current Evidence
Initial read-only audit on 2026-06-08 found 40 old global URLs across 27 approved reviews. Apply then copied all available legacy assets into tenant-scoped paths and dropped missing legacy references only with the explicit `--dropMissingLegacy` flag.

Post-apply audit:

```bash
pnpm reviews:media:audit --cloudName=dtn7jhhuy
```

Result:

| Metric | Value |
|---|---:|
| `Review.images` rows with non-empty text | 9 |
| Legacy URLs | 13 |
| Tenant-scoped trusted URLs | 13 |
| Legacy global `review_images/...` URLs | 0 |
| Reviews containing legacy global URLs | 0 |
| `ReviewMedia` rows | 13 |
| `Review.hasImages=true` rows | 9 |
| Orphan `ReviewMedia` rows | 0 |
| `ProductReviewSummary.photoReviewCount` mismatches | 0 |

Apply result: `copiedAssets=10`, `missingSourceAssets=30`, `droppedMissingLegacyUrls=30`, `reviewsWithDroppedLegacyUrls=21`, `summaryRowsRepaired=1`. Missing-source drops were allowed only because this was the test store and the missing Cloudinary assets could not be copied.

## Commands
Audit:

```bash
pnpm reviews:media:audit --cloudName=<cloudinaryCloudName>
pnpm reviews:media:audit --cloudName=<cloudinaryCloudName> --storeId=<merchantId>
```

Dry-run reconciliation:

```bash
pnpm reviews:media:reconcile --cloudName=<cloudinaryCloudName> --allowLegacyGlobal --dryRun
```

Apply reconciliation:

```bash
pnpm reviews:media:reconcile --cloudName=<cloudinaryCloudName> --storeId=<merchantId> --allowLegacyGlobal --apply
pnpm reviews:media:reconcile --cloudName=<cloudinaryCloudName> --storeId=<merchantId> --allowLegacyGlobal --dropMissingLegacy --apply
```

Apply mode is intentionally scoped to one store and requires real `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` values. Placeholder credentials are rejected before any Cloudinary mutation. `--dropMissingLegacy` is an explicit cleanup flag for source assets that Cloudinary returns as missing; without it, the script stops instead of deleting broken DB references.

## Reconciliation Policy

| Bucket | Action |
|---|---|
| `tenant_scoped_trusted` | Safe to normalize into `ReviewMedia` if missing. |
| `legacy_global_review_images` | Copy-first into `review_images/stores/<storeId>/legacy/<reviewId>/...` only with `--allowLegacyGlobal`. |
| `tenant_scoped_wrong_store` | Do not normalize automatically. Investigate ownership. |
| `foreign_cloudinary_cloud` | Do not normalize. |
| `same_cloud_other_folder` | Do not normalize automatically. Requires a separate policy decision. |
| `non_cloudinary_or_untrusted_shape` | Do not normalize. |
| `invalid_json` / `not_array` | Do not normalize. |

## Why Copy-First
Copy-first keeps the old asset untouched until the new tenant-scoped asset exists and the DB transaction can write the verified tenant URL. Rename/move operations can change delivery URLs and introduce cache or rollback issues. The script therefore creates/reuses the target asset, validates the resulting tenant URL, then updates `Review.images`, `Review.hasImages`, and `ReviewMedia` together.

Legacy global assets are not deleted in this phase. Deletion should be a later cleanup step after an audit proves no DB row references the old public IDs.

## Verification
- `tests/unit/review-media-reconciliation.test.ts` pins URL classification, placeholder credential rejection, deterministic target public IDs, and audit summary behavior.
- `pnpm reviews:media:reconcile --cloudName=dtn7jhhuy --dryRun` must skip global legacy rows without `--allowLegacyGlobal`.
- After reconciliation, `pnpm reviews:media:reconcile --cloudName=dtn7jhhuy --allowLegacyGlobal --dryRun` should report `plannedCopies=0`.

## Change Log
- 2026-06-08: Applied test-store reconciliation. Copied 10 available legacy assets, dropped 30 missing legacy source references with `--dropMissingLegacy`, and verified zero remaining global legacy URLs.
- 2026-06-08: Added audit/reconciliation scripts and documented the initial legacy media classification.
