import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * GET /api/public/settings?publicApiKey=<merchantId>
 * Returns widget display settings for the given store.
 * Called by widget.js on every product page load.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const publicApiKey = searchParams.get('publicApiKey');

  if (!publicApiKey) {
    return withCors(NextResponse.json({ error: 'Missing publicApiKey' }, { status: 400 }));
  }

  const [settings, token] = await Promise.all([
    prisma.storeSettings.findUnique({
      where: { storeId: publicApiKey },
      select: { widgetColor: true, widgetTitle: true },
    }),
    prisma.authToken.findFirst({
      where: { merchantId: publicApiKey },
      select: { authorizedAppId: true },
    }),
  ]);

  if (!settings || !token) {
    return withCors(NextResponse.json({ error: 'Store not found' }, { status: 404 }));
  }

  const response = withCors(NextResponse.json(settings));
  response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  return response;
}
