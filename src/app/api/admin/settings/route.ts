import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { WIDGETS } from '@/components/home-page/widgets/widgetDefs';

function getWidgetDefaults(widgetId: string): Record<string, unknown> {
  const widget = WIDGETS.find((w) => w.id === widgetId);
  if (!widget) return {};
  const defaults: Record<string, unknown> = {};
  for (const group of widget.settings) {
    for (const field of group.fields) {
      defaults[field.key] = field.default;
    }
  }
  return defaults;
}

function validateSettings(widgetId: string, settings: Record<string, unknown>): string | null {
  const widget = WIDGETS.find((w) => w.id === widgetId);
  if (!widget) return `Bilinmeyen widgetId: ${widgetId}`;
  for (const group of widget.settings) {
    for (const field of group.fields) {
      const value = settings[field.key];
      if (value === undefined) continue;
      if (field.type === 'toggle' && typeof value !== 'boolean') {
        return `${field.key} boolean olmalı`;
      }
      if (field.type === 'text' && typeof value !== 'string') {
        return `${field.key} string olmalı`;
      }
      if (field.type === 'color' && (typeof value !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(value))) {
        return `${field.key} geçerli bir hex renk olmalı (#rrggbb)`;
      }
      if (field.type === 'select') {
        const valid = field.options.map((o) => o.value);
        if (!valid.includes(value as string)) {
          return `${field.key} şu değerlerden biri olmalı: ${valid.join(', ')}`;
        }
      }
    }
  }
  return null;
}

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
      data[row.widgetId] = { ...getWidgetDefaults(row.widgetId), ...(row.settings as Record<string, unknown>) };
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

    const validationError = validateSettings(widgetId, settings as Record<string, unknown>);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
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
