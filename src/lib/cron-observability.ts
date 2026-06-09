// Shared cron observability for Vercel-cron routes.
//
// Closes two silent-failure gaps that the previous "catch -> errors[] -> 500"
// pattern left open:
//   1) A task ran but failed -> reportCronTaskError() sends it to Sentry
//      (handled errors are NOT auto-captured, so they were invisible).
//   2) The scheduled job never ran / crashed before any task / overran ->
//      withCronMonitor() registers a Sentry cron monitor (check-in) so a missed
//      or failed run raises an alert tagged with the monitor slug.
//
// Verified against @sentry/nextjs v10 (captureCheckIn / monitorConfig schedule
// auto-upsert) and the official Next.js Crons docs. Our cron routes catch task
// errors and RETURN (they do not throw), so we use explicit captureCheckIn with
// an `errors`-derived status rather than withMonitor (which only keys off throw).

import * as Sentry from '@sentry/nextjs';

export type CronMonitorConfig = {
  /** Crontab expression matching the Vercel cron schedule, e.g. '0 3 * * *'. */
  schedule: string;
  /** IANA timezone for the schedule. Defaults to 'UTC' (Vercel crons run in UTC). */
  timezone?: string;
  /** Minutes the run may be late before Sentry marks it "missed". */
  checkinMargin?: number;
  /** Minutes the run may take before Sentry marks it "failed" (timeout). */
  maxRuntime?: number;
};

type CronExtra = Record<string, string | number | boolean>;

// Report a single handled cron task failure to Sentry. Keeps the existing
// console.error visibility. Never throws (observability must not break a cron).
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

// Wrap a cron handler with a Sentry cron-monitor check-in. The handler reports
// whether the run had task-level errors via `hadErrors`, which maps to the
// check-in status ('error' vs 'ok'); an unexpected throw is reported as 'error'
// and re-thrown. Returns the handler's value unchanged.
export async function withCronMonitor<T>(
  monitorSlug: string,
  config: CronMonitorConfig,
  run: () => Promise<{ hadErrors: boolean; value: T }>,
): Promise<T> {
  const startedAt = Date.now();
  const monitorConfig = {
    schedule: { type: 'crontab' as const, value: config.schedule },
    timezone: config.timezone ?? 'UTC',
    checkinMargin: config.checkinMargin ?? 5,
    maxRuntime: config.maxRuntime ?? 5,
    failureIssueThreshold: 1,
    recoveryThreshold: 1,
  };

  let checkInId: string | undefined;
  try {
    checkInId = Sentry.captureCheckIn({ monitorSlug, status: 'in_progress' }, monitorConfig);
  } catch {
    // If the in-progress check-in cannot be sent, still run the job.
  }

  const finish = (status: 'ok' | 'error') => {
    try {
      Sentry.captureCheckIn({ checkInId, monitorSlug, status, duration: (Date.now() - startedAt) / 1000 });
    } catch {
      // best-effort
    }
  };

  try {
    const { hadErrors, value } = await run();
    finish(hadErrors ? 'error' : 'ok');
    return value;
  } catch (error) {
    finish('error');
    reportCronTaskError(monitorSlug, 'handler', error);
    throw error;
  }
}
