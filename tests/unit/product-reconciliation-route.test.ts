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
vi.mock('@/lib/product-reconciliation', () => ({
  processProductReconciliationRun: mocks.process,
  ProductReconciliationError: class ProductReconciliationError extends Error {
    constructor(public readonly code: string, public readonly retryable = true) { super(code); }
  },
}));
vi.mock('@/lib/product-reconciliation-dispatcher', () => ({
  dispatchProductReconciliationRun: mocks.dispatch,
}));
vi.mock('@/lib/server-failures', () => ({ reportServerFailure: mocks.report }));

import { POST } from '@/app/api/internal/product-reconciliation/route';

const RUN_ID = '11111111-1111-4111-8111-111111111111';
const URL = 'https://app.renuvex.app/api/internal/product-reconciliation';

describe('product reconciliation continuation route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.verify.mockResolvedValue(true);
    mocks.process.mockResolvedValue({ runId: RUN_ID, status: 'pending', continuationRequired: false });
    mocks.dispatch.mockResolvedValue(true);
  });

  it('fails closed without a QStash signature', async () => {
    const response = await POST(new Request(URL, {
      method: 'POST',
      body: JSON.stringify({ runId: RUN_ID }),
    }));

    expect(response.status).toBe(401);
    expect(mocks.process).not.toHaveBeenCalled();
  });

  it('accepts only the signed opaque run id and dispatches a requested continuation', async () => {
    const body = JSON.stringify({ runId: RUN_ID });
    mocks.process.mockResolvedValue({ runId: RUN_ID, status: 'pending', continuationRequired: true });

    const response = await POST(new Request(URL, {
      method: 'POST',
      headers: { 'Upstash-Signature': 'signed' },
      body,
    }));

    expect(response.status).toBe(200);
    expect(mocks.verify).toHaveBeenCalledWith({ body, signature: 'signed', url: URL });
    expect(mocks.process).toHaveBeenCalledWith(RUN_ID);
    expect(mocks.dispatch).toHaveBeenCalledWith(RUN_ID);
  });

  it('rejects extra payload fields before processing the run', async () => {
    const response = await POST(new Request(URL, {
      method: 'POST',
      headers: { 'Upstash-Signature': 'signed' },
      body: JSON.stringify({ runId: RUN_ID, storeId: 'must-not-cross-the-boundary' }),
    }));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'invalid_run_id' });
    expect(mocks.process).not.toHaveBeenCalled();
  });

  it('returns a retryable failure when continuation dispatch fails', async () => {
    mocks.process.mockResolvedValue({ runId: RUN_ID, status: 'pending', continuationRequired: true });
    mocks.dispatch.mockResolvedValue(false);

    const response = await POST(new Request(URL, {
      method: 'POST',
      headers: { 'Upstash-Signature': 'signed' },
      body: JSON.stringify({ runId: RUN_ID }),
    }));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: 'product_reconciliation_dispatch_failed' });
  });
});
