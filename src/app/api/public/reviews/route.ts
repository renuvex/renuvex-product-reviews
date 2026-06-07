import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { Redis } from '@upstash/redis';
import {
  getConfiguredCloudinaryCloudName,
  getReviewImagePublicId,
  sanitizeReviewImageUrls,
} from '@/lib/review-images';
import { buildReviewMediaCreateManyData, publicImagesFromMediaOrLegacy, type PublicReviewMediaRow } from '@/lib/review-media';
import { applyReviewSummaryVisibilityChange, summaryStats } from '@/lib/review-summary';

// Upstash Redis — tüm Vercel instance'larında ortak rate limit
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_SEC = 10 * 60; // 10 dakika
const PUBLIC_REVIEW_SELECT = {
  id: true,
  rating: true,
  title: true,
  comment: true,
  author: true,
  merchantReply: true,
  images: true,
  media: {
    where: { visible: true },
    orderBy: { position: 'asc' as const },
    select: { url: true, position: true },
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
  return {
    id: review.id,
    rating: review.rating,
    title: review.title,
    comment: review.comment,
    author: maskAuthor(review.author),
    merchantReply: review.merchantReply,
    images: publicImagesFromMediaOrLegacy(review.media, review.images, cloudName, storeId),
    createdAt: review.createdAt.toISOString(),
  };
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

    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    // limit: ana liste için 10 (default); photo-strip newest-first fetch için 15.
    // 1-30 aralığında clamp — kötüye kullanım önlemi.
    const limitParam = parseInt(searchParams.get('limit') ?? '10', 10);
    const limit = Number.isFinite(limitParam) ? Math.min(30, Math.max(1, limitParam)) : 10;
    const skip = (page - 1) * limit;

    const orderByParam = searchParams.get('orderBy') ?? 'newest';
    const orderBy =
      orderByParam === 'highest' ? { rating: 'desc' as const } :
      orderByParam === 'lowest'  ? { rating: 'asc'  as const } :
                                   { createdAt: 'desc' as const };

    const ratingParam = searchParams.get('rating');
    const ratingFilter = ratingParam ? parseInt(ratingParam, 10) : null;
    const hasImagesFilter = searchParams.get('hasImages') === 'true';
    const cloudName = getConfiguredCloudinaryCloudName();

    const where = {
      storeId,
      productId,
      status: 'approved',
      ...(ratingFilter && ratingFilter >= 1 && ratingFilter <= 5 ? { rating: ratingFilter } : {}),
      ...(hasImagesFilter ? { hasImages: true } : {}),
    };

    // Filtreden bağımsız — bar chart için tüm approved yorumların dağılımı
    const summaryWhere = { storeId, productId };

    const [reviews, totalCount, summary] = await Promise.all([
      prisma.review.findMany({ where, orderBy, take: limit, skip, select: PUBLIC_REVIEW_SELECT }),
      prisma.review.count({ where }),
      prisma.productReviewSummary.findUnique({ where: { storeId_productId: summaryWhere } }),
    ]);

    const { allCount, ratingCounts, avgRating } = summaryStats(summary);

    const formattedReviews = reviews.map((review) => formatPublicReview(review, cloudName, storeId));

    const res = withCors(NextResponse.json({
      data: {
        reviews: formattedReviews,
        totalCount,
        allCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
        hasMore: page * limit < totalCount,
        ratingCounts,
        avgRating,
      },
    }));
    res.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res;
  } catch (error: any) {
    console.error('[GET] Reviews ERROR:', error);
    return withCors(NextResponse.json({ error: error.message }, { status: 500 }));
  }
}

/**
 * POST: Yeni yorum gönder
 */
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return withCors(NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 }));
    }

    const { storeId, productId, rating, title, comment, author, images } = body;
    const storeIdText = requiredString(storeId, 128);
    const productIdText = requiredString(productId, 128);
    const authorText = requiredString(author, 40);
    const titleText = optionalString(title, 60);
    const commentText = optionalString(comment, 2000);
    const hasTitleInput = title !== undefined && title !== null && (typeof title !== 'string' || title.trim() !== '');
    const hasCommentInput = comment !== undefined && comment !== null && (typeof comment !== 'string' || comment.trim() !== '');

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
    if (containsProfanity(titleText ?? '') || containsProfanity(commentText ?? '') || containsProfanity(authorText)) {
      return withCors(NextResponse.json({ error: 'Yorumunuz uygunsuz ifadeler içeriyor.' }, { status: 400 }));
    }

    // Rate limit — sentaktik olarak geçerli submit denemelerini say.
    if (!await checkRateLimit(ip)) {
      return withCors(NextResponse.json({ error: 'Çok fazla yorum gönderdiniz. Lütfen birkaç dakika bekleyin.' }, { status: 429 }));
    }

    const cloudName = getConfiguredCloudinaryCloudName();
    const imageResult = sanitizeReviewImageUrls(images, cloudName, storeIdText);
    if (!imageResult.ok) {
      if (imageResult.error === 'missing_cloud') {
        console.error('[POST] Reviews image validation misconfigured: missing Cloudinary cloud name');
        return withCors(NextResponse.json({ error: 'Görsel yükleme yapılandırması eksik.' }, { status: 500 }));
      }
      return withCors(NextResponse.json({ error: 'Geçersiz yorum görseli.' }, { status: 400 }));
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

    const initialStatus = shouldAutoApprove ? 'approved' : 'pending';

    // Atomic commit: create Review and remove any PendingReviewImage rows
    // tied to the publicIds this review consumes. Rows that were never
    // registered are silently ignored — the weekly fallback scan catches them.
    const committedPublicIds = imageResult.urls
      .map((url) => getReviewImagePublicId(url, cloudName, storeIdText))
      .filter((id): id is string => !!id);

    const newReview = await prisma.$transaction(async (tx) => {
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
          images: imageResult.urls.length ? JSON.stringify(imageResult.urls) : null,
          hasImages: imageResult.urls.length > 0,
          status: initialStatus,
        },
      });

      const mediaRows = buildReviewMediaCreateManyData({
        urls: imageResult.urls,
        cloudName,
        storeId: storeIdText,
        productId: productIdText,
        reviewId: created.id,
        visible: initialStatus === 'approved',
      });
      if (mediaRows.length > 0) {
        await tx.reviewMedia.createMany({
          data: mediaRows,
          skipDuplicates: true,
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
    console.error('[POST] Reviews ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 }));
  }
}
