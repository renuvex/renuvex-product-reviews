import type { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';

type MuxPlayerElementAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  'playback-id'?: string;
  'playback-token'?: string;
  'thumbnail-token'?: string;
  'storyboard-token'?: string;
  'drm-token'?: string;
  'stream-type'?: 'on-demand' | 'live' | 'unknown';
  'disable-tracking'?: boolean | '';
  'disable-cookies'?: boolean | '';
  'accent-color'?: string;
  'primary-color'?: string;
  'secondary-color'?: string;
  theme?: string;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
  playsinline?: boolean | '';
  muted?: boolean;
  hotkeys?: string;
  style?: CSSProperties & Record<string, string | number | undefined>;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'mux-player': MuxPlayerElementAttributes;
    }
  }
}
