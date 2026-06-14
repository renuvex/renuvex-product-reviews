import { describe, expect, it } from 'vitest';
import {
  buildMutationPreview,
  buildStoreGateRow,
  effectiveVideoGate,
  mergeVideoToggle,
  parseCanaryOptions,
  parseVideoQuota,
  parseVideoToggle,
  summarizeGateRows,
} from '../../scripts/video-canary-ops-lib.mjs';

function argv(...args: string[]) {
  return ['node', 'video-canary-ops.mjs', ...args];
}

describe('video canary operations', () => {
  it('parses report and dry-run mutation options without enabling apply', () => {
    expect(parseCanaryOptions(argv())).toMatchObject({ apply: false, storeId: null, quota: null, toggle: null });
    expect(parseCanaryOptions(argv('--storeId=store-1', '--quota=5', '--toggle=on'))).toMatchObject({
      apply: false,
      storeId: 'store-1',
      quota: 5,
      toggle: true,
    });
  });

  it('requires exact store confirmation for apply mode', () => {
    expect(() => parseCanaryOptions(argv('--storeId=store-1', '--quota=5', '--apply')))
      .toThrow('--confirmStoreId');
    expect(() => parseCanaryOptions(argv('--storeId=store-1', '--confirmStoreId=store-2', '--quota=5', '--apply')))
      .toThrow('--confirmStoreId');
    expect(parseCanaryOptions(argv('--storeId=store-1', '--confirmStoreId=store-1', '--quota=5', '--apply')))
      .toMatchObject({ apply: true, storeId: 'store-1', quota: 5 });
  });

  it('rejects ambiguous, negative and excessive quota values', () => {
    expect(parseVideoQuota('0')).toBe(0);
    expect(parseVideoQuota('5')).toBe(5);
    expect(() => parseVideoQuota('-1')).toThrow('non-negative integer');
    expect(() => parseVideoQuota('5.5')).toThrow('non-negative integer');
    expect(() => parseVideoQuota('100001')).toThrow('between 0 and 100000');
  });

  it('accepts explicit toggle spellings and rejects unknown values', () => {
    expect(parseVideoToggle('on')).toBe(true);
    expect(parseVideoToggle('enabled')).toBe(true);
    expect(parseVideoToggle('off')).toBe(false);
    expect(parseVideoToggle('false')).toBe(false);
    expect(() => parseVideoToggle('maybe')).toThrow('--toggle must be one of');
  });

  it('preserves unrelated widget settings while changing the video toggle', () => {
    expect(mergeVideoToggle({ enabled: true, size: 'large' }, true)).toEqual({
      enabled: true,
      size: 'large',
      videoReviewsEnabled: true,
    });
    expect(mergeVideoToggle(null, false)).toEqual({ videoReviewsEnabled: false });
  });

  it('uses all three gates for effective storefront capability', () => {
    expect(effectiveVideoGate({ globalEnabled: true, quota: 5, toggle: true })).toBe(true);
    expect(effectiveVideoGate({ globalEnabled: false, quota: 5, toggle: true })).toBe(false);
    expect(effectiveVideoGate({ globalEnabled: true, quota: 0, toggle: true })).toBe(false);
    expect(effectiveVideoGate({ globalEnabled: true, quota: 5, toggle: false })).toBe(false);
  });

  it('summarizes disabled gate state without treating missing widget rows as enabled', () => {
    const first = buildStoreGateRow({ storeId: 'store-1', videoMonthlyLimit: 0 }, null, false);
    const second = buildStoreGateRow(
      { storeId: 'store-2', videoMonthlyLimit: 0 },
      { settings: { videoReviewsEnabled: false } },
      false,
    );
    expect(summarizeGateRows([first, second])).toEqual({
      stores: 2,
      quotaEnabled: 0,
      togglesEnabled: 0,
      effectivelyEnabled: 0,
      allDisabled: true,
    });
  });

  it('blocks accidental live activation unless explicitly acknowledged', () => {
    const options = parseCanaryOptions(argv(
      '--storeId=store-1',
      '--confirmStoreId=store-1',
      '--quota=5',
      '--toggle=on',
      '--apply',
    ));
    expect(() => buildMutationPreview({ quota: 0, toggle: false }, options, true))
      .toThrow('--allow-live-activation');

    const acknowledged = parseCanaryOptions(argv(
      '--storeId=store-1',
      '--confirmStoreId=store-1',
      '--quota=5',
      '--toggle=on',
      '--apply',
      '--allow-live-activation',
    ));
    expect(buildMutationPreview({ quota: 0, toggle: false }, acknowledged, true).next.effective).toBe(true);
  });

  it('keeps disabled verification mutually exclusive with mutations', () => {
    expect(() => parseCanaryOptions(argv('--expect-all-disabled', '--storeId=store-1', '--quota=5')))
      .toThrow('cannot be combined');
    expect(() => parseCanaryOptions(argv('--unknown'))).toThrow('Unknown argument');
  });
});

