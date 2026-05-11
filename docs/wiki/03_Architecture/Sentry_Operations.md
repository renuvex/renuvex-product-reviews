---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-11
updated: 2026-05-11
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
---

# Sentry Operations

## Summary
Sentry is the observability surface for the Next.js panel app. The maintainer's CLI is authenticated against `mert-copper`, the Sentry MCP server is wired into the AI tooling, and `@sentry/nextjs` is installed and initialized for Node, Edge, and browser runtimes. The strategy and trade-offs live in [[ADR_0009_Sentry_Observability_Strategy]]; this page is the operational reference.

## Libraries / Technologies
- `@sentry/nextjs` (panel SDK)
- Sentry MCP server: `https://mcp.sentry.dev/mcp/mert-copper/yorum-paneli`
- Sentry CLI npm package: `sentry@^0.33` (global on the maintainer machine)
- CLI config: `C:\Users\mertw\.sentry\cli.db`
- Vercel-Sentry integration (Vercel Marketplace): injects `SENTRY_ORG` and `SENTRY_PROJECT` into Vercel env automatically; `SENTRY_AUTH_TOKEN` is added manually.

## Project Coordinates
- Organization: `mert-copper`
- Project slug: `yorum-paneli`
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
| `SENTRY_ORG` | Vercel env, injected by Vercel-Sentry integration | build-time | `mert-copper` |
| `SENTRY_PROJECT` | Vercel env, injected by Vercel-Sentry integration | build-time | `yorum-paneli` |

`.env.sentry-build-plugin` and `.sentryclirc` are listed in `.gitignore`. Never commit either.

## Operational Notes
- Source maps upload during the Vercel build via `@sentry/webpack-plugin` (wrapper of `withSentryConfig`). The build log line **"Created release ..."** followed by sourcemap upload lines is the canonical success signal. Absence of those lines means stack traces will be minified in Sentry.
- Vercel "Redeploy" without a new commit will re-run with current env, but **will not include code changes not yet pushed**. Always commit Sentry config changes before redeploying.
- Multiple org auth tokens exist for the project (wizard generates one per run). Keep one for local (`.env.sentry-build-plugin`) and one for Vercel CI; revoke unused ones in Settings → Organization Tokens.
- Sentry MCP token persists in `C:\Users\mertw\.sentry\cli.db`. It auto-refreshes; do not commit the file.

## Quota Levers (in order of preference if quota alerts fire)
1. Drop `replaysSessionSampleRate` from `0.05` toward `0.01`.
2. Drop `tracesSampleRate` from `0.1` toward `0.02`.
3. Tighten `replaysOnErrorSampleRate` only as last resort — that is the highest-signal stream.

## Widget Bundle Exclusion
The storefront widget bundle (`public/widget.js`) intentionally **does not** ship Sentry. Reasons in [[ADR_0009_Sentry_Observability_Strategy]] §Reasoning. Widget crashes are handled with localized try/catch and `console.warn`; see [[Bug_Widget_CSS_Template_Backtick_Crash]].

## Related Source Files
- [sentry.server.config.ts](sentry.server.config.ts)
- [sentry.edge.config.ts](sentry.edge.config.ts)
- [src/instrumentation.ts](src/instrumentation.ts)
- [src/instrumentation-client.ts](src/instrumentation-client.ts)
- [src/app/global-error.tsx](src/app/global-error.tsx)
- [next.config.js](next.config.js)

## Obsidian Links
- [[ADR_0009_Sentry_Observability_Strategy]]
- [[Deployment_Notes]]
- [[Debugging_Notes]]
- [[Security_And_Rate_Limits]]
- [[Config_And_Env_Map]]

## Change Log
- 2026-05-11: Wizard ran successfully; SDK initialized for Node/Edge/browser. Switched DSN from wizard-hardcoded literal to env var read. Set `sendDefaultPii: false`, production `tracesSampleRate: 0.1`, masked Replay with prod 5% / on-error 100%. Deleted the wizard-generated `/sentry-example-page` and `/api/sentry-example-api` after verifying ingestion. Recorded decision in [[ADR_0009_Sentry_Observability_Strategy]].
- 2026-05-11: Added Sentry operations note after CLI authentication was verified and MCP was scoped to the `mert-copper` organization.
