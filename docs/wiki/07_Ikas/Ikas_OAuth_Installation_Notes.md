---
type: ikas
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-28
last_verified: 2026-07-28
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
- **Code signature**: when ikas supplies `signature`, validate
  `HMAC-SHA256(code, clientSecret)` before consuming state. This remains a
  separate control from OAuth login-CSRF state.
- **State parameter**: mandatory for token exchange. Authorize issues a 256-bit
  value, binds it to an opaque iron-session browser id, and stores a versioned
  ten-minute transaction under SHA-256 key components. A state-bearing callback
  requires an exact match and consumes it atomically with Redis `GETDEL`.
- **Dashboard bootstrap**: a live 2026-07-28 dashboard install reached the
  correctly configured callback with `code` and `storeName`, but no `state` or
  `signature`. The code is discarded. One hashed browser/store `SET NX EX 600`
  marker permits a 303 to the normal authorize route; a repeated state-less
  return fails closed. No callback without state reaches token exchange or DB.
- **storeName context**: authorize canonicalizes one lowercase DNS label.
  Callback must supply the same name as the frozen transaction. The transaction
  also freezes the exact redirect URI used in token exchange. For refresh, the
  SDK's docs imply `'api'` works generically — verify when you debug.
- **Token shape**: `access_token`, `refresh_token`, `token_type`, `expires_in`, `scope`. Persist in `AuthToken` table.
- **expireDate**: we compute as `now + expires_in` and persist; refresh re-computes.
- **Scope**: configured in [src/globals/config.ts](src/globals/config.ts).
  `read_customers` supports current-consent review-email preflight. Remaining
  inherited write/inventory scopes still need a separate least-privilege
  review.

## Gotchas
- **Re-install hygiene**: `activateIkasStoreInstallation()` serializes callback/uninstall work per merchant, increments generation for a new `authorizedAppId`, and replaces stale tokens in the same transaction. An erased identity cannot be reactivated by a delayed callback.
- **Uninstall source exists but live acceptance is open**: the disabled review-email order endpoint handles signed `store/app/deleted`, deletes review-email/order/auth PII, retries failures, and ignores a stale generation after reinstall. Provider registration and the app-wide policy for merchants who never enable review email still require live ikas acceptance before launch.
- **`getRedirectUri(host)`** in [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts) tries to recover when the configured redirect uses `localhost` but the request comes from a different public development host. Useful for local dev with a public tunnel. In prod, always set `NEXT_PUBLIC_DEPLOY_URL` correctly.
- **JWT and OAuth share `CLIENT_SECRET`**. Rotation simultaneously invalidates JWTs and breaks ikas refresh. Plan rotations carefully.

## Failure surface
- Invalid signature → 400.
- First dashboard callback without state → unbound code discarded and one
  no-store/no-referrer authorization restart; repeated state-less callback →
  400 before provider or DB work.
- Malformed/expired/replayed/wrong-browser/wrong-store state → 400 before
  provider or DB work.
- Missing or unavailable OAuth Redis → 503 with no redirect/token exchange.
- Token exchange failure (network / wrong code) → 500 with a generic response
  and fixed `callback_failed` log code; provider bodies and callback credentials
  are not persisted in logs.
- `getMerchant` / `getAuthorizedApp` fail → 403 "Unable to retrieve merchant or authorized app".
- Script-injection block can fail silently (try/catch) — install succeeds; merchant will need manual re-inject.

## Related Source Files
- [src/app/api/oauth/authorize/ikas/route.ts](src/app/api/oauth/authorize/ikas/route.ts)
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/lib/oauth-state.ts](src/lib/oauth-state.ts)
- [src/lib/session.ts](src/lib/session.ts)
- [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)
- [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- [src/globals/config.ts](src/globals/config.ts)

## Obsidian Links
- [[Auth_And_Installation_Flow]]
- [[Ikas_Platform_Notes]]
- [[Ikas_App_Store_Requirements]]
- [[Open_Questions]]

## Official references
- [ikas OAuth authorize API](https://builders.ikas.com/docs/app-development/admin-app/authorization/oauth-authorize-api)
- [ikas OAuth callback API](https://builders.ikas.com/docs/app-development/admin-app/authorization/oauth-callback-api)
- [OAuth 2.0 Security Best Current Practice, section 2.1](https://datatracker.ietf.org/doc/html/rfc9700#section-2.1)
