// product-widget/review-form-modal/steps/step-content.js
// Step 3 — Yorum içeriği: opsiyonel başlık + zorunlu textarea.
// Loox tarzı: tek odak (textarea), başlık küçük bir input olarak üstte.
// Sonraki butonu yorum boşken disabled — footer üzerinden kontrol edilir.

var COMMENT_MAX = 2000;
var TITLE_MAX = 60;

export function createStepContent(state, opts) {
  opts = opts || {};
  var onValidityChange = opts.onValidityChange || function () {};

  var root = document.createElement('div');
  root.className = 'ikr-fwizard-step ikr-fwizard-step-content';

  // Başlık
  var heading = document.createElement('div');
  heading.className = 'ikr-fwizard-step-title';
  heading.textContent = 'Deneyiminizi anlatın';
  root.appendChild(heading);

  // Form alanı
  var form = document.createElement('div');
  form.className = 'ikr-fwizard-content-form';

  // Title input (opsiyonel)
  var titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.className = 'ikr-fwizard-input';
  titleInput.placeholder = 'Kısa bir başlık (opsiyonel)';
  titleInput.maxLength = TITLE_MAX;
  titleInput.setAttribute('aria-label', 'Yorum başlığı');
  titleInput.value = state.get().title || '';
  titleInput.addEventListener('input', function () {
    state.set({ title: titleInput.value });
  });
  form.appendChild(titleInput);

  // Comment textarea (zorunlu)
  var textarea = document.createElement('textarea');
  textarea.className = 'ikr-fwizard-textarea';
  textarea.placeholder = 'Deneyiminizi anlatın…';
  textarea.maxLength = COMMENT_MAX;
  textarea.rows = 6;
  textarea.setAttribute('aria-label', 'Yorum');
  textarea.value = state.get().comment || '';
  form.appendChild(textarea);

  // Karakter sayacı
  var counter = document.createElement('div');
  counter.className = 'ikr-fwizard-char-counter';
  counter.setAttribute('aria-live', 'polite');
  form.appendChild(counter);

  function updateCounter() {
    var len = textarea.value.length;
    counter.textContent = len + '/' + COMMENT_MAX;
    counter.classList.toggle('ikr-fwizard-char-counter--max', len >= COMMENT_MAX);
  }

  function isValid() {
    return textarea.value.trim().length > 0;
  }

  textarea.addEventListener('input', function () {
    state.set({ comment: textarea.value });
    updateCounter();
    onValidityChange(isValid());
  });

  root.appendChild(form);

  // İlk değerlendirme — geri-ileri gezintide hidrate olduktan sonra
  updateCounter();
  // Mikro-defer: footer mount edildikten sonra valid state'i bildir
  setTimeout(function () {
    onValidityChange(isValid());
  }, 0);

  return {
    el: root,
    destroy: function () {
      // listener'lar DOM'dan çıkınca otomatik kalkar
    },
  };
}
