import { describe, expect, test } from 'vitest';
import {
  muxPosterSrcSet,
  muxPlaybackIdFromUrl,
  muxPosterVariantUrl,
} from '../../src/widget/core/review-media.js';
import {
  getReviewVideoPlaybackId,
} from '../../src/widget/reviews-section/video-playback.js';

describe('Mux poster variants', () => {
  test('adds deterministic thumbnail sizing parameters to trusted Mux poster URLs', () => {
    const url = muxPosterVariantUrl(
      'https://image.mux.com/playback-1/thumbnail.jpg?time=1',
      { width: 300, height: 400, fit: 'crop' },
    );

    expect(url).toBe('https://image.mux.com/playback-1/thumbnail.jpg?time=1&width=300&height=400&fit_mode=crop');
  });

  test('generates 1x and 2x poster srcset variants', () => {
    const srcset = muxPosterSrcSet(
      'https://image.mux.com/playback-1/thumbnail.jpg',
      { width: 320, height: 180, fit: 'smartcrop' },
    );

    expect(srcset).toBe(
      'https://image.mux.com/playback-1/thumbnail.jpg?width=320&height=180&fit_mode=smartcrop 1x, ' +
      'https://image.mux.com/playback-1/thumbnail.jpg?width=640&height=360&fit_mode=smartcrop 2x',
    );
  });

  test('does not transform untrusted or non-thumbnail URLs', () => {
    expect(muxPosterVariantUrl('https://example.com/video-1/thumbnails/thumbnail.jpg', { width: 300, height: 400, fit: 'crop' }))
      .toBe('https://example.com/video-1/thumbnails/thumbnail.jpg');
    expect(muxPosterVariantUrl('https://video.example.com/video-1/thumbnails/thumbnail.jpg', { width: 300, height: 400, fit: 'crop' }))
      .toBe('https://video.example.com/video-1/thumbnails/thumbnail.jpg');
    expect(muxPosterVariantUrl('https://stream.mux.com/playback-1.m3u8', { width: 300, height: 400, fit: 'crop' }))
      .toBe('https://stream.mux.com/playback-1.m3u8');
    expect(muxPosterVariantUrl('not a url', { width: 300, height: 400, fit: 'crop' })).toBe('not a url');
  });
  test('extracts playback ids only from trusted Mux delivery URLs', () => {
    expect(muxPlaybackIdFromUrl('https://stream.mux.com/playback-1.m3u8')).toBe('playback-1');
    expect(muxPlaybackIdFromUrl('https://image.mux.com/playback-1/thumbnail.jpg?width=320')).toBe('playback-1');
    expect(muxPlaybackIdFromUrl('https://evil.example/playback-1.m3u8')).toBe('');
    expect(muxPlaybackIdFromUrl('https://stream.mux.com/playback-1/master.mp4')).toBe('');
  });

  test('uses explicit playbackId when it matches the trusted Mux URL', () => {
    expect(getReviewVideoPlaybackId({
      type: 'video',
      playbackId: 'playback-1',
      url: 'https://stream.mux.com/playback-1.m3u8',
    })).toBe('playback-1');
    expect(getReviewVideoPlaybackId({
      type: 'video',
      playbackId: 'other-id',
      url: 'https://stream.mux.com/playback-1.m3u8',
    })).toBe('');
  });
});
