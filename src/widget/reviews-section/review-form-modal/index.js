// reviews-section/review-form-modal/index.js
// Yorum yazma wizard modal'ı — public API + step orchestrator.
// Step sırası: rating → photos → content (title+comment) → author.
// Step 4 submit işini step-author yapar; başarı sonrası teşekkür ekranı.
//
// Bağımsızlık sözleşmesi: review-modal ile import / class / variable çakışması yok.

import { createWizardShell } from './modal-shell.js';
import { pushModalHistoryEntry, restoreModalHistoryEntry } from '../../core/modal-history.js';
import { createWizardState, TOTAL_STEPS } from './wizard-state.js';
import { createProgressBar } from './progress-bar.js';
import { createStepRating } from './steps/step-rating.js';
import { createStepPhotos } from './steps/step-photos.js';
import { createStepContent } from './steps/step-content.js';
import { createStepAuthor } from './steps/step-author.js';

// CSS is now injected into the wizard's shadow root by createWizardShell.open()
// — see modal-shell.js. No head-level <style> injection is needed.

// stepOpts: step-specific callback'ler (validity, success).
function renderStep(stepNum, state, stepOpts) {
  stepOpts = stepOpts || {};
  if (stepNum === 1) return createStepRating(state, {
    canNavigate: stepOpts.canNavigate,
  });
  if (stepNum === 2) return createStepPhotos(state, {
    canNavigate: stepOpts.canNavigate,
    blobMap: stepOpts.blobMap,
    urlToFinger: stepOpts.urlToFinger,
    showToast: stepOpts.showToast,
  });
  if (stepNum === 3) return createStepContent(state, {
    onValidityChange: stepOpts.onValidityChange,
  });
  if (stepNum === 4) return createStepAuthor(state, {
    onValidityChange: stepOpts.onValidityChange,
    onSuccess: stepOpts.onSuccess,
    showToast: stepOpts.showToast,
  });
  // Beklenmedik step — boş placeholder
  var ph = document.createElement('div');
  ph.className = 'renuvex-pr-fwizard-step renuvex-pr-fwizard-step-placeholder';
  return { el: ph, destroy: function () {} };
}

function buildThanksScreen() {
  var wrap = document.createElement('div');
  wrap.className = 'renuvex-pr-fwizard-step renuvex-pr-fwizard-step-thanks';
  wrap.innerHTML =
    '<div class="renuvex-pr-fwizard-step-title renuvex-pr-fwizard-thanks-title">Teşekkürler</div>' +
    '<div class="renuvex-pr-fwizard-step-subtitle renuvex-pr-fwizard-thanks-subtitle">Değerlendirmeniz alındı.</div>';
  return wrap;
}

/**
 * Yorum yazma wizard modal'ını aç.
 */
export function openReviewFormModal(opts) {
  opts = opts || {};

  var state = createWizardState({
    productId: opts.productId,
    productName: opts.productName,
  });

  var persistentBlobMap = {};
  var persistentUrlToFinger = {};

  var shell = createWizardShell({
    onClose: function () {
      window.removeEventListener('popstate', onPopState);
      // Manual close (X / ESC): neutralize the pushed history entry via the shared
      // modal-history module. It uses replaceState (no popstate side-effect on a
      // merchant theme's SPA router). On a back-button close the entry is already
      // gone, so isCurrentModalHistoryEntry fails and this safely no-ops.
      restoreModalHistoryEntry(modalHistoryEntry);

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
  // Shared id-based entry (core/modal-history.js) so the wizard matches the lightbox
  // and avoids history.back()'s popstate side-effect on merchant theme SPA routers.
  var modalHistoryEntry = pushModalHistoryEntry();

  var onPopState = function (e) {
    // Tarayıcı geri tuşuna basıldığında modalı kapat
    if (shell && shell.close) {
      shell.close();
    }
  };
  window.addEventListener('popstate', onPopState);

  // ─── Modal layout: stepWrap (içerik) + progressBar (alt) ───
  var stepWrap = document.createElement('div');
  stepWrap.className = 'renuvex-pr-fwizard-step-wrap';

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
  layout.className = 'renuvex-pr-fwizard-layout';
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
      urlToFinger: persistentUrlToFinger,
      onValidityChange: function (valid) {
        progress.setNextDisabled(!valid);
      },
      onSuccess: showThanks,
      showToast: shell.showToast,
    });
    currentStepInstance = inst;

    // Progress bar'ı içerikle tam eşzamanlı güncelle (Desync koruması)
    progress.update(stepNum, state.get());

    if (withEnterAnim) {
      animPhase = 'entering';
      inst.el.classList.add('renuvex-pr-fwizard-step--enter');

      var timeoutId = null;
      var onEnd = function () {
        if (timeoutId) clearTimeout(timeoutId);
        inst.el.removeEventListener('animationend', onEnd);
        inst.el.classList.remove('renuvex-pr-fwizard-step--enter');
        animPhase = 'idle';
        // Kuyrukta bekleyen yeni hedef varsa şimdi işle
        if (pendingStep !== null) {
          rerenderStep();
        }
      };
      inst.el.addEventListener('animationend', onEnd);
      // Emniyet kilidi: Animasyon event'i kaçarsa 700ms sonra zorla bitir
      timeoutId = setTimeout(onEnd, 700);
    } else {
      animPhase = 'idle';
    }

    stepWrap.appendChild(inst.el);

    if (shell.setStepAttr) shell.setStepAttr(stepNum);
    if (stepNum === 3) progress.setNextDisabled(true);
    // Adım değişimlerinde otomatik focus yok — Next butonu odakta kalır,
    // kullanıcı Tab ile yeni adıma giriş yapar. Aksi halde adım 3/4'te ilk
    // input'a focus düşmesi mobil klavyeyi tetikliyor ve klavye odak çerçevesi
    // her geçişte titriyor. Modal ilk açıldığında shell dialog container'ına
    // focus verir; kullanıcı ilk Tab ile adıma girer.
  }

  var isThanksShowing = false;
  function showThanks() {
    if (isThanksShowing) return;
    isThanksShowing = true;

    if (!currentStepInstance) {
      stepWrap.innerHTML = '';
      var thanksEl = buildThanksScreen();
      thanksEl.classList.add('renuvex-pr-fwizard-step--enter');
      stepWrap.appendChild(thanksEl);
      shell.setStepAttr('thanks');
      progress.setThanksState(shell.close);
      return;
    }

    var leaving = currentStepInstance;
    animPhase = 'exiting';
    leaving.el.classList.add('renuvex-pr-fwizard-step--exit');

    var onExitEnd = function () {
      if (timeoutId) clearTimeout(timeoutId);
      leaving.el.removeEventListener('animationend', onExitEnd);
      if (leaving.destroy) {
        try { leaving.destroy(); } catch (e) { /* sessiz */ }
      }
      if (currentStepInstance === leaving) currentStepInstance = null;
      
      stepWrap.innerHTML = '';
      var thanksEl = buildThanksScreen();
      thanksEl.classList.add('renuvex-pr-fwizard-step--enter');
      stepWrap.appendChild(thanksEl);
      
      shell.setStepAttr('thanks');
      progress.setThanksState(shell.close);
      animPhase = 'idle';
    };

    leaving.el.addEventListener('animationend', onExitEnd);
    timeoutId = setTimeout(onExitEnd, 300);
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

    // Normal geçiş: exit → mount
    var leaving = currentStepInstance;
    animPhase = 'exiting';
    leaving.el.classList.add('renuvex-pr-fwizard-step--exit');

    var onExitEnd = function () {
      if (timeoutId) clearTimeout(timeoutId);
      leaving.el.removeEventListener('animationend', onExitEnd);
      if (leaving.destroy) {
        try { leaving.destroy(); } catch (e) { /* sessiz */ }
      }
      if (currentStepInstance !== leaving) return;

      stepWrap.innerHTML = '';
      currentStepInstance = null;

      var next = pendingStep !== null ? pendingStep : state.get().currentStep;
      pendingStep = null;
      mountStep(next, true);
      animPhase = 'idle'; // Geçiş tamamlandı, yeni geçişlere izin ver
    };

    leaving.el.addEventListener('animationend', onExitEnd);
    // Emniyet kilidi: exit animasyon süresinden biraz fazla (350ms > 300ms)
    timeoutId = setTimeout(onExitEnd, 350);
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
