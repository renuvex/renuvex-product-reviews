---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-28
last_verified: 2026-07-28
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
2026-05-05 (documenting inherited approach); amended 2026-07-28 for mandatory
single-use OAuth state.

## Context
We need to:
- Authenticate merchants via ikas OAuth
- Read merchant + storefront data (`getMerchant`, `listStorefront`)
- Inject and update storefront `<script>` tags via `StorefrontJSScript` mutations
- Refresh expired access tokens transparently
- Use the ikas Admin GraphQL API in a typed way

## Decision
- Use **`@ikas/admin-api-client`** for OAuth token exchange and as the GraphQL client.
- Require a browser-bound, single-use OAuth state transaction before token
  exchange. Store only hashed state/binding key components in Upstash Redis,
  expire after ten minutes, and consume atomically with `GETDEL`.
- Freeze canonical `storeName` and exact redirect URI in that transaction.
  Redis failure is fail-closed; no cookie-only compatibility fallback exists.
- Define ikas operations in [src/lib/ikas-client/graphql-requests.ts](src/lib/ikas-client/graphql-requests.ts) using `gql`.
- Generate typed client + types via **GraphQL Codegen** (`pnpm codegen`) into [src/lib/ikas-client/generated/graphql.ts](src/lib/ikas-client/generated/graphql.ts).
- Wrap client construction in `getIkas(token)` ([src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)) which wires `onCheckToken` for transparent refresh.
- Inject the storefront widget script automatically on OAuth callback; provide a manual "re-inject" admin button as fallback.
- When introspecting unfamiliar ikas operations, use the **ikas MCP** (`mcp__ikas__list` + `mcp__ikas__introspect`) before adding them to `graphql-requests.ts`.

## Reasoning
- The official client already implements the OAuth + token-refresh dance — re-implementing from scratch would be wasted effort and risk.
- The SDK does not own the application's browser-CSRF transaction. A dedicated
  bounded Redis record supports parallel tabs and prevents two callbacks from
  exchanging the same state, which a single cookie field cannot guarantee.
- Codegen gives us autocomplete and compile-time errors when ikas schema changes (rerun `pnpm codegen`).
- Auto-inject on install removes the most common merchant friction point. Manual re-inject covers the edge cases (script deleted manually, ikas API hiccup at install time).
- ikas MCP introspection is available and saves round trips to docs.

## Alternatives Considered
- **Hand-rolled GraphQL client** — too much surface area to reinvent. Rejected.
- **REST proxying** — ikas exposes GraphQL, no reason to abstract.
- **No codegen** — would require manual TS types per operation; high cost, low value.
- **No auto-inject (manual paste of `<script>` snippet by merchant)** — bad adoption story. See [[ADR_0002_Widget_Injection_Strategy]].
- **Cookie-only `session.state`** — rejected because one slot overwrites
  concurrent flows, has no independent TTL, and cannot provide atomic
  single-use consumption.
- **PKCE in this phase** — deferred because current ikas support was not
  verified. Mandatory state remains required independently.

## Consequences
- We're tightly coupled to `@ikas/admin-api-client`. Breaking changes in the SDK propagate.
- Generated types must be regenerated after every change to `graphql-requests.ts`. Easy to forget — surface the warning in PR review.
- The auto-inject behavior at install does work that can fail silently (try/catch in the callback). We accept this for install resilience but should monitor.
- Storefront script lifecycle now avoids zero-argument `deleteStorefrontJSScript()` and uses non-destructive create/update only. Keep that invariant until ikas exposes a targeted, verified delete/list contract.
- OAuth installation now depends on Upstash availability and deliberately
  returns `503` instead of weakening CSRF protection.
- In-flight legacy cookie-only authorization attempts fail closed after rollout
  and must restart.
- OAuth scope includes `read_customers` for review-email consent checks; the
  remaining inherited write/inventory scope is still broader than this
  hardening decision and needs separate review.

## Related Source Files
- [src/lib/ikas-client/](src/lib/ikas-client/)
- [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- [src/helpers/token-helpers.ts](src/helpers/token-helpers.ts)
- [src/lib/oauth-state.ts](src/lib/oauth-state.ts)
- [src/lib/session.ts](src/lib/session.ts)
- [src/app/api/oauth/callback/ikas/route.ts](src/app/api/oauth/callback/ikas/route.ts)
- [src/app/api/admin/inject-scripts/route.ts](src/app/api/admin/inject-scripts/route.ts)

## Related Notes
- [[Auth_And_Installation_Flow]]
- [[Ikas_API_Notes]]
- [[Ikas_Platform_Notes]]
- [[Ikas_Widget_Injection_Notes]]
- [[ADR_0002_Widget_Injection_Strategy]]

## Official references
- [ikas OAuth authorize API](https://builders.ikas.com/docs/app-development/admin-app/authorization/oauth-authorize-api)
- [ikas OAuth callback API](https://builders.ikas.com/docs/app-development/admin-app/authorization/oauth-callback-api)
- [OAuth 2.0 Security Best Current Practice, section 2.1](https://datatracker.ietf.org/doc/html/rfc9700#section-2.1)
