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

// stepOpts: step-specific callback'ler (validity, success).
function renderStep(stepNum, state, stepOpts) {
  stepOpts = stepOpts || {};
  if (stepNum === 1) return createStepRating(state, {
    canNavigate: stepOpts.canNavigate,
  });
  if (stepNum === 2) return createStepPhotos(state, {
    canNavigate: stepOpts.canNavigate,
    blobMap: stepOpts.blobMap,
  });
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
  wrap.className = 'ikr-fwizard-step ikr-fwizard-step-thanks';
  wrap.innerHTML =
    '<div class="ikr-fwizard-step-title ikr-fwizard-thanks-title">Teşekkürler</div>' +
    '<div class="ikr-fwizard-step-subtitle ikr-fwizard-thanks-subtitle">Değerlendirmeniz alındı.</div>';
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

  var persistentBlobMap = {};

  var shell = createWizardShell({
    onClose: function () {
      window.removeEventListener('popstate', onPopState);
      // Eğer X butonuyla veya ESC ile kapandıysa (back button değilse), 
      // eklediğimiz history state'i temizle.
      if (window.history.state && window.history.state.ikrReviewModal) {
        window.history.back();
      }

      // Bellek temizliği: Tüm blob URL'lerini serbest bırak
      Object.keys(persistentBlobMap).forEach(function (k) {
        var b = persistentBlobMap[k];
        if (b && b.startsWith('blob:')) URL.revokeObjectURL(b);
      });
      if (opts.onClose) opts.onClose();
    },
    allowOutsideClose: false,
  });

  // ─── History Management (Mobil Geri Tuşu Desteği) ───
  var modalHistoryState = { ikrReviewModal: true };
  window.history.pushState(modalHistoryState, null, '');

  var onPopState = function (e) {
    // Tarayıcı geri tuşuna basıldığında modalı kapat
    if (shell && shell.close) {
      shell.close();
    }
  };
  window.addEventListener('popstate', onPopState);

  // ─── Modal layout: stepWrap (içerik) + progressBar (alt) ───
  var stepWrap = document.createElement('div');
  stepWrap.className = 'ikr-fwizard-step-wrap';

  var progress = createProgressBar({
    skippableSteps: [2],
    nextableSteps: [3],
    onBack: function () {
      if (animPhase === 'idle') state.goBack();
    },
    onSkip: function () {
      if (animPhase === 'idle') state.goNext();
    },
    onNext: function () {
      if (animPhase === 'idle') state.goNext();
    },
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
  var timeoutId = null;

  // Step instance'ını mount et — ilk render veya geçiş enter'ı
  function mountStep(stepNum, withEnterAnim) {
    // Garantili temizlik: her ihtimale karşı alanı boşalt
    stepWrap.innerHTML = '';

    var inst = renderStep(stepNum, state, {
      canNavigate: function () { return animPhase === 'idle'; },
      blobMap: persistentBlobMap,
      onValidityChange: function (valid) {
        progress.setNextDisabled(!valid);
      },
      onSuccess: showThanks,
    });
    currentStepInstance = inst;

    // Progress bar'ı içerikle tam eşzamanlı güncelle (Desync koruması)
    progress.update(stepNum, state.get());

    if (withEnterAnim) {
      animPhase = 'entering';
      inst.el.classList.add('ikr-fwizard-step--enter');

      var timeoutId = null;
      var onEnd = function () {
        if (timeoutId) clearTimeout(timeoutId);
        inst.el.removeEventListener('animationend', onEnd);
        inst.el.classList.remove('ikr-fwizard-step--enter');
        animPhase = 'idle';
        // Kuyrukta bekleyen yeni hedef varsa şimdi işle
        if (pendingStep !== null) {
          rerenderStep();
        }
      };
      inst.el.addEventListener('animationend', onEnd);
      // Emniyet kilidi: Animasyon event'i kaçarsa 400ms sonra zorla bitir
      timeoutId = setTimeout(onEnd, 400);
    } else {
      animPhase = 'idle';
    }

    stepWrap.appendChild(inst.el);

    if (shell.setStepAttr) shell.setStepAttr(stepNum);
    if (stepNum === 3) progress.setNextDisabled(true);
  }

  var isThanksShowing = false;
  function showThanks() {
    if (isThanksShowing) return;
    isThanksShowing = true;

    if (!currentStepInstance) {
      stepWrap.innerHTML = '';
      var thanksEl = buildThanksScreen();
      thanksEl.classList.add('ikr-fwizard-step--enter');
      stepWrap.appendChild(thanksEl);
      shell.setStepAttr('thanks');
      progress.setThanksState(shell.close);
      return;
    }

    var leaving = currentStepInstance;
    animPhase = 'exiting';
    leaving.el.classList.add('ikr-fwizard-step--exit');

    var onExitEnd = function () {
      if (timeoutId) clearTimeout(timeoutId);
      leaving.el.removeEventListener('animationend', onExitEnd);
      if (leaving.destroy) {
        try { leaving.destroy(); } catch (e) { /* sessiz */ }
      }
      leaving.el.remove();
      animPhase = 'idle';
    };

    leaving.el.addEventListener('animationend', onExitEnd);
    timeoutId = setTimeout(onExitEnd, 300);

    var thanksEl = buildThanksScreen();
    thanksEl.classList.add('ikr-fwizard-step--enter');
    stepWrap.appendChild(thanksEl);
    
    shell.setStepAttr('thanks');
    progress.setThanksState(shell.close);
  }

  function rerenderStep() {
    var targetStep = state.get().currentStep;

    // Animasyon devam ediyorsa hedefi kuyruğa al ve dur
    if (animPhase !== 'idle') {
      pendingStep = targetStep;
      return;
    }

    // İlk render
    if (!currentStepInstance) {
      var firstWithAnim = !suppressNextEnterAnim;
      suppressNextEnterAnim = false;
      mountStep(targetStep, firstWithAnim);
      return;
    }

    // Normal geçiş: exit → mount (Double Buffering)
    var leaving = currentStepInstance;
    animPhase = 'exiting';
    leaving.el.classList.add('ikr-fwizard-step--exit');

    var onExitEnd = function () {
      if (timeoutId) clearTimeout(timeoutId);
      leaving.el.removeEventListener('animationend', onExitEnd);
      if (leaving.destroy) {
        try { leaving.destroy(); } catch (e) { /* sessiz */ }
      }
      leaving.el.remove();
      animPhase = 'idle';

      if (pendingStep) {
        var s = pendingStep;
        pendingStep = null;
        rerenderStep(s);
      }
    };

    leaving.el.addEventListener('animationend', onExitEnd);
    timeoutId = setTimeout(onExitEnd, 300);

    mountStep(targetStep, true);
  }

  // İlk render
  rerenderStep();

  // State değişimlerinde yeniden çiz (sadece step değişince)
  var lastStep = state.get().currentStep;
  var unsubscribeState = state.onChange(function (s) {
    if (s.currentStep !== lastStep) {
      lastStep = s.currentStep;
      rerenderStep();
    } else {
      // Step değişmediyse ama veri değiştiyse (foto vb.) footer'ı güncelle
      progress.update(s.currentStep, s);
    }
  });

  var originalClose = shell.close;
  shell.close = function() {
    if (unsubscribeState) unsubscribeState();
    // Varsa asılı kalmış animasyon timeout'larını temizle
    if (typeof timeoutId !== 'undefined' && timeoutId) clearTimeout(timeoutId);
    originalClose();
  };

  shell.open(layout);

  return {
    close: shell.close,
  };
}
