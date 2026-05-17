---
type: api
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-17
tags:
  - ikas
  - graphql
related:
  - "[[Index]]"
  - "[[Ikas_Platform_Notes]]"
  - "[[ADR_0004_Ikas_Integration_Strategy]]"
---

# ikas API Notes

## Summary
ikas Admin GraphQL operations we currently use, plus how to add new ones safely.

## Endpoint
- `NEXT_PUBLIC_GRAPH_API_URL` = `https://api.myikas.com/api/v2/admin/graphql`
- Authenticated with the access token from OAuth.

## Operations in use

| Operation | Type | Where | Purpose |
|---|---|---|---|
| `getMerchant` | Query | OAuth callback, `/api/ikas/get-merchant` | Fetch merchant id, email, storeName |
| `getAuthorizedApp` | Query | OAuth callback | Get `id`, `salesChannelId` for the install |
| `listStorefront` | Query | OAuth callback, inject-scripts, daily maintenance/reconcile helper | Enumerate storefronts to inject script into |
| `createStorefrontJSScript` | Mutation | OAuth callback, inject-scripts, daily maintenance/reconcile helper | Add this app's loader `<script>` to a storefront |
| `updateStorefrontJSScript` | Mutation | OAuth callback, inject-scripts, daily maintenance/reconcile helper | Update known script content (idempotent) |
| `saveWebhooks` | Mutation | OAuth callback, sync-products | Register product create/update webhook endpoints |
| `listProduct` | Query | Product snapshot backfill/webhook repair | Maintain `ProductSnapshot` for current slug/name fallback |

Source: [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts) and generated client at [src/lib/ikas-client/generated/graphql.ts](src/lib/ikas-client/generated/graphql.ts).

## Adding a new operation
1. Discover via `mcp__ikas__list` (catalog) → `mcp__ikas__introspect` (shape).
2. Define the gql document in [graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts).
3. Run `pnpm codegen` to regenerate types and client surface.
4. Use via `getIkas(token).queries.<name>(vars)` or `.mutations.<name>(input)`.

## Error patterns
- `response.isSuccess === false` is the failure path. Inspect `response.error` for the message.
- Mutations sometimes succeed at HTTP level but fail at the domain level — always check `isSuccess`.
- Refresh-token flow: `OAuthAPI.refreshToken({ refresh_token, client_id, client_secret }, { storeName })`. Returns new tokens.

## Notes
- Don't call ikas API from `/api/public/*` routes. Storefront-side calls would put the access token at risk and break rate limits.
- The OAuth callback runs storefront-injection inside try/catch — failures here don't break the install. Make sure callers know "install succeeded but widgets not injected" is a possible state.
- Source intentionally does not call zero-argument `deleteStorefrontJSScript()` because active MCP/generated client and public docs disagree on delete semantics.
- We subscribe to ikas product create/update webhooks for `ProductSnapshot`. Consider order webhooks separately when adding review-request emails.
- Scope review: current `read_orders,write_orders,read_products,read_inventories,write_inventories` — we need read-only mostly; tighten in a follow-up.

## Related Source Files
- [src/lib/ikas-client/](src/lib/ikas-client/)
- [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)

## Obsidian Links
- [[Ikas_Platform_Notes]]
- [[ADR_0004_Ikas_Integration_Strategy]]
- [[Auth_And_Installation_Flow]]
- [[Ikas_Widget_Injection_Notes]]
