import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ verify: vi.fn(), process: vi.fn() }));

vi.mock('@upstash/qstash', () => ({
  Receiver: class Receiver { verify = mocks.verify; },
  SignatureError: class SignatureError extends Error {},
}));
vi.mock('@/lib/media/config', () => ({
  getQStashMediaConfig: vi.fn(() => ({ token: 'token', currentSigningKey: 'current', nextSigningKey: 'next' })),
  MediaConfigError: class MediaConfigError extends Error {},
}));
vi.mock('@/lib/review-email/erasure', () => ({ processStoreDataErasureRun: mocks.process }));

import { POST } from '@/app/api/internal/review-email/store-erasure/route';

describe('review email store erasure continuation route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.verify.mockResolvedValue(true);
    mocks.process.mockResolvedValue({ runId: '11111111-1111-4111-8111-111111111111', state: 'pending' });
  });

  it('fails closed without a QStash signature', async () => {
    const response = await POST(new Request('https://app.renuvex.app/api/internal/review-email/store-erasure', {
      method: 'POST', body: JSON.stringify({ runId: '11111111-1111-4111-8111-111111111111' }),
    }));
    expect(response.status).toBe(401);
    expect(mocks.process).not.toHaveBeenCalled();
  });

  it('verifies the raw body and passes only the opaque run id to the DB-owned runner', async () => {
    const body = JSON.stringify({ runId: '11111111-1111-4111-8111-111111111111' });
    const url = 'https://app.renuvex.app/api/internal/review-email/store-erasure';
    const response = await POST(new Request(url, {
      method: 'POST', headers: { 'Upstash-Signature': 'signed' }, body,
    }));
    expect(response.status).toBe(200);
    expect(mocks.verify).toHaveBeenCalledWith({ body, signature: 'signed', url });
    expect(mocks.process).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111');
  });
});
