---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - sentry
  - observability
  - mcp
  - cli
  - sdk
related:
  - "[[Index]]"
  - "[[Deployment_Notes]]"
  - "[[Debugging_Notes]]"
  - "[[Security_And_Rate_Limits]]"
  - "[[ADR_0009_Sentry_Observability_Strategy]]"
  - "[[Phase_1_Widget_Runtime_Audit]]"
source_files:
  - "sentry.server.config.ts"
  - "sentry.edge.config.ts"
  - "src/instrumentation.ts"
  - "src/instrumentation-client.ts"
  - "src/app/global-error.tsx"
  - "src/app/api/public/widget-error/route.ts"
  - "src/widget/core/error-reporter.js"
---

# Sentry Operations

## Agent Brief

Use this page for Sentry runtime, privacy, grouping, and alert operations. The
storefront does not ship the Sentry SDK; it sends bounded reports to the public
widget-error route. Product ID/placement health events use strict allowlisted
tags and fixed fingerprints, while external alert creation remains an explicit
mutation gate. The owner deferred the Badge/Product ID alert mutation and
controlled-delivery test on 2026-09-10; do not resume them without fresh
explicit approval.

## Summary
Sentry is the observability surface for the Next.js panel app. The organization and project slugs are now under the Renuvex namespace, the Sentry MCP server is wired into the AI tooling, and `@sentry/nextjs` is installed and initialized for Node, Edge, and browser runtimes. The strategy and trade-offs live in [[ADR_0009_Sentry_Observability_Strategy]]; this page is the operational reference.

## Libraries / Technologies
- `@sentry/nextjs` (panel SDK)
- Sentry MCP server: `https://mcp.sentry.dev/mcp/renuvex`
- Sentry CLI npm package: `sentry@^0.33` (global on the maintainer machine)
- CLI authentication: local Sentry CLI credential store (outside the repository)
- Vercel-Sentry integration (Vercel Marketplace): injects `SENTRY_ORG` and `SENTRY_PROJECT` into Vercel env automatically; `SENTRY_AUTH_TOKEN` is added manually.

## Project Coordinates
- Organization: `renuvex`
- Project slug: `renuvex-product-reviews`
- Region: EU (`de.sentry.io`)

## Runtime Initialization
- `src/instrumentation.ts` — Next.js entry. Conditionally imports `sentry.server.config.ts` on `nodejs` and `sentry.edge.config.ts` on `edge`. Exports `onRequestError = Sentry.captureRequestError`.
- `sentry.server.config.ts` — Node runtime init.
- `sentry.edge.config.ts` — Edge runtime init.
- `src/instrumentation-client.ts` — browser init; also exports `onRouterTransitionStart` for App Router navigation traces.
- `src/app/global-error.tsx` — App Router root error boundary; captures uncaught render errors.
- `next.config.js` — wrapped with `withSentryConfig`. `widenClientFileUpload: true`, `automaticVercelMonitors: true` (instruments **Pages Router** crons only; current maintenance runs through QStash-signed App Router handlers, so this setting is a no-op here. Maintenance task failures alert via `captureException` / `source:cron`, **not** Sentry cron monitors; see [[Maintenance_Runbook]] / ADR_0030), debug-logging tree-shake enabled.

## Configuration Contract
- **DSN**: read from env, never hardcoded.
  - Browser: `process.env.NEXT_PUBLIC_SENTRY_DSN`
  - Server/Edge: `process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN`
- **`sendDefaultPii: false`** in all three configs. Reason: ikas OAuth tokens travel in `Authorization` headers and JWTs in cookies. Default-true would auto-attach those to every event. See [[ADR_0009_Sentry_Observability_Strategy]] and [[Security_And_Rate_Limits]].
- **`tracesSampleRate`**: `0.1` in production, `1` in development.
- **Replay**: `maskAllText: true`, `blockAllMedia: true`. `replaysSessionSampleRate: 0.05` in prod, `0.1` in dev. `replaysOnErrorSampleRate: 1.0`.
- **`enableLogs: true`** — server `console.error`/`console.warn` and structured logs ship to Sentry alongside events.

## Environment Variables
| Variable | Where it lives | Scope | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` | `.env.local` (local), Vercel env (Production + Preview, marked Sensitive) | runtime | DSN read by SDK in all runtimes |
| `SENTRY_AUTH_TOKEN` | `.env.sentry-build-plugin` (local, gitignored), Vercel env (Production + Preview, marked Sensitive) | build-time | Source map upload + release creation |
| `SENTRY_ORG` | Vercel env, injected by Vercel-Sentry integration or set manually | build-time | `renuvex` |
| `SENTRY_PROJECT` | Vercel env, injected by Vercel-Sentry integration or set manually | build-time | `renuvex-product-reviews` |

`.env.sentry-build-plugin` and `.sentryclirc` are listed in `.gitignore`. Never commit either.

`SENTRY_AUTH_TOKEN` must be minted for the same Sentry organization as `SENTRY_ORG`.
If Vercel build logs show `Using organization <other-org> (embedded in token)`
followed by `Project not found`, the deployment can still succeed but Sentry
release/source-map upload should be treated as failed until the token is rotated.

## Operational Notes
- Source maps upload during the Vercel build via `@sentry/webpack-plugin` (wrapper of `withSentryConfig`). The build log line **"Created release ..."** followed by sourcemap upload lines is the canonical success signal. Absence of those lines means stack traces will be minified in Sentry.
- `@sentry/cli` is approved in `package.json` `pnpm.onlyBuiltDependencies`. If Vercel logs `Ignored build scripts: @sentry/cli`, the source-map upload install path is not in the expected state.
- Vercel "Redeploy" without a new commit will re-run with current env, but **will not include code changes not yet pushed**. Always commit Sentry config changes before redeploying.
- Multiple org auth tokens exist for the project (wizard generates one per run). Keep one for local (`.env.sentry-build-plugin`) and one for Vercel CI; revoke unused ones in Settings → Organization Tokens.
- Sentry MCP/CLI credentials persist in the maintainer's local credential store.
  Never copy that store or its contents into the repository or wiki.
- ⚠️ **`search_issues` (MCP) under-counts for this org.** It has returned only the most-recently-active issue, silently omitting other `unresolved` ones (reproduced with `is:unresolved` and `lastSeen:-30d`). To enumerate reliably, fetch consecutive short IDs (`RENUVEX-PRODUCT-REVIEWS-<n>`) via `get_sentry_resource`, or use the web UI. Treat `search_issues` counts as a lower bound.

## Quota Levers (in order of preference if quota alerts fire)
1. Drop `replaysSessionSampleRate` from `0.05` toward `0.01`.
2. Drop `tracesSampleRate` from `0.1` toward `0.02`.
3. Tighten `replaysOnErrorSampleRate` only as last resort — that is the highest-signal stream.

## Widget Bundle Exclusion
The storefront widget bundle (`public/widget.js`) intentionally **does not** ship the Sentry SDK. Reasons in [[ADR_0009_Sentry_Observability_Strategy]] §Reasoning.

However, uncaught widget errors are no longer invisible. A tiny reporter in the widget forwards `error`, `unhandledrejection`, and widget script/chunk resource-load failures whose source mentions `widget.js` / `widget-runtime` to `/api/public/widget-error`. The panel-side endpoint captures them with `Sentry.captureException` tagged `source: widget`. Decision recorded in [[ADR_0010_Widget_Error_Forwarding]].

### Filtering widget vs panel issues in Sentry
- Widget-originated issues: query `tags[source]:widget`
- Panel-originated issues: query `!tags[source]:widget` (or omit the tag)
- Ordinary widget exceptions and legacy health signals retain stack-based Sentry
  grouping. The four Product ID/placement health types below use explicit fixed
  fingerprints; they no longer collapse into the generic server stack issue.
- Widget reporter cap: 5 errors per page session, dedupe per (message+stack), 2-second minimum gap between sends
- Widget runtime context on forwarded reports: route, document visibility/ready state, online status, and failed resource URL/tag when the browser reports a script/chunk load failure.
- Server rate-limit: 30 reports per IP per 60 seconds (Upstash key prefix `renuvex_pr_werr_rl:`; legacy `ikr_werr_rl:` was pre-namespace-migration)

### Product ID and placement health

The storefront runtime emits four controlled health types through the same
endpoint without loading the Sentry SDK:

- `placement-attestation-miss`
- `identity-resolution-miss`
- `identity-resolution-error`
- `identity-conflict`

For these types, the client sends only `type`, `surface`, `adapterKey`, `reason`,
and build version. The server applies exact allowlists for type/surface/adapter/
reason, accepts only `dev` or the build's ISO timestamp as runtime version, and
maps everything else to `unknown`. It discards the client URL, user agent,
message, stack, product name, slug, Product ID, and arbitrary extras before
capture. Tags are `widgetEventType`, `widgetSurface`, `widgetAdapter`,
`widgetReason`, and `widgetRuntimeVersion` plus fixed `source:widget`.

The fingerprint is stable by
`type + surface + adapterKey + reason`. Real JavaScript exceptions continue to
use their normal stack grouping. After separately approved Sentry mutation,
`identity-conflict` must notify the maintainer on the first event; the other
three types must notify at a combined threshold of 10 events in 5 minutes.

## Phase 1 Widget Post-Test Check

For [[ADR_0013_Modular_Widget_Loader_Architecture]] Phase 1, Sentry is a secondary
post-test signal. Run it after the dev-store browser/Playwright pass and check for
new `tags[source]:widget`, `widget.js`, `/api/public/widget-error`, and
`/api/public/*` issues.

Context7 check: `/getsentry/sentry-javascript` was reviewed on 2026-05-17 for
this phase. Relevant Sentry signals are tags, contexts, breadcrumbs, captured
exceptions/messages, and enriched event details. This supports the triage method;
it does not replace actual project issue inspection.

Important: a clean Sentry result does not prove Phase 1 passes. Missing listing
badge stars, badges injected into the wrong section, or Storefront Events fallback
behavior can happen without an exception. The primary evidence remains browser
DOM, visual, console, network, and event-payload inspection in
[[Phase_1_Widget_Runtime_Audit]].

## Pending Operational Improvements
Not blocking, no decision required — operational follow-ups to revisit when the trigger condition is met. If you are touching anything in this page, scan this list first.

| # | Improvement | Trigger to act | How |
|---|---|---|---|
| 1 | **Product ID/placement alert rules.** Source contract is implemented; external Sentry rules are not created. The owner deferred this operation on 2026-09-10. | Resume only after fresh explicit mutation approval. | Notify maintainer email on the first `identity-conflict`; use one metric detector to aggregate `placement-attestation-miss`, `identity-resolution-miss`, and `identity-resolution-error` at 10 events / 5 minutes. Verify both paths with controlled events before Badge Product ID Production closure. |
| 2 | **Narrow Sentry MCP scope** from organization to project. | When a second Sentry project is added to `renuvex`. With only one project, scope makes no practical difference. | Edit `.mcp.json`: `https://mcp.sentry.dev/mcp/renuvex` -> `https://mcp.sentry.dev/mcp/renuvex/renuvex-product-reviews`. |
| 3 | **Saved searches** in Sentry UI for `tags[source]:widget` and `!tags[source]:widget`. | First time widget errors start arriving and the dashboard needs to be triaged separately from panel issues. | Sentry UI → Issues → run the query → "Save Search". UI-only, no code or wiki change. |

Items 2 and 3 are not quality-gate blockers. Item 1 remains a final Badge
Product ID acceptance gate, but it is deliberately paused by owner decision.
These entries exist so future work does not re-discover them from scratch.

## Related Source Files
- [sentry.server.config.ts](sentry.server.config.ts)
- [sentry.edge.config.ts](sentry.edge.config.ts)
- [src/instrumentation.ts](src/instrumentation.ts)
- [src/instrumentation-client.ts](src/instrumentation-client.ts)
- [src/app/global-error.tsx](src/app/global-error.tsx)
- [next.config.js](next.config.js)
- [src/widget/core/error-reporter.js](src/widget/core/error-reporter.js)
- [src/widget/classic-loader.js](src/widget/classic-loader.js)
- [src/app/api/public/widget-error/route.ts](src/app/api/public/widget-error/route.ts)

## Obsidian Links
- [[ADR_0009_Sentry_Observability_Strategy]]
- [[Deployment_Notes]]
- [[Debugging_Notes]]
- [[Security_And_Rate_Limits]]
- [[Config_And_Env_Map]]
- [[Phase_1_Widget_Runtime_Audit]]
