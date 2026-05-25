---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-05-11
tags:
  - adr
  - sentry
  - observability
  - security
related:
  - "[[Decision_Index]]"
  - "[[Sentry_Operations]]"
  - "[[Security_And_Rate_Limits]]"
  - "[[Deployment_Notes]]"
---

# ADR_0009 — Sentry SDK Observability Strategy

## Status
Accepted

## Date
2026-05-11

## Context
Until now the panel had no centralized error visibility. Production failures (Next.js API routes, server actions, client render crashes, hydration mismatches in iframe-mounted admin pages) were only visible through Vercel function logs, which has no grouping, no breadcrumbs, no source maps, and no session timeline. The widget itself is a separate bundle and intentionally stays minimal — its crash strategy is documented under [[Bug_Widget_CSS_Template_Backtick_Crash]] — so widget observability stays out of scope for this ADR.

The maintainer's Sentry CLI and the Sentry MCP server were already authenticated against the `mert-copper` organization (see [[Sentry_Operations]]). What was missing was an SDK actually wired into the Next.js panel and a discipline around what gets sent.

## Decision
1. Adopt `@sentry/nextjs` for the panel app (Next.js 16, App Router, webpack build).
2. Initialize three runtimes: Node server (`sentry.server.config.ts`), Edge (`sentry.edge.config.ts`), and browser (`src/instrumentation-client.ts`), routed through `src/instrumentation.ts`.
3. Source DSN from environment, **not hardcoded**:
   - Browser: `process.env.NEXT_PUBLIC_SENTRY_DSN`
   - Server/Edge: `process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN`
4. `sendDefaultPii: false` everywhere — ikas OAuth tokens travel in `Authorization` headers and JWTs travel in cookies; we never let Sentry auto-attach request headers, cookies, IPs, or bodies.
5. `tracesSampleRate: 0.1` in production, `1` in development.
6. Session Replay enabled with `maskAllText: true` and `blockAllMedia: true`; `replaysSessionSampleRate: 0.05` in production, `replaysOnErrorSampleRate: 1.0`.
7. `enableLogs: true` — `console.error`/`console.warn` and structured server logs flow to Sentry alongside errors.
8. `widenClientFileUpload: true` and `automaticVercelMonitors: true` in the `next.config.js` Sentry wrapper.
9. Vercel-Sentry integration installed; `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` live in Vercel env (Production + Preview). DSN lives in Vercel env as `NEXT_PUBLIC_SENTRY_DSN`. Local builds read the auth token from `.env.sentry-build-plugin`, which is gitignored.
10. The wizard-generated `/sentry-example-page` and `/api/sentry-example-api` were used once to verify ingestion and then deleted — they are not safe to leave in production.

## Reasoning
- **Single platform for errors + replay + tracing + logs.** Avoids gluing three vendors together for the same incident.
- **Replay is the highest-leverage feature for this app.** Most reported bugs are UI-level: hydration mismatches in iframe pages, `IntersectionObserver` mis-fires, modal/lightbox focus issues, and SPA-navigation observer races. Stack traces alone do not show those — a DOM timeline does.
- **`sendDefaultPii: false` is non-negotiable here.** With PII on, Sentry would receive merchant OAuth tokens and ikas JWTs on every captured error. That is a credential leak by default. We accept losing automatic user-IP attribution; if a specific surface needs identity, it can call `Sentry.setUser({ id: merchantId })` explicitly with non-secret values.
- **`tracesSampleRate` 0.1 in prod** keeps the quota survivable. Every API hit in the panel produces a transaction; at `1.0` the quota burns in days. Replay is also throttled (5% session, 100% on-error) for the same reason.
- **DSN from env, not hardcoded.** The wizard hardcoded a DSN it created; we standardize on the DSN already provisioned through MCP and stored in env, so DSN rotation requires no code change. Both DSNs in fact point at the same Sentry project (`yorum-paneli`, ID `4511372449218640`), so existing events are unaffected.
- **Widget bundle deliberately stays out.** The widget runs on third-party storefronts; shipping Sentry there would bloat the bundle and pull in tracking that merchants did not consent to. Widget crashes are handled with localized try/catch and `console.warn`; see [[Bug_Widget_CSS_Template_Backtick_Crash]].

## Alternatives Considered
- **No SDK, only Vercel function logs.** Free, zero risk. Rejected — no grouping, no source maps, no replay, no client-side coverage. Sustained debugging time per incident is significantly higher.
- **LogRocket or FullStory for replay; raw `console.error` for errors.** Rejected — two vendors, two billing surfaces, two SDKs in the bundle. Sentry covers both.
- **Self-hosted Sentry OSS.** Rejected — operational cost (run a Postgres + ClickHouse + Kafka stack) is wildly out of proportion for a single-maintainer app.
- **Keep `sendDefaultPii: true` (wizard default) and add a `beforeSend` to scrub.** Rejected — too easy to miss a header or query param in the scrubber and silently leak. Default-deny is safer.
- **Hardcode DSN in source (wizard default).** Rejected — DSN rotation would require a deploy; env-based config aligns with how every other secret in the project is handled.

## Consequences
- `package.json` adds `@sentry/nextjs@^10` and `@sentry/cli` is already global on the maintainer machine.
- `next.config.js` is now wrapped with `withSentryConfig` — any further `next.config.js` changes must preserve that wrapper.
- A new `src/app/global-error.tsx` exists as the App Router root error boundary. It is intentionally minimal and forwards to `Sentry.captureException`; do not turn it into a UX page without keeping the capture call.
- `.gitignore` excludes `.env.sentry-build-plugin` and `.sentryclirc`. Never commit either.
- Vercel needs the auth token to upload source maps. Without it, prod stack traces will appear minified. The token rotates per the org policy (currently no rotation cadence — flag for [[Open_Questions]]).
- Sentry quota becomes a thing we can run out of. If quota alerts ever fire, the first lever is dropping `replaysSessionSampleRate`, then `tracesSampleRate`.
- AI-assisted debugging via Sentry MCP is now project-scoped against `mert-copper/yorum-paneli`.

## Related Source Files
- [sentry.server.config.ts](sentry.server.config.ts)
- [sentry.edge.config.ts](sentry.edge.config.ts)
- [src/instrumentation.ts](src/instrumentation.ts)
- [src/instrumentation-client.ts](src/instrumentation-client.ts)
- [src/app/global-error.tsx](src/app/global-error.tsx)
- [next.config.js](next.config.js)

## Related Notes
- [[Sentry_Operations]]
- [[Security_And_Rate_Limits]]
- [[Deployment_Notes]]
- [[Debugging_Notes]]
- [[Decision_Index]]
