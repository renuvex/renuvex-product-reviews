---
type: api
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-08-01
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
Next.js App Router route handlers, partitioned by trust level: `/api/admin/*`
(JWT, no CORS), anonymous storefront routes (wildcard CORS without
credentials), isolated review-center/session routes (exact host/origin, no
CORS), `/api/oauth/*` (install), and `/api/ikas/*` (server-side ikas Admin
GraphQL examples). The admin live preview is a same-origin `/preview` document,
not an API family; its settings and fixtures are in-memory.

## Conventions

### Auth
- Admin and ikas routes call `authenticateIkasAdminRequest(request)`. Authentication requires a strict `Authorization: JWT <token>` header, an HS256 AppBridge JWT with scalar `aud`/`sub` and numeric `exp`/`iat`, an exact active `(authorizedAppId, storeId)` installation, and the matching OAuth token row. Tenant scoping uses the returned principal's `merchantId` (treated as `storeId`).
- Invalid credentials and inactive or mismatched installations return the same `401 unauthorized`; a missing OAuth token for an otherwise active installation returns `409 reauthorization_required`; secret or auth-store failure returns `503 authentication_unavailable`.
- Public routes: no JWT. Tenant identified by `storeId` query param (which equals `merchantId`, but is **not** secret — public knowledge from injected widget script). Don't ever trust client-supplied storeId for authorization decisions; only for read scoping.

### Response shape
- Success: `NextResponse.json({ data, ... })`. Public widget code expects `data` envelope.
- Error: `NextResponse.json({ error: string }, { status })`. Status codes: 400 (bad input), 401 (missing/invalid auth), 404 (not found), 429 (rate limit), 500 (server).
- CORS is an explicit per-route policy:
  - anonymous storefront routes use `withAnonymousPublicCors()` and an
    exact-method `anonymousPublicCorsOptions(...)`;
  - only `/api/public/widget-error` uses the credentialed beacon policy;
  - admin, review-center cookie/session, OAuth, internal, and webhook routes do
    not inherit a general CORS helper.
- Legacy review-request POSTs require the exact review host and exact Origin
  before body parsing, rate limiting, session lookup, or mutation. GET session
  reads remain host-only. RFC 8058 one-click unsubscribe remains token scoped
  and does not require an Origin header.

### Validation
- OAuth callback uses zod ([src/lib/validation.ts](src/lib/validation.ts) + per-route schema).
- Public review POST does manual validation (length, range, type, profanity) and validates uploaded AWS image refs through [src/lib/review-images.ts](src/lib/review-images.ts). Should migrate to zod for consistency. Tracked in [[Open_Questions]].
- Widget settings PUT resolves a configurable definition through [src/lib/widgets/catalog.ts](src/lib/widgets/catalog.ts), then runs `sanitizeSettings(widget, settings)` and `validateSettings(widget, settings)` from [src/lib/widget-settings.ts](src/lib/widget-settings.ts). Unknown/planned/non-configurable IDs fail closed before persistence.

### Rate limits
Upstash Redis `INCR` + `EXPIRE` pattern. Detail: [[Security_And_Rate_Limits]].

### Caching
Read-heavy public endpoints set `Cache-Control: s-maxage=60, stale-while-revalidate=300`. Detail: [[Caching_And_Performance]].

## Route inventory
See [[Backend_API_Map]] for the full list with descriptions.

## Idempotency
- `PUT /api/admin/settings` is idempotent — upserts on `(storeId, widgetId)`.
- `POST /api/admin/inject-scripts` is idempotent: it adopts a live app-owned script from v1 `listStorefrontJSScript` when possible, then uses v2 `updateStorefrontJSScript` or `createStorefrontJSScript`.
- `POST /api/public/reviews` is **not** idempotent — each call creates a new row. Rate limit and human friction are the only de-duplication.

## Error handling
Public and admin routes return route-specific, fixed error codes. Unexpected failures pass through the fixed-code server reporter, which emits no raw exception, credential, SQL text, or connection detail to responses, console output, or Sentry. Don't add dynamic `error.message` responses or raw-exception logging.

## Change Log
- **2026-07-28** — Replaced the JWT-only route convention with the exact active-installation/token principal boundary and fixed-code failure reporting.

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
- 2026-07-29: Replaced the generic public CORS convention with explicit
  anonymous, beacon, and same-origin route policies.
- 2026-05-10: Documented trusted review image validation as part of the public review POST contract. Related ADR: [[ADR_0006_Trusted_Review_Image_URL_Policy]].
