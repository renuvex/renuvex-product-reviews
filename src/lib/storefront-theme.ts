export type ThemeAdapterKey = 'ozy' | 'generic';
export type ThemeAdapterSource = 'auto' | 'generic_unknown' | 'legacy_fallback';
export type ThemeAdapterMatchedBy = 'theme_id' | 'theme_name_fallback' | 'legacy_fallback' | 'none';
export type StorefrontThemeSyncReason = 'install' | 'manual' | 'dashboard_open' | 'settings_save' | 'cron' | 'verification' | 'lazy_storefront';
export type StorefrontThemeSyncStatus = 'stable' | 'pending_verification';

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

export type StorefrontThemeState = {
  schemaVersion: 2;
  syncStatus: StorefrontThemeSyncStatus;
  stable: StorefrontThemeMetadata | null;
  pending: StorefrontThemeMetadata | null;
  lastCheckedAt: string;
  lastChangedAt: string | null;
  verificationDueAt: string | null;
  verifiedAt: string | null;
  reason: StorefrontThemeSyncReason;
};

export type PublicThemeRuntime = {
  themeAdapterKey: ThemeAdapterKey;
  themeAdapterSource: ThemeAdapterSource;
  // ADR_0022: Placement allowlist + reviews mount kill-switch.
  // autoPlacementEnabled gates DOM-heuristic surfaces (PDP / listing / modal
  // badges). True only when the active theme is matched by a stable ikas
  // themeId AND that id maps to a non-generic adapter (theme names are
  // merchant-editable, so name-based fallbacks NEVER unlock placement).
  // reviewsMountEnabled gates the explicit-mount review section. The review
  // section is opt-in via <div data-renuvex-widget="reviews"> AND
  // shadow-isolated (ADR_0021), so it stays true for v1 — the flag exists as
  // a backend kill-switch for per-merchant / per-theme overrides without a
  // widget redeploy.
  autoPlacementEnabled: boolean;
  reviewsMountEnabled: boolean;
};

export type BuildStorefrontThemeStateOptions = {
  now?: Date;
  reason: StorefrontThemeSyncReason;
  verificationDelayMs?: number;
  promotePending?: boolean;
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
  // No metadata → fail closed on BOTH surfaces. Without a known active theme
  // we cannot safely auto-place badges, and we have no evidence the merchant
  // intended any specific review-section behavior either.
  autoPlacementEnabled: false,
  reviewsMountEnabled: false,
};

const DEFAULT_VERIFICATION_DELAY_MS = 5 * 60 * 1000;

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

function isThemeAdapterKey(value: unknown): value is ThemeAdapterKey {
  return value === 'ozy' || value === 'generic';
}

function isThemeAdapterSource(value: unknown): value is ThemeAdapterSource {
  return value === 'auto' || value === 'generic_unknown' || value === 'legacy_fallback';
}

function isThemeAdapterMatchedBy(value: unknown): value is ThemeAdapterMatchedBy {
  return value === 'theme_id' || value === 'theme_name_fallback' || value === 'legacy_fallback' || value === 'none';
}

function isStorefrontThemeMetadata(value: unknown): value is StorefrontThemeMetadata {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const candidate = value as Partial<StorefrontThemeMetadata>;
  return isThemeAdapterKey(candidate.themeAdapterKey) && isThemeAdapterSource(candidate.adapterSource);
}

function coerceStorefrontThemeMetadata(value: unknown): StorefrontThemeMetadata | null {
  if (!isStorefrontThemeMetadata(value)) return null;
  return {
    activeStorefrontId: cleanString(value.activeStorefrontId),
    activeStorefrontName: cleanString(value.activeStorefrontName),
    activeStorefrontThemeId: cleanString(value.activeStorefrontThemeId),
    activeThemeId: cleanString(value.activeThemeId),
    activeThemeVersionId: cleanString(value.activeThemeVersionId),
    activeThemeName: cleanString(value.activeThemeName),
    mainStorefrontThemeId: cleanString(value.mainStorefrontThemeId),
    themeAdapterKey: value.themeAdapterKey,
    adapterSource: value.adapterSource,
    adapterMatchedBy: isThemeAdapterMatchedBy(value.adapterMatchedBy) ? value.adapterMatchedBy : 'none',
    detectedAt: cleanString(value.detectedAt) || new Date(0).toISOString(),
  };
}

function isStorefrontThemeState(value: unknown): value is StorefrontThemeState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const candidate = value as Partial<StorefrontThemeState>;
  return candidate.schemaVersion === 2 && (candidate.syncStatus === 'stable' || candidate.syncStatus === 'pending_verification');
}

export function parseStorefrontThemeState(value: unknown): StorefrontThemeState | null {
  if (isStorefrontThemeState(value)) {
    const stable = coerceStorefrontThemeMetadata(value.stable);
    const pending = coerceStorefrontThemeMetadata(value.pending);

    return {
      schemaVersion: 2,
      syncStatus: value.syncStatus,
      stable,
      pending,
      lastCheckedAt: cleanString(value.lastCheckedAt) || stable?.detectedAt || pending?.detectedAt || new Date(0).toISOString(),
      lastChangedAt: cleanString(value.lastChangedAt),
      verificationDueAt: cleanString(value.verificationDueAt),
      verifiedAt: cleanString(value.verifiedAt),
      reason: isStorefrontThemeSyncReason(value.reason) ? value.reason : 'cron',
    };
  }

  const legacyMetadata = coerceStorefrontThemeMetadata(value);
  if (!legacyMetadata) return null;

  return {
    schemaVersion: 2,
    syncStatus: 'stable',
    stable: legacyMetadata,
    pending: null,
    lastCheckedAt: legacyMetadata.detectedAt,
    lastChangedAt: legacyMetadata.detectedAt,
    verificationDueAt: null,
    verifiedAt: legacyMetadata.detectedAt,
    reason: 'cron',
  };
}

function isStorefrontThemeSyncReason(value: unknown): value is StorefrontThemeSyncReason {
  return value === 'install' || value === 'manual' || value === 'dashboard_open' || value === 'settings_save' || value === 'cron' || value === 'verification';
}

function metadataIdentity(metadata: StorefrontThemeMetadata | null) {
  if (!metadata) return '';
  return [
    metadata.activeStorefrontId,
    metadata.activeStorefrontThemeId,
    metadata.activeThemeId,
    metadata.activeThemeVersionId,
    metadata.mainStorefrontThemeId,
    metadata.themeAdapterKey,
    metadata.adapterSource,
    metadata.adapterMatchedBy,
  ]
    .map((value) => value || '')
    .join('|');
}

export function isSameStorefrontThemeIdentity(a: StorefrontThemeMetadata | null, b: StorefrontThemeMetadata | null) {
  return metadataIdentity(a) === metadataIdentity(b);
}

function stateIdentity(state: StorefrontThemeState | null) {
  if (!state) return '';
  return [
    state.schemaVersion,
    state.syncStatus,
    metadataIdentity(state.stable),
    metadataIdentity(state.pending),
    state.lastChangedAt || '',
    state.verificationDueAt || '',
    state.verifiedAt || '',
  ].join('||');
}

export function hasStorefrontThemeStateChanged(previousValue: unknown, nextState: StorefrontThemeState) {
  if (previousValue && !isStorefrontThemeState(previousValue)) return true;
  return stateIdentity(parseStorefrontThemeState(previousValue)) !== stateIdentity(nextState);
}

export function getPublicStorefrontThemeMetadata(value: unknown): StorefrontThemeMetadata | null {
  const state = parseStorefrontThemeState(value);
  return state?.stable || state?.pending || null;
}

export function buildStorefrontThemeState(
  previousValue: unknown,
  observedMetadata: StorefrontThemeMetadata,
  options: BuildStorefrontThemeStateOptions,
): StorefrontThemeState {
  const now = options.now || new Date();
  const nowIso = now.toISOString();
  const previousState = parseStorefrontThemeState(previousValue);
  const previousStable = previousState?.stable ?? null;
  const previousPending = previousState?.pending ?? null;
  const verificationDelayMs = options.verificationDelayMs ?? DEFAULT_VERIFICATION_DELAY_MS;
  const verificationDueAt = new Date(now.getTime() + verificationDelayMs).toISOString();
  const observed = { ...observedMetadata, detectedAt: nowIso };

  if (!previousStable) {
    return {
      schemaVersion: 2,
      syncStatus: 'stable',
      stable: observed,
      pending: null,
      lastCheckedAt: nowIso,
      lastChangedAt: nowIso,
      verificationDueAt: null,
      verifiedAt: nowIso,
      reason: options.reason,
    };
  }

  if (isSameStorefrontThemeIdentity(previousStable, observed)) {
    return {
      schemaVersion: 2,
      syncStatus: 'stable',
      stable: { ...previousStable, ...observed },
      pending: null,
      lastCheckedAt: nowIso,
      lastChangedAt: previousState?.lastChangedAt || previousStable.detectedAt,
      verificationDueAt: null,
      verifiedAt: previousState?.verifiedAt || nowIso,
      reason: options.reason,
    };
  }

  const pendingStartedAt = previousState?.lastChangedAt || nowIso;
  const pendingDueAt = previousState?.verificationDueAt || verificationDueAt;
  const pendingDueTime = Date.parse(pendingDueAt);
  const pendingIsDue = Number.isFinite(pendingDueTime) && pendingDueTime <= now.getTime();
  const observedMatchesPreviousPending = isSameStorefrontThemeIdentity(previousPending, observed);

  if (observedMatchesPreviousPending && (options.promotePending || pendingIsDue)) {
    return {
      schemaVersion: 2,
      syncStatus: 'stable',
      stable: observed,
      pending: null,
      lastCheckedAt: nowIso,
      lastChangedAt: pendingStartedAt,
      verificationDueAt: null,
      verifiedAt: nowIso,
      reason: options.reason,
    };
  }

  return {
    schemaVersion: 2,
    syncStatus: 'pending_verification',
    stable: previousStable,
    pending: observed,
    lastCheckedAt: nowIso,
    lastChangedAt: observedMatchesPreviousPending ? pendingStartedAt : nowIso,
    verificationDueAt: observedMatchesPreviousPending ? pendingDueAt : verificationDueAt,
    verifiedAt: previousState?.verifiedAt || null,
    reason: options.reason,
  };
}

export function isPendingStorefrontThemeDue(value: unknown, now = new Date()) {
  const state = parseStorefrontThemeState(value);
  if (state?.syncStatus !== 'pending_verification' || !state.verificationDueAt) return false;
  const dueTime = Date.parse(state.verificationDueAt);
  return Number.isFinite(dueTime) && dueTime <= now.getTime();
}

export function buildPublicThemeRuntime(value: unknown): PublicThemeRuntime {
  const metadata = getPublicStorefrontThemeMetadata(value);
  if (!metadata) return FALLBACK_RUNTIME;

  const themeAdapterKey: ThemeAdapterKey = metadata.themeAdapterKey === 'generic' ? 'generic' : 'ozy';
  const themeAdapterSource: ThemeAdapterSource =
    metadata.adapterSource === 'auto' || metadata.adapterSource === 'generic_unknown' ? metadata.adapterSource : 'legacy_fallback';

  // ADR_0022: Auto-placement unlock requires stable theme_id match AND a
  // non-generic adapter. theme_name_fallback / legacy_fallback paths keep
  // their adapter-selection role but never unlock placement (merchant-editable
  // theme names cannot grant placement privileges).
  const autoPlacementEnabled =
    metadata.adapterMatchedBy === 'theme_id' && themeAdapterKey !== 'generic';
  // Review section is opt-in via explicit DOM mount AND shadow-isolated, so
  // it is structurally safe on any theme. The flag stays true as long as we
  // have any active-theme metadata; the FALLBACK_RUNTIME (no metadata) path
  // keeps it false. Backend per-merchant overrides can flip this later.
  const reviewsMountEnabled = true;

  return { themeAdapterKey, themeAdapterSource, autoPlacementEnabled, reviewsMountEnabled };
}
