---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-05-11
updated: 2026-07-29
tags:
  - adr
  - sentry
  - widget
  - observability
related:
  - "[[Decision_Index]]"
  - "[[ADR_0009_Sentry_Observability_Strategy]]"
  - "[[Sentry_Operations]]"
  - "[[Widget_Architecture]]"
---

# ADR_0010 — Widget Error Forwarding via Server Endpoint

## Status
Accepted

## Date
2026-05-11

## Context
[[ADR_0009_Sentry_Observability_Strategy]] deliberately excluded `@sentry/nextjs` (and `@sentry/browser`) from the widget bundle that runs on third-party merchant storefronts. The bundle-size and end-customer-privacy reasons stated there still hold. But that decision left a real gap: **uncaught client-side errors in the widget are invisible**. Past incidents like the CSS template literal crash ([[Bug_Widget_CSS_Template_Backtick_Crash]]) and the missing PDP auto-mount ([[Bug_Product_Widget_Missing_Auto_Mount]]) only surfaced through merchant reports. Without forwarding, the same class of bugs will keep arriving the same way — slowly, through complaints.

## Decision
1. Ship a tiny error reporter in the widget bundle that listens for `error` and `unhandledrejection` and POSTs to a panel-side endpoint.
2. The endpoint, `/api/public/widget-error`, calls `Sentry.captureException` server-side using the already-initialized panel SDK. Captured events are tagged `source: widget` so they are distinguishable from panel errors.
3. **Filter at the source.** The reporter only forwards events whose `filename`, `stack`, or failed resource URL mentions `widget.js` / `widget-runtime`. Errors thrown by the merchant's theme, other apps, or random third-party scripts on the storefront are ignored.
4. **Throttle at the source.** Max 5 forwards per page session, 2-second minimum gap between sends, and per-(message+stack) dedupe.
5. **Rate-limit at the server.** Upstash Redis: 30 reports per IP per 60 seconds, then silently drop.
6. **Reporter never crashes the widget.** Every internal step is wrapped in try/catch and returns silently on failure.
7. **Transport.** Prefer `navigator.sendBeacon`; fall back to `fetch({ keepalive: true })`. Both fire-and-forget.
8. **No SDK in the widget bundle.** No tracing, no replay, no breadcrumbs from the widget side. Only the minimal data needed to point at a stack trace.

## Reasoning
- **Bundle cost is negligible.** The reporter adds 1.6 KB raw / **637 bytes gzipped** to `public/widget.js`. Storefront Core Web Vitals are unaffected. The full SDK alternative would add 30–80 KB gzipped — a non-starter for a script that ships to every product page on every merchant's storefront.
- **End-customer privacy stays intact.** Storefront visitors are the merchant's customers, not ours. They have not consented to any tracker. The reporter sends only what's needed to debug an exception (message, stack, page URL, user agent, public API key). No cookies, no IP from the client, no DOM snapshots, no behavioral data. The server adds `ip` from the request edge for rate-limit attribution and Sentry forensics, never echoed back.
- **Filtering prevents noise floods.** Storefronts run lots of scripts. Without the `widget.js` filter, we'd capture every theme bug, every Facebook pixel error, every aggressive ad-blocker side effect. Tag-based filtering on Sentry side would still cost ingestion quota; source-side filtering doesn't.
- **Throttle + rate-limit prevents quota disasters.** A bug in a render loop could fire 1000 errors per second on every visitor. Without throttling, one stuck merchant could exhaust the Sentry quota in minutes. The session cap of 5 and Redis cap of 30/min/IP are the two backstops.
- **`sendBeacon` is the right transport for unload-survival.** If the error happens during page unload (which a non-trivial class of widget bugs does), `fetch` may be cancelled. `sendBeacon` is designed for exactly this case and is universally supported in browsers we target.
- **Server-side capture keeps the Sentry contract consistent.** `sendDefaultPii: false` and `tracesSampleRate: 0.1` from [[ADR_0009_Sentry_Observability_Strategy]] apply automatically. The widget tag flows through. No second DSN to manage.

## Alternatives Considered
- **Ship the full `@sentry/browser` SDK in the widget bundle.** Rejected — 30–80 KB gzip is too much for a public widget, and storefront customer Replay raises consent issues.
- **Ship `@sentry/browser` only on `localhost` / preview deploys.** Rejected — real production bugs in untested browser/theme combinations are exactly the bugs we cannot reproduce locally. A dev-only setup catches none of them.
- **No forwarding at all.** Rejected — the cost of staying blind is real, and the cost of the small reporter is not.
- **Forward everything, filter on Sentry side.** Rejected — costs ingestion quota for noise that's not ours, and Sentry tag-filters can be bypassed by malformed events.
- **Generic `/api/public/log` endpoint that also handles other widget telemetry.** Rejected for now — adds scope creep. The endpoint is intentionally single-purpose (`widget-error`) so its rate-limit key and contract stay clean. If we add telemetry later, give it its own endpoint.

## Consequences
- New widget module: [src/widget/core/error-reporter.js](src/widget/core/error-reporter.js). Side-effect imported as the first line of [src/widget/index.js](src/widget/index.js) so its listeners are attached before any other widget module evaluates.
- New public API route: [src/app/api/public/widget-error/route.ts](src/app/api/public/widget-error/route.ts). Uses the existing Upstash Redis client and a dedicated beacon CORS policy.
- Redis key prefix `renuvex_pr_werr_rl:` is used for rate-limit accounting. Coordinate with [[Security_And_Rate_Limits]] when adding other widget endpoints to avoid prefix collisions.
- Widget bundle size: 47,219 → 47,856 bytes gzipped (+637 bytes, +1.3%). Recorded for future bundle-budget conversations.
- Sentry will start receiving issues tagged `source: widget`. Set up a saved query or alert on `tags[source]:widget` to separate widget noise from panel noise.
- Filtering by `widget.js` substring is fragile if the bundle is ever served from a different filename (e.g. a CDN that hash-fingerprints). Track in [[Open_Questions]] if we ever change widget delivery.
- The reporter does not capture errors that happen before its import (i.e. errors in the script tag itself, before module evaluation begins). That window is small and acceptable.
- 2026-05-24: `widget-error` CORS echoes the request `Origin` and returns
  `Access-Control-Allow-Credentials: true` for origin-bearing requests. This
  avoids beacon failures where credentialed telemetry requests reject wildcard
  `Access-Control-Allow-Origin`.
- 2026-07-29: Credential reflection was isolated to the widget-error beacon
  helper. It reflects only canonical HTTP(S) origins, sets `Vary: Origin`, and
  grants no CORS permission for missing, malformed, or literal `null` Origin
  values. Anonymous widget APIs use wildcard CORS without credentials; the
  beacon helper must not be reused by admin or review-session routes.
- 2026-05-27: The reporter also captures widget script/chunk resource-load errors (`type: resource-error`) and adds route, `document.visibilityState`, `document.readyState`, and `navigator.onLine` context. The classic loader's runtime-import failure path sends the same context. This is diagnostic coverage for rare DevTools "error script" reports during refresh/navigation, without adding a new endpoint or SDK.

## Related Source Files
- [src/widget/core/error-reporter.js](src/widget/core/error-reporter.js)
- [src/widget/index.js](src/widget/index.js)
- [src/app/api/public/widget-error/route.ts](src/app/api/public/widget-error/route.ts)
- [src/lib/cors.ts](src/lib/cors.ts)

## Related Notes
- [[ADR_0009_Sentry_Observability_Strategy]]
- [[Sentry_Operations]]
- [[Widget_Architecture]]
- [[Security_And_Rate_Limits]]
- [[Decision_Index]]
