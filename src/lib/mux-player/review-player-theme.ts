const REVIEW_MUX_PLAYER_THEME_ELEMENT = 'media-theme-renuvex-review';

export const REVIEW_MUX_PLAYER_THEME = 'renuvex-review';

type MediaThemeConstructor = CustomElementConstructor & {
  template?: HTMLTemplateElement;
};

let reviewThemePromise: Promise<void> | null = null;

function defineReviewPlayerTheme() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const registry = window.customElements;
  if (registry.get(REVIEW_MUX_PLAYER_THEME_ELEMENT)) return;

  const GerwigTheme = registry.get('media-theme-gerwig') as MediaThemeConstructor | undefined;
  const gerwigTemplate = GerwigTheme?.template;
  if (!GerwigTheme || !(gerwigTemplate instanceof HTMLTemplateElement)) return;

  const reviewTemplate = gerwigTemplate.cloneNode(true) as HTMLTemplateElement;
  reviewTemplate.id = REVIEW_MUX_PLAYER_THEME_ELEMENT;

  const timeRangeStyle = document.createElement('style');
  timeRangeStyle.textContent = `
    media-time-range {
      --media-range-bar-color: #ffffff;
      --media-range-thumb-background: radial-gradient(
        circle,
        #000000 0%,
        #000000 32%,
        #ffffff 32%,
        #ffffff 100%
      );
      --media-range-thumb-border: 1px solid rgba(255,255,255,0.72);
      --media-range-thumb-box-shadow: 0 0 0 1px rgba(0,0,0,0.45);
      --media-range-track-background: #000000;
      --media-range-track-pointer-background: rgba(255,255,255,0.72);
      --media-range-track-pointer-border-right: 1px solid rgba(0,0,0,0.55);
      --media-time-range-buffered-color: rgba(255,255,255,0.28);
    }
  `;
  reviewTemplate.content.append(timeRangeStyle);

  class RenuvexReviewTheme extends GerwigTheme {}

  (RenuvexReviewTheme as MediaThemeConstructor).template = reviewTemplate;
  registry.define(REVIEW_MUX_PLAYER_THEME_ELEMENT, RenuvexReviewTheme);
}

export function ensureReviewMuxPlayerTheme(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  reviewThemePromise ??= import('@mux/mux-player/themes/gerwig')
    .then(() => {
      defineReviewPlayerTheme();
      return import('@mux/mux-player');
    })
    .then(() => {
      defineReviewPlayerTheme();
    });

  return reviewThemePromise;
}
