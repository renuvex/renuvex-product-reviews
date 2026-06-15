import { describe, expect, it } from 'vitest';
import {
  INITIAL_WIDGET_SETTINGS_LOAD_STATE,
  canOpenWidgetEditor,
  reduceWidgetSettingsLoadState,
  type WidgetSettingsLoadState,
} from '../../src/components/home-page/widgets/editor/WidgetSettingsLoadState';

describe('Widget settings load state', () => {
  it('starts in loading state with no settings', () => {
    expect(INITIAL_WIDGET_SETTINGS_LOAD_STATE).toEqual({
      status: 'loading',
      settings: {},
      meta: {},
    });
  });

  it('keeps existing settings while retrying', () => {
    const state: WidgetSettingsLoadState = {
      status: 'error',
      settings: { reviews: { title: 'Kayitli baslik' } },
      meta: {},
    };

    expect(reduceWidgetSettingsLoadState(state, { type: 'start' })).toEqual({
      status: 'loading',
      settings: state.settings,
      meta: {},
    });
  });

  it('loads valid settings response data', () => {
    const settings = { reviews: { title: 'Kayitli baslik', size: 'large' } };

    expect(reduceWidgetSettingsLoadState(INITIAL_WIDGET_SETTINGS_LOAD_STATE, {
      type: 'success',
      settings,
    })).toEqual({
      status: 'loaded',
      settings,
      meta: {},
    });
  });

  it('treats an empty settings map as a successful load', () => {
    expect(reduceWidgetSettingsLoadState(INITIAL_WIDGET_SETTINGS_LOAD_STATE, {
      type: 'success',
      settings: {},
    })).toEqual({
      status: 'loaded',
      settings: {},
      meta: {},
    });
  });

  it('moves to error for a failed settings request', () => {
    const state: WidgetSettingsLoadState = {
      status: 'loading',
      settings: { reviews: { title: 'Kayitli baslik' } },
      meta: {},
    };

    expect(reduceWidgetSettingsLoadState(state, { type: 'failure' })).toEqual({
      status: 'error',
      settings: state.settings,
      meta: {},
    });
  });

  it('moves to error for malformed settings response data', () => {
    const state: WidgetSettingsLoadState = {
      status: 'loading',
      settings: { reviews: { title: 'Kayitli baslik' } },
      meta: {},
    };

    expect(reduceWidgetSettingsLoadState(state, {
      type: 'success',
      settings: null,
    })).toEqual({
      status: 'error',
      settings: state.settings,
      meta: {},
    });
  });

  it('keeps valid usage metadata separate from editable settings', () => {
    const settings = { reviews: { videoReviewsEnabled: true } };
    const meta = {
      videoUsage: {
        monthlyLimit: 5,
        reservedCount: 1,
        consumedCount: 4,
        usedCount: 5,
        remainingCount: 0,
        effective: false,
        reason: 'quota_exceeded',
      },
    };

    const next = reduceWidgetSettingsLoadState(INITIAL_WIDGET_SETTINGS_LOAD_STATE, {
      type: 'success',
      settings,
      meta,
    });

    expect(next.settings).toBe(settings);
    expect(next.meta).toEqual(meta);
    expect(next.settings.reviews).not.toHaveProperty('videoUsage');
  });

  it('ignores malformed metadata without blocking the editor', () => {
    const next = reduceWidgetSettingsLoadState(INITIAL_WIDGET_SETTINGS_LOAD_STATE, {
      type: 'success',
      settings: { reviews: {} },
      meta: { videoUsage: { monthlyLimit: '5' } },
    });

    expect(next.status).toBe('loaded');
    expect(next.meta).toEqual({});
  });

  it('opens the widget editor only after settings are loaded', () => {
    expect(canOpenWidgetEditor('loading')).toBe(false);
    expect(canOpenWidgetEditor('error')).toBe(false);
    expect(canOpenWidgetEditor('loaded')).toBe(true);
  });
});
