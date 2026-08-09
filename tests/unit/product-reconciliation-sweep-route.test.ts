import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  verify: vi.fn(),
  process: vi.fn(),
  dispatch: vi.fn(),
  report: vi.fn(),
}));

vi.mock('@upstash/qstash', () => ({
  Receiver: class Receiver { verify = mocks.verify; },
  SignatureError: class SignatureError extends Error {},
}));
vi.mock('@/lib/media/config', () => ({
  getQStashMediaConfig: vi.fn(() => ({ currentSigningKey: 'current', nextSigningKey: 'next' })),
  MediaConfigError: class MediaConfigError extends Error {},
}));
vi.mock('@/lib/product-reconciliation-sweep', () => ({
  processProductReconciliationSweep: mocks.process,
}));
vi.mock('@/lib/product-reconciliation-dispatcher', () => ({
  dispatchProductReconciliationSweep: mocks.dispatch,
}));
vi.mock('@/lib/product-reconciliation', () => ({
  ProductReconciliationError: class ProductReconciliationError extends Error {
    constructor(public readonly code: string, public readonly retryable = true) { super(code); }
  },
}));
vi.mock('@/lib/server-failures', () => ({ reportServerFailure: mocks.report }));

import { POST } from '@/app/api/internal/product-reconciliation-sweep/route';

const SWEEP_ID = '22222222-2222-4222-8222-222222222222';
const URL = 'https://app.renuvex.app/api/internal/product-reconciliation-sweep';
const continuation = {
  sweep: {
    id: SWEEP_ID,
    phase: 'discover',
    cursorStoreId: 'store-0050',
    retainedRunCount: 0,
    retainedSweepCount: 0,
    attempts: 0,
    leaseExpiresAt: null,
    nextRetryAt: null,
  },
  reason: 'progress',
};

describe('product reconciliation sweep continuation route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.verify.mockResolvedValue(true);
    mocks.process.mockResolvedValue({
      sweepId: SWEEP_ID,
      status: 'completed',
      continuationRequired: false,
      continuation: null,
    });
    mocks.dispatch.mockResolvedValue(true);
  });

  it('fails closed without a QStash signature', async () => {
    const response = await POST(new Request(URL, {
      method: 'POST',
      body: JSON.stringify({ sweepId: SWEEP_ID }),
    }));

    expect(response.status).toBe(401);
    expect(mocks.process).not.toHaveBeenCalled();
  });

  it('accepts only an opaque sweep id and dispatches its continuation', async () => {
    const body = JSON.stringify({ sweepId: SWEEP_ID });
    mocks.process.mockResolvedValue({
      sweepId: SWEEP_ID,
      status: 'pending',
      continuationRequired: true,
      continuation,
    });

    const response = await POST(new Request(URL, {
      method: 'POST',
      headers: { 'Upstash-Signature': 'signed' },
      body,
    }));

    expect(response.status).toBe(200);
    expect(mocks.verify).toHaveBeenCalledWith({ body, signature: 'signed', url: URL });
    expect(mocks.process).toHaveBeenCalledWith(SWEEP_ID);
    expect(mocks.dispatch).toHaveBeenCalledWith(continuation);
  });

  it('returns 503 without claiming continuation acceptance when publish fails', async () => {
    mocks.process.mockResolvedValue({
      sweepId: SWEEP_ID,
      status: 'pending',
      continuationRequired: true,
      continuation,
    });
    mocks.dispatch.mockResolvedValue(false);

    const response = await POST(new Request(URL, {
      method: 'POST',
      headers: { 'Upstash-Signature': 'signed' },
      body: JSON.stringify({ sweepId: SWEEP_ID }),
    }));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ error: 'product_reconciliation_dispatch_failed' });
  });
});
