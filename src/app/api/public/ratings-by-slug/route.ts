import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * POST: Slug listesi alır, her slug için onaylı yorum sayısı ve ortalama puanı döner.
 * Body: { storeId: string, slugs: string[] }
 * Response: { data: { [slug]: { avg: number, count: number } } }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { storeId, slugs } = body;

    if (!storeId || typeof storeId !== 'string' || !Array.isArray(slugs) || slugs.length === 0) {
      return withCors(NextResponse.json({ data: {} }));
    }

    // [C] Max 100 slug — sonsuz sorgu engeli
    const safeSlugs = slugs
      .filter((s: unknown) => typeof s === 'string' && s.length > 0 && s.length <= 200)
      .slice(0, 100);

    if (safeSlugs.length === 0) {
      return withCors(NextResponse.json({ data: {} }));
    }

    // Tüm slug'lar için onaylı yorumları tek sorguda çek
    const reviews = await prisma.review.findMany({
      where: {
        storeId,
        slug: { in: safeSlugs },
        status: 'approved',
      },
      select: { slug: true, rating: true },
    });

    // slug → { avg, count } map'i oluştur
    const map: Record<string, { sum: number; count: number }> = {};
    for (const r of reviews) {
      if (!r.slug) continue;
      if (!map[r.slug]) map[r.slug] = { sum: 0, count: 0 };
      map[r.slug].sum += r.rating;
      map[r.slug].count += 1;
    }

    const data: Record<string, { avg: string; count: number }> = {};
    for (const slug of Object.keys(map)) {
      const { sum, count } = map[slug];
      data[slug] = { avg: (sum / count).toFixed(1), count };
    }

    const res = NextResponse.json({ data });
    res.headers.set('Cache-Control', 'no-store');
    return withCors(res);
  } catch (error: any) {
    console.error('[ratings-by-slug] ERROR:', error);
    return withCors(NextResponse.json({ data: {} }, { status: 500 }));
  }
}
