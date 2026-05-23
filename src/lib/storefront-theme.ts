export type ThemeAdapterKey = 'ozy' | 'generic';
export type ThemeAdapterSource = 'auto' | 'generic_unknown' | 'legacy_fallback';

export type StorefrontThemeMetadata = {
  activeStorefrontId: string | null;
  activeStorefrontName: string | null;
  activeStorefrontThemeId: string | null;
  activeThemeId: string | null;
  activeThemeVersionId: string | null;
  activeThemeName: string | null;
  mainStorefrontThemeId: string | null;
  themeAdapterKey: ThemeAdapterKey;
  adapterSource: ThemeAdapterSource;
  detectedAt: string;
};

export type PublicThemeRuntime = {
  themeAdapterKey: ThemeAdapterKey;
  themeAdapterSource: ThemeAdapterSource;
};

type StorefrontThemeLike = {
  id?: string | null;
  name?: string | null;
  themeId?: string | null;
  themeVersionId?: string | null;
  isMainTheme?: boolean | null;
  deleted?: boolean | null;
};

type StorefrontLike = {
  id?: string | null;
  name?: string | null;
  mainStorefrontThemeId?: string | null;
  themes?: StorefrontThemeLike[] | null;
};

type ActiveThemeMatch = {
  storefront: StorefrontLike;
  theme: StorefrontThemeLike;
};

const FALLBACK_RUNTIME: PublicThemeRuntime = {
  themeAdapterKey: 'ozy',
  themeAdapterSource: 'legacy_fallback',
};

function cleanString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function normalizeForMatch(value: string | null) {
  return (value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function isOzyTheme(storefrontName: string | null, themeName: string | null) {
  return normalizeForMatch(storefrontName).includes('ozy') || normalizeForMatch(themeName).includes('ozy');
}

function findActiveTheme(storefronts: StorefrontLike[]): ActiveThemeMatch | null {
  for (const storefront of storefronts) {
    const themes = Array.isArray(storefront.themes) ? storefront.themes : [];
    const mainTheme = themes.find((theme) => theme.isMainTheme === true && theme.deleted !== true);
    if (mainTheme) return { storefront, theme: mainTheme };
  }

  for (const storefront of storefronts) {
    const mainStorefrontThemeId = cleanString(storefront.mainStorefrontThemeId);
    if (!mainStorefrontThemeId) continue;
    const themes = Array.isArray(storefront.themes) ? storefront.themes : [];
    const matchedTheme = themes.find((theme) => theme.deleted !== true && cleanString(theme.id) === mainStorefrontThemeId);
    if (matchedTheme) return { storefront, theme: matchedTheme };
  }

  return null;
}

export function resolveStorefrontThemeMetadata(storefronts: StorefrontLike[], detectedAt = new Date().toISOString()): StorefrontThemeMetadata {
  const activeMatch = findActiveTheme(storefronts);
  const storefront = activeMatch?.storefront;
  const theme = activeMatch?.theme;
  const activeStorefrontName = cleanString(storefront?.name);
  const activeThemeName = cleanString(theme?.name);
  const hasActiveTheme = Boolean(activeMatch);
  const isOzy = isOzyTheme(activeStorefrontName, activeThemeName);
  const themeAdapterKey: ThemeAdapterKey = !hasActiveTheme || isOzy ? 'ozy' : 'generic';
  const adapterSource: ThemeAdapterSource = !hasActiveTheme ? 'legacy_fallback' : isOzy ? 'auto' : 'generic_unknown';

  return {
    activeStorefrontId: cleanString(storefront?.id),
    activeStorefrontName,
    activeStorefrontThemeId: cleanString(theme?.id),
    activeThemeId: cleanString(theme?.themeId) || cleanString(theme?.id),
    activeThemeVersionId: cleanString(theme?.themeVersionId),
    activeThemeName,
    mainStorefrontThemeId: cleanString(storefront?.mainStorefrontThemeId),
    themeAdapterKey,
    adapterSource,
    detectedAt,
  };
}

export function buildPublicThemeRuntime(value: unknown): PublicThemeRuntime {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return FALLBACK_RUNTIME;

  const metadata = value as Partial<StorefrontThemeMetadata>;
  const themeAdapterKey: ThemeAdapterKey = metadata.themeAdapterKey === 'generic' ? 'generic' : 'ozy';
  const themeAdapterSource: ThemeAdapterSource =
    metadata.adapterSource === 'auto' || metadata.adapterSource === 'generic_unknown' ? metadata.adapterSource : 'legacy_fallback';

  return { themeAdapterKey, themeAdapterSource };
}
