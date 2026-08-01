import { describe, expect, it } from 'vitest';
import {
  getWidgetDefaults,
  isPlainJsonObject,
  sanitizeSettings,
  validateSettings,
} from '@/lib/widget-settings';
import { resolveConfigurableWidget } from '@/lib/widgets/catalog';

const reviewsResolution = resolveConfigurableWidget('reviews');
if (!reviewsResolution.ok) throw new Error('reviews widget definition is missing');
const reviewsWidget = reviewsResolution.widget;

describe('widget settings schema traversal', () => {
  it('accepts only plain JSON object containers', () => {
    expect(isPlainJsonObject({ enabled: true })).toBe(true);
    expect(isPlainJsonObject(Object.create(null))).toBe(true);
    expect(isPlainJsonObject(null)).toBe(false);
    expect(isPlainJsonObject([])).toBe(false);
    expect(isPlainJsonObject(new Date())).toBe(false);
  });

  it('includes nested review form text fields in defaults and sanitization', () => {
    const defaults = getWidgetDefaults(reviewsWidget);

    expect(defaults.formStepRatingTitle).toBe('Bu ürünü nasıl değerlendirirsiniz?');
    expect(defaults.formStepPhotosTitle).toBe('Fotoğraflı değerlendirme');
    expect(defaults.formStepPhotosSubtitle).toBe('Fotoğraf ekleyebilirsiniz.');
    expect(defaults.formStepMediaTitle).toBe('Görsel değerlendirme');
    expect(defaults.formStepMediaSubtitle).toBe('Fotoğraf veya video ekleyebilirsiniz.');
    expect(defaults.videoReviewsEnabled).toBe(false);
    expect(defaults.formStepContentTitle).toBe('Deneyiminizi anlatın');
    expect(defaults.formStepAuthorTitle).toBe('Hakkınızda');
    expect(defaults.recommendationLabel).toBe('bu ürünü tavsiye ediyor');

    expect(sanitizeSettings(reviewsWidget, {
      formStepRatingTitle: 'Puanınızı seçin',
      formStepPhotosSubtitle: 'İsterseniz fotoğraf ekleyin.',
      formStepMediaSubtitle: 'Fotoğraf ya da kısa video ekleyin.',
      recommendationLabel: 'müşteriler öneriyor',
      unknownNestedCopy: 'drop-me',
    })).toEqual({
      formStepRatingTitle: 'Puanınızı seçin',
      formStepPhotosSubtitle: 'İsterseniz fotoğraf ekleyin.',
      formStepMediaSubtitle: 'Fotoğraf ya da kısa video ekleyin.',
      recommendationLabel: 'müşteriler öneriyor',
    });
  });

  it('wires paginationMode + pagination colors through defaults, sanitize and validate', () => {
    const defaults = getWidgetDefaults(reviewsWidget);
    expect(defaults.paginationMode).toBe('loadMore');
    expect(defaults.paginationBgColor).toBe('#ffffff');
    expect(defaults.paginationTextColor).toBe('#111111');
    expect(defaults.paginationActiveBgColor).toBe('#111111');
    expect(defaults.paginationActiveTextColor).toBe('#ffffff');
    expect(defaults.paginationBorderColor).toBe('#e5e7eb');

    expect(validateSettings(reviewsWidget, { paginationMode: 'numbered' })).toBeNull();
    expect(validateSettings(reviewsWidget, { paginationMode: 'invalid' })).toBe(
      'paginationMode şu değerlerden biri olmalı: loadMore, numbered',
    );
    expect(validateSettings(reviewsWidget, { paginationBgColor: '#abcabc' })).toBeNull();
    expect(validateSettings(reviewsWidget, { paginationBgColor: 'red' })).toBe(
      'paginationBgColor geçerli bir hex renk olmalı (#rrggbb veya #rrggbbaa)',
    );

    expect(sanitizeSettings(reviewsWidget, { paginationMode: 'numbered', bogusKey: 'x' })).toEqual({
      paginationMode: 'numbered',
    });
  });

  it('wires review lightbox video player colors through defaults, sanitize and validate', () => {
    const defaults = getWidgetDefaults(reviewsWidget);
    expect(defaults.reviewLightboxVideoIconColor).toBe('#ffffff');
    expect(defaults.reviewLightboxVideoButtonBgColor).toBeUndefined();
    expect(defaults.reviewLightboxVideoButtonHoverBgColor).toBeUndefined();
    expect(defaults.reviewLightboxVideoProgressColor).toBe('#ffffff');
    expect(defaults.reviewLightboxVideoProgressTrackColor).toBe('#000000');

    expect(validateSettings(reviewsWidget, {
      reviewLightboxVideoIconColor: '#f97316',
      reviewLightboxVideoProgressColor: '#22c55e',
      reviewLightboxVideoProgressTrackColor: '#030712',
    })).toBeNull();
    expect(validateSettings(reviewsWidget, { reviewLightboxVideoProgressColor: 'white' })).toBe(
      'reviewLightboxVideoProgressColor geçerli bir hex renk olmalı (#rrggbb veya #rrggbbaa)',
    );

    expect(sanitizeSettings(reviewsWidget, {
      reviewLightboxVideoIconColor: '#f97316',
      reviewLightboxVideoButtonBgColor: '#111111',
      reviewLightboxVideoButtonHoverBgColor: '#222222',
      reviewLightboxVideoProgressColor: '#22c55e',
      storyVideoProgressColor: '#ff0000',
    })).toEqual({
      reviewLightboxVideoIconColor: '#f97316',
      reviewLightboxVideoProgressColor: '#22c55e',
    });
  });

  it('normalizes legacy photo gallery keys into the media gallery contract', () => {
    const defaults = getWidgetDefaults(reviewsWidget);
    expect(defaults.showMediaGallery).toBe(true);
    expect(defaults.showMediaGalleryTitle).toBe(true);
    expect(defaults.mediaGalleryTitle).toBe('Müşteri Görselleri');
    expect(defaults.mediaGalleryTitleColor).toBe('#111111');
    expect(defaults.mediaGalleryArrowBgColor).toBe('#ffffff');
    expect(defaults.mediaGalleryArrowTextColor).toBe('#111111');
    expect(defaults.showPhotoGallery).toBeUndefined();
    expect(defaults.photoGalleryTitle).toBeUndefined();

    expect(sanitizeSettings(reviewsWidget, {
      showPhotoGallery: false,
      showPhotoGalleryTitle: false,
      photoGalleryTitle: 'Eski Başlık',
      photoTitleColor: '#222222',
      photoArrowBgColor: '#eeeeee',
      photoArrowTextColor: '#333333',
    })).toEqual({
      showMediaGallery: false,
      showMediaGalleryTitle: false,
      mediaGalleryTitle: 'Eski Başlık',
      mediaGalleryTitleColor: '#222222',
      mediaGalleryArrowBgColor: '#eeeeee',
      mediaGalleryArrowTextColor: '#333333',
    });

    expect(sanitizeSettings(reviewsWidget, {
      showPhotoGallery: false,
      showMediaGallery: true,
      photoGalleryTitle: 'Eski Başlık',
      mediaGalleryTitle: 'Yeni Başlık',
    })).toEqual({
      showMediaGallery: true,
      mediaGalleryTitle: 'Yeni Başlık',
    });
  });

  it('validates nested review form text field limits', () => {
    expect(validateSettings(reviewsWidget, {
      formStepContentTitle: 'x'.repeat(60),
      formStepPhotosSubtitle: 'x'.repeat(90),
      formStepMediaSubtitle: 'x'.repeat(90),
    })).toBeNull();

    expect(validateSettings(reviewsWidget, {
      formStepContentTitle: 'x'.repeat(61),
    })).toBe('formStepContentTitle en fazla 60 karakter olmalı');

    expect(validateSettings(reviewsWidget, {
      formStepPhotosSubtitle: 'x'.repeat(91),
    })).toBe('formStepPhotosSubtitle en fazla 90 karakter olmalı');

    expect(validateSettings(reviewsWidget, {
      formStepMediaSubtitle: 'x'.repeat(91),
    })).toBe('formStepMediaSubtitle en fazla 90 karakter olmalı');
  });

  it('validates recommendation label as a bounded merchant text field', () => {
    expect(validateSettings(reviewsWidget, {
      recommendationLabel: 'x'.repeat(40),
    })).toBeNull();

    expect(validateSettings(reviewsWidget, {
      recommendationLabel: 'x'.repeat(41),
    })).toBe('recommendationLabel en fazla 40 karakter olmalı');
  });
});
