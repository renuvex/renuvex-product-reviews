import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { Redis } from '@upstash/redis';

// Upstash Redis — tüm Vercel instance'larında ortak rate limit
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_SEC = 10 * 60; // 10 dakika

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

async function checkRateLimit(ip: string): Promise<boolean> {
  const key = `ikr_rl:${ip}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, RATE_LIMIT_WINDOW_SEC);
  return count <= RATE_LIMIT_MAX;
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
    const limit = 10;
    const skip = (page - 1) * limit;

    const orderByParam = searchParams.get('orderBy') ?? 'newest';
    const orderBy =
      orderByParam === 'highest' ? { rating: 'desc' as const } :
      orderByParam === 'lowest'  ? { rating: 'asc'  as const } :
                                   { createdAt: 'desc' as const };

    const ratingParam = searchParams.get('rating');
    const ratingFilter = ratingParam ? parseInt(ratingParam, 10) : null;
    const where = {
      storeId,
      productId,
      status: 'approved',
      ...(ratingFilter && ratingFilter >= 1 && ratingFilter <= 5 ? { rating: ratingFilter } : {}),
    };

    // Filtreden bağımsız — bar chart için tüm approved yorumların dağılımı
    const baseWhere = { storeId, productId, status: 'approved' };

    const [reviews, totalCount, ratingGroups] = await Promise.all([
      prisma.review.findMany({ where, orderBy, take: limit, skip }),
      prisma.review.count({ where }),
      prisma.review.groupBy({
        by: ['rating'],
        where: baseWhere,
        _count: { rating: true },
        _sum: { rating: true },
      }),
    ]);

    const ratingCounts = [0, 0, 0, 0, 0];
    let ratingSum = 0;
    let allCount = 0;
    ratingGroups.forEach((g: any) => {
      if (g.rating >= 1 && g.rating <= 5) {
        ratingCounts[g.rating - 1] = g._count.rating;
        ratingSum += g._sum.rating ?? 0;
        allCount += g._count.rating;
      }
    });
    const avgRating = allCount > 0 ? (ratingSum / allCount).toFixed(1) : null;

    const formattedReviews = reviews.map((r: any) => {
      let parsedImages: string[] = [];
      try {
        parsedImages = r.images ? JSON.parse(r.images) : [];
      } catch (e) {
        console.error('JSON Parse Error for review images:', r.id, e);
      }
      return { ...r, images: parsedImages };
    });

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
  if (!await checkRateLimit(ip)) {
    return withCors(NextResponse.json({ error: 'Çok fazla yorum gönderdiniz. Lütfen birkaç dakika bekleyin.' }, { status: 429 }));
  }

  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return withCors(NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 }));
    }

    const { storeId, productId, slug, productName, rating, title, comment, author, email, images } = body;

    // [9] Validasyon — zorunlu alanlar ve tip/aralık kontrolleri
    if (!storeId || !productId || !author) {
      return withCors(NextResponse.json({ error: 'Lütfen gerekli tüm alanları doldurun.' }, { status: 400 }));
    }
    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return withCors(NextResponse.json({ error: 'Puan 1 ile 5 arasında olmalıdır.' }, { status: 400 }));
    }
    if (typeof author !== 'string' || author.trim().length < 2 || author.trim().length > 40) {
      return withCors(NextResponse.json({ error: 'Ad en az 2, en fazla 40 karakter olmalıdır.' }, { status: 400 }));
    }
    if (title && typeof title === 'string' && title.trim().length > 60) {
      return withCors(NextResponse.json({ error: 'Başlık en fazla 60 karakter olabilir.' }, { status: 400 }));
    }
    if (comment && typeof comment === 'string' && comment.length > 2000) {
      return withCors(NextResponse.json({ error: 'Yorum en fazla 2000 karakter olabilir.' }, { status: 400 }));
    }
    if (containsProfanity(title) || containsProfanity(comment) || containsProfanity(author)) {
      return withCors(NextResponse.json({ error: 'Yorumunuz uygunsuz ifadeler içeriyor.' }, { status: 400 }));
    }

    const settings = await prisma.storeSettings.findUnique({ where: { storeId } });
    const initialStatus = settings?.autoApprove ? 'approved' : 'pending';

    const newReview = await prisma.review.create({
      data: {
        storeId: String(storeId),
        productId: String(productId),
        slug: String(slug || ''),
        productName: productName ? String(productName) : null,
        rating: ratingNum,
        title: title ? String(title).trim() : null,
        comment: comment || '',
        author: String(author).trim(),
        email: email || '',
        images: images && Array.isArray(images) ? JSON.stringify(images) : null,
        status: initialStatus,
      },
    });

    return withCors(NextResponse.json({ message: 'Yorum alındı', data: newReview }, { status: 201 }));
  } catch (error: any) {
    console.error('[POST] Reviews ERROR:', error);
    return withCors(NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 }));
  }
}
