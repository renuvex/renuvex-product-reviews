---
type: api
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-15
last_verified: 2026-06-15
confidence: high
tags:
  - api
  - routes
related:
  - "[[Index]]"
  - "[[API_Design]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[Security_And_Rate_Limits]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
  - "[[ADR_0007_Photo_Strip_Cap_And_Rotation]]"
  - "[[ADR_0015_Canonical_Product_Identity]]"
  - "[[ADR_0026_Product_Review_Summary_Read_Model]]"
  - "[[ADR_0028_Review_Cursor_Pagination]]"
source_files:
  - "src/app/api/admin/reviews/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/lib/review-media.ts"
  - "src/lib/review-summary.ts"
  - "src/lib/media/access.ts"
  - "src/app/api/public/upload/video/capability/route.ts"
  - "src/lib/media/config.ts"
  - "src/lib/media/constants.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/moderation.ts"
  - "src/lib/media/moderation-intent.ts"
  - "src/lib/media/providers/cloudflare-stream.ts"
  - "src/lib/media/providers/cloudinary-image.ts"
  - "src/lib/media/providers/r2.ts"
  - "src/lib/media/reconciliation.ts"
  - "src/lib/media/sessions.ts"
  - "src/lib/media/stream-webhook.ts"
  - "src/lib/media/video-policy.ts"
  - "src/lib/media/video-processing.ts"
  - "scripts/rebuild-product-review-summaries.mjs"
  - "scripts/backfill-review-media.mjs"
  - "scripts/audit-legacy-review-media.mjs"
  - "scripts/reconcile-legacy-review-media.mjs"
---

# Backend / API Map

## Summary
Three groups of API routes:
- **`/api/admin/*`** — gated by JWT (`getUserFromRequest`), called by the merchant admin UI.
- **`/api/public/*`** — CORS-open (`Access-Control-Allow-Origin: *`), called by `widget.js` from any storefront. Rate-limited via Upstash Redis.
- **`/api/oauth/*`** — install / callback flow.
- **`/api/preview/*`** — settings + fixtures for the admin live-preview iframe.
- **`/api/ikas/*`** — server-side calls to the ikas Admin GraphQL API (example: `get-merchant`).

## Admin (JWT-gated)

| Method + Path | Source | Purpose |
|---|---|---|
| GET `/api/admin/reviews?page&limit&status` | [route.ts](src/app/api/admin/reviews/route.ts) | Paginated reviews for `merchantId` |
| PUT `/api/admin/reviews` `{ id, status?, merchantReply? }` | same | Update status / reply |
| DELETE `/api/admin/reviews?id=` | same | Hard delete |
| GET `/api/admin/reviews/video-playback?mediaId=` | [route.ts](src/app/api/admin/reviews/video-playback/route.ts) | Short-lived signed HLS URL for pending/admin video preview. Provider ids stay server-side. |
| GET `/api/admin/settings` | [route.ts](src/app/api/admin/settings/route.ts) | All widget settings as map (defaults merged), plus read-only `meta.videoUsage` for the current UTC month. Metadata is not part of the editable settings payload. |
| PUT `/api/admin/settings` `{ widgetId, settings }` | same | Validate + sanitize + upsert into `WidgetSettings`; schedules lightweight storefront theme sync after the response |
| POST `/api/admin/inject-scripts` | [route.ts](src/app/api/admin/inject-scripts/route.ts) | Non-destructively create/update this app's loader script on each storefront; recreates only for known missing/deleted script ids |
| POST `/api/admin/storefront-theme/sync` | [route.ts](src/app/api/admin/storefront-theme/sync/route.ts) | Lightweight active theme sync from ikas `listStorefront`; no script create/update |
| POST `/api/admin/sync-products` | [route.ts](src/app/api/admin/sync-products/route.ts) | Register product webhooks and backfill `ProductSnapshot` from ikas `listProduct` |
| GET `/api/admin/daily-maintenance` (Bearer CRON) | [route.ts](src/app/api/admin/daily-maintenance/route.ts) | Vercel cron: daily batch storefront theme verification plus pending upload cleanup + storefront script reconciliation + bounded durable `ReviewMedia` metadata backfill (Cloudinary Admin API, self-healing; `src/lib/review-media-metadata-backfill.ts`); route also supports lightweight sub-daily theme verification if the deploy plan supports it |
| GET `/api/admin/reconcile-storefront-scripts` (Bearer CRON) | [route.ts](src/app/api/admin/reconcile-storefront-scripts/route.ts) | Explicit non-destructive storefront script reconciliation for existing merchants |
| GET `/api/admin/cleanup-pending-uploads` (Bearer CRON) | [route.ts](src/app/api/admin/cleanup-pending-uploads/route.ts) | Explicit PendingReviewImage cleanup using the same helper as daily maintenance |
| GET `/api/admin/cleanup-images` (Bearer CRON) | [route.ts](src/app/api/admin/cleanup-images/route.ts) | Monthly Cloudinary `review_images/*` fallback scan → delete orphans |
| GET `/api/ikas/get-merchant` | [route.ts](src/app/api/ikas/get-merchant/route.ts) | Demo: fetches merchant via ikas Admin GQL |

### Auth gate
All admin routes start with `getUserFromRequest(request)` from [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts) — verifies JWT, returns `{ merchantId, authorizedAppId }`. Returns 401 if missing/invalid.

## Public (CORS-open, no auth)

| Method + Path | Source | Purpose |
|---|---|---|
| OPTIONS `/api/public/*` | each route | CORS preflight via `corsOptions()` |
| GET `/api/public/reviews?storeId&productId&page&orderBy&rating&hasImages&hasMedia&limit&cursor` | [route.ts](src/app/api/public/reviews/route.ts) | Approved review rows + `ProductReviewSummary` distribution/average/count with explicit public field whitelist. Exact `totalCount` / `totalPages` for unfiltered/rating/photo filters come from summary buckets; `hasMedia=true` uses an approved `(hasImages OR hasVideo)` count because video counts are not yet in `ProductReviewSummary`. Legacy `page/limit` remains supported; responses include signed `nextCursor` and cursor requests use keyset pagination without `skip`. Tampered, unsigned, or context-mismatched cursors return `400`. `hasImages=true` uses indexed `Review.hasImages`; `hasMedia=true` is reserved for the media strip and cannot be combined with `hasImages`. Response `images` remains image-only; additive `media[]` exposes `{ type, url, posterUrl, thumbnailUrl, durationMs, width, height, position }` without provider ids. |
| POST `/api/public/reviews` body | same | Submit review (validation + StoreSettings/ProductSnapshot target verification + profanity + rate-limit + trusted image URLs/video token + auto-approve). Writes `Review`, legacy `Review.images`, `Review.hasImages`, `Review.hasVideo`, `ReviewMedia`, pending media cleanup, and summary update transactionally. v1 rejects mixed image+video; video-bearing reviews always start `pending`. Client `slug`/`productName`/`email` are ignored. |
| GET `/api/public/ratings?storeId&productIds=a,b,c` | [route.ts](src/app/api/public/ratings/route.ts) | Bulk avg+count per canonical ikas product id from `ProductReviewSummary` (primary listing/search badge path; see [[ADR_0015_Canonical_Product_Identity]] and [[ADR_0026_Product_Review_Summary_Read_Model]]); shares a 300/min/IP read rate limit with `ratings-by-slug` |
| GET `/api/public/ratings-by-slug?storeId&slugs=a,b,c` | [route.ts](src/app/api/public/ratings-by-slug/route.ts) | DOM-only fallback: resolve current slug through `ProductSnapshot`, then read `ProductReviewSummary` by product id; legacy direct slug read is last resort; shares the rating-read rate limit |
| GET `/api/public/settings?publicApiKey=<merchantId>` | [route.ts](src/app/api/public/settings/route.ts) | Widget config map (per widgetId). Cloud name **not** in response — it is build-time injected into the widget bundle (see [[ADR_0008_Cloud_Name_Build_Time_Only]]). |
| POST `/api/public/upload/sign` body `{ storeId }` | [route.ts](src/app/api/public/upload/sign/route.ts) | Cloudinary signed direct upload scoped to `review_images/stores/<storeId>` after StoreSettings verification |
| POST `/api/public/upload/register` body `{ storeId, secureUrl, metadata? }` | [route.ts](src/app/api/public/upload/register/route.ts) | Register a completed tenant-scoped Cloudinary upload in `PendingReviewImage` for cleanup. Optional signed Cloudinary upload-response metadata is verified server-side before dimensions/format/bytes are staged for `ReviewMedia`. |
| GET `/api/public/upload/video/capability?storeId=` | [route.ts](src/app/api/public/upload/video/capability/route.ts) | Fresh `no-store` video capability check. Returns only `{ enabled, reason }`; quota counts and provider configuration remain server-private. |
| POST `/api/public/upload/video/initiate` | [route.ts](src/app/api/public/upload/video/initiate/route.ts) | Start gated R2 multipart video upload; validates feature gates, quota, product/store ownership, MIME, and 150MB size. Returns opaque session token, part size/count, and max parallelism. |
| POST `/api/public/upload/video/parts` | [route.ts](src/app/api/public/upload/video/parts/route.ts) | Return short-lived presigned R2 part URLs and already-completed part ETags for resume. |
| POST `/api/public/upload/video/complete` | [route.ts](src/app/api/public/upload/video/complete/route.ts) | Complete multipart upload, HEAD/signature-check master object, enqueue Stream copy job, and move session to processing. |
| GET `/api/public/upload/video/status?token=` | [route.ts](src/app/api/public/upload/video/status/route.ts) | Poll session processing/ready/failed state without exposing provider admin APIs. |
| DELETE `/api/public/upload/video` | [route.ts](src/app/api/public/upload/video/route.ts) | Atomically mark the session aborted and create its provider-aware cleanup outbox job. Provider calls are worker-owned; the public route does not delete R2/Stream assets directly. |

### Caching
Storefront configuration and review GET responses use the documented edge-cache policy. The video capability endpoint is intentionally excluded and sends `Cache-Control: no-store` because reserved and consumed quota can change between wizard openings. See [[Caching_And_Performance]].

### Rate limits (Upstash Redis)
- `/api/public/reviews` POST → 3 / 10min / IP
- `/api/public/upload/sign` POST → 10 / 10min / IP
- `/api/public/ratings` + `/api/public/ratings-by-slug` GET → 300 / 60sec / IP, shared key
- `/api/public/upload/register` POST -> 30 / 10min / IP
- `/api/public/upload/video/initiate` POST -> 10 / 10min / IP, plus store-level monthly quota reservation.
Detail in [[Security_And_Rate_Limits]].

## Internal async media jobs

| Method + Path | Source | Purpose |
|---|---|---|
| POST `/api/internal/media-jobs` | [route.ts](src/app/api/internal/media-jobs/route.ts) | QStash-signed DB outbox worker for Stream prepare/publish/protect and R2/Stream/ingest cleanup jobs. Verifies raw-body JWT, serializes same-asset mutations with `MediaProviderLease`, and treats delivery as at-least-once/idempotent. |

## Webhooks

| Method + Path | Source | Purpose |
|---|---|---|
| POST `/api/webhooks/ikas/products` | [route.ts](src/app/api/webhooks/ikas/products/route.ts) | Validate ikas webhook signature, process product create/update events, refresh `ProductSnapshot` |
| POST `/api/webhooks/cloudflare-stream` | [route.ts](src/app/api/webhooks/cloudflare-stream/route.ts) | Validate Cloudflare Stream raw-body HMAC + freshness, apply ready/failed state idempotently, store poster/HLS/duration, delete transient ingest copy through provider jobs. |

## OAuth

| Method + Path | Source | Purpose |
|---|---|---|
| GET `/api/oauth/authorize/ikas?storeName=` | [route.ts](src/app/api/oauth/authorize/ikas/route.ts) | Set CSRF state in session, redirect to ikas authorize URL |
| GET `/api/oauth/callback/ikas?code&state&signature` | [route.ts](src/app/api/oauth/callback/ikas/route.ts) | Validate sig+state, exchange code, fetch merchant/app, upsert AuthToken, **auto-inject widget script per storefront**, register product webhooks, JWT, redirect to admin; `ProductSnapshot` backfill runs post-response via `after()` |

## Preview iframe

| Method + Path | Source | Purpose |
|---|---|---|
| GET `/preview` | [route.ts](src/app/(preview)/preview/route.ts) | Standalone HTML; loads `widget.js?publicApiKey=preview&v=<ts>` |
| GET/PUT `/api/preview/settings` | [route.ts](src/app/api/preview/settings/route.ts) | Storage for ad-hoc preview settings |
| GET `/api/preview/reviews` | [route.ts](src/app/api/preview/reviews/route.ts) | Mock reviews for preview render |

## Conventions
- All routes use the App Router signature: `export async function GET/POST/...(request: Request | NextRequest)`.
- Admin routes return `NextResponse.json({ data, ... })` or `{ error: '...' }` with proper status.
- Public routes always go through `withCors(...)`.
- Bodies validated with zod where structured (callback). Public review POST does manual validation in-route — could be migrated to zod for consistency.
- Don't `console.log` user data; existing code uses `console.error('[scope] ERROR:', err)` for server errors.

## Notes
- **There is no `/api/admin/auth/me` style endpoint.** The JWT itself carries everything. If the UI needs more, it calls `/api/ikas/get-merchant`.
- **Cron routes must be authenticated.** Always set `CRON_SECRET` in deploy env. Cron routes now refuse to run without it.
- **Review image URLs are policy-controlled.** Public review writes and reads must use [src/lib/review-images.ts](src/lib/review-images.ts); widget renderers consume the matching cloud name from the build-time injected constant (see [[ADR_0008_Cloud_Name_Build_Time_Only]]).
- **Photo-review filtering is indexed.** Public `hasImages=true` must use `Review.hasImages`; do not reintroduce `Review.images contains` string filters.
- **Public review counts are read-model owned.** `/api/public/reviews` must derive `totalCount` / `totalPages` from `ProductReviewSummary` buckets, including `photoRating*Count` for `hasImages=true&rating=N`; do not reintroduce hot-path `Review.count()` for current storefront filters.
- **Cloudinary used-image cleanup is media-first.** `/api/admin/cleanup-images` prefers `ReviewMedia.publicId`; legacy `Review.images` remains a transition fallback until the media backfill is complete everywhere.
- **Cloudinary metadata is write-time/read-model data.** Public reads should use `ReviewMedia` metadata or nullable fallback values; do not call Cloudinary Admin API from storefront GET paths.
- **Legacy global review image paths need copy-first reconciliation.** Do not make `/api/public/reviews` or widget helpers trust old global `review_images/...` URLs. Use `pnpm reviews:media:audit --cloudName=<cloudinaryCloudName>` and the scoped `reviews:media:reconcile` script instead. See [[Legacy_Review_Media_Reconciliation]].
- **Status enums are strings, not Prisma enums.** `'pending' | 'approved' | 'rejected'` lives in code, not in the DB schema. If you add a state, search for the literals to update everywhere.
- **Video provider identity is server-private.** Public/admin list responses expose normalized media fields only; provider ids are used only in server adapters, jobs, webhooks, and signed admin playback.
- **Video capability is advisory, reservation is authoritative.** The widget uses the fresh capability endpoint to hide unavailable video upload before opening the wizard. `/api/public/upload/video/initiate` repeats every gate and the atomic quota reservation remains the concurrency authority. Quota exhaustion returns `429 video_quota_exceeded`; rate limiting returns `429 rate_limited` with `Retry-After`; disabled and provider-unavailable states return `403` and `503` respectively.
- **Media provider mutations are outbox-owned.** Do not call Stream publish/delete or expired Cloudinary pending-image deletes directly from UI/cron routes except by enqueueing `MediaProviderJob` and dispatching QStash; this keeps retries, idempotency, stale-lock recovery, and DLQ/manual repair observable.
- **QStash is a wakeup layer, not the source of truth.** Session failure/cancel state and the matching cleanup job are committed in the same DB transaction. Repeated delivery is safe; same-asset provider calls are lease-serialized and stale moderation jobs converge Stream to the latest DB-visible state.

## Related Source Files
- [src/app/api/](src/app/api/)
- [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)
- [src/lib/cors.ts](src/lib/cors.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [src/lib/review-summary.ts](src/lib/review-summary.ts)
- [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- [scripts/rebuild-product-review-summaries.mjs](scripts/rebuild-product-review-summaries.mjs)
- [scripts/audit-legacy-review-media.mjs](scripts/audit-legacy-review-media.mjs)
- [scripts/reconcile-legacy-review-media.mjs](scripts/reconcile-legacy-review-media.mjs)

## Obsidian Links
- [[API_Design]]
- [[Auth_And_Installation_Flow]]
- [[Security_And_Rate_Limits]]
- [[Caching_And_Performance]]
- [[Database_Schema]]
- [[Widget_Architecture_Audit]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]
- [[ADR_0026_Product_Review_Summary_Read_Model]]
- [[ADR_0027_Review_Media_Read_Model]]
- [[ADR_0029_Review_Media_Metadata]]
- [[Legacy_Review_Media_Reconciliation]]

## Change Log
- 2026-06-15: Added the uncached public video capability endpoint, quota-aware access reasons, structured initiate errors, and read-only admin video usage metadata. Cached public settings remain unchanged; atomic initiate reservation is still authoritative.
- 2026-06-14: Hardened Review Video V1 provider boundaries. Public video routes now return stable error codes for malformed JSON, QStash signature failures return `401` instead of generic `500`, signed malformed payloads return `400`, Stream copy requests enforce the V1 server limits, and Stream readiness waits for the full encode before publishing the media read model.
- 2026-06-13: Added Review Video V1 API surface: gated multipart R2 upload endpoints, Cloudflare Stream webhook, QStash media job worker, admin signed playback endpoint, `hasMedia` read path, mixed-media rejection, and moderation-gated video approval flow. See [[ADR_0031_Review_Media_V2_Provider_Agnostic_Video]].
- 2026-06-08: `/api/admin/daily-maintenance` now runs a bounded, durable `ReviewMedia` metadata backfill (`src/lib/review-media-metadata-backfill.ts`) from the Cloudinary Admin API, so existing/legacy rows self-heal in production without a manual local script run. Related: [[ADR_0029_Review_Media_Metadata]].
- 2026-06-08: `/api/public/upload/register` accepts optional signed Cloudinary upload-response metadata; `/api/public/reviews` POST carries pending metadata into `ReviewMedia`, and GET keeps `images` while adding structured `media[]`. Related: [[ADR_0029_Review_Media_Metadata]].
- 2026-06-08: `/api/public/reviews` now derives exact filtered `totalCount` / `totalPages` from `ProductReviewSummary` and no longer calls raw `Review.count()` on the public read path.
- 2026-06-08: Added and applied legacy review media reconciliation operations for the test store. Public API response shape is unchanged; old global Cloudinary paths are copied into tenant-scoped paths, while missing source URLs require explicit cleanup instead of being trusted.
- 2026-06-07: Public review media reads now use indexed `Review.hasImages` and normalized `ReviewMedia`; response shape is unchanged. Related: [[ADR_0027_Review_Media_Read_Model]].
- 2026-06-08: Public review list load-more reads now support `cursor` / `nextCursor` keyset pagination while preserving legacy `page/limit`. Related: [[ADR_0028_Review_Cursor_Pagination]].
- 2026-06-06: Public rating/summary aggregate reads moved to `ProductReviewSummary`; `/api/public/reviews` still reads list rows from `Review`, while exact filtered totals now use summary buckets; unresolved slug fallback still has a legacy raw-review path. Related: [[ADR_0026_Product_Review_Summary_Read_Model]].
- 2026-05-23: Added `/api/admin/storefront-theme/sync` and split lightweight theme sync from StorefrontJSScript repair. `/api/admin/daily-maintenance` runs theme verification in batches; current Vercel config is daily-compatible, while sub-daily operation requires a plan/queue that supports it.
- 2026-05-18: D3 scoped Cloudinary review-image uploads by tenant. `/api/public/upload/sign` now signs only `review_images/stores/<storeId>`, `/api/public/upload/register` requires `storeId`, and review image reads/writes reject cross-tenant Cloudinary paths.
- 2026-05-18: Added shared Upstash fixed-window read rate limit to `/api/public/ratings` and `/api/public/ratings-by-slug` (300/min/IP) to protect rating badge APIs from query-variant abuse.
- 2026-05-18: Hardened `/api/public/reviews`: POST now verifies `(storeId, productId)` against installed store + `ProductSnapshot`, and GET exposes only a public review field whitelist.
- 2026-05-17: Added `/api/admin/reconcile-storefront-scripts` plus `/api/admin/daily-maintenance` and updated script injection docs. Storefront script lifecycle now uses non-destructive create/update only; no blanket `deleteStorefrontJSScript()` call remains in source.
- 2026-05-17: OAuth callback now registers product webhooks and runs the `ProductSnapshot` backfill non-blocking via Next.js `after()` (after the 302 response), so a large catalog cannot delay or fail install. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added `/api/public/ratings?productIds=...` as the canonical product-id listing/search badge endpoint. `/ratings-by-slug` remains a DOM-only fallback. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added product webhook receiver and admin product sync/backfill endpoint for `ProductSnapshot`.
- 2026-05-10: Added the trusted review image URL contract to public review/settings route documentation. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
