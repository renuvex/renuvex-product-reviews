import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import {
  assertReviewRequestPublicHost,
  assertReviewRequestSameOrigin,
  setReviewRequestSessionCookie,
  ReviewRequestHostError,
} from '@/lib/review-email/public-access';
import { exchangeReviewCenterTokenForSession, ReviewRequestTokenError } from '@/lib/review-email/tokens';
import { reviewCenterRateLimit, secureReviewCenterResponse } from '@/lib/review-email/review-center-http';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

export async function POST(request: NextRequest) {
  try {
    if (!isReviewEmailEnabled()) return secureReviewCenterResponse(NextResponse.json({ error: 'not_found' }, { status: 404 }));
    assertReviewRequestPublicHost(request);
    assertReviewRequestSameOrigin(request);
    const limited = await reviewCenterRateLimit(request, 'session');
    if (limited) return limited;
    const body = await request.json().catch(() => null) as { token?: unknown } | null;
    const rawToken = typeof body?.token === 'string' ? body.token : '';
    const exchanged = await exchangeReviewCenterTokenForSession(prisma, rawToken);
    const total = exchanged.token.batch.requests.length;
    const resolved = exchanged.token.batch.requests.filter((item) => ['submitted', 'skipped', 'cancelled', 'expired', 'suppressed'].includes(item.status)).length;
    const response = NextResponse.json({
      data: {
        status: 'active',
        sessionExpiresAt: exchanged.expiresAt.toISOString(),
        batchExpiresAt: exchanged.token.batch.expiresAt?.toISOString() ?? null,
        completedCount: resolved,
        totalCount: total,
        remainingCount: Math.max(0, total - resolved),
      },
    });
    setReviewRequestSessionCookie(response, exchanged.rawSession, exchanged.expiresAt);
    return secureReviewCenterResponse(response);
  } catch (error) {
    if (error instanceof ReviewRequestHostError) {
      return secureReviewCenterResponse(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    if (error instanceof ReviewRequestTokenError) {
      return secureReviewCenterResponse(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    reportReviewEmailFailure('review_request_exchange', normalizeReviewEmailFailure('review_request_exchange', error));
    return secureReviewCenterResponse(NextResponse.json({ error: 'review_request_exchange_failed' }, { status: 500 }));
  }
}
