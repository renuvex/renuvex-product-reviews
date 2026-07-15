import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import {
  assertReviewRequestPublicHost,
  assertReviewRequestSameOrigin,
  clearReviewRequestSessionCookie,
  getReviewRequestSessionCookie,
  ReviewRequestHostError,
} from '@/lib/review-email/public-access';
import { reviewCenterRateLimit, secureReviewCenterResponse } from '@/lib/review-email/review-center-http';
import { submitReviewCenterItem, ReviewCenterSubmitError } from '@/lib/review-email/review-center-submit';
import { resolveActiveReviewCenterSession, ReviewRequestTokenError } from '@/lib/review-email/tokens';

export async function POST(request: NextRequest, context: { params: Promise<{ itemId: string }> }) {
  try {
    assertReviewRequestPublicHost(request);
    assertReviewRequestSameOrigin(request);
    if (!isReviewEmailEnabled()) return secureReviewCenterResponse(NextResponse.json({ error: 'not_found' }, { status: 404 }));
    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (Number.isFinite(contentLength) && contentLength > 64 * 1024) {
      return secureReviewCenterResponse(NextResponse.json({ error: 'payload_too_large' }, { status: 413 }));
    }
    const limited = await reviewCenterRateLimit(request, 'submit', 10);
    if (limited) return limited;
    const session = await resolveActiveReviewCenterSession(prisma, getReviewRequestSessionCookie(request));
    const { itemId } = await context.params;
    if (!/^[0-9a-f-]{36}$/i.test(itemId)) {
      return secureReviewCenterResponse(NextResponse.json({ error: 'review_center_item_not_found' }, { status: 404 }));
    }
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    if (!body) return secureReviewCenterResponse(NextResponse.json({ error: 'invalid_review_payload' }, { status: 400 }));
    const result = await submitReviewCenterItem(prisma, {
      sessionId: session.id,
      tokenId: session.tokenId,
      batchId: session.batch.id,
      requestId: itemId,
      rating: body.rating,
      title: body.title,
      comment: body.comment,
      author: body.author,
      images: body.images,
      videoToken: body.videoToken,
    });
    const response = NextResponse.json({ data: result }, { status: result.state === 'created' ? 201 : 200 });
    if (result.batchCompleted) clearReviewRequestSessionCookie(response);
    return secureReviewCenterResponse(response);
  } catch (error) {
    if (error instanceof ReviewRequestHostError) {
      return secureReviewCenterResponse(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    if (error instanceof ReviewRequestTokenError) {
      return secureReviewCenterResponse(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    if (error instanceof ReviewCenterSubmitError) {
      return secureReviewCenterResponse(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    return secureReviewCenterResponse(NextResponse.json({ error: 'review_center_submit_failed' }, { status: 500 }));
  }
}
