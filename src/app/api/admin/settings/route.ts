import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth-helpers';

/**
 * GET /api/admin/settings
 * Returns all widget settings for the store as a map: { [widgetId]: settings }
 */
export async function GET(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });

    const rows = await prisma.widgetSettings.findMany({
      where: { storeId: user.merchantId },
    });

    // { reviews: { enabled: true, ... }, badge: { ... } }
    const data: Record<string, unknown> = {};
    for (const row of rows) {
      data[row.widgetId] = row.settings;
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('[GET] Admin Settings API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}

/**
 * PUT /api/admin/settings
 * Body: { widgetId: string, settings: Record<string, unknown> }
 * Upserts the widget settings for the given widgetId.
 */
export async function PUT(request: Request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 });

    const body = await request.json();
    const { widgetId, settings } = body;

    if (!widgetId || typeof widgetId !== 'string') {
      return NextResponse.json({ error: 'widgetId gerekli' }, { status: 400 });
    }

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ error: 'settings gerekli' }, { status: 400 });
    }

    const updated = await prisma.widgetSettings.upsert({
      where: { storeId_widgetId: { storeId: user.merchantId, widgetId } },
      update: { settings },
      create: { storeId: user.merchantId, widgetId, settings },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('[PUT] Admin Settings API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
