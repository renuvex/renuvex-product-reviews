import { readFileSync } from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';
import { describe, expect, it } from 'vitest';

const root = process.cwd();

function source(file: string) {
  return readFileSync(path.join(root, file), 'utf8');
}

describe('storefront placement dependency boundaries', () => {
  it('keeps the production listing entry out of legacy broad discovery modules', async () => {
    const result = await build({
      entryPoints: [path.join(root, 'src/widget/listing-badges/index.js')],
      bundle: true,
      write: false,
      metafile: true,
      format: 'esm',
      platform: 'browser',
      logLevel: 'silent',
    });
    const inputs = Object.keys(result.metafile?.inputs ?? {}).map((file) => file.replaceAll('\\', '/'));

    expect(inputs.some((file) => file.endsWith('/listing-badges/inject.js'))).toBe(false);
    expect(inputs.some((file) => file.endsWith('/listing-badges/dom.js'))).toBe(false);
    expect(inputs.some((file) => file.endsWith('/listing-badges/collect.js'))).toBe(false);
    expect(inputs.some((file) => file.endsWith('/listing-badges/fallback-candidates.js'))).toBe(false);
  });

  it('keeps runtime attestation independent from broad page scopes and title text discovery', () => {
    const capability = source('src/widget/placement/capability.js');
    const adapter = source('src/widget/themes/ozy/adapter.js');
    const theme = source('src/widget/themes/ozy/theme.js');
    expect(capability).not.toContain('getMainContentScopes');
    expect(capability).not.toContain('findProductTitleEl');
    expect(capability).not.toContain('[class*="product-list"]');
    expect(capability).not.toContain("querySelectorAll('p, h1, h2");
    expect(adapter).not.toContain('findListingContainers');
    expect(adapter).not.toContain('isBannerLink');
    expect(theme).not.toContain('[class*="product-list"]');
  });

  it('uses generic as the unknown adapter fallback and policy as placement authority', () => {
    const adapter = source('src/widget/themes/current-adapter.js');
    const settings = source('src/widget/core/settings.js');
    expect(adapter).toContain("var activeThemeAdapterKey = 'generic';");
    expect(adapter).toContain("placementPolicy = { version: 1, mode: 'disabled' }");
    expect(settings).toContain("renuvex_pr_settings_v2_");
    expect(settings).not.toContain('runtime.autoPlacementEnabled === true');
  });

  it('does not use a generic product-link click as modal identity', () => {
    const events = source('src/widget/events.js');
    expect(events).not.toContain('setLastClickedSlug');
    expect(events).not.toContain('extractSlug(a.href)');
    expect(events).toContain('captureModalContextFromClick(a, target)');
  });

  it('keeps slug discovery out of review storage and persistent identity caches', () => {
    const route = source('src/app/api/public/ratings-by-slug/route.ts');
    const ratings = source('src/widget/listing-badges/ratings.js');
    expect(route).not.toContain('prisma.review');
    expect(route).toContain('resolveSafeSlugProductIds');
    expect(ratings).toContain('renuvex_pr_ratings_v3_');
    expect(ratings).not.toContain('renuvex_pr_ratings_v2_');
    expect(ratings).not.toContain('slugToProductId');
  });
});
