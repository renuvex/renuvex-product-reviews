import { beforeEach, describe, expect, it, vi } from 'vitest';

// Hoisted mocks so the vi.mock factory can reference them.
const { captureException, captureCheckIn } = vi.hoisted(() => ({
  captureException: vi.fn<(error: unknown, context?: unknown) => void>(),
  captureCheckIn: vi.fn<(checkIn: unknown, monitorConfig?: unknown) => string>(() => 'checkin-id'),
}));

vi.mock('@sentry/nextjs', () => ({ captureException, captureCheckIn }));

import { reportCronTaskError, withCronMonitor } from '@/lib/cron-observability';

beforeEach(() => {
  captureException.mockClear();
  captureCheckIn.mockClear();
});

describe('reportCronTaskError', () => {
  it('captures the error to Sentry with cron/task tags and extra', () => {
    reportCronTaskError('daily-maintenance', 'review-media-metadata-backfill', new Error('401 unknown api_key'), {
      processed: 3,
    });

    expect(captureException).toHaveBeenCalledTimes(1);
    const [err, ctx] = captureException.mock.calls[0] as [Error, { tags: unknown; extra: Record<string, unknown> }];
    expect(err.message).toContain('401 unknown api_key');
    expect(ctx.tags).toEqual({ source: 'cron', cron: 'daily-maintenance', task: 'review-media-metadata-backfill' });
    expect(ctx.extra).toMatchObject({ cron: 'daily-maintenance', task: 'review-media-metadata-backfill', processed: 3 });
  });

  it('wraps a non-Error value into an Error', () => {
    reportCronTaskError('cleanup-images', 'cleanup-images', 'string failure');
    const [err] = captureException.mock.calls[0] as [Error];
    expect(err.message).toBe('string failure');
  });
});

describe('withCronMonitor', () => {
  it('sends in_progress (with monitorConfig) then ok when the run has no task errors', async () => {
    const value = await withCronMonitor('daily-maintenance', { schedule: '0 3 * * *', maxRuntime: 10 }, async () => ({
      hadErrors: false,
      value: 'RESPONSE',
    }));

    expect(value).toBe('RESPONSE');
    expect(captureCheckIn).toHaveBeenCalledTimes(2);
    expect(captureCheckIn.mock.calls[0][0]).toMatchObject({ monitorSlug: 'daily-maintenance', status: 'in_progress' });
    expect(captureCheckIn.mock.calls[0][1]).toMatchObject({
      schedule: { type: 'crontab', value: '0 3 * * *' },
      timezone: 'UTC',
      maxRuntime: 10,
    });
    expect(captureCheckIn.mock.calls[1][0]).toMatchObject({
      checkInId: 'checkin-id',
      monitorSlug: 'daily-maintenance',
      status: 'ok',
    });
  });

  it('completes the check-in with error status when the run reports task errors', async () => {
    await withCronMonitor('daily-maintenance', { schedule: '0 3 * * *' }, async () => ({ hadErrors: true, value: 1 }));

    expect(captureCheckIn.mock.calls[1][0]).toMatchObject({ status: 'error' });
    // Task-level errors are reported separately (reportCronTaskError), not by the monitor itself.
    expect(captureException).not.toHaveBeenCalled();
  });

  it('on an unexpected throw: error check-in + captureException + rethrow', async () => {
    const boom = new Error('boom');
    await expect(
      withCronMonitor('daily-maintenance', { schedule: '0 3 * * *' }, async () => {
        throw boom;
      }),
    ).rejects.toBe(boom);

    expect(captureCheckIn.mock.calls[1][0]).toMatchObject({ status: 'error' });
    expect(captureException).toHaveBeenCalledTimes(1);
  });
});
