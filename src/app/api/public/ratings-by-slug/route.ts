import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const setCorsHeaders = (res: NextResponse) => {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
};

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 204 }));
}

/**
 * POST: Slug listesi al, her slug için avg rating ve yorum sayısı döndür
 * Body: { storeId: string, slugs: string[] }
 * Response: { data: { [slug]: { avgRating: number, totalCount: number } } }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storeId, slugs, cacheSlug } = body;

    if (!storeId) {
      return setCorsHeaders(NextResponse.json({ error: 'Eksik parametre' }, { status: 400 }));
    }

    // Ürün detay sayfasından gelen slug → productId cache'leme
    if (cacheSlug && cacheSlug.slug && cacheSlug.productId) {
      await prisma.productSlugCache.upsert({
        where: { storeId_slug: { storeId, slug: cacheSlug.slug } },
        update: { productId: cacheSlug.productId },
        create: { storeId, slug: cacheSlug.slug, productId: cacheSlug.productId },
      }).catch(() => {});
      // Sadece cache yazma isteğiyse erken dön
      if (!Array.isArray(slugs) || slugs.length === 0) {
        return setCorsHeaders(NextResponse.json({ data: {} }));
      }
    }

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return setCorsHeaders(NextResponse.json({ error: 'Eksik parametre' }, { status: 400 }));
    }

    // Slug'ları cache'den çek
    const cachedSlugs = await prisma.productSlugCache.findMany({
      where: { storeId, slug: { in: slugs } },
    });

    // Cache'de olmayan slug'ları bul
    const cachedSlugSet = new Set(cachedSlugs.map((c: any) => c.slug));
    const missingSlugs = slugs.filter((s: string) => !cachedSlugSet.has(s));

    // Cache miss olan slug'lar için şimdilik yapacak bir şey yok.
    // slug → productId eşleştirmesi, kullanıcı ürün detay sayfasını ziyaret ettiğinde
    // otomatik olarak cacheSlug mekanizmasıyla doldurulur.

    // Her slug için productId'yi bul, DB'den rating çek
    const result: Record<string, { avgRating: number; totalCount: number }> = {};

    const productIds = cachedSlugs.map((c: any) => c.productId);
    if (productIds.length > 0) {
      const reviews = await prisma.review.findMany({
        where: { storeId, productId: { in: productIds }, status: 'approved' },
        select: { productId: true, rating: true },
      });

      // productId → { sum, count } hesapla
      const ratingMap: Record<string, { sum: number; count: number }> = {};
      for (const r of reviews) {
        if (!ratingMap[r.productId]) ratingMap[r.productId] = { sum: 0, count: 0 };
        ratingMap[r.productId].sum += r.rating;
        ratingMap[r.productId].count += 1;
      }

      // slug → rating eşleştir
      for (const cache of cachedSlugs) {
        const stats = ratingMap[cache.productId];
        if (stats && stats.count > 0) {
          result[cache.slug] = {
            avgRating: parseFloat((stats.sum / stats.count).toFixed(1)),
            totalCount: stats.count,
          };
        }
      }
    }

    const res = NextResponse.json({ data: result });
    res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return setCorsHeaders(res);
  } catch (error: any) {
    console.error('[POST] ratings-by-slug ERROR:', error);
    return setCorsHeaders(NextResponse.json({ error: error.message }, { status: 500 }));
  }
}
