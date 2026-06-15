// summary-layouts/shared/write-action.js
// Shared "Yorum Yap" action. The storefront review form is modal-only.

import { currentProductId, currentProductName, currentSettings } from '../../core/state.js';
import { openReviewFormModal } from '../../reviews-section/review-form-modal/index.js';
import { fetchReviewVideoCapability } from '../../reviews-section/review-form-modal/media/video-capability.js';
import { wasLastInputKeyboard } from '../../shared/input-modality.js';

var openPromise = null;

function setButtonBusy(button) {
  if (!button) return function () {};
  var wasDisabled = button.disabled;
  var previousBusy = button.getAttribute('aria-busy');
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  return function () {
    button.disabled = wasDisabled;
    if (previousBusy === null) button.removeAttribute('aria-busy');
    else button.setAttribute('aria-busy', previousBusy);
  };
}

async function resolveCapabilityAndOpen(triggerButton, openedByKeyboard) {
  var capability;
  if (typeof window !== 'undefined' && window.__ikasPreviewMode) {
    capability = {
      enabled: currentSettings && currentSettings.videoReviewsEnabled === true,
      reason: null,
    };
  } else {
    try {
      capability = await fetchReviewVideoCapability();
    } catch (_) {
      capability = { enabled: false, reason: 'capability_unavailable' };
    }
  }

  openReviewFormModal({
    productId: currentProductId || '',
    productName: currentProductName || '',
    videoEnabled: capability.enabled,
    videoUnavailableReason: capability.reason,
    returnFocusElement: triggerButton,
    openedByKeyboard: openedByKeyboard,
  });
}

export function openWriteForm(event) {
  var button = event && event.currentTarget && event.currentTarget.tagName === 'BUTTON'
    ? event.currentTarget
    : null;
  var restoreButton = setButtonBusy(button);

  if (!openPromise) {
    openPromise = resolveCapabilityAndOpen(button, wasLastInputKeyboard()).finally(function () {
      openPromise = null;
    });
  }

  return openPromise.finally(restoreButton);
}
