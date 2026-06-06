// review-form-modal/copy.js
// Merchant-editable review form copy. Values come from current widget settings
// and fall back to the existing Turkish copy when empty or whitespace-only.

import { currentSettings } from '../../core/state.js';
import { settingText } from '../../core/helpers.js';

var REVIEW_FORM_COPY_DEFAULTS = {
  formStepRatingTitle: 'Bu ürünü nasıl değerlendirirsiniz?',
  formStepPhotosTitle: 'Fotoğraflı değerlendirme',
  formStepPhotosSubtitle: 'Fotoğraf ekleyebilirsiniz.',
  formStepContentTitle: 'Deneyiminizi anlatın',
  formStepAuthorTitle: 'Hakkınızda',
};

export function reviewFormCopy(key) {
  return settingText(currentSettings && currentSettings[key], REVIEW_FORM_COPY_DEFAULTS[key]);
}
