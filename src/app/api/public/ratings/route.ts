import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * GET /api/public/ratings?storeId=<id>&productIds=id1,id2,...
 * Returns approved review count and average rating per canonical ikas product id.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('storeId');
    const productIdsParam = searchParams.get('productIds');

    if (!storeId || typeof storeId !== 'string' || !productIdsParam) {
      return withCors(NextResponse.json({ data: {} }));
    }

    const productIds = productIdsParam.split(',').filter(Boolean);
    if (productIds.length === 0) {
      return withCors(NextResponse.json({ data: {} }));
    }

    const seen: Record<string, boolean> = {};
    const safeProductIds = productIds
      .map((id) => id.trim())
      .filter((id) => {
        if (!id || id.length > 128 || seen[id]) return false;
        seen[id] = true;
        return true;
      })
      .slice(0, 100);

    if (safeProductIds.length === 0) {
      return withCors(NextResponse.json({ data: {} }));
    }

    const rows = await prisma.review.groupBy({
      by: ['productId'],
      where: {
        storeId,
        productId: { in: safeProductIds },
        status: 'approved',
      },
      _avg: { rating: true },
      _count: { rating: true },
    });

    const data: Record<string, { avg: string; count: number }> = {};
    for (const row of rows) {
      const count = row._count.rating;
      const avg = row._avg.rating ?? 0;
      data[row.productId] = { avg: avg.toFixed(1), count };
    }

    const res = withCors(NextResponse.json({ data }));
    res.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res;
  } catch (error) {
    console.error('[ratings] ERROR:', error);
    return withCors(NextResponse.json({ data: {} }, { status: 500 }));
  }
}
