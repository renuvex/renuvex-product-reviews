---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-07-02
last_verified: 2026-07-02
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
---

# Deployment Notes

## Summary
Vercel hosting in `fra1` (Frankfurt). Postgres on Supabase (transaction pooler for runtime, session pooler for migrations). Upstash Redis for rate limits. AWS S3/CloudFront for review images. Two scheduled jobs: daily maintenance and monthly AWS image cleanup. Build runs `prisma generate && prisma migrate deploy && next build`.

## Vercel
- **Region**: `["fra1"]` ([vercel.json](vercel.json)). Reasonable proximity to ikas/Supabase EU regions.
- **Production domains**: `app.renuvex.app` is the ikas app/admin/API origin and remains on the production Vercel project. `widget.renuvex.app` is the storefront widget static asset origin and is served by Cloudflare Worker Static Assets. The legacy pre-custom-domain Vercel alias has been removed from the project and must not be used for new configuration or documentation.
- **Cron**: `/api/admin/daily-maintenance` daily at 03:00 UTC. It verifies pending storefront themes in batches and runs pending-upload cleanup plus storefront script reconciliation. The route still supports lightweight sub-daily execution if the Vercel plan is upgraded and the cron expression is changed later. `/api/admin/cleanup-images` remains monthly on day 1 at 04:00 UTC.
- **Build command**: `pnpm build` → `prisma generate && prisma migrate deploy && next build --webpack`.
- **Why webpack**: build script forces `--webpack` (Turbopack opt-out, presumably for compatibility — verify when Next ships stable Turbopack production builds).

## Database
- Provider: Supabase Postgres.
- Two URLs:
  - `DATABASE_URL` — transaction pooler (port 6543, `?pgbouncer=true`). Used by runtime queries.
  - `DIRECT_URL` — session pooler (port 5432). Used by `prisma migrate`. Defined in `datasource db { directUrl = env("DIRECT_URL") }`.
- Migrations apply on each deploy via `prisma migrate deploy`.
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
- Scope: `read_orders,write_orders,read_products,read_inventories,write_inventories` (from [src/globals/config.ts](src/globals/config.ts)). Review necessity in [[Open_Questions]].

## Widget bundle
- Built into [public/widget.js](public/widget.js). **Committed to git** so deploys ship without an extra build step on the Vercel pipeline.
- Run `pnpm build:widget` after any `src/widget/*` change. Don't forget to commit the artifact.
- Theme variant: `pnpm build:widget --theme=new-theme` produces `public/widget-new-theme.js`. Runtime selection mechanism is unclear — see [[Open_Questions]].

## Cloudflare Worker widget delivery
- Live architecture: `widget.renuvex.app` serves storefront static widget assets through Cloudflare Worker Static Assets; `app.renuvex.app` remains the Vercel backend/API/upload/Mux/QStash origin.
- Worker V2 public-read proxying is live for `GET /api/public/settings`, `GET /api/public/ratings`, `GET /api/public/ratings-by-slug`, and `GET /api/public/reviews`. Settings is cacheable because the read route is pure and theme sync moved to `POST /api/public/storefront-theme/lazy-sync`. Every write/upload/video/lazy-sync route stays on `app.renuvex.app`.
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

## Local development
1. `pnpm install`
2. Copy `.env.example` → `.env.local`, fill values
3. `pnpm prisma:init` (first run only — pushes schema, no migrations)
4. `pnpm codegen` (after editing `graphql-requests.ts`)
5. `pnpm dev` — Next dev server on port 3000
6. `pnpm build:widget:watch` — auto-rebuild widget bundle

## Health checks
- No dedicated `/health` route today. Add if uptime monitoring is wired up.
- Vercel logs are line-based (`console.error('[scope] ERROR', ...)` pattern is searchable).
- Sentry CLI and MCP are tracked in [[Sentry_Operations]]. Current MCP scope is organization-level (`renuvex`).
- Review Video V1 preflight uses `scripts/verify-video-infrastructure.mjs --require-webhook --write-probe`, QStash delivery/DLQ inspection, Sentry media-route queries, and the live `/api/public/settings` capability response. Local `.env.local` flag state is not proof of the Vercel Production flag.

## Notes
- **Don't bypass the widget bundle commit step.** If you forget to commit `public/widget.js`, deploys ship the old widget. CI does not regenerate.
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

## Change Log
- 2026-07-02: Refreshed live Worker notes after verifying settings read-cache is now live on `widget.renuvex.app` with `MISS -> HIT`; lazy-sync and write/upload/video routes remain on `app.renuvex.app`.
- 2026-06-28: Updated initial Cloudflare Worker V2 public-read cache rollout notes from [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]. At that stage V2 was live for allowlisted ratings/reviews reads; settings joined the Worker read-cache after the later read/sync split.
- 2026-06-28: Added Cloudflare Worker widget delivery rollout notes from [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]. `widget.renuvex.app` becomes an asset-only target; `app.renuvex.app` remains backend/API.
- 2026-06-21: Removed the legacy pre-custom-domain Vercel alias after verifying Vercel Production env and live storefront script tags use `app.renuvex.app` / `widget.renuvex.app`.
- 2026-06-14: Promoted `app.renuvex.app` as the ikas app/admin/API origin and `widget.renuvex.app` as the storefront widget origin. Live storefront checks confirmed the custom widget domain; the old Vercel alias was kept only for a temporary compatibility window.
- 2026-05-25: GitHub repository and Vercel project renamed to `renuvex-product-reviews`; local `origin` updated. Production domain stayed on the legacy Vercel alias until a custom domain replaced it. `renuvex-product-reviews.vercel.app` returned 404 and the team-scoped Vercel domain was protected, so storefront script URLs could not be changed yet.
- 2026-05-24: Recorded the Pro upgrade path for sub-daily theme verification and clarified that Upstash Redis is already configured for rate limits, while QStash remains optional future infrastructure.
- 2026-05-23: Restored `/api/admin/daily-maintenance` to the daily 03:00 UTC Vercel-compatible schedule after the attempted 5-minute cron failed deployment on the current plan. The route still supports lightweight sub-daily runs if the deploy plan or queue architecture changes later.
- 2026-05-11: Linked [[Sentry_Operations]] after adding Sentry CLI/MCP setup notes.
