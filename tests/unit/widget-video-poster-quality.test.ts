import { describe, expect, test } from 'vitest';
import {
  streamPosterSrcSet,
  streamPosterVariantUrl,
} from '../../src/widget/core/review-media.js';
import {
  pickWarmStartLevel,
  shouldUseQualityWarmStart,
} from '../../src/widget/reviews-section/video-playback.js';

describe('Stream poster variants', () => {
  test('adds deterministic thumbnail sizing parameters to trusted Stream poster URLs', () => {
    const url = streamPosterVariantUrl(
      'https://videodelivery.net/video-1/thumbnails/thumbnail.jpg?time=1s',
      { width: 300, height: 400, fit: 'crop' },
    );

    expect(url).toBe('https://videodelivery.net/video-1/thumbnails/thumbnail.jpg?time=1s&width=300&height=400&fit=crop');
  });

  test('generates 1x and 2x poster srcset variants', () => {
    const srcset = streamPosterSrcSet(
      'https://customer-test.cloudflarestream.com/video-1/thumbnails/thumbnail.jpg',
      { width: 320, height: 180, fit: 'clip' },
    );

    expect(srcset).toBe(
      'https://customer-test.cloudflarestream.com/video-1/thumbnails/thumbnail.jpg?width=320&height=180&fit=clip 1x, ' +
      'https://customer-test.cloudflarestream.com/video-1/thumbnails/thumbnail.jpg?width=640&height=360&fit=clip 2x',
    );
  });

  test('does not transform untrusted or non-thumbnail URLs', () => {
    expect(streamPosterVariantUrl('https://example.com/video-1/thumbnails/thumbnail.jpg', { width: 300, height: 400, fit: 'crop' }))
      .toBe('https://example.com/video-1/thumbnails/thumbnail.jpg');
    expect(streamPosterVariantUrl('https://videodelivery.net/video-1/manifest/video.m3u8', { width: 300, height: 400, fit: 'crop' }))
      .toBe('https://videodelivery.net/video-1/manifest/video.m3u8');
    expect(streamPosterVariantUrl('not a url', { width: 300, height: 400, fit: 'crop' })).toBe('not a url');
  });
});

describe('hls.js quality warm start helpers', () => {
  test('keeps conservative ABR startup when data saver or 2g is active', () => {
    expect(shouldUseQualityWarmStart({ connection: { saveData: true, effectiveType: '4g' } })).toBe(false);
    expect(shouldUseQualityWarmStart({ connection: { saveData: false, effectiveType: 'slow-2g' } })).toBe(false);
    expect(shouldUseQualityWarmStart({ connection: { saveData: false, effectiveType: '2g' } })).toBe(false);
    expect(shouldUseQualityWarmStart({ connection: { saveData: false, effectiveType: '4g' } })).toBe(true);
  });

  test('chooses the highest level that fits the rendered player size and device pixel ratio', () => {
    const levels = [
      { width: 426, height: 240, bitrate: 400_000 },
      { width: 854, height: 480, bitrate: 1_200_000 },
      { width: 1280, height: 720, bitrate: 2_800_000 },
      { width: 1920, height: 1080, bitrate: 5_000_000 },
    ];
    const video = {
      clientWidth: 640,
      clientHeight: 360,
      getBoundingClientRect: () => ({ width: 640, height: 360 }),
    };

    expect(pickWarmStartLevel(levels, video, { devicePixelRatio: 2 })).toBe(2);
  });

  test('falls back to the lowest available level when every level is larger than the player', () => {
    const levels = [
      { width: 1280, height: 720, bitrate: 2_800_000 },
      { width: 1920, height: 1080, bitrate: 5_000_000 },
    ];
    const video = {
      clientWidth: 180,
      clientHeight: 120,
      getBoundingClientRect: () => ({ width: 180, height: 120 }),
    };

    expect(pickWarmStartLevel(levels, video, { devicePixelRatio: 1 })).toBe(0);
  });
});
