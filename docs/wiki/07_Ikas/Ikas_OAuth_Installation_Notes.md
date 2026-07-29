---
type: ikas
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-29
last_verified: 2026-07-29
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

## Pending provider clarification: OAuth least privilege

Status on 2026-07-29:

- **Question status:** prepared, not yet recorded as sent.
- **Provider response:** pending.
- **Implementation decision:** blocked until the provider contract and a
  development-store reauthorization test agree.
- The authorize route currently requests `read_orders`, `write_orders`,
  `read_products`, `read_inventories`, `write_inventories`, and
  `read_customers`.
- A read-only production aggregate showed that the retained OAuth token has the
  broader Partner configuration, including write access for products, orders,
  customers, campaigns, inventories, and storefronts. No token, merchant, or
  installation identifier was recorded.
- Source inventory finds only four mutation families in use:
  `saveWebhooks` for product events, `saveWebhooks` for order events,
  `createStorefrontJSScript`, and `updateStorefrontJSScript`. There is no source
  call to an order, inventory, product, customer, or campaign data mutation.
- `write_storefronts` remains a required candidate because the application
  creates and updates its storefront script. `write_orders`,
  `write_inventories`, `read_inventories`, and the other Partner-level write
  grants are removal candidates, not yet approved removals.
- The public schema and official documentation expose `saveWebhooks`, but do
  not state its exact OAuth-scope dependency. Panel controls alone therefore do
  not prove whether order/product webhook registration depends on the
  corresponding data write scopes.

The following application-neutral question is ready to send to ikas:

> **Konu: Admin API OAuth scope ve minimum yetki doğrulaması**
>
> Bir ikas Admin uygulamasında aşağıdaki operasyonları kullanıyoruz:
>
> **Query operasyonları**
>
> - `getMerchant`
> - `getAuthorizedApp`
> - `listStorefront`
> - `listStorefrontJSScript`
> - `listProduct`
> - `listOrder`
> - `listCustomer`
>
> **Mutation operasyonları**
>
> - `saveWebhooks`
>   - `store/product/created`
>   - `store/product/updated`
>   - `store/order/created`
>   - `store/order/updated`
> - `createStorefrontJSScript`
> - `updateStorefrontJSScript`
>
> Uygulama; sipariş, envanter, ürün, müşteri veya kampanya verisini
> değiştiren başka bir mutation kullanmıyor.
>
> Minimum OAuth izinlerini belirlemek için aşağıdaki konuları doğrulayabilir
> misiniz?
>
> 1. Yukarıdaki operasyonların her biri için gereken exact OAuth scope nedir?
> 2. Order webhook kaydetmek için `write_orders` gerekli midir?
> 3. Product webhook kaydetmek için `write_products` gerekli midir?
> 4. `saveWebhooks`, webhook türüne göre ilgili write scope'u mu gerektirir,
>    yoksa ayrı bir uygulama entegrasyonu yetkisiyle mi çalışır?
> 5. `createStorefrontJSScript` ve `updateStorefrontJSScript` için yalnız
>    `write_storefronts` yeterli midir?
> 6. `listStorefront` ve `listStorefrontJSScript` için ayrıca bir
>    read-storefront scope'u bulunuyor mu?
> 7. Envanter sorgusu veya mutation'ı kullanmayan bir uygulamadan
>    `read_inventories` ve `write_inventories` güvenle kaldırılabilir mi?
> 8. Authorize URL'sindeki `scope` parametresi ile Partner Paneli'nde seçilen
>    izinler farklıysa access token hangi izinleri alır?
> 9. Authorize isteğinde bulunmayan fakat Partner Paneli'nde seçili olan
>    scope'ların token içinde dönmesi beklenen davranış mıdır?
> 10. Partner Paneli'nden izin azaltıldığında mevcut access/refresh tokenların
>     yetkileri hemen daralır mı?
> 11. İzin azaltılması sonrasında kurulu mağazaların yeniden yetkilendirilmesi
>     veya uygulamayı yeniden kurması gerekir mi?
> 12. Bu operasyon kümesi için önerdiğiniz minimum scope seti nedir?
>
> Değerlendirdiğimiz minimum set:
>
> ```text
> read_products
> read_orders
> read_customers
> write_storefronts
> ```
>
> `saveWebhooks` için gerekli ek bir scope varsa bu sete eklemek istiyoruz.

Closure after the provider response:

1. Record the response date and a PII-free, source-attributed contract summary
   in this section.
2. Derive the exact target scope set; do not copy provider prose into a
   requirement without reconciling it with the source operation inventory.
3. Update Partner permissions and the authorize scope only through a separately
   approved development-store test.
4. Reauthorize the development store and verify the granted token scope,
   dashboard reads, product/order/customer reads, both webhook registrations,
   and storefront script create/update.
5. Decide the compatibility path for existing installations before any
   production permission reduction.

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
