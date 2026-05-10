---
type: api
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-10
tags:
  - api
  - design
related:
  - "[[Index]]"
  - "[[Backend_API_Map]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[Security_And_Rate_Limits]]"
  - "[[ADR_0006_Trusted_Review_Image_URL_Policy]]"
---

# API Design

## Summary
Next.js App Router route handlers, partitioned by trust level: `/api/admin/*` (JWT), `/api/public/*` (CORS-open + IP rate-limited), `/api/oauth/*` (install), `/api/preview/*` (preview iframe data), `/api/ikas/*` (server-side ikas Admin GraphQL examples).

## Conventions

### Auth
- Admin routes: first line `const user = getUserFromRequest(request); if (!user) return 401`. Tenant scoping uses `user.merchantId` (treated as `storeId`).
- Public routes: no JWT. Tenant identified by `storeId` query param (which equals `merchantId`, but is **not** secret — public knowledge from injected widget script). Don't ever trust client-supplied storeId for authorization decisions; only for read scoping.

### Response shape
- Success: `NextResponse.json({ data, ... })`. Public widget code expects `data` envelope.
- Error: `NextResponse.json({ error: string }, { status })`. Status codes: 400 (bad input), 401 (missing/invalid auth), 404 (not found), 429 (rate limit), 500 (server).
- CORS: every public-route response goes through `withCors(...)`. OPTIONS preflight handled via `corsOptions()`.

### Validation
- OAuth callback uses zod ([src/lib/validation.ts](src/lib/validation.ts) + per-route schema).
- Public review POST does manual validation (length, range, type, profanity) and validates `images` through the trusted Cloudinary URL policy in [src/lib/review-images.ts](src/lib/review-images.ts). Should migrate to zod for consistency. Tracked in [[Open_Questions]].
- Widget settings PUT runs `validateSettings(widgetId, settings)` from [src/lib/widget-settings.ts](src/lib/widget-settings.ts) — type-checked against `widgetDefs.ts`.

### Rate limits
Upstash Redis `INCR` + `EXPIRE` pattern. Detail: [[Security_And_Rate_Limits]].

### Caching
Read-heavy public endpoints set `Cache-Control: s-maxage=60, stale-while-revalidate=300`. Detail: [[Caching_And_Performance]].

## Route inventory
See [[Backend_API_Map]] for the full list with descriptions.

## Idempotency
- `PUT /api/admin/settings` is idempotent — upserts on `(storeId, widgetId)`.
- `POST /api/admin/inject-scripts` is idempotent — uses ikas `updateStorefrontJSScript` when an id exists, otherwise `create`.
- `POST /api/public/reviews` is **not** idempotent — each call creates a new row. Rate limit and human friction are the only de-duplication.

## Error handling
Server errors logged via `console.error('[scope] ERROR:', err)` and return `{ error: 'Sunucu hatası' }`. Don't leak stack traces to public clients.

## Open patterns
- **No request-id correlation header.** Useful to add when debugging cross-service incidents.
- **No structured request logging.** Vercel logs are line-based. If we add structured logs (e.g., to Logtail/Axiom), unify the format.
- **No OpenAPI spec.** API surface is small enough today that the wiki is the contract. Revisit if external consumers appear.

## Notes
- Be cautious changing public response shapes — `widget.js` is shipped to merchants and may be **cached for hours** at the edge and **on storefront HTML**. Treat public APIs as a stable contract; version via new endpoints rather than breaking changes.
- The OAuth callback is a "fat" endpoint (auth + side effects). When adding side effects, prefer wrapping in try/catch like the existing script-injection block so the install never fails on best-effort work.

## Related Source Files
- [src/app/api/](src/app/api/)
- [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)
- [src/lib/cors.ts](src/lib/cors.ts)
- [src/lib/review-images.ts](src/lib/review-images.ts)
- [src/lib/widget-settings.ts](src/lib/widget-settings.ts)

## Obsidian Links
- [[Backend_API_Map]]
- [[Auth_And_Installation_Flow]]
- [[Caching_And_Performance]]
- [[Security_And_Rate_Limits]]
- [[ADR_0006_Trusted_Review_Image_URL_Policy]]

## Change Log
- 2026-05-10: Documented trusted review image validation as part of the public review POST contract. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
