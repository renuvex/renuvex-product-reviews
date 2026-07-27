---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-28
last_verified: 2026-07-28
confidence: high
tags:
  - auth
  - oauth
  - install
related:
  - "[[Index]]"
  - "[[System_Architecture]]"
  - "[[Important_Files]]"
  - "[[ADR_0004_Ikas_Integration_Strategy]]"
source_files:
  - "src/app/api/oauth/authorize/ikas/route.ts"
  - "src/app/api/oauth/callback/ikas/route.ts"
  - "src/lib/oauth-state.ts"
  - "src/lib/session.ts"
  - "src/lib/storefront-scripts.ts"
  - "src/lib/ikas-client/v1-graphql-requests.ts"
  - "src/helpers/api-helpers.ts"
---

# Auth & Installation Flow

## Summary
ikas OAuth 2.0 with a mandatory browser-bound, ten-minute, single-use `state`
transaction. A supplied ikas HMAC-SHA256 code signature is validated as a
separate control. Tokens persist in Postgres (`AuthToken`) keyed by
`authorizedAppId`. Frontend uses a short-lived (4h) HS256 JWT, sent as
`Authorization: JWT <token>` to admin APIs.

## Roles
- **ikas** — issues OAuth tokens, hosts the merchant's admin/storefronts.
- **Our app** — Next.js on Vercel.
- **Browser (admin)** — runs the React admin in an iframe inside ikas Admin.

## Install flow (happy path)

```
1.  Browser: visits app.example.com (?storeName=foo, or in-iframe)
       │
       ▼
2.  GET /api/oauth/authorize/ikas?storeName=foo
       - canonicalizes the ikas store DNS label
       - persists an opaque browser binding in iron-session
       - creates a hashed, 10-minute OAuth transaction in Redis (SET NX EX)
       - 302 → ikas OAuth authorize URL with redirect_uri & state
       │
       ▼
3.  ikas: merchant approves → 302 back to /api/oauth/callback/ikas
       with ?code, &state, &signature
       │
       ▼
4.  GET /api/oauth/callback/ikas
       - require code + storeName + 256-bit state
       - when signature is supplied, validate HMAC-SHA256(code, CLIENT_SECRET)
       - atomically consume browser-bound state (Redis GETDEL) before token exchange
       - require callback storeName to match the frozen transaction
       - OAuthAPI.getTokenWithAuthorizationCode → access + refresh
       - getMerchant + getAuthorizedApp via GraphQL
       - activateIkasStoreInstallation(token)
         [one transaction: store advisory lock, generation/tombstone check,
          stale-token delete, current AuthToken create, installation activate]
       - prisma.storeSettings.upsert({ storeId: merchantId })
      - For each storefront: adopt/create/update StorefrontJSScript
           pointing to <STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>
       - registerProductWebhooks → saveWebhooks for store/product/created|updated
       - when REVIEW_EMAIL_ENABLED=true AND merchant ReviewEmailSettings.enabled=true:
         separately register order created/updated + app-deleted webhooks;
         update verified/error state through the same installation fence and disable/cancel unsent work on failure
       - JwtHelpers.createToken(merchantId, authorizedAppId)  [HS256, 4h]
       - 302 → /callback?token=...&redirectUrl=<ikasAdmin>/authorized-app/<id>
       - after(response): syncAllProductsForStore → ProductSnapshot backfill (non-blocking)
       │
       ▼
5.  /callback (client) — sessionStorage.setItem(token, ...) → window.location = redirectUrl
       │
       ▼
6.  Merchant lands inside ikas Admin → app loads in iframe → useBaseHomePage()
       - TokenHelpers.getTokenForIframeApp() returns the JWT (via AppBridge)
       - router.push('/dashboard')
```

Source files:
- [src/app/api/oauth/authorize/ikas/route.ts](src/app/api/oauth/authorize/ikas/route.ts)
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/lib/oauth-state.ts](src/lib/oauth-state.ts)
- [src/lib/session.ts](src/lib/session.ts)
- [src/lib/storefront-scripts.ts](src/lib/storefront-scripts.ts)
- [src/lib/product-snapshots.ts](src/lib/product-snapshots.ts)
- [src/lib/review-email/ikas-orders.ts](src/lib/review-email/ikas-orders.ts)
- [src/lib/ikas-installation-lifecycle.ts](src/lib/ikas-installation-lifecycle.ts)
- [src/app/callback/page.tsx](src/app/callback/page.tsx)
- [src/app/hooks/use-base-home-page.ts](src/app/hooks/use-base-home-page.ts)
- [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)
- [src/helpers/jwt-helpers.ts](src/helpers/jwt-helpers.ts)
- [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)

## Re-install behavior
- `activateIkasStoreInstallation()` serializes reinstall and uninstall per store with a PostgreSQL transaction advisory lock. A new `authorizedAppId` increments the installation generation, replaces stale merchant tokens, and activates the new row atomically.
- An erased installation cannot be reactivated by a delayed OAuth callback carrying the same `authorizedAppId`; a legitimate reinstall must arrive with the new ikas installation identity.
- Storefront scripts: the callback delegates to `ensureStorefrontScripts()` and uses only non-destructive read/adopt/create/update. It no longer calls zero-argument `deleteStorefrontJSScript()`.
- If `StoreSettings.storefrontScripts` was lost while remote scripts still exist, install/manual re-inject uses v1 `listStorefrontJSScript` to adopt the live app-owned script id before creating a new loader. If v1 list fails, it falls back to conservative create/update-only behavior.

## Token refresh
- `onCheckToken(token)` in [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts) is wired into the ikas client.
- Before each ikas GraphQL call, the client invokes `onCheckToken` which checks `expireDate`, refreshes via `OAuthAPI.refreshToken` if expired, and persists the new pair via `AuthTokenManager.updateExisting` only when the exact `(authorizedAppId, merchantId)` row still exists. Refresh never upserts/recreates a token removed by uninstall erasure.
- If refresh fails, returns `{ accessToken: undefined }` and the call effectively fails — current code does not surface a clear error to the UI. Consider improving observability here.

## Browser → server auth (post-install)
- Frontend stores JWT in `sessionStorage` after step 5.
- All `/api/admin/*` calls send `Authorization: JWT <token>`.
- Server: `getUserFromRequest()` ([src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)) verifies via `JwtHelpers.verifyToken(token)`. JWT carries `subject = merchantId` and `audience = authorizedAppId`.
- JWT expires after 4h (`expiresIn: '4h'`). After that, AppBridge re-issues from ikas Admin.

## Session cookie
- iron-session ([src/lib/session.ts](src/lib/session.ts)) holds an opaque
  `oauthBrowserBinding` plus the post-install `merchantId`, `authorizedAppId`,
  and `expiresAt`.
- Raw OAuth state and `storeName` are not stored in the cookie. Redis stores a
  versioned transaction under hashes of the binding and state, with a
  ten-minute TTL.
- Multiple pending states can coexist for one browser binding. `GETDEL`
  permits exactly one callback to consume each state.
- Encrypted with `SECRET_COOKIE_PASSWORD`.

## Security notes
- OAuth state is the login-CSRF boundary and is mandatory even when ikas sends
  a code signature. Missing, malformed, expired, replayed, wrong-browser, or
  wrong-store state fails before token exchange or installation writes.
- State storage is fail-closed. Missing/unavailable Redis returns `503`; it
  never falls back to the public rate limiter's fail-open behavior.
- A supplied HMAC-SHA256 callback signature is validated before state
  consumption. Making that signature mandatory or adding PKCE requires a
  separate verified ikas contract change.
- The transaction freezes the exact redirect URI used by both authorize and
  token exchange. A failed token/install attempt does not restore consumed
  state; the merchant starts a new authorization.
- `CLIENT_SECRET` is used for **both** OAuth (with ikas) AND JWT signing. Single secret = single rotation. If we rotate `CLIENT_SECRET`, all in-flight JWTs become invalid (acceptable, JWTs are short-lived).
- JWT signing uses `process.env.CLIENT_SECRET || ''`. Empty fallback is dangerous — add explicit env validation at boot.
- The `/callback` client page must not log its query params — they carry the session JWT. A debug `console.log` of the params was removed. See [[Security_And_Rate_Limits]].
- `TokenHelpers.setToken` **returns** after `window.location.replace(redirectUrl)` (step 5); it no longer `throw`s a `'redirectUrl-called'` sentinel. The old throw escaped the un-awaited callback IIFE as an `unhandledrejection` (logged to Sentry). The explicit `return` still skips the authorize-store fallback. Source: [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts).

## Notes
- **Product snapshot backfill is non-blocking.** The callback awaits product webhook registration (one `saveWebhooks` mutation) but runs the full `ProductSnapshot` backfill (`syncAllProductsForStore`) via Next.js `after()`, *after* the 302 response is sent. Install latency stays independent of catalog size; a backfill cut short by the serverless function timeout is recovered by product webhooks or `POST /api/admin/sync-products`. See [[ADR_0015_Canonical_Product_Identity]].
- **Review-email webhook registration is fail-closed and feature-gated.** Product registration remains independent. OAuth attempts order/uninstall registration only when both the global feature and merchant setting are enabled. Registration state changes use the installation fence; failure records a sanitized error, forces `ReviewEmailSettings.enabled=false`, and cancels unsent work. The source is not deployed, so live ikas acceptance remains a rollout test. See [[ADR_0036_Review_Request_Email_Architecture]].
- **Embedded vs standalone**: the app supports both — running embedded in ikas Admin (iframe + AppBridge) or standalone in a browser tab (after manual store-name entry). Production usage is iframe.
- **OAuth scope** currently includes `read_orders`, `read_customers`, product
  reads, and inherited write/inventory permissions. The customer-read scope is
  required by the review-email consent preflight; remaining write scopes still
  need separate least-privilege review.

## Related Source Files
- [src/app/api/oauth/](src/app/api/oauth/)
- [src/helpers/](src/helpers/)
- [src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)
- [src/lib/session.ts](src/lib/session.ts)
- [src/models/auth-token/](src/models/auth-token/)

## Obsidian Links
- [[System_Architecture]]
- [[Database_Schema]]
- [[Ikas_OAuth_Installation_Notes]]
- [[ADR_0004_Ikas_Integration_Strategy]]
- [[ADR_0015_Canonical_Product_Identity]]
- [[Security_And_Rate_Limits]]
