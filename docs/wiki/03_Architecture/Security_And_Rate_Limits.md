---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-21
last_verified: 2026-06-21
confidence: high
tags:
  - security
  - rate-limit
related:
  - "[[Index]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[API_Design]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
source_files:
  - ".env.example"
  - "prisma/schema.prisma"
  - "src/lib/prisma.ts"
  - "src/lib/public-rate-limit.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/app/api/public/upload/video/capability/route.ts"
  - "src/app/api/public/widget-error/route.ts"
---

# Security & Rate Limits

## Summary
Trust boundaries: ikas Admin (signed OAuth) -> server. Browser admin (JWT) -> admin API. Storefront (CORS-open) -> public API + IP rate limit + profanity filter. Defense in depth: input validation, length caps in DB & API, ProductSnapshot-based public review target verification, AWS S3 presigned uploads, trusted AWS media URL allowlisting, public response whitelisting, server-side cron secret.

## Trust boundaries

| Surface | Trust gate | Tenant scope |
|---|---|---|
| `/api/oauth/callback/ikas` | HMAC-SHA256 signature on `code` (+ optional state) | merchant from token exchange |
| `/api/admin/*` | HS256 JWT (`getUserFromRequest`) | `merchantId` from JWT subject |
| `/api/ikas/*` | HS256 JWT (same) | same |
| `/api/public/*` | None — CORS-open; write routes add per-route checks | `storeId` from query/body, verified per route where writes happen |
| `/api/admin/daily-maintenance` | `Authorization: Bearer ${CRON_SECRET}` | n/a — global |
| `/api/admin/cleanup-pending-uploads` | `Authorization: Bearer ${CRON_SECRET}` | n/a — global |
| `/api/admin/cleanup-images` | `Authorization: Bearer ${CRON_SECRET}` | n/a — global |
| `/api/admin/reconcile-storefront-scripts` | `Authorization: Bearer ${CRON_SECRET}` | n/a — global |

## Rate limits (Upstash Redis)

| Endpoint | Limit | Window | Key |
|---|---|---|---|
| `POST /api/public/reviews` | 3 | 10 min | `renuvex_pr_rl:<ip>` |
| `POST /api/public/upload/sign` | 10 | 10 min | `renuvex_pr_upload_rl:<ip>` |
| `POST /api/public/upload/register` | 30 | 10 min | `renuvex_pr_upload_reg_rl:<ip>` |
| `GET /api/public/ratings` + `GET /api/public/ratings-by-slug` | 300 combined | 60 sec | `renuvex_pr_ratings_rl:<ip>` |
| `GET /api/public/upload/video/capability` | 60 | 60 sec | `renuvex_pr_video_cap:<ip-hash>` |
| `POST /api/public/widget-error` | 30 | 60 sec | `renuvex_pr_werr_rl:<ip>` |

Pattern: `INCR` then `EXPIRE` on first hit. Rating read limits and the video capability probe use [src/lib/public-rate-limit.ts](src/lib/public-rate-limit.ts) and intentionally fail open if Redis env/config is unavailable, so listing badges and text/photo review submission do not disappear during a transient Redis issue. Source: [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts), [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts), [src/app/api/public/upload/register/route.ts](src/app/api/public/upload/register/route.ts), [src/app/api/public/upload/video/capability/route.ts](src/app/api/public/upload/video/capability/route.ts), [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts), [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts), [src/app/api/public/widget-error/route.ts](src/app/api/public/widget-error/route.ts).

IP source: `x-forwarded-for` (first entry). Vercel sets this. Spoofable in theory if upstream is misconfigured — acceptable today.

## Input validation
- **OAuth callback**: zod validates `code`, `state`, `signature`.
- **Public review POST**: hand-rolled validation
  - `storeId`, `productId`, `author` required
  - `storeId` must exist in `StoreSettings`
  - `(storeId, productId)` must exist in `ProductSnapshot`
  - `rating` 1..5
  - `author` 1..40 chars
  - `title` ≤ 60 chars
  - `comment` ≤ 2000 chars
  - image refs must pass the AWS upload-ref and trusted media policy in [src/lib/review-images.ts](src/lib/review-images.ts)
  - profanity filter on title/comment/author
  - public `slug`, `productName`, and `email` body fields are ignored; review identity/name snapshots come from `ProductSnapshot`, and public email is stored blank until a verified buyer flow exists
- **Admin settings PUT**: `validateSettings(widgetId, settings)` runs the schema in [src/lib/widget-settings.ts](src/lib/widget-settings.ts).
- **DB caps**: `comment` and `merchantReply` are `@db.VarChar(2000)`.

## Profanity filter
Hard-coded list of TR + EN slurs (~25 entries) in [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts). Pre-normalizes input (lowercased, ASCII-folded for word boundaries). Limits:
- Easy to bypass with l33t-speak / unicode tricks — known limitation.
- Adding/removing words requires deploy.
- See [[Open_Questions]] re: moving to config or per-merchant lists.

## Author masking
Public review responses replace last name with initial: `Mert Wilson` → `Mert W.`. Done at the response builder ([src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts)). Original full name remains in DB for moderator visibility.

## Image upload security
- Server creates tenant-scoped AWS S3 presigned POST upload intents after verifying `StoreSettings`.
- Client uploads directly to S3 — avoids proxying image bodies through our server.
- Public review POST stores only server-created AWS image refs that match the tenant/upload session. Third-party HTTPS URLs, cross-tenant object refs, and `data:image` payloads are rejected.
- Public/admin read paths parse legacy `Review.images` defensively and expose only trusted URLs; invalid legacy image data becomes `images: []`.
- Widget rendering uses AWS public media descriptors and `getTrustedReviewMedia()` before rendering photos or opening the lightbox.
- Preview fixtures may use `placehold.co` images only when `window.__ikasPreviewMode === true`.
- Daily `/api/admin/daily-maintenance` expires abandoned `PendingReviewImage` rows and reconciles storefront scripts; monthly `/api/admin/cleanup-images` remains the AWS image object-family fallback scan. Cron routes require `CRON_SECRET` and return 500 if it is missing.
- Image URLs remain stored as a JSON-stringified array in `Review.images`; all parsing and validation belongs in [src/lib/review-images.ts](src/lib/review-images.ts).

## CORS
- `/api/public/*` → `Access-Control-Allow-Origin: *`. Necessary because storefront domains are unknowable a priori.
- Acceptable for read endpoints. For POST `/api/public/reviews`, the design relies on ProductSnapshot target verification + rate-limit + profanity + abuse-detection at the row level. Could tighten further with per-merchant origin allowlist (config in `StoreSettings`).
- `/api/admin/*` does not set CORS — same-origin (admin iframe is on the deploy URL).

## CSRF
- OAuth callback uses `state` parameter, optionally validated against the iron-session `state`. Source: [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts).
- Admin API uses JWT (not cookies), so traditional CSRF doesn't apply.

## Secrets handling
- Single secret (`CLIENT_SECRET`) for ikas OAuth + JWT. Rotation invalidates JWTs (acceptable — short-lived).
- `SECRET_COOKIE_PASSWORD` for iron-session.
- `REVIEW_CURSOR_SECRET` signs public review cursors (HMAC-SHA256); server-only and separate from `CLIENT_SECRET`.
- AWS review-image private key material, `KV_REST_API_TOKEN`, `CRON_SECRET` — server-only.
- ⚠️ Never log secrets or full tokens. Code uses `console.error('[scope] ERROR', err)` patterns — keep err objects from leaking sensitive headers.
- ⚠️ The `/callback` client page receives the session JWT as a URL query param. A `console.log('OAuth callback params:', params.toString())` that printed it to the browser console was removed — never re-add param logging there. See [[Auth_And_Installation_Flow]].

## Supabase Data API / RLS audit

2026-06-21 read-only audit:
- The app does not use `@supabase/supabase-js`, browser `createClient`, `NEXT_PUBLIC_SUPABASE_*`, or `SUPABASE_ANON_KEY`.
- Runtime database access is server-side Prisma through `DATABASE_URL`; migrations use `DIRECT_URL`.
- Supabase MCP still reports RLS disabled on 16 public app tables. `VideoUploadPerformanceSample` has RLS enabled but no policies.
- Direct SQL privilege checks did not show table access for `anon`, `authenticated`, or `service_role`: no public schema usage and no table `SELECT`, `INSERT`, `UPDATE`, or `DELETE` privileges were present in the checked grants.
- The public schema had no views, materialized views, functions, or realtime publication tables during the audit.
- This does not prove the Supabase Dashboard Data API exposure setting by itself; it only proves the repo and SQL surfaces checked above.

Decision:
- Do not enable RLS blindly while the schema is still changing in the test-stage app. Enabling RLS without matching policies can block intended API behavior.
- Before public launch, make this a security hardening gate: verify Supabase Dashboard Data API exposed schemas, make role grants explicit, revoke/default-deny `anon` and `authenticated` table privileges where direct Data API access is not intended, enable RLS on app tables without `FORCE RLS`, and add policies only for deliberately exposed client-side Supabase access.
- Keep storefront/admin flows through Next.js API routes and server-side Prisma unless a separate ADR introduces a browser Supabase client.

Official references:
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Securing your API](https://supabase.com/docs/guides/api/securing-your-api)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)

## Known weaknesses
- Profanity filter is bypassable (see above)
- IP rate limit can be circumvented with rotating IPs
- `Access-Control-Allow-Origin: *` on POST endpoints
- No bot detection / hCaptcha on public POST
- JWT signing falls back to empty string if env missing
- Storefront script lifecycle deliberately avoids zero-argument `deleteStorefrontJSScript()` because active ikas contract semantics are ambiguous.
- Most public app tables have RLS disabled. Current evidence did not show direct `anon`/`authenticated` Data API grants, but RLS/default-grants hardening remains a public-launch blocker.

## Notes
- Treat `/api/public/reviews` POST as the **highest-risk** endpoint. Any future change here should be reviewed for abuse vectors.
- The signature validation in OAuth callback is non-skippable — even if `signature` is missing, it's only validated when present. Consider making it required in production.

## Related Source Files
- [src/app/api/public/](src/app/api/public/)
- [src/lib/public-rate-limit.ts](src/lib/public-rate-limit.ts)
- [src/lib/cors.ts](src/lib/cors.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)
- [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)

## Obsidian Links
- [[Auth_And_Installation_Flow]]
- [[API_Design]]
- [[Open_Questions]]
- [[Widget_Architecture_Audit]]
- [[Bug_Review_Detail_Lightbox_Risks]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]

## Change Log
- 2026-06-21: Recorded the Supabase Data API / RLS audit. Current repo uses server-side Prisma, no browser Supabase client was found, and checked SQL grants did not show direct `anon`/`authenticated` table access; RLS hardening remains a public-launch gate.
- 2026-05-25: Removed a `console.log` in the `/callback` client page that printed the full query string (including the session JWT) to the browser console. Source: [src/app/callback/page.tsx](src/app/callback/page.tsx).
- 2026-05-24: Namespace migration changed public Redis rate-limit prefixes from `ikr_*` to `renuvex_pr_*`. Limits and windows are unchanged.
- 2026-05-18: D3 tenant-scoped image uploads: upload signatures required a verified `storeId` and sign `review_images/stores/<storeId>`; register/review read/write paths and widget filtering reject cross-tenant image paths.
- 2026-05-18: Added D4 public rating API read limit: `/api/public/ratings` and `/api/public/ratings-by-slug` share a generous 300 requests/min/IP Redis fixed-window counter. 429 responses are `no-store`; Redis/config failures fail open server-side to preserve storefront rendering.
- 2026-05-18: Hardened public review write/read contracts. `POST /api/public/reviews` now verifies the target store/product via `StoreSettings` + `ProductSnapshot`, ignores client-supplied `slug`/`productName`/`email`, and `GET /api/public/reviews` returns an explicit public field whitelist instead of a raw Review row spread.
- 2026-05-10: Implemented the trusted review image URL policy. Public POST now rejects third-party/data image URLs, read APIs filter legacy rows, and the widget renders only trusted review images. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Added the open image URL allowlisting risk found during the review detail lightbox audit. Related source: [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts), [src/widget/reviews-section/review-modal.js](src/widget/reviews-section/review-modal.js), related bug: [[Bug_Review_Detail_Lightbox_Risks]].
