import { beforeEach, describe, expect, it, vi } from 'vitest';

// Hoisted mock so the vi.mock factory can reference it.
const { captureException } = vi.hoisted(() => ({
  captureException: vi.fn<(error: unknown, context?: unknown) => void>(),
}));

vi.mock('@sentry/nextjs', () => ({ captureException }));

import { reportCronTaskError } from '@/lib/cron-observability';

beforeEach(() => {
  captureException.mockClear();
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

  it('tags a cleanup breaker trip as task:breaker-tripped under source:cron', () => {
    reportCronTaskError('cleanup-images', 'breaker-tripped', new Error('cleanup breaker tripped: empty-used-set'), {
      scanned: 1200,
    });
    const [, ctx] = captureException.mock.calls[0] as [Error, { tags: Record<string, unknown> }];
    expect(ctx.tags).toMatchObject({ source: 'cron', cron: 'cleanup-images', task: 'breaker-tripped' });
  });
});
