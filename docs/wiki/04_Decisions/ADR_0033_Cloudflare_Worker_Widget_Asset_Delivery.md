---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-06-28
updated: 2026-06-28
last_verified: 2026-06-28
confidence: high
tags:
  - adr
  - widget
  - cloudflare
  - worker
  - deployment
related:
  - "[[Decision_Index]]"
  - "[[Widget_Architecture]]"
  - "[[Deployment_Notes]]"
  - "[[Caching_And_Performance]]"
  - "[[Ikas_Widget_Injection_Notes]]"
source_files:
  - "wrangler.widget.jsonc"
  - "workers/widget-delivery/src/index.ts"
  - "workers/widget-delivery/worker-configuration.d.ts"
  - "scripts/prepare-widget-worker-assets.mjs"
  - "scripts/build-widget.mjs"
  - "scripts/measure-deployed-widget-network.mjs"
  - "src/widget/core/origins.js"
  - "src/widget/core/config.js"
  - "src/widget/classic-loader.js"
  - "tests/unit/widget-origin.test.ts"
  - "tests/unit/widget-worker.test.ts"
  - "tests/unit/widget-asset-cache.test.ts"
---

# ADR 0033: Cloudflare Worker Widget Asset Delivery

## Status
Accepted for local implementation. External cutover remains gated by explicit approval for Vercel env mutation, Cloudflare Worker deploy, custom domain/DNS changes, and any ikas script write.

## Context
The storefront widget currently uses one stable script URL:

```text
https://widget.renuvex.app/widget.js?publicApiKey=<merchantId>
```

Before this ADR, `widget.renuvex.app` and `app.renuvex.app` both pointed at the same Vercel project. The browser widget derived `API_BASE` from the script origin, so moving `widget.renuvex.app` to Cloudflare would have accidentally sent `/api/public/*`, upload, submit, and widget-error calls to the Worker.

The permanent target is a split-origin model:

| Surface | Origin | Owner |
|---|---|---|
| Storefront static assets | `https://widget.renuvex.app` | Cloudflare Worker Static Assets |
| Admin, OAuth, public API, upload, Mux, QStash, DB, webhooks | `https://app.renuvex.app` | Vercel / Next.js |

Cloudflare Worker V1 must not proxy public API calls. That keeps Mux upload, review submit, QStash receivers, rate limits, and backend observability on the existing Vercel origin until a separate API-edge architecture is explicitly designed.

## Decision
Use Cloudflare Worker Static Assets only for the storefront widget asset surface.

The Worker allows only:

```text
/widget.js
/widget-runtime/runtime.js
/widget-runtime/runtime-*.js
/widget-runtime/chunks/*.js
/widget-runtime/build-manifest.json
/__health
```

`/api/*` returns 404 and is intentionally fail-closed.

The widget runtime now has two separate origins:

- asset origin: discovered from the injected `<script src>` URL;
- API origin: build-time `STOREFRONT_WIDGET_API_BASE_URL`, falling back to the asset origin when unset.

`STOREFRONT_WIDGET_API_BASE_URL` is normalized to an origin. In production it should be:

```text
https://app.renuvex.app
```

The classic loader still imports runtime chunks from the script/asset origin, while runtime API calls and loader import-error reports use the API origin.

## Implementation
- `src/widget/core/origins.js` owns asset/API origin resolution.
- `scripts/build-widget.mjs` injects `__RENUVEX_PR_API_BASE_URL__` and validates the configured API origin. Local/private/non-HTTPS values require `ALLOW_LOCAL_STOREFRONT_WIDGET_URL=true`.
- `workers/widget-delivery/src/index.ts` is a small Worker that wraps the Static Assets binding with pinned CORS and cache headers.
- `scripts/prepare-widget-worker-assets.mjs` copies only widget deploy files into `.tmp/widget-worker-assets`.
  - Required current files come from `build-manifest.json`.
  - Retained committed runtime hashes are copied from `git ls-files`.
  - Untracked manifest-unreferenced local build leftovers are not copied.
- `wrangler.widget.jsonc` contains the dedicated Worker config. It has no routes or custom domains in source, so a local dry-run cannot accidentally mutate production routing.

## Cache Contract
The Worker preserves the existing Vercel widget cache policy:

| Asset | Cache-Control |
|---|---|
| `/widget.js` | `public, max-age=0, must-revalidate` |
| `/widget-runtime/runtime.js` | `public, max-age=0, must-revalidate` |
| `/widget-runtime/build-manifest.json` | `public, max-age=0, must-revalidate` |
| `/widget-runtime/runtime-*.js` | `public, max-age=31536000, immutable` |
| `/widget-runtime/chunks/*.js` | `public, max-age=31536000, immutable` |

Every served asset also gets:

```text
Access-Control-Allow-Origin: *
Cross-Origin-Resource-Policy: cross-origin
X-Content-Type-Options: nosniff
```

## Rollout
1. Add and deploy `STOREFRONT_WIDGET_API_BASE_URL=https://app.renuvex.app` on Vercel Production, then verify the still-Vercel-hosted widget sends API calls to `app.renuvex.app`.
2. Deploy the Worker to a canary domain such as `widget-canary.renuvex.app`.
3. Run deployed widget measurement with separate asset/API origins.
4. After canary acceptance, cut over `widget.renuvex.app` to the Worker Custom Domain with explicit DNS rollback evidence.
5. Leave `app.renuvex.app` unchanged.

## Consequences
- Storefront static delivery can move to Cloudflare without moving the backend.
- `widget.renuvex.app` becomes an asset-only origin; it must not receive public API traffic after production cutover.
- The ikas script URL normally stays unchanged because the hostname is unchanged.
- The Worker carries no secrets and no DB/Mux/QStash bindings.
- A rollback can point `widget.renuvex.app` back to the Vercel CNAME and/or unset `STOREFRONT_WIDGET_API_BASE_URL` to restore same-origin widget API behavior.

## Verification
Local gates for the implementation:

- `pnpm build:widget`
- `pnpm check:widget-js`
- `pnpm worker:widget:prepare-assets`
- `pnpm worker:widget:types`
- `pnpm worker:widget:deploy:dry-run`
- `pnpm exec tsc --noEmit`
- `pnpm lint`
- `pnpm test:unit`
- `pnpm test:widget-smoke`
- `pnpm test:widget-runtime`
- `pnpm test:widget-interactions`
- `pnpm test:widget-media:chromium`

## Related Source Files
- [wrangler.widget.jsonc](wrangler.widget.jsonc)
- [workers/widget-delivery/src/index.ts](workers/widget-delivery/src/index.ts)
- [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs)
- [src/widget/core/origins.js](src/widget/core/origins.js)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
