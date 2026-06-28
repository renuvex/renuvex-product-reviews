---
type: codebase
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-21
tags:
  - config
  - env
  - deployment
related:
  - "[[Index]]"
  - "[[Folder_Structure]]"
  - "[[Deployment_Notes]]"
---

# Config & Env Map

> Names + purposes only. Never commit real values. See [.env.example](.env.example) for the template.

## Environment variables

### Public app
| Var | Purpose | Where used |
|---|---|---|
| `NODE_ENV` | Runtime mode | Standard |
| `NEXT_PUBLIC_GRAPH_API_URL` | ikas Admin GraphQL endpoint | [src/globals/config.ts](src/globals/config.ts) |
| `NEXT_PUBLIC_ADMIN_URL` | ikas admin URL template (`https://{storeName}.myikas.com/admin`) | OAuth callback redirect builder |
| `NEXT_PUBLIC_DEPLOY_URL` | Public origin of this app (Vercel URL or custom domain) | OAuth redirect URI, JWT issuer |
| `STOREFRONT_WIDGET_BASE_URL` | Canonical public script/asset origin used when writing ikas `StorefrontJSScript` records. Set this to the stable HTTPS widget host that storefront browsers should load `widget.js` from. Current target: `https://widget.renuvex.app`. Falls back to `NEXT_PUBLIC_DEPLOY_URL` only for compatibility. | [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts), OAuth callback, manual inject |
| `STOREFRONT_WIDGET_API_BASE_URL` | Explicit backend/API origin embedded into the storefront widget build. Production target: `https://app.renuvex.app`. When unset, the widget falls back to the script origin for same-origin rollback/local compatibility. | [scripts/build-widget.mjs](scripts/build-widget.mjs), [src/widget/core/origins.js](src/widget/core/origins.js), [src/widget/core/config.js](src/widget/core/config.js), [src/widget/classic-loader.js](src/widget/classic-loader.js) |
| `STOREFRONT_WIDGET_READ_API_BASE_URL` | Optional cacheable public-read origin embedded into the storefront widget build. After Worker V2 read cutover, production target is `https://widget.renuvex.app`. If unset, the build falls back to `STOREFRONT_WIDGET_BASE_URL`; if that is also unset, runtime `READ_API_BASE` falls back to `API_BASE`. Only ratings/reviews list reads use this origin. | [scripts/build-widget.mjs](scripts/build-widget.mjs), [src/widget/core/origins.js](src/widget/core/origins.js), [src/widget/core/config.js](src/widget/core/config.js), [src/widget/core/rating-summary.js](src/widget/core/rating-summary.js), [src/widget/listing-badges/ratings.js](src/widget/listing-badges/ratings.js), [src/widget/reviews-section/reviews-api.js](src/widget/reviews-section/reviews-api.js) |
| `ALLOW_LOCAL_STOREFRONT_WIDGET_URL` | Optional local-only escape hatch. When exactly `true`, allows non-HTTPS/local/private widget script URLs for temporary experiments. Do not set in Vercel production or preview. | [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts) |

### OAuth / JWT
| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_CLIENT_ID` | ikas app client id (public) |
| `CLIENT_SECRET` | ikas app client secret. **Also signs JWTs.** Single secret for both — be careful about rotation. |
| `SECRET_COOKIE_PASSWORD` | iron-session encryption key (long random string) |

### Public review cursors
| Var | Purpose |
|---|---|
| `REVIEW_CURSOR_SECRET` | Server-only HMAC key for `GET /api/public/reviews` cursor signatures. Required in Vercel Production/Preview before signed review cursor deployment; never expose as `NEXT_PUBLIC_*`. |

### Database
| Var | Purpose |
|---|---|
| `DATABASE_URL` | Supabase **transaction pooler** (port 6543, `?pgbouncer=true`) — for runtime queries |
| `DIRECT_URL` | Supabase **session pooler** (port 5432) — for migrations |

### Cloudinary
| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name (public). Injected into the Next/admin bundle by [next.config.js](next.config.js) and into the public widget bundle by [scripts/build-widget.mjs](scripts/build-widget.mjs) as `__RENUVEX_PR_DEFAULT_CLOUDINARY_CLOUD_NAME__`. |
| `CLOUDINARY_API_KEY` | API key |
| `CLOUDINARY_API_SECRET` | Used to sign uploads in [src/app/api/public/upload/sign/route.ts](src/app/api/public/upload/sign/route.ts) |

### Upstash Redis (rate limiting)
| Var | Purpose |
|---|---|
| `KV_REST_API_URL` | Upstash REST endpoint |
| `KV_REST_API_TOKEN` | Upstash REST token |

### Review video on Mux + QStash
All variables in this section are environment-scoped. Preview deployments must use the Preview Mux environment; Production must use the Production Mux environment.

| Var | Purpose |
|---|---|
| `VIDEO_REVIEWS_ENABLED` | Global kill switch. Video upload is disabled unless this is exactly `true`, the merchant widget toggle is enabled, and `StoreSettings.videoMonthlyLimit > 0`. |
| `MUX_TOKEN_ID` / `MUX_TOKEN_SECRET` | Server-only Mux API token for upload, asset, playback-id, cancel, and delete operations. |
| `MUX_VIDEO_QUALITY` | Mux encoding quality. Product policy currently accepts `basic` or `plus`. |
| `VIDEO_UPLOAD_CHUNK_SIZE_KB` | Optional Mux direct-upload client tuning. Defaults to `8192`; accepted values are clamped to `5120..30720` and normalized to a 256 KB multiple for UpChunk. |
| `VIDEO_UPLOAD_CHUNK_ATTEMPTS` | Optional UpChunk retry tuning. Defaults to `5`; accepted values are clamped to `3..8`. |
| `MUX_WEBHOOK_SECRET` | Server-only Mux webhook signing secret for `/api/webhooks/mux`; not required for upload/API initiation. Write it only after the deployed endpoint exists in the matching Mux environment. |
| `MUX_SIGNING_KEY_ID` / `MUX_SIGNING_KEY_PRIVATE` | Server-only Mux signing key used for pending/admin signed playback and thumbnail tokens. |
| `QSTASH_TOKEN` | Publishes durable media-provider jobs. |
| `QSTASH_CURRENT_SIGNING_KEY` / `QSTASH_NEXT_SIGNING_KEY` | Verifies QStash raw-body signatures on `/api/internal/media-jobs`. |
| `MEDIA_JOB_BASE_URL` | HTTPS app origin used by QStash to call `/api/internal/media-jobs`. |

### Cron
| Var | Purpose |
|---|---|
| `CRON_SECRET` | Bearer token required by cron routes (`/api/admin/daily-maintenance`, `/api/admin/cleanup-images`, and explicit maintenance endpoints). **Set in Vercel env** — cron routes refuse to run without it. |

| `STOREFRONT_THEME_CRON_LIMIT` | Optional max merchants checked by each lightweight theme sync cron run. Default: `100`. |
| `STOREFRONT_THEME_PENDING_SCAN_LIMIT` | Optional max pending theme rows scanned before due verification. Default: `500`. |
| `STOREFRONT_THEME_CRON_CONCURRENCY` | Optional concurrency for ikas `listStorefront` calls in theme maintenance. Default: `5`. |

### Sentry
| Var | Purpose | Where |
|---|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` | DSN read by SDK in all runtimes. Required for any Sentry capture. | `.env.local` + Vercel (Production + Preview, Sensitive) |
| `SENTRY_DSN` | Optional server/edge override; falls back to `NEXT_PUBLIC_SENTRY_DSN`. Usually unset. | (optional) |
| `SENTRY_AUTH_TOKEN` | Build-time token for source map upload and release creation. | `.env.sentry-build-plugin` (local, gitignored) + Vercel (Production + Preview, Sensitive) |
| `SENTRY_ORG` | `renuvex`. | Injected automatically by Vercel-Sentry integration or read by [next.config.js](next.config.js) |
| `SENTRY_PROJECT` | Sentry project slug. Defaults to `renuvex-product-reviews` in local config. | Injected automatically by Vercel-Sentry integration or read by [next.config.js](next.config.js) |

`SENTRY_AUTH_TOKEN` must belong to the same Sentry organization as `SENTRY_ORG`; otherwise release/source-map upload can fail even when the app deployment succeeds.

See [[Sentry_Operations]] and [[ADR_0009_Sentry_Observability_Strategy]] for the full contract.

## Static config files

| File | Purpose |
|---|---|
| [ikas.config.json](ikas.config.json) | ikas dev tooling: port (3000), oauth redirect path (`/api/oauth/callback/ikas`), run command |
| [next.config.js](next.config.js) | Next.js config |
| [vercel.json](vercel.json) | `regions: ["fra1"]`, daily Vercel-compatible maintenance cron, monthly fallback cleanup cron, widget static asset cache headers |
| [wrangler.widget.jsonc](wrangler.widget.jsonc) | Cloudflare Worker Static Assets config for live `widget.renuvex.app` delivery. Source includes V2 public-read proxy support with non-secret `BACKEND_API_ORIGIN=https://app.renuvex.app`; no routes/custom domains are stored in source. Future Worker redeploys or domain/DNS edits remain separately approved. |
| [components.json](components.json) | shadcn/ui CLI/MCP config |
| [tsconfig.json](tsconfig.json) | TS config (paths: `@/*` → `src/*`) |
| [eslint.config.mjs](eslint.config.mjs) | ESLint flat config |
| [postcss.config.mjs](postcss.config.mjs) | Tailwind v4 / postcss |
| [src/globals/config.ts](src/globals/config.ts) | Reads env, exports OAuth scope and URLs |
| [src/lib/ikas-client/codegen.ts](src/lib/ikas-client/codegen.ts) | GraphQL Codegen config |
| [sentry.server.config.ts](sentry.server.config.ts) | Sentry Node runtime init (DSN, sample rates, PII off) |
| [sentry.edge.config.ts](sentry.edge.config.ts) | Sentry Edge runtime init (middleware, edge routes) |
| [src/instrumentation.ts](src/instrumentation.ts) | Next.js instrumentation entry — routes to server/edge Sentry config |
| [src/instrumentation-client.ts](src/instrumentation-client.ts) | Sentry browser init + Replay + `onRouterTransitionStart` |

## OAuth scope (configured)
`read_orders,write_orders,read_products,read_inventories,write_inventories` — flagged for review in [[Open_Questions]] (do we really need write_*?).

## Notes
- `.env.local` is gitignored. `.env.example` is the contract — keep it accurate when adding env vars. Mux and Upstash values in `.env.example` are placeholders only.
- `pnpm verify:video-infrastructure` performs the secret-safe, read-only pre-webhook check of required Mux API/signing/QStash env presence, Mux API read access, video quality policy, and media-job URL shape. It intentionally does not require `MUX_WEBHOOK_SECRET`.
- `pnpm verify:video-infrastructure:post-webhook` performs the same check after webhook setup and also requires `MUX_WEBHOOK_SECRET`.
- `pnpm video:canary:ops` reports global/merchant/quota gates and per-store lifecycle evidence without writing by default. DB writes require `--storeId`, matching `--confirmStoreId`, explicit quota/toggle fields, and `--apply`. See [[Review_Video_Canary_Runbook]].
- `.env.sentry-build-plugin` and `.sentryclirc` are also gitignored. Hold Sentry CI secrets only.
- Never log env values. Code uses `process.env.X || ''` defaults in JWT helpers — be aware of fail-open risk.
- `NEXT_PUBLIC_*` are exposed to the browser bundle. Don't put secrets there. (DSN is intentionally public-ish — it identifies a Sentry project, no auth.)

- `VIDEO_UPLOAD_CHUNK_SIZE_KB` and `VIDEO_UPLOAD_CHUNK_ATTEMPTS` tune browser-to-Mux direct uploads only. They do not change Mux processing speed, webhook delivery, or provider lifecycle jobs.
- Legacy Cloudflare Stream/R2 video env vars (`CLOUDFLARE_STREAM_*`, `CLOUDFLARE_R2_*`, `CLOUDFLARE_ACCOUNT_ID`) are not part of the current Review Video contract. If found in Vercel after Mux cutover proof, remove only those video-provider env vars; do not treat Cloudflare DNS/zone or future Worker delivery infrastructure as teardown scope.
- `STOREFRONT_WIDGET_API_BASE_URL` and `STOREFRONT_WIDGET_READ_API_BASE_URL` are not secrets. Do not prefix them with `NEXT_PUBLIC_`; they are compiled into the public widget bundle intentionally. Keep them as origins, not paths. Path-like values are normalized to the origin to avoid `/api/api/*` mistakes. After the Worker V2 cutover, `STOREFRONT_WIDGET_BASE_URL=https://widget.renuvex.app` is also a build-time fallback for the read origin.

## Related Source Files
- [.env.example](.env.example)
- [src/globals/config.ts](src/globals/config.ts)
- [src/widget/core/origins.js](src/widget/core/origins.js)
- [scripts/build-widget.mjs](scripts/build-widget.mjs)
- [wrangler.widget.jsonc](wrangler.widget.jsonc)
- [ikas.config.json](ikas.config.json)
- [vercel.json](vercel.json)

## Obsidian Links
- [[Folder_Structure]]
- [[Deployment_Notes]]
- [[Security_And_Rate_Limits]]
- [[Auth_And_Installation_Flow]]
