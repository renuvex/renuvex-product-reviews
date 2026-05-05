---
type: ikas
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - ikas
  - oauth
related:
  - "[[Index]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[Ikas_Platform_Notes]]"
---

# ikas OAuth Installation Notes

## Summary
ikas-specific OAuth particulars and gotchas. The full step-by-step flow lives in [[Auth_And_Installation_Flow]] — this page captures ikas-quirks.

## Particulars
- **Code signature**: ikas appends a `signature` query param to the callback URL: `HMAC-SHA256(code, clientSecret)` in hex. Validate before exchanging the code. See `TokenHelpers.validateCodeSignature`.
- **State parameter**: optional but recommended. We set in the authorize step and verify in the callback when present.
- **storeName context**: the OAuth API requires a `storeName` context for both initial token exchange and refresh. We store this in the iron-session during authorize and reuse on callback. For refresh, the SDK's docs imply `'api'` works generically — verify when you debug.
- **Token shape**: `access_token`, `refresh_token`, `token_type`, `expires_in`, `scope`. Persist in `AuthToken` table.
- **expireDate**: we compute as `now + expires_in` and persist; refresh re-computes.
- **Scope**: configured in [src/globals/config.ts](src/globals/config.ts). Currently `read_orders,write_orders,read_products,read_inventories,write_inventories` — review necessity.

## Gotchas
- **Re-install hygiene**: `prisma.authToken.deleteMany({ merchantId })` runs on every callback before upsert. This is intentional to clean stale rows from previous installs (e.g. a merchant uninstalling and re-installing).
- **No uninstall webhook** wired today. Stale `AuthToken` rows for uninstalled merchants persist. Consider a periodic sweep or wiring an ikas uninstall callback if available.
- **`getRedirectUri(host)`** in [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts) tries to recover when the configured redirect uses `localhost` but the request comes from a different host (e.g. `*.trycloudflare.com` for a tunneled dev). Useful for local dev with a public tunnel. In prod, always set `NEXT_PUBLIC_DEPLOY_URL` correctly.
- **JWT and OAuth share `CLIENT_SECRET`**. Rotation simultaneously invalidates JWTs and breaks ikas refresh. Plan rotations carefully.

## Failure surface
- Invalid signature → 400.
- Mismatched state → 400.
- Token exchange failure (network / wrong code) → 500 with generic message; see Vercel logs for ikas response.
- `getMerchant` / `getAuthorizedApp` fail → 403 "Unable to retrieve merchant or authorized app".
- Script-injection block can fail silently (try/catch) — install succeeds; merchant will need manual re-inject.

## Related Source Files
- [src/app/api/oauth/authorize/ikas/route.ts](src/app/api/oauth/authorize/ikas/route.ts)
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)
- [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- [src/globals/config.ts](src/globals/config.ts)

## Obsidian Links
- [[Auth_And_Installation_Flow]]
- [[Ikas_Platform_Notes]]
- [[Ikas_App_Store_Requirements]]
- [[Open_Questions]]
