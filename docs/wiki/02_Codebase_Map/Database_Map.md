---
type: database
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-21
last_verified: 2026-06-21
confidence: high
tags:
  - database
  - prisma
  - postgres
related:
  - "[[Index]]"
  - "[[Database_Schema]]"
  - "[[Important_Files]]"
  - "[[ADR_0026_Product_Review_Summary_Read_Model]]"
  - "[[ADR_0028_Review_Cursor_Pagination]]"
  - "[[ADR_0030_Cleanup_Hardening]]"
source_files:
  - "prisma/schema.prisma"
  - "prisma/migrations/20260606193000_add_product_review_summary/migration.sql"
  - "prisma/migrations/20260607120000_add_review_media_read_model/migration.sql"
  - "prisma/migrations/20260608120000_add_review_cursor_indexes/migration.sql"
  - "prisma/migrations/20260608170000_add_review_summary_photo_rating_counts/migration.sql"
  - "prisma/migrations/20260609120000_add_cleanup_hardening/migration.sql"
  - "prisma/migrations/20260613010000_add_review_video_v1_foundation/migration.sql"
  - "prisma/migrations/20260620190000_add_video_upload_performance_sample/migration.sql"
  - "prisma/migrations/20260621003000_review_video_mux_contract_drop_legacy_columns/migration.sql"
  - "src/lib/cleanup-orphan-images.ts"
  - "src/lib/review-media.ts"
  - "src/lib/review-summary.ts"
  - "src/lib/media/outbox.ts"
  - "src/lib/media/sessions.ts"
  - "scripts/rebuild-product-review-summaries.mjs"
  - "scripts/backfill-review-media.mjs"
  - "scripts/audit-legacy-review-media.mjs"
  - "scripts/reconcile-legacy-review-media.mjs"
---

# Database Map

## Summary
Postgres (Supabase) accessed via Prisma. Core review/media models now include the image-era tables plus the additive video lifecycle tables: `VideoUploadSession`, `StoreVideoUsage`, and `MediaProviderJob`. Pooler URL via `DATABASE_URL` (transaction pooler 6543, pgbouncer); migration URL via `DIRECT_URL` (session pooler 5432). Detailed field-level reference in [[Database_Schema]].

## Files

| File | Role |
|---|---|
| [prisma/schema.prisma](prisma/schema.prisma) | Schema source |
| [prisma/migrations/](prisma/migrations/) | Migration history (29+ files, 2026-03 → 2026-06) |
| [src/lib/prisma.ts](src/lib/prisma.ts) | Prisma client singleton |
| [src/models/auth-token/index.ts](src/models/auth-token/index.ts) | `AuthToken` interface |
| [src/models/auth-token/manager.ts](src/models/auth-token/manager.ts) | `AuthTokenManager.{get,put,delete}` |

## Models (one-line summaries)

| Model | Primary key | Purpose |
|---|---|---|
| `AuthToken` | `authorizedAppId` | OAuth tokens per app installation; refreshed by `onCheckToken` |
| `Review` | `id` (uuid) | Reviews; denormalized (`productName`, `slug`); status workflow; additive `hasVideo` marks video-bearing reviews and `moderationVersion` dedupes async provider moderation jobs |
| `ReviewMedia` | `id` (uuid), unique `publicId` | Normalized trusted media rows. Images remain Cloudinary; videos carry provider/providerAssetId/poster/duration/processing/source fields and still use `visible` + `Review.status` as the public gate. |
| `ProductReviewSummary` | `id` (uuid), unique `(storeId, productId)` | Product-level aggregate read model for public badge, structured-data, summary distribution, and exact filtered review-list counts |
| `StoreSettings` | `id` (uuid), unique `storeId` | Per-merchant config; tracks storefront script/theme sync state and additive `videoMonthlyLimit` quota gate (default `0`, so video stays closed). |
| `WidgetSettings` | `id` (uuid), unique `(storeId, widgetId)` | Per-widget JSON settings |
| `ProductSnapshot` | `id` (uuid), unique `(storeId, productId)` | Current ikas product slug/name snapshot for fallback resolution |
| `PendingReviewImage` | `publicId` | Legacy-named pending media registry. Cloudinary image uploads and Mux video sessions both stage here behind provider-aware fields until review submit or cleanup. |
| `MediaCleanupRun` | `id` (uuid) | Audit log, one row per `cleanup-images` cron run (scan/quarantine/sweep counts, breaker status, `sampleDeleted` sample). See [[ADR_0030_Cleanup_Hardening]] |
| `OrphanImageQuarantine` | `publicId` | Two-phase orphan-deletion state: orphans are marked here, then hard-deleted only after a grace window if still orphaned. See [[ADR_0030_Cleanup_Hardening]] |
| `VideoUploadSession` | `id` (uuid), unique `tokenHash` | Hashed shopper upload session, Mux upload/asset/playback ids, status, poster/playback metadata, explicit `quotaState`, and 24h expiry. Raw tokens are never stored. |
| `VideoUploadPerformanceSample` | `id` (uuid), unique `uploadSessionId` | Sanitized one-row-per-session upload timing sample for diagnosing Mux direct-upload transfer, retry, complete, and processing-poll durations. Tokens, upload URLs, signed URLs, playback IDs, file names, IPs, and raw user-agent values are never stored. |
| `StoreVideoUsage` | `(storeId, month)` | Atomic monthly quota reserve/consume counters for feature-gated video uploads. |
| `MediaProviderJob` | `id` (uuid), unique `dedupeKey` | DB outbox for provider operations (`resolve_video_asset`, `reconcile_video`, `expire_upload_session`, `publish_video`, `protect_video`, `cleanup_video`, `cleanup_image`) dispatched through QStash with idempotent retries, stale-lock recovery, and DLQ/manual-repair state. |
| `MediaProviderLease` | `key` | Expiring per-session/per-asset provider mutation lease with a fencing version. It serializes publish/protect/delete work without holding a database transaction open during a provider HTTP call. |

## Index strategy
On `Review`:
- `[storeId, productId, status]` — canonical listing/search badge resolution by ikas product id
- `[storeId, status]` — admin filtered list
- `[storeId, slug, status]` — legacy combined slug fallback path (composite added 2026-04)

`[storeId, productId, status]` also covers the leftmost `(storeId, productId)` prefix, and `[storeId, slug, status]` covers `(storeId, slug)`. The old two-column prefix indexes were removed in `20260518130000_drop_redundant_review_indexes` to reduce write amplification on the highest-write table.

The migrations show iterative tuning: redundant indexes have been cleaned up more than once. Before adding a new index, scan `prisma/migrations/*` for past attempts.

On `ProductReviewSummary`:
- unique `[storeId, productId]` - public badge, structured-data, `/api/public/ratings`, review summary distribution, and `/api/public/reviews` `totalCount` / `totalPages` read this aggregate row instead of recomputing from raw `Review.groupBy()` or `Review.count()` on every storefront request.

On `ReviewMedia`:
- unique `publicId` - one committed media asset belongs to one review row (`cloudinary` image public id or prefixed `mux:<assetId>` video id).
- `[provider, providerAssetId]` - provider-scoped video/image asset lookup without parsing URLs.
- `[resourceType, provider, processingStatus]` - video processing/reconciliation and provider-aware cleanup.
- unique `[reviewId, position]` plus `[reviewId, position]` index - stable per-review image ordering.
- `[storeId, productId, visible, createdAt]` - future media-gallery reads and tenant-scoped cleanup/reporting.
- `[metadataStatus, createdAt]` - metadata repair/backfill scans.

On `Review` media reads:
- partial `[storeId, productId, createdAt] where status='approved' and hasImages=true` - public photo-review list and image-only media-gallery hot path.
- `[storeId, productId, status, hasVideo]` and partial `[storeId, productId, createdAt desc, id desc] where status='approved' and hasVideo=true` support approved video/media queries, newest media filtering, and admin moderation slices.

On video lifecycle:
- `VideoUploadSession`: `tokenHash`, provider-scoped upload/asset ids, `publicId`, `(storeId, productId, status, createdAt)`, and `(status, expiresAt)` support token lookup, webhook/session reconciliation, and pending cleanup. `quotaState=reserved|released|consumed` makes quota transitions idempotent under concurrent webhook/cancel/failure handling.
- `VideoUploadPerformanceSample`: unique `uploadSessionId` keeps metrics idempotent; `(storeId, productId, createdAt)`, `(provider, finalStatus, createdAt)`, and `createdAt` indexes support canary/performance diagnostics without persisting secrets or raw client identity.
- `StoreVideoUsage`: unique `(storeId, month)` keeps quota reservation atomic under serializable transactions.
- `MediaProviderJob`: `dedupeKey`, `status/availableAt`, `lockedAt`, `provider/action/status`, and `uploadSessionId` keep provider jobs resumable, stale-lock recoverable, and deduped. It owns provider mutations, bounded Mux reconciliation, exact upload-session expiry, and expired Cloudinary pending-image cleanup. Future-scheduled lifecycle jobs are healthy state, not due/stuck work.
- `MediaProviderLease`: the primary key is the serialization key (`video-session:<id>` or `mux-asset:<assetId>`); `leaseVersion` is a fencing token and expired leases can be atomically replaced.

On `Review` cursor pagination:
- partial `[storeId, productId, createdAt desc, id desc] where status='approved'` - public `newest` review list/load-more.
- partial `[storeId, productId, rating desc, createdAt desc, id desc] where status='approved'` - public `highest` review list/load-more.
- partial `[storeId, productId, rating asc, createdAt desc, id desc] where status='approved'` - public `lowest` review list/load-more.
- partial `[storeId, productId, createdAt desc, id desc] where status='approved' and hasImages=true` - photo-review newest cursor path. The older photo index without `id` remains until production unused-index evidence supports cleanup.
- partial `[storeId, productId, createdAt desc, id desc] where status='approved' and hasVideo=true` - video side of the public `hasMedia=true` newest cursor path.

## Migration workflow
- Local dev: `pnpm prisma:migrate` (creates + applies migration)
- Deploy: `pnpm build` runs `prisma generate && prisma migrate deploy && next build` — migrations apply on every Vercel deploy.
- ⚠️ Never `prisma db push` in production (only first-run via `pnpm prisma:init` for local).

### Migration safety (deploy-window rule)
`prisma migrate deploy` runs *during* the Vercel build, while the previous
deployment still serves traffic. For ~1-3 minutes the new schema and the old
code run together, so a migration must not break the old code.

- **Additive / backwards-compatible — one deploy is safe:** new table, new
  nullable column, new column with a default, new index. Old code simply
  ignores what it does not know about.
- **Breaking — must use expand/contract (two deploys):** drop or rename a
  column/table, add a `NOT NULL` column without a default, narrow a type, add a
  unique constraint to existing data.
  1. Deploy 1 — ship code that works with *both* the old and new shape (e.g.
     stop reading/writing the column); no destructive migration yet.
  2. Deploy 2 — apply the destructive migration once Deploy 1 is fully live, so
     no running code still depends on the old shape.
- A single breaking deploy at a quiet hour is acceptable only when a few minutes
  of transient errors is tolerable; expand/contract is the zero-downtime default.
- Example: `20260517160000_remove_product_snapshot_deleted` dropped a column in
  one deploy — safe only because the store had no live traffic. Do not repeat
  this pattern for live multi-merchant data.

## Recent migration themes (chronological)
- `init`, `add_product_slug_cache` — bootstrap
- `cleanup_and_auth_token_refactor`, `remove_widget_template` — early refactors
- `add_review_status_indexes`, several `add_*_index`, `cleanup_redundant_indexes` — perf tuning
- `add_storefront_scripts` — added `StoreSettings.storefrontScripts` JSON column
- `add_widget_settings` — `WidgetSettings` table
- `add_helpful_feature` then `remove_helpful_feature` — feature was tried and reverted
- `add_*_color_setting`, `remove_*_color_setting` — settings churn (visible in last week)
- `add_review_title`, `add_review_comment_length_limit`, `add_merchant_reply_length_limit` — review schema growth

- `add_product_review_summary` — product-level aggregate read model for public rating/summary reads
- `add_review_summary_photo_rating_counts` - exact `hasImages=true&rating=N` count buckets on the existing product summary read model
- `add_review_summary_media_counts` - exact `hasMedia=true` and `hasMedia=true&rating=N` count buckets plus the approved-video newest cursor partial index

## Notes
- `Review.images` is **legacy TEXT containing `JSON.stringify(string[])`**. New writes keep it as a compatibility mirror; public image display reads `ReviewMedia` first and falls back to the legacy mirror during transition/backfill.
- `Review.hasImages` is the indexed public photo-review facet. Do not reintroduce `Review.images contains` for public filters.
- `ProductReviewSummary` is a read model, not source of truth. If manual DB edits/imports bypass normal review write paths, run `pnpm reviews:summaries:rebuild`. It owns exact public counts for unfiltered, rating-filtered, photo-filtered, photo+rating-filtered, media-filtered, and media+rating-filtered review list responses.
- `ReviewMedia` is the normalized media read model. If legacy/imported data bypassed normal review write paths, run `pnpm reviews:media:backfill --cloudName=<cloudinaryCloudName>`; the script rejects placeholder cloud names. If media metadata is missing, run `pnpm reviews:media:metadata:backfill --cloudName=<cloudinaryCloudName>` first as dry-run, then add `--apply` after reviewing the plan.
- Review Video is Mux-only in the local schema. A safe deploy must keep global `VIDEO_REVIEWS_ENABLED=false` and `StoreSettings.videoMonthlyLimit=0` until Mux/QStash infrastructure and Preview canary tests are configured. Existing image rows continue as `provider='cloudinary'`, `processingStatus='ready'`.
- Review Video upload performance diagnostics are stored in `VideoUploadPerformanceSample`. Treat the table as operational evidence, not source-of-truth lifecycle state; `VideoUploadSession`, `WebhookEvent`, and `MediaProviderJob` remain authoritative for provider lifecycle.
- Legacy global Cloudinary paths (`review_images/...` without `stores/<storeId>`) are not trusted tenant media. Audit them with `pnpm reviews:media:audit --cloudName=<cloudinaryCloudName>` and reconcile copy-first with `pnpm reviews:media:reconcile --cloudName=<cloudinaryCloudName> --storeId=<merchantId> --allowLegacyGlobal --apply`. Use `--dropMissingLegacy` only for verified missing source assets. See [[Legacy_Review_Media_Reconciliation]].
- `Review.status` is a string column, not a Postgres enum. Code uses `'pending' | 'approved' | 'rejected'` literals. Be consistent.
- `StoreSettings.storefrontScripts` is a JSON map `{ [storefrontId]: ikasScriptId }` used as an idempotency cache. Remote ikas script listing is the source of truth when available, so re-installs adopt/update existing scripts instead of creating duplicates. See [[Auth_And_Installation_Flow]].
- `StoreSettings.storefrontTheme` stores non-sensitive active storefront/theme sync state resolved from `listStorefront.themes[].isMainTheme`. Current app-layer shape is `{ syncStatus, stable, pending, lastCheckedAt, verificationDueAt, verifiedAt }`; public settings expose only the stable `runtime.themeAdapterKey/source` to select Ozy vs generic adapter.
- `AuthToken` has `merchantId` (column) AND `authorizedAppId` (PK). Both are needed: `authorizedAppId` is unique per install, `merchantId` is shared across installs. The callback `deleteMany({ where: { merchantId } })` uses this to clean reinstalls.

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/](prisma/migrations/)
- [src/lib/prisma.ts](src/lib/prisma.ts)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [scripts/audit-legacy-review-media.mjs](scripts/audit-legacy-review-media.mjs)
- [scripts/reconcile-legacy-review-media.mjs](scripts/reconcile-legacy-review-media.mjs)
- [src/models/auth-token/manager.ts](src/models/auth-token/manager.ts)

## Obsidian Links
- [[Database_Schema]]
- [[Auth_And_Installation_Flow]]
- [[ADR_0003_Review_Data_Model]]
- [[ADR_0026_Product_Review_Summary_Read_Model]]
- [[ADR_0027_Review_Media_Read_Model]]
- [[ADR_0029_Review_Media_Metadata]]
- [[ADR_0030_Cleanup_Hardening]]
- [[Legacy_Review_Media_Reconciliation]]

## Change Log
- 2026-06-20: Added additive `VideoUploadPerformanceSample` for sanitized Mux direct-upload performance diagnostics. The table has RLS enabled and no public policies; public clients submit through `/api/public/upload/video/metrics`.
- 2026-06-21: Added the approved Mux contract migration `20260621003000_review_video_mux_contract_drop_legacy_columns` to remove old Cloudflare Stream/R2 `VideoUploadSession` columns and legacy unique indexes after the Mux production canary closeout showed no active video rows/jobs and no data in those legacy columns.
- 2026-06-20: Mux contract work was staged locally. `VideoUploadSession` keeps Mux provider/upload/asset/playback ids; previous provider-specific upload/archive columns are removed from the Prisma schema. See [[ADR_0032_Review_Video_On_Mux]].
- 2026-06-13: Added additive Review Video foundation: `Review.hasVideo`, provider/source/processing video fields on `ReviewMedia` and `PendingReviewImage`, `StoreSettings.videoMonthlyLimit`, `VideoUploadSession`, `StoreVideoUsage`, and `MediaProviderJob`. Superseded by [[ADR_0032_Review_Video_On_Mux]] for provider details.
- 2026-06-09: Added `MediaCleanupRun` (cleanup audit log) and `OrphanImageQuarantine` (two-phase orphan-deletion state) tables; `cleanup-images` now marks-then-sweeps orphans behind a circuit-breaker instead of deleting immediately. Additive, single-deploy migration. See [[ADR_0030_Cleanup_Hardening]] and [[Maintenance_Runbook]].
- 2026-06-08: Added additive Cloudinary metadata fields to `ReviewMedia` and `PendingReviewImage`; public review responses keep `images` and add structured `media[]`. See [[ADR_0029_Review_Media_Metadata]].
- 2026-06-08: Extended `ProductReviewSummary` with `photoRating1Count` ... `photoRating5Count` so `/api/public/reviews` can return exact filtered `totalCount` / `totalPages` without raw `Review.count()` on public reads.
- 2026-06-08: Applied test-store legacy review media reconciliation. Copied 10 available old global assets, dropped 30 missing source URLs with explicit cleanup, and verified zero remaining global `review_images/...` URLs. See [[Legacy_Review_Media_Reconciliation]].
- 2026-06-07: Added `Review.hasImages` and `ReviewMedia` as the normalized media read model for indexed public photo-review filters; `Review.images` remains a legacy mirror. See [[ADR_0027_Review_Media_Read_Model]].
- 2026-06-08: Added review-list cursor indexes for keyset pagination while keeping legacy `page/limit` compatibility. See [[ADR_0028_Review_Cursor_Pagination]].
- 2026-06-06: Added `ProductReviewSummary` to the model map and documented that public rating/summary aggregates now read from this per-product read model. See [[ADR_0026_Product_Review_Summary_Read_Model]].
- 2026-05-23: Changed `StoreSettings.storefrontTheme` semantics from flat metadata to a backwards-compatible v2 stable/pending sync state; no schema migration required.
- 2026-05-23: Added nullable `StoreSettings.storefrontTheme` JSONB for active theme metadata used by runtime adapter selection.
- 2026-05-18: Added `PendingReviewImage.storeId` for D3 tenant-scoped Cloudinary upload tracking.
- 2026-05-18: Removed redundant Review prefix indexes `[storeId, productId]` and `[storeId, slug]`; the wider composite indexes cover those query prefixes and the drop-only migration is backwards-compatible.
- 2026-05-17: Added the migration safety (deploy-window / expand-contract) rule to the migration workflow section.
- 2026-05-17: Documented `[storeId, productId, status]` for canonical product-id listing/search badge reads and corrected the model count to include `PendingReviewImage`.
- 2026-05-17: Added `ProductSnapshot` to the model map for webhook/backfill-maintained product identity resolution.
