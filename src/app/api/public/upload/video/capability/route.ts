import { NextResponse } from 'next/server';
import { withCors, corsOptions } from '@/lib/cors';
import { getVideoFeatureAccess } from '@/lib/media/access';

function noStore(response: NextResponse): NextResponse {
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export async function OPTIONS(request: Request) {
  return noStore(corsOptions(request));
}

export async function GET(request: Request) {
  const storeId = new URL(request.url).searchParams.get('storeId')?.trim().slice(0, 128) || '';
  if (!storeId) {
    return withCors(noStore(NextResponse.json({ error: 'missing_store_id' }, { status: 400 })), request);
  }

  try {
    const access = await getVideoFeatureAccess(storeId);
    if (access.reason === 'store_missing') {
      return withCors(noStore(NextResponse.json({ error: 'store_not_found' }, { status: 404 })), request);
    }

    return withCors(noStore(NextResponse.json({
      data: {
        enabled: access.enabled,
        reason: access.reason,
      },
    })), request);
  } catch (error) {
    console.error('[GET] Video capability error:', error);
    return withCors(noStore(NextResponse.json({ error: 'capability_unavailable' }, { status: 503 })), request);
  }
}
