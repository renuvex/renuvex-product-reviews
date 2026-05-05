---
type: ikas
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - ikas
  - platform
related:
  - "[[Index]]"
  - "[[Ikas_API_Notes]]"
  - "[[Auth_And_Installation_Flow]]"
---

# ikas Platform Notes

## Summary
General platform-level facts about ikas that affect this app. Keep this page short and authoritative — drill into dedicated pages for OAuth ([[Ikas_OAuth_Installation_Notes]]), API ([[Ikas_API_Notes]]), widget injection ([[Ikas_Widget_Injection_Notes]]), theme constraints ([[Ikas_Theme_Limitations]]), and app store policy ([[Ikas_App_Store_Requirements]]).

## What ikas is
- Turkish e-commerce SaaS platform (think: Shopify-equivalent for Turkey-first merchants).
- Admin GraphQL API at `https://api.myikas.com/api/v2/admin/graphql`.
- App ecosystem with OAuth 2.0 install flow, AppBridge for embedded admin iframes, StorefrontJSScript for storefront injection.

## Concepts we depend on
| Concept | Used as | Reference |
|---|---|---|
| **Merchant** | Tenant identifier (`merchantId == storeId` in our DB) | OAuth callback `getMerchant` |
| **Authorized App** | Per-installation identifier (`authorizedAppId` is our `AuthToken` PK) | `getAuthorizedApp` |
| **Storefront** | Public shop frontend; merchant can have multiple | `listStorefront` |
| **StorefrontJSScript** | Server-managed `<script>` tag injected into storefront pages | `create/update/deleteStorefrontJSScript` mutations |
| **AppBridge** | iframe ↔ ikas Admin messaging, including JWT delivery | `@ikas/app-helpers` |
| **Sales Channel** | Multi-channel selling abstraction (we currently store `salesChannelId` but don't actively use it) | Returned by `getAuthorizedApp` |

## Constraints (from observed behavior — verify in docs)
- StorefrontJSScript is **per storefront**, not per page. There's no built-in "only inject on product detail pages". The widget itself decides whether to render based on URL/DOM heuristics.
- `deleteStorefrontJSScript()` (no args) appears to delete **all** scripts attached to the merchant — including from other apps. The OAuth callback uses this on fresh install. **Re-verify in docs before changing.**
- Token refresh requires `client_id` + `client_secret` — same as initial exchange.
- OAuth code includes a `signature` parameter (HMAC-SHA256 of code with client secret). Validation is recommended; we enforce when present.

## SDK / clients
- `@ikas/admin-api-client` — bundles `OAuthAPI` (token exchange / refresh) and the typed GraphQL client.
- `@ikas/app-helpers` — `AppBridgeHelper`, `getTokenForIframeApp`. Used by [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts) and [src/app/hooks/use-base-home-page.ts](src/app/hooks/use-base-home-page.ts).

## ikas MCP
The `mcp__ikas__list` and `mcp__ikas__introspect` tools (when available) discover GraphQL operations. Use these **before** adding new operations to [graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts).

## Notes
- ikas docs availability has varied historically. Treat the SDK + observed behavior as authoritative when docs are sparse.
- Errors from ikas API don't always include rich messages — log full response objects when debugging.
- The `storeName` is part of OAuth state and is used to fill the admin-redirect URL template (`https://{storeName}.myikas.com/admin/...`).

## Related Source Files
- [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)
- [src/lib/ikas-client/](src/lib/ikas-client/)
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)

## Obsidian Links
- [[Ikas_API_Notes]]
- [[Ikas_OAuth_Installation_Notes]]
- [[Ikas_Widget_Injection_Notes]]
- [[Ikas_Theme_Limitations]]
- [[Ikas_App_Store_Requirements]]
- [[Existing_AI_Rules_And_Ikas_CLI_Instructions]]
