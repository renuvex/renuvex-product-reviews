import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const setCorsHeaders = (res: NextResponse) => {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
};

export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 204 }));
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
    return setCorsHeaders(NextResponse.json({ error: 'Missing publicApiKey' }, { status: 400 }));
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
    return setCorsHeaders(NextResponse.json({ error: 'Store not found' }, { status: 404 }));
  }

  return setCorsHeaders(NextResponse.json(settings));
}
