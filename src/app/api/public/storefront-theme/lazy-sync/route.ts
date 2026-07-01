import { after, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { checkFixedWindowRateLimit, getClientIp } from '@/lib/public-rate-limit';
import { isStorefrontThemeLazySyncDue } from '@/lib/storefront-theme-lazy-sync';
import { syncStorefrontThemeForToken } from '@/lib/storefront-theme-sync';
import { AuthTokenManager } from '@/models/auth-token/manager';

const LAZY_SYNC_RATE_LIMIT_MAX = 10;
const LAZY_SYNC_RATE_LIMIT_WINDOW_SEC = 10 * 60;

type LazySyncBody = {
  publicApiKey?: unknown;
};

function noStoreJson(body: Record<string, unknown>, status: number, request: Request): NextResponse {
  const response = withCors(NextResponse.json(body, { status }), request);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

async function readBody(request: Request): Promise<LazySyncBody | null> {
  try {
    const body = await request.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? body as LazySyncBody : null;
  } catch {
    return null;
  }
}

export async function OPTIONS(request: Request) {
  return corsOptions(request);
}

export async function POST(request: Request) {
  const body = await readBody(request);
  const publicApiKey = typeof body?.publicApiKey === 'string' ? body.publicApiKey.trim() : '';
  if (!publicApiKey) {
    return noStoreJson({ error: 'invalid_public_api_key' }, 400, request);
  }

  const rateLimit = await checkFixedWindowRateLimit({
    key: `renuvex_pr_theme_lazy_sync:${publicApiKey}:${getClientIp(request)}`,
    max: LAZY_SYNC_RATE_LIMIT_MAX,
    windowSec: LAZY_SYNC_RATE_LIMIT_WINDOW_SEC,
    label: 'storefront-theme-lazy-sync',
  });
  if (!rateLimit.allowed) {
    const response = noStoreJson({ error: 'rate_limited' }, 429, request);
    response.headers.set('Retry-After', String(rateLimit.retryAfterSec));
    return response;
  }

  const store = await prisma.storeSettings.findUnique({
    where: { storeId: publicApiKey },
    select: { storeId: true, storefrontTheme: true },
  });

  if (!store) {
    return noStoreJson({ error: 'store_not_found' }, 404, request);
  }

  if (!isStorefrontThemeLazySyncDue(store.storefrontTheme)) {
    const response = withCors(new NextResponse(null, { status: 204 }), request);
    response.headers.set('Cache-Control', 'no-store');
    return response;
  }

  after(async () => {
    try {
      const token = await AuthTokenManager.getByMerchantId(publicApiKey);
      if (!token) return;
      await syncStorefrontThemeForToken(token, {
        reason: 'lazy_storefront',
        persistUnchangedCheck: true,
      });
    } catch (error) {
      console.error('[renuvex-pr] lazy storefront theme sync failed:', error);
    }
  });

  const response = withCors(NextResponse.json({ status: 'accepted' }, { status: 202 }), request);
  response.headers.set('Cache-Control', 'no-store');
  return response;
}
