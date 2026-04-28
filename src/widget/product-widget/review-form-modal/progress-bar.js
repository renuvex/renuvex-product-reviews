// product-widget/review-form-modal/progress-bar.js
// Modal alt footer'ı: [Geri] [progress segments] [Atla | Sonraki]
//
// Geri butonu sadece step > 1 iken görünür.
// Atla butonu sadece opsiyonel adımlarda (skippableSteps) görünür.
// Sonraki butonu sadece "next gerektiren" adımlarda (nextableSteps) görünür;
// disabled state validity'ye bağlı (setNextDisabled ile dışarıdan kontrol).
// Atla ve Sonraki aynı anda gösterilmez — Atla opsiyonel, Sonraki zorunlu.

import { TOTAL_STEPS } from './wizard-state.js';

export function createProgressBar(opts) {
  opts = opts || {};
  var skippableSteps = opts.skippableSteps || [];
  var nextableSteps = opts.nextableSteps || [];
  var onBack = opts.onBack || function () {};
  var onSkip = opts.onSkip || function () {};
  var onNext = opts.onNext || function () {};

  var wrap = document.createElement('div');
  wrap.className = 'ikr-fwizard-footer';

  // Sol: Geri
  var backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'ikr-fwizard-nav-btn ikr-fwizard-footer-back';
  backBtn.setAttribute('aria-label', 'Geri');
  backBtn.innerHTML =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polyline points="15 18 9 12 15 6"/>' +
    '</svg>' +
    '<span>Geri</span>';
  backBtn.onclick = function () { onBack(); };
  wrap.appendChild(backBtn);

  // Orta: progress segments
  var progressWrap = document.createElement('div');
  progressWrap.className = 'ikr-fwizard-footer-progress';
  var segments = [];
  for (var i = 0; i < TOTAL_STEPS; i++) {
    var seg = document.createElement('span');
    seg.className = 'ikr-fwizard-progress-seg';
    progressWrap.appendChild(seg);
    segments.push(seg);
  }
  wrap.appendChild(progressWrap);

  // Sağ: Atla (text-link) ve Sonraki (CTA) — biri ya da diğeri görünür
  var rightSlot = document.createElement('div');
  rightSlot.className = 'ikr-fwizard-footer-right';

  var skipBtn = document.createElement('button');
  skipBtn.type = 'button';
  skipBtn.className = 'ikr-fwizard-nav-btn ikr-fwizard-footer-skip';
  skipBtn.setAttribute('aria-label', 'Atla');
  skipBtn.innerHTML =
    '<span>Atla</span>' +
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<polyline points="9 18 15 12 9 6"/>' +
    '</svg>';
  skipBtn.onclick = function () { onSkip(); };

  var nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'ikr-fwizard-cta-btn';
  nextBtn.textContent = 'Sonraki';
  nextBtn.onclick = function () {
    if (nextBtn.disabled) return;
    onNext();
  };

  rightSlot.appendChild(skipBtn);
  rightSlot.appendChild(nextBtn);
  wrap.appendChild(rightSlot);

  return {
    el: wrap,
    update: function (currentStep) {
      segments.forEach(function (seg, idx) {
        if (idx + 1 <= currentStep) {
          seg.classList.add('ikr-fwizard-progress-seg-active');
        } else {
          seg.classList.remove('ikr-fwizard-progress-seg-active');
        }
      });
      // Buton görünürlüğü:
      //  - SOL slot (Geri): visibility:hidden → grid kolonu yer kaplar,
      //    yan kolon genişliği step 1 ile diğerleri arasında sabit kalır.
      //    Layout shift olmaz, ama buton görünmez.
      //  - SAĞ slot (Atla VE Sonraki): bunlar aynı slot içinde yan yana
      //    duran iki ayrı element. Görünmez olanı DOM akışından
      //    çıkarmak (display:none) gerekiyor; aksi halde görünen buton
      //    slot'un yanlış ucunda kalıyor (örn. step 2'de Atla görünür
      //    ama yanında Sonraki yer kaplıyor → Atla "ortaya" kayıyor).
      //    Sağ slot'un kendisi grid'in 120px'lik kolonunda
      //    justify-self:end ile sabit duruyor; tek görünür buton
      //    slot'un sağ ucuna yaslı kalıyor → her step aynı X.
      var hideBack = currentStep <= 1;
      var isSkippable = skippableSteps.indexOf(currentStep) !== -1;
      var hasNext = nextableSteps.indexOf(currentStep) !== -1;

      backBtn.style.visibility = hideBack ? 'hidden' : '';
      backBtn.style.pointerEvents = hideBack ? 'none' : '';
      backBtn.tabIndex = hideBack ? -1 : 0;

      skipBtn.style.display = isSkippable ? '' : 'none';
      skipBtn.tabIndex = isSkippable ? 0 : -1;

      nextBtn.style.display = hasNext ? '' : 'none';
      nextBtn.tabIndex = hasNext ? 0 : -1;
    },
    setNextDisabled: function (disabled) {
      nextBtn.disabled = !!disabled;
      nextBtn.classList.toggle('ikr-fwizard-cta-btn--disabled', !!disabled);
    },
  };
}
