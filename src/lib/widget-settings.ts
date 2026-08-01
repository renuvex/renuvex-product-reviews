// Widget settings yardımcıları — admin ve public endpoint'lerin paylaştığı tek kaynak.
// Saf widget kataloğundan default'ları, izin verilen key listesini, sanitize
// ve validate işlemlerini türetir. İki endpoint'in ayrı kopyaları olmasın diye burada toplandı.

import { collectSettingFields, type ConfigurableWidgetDefinition } from '@/lib/widgets/catalog';

const REVIEW_SETTING_ALIASES: Record<string, string> = {
  showPhotoGallery: 'showMediaGallery',
  showPhotoGalleryTitle: 'showMediaGalleryTitle',
  photoGalleryTitle: 'mediaGalleryTitle',
  photoTitleColor: 'mediaGalleryTitleColor',
  photoArrowBgColor: 'mediaGalleryArrowBgColor',
  photoArrowTextColor: 'mediaGalleryArrowTextColor',
};

export function isPlainJsonObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function normalizeWidgetSettingsKeys(
  widget: ConfigurableWidgetDefinition,
  settings: Record<string, unknown>,
): Record<string, unknown> {
  if (widget.id !== 'reviews') return { ...settings };

  const normalized = { ...settings };
  for (const [legacyKey, canonicalKey] of Object.entries(REVIEW_SETTING_ALIASES)) {
    if (
      Object.prototype.hasOwnProperty.call(normalized, legacyKey) &&
      !Object.prototype.hasOwnProperty.call(normalized, canonicalKey)
    ) {
      normalized[canonicalKey] = normalized[legacyKey];
    }
    delete normalized[legacyKey];
  }
  return normalized;
}

export function getWidgetDefaults(widget: ConfigurableWidgetDefinition): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};
  for (const field of collectSettingFields(widget.configuration.groups)) {
    defaults[field.key] = field.default;
  }
  return defaults;
}

export function getWidgetFieldKeys(widget: ConfigurableWidgetDefinition): Set<string> {
  const keys = new Set<string>();
  for (const field of collectSettingFields(widget.configuration.groups)) {
    keys.add(field.key);
  }
  return keys;
}

export function sanitizeSettings(widget: ConfigurableWidgetDefinition, settings: Record<string, unknown>): Record<string, unknown> {
  const allowedKeys = getWidgetFieldKeys(widget);
  const normalizedSettings = normalizeWidgetSettingsKeys(widget, settings);

  const sanitized = Object.fromEntries(
    Object.entries(normalizedSettings).filter(([key]) => allowedKeys.has(key))
  );

  for (const field of collectSettingFields(widget.configuration.groups)) {
    if (field.type === 'iconSelect' && field.registry === 'filter' && sanitized[field.key] === 'star') {
      sanitized[field.key] = 'funnel';
    }
  }

  return sanitized;
}

export function validateSettings(widget: ConfigurableWidgetDefinition, settings: Record<string, unknown>): string | null {
  const normalizedSettings = normalizeWidgetSettingsKeys(widget, settings);
  for (const field of collectSettingFields(widget.configuration.groups)) {
    const value = normalizedSettings[field.key];
    if (value === undefined) continue;
    if (field.type === 'toggle' && typeof value !== 'boolean') {
      return `${field.key} boolean olmalı`;
    }
    if (field.type === 'text') {
      if (typeof value !== 'string') {
        return `${field.key} string olmalı`;
      }
      if (field.maxLength && value.length > field.maxLength) {
        return `${field.key} en fazla ${field.maxLength} karakter olmalı`;
      }
    }
    // Hex color: admin edits emit opaque #rrggbb. Keep #rrggbbaa valid for
    // schema defaults and legacy saved settings that intentionally use alpha.
    if (field.type === 'color' && (typeof value !== 'string' || !/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(value))) {
      return `${field.key} geçerli bir hex renk olmalı (#rrggbb veya #rrggbbaa)`;
    }
    if (field.type === 'select') {
      // Options statik dizi veya settings'e bağlı fonksiyon olabilir — ikisini de destekle
      const opts = typeof field.options === 'function' ? field.options(normalizedSettings) : field.options;
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
  return null;
}
