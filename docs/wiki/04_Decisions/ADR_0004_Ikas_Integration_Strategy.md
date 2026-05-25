---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-05
tags:
  - adr
  - ikas
related:
  - "[[Decision_Index]]"
  - "[[Auth_And_Installation_Flow]]"
  - "[[Ikas_API_Notes]]"
---

# ADR_0004 — ikas Integration Strategy

## Status
Accepted

## Date
2026-05-05 (documenting inherited approach)

## Context
We need to:
- Authenticate merchants via ikas OAuth
- Read merchant + storefront data (`getMerchant`, `listStorefront`)
- Inject and update storefront `<script>` tags via `StorefrontJSScript` mutations
- Refresh expired access tokens transparently
- Use the ikas Admin GraphQL API in a typed way

## Decision
- Use **`@ikas/admin-api-client`** for OAuth token exchange and as the GraphQL client.
- Define ikas operations in [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts) using `gql`.
- Generate typed client + types via **GraphQL Codegen** (`pnpm codegen`) into [src/lib/ikas-client/generated/graphql.ts](src/lib/ikas-client/generated/graphql.ts).
- Wrap client construction in `getIkas(token)` ([src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)) which wires `onCheckToken` for transparent refresh.
- Inject the storefront widget script automatically on OAuth callback; provide a manual "re-inject" admin button as fallback.
- When introspecting unfamiliar ikas operations, use the **ikas MCP** (`mcp__ikas__list` + `mcp__ikas__introspect`) before adding them to `graphql-requests.ts`.

## Reasoning
- The official client already implements the OAuth + token-refresh dance — re-implementing from scratch would be wasted effort and risk.
- Codegen gives us autocomplete and compile-time errors when ikas schema changes (rerun `pnpm codegen`).
- Auto-inject on install removes the most common merchant friction point. Manual re-inject covers the edge cases (script deleted manually, ikas API hiccup at install time).
- ikas MCP introspection is available and saves round trips to docs.

## Alternatives Considered
- **Hand-rolled GraphQL client** — too much surface area to reinvent. Rejected.
- **REST proxying** — ikas exposes GraphQL, no reason to abstract.
- **No codegen** — would require manual TS types per operation; high cost, low value.
- **No auto-inject (manual paste of `<script>` snippet by merchant)** — bad adoption story. See [[ADR_0002_Widget_Injection_Strategy]].

## Consequences
- We're tightly coupled to `@ikas/admin-api-client`. Breaking changes in the SDK propagate.
- Generated types must be regenerated after every change to `graphql-requests.ts`. Easy to forget — surface the warning in PR review.
- The auto-inject behavior at install does work that can fail silently (try/catch in the callback). We accept this for install resilience but should monitor.
- Storefront script lifecycle now avoids zero-argument `deleteStorefrontJSScript()` and uses non-destructive create/update only. Keep that invariant until ikas exposes a targeted, verified delete/list contract.
- OAuth scope (`read_orders,write_orders,read_products,read_inventories,write_inventories`) is template-inherited and probably broader than necessary. Reduce in a follow-up ADR.

## Related Source Files
- [src/lib/ikas-client/](src/lib/ikas-client/)
- [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts)

## Related Notes
- [[Auth_And_Installation_Flow]]
- [[Ikas_API_Notes]]
- [[Ikas_Platform_Notes]]
- [[Ikas_Widget_Injection_Notes]]
- [[ADR_0002_Widget_Injection_Strategy]]
