// product-widget/review-form-modal/progress-bar.js
// Modal alt footer'ı: [Geri] [progress segments] [Atla | Sonraki]
//
// Mimari: footer'ın yan slot'larında her zaman TEK buton elementi var.
// Step'e göre className/textContent/onclick yeniden ayarlanır; bu sayede
// DOM'da ekstra element / display:none toggle hilesi yok, buton konumu
// her step'te %100 sabit.
// çalışır.

import { TOTAL_STEPS, validateStep } from './wizard-state.js';

// SVG ok ikonu — sadece "Geri" butonunda kullanılır.
var ARROW_LEFT_SVG =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<polyline points="15 18 9 12 15 6"/>' +
  '</svg>';

export function createProgressBar(opts) {
  opts = opts || {};
  var skippableSteps = opts.skippableSteps || [];
  var nextableSteps = opts.nextableSteps || [];
  var onBack = opts.onBack || function () { };
  var onSkip = opts.onSkip || function () { };
  var onNext = opts.onNext || function () { };

  var wrap = document.createElement('div');
  wrap.className = 'ikr-fwizard-footer';

  // ─── Sol slot: tek buton (Geri) ──────────────────────────────────
  // Geri sadece step > 1 iken aktif olur; aksi halde visibility:hidden
  // ile yer korur (grid kolonu sabit 120px zaten).
  var leftBtn = document.createElement('button');
  leftBtn.type = 'button';
  leftBtn.className = 'ikr-fwizard-nav-btn ikr-fwizard-footer-back';
  leftBtn.setAttribute('aria-label', 'Geri');
  leftBtn.innerHTML = ARROW_LEFT_SVG + '<span>Geri</span>';
  leftBtn.addEventListener('click', function () { onBack(); });
  wrap.appendChild(leftBtn);

  // ─── Orta: progress segments ─────────────────────────────────────
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

  // ─── Sağ slot: tek buton, step'e göre rol değişir ────────────────
  // Step 2 (skippable) → "Atla" (nav-btn, text-link tarzı, onSkip)
  // Step 3 (nextable)  → "Sonraki" (cta-btn, dolu siyah, onNext)
  // Step 1, 4 (none)   → buton visibility:hidden (yer korur)
  //
  // Tek bir <button> var; configureRightBtn() her update'te
  // className/innerHTML/handler'ı yeniden kurar. Aynı element
  // olduğu için konum/şekil step değişiminde değişmez.
  var rightBtn = document.createElement('button');
  rightBtn.type = 'button';
  // Mevcut click handler'ı temiz yönetmek için tekil değişken
  var rightHandler = null;
  function setRightHandler(fn) {
    if (rightHandler) rightBtn.removeEventListener('click', rightHandler);
    rightHandler = fn;
    if (fn) rightBtn.addEventListener('click', fn);
  }
  wrap.appendChild(rightBtn);

  function configureRightBtn(currentStep, stateData) {
    var isSkippable = skippableSteps.indexOf(currentStep) !== -1;
    var hasNext = nextableSteps.indexOf(currentStep) !== -1;
    var hasPhotos = stateData && stateData.images && stateData.images.length > 0;

    if (isSkippable) {
      if (currentStep === 2 && hasPhotos) {
        // Fotoğraf var → "Devam Et" (Siyah Buton - CTA)
        rightBtn.className = 'ikr-fwizard-cta-btn ikr-fwizard-footer-next';
        rightBtn.setAttribute('aria-label', 'Devam Et');
        rightBtn.innerHTML = 'Devam Et';
        setRightHandler(function () { onNext(); });
      } else {
        // Fotoğraf yok → "Atla" (Şeffaf Buton - Nav)
        rightBtn.className = 'ikr-fwizard-nav-btn ikr-fwizard-footer-skip';
        rightBtn.setAttribute('aria-label', 'Atla');
        rightBtn.innerHTML = '<span>Atla</span>';
        setRightHandler(function () { onSkip(); });
      }
      rightBtn.disabled = false;
      rightBtn.classList.remove('ikr-fwizard-cta-btn--disabled');
      rightBtn.style.visibility = '';
      rightBtn.tabIndex = 0;
    } else if (hasNext) {
      // Sonraki — CTA, dolu siyah
      rightBtn.className = 'ikr-fwizard-cta-btn ikr-fwizard-footer-next';
      rightBtn.setAttribute('aria-label', 'Sonraki');
      rightBtn.innerHTML = 'Sonraki';
      rightBtn.style.visibility = '';
      rightBtn.tabIndex = 0;

      // SENKRON VALİDASYON: Flash ve desync koruması.
      // Merkezi kural setine (validateStep) soruyoruz.
      var isValid = validateStep(currentStep, stateData);
      rightBtn.disabled = !isValid;
      rightBtn.classList.toggle('ikr-fwizard-cta-btn--disabled', !isValid);

      setRightHandler(function () {
        if (rightBtn.disabled) return;
        onNext();
      });
    } else {
      // Hiç buton yok — slot görünmez ama yer korur
      rightBtn.className = 'ikr-fwizard-nav-btn ikr-fwizard-footer-skip';
      rightBtn.innerHTML = '';
      rightBtn.style.visibility = 'hidden';
      rightBtn.tabIndex = -1;
      rightBtn.disabled = true;
      setRightHandler(null);
    }
  }

  return {
    el: wrap,
    update: function (currentStep, stateData) {
      // Progress segment'leri
      segments.forEach(function (seg, idx) {
        if (idx + 1 <= currentStep) {
          seg.classList.add('ikr-fwizard-progress-seg-active');
        } else {
          seg.classList.remove('ikr-fwizard-progress-seg-active');
        }
      });

      // Sol: Geri sadece step > 1 iken görünür
      var hideBack = currentStep <= 1;
      leftBtn.style.visibility = hideBack ? 'hidden' : '';
      leftBtn.style.pointerEvents = hideBack ? 'none' : '';
      leftBtn.tabIndex = hideBack ? -1 : 0;

      // Sağ: tek buton, step ve state'e göre rol değişir
      configureRightBtn(currentStep, stateData);
    },
    setNextDisabled: function (disabled) {
      // Sadece "Sonraki" CTA aktifken anlamlı; Atla/no-button
      // durumlarında zaten farklı className. Class'a bakarak
      // güvenli toggle yapıyoruz.
      if (rightBtn.classList.contains('ikr-fwizard-cta-btn')) {
        rightBtn.disabled = !!disabled;
        rightBtn.classList.toggle('ikr-fwizard-cta-btn--disabled', !!disabled);
      }
    },
    setThanksState: function (onContinue) {
      // Sol ve orta alanı gizle
      leftBtn.style.visibility = 'hidden';
      progressWrap.style.visibility = 'hidden';

      // Sağ kolonu "Devam Et" yap (Siyah CTA butonu)
      rightBtn.className = 'ikr-fwizard-cta-btn ikr-fwizard-footer-next';
      rightBtn.setAttribute('aria-label', 'Devam Et');
      rightBtn.innerHTML = 'Devam Et';
      rightBtn.style.visibility = '';
      rightBtn.disabled = false;
      rightBtn.classList.remove('ikr-fwizard-cta-btn--disabled');
      setRightHandler(onContinue);
    },
  };
}
