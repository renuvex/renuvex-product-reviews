---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-05-05
updated: 2026-06-15
last_verified: 2026-06-15
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
Vercel hosting in `fra1` (Frankfurt). Postgres on Supabase (transaction pooler for runtime, session pooler for migrations). Upstash Redis for rate limits. Cloudinary for images. Two scheduled jobs: daily maintenance and monthly Cloudinary fallback cleanup. Build runs `prisma generate && prisma migrate deploy && next build`.

## Vercel
- **Region**: `["fra1"]` ([vercel.json](vercel.json)). Reasonable proximity to ikas/Supabase EU regions.
- **Production domains**: `app.renuvex.app` is the ikas app/admin/API origin and `widget.renuvex.app` is the storefront widget origin. Both resolve to the production Vercel project. The legacy pre-custom-domain Vercel alias has been removed from the project and must not be used for new configuration or documentation.
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

## Cloudinary
- Account credentials in env (`CLOUDINARY_*`).
- New review images live under tenant folders: `review_images/stores/<storeId>/`.
- Monthly fallback cleanup uses `cloudinary.api.resources({ ... type: 'upload', prefix: 'review_images/' })` to enumerate.

## Upstash Redis
- REST-based (works in serverless without long-lived sockets).
- Two env vars: `KV_REST_API_URL`, `KV_REST_API_TOKEN`.
- Present in `.env.example`. Configure the real values in Vercel Production/Preview envs; never commit real tokens.

## Future cron upgrade path
- **Current state**: daily 03:00 UTC maintenance cron is intentionally Hobby-compatible and deploy-safe.
- **After Vercel Pro/Enterprise upgrade**: change only `/api/admin/daily-maintenance` in [vercel.json](vercel.json) to a sub-daily expression such as `*/5 * * * *`, redeploy, and verify Vercel Cron Jobs. The route already gates heavier cleanup/script reconciliation to the 03:00 UTC daily window, so more frequent invocations stay lightweight.
- **When to add QStash**: only if fast per-merchant delayed verification is required while staying on Hobby, or if we need durable retries, deduplication, callbacks, or flow control independent of Vercel Cron. Do not add QStash merely because Redis exists; Redis handles rate limits, QStash is a separate queue/scheduler product.
- **If QStash is added later**: add env placeholders only with the implementation (`QSTASH_TOKEN` plus signing keys), create a verified internal endpoint for delayed theme verification, use one idempotency/flow-control key per merchant, and keep the daily Vercel cron as a backup.

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
- Live architecture: `widget.renuvex.app` serves only storefront static widget assets through Cloudflare Worker Static Assets; `app.renuvex.app` remains the Vercel backend/API/upload/Mux/QStash origin.
- Live Worker: `renuvex-widget-assets`.
- Worker custom domain: `widget.renuvex.app -> renuvex-widget-assets`.
- Cloudflare-created DNS record: read-only proxied `AAAA 100::` for `widget.renuvex.app`.
- Rollback DNS evidence: before cutover, `widget.renuvex.app` was `CNAME 2d886046bc2da89b.vercel-dns-017.com`, TTL `600`, proxied `false`.
- Local tooling:
  - `pnpm worker:widget:prepare-assets` copies only widget deploy files into `.tmp/widget-worker-assets`.
  - `pnpm worker:widget:types` regenerates Worker Env types with an empty `.tmp/widget-worker.env`, keeping app env names out of Worker types.
  - `pnpm worker:widget:deploy:dry-run` validates the Worker bundle/assets without deploying.
- External mutations such as future Worker redeploys, custom domain edits, DNS rollback, and Vercel domain/env changes still require explicit stop/go approval.
- Cutover verification on 2026-06-28:
  - `https://widget.renuvex.app/__health` returned `{"ok":true,"service":"renuvex-widget-assets"}`.
  - `https://widget.renuvex.app/widget.js` returned `server: cloudflare`, `Access-Control-Allow-Origin: *`, and `Cache-Control: public, max-age=0, must-revalidate`.
  - Hashed runtime/chunk assets returned `Cache-Control: public, max-age=31536000, immutable`.
  - `https://widget.renuvex.app/api/public/settings` returned `404`, confirming the Worker remains fail-closed for public API paths.
  - `pnpm measure:deployed-widget` with `MEASURE_WIDGET_ORIGIN=https://widget.renuvex.app` and `MEASURE_WIDGET_API_ORIGIN=https://app.renuvex.app` passed four controlled scenarios with zero widget-error calls.

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
- Cron routes require `CRON_SECRET`; without it they return 500. Set it in Vercel env before deploy. Vercel Hobby cron supports daily schedules only; 2-5 minute theme verification requires Pro/Enterprise cron or an external delayed queue such as QStash.
- Keep `NEXT_PUBLIC_DEPLOY_URL` and the app's URL in sync. Mismatch breaks OAuth (`getRedirectUri` in [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts) tries to recover when `localhost` config meets non-localhost host, but it's a fallback).
- Keep `STOREFRONT_WIDGET_BASE_URL` in sync with the public widget host. The helper trims accidental whitespace and rejects localhost/private/non-HTTPS URLs by default so local development cannot overwrite real storefront script records with `http://localhost:3000/widget.js`.
- Keep `STOREFRONT_WIDGET_API_BASE_URL` in sync with the backend/API origin when the widget asset origin is separate. Production target is `https://app.renuvex.app`; unset means same-origin fallback and should be treated as rollback/local compatibility only after the Worker cutover.
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
- 2026-06-28: Added Cloudflare Worker widget delivery rollout notes from [[ADR_0033_Cloudflare_Worker_Widget_Asset_Delivery]]. `widget.renuvex.app` becomes an asset-only target; `app.renuvex.app` remains backend/API.
- 2026-06-21: Removed the legacy pre-custom-domain Vercel alias after verifying Vercel Production env and live storefront script tags use `app.renuvex.app` / `widget.renuvex.app`.
- 2026-06-14: Promoted `app.renuvex.app` as the ikas app/admin/API origin and `widget.renuvex.app` as the storefront widget origin. Live storefront checks confirmed the custom widget domain; the old Vercel alias was kept only for a temporary compatibility window.
- 2026-05-25: GitHub repository and Vercel project renamed to `renuvex-product-reviews`; local `origin` updated. Production domain stayed on the legacy Vercel alias until a custom domain replaced it. `renuvex-product-reviews.vercel.app` returned 404 and the team-scoped Vercel domain was protected, so storefront script URLs could not be changed yet.
- 2026-05-24: Recorded the Pro upgrade path for sub-daily theme verification and clarified that Upstash Redis is already configured for rate limits, while QStash remains optional future infrastructure.
- 2026-05-23: Restored `/api/admin/daily-maintenance` to the daily 03:00 UTC Vercel-compatible schedule after the attempted 5-minute cron failed deployment on the current plan. The route still supports lightweight sub-daily runs if the deploy plan or queue architecture changes later.
- 2026-05-11: Linked [[Sentry_Operations]] after adding Sentry CLI/MCP setup notes.
