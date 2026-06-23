import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { isUnapprovedVideoPreview, type MediaPreviewState } from '@/components/home-page/MediaPreviewState';

function preview(overrides: Partial<MediaPreviewState> = {}): MediaPreviewState {
  return {
    mediaId: 'media-1',
    type: 'video',
    url: 'https://signed-playback.test/manifest.m3u8',
    playbackId: 'signed-playback-1',
    playbackToken: 'video-token',
    thumbnailToken: 'thumbnail-token',
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
    const playerSource = readFileSync(path.join(process.cwd(), 'src/components/home-page/AdminMuxPlayerPreview.tsx'), 'utf8');
    const themeSource = readFileSync(path.join(process.cwd(), 'src/lib/mux-player/review-player-theme.ts'), 'utf8');

    expect(source).toContain('/api/admin/reviews/video-playback?mediaId=');
    expect(source).toContain('Onaylanmam\u0131\u015f m\u00fc\u015fteri videosu');
    expect(source).toContain('playbackId={mediaPreview.playbackId}');
    expect(source).toContain('playbackToken={mediaPreview.playbackToken}');
    expect(source).toContain('thumbnailToken={mediaPreview.thumbnailToken}');
    expect(source).toContain('w-[min(88vw,360px)]');
    expect(source).toContain('w-[min(92vw,760px)]');
    expect(source).toContain('h-[min(72vh,640px)]');
    expect(source).not.toContain('max-h-[86vh] max-w-[90vw]');
    expect(playerSource).toContain('ensureReviewMuxPlayerTheme');
    expect(playerSource).toContain('<mux-player');
    expect(playerSource).toContain('theme={REVIEW_MUX_PLAYER_THEME}');
    expect(playerSource).toContain('playback-token={playbackToken}');
    expect(playerSource).toContain('thumbnail-token={thumbnailToken}');
    expect(playerSource).toContain('disable-tracking');
    expect(playerSource).toContain('disable-cookies');
    expect(playerSource).toContain('accent-color="#ffffff"');
    expect(playerSource).toContain('primary-color="#ffffff"');
    expect(playerSource).toContain('secondary-color="#000000"');
    expect(playerSource).toContain("'--controls-backdrop-color': 'rgba(0,0,0,0.58)'");
    expect(playerSource).toContain('onContextMenu={preventNativeVideoContextMenu}');
    expect(playerSource).not.toMatch(/autoPlay|autoplay/);
    expect(playerSource).not.toContain('theme-style');
    expect(themeSource).toContain('media-theme-renuvex-review');
    expect(themeSource).toContain('media-control-bar,');
    expect(themeSource).toContain('media-control-bar *,');
    expect(themeSource).toContain('.center-controls.pre-playback media-play-button');
    expect(themeSource).toContain('--media-control-hover-background: rgba(0,0,0,0.84)');
    expect(themeSource).toContain('--media-icon-color: #ffffff');
    expect(themeSource).toContain('--media-text-color: #ffffff');
    expect(themeSource).toContain('media-time-range');
    expect(themeSource).toContain('--media-range-bar-color: #ffffff');
    expect(themeSource).toContain('--media-range-thumb-background: radial-gradient');
    expect(themeSource).toContain('#000000 32%');
    expect(themeSource).toContain('--media-range-thumb-box-shadow: 0 0 0 1px rgba(0,0,0,0.45)');
    expect(themeSource).toContain('--media-range-track-background: #000000');
    expect(themeSource).toContain('--media-range-track-pointer-background: rgba(255,255,255,0.72)');
    expect(themeSource).toContain('--media-range-track-pointer-border-right: 1px solid rgba(0,0,0,0.55)');
  });
});
