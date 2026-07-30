import { describe, expect, it } from 'vitest';
import {
  isPreviewRenderMessage,
  isPreviewResetScrollMessage,
} from '../../src/widget/core/namespace.js';
import {
  PREVIEW_PROTOCOL_VERSION,
  getDefaultWidgetPreviewScene,
  getWidgetPreviewScenes,
  isWidgetPreviewScene,
} from '../../src/widget/preview/scenes.js';

describe('widget preview protocol', () => {
  it('declares deterministic scenes for implemented widgets', () => {
    expect(getWidgetPreviewScenes('reviews')).toEqual([
      { id: 'reviews', label: 'Yorumlar' },
    ]);
    expect(getWidgetPreviewScenes('badge')).toEqual([
      { id: 'pdp', label: 'Ürün' },
      { id: 'listing', label: 'Liste' },
    ]);
    expect(getWidgetPreviewScenes('carousel')).toEqual([]);
    expect(getDefaultWidgetPreviewScene('badge')).toBe('pdp');
    expect(isWidgetPreviewScene('badge', 'listing')).toBe(true);
    expect(isWidgetPreviewScene('badge', 'unknown')).toBe(false);
  });

  it('accepts only versioned render messages with a supported exact scene', () => {
    const message = {
      version: PREVIEW_PROTOCOL_VERSION,
      type: 'RENUVEX_PR_PREVIEW_RENDER',
      widgetId: 'badge',
      scene: 'pdp',
      widgets: { reviews: {}, badge: {} },
    };

    expect(isPreviewRenderMessage(message)).toBe(true);
    expect(isPreviewRenderMessage({ ...message, version: 2 })).toBe(false);
    expect(isPreviewRenderMessage({ ...message, scene: 'unknown' })).toBe(false);
    expect(isPreviewRenderMessage({ ...message, widgets: null })).toBe(false);
  });

  it('keeps reset-scroll messages versioned and scene-bound', () => {
    const message = {
      version: PREVIEW_PROTOCOL_VERSION,
      type: 'RENUVEX_PR_PREVIEW_RESET_SCROLL',
      widgetId: 'reviews',
      scene: 'reviews',
    };

    expect(isPreviewResetScrollMessage(message)).toBe(true);
    expect(isPreviewResetScrollMessage({ ...message, widgetId: 'badge' })).toBe(false);
  });
});
