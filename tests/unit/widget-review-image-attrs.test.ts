import { describe, expect, test } from 'vitest';
import { buildReviewImageAttrs, buildReviewImageFullSizeUrl } from '../../src/widget/core/helpers.js';

const assetId = '00000000-0000-4000-8000-000000000001';
const base = `https://media.renuvex.app/reviews/${assetId}`;

function variant(id: string, format: 'webp' | 'jpeg', width: number, height: number) {
  return {
    id,
    format,
    width,
    height,
    url: `${base}/${id}.${format}`,
  };
}

describe('buildReviewImageAttrs', () => {
  test('prefers full-size variants for lightbox when generated widths tie', () => {
    const attrs = buildReviewImageAttrs({
      type: 'image',
      url: `${base}/w1200.jpeg`,
      thumbnailUrl: `${base}/thumb_320x427.webp`,
      variants: [
        variant('w200', 'webp', 200, 250),
        variant('w300', 'webp', 201, 251),
        variant('w400', 'webp', 201, 251),
        variant('w600', 'webp', 201, 251),
        variant('w1200', 'webp', 201, 251),
        variant('thumb_320x427', 'webp', 201, 251),
        variant('thumb_640x854', 'webp', 201, 251),
      ],
    }, 1200, { preferFullSize: true });

    expect(attrs.src).toBe(`${base}/w1200.webp`);
    expect(attrs.srcset).toBe('');
  });

  test('keeps thumbnail fallback behavior for non-lightbox image thumbnails', () => {
    const attrs = buildReviewImageAttrs({
      type: 'image',
      url: `${base}/w1200.jpeg`,
      thumbnailUrl: `${base}/thumb_320x427.webp`,
      variants: [
        variant('w200', 'webp', 200, 250),
        variant('w300', 'webp', 201, 251),
        variant('w400', 'webp', 201, 251),
        variant('w600', 'webp', 201, 251),
        variant('w1200', 'webp', 201, 251),
        variant('thumb_320x427', 'webp', 201, 251),
        variant('thumb_640x854', 'webp', 201, 251),
      ],
    }, 300);

    expect(attrs.src).toBe(`${base}/thumb_640x854.webp`);
    expect(attrs.srcset).toBe('');
  });

  test('does not emit a duplicate density srcset for immutable AWS fallback URLs', () => {
    const attrs = buildReviewImageAttrs({
      type: 'image',
      url: `${base}/w300.jpeg`,
    }, 300);

    expect(attrs.src).toBe(`${base}/w300.jpeg`);
    expect(attrs.srcset).toBe('');
  });

  test('returns full-size WebP for DOM full-size references', () => {
    const url = buildReviewImageFullSizeUrl({
      type: 'image',
      url: `${base}/w1200.jpeg`,
      thumbnailUrl: `${base}/thumb_320x427.webp`,
      variants: [
        variant('w200', 'webp', 200, 250),
        variant('w1200', 'webp', 201, 251),
        variant('thumb_640x854', 'webp', 201, 251),
        variant('w1200', 'jpeg', 201, 251),
      ],
    });

    expect(url).toBe(`${base}/w1200.webp`);
  });

  test('falls back to full-size JPEG when no full-size WebP variant exists', () => {
    const url = buildReviewImageFullSizeUrl({
      type: 'image',
      url: `${base}/w1200.jpeg`,
      thumbnailUrl: `${base}/thumb_320x427.webp`,
      variants: [
        variant('thumb_640x854', 'webp', 201, 251),
        variant('w1200', 'jpeg', 201, 251),
      ],
    });

    expect(url).toBe(`${base}/w1200.jpeg`);
  });
});
