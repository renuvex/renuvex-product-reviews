---
type: architecture
project: renuvex-product-reviews
status: active
created: 2026-06-09
updated: 2026-06-20
last_verified: 2026-06-20
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
  - "[[Review_Video_Manual_Repair_Runbook]]"
source_files:
  - "src/lib/cron-observability.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
  - "src/app/api/admin/cleanup-images/route.ts"
  - "src/app/api/internal/media-jobs/route.ts"
  - "src/lib/media/outbox.ts"
  - "src/lib/media/dispatcher.ts"
  - "src/lib/media/lifecycle.ts"
  - "src/lib/media/jobs.ts"
  - "src/lib/media/reconciliation.ts"
  - "src/lib/media/providers/mux.ts"
  - "tests/unit/media-jobs.test.ts"
  - "scripts/video-canary-ops.mjs"
  - "vercel.json"
---

# Maintenance Cron Runbook

Operational reference for the scheduled background jobs and how their failures surface.

## Cron jobs (`vercel.json`)
| Cron | Schedule (UTC) | What it does |
|---|---|---|
| `GET /api/admin/daily-maintenance` | `0 3 * * *` (daily 03:00) | Storefront theme reconcile (always) + on full run: pending-upload cleanup, storefront-script reconcile, **ReviewMedia metadata backfill** ([[ADR_0029_Review_Media_Metadata]]), and video session/job reconciliation when video infrastructure is configured. |
| `GET /api/admin/cleanup-images` | `0 4 1 * *` (monthly) | Cloudinary `review_images/*` orphan **two-phase** cleanup behind a circuit-breaker (ADR_0012 + [[ADR_0030_Cleanup_Hardening]]): mark orphans → sweep after a 7-day grace if still orphaned. Writes a `MediaCleanupRun` audit row. |

Both require `Authorization: Bearer <CRON_SECRET>`.

## How failures surface (observability)
A task failure was previously caught into `errors[]` + an HTTP 500 and **alerted nobody** (Sentry
auto-captures only *unhandled* errors). Closed via `src/lib/cron-observability.ts`:
- **Per-task failure → `reportCronTaskError()` → `Sentry.captureException`** tagged
  `source:cron`, `cron:<name>`, `task:<name>`. Creates a Sentry issue → the `source:cron` alert fires.
- **Cleanup breaker trip → same path**, tagged `task:breaker-tripped`, carrying the reason + scan
  stats (G1 empty-used-set / G2 ratio / G3 absolute — see [[ADR_0030_Cleanup_Hardening]]). The HTTP
  response stays `200` (a controlled protective outcome, not a crash); the alert comes from the issue.
- **"Did the scheduled job run at all?" is intentionally NOT tracked in Sentry.** We dropped the
  `captureCheckIn` cron monitors: the Sentry plan includes only **one** cron monitor, and serverless
  check-ins proved noisy/fragile (false "missed" alerts at the tight margin). Use the
  **Vercel → Crons** dashboard for run history. These crons are idempotent + self-healing, so a single
  missed run is low-impact.
- Defense-in-depth stays: the `errors[]` + HTTP 500 (Vercel non-200 cron signal), and every
  `cleanup-images` run writes a `MediaCleanupRun` audit row
  (`status` ok|tripped|error|skipped + scan/quarantine/sweep counts + `sampleDeleted`).

## One-time setup (do once in Sentry)
One **Issues** alert covers everything (route it to email/Slack):
- **Alerts → Create Alert → Issues**, filter `The event's tags match source equals cron` → catches
  every per-task failure **and** cleanup breaker trips (`task:breaker-tripped`) for both crons.
- A project-wide "alert on all new issues" rule also works (broader — also catches non-cron app errors).
- ⚠️ The `source` tag only autocompletes **after** a `source:cron` event has been ingested (i.e. after
  the first real failure/trip). Until then, type `source` / `cron` manually, or just use the
  project-wide rule.

Org: `renuvex` (EU, `de.sentry.io`). See [[Sentry_Operations]].

## Manual trigger (run now / verify)
```bash
curl -s -H "Authorization: Bearer <CRON_SECRET>" \
  "https://app.renuvex.app/api/admin/daily-maintenance?full=1"
```
`<CRON_SECRET>` = Vercel → Project → Settings → Environment Variables → `CRON_SECRET`.
Read `data.reviewMediaMetadata` (`{status:'ran', completed, ...}`) and `data.errors[]`.
When video env is configured, also inspect the video maintenance fields for stuck `VideoUploadSession` rows and redispatched/dead `MediaProviderJob` rows. Daily maintenance backfills missing `expire_upload_session` and `reconcile_video` records for pre-deploy sessions, then redispatches due `pending`/`failed` jobs and stale `processing` jobs whose lock has expired. Future-scheduled lifecycle jobs are healthy and must be reported separately from due or stale work. Repeated delivery is safe because QStash/background delivery is at-least-once. When video env is missing and the global flag is off, video maintenance may be skipped; that is expected for pre-rollout deployments.

Media provider job worker (QStash target, not for unauthenticated manual browser calls):
```bash
# QStash sends a signed POST body: { "jobId": "..." }
# For local manual debugging, call processMediaProviderJob(jobId) in a controlled script
# rather than bypassing the QStash signature gate on /api/internal/media-jobs.
#
# Response classification: invalid signature = 401, signed malformed body = 400,
# missing provider config = 503, authenticated worker failure = 500.
```

Cleanup-images (two-phase — the **first run after a deploy only marks**; deletions begin one grace
window later):
```bash
curl -s -H "Authorization: Bearer <CRON_SECRET>" \
  "https://app.renuvex.app/api/admin/cleanup-images"
# After reviewing a `tripped` MediaCleanupRun row and confirming the deletion is intended,
# re-run with ?force=1 to override the ratio (G2) / absolute (G3) caps — never G1:
curl -s -H "Authorization: Bearer <CRON_SECRET>" \
  "https://app.renuvex.app/api/admin/cleanup-images?force=1"
```
Response: `status` (ok|tripped), `scanned`, `currentOrphans`, `quarantinedNew`, `released`,
`deleted`, `breakerReason`.

## Failure playbooks
| Symptom (Sentry tag / response) | Cause | Fix |
|---|---|---|
| `task:review-media-metadata-backfill` + `401 unknown api_key` | Production Cloudinary key stale/rotated | Vercel env → rotate `CLOUDINARY_API_KEY` + `CLOUDINARY_API_SECRET` → redeploy → re-trigger `?full=1` |
| `reviewMediaMetadata.status:'skipped_no_cloudinary_config'` | Cloudinary env missing in prod | Set `CLOUDINARY_*` env vars → redeploy |
| `task:cleanup-pending-uploads` / `cleanup-images` error | Cloudinary creds/config or Admin API issue | Verify Cloudinary env + Admin API status |
| `source:media-job` + `action:resolve_video_asset` | Mux upload has not produced an asset yet, or upload lookup failed | Check the Mux upload id, session status, and provider error code. A waiting upload should defer and retry; terminal Mux upload states fail the session and queue cleanup. |
| `source:media-job` + `action:publish_video` | Public playback ID creation/convergence or moderation race failed | Confirm `Review.moderationVersion` and `MediaProviderLease`. A stale job must converge Mux public playback IDs to the latest DB state and finish `superseded`; it must not remain the final public/private decision. |
| `source:media-job` + `action:protect_video` | Public playback ID deletion/convergence or moderation race failed | Confirm the review status, media visibility, and Mux playback IDs. The job should remove public playback IDs while keeping the signed pending/admin playback ID. |
| `source:media-job` + `action:cleanup_video` | Mux cancel/delete failed | Cleanup is idempotent and provider-aware. Use [[Review_Video_Manual_Repair_Runbook]] for evidence collection and repair approval. Verify Mux upload/asset ids, then retry the job; do not delete DB registry rows before provider cleanup succeeds. Direct-upload cancel is only valid while the Mux upload is still waiting; if a known or recovered asset id exists, asset deletion is the cleanup source of truth. |
| `source:media-job` + `action:reconcile_video` | Mux webhook was delayed/missed or canonical asset polling failed | The bounded self-healing schedule runs at 10/20/30/45/60/90/120/180/300/600 seconds and applies state through the same transition helper as the webhook. Mux asset `ready`, signed playback ID, trusted Mux HLS/poster URLs, and valid V1 media limits are authoritative. After 10 minutes it records `mux_processing_delayed`; it does not delete or fail a still-processing video. Inspect Mux asset state and the session expiry before manual mutation. |
| `source:media-job` + `action:expire_upload_session` | A delayed expiry wakeup or session cleanup failed | `expiresAt` is authoritative. Early delivery must defer; expired reserved uploads release reserved quota and queue cleanup; ready-but-unsubmitted uploads clean provider assets and can release consumed quota when `consumedAt` is still null; review-consumed sessions supersede the job and are not refunded by abandoned-upload cleanup. |
| `source:media-job` + `action:cleanup_image` | Cloudinary pending-image delete failed | Pending registry rows are intentionally kept until the outbox job deletes the provider asset. Verify Cloudinary env/Admin API status, then retry or let daily redispatch pick it up. |
| Stuck video session (`uploading`/`uploaded`/`processing`) | Shopper abandoned upload, duplicate complete race, missing webhook, or Mux processing failed silently | Transactionally-created expiry/reconciliation jobs should heal the session without waiting for the daily cron. Daily maintenance is the pre-deploy/backstop repair path. If manual intervention is needed, inspect `VideoUploadSession`, lifecycle jobs, `PendingReviewImage`, `WebhookEvent`, and provider state before marking failed. |
| `cleanup-images` `task:breaker-tripped` reason `empty-used-set` (G1) | In-use diff is broken (e.g. `cloudName`/`publicId` regression) — **0 deleted, real photos protected** | **Do not force.** Investigate why `usedCount=0` while `ReviewMedia` has rows; fix the diff, then re-trigger. G1 is never force-overridable. |
| `cleanup-images` `task:breaker-tripped` reason `ratio …` (G2) / `sweep … > …` (G3) | A genuine bulk cleanup **or** an anomaly | Inspect the latest `MediaCleanupRun` (`candidates`, `sampleDeleted`). If intended, re-run `?force=1`; else fix the cause. |
| `task:reconcile-storefront-themes` / `reconcile-storefront-scripts` error | ikas token expired / Admin API down | Check ikas auth token + Admin API (see [[Auth_And_Installation_Flow]]) |
| A cron **didn't run** (expected effect missing / Vercel shows a failed run) | Vercel cron did not fire / function crashed | Check **Vercel → Crons** + function logs; confirm `vercel.json` cron + deploy is live. (No Sentry "missed" alert — that detection lives in the Vercel dashboard, not Sentry.) |

## Notes
- **Why no Sentry cron monitors:** the Sentry plan includes a single cron monitor, and `captureCheckIn`
  check-ins from short-lived serverless invocations were noisy/fragile (false "missed" alerts at the
  tight check-in margin). We alert via `captureException` (task failures + breaker trips) and use the
  Vercel → Crons dashboard for run history. `next.config.js` still sets `automaticVercelMonitors: true`,
  but that instruments **Pages Router** crons only — these are App Router handlers, so it is a no-op
  here. If cron-monitor budget is later expanded, re-introducing `captureCheckIn` is the lever (it
  lives in `cron-observability.ts` git history, ADR_0030).
- Observability is **additive** — the existing `errors[]` + HTTP 500 (Vercel non-200 cron signal) stays as defense-in-depth.
- No secrets/tokens are sent to Sentry (`sendDefaultPii:false`; extras carry only counts + task/cron names).
- `cleanup-images` uses a circuit-breaker + a `MediaCleanupRun` audit log + two-phase `OrphanImageQuarantine` ([[ADR_0030_Cleanup_Hardening]]). Thresholds are env-tunable (`CLEANUP_MAX_DELETE_ABSOLUTE`=200, `CLEANUP_MAX_DELETE_RATIO`=0.30, `CLEANUP_QUARANTINE_GRACE_DAYS`=7, `CLEANUP_ORPHAN_AGE_DAYS`=30); calibrate from real audit rows.
- Review media lifecycle is DB-first: `VideoUploadSession`, `PendingReviewImage`, `WebhookEvent`, and `MediaProviderJob` are the source of truth; Cloudinary and Mux are provider state. Never repair by editing provider state alone without matching DB state.
- Manual Mux repair uses [[Review_Video_Manual_Repair_Runbook]]. Start read-only, collect DB/job/webhook/provider evidence, and get explicit approval before any provider or DB mutation.
- Required Mux setup is manual/operator-owned until an explicit provisioning tool exists: environment-specific Mux API token, signing key, webhook endpoint/secret, and QStash signing keys. The app does not provision Mux resources automatically.
- Legacy external video credentials and inventory are teardown concerns only after Mux canary acceptance. Do not run destructive provider cleanup without proven inventory and explicit approval.
- The first production video rollout must follow [[Review_Video_Canary_Runbook]]. `pnpm video:canary:ops` is read-only by default; apply mode is single-store scoped and requires an exact confirmation id.

## Obsidian Links
- [[Sentry_Operations]]
- [[Backend_API_Map]]
- [[ADR_0029_Review_Media_Metadata]]
- [[ADR_0030_Cleanup_Hardening]]
- [[Database_Map]]
- [[Review_Video_Canary_Runbook]]
- [[Review_Video_Manual_Repair_Runbook]]
