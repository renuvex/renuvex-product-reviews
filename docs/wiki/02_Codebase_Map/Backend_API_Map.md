---
type: api
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-15
last_verified: 2026-07-15
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
  - "src/app/api/public/settings/route.ts"
  - "src/app/api/public/storefront-theme/lazy-sync/route.ts"
  - "src/lib/review-media.ts"
  - "src/lib/review-summary.ts"
  - "src/lib/media/access.ts"
  - "src/lib/media/outbox.ts"
  - "src/lib/media/dispatcher.ts"
  - "src/lib/media/lifecycle.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/reconciliation.ts"
  - "src/app/api/public/upload/video/capability/route.ts"
  - "src/app/api/public/upload/video/metrics/route.ts"
  - "src/lib/media/config.ts"
  - "src/lib/media/constants.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/moderation.ts"
  - "src/lib/media/moderation-intent.ts"
  - "src/lib/media/providers/aws-review-image.ts"
  - "src/lib/media/providers/mux.ts"
  - "src/lib/media/reconciliation.ts"
  - "src/lib/media/sessions.ts"
  - "src/lib/media/video-policy.ts"
  - "src/lib/media/video-processing.ts"
  - "src/app/api/webhooks/mux/route.ts"
  - "src/app/api/webhooks/ikas/orders/route.ts"
  - "src/app/api/ikas/review-email-settings/route.ts"
  - "src/app/api/ikas/review-email-data-subject/route.ts"
  - "src/app/api/internal/review-email/due-jobs/route.ts"
  - "src/app/api/internal/review-email/reconcile-orders/route.ts"
  - "src/app/api/internal/review-email/store-erasure/route.ts"
  - "src/app/api/public/review-request/route.ts"
  - "src/app/api/public/review-center/session/route.ts"
  - "src/app/api/public/review-center/items/route.ts"
  - "src/app/api/public/review-center/items/[itemId]/reviews/route.ts"
  - "src/app/api/public/review-center/items/[itemId]/skip/route.ts"
  - "src/app/api/public/review-center/unsubscribe/route.ts"
  - "scripts/rebuild-product-review-summaries.mjs"
---

# Backend / API Map

## Agent Brief
Use this page to route backend work to the right API family. Admin routes are
JWT-gated merchant operations, public routes are storefront/widget calls,
internal routes are signed provider/job endpoints, and ikas routes are
server-side Admin GraphQL calls. Verify route behavior in `src/app/api/*` and
shared helpers before editing. High-risk paths are public review reads/uploads,
AWS image register/approval, Mux video, QStash-signed internal jobs, rate
limits, and any endpoint that mutates reviews, media, summaries, or provider
state.

## Summary
Main API route groups:
- **`/api/admin/*`** — gated by JWT (`getUserFromRequest`), called by the merchant admin UI.
- **`/api/public/*`** — storefront/widget endpoints are CORS-open where documented; review-center endpoints are host-isolated and session scoped. Public writes are rate-limited via Upstash Redis.
- **`/api/oauth/*`** — install / callback flow.
- **`/api/preview/*`** — settings + fixtures for the admin live-preview iframe.
- **`/api/ikas/*`** — server-side calls to the ikas Admin GraphQL API (example: `get-merchant`).

## Admin (JWT-gated)

| Method + Path | Source | Purpose |
|---|---|---|
| GET `/api/admin/reviews?page&limit&status` | [route.ts](src/app/api/admin/reviews/route.ts) | Paginated reviews for `merchantId` |
| PUT `/api/admin/reviews` `{ id, status?, merchantReply? }` | same | Update status / reply |
| DELETE `/api/admin/reviews?id=` | same | Hard delete |
| GET `/api/admin/reviews/video-playback?mediaId=` | [route.ts](src/app/api/admin/reviews/video-playback/route.ts) | Short-lived signed Mux Player attributes (`playbackId`, `playbackToken`, `thumbnailToken`) for pending/admin video preview. Legacy signed `url`/`posterUrl` remain temporarily for overlap. Provider ids stay server-side. |
| GET `/api/admin/settings` | [route.ts](src/app/api/admin/settings/route.ts) | All widget settings as map (defaults merged), plus read-only `meta.videoUsage` for the current UTC month. Metadata is not part of the editable settings payload. |
| PUT `/api/admin/settings` `{ widgetId, settings }` | same | Validate + sanitize + upsert into `WidgetSettings`; schedules lightweight storefront theme sync after the response |
| POST `/api/admin/inject-scripts` | [route.ts](src/app/api/admin/inject-scripts/route.ts) | Non-destructively create/update this app's loader script on each storefront; recreates only for known missing/deleted script ids |
| POST `/api/admin/storefront-theme/sync` | [route.ts](src/app/api/admin/storefront-theme/sync/route.ts) | Lightweight active theme sync from ikas `listStorefront`; no script create/update |
| POST `/api/admin/sync-products` | [route.ts](src/app/api/admin/sync-products/route.ts) | Register product webhooks and backfill `ProductSnapshot` from ikas `listProduct` |
| GET `/api/admin/daily-maintenance` (Bearer CRON) | [route.ts](src/app/api/admin/daily-maintenance/route.ts) | Manual/admin maintenance route for batch storefront theme verification, pending upload cleanup, storefront script reconciliation, video lifecycle work, and provider job redispatch. Scheduled daily execution is now owned by the QStash-signed `/api/internal/scheduled-jobs` receiver. |
| GET `/api/admin/reconcile-storefront-scripts` (Bearer CRON) | [route.ts](src/app/api/admin/reconcile-storefront-scripts/route.ts) | Explicit non-destructive storefront script reconciliation for existing merchants |
| GET `/api/admin/cleanup-pending-uploads` (Bearer CRON) | [route.ts](src/app/api/admin/cleanup-pending-uploads/route.ts) | Explicit PendingReviewImage cleanup using the same helper as daily maintenance |
| GET `/api/admin/cleanup-images` (Bearer CRON) | [route.ts](src/app/api/admin/cleanup-images/route.ts) | Monthly AWS review-image family orphan scan with the existing two-phase quarantine/circuit-breaker model. It groups by `storeId + assetId` and does not perform bucket-wide blind deletes |
| POST `/api/internal/scheduled-jobs` | [route.ts](src/app/api/internal/scheduled-jobs/route.ts) | QStash-signed scheduler receiver for `daily-maintenance-full` and `cleanup-images`. Verifies raw-body `Upstash-Signature`, uses `ScheduledJobRunLock` for `task + scheduleSlot` idempotency, and replaces Vercel Cron as the scheduler source of truth. |
| POST `/api/internal/review-email/due-jobs` | [route.ts](src/app/api/internal/review-email/due-jobs/route.ts) | `CRON_SECRET` + global-feature-gated source-only due-job claimer. Claims due `ReviewEmailJob` rows with DB `FOR UPDATE SKIP LOCKED` and returns opaque job ids for a future dispatcher; it does not send email. |
| POST `/api/internal/review-email/reconcile-orders` | [route.ts](src/app/api/internal/review-email/reconcile-orders/route.ts) | `CRON_SECRET` + global-feature-gated source-only reconciliation entrypoint. Store ownership is derived from the authorized-app token, and active-installation/merchant-enabled checks are fenced before cursor creation or `listOrder(updatedAt)` processing. |
| POST `/api/internal/review-email/store-erasure` | [route.ts](src/app/api/internal/review-email/store-erasure/route.ts) | QStash raw-body-signature receiver for bounded store-uninstall continuation. It accepts only an opaque run UUID; DB state plus verified immutable journal evidence owns the phase, tenant, and idempotency contract. |
| GET `/api/ikas/get-merchant` | [route.ts](src/app/api/ikas/get-merchant/route.ts) | Demo: fetches merchant via ikas Admin GQL |
| GET/PUT `/api/ikas/review-email-settings` | [route.ts](src/app/api/ikas/review-email-settings/route.ts) | Iframe JWT-gated review-email settings API. The feature remains disabled unless `REVIEW_EMAIL_ENABLED=true`, provider-side app-deleted webhook verification is operator-attested, and required secrets are configured. |
| POST/GET `/api/ikas/review-email-data-subject` | [route.ts](src/app/api/ikas/review-email-data-subject/route.ts) | JWT-tenant-scoped exact-email DSR erase/status API. POST requires explicit confirmation and a UUID `Idempotency-Key`; the DB uniquely scopes its hash to the store, digest mismatch returns `409`, folded identity never deletes, and responses are private/no-store. Journal verification must succeed before destructive erasure begins. |

### Auth gate
All admin routes start with `getUserFromRequest(request)` from [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts) — verifies JWT, returns `{ merchantId, authorizedAppId }`. Returns 401 if missing/invalid.

## Public (CORS-open, no auth)

| Method + Path | Source | Purpose |
|---|---|---|
| OPTIONS `/api/public/*` | each route | CORS preflight via `corsOptions()` |
| GET `/api/public/reviews?storeId&productId&page&orderBy&rating&hasImages&hasMedia&limit&cursor` | [route.ts](src/app/api/public/reviews/route.ts) | Approved review rows + `ProductReviewSummary` distribution/average/count with explicit public field whitelist. Exact `totalCount` / `totalPages` for unfiltered/rating/photo/media filters come from summary buckets; `hasMedia=true` means approved `(hasImages OR hasVideo)`. Legacy `page/limit` remains supported; responses include signed `nextCursor` and cursor requests use keyset pagination without `skip`. Tampered, unsigned, or context-mismatched cursors return `400`. `hasImages=true` uses indexed `Review.hasImages`; `hasMedia=true` is used by the media gallery and by the public `Fotoğraf ve Video` filter when summary counts prove the product has approved video media, and cannot be combined with `hasImages`. Response `images` remains image-only; additive `media[]` exposes `{ type, url, posterUrl, thumbnailUrl, durationMs, width, height, position }` without provider ids. Additive `photoReviewCount` and `mediaReviewCount` expose read-model counts so the widget can separate existing video display from new upload capability. |
| POST `/api/public/reviews` body | same | Submit review (validation + StoreSettings/ProductSnapshot target verification + profanity + rate-limit + AWS image refs or video token + auto-approve). Writes `Review`, compatibility `Review.images` only for render-ready public AWS URLs, `Review.hasImages`, `Review.hasVideo`, `ReviewMedia`, pending media cleanup, and summary update transactionally. On the isolated review-request host, an active HttpOnly session is atomically consumed in the same transaction; DB uniqueness on `Review.reviewRequestId` prevents parallel duplicate verified reviews. Tokenless storefront submissions remain unchanged. |
| POST `/api/public/review-request` body `{ token }` | [route.ts](src/app/api/public/review-request/route.ts) | Exchanges a raw token received in the `/request#token=...` fragment for a short-lived, host-only HttpOnly session. The fragment is removed before API navigation; raw tokens are not accepted in query strings or stored in DB/log payloads. |
| GET `/api/public/review-request` | same | Resolves only the HttpOnly review-request session and returns sanitized store/product/request state. Both methods are host-isolated and return `private, no-store` with `Referrer-Policy: no-referrer`. |
| POST `/api/public/review-center/session` | [route.ts](src/app/api/public/review-center/session/route.ts) | Exchanges a batch token from the URL fragment for a two-hour host-only HttpOnly session. Multiple devices are allowed; raw token values are never stored. |
| GET `/api/public/review-center/items?cursor&limit` | [route.ts](src/app/api/public/review-center/items/route.ts) | Returns only the current batch session's product-scoped items using stable position/id pagination (`20` default, `50` max). Tenant/product scope is derived from the session, not query input. |
| POST `/api/public/review-center/items/{itemId}/reviews` | [route.ts](src/app/api/public/review-center/items/[itemId]/reviews/route.ts) | Creates one verified review for one session-owned request. Request CAS plus DB uniqueness prevents parallel duplicate review; AWS/Mux media refs must belong to the same session and item. |
| POST `/api/public/review-center/items/{itemId}/skip` | [route.ts](src/app/api/public/review-center/items/[itemId]/skip/route.ts) | Idempotently resolves one product without reviewing it, cancels its pending media through the outbox, and completes the batch only when every product is resolved. |
| GET/POST `/api/public/review-center/unsubscribe?token=` | [route.ts](src/app/api/public/review-center/unsubscribe/route.ts) | Host-isolated confirmation and idempotent store/category recipient unsubscribe. POST serializes against send commit, creates durable suppression, and cancels pending physical email while leaving product review rights separate. |
| GET `/api/public/ratings?storeId&productIds=a,b,c` | [route.ts](src/app/api/public/ratings/route.ts) | Bulk avg+count per canonical ikas product id from `ProductReviewSummary` (primary listing/search badge path; see [[ADR_0015_Canonical_Product_Identity]] and [[ADR_0026_Product_Review_Summary_Read_Model]]); shares a 300/min/IP read rate limit with `ratings-by-slug` |
| GET `/api/public/ratings-by-slug?storeId&slugs=a,b,c` | [route.ts](src/app/api/public/ratings-by-slug/route.ts) | DOM-only fallback: resolve current slug through `ProductSnapshot`, then read `ProductReviewSummary` by product id; legacy direct slug read is last resort; shares the rating-read rate limit |
| GET `/api/public/settings?publicApiKey=<merchantId>` | [route.ts](src/app/api/public/settings/route.ts) | Pure cacheable widget config read (per widgetId) plus public runtime flags including additive `runtime.themeSyncDue`. Does not read auth tokens, call ikas, or schedule theme sync. Cloud name **not** in response — it is build-time injected into the widget bundle (see [[ADR_0008_Cloud_Name_Build_Time_Only]]). |
| POST `/api/public/storefront-theme/lazy-sync` body `{ publicApiKey }` | [route.ts](src/app/api/public/storefront-theme/lazy-sync/route.ts) | Best-effort storefront theme freshness trigger. Rate-limits first, returns `204` when the stored theme state is fresh, and schedules `syncStorefrontThemeForToken(..., 'lazy_storefront')` via `after()` only when stale. This route is write/control-plane and is not Worker-cached. |
| POST `/api/public/upload/sign` body `{ storeId, fileName, contentType, bytes, checksumAlgorithm:"SHA256", checksumSha256 }` | [route.ts](src/app/api/public/upload/sign/route.ts) | Creates an AWS `PendingReviewImage` upload intent and returns an S3 presigned POST contract (`provider:"aws_s3"`, `uploadUrl`, fields, `assetId`, `uploadSessionId`, `objectKey`). No AWS credentials, public URL, or original filename are returned. |
| POST `/api/public/upload/register` body `{ storeId, provider:"aws_s3", assetId, uploadSessionId, objectKey, contentType, bytes, checksumAlgorithm:"SHA256", checksumSha256 }` | [route.ts](src/app/api/public/upload/register/route.ts) | Validates the AWS intent and S3 object/head/tag/checksum evidence, generates private variants, and marks the pending image `private_ready` before review submit can use it. |
| GET `/api/public/upload/video/capability?storeId=` | [route.ts](src/app/api/public/upload/video/capability/route.ts) | Fresh `no-store` video capability check with a 60/min/IP fixed-window limit. Returns only `{ enabled, reason }`; quota counts and provider configuration remain server-private. |
| POST `/api/public/upload/video/initiate` | [route.ts](src/app/api/public/upload/video/initiate/route.ts) | Start gated Mux direct upload; validates feature gates, quota, product/store ownership, MIME, and 150MB size. Returns opaque session token, Mux upload URL, suggested chunk size, and chunk attempts without exposing provider ids or credentials. |
| POST `/api/public/upload/video/complete` | [route.ts](src/app/api/public/upload/video/complete/route.ts) | Mark direct upload complete, enqueue `resolve_video_asset`, and move session toward processing without trusting client-side provider ids. |
| GET `/api/public/upload/video/status?token=` | [route.ts](src/app/api/public/upload/video/status/route.ts) | Poll session processing/ready/failed state without exposing provider admin APIs. |
| POST `/api/public/upload/video/metrics` | [route.ts](src/app/api/public/upload/video/metrics/route.ts) | Record sanitized client upload timing for an existing session. The token is used only for lookup; stored samples exclude tokens, upload URLs, signed URLs, playback IDs, raw user-agent, IP, and file names. |
| DELETE `/api/public/upload/video` | [route.ts](src/app/api/public/upload/video/route.ts) | Atomically mark the session aborted and create its provider-aware cleanup outbox job. Provider calls are worker-owned; the public route does not call Mux directly. |

### Caching
Storefront configuration and review GET responses use the documented edge-cache policy. Theme lazy-sync, video capability, upload, submit, and other write/control-plane endpoints are intentionally excluded. The video capability endpoint sends `Cache-Control: no-store` because reserved and consumed quota can change between wizard openings. See [[Caching_And_Performance]].

### Rate limits (Upstash Redis)
- `/api/public/reviews` POST → 3 / 10min / IP
- `/api/public/upload/sign` POST → 10 / 10min / IP
- `/api/public/ratings` + `/api/public/ratings-by-slug` GET → 300 / 60sec / IP, shared key
- `/api/public/storefront-theme/lazy-sync` POST -> 10 / 10min / storeId+IP
- `/api/public/review-request` POST/GET -> 30 / 60sec / hashed IP, shared key
- `/api/public/review-center/session` -> 30 / 60sec / hashed IP
- `/api/public/review-center/items` -> 60 / 60sec / hashed IP
- review-center submit/skip/unsubscribe -> 30 / 60sec / action + hashed IP
- `/api/public/upload/video/capability` GET -> 60 / 60sec / IP
- `/api/public/upload/register` POST -> 30 / 10min / IP
- `/api/public/upload/video/initiate` POST -> 10 / 10min / IP, plus store-level monthly quota reservation.
- `/api/public/upload/video/metrics` POST -> 60 / 10min / IP
Detail in [[Security_And_Rate_Limits]].

## Internal async media jobs

| Method + Path | Source | Purpose |
|---|---|---|
| POST `/api/internal/media-jobs` | [route.ts](src/app/api/internal/media-jobs/route.ts) | QStash-signed DB outbox worker for Mux resolve/reconcile/publish/protect/cleanup plus exact upload-session expiry. Verifies raw-body JWT, serializes same-session/asset mutations with `MediaProviderLease`, and treats delivery as at-least-once/idempotent. |

## Webhooks

| Method + Path | Source | Purpose |
|---|---|---|
| POST `/api/webhooks/ikas/products` | [route.ts](src/app/api/webhooks/ikas/products/route.ts) | Validate ikas webhook signature, process product create/update events, refresh `ProductSnapshot` |
| POST `/api/webhooks/ikas/orders` | [route.ts](src/app/api/webhooks/ikas/orders/route.ts) | Verifies ikas HMAC before branching. Order events are wake-up signals; webhook audit creation, merchant-enabled state, canonical `merchantId`, order sync, and uninstall erasure use the installation-generation fence. `store/app/deleted` runs PII/auth-token erasure even when review email is disabled; stale old-install events are ignored and failed current erasures retry. |
| POST `/api/webhooks/mux` | [route.ts](src/app/api/webhooks/mux/route.ts) | Validate Mux raw-body signature, dedupe/audit `WebhookEvent`, resolve upload/asset ids, and enqueue provider-neutral media jobs. Webhook storage never persists payloads, tokens, signed URLs, or upload URLs. |

## OAuth

| Method + Path | Source | Purpose |
|---|---|---|
| GET `/api/oauth/authorize/ikas?storeName=` | [route.ts](src/app/api/oauth/authorize/ikas/route.ts) | Set CSRF state in session, redirect to ikas authorize URL |
| GET `/api/oauth/callback/ikas?code&state&signature` | [route.ts](src/app/api/oauth/callback/ikas/route.ts) | Validate sig+state, exchange code, fetch merchant/app, atomically activate a new installation generation and replace stale merchant tokens, **auto-inject widget script per storefront**, register product webhooks, and register order/uninstall webhooks only when global + merchant email settings are enabled; then issue JWT and redirect. `ProductSnapshot` backfill runs post-response via `after()`. |

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
- **Review images are AWS-only for new uploads.** Public review writes accept AWS image refs, not raw image URLs. Public reads render image media only from DB-backed AWS public variant manifests under `media.renuvex.app`; widget renderers consume structured `media[]` first.
- **Media filtering is indexed/read-model backed.** Public `hasImages=true` must use `Review.hasImages`; public `hasMedia=true` must use `Review.hasImages OR Review.hasVideo`. Do not reintroduce `Review.images contains` string filters.
- **Public review counts are read-model owned.** `/api/public/reviews` must derive `totalCount` / `totalPages` from `ProductReviewSummary` buckets, including `photoRating*Count` for `hasImages=true&rating=N` and `mediaRating*Count` for `hasMedia=true&rating=N`; do not reintroduce hot-path `Review.count()` for current storefront filters.
- **AWS image cleanup is family-scoped.** `/api/admin/cleanup-images`, pending cleanup, and media jobs operate on `storeId + assetId` families covering private originals, private variants, simplified public `reviews/{assetId}/` variants, and transitional legacy public variants. Monthly orphan scan also reports public-only `reviews/{assetId}/` leftovers as `aws_s3:public:{assetId}` synthetic quarantine ids; they follow the same two-phase quarantine and breaker model. Missing provider objects are idempotent success; DB rows are removed only after provider cleanup confirms absence/success.
- **Legacy pre-public image-provider rows were not copied to AWS.** Source no longer trusts or renders them after teardown; DB data alignment has been applied and AWS/Mux rows were preserved.
- **Status enums are strings, not Prisma enums.** `'pending' | 'approved' | 'rejected'` lives in code, not in the DB schema. If you add a state, search for the literals to update everywhere.
- **Video provider identity is server-private.** Public/admin list responses expose normalized media fields only; provider ids are used only in server adapters, jobs, webhooks, and signed admin playback.
- **Video capability is advisory, reservation is authoritative.** The widget uses the fresh capability endpoint to hide unavailable video upload before opening the wizard. `/api/public/upload/video/initiate` repeats every gate and the atomic quota reservation remains the concurrency authority. Quota exhaustion returns `429 video_quota_exceeded`; rate limiting returns `429 rate_limited` with `Retry-After`; disabled and provider-unavailable states return `403` and `503` respectively.
- **Media provider mutations are outbox-owned.** Do not call Mux publish/delete or AWS image publish/revoke/cleanup directly from UI routes except through the provider/job path documented in source; this keeps retries, idempotency, stale-lock recovery, and DLQ/manual repair observable.
- **QStash is a wakeup layer, not the source of truth.** Session failure/cancel state and the matching cleanup job are committed in the same DB transaction. Repeated delivery is safe; same-asset provider calls are lease-serialized and stale moderation jobs converge Mux playback state to the latest DB-visible state.
- **Mux readiness is self-healing.** Upload completion creates a deduped `resolve_video_asset` / `reconcile_video` path. The webhook remains the fast path, while bounded canonical-status checks recover missed/delayed delivery without exposing provider identity through the public status endpoint. Upload reservation similarly creates `expire_upload_session` in the same serializable transaction.

## Related Source Files
- [src/app/api/](src/app/api/)
- [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)
- [src/lib/cors.ts](src/lib/cors.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)
- [src/lib/review-media.ts](src/lib/review-media.ts)
- [src/lib/review-summary.ts](src/lib/review-summary.ts)
- [src/lib/widget-settings.ts](src/lib/widget-settings.ts)
- [scripts/rebuild-product-review-summaries.mjs](scripts/rebuild-product-review-summaries.mjs)

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
- 2026-07-03: AWS-only review-image source teardown removed legacy upload/register branches, metadata backfill, provider cleanup scripts, dependency, and widget trust. Public image upload now uses AWS S3 presigned POST + register, reads use provider-neutral AWS public variant descriptors, and cleanup uses AWS object-family evidence.
- 2026-06-20: Added `/api/public/upload/video/metrics` and returned `chunkAttempts` from video initiate so Mux direct-upload transfer/retry timing can be measured separately from processing/webhook lifecycle.
- 2026-06-15: Added the uncached public video capability endpoint, quota-aware access reasons, structured initiate errors, and read-only admin video usage metadata. Cached public settings remain unchanged; atomic initiate reservation is still authoritative.
- 2026-06-23: Admin video preview route now returns signed Mux Player attributes additively while keeping legacy signed URL fields during rollout overlap. Public review media returns additive `playbackId` for approved videos so storefront playback can prefer official Mux Player without exposing provider ids or signed/private playback ids.
- 2026-06-20: Moved Review Video to Mux direct upload, Mux webhook audit/dedupe, provider-neutral media jobs, admin signed playback, and public playback IDs after approval. Removed the previous upload-parts route and previous video-provider adapters from active source. See [[ADR_0032_Review_Video_On_Mux]].
- 2026-06-14: Hardened Review Video provider boundaries. Public video routes return stable error codes for malformed JSON, QStash signature failures return `401` instead of generic `500`, signed malformed payloads return `400`, and readiness remains DB-owned.
- 2026-06-13: Added the first provider-agnostic Review Video API surface behind closed gates: video capability, upload lifecycle, QStash media job worker, admin signed playback endpoint, `hasMedia` read path, mixed-media rejection, and moderation-gated video approval flow. Superseded by [[ADR_0032_Review_Video_On_Mux]].
- 2026-06-08: Historical metadata backfill was added for the previous image provider and later removed during AWS-only teardown. Related: [[ADR_0029_Review_Media_Metadata]].
- 2026-06-08: `/api/public/upload/register` now validates AWS upload refs and generated image metadata; `/api/public/reviews` POST carries pending metadata into `ReviewMedia`, and GET keeps `images` while adding structured `media[]`. Related: [[ADR_0034_AWS_Review_Image_Migration]].
- 2026-06-08: `/api/public/reviews` now derives exact filtered `totalCount` / `totalPages` from `ProductReviewSummary` and no longer calls raw `Review.count()` on the public read path.
- 2026-06-08: Added and applied legacy review media reconciliation operations for the test store. Public API response shape is unchanged; old global image paths were copied into tenant-scoped paths, while missing source URLs require explicit cleanup instead of being trusted.
- 2026-06-07: Public review media reads now use indexed `Review.hasImages` and normalized `ReviewMedia`; response shape is unchanged. Related: [[ADR_0027_Review_Media_Read_Model]].
- 2026-06-08: Public review list load-more reads now support `cursor` / `nextCursor` keyset pagination while preserving legacy `page/limit`. Related: [[ADR_0028_Review_Cursor_Pagination]].
- 2026-06-06: Public rating/summary aggregate reads moved to `ProductReviewSummary`; `/api/public/reviews` still reads list rows from `Review`, while exact filtered totals now use summary buckets; unresolved slug fallback still has a legacy raw-review path. Related: [[ADR_0026_Product_Review_Summary_Read_Model]].
- 2026-05-23: Added `/api/admin/storefront-theme/sync` and split lightweight theme sync from StorefrontJSScript repair. `/api/admin/daily-maintenance` runs theme verification in batches; current Vercel config is daily-compatible, while sub-daily operation requires a plan/queue that supports it.
- 2026-05-18: D3 first scoped review-image uploads by tenant; current AWS upload/register paths keep tenant-scoped object refs and reject cross-tenant media.
- 2026-05-18: Added shared Upstash fixed-window read rate limit to `/api/public/ratings` and `/api/public/ratings-by-slug` (300/min/IP) to protect rating badge APIs from query-variant abuse.
- 2026-05-18: Hardened `/api/public/reviews`: POST now verifies `(storeId, productId)` against installed store + `ProductSnapshot`, and GET exposes only a public review field whitelist.
- 2026-05-17: Added `/api/admin/reconcile-storefront-scripts` plus `/api/admin/daily-maintenance` and updated script injection docs. Storefront script lifecycle now uses non-destructive create/update only; no blanket `deleteStorefrontJSScript()` call remains in source.
- 2026-05-17: OAuth callback now registers product webhooks and runs the `ProductSnapshot` backfill non-blocking via Next.js `after()` (after the 302 response), so a large catalog cannot delay or fail install. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added `/api/public/ratings?productIds=...` as the canonical product-id listing/search badge endpoint. `/ratings-by-slug` remains a DOM-only fallback. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added product webhook receiver and admin product sync/backfill endpoint for `ProductSnapshot`.
- 2026-05-10: Added the trusted review image URL contract to public review/settings route documentation. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
