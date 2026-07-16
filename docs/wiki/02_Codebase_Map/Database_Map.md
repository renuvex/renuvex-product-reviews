---
type: database
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-16
last_verified: 2026-07-16
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
  - "prisma/migrations/20260710120000_add_review_request_email_lifecycle/migration.sql"
  - "prisma/migrations/20260710150000_harden_review_email_installation_lifecycle/migration.sql"
  - "prisma/migrations/20260710210000_add_review_email_retention_analytics_journal/migration.sql"
  - "prisma/migrations/20260715120000_add_review_email_batch_envelope_v32/migration.sql"
  - "src/lib/ikas-installation-lifecycle.ts"
  - "src/lib/cleanup-orphan-images.ts"
  - "src/lib/review-email/"
  - "src/lib/review-media.ts"
  - "src/lib/review-summary.ts"
  - "src/lib/media/outbox.ts"
  - "src/lib/media/sessions.ts"
  - "scripts/rebuild-product-review-summaries.mjs"
---

# Database Map

## Agent Brief
Use this page to route Prisma/Postgres work. It summarizes the active review,
media, cleanup, video, and review-request email lifecycle tables plus the
index strategy. Source of truth remains [prisma/schema.prisma](prisma/schema.prisma)
and the matching migration files; never use this page to justify `prisma db
push` or destructive production schema changes.

## Summary
Postgres (Supabase) accessed via Prisma. Core review/media models now include the image-era tables, the additive video lifecycle tables, and the disabled source-only review-request email V5 plus Multi-Product Batch/Envelope V3.2 lifecycle/receipt/DSR/analytics/retention tables. Pooler URL via `DATABASE_URL` (transaction pooler 6543, pgbouncer); migration URL via `DIRECT_URL` (session pooler 5432). Detailed field-level reference in [[Database_Schema]].

## Files

| File | Role |
|---|---|
| [prisma/schema.prisma](prisma/schema.prisma) | Schema source |
| [prisma/migrations/](prisma/migrations/) | Migration history (29+ files, 2026-03 → 2026-06) |
| [src/lib/prisma.ts](src/lib/prisma.ts) | Prisma client singleton |
| [src/models/auth-token/index.ts](src/models/auth-token/index.ts) | `AuthToken` interface |
| [src/models/auth-token/manager.ts](src/models/auth-token/manager.ts) | `AuthTokenManager` reads tokens and refreshes existing rows without recreating erased installations; install/delete writes belong to the lifecycle helper and erasure transaction. |

## Models (one-line summaries)

| Model | Primary key | Purpose |
|---|---|---|
| `AuthToken` | `authorizedAppId` | OAuth tokens per app installation; refresh updates only an existing tenant-matching row. `[merchantId, updatedAt]` supports reinstall cleanup and latest-token lookup. |
| `IkasStoreInstallation` | `storeId`, unique `authorizedAppId` | Active/erasing/erased installation generation and tombstone used by the shared PostgreSQL transaction advisory-lock fence. |
| `Review` | `id` (uuid) | Reviews; denormalized (`productName`, `slug`); status workflow; additive `hasVideo` marks video-bearing reviews and `moderationVersion` dedupes async provider moderation jobs. Review-request tokens can set `reviewRequestId`, `verifiedBuyer`, `verifiedAt`, and `verificationSource`. |
| `ReviewMedia` | `id` (uuid), unique `publicId` | Normalized trusted media rows. New images are AWS-backed (`provider='aws_s3'`) and use `variantManifest`; videos use Mux. `visible` + `Review.status` remains the public gate. |
| `ProductReviewSummary` | `id` (uuid), unique `(storeId, productId)` | Product-level aggregate read model for public badge, structured-data, summary distribution, and exact filtered review-list counts |
| `StoreSettings` | `id` (uuid), unique `storeId` | Per-merchant config; tracks storefront script/theme sync state and additive `videoMonthlyLimit` quota gate (default `0`, so video stays closed). |
| `WidgetSettings` | `id` (uuid), unique `(storeId, widgetId)` | Per-widget JSON settings |
| `ProductSnapshot` | `id` (uuid), unique `(storeId, productId)` | Current ikas product slug/name snapshot for fallback resolution |
| `PendingReviewImage` | `publicId` | Legacy-named pending media registry. AWS image upload intents and Mux video sessions stage here behind provider-aware fields until review submit or cleanup. |
| `MediaCleanupRun` | `id` (uuid) | Audit log, one row per `cleanup-images` cron run (scan/quarantine/sweep counts, breaker status, `sampleDeleted` sample). See [[ADR_0030_Cleanup_Hardening]] |
| `OrphanImageQuarantine` | `publicId` | Two-phase orphan-deletion state: orphans are marked here, then hard-deleted only after a grace window if still orphaned. See [[ADR_0030_Cleanup_Hardening]] |
| `VideoUploadSession` | `id` (uuid), unique `tokenHash` | Hashed shopper upload session, Mux upload/asset/playback ids, status, poster/playback metadata, explicit `quotaState`, and 24h expiry. Raw tokens are never stored. |
| `VideoUploadPerformanceSample` | `id` (uuid), unique `uploadSessionId` | Sanitized one-row-per-session upload timing sample for diagnosing Mux direct-upload transfer, retry, complete, and processing-poll durations. Tokens, upload URLs, signed URLs, playback IDs, file names, IPs, and raw user-agent values are never stored. |
| `StoreVideoUsage` | `(storeId, month)` | Atomic monthly quota reserve/consume counters for feature-gated video uploads. |
| `MediaProviderJob` | `id` (uuid), unique `dedupeKey` | DB outbox for provider operations (`resolve_video_asset`, `reconcile_video`, `expire_upload_session`, `publish_video`, `protect_video`, `cleanup_video`, `cleanup_image`) dispatched through QStash with idempotent retries, stale-lock recovery, and DLQ/manual-repair state. |
| `MediaProviderLease` | `key` | Expiring per-session/per-asset provider mutation lease with a fencing version. It serializes publish/protect/delete work without holding a database transaction open during a provider HTTP call. |
| `ReviewEmailSettings` | `storeId` | Merchant review-request email settings: enable flag, delivery trigger mode, strict consent mode, first/reminder delay, sender display name, Reply-To, logo, color, locale, and template version. |
| `IkasOrderWebhookEvent` | `id` (uuid), unique `providerEventId` | Idempotent ikas order webhook audit/wake-up state for review-request email; stores only normalized ids/status and a payload digest, never the raw payload. |
| `IkasOrderSnapshot` / `IkasOrderLineSnapshot` | `id` (uuid), unique order/line keys | Canonical order and order-line eligibility evidence from `listOrder`, with hashed/encrypted customer email and package/line status evidence. |
| `ReviewEmailBatch` | `id` (uuid), unique tenant/generation/fingerprint plus live order/group | One canonical delivery-group review sequence and recipient/timing/template snapshot. It groups many product requests under one physical initial and at most one reminder, then remains as a protected duplicate tombstone after detail purge. |
| `ReviewRequest` / `ReviewRequestToken` | `id` (uuid), unique product request, token hash, and attempt link | Product-scoped review right plus versioned request/batch access token. Batch tokens start `prepared`, activate only at `sendCommittedAt`, and expire 30 days later; raw values exist only in sender memory. Request/batch expiry extends to cover each scheduled reminder plus its token window. |
| `ReviewRequestSession` | `id` (uuid), unique `sessionHash` | Two-hour host-only browser session created by fragment-token exchange. Multiple devices are allowed; the cookie is HttpOnly and only an HMAC hash is stored. |
| `ReviewEmailJob` / `ReviewEmailAttempt` / `ReviewEmailEvent` | `id` (uuid), unique dedupe/correlation/transport ids | Physical-email schedule, one immutable provider-call attempt, and provider-neutral event ledger. Jobs carry lease/fencing state; attempts distinguish pre-call, committed ambiguous, accepted, and delivery evidence. Exact transport redelivery dedupes without collapsing distinct same-type provider facts. AWS queues will carry only opaque job ids later. |
| `ReviewEmailSuppression` / `ReviewEmailUnsubscribeToken` | scoped recipient identity / unique token hash | Store/category recipient access policy from permanent bounce, complaint, or explicit unsubscribe. Every token snapshots the versioned case-preserving exact recipient HMAC from its batch as well as the folded policy key. The nullable attempt link may be purged without losing exact DSR identity or old-link suppression behavior; no plaintext recipient or new token-level ciphertext is retained. |
| `ReviewEmailSubjectBlock` | unique `storeId+installationGeneration+foldedSubjectHash` | Active-installation reingestion/suppression fence. Folded identity never selects DSR deletion targets. |
| `ReviewRequestReceipt` | unique `storeId+installationGeneration+orderProductFingerprint` | Durable duplicate-request receipt plus exact-subject link and compact signed analytics manifest. `analyticsClosedAt` fences late provider events; DSR clears subject/manifest fields while preserving the order-product fingerprint. |
| `ReviewEmailDailyMetric` / `ReviewEmailMetricContribution` | unique metric dimensions / unique contribution dedupe | Customer-direct-identifier-free merchant analytics. Signed deltas support idempotent inserts and one-time DSR reversal; contribution tombstones retain dedupe evidence for 210 days. |
| `ReviewEmailDataSubjectRun` | unique `storeId+idempotencyKeyHash` | Exact-subject DSR workflow, request digest, progress, deterministic journal key/digest, S3 VersionId/ETag/checksum/retention evidence, and sanitized retry/error state. |
| `ReviewEmailPurgeRun` | `id` (uuid) | Bounded review-email retention report/enforce evidence: batch, duration, candidate, delete, and sanitized failure counts. |
| `ReviewEmailJournalCoverageCheck` | `id` (uuid) | Restore/journal coverage result, genesis/earliest-safe-restore evidence, verified/replayed/conflicting counts, and sanitized failure code. |
| `IkasOrderReconciliationCursor` / `StoreDataErasureRun` | `storeId` / `id` | Reconciliation window/page cursor acquired only for an active enabled installation, and uninstall/personal-data erasure evidence with authorized-app/generation identity plus bounded exponential retries. |

## Review-email analytics metric contract

The sparse daily aggregate separates three different units. Do not combine
these fields into one denominator:

- Physical-email attempt evidence: `accepted`, `delivered`, `delayed`,
  `bounced`, `complained`, `rejected`, `failed`, and `outcomeUnknown`. These are
  evidence facts rather than mutually exclusive terminal buckets. Distinct
  provider facts are idempotent; `outcomeUnknown` receives a signed `-1`
  correction when later evidence or audited `confirmed_not_sent` resolves it.
- Product/request evidence: `initialRequestsIncluded` and
  `reminderRequestsIncluded` count products in immutable attempt manifests;
  `reviewedRequests`, `reviewsViaReminder`, and `skippedRequests` count the
  corresponding per-product lifecycle. A skipped product remains in the
  conversion denominator.
- Batch evidence: `batchesWithReview` records the first review in a batch and
  `completedBatches` records terminal resolution reached by the review-center
  submit/skip flow. Unique contribution keys ensure each batch fact is counted
  at most once.

The retained `skipped` column is not emitted by the current Batch/Envelope
producer and must not be exposed as a dashboard metric until it has an explicit
producer contract. Review conversion is cohort-aligned to the first physical
initial acceptance when available; a `sent_unknown` submission falls back to
the source attempt's accepted/committed timestamp. Reminder attribution requires
the submitting token's source attempt to include that request. Open/click
tracking, revenue attribution, and the admin analytics UI are intentionally not
implemented in this source phase.

## Index strategy
On install lifecycle tables:
- `AuthToken[merchantId, updatedAt]` supports merchant-scoped token replacement, erasure, and latest-install lookup without a table scan.
- unique `IkasStoreInstallation.authorizedAppId` prevents one installation identity from binding to multiple stores; `[status, updatedAt]` supports bounded operational scans.

On review-email V5 tables:
- unique `ReviewEmailDataSubjectRun[storeId, idempotencyKeyHash]` makes concurrent DSR creation idempotent within a tenant; `requestDigest` detects unsafe key reuse.
- unique `ReviewRequestReceipt[storeId, installationGeneration, orderProductFingerprint]` prevents duplicate request creation across webhook/reconciliation retries.
- unique `Review.reviewRequestReceiptId` and existing unique `Review.reviewRequestId` provide DB-level one-review-per-request/receipt guarantees; both relations use `ON DELETE SET NULL` for retention/erasure.
- `ReviewRequest.orderSnapshotId` and `orderLineSnapshotId` use explicit
  non-deferrable `ON DELETE RESTRICT`; `IkasOrderLineSnapshot.orderSnapshotId`
  remains `ON DELETE CASCADE`. A parent order/line cannot remove a live request,
  while deleting a request first permits bounded order-family cleanup.
- exact-subject and folded-subject indexes are separate by design. Folded indexes support suppression only and must never become an erasure selector.
- unsubscribe-token DSR lookup uses `storeId` plus every retained exact-HMAC
  candidate, regardless of token status or installation generation. Frozen
  token ids are deleted identically by normal DSR execution and journal replay;
  the folded policy hash is never an erasure selector.

On review-email Batch/Envelope V3.2 tables:
- unique `ReviewEmailBatch[storeId, installationGeneration, batchFingerprint]`
  is the durable logical-group/tombstone fence. A partial unique index on
  `(storeId, installationGeneration, orderSnapshotId, deliveryGroupKey)` keeps
  old/new HMAC writers from creating two live batches for one order group.
- composite FKs bind `ReviewEmailBatch` to its tenant-owned order snapshot and
  bind `ReviewRequest`/`ReviewEmailJob` to a batch with the same `storeId`.
  SQL XOR checks permit exactly one legacy request or new batch target during
  expand/contract overlap.
- unique product membership within a batch, request-level review uniqueness,
  and transactional CAS preserve independent product reviews under concurrent
  sessions. Attempt recipient/manifest snapshots become immutable at
  `sendCommittedAt`.
- partial `(transport, transportEventId)` uniqueness dedupes only exact event
  transport redelivery. Attempt evidence uses first/last timestamps and signed
  metric contributions instead of a lossy total-order status enum.

Review-email operational failure columns are bounded code fields
(`lastErrorCode` / `sanitizedErrorCode`, `VARCHAR(128)`). They never store raw
exception text; unknown failures use fixed context fallbacks.

On `Review`:
- `[storeId, productId, status]` — canonical listing/search badge resolution by ikas product id
- `[storeId, status]` — admin filtered list
- `[storeId, slug, status]` — legacy combined slug fallback path (composite added 2026-04)

`[storeId, productId, status]` also covers the leftmost `(storeId, productId)` prefix, and `[storeId, slug, status]` covers `(storeId, slug)`. The old two-column prefix indexes were removed in `20260518130000_drop_redundant_review_indexes` to reduce write amplification on the highest-write table.

The migrations show iterative tuning: redundant indexes have been cleaned up more than once. Before adding a new index, scan `prisma/migrations/*` for past attempts.

On `ProductReviewSummary`:
- unique `[storeId, productId]` - public badge, structured-data, `/api/public/ratings`, review summary distribution, and `/api/public/reviews` `totalCount` / `totalPages` read this aggregate row instead of recomputing from raw `Review.groupBy()` or `Review.count()` on every storefront request.

On `ReviewMedia`:
- unique `publicId` - one committed media asset belongs to one review row (`aws_s3:<storeId>:<assetId>` image id or prefixed `mux:<assetId>` video id). The DB default remains additive/legacy-safe, but new source writes provider explicitly.
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
- `MediaProviderJob`: `dedupeKey`, `status/availableAt`, `lockedAt`, `provider/action/status`, and `uploadSessionId` keep provider jobs resumable, stale-lock recoverable, and deduped. It owns provider mutations, bounded Mux reconciliation, exact upload-session expiry, and AWS image cleanup/publish/revoke work. Future-scheduled lifecycle jobs are healthy state, not due/stuck work.
- `MediaProviderLease`: the primary key is the serialization key (`video-session:<id>` or `mux-asset:<assetId>`); `leaseVersion` is a fencing token and expired leases can be atomically replaced.

On review-request email lifecycle:
- `Review.verifiedBuyer` slices use `[storeId, verifiedBuyer, createdAt]`.
- `Review.reviewRequestId`, request store/order-line ownership, `ReviewRequestToken.tokenHash`, token-attempt ownership, `ReviewRequestSession.sessionHash`, job request/kind/sequence, attempt correlation/number, SES message ids, and suppression store/email/reason constraints keep parallel submit, token lookup, dispatch, callbacks, and suppression idempotent.
- The submit path conditionally transitions `ReviewRequest`, token, and session in the same DB transaction as `Review.create`; `Review.reviewRequestId @unique` is the final database-level one-review guarantee.
- Reminder jobs are created only after first-send acceptance and use actual `firstSentAt + reminderDelayDays`. Each scheduled reminder extends request expiry to at least `sendAfter + 30 days`, so max-delay reminders cannot be invalidated by an earlier request deadline.
- Reconciliation ownership uses `leaseOwner + leaseVersion` compare-and-set and persists the same window/page until completion. Email-domain tables have RLS enabled and browser roles receive no direct table access.

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
- `ReviewMedia` is the normalized media read model. New review-image writes use AWS `variantManifest` / `provider='aws_s3'`; legacy image-provider rows were pre-public test data and were retired by the AWS-only teardown data-alignment gate, not migrated.
- Review Video is Mux-only in the local schema. New review-image rows are AWS-backed; Mux video rows keep their provider lifecycle in `MediaProviderJob`.
- Review Video upload performance diagnostics are stored in `VideoUploadPerformanceSample`. Treat the table as operational evidence, not source-of-truth lifecycle state; `VideoUploadSession`, `WebhookEvent`, and `MediaProviderJob` remain authoritative for provider lifecycle.
- Legacy global image-provider paths (`review_images/...` without `stores/<storeId>`) are not trusted tenant media. The old reconciliation scripts were removed during the AWS-only teardown; do not reintroduce legacy provider trust for storefront reads.
- `Review.status` is a string column, not a Postgres enum. Code uses `'pending' | 'approved' | 'rejected'` literals. Be consistent.
- `StoreSettings.storefrontScripts` is a JSON map `{ [storefrontId]: ikasScriptId }` used as an idempotency cache. Remote ikas script listing is the source of truth when available, so re-installs adopt/update existing scripts instead of creating duplicates. See [[Auth_And_Installation_Flow]].
- `StoreSettings.storefrontTheme` stores non-sensitive active storefront/theme sync state resolved from `listStorefront.themes[].isMainTheme`. Current app-layer shape is `{ syncStatus, stable, pending, lastCheckedAt, verificationDueAt, verifiedAt }`; public settings expose only the stable `runtime.themeAdapterKey/source` to select Ozy vs generic adapter.
- `AuthToken` has `merchantId` (column) AND `authorizedAppId` (PK). Both are needed: `authorizedAppId` is unique per install, `merchantId` is shared across installs. The callback `deleteMany({ where: { merchantId } })` uses this to clean reinstalls.

## Related Source Files
- [prisma/schema.prisma](prisma/schema.prisma)
- [prisma/migrations/](prisma/migrations/)
- [src/lib/prisma.ts](src/lib/prisma.ts)
- [src/lib/review-media.ts](src/lib/review-media.ts)
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
- 2026-06-08: Added additive image metadata fields to `ReviewMedia` and `PendingReviewImage`; public review responses keep `images` and add structured `media[]`. See [[ADR_0029_Review_Media_Metadata]].
- 2026-06-08: Extended `ProductReviewSummary` with `photoRating1Count` ... `photoRating5Count` so `/api/public/reviews` can return exact filtered `totalCount` / `totalPages` without raw `Review.count()` on public reads.
- 2026-06-08: Applied test-store legacy review media reconciliation. Copied 10 available old global assets, dropped 30 missing source URLs with explicit cleanup, and verified zero remaining global `review_images/...` URLs. See [[Legacy_Review_Media_Reconciliation]].
- 2026-06-07: Added `Review.hasImages` and `ReviewMedia` as the normalized media read model for indexed public photo-review filters; `Review.images` remains a legacy mirror. See [[ADR_0027_Review_Media_Read_Model]].
- 2026-06-08: Added review-list cursor indexes for keyset pagination while keeping legacy `page/limit` compatibility. See [[ADR_0028_Review_Cursor_Pagination]].
- 2026-06-06: Added `ProductReviewSummary` to the model map and documented that public rating/summary aggregates now read from this per-product read model. See [[ADR_0026_Product_Review_Summary_Read_Model]].
- 2026-05-23: Changed `StoreSettings.storefrontTheme` semantics from flat metadata to a backwards-compatible v2 stable/pending sync state; no schema migration required.
- 2026-05-23: Added nullable `StoreSettings.storefrontTheme` JSONB for active theme metadata used by runtime adapter selection.
- 2026-05-18: Added `PendingReviewImage.storeId` for D3 tenant-scoped image upload tracking.
- 2026-05-18: Removed redundant Review prefix indexes `[storeId, productId]` and `[storeId, slug]`; the wider composite indexes cover those query prefixes and the drop-only migration is backwards-compatible.
- 2026-05-17: Added the migration safety (deploy-window / expand-contract) rule to the migration workflow section.
- 2026-05-17: Documented `[storeId, productId, status]` for canonical product-id listing/search badge reads and corrected the model count to include `PendingReviewImage`.
- 2026-05-17: Added `ProductSnapshot` to the model map for webhook/backfill-maintained product identity resolution.
