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

## Agent Brief
Use this ADR when changing scheduler source-of-truth, QStash schedules,
`/api/internal/scheduled-jobs`, or maintenance idempotency. Current decision:
QStash schedules trigger daily full maintenance and monthly image cleanup with
signed POST bodies; `CRON_SECRET` remains only for manual/admin endpoints; and
`ScheduledJobRunLock` prevents duplicate same-slot execution. Do not use
QStash `nextScheduleTime` as the health gate; rely on delivery logs, DLQ, and
runtime DB lock evidence.

## Context

The app previously had two maintenance crons in `vercel.json`: daily maintenance and monthly
AWS image orphan cleanup. Vercel Cron is simple, but it has no application-owned
retry/DLQ contract. The project already uses QStash for durable media-provider
jobs with signed receivers, retries, and delivery logs.

Evidence before this decision:
- Production QStash env names exist in Vercel.
- QStash media-job delivery is active.
- QStash schedules were empty and DLQ was empty.
- `daily-maintenance` had a hidden retry risk: full maintenance only ran inside
  the UTC 03:00 first-five-minute window unless `?full=1` was present.
- The production deployment serving `/api/internal/scheduled-jobs` returned
  `401` for unsigned requests and failed closed.

## Decision

Move maintenance scheduling to QStash.

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
- Use two active QStash schedules:
  - `renuvex-daily-maintenance-full`, cron `0 3 * * *`.
  - `renuvex-cleanup-images`, cron `0 4 1 * *`.
- Remove `vercel.json.crons`; Vercel Cron is no longer the scheduler source of
  truth.

## Consequences

- QStash retries can now rerun failed scheduled work without depending on a
  narrow UTC minute window.
- Duplicate delivery is safe: succeeded slots return `already_processed`, and
  in-progress slots avoid overlapping work.
- Cleanup breaker trips remain controlled `200` responses and continue to alert
  through `source:cron`.
- QStash schedule logs and DLQ replace the Vercel Crons dashboard as the run
  history source.
- `nextScheduleTime` is not a health gate. Upstash docs/types expose it as
  optional metadata and live responses may omit it; runtime acceptance depends
  on delivery evidence, DLQ state, and `ScheduledJobRunLock`.

## Rollback

- Pause QStash schedules and roll back to the last Vercel deployment with
  `vercel.json.crons`, or deploy a hotfix that restores those crons.
- No rollback step deletes DB rows, AWS objects, Mux assets, or QStash messages
  without a separate approved scope.

## Obsidian Links

- [[Maintenance_Runbook]]
- [[ADR_0030_Cleanup_Hardening]]
- [[ADR_0032_Review_Video_On_Mux]]
