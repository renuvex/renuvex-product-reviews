import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  widgetSettings: { findMany: vi.fn() },
}));
const authMock = vi.hoisted(() => ({ getUserFromRequest: vi.fn() }));
const accessMock = vi.hoisted(() => ({ getVideoFeatureAccess: vi.fn() }));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/auth-helpers', () => authMock);
vi.mock('@/lib/media/access', () => accessMock);

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  authMock.getUserFromRequest.mockReturnValue({ merchantId: 'store-1', authorizedAppId: 'app-1' });
  prismaMock.widgetSettings.findMany.mockResolvedValue([
    { widgetId: 'reviews', settings: { videoReviewsEnabled: true } },
  ]);
  accessMock.getVideoFeatureAccess.mockResolvedValue({
    enabled: false,
    reason: 'quota_exceeded',
    monthlyLimit: 5,
    reservedCount: 1,
    consumedCount: 4,
    usedCount: 5,
    remainingCount: 0,
  });
});

describe('GET /api/admin/settings', () => {
  it('returns video usage as read-only metadata beside editable settings', async () => {
    const { GET } = await import('@/app/api/admin/settings/route');
    const response = await GET(new Request('https://app.test/api/admin/settings'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.reviews.videoReviewsEnabled).toBe(true);
    expect(body.data.reviews).not.toHaveProperty('videoUsage');
    expect(body.meta.videoUsage).toEqual({
      monthlyLimit: 5,
      reservedCount: 1,
      consumedCount: 4,
      usedCount: 5,
      remainingCount: 0,
      effective: false,
      reason: 'quota_exceeded',
    });
  });
});
