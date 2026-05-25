// product-widget/review-form-modal/steps/step-rating.js
// Step 1 — Yıldız seçimi.
// Hover'da yıldızlar dolar, tıklayınca seçili kalır,
// tıklamadan sonra otomatik bir sonraki step'e geçer (auto-advance).
// "Sonraki" butonu yok.
//
// İkon ve renk admin panelden gelir:
//   - getIconFromSettings(currentSettings) → { filled, empty } SVG çifti
//     (Yıldız Stili → Yorum İkonu seçimi: star/heart/box vb.)
//   - --renuvex-pr-review-star-color → dolu yıldız rengi
// Bu sayede modal review yıldızlarıyla tutarlı görünür.

import { getIconFromSettings } from '../../../icons/index.js';
import { ensureStarSprite, starUseSvg } from '../../../icons/star-sprite.js';
import { currentSettings } from '../../../core/state.js';
import {
  RENUVEX_PR_SETTINGS_UPDATED_PREVIEW,
} from '../../../core/namespace.js';

export function createStepRating(state, opts) {
  opts = opts || {};
  var root = document.createElement('div');
  root.className = 'renuvex-pr-fwizard-step renuvex-pr-fwizard-step-rating';

  var isAdvancing = false;
  var advanceTimer = null;

  // Başlık
  var title = document.createElement('div');
  title.className = 'renuvex-pr-fwizard-step-title';
  title.textContent = 'Bu ürünü nasıl değerlendirirsiniz?';
  root.appendChild(title);

  // Yıldız sırası
  var starsRow = document.createElement('div');
  starsRow.className = 'renuvex-pr-fwizard-stars';
  starsRow.setAttribute('role', 'radiogroup');
  starsRow.setAttribute('aria-label', 'Yıldız puanı');

  // İkon çifti admin'deki "Yıldız Stili → Yorum İkonu"ndan gelir.
  // Renk --renuvex-pr-review-star-color (admin "Yıldız Rengi") via .renuvex-pr-fwizard-star-active.
  var iconPair = getIconFromSettings(currentSettings || {});
  ensureStarSprite(iconPair);

  var stars = [];

  function applyVisual(activeCount) {
    stars.forEach(function (btn, idx) {
      var isActive = idx < activeCount;
      btn.classList.toggle('renuvex-pr-fwizard-star-active', isActive);
      btn.setAttribute('aria-checked', idx + 1 === activeCount ? 'true' : 'false');
      // SVG'yi state'e göre filled/empty olarak değiştir — review item ile tutarlı.
      btn.innerHTML = isActive ? starUseSvg('full') : starUseSvg('outline');
    });
  }

  function activateRating(value, e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
    if (isAdvancing) return;
    isAdvancing = true;
    state.set({ rating: value });
    applyVisual(value);

    if (advanceTimer) clearTimeout(advanceTimer);
    advanceTimer = setTimeout(function () {
      // The wizard state machine queues transitions while a step animation is
      // busy, so a one-shot canNavigate check must not drop mobile taps.
      state.goNext();
    }, 280);
  }

  for (var i = 1; i <= 5; i++) {
    (function (value) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'renuvex-pr-fwizard-star';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-label', value + ' yıldız');
      // Başlangıçta empty — applyVisual ilk çağrıda doğru SVG'yi yerleştirir.
      btn.innerHTML = starUseSvg('outline');

      btn.addEventListener('mouseenter', function () {
        applyVisual(value);
      });
      btn.addEventListener('mouseleave', function () {
        applyVisual(state.get().rating);
      });
      btn.addEventListener('pointerdown', function (e) {
        if (e.button && e.button !== 0) return;
        activateRating(value, e);
      });
      if (typeof window !== 'undefined' && !window.PointerEvent) {
        btn.addEventListener('touchstart', function (e) {
          activateRating(value, e);
        }, { passive: false });
      }
      btn.addEventListener('mousedown', function (e) {
        if (window.PointerEvent) return;
        activateRating(value, e);
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') activateRating(value, e);
      });
      btn.addEventListener('click', function (e) {
        activateRating(value, e);
      });

      stars.push(btn);
      starsRow.appendChild(btn);
    })(i);
  }

  // İlk render: state'te zaten rating varsa onu göster (geri-ileri gezintiyle gelirse)
  applyVisual(state.get().rating);

  // Preview modunda ikon değişikliğini modal açıkken yansıt
  var lastPreviewSettings = null;
  var onSettingsUpdate = function(event) {
    var nextSettings = event && event.detail && event.detail.settings;
    if (nextSettings && nextSettings === lastPreviewSettings) return;
    lastPreviewSettings = nextSettings || null;
    iconPair = getIconFromSettings(nextSettings || currentSettings || {});
    applyVisual(state.get().rating);
  };
  window.addEventListener(RENUVEX_PR_SETTINGS_UPDATED_PREVIEW, onSettingsUpdate);

  root.appendChild(starsRow);

  return {
    el: root,
    // Step manager step değişiminde temizleme yapsın diye opsiyonel destroy
    destroy: function () {
      if (advanceTimer) clearTimeout(advanceTimer);
      window.removeEventListener(RENUVEX_PR_SETTINGS_UPDATED_PREVIEW, onSettingsUpdate);
      // hover listener'lar btn ile birlikte DOM'dan çıkınca otomatik kalkar
    },
  };
}
