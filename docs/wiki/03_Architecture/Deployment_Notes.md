---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-09-10
last_verified: 2026-09-10
confidence: high
tags:
  - deployment
  - vercel
  - cloudflare
related:
  - "[[Index]]"
  - "[[Config_And_Env_Map]]"
  - "[[Caching_And_Performance]]"
  - "[[Sentry_Operations]]"
source_files:
  - "package.json"
  - "vercel.json"
  - "wrangler.widget.jsonc"
  - "scripts/build-widget.mjs"
  - "scripts/prepare-widget-worker-assets.mjs"
  - "src/app/api/internal/scheduled-jobs/route.ts"
---

# Deployment Notes

## Agent Brief

Use this page for the current Vercel, Cloudflare Worker, database, scheduler,
and widget artifact deployment boundaries. Production mutations always require
explicit approval. `vercel.json` has no cron declarations: QStash owns scheduled
maintenance, while authenticated admin routes are manual fallbacks. Widget
delivery is a stable classic loader plus manifest-selected immutable ESM
runtime/chunks; verify origin, edge, manifest, and a fresh storefront session.

## Summary
Vercel hosts the app/API in `fra1`; Cloudflare Worker Static Assets serves the
storefront loader/runtime and allowlisted reads. Postgres runs on Supabase,
Upstash provides Redis/QStash, and AWS S3/CloudFront serves review images. The
production build runs auth-env verification, Prisma generation and migration
deploy, live installation-auth verification, widget build, and Next.js webpack
build as defined in `package.json`.

## Vercel
- **Region**: `["fra1"]` ([vercel.json](vercel.json)). Reasonable proximity to ikas/Supabase EU regions.
- **Production domains**: `app.renuvex.app` is the ikas app/admin/API origin and remains on the production Vercel project. `widget.renuvex.app` is the storefront widget static asset origin and is served by Cloudflare Worker Static Assets. The legacy pre-custom-domain Vercel alias has been removed from the project and must not be used for new configuration or documentation.
- **Scheduling**: `vercel.json` declares no cron jobs. QStash calls the signed
  internal scheduled-jobs route; `/api/admin/daily-maintenance` and
  `/api/admin/cleanup-images` remain bearer-authenticated manual fallbacks.
- **Build command**: `pnpm build` -> `pnpm verify:auth-runtime-env && pnpm prisma:generate && pnpm prisma:migrate:deploy && pnpm verify:ikas-installation-auth && pnpm build:widget && next build --webpack`.
- **Bundler contract**: the build script explicitly selects webpack with
  `--webpack`. Its rationale is not encoded in the repository; treat any future
  bundler change as a separately verified build-contract decision.

### Preview database isolation gate

- Non-`main` Git deployments are disabled in [vercel.json](vercel.json). Preview and Production currently resolve `DATABASE_URL` and `DIRECT_URL` to the same Supabase project, while every Vercel build runs `pnpm prisma:migrate:deploy`; allowing a branch Preview would therefore mutate the Production schema before PR approval.
- `main` remains the only Git branch permitted to deploy automatically. Branch pushes must produce GitHub CI evidence without creating a Vercel Preview deployment.
- Do not re-enable Preview deployments until `pnpm verify:preview-db-isolation -- --json --branch=<branch>` proves that both Preview database URLs are isolated from Production. A failed isolation check is a rollout blocker, not a warning.
- After every branch push while this guard is active, confirm that Vercel did not start a Preview deployment and that the Production migration set did not change.

## Database
- Provider: Supabase Postgres.
- Two URLs:
  - `DATABASE_URL` — transaction pooler (port 6543, `?pgbouncer=true`). Used by runtime queries.
  - `DIRECT_URL` — session pooler (port 5432). Used by `prisma migrate`. Defined in `datasource db { directUrl = env("DIRECT_URL") }`.
- Migrations apply on each deploy via `pnpm prisma:migrate:deploy`.
- Connection storms during cold-start: PgBouncer transaction-mode mitigates per-instance pools, but cold serverless instances can still spike. Watch for "too many connections" errors.

## Review Images
- AWS S3 stores private originals and variants; CloudFront serves public variants from media.renuvex.app.
- Runtime credentials come from the approved AWS/OIDC setup. Do not use static provider secrets for image upload.
- Daily and monthly cleanup operate on AWS object families through DB-backed evidence.

## Upstash Redis
- REST-based (works in serverless without long-lived sockets).
- Two env vars: `KV_REST_API_URL`, `KV_REST_API_TOKEN`.
- Present in `.env.example`. Configure the real values in Vercel Production/Preview envs; never commit real tokens.

## Maintenance scheduler
- **Current state**: QStash is the maintenance scheduler source of truth. It calls `POST /api/internal/scheduled-jobs` for daily full maintenance at `03:00 UTC` and monthly image cleanup at `04:00 UTC` on day 1.
- **Vercel Cron**: [vercel.json](vercel.json) no longer declares cron jobs. Restoring Vercel Cron is a rollback/hotfix action, not the default path.
- **Idempotency and health**: `ScheduledJobRunLock` owns duplicate protection by `task + scheduleSlot`; use QStash delivery logs/DLQ and DB lock rows as health evidence.
- **Sub-daily theme verification**: if required later, add a separate QStash-backed design with its own idempotency key instead of reintroducing broad Vercel Cron polling by default.

## ikas app config
- Register the app in ikas Partners.
- OAuth callback URL: `<NEXT_PUBLIC_DEPLOY_URL>/api/oauth/callback/ikas`.
- App entry URL: `<NEXT_PUBLIC_DEPLOY_URL>` (handles iframe + standalone via `useBaseHomePage`).
- Storefront widget URL: `<STOREFRONT_WIDGET_BASE_URL>/widget.js?publicApiKey=<merchantId>`. Keep this as a stable public HTTPS URL. Local app development can use `NEXT_PUBLIC_DEPLOY_URL=http://localhost:3000`, but that localhost URL must not be written into real ikas storefront script records.
- Scope: `read_orders,read_customers,write_orders,read_products,read_inventories,write_inventories` (from [src/globals/config.ts](src/globals/config.ts)). Review-email send authorization requires current customer subscription evidence and therefore fails closed without `read_customers`.

## Widget bundle
- [public/widget.js](public/widget.js) is the stable classic loader. The current
  runtime map lives in `public/widget-runtime/build-manifest.json`; hashed ESM
  runtime/chunks are immutable and retention-aware.
- Run `pnpm build:widget:ci` after any `src/widget/*` change and commit all
  manifest-selected artifacts. CI/build drift checks reject hand edits or
  incomplete artifact sets.
- The `--theme=new-theme` option is stale scaffolding with no supported runtime
  selection contract. Do not use it for production; removal or implementation
  remains tracked in [[Roadmap]].

## Cloudflare Worker widget delivery
- Live architecture: `widget.renuvex.app` serves storefront static widget assets through Cloudflare Worker Static Assets; `app.renuvex.app` remains the Vercel backend/API/upload/Mux/QStash origin.
- Worker V2 public-read proxying is live for `GET /api/public/settings`, `GET /api/public/ratings`, `GET /api/public/ratings-by-slug`, and `GET /api/public/reviews`. Settings, exact-id ratings, and reviews are cacheable under their allowlists; `ratings-by-slug` is a `no-store` pass-through and never enters the edge cache. Theme sync stays on `POST /api/public/storefront-theme/lazy-sync`. Every write/upload/video/lazy-sync route stays on `app.renuvex.app`.
- Live Worker: `renuvex-widget-assets`.
- Worker custom domain: `widget.renuvex.app -> renuvex-widget-assets`.
- Cloudflare-created DNS record: read-only proxied `AAAA 100::` for `widget.renuvex.app`.
- Rollback DNS evidence: before cutover, `widget.renuvex.app` was `CNAME 2d886046bc2da89b.vercel-dns-017.com`, TTL `600`, proxied `false`.
- Local tooling:
  - `pnpm worker:widget:prepare-assets` copies only widget deploy files into `.tmp/widget-worker-assets`.
  - `pnpm worker:widget:types` regenerates Worker Env types with an empty `.tmp/widget-worker.env`, keeping app env names out of Worker types.
  - `pnpm worker:widget:deploy:dry-run` validates the Worker bundle/assets without deploying.
- External mutations such as future Worker redeploys, custom domain edits, DNS rollback, Vercel env changes, and Vercel redeploys still require explicit stop/go approval.
- Cutover verification on 2026-06-28:
  - `https://widget.renuvex.app/__health` returned `{"ok":true,"service":"renuvex-widget-assets"}`.
  - `https://widget.renuvex.app/widget.js` returned `server: cloudflare`, `Access-Control-Allow-Origin: *`, and `Cache-Control: public, max-age=0, must-revalidate`.
  - Hashed runtime/chunk assets returned `Cache-Control: public, max-age=31536000, immutable`.
  - At this point `https://widget.renuvex.app/api/public/settings` returned `404`, confirming the initial Worker asset cutover kept public API paths fail-closed before V2 read-cache rollout.
  - `pnpm measure:deployed-widget` with `MEASURE_WIDGET_ORIGIN=https://widget.renuvex.app` and `MEASURE_WIDGET_API_ORIGIN=https://app.renuvex.app` passed four controlled scenarios with zero widget-error calls.
- V2 settings read-cache verification on 2026-07-02:
  - `https://widget.renuvex.app/api/public/settings?publicApiKey=<storeId>` returned `200` from Cloudflare.
  - A repeated request returned `X-Renuvex-Edge-Cache: HIT`.
  - The response includes `runtime.themeSyncDue`; lazy sync stays on `app.renuvex.app` through `POST /api/public/storefront-theme/lazy-sync`.

### Placement-policy rollout and rollback

- Build the backend policy producer and strict widget runtime from the same commit, but deploy them in two explicit stages. Deploy the backend first and verify the origin response contains a supported `runtime.placementPolicy` plus legacy `runtime.autoPlacementEnabled=false`; only then deploy the Worker/runtime with separate approval.
- Acceptance is response- and artifact-based, not a fixed wait: verify the origin settings body, the Worker edge body and `X-Renuvex-Edge-Cache` diagnosis, the build manifest entry, the fetched content-hashed runtime, and a fresh-browser Ozy PDP/listing smoke test.
- The Worker stores allowlisted settings responses in `caches.default` for 60 seconds and returns browser-facing `Cache-Control: public, max-age=0, must-revalidate`. Cache API entries are PoP-local and do not implement `stale-while-revalidate` or `stale-if-error`; inspect origin and edge independently.
- Runtime/detector regression: retain the new backend and roll the Worker back, leaving a freshly loaded legacy runtime safe-disabled through the legacy false boolean. Backend serialization/policy or legacy-boolean regression requires a backend fix/rollback; Worker rollback alone is insufficient. A stale edge payload requires exact origin/edge verification and any cache purge needs separate approval. Rolling both layers back to the old contract restores the historical broad placement behavior and is not the default rollback.
- An already-running old browser execution context cannot be remotely revoked by a backend or Worker rollback. Session-cache TTL is not an in-memory authorization lease; use a fresh page context for rollout acceptance and document any still-open-tab limitation. See [[ADR_0038_Runtime_Attested_Storefront_Placement]].

## Local development
1. `pnpm install`
2. Copy `.env.example` → `.env.local`, fill values
3. For a disposable local database only, `pnpm prisma:init` generates Prisma
   and runs `db push --accept-data-loss`. Never point it at shared, preview, or
   production data; normal schema validation uses migrations on disposable
   PostgreSQL.
4. `pnpm codegen` (after editing `graphql-requests.ts`)
5. `pnpm dev` — Next dev server on port 3000
6. `pnpm build:widget:watch` — auto-rebuild widget bundle

## Health checks
- No dedicated `/health` route today. Add if uptime monitoring is wired up.
- Vercel logs are line-based (`console.error('[scope] ERROR', ...)` pattern is searchable).
- Sentry CLI and MCP are tracked in [[Sentry_Operations]]. Current MCP scope is organization-level (`renuvex`).
- Review Video V1 preflight uses `scripts/verify-video-infrastructure.mjs --require-webhook --write-probe`, QStash delivery/DLQ inspection, Sentry media-route queries, and the live `/api/public/settings` capability response. Local `.env.local` flag state is not proof of the Vercel Production flag.

## Notes
- **Do not bypass widget artifact drift checks.** The deploy build regenerates
  artifacts, but the repository must still contain the matching loader,
  manifest, runtime, and chunks so review and rollback remain deterministic.
- Migrations run on **every** deploy. Avoid migrations that can't safely run during traffic (long-running locks). For risky migrations, consider an out-of-band deploy.
- Manual cron-style admin routes still require `CRON_SECRET`; QStash scheduled execution uses `Upstash-Signature` on `/api/internal/scheduled-jobs` and must not send `CRON_SECRET`.
- Keep `NEXT_PUBLIC_DEPLOY_URL` and the app's URL in sync. Mismatch breaks OAuth (`getRedirectUri` in [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts) tries to recover when `localhost` config meets non-localhost host, but it's a fallback).
- Keep `STOREFRONT_WIDGET_BASE_URL` in sync with the public widget host. The helper trims accidental whitespace and rejects localhost/private/non-HTTPS URLs by default so local development cannot overwrite real storefront script records with `http://localhost:3000/widget.js`.
- Keep `STOREFRONT_WIDGET_API_BASE_URL` in sync with the backend/API origin when the widget asset origin is separate. Production target is `https://app.renuvex.app`; unset means same-origin fallback and should be treated as rollback/local compatibility only after the Worker cutover.
- After Worker V2 cutover, keep `STOREFRONT_WIDGET_READ_API_BASE_URL=https://widget.renuvex.app` or rely on `STOREFRONT_WIDGET_BASE_URL=https://widget.renuvex.app` as the build-time fallback. Settings/ratings/reviews reads use Cloudflare; write/upload/video/error/lazy-sync paths remain on `STOREFRONT_WIDGET_API_BASE_URL`.
- Domain migration order: Vercel project/domain -> Vercel env (`NEXT_PUBLIC_DEPLOY_URL`, `STOREFRONT_WIDGET_BASE_URL`) -> ikas Partner callback/app URLs -> deploy -> manual script repair/reconcile -> live storefront test -> observability cleanup. This migration is complete for `app.renuvex.app` and `widget.renuvex.app`; the legacy Vercel alias compatibility window is closed.

## Related Source Files
- [vercel.json](vercel.json)
- [wrangler.widget.jsonc](wrangler.widget.jsonc)
- [package.json](package.json)
- [scripts/prepare-widget-worker-assets.mjs](scripts/prepare-widget-worker-assets.mjs)
- [src/globals/config.ts](src/globals/config.ts)
- [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts)
- [src/lib/storefront-widget-url.ts](src/lib/storefront-widget-url.ts)

## Obsidian Links
- [[Config_And_Env_Map]]
- [[Caching_And_Performance]]
- [[Auth_And_Installation_Flow]]
- [[Sentry_Operations]]
- [[Open_Questions]]
