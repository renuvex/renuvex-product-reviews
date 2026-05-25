---
type: codebase
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-05-25
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
| `STOREFRONT_WIDGET_BASE_URL` | Canonical public origin used when writing ikas `StorefrontJSScript` records. Set this to the stable HTTPS app URL that storefront browsers should load `widget.js` from. Falls back to `NEXT_PUBLIC_DEPLOY_URL` only for compatibility. | [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts), OAuth callback, manual inject |
| `ALLOW_LOCAL_STOREFRONT_WIDGET_URL` | Optional local-only escape hatch. When exactly `true`, allows non-HTTPS/local/private widget script URLs for temporary experiments. Do not set in Vercel production or preview. | [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts) |

### OAuth / JWT
| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_CLIENT_ID` | ikas app client id (public) |
| `CLIENT_SECRET` | ikas app client secret. **Also signs JWTs.** Single secret for both — be careful about rotation. |
| `SECRET_COOKIE_PASSWORD` | iron-session encryption key (long random string) |

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

See [[Sentry_Operations]] and [[ADR_0009_Sentry_Observability_Strategy]] for the full contract.

## Static config files

| File | Purpose |
|---|---|
| [ikas.config.json](ikas.config.json) | ikas dev tooling: port (3000), oauth redirect path (`/api/oauth/callback/ikas`), run command |
| [next.config.js](next.config.js) | Next.js config |
| [vercel.json](vercel.json) | `regions: ["fra1"]`, daily Vercel-compatible maintenance cron, monthly fallback cleanup cron, widget static asset cache headers |
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
- `.env.local` is gitignored. `.env.example` is the contract — keep it accurate when adding env vars. Upstash values in `.env.example` are placeholders only.
- `.env.sentry-build-plugin` and `.sentryclirc` are also gitignored. Hold Sentry CI secrets only.
- Never log env values. Code uses `process.env.X || ''` defaults in JWT helpers — be aware of fail-open risk.
- `NEXT_PUBLIC_*` are exposed to the browser bundle. Don't put secrets there. (DSN is intentionally public-ish — it identifies a Sentry project, no auth.)

## Related Source Files
- [.env.example](.env.example)
- [src/globals/config.ts](src/globals/config.ts)
- [ikas.config.json](ikas.config.json)
- [vercel.json](vercel.json)

## Obsidian Links
- [[Folder_Structure]]
- [[Deployment_Notes]]
- [[Security_And_Rate_Limits]]
- [[Auth_And_Installation_Flow]]
