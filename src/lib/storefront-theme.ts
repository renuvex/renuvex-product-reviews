export type ThemeAdapterKey = 'ozy' | 'generic';
export type ThemeAdapterSource = 'auto' | 'generic_unknown' | 'legacy_fallback';
export type ThemeAdapterMatchedBy = 'theme_id' | 'theme_name_fallback' | 'legacy_fallback' | 'none';

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
  adapterMatchedBy: ThemeAdapterMatchedBy;
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

const THEME_ADAPTER_BY_THEME_ID: Record<string, ThemeAdapterKey> = {
  // ikas Ozy base theme id. Theme display names are merchant-editable; do not
  // use a mutable name when a stable theme id is available.
  '57225e07-aa38-4d38-9688-f6730ee16143': 'ozy',
};

function cleanString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function normalizeForMatch(value: string | null) {
  return (value || '').toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function resolveThemeAdapter(
  hasActiveTheme: boolean,
  activeThemeId: string | null,
  activeThemeName: string | null,
): { themeAdapterKey: ThemeAdapterKey; adapterSource: ThemeAdapterSource; adapterMatchedBy: ThemeAdapterMatchedBy } {
  if (!hasActiveTheme) {
    return { themeAdapterKey: 'ozy', adapterSource: 'legacy_fallback', adapterMatchedBy: 'legacy_fallback' };
  }

  if (activeThemeId && THEME_ADAPTER_BY_THEME_ID[activeThemeId]) {
    return {
      themeAdapterKey: THEME_ADAPTER_BY_THEME_ID[activeThemeId],
      adapterSource: 'auto',
      adapterMatchedBy: 'theme_id',
    };
  }

  if (!activeThemeId && normalizeForMatch(activeThemeName).includes('ozy')) {
    return { themeAdapterKey: 'ozy', adapterSource: 'auto', adapterMatchedBy: 'theme_name_fallback' };
  }

  return { themeAdapterKey: 'generic', adapterSource: 'generic_unknown', adapterMatchedBy: 'none' };
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
  const activeThemeId = cleanString(theme?.themeId);
  const hasActiveTheme = Boolean(activeMatch);
  const adapter = resolveThemeAdapter(hasActiveTheme, activeThemeId, activeThemeName);

  return {
    activeStorefrontId: cleanString(storefront?.id),
    activeStorefrontName,
    activeStorefrontThemeId: cleanString(theme?.id),
    activeThemeId: activeThemeId || cleanString(theme?.id),
    activeThemeVersionId: cleanString(theme?.themeVersionId),
    activeThemeName,
    mainStorefrontThemeId: cleanString(storefront?.mainStorefrontThemeId),
    themeAdapterKey: adapter.themeAdapterKey,
    adapterSource: adapter.adapterSource,
    adapterMatchedBy: adapter.adapterMatchedBy,
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
