import { createHash } from 'crypto';
import { NextResponse } from 'next/server';
import { anonymousPublicCorsOptions, withAnonymousPublicCors } from '@/lib/cors';
import { getVideoFeatureAccess } from '@/lib/media/access';
import { checkFixedWindowRateLimit, getClientIp } from '@/lib/public-rate-limit';

const CAPABILITY_RATE_LIMIT_MAX = 60;
const CAPABILITY_RATE_LIMIT_WINDOW_SEC = 60;

function noStore(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

function hashClientIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 32);
}

export async function OPTIONS() {
  return noStore(anonymousPublicCorsOptions(['GET']));
}

export async function GET(request: Request) {
  const storeId = new URL(request.url).searchParams.get('storeId')?.trim().slice(0, 128) || '';
  if (!storeId) {
    return withAnonymousPublicCors(noStore(NextResponse.json({ error: 'missing_store_id' }, { status: 400 })));
  }

  try {
    const rateLimit = await checkFixedWindowRateLimit({
      key: `renuvex_pr_video_cap:${hashClientIp(getClientIp(request))}`,
      max: CAPABILITY_RATE_LIMIT_MAX,
      windowSec: CAPABILITY_RATE_LIMIT_WINDOW_SEC,
      label: 'video-capability',
    });
    if (!rateLimit.allowed) {
      const response = noStore(NextResponse.json({ error: 'rate_limited' }, { status: 429 }));
      response.headers.set('Retry-After', String(rateLimit.retryAfterSec));
      return withAnonymousPublicCors(response);
    }

    const access = await getVideoFeatureAccess(storeId);
    if (access.reason === 'store_missing') {
      return withAnonymousPublicCors(noStore(NextResponse.json({ error: 'store_not_found' }, { status: 404 })));
    }

    return withAnonymousPublicCors(noStore(NextResponse.json({
      data: {
        enabled: access.enabled,
        reason: access.reason,
      },
    })));
  } catch (error) {
    console.error('[GET] Video capability error:', error);
    return withAnonymousPublicCors(noStore(NextResponse.json({ error: 'capability_unavailable' }, { status: 503 })));
  }
}
