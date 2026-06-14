import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { isUnapprovedVideoPreview, type MediaPreviewState } from '@/components/home-page/MediaPreviewState';

function preview(overrides: Partial<MediaPreviewState> = {}): MediaPreviewState {
  return {
    mediaId: 'media-1',
    type: 'video',
    url: 'https://signed-playback.test/manifest.m3u8',
    loading: false,
    reviewStatus: 'pending',
    ...overrides,
  };
}

describe('admin video preview contract', () => {
  it('warns only for unapproved video previews', () => {
    expect(isUnapprovedVideoPreview(preview({ reviewStatus: 'pending' }))).toBe(true);
    expect(isUnapprovedVideoPreview(preview({ reviewStatus: 'rejected' }))).toBe(true);
    expect(isUnapprovedVideoPreview(preview({ reviewStatus: 'approved' }))).toBe(false);
    expect(isUnapprovedVideoPreview(preview({ type: 'image', reviewStatus: 'pending' }))).toBe(false);
    expect(isUnapprovedVideoPreview(null)).toBe(false);
  });

  it('keeps signed playback and safe player defaults in the admin surface', () => {
    const source = readFileSync(path.join(process.cwd(), 'src/components/home-page/index.tsx'), 'utf8');

    expect(source).toContain('/api/admin/reviews/video-playback?mediaId=');
    expect(source).toContain('Onaylanmam\u0131\u015f m\u00fc\u015fteri videosu');
    expect(source).toMatch(/<video\s+src=\{mediaPreview\.url\}\s+muted\s+controls\s+playsInline\s+preload="metadata"/);
    expect(source).not.toMatch(/<video[^>]*\sautoPlay(?:\s|=|>)/);
  });
});
