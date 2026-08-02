import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  $queryRaw: vi.fn(),
  $transaction: vi.fn(),
  storeSettings: {
    findUnique: vi.fn(),
  },
  widgetSettings: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
  productSnapshot: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
  },
  productReviewSummary: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    upsert: vi.fn(),
  },
  review: {
    findMany: vi.fn(),
    count: vi.fn(),
    groupBy: vi.fn(),
    findFirst: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    aggregate: vi.fn(),
    create: vi.fn(),
  },
  reviewMedia: {
    create: vi.fn(),
    createMany: vi.fn(),
    updateMany: vi.fn(),
    findMany: vi.fn(),
    deleteMany: vi.fn(),
  },
  pendingReviewImage: {
    findMany: vi.fn(),
    findFirst: vi.fn(),
    findUnique: vi.fn(),
    upsert: vi.fn(),
    update: vi.fn(),
    updateMany: vi.fn(),
    deleteMany: vi.fn(),
  },
  videoUploadSession: {
    findUnique: vi.fn(),
    updateMany: vi.fn(),
  },
  mediaProviderJob: {
    upsert: vi.fn(),
    updateMany: vi.fn(),
  },
}));

const afterMock = vi.hoisted(() => vi.fn((callback: () => unknown) => callback));
const syncStorefrontThemeForTokenMock = vi.hoisted(() => vi.fn());
const getByMerchantIdMock = vi.hoisted(() => vi.fn());
const checkFixedWindowRateLimitMock = vi.hoisted(() => vi.fn());
const resolveActiveReviewRequestSessionMock = vi.hoisted(() => vi.fn());
const claimReviewRequestForSubmissionMock = vi.hoisted(() => vi.fn());
const redisMock = vi.hoisted(() => ({
  incr: vi.fn(),
  expire: vi.fn(),
}));
const sentryCaptureExceptionMock = vi.hoisted(() => vi.fn());
const authenticateIkasAdminRequestMock = vi.hoisted(() => vi.fn());
const ikasAdminAuthorizationLostResponseMock = vi.hoisted(() => vi.fn());
const requireActiveInstallationFenceMock = vi.hoisted(() => vi.fn());
const awsImageMock = vi.hoisted(() => ({
  AWS_REVIEW_IMAGE_PROVIDER: 'aws_s3',
  buildAwsReviewImagePublicId: (storeId: string, assetId: string) => `aws_s3:${storeId}:${assetId}`,
  base64Sha256ToHex: (value: string) => Buffer.from(value, 'base64').toString('hex'),
  normalizeAwsReviewImageContentType: vi.fn((value: unknown) => (value === 'image/jpeg' || value === 'image/png' || value === 'image/webp' ? value : null)),
  normalizeAwsReviewImageBytes: vi.fn((value: unknown) => (Number.isInteger(value) && Number(value) > 0 && Number(value) <= 10 * 1024 * 1024 ? Number(value) : null)),
  normalizeAwsReviewImageChecksum: vi.fn((value: unknown) => (typeof value === 'string' && value.length >= 44 ? value : null)),
  createAwsReviewImageUploadIntent: vi.fn(),
  sanitizeAwsReviewImageRef: vi.fn((value: unknown) => {
    const record = value as Record<string, unknown>;
    return record?.provider === 'aws_s3' &&
      typeof record.assetId === 'string' &&
      typeof record.uploadSessionId === 'string' &&
      typeof record.objectKey === 'string' &&
      typeof record.contentType === 'string' &&
      typeof record.bytes === 'number' &&
      record.checksumAlgorithm === 'SHA256' &&
      typeof record.checksumSha256 === 'string'
      ? record
      : null;
  }),
  sanitizeAwsReviewImageRefs: vi.fn((value: unknown) => {
    if (value === undefined || value === null) return { ok: true, refs: [] };
    if (!Array.isArray(value)) return { ok: false, error: 'not_array' };
    if (value.length > 3) return { ok: false, error: 'too_many' };
    const refs: unknown[] = [];
    const seen = new Set<string>();
    for (const item of value) {
      const ref = awsImageMock.sanitizeAwsReviewImageRef(item) as {
        assetId: string;
        uploadSessionId: string;
      } | null;
      if (!ref) return { ok: false, error: 'invalid_ref' };
      const key = `${ref.assetId}:${ref.uploadSessionId}`;
      if (seen.has(ref.assetId) || seen.has(ref.uploadSessionId) || seen.has(key)) return { ok: false, error: 'duplicate_ref' };
      seen.add(ref.assetId);
      seen.add(ref.uploadSessionId);
      seen.add(key);
      refs.push(ref);
    }
    return { ok: true, refs };
  }),
  validateAwsReviewImageOriginal: vi.fn(),
  generateAwsReviewImagePrivateVariants: vi.fn(),
  publishAwsReviewImageVariants: vi.fn(),
  revokeAwsReviewImagePublicVariants: vi.fn(),
  buildAwsReviewImagePublicDescriptor: vi.fn((manifest: unknown) => {
    const record = manifest as { url?: string; thumbnailUrl?: string; variants?: unknown[] } | null;
    if (!record?.url || !record.thumbnailUrl) return null;
    return { url: record.url, thumbnailUrl: record.thumbnailUrl, variants: Array.isArray(record.variants) ? record.variants : [] };
  }),
  isTrustedAwsReviewImagePublicUrl: vi.fn((value: unknown) => (
    typeof value === 'string' &&
    /^https:\/\/media\.renuvex\.app\/reviews\/[0-9a-f-]{36}\/[A-Za-z0-9_]+\.(?:webp|jpeg)$/i.test(value)
  )),
}));

vi.mock('next/server', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/server')>();
  return {
    ...actual,
    after: afterMock,
  };
});

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

vi.mock('@/lib/auth-helpers', () => ({
  authenticateIkasAdminRequest: authenticateIkasAdminRequestMock,
  ikasAdminAuthorizationLostResponse: ikasAdminAuthorizationLostResponseMock,
  ikasAdminAuthenticationResponse: vi.fn(),
}));

vi.mock('@/lib/ikas-installation-lifecycle', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/ikas-installation-lifecycle')>();
  return {
    ...actual,
    requireActiveIkasStoreInstallationFence: requireActiveInstallationFenceMock,
  };
});

vi.mock('@/lib/storefront-theme-sync', () => ({
  syncStorefrontThemeForToken: syncStorefrontThemeForTokenMock,
}));

vi.mock('@/models/auth-token/manager', () => ({
  AuthTokenManager: {
    getByMerchantId: getByMerchantIdMock,
  },
}));

vi.mock('@/lib/public-rate-limit', () => ({
  checkFixedWindowRateLimit: checkFixedWindowRateLimitMock,
  getClientIp: () => '127.0.0.1',
}));

vi.mock('@/lib/review-email/tokens', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/review-email/tokens')>();
  return {
    ...actual,
    resolveActiveReviewRequestSession: resolveActiveReviewRequestSessionMock,
    claimReviewRequestForSubmission: claimReviewRequestForSubmissionMock,
  };
});

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(function Redis() {
    return redisMock;
  }),
}));

vi.mock('@sentry/nextjs', () => ({
  captureException: sentryCaptureExceptionMock,
}));

vi.mock('@/lib/media/providers/aws-review-image', () => awsImageMock);

const OZY_THEME_ID = '57225e07-aa38-4d38-9688-f6730ee16143';
const AWS_IMAGE_ASSET_ID = '11111111-1111-4111-8111-111111111111';
const SECOND_AWS_IMAGE_ASSET_ID = '22222222-2222-4222-8222-222222222222';
const AWS_IMAGE_UPLOAD_SESSION_ID = '33333333-3333-4333-8333-333333333333';
const SECOND_AWS_IMAGE_UPLOAD_SESSION_ID = '44444444-4444-4444-8444-444444444444';
const AWS_IMAGE_CHECKSUM = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
const AWS_REVIEW_IMAGE_URL = `https://media.renuvex.app/reviews/${AWS_IMAGE_ASSET_ID}/w1200.jpeg`;
const SECOND_AWS_REVIEW_IMAGE_URL = `https://media.renuvex.app/reviews/${SECOND_AWS_IMAGE_ASSET_ID}/w1200.jpeg`;
const AWS_REVIEW_IMAGE_THUMB_URL = `https://media.renuvex.app/reviews/${AWS_IMAGE_ASSET_ID}/thumb_320x427.webp`;

function activeAdminAuth() {
  return {
    ok: true as const,
    context: {
      principal: {
        merchantId: 'store-1',
        authorizedAppId: 'app-1',
        generation: 1,
        stateVersion: 1,
      },
      authToken: {
        merchantId: 'store-1',
        authorizedAppId: 'app-1',
        salesChannelId: null,
        accessToken: 'access-token',
        tokenType: 'Bearer',
        expiresIn: 3600,
        expireDate: '2026-07-28T12:00:00.000Z',
        refreshToken: 'refresh-token',
      },
    },
  };
}

function awsImageRef(overrides: Record<string, unknown> = {}) {
  return {
    provider: 'aws_s3',
    assetId: AWS_IMAGE_ASSET_ID,
    uploadSessionId: AWS_IMAGE_UPLOAD_SESSION_ID,
    objectKey: `review-images/v1/private/stores/store-1/assets/${AWS_IMAGE_ASSET_ID}/original.jpg`,
    contentType: 'image/jpeg',
    bytes: 450000,
    checksumAlgorithm: 'SHA256',
    checksumSha256: AWS_IMAGE_CHECKSUM,
    ...overrides,
  };
}

function awsVariantManifest(overrides: Record<string, unknown> = {}) {
  return {
    url: AWS_REVIEW_IMAGE_URL,
    thumbnailUrl: AWS_REVIEW_IMAGE_THUMB_URL,
    variants: [
      { id: 'w1200', format: 'jpeg', width: 1200, height: 1600, url: AWS_REVIEW_IMAGE_URL },
      { id: 'thumb_320x427', format: 'webp', width: 320, height: 427, url: AWS_REVIEW_IMAGE_THUMB_URL },
    ],
    ...overrides,
  };
}

function stableOzyThemeState() {
  const now = new Date().toISOString();
  return {
    schemaVersion: 2,
    syncStatus: 'stable',
    stable: {
      activeStorefrontId: 'storefront-1',
      activeStorefrontName: 'dev-store',
      activeStorefrontThemeId: 'storefront-theme-1',
      activeThemeId: OZY_THEME_ID,
      activeThemeVersionId: 'theme-version-1',
      activeThemeName: 'Ozy renamed',
      mainStorefrontThemeId: 'storefront-theme-1',
      themeAdapterKey: 'ozy',
      adapterSource: 'auto',
      adapterMatchedBy: 'theme_id',
      detectedAt: now,
    },
    pending: null,
    lastCheckedAt: now,
    lastChangedAt: now,
    verificationDueAt: null,
    verifiedAt: now,
    reason: 'cron',
  };
}

function staleOzyThemeState() {
  return {
    ...stableOzyThemeState(),
    lastCheckedAt: new Date(Date.now() - 31 * 60 * 1000).toISOString(),
  };
}

function validReviewPayload(overrides: Record<string, unknown> = {}) {
  return {
    storeId: 'store-1',
    productId: 'product-1',
    author: 'Mert',
    rating: 5,
    title: 'Great',
    comment: 'Works well',
    images: [],
    ...overrides,
  };
}

function summaryRow(overrides: Record<string, unknown> = {}) {
  return {
    id: 'summary-1',
    storeId: 'store-1',
    productId: 'product-1',
    approvedCount: 1,
    ratingSum: 5,
    averageRating: 5,
    rating1Count: 0,
    rating2Count: 0,
    rating3Count: 0,
    rating4Count: 0,
    rating5Count: 1,
    photoReviewCount: 0,
    photoRating1Count: 0,
    photoRating2Count: 0,
    photoRating3Count: 0,
    photoRating4Count: 0,
    photoRating5Count: 0,
    mediaReviewCount: 0,
    mediaRating1Count: 0,
    mediaRating2Count: 0,
    mediaRating3Count: 0,
    mediaRating4Count: 0,
    mediaRating5Count: 0,
    lastReviewAt: new Date('2026-05-28T00:00:00.000Z'),
    createdAt: new Date('2026-05-28T00:00:00.000Z'),
    updatedAt: new Date('2026-05-28T00:00:00.000Z'),
    ...overrides,
  };
}

function setupVerifiedReviewTarget(autoApprove: unknown = 'manual') {
  redisMock.incr.mockResolvedValue(1);
  prismaMock.storeSettings.findUnique.mockResolvedValue({ storeId: 'store-1' });
  prismaMock.productSnapshot.findUnique.mockResolvedValue({
    productId: 'product-1',
    slug: 'premium-shorts',
    name: 'Premium Shorts',
  });
  prismaMock.widgetSettings.findUnique.mockResolvedValue({
    settings: { autoApprove },
  });
  prismaMock.review.create.mockImplementation(async (args) => ({
    id: 'review-created',
    status: args.data.status,
    storeId: args.data.storeId,
    productId: args.data.productId,
    rating: args.data.rating,
    images: args.data.images,
    hasImages: args.data.hasImages,
    createdAt: new Date('2026-05-28T00:00:00.000Z'),
  }));
  prismaMock.$transaction.mockImplementation(async (callback) => callback({
    review: prismaMock.review,
    reviewMedia: prismaMock.reviewMedia,
    productReviewSummary: prismaMock.productReviewSummary,
    pendingReviewImage: prismaMock.pendingReviewImage,
    videoUploadSession: prismaMock.videoUploadSession,
    mediaProviderJob: prismaMock.mediaProviderJob,
  }));
}

async function postPublicReview(payload: unknown, headers: Record<string, string> = {}) {
  const { POST } = await import('@/app/api/public/reviews/route');
  return POST(new Request('https://app.test/api/public/reviews', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': '203.0.113.5',
      ...headers,
    },
    body: JSON.stringify(payload),
  }));
}

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  prismaMock.$queryRaw.mockReset();
  process.env.REVIEW_CURSOR_SECRET = 'unit-test-review-cursor-secret';
  process.env.REVIEW_REQUEST_PUBLIC_BASE_URL = 'https://reviews.renuvex.app';
  delete process.env.REVIEW_EMAIL_ENABLED;
  delete process.env.VIDEO_REVIEWS_ENABLED;
  prismaMock.storeSettings.findUnique.mockReset();
  prismaMock.widgetSettings.findMany.mockReset();
  prismaMock.widgetSettings.findUnique.mockReset();
  prismaMock.productSnapshot.findUnique.mockReset();
  prismaMock.productSnapshot.findMany.mockReset();
  prismaMock.productReviewSummary.findMany.mockReset();
  prismaMock.productReviewSummary.findUnique.mockReset();
  prismaMock.productReviewSummary.create.mockReset();
  prismaMock.productReviewSummary.update.mockReset();
  prismaMock.productReviewSummary.upsert.mockReset();
  prismaMock.review.findMany.mockReset();
  prismaMock.review.count.mockReset();
  prismaMock.review.groupBy.mockReset();
  prismaMock.review.findFirst.mockReset();
  prismaMock.review.update.mockReset();
  prismaMock.review.delete.mockReset();
  prismaMock.review.aggregate.mockReset();
  prismaMock.review.create.mockReset();
  prismaMock.reviewMedia.create.mockReset();
  prismaMock.reviewMedia.createMany.mockReset();
  prismaMock.reviewMedia.updateMany.mockReset();
  prismaMock.reviewMedia.findMany.mockReset();
  prismaMock.reviewMedia.deleteMany.mockReset();
  prismaMock.pendingReviewImage.findMany.mockReset();
  prismaMock.pendingReviewImage.findMany.mockResolvedValue([]);
  prismaMock.pendingReviewImage.findFirst.mockReset();
  prismaMock.pendingReviewImage.findFirst.mockResolvedValue(null);
  prismaMock.pendingReviewImage.findUnique.mockReset();
  prismaMock.pendingReviewImage.findUnique.mockResolvedValue(null);
  prismaMock.pendingReviewImage.upsert.mockReset();
  prismaMock.pendingReviewImage.update.mockReset();
  prismaMock.pendingReviewImage.updateMany.mockReset();
  prismaMock.pendingReviewImage.deleteMany.mockReset();
  prismaMock.videoUploadSession.findUnique.mockReset();
  prismaMock.videoUploadSession.updateMany.mockReset();
  prismaMock.mediaProviderJob.upsert.mockReset();
  prismaMock.$transaction.mockReset();
  afterMock.mockClear();
  syncStorefrontThemeForTokenMock.mockReset();
  getByMerchantIdMock.mockReset();
  checkFixedWindowRateLimitMock.mockReset();
  resolveActiveReviewRequestSessionMock.mockReset();
  claimReviewRequestForSubmissionMock.mockReset();
  redisMock.incr.mockReset();
  redisMock.expire.mockReset();
  sentryCaptureExceptionMock.mockReset();
  authenticateIkasAdminRequestMock.mockReset();
  ikasAdminAuthorizationLostResponseMock.mockReset();
  ikasAdminAuthorizationLostResponseMock.mockImplementation(() => new Response(
    JSON.stringify({ error: 'unauthorized' }),
    {
      status: 401,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'private, no-store',
      },
    },
  ));
  requireActiveInstallationFenceMock.mockReset();
  requireActiveInstallationFenceMock.mockResolvedValue({
    storeId: 'store-1',
    authorizedAppId: 'app-1',
    generation: 1,
    stateVersion: 1,
    status: 'active',
  });
  awsImageMock.createAwsReviewImageUploadIntent.mockReset();
  awsImageMock.validateAwsReviewImageOriginal.mockReset();
  awsImageMock.validateAwsReviewImageOriginal.mockResolvedValue(Buffer.from('image'));
  awsImageMock.generateAwsReviewImagePrivateVariants.mockReset();
  awsImageMock.generateAwsReviewImagePrivateVariants.mockResolvedValue({
    source: { width: 1200, height: 1600 },
    generatedAt: '2026-06-08T00:00:00.000Z',
    ...awsVariantManifest(),
  });
  awsImageMock.publishAwsReviewImageVariants.mockReset();
  awsImageMock.publishAwsReviewImageVariants.mockResolvedValue(undefined);
  awsImageMock.revokeAwsReviewImagePublicVariants.mockReset();
  awsImageMock.revokeAwsReviewImagePublicVariants.mockResolvedValue(undefined);
});

describe('/api/public/settings', () => {
  it('rejects missing publicApiKey without touching storage', async () => {
    const { GET } = await import('@/app/api/public/settings/route');

    const response = await GET(new Request('https://app.test/api/public/settings'));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('Missing publicApiKey');
    expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
  });

  it('returns sanitized widget settings and public theme runtime', async () => {
    prismaMock.storeSettings.findUnique.mockResolvedValue({
      storeId: 'store-1',
      storefrontTheme: stableOzyThemeState(),
      videoMonthlyLimit: 10,
    });
    prismaMock.widgetSettings.findMany.mockResolvedValue([
      {
        widgetId: 'reviews',
        settings: {
          enabled: true,
          summaryLayout: 'compact',
          reviewLayout: 'gallery',
          recommendationLabel: 'müşteriler öneriyor',
          videoReviewsEnabled: true,
          unknownKey: 'drop-me',
        },
      },
      {
        widgetId: 'badge',
        settings: {
          enabled: false,
          size: 'large',
        },
      },
      { widgetId: 'carousel', settings: { injected: true } },
      { widgetId: 'unknown', settings: { injected: true } },
    ]);

    const { GET } = await import('@/app/api/public/settings/route');
    const response = await GET(new Request('https://app.test/api/public/settings?publicApiKey=store-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.widgets.reviews.summaryLayout).toBe('compact');
    expect(body.widgets.reviews.reviewLayout).toBe('gallery');
    expect(body.widgets.reviews.recommendationLabel).toBe('müşteriler öneriyor');
    expect(body.widgets.reviews.videoReviewsEnabled).toBe(false);
    expect(body.widgets.reviews.unknownKey).toBeUndefined();
    expect(body.widgets.badge.enabled).toBe(false);
    expect(body.widgets.carousel).toBeUndefined();
    expect(body.widgets.unknown).toBeUndefined();
    expect(body.runtime).toEqual({
      themeAdapterKey: 'ozy',
      themeAdapterSource: 'auto',
      autoPlacementEnabled: true,
      reviewsMountEnabled: true,
      themeSyncDue: false,
    });
    expect(afterMock).not.toHaveBeenCalled();
    expect(prismaMock.widgetSettings.findMany).toHaveBeenCalledWith({
      where: { storeId: 'store-1', widgetId: { in: ['reviews', 'badge'] } },
    });
  });

  it('exposes themeSyncDue without scheduling storefront theme sync', async () => {
    prismaMock.storeSettings.findUnique.mockResolvedValue({
      storeId: 'store-1',
      storefrontTheme: staleOzyThemeState(),
      videoMonthlyLimit: 10,
    });
    prismaMock.widgetSettings.findMany.mockResolvedValue([]);

    const { GET } = await import('@/app/api/public/settings/route');
    const response = await GET(new Request('https://app.test/api/public/settings?publicApiKey=store-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.runtime.themeSyncDue).toBe(true);
    expect(afterMock).not.toHaveBeenCalled();
    expect(getByMerchantIdMock).not.toHaveBeenCalled();
    expect(syncStorefrontThemeForTokenMock).not.toHaveBeenCalled();
  });

  it('exposes video capability only when global, merchant, and quota gates are all open', async () => {
    process.env.VIDEO_REVIEWS_ENABLED = 'true';
    prismaMock.storeSettings.findUnique.mockResolvedValue({
      storeId: 'store-1',
      storefrontTheme: stableOzyThemeState(),
      videoMonthlyLimit: 10,
    });
    prismaMock.widgetSettings.findMany.mockResolvedValue([{
      widgetId: 'reviews',
      settings: { videoReviewsEnabled: true },
    }]);
    const { GET } = await import('@/app/api/public/settings/route');

    const response = await GET(new Request('https://app.test/api/public/settings?publicApiKey=store-1'));
    const body = await response.json();

    expect(body.widgets.reviews.videoReviewsEnabled).toBe(true);
  });
});

describe('/api/public/storefront-theme/lazy-sync', () => {
  it('rejects invalid bodies before rate limit or storage', async () => {
    const { POST } = await import('@/app/api/public/storefront-theme/lazy-sync/route');

    const response = await POST(new Request('https://app.test/api/public/storefront-theme/lazy-sync', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ publicApiKey: '' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('invalid_public_api_key');
    expect(checkFixedWindowRateLimitMock).not.toHaveBeenCalled();
    expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
  });

  it('returns 204 for fresh theme state without reading auth token', async () => {
    checkFixedWindowRateLimitMock.mockResolvedValue({ allowed: true, retryAfterSec: 600 });
    prismaMock.storeSettings.findUnique.mockResolvedValue({
      storeId: 'store-1',
      storefrontTheme: stableOzyThemeState(),
    });
    const { POST } = await import('@/app/api/public/storefront-theme/lazy-sync/route');

    const response = await POST(new Request('https://app.test/api/public/storefront-theme/lazy-sync', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.9' },
      body: JSON.stringify({ publicApiKey: 'store-1' }),
    }));

    expect(response.status).toBe(204);
    expect(checkFixedWindowRateLimitMock).toHaveBeenCalledWith({
      key: 'renuvex_pr_theme_lazy_sync:store-1:127.0.0.1',
      max: 10,
      windowSec: 600,
      label: 'storefront-theme-lazy-sync',
    });
    expect(getByMerchantIdMock).not.toHaveBeenCalled();
    expect(afterMock).not.toHaveBeenCalled();
  });

  it('schedules lazy storefront theme sync after accepting stale state', async () => {
    checkFixedWindowRateLimitMock.mockResolvedValue({ allowed: true, retryAfterSec: 600 });
    prismaMock.storeSettings.findUnique.mockResolvedValue({
      storeId: 'store-1',
      storefrontTheme: staleOzyThemeState(),
    });
    getByMerchantIdMock.mockResolvedValue({ merchantId: 'store-1', accessToken: 'redacted-token' });
    syncStorefrontThemeForTokenMock.mockResolvedValue({ changed: false });
    const { POST } = await import('@/app/api/public/storefront-theme/lazy-sync/route');

    const response = await POST(new Request('https://app.test/api/public/storefront-theme/lazy-sync', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ publicApiKey: 'store-1' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(202);
    expect(body.status).toBe('accepted');
    expect(afterMock).toHaveBeenCalledTimes(1);

    const scheduled = afterMock.mock.calls[0][0] as () => Promise<void>;
    await scheduled();

    expect(getByMerchantIdMock).toHaveBeenCalledWith('store-1');
    expect(syncStorefrontThemeForTokenMock).toHaveBeenCalledWith(
      { merchantId: 'store-1', accessToken: 'redacted-token' },
      { reason: 'lazy_storefront', persistUnchangedCheck: true },
    );
  });

  it('rate limits lazy sync before reading storefront theme state', async () => {
    checkFixedWindowRateLimitMock.mockResolvedValue({ allowed: false, retryAfterSec: 42 });
    const { POST } = await import('@/app/api/public/storefront-theme/lazy-sync/route');

    const response = await POST(new Request('https://app.test/api/public/storefront-theme/lazy-sync', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ publicApiKey: 'store-1' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('42');
    expect(body.error).toBe('rate_limited');
    expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
  });

  it('returns 404 for unknown stores', async () => {
    checkFixedWindowRateLimitMock.mockResolvedValue({ allowed: true, retryAfterSec: 600 });
    prismaMock.storeSettings.findUnique.mockResolvedValue(null);
    const { POST } = await import('@/app/api/public/storefront-theme/lazy-sync/route');

    const response = await POST(new Request('https://app.test/api/public/storefront-theme/lazy-sync', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ publicApiKey: 'missing-store' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.error).toBe('store_not_found');
    expect(afterMock).not.toHaveBeenCalled();
  });
});

describe('/api/public/ratings', () => {
  it('returns an empty data object for missing required query params', async () => {
    const { GET } = await import('@/app/api/public/ratings/route');

    const response = await GET(new Request('https://app.test/api/public/ratings?storeId=store-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ data: {} });
    expect(checkFixedWindowRateLimitMock).not.toHaveBeenCalled();
    expect(prismaMock.review.groupBy).not.toHaveBeenCalled();
    expect(prismaMock.productReviewSummary.findMany).not.toHaveBeenCalled();
  });

  it('dedupes product ids, checks rate limit, and formats averages', async () => {
    checkFixedWindowRateLimitMock.mockResolvedValue({ allowed: true });
    prismaMock.productReviewSummary.findMany.mockResolvedValue([
      summaryRow({ productId: 'product-1', approvedCount: 8, ratingSum: 36, averageRating: 4.5 }),
      summaryRow({ id: 'summary-2', productId: 'product-2', approvedCount: 1, ratingSum: 5, averageRating: 5 }),
    ]);
    const { GET } = await import('@/app/api/public/ratings/route');

    const response = await GET(new Request('https://app.test/api/public/ratings?storeId=store-1&productIds=product-1,product-1,product-2'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(checkFixedWindowRateLimitMock).toHaveBeenCalledWith(expect.objectContaining({
      key: 'renuvex_pr_ratings_rl:127.0.0.1',
      max: 300,
      windowSec: 60,
      label: 'public-ratings',
    }));
    expect(prismaMock.productReviewSummary.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        storeId: 'store-1',
        productId: { in: ['product-1', 'product-2'] },
      }),
    }));
    expect(prismaMock.review.groupBy).not.toHaveBeenCalled();
    expect(body).toEqual({
      data: {
        'product-1': { avg: '4.5', count: 8 },
        'product-2': { avg: '5.0', count: 1 },
      },
    });
  });

  it('returns no-store empty data when rate limited', async () => {
    checkFixedWindowRateLimitMock.mockResolvedValue({ allowed: false });
    const { GET } = await import('@/app/api/public/ratings/route');

    const response = await GET(new Request('https://app.test/api/public/ratings?storeId=store-1&productIds=product-1'));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(body).toEqual({ data: {} });
    expect(prismaMock.review.groupBy).not.toHaveBeenCalled();
    expect(prismaMock.productReviewSummary.findMany).not.toHaveBeenCalled();
  });
});

describe('/api/public/ratings-by-slug', () => {
  it('resolves current product ids by slug and reads aggregate summaries', async () => {
    checkFixedWindowRateLimitMock.mockResolvedValue({ allowed: true });
    prismaMock.productSnapshot.findMany.mockResolvedValue([
      { slug: 'premium-shorts', productId: 'product-1' },
      { slug: 'linen-shirt', productId: 'product-2' },
    ]);
    prismaMock.productReviewSummary.findMany.mockResolvedValue([
      summaryRow({ productId: 'product-1', approvedCount: 12, ratingSum: 57, averageRating: 4.75 }),
      summaryRow({ id: 'summary-2', productId: 'product-2', approvedCount: 2, ratingSum: 8, averageRating: 4 }),
    ]);
    const { GET } = await import('@/app/api/public/ratings-by-slug/route');

    const response = await GET(new Request('https://app.test/api/public/ratings-by-slug?storeId=store-1&slugs=premium-shorts,linen-shirt'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(prismaMock.productReviewSummary.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        storeId: 'store-1',
        productId: { in: ['product-1', 'product-2'] },
      },
    }));
    expect(prismaMock.review.groupBy).not.toHaveBeenCalled();
    expect(body).toEqual({
      data: {
        'premium-shorts': { avg: '4.8', count: 12 },
        'linen-shirt': { avg: '4.0', count: 2 },
      },
    });
  });
});

describe('/api/public/upload/register', () => {
  it('validates an AWS upload intent and marks private variants ready', async () => {
    redisMock.incr.mockResolvedValue(1);
    prismaMock.storeSettings.findUnique.mockResolvedValue({ storeId: 'store-1' });
    prismaMock.pendingReviewImage.findFirst.mockResolvedValue({
      publicId: `aws_s3:store-1:${AWS_IMAGE_ASSET_ID}`,
      storeId: 'store-1',
      uploadSessionId: AWS_IMAGE_UPLOAD_SESSION_ID,
      provider: 'aws_s3',
      providerAssetId: AWS_IMAGE_ASSET_ID,
      sourceAssetId: awsImageRef().objectKey,
      mimeType: 'image/jpeg',
      bytes: 450000,
      sourceChecksumAlgorithm: 'SHA256',
      sourceChecksumSha256: AWS_IMAGE_CHECKSUM,
      uploadExpiresAt: new Date(Date.now() + 60_000),
      variantStatus: 'pending',
    });
    prismaMock.pendingReviewImage.update.mockResolvedValue({});
    const { POST } = await import('@/app/api/public/upload/register/route');

    const response = await POST(new Request('https://app.test/api/public/upload/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.5' },
      body: JSON.stringify({ storeId: 'store-1', ...awsImageRef() }),
    }));

    expect(response.status).toBe(200);
    expect(awsImageMock.validateAwsReviewImageOriginal).toHaveBeenCalledWith(expect.objectContaining({
      storeId: 'store-1',
      assetId: AWS_IMAGE_ASSET_ID,
      uploadSessionId: AWS_IMAGE_UPLOAD_SESSION_ID,
    }));
    expect(awsImageMock.generateAwsReviewImagePrivateVariants).toHaveBeenCalled();
    expect(prismaMock.pendingReviewImage.update).toHaveBeenCalledWith({
      where: { publicId: `aws_s3:store-1:${AWS_IMAGE_ASSET_ID}` },
      data: expect.objectContaining({
        url: null,
        assetId: AWS_IMAGE_ASSET_ID,
        provider: 'aws_s3',
        providerAssetId: AWS_IMAGE_ASSET_ID,
        metadataStatus: 'complete',
        variantStatus: 'private_ready',
        uploadRegisteredAt: expect.any(Date),
      }),
    });
  });

  it('returns ok without regenerating variants for an already registered AWS image', async () => {
    redisMock.incr.mockResolvedValue(1);
    prismaMock.storeSettings.findUnique.mockResolvedValue({ storeId: 'store-1' });
    prismaMock.pendingReviewImage.findFirst.mockResolvedValue({
      sourceAssetId: awsImageRef().objectKey,
      mimeType: 'image/jpeg',
      bytes: 450000,
      sourceChecksumAlgorithm: 'SHA256',
      sourceChecksumSha256: AWS_IMAGE_CHECKSUM,
      uploadExpiresAt: new Date(Date.now() + 60_000),
      variantStatus: 'private_ready',
    });
    const { POST } = await import('@/app/api/public/upload/register/route');

    const response = await POST(new Request('https://app.test/api/public/upload/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.5' },
      body: JSON.stringify({ storeId: 'store-1', ...awsImageRef() }),
    }));

    expect(response.status).toBe(200);
    expect(awsImageMock.validateAwsReviewImageOriginal).not.toHaveBeenCalled();
    expect(prismaMock.pendingReviewImage.update).not.toHaveBeenCalled();
  });

  it('rejects invalid AWS image references before touching pending rows', async () => {
    redisMock.incr.mockResolvedValue(1);
    prismaMock.storeSettings.findUnique.mockResolvedValue({ storeId: 'store-1' });
    const { POST } = await import('@/app/api/public/upload/register/route');

    const response = await POST(new Request('https://app.test/api/public/upload/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.5' },
      body: JSON.stringify({ storeId: 'store-1', secureUrl: AWS_REVIEW_IMAGE_URL }),
    }));

    expect(response.status).toBe(400);
    expect(prismaMock.pendingReviewImage.findFirst).not.toHaveBeenCalled();
  });
});

describe('/api/public/reviews', () => {
  it('rejects review-host submits before parsing, rate limiting, or storage when the feature is disabled', async () => {
    const { POST } = await import('@/app/api/public/reviews/route');

    const response = await POST(new Request('https://reviews.renuvex.app/api/public/reviews', {
      method: 'POST',
      body: 'not-json',
      headers: {
        Host: 'reviews.renuvex.app',
        Origin: 'https://reviews.renuvex.app',
        'x-forwarded-for': '203.0.113.5',
      },
    }));

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'not_found' });
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(redisMock.incr).not.toHaveBeenCalled();
    expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
  });

  it('rejects a legacy-session wrong Origin before parsing, rate limiting, or storage', async () => {
    process.env.REVIEW_EMAIL_ENABLED = 'true';
    const { POST } = await import('@/app/api/public/reviews/route');

    const response = await POST(new Request('https://reviews.renuvex.app/api/public/reviews', {
      method: 'POST',
      body: 'not-json',
      headers: {
        Host: 'reviews.renuvex.app',
        Origin: 'https://attacker.example',
        Cookie: 'renuvex-review-request=legacy-session',
        'x-forwarded-for': '203.0.113.5',
      },
    }));

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: 'not_found' });
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(redisMock.incr).not.toHaveBeenCalled();
    expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
  });

  it('preserves verified legacy review submission on the exact review Origin', async () => {
    process.env.REVIEW_EMAIL_ENABLED = 'true';
    setupVerifiedReviewTarget('all');
    resolveActiveReviewRequestSessionMock.mockResolvedValue({
      id: 'session-1',
      tokenId: 'token-1',
      requestId: 'request-1',
      request: {
        id: 'request-1',
        storeId: 'store-1',
        productId: 'product-1',
        receiptId: null,
      },
      token: { attemptId: 'attempt-1' },
    });

    const { POST } = await import('@/app/api/public/reviews/route');
    const response = await POST(new Request('https://reviews.renuvex.app/api/public/reviews', {
      method: 'POST',
      headers: {
        Host: 'reviews.renuvex.app',
        Origin: 'https://reviews.renuvex.app',
        Cookie: 'renuvex-review-request=legacy-session',
        'Content-Type': 'application/json',
        'x-forwarded-for': '203.0.113.5',
      },
      body: JSON.stringify(validReviewPayload()),
    }));

    expect(response.status).toBe(201);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBeNull();
    expect(claimReviewRequestForSubmissionMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        sessionId: 'session-1',
        tokenId: 'token-1',
        requestId: 'request-1',
      }),
    );
    expect(prismaMock.review.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        reviewRequestId: 'request-1',
        verifiedBuyer: true,
        verificationSource: 'review_request_email',
      }),
    }));
    expect(response.headers.get('Set-Cookie')).toContain('renuvex-review-request=');
  });

  it('rejects invalid JSON review submit bodies before rate limit or storage', async () => {
    const { POST } = await import('@/app/api/public/reviews/route');

    const response = await POST(new Request('https://app.test/api/public/reviews', {
      method: 'POST',
      body: 'not-json',
      headers: { 'x-forwarded-for': '203.0.113.5' },
    }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBeTruthy();
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('Access-Control-Allow-Credentials')).toBeNull();
    expect(redisMock.incr).not.toHaveBeenCalled();
    expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
    expect(prismaMock.review.create).not.toHaveBeenCalled();
  });

  it('rejects syntactically invalid review submits before rate limit or storage', async () => {
    const cases = [
      validReviewPayload({ storeId: '' }),
      validReviewPayload({ productId: '' }),
      validReviewPayload({ author: '' }),
      validReviewPayload({ rating: 0 }),
      validReviewPayload({ rating: 6 }),
      validReviewPayload({ rating: 4.5 }),
      validReviewPayload({ title: 'x'.repeat(61) }),
      validReviewPayload({ comment: 'x'.repeat(2001) }),
    ];

    for (const payload of cases) {
      vi.clearAllMocks();
      const response = await postPublicReview(payload);

      expect(response.status).toBe(400);
      expect(redisMock.incr).not.toHaveBeenCalled();
      expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
      expect(prismaMock.review.create).not.toHaveBeenCalled();
    }
  });

  it('rejects profanity before rate limit or storage', async () => {
    const response = await postPublicReview(validReviewPayload({
      title: 'Great',
      comment: 'This is shit',
    }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBeTruthy();
    expect(redisMock.incr).not.toHaveBeenCalled();
    expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
    expect(prismaMock.review.create).not.toHaveBeenCalled();
  });

  it('rate limits valid review submits before image validation and target lookup', async () => {
    redisMock.incr.mockResolvedValue(4);

    const response = await postPublicReview(validReviewPayload({
      images: [awsImageRef()],
    }));
    const body = await response.json();

    expect(response.status).toBe(429);
    expect(body.error).toBeTruthy();
    expect(redisMock.incr).toHaveBeenCalledWith('renuvex_pr_rl:203.0.113.5');
    expect(redisMock.expire).not.toHaveBeenCalled();
    expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
    expect(prismaMock.review.create).not.toHaveBeenCalled();
  });

  it('rejects missing public review query params before querying storage', async () => {
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1'));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('Eksik parametre');
    expect(prismaMock.review.findMany).not.toHaveBeenCalled();
    expect(prismaMock.review.count).not.toHaveBeenCalled();
    expect(prismaMock.review.groupBy).not.toHaveBeenCalled();
    expect(prismaMock.productReviewSummary.findUnique).not.toHaveBeenCalled();
  });

  it('does not expose an unexpected storage failure in response, console, or Sentry', async () => {
    const canary = 'postgres://user:secret@example.invalid/private';
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    prismaMock.review.findMany.mockRejectedValue(new Error(canary));
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request(
      'https://app.test/api/public/reviews?storeId=store-1&productId=product-1',
    ));
    const body = await response.json();
    const consoleOutput = JSON.stringify(consoleError.mock.calls);
    const sentryOutput = JSON.stringify(sentryCaptureExceptionMock.mock.calls);

    expect(response.status).toBe(500);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(body).toEqual({ error: 'reviews_fetch_failed' });
    expect(JSON.stringify(body)).not.toContain(canary);
    expect(consoleOutput).not.toContain(canary);
    expect(sentryOutput).not.toContain(canary);
    expect(sentryCaptureExceptionMock).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'public_reviews_fetch_failed' }),
      expect.objectContaining({
        tags: {
          source: 'public-api',
          route: 'reviews',
          operation: 'list',
        },
      }),
    );
    consoleError.mockRestore();
  });

  it('does not expose an unexpected submit failure even when console reporting throws', async () => {
    const canary = 'submit-storage-credential-canary';
    setupVerifiedReviewTarget('manual');
    prismaMock.$transaction.mockRejectedValue(new Error(canary));
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {
      throw new Error('console-transport-failed');
    });

    const response = await postPublicReview(validReviewPayload());
    const body = await response.json();
    const sentryOutput = JSON.stringify(sentryCaptureExceptionMock.mock.calls);

    expect(response.status).toBe(500);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
    expect(body).toEqual({ error: 'reviews_submit_failed' });
    expect(JSON.stringify(body)).not.toContain(canary);
    expect(sentryOutput).not.toContain(canary);
    expect(sentryCaptureExceptionMock).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'public_reviews_submit_failed' }),
      expect.objectContaining({
        tags: {
          source: 'public-api',
          route: 'reviews',
          operation: 'submit',
        },
      }),
    );
    consoleError.mockRestore();
  });

  it('returns approved reviews with rating distribution and pagination', async () => {
    prismaMock.review.findMany.mockResolvedValue([
      {
        id: 'review-1',
        rating: 5,
        title: 'Great',
        comment: 'Works well',
        author: 'Mert Copper',
        merchantReply: 'Thanks',
        images: null,
        createdAt: new Date('2026-05-28T00:00:00.000Z'),
      },
    ]);
    prismaMock.productReviewSummary.findUnique.mockResolvedValue(summaryRow());
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(prismaMock.review.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        storeId: 'store-1',
        productId: 'product-1',
        status: 'approved',
      }),
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: 10,
      skip: 0,
    }));
    expect(prismaMock.productReviewSummary.findUnique).toHaveBeenCalledWith({
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
    });
    expect(prismaMock.review.groupBy).not.toHaveBeenCalled();
    expect(prismaMock.review.count).not.toHaveBeenCalled();
    expect(body.data).toEqual(expect.objectContaining({
      allCount: 1,
      totalCount: 1,
      avgRating: '5.0',
      ratingCounts: [0, 0, 0, 0, 1],
      hasMore: false,
      nextCursor: null,
    }));
    expect(body.data.reviews[0]).toEqual(expect.objectContaining({
      id: 'review-1',
      author: 'Mert C.',
      images: [],
      createdAt: '2026-05-28T00:00:00.000Z',
    }));
  });

  it('formats public AWS review images from ReviewMedia and ignores the legacy mirror', async () => {
    prismaMock.review.findMany.mockResolvedValue([
      {
        id: 'review-1',
        rating: 5,
        title: 'Great',
        comment: 'Works well',
        author: 'Mert Copper',
        merchantReply: null,
        images: JSON.stringify(['https://legacy.example/review.jpg']),
        media: [
          {
            url: SECOND_AWS_REVIEW_IMAGE_URL,
            position: 1,
            resourceType: 'image',
            provider: 'aws_s3',
            variantStatus: 'public_ready',
            variantManifest: awsVariantManifest({
              url: SECOND_AWS_REVIEW_IMAGE_URL,
              thumbnailUrl: `https://media.renuvex.app/reviews/${SECOND_AWS_IMAGE_ASSET_ID}/thumb_320x427.webp`,
              variants: [{ id: 'w1200', format: 'jpeg', width: 1200, height: 1600, url: SECOND_AWS_REVIEW_IMAGE_URL }],
            }),
            width: null,
            height: null,
            format: null,
            mimeType: null,
            bytes: null,
          },
          {
            url: AWS_REVIEW_IMAGE_URL,
            position: 0,
            resourceType: 'image',
            provider: 'aws_s3',
            variantStatus: 'public_ready',
            variantManifest: awsVariantManifest(),
            width: 1200,
            height: 1600,
            format: 'jpg',
            mimeType: 'image/jpeg',
            bytes: 450000,
          },
        ],
        createdAt: new Date('2026-05-28T00:00:00.000Z'),
      },
    ]);
    prismaMock.productReviewSummary.findUnique.mockResolvedValue(summaryRow({ photoReviewCount: 1 }));
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(prismaMock.review.findMany).toHaveBeenCalledWith(expect.objectContaining({
      select: expect.objectContaining({
        media: expect.objectContaining({
          where: { visible: true, processingStatus: 'ready' },
          orderBy: { position: 'asc' },
        }),
      }),
    }));
    expect(prismaMock.review.count).not.toHaveBeenCalled();
    expect(body.data.reviews[0].images).toEqual([AWS_REVIEW_IMAGE_URL, SECOND_AWS_REVIEW_IMAGE_URL]);
    expect(body.data.reviews[0].media).toEqual([
      expect.objectContaining({
        url: AWS_REVIEW_IMAGE_URL,
        thumbnailUrl: AWS_REVIEW_IMAGE_THUMB_URL,
        position: 0,
        width: 1200,
        height: 1600,
        format: 'jpg',
        mimeType: 'image/jpeg',
        bytes: 450000,
      }),
      expect.objectContaining({
        url: SECOND_AWS_REVIEW_IMAGE_URL,
        position: 1,
        width: null,
        height: null,
      }),
    ]);
  });

  it('returns normalized Mux video media without exposing provider identity', async () => {
    const assetId = 'asset-video-1';
    const playbackId = 'public-playback-1';
    const playbackUrl = `https://stream.mux.com/${playbackId}.m3u8`;
    const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
    prismaMock.review.findMany.mockResolvedValue([{
      id: 'review-video',
      rating: 5,
      title: 'Video review',
      comment: 'Works well',
      author: 'Mert Copper',
      merchantReply: null,
      images: null,
      media: [{
        url: playbackUrl,
        position: 0,
        resourceType: 'video',
        provider: 'mux',
        providerAssetId: assetId,
        posterUrl,
        durationMs: 45_000,
        width: 1920,
        height: 1080,
        format: null,
        mimeType: 'application/x-mpegURL',
        bytes: 10_000_000,
      }],
      createdAt: new Date('2026-05-28T00:00:00.000Z'),
    }]);
    prismaMock.productReviewSummary.findUnique.mockResolvedValue(summaryRow());
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.reviews[0].images).toEqual([]);
    expect(body.data.reviews[0].media).toEqual([expect.objectContaining({
      type: 'video',
      url: playbackUrl,
      playbackId,
      thumbnailUrl: posterUrl,
      posterUrl,
      durationMs: 45_000,
    })]);
    expect(body.data.reviews[0].media[0]).not.toHaveProperty('provider');
    expect(body.data.reviews[0].media[0]).not.toHaveProperty('providerAssetId');
    expect(body.data.reviews[0].media[0]).not.toHaveProperty('providerUploadId');
    expect(body.data.reviews[0].media[0]).not.toHaveProperty('token');
  });

  it('applies review GET pagination, sorting, rating, and trusted image filters', async () => {
    prismaMock.review.findMany.mockResolvedValue([]);
    prismaMock.productReviewSummary.findUnique.mockResolvedValue(null);
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1&page=2&limit=99&orderBy=lowest&rating=4&hasImages=true'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get('Cache-Control')).toBe('s-maxage=60, stale-while-revalidate=300');
    expect(prismaMock.review.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        storeId: 'store-1',
        productId: 'product-1',
        status: 'approved',
        rating: 4,
        hasImages: true,
      }),
      orderBy: [{ rating: 'asc' }, { createdAt: 'desc' }, { id: 'desc' }],
      take: 30,
      skip: 30,
    }));
    expect(prismaMock.review.count).not.toHaveBeenCalled();
    expect(body.data).toEqual(expect.objectContaining({
      reviews: [],
      totalCount: 0,
      allCount: 0,
      page: 2,
      totalPages: 0,
      hasMore: false,
      avgRating: null,
      photoReviewCount: 0,
      mediaReviewCount: 0,
    }));
  });

  it('uses the indexed image filter when hasImages is requested', async () => {
    prismaMock.review.findMany.mockResolvedValue([]);
    prismaMock.productReviewSummary.findUnique.mockResolvedValue(null);
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1&hasImages=true&rating=not-a-number&orderBy=highest&limit=0&page=-5'));

    expect(response.status).toBe(200);
    expect(prismaMock.review.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        storeId: 'store-1',
        productId: 'product-1',
        status: 'approved',
        hasImages: true,
      }),
      orderBy: [{ rating: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
      take: 1,
      skip: 0,
    }));
    expect(prismaMock.review.findMany.mock.calls[0][0].where.rating).toBeUndefined();
    expect(prismaMock.review.count).not.toHaveBeenCalled();
  });

  it('uses the media summary count for hasMedia without changing the public image filter', async () => {
    prismaMock.review.findMany.mockResolvedValue([]);
    prismaMock.productReviewSummary.findUnique.mockResolvedValue(summaryRow({ approvedCount: 4, photoReviewCount: 1, mediaReviewCount: 2 }));
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1&hasMedia=true&limit=15'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(prismaMock.review.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        storeId: 'store-1',
        productId: 'product-1',
        status: 'approved',
        OR: [{ hasImages: true }, { hasVideo: true }],
      }),
      take: 15,
      skip: 0,
    }));
    expect(prismaMock.review.count).not.toHaveBeenCalled();
    expect(body.data.totalCount).toBe(2);
    expect(body.data.allCount).toBe(4);
    expect(body.data.photoReviewCount).toBe(1);
    expect(body.data.mediaReviewCount).toBe(2);
  });

  it('rejects conflicting hasImages and hasMedia filters', async () => {
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1&hasImages=true&hasMedia=true'));

    expect(response.status).toBe(400);
    expect(prismaMock.review.findMany).not.toHaveBeenCalled();
  });

  it('returns a cursor from the legacy first page and uses keyset pagination without skip', async () => {
    const firstReview = {
      id: 'review-newest-1',
      rating: 5,
      title: 'Newest 1',
      comment: 'First visible review.',
      author: 'Mert Copper',
      merchantReply: null,
      images: null,
      createdAt: new Date('2026-06-08T12:00:00.000Z'),
    };
    const secondReview = {
      id: 'review-newest-2',
      rating: 4,
      title: 'Newest 2',
      comment: 'Second visible review.',
      author: 'Ada Copper',
      merchantReply: null,
      images: null,
      createdAt: new Date('2026-06-08T11:00:00.000Z'),
    };
    prismaMock.review.findMany
      .mockResolvedValueOnce([firstReview])
      .mockResolvedValueOnce([secondReview]);
    prismaMock.productReviewSummary.findUnique.mockResolvedValue(summaryRow({ approvedCount: 2, ratingSum: 9, rating4Count: 1, rating5Count: 1 }));
    const { GET } = await import('@/app/api/public/reviews/route');

    const firstResponse = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1&limit=1'));
    const firstBody = await firstResponse.json();
    const cursor = firstBody.data.nextCursor;

    expect(firstResponse.status).toBe(200);
    expect(typeof cursor).toBe('string');
    expect(firstBody.data).toEqual(expect.objectContaining({
      hasMore: true,
      page: 1,
      totalPages: 2,
    }));
    expect(prismaMock.review.findMany.mock.calls[0][0]).toEqual(expect.objectContaining({
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: 1,
      skip: 0,
    }));

    const secondResponse = await GET(new Request(`https://app.test/api/public/reviews?storeId=store-1&productId=product-1&limit=1&cursor=${encodeURIComponent(cursor)}`));
    const secondBody = await secondResponse.json();
    const secondFindArgs = prismaMock.review.findMany.mock.calls[1][0];

    expect(secondResponse.status).toBe(200);
    expect(secondBody.data).toEqual(expect.objectContaining({
      hasMore: false,
      nextCursor: null,
      page: 1,
    }));
    expect(secondBody.data.reviews[0]).toEqual(expect.objectContaining({ id: 'review-newest-2' }));
    expect(secondFindArgs).toEqual(expect.objectContaining({
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: 2,
    }));
    expect(secondFindArgs).not.toHaveProperty('skip');
    expect(secondFindArgs.where.OR).toEqual([
      { createdAt: { lt: firstReview.createdAt } },
      { createdAt: firstReview.createdAt, id: { lt: firstReview.id } },
    ]);
    expect(prismaMock.review.count).not.toHaveBeenCalled();
  });

  it('rejects tampered or unsigned review cursors before querying reviews', async () => {
    const firstReview = {
      id: 'review-newest-1',
      rating: 5,
      title: 'Newest 1',
      comment: 'First visible review.',
      author: 'Mert Copper',
      merchantReply: null,
      images: null,
      createdAt: new Date('2026-06-08T12:00:00.000Z'),
    };
    prismaMock.review.findMany.mockResolvedValueOnce([firstReview]);
    prismaMock.productReviewSummary.findUnique.mockResolvedValue(summaryRow({ approvedCount: 2, ratingSum: 9, rating4Count: 1, rating5Count: 1 }));
    const { GET } = await import('@/app/api/public/reviews/route');

    const firstResponse = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1&limit=1'));
    const firstBody = await firstResponse.json();
    const cursor = firstBody.data.nextCursor;
    const signedEnvelope = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));

    expect(firstResponse.status).toBe(200);
    expect(signedEnvelope).toEqual(expect.objectContaining({
      p: expect.objectContaining({ v: 1, productId: 'product-1' }),
      s: expect.any(String),
    }));

    signedEnvelope.p.values.id = 'review-newest-tampered';
    const tamperedCursor = Buffer.from(JSON.stringify(signedEnvelope), 'utf8').toString('base64url');

    prismaMock.review.findMany.mockClear();
    const tamperedResponse = await GET(new Request(`https://app.test/api/public/reviews?storeId=store-1&productId=product-1&limit=1&cursor=${encodeURIComponent(tamperedCursor)}`));
    const tamperedBody = await tamperedResponse.json();

    expect(tamperedResponse.status).toBe(400);
    expect(tamperedBody.error).toBeTruthy();
    expect(prismaMock.review.findMany).not.toHaveBeenCalled();

    const unsignedLegacyCursor = Buffer.from(JSON.stringify(signedEnvelope.p), 'utf8').toString('base64url');

    const unsignedResponse = await GET(new Request(`https://app.test/api/public/reviews?storeId=store-1&productId=product-1&limit=1&cursor=${encodeURIComponent(unsignedLegacyCursor)}`));
    const unsignedBody = await unsignedResponse.json();

    expect(unsignedResponse.status).toBe(400);
    expect(unsignedBody.error).toBeTruthy();
    expect(prismaMock.review.findMany).not.toHaveBeenCalled();
    expect(prismaMock.review.count).not.toHaveBeenCalled();
  });

  it('keeps rating/photo cursor context and rejects cursor reuse across filters', async () => {
    const firstReview = {
      id: 'review-highest-1',
      rating: 4,
      title: 'Highest 1',
      comment: 'First highest review.',
      author: 'Mert Copper',
      merchantReply: null,
      images: null,
      createdAt: new Date('2026-06-08T12:00:00.000Z'),
    };
    const secondReview = {
      id: 'review-highest-2',
      rating: 4,
      title: 'Highest 2',
      comment: 'Second highest review.',
      author: 'Ada Copper',
      merchantReply: null,
      images: null,
      createdAt: new Date('2026-06-08T11:00:00.000Z'),
    };
    prismaMock.review.findMany
      .mockResolvedValueOnce([firstReview])
      .mockResolvedValueOnce([secondReview]);
    prismaMock.productReviewSummary.findUnique.mockResolvedValue(summaryRow({
      approvedCount: 2,
      ratingSum: 8,
      rating4Count: 2,
      photoReviewCount: 2,
      photoRating4Count: 2,
    }));
    const { GET } = await import('@/app/api/public/reviews/route');

    const firstResponse = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1&orderBy=highest&rating=4&hasImages=true&limit=1'));
    const firstBody = await firstResponse.json();
    const cursor = firstBody.data.nextCursor;

    expect(firstResponse.status).toBe(200);
    expect(typeof cursor).toBe('string');

    const secondResponse = await GET(new Request(`https://app.test/api/public/reviews?storeId=store-1&productId=product-1&orderBy=highest&rating=4&hasImages=true&limit=1&cursor=${encodeURIComponent(cursor)}`));
    const secondFindArgs = prismaMock.review.findMany.mock.calls[1][0];

    expect(secondResponse.status).toBe(200);
    expect(secondFindArgs).toEqual(expect.objectContaining({
      orderBy: [{ rating: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
      take: 2,
    }));
    expect(secondFindArgs).not.toHaveProperty('skip');
    expect(secondFindArgs.where).toEqual(expect.objectContaining({
      storeId: 'store-1',
      productId: 'product-1',
      status: 'approved',
      rating: 4,
      hasImages: true,
    }));
    expect(secondFindArgs.where.OR).toEqual([
      { rating: { lt: firstReview.rating } },
      { rating: firstReview.rating, createdAt: { lt: firstReview.createdAt } },
      { rating: firstReview.rating, createdAt: firstReview.createdAt, id: { lt: firstReview.id } },
    ]);

    prismaMock.review.findMany.mockClear();
    const mismatchResponse = await GET(new Request(`https://app.test/api/public/reviews?storeId=store-1&productId=product-1&orderBy=highest&rating=4&limit=1&cursor=${encodeURIComponent(cursor)}`));
    const mismatchBody = await mismatchResponse.json();

    expect(mismatchResponse.status).toBe(400);
    expect(mismatchBody.error).toBeTruthy();
    expect(prismaMock.review.findMany).not.toHaveBeenCalled();
    expect(prismaMock.review.count).not.toHaveBeenCalled();
  });

  it('creates pending or approved reviews according to autoApprove settings without real DB writes', async () => {
    redisMock.incr.mockResolvedValue(1);
    prismaMock.storeSettings.findUnique.mockResolvedValue({ storeId: 'store-1' });
    prismaMock.productSnapshot.findUnique.mockResolvedValue({
      productId: 'product-1',
      slug: 'premium-shorts',
      name: 'Premium Shorts',
    });
    prismaMock.widgetSettings.findUnique.mockResolvedValue({
      settings: { autoApprove: '4plus' },
    });
    prismaMock.review.create.mockResolvedValue({
      id: 'review-created',
      status: 'approved',
      storeId: 'store-1',
      productId: 'product-1',
      rating: 5,
      images: null,
      hasImages: false,
      createdAt: new Date('2026-05-28T00:00:00.000Z'),
    });
    prismaMock.$transaction.mockImplementation(async (callback) => callback({
      review: prismaMock.review,
      reviewMedia: prismaMock.reviewMedia,
      productReviewSummary: prismaMock.productReviewSummary,
      pendingReviewImage: prismaMock.pendingReviewImage,
    }));
    const { POST } = await import('@/app/api/public/reviews/route');

    const response = await POST(new Request('https://app.test/api/public/reviews', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.5' },
      body: JSON.stringify({
        storeId: 'store-1',
        productId: 'product-1',
        author: 'Mert',
        rating: 5,
        title: 'Great',
        comment: 'Works well',
        images: [],
      }),
    }));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(prismaMock.review.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        storeId: 'store-1',
        productId: 'product-1',
        slug: 'premium-shorts',
        productName: 'Premium Shorts',
        status: 'approved',
        hasImages: false,
      }),
    }));
    expect(body).toEqual({ message: 'Yorum alındı', data: { id: 'review-created', status: 'approved' } });
    expect(prismaMock.productReviewSummary.create).not.toHaveBeenCalled();
    expect(prismaMock.productReviewSummary.upsert).toHaveBeenCalledWith({
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
      create: expect.objectContaining({
        storeId: 'store-1',
        productId: 'product-1',
        approvedCount: 1,
        ratingSum: 5,
        rating5Count: 1,
      }),
      update: expect.objectContaining({
        approvedCount: { increment: 1 },
        ratingSum: { increment: 5 },
        rating5Count: { increment: 1 },
      }),
    });
    expect(prismaMock.pendingReviewImage.deleteMany).not.toHaveBeenCalled();
    expect(prismaMock.reviewMedia.createMany).not.toHaveBeenCalled();
  });

  it.each([
    ['manual default', undefined, 5, 'pending'],
    ['manual string', 'manual', 5, 'pending'],
    ['boolean false', false, 5, 'pending'],
    ['all string', 'all', 1, 'approved'],
    ['boolean true', true, 1, 'approved'],
    ['5stars below threshold', '5stars', 4, 'pending'],
    ['5stars threshold', '5stars', 5, 'approved'],
    ['4plus below threshold', '4plus', 3, 'pending'],
    ['4plus threshold', '4plus', 4, 'approved'],
  ])('applies autoApprove mode %s', async (_label, autoApprove, rating, expectedStatus) => {
    setupVerifiedReviewTarget(autoApprove);

    const response = await postPublicReview(validReviewPayload({ rating }));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(prismaMock.review.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        status: expectedStatus,
        rating,
        hasImages: false,
      }),
    }));
    expect(body.data.status).toBe(expectedStatus);
  });

  it('rejects unverified public review targets after rate limit and before write', async () => {
    redisMock.incr.mockResolvedValue(1);
    prismaMock.storeSettings.findUnique.mockResolvedValue(null);
    prismaMock.productSnapshot.findUnique.mockResolvedValue(null);

    const response = await postPublicReview(validReviewPayload());

    expect(response.status).toBe(400);
    expect(redisMock.expire).toHaveBeenCalledWith('renuvex_pr_rl:203.0.113.5', 600);
    expect(prismaMock.storeSettings.findUnique).toHaveBeenCalledWith(expect.objectContaining({
      where: { storeId: 'store-1' },
    }));
    expect(prismaMock.productSnapshot.findUnique).toHaveBeenCalledWith(expect.objectContaining({
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
    }));
    expect(prismaMock.review.create).not.toHaveBeenCalled();
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it('rejects invalid image payloads before target lookup', async () => {
    const invalidImagePayloads = [
      validReviewPayload({ images: 'not-array' }),
      validReviewPayload({
        images: [
          awsImageRef(),
          awsImageRef({ assetId: SECOND_AWS_IMAGE_ASSET_ID, uploadSessionId: SECOND_AWS_IMAGE_UPLOAD_SESSION_ID }),
          awsImageRef({ assetId: '55555555-5555-4555-8555-555555555555', uploadSessionId: '66666666-6666-4666-8666-666666666666' }),
          awsImageRef({ assetId: '77777777-7777-4777-8777-777777777777', uploadSessionId: '88888888-8888-4888-8888-888888888888' }),
        ],
      }),
      validReviewPayload({ images: ['https://example.com/review.jpg'] }),
      validReviewPayload({ images: [awsImageRef({ provider: 'other' })] }),
      validReviewPayload({ images: [awsImageRef(), awsImageRef()] }),
    ];

    for (const payload of invalidImagePayloads) {
      vi.clearAllMocks();
      redisMock.incr.mockResolvedValue(1);
      const response = await postPublicReview(payload);

      expect(response.status).toBe(400);
      expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
      expect(prismaMock.review.create).not.toHaveBeenCalled();
    }
  });

  it('stores approved AWS review images and clears consumed pending image records', async () => {
    setupVerifiedReviewTarget('all');
    const secondRef = awsImageRef({
      assetId: SECOND_AWS_IMAGE_ASSET_ID,
      uploadSessionId: SECOND_AWS_IMAGE_UPLOAD_SESSION_ID,
      objectKey: `review-images/v1/private/stores/store-1/assets/${SECOND_AWS_IMAGE_ASSET_ID}/original.jpg`,
    });
    prismaMock.pendingReviewImage.findMany.mockResolvedValue([
      {
        publicId: `aws_s3:store-1:${AWS_IMAGE_ASSET_ID}`,
        storeId: 'store-1',
        productId: null,
        uploadSessionId: AWS_IMAGE_UPLOAD_SESSION_ID,
        assetId: AWS_IMAGE_ASSET_ID,
        providerAssetId: AWS_IMAGE_ASSET_ID,
        sourceAssetId: awsImageRef().objectKey,
        resourceType: 'image',
        format: 'jpg',
        mimeType: 'image/jpeg',
        width: 1200,
        height: 1600,
        bytes: 450000,
        sourceChecksumAlgorithm: 'SHA256',
        sourceChecksumSha256: AWS_IMAGE_CHECKSUM,
        metadataSource: 'aws_s3_register',
        metadataStatus: 'complete',
        metadataFetchedAt: new Date('2026-06-08T00:00:00.000Z'),
        variantStatus: 'private_ready',
        variantGeneratedAt: new Date('2026-06-08T00:00:00.000Z'),
        variantManifest: awsVariantManifest(),
        uploadExpiresAt: new Date(Date.now() + 60_000),
      },
      {
        publicId: `aws_s3:store-1:${SECOND_AWS_IMAGE_ASSET_ID}`,
        storeId: 'store-1',
        productId: null,
        uploadSessionId: SECOND_AWS_IMAGE_UPLOAD_SESSION_ID,
        assetId: SECOND_AWS_IMAGE_ASSET_ID,
        providerAssetId: SECOND_AWS_IMAGE_ASSET_ID,
        sourceAssetId: secondRef.objectKey,
        resourceType: 'image',
        format: 'jpg',
        mimeType: 'image/jpeg',
        width: 1200,
        height: 1600,
        bytes: 450000,
        sourceChecksumAlgorithm: 'SHA256',
        sourceChecksumSha256: AWS_IMAGE_CHECKSUM,
        metadataSource: 'aws_s3_register',
        metadataStatus: 'complete',
        metadataFetchedAt: new Date('2026-06-08T00:00:00.000Z'),
        variantStatus: 'private_ready',
        variantGeneratedAt: new Date('2026-06-08T00:00:00.000Z'),
        variantManifest: awsVariantManifest({
          url: SECOND_AWS_REVIEW_IMAGE_URL,
          thumbnailUrl: `https://media.renuvex.app/reviews/${SECOND_AWS_IMAGE_ASSET_ID}/thumb_320x427.webp`,
          variants: [{ id: 'w1200', format: 'jpeg', width: 1200, height: 1600, url: SECOND_AWS_REVIEW_IMAGE_URL }],
        }),
        uploadExpiresAt: new Date(Date.now() + 60_000),
      },
    ]);
    prismaMock.reviewMedia.create
      .mockResolvedValueOnce({ id: 'media-image-1' })
      .mockResolvedValueOnce({ id: 'media-image-2' });
    prismaMock.mediaProviderJob.upsert
      .mockResolvedValueOnce({ id: 'job-publish-image-1' })
      .mockResolvedValueOnce({ id: 'job-publish-image-2' });

    const response = await postPublicReview(validReviewPayload({
      images: [awsImageRef(), secondRef],
    }));

    expect(response.status).toBe(201);
    expect(redisMock.expire).toHaveBeenCalledWith('renuvex_pr_rl:203.0.113.5', 600);
    expect(prismaMock.review.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        images: null,
        hasImages: true,
        status: 'approved',
      }),
    }));
    expect(awsImageMock.publishAwsReviewImageVariants).not.toHaveBeenCalled();
    expect(prismaMock.pendingReviewImage.findMany).toHaveBeenCalledWith({
      where: {
        storeId: 'store-1',
        provider: 'aws_s3',
        uploadSessionId: { in: [AWS_IMAGE_UPLOAD_SESSION_ID, SECOND_AWS_IMAGE_UPLOAD_SESSION_ID] },
      },
      select: expect.any(Object),
    });
    expect(prismaMock.reviewMedia.create).toHaveBeenNthCalledWith(1, {
      data: expect.objectContaining({
        reviewId: 'review-created',
        storeId: 'store-1',
        productId: 'product-1',
        url: AWS_REVIEW_IMAGE_URL,
        publicId: `aws_s3:store-1:${AWS_IMAGE_ASSET_ID}`,
        assetId: AWS_IMAGE_ASSET_ID,
        provider: 'aws_s3',
        providerAssetId: AWS_IMAGE_ASSET_ID,
        resourceType: 'image',
        format: 'jpg',
        mimeType: 'image/jpeg',
        width: 1200,
        height: 1600,
        bytes: 450000,
        metadataSource: 'aws_s3_register',
        metadataStatus: 'complete',
        metadataFetchedAt: new Date('2026-06-08T00:00:00.000Z'),
        variantStatus: 'private_ready',
        position: 0,
        visible: false,
      }),
    });
    expect(prismaMock.reviewMedia.create).toHaveBeenNthCalledWith(2, {
      data: expect.objectContaining({
        reviewId: 'review-created',
        storeId: 'store-1',
        productId: 'product-1',
        url: SECOND_AWS_REVIEW_IMAGE_URL,
        publicId: `aws_s3:store-1:${SECOND_AWS_IMAGE_ASSET_ID}`,
        position: 1,
        visible: false,
      }),
    });
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledTimes(2);
    expect(prismaMock.pendingReviewImage.deleteMany).toHaveBeenCalledWith({
      where: {
        publicId: {
          in: [`aws_s3:store-1:${AWS_IMAGE_ASSET_ID}`, `aws_s3:store-1:${SECOND_AWS_IMAGE_ASSET_ID}`],
        },
        storeId: 'store-1',
      },
    });
  });

  it('rejects mixed photo and video review media before creating a review', async () => {
    redisMock.incr.mockResolvedValue(1);
    const response = await postPublicReview(validReviewPayload({
      images: [awsImageRef()],
      videoToken: 'v'.repeat(43),
    }));

    expect(response.status).toBe(400);
    expect(prismaMock.review.create).not.toHaveBeenCalled();
  });

  it('atomically consumes a ready same-product video and forces moderation', async () => {
    const videoToken = 'v'.repeat(43);
    const assetId = 'asset-video-1';
    const signedPlaybackId = 'signed-playback-1';
    const playbackUrl = `https://stream.mux.com/${signedPlaybackId}.m3u8`;
    const posterUrl = `https://image.mux.com/${signedPlaybackId}/thumbnail.jpg`;
    setupVerifiedReviewTarget('all');
    prismaMock.videoUploadSession.findUnique.mockResolvedValue({
      id: 'video-session-1',
      tokenHash: 'hash',
      storeId: 'store-1',
      productId: 'product-1',
      status: 'ready',
      mimeType: 'video/mp4',
      bytes: 12_000_000,
      fileFingerprint: null,
      provider: 'mux',
      providerUploadId: 'upload-1',
      providerAssetId: assetId,
      signedPlaybackId,
      publicPlaybackId: null,
      publicId: `mux:${assetId}`,
      playbackUrl,
      posterUrl,
      durationMs: 45_000,
      reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
      expiresAt: new Date(Date.now() + 60_000),
      consumedAt: null,
      errorCode: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    prismaMock.videoUploadSession.updateMany.mockResolvedValue({ count: 1 });

    const response = await postPublicReview(validReviewPayload({ videoToken }));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.data.status).toBe('pending');
    expect(prismaMock.review.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ hasImages: false, hasVideo: true, status: 'pending' }),
    }));
    expect(prismaMock.reviewMedia.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        reviewId: 'review-created',
        resourceType: 'video',
        provider: 'mux',
        providerAssetId: assetId,
        url: playbackUrl,
        posterUrl,
        durationMs: 45_000,
        visible: false,
      }),
    });
    expect(prismaMock.pendingReviewImage.deleteMany).toHaveBeenCalledWith({
      where: { uploadSessionId: 'video-session-1', provider: 'mux', resourceType: 'video' },
    });
  });

  it('rejects a video token that is not ready for the same product', async () => {
    setupVerifiedReviewTarget('manual');
    prismaMock.videoUploadSession.findUnique.mockResolvedValue(null);

    const response = await postPublicReview(validReviewPayload({ videoToken: 'v'.repeat(43) }));

    expect(response.status).toBe(400);
    expect(prismaMock.review.create).not.toHaveBeenCalled();
  });
});

describe('/api/admin/reviews', () => {
  it('lists one tenant with deterministic index-aligned ordering and a bounded projection', async () => {
    authenticateIkasAdminRequestMock.mockResolvedValue(activeAdminAuth());
    prismaMock.review.findMany.mockResolvedValue([{
      id: 'review-1',
      productId: 'product-1',
      productName: 'Product 1',
      rating: 5,
      comment: 'Useful review',
      author: 'Mert',
      status: 'approved',
      merchantReply: null,
      hasVideo: false,
      createdAt: new Date('2026-08-02T12:00:00.000Z'),
      media: [],
    }]);
    prismaMock.review.count.mockResolvedValue(51);
    const { GET } = await import('@/app/api/admin/reviews/route');

    const response = await GET(new Request('https://app.test/api/admin/reviews?page=2&limit=50&status=approved'));

    expect(response.status).toBe(200);
    expect(prismaMock.review.findMany).toHaveBeenCalledWith({
      where: { storeId: 'store-1', status: 'approved' },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      skip: 50,
      take: 50,
      select: {
        id: true,
        productId: true,
        productName: true,
        rating: true,
        comment: true,
        author: true,
        status: true,
        merchantReply: true,
        hasVideo: true,
        createdAt: true,
        media: {
          orderBy: { position: 'asc' },
          select: {
            id: true,
            resourceType: true,
            provider: true,
            variantStatus: true,
            variantManifest: true,
            visible: true,
            durationMs: true,
            width: true,
            height: true,
            position: true,
            processingStatus: true,
          },
        },
      },
    });
    expect(prismaMock.review.count).toHaveBeenCalledWith({
      where: { storeId: 'store-1', status: 'approved' },
    });
    await expect(response.json()).resolves.toEqual({
      data: [{
        id: 'review-1',
        productId: 'product-1',
        productName: 'Product 1',
        rating: 5,
        comment: 'Useful review',
        author: 'Mert',
        status: 'approved',
        merchantReply: null,
        hasVideo: false,
        createdAt: '2026-08-02T12:00:00.000Z',
        images: '[]',
        media: [],
      }],
      pagination: { page: 2, limit: 50, total: 51, totalPages: 2 },
    });
  });

  it('updates product summary when a review becomes approved', async () => {
    authenticateIkasAdminRequestMock.mockResolvedValue(activeAdminAuth());
    prismaMock.review.findFirst.mockResolvedValue({
      id: 'review-1',
      storeId: 'store-1',
      productId: 'product-1',
      rating: 4,
      status: 'pending',
      images: null,
      hasImages: false,
      createdAt: new Date('2026-05-27T00:00:00.000Z'),
    });
    prismaMock.review.update.mockResolvedValue({
      id: 'review-1',
      storeId: 'store-1',
      productId: 'product-1',
      rating: 4,
      status: 'approved',
      images: null,
      hasImages: false,
      createdAt: new Date('2026-05-27T00:00:00.000Z'),
    });
    prismaMock.$queryRaw.mockResolvedValue([await prismaMock.review.findFirst()]);
    prismaMock.$transaction.mockImplementation(async (callback) => callback({
      $queryRaw: prismaMock.$queryRaw,
      review: prismaMock.review,
      reviewMedia: prismaMock.reviewMedia,
      productReviewSummary: prismaMock.productReviewSummary,
    }));
    const { PUT } = await import('@/app/api/admin/reviews/route');

    const response = await PUT(new Request('https://app.test/api/admin/reviews', {
      method: 'PUT',
      body: JSON.stringify({ id: 'review-1', status: 'approved' }),
    }));

    expect(response.status).toBe(200);
    expect(requireActiveInstallationFenceMock).toHaveBeenCalledWith(
      expect.anything(),
      'store-1',
      expect.objectContaining({
        authorizedAppId: 'app-1',
        generation: 1,
        stateVersion: 1,
      }),
    );
    expect(prismaMock.reviewMedia.updateMany).toHaveBeenCalledWith({
      where: { reviewId: 'review-1' },
      data: { visible: true },
    });
    expect(prismaMock.productReviewSummary.create).not.toHaveBeenCalled();
    expect(prismaMock.productReviewSummary.upsert).toHaveBeenCalledWith({
      where: { storeId_productId: { storeId: 'store-1', productId: 'product-1' } },
      create: expect.objectContaining({
        storeId: 'store-1',
        productId: 'product-1',
        approvedCount: 1,
        ratingSum: 4,
        rating4Count: 1,
      }),
      update: expect.objectContaining({
        approvedCount: { increment: 1 },
        ratingSum: { increment: 4 },
        rating4Count: { increment: 1 },
      }),
    });
  });

  it('does not touch product summary for merchant reply only updates', async () => {
    authenticateIkasAdminRequestMock.mockResolvedValue(activeAdminAuth());
    const review = {
      id: 'review-1',
      storeId: 'store-1',
      productId: 'product-1',
      rating: 5,
      status: 'approved',
      images: null,
      hasImages: false,
      createdAt: new Date('2026-05-27T00:00:00.000Z'),
    };
    prismaMock.review.findFirst.mockResolvedValue(review);
    prismaMock.$queryRaw.mockResolvedValue([review]);
    prismaMock.review.update.mockResolvedValue({ ...review, merchantReply: 'Thanks' });
    prismaMock.$transaction.mockImplementation(async (callback) => callback({
      $queryRaw: prismaMock.$queryRaw,
      review: prismaMock.review,
      reviewMedia: prismaMock.reviewMedia,
      productReviewSummary: prismaMock.productReviewSummary,
    }));
    const { PUT } = await import('@/app/api/admin/reviews/route');

    const response = await PUT(new Request('https://app.test/api/admin/reviews', {
      method: 'PUT',
      body: JSON.stringify({ id: 'review-1', merchantReply: 'Thanks' }),
    }));

    expect(response.status).toBe(200);
    expect(prismaMock.productReviewSummary.findUnique).not.toHaveBeenCalled();
    expect(prismaMock.productReviewSummary.create).not.toHaveBeenCalled();
    expect(prismaMock.productReviewSummary.update).not.toHaveBeenCalled();
    expect(prismaMock.reviewMedia.updateMany).not.toHaveBeenCalled();
  });

  it('returns unauthorized when uninstall wins before the final review mutation fence', async () => {
    authenticateIkasAdminRequestMock.mockResolvedValue(activeAdminAuth());
    const { IkasInstallationError } = await import('@/lib/ikas-installation-lifecycle');
    requireActiveInstallationFenceMock.mockRejectedValueOnce(
      new IkasInstallationError('ikas_installation_inactive'),
    );
    prismaMock.$transaction.mockImplementation(async (callback) => callback({
      $queryRaw: prismaMock.$queryRaw,
      review: prismaMock.review,
      reviewMedia: prismaMock.reviewMedia,
      productReviewSummary: prismaMock.productReviewSummary,
    }));
    const { PUT } = await import('@/app/api/admin/reviews/route');

    const response = await PUT(new Request('https://app.test/api/admin/reviews', {
      method: 'PUT',
      body: JSON.stringify({ id: 'review-1', merchantReply: 'Thanks' }),
    }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({ error: 'unauthorized' });
    expect(prismaMock.review.update).not.toHaveBeenCalled();
  });

  it('refuses to approve a video review while Mux processing is incomplete', async () => {
    authenticateIkasAdminRequestMock.mockResolvedValue(activeAdminAuth());
    prismaMock.review.findFirst.mockResolvedValue({
      id: 'review-video-1',
      storeId: 'store-1',
      productId: 'product-1',
      rating: 5,
      status: 'pending',
      images: null,
      hasImages: false,
      hasVideo: true,
      moderationVersion: 0,
      createdAt: new Date('2026-06-13T00:00:00.000Z'),
    });
    prismaMock.$queryRaw.mockResolvedValue([await prismaMock.review.findFirst()]);
    prismaMock.reviewMedia.findMany.mockResolvedValue([{
      id: 'media-video-1',
      providerAssetId: 'asset-1',
      processingStatus: 'pending',
    }]);
    prismaMock.$transaction.mockImplementation(async (callback) => callback({
      $queryRaw: prismaMock.$queryRaw,
      review: prismaMock.review,
      reviewMedia: prismaMock.reviewMedia,
      mediaProviderJob: prismaMock.mediaProviderJob,
      productReviewSummary: prismaMock.productReviewSummary,
    }));
    const { PUT } = await import('@/app/api/admin/reviews/route');

    const response = await PUT(new Request('https://app.test/api/admin/reviews', {
      method: 'PUT',
      body: JSON.stringify({ id: 'review-video-1', status: 'approved' }),
    }));

    expect(response.status).toBe(409);
    expect(prismaMock.review.update).not.toHaveBeenCalled();
    expect(prismaMock.reviewMedia.updateMany).not.toHaveBeenCalled();
    expect(prismaMock.mediaProviderJob.upsert).not.toHaveBeenCalled();
  });

  it('queues Mux publish instead of immediately approving a ready video review', async () => {
    authenticateIkasAdminRequestMock.mockResolvedValue(activeAdminAuth());
    prismaMock.review.findFirst.mockResolvedValue({
      id: 'review-video-1',
      storeId: 'store-1',
      productId: 'product-1',
      rating: 5,
      status: 'pending',
      images: null,
      hasImages: false,
      hasVideo: true,
      moderationVersion: 2,
      createdAt: new Date('2026-06-13T00:00:00.000Z'),
    });
    prismaMock.$queryRaw.mockResolvedValue([await prismaMock.review.findFirst()]);
    prismaMock.review.update.mockResolvedValue({
      id: 'review-video-1',
      storeId: 'store-1',
      productId: 'product-1',
      rating: 5,
      status: 'pending',
      images: null,
      hasImages: false,
      hasVideo: true,
      moderationVersion: 3,
      createdAt: new Date('2026-06-13T00:00:00.000Z'),
    });
    prismaMock.reviewMedia.findMany.mockResolvedValue([{
      id: 'media-video-1',
      providerAssetId: 'asset-1',
      processingStatus: 'ready',
    }]);
    prismaMock.mediaProviderJob.upsert.mockResolvedValue({ id: 'job-publish-1' });
    prismaMock.$transaction.mockImplementation(async (callback) => callback({
      $queryRaw: prismaMock.$queryRaw,
      review: prismaMock.review,
      reviewMedia: prismaMock.reviewMedia,
      mediaProviderJob: prismaMock.mediaProviderJob,
      productReviewSummary: prismaMock.productReviewSummary,
    }));
    const { PUT } = await import('@/app/api/admin/reviews/route');

    const response = await PUT(new Request('https://app.test/api/admin/reviews', {
      method: 'PUT',
      body: JSON.stringify({ id: 'review-video-1', status: 'approved', merchantReply: 'Looks good.' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(202);
    expect(body.processing).toBe(true);
    expect(body.data.status).toBe('pending');
    expect(prismaMock.review.update).toHaveBeenCalledWith({
      where: { id: 'review-video-1' },
      data: {
        status: 'pending',
        moderationVersion: { increment: 1 },
        merchantReply: 'Looks good.',
      },
    });
    expect(prismaMock.reviewMedia.updateMany).toHaveBeenCalledWith({
      where: { reviewId: 'review-video-1', resourceType: 'video' },
      data: { visible: false },
    });
    expect(prismaMock.mediaProviderJob.upsert).toHaveBeenCalledWith({
      where: { dedupeKey: 'publish-video:review-video-1:media-video-1:v3' },
      create: expect.objectContaining({
        provider: 'mux',
        action: 'publish_video',
        resourceType: 'video',
        status: 'pending',
        payload: expect.objectContaining({
          providerAssetId: 'asset-1',
        }),
      }),
      update: {},
    });
    expect(prismaMock.productReviewSummary.upsert).not.toHaveBeenCalled();
  });
});

describe('/api/public/widget-error', () => {
  it('accepts invalid bodies without sending noise to Sentry', async () => {
    redisMock.incr.mockResolvedValue(1);
    const { POST } = await import('@/app/api/public/widget-error/route');

    const response = await POST(new Request('https://app.test/api/public/widget-error', {
      method: 'POST',
      body: 'not-json',
      headers: { 'x-forwarded-for': '203.0.113.5' },
    }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(sentryCaptureExceptionMock).not.toHaveBeenCalled();
  });

  it('sanitizes widget error payloads before capturing them', async () => {
    redisMock.incr.mockResolvedValue(1);
    const { POST } = await import('@/app/api/public/widget-error/route');

    const response = await POST(new Request('https://app.test/api/public/widget-error', {
      method: 'POST',
      body: JSON.stringify({
        message: 'Widget broke',
        stack: 'stack',
        url: 'https://merchant.test/premium-shorts',
        publicApiKey: 'store-1',
        extra: {
          type: 'resource-error',
          filename: 'widget.js',
          'bad key': 'drop-me',
        },
      }),
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.5' },
    }));

    expect(response.status).toBe(200);
    expect(sentryCaptureExceptionMock).toHaveBeenCalledTimes(1);
    const [, context] = sentryCaptureExceptionMock.mock.calls[0];
    expect(context.tags).toEqual({ source: 'widget', widgetEventType: 'resource-error' });
    expect(context.extra).toEqual(expect.objectContaining({
      url: 'https://merchant.test/premium-shorts',
      publicApiKey: 'store-1',
      filename: 'widget.js',
      ip: '203.0.113.5',
    }));
    expect(context.extra.widgetHealth['bad key']).toBeUndefined();
  });
});
