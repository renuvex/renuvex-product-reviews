import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { isUnapprovedVideoPreview, type MediaPreviewState } from '@/components/home-page/MediaPreviewState';
import { REVIEW_PLAYER_LOCALE } from '@/lib/mux-player/review-player-locale';

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
    const storefrontPlayerSource = readFileSync(path.join(process.cwd(), 'src/widget/reviews-section/video-playback.js'), 'utf8');
    const themeSource = readFileSync(path.join(process.cwd(), 'src/lib/mux-player/review-player-theme.ts'), 'utf8');
    const i18nSource = readFileSync(path.join(process.cwd(), 'src/lib/mux-player/review-player-i18n.ts'), 'utf8');

    expect(source).toContain('/api/admin/reviews/video-playback?mediaId=');
    expect(source).toContain('Onaylanmam\u0131\u015f m\u00fc\u015fteri videosu');
    expect(source).toContain('playbackId={mediaPreview.playbackId}');
    expect(source).toContain('playbackToken={mediaPreview.playbackToken}');
    expect(source).toContain('thumbnailToken={mediaPreview.thumbnailToken}');
    expect(source).toContain('w-[min(88vw,360px)]');
    expect(source).toContain('w-[min(92vw,760px)]');
    expect(source).toContain('h-[min(72vh,640px)]');
    expect(source).not.toContain('max-h-[86vh] max-w-[90vw]');
    expect(playerSource).toContain('ensureAdminReviewMuxPlayerTheme');
    expect(playerSource).toContain('<mux-player');
    expect(playerSource).toContain('ADMIN_REVIEW_PLAYER_COLORS');
    expect(playerSource).toContain('lang={REVIEW_PLAYER_LOCALE}');
    expect(playerSource).toContain('theme={ADMIN_REVIEW_MUX_PLAYER_THEME}');
    expect(playerSource).toContain('playback-token={playbackToken}');
    expect(playerSource).toContain('thumbnail-token={thumbnailToken}');
    expect(playerSource).toContain('disable-tracking');
    expect(playerSource).toContain('disable-cookies');
    expect(playerSource).toContain('nohotkeys');
    expect(playerSource).not.toContain('hotkeys=');
    expect(playerSource).toContain('accent-color={ADMIN_REVIEW_PLAYER_COLORS.controlForeground}');
    expect(playerSource).toContain('primary-color={ADMIN_REVIEW_PLAYER_COLORS.controlForeground}');
    expect(playerSource).toContain('secondary-color={ADMIN_REVIEW_PLAYER_COLORS.controlBackground}');
    expect(playerSource).toContain("'--controls-backdrop-color': ADMIN_REVIEW_PLAYER_COLORS.controlsBackdrop");
    expect(playerSource).toContain("'--pip-button': 'none'");
    expect(playerSource).toContain("'--cast-button': 'none'");
    expect(playerSource).toContain("'--seek-backward-button': 'none'");
    expect(playerSource).toContain("'--seek-forward-button': 'none'");
    expect(playerSource).toContain("'--audio-track-menu-button': 'none'");
    expect(playerSource).toContain("'--captions-button': 'none'");
    expect(playerSource).toContain("'--playback-rate-button': 'none'");
    expect(playerSource).toContain('onContextMenu={preventNativeVideoContextMenu}');
    expect(playerSource).not.toContain('STOREFRONT_REVIEW_MUX_PLAYER_THEME');
    expect(playerSource).not.toMatch(/autoPlay|autoplay/);
    expect(playerSource).not.toContain('theme-style');
    expect(storefrontPlayerSource).toContain('ensureStorefrontReviewMuxPlayerTheme');
    expect(storefrontPlayerSource).toContain("INITIAL_CENTER_PLAY_BUTTON_VAR = '--center-play-button'");
    expect(storefrontPlayerSource).toContain("player.style.setProperty(INITIAL_CENTER_PLAY_BUTTON_VAR, 'none')");
    expect(storefrontPlayerSource).toContain('player.style.removeProperty(INITIAL_CENTER_PLAY_BUTTON_VAR)');
    expect(storefrontPlayerSource).toContain("window.customElements.whenDefined('mux-player')");
    expect(storefrontPlayerSource).toContain("player.setAttribute('lang', REVIEW_PLAYER_LOCALE)");
    expect(storefrontPlayerSource).toContain("player.setAttribute('muted', '')");
    expect(storefrontPlayerSource).toContain("player.setAttribute('nohotkeys', '')");
    expect(storefrontPlayerSource).not.toContain("player.setAttribute('hotkeys'");
    expect(storefrontPlayerSource).toContain('STOREFRONT_REVIEW_PLAYER_COLORS');
    expect(storefrontPlayerSource).toContain('STOREFRONT_REVIEW_MUX_PLAYER_THEME');
    expect(storefrontPlayerSource).not.toContain('ADMIN_REVIEW_MUX_PLAYER_THEME');
    expect(themeSource).toContain('media-theme-renuvex-review-admin');
    expect(themeSource).toContain('media-theme-renuvex-review-storefront');
    expect(themeSource).toContain("export const ADMIN_REVIEW_MUX_PLAYER_THEME = 'renuvex-review-admin'");
    expect(themeSource).toContain("export const STOREFRONT_REVIEW_MUX_PLAYER_THEME = 'renuvex-review-storefront'");
    expect(themeSource).toContain('export const ADMIN_REVIEW_PLAYER_COLORS');
    expect(themeSource).toContain('export const STOREFRONT_REVIEW_PLAYER_COLORS');
    expect(themeSource).toContain('function reviewLightboxVideoVar');
    expect(themeSource).toContain("reviewLightboxVideoVar('icon', NEUTRAL_REVIEW_PLAYER_COLORS.controlForeground)");
    expect(themeSource).toContain("centerPlayButtonBackground: 'rgba(0,0,0,0.20)'");
    expect(themeSource).toContain("centerPlayButtonHoverBackground: 'rgba(0,0,0,0.28)'");
    expect(themeSource).not.toContain("reviewLightboxVideoVar('button-bg'");
    expect(themeSource).not.toContain("reviewLightboxVideoVar('button-hover-bg'");
    expect(themeSource).toContain("reviewLightboxVideoVar('progress', NEUTRAL_REVIEW_PLAYER_COLORS.progressPlayed)");
    expect(themeSource).toContain("reviewLightboxVideoVar('progress-track', NEUTRAL_REVIEW_PLAYER_COLORS.progressTrack)");
    expect(themeSource).toContain("import('./review-player-i18n')");
    expect(themeSource).toContain("import('media-chrome')");
    expect(themeSource).toContain("import('media-chrome/menu')");
    expect(themeSource).toContain("querySelector('media-controller')?.setAttribute('lang', REVIEW_PLAYER_LOCALE)");
    expect(themeSource).toContain("controlForeground: '#ffffff'");
    expect(themeSource).toContain("controlBackground: '#000000'");
    expect(themeSource).toContain("controlHoverBackground: 'rgba(0,0,0,0.84)'");
    expect(themeSource).toContain("centerPlayButtonBackground: 'rgba(0,0,0,0.68)'");
    expect(themeSource).toContain("centerPlayButtonHoverBackground: 'rgba(0,0,0,0.72)'");
    expect(themeSource).toContain("controlsBackdrop: 'rgba(0,0,0,0.58)'");
    expect(themeSource).toContain("menuBackground: '#000000'");
    expect(themeSource).toContain("menuText: '#ffffff'");
    expect(themeSource).toContain("menuCheckedBackground: 'rgba(255,255,255,0.18)'");
    expect(themeSource).toContain("menuHoverBackground: 'rgba(255,255,255,0.12)'");
    expect(themeSource).toContain('media-control-bar,');
    expect(themeSource).toContain('media-control-bar *,');
    expect(themeSource).toContain('.center-controls.pre-playback media-play-button');
    expect(themeSource).toContain('--media-control-background: ${colors.centerPlayButtonBackground}');
    expect(themeSource).toContain('--media-control-hover-background: ${colors.centerPlayButtonHoverBackground}');
    expect(themeSource).toContain('--media-control-padding: 0');
    expect(themeSource).toContain('--media-button-icon-width: 34px');
    expect(themeSource).toContain('width: 72px');
    expect(themeSource).toContain('border-radius: 50%');
    expect(themeSource).toContain('--media-icon-color: ${colors.controlForeground}');
    expect(themeSource).toContain('--media-text-color: ${colors.controlForeground}');
    expect(themeSource).toContain('media-time-range');
    expect(themeSource).toContain('--media-range-bar-color: ${colors.progressPlayed}');
    expect(themeSource).toContain('--media-range-thumb-background: radial-gradient');
    expect(themeSource).toContain('${colors.controlBackground} 32%');
    expect(themeSource).toContain('${colors.progressPlayed} 32%');
    expect(themeSource).toContain('--media-range-thumb-box-shadow: ${colors.progressThumbShadow}');
    expect(themeSource).toContain('--media-range-track-background: ${colors.progressTrack}');
    expect(themeSource).toContain('--media-range-track-pointer-background: ${colors.progressPointer}');
    expect(themeSource).toContain('--media-range-track-pointer-border-right: ${colors.progressPointerBorder}');
    expect(themeSource).toContain('--media-preview-thumbnail-display: none');
    expect(themeSource).toContain('--media-preview-time-background: ${colors.controlBackground}');
    expect(themeSource).toContain('--media-preview-time-text-shadow: none');
    expect(themeSource).toContain('--media-text-background: ${colors.controlBackground}');
    expect(themeSource).toContain('--media-control-background: ${colors.controlBackground}');
    expect(themeSource).toContain("media-rendition-menu,");
    expect(themeSource).toContain("media-playback-rate-menu {");
    expect(themeSource).toContain("--media-menu-background: ${colors.menuBackground}");
    expect(themeSource).toContain("--media-text-color: ${colors.menuText}");
    expect(i18nSource).toContain("addTranslation(REVIEW_PLAYER_LOCALE, REVIEW_PLAYER_TR_TRANSLATIONS)");
    expect(i18nSource).toContain("setLanguage(REVIEW_PLAYER_LOCALE)");
    expect(i18nSource).toContain("Quality: 'Kalite'");
    expect(i18nSource).toContain("'Playback rate': 'Oynatma hızı'");
    expect(REVIEW_PLAYER_LOCALE).toBe('tr');
  });

  it('registers Turkish labels for Media Chrome player controls', async () => {
    const [{ setLanguage, t }] = await Promise.all([
      import('media-chrome/dist/utils/i18n.js'),
      import('@/lib/mux-player/review-player-i18n'),
    ]);

    setLanguage(REVIEW_PLAYER_LOCALE);

    expect(t('Quality')).toBe('Kalite');
    expect(t('Playback rate')).toBe('Oynatma hızı');
    expect(t('Settings')).toBe('Ayarlar');
    expect(t('Enter fullscreen mode')).toBe('Tam ekrana geç');
    expect(t('Exit fullscreen mode')).toBe('Tam ekrandan çık');
  });
});
