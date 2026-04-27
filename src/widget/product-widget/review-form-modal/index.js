// product-widget/review-form-modal/index.js
// Yorum yazma wizard modal'ı — public API + step orchestrator.
// Step sırası: rating → content+author → photos.
// Faz 2: sadece Step 1 (rating) çalışır, Step 2/3 placeholder.
//
// Bağımsızlık sözleşmesi: review-modal ve review-form ile hiçbir
// import / class / variable çakışması yok.

import { createWizardShell } from './modal-shell.js';
import { FWIZARD_CSS } from './styles.js';
import { createWizardState, TOTAL_STEPS } from './wizard-state.js';
import { createProgressBar } from './progress-bar.js';
import { createStepRating } from './steps/step-rating.js';
import { createStepPhotos } from './steps/step-photos.js';

// ─── CSS bir kez inject ─────
var stylesInjected = false;
function ensureStyles() {
  if (stylesInjected) return;
  var styleEl = document.createElement('style');
  styleEl.setAttribute('data-ikr-fwizard', '');
  styleEl.textContent = FWIZARD_CSS;
  document.head.appendChild(styleEl);
  stylesInjected = true;
}

// Step factory — currentStep'e göre uygun step'i döndürür
function renderStep(stepNum, state) {
  if (stepNum === 1) return createStepRating(state);
  if (stepNum === 2) return createStepPhotos(state);
  // Step 3 — sonraki fazda yazılacak. Şimdilik placeholder.
  var ph = document.createElement('div');
  ph.className = 'ikr-fwizard-step ikr-fwizard-step-placeholder';
  ph.innerHTML =
    '<div class="ikr-fwizard-step-title">Adım ' + stepNum + '</div>' +
    '<div style="margin-top:16px;color:rgba(0,0,0,0.55);font-size:14px;">Bu adım yakında eklenecek.</div>';
  return { el: ph, destroy: function () {} };
}

/**
 * Yorum yazma wizard modal'ını aç.
 */
export function openReviewFormModal(opts) {
  opts = opts || {};
  ensureStyles();

  var state = createWizardState({
    productId: opts.productId,
    productName: opts.productName,
  });

  var shell = createWizardShell({
    onClose: opts.onClose,
    allowOutsideClose: true,
  });

  // ─── Modal layout: stepWrap (içerik) + progressBar (alt) ───
  var stepWrap = document.createElement('div');
  stepWrap.className = 'ikr-fwizard-step-wrap';

  var progress = createProgressBar({
    skippableSteps: [2],
    onBack: function () { state.goBack(); },
    onSkip: function () { state.goNext(); },
  });

  // Wizard layout container — content + footer dikey
  var layout = document.createElement('div');
  layout.className = 'ikr-fwizard-layout';
  layout.appendChild(stepWrap);
  layout.appendChild(progress.el);

  var currentStepInstance = null;

  function rerenderStep() {
    if (currentStepInstance && currentStepInstance.destroy) {
      currentStepInstance.destroy();
    }
    stepWrap.innerHTML = '';
    currentStepInstance = renderStep(state.get().currentStep, state);
    stepWrap.appendChild(currentStepInstance.el);
    progress.update(state.get().currentStep);
  }

  // İlk render
  rerenderStep();

  // State değişimlerinde yeniden çiz (sadece step değişince)
  var lastStep = state.get().currentStep;
  state.onChange(function (s) {
    if (s.currentStep !== lastStep) {
      lastStep = s.currentStep;
      rerenderStep();
    }
  });

  shell.open(layout);

  return {
    close: shell.close,
  };
}
