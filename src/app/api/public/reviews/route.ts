import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';

// IP bazlı rate limit — aynı IP'den 10 dakikada max 3 yorum
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
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

    const [reviews, totalCount] = await Promise.all([
      prisma.review.findMany({
        where: { storeId, productId, status: 'approved' },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.review.count({
        where: { storeId, productId, status: 'approved' },
      }),
    ]);

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
        page,
        totalPages: Math.ceil(totalCount / limit),
        hasMore: page * limit < totalCount,
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
  if (!checkRateLimit(ip)) {
    return withCors(NextResponse.json({ error: 'Çok fazla istek. Lütfen bekleyin.' }, { status: 429 }));
  }

  try {
    let body: any;
    try {
      body = await request.json();
    } catch {
      return withCors(NextResponse.json({ error: 'Geçersiz istek gövdesi.' }, { status: 400 }));
    }

    const { storeId, productId, slug, productName, rating, comment, author, email, images } = body;

    // [9] Validasyon — zorunlu alanlar ve tip/aralık kontrolleri
    if (!storeId || !productId || !author) {
      return withCors(NextResponse.json({ error: 'Lütfen gerekli tüm alanları doldurun.' }, { status: 400 }));
    }
    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return withCors(NextResponse.json({ error: 'Puan 1 ile 5 arasında olmalıdır.' }, { status: 400 }));
    }
    if (typeof author !== 'string' || author.trim().length < 2 || author.trim().length > 100) {
      return withCors(NextResponse.json({ error: 'Ad en az 2, en fazla 100 karakter olmalıdır.' }, { status: 400 }));
    }
    if (comment && typeof comment === 'string' && comment.length > 2000) {
      return withCors(NextResponse.json({ error: 'Yorum en fazla 2000 karakter olabilir.' }, { status: 400 }));
    }

    const settings = await prisma.storeSettings.findUnique({ where: { storeId } });
    const initialStatus = settings?.autoApprove ? 'approved' : 'pending';

    const newReview = await prisma.review.create({
      data: {
        storeId: String(storeId),
        productId: String(productId),
        slug: slug ? String(slug) : null,
        productName: productName ? String(productName) : null,
        rating: ratingNum,
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
