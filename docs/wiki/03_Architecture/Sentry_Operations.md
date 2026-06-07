---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-06-07
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
---

# Sentry Operations

## Summary
Sentry is the observability surface for the Next.js panel app. The organization and project slugs are now under the Renuvex namespace, the Sentry MCP server is wired into the AI tooling, and `@sentry/nextjs` is installed and initialized for Node, Edge, and browser runtimes. The strategy and trade-offs live in [[ADR_0009_Sentry_Observability_Strategy]]; this page is the operational reference.

## Libraries / Technologies
- `@sentry/nextjs` (panel SDK)
- Sentry MCP server: `https://mcp.sentry.dev/mcp/renuvex`
- Sentry CLI npm package: `sentry@^0.33` (global on the maintainer machine)
- CLI config: `C:\Users\mertw\.sentry\cli.db`
- Vercel-Sentry integration (Vercel Marketplace): injects `SENTRY_ORG` and `SENTRY_PROJECT` into Vercel env automatically; `SENTRY_AUTH_TOKEN` is added manually.

## Project Coordinates
- Organization: `renuvex`
- Project slug: `renuvex-product-reviews`
- Project ID: `4511372449218640`
- Region: EU (`de.sentry.io`)
- Authenticated CLI user: `mertworkspace2906@gmail.com`

## Runtime Initialization
- `src/instrumentation.ts` — Next.js entry. Conditionally imports `sentry.server.config.ts` on `nodejs` and `sentry.edge.config.ts` on `edge`. Exports `onRequestError = Sentry.captureRequestError`.
- `sentry.server.config.ts` — Node runtime init.
- `sentry.edge.config.ts` — Edge runtime init.
- `src/instrumentation-client.ts` — browser init; also exports `onRouterTransitionStart` for App Router navigation traces.
- `src/app/global-error.tsx` — App Router root error boundary; captures uncaught render errors.
- `next.config.js` — wrapped with `withSentryConfig`. `widenClientFileUpload: true`, `automaticVercelMonitors: true`, debug-logging tree-shake enabled.

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
- Sentry MCP token persists in `C:\Users\mertw\.sentry\cli.db`. It auto-refreshes; do not commit the file.
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
- **All widget health signals collapse into one issue.** dom-conflict, visibility-health, slot-reorder, and title-not-found forward through the same endpoint with an identical server stack (and no client stack), so Sentry fingerprints them into a single issue (e.g. titled "Widget node missing after render"). Differentiate sub-types via the `widgetEventType` tag and the `widgetHealth.reason`/`surface` extras, not the issue title.
- Widget reporter cap: 5 errors per page session, dedupe per (message+stack), 2-second minimum gap between sends
- Widget runtime context on forwarded reports: route, document visibility/ready state, online status, and failed resource URL/tag when the browser reports a script/chunk load failure.
- Server rate-limit: 30 reports per IP per 60 seconds (Upstash key prefix `renuvex_pr_werr_rl:`; legacy `ikr_werr_rl:` was pre-namespace-migration)

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
| 1 | **Alert rules** for new issues. Currently no email/Slack notification on regressions. | First time a real production bug stays unnoticed for >1 hour, or when traffic grows past hobby level. | Sentry UI → Alerts → New Alert Rule. Suggested: `eventCount > 10 in 5m` (regression spike) and `users > 5 in 1h` (broad impact). Route to maintainer email. |
| 2 | **Narrow Sentry MCP scope** from organization to project. | When a second Sentry project is added to `renuvex`. With only one project, scope makes no practical difference. | Edit `.mcp.json`: `https://mcp.sentry.dev/mcp/renuvex` -> `https://mcp.sentry.dev/mcp/renuvex/renuvex-product-reviews`. |
| 3 | **Saved searches** in Sentry UI for `tags[source]:widget` and `!tags[source]:widget`. | First time widget errors start arriving and the dashboard needs to be triaged separately from panel issues. | Sentry UI → Issues → run the query → "Save Search". UI-only, no code or wiki change. |

None of the above is a quality-gate blocker. They exist here so future-you (or future Claude) does not re-discover them from scratch.

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

## Change Log
- 2026-05-27: Widget reporter now forwards widget script/chunk resource-load failures and route/visibility/readyState/online context. Classic loader runtime-import failures include the same context, so intermittent "error script" reports after refresh or SPA navigation can be tied to a failed hashed runtime URL instead of remaining browser-only noise.
- 2026-05-25: RENUVEX-PRODUCT-REVIEWS-6 (`listing-badge` / `missing_after_render`, ~93 events) proven to be a **false positive** — the visibility probe held a stale reference to the pre-self-heal element. Fixed in `core/health.js` (probe re-resolves the live owned node); verified on the dev store (1 report/session → 0). See [[Bug_Listing_Badge_Missing_After_Render]], [[Widget_Architecture]].
- 2026-05-25: Documented that the Sentry MCP `search_issues` tool under-counts (returns only the latest-active issue, omits other unresolved ones) — enumerate by short ID. Noted that all widget health signals fingerprint into one issue; differentiate via `widgetEventType`/`widgetHealth`. Fixed three issues surfaced this way: `/callback` token-log removal, `setToken` throw→return, dashboard init 401 guard (see [[Debugging_Notes]], [[Auth_And_Installation_Flow]]).
- 2026-05-25: Sentry organization/project external slugs are now `renuvex` / `renuvex-product-reviews`; Vercel env was redeployed successfully and `.mcp.json` now points at the Renuvex organization scope.
- 2026-05-25: Namespace cleanup changed the local `next.config.js` project fallback to `renuvex-product-reviews`. Widget-error rate-limit keys use `renuvex_pr_werr_rl:`.
- 2026-05-17: Added Context7-backed Sentry JavaScript note for Phase 1 post-test triage. Tags, context, breadcrumbs, and captured events are the useful Sentry SDK-level signals, but browser/runtime evidence remains primary.
- 2026-05-17: Added Phase 1 widget post-test check guidance. Sentry should be used after browser/Playwright verification to catch widget/API runtime errors, but it is not a substitute for visual DOM and event-payload audits. Related: [[Phase_1_Widget_Runtime_Audit]].
- 2026-05-11: Added "Pending Operational Improvements" section: alert rules, MCP scope narrowing, and saved searches. None blocking — captured here so they are not re-discovered from scratch.
- 2026-05-11: Added widget error forwarding via `/api/public/widget-error`. Tiny in-widget reporter (637 bytes gzip) forwards uncaught widget errors to the panel's Sentry SDK without bundling the SDK into the widget. Decision in [[ADR_0010_Widget_Error_Forwarding]].
- 2026-05-11: Wizard ran successfully; SDK initialized for Node/Edge/browser. Switched DSN from wizard-hardcoded literal to env var read. Set `sendDefaultPii: false`, production `tracesSampleRate: 0.1`, masked Replay with prod 5% / on-error 100%. Deleted the wizard-generated `/sentry-example-page` and `/api/sentry-example-api` after verifying ingestion. Recorded decision in [[ADR_0009_Sentry_Observability_Strategy]].
- 2026-05-11: Added Sentry operations note after CLI authentication was verified and MCP was scoped to the then-current Sentry organization. Current org/project slugs are `renuvex` / `renuvex-product-reviews`.
