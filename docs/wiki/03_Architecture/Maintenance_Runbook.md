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
  - "[[ADR_0030_Cleanup_Hardening]]"
  - "[[Database_Map]]"
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
| `GET /api/admin/cleanup-images` | `0 4 1 * *` (monthly) | Cloudinary `review_images/*` orphan **two-phase** cleanup behind a circuit-breaker (ADR_0012 + [[ADR_0030_Cleanup_Hardening]]): mark orphans → sweep after a 7-day grace if still orphaned. Writes a `MediaCleanupRun` audit row. |

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
- **`cleanup-images` is also monitored** (slug `cleanup-images`, schedule `0 4 1 * *`). A **breaker
  trip** (G1 empty-used-set / G2 ratio / G3 absolute — see [[ADR_0030_Cleanup_Hardening]]) is
  surfaced loudly: a rich Sentry issue (`task:breaker-tripped` carrying the reason + scan stats)
  **and** an `error` check-in, while the HTTP response stays `200` (a controlled protective outcome,
  not a crash). Every run also writes a `MediaCleanupRun` audit row
  (`status` ok|tripped|error|skipped + scan/quarantine/sweep counts + `sampleDeleted`).

## One-time setup (do once in Sentry)
Route these to a channel (email/Slack):
1. **Alerts → Create Alert → Issues** filtered on `monitor.slug` (covers missed/failed runs for **both** `daily-maintenance` and `cleanup-images`). Connecting the project-wide source/“All Issues” monitor works too.
2. **Recommended:** a second Issues alert on `tags source equals cron` — catches every per-task `captureException` **and breaker trips** (`task:breaker-tripped`) regardless of monitor.

Org: `renuvex` (EU, `de.sentry.io`). See [[Sentry_Operations]].

## Manual trigger (run now / verify)
```bash
curl -s -H "Authorization: Bearer <CRON_SECRET>" \
  "https://new-ikas-app.vercel.app/api/admin/daily-maintenance?full=1"
```
`<CRON_SECRET>` = Vercel → Project → Settings → Environment Variables → `CRON_SECRET`.
Read `data.reviewMediaMetadata` (`{status:'ran', completed, ...}`) and `data.errors[]`.

Cleanup-images (two-phase — the **first run after a deploy only marks**; deletions begin one grace
window later):
```bash
curl -s -H "Authorization: Bearer <CRON_SECRET>" \
  "https://new-ikas-app.vercel.app/api/admin/cleanup-images"
# After reviewing a `tripped` MediaCleanupRun row and confirming the deletion is intended,
# re-run with ?force=1 to override the ratio (G2) / absolute (G3) caps — never G1:
curl -s -H "Authorization: Bearer <CRON_SECRET>" \
  "https://new-ikas-app.vercel.app/api/admin/cleanup-images?force=1"
```
Response: `status` (ok|tripped), `scanned`, `currentOrphans`, `quarantinedNew`, `released`,
`deleted`, `breakerReason`.

## Failure playbooks
| Symptom (Sentry tag / response) | Cause | Fix |
|---|---|---|
| `task:review-media-metadata-backfill` + `401 unknown api_key` | Production Cloudinary key stale/rotated | Vercel env → rotate `CLOUDINARY_API_KEY` + `CLOUDINARY_API_SECRET` → redeploy → re-trigger `?full=1` |
| `reviewMediaMetadata.status:'skipped_no_cloudinary_config'` | Cloudinary env missing in prod | Set `CLOUDINARY_*` env vars → redeploy |
| `task:cleanup-pending-uploads` / `cleanup-images` error | Cloudinary creds/config or Admin API issue | Verify Cloudinary env + Admin API status |
| `cleanup-images` `task:breaker-tripped` reason `empty-used-set` (G1) | In-use diff is broken (e.g. `cloudName`/`publicId` regression) — **0 deleted, real photos protected** | **Do not force.** Investigate why `usedCount=0` while `ReviewMedia` has rows; fix the diff, then re-trigger. G1 is never force-overridable. |
| `cleanup-images` `task:breaker-tripped` reason `ratio …` (G2) / `sweep … > …` (G3) | A genuine bulk cleanup **or** an anomaly | Inspect the latest `MediaCleanupRun` (`candidates`, `sampleDeleted`). If intended, re-run `?force=1`; else fix the cause. |
| `task:reconcile-storefront-themes` / `reconcile-storefront-scripts` error | ikas token expired / Admin API down | Check ikas auth token + Admin API (see [[Auth_And_Installation_Flow]]) |
| Monitor `daily-maintenance` / `cleanup-images` **missed** | Vercel cron did not fire / function crashed | Check Vercel → Crons + function logs; confirm `vercel.json` cron + deploy is live |

## Notes
- **Why manual check-ins (not `automaticVercelMonitors`):** `next.config.js` sets
  `automaticVercelMonitors: true`, but Sentry auto-instruments **only Pages Router** Vercel crons —
  these are **App Router** route handlers (`src/app/api/.../route.ts`), which it does **not** cover
  (confirmed in the next.config comment + Sentry docs). Hence the explicit `withCronMonitor` /
  `captureCheckIn`. If a cron ever moves to the Pages Router, its manual monitor becomes redundant.
- Observability is **additive** — the existing `errors[]` + HTTP 500 (Vercel non-200 cron signal) stays as defense-in-depth.
- No secrets/tokens are sent to Sentry (`sendDefaultPii:false`; extras carry only counts + task/cron names).
- `cleanup-images` now also uses `withCronMonitor` + a circuit-breaker + a `MediaCleanupRun` audit log + two-phase `OrphanImageQuarantine` ([[ADR_0030_Cleanup_Hardening]]). Thresholds are env-tunable (`CLEANUP_MAX_DELETE_ABSOLUTE`=200, `CLEANUP_MAX_DELETE_RATIO`=0.30, `CLEANUP_QUARANTINE_GRACE_DAYS`=7, `CLEANUP_ORPHAN_AGE_DAYS`=30); calibrate from real audit rows.

## Obsidian Links
- [[Sentry_Operations]]
- [[Backend_API_Map]]
- [[ADR_0029_Review_Media_Metadata]]
- [[ADR_0030_Cleanup_Hardening]]
- [[Database_Map]]
