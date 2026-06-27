import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createHash } from 'crypto';

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
    findUnique: vi.fn(),
    upsert: vi.fn(),
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
const redisMock = vi.hoisted(() => ({
  incr: vi.fn(),
  expire: vi.fn(),
}));
const sentryCaptureExceptionMock = vi.hoisted(() => vi.fn());
const getUserFromRequestMock = vi.hoisted(() => vi.fn());

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
  getUserFromRequest: getUserFromRequestMock,
}));

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

vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(function Redis() {
    return redisMock;
  }),
}));

vi.mock('@sentry/nextjs', () => ({
  captureException: sentryCaptureExceptionMock,
}));

const OZY_THEME_ID = '57225e07-aa38-4d38-9688-f6730ee16143';
const VALID_REVIEW_IMAGE_URL = 'https://res.cloudinary.com/renuvex/image/upload/v1/review_images/stores/store-1/review-a.jpg';
const SECOND_VALID_REVIEW_IMAGE_URL = 'https://res.cloudinary.com/renuvex/image/upload/v1/review_images/stores/store-1/review-b.png';

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

function setCloudinaryEnv() {
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = 'renuvex';
  delete process.env.CLOUDINARY_CLOUD_NAME;
}

function cloudinaryResponseSignature(publicId: string, version: string, apiSecret: string) {
  return createHash('sha1')
    .update(`public_id=${publicId}&version=${version}${apiSecret}`, 'utf8')
    .digest('hex');
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
  delete process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  delete process.env.CLOUDINARY_CLOUD_NAME;
  delete process.env.CLOUDINARY_API_SECRET;
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
  prismaMock.pendingReviewImage.findUnique.mockReset();
  prismaMock.pendingReviewImage.findUnique.mockResolvedValue(null);
  prismaMock.pendingReviewImage.upsert.mockReset();
  prismaMock.pendingReviewImage.deleteMany.mockReset();
  prismaMock.videoUploadSession.findUnique.mockReset();
  prismaMock.videoUploadSession.updateMany.mockReset();
  prismaMock.mediaProviderJob.upsert.mockReset();
  prismaMock.$transaction.mockReset();
  afterMock.mockClear();
  syncStorefrontThemeForTokenMock.mockReset();
  getByMerchantIdMock.mockReset();
  checkFixedWindowRateLimitMock.mockReset();
  redisMock.incr.mockReset();
  redisMock.expire.mockReset();
  sentryCaptureExceptionMock.mockReset();
  getUserFromRequestMock.mockReset();
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
    ]);

    const { GET } = await import('@/app/api/public/settings/route');
    const response = await GET(new Request('https://app.test/api/public/settings?publicApiKey=store-1'));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.widgets.reviews.summaryLayout).toBe('compact');
    expect(body.widgets.reviews.reviewLayout).toBe('gallery');
    expect(body.widgets.reviews.videoReviewsEnabled).toBe(false);
    expect(body.widgets.reviews.unknownKey).toBeUndefined();
    expect(body.widgets.badge.enabled).toBe(false);
    expect(body.runtime).toEqual({
      themeAdapterKey: 'ozy',
      themeAdapterSource: 'auto',
      autoPlacementEnabled: true,
      reviewsMountEnabled: true,
    });
    expect(afterMock).not.toHaveBeenCalled();
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
  it('stores verified Cloudinary upload metadata on the pending image row', async () => {
    setCloudinaryEnv();
    process.env.CLOUDINARY_API_SECRET = 'unit-cloudinary-secret';
    redisMock.incr.mockResolvedValue(1);
    prismaMock.storeSettings.findUnique.mockResolvedValue({ storeId: 'store-1' });
    prismaMock.pendingReviewImage.upsert.mockResolvedValue({});
    const publicId = 'review_images/stores/store-1/review-a';
    const version = '1790000000';
    const { POST } = await import('@/app/api/public/upload/register/route');

    const response = await POST(new Request('https://app.test/api/public/upload/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.5' },
      body: JSON.stringify({
        storeId: 'store-1',
        secureUrl: VALID_REVIEW_IMAGE_URL,
        metadata: {
          assetId: 'asset-123',
          publicId,
          version,
          resourceType: 'image',
          format: 'jpg',
          width: 1200,
          height: 1600,
          bytes: 450000,
          signature: cloudinaryResponseSignature(publicId, version, 'unit-cloudinary-secret'),
        },
      }),
    }));

    expect(response.status).toBe(200);
    expect(prismaMock.pendingReviewImage.upsert).toHaveBeenCalledWith({
      where: { publicId },
      update: expect.objectContaining({
        assetId: 'asset-123',
        version,
        resourceType: 'image',
        format: 'jpg',
        mimeType: 'image/jpeg',
        width: 1200,
        height: 1600,
        bytes: 450000,
        metadataSource: 'upload_response',
        metadataStatus: 'complete',
        metadataFetchedAt: expect.any(Date),
      }),
      create: expect.objectContaining({
        publicId,
        storeId: 'store-1',
        assetId: 'asset-123',
        metadataStatus: 'complete',
      }),
    });
  });

  it('keeps register backwards compatible when metadata is absent', async () => {
    setCloudinaryEnv();
    redisMock.incr.mockResolvedValue(1);
    prismaMock.storeSettings.findUnique.mockResolvedValue({ storeId: 'store-1' });
    prismaMock.pendingReviewImage.upsert.mockResolvedValue({});
    const { POST } = await import('@/app/api/public/upload/register/route');

    const response = await POST(new Request('https://app.test/api/public/upload/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.5' },
      body: JSON.stringify({ storeId: 'store-1', secureUrl: VALID_REVIEW_IMAGE_URL }),
    }));

    expect(response.status).toBe(200);
    expect(prismaMock.pendingReviewImage.upsert).toHaveBeenCalledWith({
      where: { publicId: 'review_images/stores/store-1/review-a' },
      update: {},
      create: {
        publicId: 'review_images/stores/store-1/review-a',
        storeId: 'store-1',
        ipHash: expect.any(String),
      },
    });
  });

  it('does not trust metadata when the Cloudinary upload signature is invalid', async () => {
    setCloudinaryEnv();
    process.env.CLOUDINARY_API_SECRET = 'unit-cloudinary-secret';
    redisMock.incr.mockResolvedValue(1);
    prismaMock.storeSettings.findUnique.mockResolvedValue({ storeId: 'store-1' });
    prismaMock.pendingReviewImage.upsert.mockResolvedValue({});
    const publicId = 'review_images/stores/store-1/review-a';
    const { POST } = await import('@/app/api/public/upload/register/route');

    const response = await POST(new Request('https://app.test/api/public/upload/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.5' },
      body: JSON.stringify({
        storeId: 'store-1',
        secureUrl: VALID_REVIEW_IMAGE_URL,
        metadata: {
          publicId,
          version: '1790000000',
          resourceType: 'image',
          format: 'jpg',
          width: 1200,
          height: 1600,
          bytes: 450000,
          signature: 'bad-signature',
        },
      }),
    }));

    expect(response.status).toBe(200);
    expect(prismaMock.pendingReviewImage.upsert).toHaveBeenCalledWith(expect.objectContaining({
      update: expect.objectContaining({
        metadataSource: 'upload_response',
        metadataStatus: 'invalid_signature',
        metadataFetchedAt: expect.any(Date),
      }),
      create: expect.objectContaining({
        publicId,
        metadataStatus: 'invalid_signature',
      }),
    }));
  });
});

describe('/api/public/reviews', () => {
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
      images: [VALID_REVIEW_IMAGE_URL],
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

  it('formats public review images from ReviewMedia before the legacy mirror', async () => {
    setCloudinaryEnv();
    prismaMock.review.findMany.mockResolvedValue([
      {
        id: 'review-1',
        rating: 5,
        title: 'Great',
        comment: 'Works well',
        author: 'Mert Copper',
        merchantReply: null,
        images: JSON.stringify(['https://res.cloudinary.com/renuvex/image/upload/v1/review_images/stores/store-1/legacy.jpg']),
        media: [
          { url: SECOND_VALID_REVIEW_IMAGE_URL, position: 1, width: null, height: null, format: null, mimeType: null, bytes: null },
          { url: VALID_REVIEW_IMAGE_URL, position: 0, width: 1200, height: 1600, format: 'jpg', mimeType: 'image/jpeg', bytes: 450000 },
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
    expect(body.data.reviews[0].images).toEqual([VALID_REVIEW_IMAGE_URL, SECOND_VALID_REVIEW_IMAGE_URL]);
    expect(body.data.reviews[0].media).toEqual([
      expect.objectContaining({
        url: VALID_REVIEW_IMAGE_URL,
        thumbnailUrl: 'https://res.cloudinary.com/renuvex/image/upload/c_fill,g_auto,w_320,h_427,q_auto,f_auto/v1/review_images/stores/store-1/review-a.jpg',
        position: 0,
        width: 1200,
        height: 1600,
        format: 'jpg',
        mimeType: 'image/jpeg',
        bytes: 450000,
      }),
      expect.objectContaining({
        url: SECOND_VALID_REVIEW_IMAGE_URL,
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
    setCloudinaryEnv();
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
    }));
  });

  it('uses the indexed image filter when hasImages is requested without Cloudinary config', async () => {
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
      validReviewPayload({ images: [VALID_REVIEW_IMAGE_URL, SECOND_VALID_REVIEW_IMAGE_URL, VALID_REVIEW_IMAGE_URL, SECOND_VALID_REVIEW_IMAGE_URL] }),
      validReviewPayload({ images: ['https://example.com/review.jpg'] }),
      validReviewPayload({ images: ['https://res.cloudinary.com/renuvex/image/upload/v1/review_images/stores/other-store/review-a.jpg'] }),
      validReviewPayload({ images: ['https://res.cloudinary.com/renuvex/image/upload/v1/review_images/stores/store-1/review-a.svg'] }),
    ];

    for (const payload of invalidImagePayloads) {
      vi.clearAllMocks();
      setCloudinaryEnv();
      redisMock.incr.mockResolvedValue(1);
      const response = await postPublicReview(payload);

      expect(response.status).toBe(400);
      expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
      expect(prismaMock.review.create).not.toHaveBeenCalled();
    }
  });

  it('returns a server error for image submits when Cloudinary config is missing', async () => {
    redisMock.incr.mockResolvedValue(1);

    const response = await postPublicReview(validReviewPayload({
      images: [VALID_REVIEW_IMAGE_URL],
    }));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBeTruthy();
    expect(prismaMock.storeSettings.findUnique).not.toHaveBeenCalled();
    expect(prismaMock.review.create).not.toHaveBeenCalled();
  });

  it('stores trusted review images and clears consumed pending image records', async () => {
    setCloudinaryEnv();
    setupVerifiedReviewTarget('all');
    prismaMock.pendingReviewImage.findMany.mockResolvedValue([
      {
        publicId: 'review_images/stores/store-1/review-a',
        assetId: 'asset-a',
        version: '1790000000',
        resourceType: 'image',
        format: 'jpg',
        mimeType: 'image/jpeg',
        width: 1200,
        height: 1600,
        bytes: 450000,
        metadataSource: 'upload_response',
        metadataStatus: 'complete',
        metadataFetchedAt: new Date('2026-06-08T00:00:00.000Z'),
      },
    ]);

    const response = await postPublicReview(validReviewPayload({
      images: [VALID_REVIEW_IMAGE_URL, VALID_REVIEW_IMAGE_URL, SECOND_VALID_REVIEW_IMAGE_URL],
    }));

    expect(response.status).toBe(201);
    expect(redisMock.expire).toHaveBeenCalledWith('renuvex_pr_rl:203.0.113.5', 600);
    expect(prismaMock.review.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        images: JSON.stringify([VALID_REVIEW_IMAGE_URL, SECOND_VALID_REVIEW_IMAGE_URL]),
        hasImages: true,
        status: 'approved',
      }),
    }));
    expect(prismaMock.pendingReviewImage.findMany).toHaveBeenCalledWith({
      where: {
        publicId: {
          in: [
            'review_images/stores/store-1/review-a',
            'review_images/stores/store-1/review-b',
          ],
        },
        storeId: 'store-1',
      },
      select: {
        publicId: true,
        assetId: true,
        version: true,
        resourceType: true,
        format: true,
        mimeType: true,
        width: true,
        height: true,
        bytes: true,
        metadataSource: true,
        metadataStatus: true,
        metadataFetchedAt: true,
      },
    });
    expect(prismaMock.reviewMedia.createMany).toHaveBeenCalledWith({
      data: [
        expect.objectContaining({
          reviewId: 'review-created',
          storeId: 'store-1',
          productId: 'product-1',
          url: VALID_REVIEW_IMAGE_URL,
          publicId: 'review_images/stores/store-1/review-a',
          assetId: 'asset-a',
          version: '1790000000',
          resourceType: 'image',
          format: 'jpg',
          mimeType: 'image/jpeg',
          width: 1200,
          height: 1600,
          bytes: 450000,
          metadataSource: 'upload_response',
          metadataStatus: 'complete',
          metadataFetchedAt: new Date('2026-06-08T00:00:00.000Z'),
          position: 0,
          visible: true,
        }),
        expect.objectContaining({
          reviewId: 'review-created',
          storeId: 'store-1',
          productId: 'product-1',
          url: SECOND_VALID_REVIEW_IMAGE_URL,
          publicId: 'review_images/stores/store-1/review-b',
          position: 1,
          visible: true,
        }),
      ],
      skipDuplicates: true,
    });
    expect(prismaMock.pendingReviewImage.deleteMany).toHaveBeenCalledWith({
      where: {
        publicId: {
          in: [
            'review_images/stores/store-1/review-a',
            'review_images/stores/store-1/review-b',
          ],
        },
        storeId: 'store-1',
      },
    });
  });

  it('rejects mixed photo and video review media before creating a review', async () => {
    setCloudinaryEnv();
    redisMock.incr.mockResolvedValue(1);
    const response = await postPublicReview(validReviewPayload({
      images: [VALID_REVIEW_IMAGE_URL],
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
  it('updates product summary when a review becomes approved', async () => {
    getUserFromRequestMock.mockReturnValue({ authorizedAppId: 'app-1', merchantId: 'store-1' });
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
    getUserFromRequestMock.mockReturnValue({ authorizedAppId: 'app-1', merchantId: 'store-1' });
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

  it('refuses to approve a video review while Mux processing is incomplete', async () => {
    getUserFromRequestMock.mockReturnValue({ authorizedAppId: 'app-1', merchantId: 'store-1' });
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
    getUserFromRequestMock.mockReturnValue({ authorizedAppId: 'app-1', merchantId: 'store-1' });
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
