import { parseStorefrontThemeState } from '@/lib/storefront-theme';

export const STOREFRONT_THEME_LAZY_RESYNC_THRESHOLD_MS = 30 * 60 * 1000;

export function isStorefrontThemeLazySyncDue(storefrontTheme: unknown, nowMs = Date.now()): boolean {
  const themeState = parseStorefrontThemeState(storefrontTheme);
  const lastCheckedMs = themeState?.lastCheckedAt ? Date.parse(themeState.lastCheckedAt) : 0;
  return !Number.isFinite(lastCheckedMs) || nowMs - lastCheckedMs > STOREFRONT_THEME_LAZY_RESYNC_THRESHOLD_MS;
}
