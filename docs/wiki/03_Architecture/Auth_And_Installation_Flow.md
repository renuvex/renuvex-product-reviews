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
  - "src/helpers/token-helpers.ts"
---

# Auth & Installation Flow

## Summary
ikas OAuth 2.0 where token exchange requires a browser-bound, ten-minute,
single-use `state` transaction. A supplied ikas HMAC-SHA256 code signature is
validated as a separate control. An ikas dashboard callback that omits state
cannot exchange its code; it may only start one bounded, fresh state-bearing
authorization round. Tokens persist in Postgres (`AuthToken`) keyed by
`authorizedAppId`. The embedded frontend obtains its short-lived admin JWT
from ikas AppBridge and sends it as `Authorization: JWT <token>` to admin APIs.
OAuth callback responses never place that bearer credential in a URL.

## Roles
- **ikas** — issues OAuth tokens, hosts the merchant's admin/storefronts.
- **Our app** — Next.js on Vercel.
- **Browser (admin)** — runs the React admin in an iframe inside ikas Admin.

## Install flow (happy path)

```
1.  Browser: visits app.example.com (?storeName=foo, or in-iframe)
       │
       ▼
1a. ikas dashboard compatibility path (when its initial callback has no state)
       - validate code/store shape and any supplied signature
       - discard the unbound code; never call token exchange
       - persist an opaque browser binding if needed
       - claim one hashed browser/store bootstrap marker (`SET NX EX 600`)
       - 303 with no-store/no-referrer to step 2
       - a repeated state-less callback fails closed instead of looping
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
       - require code + storeName + 256-bit state for token exchange
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
       - after(response): syncAllProductsForStore → ProductSnapshot backfill (non-blocking)
       - 303 with no-store/no-referrer directly to the server-built
         <ikasAdmin>/authorized-app/<id> target; no JWT/query handoff
       │
       ▼
5.  Merchant lands inside ikas Admin → app loads in iframe → useBaseHomePage()
       - TokenHelpers.getTokenForIframeApp() obtains the JWT via AppBridge
         and caches it under the exact authorizedAppId for the browser session
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
- The iframe asks ikas AppBridge for `authorizedAppId` and an admin JWT. A
  valid token is cached in `sessionStorage` only under
  `token-<authorizedAppId>`; OAuth callback query parameters are not a token
  source.
- All `/api/admin/*` calls send `Authorization: JWT <token>`.
- Server: `getUserFromRequest()` ([src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)) verifies via `JwtHelpers.verifyToken(token)`. JWT carries `subject = merchantId` and `audience = authorizedAppId`.
- Expired cached tokens are discarded and AppBridge re-issues from ikas Admin.
- Malformed cached tokens are also discarded before one AppBridge retry; JWT
  expiry parsing uses base64url decoding rather than assuming plain base64.

## Session cookie
- iron-session ([src/lib/session.ts](src/lib/session.ts)) holds an opaque
  `oauthBrowserBinding` plus the post-install `merchantId`, `authorizedAppId`,
  and `expiresAt`.
- Raw OAuth state and `storeName` are not stored in the cookie. Redis stores a
  versioned transaction under hashes of the binding and state, with a
  ten-minute TTL.
- Multiple pending states can coexist for one browser binding. `GETDEL`
  permits exactly one callback to consume each state.
- A state-less dashboard callback uses a separate hashed browser/store marker
  only to bound one restart. The incoming code is neither stored nor exchanged.
  A valid state-bearing callback clears the marker; otherwise it self-expires.
- Encrypted with `SECRET_COOKIE_PASSWORD`.

## Security notes
- OAuth state is the login-CSRF boundary and remains mandatory for token
  exchange even when ikas sends a code signature. Malformed, expired, replayed,
  wrong-browser, or wrong-store state fails before provider or DB work.
- On 2026-07-28 a live dashboard install reached the correctly configured
  callback with `code` and `storeName` but without `state` or `signature`.
  The compatibility path discards that code and starts a new state-bearing
  round. It never treats missing state as authorization.
- State storage is fail-closed. Missing/unavailable Redis returns `503`; it
  never falls back to the public rate limiter's fail-open behavior.
- A supplied HMAC-SHA256 callback signature is validated before state
  consumption. Making that signature mandatory or adding PKCE requires a
  separate verified ikas contract change.
- The transaction freezes the exact redirect URI used by both authorize and
  token exchange. A failed token/install attempt does not restore consumed
  state; the merchant starts a new authorization.
- `CLIENT_SECRET` is used for ikas OAuth and AppBridge JWT verification.
  Verification still has an empty-string environment fallback; explicit boot
  validation remains a separate hardening item.
- The callback target is built only from trusted admin URL configuration, the
  frozen canonical transaction store, and provider-returned authorized app ID.
  It clears query/fragment data and returns `303`, `no-store`, and
  `no-referrer`.
- The former `/callback?token=...` client handoff and arbitrary
  `redirectUrl` execution path were removed on 2026-07-28. A future genuine
  non-iframe client must use a separately designed single-use server exchange,
  never a bearer token in a URL.

## Notes
- **Product snapshot backfill is non-blocking.** The callback awaits product webhook registration (one `saveWebhooks` mutation) but runs the full `ProductSnapshot` backfill (`syncAllProductsForStore`) via Next.js `after()`, *after* the 302 response is sent. Install latency stays independent of catalog size; a backfill cut short by the serverless function timeout is recovered by product webhooks or `POST /api/admin/sync-products`. See [[ADR_0015_Canonical_Product_Identity]].
- **Review-email webhook registration is fail-closed and feature-gated.** Product registration remains independent. OAuth attempts order/uninstall registration only when both the global feature and merchant setting are enabled. Registration state changes use the installation fence; failure records a sanitized error, forces `ReviewEmailSettings.enabled=false`, and cancels unsent work. The source is not deployed, so live ikas acceptance remains a rollout test. See [[ADR_0036_Review_Request_Email_Architecture]].
- **Embedded vs standalone**: manual store-name entry can start authorization
  from a browser tab, but successful installation returns to ikas Admin.
  Authenticated production admin usage is iframe + AppBridge.
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
