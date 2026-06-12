import type { WidgetSettingsMap } from '../../types';

export type WidgetSettingsLoadStatus = 'loading' | 'loaded' | 'error';

export interface WidgetSettingsLoadState {
  status: WidgetSettingsLoadStatus;
  settings: WidgetSettingsMap;
}

export type WidgetSettingsLoadAction =
  | { type: 'start' }
  | { type: 'success'; settings: unknown }
  | { type: 'failure' };

export const INITIAL_WIDGET_SETTINGS_LOAD_STATE: WidgetSettingsLoadState = {
  status: 'loading',
  settings: {},
};

export function isWidgetSettingsMap(value: unknown): value is WidgetSettingsMap {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function reduceWidgetSettingsLoadState(
  state: WidgetSettingsLoadState,
  action: WidgetSettingsLoadAction,
): WidgetSettingsLoadState {
  if (action.type === 'start') {
    return { status: 'loading', settings: state.settings };
  }

  if (action.type === 'failure') {
    return { status: 'error', settings: state.settings };
  }

  if (!isWidgetSettingsMap(action.settings)) {
    return { status: 'error', settings: state.settings };
  }

  return { status: 'loaded', settings: action.settings };
}

export function canOpenWidgetEditor(status: WidgetSettingsLoadStatus): boolean {
  return status === 'loaded';
}
