---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-08-01
last_verified: 2026-08-01
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
  - "prisma/migrations/20260728120000_harden_supabase_data_api_surface/migration.sql"
  - "scripts/verify-supabase-data-api-surface.mjs"
  - "scripts/lib/supabase-data-api-surface-audit.mjs"
  - "src/lib/prisma.ts"
  - "src/lib/public-rate-limit.ts"
  - "src/lib/oauth-state.ts"
  - "src/lib/auth-helpers.ts"
  - "src/lib/ikas-client-secret.ts"
  - "src/lib/server-failures.ts"
  - "src/lib/session.ts"
  - "src/lib/cors.ts"
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
| `/api/oauth/callback/ikas` | Token exchange requires browser-bound, single-use Redis state; a state-less dashboard callback can only discard its code and claim one bounded restart; supplied HMAC-SHA256 code signature is an additional control | frozen ikas store context, then merchant from token exchange |
| `/api/admin/*` | Exact `JWT` header, HS256 + required claims, exact active installation/OAuth-token pair | `sub`, `aud`, installation and token must all agree |
| JWT-gated `/api/ikas/*` | Same active-admin principal; lifecycle callbacks/webhooks remain separate boundaries | same exact pair and installation generation |
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
- **Admin settings PUT**: a plain JSON body and fail-closed configurable widget definition are required before `sanitizeSettings(widget, settings)` / `validateSettings(widget, settings)` and before any write-side effect.
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
- Preview fixtures may use only the committed same-origin
  `/preview-assets/review-photo-*.svg` allowlist while
  `window.__ikasPreviewMode === true`.
- Daily `/api/admin/daily-maintenance` expires abandoned `PendingReviewImage` rows and reconciles storefront scripts; monthly `/api/admin/cleanup-images` remains the AWS image object-family fallback scan. Cron routes require `CRON_SECRET` and return 500 if it is missing.
- Image URLs remain stored as a JSON-stringified array in `Review.images`; all parsing and validation belongs in [src/lib/review-images.ts](src/lib/review-images.ts).

## CORS
- Anonymous storefront API routes explicitly use
  `withAnonymousPublicCors()`: `Access-Control-Allow-Origin: *`, no
  credentials, and no `Vary: Origin`. Their OPTIONS handlers list only the
  route's real method and accept only `Content-Type`, `Cache-Control`, and
  `Pragma`; `Authorization` is not part of this public contract.
- The admin `/preview` document and its parent/iframe message transport are
  same-origin. They do not use CORS; both directions validate exact origin,
  exact window source, protocol version, widget id, and scene.
- `/api/public/widget-error` is the only credential-reflecting CORS route.
  Its beacon-specific helper reflects only a parseable canonical `http` or
  `https` Origin, adds `Vary: Origin`, and emits no CORS permission for a
  missing, malformed, or literal `null` Origin.
- Review-center routes are not storefront CORS surfaces. They require the
  isolated review host; session/submit/skip POST routes also validate same
  origin. Legacy review-request token exchange and review submission also
  require the exact review host and exact Origin before rate-limit, token, or
  DB work. One-click unsubscribe remains opaque-token scoped for mail-client
  POSTs and does not require an Origin header.
- Anonymous storefront POSTs rely on ProductSnapshot target verification,
  rate limits, input/media validation, and row-level abuse controls. A
  per-merchant Origin allowlist remains an optional abuse-hardening product
  decision, not a credential-isolation requirement.
- `/api/admin/*` and cookie/session review-center routes do not emit CORS.

## CSRF
- OAuth callback requires a cryptographically random state tied to an opaque
  iron-session browser binding. Redis stores only hashed key components and a
  bounded transaction; `GETDEL` makes callback consumption atomic and
  single-use. Expired/replayed/wrong-browser/wrong-store state stops before
  provider or DB work.
- A verified ikas dashboard install can first return without state. That
  callback's code is discarded. `SET NX EX 600` on a hashed browser/store key
  permits one 303 restart at the normal authorize route; repeated state-less
  callbacks fail closed. No missing-state path can reach token exchange.
- Abandoned transactions expire after ten minutes. Token exchange or
  installation failure does not reinsert a consumed state.
- Admin API uses JWT (not cookies), so traditional CSRF doesn't apply.

## Secrets handling
- `CLIENT_SECRET` is required through one server accessor for ikas OAuth,
  AppBridge JWT verification, refresh, and webhook signatures. Blank/missing
  configuration fails closed; production build checks presence before DB
  migration and never prints the value.
- `SECRET_COOKIE_PASSWORD` for iron-session.
- `REVIEW_CURSOR_SECRET` signs public review cursors (HMAC-SHA256); server-only and separate from `CLIENT_SECRET`.
- AWS review-image private key material, `KV_REST_API_TOKEN`, `CRON_SECRET` — server-only. OAuth state uses the same Redis credentials but a dedicated fail-closed client and hashed key namespace.
- Review-email hash/encryption secrets, versioned token key ring, and session secret are server-only. Never put raw review-request tokens, sessions, recipient email, or rendered content in logs, Sentry, Redis keys, DB event payloads, or future queue messages.
- Never log secrets or full tokens. Auth and public-review GET/POST failure paths report
  only allowlisted synthetic error codes and static tags; raw exceptions do
  not enter responses, console, or Sentry.
- OAuth completion redirects directly to a server-built ikas Admin target with
  `303`, `Cache-Control: no-store`, and `Referrer-Policy: no-referrer`.
  Bearer JWTs are obtained through AppBridge and are never placed in OAuth
  callback URLs.

## Supabase Data API / RLS audit

2026-07-28 production audit and closure:
- The app does not use `@supabase/supabase-js`, browser `createClient`, `NEXT_PUBLIC_SUPABASE_*`, or `SUPABASE_ANON_KEY`.
- Runtime database access is server-side Prisma through `DATABASE_URL`; migrations use `DIRECT_URL`.
- Before closure, the Management API reported the Data API enabled for
  `public,graphql_public`, and production had 24 RLS-enabled and 17
  RLS-disabled public tables.
- Effective `anon`, `authenticated`, and `service_role` schema/table/sequence/
  routine privileges are all zero. Public has no view, materialized view,
  function, or sequence. No directly reachable row surface was found before
  closure.
- The Prisma connection is the table owner and has `BYPASSRLS`, so enabling
  non-forced RLS does not change server-side Prisma authorization.

Decision:
- Renuvex has no Data API client, so do not add permissive RLS policies. Keep
  storefront/admin flows behind Next.js API routes and server-side Prisma unless
  a separate ADR introduces browser-side Supabase access.
- Migration `20260728120000_harden_supabase_data_api_surface` enables non-forced
  RLS on the remaining tables, revokes current browser-role access, removes
  inherited `PUBLIC` schema/function paths, and revokes future table/sequence/
  function defaults. The read-only verifier fails on any matching drift.
- The complete 60-migration chain, the verifier, and a real Prisma read/write
  smoke pass on disposable PostgreSQL 16 and 17 with Supabase-like roles and
  intentionally broad pre-migration grants.
- Production applied all 60 migrations. The read-only verifier reports zero
  RLS-disabled public tables, zero effective Data API-role/default-ACL drift,
  and `runtimeRlsCompatible=true`.
- The unused hosted Data API was disabled through the official Management API.
  Its config now returns an empty exposed-schema list. Legacy anon,
  publishable, and secret-key probes against REST root/table and GraphQL
  endpoints produce no `2xx`; the public table/GraphQL `503` response is the
  documented disabled-PostgREST behavior, not an application database outage.
- Server-side Prisma and `https://app.renuvex.app/` remained healthy after the
  provider mutation.

Official references:
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase Securing your API](https://supabase.com/docs/guides/api/securing-your-api)
- [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys)

## Known weaknesses
- Profanity filter is bypassable (see above)
- IP rate limit can be circumvented with rotating IPs
- Anonymous storefront POST endpoints intentionally use wildcard CORS without
  credentials; this remains an abuse surface, not a browser credential leak.
- No bot detection / hCaptcha on public POST
- Strict admin auth activation remains gated by the aggregate exact
  installation/token verifier. The production gate currently returns zero
  drift. A target active installation that has lost its token is repaired by
  normal OAuth reauthorization. A credential independently proven to belong
  to a legacy, non-target store with no installation may instead be removed by
  a separately approved conditional cleanup; it must never be converted into
  an active installation merely to satisfy the gate.
- Storefront script lifecycle deliberately avoids zero-argument `deleteStorefrontJSScript()` because active ikas contract semantics are ambiguous.
- All public tables have non-forced RLS, browser/Data API roles have no
  effective grants, and the hosted Data API is disabled. Any future browser
  Supabase access requires a separate ADR, explicit grants, and matching RLS
  policies.

## Notes
- Treat `/api/public/reviews` POST as the **highest-risk** endpoint. Any future change here should be reviewed for abuse vectors.
- OAuth callback `state` is mandatory for token exchange. A dashboard callback
  without state can only discard its code and request one bounded restart. The
  current ikas code signature is a separate optional input: when supplied, it
  is validated before state consumption or bootstrap. Making it mandatory
  requires a separately verified provider contract.

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
- 2026-07-29: Split anonymous wildcard, widget-beacon reflection, and
  same-origin cookie/admin CORS policies. Legacy review-request state changes
  now reject the wrong or missing Origin before rate-limit, token, or DB work.
- 2026-07-28: Applied the additive Supabase surface migration in production,
  verified all 60 migrations and zero RLS/grant/default-ACL drift, then disabled
  the unused Data API through the official Management API.
- 2026-07-28: Removed the `/callback?token=...` bearer handoff and its
  client-controlled redirect. OAuth now returns directly to the trusted ikas
  Admin target; iframe JWT bootstrap is AppBridge-only.
- 2026-07-10: Recorded review-request fragment/session isolation, 30/min hashed-IP rate limit, browser Sentry/Replay exclusion, atomic verified-buyer submit, and source-only RLS hardening.
- 2026-06-21: Recorded the Supabase Data API / RLS audit. Current repo uses server-side Prisma, no browser Supabase client was found, and checked SQL grants did not show direct `anon`/`authenticated` table access; RLS hardening remains a public-launch gate.
- 2026-05-25: Removed a `console.log` in the historical callback client page
  that printed the full query string, including the session JWT. The page and
  query handoff were removed on 2026-07-28.
- 2026-05-24: Namespace migration changed public Redis rate-limit prefixes from `ikr_*` to `renuvex_pr_*`. Limits and windows are unchanged.
- 2026-05-18: D3 tenant-scoped image uploads: upload signatures required a verified `storeId` and sign `review_images/stores/<storeId>`; register/review read/write paths and widget filtering reject cross-tenant image paths.
- 2026-05-18: Added D4 public rating API read limit: `/api/public/ratings` and `/api/public/ratings-by-slug` share a generous 300 requests/min/IP Redis fixed-window counter. 429 responses are `no-store`; Redis/config failures fail open server-side to preserve storefront rendering.
- 2026-05-18: Hardened public review write/read contracts. `POST /api/public/reviews` now verifies the target store/product via `StoreSettings` + `ProductSnapshot`, ignores client-supplied `slug`/`productName`/`email`, and `GET /api/public/reviews` returns an explicit public field whitelist instead of a raw Review row spread.
- 2026-05-10: Implemented the trusted review image URL policy. Public POST now rejects third-party/data image URLs, read APIs filter legacy rows, and the widget renders only trusted review images. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Added the open image URL allowlisting risk found during the review detail lightbox audit. Related source: [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts), [src/widget/reviews-section/review-modal.js](src/widget/reviews-section/review-modal.js), related bug: [[Bug_Review_Detail_Lightbox_Risks]].
