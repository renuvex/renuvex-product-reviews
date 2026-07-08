// Shared scheduled-maintenance observability for QStash and manual admin routes.
//
// Closes the silent-failure gap the previous "catch -> errors[] -> 500" pattern
// left open: a task ran but failed, and because handled errors are NOT
// auto-captured by Sentry, the failure was invisible. reportCronTaskError() sends
// it to Sentry as an issue tagged source:cron so an alert rule can fire. It is
// also used for cleanup breaker trips (task:breaker-tripped).
//
// NOTE: we intentionally do NOT register Sentry cron *check-in monitors*. The
// Sentry plan includes a single cron monitor, and check-ins from short-lived
// serverless scheduled invocations proved noisy/fragile (false "missed" alerts).
// The "did the scheduled job run at all" signal lives in QStash delivery logs,
// DLQ, and ScheduledJobRunLock rows. See ADR_0030 / [[Maintenance_Runbook]].

import * as Sentry from '@sentry/nextjs';

type CronExtra = Record<string, string | number | boolean>;

// Report a single handled cron task failure (or a cleanup breaker trip) to Sentry.
// Keeps the existing console.error visibility. Never throws (observability must
// not break a cron).
export function reportCronTaskError(cron: string, task: string, error: unknown, extra?: CronExtra): void {
  console.error(`[${cron}] ${task} failed:`, error);
  try {
    const err =
      error instanceof Error ? error : new Error(typeof error === 'string' ? error : `Unknown error in ${cron}/${task}`);
    Sentry.captureException(err, {
      tags: { source: 'cron', cron, task },
      extra: { cron, task, ...(extra ?? {}) },
    });
  } catch {
    // Sentry capture is best-effort; swallow to protect the cron.
  }
}
