import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  review: { groupBy: vi.fn() },
}));
const authMock = vi.hoisted(() => ({
  authenticateIkasAdminRequest: vi.fn(),
  ikasAdminAuthenticationResponse: vi.fn(),
}));
const failureMock = vi.hoisted(() => ({ reportServerFailure: vi.fn() }));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/auth-helpers', () => authMock);
vi.mock('@/lib/server-failures', () => failureMock);

beforeEach(() => {
  vi.clearAllMocks();
  authMock.authenticateIkasAdminRequest.mockResolvedValue({
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
});

describe('GET /api/admin/reviews/summary', () => {
  it('uses one tenant-scoped groupBy and includes unknown statuses only in total', async () => {
    prismaMock.review.groupBy.mockResolvedValue([
      { status: 'pending', _count: { _all: 4 } },
      { status: 'approved', _count: { _all: 3 } },
      { status: 'rejected', _count: { _all: 2 } },
      { status: 'legacy', _count: { _all: 1 } },
    ]);
    const { GET } = await import('@/app/api/admin/reviews/summary/route');

    const response = await GET(new Request('https://app.test/api/admin/reviews/summary'));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      data: { pending: 4, approved: 3, rejected: 2, total: 10 },
    });
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(prismaMock.review.groupBy).toHaveBeenCalledOnce();
    expect(prismaMock.review.groupBy).toHaveBeenCalledWith({
      by: ['status'],
      where: { storeId: 'store-1' },
      _count: { _all: true },
    });
  });

  it('returns a fixed no-store error without exposing the database failure', async () => {
    prismaMock.review.groupBy.mockRejectedValue(new Error('credential-canary'));
    const { GET } = await import('@/app/api/admin/reviews/summary/route');

    const response = await GET(new Request('https://app.test/api/admin/reviews/summary'));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: 'admin_review_summary_failed' });
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(failureMock.reportServerFailure).toHaveBeenCalledWith('admin_review_summary_failed');
  });
});
