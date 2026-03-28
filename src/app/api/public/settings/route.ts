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
      select: { authorizedAppId: true, expireDate: true },
      orderBy: { expireDate: 'desc' },
    }),
  ]);

  if (!settings || !token) {
    return withCors(NextResponse.json({ error: 'Store not found' }, { status: 404 }));
  }

  // Token süresi dolmuşsa widget'ı durdur
  if (token.expireDate && new Date(token.expireDate) < new Date()) {
    return withCors(NextResponse.json({ error: 'Store not found' }, { status: 404 }));
  }

  return withCors(NextResponse.json(settings));
}
