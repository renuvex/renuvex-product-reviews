import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';

export async function OPTIONS() {
  return corsOptions();
}

/**
 * GET /api/public/settings?publicApiKey=<merchantId>
 * Returns all widget settings for widget.js.
 * Called on every product page load — cached aggressively.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const publicApiKey = searchParams.get('publicApiKey');

  if (!publicApiKey) {
    return withCors(NextResponse.json({ error: 'Missing publicApiKey' }, { status: 400 }));
  }

  // StoreSettings'in var olup olmadığını kontrol et (mağaza kayıtlı mı?)
  const store = await prisma.storeSettings.findUnique({
    where: { storeId: publicApiKey },
  });

  if (!store) {
    return withCors(NextResponse.json({ error: 'Store not found' }, { status: 404 }));
  }

  // Tüm widget ayarlarını çek
  const rows = await prisma.widgetSettings.findMany({
    where: { storeId: publicApiKey },
  });

  // { reviews: { enabled: true, color: '#6f55ff', ... }, badge: { ... } }
  const widgets: Record<string, unknown> = {};
  for (const row of rows) {
    widgets[row.widgetId] = row.settings;
  }

  const response = withCors(NextResponse.json({ widgets }));
  response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  return response;
}
