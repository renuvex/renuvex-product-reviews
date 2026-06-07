---
type: api
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-06
last_verified: 2026-06-06
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
source_files:
  - "src/app/api/admin/reviews/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/lib/review-summary.ts"
  - "scripts/rebuild-product-review-summaries.mjs"
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
| GET `/api/admin/settings` | [route.ts](src/app/api/admin/settings/route.ts) | All widget settings as map (defaults merged) |
| PUT `/api/admin/settings` `{ widgetId, settings }` | same | Validate + sanitize + upsert into `WidgetSettings`; schedules lightweight storefront theme sync after the response |
| POST `/api/admin/inject-scripts` | [route.ts](src/app/api/admin/inject-scripts/route.ts) | Non-destructively create/update this app's loader script on each storefront; recreates only for known missing/deleted script ids |
| POST `/api/admin/storefront-theme/sync` | [route.ts](src/app/api/admin/storefront-theme/sync/route.ts) | Lightweight active theme sync from ikas `listStorefront`; no script create/update |
| POST `/api/admin/sync-products` | [route.ts](src/app/api/admin/sync-products/route.ts) | Register product webhooks and backfill `ProductSnapshot` from ikas `listProduct` |
| GET `/api/admin/daily-maintenance` (Bearer CRON) | [route.ts](src/app/api/admin/daily-maintenance/route.ts) | Vercel cron: daily batch storefront theme verification plus pending upload cleanup + storefront script reconciliation; route also supports lightweight sub-daily theme verification if the deploy plan supports it |
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
| GET `/api/public/reviews?storeId&productId&page&orderBy&rating&hasImages&limit` | [route.ts](src/app/api/public/reviews/route.ts) | Approved review rows + `ProductReviewSummary` distribution/average/count with explicit public field whitelist. `limit` clamped 1-30 (default 10); photo strip calls with `limit=15&hasImages=true` (see [[Photo_Strip]], [[ADR_0007_Photo_Strip_Cap_And_Rotation]]) |
| POST `/api/public/reviews` body | same | Submit review (validation + StoreSettings/ProductSnapshot target verification + profanity + rate-limit + trusted image URLs + auto-approve). Client `slug`/`productName`/`email` are ignored. |
| GET `/api/public/ratings?storeId&productIds=a,b,c` | [route.ts](src/app/api/public/ratings/route.ts) | Bulk avg+count per canonical ikas product id from `ProductReviewSummary` (primary listing/search badge path; see [[ADR_0015_Canonical_Product_Identity]] and [[ADR_0026_Product_Review_Summary_Read_Model]]); shares a 300/min/IP read rate limit with `ratings-by-slug` |
| GET `/api/public/ratings-by-slug?storeId&slugs=a,b,c` | [route.ts](src/app/api/public/ratings-by-slug/route.ts) | DOM-only fallback: resolve current slug through `ProductSnapshot`, then read `ProductReviewSummary` by product id; legacy direct slug read is last resort; shares the rating-read rate limit |
| GET `/api/public/settings?publicApiKey=<merchantId>` | [route.ts](src/app/api/public/settings/route.ts) | Widget config map (per widgetId). Cloud name **not** in response — it is build-time injected into the widget bundle (see [[ADR_0008_Cloud_Name_Build_Time_Only]]). |
| POST `/api/public/upload/sign` body `{ storeId }` | [route.ts](src/app/api/public/upload/sign/route.ts) | Cloudinary signed direct upload scoped to `review_images/stores/<storeId>` after StoreSettings verification |
| POST `/api/public/upload/register` body `{ storeId, secureUrl }` | [route.ts](src/app/api/public/upload/register/route.ts) | Register a completed tenant-scoped Cloudinary upload in `PendingReviewImage` for cleanup |

### Caching
GET responses set `Cache-Control: s-maxage=60, stale-while-revalidate=300`. See [[Caching_And_Performance]].

### Rate limits (Upstash Redis)
- `/api/public/reviews` POST → 3 / 10min / IP
- `/api/public/upload/sign` POST → 10 / 10min / IP
- `/api/public/ratings` + `/api/public/ratings-by-slug` GET → 300 / 60sec / IP, shared key
- `/api/public/upload/register` POST -> 30 / 10min / IP
Detail in [[Security_And_Rate_Limits]].

## Webhooks

| Method + Path | Source | Purpose |
|---|---|---|
| POST `/api/webhooks/ikas/products` | [route.ts](src/app/api/webhooks/ikas/products/route.ts) | Validate ikas webhook signature, process product create/update events, refresh `ProductSnapshot` |

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
- **Status enums are strings, not Prisma enums.** `'pending' | 'approved' | 'rejected'` lives in code, not in the DB schema. If you add a state, search for the literals to update everywhere.

## Related Source Files
- [src/app/api/](src/app/api/)
- [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)
- [src/lib/cors.ts](src/lib/cors.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)
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

## Change Log
- 2026-06-06: Public rating/summary aggregate reads moved to `ProductReviewSummary`; `/api/public/reviews` still reads list rows from `Review`, and unresolved slug fallback still has a legacy raw-review path. Related: [[ADR_0026_Product_Review_Summary_Read_Model]].
- 2026-05-23: Added `/api/admin/storefront-theme/sync` and split lightweight theme sync from StorefrontJSScript repair. `/api/admin/daily-maintenance` runs theme verification in batches; current Vercel config is daily-compatible, while sub-daily operation requires a plan/queue that supports it.
- 2026-05-18: D3 scoped Cloudinary review-image uploads by tenant. `/api/public/upload/sign` now signs only `review_images/stores/<storeId>`, `/api/public/upload/register` requires `storeId`, and review image reads/writes reject cross-tenant Cloudinary paths.
- 2026-05-18: Added shared Upstash fixed-window read rate limit to `/api/public/ratings` and `/api/public/ratings-by-slug` (300/min/IP) to protect rating badge APIs from query-variant abuse.
- 2026-05-18: Hardened `/api/public/reviews`: POST now verifies `(storeId, productId)` against installed store + `ProductSnapshot`, and GET exposes only a public review field whitelist.
- 2026-05-17: Added `/api/admin/reconcile-storefront-scripts` plus `/api/admin/daily-maintenance` and updated script injection docs. Storefront script lifecycle now uses non-destructive create/update only; no blanket `deleteStorefrontJSScript()` call remains in source.
- 2026-05-17: OAuth callback now registers product webhooks and runs the `ProductSnapshot` backfill non-blocking via Next.js `after()` (after the 302 response), so a large catalog cannot delay or fail install. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added `/api/public/ratings?productIds=...` as the canonical product-id listing/search badge endpoint. `/ratings-by-slug` remains a DOM-only fallback. Related: [[ADR_0015_Canonical_Product_Identity]].
- 2026-05-17: Added product webhook receiver and admin product sync/backfill endpoint for `ProductSnapshot`.
- 2026-05-10: Added the trusted review image URL contract to public review/settings route documentation. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
