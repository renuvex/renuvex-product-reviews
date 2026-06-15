import { beforeEach, describe, expect, it, vi } from 'vitest';

const accessMock = vi.hoisted(() => ({ getVideoFeatureAccess: vi.fn() }));
const rateLimitMock = vi.hoisted(() => ({
  checkFixedWindowRateLimit: vi.fn(),
  getClientIp: vi.fn(),
}));
vi.mock('@/lib/media/access', () => accessMock);
vi.mock('@/lib/public-rate-limit', () => rateLimitMock);

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  accessMock.getVideoFeatureAccess.mockResolvedValue({ enabled: true, reason: 'enabled' });
  rateLimitMock.getClientIp.mockReturnValue('203.0.113.10');
  rateLimitMock.checkFixedWindowRateLimit.mockResolvedValue({ allowed: true, retryAfterSec: 60 });
});

describe('GET /api/public/upload/video/capability', () => {
  it('returns only client-safe capability fields without caching', async () => {
    accessMock.getVideoFeatureAccess.mockResolvedValue({
      enabled: false,
      reason: 'quota_exceeded',
      monthlyLimit: 5,
      reservedCount: 1,
      consumedCount: 4,
      usedCount: 5,
      remainingCount: 0,
      providerAssetId: 'must-not-leak',
    });
    const { GET } = await import('@/app/api/public/upload/video/capability/route');
    const response = await GET(new Request('https://app.test/api/public/upload/video/capability?storeId=store-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(body).toEqual({ data: { enabled: false, reason: 'quota_exceeded' } });
    expect(rateLimitMock.checkFixedWindowRateLimit).toHaveBeenCalledWith({
      key: expect.stringMatching(/^renuvex_pr_video_cap:[a-f0-9]{32}$/),
      max: 60,
      windowSec: 60,
      label: 'video-capability',
    });
  });

  it('returns 404 for an unknown store and fails closed on missing input', async () => {
    const { GET } = await import('@/app/api/public/upload/video/capability/route');
    const missing = await GET(new Request('https://app.test/api/public/upload/video/capability'));
    expect(missing.status).toBe(400);
    expect(rateLimitMock.checkFixedWindowRateLimit).not.toHaveBeenCalled();

    accessMock.getVideoFeatureAccess.mockResolvedValue({ enabled: false, reason: 'store_missing' });
    const unknown = await GET(new Request('https://app.test/api/public/upload/video/capability?storeId=missing'));
    expect(unknown.status).toBe(404);
    expect(unknown.headers.get('Cache-Control')).toBe('no-store');
  });

  it('returns the enabled reason and keeps failures client-safe', async () => {
    const { GET } = await import('@/app/api/public/upload/video/capability/route');
    const enabled = await GET(new Request('https://app.test/api/public/upload/video/capability?storeId=store-1'));
    expect(await enabled.json()).toEqual({ data: { enabled: true, reason: 'enabled' } });

    accessMock.getVideoFeatureAccess.mockRejectedValueOnce(new Error('database unavailable'));
    const unavailable = await GET(new Request('https://app.test/api/public/upload/video/capability?storeId=store-1'));
    expect(unavailable.status).toBe(503);
    expect(unavailable.headers.get('Cache-Control')).toBe('no-store');
    expect(await unavailable.json()).toEqual({ error: 'capability_unavailable' });
  });

  it('rate limits capability probes before reading video access state', async () => {
    rateLimitMock.checkFixedWindowRateLimit.mockResolvedValueOnce({ allowed: false, retryAfterSec: 42 });
    const { GET } = await import('@/app/api/public/upload/video/capability/route');
    const response = await GET(new Request('https://app.test/api/public/upload/video/capability?storeId=store-1', {
      headers: { 'x-forwarded-for': '198.51.100.10' },
    }));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(response.headers.get('Retry-After')).toBe('42');
    expect(body).toEqual({ error: 'rate_limited' });
    expect(accessMock.getVideoFeatureAccess).not.toHaveBeenCalled();
  });
});
