import type { WidgetSettingsMap } from '../../types';
import {
  WIDGETS,
  collectSettingFields,
  isConfigurableWidgetDefinition,
  type ConfigurableWidgetDefinition,
} from '@/lib/widgets/catalog';
import { getWidgetPreviewScenes } from '@/widget/preview/scenes.js';

export type WidgetSettingsDraft = Record<string, unknown>;

export function mergeWithDefaults(widget: ConfigurableWidgetDefinition, savedSettings: WidgetSettingsDraft): WidgetSettingsDraft {
  const defaults: WidgetSettingsDraft = {};
  for (const field of collectSettingFields(widget.configuration.groups)) {
    defaults[field.key] = field.default;
  }
  return { ...defaults, ...savedSettings };
}

export function buildWidgetPreviewSettings(
  allSettings: WidgetSettingsMap,
  editingWidget: ConfigurableWidgetDefinition,
  draft: WidgetSettingsDraft,
): Record<string, WidgetSettingsDraft> {
  const previewSettings: Record<string, WidgetSettingsDraft> = {};

  for (const widget of WIDGETS) {
    if (!isConfigurableWidgetDefinition(widget)) continue;
    if (getWidgetPreviewScenes(widget.id).length === 0) continue;
    const saved = (allSettings[widget.id] ?? {}) as WidgetSettingsDraft;
    previewSettings[widget.id] = mergeWithDefaults(widget, saved);
  }

  previewSettings[editingWidget.id] = {
    ...(previewSettings[editingWidget.id] ?? {}),
    ...draft,
  };
  return previewSettings;
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
