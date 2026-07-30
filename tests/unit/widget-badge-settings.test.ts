import { describe, expect, it } from 'vitest';
import {
  formatVisibleBadgeLabel,
  resolveBadgeJustify,
} from '../../src/widget/core/badge.js';

describe('rating badge settings contract', () => {
  it('applies explicit alignment over the theme-derived fallback', () => {
    expect(resolveBadgeJustify('left', 'center')).toBe('flex-start');
    expect(resolveBadgeJustify('center', 'flex-start')).toBe('center');
    expect(resolveBadgeJustify('right', 'flex-start')).toBe('flex-end');
    expect(resolveBadgeJustify('auto', 'flex-end')).toBe('flex-end');
    expect(resolveBadgeJustify(undefined, 'invalid')).toBe('flex-start');
  });

  it('formats PDP and listing labels for every visibility combination', () => {
    const rating = { avg: '4.8', count: 42 };

    expect(formatVisibleBadgeLabel(rating, {}, 'pdp')).toBe('4.8 (42 yorum)');
    expect(formatVisibleBadgeLabel(rating, {}, 'listing')).toBe('4.8 (42)');
    expect(formatVisibleBadgeLabel(rating, { showCount: false }, 'pdp')).toBe('4.8');
    expect(formatVisibleBadgeLabel(rating, { showValue: false }, 'pdp')).toBe('42 yorum');
    expect(formatVisibleBadgeLabel(rating, { showValue: false }, 'listing')).toBe('42');
    expect(formatVisibleBadgeLabel(
      rating,
      { showValue: false, showCount: false },
      'listing',
    )).toBe('');
  });
});
