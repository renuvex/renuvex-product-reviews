// product-widget/review-form-modal/steps/step-rating.js
// Step 1 — Yıldız seçimi.
// Loox standardı: hover'da yıldızlar dolar, tıklayınca seçili kalır,
// tıklamadan sonra otomatik bir sonraki step'e geçer (auto-advance).
// "Sonraki" butonu yok.

export function createStepRating(state) {
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

  var stars = [];
  var hoverIndex = 0;

  function applyVisual(activeCount) {
    stars.forEach(function (btn, idx) {
      if (idx < activeCount) {
        btn.classList.add('ikr-fwizard-star-active');
      } else {
        btn.classList.remove('ikr-fwizard-star-active');
      }
    });
  }

  for (var i = 1; i <= 5; i++) {
    (function (value) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ikr-fwizard-star';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-label', value + ' yıldız');
      btn.innerHTML =
        '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<path d="M12 2.5l2.9 6.55 7.1.62-5.4 4.7L18.2 21.5 12 17.77 5.8 21.5l1.6-7.13L2 9.67l7.1-.62L12 2.5z"/>' +
        '</svg>';

      btn.addEventListener('mouseenter', function () {
        hoverIndex = value;
        applyVisual(value);
      });
      btn.addEventListener('mouseleave', function () {
        hoverIndex = 0;
        applyVisual(state.get().rating);
      });
      btn.addEventListener('click', function () {
        state.set({ rating: value });
        applyVisual(value);
        // Auto-advance — Loox pattern. Küçük gecikme: kullanıcı seçimini görsün.
        setTimeout(function () {
          state.goNext();
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
