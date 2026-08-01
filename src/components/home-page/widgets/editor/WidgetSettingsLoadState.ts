import type { WidgetSettingsMap } from '../../types';

export type WidgetSettingsLoadStatus = 'idle' | 'loading' | 'loaded' | 'error';

export type VideoUsageReason =
  | 'enabled'
  | 'global_disabled'
  | 'merchant_disabled'
  | 'quota_disabled'
  | 'quota_exceeded'
  | 'provider_unavailable'
  | 'store_missing';

export interface WidgetVideoUsageMeta {
  monthlyLimit: number;
  reservedCount: number;
  consumedCount: number;
  usedCount: number;
  remainingCount: number;
  effective: boolean;
  reason: VideoUsageReason;
}

export interface WidgetSettingsMeta {
  videoUsage?: WidgetVideoUsageMeta;
}

export interface WidgetSettingsLoadState {
  status: WidgetSettingsLoadStatus;
  settings: WidgetSettingsMap;
  meta: WidgetSettingsMeta;
}

export type WidgetSettingsLoadAction =
  | { type: 'start' }
  | { type: 'success'; settings: unknown; meta?: unknown }
  | { type: 'failure' };

export const INITIAL_WIDGET_SETTINGS_LOAD_STATE: WidgetSettingsLoadState = {
  status: 'idle',
  settings: {},
  meta: {},
};

export function isWidgetSettingsMap(value: unknown): value is WidgetSettingsMap {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isFiniteCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

export function normalizeWidgetSettingsMeta(value: unknown): WidgetSettingsMeta {
  if (!isWidgetSettingsMap(value)) return {};
  const usage = value.videoUsage;
  if (!isWidgetSettingsMap(usage)) return {};
  if (
    !isFiniteCount(usage.monthlyLimit) ||
    !isFiniteCount(usage.reservedCount) ||
    !isFiniteCount(usage.consumedCount) ||
    !isFiniteCount(usage.usedCount) ||
    !isFiniteCount(usage.remainingCount) ||
    typeof usage.effective !== 'boolean' ||
    typeof usage.reason !== 'string'
  ) return {};

  const allowedReasons: VideoUsageReason[] = [
    'enabled',
    'global_disabled',
    'merchant_disabled',
    'quota_disabled',
    'quota_exceeded',
    'provider_unavailable',
    'store_missing',
  ];
  if (!allowedReasons.includes(usage.reason as VideoUsageReason)) return {};

  return {
    videoUsage: {
      monthlyLimit: usage.monthlyLimit,
      reservedCount: usage.reservedCount,
      consumedCount: usage.consumedCount,
      usedCount: usage.usedCount,
      remainingCount: usage.remainingCount,
      effective: usage.effective,
      reason: usage.reason as VideoUsageReason,
    },
  };
}

export function reduceWidgetSettingsLoadState(
  state: WidgetSettingsLoadState,
  action: WidgetSettingsLoadAction,
): WidgetSettingsLoadState {
  if (action.type === 'start') {
    return { status: 'loading', settings: state.settings, meta: state.meta };
  }

  if (action.type === 'failure') {
    return { status: 'error', settings: state.settings, meta: state.meta };
  }

  if (!isWidgetSettingsMap(action.settings)) {
    return { status: 'error', settings: state.settings, meta: state.meta };
  }

  return { status: 'loaded', settings: action.settings, meta: normalizeWidgetSettingsMeta(action.meta) };
}

export function canOpenWidgetEditor(status: WidgetSettingsLoadStatus): boolean {
  return status === 'loaded';
}
