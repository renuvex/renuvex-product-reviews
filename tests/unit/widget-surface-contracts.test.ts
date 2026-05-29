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
    expect(keys).toEqual(['listing-badge', 'rating-badge', 'reviews-main']);
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
