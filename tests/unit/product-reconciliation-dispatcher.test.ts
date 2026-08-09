import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  publishJSON: vi.fn(),
  captureException: vi.fn(),
}));

vi.mock('@upstash/qstash', () => ({
  Client: class Client {
    publishJSON(input: unknown) {
      return mocks.publishJSON(input);
    }
  },
}));
vi.mock('@sentry/nextjs', () => ({ captureException: mocks.captureException }));
vi.mock('@/lib/media/config', () => ({
  getMediaJobEndpoint: vi.fn(() => 'https://app.renuvex.app/api/internal/media-provider-job'),
  getQStashMediaConfig: vi.fn(() => ({ token: 'qstash-test-token' })),
  MediaConfigError: class MediaConfigError extends Error {},
}));

import {
  dispatchProductReconciliationRun,
  productReconciliationDeduplicationId,
  productReconciliationSweepDeduplicationId,
} from '@/lib/product-reconciliation-dispatcher';

const run = {
  id: '11111111-1111-4111-8111-111111111111',
  phase: 'scan',
  nextPage: 2,
  candidateCursor: null,
  attempts: 0,
  leaseExpiresAt: null,
  nextRetryAt: null,
};

describe('product reconciliation QStash dispatch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.publishJSON.mockResolvedValue({ messageId: 'message-1' });
  });

  it('deduplicates the same durable progress state regardless of dispatch reason', () => {
    const progress = productReconciliationDeduplicationId({ run: run as never, reason: 'progress' });
    const recovery = productReconciliationDeduplicationId({
      run: run as never,
      reason: 'recovery',
      notBefore: new Date('2026-08-09T12:00:00.000Z'),
    });

    expect(progress).toBe(recovery);
    expect(productReconciliationDeduplicationId({
      run: { ...run, nextPage: 3 } as never,
      reason: 'progress',
    })).not.toBe(progress);
    expect(productReconciliationDeduplicationId({
      run: { ...run, attempts: 1 } as never,
      reason: 'retry',
    })).not.toBe(progress);
    expect(productReconciliationDeduplicationId({
      run: { ...run, leaseExpiresAt: new Date('2026-08-09T12:05:00.000Z') } as never,
      reason: 'lease',
    })).not.toBe(progress);
    expect(productReconciliationDeduplicationId({
      run: { ...run, nextRetryAt: new Date('2026-08-09T12:10:00.000Z') } as never,
      reason: 'retry',
    })).not.toBe(progress);
  });

  it('uses the same state-based contract for sweep cursors', () => {
    const sweep = {
      id: '22222222-2222-4222-8222-222222222222',
      phase: 'discover',
      cursorStoreId: 'store-050',
      retainedRunCount: 0,
      retainedSweepCount: 0,
      attempts: 0,
      leaseExpiresAt: null,
      nextRetryAt: null,
    };
    const initial = productReconciliationSweepDeduplicationId({ sweep: sweep as never, reason: 'progress' });

    expect(productReconciliationSweepDeduplicationId({
      sweep: sweep as never,
      reason: 'recovery',
    })).toBe(initial);
    expect(productReconciliationSweepDeduplicationId({
      sweep: { ...sweep, cursorStoreId: 'store-100' } as never,
      reason: 'progress',
    })).not.toBe(initial);
    expect(productReconciliationSweepDeduplicationId({
      sweep: { ...sweep, phase: 'retain_runs' } as never,
      reason: 'progress',
    })).not.toBe(initial);
    expect(productReconciliationSweepDeduplicationId({
      sweep: { ...sweep, phase: 'retain_runs', retainedRunCount: 100 } as never,
      reason: 'progress',
    })).not.toBe(initial);
    expect(productReconciliationSweepDeduplicationId({
      sweep: { ...sweep, leaseExpiresAt: new Date('2026-08-09T12:05:00.000Z') } as never,
      reason: 'lease',
    })).not.toBe(initial);
  });

  it('publishes with fixed flow control and an absolute not-before time', async () => {
    const notBefore = new Date(Date.now() + 60_000);

    await expect(dispatchProductReconciliationRun({
      run: run as never,
      reason: 'retry',
      notBefore,
    })).resolves.toBe(true);

    expect(mocks.publishJSON).toHaveBeenCalledWith(expect.objectContaining({
      url: 'https://app.renuvex.app/api/internal/product-reconciliation',
      body: { runId: run.id },
      retries: 5,
      timeout: '60s',
      notBefore: Math.ceil(notBefore.getTime() / 1000),
      flowControl: {
        key: 'renuvex-product-reconciliation-v1',
        rate: 1,
        period: '1s',
        parallelism: 4,
      },
    }));
  });

  it('returns false and reports only a fixed failure when publish rejects', async () => {
    mocks.publishJSON.mockRejectedValue(new Error('sensitive provider detail'));

    await expect(dispatchProductReconciliationRun({
      run: run as never,
      reason: 'initial',
    })).resolves.toBe(false);

    expect(mocks.captureException).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'product_reconciliation_dispatch_failed' }),
      { tags: { source: 'product-reconciliation', task: 'dispatch-run' } },
    );
  });
});
