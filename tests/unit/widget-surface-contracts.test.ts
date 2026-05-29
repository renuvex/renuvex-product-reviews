import { describe, expect, test } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const SURFACE_DIR = path.join(process.cwd(), 'src', 'widget', 'surfaces');

const SURFACE_TEST_CONTRACTS: Record<string, { layers: string[]; tests: string[] }> = {
  'rating-badge': {
    layers: ['network'],
    tests: ['tests/widget-network-smoke.spec.ts'],
  },
  'reviews-main': {
    layers: ['network', 'runtime', 'interaction', 'admin-preview'],
    tests: [
      'tests/widget-network-smoke.spec.ts',
      'tests/widget-runtime-smoke.spec.ts',
      'tests/widget-interaction-smoke.spec.ts',
      'tests/admin-preview-smoke.spec.ts',
    ],
  },
  'listing-badge': {
    layers: ['network'],
    tests: ['tests/widget-network-smoke.spec.ts'],
  },
  'structured-data': {
    layers: ['network', 'unit', 'deployed-verifier'],
    tests: [
      'tests/widget-network-smoke.spec.ts',
      'tests/unit/structured-data-jsonld.test.ts',
      'scripts/verify-deployed-jsonld.mjs',
    ],
  },
};

function surfaceKeys(): string[] {
  return readdirSync(SURFACE_DIR)
    .filter((fileName) => fileName.endsWith('.surface.js'))
    .map((fileName) => {
      const source = readFileSync(path.join(SURFACE_DIR, fileName), 'utf8');
      const match = source.match(/\bkey:\s*['"]([^'"]+)['"]/);
      if (!match) throw new Error(`Missing surface key in ${fileName}`);
      return match[1];
    })
    .sort();
}

describe('widget surface test contracts', () => {
  test('each registered surface has an explicit test-layer contract', () => {
    const keys = surfaceKeys();
    expect(keys).toEqual(['listing-badge', 'rating-badge', 'reviews-main', 'structured-data']);
    for (const key of keys) {
      expect(SURFACE_TEST_CONTRACTS[key], `missing SURFACE_TEST_CONTRACTS entry for ${key}`).toBeDefined();
    }
  });

  test('surface contract entries point to existing test files', () => {
    for (const [key, contract] of Object.entries(SURFACE_TEST_CONTRACTS)) {
      expect(contract.layers.length, `${key} must declare at least one test layer`).toBeGreaterThan(0);
      expect(contract.tests.length, `${key} must declare at least one test file`).toBeGreaterThan(0);
      for (const testFile of contract.tests) {
        expect(existsSync(path.join(process.cwd(), testFile)), `${key} references missing test file ${testFile}`).toBe(true);
      }
    }
  });

  test('contract entries do not drift beyond the actual surface list', () => {
    expect(Object.keys(SURFACE_TEST_CONTRACTS).sort()).toEqual(surfaceKeys());
  });
});

// Cross-cutting overlay concerns must live in ONE shared module each (the shared "ortak
// alan") and BOTH body-level overlays must consume them — never re-implement. This is the
// executable invariant that prevents the next "the wizard forgot/duplicated a shared
// concern" drift (which is how the wizard ended up with a weaker scroll lock and missing
// tap-highlight reset). See ADR_0021 / ADR_0025.
describe('overlay shared-surface contract', () => {
  const WIDGET_DIR = path.join(process.cwd(), 'src', 'widget');
  const readWidget = (rel: string): string => readFileSync(path.join(WIDGET_DIR, rel), 'utf8');

  const OVERLAYS: Record<string, string> = {
    lightbox: 'reviews-section/review-modal.js',
    wizard: 'reviews-section/review-form-modal/modal-shell.js',
  };

  test('body scroll lock is defined only in core/body-scroll-lock.js and consumed by both overlays', () => {
    const mod = readWidget('core/body-scroll-lock.js');
    expect(mod).toMatch(/export function lockBodyScroll\s*\(/);
    expect(mod).toMatch(/export function restoreBodyScroll\s*\(/);
    for (const [name, rel] of Object.entries(OVERLAYS)) {
      const src = readWidget(rel);
      expect(src, `${name} must import the shared scroll lock`).toMatch(/core\/body-scroll-lock\.js/);
      expect(src, `${name} must not re-define lockBodyScroll`).not.toMatch(/function\s+lockBodyScroll\s*\(/);
      expect(src, `${name} must not re-define unlockBodyScroll`).not.toMatch(/function\s+unlockBodyScroll\s*\(/);
    }
  });

  test('focus-trap toolkit is defined only in shared/focus-trap.js and consumed by both overlays', () => {
    const mod = readWidget('shared/focus-trap.js');
    expect(mod).toMatch(/export function trapFocus\s*\(/);
    expect(mod).toMatch(/export function focusFirst\s*\(/);
    expect(mod).toMatch(/export function getFocusableElements\s*\(/);
    for (const [name, rel] of Object.entries(OVERLAYS)) {
      const src = readWidget(rel);
      expect(src, `${name} must import the shared focus trap`).toMatch(/shared\/focus-trap\.js/);
      // Thin surface-specific entry wrappers (e.g. trapWizardFocus) are allowed; the
      // shared PRIMITIVES must not be re-implemented per surface.
      expect(src, `${name} must not re-define getFocusableElements`).not.toMatch(/function\s+getFocusableElements\s*\(/);
      expect(src, `${name} must not re-define isVisibleFocusable`).not.toMatch(/function\s+isVisibleFocusable\s*\(/);
    }
  });
});
