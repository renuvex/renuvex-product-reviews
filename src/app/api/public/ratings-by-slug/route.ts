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

    const data: Record<string, { avg: string; count: number }> = {};

    const snapshots = await prisma.productSnapshot.findMany({
      where: {
        storeId,
        slug: { in: safeSlugs },
        deleted: false,
      },
      select: { slug: true, productId: true },
    });

    const slugToProductId: Record<string, string> = {};
    for (const snapshot of snapshots) {
      if (snapshot.slug && !slugToProductId[snapshot.slug]) {
        slugToProductId[snapshot.slug] = snapshot.productId;
      }
    }

    const resolvedProductIds = Array.from(new Set(Object.values(slugToProductId)));
    if (resolvedProductIds.length > 0) {
      const productRows = await prisma.review.groupBy({
        by: ['productId'],
        where: {
          storeId,
          productId: { in: resolvedProductIds },
          status: 'approved',
        },
        _avg: { rating: true },
        _count: { rating: true },
      });

      const productRatings: Record<string, { avg: string; count: number }> = {};
      for (const row of productRows) {
        productRatings[row.productId] = { avg: (row._avg.rating ?? 0).toFixed(1), count: row._count.rating };
      }

      for (const slug of Object.keys(slugToProductId)) {
        const rating = productRatings[slugToProductId[slug]];
        if (rating) data[slug] = rating;
      }
    }

    const unresolvedSlugs = safeSlugs.filter((slug) => !slugToProductId[slug]);
    if (unresolvedSlugs.length > 0) {
      const reviews = await prisma.review.findMany({
        where: {
          storeId,
          slug: { in: unresolvedSlugs },
          status: 'approved',
        },
        select: { slug: true, rating: true },
      });

      const map: Record<string, { sum: number; count: number }> = {};
      for (const r of reviews) {
        if (!map[r.slug]) map[r.slug] = { sum: 0, count: 0 };
        map[r.slug].sum += r.rating;
        map[r.slug].count += 1;
      }

      for (const slug of Object.keys(map)) {
        const { sum, count } = map[slug];
        data[slug] = { avg: (sum / count).toFixed(1), count };
      }
    }

    const res = withCors(NextResponse.json({ data }));
    res.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res;
  } catch (error: any) {
    console.error('[ratings-by-slug] ERROR:', error);
    return withCors(NextResponse.json({ data: {} }, { status: 500 }));
  }
}
