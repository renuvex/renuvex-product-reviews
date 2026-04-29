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

  // ─── Step geçiş state machine ──────────────────────────────────────
  // 'idle'    → animasyon yok, geçişe hazır
  // 'exiting' → mevcut step exit animasyonu oynuyor
  // 'entering'→ yeni step enter animasyonu oynuyor
  // pendingStep: animasyon sırasında talep edilen yeni step (kuyruk)
  // suppressNextEnterAnim: ilk render için (modal açılış scale animasyonu
  // zaten kabuk düzeyinde var, içeriğin de animate olmasına gerek yok)
  var animPhase = 'idle';
  var pendingStep = null;
  var suppressNextEnterAnim = true;

  // Step instance'ını mount et — ilk render veya geçiş enter'ı
  function mountStep(stepNum, withEnterAnim) {
    var inst = renderStep(stepNum, state, {
      onValidityChange: function (valid) {
        progress.setNextDisabled(!valid);
      },
      onSuccess: showThanks,
    });
    currentStepInstance = inst;

    if (withEnterAnim) {
      animPhase = 'entering';
      inst.el.classList.add('ikr-fwizard-step--enter');
      var onEnd = function () {
        inst.el.removeEventListener('animationend', onEnd);
        // Enter sınıfını çıkar ki bir sonraki sefer yeniden tetiklenebilsin
        inst.el.classList.remove('ikr-fwizard-step--enter');
        animPhase = 'idle';
        // Kuyrukta bekleyen yeni hedef varsa şimdi işle
        if (pendingStep !== null && pendingStep !== state.get().currentStep) {
          pendingStep = null;
          rerenderStep();
        } else {
          pendingStep = null;
        }
      };
      inst.el.addEventListener('animationend', onEnd);
    } else {
      animPhase = 'idle';
    }

    stepWrap.appendChild(inst.el);
    progress.update(stepNum);
    // Modal kabuğuna step attribute'u — CSS step-bazlı kurallar için
    // (mobile'da step 1: X görünür, progress gizli; step 2-4: tersi).
    if (shell.setStepAttr) shell.setStepAttr(stepNum);
    // "Sonraki" butonunun başlangıç state'i: validity bildirilene kadar disabled
    if (stepNum === 3) progress.setNextDisabled(true);
  }

  function showThanks() {
    if (currentStepInstance && currentStepInstance.destroy) {
      currentStepInstance.destroy();
    }
    currentStepInstance = null;
    animPhase = 'idle';
    pendingStep = null;
    stepWrap.innerHTML = '';
    stepWrap.appendChild(buildThanksScreen());
    // Footer'ı gizle — gönderim sonrası gezinti yok
    progress.el.style.display = 'none';
  }

  function rerenderStep() {
    var targetStep = state.get().currentStep;

    // Animasyon devam ediyorsa hedefi kuyruğa al
    if (animPhase !== 'idle') {
      pendingStep = targetStep;
      return;
    }

    // İlk render — exit yok, ilk açılışta enter da yok (modal kabuk
    // animasyonu yeterli). Sonraki geçişlerde enter aktif.
    if (!currentStepInstance) {
      var firstWithAnim = !suppressNextEnterAnim;
      suppressNextEnterAnim = false;
      mountStep(targetStep, firstWithAnim);
      return;
    }

    // Normal geçiş: exit → unmount → mount with enter
    var leaving = currentStepInstance;
    animPhase = 'exiting';
    leaving.el.classList.add('ikr-fwizard-step--exit');
    var onExitEnd = function () {
      leaving.el.removeEventListener('animationend', onExitEnd);
      if (leaving.destroy) {
        try { leaving.destroy(); } catch (e) { /* sessiz */ }
      }
      // Eğer bu sırada modal kapatıldıysa veya teşekkür ekranına geçildiyse
      // currentStepInstance null olur — o zaman yeni mount yapma.
      if (currentStepInstance !== leaving) return;
      stepWrap.innerHTML = '';
      currentStepInstance = null;
      // En güncel hedefi kullan (kuyrukta beklemiş olabilir)
      var next = pendingStep !== null ? pendingStep : state.get().currentStep;
      pendingStep = null;
      mountStep(next, true);
    };
    leaving.el.addEventListener('animationend', onExitEnd);
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
