---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-28
last_verified: 2026-07-28
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
  - "src/lib/oauth-state.ts"
  - "src/lib/session.ts"
  - "src/app/api/oauth/authorize/ikas/route.ts"
  - "src/app/api/oauth/callback/ikas/route.ts"
  - "src/app/api/public/reviews/route.ts"
  - "src/app/api/public/ratings/route.ts"
  - "src/app/api/public/ratings-by-slug/route.ts"
  - "src/app/api/public/upload/sign/route.ts"
  - "src/app/api/public/upload/register/route.ts"
  - "src/app/api/public/upload/video/capability/route.ts"
  - "src/app/api/public/review-request/route.ts"
  - "src/app/api/public/review-center/"
  - "src/lib/review-email/public-access.ts"
  - "src/lib/review-email/review-center-http.ts"
  - "src/lib/review-email/review-center-scope.ts"
  - "src/app/api/ikas/review-email-data-subject/route.ts"
  - "src/lib/review-email/data-subject.ts"
  - "src/instrumentation-client.ts"
  - "src/app/api/public/widget-error/route.ts"
---

# Security & Rate Limits

## Agent Brief
Use this page for public/admin/internal trust boundaries, Redis limits, secret
handling, review media validation, and Supabase Data API/RLS posture. For the
disabled review-request email source package, the critical rules are: ikas HMAC
before processing, canonical order re-read, no raw token/recipient in durable
payloads, fragment-to-HttpOnly session exchange on the isolated review host,
browser telemetry disabled on `/request`, batch-session membership, per-item
submit/skip/media ownership, atomic one-review submission, and RLS on the new
sensitive tables. Store-scoped install generation plus a transaction
advisory lock fences OAuth, settings, webhook audit, canonical ingest,
reconciliation, and erasure; disabled stores do not persist canonical order PII.
Customer-email HMAC/AES values carry key versions and runtime retains all prior
versions so old suppression hashes cannot silently disappear. Runtime/provider
mutations still require a separate approved rollout; source and live DB state
must not be conflated. V5 additionally separates exact case-preserving DSR
identity from folded suppression identity, hashes DSR idempotency keys,
fail-closes journal conflicts before deletion, and gives the runtime journal
role no object-delete, retention-change, or Governance-bypass permission.
Journal conflicts emit only a fixed Sentry error and fixed tags; no run id,
subject, journal payload, or provider metadata is attached.
OAuth uses a separate fail-closed Redis transaction contract: a 256-bit state
is browser-bound, hashed in the Redis key, expires after ten minutes, and is
atomically consumed before token exchange. It must not reuse the fail-open
public rate-limit helper.

## Summary
Trust boundaries: ikas Admin (signed OAuth) -> server. Browser admin (JWT) -> admin API. Storefront (CORS-open) -> public API + IP rate limit + profanity filter. Defense in depth: input validation, length caps in DB & API, ProductSnapshot-based public review target verification, AWS S3 presigned uploads, trusted AWS media URL allowlisting, public response whitelisting, server-side cron secret.

## Trust boundaries

| Surface | Trust gate | Tenant scope |
|---|---|---|
| `/api/oauth/callback/ikas` | Mandatory browser-bound, single-use Redis state; supplied HMAC-SHA256 code signature is an additional control | frozen ikas store context, then merchant from token exchange |
| `/api/admin/*` | HS256 JWT (`getUserFromRequest`) | `merchantId` from JWT subject |
| `/api/ikas/*` | HS256 JWT (same) | same |
| Storefront `/api/public/*` | None; CORS-open where documented and write routes add per-route checks | `storeId` from query/body, verified per route where writes happen |
| `/request` + `/api/public/review-request` | One-time fragment token -> host-only HttpOnly session; isolated review host | Request/token/session tenant ids are server-owned; query tokens are rejected |
| `/request` + `/api/public/review-center/*` | Batch fragment token, exact host, private/no-store responses, HttpOnly session; session/submit/skip require same origin while one-click unsubscribe is opaque-token scoped | Batch/session membership owns tenant, product item, and media scope; body/query cannot override store/product |
| `/api/admin/daily-maintenance` | `Authorization: Bearer ${CRON_SECRET}` | n/a — global |
| `/api/admin/cleanup-pending-uploads` | `Authorization: Bearer ${CRON_SECRET}` | n/a — global |
| `/api/admin/cleanup-images` | `Authorization: Bearer ${CRON_SECRET}` | n/a — global |
| `/api/admin/reconcile-storefront-scripts` | `Authorization: Bearer ${CRON_SECRET}` | n/a — global |
| `/api/internal/review-email/due-jobs` | `Authorization: Bearer ${CRON_SECRET}` plus `REVIEW_EMAIL_ENABLED=true` | DB-owned tenant ids on claimed jobs |
| `/api/internal/review-email/reconcile-orders` | `Authorization: Bearer ${CRON_SECRET}`, global flag, active installation, enabled merchant | store is derived from the persisted `authorizedAppId` token; caller `storeId` cannot override it |
| `/api/internal/review-email/store-erasure` | QStash raw-body `Upstash-Signature` | accepts only an opaque run UUID; tenant/action come from the journal-verified DB run |
| `POST/GET /api/ikas/review-email-data-subject` | iframe JWT, active `authorizedAppId`/generation; POST also requires UUID `Idempotency-Key` and exact confirmation | store is JWT `merchantId` only; body/query `storeId` is rejected and folded email identity never selects erasure data |

## Rate limits (Upstash Redis)

| Endpoint | Limit | Window | Key |
|---|---|---|---|
| `POST /api/public/reviews` | 3 | 10 min | `renuvex_pr_rl:<ip>` |
| `POST /api/public/upload/sign` | 10 | 10 min | `renuvex_pr_upload_rl:<ip>` |
| `POST /api/public/upload/register` | 30 | 10 min | `renuvex_pr_upload_reg_rl:<ip>` |
| `GET /api/public/ratings` + `GET /api/public/ratings-by-slug` | 300 combined | 60 sec | `renuvex_pr_ratings_rl:<ip>` |
| `GET /api/public/upload/video/capability` | 60 | 60 sec | `renuvex_pr_video_cap:<ip-hash>` |
| `POST/GET /api/public/review-request` | 30 combined | 60 sec | `renuvex_review_request:<ip-hash>` |
| `POST /api/public/review-center/session` | 30 | 60 sec | `renuvex_review_center:session:<ip-hash>` |
| `GET /api/public/review-center/items` | 60 | 60 sec | `renuvex_review_center:items:<ip-hash>` |
| Review-center submit/skip/unsubscribe | 30 per action | 60 sec | `renuvex_review_center:<action>:<ip-hash>` |
| `POST/GET /api/ikas/review-email-data-subject` | 10 combined | 60 sec | `review_email_dsr:<merchant-id-hash>` |
| `POST /api/public/widget-error` | 30 | 60 sec | `renuvex_pr_werr_rl:<ip>` |

Pattern: `INCR` then `EXPIRE` on first hit. Rating reads, video capability, and review-request exchange/session reads use [src/lib/public-rate-limit.ts](src/lib/public-rate-limit.ts) and intentionally fail open if Redis env/config is unavailable. Review-request Redis keys contain only a SHA-256 IP digest, never the raw token or session. OAuth state is not a rate limit: [src/lib/oauth-state.ts](src/lib/oauth-state.ts) uses `SET NX EX` plus atomic `GETDEL` and fails closed when Redis is unavailable. Source: [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts), [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts), [src/app/api/public/upload/register/route.ts](src/app/api/public/upload/register/route.ts), [src/app/api/public/upload/video/capability/route.ts](src/app/api/public/upload/video/capability/route.ts), [src/app/api/public/review-request/route.ts](src/app/api/public/review-request/route.ts), [src/app/api/public/ratings/route.ts](src/app/api/public/ratings/route.ts), [src/app/api/public/ratings-by-slug/route.ts](src/app/api/public/ratings-by-slug/route.ts), [src/app/api/public/widget-error/route.ts](src/app/api/public/widget-error/route.ts).

IP source: `x-forwarded-for` (first entry). Vercel sets this. Spoofable in theory if upstream is misconfigured — acceptable today.

## Input validation
- **OAuth authorize/callback**: zod canonicalizes one ikas store DNS label and
  requires callback `code`, `storeName`, and a 64-character lowercase-hex
  state. A supplied signature is validated before state consumption.
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
  - public `slug`, `productName`, and `email` body fields are ignored; review identity/name snapshots come from `ProductSnapshot`. The source-only verified-buyer flow consumes a host-only request session and still stores public `Review.email` blank.
- **Review-request link**: the raw 256-bit batch token is held in the URL fragment, removed before navigation, exchanged through POST body for a two-hour host-only HttpOnly session, and stored only as a versioned HMAC hash. Multiple sessions are allowed, but all item/media scope comes from batch membership and request-level CAS/uniqueness permits one review per product. `/request` disables browser Sentry/Replay before SDK initialization so Replay `initialUrl` cannot capture the fragment. Responses are `private, no-store`, `no-referrer`, `noindex`, and frame-denied.
- **Review-email order PII**: canonical `listOrder.merchantId` must match the installation store. Webhook audit creation, order snapshots, reconciliation cursor creation, settings disable, and uninstall erasure share the installation fence; stale uninstall identities return no-op instead of touching a reinstall. DSR request digests use versioned HMAC subject hashes rather than raw canonical email.
- **Review-email DSR parent isolation**: frozen exact-subject order matches are
  separate from request-linked parents. Candidate orders are locked before
  request deletion, and `RESTRICT` FKs prevent a parent delete from cascading
  an unrelated live request. Shared direct orders retain structure but have
  customer PII scrubbed; linked-only or changed-subject orders are untouched.
- **Review-email failure evidence**: DB fields, console output, and Sentry accept
  only context-allowlisted codes or fixed fallback codes. Sentry receives a
  synthetic error and optional opaque run/event ID; raw exception messages,
  stacks, recipient/token/URL/provider/query/connection data are excluded.
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
- Storefront `/api/public/*` reads/writes use `Access-Control-Allow-Origin: *`
  where documented because merchant domains are not known a priori.
- Review-center routes are not storefront CORS surfaces. They require the
  isolated review host; session/submit/skip POST routes also validate same
  origin. One-click unsubscribe is intentionally opaque-token scoped for mail
  client POSTs. All responses deny framing/referrers/caching.
- Acceptable for read endpoints. For POST `/api/public/reviews`, the design relies on ProductSnapshot target verification + rate-limit + profanity + abuse-detection at the row level. Could tighten further with per-merchant origin allowlist (config in `StoreSettings`).
- `/api/admin/*` does not set CORS — same-origin (admin iframe is on the deploy URL).

## CSRF
- OAuth callback requires a cryptographically random state tied to an opaque
  iron-session browser binding. Redis stores only hashed key components and a
  bounded transaction; `GETDEL` makes callback consumption atomic and
  single-use. Missing/expired/replayed/wrong-browser/wrong-store state stops
  before provider or DB work.
- Abandoned transactions expire after ten minutes. Token exchange or
  installation failure does not reinsert a consumed state.
- Admin API uses JWT (not cookies), so traditional CSRF doesn't apply.

## Secrets handling
- Single secret (`CLIENT_SECRET`) for ikas OAuth + JWT. Rotation invalidates JWTs (acceptable — short-lived).
- `SECRET_COOKIE_PASSWORD` for iron-session.
- `REVIEW_CURSOR_SECRET` signs public review cursors (HMAC-SHA256); server-only and separate from `CLIENT_SECRET`.
- AWS review-image private key material, `KV_REST_API_TOKEN`, `CRON_SECRET` — server-only. OAuth state uses the same Redis credentials but a dedicated fail-closed client and hashed key namespace.
- Review-email hash/encryption secrets, versioned token key ring, and session secret are server-only. Never put raw review-request tokens, sessions, recipient email, or rendered content in logs, Sentry, Redis keys, DB event payloads, or future queue messages.
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
- Review-email lifecycle/V5/V3.2 migrations enable RLS on their sensitive
  server-only tables and conditionally revoke browser-role grants. The V3.2
  additions are locally verified on disposable PostgreSQL; production schema
  activation remains a separate migration/deploy gate.

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
- OAuth callback `state` is mandatory. The current ikas code signature is a
  separate optional input: when supplied, it is validated before state
  consumption. Making it mandatory requires a separately verified provider
  contract and is not implied by the state hardening.

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
- 2026-07-10: Recorded review-request fragment/session isolation, 30/min hashed-IP rate limit, browser Sentry/Replay exclusion, atomic verified-buyer submit, and source-only RLS hardening.
- 2026-06-21: Recorded the Supabase Data API / RLS audit. Current repo uses server-side Prisma, no browser Supabase client was found, and checked SQL grants did not show direct `anon`/`authenticated` table access; RLS hardening remains a public-launch gate.
- 2026-05-25: Removed a `console.log` in the `/callback` client page that printed the full query string (including the session JWT) to the browser console. Source: [src/app/callback/page.tsx](src/app/callback/page.tsx).
- 2026-05-24: Namespace migration changed public Redis rate-limit prefixes from `ikr_*` to `renuvex_pr_*`. Limits and windows are unchanged.
- 2026-05-18: D3 tenant-scoped image uploads: upload signatures required a verified `storeId` and sign `review_images/stores/<storeId>`; register/review read/write paths and widget filtering reject cross-tenant image paths.
- 2026-05-18: Added D4 public rating API read limit: `/api/public/ratings` and `/api/public/ratings-by-slug` share a generous 300 requests/min/IP Redis fixed-window counter. 429 responses are `no-store`; Redis/config failures fail open server-side to preserve storefront rendering.
- 2026-05-18: Hardened public review write/read contracts. `POST /api/public/reviews` now verifies the target store/product via `StoreSettings` + `ProductSnapshot`, ignores client-supplied `slug`/`productName`/`email`, and `GET /api/public/reviews` returns an explicit public field whitelist instead of a raw Review row spread.
- 2026-05-10: Implemented the trusted review image URL policy. Public POST now rejects third-party/data image URLs, read APIs filter legacy rows, and the widget renders only trusted review images. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Added the open image URL allowlisting risk found during the review detail lightbox audit. Related source: [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts), [src/widget/reviews-section/review-modal.js](src/widget/reviews-section/review-modal.js), related bug: [[Bug_Review_Detail_Lightbox_Risks]].
