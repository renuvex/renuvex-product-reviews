import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { assertReviewRequestPublicHost, ReviewRequestHostError } from '@/lib/review-email/public-access';
import { reviewCenterRateLimit, secureReviewCenterResponse } from '@/lib/review-email/review-center-http';
import { applyReviewEmailUnsubscribe } from '@/lib/review-email/unsubscribe';

function rawToken(request: NextRequest): string {
  const token = request.nextUrl.searchParams.get('token') ?? '';
  return token.length <= 256 ? token : '';
}

export async function GET(request: NextRequest) {
  try {
    assertReviewRequestPublicHost(request);
    if (!rawToken(request)) {
      return secureReviewCenterResponse(NextResponse.json({ error: 'invalid_unsubscribe_link' }, { status: 400 }));
    }
    return secureReviewCenterResponse(NextResponse.json({ data: { confirmationRequired: true } }));
  } catch (error) {
    if (error instanceof ReviewRequestHostError) {
      return secureReviewCenterResponse(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    return secureReviewCenterResponse(NextResponse.json({ error: 'unsubscribe_failed' }, { status: 500 }));
  }
}

export async function POST(request: NextRequest) {
  try {
    assertReviewRequestPublicHost(request);
    const limited = await reviewCenterRateLimit(request, 'unsubscribe', 30);
    if (limited) return limited;
    const token = rawToken(request);
    if (!token) {
      return secureReviewCenterResponse(NextResponse.json({ error: 'invalid_unsubscribe_link' }, { status: 400 }));
    }
    const result = await prisma.$transaction((tx) => applyReviewEmailUnsubscribe(tx, token));
    return secureReviewCenterResponse(NextResponse.json({ data: result }));
  } catch (error) {
    if (error instanceof ReviewRequestHostError) {
      return secureReviewCenterResponse(NextResponse.json({ error: error.code }, { status: error.status }));
    }
    if (error instanceof Error && error.message === 'invalid_review_email_unsubscribe_token') {
      return secureReviewCenterResponse(NextResponse.json({ error: 'invalid_unsubscribe_link' }, { status: 400 }));
    }
    return secureReviewCenterResponse(NextResponse.json({ error: 'unsubscribe_failed' }, { status: 500 }));
  }
}
