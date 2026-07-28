import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  authenticateIkasAdminRequest: vi.fn(),
  checkFixedWindowRateLimit: vi.fn(),
  createOrResume: vi.fn(),
  execute: vi.fn(),
  getRun: vi.fn(),
}));

vi.mock('@/lib/auth-helpers', () => ({
  authenticateIkasAdminRequest: mocks.authenticateIkasAdminRequest,
}));
vi.mock('@/lib/public-rate-limit', () => ({ checkFixedWindowRateLimit: mocks.checkFixedWindowRateLimit }));
vi.mock('@/lib/prisma', () => ({ prisma: {} }));
vi.mock('@/lib/review-email/data-subject', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/review-email/data-subject')>();
  return {
    ...actual,
    createOrResumeReviewEmailDataSubjectRun: mocks.createOrResume,
    executeReviewEmailDataSubjectErasure: mocks.execute,
    getReviewEmailDataSubjectRun: mocks.getRun,
  };
});

import { GET, POST } from '@/app/api/ikas/review-email-data-subject/route';
import { buildDataSubjectRequestDigest } from '@/lib/review-email/data-subject';

function request(body: unknown, idempotencyKey = '11111111-1111-4111-8111-111111111111') {
  return new Request('https://app.renuvex.app/api/ikas/review-email-data-subject', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
    body: JSON.stringify(body),
  });
}

describe('review email data-subject route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.authenticateIkasAdminRequest.mockResolvedValue({
      ok: true,
      context: {
        principal: {
          merchantId: 'store-1',
          authorizedAppId: 'app-1',
          generation: 1,
          stateVersion: 1,
        },
        authToken: {},
      },
    });
    mocks.checkFixedWindowRateLimit.mockResolvedValue({ allowed: true, retryAfterSec: 0 });
    mocks.createOrResume.mockResolvedValue({
      run: { id: '22222222-2222-4222-8222-222222222222' },
    });
    mocks.execute.mockResolvedValue({ runId: '22222222-2222-4222-8222-222222222222', status: 'succeeded', rowCounts: {} });
  });

  it('uses only the JWT tenant and enforces the explicit confirmation contract', async () => {
    const response = await POST(request({
      action: 'erase',
      email: 'Case@example.com',
      confirmation: 'ERASE_REVIEW_EMAIL_DATA',
    }) as never);

    expect(response.status).toBe(200);
    expect(mocks.createOrResume).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
      storeId: 'store-1',
      authorizedAppId: 'app-1',
      idempotencyKey: '11111111-1111-4111-8111-111111111111',
    }));
    expect(mocks.execute).toHaveBeenCalledWith('22222222-2222-4222-8222-222222222222');
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(response.headers.get('Pragma')).toBe('no-cache');
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
  });

  it('derives the request digest from a protected subject hash rather than raw email', () => {
    const digest = buildDataSubjectRequestDigest({ action: 'erase', exactSubjectHash: 'h2e:7:protected-digest' });
    expect(digest).toMatch(/^[0-9a-f]{64}$/);
    expect(digest).not.toBe(buildDataSubjectRequestDigest({ action: 'erase', exactSubjectHash: 'Case@example.com' }));
  });

  it('rejects a body-supplied storeId and an invalid idempotency key', async () => {
    const bodyWithTenant = await POST(request({
      action: 'erase',
      email: 'Case@example.com',
      confirmation: 'ERASE_REVIEW_EMAIL_DATA',
      storeId: 'other-store',
    }) as never);
    expect(bodyWithTenant.status).toBe(400);
    expect(mocks.createOrResume).not.toHaveBeenCalled();

    const invalidKey = await POST(request({
      action: 'erase',
      email: 'Case@example.com',
      confirmation: 'ERASE_REVIEW_EMAIL_DATA',
    }, 'not-a-uuid') as never);
    expect(invalidKey.status).toBe(400);
  });

  it('scopes run status lookup to the JWT merchant', async () => {
    mocks.getRun.mockResolvedValue({ id: '22222222-2222-4222-8222-222222222222', status: 'succeeded' });
    const response = await GET(new Request(
      'https://app.renuvex.app/api/ikas/review-email-data-subject?runId=22222222-2222-4222-8222-222222222222',
    ) as never);
    expect(response.status).toBe(200);
    expect(mocks.getRun).toHaveBeenCalledWith('store-1', 'app-1', '22222222-2222-4222-8222-222222222222');
  });
});
