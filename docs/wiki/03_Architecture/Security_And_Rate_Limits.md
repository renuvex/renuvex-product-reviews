---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-18
tags:
  - security
  - rate-limit
related:
  - "[[Index]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[API_Design]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
---

# Security & Rate Limits

## Summary
Trust boundaries: ikas Admin (signed OAuth) -> server. Browser admin (JWT) -> admin API. Storefront (CORS-open) -> public API + IP rate limit + profanity filter. Defense in depth: input validation, length caps in DB & API, ProductSnapshot-based public review target verification, signed Cloudinary uploads, trusted Cloudinary image URL allowlisting, public response whitelisting, server-side cron secret.

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
| `POST /api/public/reviews` | 3 | 10 min | `ikr_rl:<ip>` |
| `POST /api/public/upload/sign` | 10 | 10 min | `ikr_upload_rl:<ip>` |

Pattern: `INCR` then `EXPIRE` on first hit. Source: [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts), [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts).

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
  - `images` must pass the trusted Cloudinary URL policy in [src/lib/review-images.ts](src/lib/review-images.ts)
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
- Server signs Cloudinary upload params (HMAC) with `folder=review_images` baked in.
- Client uploads directly to Cloudinary (origin-direct) — avoids proxying body through our server.
- Public review POST stores only trusted Cloudinary secure URLs from the configured cloud and `review_images` folder. Third-party HTTPS URLs and `data:image` payloads are rejected.
- Public/admin read paths parse legacy `Review.images` defensively and expose only trusted URLs; invalid legacy image data becomes `images: []`.
- Widget rendering uses the build-time injected Cloudinary cloud name ([[ADR_0008_Cloud_Name_Build_Time_Only]]) and `getTrustedReviewImages()` before rendering photos or opening the photo lightbox.
- Preview fixtures may use `placehold.co` images only when `window.__ikasPreviewMode === true`.
- Daily `/api/admin/daily-maintenance` expires abandoned `PendingReviewImage` rows and reconciles storefront scripts; monthly `/api/admin/cleanup-images` remains the Cloudinary fallback scan. Cron routes require `CRON_SECRET` and return 500 if it is missing.
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
- `CLOUDINARY_API_SECRET`, `KV_REST_API_TOKEN`, `CRON_SECRET` — server-only.
- ⚠️ Never log secrets or full tokens. Code uses `console.error('[scope] ERROR', err)` patterns — keep err objects from leaking sensitive headers.

## Known weaknesses
- Profanity filter is bypassable (see above)
- IP rate limit can be circumvented with rotating IPs
- `Access-Control-Allow-Origin: *` on POST endpoints
- No bot detection / hCaptcha on public POST
- JWT signing falls back to empty string if env missing
- Storefront script lifecycle deliberately avoids zero-argument `deleteStorefrontJSScript()` because active ikas contract semantics are ambiguous.

## Notes
- Treat `/api/public/reviews` POST as the **highest-risk** endpoint. Any future change here should be reviewed for abuse vectors.
- The signature validation in OAuth callback is non-skippable — even if `signature` is missing, it's only validated when present. Consider making it required in production.

## Related Source Files
- [src/app/api/public/](src/app/api/public/)
- [src/lib/cors.ts](src/lib/cors.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)
- [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)

## Obsidian Links
- [[Auth_And_Installation_Flow]]
- [[API_Design]]
- [[Open_Questions]]
- [[Bug_Review_Detail_Lightbox_Risks]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]

## Change Log
- 2026-05-18: Hardened public review write/read contracts. `POST /api/public/reviews` now verifies the target store/product via `StoreSettings` + `ProductSnapshot`, ignores client-supplied `slug`/`productName`/`email`, and `GET /api/public/reviews` returns an explicit public field whitelist instead of a raw Review row spread.
- 2026-05-10: Implemented the trusted review image URL policy. Public POST now rejects third-party/data image URLs, read APIs filter legacy rows, and the widget renders only trusted Cloudinary review images. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
- 2026-05-10: Added the open image URL allowlisting risk found during the review detail lightbox audit. Related source: [src/app/api/public/reviews/route.ts](src/app/api/public/reviews/route.ts), [src/widget/product-widget/review-modal.js](src/widget/product-widget/review-modal.js), related bug: [[Bug_Review_Detail_Lightbox_Risks]].
