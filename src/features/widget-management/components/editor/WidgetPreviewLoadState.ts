export type WidgetPreviewStatus = 'loading' | 'slow' | 'ready' | 'error';

export interface WidgetPreviewLoadState {
  status: WidgetPreviewStatus;
  requestKey: number;
}

export type WidgetPreviewLoadAction =
  | { type: 'start'; requestKey: number }
  | { type: 'retry' }
  | { type: 'slow'; requestKey: number }
  | { type: 'ready'; requestKey: number }
  | { type: 'error'; requestKey: number };

export const INITIAL_WIDGET_PREVIEW_LOAD_STATE: WidgetPreviewLoadState = {
  status: 'loading',
  requestKey: 0,
};

function isCurrentRequest(state: WidgetPreviewLoadState, requestKey: number): boolean {
  return state.requestKey === requestKey;
}

export function reduceWidgetPreviewLoadState(
  state: WidgetPreviewLoadState,
  action: WidgetPreviewLoadAction,
): WidgetPreviewLoadState {
  if (action.type === 'start') {
    return { status: 'loading', requestKey: action.requestKey };
  }

  if (action.type === 'retry') {
    return { status: 'loading', requestKey: state.requestKey + 1 };
  }

  if (!isCurrentRequest(state, action.requestKey)) {
    return state;
  }

  if (action.type === 'slow') {
    return state.status === 'loading' ? { ...state, status: 'slow' } : state;
  }

  if (action.type === 'ready') {
    return { ...state, status: 'ready' };
  }

  if (action.type === 'error') {
    return state.status === 'ready' ? state : { ...state, status: 'error' };
  }

  return state;
}

export function shouldShowPreviewOverlay(status: WidgetPreviewStatus): boolean {
  return status !== 'ready';
}
