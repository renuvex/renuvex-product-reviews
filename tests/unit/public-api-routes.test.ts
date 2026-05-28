import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
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
  },
  review: {
    findMany: vi.fn(),
    count: vi.fn(),
    groupBy: vi.fn(),
    create: vi.fn(),
  },
  pendingReviewImage: {
    deleteMany: vi.fn(),
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
  }));
  prismaMock.$transaction.mockImplementation(async (callback) => callback({
    review: prismaMock.review,
    pendingReviewImage: prismaMock.pendingReviewImage,
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
  delete process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  delete process.env.CLOUDINARY_CLOUD_NAME;
  prismaMock.storeSettings.findUnique.mockReset();
  prismaMock.widgetSettings.findMany.mockReset();
  prismaMock.widgetSettings.findUnique.mockReset();
  prismaMock.productSnapshot.findUnique.mockReset();
  prismaMock.review.findMany.mockReset();
  prismaMock.review.count.mockReset();
  prismaMock.review.groupBy.mockReset();
  prismaMock.review.create.mockReset();
  prismaMock.pendingReviewImage.deleteMany.mockReset();
  prismaMock.$transaction.mockReset();
  afterMock.mockClear();
  syncStorefrontThemeForTokenMock.mockReset();
  getByMerchantIdMock.mockReset();
  checkFixedWindowRateLimitMock.mockReset();
  redisMock.incr.mockReset();
  redisMock.expire.mockReset();
  sentryCaptureExceptionMock.mockReset();
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
    });
    prismaMock.widgetSettings.findMany.mockResolvedValue([
      {
        widgetId: 'reviews',
        settings: {
          enabled: true,
          summaryLayout: 'compact',
          reviewLayout: 'gallery',
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
  });

  it('dedupes product ids, checks rate limit, and formats averages', async () => {
    checkFixedWindowRateLimitMock.mockResolvedValue({ allowed: true });
    prismaMock.review.groupBy.mockResolvedValue([
      {
        productId: 'product-1',
        _avg: { rating: 4.5 },
        _count: { rating: 8 },
      },
      {
        productId: 'product-2',
        _avg: { rating: 5 },
        _count: { rating: 1 },
      },
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
    expect(prismaMock.review.groupBy).toHaveBeenCalledWith(expect.objectContaining({
      by: ['productId'],
      where: expect.objectContaining({
        storeId: 'store-1',
        productId: { in: ['product-1', 'product-2'] },
        status: 'approved',
      }),
    }));
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
    prismaMock.review.count.mockResolvedValue(1);
    prismaMock.review.groupBy.mockResolvedValue([
      { rating: 5, _count: { rating: 1 }, _sum: { rating: 5 } },
    ]);
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
      orderBy: { createdAt: 'desc' },
      take: 10,
      skip: 0,
    }));
    expect(body.data).toEqual(expect.objectContaining({
      allCount: 1,
      totalCount: 1,
      avgRating: '5.0',
      ratingCounts: [0, 0, 0, 0, 1],
      hasMore: false,
    }));
    expect(body.data.reviews[0]).toEqual(expect.objectContaining({
      id: 'review-1',
      author: 'Mert C.',
      images: [],
      createdAt: '2026-05-28T00:00:00.000Z',
    }));
  });

  it('applies review GET pagination, sorting, rating, and trusted image filters', async () => {
    setCloudinaryEnv();
    prismaMock.review.findMany.mockResolvedValue([]);
    prismaMock.review.count.mockResolvedValue(0);
    prismaMock.review.groupBy.mockResolvedValue([]);
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
        AND: [
          { images: { contains: 'https://res.cloudinary.com/renuvex/image/upload/' } },
          { images: { contains: '/review_images/stores/store-1/' } },
        ],
      }),
      orderBy: { rating: 'asc' },
      take: 30,
      skip: 30,
    }));
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

  it('uses a safe empty image filter when hasImages is requested without Cloudinary config', async () => {
    prismaMock.review.findMany.mockResolvedValue([]);
    prismaMock.review.count.mockResolvedValue(0);
    prismaMock.review.groupBy.mockResolvedValue([]);
    const { GET } = await import('@/app/api/public/reviews/route');

    const response = await GET(new Request('https://app.test/api/public/reviews?storeId=store-1&productId=product-1&hasImages=true&rating=not-a-number&orderBy=highest&limit=0&page=-5'));

    expect(response.status).toBe(200);
    expect(prismaMock.review.findMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({
        storeId: 'store-1',
        productId: 'product-1',
        status: 'approved',
        id: '__missing_cloudinary_cloud_name__',
      }),
      orderBy: { rating: 'desc' },
      take: 1,
      skip: 0,
    }));
    expect(prismaMock.review.findMany.mock.calls[0][0].where.rating).toBeUndefined();
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
    });
    prismaMock.$transaction.mockImplementation(async (callback) => callback({
      review: prismaMock.review,
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
      }),
    }));
    expect(body).toEqual({ message: 'Yorum alındı', data: { id: 'review-created', status: 'approved' } });
    expect(prismaMock.pendingReviewImage.deleteMany).not.toHaveBeenCalled();
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

    const response = await postPublicReview(validReviewPayload({
      images: [VALID_REVIEW_IMAGE_URL, VALID_REVIEW_IMAGE_URL, SECOND_VALID_REVIEW_IMAGE_URL],
    }));

    expect(response.status).toBe(201);
    expect(redisMock.expire).toHaveBeenCalledWith('renuvex_pr_rl:203.0.113.5', 600);
    expect(prismaMock.review.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        images: JSON.stringify([VALID_REVIEW_IMAGE_URL, SECOND_VALID_REVIEW_IMAGE_URL]),
        status: 'approved',
      }),
    }));
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
