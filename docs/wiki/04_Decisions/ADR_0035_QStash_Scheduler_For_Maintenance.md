---
type: decision
project: renuvex-product-reviews
status: active
created: 2026-07-04
updated: 2026-07-04
last_verified: 2026-07-04
confidence: high
tags:
  - adr
  - qstash
  - cron
  - maintenance
related:
  - "[[Maintenance_Runbook]]"
  - "[[ADR_0030_Cleanup_Hardening]]"
  - "[[ADR_0032_Review_Video_On_Mux]]"
source_files:
  - "src/app/api/internal/scheduled-jobs/route.ts"
  - "src/lib/scheduled-jobs.ts"
  - "src/app/api/admin/daily-maintenance/route.ts"
  - "src/app/api/admin/cleanup-images/route.ts"
  - "prisma/schema.prisma"
  - "vercel.json"
---

# ADR_0035 - QStash Scheduler For Maintenance

## Context

The app has two maintenance crons in `vercel.json`: daily maintenance and monthly
AWS image orphan cleanup. Vercel Cron is simple, but it has no application-owned
retry/DLQ contract. The project already uses QStash for durable media-provider
jobs with signed receivers, retries, and delivery logs.

Read-only evidence before this decision:
- Production QStash env names exist in Vercel.
- QStash media-job delivery is active.
- QStash schedules were empty and DLQ was empty.
- `daily-maintenance` had a hidden retry risk: full maintenance only ran inside
  the UTC 03:00 first-five-minute window unless `?full=1` was present.

## Decision

Move maintenance scheduling to QStash in stages.

- Add `POST /api/internal/scheduled-jobs` as the QStash-only scheduler receiver.
- Verify every scheduler request with `Upstash-Signature`; do not forward
  `CRON_SECRET` through QStash.
- Accept only explicit task bodies:
  - `{ "task": "daily-maintenance-full" }`
  - `{ "task": "cleanup-images" }`
- Add `ScheduledJobRunLock` as a small idempotency guard keyed by
  `task + scheduleSlot`.
- Keep existing admin `GET` endpoints for manual/rollback operations guarded by
  `CRON_SECRET`.
- Keep Vercel Cron active until QStash schedules are created, verified, and
  accepted. Removing `vercel.json.crons` is a separate deploy gate.

## Consequences

- QStash retries can now rerun failed scheduled work without depending on a
  narrow UTC minute window.
- Duplicate delivery is safe: succeeded slots return `already_processed`, and
  in-progress slots avoid overlapping work.
- Cleanup breaker trips remain controlled `200` responses and continue to alert
  through `source:cron`.
- The transition is additive until QStash schedule creation and Vercel cron
  removal are explicitly approved.

## Rollback

- Before Vercel cron removal, pause/delete QStash schedules and keep Vercel Cron
  as the active scheduler.
- After Vercel cron removal, rollback to the previous Vercel deployment or
  deploy a hotfix that restores `vercel.json.crons`.
- No rollback step deletes DB rows, AWS objects, Mux assets, or QStash messages
  without a separate approved scope.

## Obsidian Links

- [[Maintenance_Runbook]]
- [[ADR_0030_Cleanup_Hardening]]
- [[ADR_0032_Review_Video_On_Mux]]
