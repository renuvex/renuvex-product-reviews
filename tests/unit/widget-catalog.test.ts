import { describe, expect, it } from 'vitest';
import { build } from 'esbuild';
import { getFilterIconOptions, getIconOptions } from '@/widget/icons/index.js';
import {
  CONFIGURABLE_WIDGET_IDS,
  FILTER_ICON_OPTIONS,
  REVIEW_ICON_OPTIONS,
  WIDGETS,
  resolveConfigurableWidget,
} from '@/lib/widgets/catalog';

describe('widget capability catalog', () => {
  it('keeps the shipped and planned catalog explicit', () => {
    expect(WIDGETS.map(({ id, releaseStatus, configuration }) => ({
      id,
      releaseStatus,
      configuration: configuration.kind,
    }))).toEqual([
      { id: 'reviews', releaseStatus: 'available', configuration: 'settings' },
      { id: 'badge', releaseStatus: 'available', configuration: 'settings' },
      { id: 'carousel', releaseStatus: 'planned', configuration: 'none' },
      { id: 'popup', releaseStatus: 'planned', configuration: 'none' },
      { id: 'qa', releaseStatus: 'planned', configuration: 'none' },
      { id: 'summary', releaseStatus: 'planned', configuration: 'none' },
    ]);
    expect(CONFIGURABLE_WIDGET_IDS).toEqual(['reviews', 'badge']);
  });

  it('fails closed for unknown and planned widget IDs', () => {
    expect(resolveConfigurableWidget('unknown')).toEqual({ ok: false, reason: 'invalid_widget_id' });
    expect(resolveConfigurableWidget('carousel')).toEqual({ ok: false, reason: 'widget_not_available' });
    expect(resolveConfigurableWidget('reviews')).toMatchObject({ ok: true, widget: { id: 'reviews' } });
  });

  it('keeps lightweight icon metadata aligned with the storefront registries', () => {
    expect(REVIEW_ICON_OPTIONS).toEqual(getIconOptions());
    expect(FILTER_ICON_OPTIONS).toEqual(getFilterIconOptions());
  });

  it('keeps server settings validation out of component and storefront runtime graphs', async () => {
    const result = await build({
      entryPoints: ['src/lib/widget-settings.ts'],
      bundle: true,
      platform: 'node',
      format: 'esm',
      metafile: true,
      write: false,
      logLevel: 'silent',
      tsconfig: 'tsconfig.json',
    });
    const inputs = Object.keys(result.metafile?.inputs ?? {}).map((path) => path.replaceAll('\\', '/'));

    expect(inputs.some((path) => /(^|\/)src\/components\//.test(path))).toBe(false);
    expect(inputs.some((path) => /(^|\/)src\/widget\//.test(path))).toBe(false);
    expect(inputs.some((path) => path.endsWith('src/lib/widgets/catalog.ts'))).toBe(true);
  });
});
