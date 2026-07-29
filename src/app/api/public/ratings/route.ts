import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { anonymousPublicCorsOptions, withAnonymousPublicCors } from '@/lib/cors';
import { checkFixedWindowRateLimit, getClientIp } from '@/lib/public-rate-limit';
import { publicRatingFromSummary } from '@/lib/review-summary';

const RATINGS_RATE_LIMIT_MAX = 300;
const RATINGS_RATE_LIMIT_WINDOW_SEC = 60;

export async function OPTIONS() {
  return anonymousPublicCorsOptions(['GET']);
}

function rateLimitedResponse() {
  const res = withAnonymousPublicCors(NextResponse.json({ data: {} }, { status: 429 }));
  res.headers.set('Cache-Control', 'no-store');
  res.headers.set('Retry-After', String(RATINGS_RATE_LIMIT_WINDOW_SEC));
  res.headers.set('X-RateLimit-Limit', String(RATINGS_RATE_LIMIT_MAX));
  res.headers.set('X-RateLimit-Remaining', '0');
  return res;
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
      return withAnonymousPublicCors(NextResponse.json({ data: {} }));
    }

    const productIds = productIdsParam.split(',').filter(Boolean);
    if (productIds.length === 0) {
      return withAnonymousPublicCors(NextResponse.json({ data: {} }));
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
      return withAnonymousPublicCors(NextResponse.json({ data: {} }));
    }

    const rateLimit = await checkFixedWindowRateLimit({
      key: `renuvex_pr_ratings_rl:${getClientIp(request)}`,
      max: RATINGS_RATE_LIMIT_MAX,
      windowSec: RATINGS_RATE_LIMIT_WINDOW_SEC,
      label: 'public-ratings',
    });
    if (!rateLimit.allowed) {
      return rateLimitedResponse();
    }

    const rows = await prisma.productReviewSummary.findMany({
      where: {
        storeId,
        productId: { in: safeProductIds },
      },
    });

    const data: Record<string, { avg: string; count: number }> = {};
    for (const row of rows) {
      const rating = publicRatingFromSummary(row);
      if (rating) data[row.productId] = rating;
    }

    const res = withAnonymousPublicCors(NextResponse.json({ data }));
    res.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res;
  } catch (error) {
    console.error('[ratings] ERROR:', error);
    return withAnonymousPublicCors(NextResponse.json({ data: {} }, { status: 500 }));
  }
}
