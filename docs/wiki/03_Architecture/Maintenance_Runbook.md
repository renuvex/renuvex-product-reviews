---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-06-09
updated: 2026-06-09
last_verified: 2026-06-09
confidence: high
tags:
  - runbook
  - operations
  - cron
  - observability
  - sentry
related:
  - "[[Sentry_Operations]]"
  - "[[Backend_API_Map]]"
  - "[[ADR_0029_Review_Media_Metadata]]"
  - "[[Async_Media_Pipeline]]"
source_files:
  - "src/lib/cron-observability.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
  - "src/app/api/admin/cleanup-images/route.ts"
  - "vercel.json"
---

# Maintenance Cron Runbook

Operational reference for the scheduled background jobs and how their failures surface.

## Cron jobs (`vercel.json`)
| Cron | Schedule (UTC) | What it does |
|---|---|---|
| `GET /api/admin/daily-maintenance` | `0 3 * * *` (daily 03:00) | Storefront theme reconcile (always) + on full run: pending-upload cleanup, storefront-script reconcile, **ReviewMedia metadata backfill** ([[ADR_0029_Review_Media_Metadata]]). |
| `GET /api/admin/cleanup-images` | `0 4 1 * *` (monthly) | Cloudinary `review_images/*` orphan scan → delete (ADR_0012). |

Both require `Authorization: Bearer <CRON_SECRET>`.

## How failures surface (observability)
Previously a task failure was caught into `errors[]` + an HTTP 500 and **alerted nobody** (Sentry
auto-captures only *unhandled* errors). Closed via `src/lib/cron-observability.ts`:
- **Per-task failure → `reportCronTaskError()` → `Sentry.captureException`** tagged
  `source:cron`, `cron:<name>`, `task:<name>`. Creates a Sentry issue (default new-issue alert fires).
- **Missed / never-ran / overrun → Sentry cron monitor** (`withCronMonitor` → `captureCheckIn`).
  `daily-maintenance` registers a monitor (slug `daily-maintenance`, schedule `0 3 * * *`, UTC);
  Sentry raises an issue tagged `monitor.slug` if the run is missed, fails, or exceeds `maxRuntime`.
  The route catches task errors and returns (does not throw), so the check-in status is set
  explicitly to `error` when `errors[]` is non-empty, `ok` otherwise.

## One-time setup (do once in Sentry)
Route these to a channel (email/Slack):
1. **Alerts → Create Alert → Issues** with filter `The event's tags match monitor.slug equals daily-maintenance` (covers missed/failed cron runs).
2. (Optional) A second Issues alert on `tags source equals cron` to catch any per-task `captureException` regardless of monitor.

Org: `renuvex` (EU, `de.sentry.io`). See [[Sentry_Operations]].

## Manual trigger (run now / verify)
```bash
curl -s -H "Authorization: Bearer <CRON_SECRET>" \
  "https://new-ikas-app.vercel.app/api/admin/daily-maintenance?full=1"
```
`<CRON_SECRET>` = Vercel → Project → Settings → Environment Variables → `CRON_SECRET`.
Read `data.reviewMediaMetadata` (`{status:'ran', completed, ...}`) and `data.errors[]`.

## Failure playbooks
| Symptom (Sentry tag / response) | Cause | Fix |
|---|---|---|
| `task:review-media-metadata-backfill` + `401 unknown api_key` | Production Cloudinary key stale/rotated | Vercel env → rotate `CLOUDINARY_API_KEY` + `CLOUDINARY_API_SECRET` → redeploy → re-trigger `?full=1` |
| `reviewMediaMetadata.status:'skipped_no_cloudinary_config'` | Cloudinary env missing in prod | Set `CLOUDINARY_*` env vars → redeploy |
| `task:cleanup-pending-uploads` / `cleanup-images` error | Cloudinary creds/config or Admin API issue | Verify Cloudinary env + Admin API status |
| `task:reconcile-storefront-themes` / `reconcile-storefront-scripts` error | ikas token expired / Admin API down | Check ikas auth token + Admin API (see [[Auth_And_Installation_Flow]]) |
| Monitor `daily-maintenance` **missed** | Vercel cron did not fire / function crashed | Check Vercel → Crons + function logs; confirm `vercel.json` cron + deploy is live |

## Notes
- **Why manual check-ins (not `automaticVercelMonitors`):** `next.config.js` sets
  `automaticVercelMonitors: true`, but Sentry auto-instruments **only Pages Router** Vercel crons —
  these are **App Router** route handlers (`src/app/api/.../route.ts`), which it does **not** cover
  (confirmed in the next.config comment + Sentry docs). Hence the explicit `withCronMonitor` /
  `captureCheckIn`. If a cron ever moves to the Pages Router, its manual monitor becomes redundant.
- Observability is **additive** — the existing `errors[]` + HTTP 500 (Vercel non-200 cron signal) stays as defense-in-depth.
- No secrets/tokens are sent to Sentry (`sendDefaultPii:false`; extras carry only counts + task/cron names).
- Adding a check-in monitor to `cleanup-images` (currently captureException-only) is a trivial follow-up using the same `withCronMonitor` helper.

## Obsidian Links
- [[Sentry_Operations]]
- [[Backend_API_Map]]
- [[ADR_0029_Review_Media_Metadata]]
