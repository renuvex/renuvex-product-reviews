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
Accepted and live for `widget.renuvex.app` asset delivery. V2 public-read proxy support is implemented in source but requires separate Worker deploy and Vercel env cutover approval before it becomes live. Future Worker redeploys, custom domain/DNS changes, Vercel env/domain changes, and any ikas script write remain explicit stop/go operations.

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

Cloudflare Worker V1 did not proxy public API calls. V2 keeps the same control-plane split, but adds a narrow read-through proxy only for selected cacheable storefront reads. Mux upload, review submit, QStash receivers, settings/theme sync, rate limits, and backend observability stay on the existing Vercel origin.

## Decision
Use Cloudflare Worker Static Assets for the storefront widget asset surface, plus a narrow V2 read-through cache for selected public read endpoints.

The Worker allows only:

```text
/widget.js
/widget-runtime/runtime.js
/widget-runtime/runtime-*.js
/widget-runtime/chunks/*.js
/widget-runtime/build-manifest.json
/__health
```

V1 `/api/*` returned 404 and was intentionally fail-closed. V2 keeps `/api/*` fail-closed by default and allows only:

```text
GET /api/public/ratings
GET /api/public/ratings-by-slug
GET /api/public/reviews
```

`GET /api/public/settings` remains outside the Worker because the route has backend side effects for storefront theme synchronization. Upload, submit, video, widget-error, webhook, QStash, Mux, Cloudinary, and admin routes are not proxied.

The widget runtime now has three separate origins:

- asset origin: discovered from the injected `<script src>` URL;
- API/write origin: build-time `STOREFRONT_WIDGET_API_BASE_URL`, falling back to the asset origin when unset;
- read API origin: build-time `STOREFRONT_WIDGET_READ_API_BASE_URL`, falling back to the API/write origin when unset.

`STOREFRONT_WIDGET_API_BASE_URL` is normalized to an origin. In production it should be:

```text
https://app.renuvex.app
```

`STOREFRONT_WIDGET_READ_API_BASE_URL` is also normalized to an origin. After the V2 cutover, production should set it to:

```text
https://widget.renuvex.app
```

The classic loader still imports runtime chunks from the script/asset origin. Runtime write, upload, settings, video, and error-reporting calls use the API/write origin. Only ratings/reviews list reads use the read API origin.

## Implementation
- `src/widget/core/origins.js` owns asset/API/read-API origin resolution.
- `scripts/build-widget.mjs` injects `__RENUVEX_PR_API_BASE_URL__` and `__RENUVEX_PR_READ_API_BASE_URL__`, and validates configured origins. Local/private/non-HTTPS values require `ALLOW_LOCAL_STOREFRONT_WIDGET_URL=true`.
- `workers/widget-delivery/src/index.ts` wraps the Static Assets binding with pinned CORS/cache headers and V2 allowlisted public-read proxy behavior.
- `scripts/prepare-widget-worker-assets.mjs` copies only widget deploy files into `.tmp/widget-worker-assets`.
  - Required current files come from `build-manifest.json`.
  - Retained committed runtime hashes are copied from `git ls-files`.
  - Untracked manifest-unreferenced local build leftovers are not copied.
- `wrangler.widget.jsonc` contains the dedicated Worker config. It has no routes or custom domains in source, so a local dry-run cannot accidentally mutate production routing.
- `BACKEND_API_ORIGIN` is a non-secret Worker var pointing at `https://app.renuvex.app`.

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

V2 public-read proxy cache contract:

| Public read | Worker behavior |
|---|---|
| `/api/public/ratings` | Cacheable only with `storeId` and normalized sorted `productIds` |
| `/api/public/ratings-by-slug` | Cacheable only with `storeId` and normalized sorted `slugs` |
| `/api/public/reviews` | Cacheable only with `storeId`, `productId`, and normalized known filters/page/cursor params |
| Unknown params or long URLs | Bypass cache and pass through to `app.renuvex.app` |
| Non-200, non-JSON, `Set-Cookie`, 4xx/5xx/429 | Not cached |

Edge cache TTL is 60 seconds. Browser-facing `Cache-Control` remains `public, max-age=0, must-revalidate`, and responses include `X-Renuvex-Edge-Cache: HIT | MISS | BYPASS` for diagnostics.

## Rollout
The rollout completed on 2026-06-28:

1. `STOREFRONT_WIDGET_API_BASE_URL=https://app.renuvex.app` was added to Vercel Production and deployed.
2. `pnpm worker:widget:deploy` deployed Worker `renuvex-widget-assets`.
3. The old DNS-only Vercel CNAME was removed:

   ```text
   widget.renuvex.app CNAME 2d886046bc2da89b.vercel-dns-017.com
   TTL 600, proxied false
   ```

4. `widget.renuvex.app` was attached as a Worker Custom Domain to `renuvex-widget-assets`.
5. Cloudflare created a read-only proxied `AAAA 100::` DNS record for the Worker custom domain.
6. `app.renuvex.app` remained unchanged.

## Consequences
- Storefront static delivery can move to Cloudflare without moving the backend.
- `widget.renuvex.app` owns static assets and, after V2 cutover, only selected public read traffic.
- The ikas script URL normally stays unchanged because the hostname is unchanged.
- The Worker carries no secrets and no DB/Mux/QStash bindings.
- A rollback can unset `STOREFRONT_WIDGET_READ_API_BASE_URL` or point it back to `https://app.renuvex.app` without changing ikas script records. A deeper rollback can point `widget.renuvex.app` back to the Vercel CNAME and/or unset `STOREFRONT_WIDGET_API_BASE_URL` to restore same-origin widget API behavior.

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

Live cutover verification on 2026-06-28:

- `https://widget.renuvex.app/__health` returned `{"ok":true,"service":"renuvex-widget-assets"}`.
- `https://widget.renuvex.app/widget.js` and `/widget-runtime/runtime.js` returned `server: cloudflare`, CORS `*`, and `Cache-Control: public, max-age=0, must-revalidate`.
- Hashed runtime/chunk assets returned `Cache-Control: public, max-age=31536000, immutable`.
- `https://widget.renuvex.app/api/public/settings` returned `404`, so `/api/*` stayed fail-closed.
- `pnpm measure:deployed-widget` passed against `MEASURE_WIDGET_ORIGIN=https://widget.renuvex.app` and `MEASURE_WIDGET_API_ORIGIN=https://app.renuvex.app`; measured widget API calls went to the backend origin and widget-error count stayed `0`.

V2 source verification on 2026-06-28:

- `pnpm test:unit -- tests/unit/widget-origin.test.ts tests/unit/widget-worker.test.ts`
- `pnpm exec tsc --noEmit`
- `pnpm worker:widget:types`
- `pnpm worker:widget:deploy:dry-run`

## Related Source Files
- [wrangler.widget.jsonc](wrangler.widget.jsonc)
- [workers/widget-delivery/src/index.ts](workers/widget-delivery/src/index.ts)
- [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs)
- [src/widget/core/origins.js](src/widget/core/origins.js)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
