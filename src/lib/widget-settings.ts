// Widget settings yardımcıları — admin ve public endpoint'lerin paylaştığı tek kaynak.
// widgetDefs.ts schema'sından default'ları, izin verilen key listesini, sanitize
// ve validate işlemlerini türetir. İki endpoint'in ayrı kopyaları olmasın diye burada toplandı.

import { WIDGETS } from '@/components/home-page/widgets/widgetDefs';

export function getWidgetDefaults(widgetId: string): Record<string, unknown> {
  const widget = WIDGETS.find((w) => w.id === widgetId);
  if (!widget) return {};
  const defaults: Record<string, unknown> = {};
  for (const group of widget.settings) {
    for (const field of group.fields) {
      defaults[field.key] = field.default;
    }
  }
  return defaults;
}

export function getWidgetFieldKeys(widgetId: string): Set<string> | null {
  const widget = WIDGETS.find((w) => w.id === widgetId);
  if (!widget) return null;

  const keys = new Set<string>();
  for (const group of widget.settings) {
    for (const field of group.fields) {
      keys.add(field.key);
    }
  }
  return keys;
}

export function sanitizeSettings(widgetId: string, settings: Record<string, unknown>): Record<string, unknown> {
  const allowedKeys = getWidgetFieldKeys(widgetId);
  if (!allowedKeys) return settings;

  return Object.fromEntries(
    Object.entries(settings).filter(([key]) => allowedKeys.has(key))
  );
}

export function validateSettings(widgetId: string, settings: Record<string, unknown>): string | null {
  const widget = WIDGETS.find((w) => w.id === widgetId);
  if (!widget) return `Bilinmeyen widgetId: ${widgetId}`;
  for (const group of widget.settings) {
    for (const field of group.fields) {
      const value = settings[field.key];
      if (value === undefined) continue;
      if (field.type === 'toggle' && typeof value !== 'boolean') {
        return `${field.key} boolean olmalı`;
      }
      if (field.type === 'text' && typeof value !== 'string') {
        return `${field.key} string olmalı`;
      }
      // Hex color: admin edits emit opaque #rrggbb. Keep #rrggbbaa valid for
      // schema defaults and legacy saved settings that intentionally use alpha.
      if (field.type === 'color' && (typeof value !== 'string' || !/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(value))) {
        return `${field.key} geçerli bir hex renk olmalı (#rrggbb veya #rrggbbaa)`;
      }
      if (field.type === 'select') {
        // Options statik dizi veya settings'e bağlı fonksiyon olabilir — ikisini de destekle
        const opts = typeof field.options === 'function' ? field.options(settings) : field.options;
        const valid = opts.map((o) => o.value);
        if (!valid.includes(value as string)) {
          return `${field.key} şu değerlerden biri olmalı: ${valid.join(', ')}`;
        }
      }
      if (field.type === 'iconSelect' || field.type === 'dropdown') {
        const valid = field.options.map((o) => o.value);
        if (!valid.includes(value as string)) {
          return `${field.key} şu değerlerden biri olmalı: ${valid.join(', ')}`;
        }
      }
      if (field.type === 'range') {
        const num = Number(value);
        if (typeof value !== 'number' || isNaN(num) || num < field.min || num > field.max) {
          return `${field.key} ${field.min} ile ${field.max} arasında bir sayı olmalı`;
        }
      }
    }
  }
  return null;
}
