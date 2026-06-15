import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  storeSettings: { findUnique: vi.fn() },
  widgetSettings: { findUnique: vi.fn() },
  storeVideoUsage: { findUnique: vi.fn() },
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));

function setProviderEnv() {
  process.env.VIDEO_REVIEWS_ENABLED = 'true';
  process.env.CLOUDFLARE_R2_ENDPOINT = 'https://account.eu.r2.cloudflarestorage.com';
  process.env.CLOUDFLARE_R2_ACCESS_KEY_ID = 'access-key';
  process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY = 'secret-key';
  process.env.CLOUDFLARE_R2_MASTER_BUCKET = 'master';
  process.env.CLOUDFLARE_R2_INGEST_BUCKET = 'ingest';
  process.env.CLOUDFLARE_R2_INGEST_PUBLIC_BASE_URL = 'https://media-ingest.example.com';
  process.env.CLOUDFLARE_ACCOUNT_ID = 'account';
  process.env.CLOUDFLARE_STREAM_API_TOKEN = 'stream-token';
  process.env.CLOUDFLARE_STREAM_CUSTOMER_CODE = 'customer';
  process.env.CLOUDFLARE_STREAM_WEBHOOK_SECRET = 'webhook-secret';
  process.env.QSTASH_TOKEN = 'qstash-token';
  process.env.QSTASH_CURRENT_SIGNING_KEY = 'current-key';
  process.env.QSTASH_NEXT_SIGNING_KEY = 'next-key';
  process.env.MEDIA_JOB_BASE_URL = 'https://app.example.com';
}

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  setProviderEnv();
  prismaMock.storeSettings.findUnique.mockResolvedValue({ videoMonthlyLimit: 5 });
  prismaMock.widgetSettings.findUnique.mockResolvedValue({ settings: { videoReviewsEnabled: true } });
  prismaMock.storeVideoUsage.findUnique.mockResolvedValue({ reservedCount: 0, consumedCount: 0 });
});

describe('video feature access', () => {
  it('resolves gate reasons in a stable order', async () => {
    const { resolveVideoFeatureAccess } = await import('@/lib/media/access');
    const base = {
      globalEnabled: true,
      storeExists: true,
      merchantEnabled: true,
      monthlyLimit: 5,
      reservedCount: 1,
      consumedCount: 2,
      providerConfigured: true,
    };

    expect(resolveVideoFeatureAccess({ ...base, globalEnabled: false }).reason).toBe('global_disabled');
    expect(resolveVideoFeatureAccess({ ...base, merchantEnabled: false }).reason).toBe('merchant_disabled');
    expect(resolveVideoFeatureAccess({ ...base, monthlyLimit: 0 }).reason).toBe('quota_disabled');
    expect(resolveVideoFeatureAccess({ ...base, reservedCount: 1, consumedCount: 4 }).reason).toBe('quota_exceeded');
    expect(resolveVideoFeatureAccess({ ...base, providerConfigured: false }).reason).toBe('provider_unavailable');
    expect(resolveVideoFeatureAccess(base)).toMatchObject({ enabled: true, reason: 'enabled', usedCount: 3, remainingCount: 2 });
  });

  it('treats a missing monthly usage row as zero usage', async () => {
    prismaMock.storeVideoUsage.findUnique.mockResolvedValue(null);
    const { getVideoFeatureAccess } = await import('@/lib/media/access');

    await expect(getVideoFeatureAccess('store-1', new Date('2026-06-15T12:00:00.000Z'))).resolves.toMatchObject({
      enabled: true,
      reason: 'enabled',
      monthlyLimit: 5,
      reservedCount: 0,
      consumedCount: 0,
      usedCount: 0,
      remainingCount: 5,
    });
    expect(prismaMock.storeVideoUsage.findUnique).toHaveBeenCalledWith(expect.objectContaining({
      where: { storeId_month: { storeId: 'store-1', month: new Date('2026-06-01T00:00:00.000Z') } },
    }));
  });

  it('closes capability when reserved plus consumed reaches the limit', async () => {
    prismaMock.storeVideoUsage.findUnique.mockResolvedValue({ reservedCount: 1, consumedCount: 4 });
    const { getVideoFeatureAccess } = await import('@/lib/media/access');

    await expect(getVideoFeatureAccess('store-1')).resolves.toMatchObject({
      enabled: false,
      reason: 'quota_exceeded',
      usedCount: 5,
      remainingCount: 0,
    });
  });

  it('reports provider_unavailable without exposing missing configuration details', async () => {
    delete process.env.CLOUDFLARE_STREAM_API_TOKEN;
    const { getVideoFeatureAccess } = await import('@/lib/media/access');

    await expect(getVideoFeatureAccess('store-1')).resolves.toMatchObject({
      enabled: false,
      reason: 'provider_unavailable',
    });
  });
});
