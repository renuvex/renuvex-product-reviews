---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-17
tags:
  - auth
  - oauth
  - install
related:
  - "[[Index]]"
  - "[[System_Architecture]]"
  - "[[Important_Files]]"
  - "[[ADR_0004_Ikas_Integration_Strategy]]"
---

# Auth & Installation Flow

## Summary
ikas OAuth 2.0 with HMAC-SHA256 code signature verification. Tokens persist in Postgres (`AuthToken`) keyed by `authorizedAppId`. Frontend uses a short-lived (4h) HS256 JWT, sent as `Authorization: JWT <token>` to admin APIs.

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
       - sets session.state (CSRF)
       - 302 → ikas OAuth authorize URL with redirect_uri & state
       │
       ▼
3.  ikas: merchant approves → 302 back to /api/oauth/callback/ikas
       with ?code, &state, &signature
       │
       ▼
4.  GET /api/oauth/callback/ikas
       - validate signature: HMAC-SHA256(code, CLIENT_SECRET) === signature  (TokenHelpers.validateCodeSignature)
       - validate state matches session.state (CSRF)
       - OAuthAPI.getTokenWithAuthorizationCode → access + refresh
       - getMerchant + getAuthorizedApp via GraphQL
       - prisma.authToken.deleteMany({ merchantId })   [reinstall hygiene]
       - AuthTokenManager.put(token)
       - prisma.storeSettings.upsert({ storeId: merchantId })
       - For each storefront: ikas.mutations.createStorefrontJSScript / updateStorefrontJSScript
           pointing to <STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>
       - registerProductWebhooks → saveWebhooks for store/product/created|updated
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
- [src/lib/product-snapshots.ts](src/lib/product-snapshots.ts)
- [src/app/callback/page.tsx](src/app/callback/page.tsx)
- [src/app/hooks/use-base-home-page.ts](src/app/hooks/use-base-home-page.ts)
- [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)
- [src/helpers/jwt-helpers.ts](src/helpers/jwt-helpers.ts)
- [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)

## Re-install behavior
- Hard cleanup at step 4: `deleteMany({ merchantId })` removes all old `AuthToken` rows for the merchant.
- Storefront scripts: if `StoreSettings.storefrontScripts` is empty (DB reset / fresh install), the callback calls `deleteStorefrontJSScript()` (no args) which **wipes ALL scripts on the merchant**, then creates fresh ones. Otherwise, it updates the known ids in place.
- ⚠️ The blanket delete affects scripts from **other apps too**. Verify against ikas docs before changing.

## Token refresh
- `onCheckToken(token)` in [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts) is wired into the ikas client.
- Before each ikas GraphQL call, the client invokes `onCheckToken` which checks `expireDate`, refreshes via `OAuthAPI.refreshToken` if expired, persists the new pair via `AuthTokenManager.put`, and returns the new accessToken.
- If refresh fails, returns `{ accessToken: undefined }` and the call effectively fails — current code does not surface a clear error to the UI. Consider improving observability here.

## Browser → server auth (post-install)
- Frontend stores JWT in `sessionStorage` after step 5.
- All `/api/admin/*` calls send `Authorization: JWT <token>`.
- Server: `getUserFromRequest()` ([src/lib/auth-helpers.ts](src/lib/auth-helpers.ts)) verifies via `JwtHelpers.verifyToken(token)`. JWT carries `subject = merchantId` and `audience = authorizedAppId`.
- JWT expires after 4h (`expiresIn: '4h'`). After that, AppBridge re-issues from ikas Admin.

## Session cookie
- iron-session ([src/lib/session.ts](src/lib/session.ts)) holds `state`, `storeName`, `merchantId`, `authorizedAppId`, `expiresAt`.
- Used during OAuth (CSRF) and as a server-side bridge between authorize and callback.
- Encrypted with `SECRET_COOKIE_PASSWORD`.

## Security notes
- HMAC-SHA256 signature on OAuth callback is the primary defense against code-injection from a malicious referrer. Don't bypass.
- `CLIENT_SECRET` is used for **both** OAuth (with ikas) AND JWT signing. Single secret = single rotation. If we rotate `CLIENT_SECRET`, all in-flight JWTs become invalid (acceptable, JWTs are short-lived).
- JWT signing uses `process.env.CLIENT_SECRET || ''`. Empty fallback is dangerous — add explicit env validation at boot.

## Notes
- **Product snapshot backfill is non-blocking.** The callback awaits product webhook registration (one `saveWebhooks` mutation) but runs the full `ProductSnapshot` backfill (`syncAllProductsForStore`) via Next.js `after()`, *after* the 302 response is sent. Install latency stays independent of catalog size; a backfill cut short by the serverless function timeout is recovered by product webhooks or `POST /api/admin/sync-products`. See [[ADR_0015_Canonical_Product_Identity]].
- **Embedded vs standalone**: the app supports both — running embedded in ikas Admin (iframe + AppBridge) or standalone in a browser tab (after manual store-name entry). Production usage is iframe.
- **OAuth scope** currently `read_orders,write_orders,read_products,read_inventories,write_inventories`. Likely template inheritance — review if write_* are needed for a review app. Tracked in [[Open_Questions]].

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
