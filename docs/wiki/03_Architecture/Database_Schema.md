---
type: database
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-15
last_verified: 2026-07-15
confidence: high
tags:
  - database
  - prisma
  - schema
related:
  - "[[Index]]"
  - "[[Database_Map]]"
  - "[[ADR_0003_Review_Data_Model]]"
  - "[[ADR_0012_Pending_Upload_Registry]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
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
  - "prisma/migrations/20260710120000_add_review_request_email_lifecycle/migration.sql"
  - "prisma/migrations/20260710150000_harden_review_email_installation_lifecycle/migration.sql"
  - "prisma/migrations/20260710210000_add_review_email_retention_analytics_journal/migration.sql"
  - "prisma/migrations/20260715120000_add_review_email_batch_envelope_v32/migration.sql"
  - "src/lib/review-media.ts"
  - "src/lib/review-summary.ts"
  - "src/lib/cleanup-orphan-images.ts"
---

# Database Schema

## Agent Brief
Use this page for durable Prisma model shape and migration-history orientation,
not as the final source of truth. Verify all field names, defaults, indexes,
and relations in `prisma/schema.prisma` first, then inspect the migration files
that introduced the touched model. Current high-risk areas are review media,
AWS image pending/variant fields, Mux media jobs, summary read models,
two-phase orphan cleanup, and `ScheduledJobRunLock` scheduler idempotency.
Production migrations must remain expand/contract safe.

## Summary
PostgreSQL via Prisma. Source of truth: [prisma/schema.prisma](prisma/schema.prisma).

## Models

### `AuthToken`
ikas OAuth tokens, one row per app installation.

| Field | Type | Notes |
|---|---|---|
| `merchantId` | String | Indexed via PK side; reused as `storeId` everywhere |
| `authorizedAppId` | String `@id` | PK — unique per (merchant, app) install |
| `salesChannelId` | String? | From ikas |
| `createdAt`, `updatedAt` | DateTime | Standard |
| `accessToken` | String | OAuth access token |
| `tokenType` | String | Usually "bearer" |
| `expiresIn` | Int | Seconds |
| `expireDate` | DateTime | Computed at issue + refresh |
| `refreshToken` | String | OAuth refresh token |
| `scope` | String? | Space-separated scopes |

Behavior: `onCheckToken` ([src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)) refreshes when expired and writes back via `AuthTokenManager.updateExisting`; a deleted installation token is never recreated by refresh.
On install, `activateIkasStoreInstallation()` holds the store lifecycle lock and atomically replaces stale merchant tokens while activating the current `authorizedAppId` generation. See [[ADR_0036_Review_Request_Email_Architecture]].

### `IkasStoreInstallation`
Store-scoped lifecycle fence for OAuth/reinstall, review-email settings/order
ingest/reconciliation, and uninstall erasure. `authorizedAppId` is unique;
`generation` increases for a new installation identity; `status` moves through
`active`, `erasing`, and `erased`. The erased row remains as a tombstone so a
delayed callback or uninstall retry cannot resurrect/delete another generation.
All state transitions use the same transaction-scoped PostgreSQL advisory lock.

### Review-email Multi-Product Batch / Envelope V3.2

`ReviewEmailBatch` is the delivery-group sequence and durable duplicate
tombstone. It owns one protected recipient/timing/template snapshot and relates
many product-level `ReviewRequest` rows to one physical initial plus at most one
reminder. `ReviewEmailJob` represents a scheduled physical occurrence;
`ReviewEmailAttempt` represents a single provider-call boundary and immutable
maximum-five-item manifest. `ReviewEmailEvent` is a provider-neutral transport
ledger, while `ReviewEmailSuppression` and `ReviewEmailUnsubscribeToken` own
email-channel access separately from product review eligibility.

Tenant/generation fingerprint and live order/group unique indexes prevent
duplicate batches across webhook/reconciliation and HMAC rollout races.
Composite `(id, storeId)` FKs prevent cross-store order/batch/request/job
attachment. Legacy request-scoped job/token/session targets remain nullable only
for expand/contract overlap and SQL XOR constraints require exactly one target.

### Review-email V5 retention and DSR

The additive V5 tables keep customer-detail lifecycle separate from long-lived
merchant metrics:

- `ReviewRequestReceipt` is the order-product duplicate fence and analytics
  lock target. DSR closes it before reversing contributions; late provider
  events cannot reopen analytics.
- `ReviewEmailDataSubjectRun` uniquely scopes an idempotency-key hash to a
  store and stores deterministic immutable-journal evidence. Its request digest
  is derived from a versioned HMAC subject hash, and its persisted retention
  base prevents retries from shortening Object Lock. Raw email and raw
  idempotency keys are not persisted.
- `ReviewEmailMetricContribution` is a unique signed-delta ledger;
  `ReviewEmailDailyMetric` stores sparse merchant/day aggregates.
- `ReviewEmailSubjectBlock` uses folded identity only to stop future PII
  ingestion. Exact case-preserving identity is the sole DSR selector.
- `ReviewEmailPurgeRun` and `ReviewEmailJournalCoverageCheck` retain sanitized
  maintenance/restore evidence.
- `StoreDataErasureRun` also stores immutable journal evidence and a bounded
  phase/counter checkpoint. Its `attempts` value counts consecutive failures,
  not normal batch continuations.
- `ReviewRequest` references both order and line snapshots with `ON DELETE
  RESTRICT`; line-to-order remains cascading. DSR freezes direct-subject and
  request-linked parent IDs separately, locks the union, then conditionally
  deletes the final direct order or scrubs its customer PII when unrelated
  requests still exist.
- Review-email webhook/reconciliation/erasure maintenance tables persist only
  bounded error codes, not exception messages.

`Review.reviewRequestReceiptId` and `Review.reviewRequestId` are individually
unique and use `ON DELETE SET NULL`, so one receipt/request cannot create two
reviews and retention cannot cascade-delete the review accidentally. Full
contract: [[ADR_0036_Review_Request_Email_Architecture]].

### `Review`
Customer reviews. Public storefront submits; admin moderates.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String | Equals `merchantId` |
| `productId` | String | ikas product id |
| `rating` | Int | 1..5 (validated in API) |
| `comment` | String? `@db.VarChar(2000)` | Capped at DB AND API |
| `author` | String | Min 2, max 40 chars |
| `email` | String? | Optional |
| `status` | String `@default("pending")` | `pending` / `approved` / `rejected` (string literals, not enum) |
| `merchantReply` | String? `@db.VarChar(2000)` | Capped |
| `images` | String? | Legacy TEXT containing `JSON.stringify(string[])`; kept as compatibility mirror |
| `hasImages` | Boolean | Indexed public photo-review facet; do not replace with text search |
| `createdAt`, `updatedAt` | DateTime | |
| `productName` | String? | Snapshot at submit time (not synced if product later renamed) |
| `slug` | String | Required since 2026-04-04 migration |
| `title` | String? | Optional, max 60 chars |
| `media` | `ReviewMedia[]` | Normalized trusted image rows |

Indexes:
- `[storeId, productId, status]`
- `[storeId, status]`
- `[storeId, slug, status]`
- partial `[storeId, productId, createdAt] where status='approved' and hasImages=true`
- partial `[storeId, productId, createdAt desc, id desc] where status='approved'`
- partial `[storeId, productId, rating desc, createdAt desc, id desc] where status='approved'`
- partial `[storeId, productId, rating asc, createdAt desc, id desc] where status='approved'`
- partial `[storeId, productId, createdAt desc, id desc] where status='approved' and hasImages=true`

The two wider composite indexes also cover the old `(storeId, productId)` and
`(storeId, slug)` prefix lookups, so the standalone prefix indexes were removed
in migration `20260518130000_drop_redundant_review_indexes`.

Common queries:
- Public: `findMany({ storeId, productId, status: 'approved' })` + deterministic ordering + filters. Legacy `page/limit` is supported; widget load-more uses `nextCursor` keyset pagination when available.
- Public listing/PDP badges, summary distribution, and exact review-list totals: `ProductReviewSummary` by `(storeId, productId)`
- Public slug fallback: resolve current `ProductSnapshot` slug to product id, then read `ProductReviewSummary`; legacy direct slug read remains last resort for unresolved slugs
- Admin: `findMany({ storeId, status? })` ordered by `createdAt desc`

### `ReviewMedia`
Normalized review media rows. `Review.images` remains as a compatibility mirror, but new public image reads require AWS `ReviewMedia` rows with public variant descriptors.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `reviewId` | String | FK to `Review.id`; cascades on review delete |
| `storeId` | String | Denormalized tenant key for media queries and cleanup |
| `productId` | String | Denormalized ikas product id for product media queries |
| `url` | String `@db.VarChar(2048)` | Public render fallback URL for ready media; AWS image URLs must be under `media.renuvex.app` |
| `publicId` | String `@unique @db.VarChar(512)` | Provider family id; AWS uses `aws_s3:<storeId>:<assetId>` |
| `assetId` | String? `@db.VarChar(128)` | Legacy/provider-specific asset id when available |
| `version` | String? `@db.VarChar(64)` | Legacy/provider-specific version when available |
| `resourceType` | String `@default("image") @db.VarChar(32)` | `image` or `video` |
| `provider` | String `@default("aws_s3") @db.VarChar(64)` | AWS review-image default after cutover |
| `providerAssetId` | String? `@db.VarChar(512)` | Provider asset id; AWS image asset id or Mux asset id |
| `format` | String? `@db.VarChar(32)` | Normalized image format (`jpg`, `png`, `webp`, `gif`, `avif`) |
| `mimeType` | String? `@db.VarChar(128)` | Derived MIME type for the format |
| `width` / `height` | Int? | Intrinsic image dimensions |
| `bytes` | Int? | Provider-reported or decoded asset size |
| `sourceChecksumAlgorithm` / `sourceChecksumSha256` | String? | AWS upload integrity evidence |
| `metadataSource` | String `@default("unknown") @db.VarChar(64)` | `upload_response`, `admin_api`, or `unknown` |
| `metadataStatus` | String `@default("pending") @db.VarChar(64)` | `complete`, `partial`, `pending`, `invalid_signature`, `missing_asset` |
| `metadataFetchedAt` | DateTime? | Last metadata capture/repair time |
| `variantStatus` / `variantManifest` | mixed | AWS image variant readiness and public/private variant descriptors |
| `position` | Int | Stable per-review display order |
| `visible` | Boolean | Mirrors review public visibility; pending/rejected media stays hidden |
| `createdAt` | DateTime | |

Indexes:
- unique `[reviewId, position]`
- `[reviewId, position]`
- `[storeId, productId, visible, createdAt]`
- `[metadataStatus, createdAt]` - metadata diagnostics / legacy repair scans
- `[provider, providerAssetId]` and `[provider, storeId, providerAssetId]` - provider-scoped lookup
- `[provider, resourceType, variantStatus, createdAt]` - AWS image variant cleanup/readiness scans

Maintained by:
- `/api/public/reviews` POST for new trusted review images
- `/api/admin/reviews` PUT when status transitions change public visibility
- `Review` cascade on DELETE
- `scripts/rebuild-product-review-summaries.mjs` for summary repair when media visibility drifts
- AWS review-image register/publish paths for durable variant metadata

### `ProductReviewSummary`
Product-level aggregate read model for public storefront rating surfaces. Raw `Review` rows remain the source of truth.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String | Equals `merchantId` |
| `productId` | String | ikas product id |
| `approvedCount` | Int | Public approved review count |
| `ratingSum` | Int | Sum of approved ratings; used to format average |
| `averageRating` | Float | Stored derived value for read-model completeness |
| `rating1Count` ... `rating5Count` | Int | Bar chart/rating distribution buckets |
| `photoReviewCount` | Int | Approved review count where `Review.hasImages=true`; repaired by summary/media rebuild scripts when legacy rows are normalized |
| `photoRating1Count` ... `photoRating5Count` | Int | Exact approved photo-review buckets by rating; powers `hasImages=true&rating=N` `totalCount` without raw `Review.count()` |
| `mediaReviewCount` | Int | Approved review count where `Review.hasImages=true OR Review.hasVideo=true`; powers media gallery reads and `Fotoğraf ve Video` filtering when `mediaReviewCount > photoReviewCount` |
| `mediaRating1Count` ... `mediaRating5Count` | Int | Exact approved media-review buckets by rating; powers `hasMedia=true&rating=N` `totalCount` without raw `Review.count()` |
| `lastReviewAt` | DateTime? | Latest approved review timestamp |
| `createdAt`, `updatedAt` | DateTime | |

Constraints:
- `@@unique([storeId, productId])`

Maintained by:
- `/api/public/reviews` POST when a review is auto-approved
- `/api/admin/reviews` PUT when status transitions change public visibility
- `/api/admin/reviews` DELETE when an approved review is hard-deleted
- `scripts/rebuild-product-review-summaries.mjs` for repair/backfill
- `scripts/rebuild-product-review-summaries.mjs` fully rebuilds all summary buckets, including AWS image and Mux video media counts
- Migration `20260608170000_add_review_summary_photo_rating_counts` backfills existing summary rows from approved `Review.hasImages=true` rows. Migration `20260625090000_add_review_summary_media_counts` backfills approved `(hasImages OR hasVideo)` media buckets. Rebuild remains the operational repair tool for manual/import drift.

Read by:
- `/api/public/ratings`
- `/api/public/ratings-by-slug` after `ProductSnapshot` resolution
- `/api/public/reviews` for unfiltered `allCount`, `avgRating`, `ratingCounts`, and exact `totalCount` / `totalPages` across rating/photo/media filters

### `StoreSettings`
Per-merchant config. One row per merchant, created on OAuth callback.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String `@unique` | == merchantId |
| `createdAt`, `updatedAt` | DateTime | |
| `storefrontScripts` | Json? | Map: `{ [storefrontId]: ikasScriptId }` |
| `storefrontTheme` | Json? | Non-sensitive active storefront/theme sync state for runtime adapter selection |

The `storefrontScripts` map is an idempotency cache for re-installs and re-syncs. When v1 `listStorefrontJSScript` is available, the remote ikas script record is treated as source of truth and the map can be adopted/refreshed.

The `storefrontTheme` JSON is resolved from Admin API `listStorefront.themes[].isMainTheme` plus `mainStorefrontThemeId` fallback. Current shape is v2 state: `{ syncStatus, stable, pending, lastCheckedAt, verificationDueAt, verifiedAt }`. Public settings expose only the stable `runtime.themeAdapterKey/source`, not the full theme metadata. Legacy flat metadata is still accepted by the runtime parser.

### `WidgetSettings`
Per-widget JSON config.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String | |
| `widgetId` | String | One of `reviews` / `badge` / `carousel` / `popup` / `qa` / `summary` |
| `settings` | Json `@default("{}")` | Free-form, validated by `widgetDefs.ts` schema |
| `createdAt`, `updatedAt` | DateTime | |

Constraints:
- `@@unique([storeId, widgetId])` — one row per (merchant, widget)
- `@@index([storeId])`

Read pattern (admin and public): `getWidgetDefaults(widgetId) ⊕ sanitizeSettings(widgetId, row.settings)`. See [src/lib/widget-settings.ts](src/lib/widget-settings.ts).

### `ProductSnapshot`
Local read model for ikas product identity snapshots. ikas remains the source of truth.

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `storeId` | String | Equals `merchantId` |
| `productId` | String | ikas product UUID |
| `slug` | String? | Current ikas slug snapshot |
| `name` | String? | Current ikas name snapshot |
| `ikasUpdatedAt` | DateTime? | ikas product `updatedAt` timestamp |
| `lastSyncedAt` | DateTime | Last local sync time |

Indexes:
- unique `[storeId, productId]`
- `[storeId, slug]`

Maintained by install-time `listProduct` backfill, `/api/admin/sync-products`, and `/api/webhooks/ikas/products`.

### `PendingReviewImage`
Provider-agnostic registry of uploads not yet attached to a `Review`. The model name is legacy, but current review-image source writes AWS S3 upload intents. See [[ADR_0012_Pending_Upload_Registry]] and [[ADR_0034_AWS_Review_Image_Migration]].

| Field | Type | Notes |
|---|---|---|
| `publicId` | String `@id` | Provider family id; AWS uses `aws_s3:<storeId>:<assetId>` |
| `storeId` | String? | Merchant/tenant that owns the pending upload; nullable only for legacy rows |
| `uploadSessionId` | String? `@unique` | AWS upload intent/session id returned by `/api/public/upload/sign` |
| provider/source fields | mixed | Provider, asset id, S3 source key, checksum, processing and variant state |
| media metadata fields | mixed | Decoded/provider metadata staged until review submit (`format`, dimensions, bytes, status/source timestamps) |
| `createdAt` | DateTime `@default(now())` | Used by the cleanup cron's age filter |
| `ipHash` | String? | sha256(ip).slice(0,32) — optional abuse signal, not user identity |

Indexes:
- `[createdAt]` — cleanup cron walks this
- `[storeId, createdAt]` — tenant-scoped pending upload lookup / future tenant cleanup
- `[metadataStatus, createdAt]` - metadata diagnostics / legacy repair
- `[provider, providerAssetId]`, `[provider, storeId, providerAssetId]`, `[provider, variantStatus, createdAt]` - AWS image intent/register/cleanup scans

Lifecycle:
1. Widget POSTs `{storeId, fileName, contentType, bytes, checksumAlgorithm, checksum}` to `/api/public/upload/sign`; the endpoint creates an AWS pending intent and returns a presigned S3 POST.
2. Widget uploads directly to S3 and then POSTs `{storeId, assetId, uploadSessionId, objectKey, bytes, contentType, checksum}` to `/api/public/upload/register`.
3. The register endpoint validates the pending intent, S3 object key, metadata, size/type/checksum, and generates private AWS variants before marking the pending row `private_ready`.
4. `/api/public/reviews` POST accepts only same-store `private_ready` AWS image refs, creates `ReviewMedia`, publishes public variants if auto-approved, inserts the review, and deletes consumed pending rows inside provider-safe transactions.
5. `/api/admin/daily-maintenance` runs the pending-upload cleanup helper daily; `/api/admin/cleanup-pending-uploads` remains an explicit maintenance endpoint for the same helper. It deletes expired rows plus their AWS image object family.
6. Monthly `/api/admin/cleanup-images` is the safety-net fallback for orphaned AWS image families and keeps the two-phase quarantine/circuit-breaker model from [[ADR_0030_Cleanup_Hardening]].

### `MediaCleanupRun`
Audit log for the `cleanup-images` cron — one row per run. See [[ADR_0030_Cleanup_Hardening]].

| Field | Type | Notes |
|---|---|---|
| `id` | String `@id @default(uuid())` | |
| `startedAt` | DateTime `@default(now())` | Run start (set explicitly by the route) |
| `finishedAt` | DateTime? | Run end |
| `status` | String `@default("ok") @db.VarChar(32)` | `ok` / `tripped` / `error` / `skipped` |
| `trigger` | String `@default("cron") @db.VarChar(32)` | `cron` / `manual` (manual when `?force=1`) |
| `scanned` | Int | Provider asset families walked |
| `usedCount` | Int | Provider family ids in use (`ReviewMedia` + unexpired pending rows) |
| `candidates` | Int | Current orphans flagged this run |
| `quarantinedNew` | Int | Newly added to quarantine this run |
| `released` | Int | Un-quarantined (no longer orphan) this run |
| `deleted` | Int | Hard-deleted (swept) this run |
| `breakerTripped` | Boolean | Whether a guard tripped |
| `breakerReason` | String? `@db.VarChar(128)` | e.g. `empty-used-set …` / `ratio …` / `sweep … > …` |
| `forced` | Boolean | `?force=1` was used |
| `sampleDeleted` | Json? | Up to ~50 deleted publicIds, for forensic recovery |
| `error` | String? `@db.VarChar(512)` | Captured message when `status='error'` |
| `durationMs` | Int? | Wall-clock duration |

Indexes:
- `[startedAt]`
- `[status, startedAt]`

### `OrphanImageQuarantine`
Two-phase orphan-deletion state for `cleanup-images`: an orphan is marked here (phase 1) and only hard-deleted after a grace window if still orphaned (phase 2). See [[ADR_0030_Cleanup_Hardening]].

| Field | Type | Notes |
|---|---|---|
| `publicId` | String `@id @db.VarChar(512)` | Provider family id of the quarantined asset |
| `storeId` | String? | Best-effort tenant scope parsed from the publicId path |
| `reason` | String `@default("orphan_scan") @db.VarChar(64)` | Why quarantined |
| `quarantinedAt` | DateTime `@default(now())` | Phase-1 mark time; grace window measured from here (preserved across re-marks) |
| `lastSeenAt` | DateTime `@default(now())` | Last run it was still seen as an orphan |
| `scanCount` | Int `@default(1)` | Number of runs it has been flagged |

Indexes:
- `[quarantinedAt]`
- `[storeId]`

Maintained by `/api/admin/cleanup-images` (mark / release / sweep) via `src/lib/cleanup-orphan-images.ts`.

## Conventions
- All multi-tenant tables key on `storeId` (which is `merchantId`). No table is shared cross-tenant.
- String enums (status, widgetId) are not Postgres enums — kept as strings to avoid migrations on every state addition. Trade-off: type-safety lives in TS only.
- Timestamps default to UTC; format on display.

## Migrations
History documented in [[Database_Map]]. Notable themes: index churn (added → cleaned up), `helpful` feature (added → reverted), color settings churn (recent).

## Notes
- **JSON columns** (`settings`, `storefrontScripts`, `storefrontTheme`) are not validated at the DB layer. All validation must live in app code. Don't trust their shape after manual DB edits.
- `Review.images` is now a legacy mirror. The normalized media model is `ReviewMedia`; public photo filters should use `Review.hasImages`, and public media filters should use `Review.hasImages OR Review.hasVideo`.
- `ReviewMedia` metadata is additive. Public `images: string[]` remains the compatibility contract; `media[]` is an additive structured field for future media-heavy UI.
- No soft-delete. `prisma.review.delete` is hard delete.
- Orphan provider asset deletion **is** two-phase (mark → grace → sweep) via `OrphanImageQuarantine`; this is storage GC, not review soft-delete. AWS image cleanup deletes the object family, not a single URL. See [[ADR_0030_Cleanup_Hardening]] and [[ADR_0034_AWS_Review_Image_Migration]].

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/](prisma/migrations/)
- [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- [src/models/auth-token/manager.ts](src/models/auth-token/manager.ts)

## Obsidian Links
- [[Database_Map]]
- [[ADR_0003_Review_Data_Model]]
- [[ADR_0012_Pending_Upload_Registry]]
- [[ADR_0027_Review_Media_Read_Model]]
- [[ADR_0029_Review_Media_Metadata]]
- [[ADR_0030_Cleanup_Hardening]]
- [[Auth_And_Installation_Flow]]
- [[Widget_Customization]]

## Change Log
- 2026-07-04: Updated provider defaults to `aws_s3` after AWS-only cutover and legacy DB alignment. Current source writes AWS image provider ids and AWS variant manifests.
- 2026-06-09: Added `MediaCleanupRun` (cleanup audit log) and `OrphanImageQuarantine` (two-phase orphan-deletion state) models; `cleanup-images` now marks-then-sweeps orphans behind a circuit-breaker. Additive single-deploy migration. See [[ADR_0030_Cleanup_Hardening]].
- 2026-06-08: Added image metadata columns to `ReviewMedia` and `PendingReviewImage`; upload/register now stages verified upload-response metadata and review submit carries it into committed media rows. Related: [[ADR_0029_Review_Media_Metadata]].
- 2026-06-08: Added `photoRating1Count` ... `photoRating5Count` to `ProductReviewSummary` so public review-list filtered totals come from the read model instead of raw `Review.count()`.
- 2026-06-07: Added `Review.hasImages` and `ReviewMedia` for indexed public photo-review filters and normalized trusted media rows. Related: [[ADR_0027_Review_Media_Read_Model]].
- 2026-06-08: Added partial review cursor indexes and moved widget load-more to cursor/keyset pagination while preserving legacy page reads. Related: [[ADR_0028_Review_Cursor_Pagination]].
- 2026-06-06: Added `ProductReviewSummary` as the product-level aggregate read model for public rating badge, structured-data, and review summary distribution reads. See [[ADR_0026_Product_Review_Summary_Read_Model]].
- 2026-05-23: Upgraded `StoreSettings.storefrontTheme` app-layer shape to v2 stable/pending sync state; no DB migration needed because the column remains nullable JSON.
- 2026-05-23: Added nullable `StoreSettings.storefrontTheme` JSONB for active theme metadata used by runtime adapter selection.
- 2026-05-18: Added nullable `PendingReviewImage.storeId` plus `[storeId, createdAt]` for D3 tenant-scoped image uploads. New writes always set `storeId`; nullable exists for safe migration over old rows.
- 2026-05-18: Removed redundant Review prefix indexes `[storeId, productId]` and `[storeId, slug]`; retained `[storeId, productId, status]`, `[storeId, status]`, and `[storeId, slug, status]`.
- 2026-05-17: Removed unused `ProductSnapshot.deleted` column + `[storeId, slug, deleted]` index — ikas has no product-delete webhook scope, so it was always false. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added `[storeId, productId, status]` index for canonical product-id listing/search rating reads. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added `ProductSnapshot` read model for current ikas product id/slug/name resolution.
- 2026-05-12: Added `PendingReviewImage` model — registry of image uploads not yet attached to a Review. See [[ADR_0012_Pending_Upload_Registry]].
