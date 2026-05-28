// summary-layouts/shared/write-action.js
// Shared "Yorum Yap" action. The storefront review form is modal-only.

import { currentProductId, currentProductName } from '../../core/state.js';
import { openReviewFormModal } from '../../reviews-section/review-form-modal/index.js';

export function openWriteForm() {
  openReviewFormModal({
    productId: currentProductId || '',
    productName: currentProductName || '',
  });
}
