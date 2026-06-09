import { describe, expect, it } from 'vitest';
import { buildPageList } from '../../src/widget/reviews-section/render/pagination.js';

// buildPageList is the pure windowed/ellipsis page-list builder used by the
// numbered review pagination. SHOW_ALL_MAX = 7, PAGE_WINDOW = ±1.

describe('buildPageList', () => {
  it('returns a single page for totalPages <= 1', () => {
    expect(buildPageList(1, 1)).toEqual([1]);
  });

  it('shows every page when totalPages <= 7 (no ellipsis)', () => {
    expect(buildPageList(1, 6)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(buildPageList(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('truncates with a single ellipsis at the start when near the beginning', () => {
    expect(buildPageList(1, 8)).toEqual([1, 2, '…', 8]);
    expect(buildPageList(1, 548)).toEqual([1, 2, '…', 548]);
  });

  it('truncates with a single ellipsis at the end when near the end', () => {
    expect(buildPageList(8, 8)).toEqual([1, '…', 7, 8]);
    expect(buildPageList(548, 548)).toEqual([1, '…', 547, 548]);
  });

  it('shows both ellipses with the current page ±1 in the middle', () => {
    expect(buildPageList(4, 8)).toEqual([1, '…', 3, 4, 5, '…', 8]);
    expect(buildPageList(5, 548)).toEqual([1, '…', 4, 5, 6, '…', 548]);
  });

  it('clamps the current page into [1, totalPages]', () => {
    expect(buildPageList(0, 5)).toEqual([1, 2, 3, 4, 5]); // page 0 -> 1
    expect(buildPageList(999, 5)).toEqual([1, 2, 3, 4, 5]); // page > total -> total (still <=7 so all)
    expect(buildPageList(999, 548)).toEqual([1, '…', 547, 548]); // clamps to last
  });

  it('coerces non-numeric / invalid input to a safe single page', () => {
    expect(buildPageList('x' as unknown as number, 'y' as unknown as number)).toEqual([1]);
    expect(buildPageList(NaN, NaN)).toEqual([1]);
  });
});
