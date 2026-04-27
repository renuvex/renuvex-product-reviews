// product-widget/review-form-modal/progress-bar.js
// Modal alt footer'ı: [Geri] [progress segments] [Atla]
// Geri butonu sadece step > 1 iken; Atla butonu sadece opsiyonel adımlarda
// (adım numarası `skippableSteps` listesindeyse) görünür.

import { TOTAL_STEPS } from './wizard-state.js';

export function createProgressBar(opts) {
  opts = opts || {};
  var skippableSteps = opts.skippableSteps || [];
  var onBack = opts.onBack || function () {};
  var onSkip = opts.onSkip || function () {};

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

  // Sağ: Atla
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
  wrap.appendChild(skipBtn);

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
      backBtn.hidden = currentStep <= 1;
      skipBtn.hidden = skippableSteps.indexOf(currentStep) === -1;
    },
  };
}
