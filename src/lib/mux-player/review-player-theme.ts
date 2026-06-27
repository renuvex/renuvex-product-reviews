import { REVIEW_PLAYER_LOCALE } from './review-player-locale';

const ADMIN_REVIEW_MUX_PLAYER_THEME_ELEMENT = 'media-theme-renuvex-review-admin';
const STOREFRONT_REVIEW_MUX_PLAYER_THEME_ELEMENT = 'media-theme-renuvex-review-storefront';

export const ADMIN_REVIEW_MUX_PLAYER_THEME = 'renuvex-review-admin';
export const STOREFRONT_REVIEW_MUX_PLAYER_THEME = 'renuvex-review-storefront';

const NEUTRAL_REVIEW_PLAYER_COLORS = {
  controlForeground: '#ffffff',
  controlBackground: '#000000',
  controlHoverBackground: 'rgba(0,0,0,0.84)',
  centerPlayButtonBackground: 'rgba(0,0,0,0.68)',
  centerPlayButtonHoverBackground: 'rgba(0,0,0,0.72)',
  controlsBackdrop: 'rgba(0,0,0,0.58)',
  menuBackground: '#000000',
  menuBorder: 'rgba(255,255,255,0.18)',
  menuText: '#ffffff',
  menuCheckedText: '#ffffff',
  menuHoverBackground: 'rgba(255,255,255,0.12)',
  menuCheckedBackground: 'rgba(255,255,255,0.18)',
  menuHoverOutline: 'rgba(255,255,255,0.54) solid 1px',
  progressPlayed: '#ffffff',
  progressTrack: '#000000',
  progressPointer: 'rgba(255,255,255,0.72)',
  progressBuffered: 'rgba(255,255,255,0.28)',
  progressThumbBorder: '1px solid rgba(255,255,255,0.72)',
  progressThumbShadow: '0 0 0 1px rgba(0,0,0,0.45)',
  progressPointerBorder: '1px solid rgba(0,0,0,0.55)',
} as const;

type ReviewPlayerColors = Record<keyof typeof NEUTRAL_REVIEW_PLAYER_COLORS, string>;

function reviewLightboxVideoVar(name: string, fallback: string): string {
  return `var(--renuvex-pr-review-lightbox-video-${name}, ${fallback})`;
}

export const ADMIN_REVIEW_PLAYER_COLORS = {
  ...NEUTRAL_REVIEW_PLAYER_COLORS,
} as const satisfies ReviewPlayerColors;

export const STOREFRONT_REVIEW_PLAYER_COLORS = {
  ...NEUTRAL_REVIEW_PLAYER_COLORS,
  controlForeground: reviewLightboxVideoVar('icon', NEUTRAL_REVIEW_PLAYER_COLORS.controlForeground),
  centerPlayButtonBackground: 'rgba(0,0,0,0.20)',
  centerPlayButtonHoverBackground: 'rgba(0,0,0,0.28)',
  progressPlayed: reviewLightboxVideoVar('progress', NEUTRAL_REVIEW_PLAYER_COLORS.progressPlayed),
  progressTrack: reviewLightboxVideoVar('progress-track', NEUTRAL_REVIEW_PLAYER_COLORS.progressTrack),
  progressThumbBorder: `1px solid ${reviewLightboxVideoVar('progress', NEUTRAL_REVIEW_PLAYER_COLORS.progressPlayed)}`,
} as const satisfies ReviewPlayerColors;

type MediaThemeConstructor = CustomElementConstructor & {
  template?: HTMLTemplateElement;
};

let reviewPlayerModulePromise: Promise<void> | null = null;

function reviewPlayerThemeCss(colors: ReviewPlayerColors): string {
  return `
  :host {
    --media-control-hover-background: ${colors.controlHoverBackground};
    --media-icon-color: ${colors.controlForeground};
    --media-text-color: ${colors.controlForeground};
  }

  media-control-bar,
  media-control-bar *,
  .center-controls,
  .center-controls * {
    --media-control-hover-background: ${colors.controlHoverBackground};
    --media-icon-color: ${colors.controlForeground};
    --media-text-color: ${colors.controlForeground};
  }

  .center-controls.pre-playback media-play-button,
  [breakpointsm] .center-controls.pre-playback media-play-button {
    --media-control-background: ${colors.centerPlayButtonBackground};
    --media-control-hover-background: ${colors.centerPlayButtonHoverBackground};
    --media-control-padding: 0;
    --media-button-padding: 0;
    --media-button-icon-width: 34px;
    --media-button-icon-height: 34px;
    --media-icon-color: ${colors.controlForeground};
    width: 72px;
    height: 72px;
    min-width: 72px;
    border-radius: 50%;
    overflow: hidden;
  }

  [breakpointsm] .center-controls.pre-playback media-play-button {
    --media-button-icon-width: 30px;
    --media-button-icon-height: 30px;
    width: 64px;
    height: 64px;
    min-width: 64px;
  }

  media-time-range {
    --media-range-bar-color: ${colors.progressPlayed};
    --media-range-thumb-background: radial-gradient(
      circle,
      ${colors.controlBackground} 0%,
      ${colors.controlBackground} 32%,
      ${colors.progressPlayed} 32%,
      ${colors.progressPlayed} 100%
    );
    --media-range-thumb-border: ${colors.progressThumbBorder};
    --media-range-thumb-box-shadow: ${colors.progressThumbShadow};
    --media-range-track-background: ${colors.progressTrack};
    --media-range-track-pointer-background: ${colors.progressPointer};
    --media-range-track-pointer-border-right: ${colors.progressPointerBorder};
    --media-time-range-buffered-color: ${colors.progressBuffered};
    --media-preview-thumbnail-display: none;
    --media-preview-time-background: ${colors.controlBackground};
    --media-preview-time-text-shadow: none;
    --media-text-background: ${colors.controlBackground};
    --media-control-background: ${colors.controlBackground};
    --media-text-color: ${colors.controlForeground};
  }

  [part~='menu'] {
    border-color: ${colors.menuBorder};
    color: ${colors.menuText};
  }

  media-captions-menu,
  media-rendition-menu,
  media-audio-track-menu,
  media-playback-rate-menu {
    --media-menu-background: ${colors.menuBackground};
    --media-menu-item-checked-background: ${colors.menuCheckedBackground};
    --media-menu-item-hover-background: ${colors.menuHoverBackground};
    --media-menu-item-hover-outline: ${colors.menuHoverOutline};
    --media-text-color: ${colors.menuText};
    color: ${colors.menuText};
  }

  media-playback-rate-menu[part~='menu']::part(checked) {
    color: ${colors.menuCheckedText};
  }
`;
}

const ADMIN_REVIEW_PLAYER_THEME_CSS = reviewPlayerThemeCss(ADMIN_REVIEW_PLAYER_COLORS);
const STOREFRONT_REVIEW_PLAYER_THEME_CSS = reviewPlayerThemeCss(STOREFRONT_REVIEW_PLAYER_COLORS);

function defineReviewPlayerTheme(themeElement: string, themeCss: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const registry = window.customElements;
  if (registry.get(themeElement)) return;

  const GerwigTheme = registry.get('media-theme-gerwig') as MediaThemeConstructor | undefined;
  const gerwigTemplate = GerwigTheme?.template;
  if (!GerwigTheme || !(gerwigTemplate instanceof HTMLTemplateElement)) return;

  const reviewTemplate = gerwigTemplate.cloneNode(true) as HTMLTemplateElement;
  reviewTemplate.id = themeElement;
  reviewTemplate.content.querySelector('media-controller')?.setAttribute('lang', REVIEW_PLAYER_LOCALE);

  const reviewControlStyle = document.createElement('style');
  reviewControlStyle.textContent = themeCss;
  reviewTemplate.content.append(reviewControlStyle);

  class RenuvexReviewTheme extends GerwigTheme {}

  (RenuvexReviewTheme as MediaThemeConstructor).template = reviewTemplate;
  registry.define(themeElement, RenuvexReviewTheme);
}

function ensureNamedReviewMuxPlayerTheme(themeElement: string, themeCss: string): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  reviewPlayerModulePromise ??= import('./review-player-i18n')
    .then(() => import('media-chrome'))
    .then(() => import('media-chrome/menu'))
    .then(() => import('@mux/mux-player/themes/gerwig'))
    .then(() => import('@mux/mux-player'))
    .then(() => undefined);

  return reviewPlayerModulePromise.then(() => {
    defineReviewPlayerTheme(themeElement, themeCss);
  });
}

export function ensureAdminReviewMuxPlayerTheme(): Promise<void> {
  return ensureNamedReviewMuxPlayerTheme(ADMIN_REVIEW_MUX_PLAYER_THEME_ELEMENT, ADMIN_REVIEW_PLAYER_THEME_CSS);
}

export function ensureStorefrontReviewMuxPlayerTheme(): Promise<void> {
  return ensureNamedReviewMuxPlayerTheme(
    STOREFRONT_REVIEW_MUX_PLAYER_THEME_ELEMENT,
    STOREFRONT_REVIEW_PLAYER_THEME_CSS,
  );
}
