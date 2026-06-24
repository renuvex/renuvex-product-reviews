import { describe, expect, it } from 'vitest';
import { getWidgetDefaults, sanitizeSettings, validateSettings } from '@/lib/widget-settings';

describe('widget settings schema traversal', () => {
  it('includes nested review form text fields in defaults and sanitization', () => {
    const defaults = getWidgetDefaults('reviews');

    expect(defaults.formStepRatingTitle).toBe('Bu ürünü nasıl değerlendirirsiniz?');
    expect(defaults.formStepPhotosTitle).toBe('Fotoğraflı değerlendirme');
    expect(defaults.formStepPhotosSubtitle).toBe('Fotoğraf ekleyebilirsiniz.');
    expect(defaults.formStepMediaTitle).toBe('Görsel değerlendirme');
    expect(defaults.formStepMediaSubtitle).toBe('Fotoğraf veya video ekleyebilirsiniz.');
    expect(defaults.videoReviewsEnabled).toBe(false);
    expect(defaults.formStepContentTitle).toBe('Deneyiminizi anlatın');
    expect(defaults.formStepAuthorTitle).toBe('Hakkınızda');

    expect(sanitizeSettings('reviews', {
      formStepRatingTitle: 'Puanınızı seçin',
      formStepPhotosSubtitle: 'İsterseniz fotoğraf ekleyin.',
      formStepMediaSubtitle: 'Fotoğraf ya da kısa video ekleyin.',
      unknownNestedCopy: 'drop-me',
    })).toEqual({
      formStepRatingTitle: 'Puanınızı seçin',
      formStepPhotosSubtitle: 'İsterseniz fotoğraf ekleyin.',
      formStepMediaSubtitle: 'Fotoğraf ya da kısa video ekleyin.',
    });
  });

  it('wires paginationMode + pagination colors through defaults, sanitize and validate', () => {
    const defaults = getWidgetDefaults('reviews');
    expect(defaults.paginationMode).toBe('loadMore');
    expect(defaults.paginationBgColor).toBe('#ffffff');
    expect(defaults.paginationTextColor).toBe('#111111');
    expect(defaults.paginationActiveBgColor).toBe('#111111');
    expect(defaults.paginationActiveTextColor).toBe('#ffffff');
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

  it('wires review lightbox video player colors through defaults, sanitize and validate', () => {
    const defaults = getWidgetDefaults('reviews');
    expect(defaults.reviewLightboxVideoIconColor).toBe('#ffffff');
    expect(defaults.reviewLightboxVideoButtonBgColor).toBe('#000000');
    expect(defaults.reviewLightboxVideoButtonHoverBgColor).toBe('#222222');
    expect(defaults.reviewLightboxVideoProgressColor).toBe('#ffffff');
    expect(defaults.reviewLightboxVideoProgressTrackColor).toBe('#000000');

    expect(validateSettings('reviews', {
      reviewLightboxVideoIconColor: '#f97316',
      reviewLightboxVideoButtonBgColor: '#111111',
      reviewLightboxVideoButtonHoverBgColor: '#222222',
      reviewLightboxVideoProgressColor: '#22c55e',
      reviewLightboxVideoProgressTrackColor: '#030712',
    })).toBeNull();
    expect(validateSettings('reviews', { reviewLightboxVideoProgressColor: 'white' })).toBe(
      'reviewLightboxVideoProgressColor geçerli bir hex renk olmalı (#rrggbb veya #rrggbbaa)',
    );

    expect(sanitizeSettings('reviews', {
      reviewLightboxVideoIconColor: '#f97316',
      reviewLightboxVideoProgressColor: '#22c55e',
      storyVideoProgressColor: '#ff0000',
    })).toEqual({
      reviewLightboxVideoIconColor: '#f97316',
      reviewLightboxVideoProgressColor: '#22c55e',
    });
  });

  it('validates nested review form text field limits', () => {
    expect(validateSettings('reviews', {
      formStepContentTitle: 'x'.repeat(60),
      formStepPhotosSubtitle: 'x'.repeat(90),
      formStepMediaSubtitle: 'x'.repeat(90),
    })).toBeNull();

    expect(validateSettings('reviews', {
      formStepContentTitle: 'x'.repeat(61),
    })).toBe('formStepContentTitle en fazla 60 karakter olmalı');

    expect(validateSettings('reviews', {
      formStepPhotosSubtitle: 'x'.repeat(91),
    })).toBe('formStepPhotosSubtitle en fazla 90 karakter olmalı');

    expect(validateSettings('reviews', {
      formStepMediaSubtitle: 'x'.repeat(91),
    })).toBe('formStepMediaSubtitle en fazla 90 karakter olmalı');
  });
});
