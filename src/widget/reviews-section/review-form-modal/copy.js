// review-form-modal/copy.js
// Merchant-editable review form copy. Values come from current widget settings
// and fall back to the existing Turkish copy when empty or whitespace-only.

import { currentSettings } from '../../core/state.js';
import { settingText } from '../../core/helpers.js';

var REVIEW_FORM_COPY_DEFAULTS = {
  formStepRatingTitle: 'Bu ürünü nasıl değerlendirirsiniz?',
  formStepPhotosTitle: 'Fotoğraflı değerlendirme',
  formStepPhotosSubtitle: 'Fotoğraf ekleyebilirsiniz.',
  formStepMediaTitle: 'Fotoğraf veya video ekleyin',
  formStepMediaSubtitle: 'En fazla 3 fotoğraf veya 60 saniyelik 1 video ekleyebilirsiniz.',
  formStepContentTitle: 'Deneyiminizi anlatın',
  formStepAuthorTitle: 'Hakkınızda',
};

export function reviewFormCopy(key) {
  var value = currentSettings && currentSettings[key];
  if (!value && key === 'formStepMediaTitle') value = currentSettings && currentSettings.formStepPhotosTitle;
  if (!value && key === 'formStepMediaSubtitle') value = currentSettings && currentSettings.formStepPhotosSubtitle;
  return settingText(value, REVIEW_FORM_COPY_DEFAULTS[key]);
}
