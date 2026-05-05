---
type: api
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - api
  - routes
related:
  - "[[Index]]"
  - "[[API_Design]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[Security_And_Rate_Limits]]"
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
| PUT `/api/admin/settings` `{ widgetId, settings }` | same | Validate + sanitize + upsert into `WidgetSettings` |
| POST `/api/admin/inject-scripts` | [route.ts](src/app/api/admin/inject-scripts/route.ts) | Update `<script>` URL on each storefront via ikas mutation; recreates if missing |
| GET `/api/admin/cleanup-images` (Bearer CRON) | [route.ts](src/app/api/admin/cleanup-images/route.ts) | Sweep Cloudinary `review_images/*` → delete orphans |
| GET `/api/ikas/get-merchant` | [route.ts](src/app/api/ikas/get-merchant/route.ts) | Demo: fetches merchant via ikas Admin GQL |

### Auth gate
All admin routes start with `getUserFromRequest(request)` from [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts) — verifies JWT, returns `{ merchantId, authorizedAppId }`. Returns 401 if missing/invalid.

## Public (CORS-open, no auth)

| Method + Path | Source | Purpose |
|---|---|---|
| OPTIONS `/api/public/*` | each route | CORS preflight via `corsOptions()` |
| GET `/api/public/reviews?storeId&productId&page&orderBy&rating&hasImages` | [route.ts](src/app/api/public/reviews/route.ts) | Approved reviews + rating distribution |
| POST `/api/public/reviews` body | same | Submit review (validation + profanity + rate-limit + auto-approve) |
| GET `/api/public/ratings-by-slug?storeId&slugs=a,b,c` | [route.ts](src/app/api/public/ratings-by-slug/route.ts) | Bulk avg+count per slug (listing badges) |
| GET `/api/public/settings?publicApiKey=<merchantId>` | [route.ts](src/app/api/public/settings/route.ts) | Widget config map (per widgetId) |
| POST `/api/public/upload/sign` | [route.ts](src/app/api/public/upload/sign/route.ts) | Cloudinary signed direct upload |

### Caching
GET responses set `Cache-Control: s-maxage=60, stale-while-revalidate=300`. See [[Caching_And_Performance]].

### Rate limits (Upstash Redis)
- `/api/public/reviews` POST → 3 / 10min / IP
- `/api/public/upload/sign` POST → 10 / 10min / IP
Detail in [[Security_And_Rate_Limits]].

## OAuth

| Method + Path | Source | Purpose |
|---|---|---|
| GET `/api/oauth/authorize/ikas?storeName=` | [route.ts](src/app/api/oauth/authorize/ikas/route.ts) | Set CSRF state in session, redirect to ikas authorize URL |
| GET `/api/oauth/callback/ikas?code&state&signature` | [route.ts](src/app/api/oauth/callback/ikas/route.ts) | Validate sig+state, exchange code, fetch merchant/app, upsert AuthToken, **auto-inject widget script per storefront**, JWT, redirect to admin |

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
- **The cleanup cron must be authenticated.** Without `CRON_SECRET` set, the route is open. Always set in deploy env.
- **Status enums are strings, not Prisma enums.** `'pending' | 'approved' | 'rejected'` lives in code, not in the DB schema. If you add a state, search for the literals to update everywhere.

## Related Source Files
- [src/app/api/](src/app/api/)
- [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)
- [src/lib/cors.ts](src/lib/cors.ts)
- [src/lib/widget-settings.ts](src/lib/widget-settings.ts)

## Obsidian Links
- [[API_Design]]
- [[Auth_And_Installation_Flow]]
- [[Security_And_Rate_Limits]]
- [[Caching_And_Performance]]
- [[Database_Schema]]
