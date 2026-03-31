import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * GET /api/public/ratings-by-slug?storeId=<id>&slugs=slug1,slug2,...
 * Returns approved review count and average rating per slug.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('storeId');
    const slugsParam = searchParams.get('slugs');

    if (!storeId || typeof storeId !== 'string' || !slugsParam) {
      return withCors(NextResponse.json({ data: {} }));
    }

    const slugs = slugsParam.split(',').filter(Boolean);

    if (slugs.length === 0) {
      return withCors(NextResponse.json({ data: {} }));
    }

    // Max 100 slug — sonsuz sorgu engeli
    const safeSlugs = slugs
      .filter((s: string) => typeof s === 'string' && s.length > 0 && s.length <= 200)
      .slice(0, 100);

    if (safeSlugs.length === 0) {
      return withCors(NextResponse.json({ data: {} }));
    }

    const reviews = await prisma.review.findMany({
      where: {
        storeId,
        slug: { in: safeSlugs },
        status: 'approved',
      },
      select: { slug: true, rating: true },
    });

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

    const res = withCors(NextResponse.json({ data }));
    res.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res;
  } catch (error: any) {
    console.error('[ratings-by-slug] ERROR:', error);
    return withCors(NextResponse.json({ data: {} }, { status: 500 }));
  }
}
