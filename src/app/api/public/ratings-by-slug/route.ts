import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { anonymousPublicCorsOptions, withAnonymousPublicCors } from '@/lib/cors';
import { checkFixedWindowRateLimit, getClientIp } from '@/lib/public-rate-limit';
import { publicRatingFromSummary } from '@/lib/review-summary';
import {
  resolveCurrentCatalogCoverageStartedAt,
  resolveSafeSlugProductIds,
} from '@/lib/product-lifecycle';
import { reportServerFailure } from '@/lib/server-failures';

const RATINGS_RATE_LIMIT_MAX = 300;
const RATINGS_RATE_LIMIT_WINDOW_SEC = 60;

type ResolvedSlugRating = {
  productId: string;
  avg: string;
  count: number;
};

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

function dataResponse(data: Record<string, ResolvedSlugRating>, status = 200) {
  const response = withAnonymousPublicCors(NextResponse.json({ data }, { status }));
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

/**
 * GET /api/public/ratings-by-slug?storeId=<id>&slugs=slug1,slug2,...
 * Resolves each lifecycle-safe slug to its canonical ikas product id, then
 * returns the approved review count and average for that id.
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

    // Bound and deduplicate the public batch before any database read.
    const seenSlugs = new Set<string>();
    const safeSlugs = slugs
      .map((slug) => slug.trim())
      .filter((slug) => {
        if (!slug || slug.length > 200 || seenSlugs.has(slug)) return false;
        seenSlugs.add(slug);
        return true;
      })
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

    const data: Record<string, ResolvedSlugRating> = {};

    const [snapshots, installation] = await Promise.all([
      prisma.productSnapshot.findMany({
        where: {
          storeId,
          slug: { in: safeSlugs },
        },
        select: {
          slug: true,
          productId: true,
          lifecycleState: true,
          lastVerifiedAt: true,
          exactEvidenceAuthorizedAppId: true,
          exactEvidenceGeneration: true,
          exactEvidenceStateVersion: true,
        },
      }),
      prisma.ikasStoreInstallation.findUnique({
        where: { storeId },
        select: {
          authorizedAppId: true,
          generation: true,
          stateVersion: true,
          status: true,
        },
      }),
    ]);
    const coverage = installation?.status === 'active'
      ? await prisma.productCatalogCoverage.findUnique({
          where: {
            storeId,
          },
          select: {
            storeId: true,
            authorizedAppId: true,
            installationGeneration: true,
            installationStateVersion: true,
            completedAt: true,
            reconciliationRun: {
              select: {
                storeId: true,
                authorizedAppId: true,
                installationGeneration: true,
                installationStateVersion: true,
                status: true,
                startedAt: true,
                finishedAt: true,
              },
            },
          },
        })
      : null;
    const installationEvidence = installation?.status === 'active'
      ? {
          authorizedAppId: installation.authorizedAppId,
          generation: installation.generation,
          stateVersion: installation.stateVersion,
        }
      : null;
    const coverageStartedAt = resolveCurrentCatalogCoverageStartedAt(
      storeId,
      installationEvidence,
      coverage,
    );
    const slugToProductId = resolveSafeSlugProductIds(
      snapshots,
      installationEvidence,
      new Date(),
      coverageStartedAt,
    );

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
        const productId = slugToProductId[slug];
        const rating = productRatings[productId] ?? { avg: '0.0', count: 0 };
        data[slug] = { productId, ...rating };
      }
    }

    return dataResponse(data);
  } catch {
    reportServerFailure('public_ratings_by_slug_failed');
    return dataResponse({}, 500);
  }
}
