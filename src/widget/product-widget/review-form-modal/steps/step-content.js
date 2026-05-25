// product-widget/review-form-modal/steps/step-content.js
// Step 3 — Yorum içeriği: opsiyonel başlık + zorunlu textarea.
// Tek odak (textarea), başlık küçük bir input olarak üstte.
// Sonraki butonu yorum boşken disabled — footer üzerinden kontrol edilir.
import { validateStep } from '../wizard-state.js';

var COMMENT_MAX = 2000;
var TITLE_MAX = 60;

export function createStepContent(state, opts) {
  opts = opts || {};
  var onValidityChange = opts.onValidityChange || function () { };

  var root = document.createElement('div');
  root.className = 'renuvex-pr-fwizard-step renuvex-pr-fwizard-step-content';

  // Başlık
  var heading = document.createElement('div');
  heading.className = 'renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg';
  heading.textContent = 'Deneyiminizi anlatın';
  root.appendChild(heading);

  // Form alanı
  var form = document.createElement('div');
  form.className = 'renuvex-pr-fwizard-content-form';

  // Title input (opsiyonel)
  var titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.className = 'renuvex-pr-fwizard-input';
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
  textarea.className = 'renuvex-pr-fwizard-textarea';
  textarea.placeholder = 'Deneyiminizi anlatın…';
  textarea.maxLength = COMMENT_MAX;
  textarea.rows = 6;
  textarea.setAttribute('aria-label', 'Yorum');
  textarea.value = state.get().comment || '';
  form.appendChild(textarea);

  // Karakter sayacı
  var counter = document.createElement('div');
  counter.className = 'renuvex-pr-fwizard-char-counter';
  counter.setAttribute('aria-live', 'polite');
  form.appendChild(counter);

  function updateCounter() {
    var len = textarea.value.length;
    counter.textContent = len + '/' + COMMENT_MAX;
    counter.classList.toggle('renuvex-pr-fwizard-char-counter--max', len >= COMMENT_MAX);
  }

  function isValid() {
    return validateStep(3, state.get());
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
