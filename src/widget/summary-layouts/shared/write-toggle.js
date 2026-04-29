// summary-layouts/shared/write-toggle.js
// "Yorum Yap" butonunun ortak click handler'ı.
// Admin'deki settings.reviewFormStyle'a göre iki davranış:
//   'accordion' (default) → mevcut form accordion'unu açar/kapatır
//   'modal'               → openReviewFormModal() ile wizard modal açar

import { currentSettings, currentProductId, currentProductName } from '../../core/state.js';
import { openReviewFormModal } from '../../product-widget/review-form-modal/index.js';

function openAccordion() {
  var accordion = document.getElementById('ikr-form-accordion');
  if (!accordion) return;
  var isOpen = accordion.style.maxHeight && accordion.style.maxHeight !== '0px';
  if (isOpen) {
    accordion.style.maxHeight = '0px';
    accordion.style.opacity = '0';
  } else {
    accordion.style.maxHeight = accordion.scrollHeight + 'px';
    accordion.style.opacity = '1';
    setTimeout(function() { accordion.style.maxHeight = 'none'; }, 360);
    setTimeout(function() {
      var stickyHeader = document.querySelector('header');
      var headerH = stickyHeader ? stickyHeader.getBoundingClientRect().height : 0;
      var top = accordion.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }, 50);
  }
}

export function toggleWriteAccordion() {
  var style = (currentSettings && currentSettings.reviewFormStyle) || 'modal';
  if (style === 'modal') {
    openReviewFormModal({
      productId: currentProductId || '',
      productName: currentProductName || '',
    });
    return;
  }
  openAccordion();
}
