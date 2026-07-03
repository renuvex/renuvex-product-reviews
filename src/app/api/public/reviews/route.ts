import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { Redis } from '@upstash/redis';
import {
  getConfiguredCloudinaryCloudName,
  getReviewImagePublicId,
  sanitizeReviewImageUrls,
} from '@/lib/review-images';
import {
  buildAwsReviewMediaCreateManyData,
  buildReviewMediaCreateManyData,
  publicImagesFromMediaOrLegacy,
  publicMediaFromMediaOrLegacy,
  type AwsPendingReviewImageMediaRow,
  type PublicReviewMediaRow,
} from '@/lib/review-media';
import type { ReviewMediaMetadataWrite } from '@/lib/review-media-metadata';
import { applyReviewSummaryVisibilityChange, filteredReviewTotal, summaryStats } from '@/lib/review-summary';
import { hashMediaToken } from '@/lib/media/video-policy';
import { MEDIA_JOB_ACTIONS, VIDEO_PROVIDER } from '@/lib/media/constants';
import { supersedeSessionLifecycleJobs } from '@/lib/media/outbox';
import {
  AWS_REVIEW_IMAGE_PROVIDER,
  buildAwsReviewImagePublicDescriptor,
  isAwsReviewImageProviderEnabled,
  publishAwsReviewImageVariants,
  revokeAwsReviewImagePublicVariants,
  sanitizeAwsReviewImageRefs,
} from '@/lib/media/providers/aws-review-image';

// Upstash Redis — tüm Vercel instance'larında ortak rate limit
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_SEC = 10 * 60; // 10 dakika

async function compensatePublishedAwsReviewImages(manifests: unknown[], context: string) {
  for (const manifest of manifests) {
    try {
      await revokeAwsReviewImagePublicVariants(manifest);
    } catch (error) {
      console.error(`${context} AWS image publish compensation failed:`, error instanceof Error ? error.message : error);
    }
  }
}

const PUBLIC_REVIEW_SELECT = {
  id: true,
  rating: true,
  title: true,
  comment: true,
  author: true,
  merchantReply: true,
  images: true,
  media: {
    where: { visible: true, processingStatus: 'ready' },
    orderBy: { position: 'asc' as const },
    select: {
      url: true,
      position: true,
      resourceType: true,
      provider: true,
      providerAssetId: true,
      posterUrl: true,
      durationMs: true,
      width: true,
      height: true,
      format: true,
      mimeType: true,
      bytes: true,
      variantStatus: true,
      variantManifest: true,
    },
  },
  createdAt: true,
} as const;

type PublicReviewRow = {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  author: string;
  merchantReply: string | null;
  images: string | null;
  media?: PublicReviewMediaRow[];
  createdAt: Date;
};

type PendingReviewImageMetadataRow = {
  publicId: string;
  assetId: string | null;
  version: string | null;
  resourceType: string | null;
  format: string | null;
  mimeType: string | null;
  width: number | null;
  height: number | null;
  bytes: number | null;
  metadataSource: string | null;
  metadataStatus: string | null;
  metadataFetchedAt: Date | null;
};

type AwsPendingReviewImageForSubmit = AwsPendingReviewImageMediaRow & {
  uploadExpiresAt: Date | null;
};

const AWS_PENDING_IMAGE_SELECT = {
  publicId: true,
  storeId: true,
  productId: true,
  uploadSessionId: true,
  assetId: true,
  providerAssetId: true,
  sourceAssetId: true,
  format: true,
  mimeType: true,
  width: true,
  height: true,
  bytes: true,
  sourceChecksumAlgorithm: true,
  sourceChecksumSha256: true,
  metadataSource: true,
  metadataStatus: true,
  metadataFetchedAt: true,
  variantStatus: true,
  variantGeneratedAt: true,
  variantManifest: true,
  uploadExpiresAt: true,
} as const;

type ReviewOrderByKey = 'newest' | 'highest' | 'lowest';

type ReviewCursorValues = {
  createdAt: string;
  id: string;
  rating?: number;
};

type ReviewCursorPayload = {
  v: 1;
  storeId: string;
  productId: string;
  orderBy: ReviewOrderByKey;
  ratingFilter: number | null;
  hasImages: boolean;
  hasMedia?: boolean;
  values: ReviewCursorValues;
};

type SignedReviewCursorPayload = {
  p: ReviewCursorPayload;
  s: string;
};

const REVIEW_ORDER_BY: Record<ReviewOrderByKey, Array<Record<string, 'asc' | 'desc'>>> = {
  newest: [{ createdAt: 'desc' }, { id: 'desc' }],
  highest: [{ rating: 'desc' }, { createdAt: 'desc' }, { id: 'desc' }],
  lowest: [{ rating: 'asc' }, { createdAt: 'desc' }, { id: 'desc' }],
};

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map((item) => stableStringify(item)).join(',') + ']';
  const record = value as Record<string, unknown>;
  return '{' + Object.keys(record).sort().map((key) => JSON.stringify(key) + ':' + stableStringify(record[key])).join(',') + '}';
}

function getReviewCursorSecret(): string {
  const configured = process.env.REVIEW_CURSOR_SECRET?.trim();
  if (configured) return configured;
  if (process.env.NODE_ENV === 'test') return 'test-review-cursor-secret-not-for-production';
  throw new Error('REVIEW_CURSOR_SECRET is not configured');
}

function signReviewCursorPayload(payload: ReviewCursorPayload): string {
  return createHmac('sha256', getReviewCursorSecret())
    .update(stableStringify(payload), 'utf8')
    .digest('base64url');
}

function isValidCursorSignature(payload: ReviewCursorPayload, signature: string): boolean {
  if (!signature) return false;
  const expected = signReviewCursorPayload(payload);
  const expectedBuffer = Buffer.from(expected, 'utf8');
  const actualBuffer = Buffer.from(signature, 'utf8');
  return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
}

// Profanity filtresi — Türkçe ve İngilizce yaygın küfürler
const PROFANITY_LIST = [
  'sik', 'orospu', 'göt', 'got', 'amk', 'bok', 'yarrak', 'oç', 'piç', 'pic',
  'salak', 'aptal', 'gerizekalı', 'mal', 'şerefsiz', 'serefsiz', 'kahpe',
  'fuck', 'shit', 'bitch', 'ass', 'damn', 'crap', 'bastard',
];

function containsProfanity(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase().replace(/[^a-züöşçğıi]/g, ' ');
  return PROFANITY_LIST.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(lower);
  });
}

function maskAuthor(name: string): string {
  if (!name) return '';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return parts[0] + ' ' + parts[parts.length - 1][0].toLocaleUpperCase('tr-TR') + '.';
}

function requiredString(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  if (!text || text.length > maxLength) return null;
  return text;
}

function optionalString(value: unknown, maxLength: number): string | null {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string') return null;
  const text = value.trim();
  if (!text) return null;
  return text.length <= maxLength ? text : null;
}

function positiveIntParam(value: string | null, fallback: number, max?: number): number {
  const parsed = parseInt(value ?? '', 10);
  const normalized = Number.isFinite(parsed) ? Math.max(1, parsed) : fallback;
  return max ? Math.min(max, normalized) : normalized;
}

function normalizeReviewOrderBy(value: string | null): ReviewOrderByKey {
  if (value === 'highest' || value === 'lowest') return value;
  return 'newest';
}

function normalizeRatingFilter(value: string | null): number | null {
  const parsed = value ? parseInt(value, 10) : NaN;
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 5 ? parsed : null;
}

function parseReviewCursorPayload(parsed: unknown): ReviewCursorPayload | null {
  const payload = parsed as Partial<ReviewCursorPayload> | null;
  if (!payload || payload.v !== 1) return null;
  if (payload.orderBy !== 'newest' && payload.orderBy !== 'highest' && payload.orderBy !== 'lowest') return null;
  if (typeof payload.storeId !== 'string' || !payload.storeId) return null;
  if (typeof payload.productId !== 'string' || !payload.productId) return null;
  const parsedRatingFilter = payload.ratingFilter;
  if (parsedRatingFilter !== null) {
    if (typeof parsedRatingFilter !== 'number' || !Number.isInteger(parsedRatingFilter) || parsedRatingFilter < 1 || parsedRatingFilter > 5) return null;
  }
  if (typeof payload.hasImages !== 'boolean') return null;
  if (payload.hasMedia !== undefined && typeof payload.hasMedia !== 'boolean') return null;
  if (!payload.values || typeof payload.values.createdAt !== 'string' || typeof payload.values.id !== 'string' || !payload.values.id) return null;
  const createdAt = new Date(payload.values.createdAt);
  if (Number.isNaN(createdAt.getTime())) return null;
  if (payload.orderBy !== 'newest' && !(Number.isInteger(payload.values.rating) && payload.values.rating! >= 1 && payload.values.rating! <= 5)) return null;
  return payload as ReviewCursorPayload;
}

function encodeReviewCursor(input: {
  storeId: string;
  productId: string;
  orderBy: ReviewOrderByKey;
  ratingFilter: number | null;
  hasImages: boolean;
  hasMedia: boolean;
  review: Pick<PublicReviewRow, 'id' | 'rating' | 'createdAt'>;
}): string {
  const payload: ReviewCursorPayload = {
    v: 1,
    storeId: input.storeId,
    productId: input.productId,
    orderBy: input.orderBy,
    ratingFilter: input.ratingFilter,
    hasImages: input.hasImages,
    hasMedia: input.hasMedia,
    values: {
      createdAt: input.review.createdAt.toISOString(),
      id: input.review.id,
      ...(input.orderBy === 'newest' ? {} : { rating: input.review.rating }),
    },
  };
  const signedPayload: SignedReviewCursorPayload = {
    p: payload,
    s: signReviewCursorPayload(payload),
  };

  return Buffer.from(JSON.stringify(signedPayload), 'utf8').toString('base64url');
}

function decodeReviewCursor(raw: string | null): ReviewCursorPayload | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(Buffer.from(raw, 'base64url').toString('utf8')) as Partial<SignedReviewCursorPayload>;
    if (!parsed || typeof parsed !== 'object' || typeof parsed.s !== 'string') return null;
    const payload = parseReviewCursorPayload(parsed.p);
    if (!payload || !isValidCursorSignature(payload, parsed.s)) return null;
    return payload;
  } catch {
    return null;
  }
}

function cursorMatchesQuery(cursor: ReviewCursorPayload, input: {
  storeId: string;
  productId: string;
  orderBy: ReviewOrderByKey;
  ratingFilter: number | null;
  hasImages: boolean;
  hasMedia: boolean;
}) {
  return (
    cursor.storeId === input.storeId &&
    cursor.productId === input.productId &&
    cursor.orderBy === input.orderBy &&
    cursor.ratingFilter === input.ratingFilter &&
    cursor.hasImages === input.hasImages &&
    Boolean(cursor.hasMedia) === input.hasMedia
  );
}

function buildCursorWhere(cursor: ReviewCursorPayload) {
  const createdAt = new Date(cursor.values.createdAt);
  if (cursor.orderBy === 'newest') {
    return {
      OR: [
        { createdAt: { lt: createdAt } },
        { createdAt, id: { lt: cursor.values.id } },
      ],
    };
  }

  const rating = cursor.values.rating!;
  return {
    OR: [
      { rating: cursor.orderBy === 'highest' ? { lt: rating } : { gt: rating } },
      { rating, createdAt: { lt: createdAt } },
      { rating, createdAt, id: { lt: cursor.values.id } },
    ],
  };
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `renuvex_pr_rl:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW_SEC);
  return count <= RATE_LIMIT_MAX;
}

async function verifyReviewTarget(storeId: string, productId: string) {
  const [store, product] = await Promise.all([
    prisma.storeSettings.findUnique({
      where: { storeId },
      select: { storeId: true },
    }),
    prisma.productSnapshot.findUnique({
      where: { storeId_productId: { storeId, productId } },
      select: { productId: true, slug: true, name: true },
    }),
  ]);

  return store && product ? product : null;
}

function formatPublicReview(review: PublicReviewRow, cloudName: string | null, storeId: string) {
  const media = publicMediaFromMediaOrLegacy(review.media, review.images, cloudName, storeId);
  return {
    id: review.id,
    rating: review.rating,
    title: review.title,
    comment: review.comment,
    author: maskAuthor(review.author),
    merchantReply: review.merchantReply,
    images: publicImagesFromMediaOrLegacy(review.media, review.images, cloudName, storeId),
    media,
    createdAt: review.createdAt.toISOString(),
  };
}

function pendingMetadataMap(rows: PendingReviewImageMetadataRow[]): Map<string, ReviewMediaMetadataWrite> {
  const metadataByPublicId = new Map<string, ReviewMediaMetadataWrite>();
  for (const row of rows) {
    metadataByPublicId.set(row.publicId, {
      assetId: row.assetId ?? undefined,
      version: row.version ?? undefined,
      resourceType: row.resourceType ?? undefined,
      format: row.format ?? undefined,
      mimeType: row.mimeType ?? undefined,
      width: row.width ?? undefined,
      height: row.height ?? undefined,
      bytes: row.bytes ?? undefined,
      metadataSource: row.metadataSource ?? undefined,
      metadataStatus: row.metadataStatus ?? undefined,
      metadataFetchedAt: row.metadataFetchedAt ?? undefined,
    });
  }
  return metadataByPublicId;
}

function publicUrlsFromAwsPendingRows(rows: AwsPendingReviewImageMediaRow[]): string[] {
  return rows.flatMap((row) => {
    const descriptor = buildAwsReviewImagePublicDescriptor(row.variantManifest);
    return descriptor?.url ? [descriptor.url] : [];
  });
}

export async function OPTIONS() {
  return corsOptions();
}

/**
 * GET: Widget.js'den ürün yorumlarını getir
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const storeId = searchParams.get('storeId');
    const productId = searchParams.get('productId');

    if (!storeId || !productId) {
      return withCors(NextResponse.json({ error: 'Eksik parametre' }, { status: 400 }));
    }

    const page = positiveIntParam(searchParams.get('page'), 1);
    // limit: ana liste için 10 (default); media-gallery newest-first fetch için 15.
    // 1-30 aralığında clamp — kötüye kullanım önlemi.
    const limit = positiveIntParam(searchParams.get('limit'), 10, 30);
    const skip = (page - 1) * limit;

    const orderByKey = normalizeReviewOrderBy(searchParams.get('orderBy'));
    const orderBy = REVIEW_ORDER_BY[orderByKey];
    const ratingFilter = normalizeRatingFilter(searchParams.get('rating'));
    const hasImagesFilter = searchParams.get('hasImages') === 'true';
    const hasMediaFilter = searchParams.get('hasMedia') === 'true';
    if (hasImagesFilter && hasMediaFilter) {
      return withCors(NextResponse.json({ error: 'hasImages and hasMedia cannot be used together.' }, { status: 400 }));
    }
    const rawCursor = searchParams.get('cursor');
    const cursor = decodeReviewCursor(rawCursor);
    if (rawCursor !== null && !cursor) {
      return withCors(NextResponse.json({ error: 'Geçersiz cursor' }, { status: 400 }));
    }
    if (cursor && !cursorMatchesQuery(cursor, {
      storeId,
      productId,
      orderBy: orderByKey,
      ratingFilter,
      hasImages: hasImagesFilter,
      hasMedia: hasMediaFilter,
    })) {
      return withCors(NextResponse.json({ error: 'Cursor bu sorgu ile uyumlu değil' }, { status: 400 }));
    }
    const cloudName = getConfiguredCloudinaryCloudName();

    const baseWhere = {
      storeId,
      productId,
      status: 'approved',
      ...(ratingFilter ? { rating: ratingFilter } : {}),
      ...(hasImagesFilter ? { hasImages: true } : {}),
      ...(hasMediaFilter ? { OR: [{ hasImages: true }, { hasVideo: true }] } : {}),
    };
    const listWhere = cursor ? { ...baseWhere, ...buildCursorWhere(cursor) } : baseWhere;

    // Filtreden bağımsız — bar chart için tüm approved yorumların dağılımı
    const summaryWhere = { storeId, productId };

    const reviewsPromise = cursor
      ? prisma.review.findMany({ where: listWhere, orderBy, take: limit + 1, select: PUBLIC_REVIEW_SELECT })
      : prisma.review.findMany({ where: listWhere, orderBy, take: limit, skip, select: PUBLIC_REVIEW_SELECT });

    const [reviewsWithExtra, summary] = await Promise.all([
      reviewsPromise,
      prisma.productReviewSummary.findUnique({ where: { storeId_productId: summaryWhere } }),
    ]);

    const { allCount, ratingCounts, avgRating } = summaryStats(summary);
    const totalCount = filteredReviewTotal(summary, { ratingFilter, hasImagesFilter, hasMediaFilter });

    const reviews = cursor ? reviewsWithExtra.slice(0, limit) : reviewsWithExtra;
    const hasMore = cursor ? reviewsWithExtra.length > limit : page * limit < totalCount;
    const lastVisibleReview = reviews[reviews.length - 1];
    const nextCursor = hasMore && lastVisibleReview
      ? encodeReviewCursor({
          storeId,
          productId,
          orderBy: orderByKey,
          ratingFilter,
          hasImages: hasImagesFilter,
          hasMedia: hasMediaFilter,
          review: lastVisibleReview,
        })
      : null;
    const formattedReviews = reviews.map((review) => formatPublicReview(review, cloudName, storeId));

    const res = withCors(NextResponse.json({
      data: {
        reviews: formattedReviews,
        totalCount,
        allCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
        hasMore,
        nextCursor,
        ratingCounts,
        avgRating,
        photoReviewCount: summary?.photoReviewCount ?? 0,
        mediaReviewCount: summary?.mediaReviewCount ?? 0,
      },
    }));
    res.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res;
  } catch (error: any) {
    if (error instanceof Error && error.message === 'invalid_image_ref') {
      return withCors(NextResponse.json({ error: 'Image upload is not ready, expired, or belongs to another store.' }, { status: 400 }));
    }
    console.error('[GET] Reviews ERROR:', error);
    return withCors(NextResponse.json({ error: error.message }, { status: 500 }));
  }
}

/**
 * POST: Yeni yorum gönder
 */
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const publishedAwsVariantManifests: unknown[] = [];

  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return withCors(NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 }));
    }

    const { storeId, productId, rating, title, comment, author, images, videoToken } = body;
    const storeIdText = requiredString(storeId, 128);
    const productIdText = requiredString(productId, 128);
    const authorText = requiredString(author, 40);
    const titleText = optionalString(title, 60);
    const commentText = optionalString(comment, 2000);
    const videoTokenText = optionalString(videoToken, 256);
    const hasTitleInput = title !== undefined && title !== null && (typeof title !== 'string' || title.trim() !== '');
    const hasCommentInput = comment !== undefined && comment !== null && (typeof comment !== 'string' || comment.trim() !== '');
    const hasVideoTokenInput = videoToken !== undefined && videoToken !== null && videoToken !== '';

    // Validasyon — zorunlu alanlar ve tip/aralık kontrolleri
    if (!storeIdText || !productIdText || !authorText) {
      return withCors(NextResponse.json({ error: 'Lütfen gerekli tüm alanları doldurun.' }, { status: 400 }));
    }
    const ratingNum = Number(rating);
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return withCors(NextResponse.json({ error: 'Puan 1 ile 5 arasında olmalıdır.' }, { status: 400 }));
    }
    if (hasTitleInput && !titleText) {
      return withCors(NextResponse.json({ error: 'Başlık en fazla 60 karakter olabilir.' }, { status: 400 }));
    }
    if (hasCommentInput && !commentText) {
      return withCors(NextResponse.json({ error: 'Yorum en fazla 2000 karakter olabilir.' }, { status: 400 }));
    }
    if (hasVideoTokenInput && (!videoTokenText || videoTokenText.length < 32)) {
      return withCors(NextResponse.json({ error: 'Geçersiz video yükleme anahtarı.' }, { status: 400 }));
    }
    if (containsProfanity(titleText ?? '') || containsProfanity(commentText ?? '') || containsProfanity(authorText)) {
      return withCors(NextResponse.json({ error: 'Yorumunuz uygunsuz ifadeler içeriyor.' }, { status: 400 }));
    }

    // Rate limit — sentaktik olarak geçerli submit denemelerini say.
    if (!await checkRateLimit(ip)) {
      return withCors(NextResponse.json({ error: 'Çok fazla yorum gönderdiniz. Lütfen birkaç dakika bekleyin.' }, { status: 429 }));
    }

    const useAwsImages = isAwsReviewImageProviderEnabled();
    const cloudName = useAwsImages ? null : getConfiguredCloudinaryCloudName();
    const imageResult = useAwsImages
      ? { ok: true as const, urls: [] as string[] }
      : sanitizeReviewImageUrls(images, cloudName, storeIdText);
    if (!imageResult.ok) {
      if (imageResult.error === 'missing_cloud') {
        console.error('[POST] Reviews image validation misconfigured: missing Cloudinary cloud name');
        return withCors(NextResponse.json({ error: 'Görsel yükleme yapılandırması eksik.' }, { status: 500 }));
      }
      return withCors(NextResponse.json({ error: 'Geçersiz yorum görseli.' }, { status: 400 }));
    }

    const awsImageRefsResult = useAwsImages
      ? sanitizeAwsReviewImageRefs(images)
      : { ok: true as const, refs: [] };
    if (!awsImageRefsResult.ok) {
      return withCors(NextResponse.json({ error: 'Invalid review image reference.' }, { status: 400 }));
    }
    const imageCount = useAwsImages ? awsImageRefsResult.refs.length : imageResult.urls.length;

    if (videoTokenText && imageCount > 0) {
      return withCors(NextResponse.json({ error: 'Aynı yoruma fotoğraf ve video birlikte eklenemez.' }, { status: 400 }));
    }

    const verifiedProduct = await verifyReviewTarget(storeIdText, productIdText);
    if (!verifiedProduct) {
      return withCors(NextResponse.json({ error: 'Ürün doğrulanamadı. Lütfen sayfayı yenileyip tekrar deneyin.' }, { status: 400 }));
    }

    const reviewsWidget = await prisma.widgetSettings.findUnique({
      where: { storeId_widgetId: { storeId: storeIdText, widgetId: 'reviews' } },
    });
    const reviewsConfig = (reviewsWidget?.settings ?? {}) as Record<string, unknown>;

    // Otomatik onay eşiği — yıldıza göre status belirle.
    //   'manual' (default), '4plus', '5stars', 'all'
    // Eski boolean değer için geri uyumluluk: true → 'all', false → 'manual'.
    const rawAutoApprove = reviewsConfig.autoApprove;
    const autoApproveMode: string =
      rawAutoApprove === true ? 'all' :
      rawAutoApprove === false ? 'manual' :
      typeof rawAutoApprove === 'string' ? rawAutoApprove : 'manual';

    const shouldAutoApprove =
      autoApproveMode === 'all' ? true :
      autoApproveMode === '5stars' ? ratingNum === 5 :
      autoApproveMode === '4plus' ? ratingNum >= 4 :
      false;

    const initialStatus = videoTokenText ? 'pending' : (shouldAutoApprove ? 'approved' : 'pending');

    let awsPendingRows: AwsPendingReviewImageForSubmit[] = [];
    if (awsImageRefsResult.refs.length > 0) {
      const requestedSessions = awsImageRefsResult.refs.map((ref) => ref.uploadSessionId);
      const pendingRows = await prisma.pendingReviewImage.findMany({
        where: {
          storeId: storeIdText,
          provider: AWS_REVIEW_IMAGE_PROVIDER,
          uploadSessionId: { in: requestedSessions },
        },
        select: AWS_PENDING_IMAGE_SELECT,
      });
      const rowsBySession = new Map(pendingRows.map((row) => [row.uploadSessionId, row as AwsPendingReviewImageForSubmit]));
      awsPendingRows = awsImageRefsResult.refs.map((ref) => {
        const row = rowsBySession.get(ref.uploadSessionId);
        if (!row) throw new Error('invalid_image_ref');
        if (
          row.storeId !== storeIdText ||
          row.providerAssetId !== ref.assetId ||
          row.sourceAssetId !== ref.objectKey ||
          row.mimeType !== ref.contentType ||
          row.bytes !== ref.bytes ||
          row.sourceChecksumAlgorithm !== 'SHA256' ||
          row.sourceChecksumSha256 !== ref.checksumSha256 ||
          row.variantStatus !== 'private_ready' ||
          !row.variantManifest ||
          (row.uploadExpiresAt && row.uploadExpiresAt <= new Date())
        ) {
          throw new Error('invalid_image_ref');
        }
        return row;
      });
    }

    if (initialStatus === 'approved' && awsPendingRows.length > 0) {
      try {
        for (const row of awsPendingRows) {
          await publishAwsReviewImageVariants(row.variantManifest);
          publishedAwsVariantManifests.push(row.variantManifest);
        }
      } catch (error) {
        console.error('[POST] Reviews AWS image publish failed:', error instanceof Error ? error.message : error);
        if (publishedAwsVariantManifests.length > 0) {
          await compensatePublishedAwsReviewImages(publishedAwsVariantManifests, '[POST] Reviews');
        }
        return withCors(NextResponse.json({ error: 'Image publication failed.' }, { status: 500 }));
      }
    }

    // Atomic commit: create Review and remove any PendingReviewImage rows
    // tied to the publicIds this review consumes. Rows that were never
    // registered are silently ignored — the weekly fallback scan catches them.
    const committedPublicIds = useAwsImages
      ? awsPendingRows.map((row) => row.publicId)
      : imageResult.urls
          .map((url) => getReviewImagePublicId(url, cloudName, storeIdText))
          .filter((id): id is string => !!id);
    const committedAwsPublicUrls = initialStatus === 'approved' ? publicUrlsFromAwsPendingRows(awsPendingRows) : [];

    const newReview = await prisma.$transaction(async (tx) => {
      const videoSession = videoTokenText
        ? await tx.videoUploadSession.findUnique({ where: { tokenHash: hashMediaToken(videoTokenText) } })
        : null;
      if (videoTokenText && (
        !videoSession ||
        videoSession.storeId !== storeIdText ||
        videoSession.productId !== productIdText ||
        videoSession.status !== 'ready' ||
        !videoSession.publicId ||
        videoSession.provider !== VIDEO_PROVIDER ||
        !videoSession.providerAssetId ||
        !videoSession.signedPlaybackId ||
        !videoSession.playbackUrl ||
        !videoSession.posterUrl ||
        !videoSession.durationMs ||
        videoSession.expiresAt <= new Date()
      )) {
        throw new Error('invalid_video_session');
      }
      if (videoSession) {
        const consumed = await tx.videoUploadSession.updateMany({
          where: { id: videoSession.id, status: 'ready' },
          data: { status: 'consumed', consumedAt: new Date() },
        });
        if (consumed.count !== 1) throw new Error('invalid_video_session');
        await supersedeSessionLifecycleJobs(tx, videoSession.id, [
          MEDIA_JOB_ACTIONS.expireUploadSession,
          MEDIA_JOB_ACTIONS.reconcileVideo,
        ]);
      }

      const created = await tx.review.create({
        data: {
          storeId: storeIdText,
          productId: productIdText,
          slug: verifiedProduct.slug ?? '',
          productName: verifiedProduct.name ?? null,
          rating: ratingNum,
          title: titleText,
          comment: commentText ?? '',
          author: authorText,
          email: '',
          images: useAwsImages
            ? (committedAwsPublicUrls.length ? JSON.stringify(committedAwsPublicUrls) : null)
            : (imageResult.urls.length ? JSON.stringify(imageResult.urls) : null),
          hasImages: imageCount > 0,
          hasVideo: !!videoSession,
          status: initialStatus,
        },
      });

      const pendingMetadata = committedPublicIds.length > 0
        ? await tx.pendingReviewImage.findMany({
            where: { publicId: { in: committedPublicIds }, storeId: storeIdText },
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
          })
        : [];

      const mediaRows = buildReviewMediaCreateManyData({
        urls: imageResult.urls,
        cloudName,
        storeId: storeIdText,
        productId: productIdText,
        reviewId: created.id,
        visible: initialStatus === 'approved',
        metadataByPublicId: pendingMetadataMap(pendingMetadata),
      });
      if (mediaRows.length > 0) {
        await tx.reviewMedia.createMany({
          data: mediaRows,
          skipDuplicates: true,
        });
      }

      const awsMediaRows = useAwsImages
        ? buildAwsReviewMediaCreateManyData({
            rows: awsPendingRows,
            storeId: storeIdText,
            productId: productIdText,
            reviewId: created.id,
            visible: initialStatus === 'approved',
          })
        : [];
      if (awsMediaRows.length > 0) {
        await tx.reviewMedia.createMany({
          data: awsMediaRows,
          skipDuplicates: true,
        });
      }

      if (videoSession) {
        const pendingVideo = await tx.pendingReviewImage.findUnique({
          where: { publicId: videoSession.publicId! },
          select: {
            metadataSource: true,
            metadataStatus: true,
            metadataFetchedAt: true,
          },
        });
        await tx.reviewMedia.create({
          data: {
            reviewId: created.id,
            storeId: storeIdText,
            productId: productIdText,
            url: videoSession.playbackUrl!,
            publicId: videoSession.publicId!,
            resourceType: 'video',
            provider: VIDEO_PROVIDER,
            providerAssetId: videoSession.providerAssetId,
            posterUrl: videoSession.posterUrl,
            durationMs: videoSession.durationMs,
            processingStatus: 'ready',
            sourceProvider: null,
            sourceAssetId: null,
            mimeType: videoSession.mimeType,
            bytes: videoSession.bytes,
            metadataSource: pendingVideo?.metadataSource ?? 'mux_webhook',
            metadataStatus: pendingVideo?.metadataStatus ?? 'complete',
            metadataFetchedAt: pendingVideo?.metadataFetchedAt ?? new Date(),
            position: 0,
            visible: false,
          },
        });
        await tx.pendingReviewImage.deleteMany({
          where: { uploadSessionId: videoSession.id, provider: VIDEO_PROVIDER, resourceType: 'video' },
        });
      }

      if (committedPublicIds.length > 0) {
        await tx.pendingReviewImage.deleteMany({
          where: { publicId: { in: committedPublicIds }, storeId: storeIdText },
        });
      }

      await applyReviewSummaryVisibilityChange(tx, null, created);

      return created;
    });

    return withCors(NextResponse.json({
      message: 'Yorum alındı',
      data: {
        id: newReview.id,
        status: newReview.status,
      },
    }, { status: 201 }));
  } catch (error: any) {
    if (publishedAwsVariantManifests.length > 0) {
      await compensatePublishedAwsReviewImages(publishedAwsVariantManifests, '[POST] Reviews');
    }
    if (error instanceof Error && error.message === 'invalid_video_session') {
      return withCors(NextResponse.json({ error: 'Video yüklemesi hazır değil, süresi dolmuş veya bu ürüne ait değil.' }, { status: 400 }));
    }
    console.error('[POST] Reviews ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 }));
  }
}
