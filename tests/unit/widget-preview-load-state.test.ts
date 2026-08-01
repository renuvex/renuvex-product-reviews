import { describe, expect, it } from 'vitest';
import {
  INITIAL_WIDGET_PREVIEW_LOAD_STATE,
  reduceWidgetPreviewLoadState,
  shouldShowPreviewOverlay,
} from '../../src/features/widget-management/components/editor/WidgetPreviewLoadState';

describe('Widget preview load state', () => {
  it('starts in loading state for the first preview request', () => {
    expect(INITIAL_WIDGET_PREVIEW_LOAD_STATE).toEqual({
      status: 'loading',
      requestKey: 0,
    });
  });

  it('moves the active request from loading to slow', () => {
    expect(reduceWidgetPreviewLoadState(INITIAL_WIDGET_PREVIEW_LOAD_STATE, {
      type: 'slow',
      requestKey: 0,
    })).toEqual({
      status: 'slow',
      requestKey: 0,
    });
  });

  it('moves the active request to ready', () => {
    expect(reduceWidgetPreviewLoadState(INITIAL_WIDGET_PREVIEW_LOAD_STATE, {
      type: 'ready',
      requestKey: 0,
    })).toEqual({
      status: 'ready',
      requestKey: 0,
    });
  });

  it('moves the active loading request to error', () => {
    expect(reduceWidgetPreviewLoadState(INITIAL_WIDGET_PREVIEW_LOAD_STATE, {
      type: 'error',
      requestKey: 0,
    })).toEqual({
      status: 'error',
      requestKey: 0,
    });
  });

  it('keeps ready state when a late timeout fires for the active request', () => {
    const readyState = reduceWidgetPreviewLoadState(INITIAL_WIDGET_PREVIEW_LOAD_STATE, {
      type: 'ready',
      requestKey: 0,
    });

    expect(reduceWidgetPreviewLoadState(readyState, {
      type: 'error',
      requestKey: 0,
    })).toBe(readyState);
  });

  it('increments the request key when retrying', () => {
    const errorState = reduceWidgetPreviewLoadState(INITIAL_WIDGET_PREVIEW_LOAD_STATE, {
      type: 'error',
      requestKey: 0,
    });

    expect(reduceWidgetPreviewLoadState(errorState, { type: 'retry' })).toEqual({
      status: 'loading',
      requestKey: 1,
    });
  });

  it('ignores stale events from an old preview request', () => {
    const retriedState = reduceWidgetPreviewLoadState(INITIAL_WIDGET_PREVIEW_LOAD_STATE, { type: 'retry' });

    expect(reduceWidgetPreviewLoadState(retriedState, {
      type: 'ready',
      requestKey: 0,
    })).toBe(retriedState);
  });

  it('shows the overlay until the preview is ready', () => {
    expect(shouldShowPreviewOverlay('loading')).toBe(true);
    expect(shouldShowPreviewOverlay('slow')).toBe(true);
    expect(shouldShowPreviewOverlay('error')).toBe(true);
    expect(shouldShowPreviewOverlay('ready')).toBe(false);
  });
});
