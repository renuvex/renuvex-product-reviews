import { describe, expect, test, vi } from 'vitest';

const starSpriteMock = vi.hoisted(() => ({
  ensureStarSprite: vi.fn(),
  starUseSvg: vi.fn((state: string) => {
    const id = state === 'outline' ? 'renuvex-pr-sym-star-outline' : 'renuvex-pr-sym-star-full';
    return `<svg data-state="${state}" aria-hidden="true"><use href="#${id}"/></svg>`;
  }),
}));

vi.mock('../../src/widget/icons/star-sprite.js', () => starSpriteMock);

import { partialStarsHTML } from '../../src/widget/core/helpers.js';

describe('partialStarsHTML icon fallback', () => {
  test('uses the default star icon pair when no iconPair is provided', () => {
    const html = partialStarsHTML(0, undefined);
    const pair = starSpriteMock.ensureStarSprite.mock.calls[0]?.[0];

    expect(starSpriteMock.ensureStarSprite).toHaveBeenCalledTimes(1);
    expect(pair.filled).toContain('M234.29,114.85');
    expect(pair.empty).toContain('M128,189.09');
    expect(html.match(/data-state="outline"/g)).toHaveLength(5);
    expect(html).toContain('href="#renuvex-pr-sym-star-outline"');
  });
});
