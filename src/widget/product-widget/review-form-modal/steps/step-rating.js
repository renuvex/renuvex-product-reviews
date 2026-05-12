// product-widget/review-form-modal/steps/step-rating.js
// Step 1 — Yıldız seçimi.
// Hover'da yıldızlar dolar, tıklayınca seçili kalır,
// tıklamadan sonra otomatik bir sonraki step'e geçer (auto-advance).
// "Sonraki" butonu yok.
//
// İkon ve renk admin panelden gelir:
//   - getIconFromSettings(currentSettings) → { filled, empty } SVG çifti
//     (Yıldız Stili → Yorum İkonu seçimi: star/heart/box vb.)
//   - --ikr-review-star-color → dolu yıldız rengi
// Bu sayede modal review yıldızlarıyla tutarlı görünür.

import { getIconFromSettings } from '../../../icons.js';
import { currentSettings } from '../../../core/state.js';

export function createStepRating(state, opts) {
  opts = opts || {};
  var root = document.createElement('div');
  root.className = 'ikr-fwizard-step ikr-fwizard-step-rating';

  var isAdvancing = false;

  // Başlık
  var title = document.createElement('div');
  title.className = 'ikr-fwizard-step-title';
  title.textContent = 'Bu ürünü nasıl değerlendirirsiniz?';
  root.appendChild(title);

  // Yıldız sırası
  var starsRow = document.createElement('div');
  starsRow.className = 'ikr-fwizard-stars';
  starsRow.setAttribute('role', 'radiogroup');
  starsRow.setAttribute('aria-label', 'Yıldız puanı');

  // İkon çifti admin'deki "Yıldız Stili → Yorum İkonu"ndan gelir.
  // Renk --ikr-review-star-color (admin "Yıldız Rengi") via .ikr-fwizard-star-active.
  var iconPair = getIconFromSettings(currentSettings || {});

  var stars = [];

  function applyVisual(activeCount) {
    stars.forEach(function (btn, idx) {
      var isActive = idx < activeCount;
      btn.classList.toggle('ikr-fwizard-star-active', isActive);
      btn.setAttribute('aria-checked', idx + 1 === activeCount ? 'true' : 'false');
      // SVG'yi state'e göre filled/empty olarak değiştir — review item ile tutarlı.
      btn.innerHTML = isActive ? iconPair.filled : iconPair.empty;
    });
  }

  for (var i = 1; i <= 5; i++) {
    (function (value) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ikr-fwizard-star';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-label', value + ' yıldız');
      // Başlangıçta empty — applyVisual ilk çağrıda doğru SVG'yi yerleştirir.
      btn.innerHTML = iconPair.empty;

      btn.addEventListener('mouseenter', function () {
        applyVisual(value);
      });
      btn.addEventListener('mouseleave', function () {
        applyVisual(state.get().rating);
      });
      btn.addEventListener('click', function () {
        if (isAdvancing) return;
        isAdvancing = true;
        state.set({ rating: value });
        applyVisual(value);
        // Auto-advance — Exit animasyonu (300ms) bitene kadar bekle.
        // 280ms yetmiyordu; canNavigate() animPhase==='idle' kontrolü
        // yüzünden geçişi engelliyordu.
        setTimeout(function () {
          var canNav = !opts.canNavigate || opts.canNavigate();
          if (canNav) state.goNext();
          // isAdvancing'i sıfırlamıyoruz çünkü zaten step kapanıp destroy edilecek.
          // Geri dönülürse step baştan render edilir.
        }, 400);
      });

      stars.push(btn);
      starsRow.appendChild(btn);
    })(i);
  }

  // İlk render: state'te zaten rating varsa onu göster (geri-ileri gezintiyle gelirse)
  applyVisual(state.get().rating);

  // Preview modunda ikon değişikliğini modal açıkken yansıt
  var onSettingsUpdate = function(event) {
    var nextSettings = event && event.detail && event.detail.settings;
    iconPair = getIconFromSettings(nextSettings || currentSettings || {});
    applyVisual(state.get().rating);
  };
  window.addEventListener('IKR_SETTINGS_UPDATED_PREVIEW', onSettingsUpdate);

  root.appendChild(starsRow);

  return {
    el: root,
    // Step manager step değişiminde temizleme yapsın diye opsiyonel destroy
    destroy: function () {
      window.removeEventListener('IKR_SETTINGS_UPDATED_PREVIEW', onSettingsUpdate);
      // hover listener'lar btn ile birlikte DOM'dan çıkınca otomatik kalkar
    },
  };
}
