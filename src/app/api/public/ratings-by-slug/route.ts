import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { anonymousPublicCorsOptions, withAnonymousPublicCors } from '@/lib/cors';
import { checkFixedWindowRateLimit, getClientIp } from '@/lib/public-rate-limit';
import { publicRatingFromSummary } from '@/lib/review-summary';
import { resolveSafeSlugProductIds } from '@/lib/product-lifecycle';
import { reportServerFailure } from '@/lib/server-failures';

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

function dataResponse(data: Record<string, { avg: string; count: number }>, status = 200) {
  const response = withAnonymousPublicCors(NextResponse.json({ data }, { status }));
  response.headers.set('Cache-Control', 'no-store');
  return response;
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
      return dataResponse({});
    }

    const slugs = slugsParam.split(',').filter(Boolean);

    if (slugs.length === 0) {
      return dataResponse({});
    }

    // Max 100 slug — sonsuz sorgu engeli
    const safeSlugs = slugs
      .filter((s: string) => typeof s === 'string' && s.length > 0 && s.length <= 200)
      .slice(0, 100);

    if (safeSlugs.length === 0) {
      return dataResponse({});
    }

    const rateLimit = await checkFixedWindowRateLimit({
      key: `renuvex_pr_ratings_rl:${getClientIp(request)}`,
      max: RATINGS_RATE_LIMIT_MAX,
      windowSec: RATINGS_RATE_LIMIT_WINDOW_SEC,
      label: 'public-ratings-by-slug',
    });
    if (!rateLimit.allowed) {
      return rateLimitedResponse();
    }

    const data: Record<string, { avg: string; count: number }> = {};

    const snapshots = await prisma.productSnapshot.findMany({
      where: {
        storeId,
        slug: { in: safeSlugs },
      },
      select: {
        slug: true,
        productId: true,
        lifecycleState: true,
        lastVerifiedAt: true,
      },
    });
    const slugToProductId = resolveSafeSlugProductIds(snapshots);

    const resolvedProductIds = Array.from(new Set(Object.values(slugToProductId)));
    if (resolvedProductIds.length > 0) {
      const productRows = await prisma.productReviewSummary.findMany({
        where: {
          storeId,
          productId: { in: resolvedProductIds },
        },
      });

      const productRatings: Record<string, { avg: string; count: number }> = {};
      for (const row of productRows) {
        const rating = publicRatingFromSummary(row);
        if (rating) productRatings[row.productId] = rating;
      }

      for (const slug of Object.keys(slugToProductId)) {
        const rating = productRatings[slugToProductId[slug]];
        if (rating) data[slug] = rating;
      }
    }

    return dataResponse(data);
  } catch {
    reportServerFailure('public_ratings_by_slug_failed');
    return dataResponse({}, 500);
  }
}
