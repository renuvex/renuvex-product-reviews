import { describe, expect, test } from 'vitest';
import {
  applyManualTheme,
  getControlHoverBackground,
  getReadableControlColor,
} from '../../src/widget/reviews-section/render/theme-vars.js';

function collectThemeVars(settings: Record<string, unknown>): Map<string, string> {
  const values = new Map<string, string>();
  const root = {
    style: {
      setProperty(name: string, value: string) {
        values.set(name, value);
      },
    },
  };

  applyManualTheme(root, settings);
  return values;
}

describe('widget review form theme variables', () => {
  test('empty review state text follows the muted review body color', () => {
    const lightVars = collectThemeVars({
      reviewBodyColor: '#111111',
    });

    expect(lightVars.get('--renuvex-pr-review-body')).toBe('#111111');
    expect(lightVars.get('--renuvex-pr-state-text')).toBe('rgba(17,17,17,0.65)');

    const darkVars = collectThemeVars({
      reviewBodyColor: '#ffffff',
    });

    expect(darkVars.get('--renuvex-pr-review-body')).toBe('#ffffff');
    expect(darkVars.get('--renuvex-pr-state-text')).toBe('rgba(255,255,255,0.65)');
  });

  test('wizard close color follows the form background instead of primary text', () => {
    const lightVars = collectThemeVars({
      formBgColor: '#ffffff',
      formPrimaryTextColor: '#ffffff',
    });

    expect(lightVars.get('--renuvex-pr-fwizard-text')).toBe('#ffffff');
    expect(lightVars.get('--renuvex-pr-fwizard-close-text')).toBe('#111111');
    expect(lightVars.get('--renuvex-pr-fwizard-close-hover-bg')).toBe('rgba(17,17,17,0.06)');

    const darkVars = collectThemeVars({
      formBgColor: '#111111',
      formPrimaryTextColor: '#111111',
    });

    expect(darkVars.get('--renuvex-pr-fwizard-text')).toBe('#111111');
    expect(darkVars.get('--renuvex-pr-fwizard-close-text')).toBe('#ffffff');
    expect(darkVars.get('--renuvex-pr-fwizard-close-hover-bg')).toBe('rgba(255,255,255,0.1)');
  });

  test('pagination vars follow the merchant colors and fall back to schema defaults', () => {
    const set = collectThemeVars({
      paginationBgColor: '#fafafa',
      paginationTextColor: '#222222',
      paginationBorderColor: '#cccccc',
    });
    expect(set.get('--renuvex-pr-pagination-bg')).toBe('#fafafa');
    expect(set.get('--renuvex-pr-pagination-text')).toBe('#222222');
    expect(set.get('--renuvex-pr-pagination-border')).toBe('#cccccc');

    // Unset -> fallbacks must equal the widgetDefs defaults (mirror contract).
    const def = collectThemeVars({});
    expect(def.get('--renuvex-pr-pagination-bg')).toBe('#ffffff');
    expect(def.get('--renuvex-pr-pagination-text')).toBe('#111111');
    expect(def.get('--renuvex-pr-pagination-border')).toBe('#e5e7eb');
  });

  test('readable control helpers use deterministic fallback colors', () => {
    expect(getReadableControlColor('#ffffff')).toBe('#111111');
    expect(getReadableControlColor('#111111')).toBe('#ffffff');
    expect(getReadableControlColor('not-a-color')).toBe('#111111');
    expect(getControlHoverBackground('#ffffff')).toBe('rgba(255,255,255,0.1)');
    expect(getControlHoverBackground('#111111')).toBe('rgba(17,17,17,0.06)');
  });
});
