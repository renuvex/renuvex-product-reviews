import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { checkFixedWindowRateLimit, getClientIp } from '@/lib/public-rate-limit';

export function secureReviewCenterResponse(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Referrer-Policy', 'no-referrer');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
  return response;
}

export async function reviewCenterRateLimit(request: Request, action: string, max = 30): Promise<NextResponse | null> {
  const ipHash = createHash('sha256').update(getClientIp(request), 'utf8').digest('hex').slice(0, 32);
  const result = await checkFixedWindowRateLimit({
    key: `renuvex_review_center:${action}:${ipHash}`,
    max,
    windowSec: 60,
    label: `review-center-${action}`,
  });
  if (result.allowed) return null;
  const response = NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  response.headers.set('Retry-After', String(result.retryAfterSec));
  return secureReviewCenterResponse(response);
}
