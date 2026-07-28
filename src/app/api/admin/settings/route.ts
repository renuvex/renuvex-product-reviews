import { after, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthorizationLostResponse,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';
import { getWidgetDefaults, sanitizeSettings, validateSettings } from '@/lib/widget-settings';
import { syncStorefrontThemeForToken } from '@/lib/storefront-theme-sync';
import { getVideoFeatureAccess } from '@/lib/media/access';
import {
  IkasInstallationError,
  requireActiveIkasStoreInstallationFence,
} from '@/lib/ikas-installation-lifecycle';
import { reportServerFailure } from '@/lib/server-failures';

/**
 * GET /api/admin/settings
 * Returns all widget settings for the store as a map: { [widgetId]: settings }
 */
export async function GET(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const user = auth.context.principal;

    const [rows, videoAccess] = await Promise.all([
      prisma.widgetSettings.findMany({
        where: { storeId: user.merchantId },
      }),
      getVideoFeatureAccess(user.merchantId),
    ]);

    // { reviews: { enabled: true, ... }, badge: { ... } } — defaults ile merge edilmiş
    const data: Record<string, unknown> = {};
    for (const row of rows) {
      const savedSettings = sanitizeSettings(row.widgetId, row.settings as Record<string, unknown>);
      data[row.widgetId] = { ...getWidgetDefaults(row.widgetId), ...savedSettings };
    }

    return NextResponse.json({
      data,
      meta: {
        videoUsage: {
          monthlyLimit: videoAccess.monthlyLimit,
          reservedCount: videoAccess.reservedCount,
          consumedCount: videoAccess.consumedCount,
          usedCount: videoAccess.usedCount,
          remainingCount: videoAccess.remainingCount,
          effective: videoAccess.enabled,
          reason: videoAccess.reason,
        },
      },
    });
  } catch {
    reportServerFailure('admin_settings_read_failed');
    return NextResponse.json({ error: 'admin_settings_read_failed' }, { status: 500 });
  }
}

/**
 * PUT /api/admin/settings
 * Body: { widgetId: string, settings: Record<string, unknown> }
 * Upserts the widget settings for the given widgetId.
 */
export async function PUT(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const { principal: user, authToken } = auth.context;

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
    const updated = await prisma.$transaction(async (tx) => {
      await requireActiveIkasStoreInstallationFence(tx, user.merchantId, user);
      return tx.widgetSettings.upsert({
        where: { storeId_widgetId: { storeId: user.merchantId, widgetId } },
        update: { settings: jsonSettings },
        create: { storeId: user.merchantId, widgetId, settings: jsonSettings },
      });
    });

    after(async () => {
      try {
        await syncStorefrontThemeForToken(authToken, { reason: 'settings_save' });
      } catch (error) {
        if (error instanceof IkasInstallationError) return;
        reportServerFailure('storefront_theme_sync_failed');
      }
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    if (error instanceof IkasInstallationError) {
      return ikasAdminAuthorizationLostResponse();
    }
    reportServerFailure('admin_settings_write_failed');
    return NextResponse.json({ error: 'admin_settings_write_failed' }, { status: 500 });
  }
}
