import type { WidgetDef } from '../widgetDefs';
import { collectSettingFields } from '../widgetDefs';

export type WidgetSettingsDraft = Record<string, unknown>;

export function mergeWithDefaults(widget: WidgetDef, savedSettings: WidgetSettingsDraft): WidgetSettingsDraft {
  const defaults: WidgetSettingsDraft = {};
  for (const field of collectSettingFields(widget.settings)) {
    defaults[field.key] = field.default;
  }
  return { ...defaults, ...savedSettings };
}

export function stableStringify(value: unknown): string {
  if (value === undefined) return 'undefined';
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? String(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;

  const objectValue = value as Record<string, unknown>;
  return `{${Object.keys(objectValue)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(objectValue[key])}`)
    .join(',')}}`;
}

export function sameSettingsDraft(a: WidgetSettingsDraft, b: WidgetSettingsDraft): boolean {
  return stableStringify(a) === stableStringify(b);
}

export function shouldSyncDraftFromSaved(
  currentDraft: WidgetSettingsDraft,
  previousSavedDraft: WidgetSettingsDraft,
  widgetChanged: boolean,
): boolean {
  return widgetChanged || sameSettingsDraft(currentDraft, previousSavedDraft);
}
