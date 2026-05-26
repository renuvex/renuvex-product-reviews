import { after, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withCors, corsOptions } from '@/lib/cors';
import { buildPublicThemeRuntime, parseStorefrontThemeState } from '@/lib/storefront-theme';
import { syncStorefrontThemeForToken } from '@/lib/storefront-theme-sync';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { getWidgetDefaults, sanitizeSettings } from '@/lib/widget-settings';

// ADR_0022: ikas does not expose a `store/theme/*` webhook scope (Admin API
// introspection 2026-05-27 lists only 10 webhook scopes, none storefront/theme
// related). To keep `StoreSettings.storefrontTheme` fresh between dashboard
// opens / daily cron / install / settings_save, the public settings endpoint
// acts as a third sync trigger: if the persisted `lastCheckedAt` is older than
// this threshold, fire `syncStorefrontThemeForToken(..., 'lazy_storefront')`
// as background work via Next.js `after()`. `persistUnchangedCheck: true`
// means `lastCheckedAt` advances on every check, so the threshold itself
// serves as a per-merchant debounce — no in-memory dedupe map needed.
const STOREFRONT_THEME_LAZY_RESYNC_THRESHOLD_MS = 30 * 60 * 1000;

// ADR_0008: `imagePolicy.cloudName` artık settings response'unda taşınmıyor.
// Cloud name app-level config'tir (env var); widget bundle build-time'da
// `__RENUVEX_PR_DEFAULT_CLOUDINARY_CLOUD_NAME__` sabitini inject eder. Cloudinary
// config eksikliği `upload/sign` ve `reviews POST` route'larında zaten
// fail-closed kontrol ediliyor — duplicate logging gereksiz.

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
  // sanitizeSettings: schema dışı (eski/deprecated) key'ler widget'a gitmesin.
  const widgets: Record<string, unknown> = {};
  for (const row of rows) {
    const savedSettings = sanitizeSettings(row.widgetId, row.settings as Record<string, unknown>);
    widgets[row.widgetId] = { ...getWidgetDefaults(row.widgetId), ...savedSettings };
  }

  // ADR_0022 — Storefront-driven lazy theme resync. Stale check happens
  // before the response is sent (cheap timestamp read), but the actual ikas
  // API call is deferred via `after()` so the storefront visitor never waits
  // on it. A failed resync only logs; the cached metadata stays in place.
  const themeState = parseStorefrontThemeState(store.storefrontTheme);
  const lastCheckedMs = themeState?.lastCheckedAt ? Date.parse(themeState.lastCheckedAt) : 0;
  const isThemeStale =
    !Number.isFinite(lastCheckedMs) ||
    Date.now() - lastCheckedMs > STOREFRONT_THEME_LAZY_RESYNC_THRESHOLD_MS;
  if (isThemeStale) {
    after(async () => {
      try {
        const token = await AuthTokenManager.getByMerchantId(publicApiKey);
        if (!token) return; // No auth (uninstalled?) — cron path will surface this.
        await syncStorefrontThemeForToken(token, {
          reason: 'lazy_storefront',
          persistUnchangedCheck: true,
        });
      } catch (err) {
        console.error('[renuvex-pr] lazy storefront theme resync failed:', err);
      }
    });
  }

  const response = withCors(NextResponse.json({ widgets, runtime: buildPublicThemeRuntime(store.storefrontTheme) }));
  response.headers.set('Cache-Control', 's-maxage=60, stale-while-revalidate=300, stale-if-error=604800');
  return response;
}
