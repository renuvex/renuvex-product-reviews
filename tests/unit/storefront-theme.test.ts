import { describe, expect, it } from 'vitest';
import {
  buildPublicThemeRuntime,
  buildStorefrontThemeState,
  parseStorefrontThemeState,
  resolveStorefrontThemeMetadata,
  type StorefrontThemeMetadata,
} from '../../src/lib/storefront-theme';

const OZY_THEME_ID = '57225e07-aa38-4d38-9688-f6730ee16143';

function metadata(overrides: Partial<StorefrontThemeMetadata> = {}): StorefrontThemeMetadata {
  return {
    activeStorefrontId: 'storefront-1',
    activeStorefrontName: 'Main Storefront',
    activeStorefrontThemeId: 'storefront-theme-1',
    activeThemeId: OZY_THEME_ID,
    activeThemeVersionId: 'theme-version-1',
    activeThemeName: 'Ozy renamed by merchant',
    mainStorefrontThemeId: 'storefront-theme-1',
    themeAdapterKey: 'ozy',
    adapterSource: 'auto',
    adapterMatchedBy: 'theme_id',
    detectedAt: '2026-05-25T03:23:14.569Z',
    ...overrides,
  };
}

describe('storefront theme state parsing', () => {
  it('keeps stable schema v2 theme metadata intact', () => {
    const state = parseStorefrontThemeState({
      schemaVersion: 2,
      syncStatus: 'stable',
      stable: metadata(),
      pending: null,
      lastCheckedAt: '2026-05-25T03:23:14.569Z',
      lastChangedAt: '2026-05-23T12:36:42.043Z',
      verificationDueAt: null,
      verifiedAt: '2026-05-23T12:36:42.043Z',
      reason: 'cron',
    });

    expect(state?.syncStatus).toBe('stable');
    expect(state?.stable?.activeThemeId).toBe(OZY_THEME_ID);
    expect(state?.stable?.adapterMatchedBy).toBe('theme_id');
    expect(state?.pending).toBeNull();
  });

  it('preserves lazy storefront sync reason when parsing v2 state', () => {
    const state = parseStorefrontThemeState({
      schemaVersion: 2,
      syncStatus: 'stable',
      stable: metadata(),
      pending: null,
      lastCheckedAt: '2026-05-29T13:54:38.515Z',
      lastChangedAt: '2026-05-29T00:38:11.811Z',
      verificationDueAt: null,
      verifiedAt: '2026-05-29T02:12:40.317Z',
      reason: 'lazy_storefront',
    });

    expect(state?.reason).toBe('lazy_storefront');
  });

  it('promotes legacy metadata shape into stable schema v2 state', () => {
    const state = parseStorefrontThemeState(metadata({ detectedAt: '2026-05-20T00:00:00.000Z' }));

    expect(state?.schemaVersion).toBe(2);
    expect(state?.syncStatus).toBe('stable');
    expect(state?.stable?.themeAdapterKey).toBe('ozy');
    expect(state?.lastChangedAt).toBe('2026-05-20T00:00:00.000Z');
  });

  it('returns null for invalid or unknown shapes', () => {
    expect(parseStorefrontThemeState(null)).toBeNull();
    expect(parseStorefrontThemeState({ syncStatus: 'stable' })).toBeNull();
    expect(parseStorefrontThemeState({ themeAdapterKey: 'unknown', adapterSource: 'auto' })).toBeNull();
  });
});

describe('public theme runtime gates', () => {
  it('opens auto-placement only for stable theme-id matched non-generic adapters', () => {
    expect(buildPublicThemeRuntime({
      schemaVersion: 2,
      syncStatus: 'stable',
      stable: metadata(),
      pending: null,
      lastCheckedAt: '2026-05-25T03:23:14.569Z',
      lastChangedAt: '2026-05-25T03:23:14.569Z',
      verificationDueAt: null,
      verifiedAt: '2026-05-25T03:23:14.569Z',
      reason: 'cron',
    })).toEqual({
      themeAdapterKey: 'ozy',
      themeAdapterSource: 'auto',
      autoPlacementEnabled: true,
      reviewsMountEnabled: true,
    });
  });

  it('keeps generic unknown themes fail-closed for auto-placement but allows explicit review mount', () => {
    expect(buildPublicThemeRuntime({
      schemaVersion: 2,
      syncStatus: 'stable',
      stable: metadata({
        activeThemeId: 'unknown-theme-id',
        activeThemeName: 'Mine',
        themeAdapterKey: 'generic',
        adapterSource: 'generic_unknown',
        adapterMatchedBy: 'none',
      }),
      pending: null,
      lastCheckedAt: '2026-05-25T19:29:47.143Z',
      lastChangedAt: '2026-05-25T19:23:51.697Z',
      verificationDueAt: null,
      verifiedAt: '2026-05-25T19:29:47.143Z',
      reason: 'dashboard_open',
    })).toEqual({
      themeAdapterKey: 'generic',
      themeAdapterSource: 'generic_unknown',
      autoPlacementEnabled: false,
      reviewsMountEnabled: true,
    });
  });

  it('fails closed when no theme metadata exists', () => {
    expect(buildPublicThemeRuntime(null)).toEqual({
      themeAdapterKey: 'ozy',
      themeAdapterSource: 'legacy_fallback',
      autoPlacementEnabled: false,
      reviewsMountEnabled: false,
    });
  });
});

describe('storefront theme state transitions', () => {
  it('creates stable state for first observation and pending state for identity change', () => {
    const first = buildStorefrontThemeState(null, metadata(), {
      now: new Date('2026-05-25T03:23:14.569Z'),
      reason: 'install',
    });
    const changed = buildStorefrontThemeState(first, metadata({
      activeThemeId: 'unknown-theme-id',
      activeStorefrontThemeId: 'storefront-theme-2',
      activeThemeName: 'Siva',
      themeAdapterKey: 'generic',
      adapterSource: 'generic_unknown',
      adapterMatchedBy: 'none',
    }), {
      now: new Date('2026-05-25T19:55:44.180Z'),
      reason: 'dashboard_open',
    });

    expect(first.syncStatus).toBe('stable');
    expect(changed.syncStatus).toBe('pending_verification');
    expect(changed.stable?.activeThemeId).toBe(OZY_THEME_ID);
    expect(changed.pending?.themeAdapterKey).toBe('generic');
  });

  it('resolves Ozy by stable theme id even when the merchant renames the theme', () => {
    const resolved = resolveStorefrontThemeMetadata([
      {
        id: 'storefront-1',
        name: 'dev-mertcopper',
        mainStorefrontThemeId: 'storefront-theme-1',
        themes: [
          {
            id: 'storefront-theme-1',
            name: 'Custom merchant name',
            themeId: OZY_THEME_ID,
            themeVersionId: 'theme-version-1',
            isMainTheme: true,
            deleted: false,
          },
        ],
      },
    ], '2026-05-25T03:23:14.569Z');

    expect(resolved.activeThemeName).toBe('Custom merchant name');
    expect(resolved.themeAdapterKey).toBe('ozy');
    expect(resolved.adapterMatchedBy).toBe('theme_id');
  });

  it('keeps cloned Ozy themes on the Ozy adapter while tracking the new storefront theme instance', () => {
    const first = buildStorefrontThemeState(null, metadata({
      activeThemeName: 'Ozy',
      activeStorefrontThemeId: 'ed18b5f8-4599-498b-9f1c-4919a411b060',
      mainStorefrontThemeId: 'ed18b5f8-4599-498b-9f1c-4919a411b060',
      activeThemeVersionId: '5ecd7d44-3748-41b3-82e2-b3d3e54955bd',
    }), {
      now: new Date('2026-05-29T00:27:46.535Z'),
      reason: 'lazy_storefront',
    });

    const cloned = metadata({
      activeThemeName: 'Ozy 2',
      activeStorefrontThemeId: '2c972e10-216f-4286-9f94-9f3f0ccc7119',
      mainStorefrontThemeId: '2c972e10-216f-4286-9f94-9f3f0ccc7119',
      activeThemeVersionId: '5ecd7d44-3748-41b3-82e2-b3d3e54955bd',
    });

    const pending = buildStorefrontThemeState(first, cloned, {
      now: new Date('2026-05-29T00:38:11.811Z'),
      reason: 'lazy_storefront',
      verificationDelayMs: 5 * 60 * 1000,
    });
    const promoted = buildStorefrontThemeState(pending, cloned, {
      now: new Date('2026-05-29T13:54:38.515Z'),
      reason: 'lazy_storefront',
      promotePending: true,
    });

    expect(pending.syncStatus).toBe('pending_verification');
    expect(pending.pending?.activeThemeId).toBe(OZY_THEME_ID);
    expect(pending.pending?.activeStorefrontThemeId).toBe('2c972e10-216f-4286-9f94-9f3f0ccc7119');

    expect(promoted.syncStatus).toBe('stable');
    expect(promoted.stable?.activeThemeId).toBe(OZY_THEME_ID);
    expect(promoted.stable?.activeThemeVersionId).toBe('5ecd7d44-3748-41b3-82e2-b3d3e54955bd');
    expect(promoted.stable?.activeThemeName).toBe('Ozy 2');
    expect(promoted.stable?.themeAdapterKey).toBe('ozy');
    expect(promoted.stable?.adapterMatchedBy).toBe('theme_id');
    expect(buildPublicThemeRuntime(promoted).autoPlacementEnabled).toBe(true);
  });
});
