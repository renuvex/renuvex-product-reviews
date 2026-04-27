// product-widget/review-form-modal/index.js
// Yorum yazma wizard modal'ı — public API + step orchestrator.
// Step sırası: rating → photos → content (title+comment) → author.
// Step 4 submit işini step-author yapar; başarı sonrası teşekkür ekranı.
//
// Bağımsızlık sözleşmesi: review-modal ve review-form ile hiçbir
// import / class / variable çakışması yok.

import { createWizardShell } from './modal-shell.js';
import { FWIZARD_CSS } from './styles.js';
import { createWizardState, TOTAL_STEPS } from './wizard-state.js';
import { createProgressBar } from './progress-bar.js';
import { createStepRating } from './steps/step-rating.js';
import { createStepPhotos } from './steps/step-photos.js';
import { createStepContent } from './steps/step-content.js';
import { createStepAuthor } from './steps/step-author.js';

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

// Step factory — currentStep'e göre uygun step'i döndürür.
// stepOpts: step-specific callback'ler (validity, success).
function renderStep(stepNum, state, stepOpts) {
  stepOpts = stepOpts || {};
  if (stepNum === 1) return createStepRating(state);
  if (stepNum === 2) return createStepPhotos(state);
  if (stepNum === 3) return createStepContent(state, {
    onValidityChange: stepOpts.onValidityChange,
  });
  if (stepNum === 4) return createStepAuthor(state, {
    onValidityChange: stepOpts.onValidityChange,
    onSuccess: stepOpts.onSuccess,
  });
  // Beklenmedik step — boş placeholder
  var ph = document.createElement('div');
  ph.className = 'ikr-fwizard-step ikr-fwizard-step-placeholder';
  return { el: ph, destroy: function () {} };
}

function buildThanksScreen() {
  var wrap = document.createElement('div');
  wrap.className = 'ikr-fwizard-thanks';
  wrap.innerHTML =
    '<div class="ikr-fwizard-thanks-icon" aria-hidden="true">' +
    '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
    '</div>' +
    '<div class="ikr-fwizard-thanks-title">Yorumunuz için teşekkürler!</div>' +
    '<div class="ikr-fwizard-thanks-text">Değerlendirmeniz alındı.</div>';
  return wrap;
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
    nextableSteps: [3],
    onBack: function () { state.goBack(); },
    onSkip: function () { state.goNext(); },
    onNext: function () { state.goNext(); },
  });

  // Wizard layout container — content + footer dikey
  var layout = document.createElement('div');
  layout.className = 'ikr-fwizard-layout';
  layout.appendChild(stepWrap);
  layout.appendChild(progress.el);

  var currentStepInstance = null;

  function showThanks() {
    if (currentStepInstance && currentStepInstance.destroy) {
      currentStepInstance.destroy();
    }
    stepWrap.innerHTML = '';
    stepWrap.appendChild(buildThanksScreen());
    // Footer'ı gizle — gönderim sonrası gezinti yok
    progress.el.style.display = 'none';
  }

  function rerenderStep() {
    if (currentStepInstance && currentStepInstance.destroy) {
      currentStepInstance.destroy();
    }
    stepWrap.innerHTML = '';
    var stepNum = state.get().currentStep;
    currentStepInstance = renderStep(stepNum, state, {
      onValidityChange: function (valid) {
        progress.setNextDisabled(!valid);
      },
      onSuccess: showThanks,
    });
    stepWrap.appendChild(currentStepInstance.el);
    progress.update(stepNum);
    // "Sonraki" butonunun başlangıç state'i: validity bildirilene kadar disabled
    if (stepNum === 3) progress.setNextDisabled(true);
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
