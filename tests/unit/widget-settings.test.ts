import { describe, expect, it } from 'vitest';
import { getWidgetDefaults, sanitizeSettings, validateSettings } from '@/lib/widget-settings';

describe('widget settings schema traversal', () => {
  it('includes nested review form text fields in defaults and sanitization', () => {
    const defaults = getWidgetDefaults('reviews');

    expect(defaults.formStepRatingTitle).toBe('Bu ürünü nasıl değerlendirirsiniz?');
    expect(defaults.formStepPhotosTitle).toBe('Fotoğraflı değerlendirme');
    expect(defaults.formStepPhotosSubtitle).toBe('Fotoğraf ekleyebilirsiniz.');
    expect(defaults.formStepContentTitle).toBe('Deneyiminizi anlatın');
    expect(defaults.formStepAuthorTitle).toBe('Hakkınızda');

    expect(sanitizeSettings('reviews', {
      formStepRatingTitle: 'Puanınızı seçin',
      formStepPhotosSubtitle: 'İsterseniz fotoğraf ekleyin.',
      unknownNestedCopy: 'drop-me',
    })).toEqual({
      formStepRatingTitle: 'Puanınızı seçin',
      formStepPhotosSubtitle: 'İsterseniz fotoğraf ekleyin.',
    });
  });

  it('wires paginationMode + pagination colors through defaults, sanitize and validate', () => {
    const defaults = getWidgetDefaults('reviews');
    expect(defaults.paginationMode).toBe('loadMore');
    expect(defaults.paginationBgColor).toBe('#ffffff');
    expect(defaults.paginationTextColor).toBe('#111111');
    expect(defaults.paginationBorderColor).toBe('#e5e7eb');

    expect(validateSettings('reviews', { paginationMode: 'numbered' })).toBeNull();
    expect(validateSettings('reviews', { paginationMode: 'invalid' })).toBe(
      'paginationMode şu değerlerden biri olmalı: loadMore, numbered',
    );
    expect(validateSettings('reviews', { paginationBgColor: '#abcabc' })).toBeNull();
    expect(validateSettings('reviews', { paginationBgColor: 'red' })).toBe(
      'paginationBgColor geçerli bir hex renk olmalı (#rrggbb veya #rrggbbaa)',
    );

    expect(sanitizeSettings('reviews', { paginationMode: 'numbered', bogusKey: 'x' })).toEqual({
      paginationMode: 'numbered',
    });
  });

  it('validates nested review form text field limits', () => {
    expect(validateSettings('reviews', {
      formStepContentTitle: 'x'.repeat(60),
      formStepPhotosSubtitle: 'x'.repeat(90),
    })).toBeNull();

    expect(validateSettings('reviews', {
      formStepContentTitle: 'x'.repeat(61),
    })).toBe('formStepContentTitle en fazla 60 karakter olmalı');

    expect(validateSettings('reviews', {
      formStepPhotosSubtitle: 'x'.repeat(91),
    })).toBe('formStepPhotosSubtitle en fazla 90 karakter olmalı');
  });
});
