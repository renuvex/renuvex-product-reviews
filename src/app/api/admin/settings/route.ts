import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { getWidgetDefaults, sanitizeSettings, validateSettings } from '@/lib/widget-settings';

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

    // { reviews: { enabled: true, ... }, badge: { ... } } — defaults ile merge edilmiş
    const data: Record<string, unknown> = {};
    for (const row of rows) {
      const savedSettings = sanitizeSettings(row.widgetId, row.settings as Record<string, unknown>);
      data[row.widgetId] = { ...getWidgetDefaults(row.widgetId), ...savedSettings };
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

    const cleanSettings = sanitizeSettings(widgetId, settings as Record<string, unknown>);
    const validationError = validateSettings(widgetId, cleanSettings);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const jsonSettings = cleanSettings as Prisma.InputJsonObject;
    const updated = await prisma.widgetSettings.upsert({
      where: { storeId_widgetId: { storeId: user.merchantId, widgetId } },
      update: { settings: jsonSettings },
      create: { storeId: user.merchantId, widgetId, settings: jsonSettings },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('[PUT] Admin Settings API error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
