import type { NextResponse } from 'next/server';
import { getReviewRequestPublicBaseUrl } from '@/lib/review-email/config';

export const REVIEW_REQUEST_SESSION_COOKIE = 'renuvex-review-request';

function reviewRequestSessionCookieName(): string {
  return process.env.NODE_ENV === 'production'
    ? `__Host-${REVIEW_REQUEST_SESSION_COOKIE}`
    : REVIEW_REQUEST_SESSION_COOKIE;
}

function normalizedRequestHost(request: Request): string | null {
  const host = request.headers.get('host')?.trim().toLowerCase();
  return host || null;
}

export function isReviewRequestPublicHost(request: Request): boolean {
  const actualHost = normalizedRequestHost(request);
  if (!actualHost) return false;

  if (process.env.NODE_ENV !== 'production') {
    const hostname = actualHost.split(':')[0];
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') return true;
  }

  return actualHost === getReviewRequestPublicBaseUrl().host.toLowerCase();
}

export function assertReviewRequestPublicHost(request: Request): void {
  if (!isReviewRequestPublicHost(request)) {
    throw new ReviewRequestHostError();
  }
}

export function assertReviewRequestSameOrigin(request: Request): void {
  const origin = request.headers.get('origin');
  if (!origin || origin.toLowerCase() !== getReviewRequestPublicBaseUrl().origin.toLowerCase()) {
    throw new ReviewRequestHostError();
  }
}

export type PublicReviewSubmissionChannel = 'storefront' | 'review_request';

export function resolvePublicReviewSubmissionChannel(
  request: Request,
  input: {
    reviewEmailEnabled: boolean;
    reviewRequestSession: string;
  },
): PublicReviewSubmissionChannel {
  if (!input.reviewEmailEnabled) {
    if (input.reviewRequestSession) throw new ReviewRequestHostError();
    if (!process.env.REVIEW_REQUEST_PUBLIC_BASE_URL?.trim()) return 'storefront';
    if (isReviewRequestPublicHost(request)) throw new ReviewRequestHostError();
    return 'storefront';
  }

  const isReviewHost = isReviewRequestPublicHost(request);
  if (!isReviewHost && !input.reviewRequestSession) return 'storefront';
  if (!isReviewHost) throw new ReviewRequestHostError();

  assertReviewRequestPublicHost(request);
  assertReviewRequestSameOrigin(request);
  return 'review_request';
}

export function buildReviewRequestEmailUrl(rawToken: string): string {
  const url = new URL('/request', getReviewRequestPublicBaseUrl());
  url.hash = new URLSearchParams({ token: rawToken }).toString();
  return url.toString();
}

export function getReviewRequestSessionCookie(request: Request): string {
  const expectedName = reviewRequestSessionCookieName();
  const cookies = request.headers.get('cookie')?.split(';') ?? [];
  for (const cookie of cookies) {
    const separator = cookie.indexOf('=');
    if (separator < 1) continue;
    if (cookie.slice(0, separator).trim() !== expectedName) continue;
    const value = cookie.slice(separator + 1).trim();
    try {
      return decodeURIComponent(value);
    } catch {
      return '';
    }
  }
  return '';
}

export function setReviewRequestSessionCookie(
  response: NextResponse,
  rawSession: string,
  expiresAt: Date,
): void {
  response.cookies.set(reviewRequestSessionCookieName(), rawSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export function clearReviewRequestSessionCookie(response: NextResponse): void {
  response.cookies.set(reviewRequestSessionCookieName(), '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  });
}

export class ReviewRequestHostError extends Error {
  readonly code = 'review_request_host_not_allowed';
  readonly status = 404;

  constructor() {
    super('Review request endpoint is not available on this host');
    this.name = 'ReviewRequestHostError';
  }
}
