// summary-layouts/shared/write-action.js
// Shared "Yorum Yap" action. The storefront review form is modal-only.

import { currentProductId, currentProductName, currentSettings } from '../../core/state.js';
import { openReviewFormModal } from '../../reviews-section/review-form-modal/index.js';
import { fetchReviewVideoCapability } from '../../reviews-section/review-form-modal/media/video-capability.js';
import { wasLastInputKeyboard } from '../../shared/input-modality.js';

var activeModal = null;

function videoEnabledFromSettings() {
  return currentSettings && currentSettings.videoReviewsEnabled === true;
}

function fallbackCapabilityAfterRequestError(error) {
  var status = error && Number(error.status);
  var hasHttpStatus = Number.isFinite(status) && status >= 100;
  if (videoEnabledFromSettings() && !hasHttpStatus) {
    return { enabled: true, reason: 'capability_unavailable' };
  }
  return { enabled: false, reason: 'capability_unavailable' };
}

function openModal(triggerButton, openedByKeyboard, settingsVideoEnabled, initialCapabilityStatus) {
  var modal = openReviewFormModal({
    productId: currentProductId || '',
    productName: currentProductName || '',
    videoEnabled: settingsVideoEnabled,
    videoCapabilityStatus: initialCapabilityStatus,
    videoUnavailableReason: null,
    returnFocusElement: triggerButton,
    openedByKeyboard: openedByKeyboard,
    onClose: function () {
      if (activeModal === modal) activeModal = null;
    },
  });
  activeModal = modal;
  return modal;
}

function resolveCapabilityForModal(modal) {
  fetchReviewVideoCapability()
    .then(function (capability) {
      if (activeModal === modal && modal && modal.setVideoCapability) {
        modal.setVideoCapability(capability);
      }
    })
    .catch(function (error) {
      if (activeModal === modal && modal && modal.setVideoCapability) {
        modal.setVideoCapability(fallbackCapabilityAfterRequestError(error));
      }
    });
}

export function openWriteForm(event) {
  if (activeModal) return activeModal;

  var button = event && event.currentTarget && event.currentTarget.tagName === 'BUTTON'
    ? event.currentTarget
    : null;
  var settingsVideoEnabled = videoEnabledFromSettings();
  var isPreview = typeof window !== 'undefined' && window.__ikasPreviewMode;
  var initialCapabilityStatus = settingsVideoEnabled
    ? (isPreview ? 'enabled' : 'pending')
    : 'unavailable';

  var modal = openModal(button, wasLastInputKeyboard(), settingsVideoEnabled, initialCapabilityStatus);

  if (settingsVideoEnabled && !isPreview) resolveCapabilityForModal(modal);
  return modal;
}
