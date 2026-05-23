---
type: architecture
project: ikas-review-app
status: active
created: 2026-05-05
updated: 2026-05-24
tags:
  - deployment
  - vercel
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
- Sentry CLI and MCP are tracked in [[Sentry_Operations]]. Current MCP scope is organization-level (`mert-copper`) until a Sentry project exists.

## Notes
- **Don't bypass the widget bundle commit step.** If you forget to commit `public/widget.js`, deploys ship the old widget. CI does not regenerate.
- Migrations run on **every** deploy. Avoid migrations that can't safely run during traffic (long-running locks). For risky migrations, consider an out-of-band deploy.
- Cron routes require `CRON_SECRET`; without it they return 500. Set it in Vercel env before deploy. Vercel Hobby cron supports daily schedules only; 2-5 minute theme verification requires Pro/Enterprise cron or an external delayed queue such as QStash.
- Keep `NEXT_PUBLIC_DEPLOY_URL` and the app's URL in sync. Mismatch breaks OAuth (`getRedirectUri` in [src/helpers/api-helpers.ts](src/helpers/api-helpers.ts) tries to recover when `localhost` config meets non-localhost host, but it's a fallback).
- Keep `STOREFRONT_WIDGET_BASE_URL` in sync with the public widget host. The helper trims accidental whitespace and rejects localhost/private/non-HTTPS URLs by default so local development cannot overwrite real storefront script records with `http://localhost:3000/widget.js`.

## Related Source Files
- [vercel.json](vercel.json)
- [package.json](package.json)
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
- 2026-05-24: Recorded the Pro upgrade path for sub-daily theme verification and clarified that Upstash Redis is already configured for rate limits, while QStash remains optional future infrastructure.
- 2026-05-23: Restored `/api/admin/daily-maintenance` to the daily 03:00 UTC Vercel-compatible schedule after the attempted 5-minute cron failed deployment on the current plan. The route still supports lightweight sub-daily runs if the deploy plan or queue architecture changes later.
- 2026-05-11: Linked [[Sentry_Operations]] after adding Sentry CLI/MCP setup notes.
