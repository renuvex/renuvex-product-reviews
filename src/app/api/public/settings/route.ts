import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { buildPublicThemeRuntime } from '@/lib/storefront-theme';
import { isStorefrontThemeLazySyncDue } from '@/lib/storefront-theme-lazy-sync';
import { getWidgetDefaults, sanitizeSettings } from '@/lib/widget-settings';
import { isVideoReviewsGloballyEnabled } from '@/lib/media/config';

// ADR_0022: public settings is a pure read path. It only exposes whether
// storefront theme sync is due; the best-effort sync side effect lives in
// /api/public/storefront-theme/lazy-sync so this response can be edge cached.
// Review image delivery is provider-neutral in public settings. AWS media
// descriptors are returned by the reviews API, not by this settings endpoint.

export async function OPTIONS() {
  return corsOptions();
}

/**
 * GET /api/public/settings?publicApiKey=<merchantId>
 * Returns all widget settings for widget.js.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const publicApiKey = searchParams.get('publicApiKey');

  if (!publicApiKey) {
    return withCors(NextResponse.json({ error: 'Missing publicApiKey' }, { status: 400 }), req);
  }

  const store = await prisma.storeSettings.findUnique({
    where: { storeId: publicApiKey },
  });

  if (!store) {
    return withCors(NextResponse.json({ error: 'Store not found' }, { status: 404 }), req);
  }

  const rows = await prisma.widgetSettings.findMany({
    where: { storeId: publicApiKey },
  });

  const widgets: Record<string, unknown> = {};
  for (const row of rows) {
    const savedSettings = sanitizeSettings(row.widgetId, row.settings as Record<string, unknown>);
    const publicSettings = { ...getWidgetDefaults(row.widgetId), ...savedSettings };
    if (row.widgetId === 'reviews') {
      publicSettings.videoReviewsEnabled =
        isVideoReviewsGloballyEnabled() &&
        savedSettings.videoReviewsEnabled === true &&
        store.videoMonthlyLimit > 0;
    }
    widgets[row.widgetId] = publicSettings;
  }

  const runtime = {
    ...buildPublicThemeRuntime(store.storefrontTheme),
    themeSyncDue: isStorefrontThemeLazySyncDue(store.storefrontTheme),
  };
  const response = withCors(NextResponse.json({ widgets, runtime }), req);
  response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300, stale-if-error=604800');
  return response;
}
