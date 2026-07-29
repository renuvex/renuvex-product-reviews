import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkFixedWindowRateLimit, getClientIp } from '@/lib/public-rate-limit';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import {
  assertReviewRequestPublicHost,
  assertReviewRequestSameOrigin,
  clearReviewRequestSessionCookie,
  getReviewRequestSessionCookie,
  ReviewRequestHostError,
  setReviewRequestSessionCookie,
} from '@/lib/review-email/public-access';
import {
  exchangeReviewRequestTokenForSession,
  resolveActiveReviewRequestSession,
  ReviewRequestTokenError,
} from '@/lib/review-email/tokens';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

const REVIEW_REQUEST_RATE_LIMIT_MAX = 30;
const REVIEW_REQUEST_RATE_LIMIT_WINDOW_SEC = 60;

function noStore(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Referrer-Policy', 'no-referrer');
  return response;
}

function serializeRequest(row: {
  request: {
    storeId: string;
    productId: string;
    expiresAt: Date | null;
    orderLineSnapshot: { productName: string | null; variantName: string | null };
  };
  expiresAt: Date;
}) {
  return {
    status: 'active',
    storeId: row.request.storeId,
    productId: row.request.productId,
    sessionExpiresAt: row.expiresAt.toISOString(),
    requestExpiresAt: row.request.expiresAt?.toISOString() ?? null,
    productName: row.request.orderLineSnapshot.productName,
    variantName: row.request.orderLineSnapshot.variantName,
  };
}

function featureAvailable(): boolean {
  return isReviewEmailEnabled();
}

async function rateLimitResponse(request: Request): Promise<NextResponse | null> {
  const clientKey = createHash('sha256').update(getClientIp(request)).digest('hex').slice(0, 32);
  const result = await checkFixedWindowRateLimit({
    key: `renuvex_review_request:${clientKey}`,
    max: REVIEW_REQUEST_RATE_LIMIT_MAX,
    windowSec: REVIEW_REQUEST_RATE_LIMIT_WINDOW_SEC,
    label: 'review-request',
  });
  if (result.allowed) return null;

  const response = NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  response.headers.set('Retry-After', String(result.retryAfterSec));
  return noStore(response);
}

export async function POST(request: NextRequest) {
  try {
    if (!featureAvailable()) return noStore(NextResponse.json({ error: 'not_found' }, { status: 404 }));
    assertReviewRequestPublicHost(request);
    assertReviewRequestSameOrigin(request);
    const limited = await rateLimitResponse(request);
    if (limited) return limited;

    const body = await request.json().catch(() => null) as { token?: unknown } | null;
    const rawToken = typeof body?.token === 'string' ? body.token : '';
    const exchanged = await exchangeReviewRequestTokenForSession(prisma, rawToken);
    const response = NextResponse.json({ data: serializeRequest({
      request: exchanged.token.request,
      expiresAt: exchanged.expiresAt,
    }) });
    setReviewRequestSessionCookie(response, exchanged.rawSession, exchanged.expiresAt);
    return noStore(response);
  } catch (error) {
    if (error instanceof ReviewRequestHostError) {
      return noStore(NextResponse.json({ error: 'not_found' }, { status: error.status }));
    }
    if (error instanceof ReviewRequestTokenError) {
      return noStore(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    reportReviewEmailFailure(
      'review_request_exchange',
      normalizeReviewEmailFailure('review_request_exchange', error),
    );
    return noStore(NextResponse.json({ error: 'review_request_exchange_failed' }, { status: 500 }));
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!featureAvailable()) return noStore(NextResponse.json({ error: 'not_found' }, { status: 404 }));
    assertReviewRequestPublicHost(request);
    const limited = await rateLimitResponse(request);
    if (limited) return limited;

    const session = await resolveActiveReviewRequestSession(
      prisma,
      getReviewRequestSessionCookie(request),
    );
    return noStore(NextResponse.json({ data: serializeRequest(session) }));
  } catch (error) {
    const response = error instanceof ReviewRequestHostError
      ? NextResponse.json({ error: error.code }, { status: error.status })
      : error instanceof ReviewRequestTokenError
        ? NextResponse.json({ error: error.code }, { status: error.status })
        : NextResponse.json({ error: 'review_request_resolve_failed' }, { status: 500 });
    if (!(error instanceof ReviewRequestHostError) && !(error instanceof ReviewRequestTokenError)) {
      reportReviewEmailFailure(
        'review_request_exchange',
        normalizeReviewEmailFailure('review_request_exchange', error),
      );
    }
    clearReviewRequestSessionCookie(response);
    return noStore(response);
  }
}
