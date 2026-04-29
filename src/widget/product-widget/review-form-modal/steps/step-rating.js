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
        state.set({ rating: value });
        applyVisual(value);
        // Auto-advance — Küçük gecikme: kullanıcı seçimini görsün.
        setTimeout(function () {
          var canNav = !opts.canNavigate || opts.canNavigate();
          if (canNav) state.goNext();
        }, 280);
      });

      stars.push(btn);
      starsRow.appendChild(btn);
    })(i);
  }

  // İlk render: state'te zaten rating varsa onu göster (geri-ileri gezintiyle gelirse)
  applyVisual(state.get().rating);

  root.appendChild(starsRow);

  return {
    el: root,
    // Step manager step değişiminde temizleme yapsın diye opsiyonel destroy
    destroy: function () {
      // hover listener'lar btn ile birlikte DOM'dan çıkınca otomatik kalkar
    },
  };
}
