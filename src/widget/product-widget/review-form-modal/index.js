// product-widget/review-form-modal/index.js
// Yorum yazma wizard modal'ı — public API.
// Faz 1 iskeleti: modal açılır/kapanır, içerik boş placeholder.
// Faz 2+: step'ler (rating → photos → content → author) buraya entegre olacak.
//
// Bağımsızlık sözleşmesi: Mevcut review-modal'a, review-form'a hiçbir
// bağımlılık yok. CSS, state, DOM tamamen ayrı.

import { createWizardShell } from './modal-shell.js';
import { FWIZARD_CSS } from './styles.js';

// ─── CSS bir kez inject (open her çağrıldığında eklemekten kaçın) ─────
var stylesInjected = false;
function ensureStyles() {
  if (stylesInjected) return;
  var styleEl = document.createElement('style');
  styleEl.setAttribute('data-ikr-fwizard', '');
  styleEl.textContent = FWIZARD_CSS;
  document.head.appendChild(styleEl);
  stylesInjected = true;
}

/**
 * Yorum yazma wizard modal'ını aç.
 * @param {Object} opts
 * @param {string} opts.productId
 * @param {string} [opts.productName]
 * @param {Function} [opts.onSubmit] - Submit success callback (Faz 2+)
 * @param {Function} [opts.onClose] - Modal kapanınca çağrılır
 * @returns {{ close: Function }} - Kontrol API'si
 */
export function openReviewFormModal(opts) {
  opts = opts || {};
  ensureStyles();

  var shell = createWizardShell({
    onClose: opts.onClose,
    allowOutsideClose: true, // Faz 2'de step bazlı değişecek
  });

  // ─── Faz 1 placeholder ─────────────────────────────────────────────
  // Faz 2+'da burada wizard-state + step renderer çalışacak.
  // Şimdilik sadece "iskelet aktif" göstergesi.
  var placeholder = document.createElement('div');
  placeholder.className = 'ikr-fwizard-placeholder';
  placeholder.innerHTML = [
    '<div style="font-size:18px;font-weight:600;margin-bottom:8px;color:inherit;">',
    '  Yorum Yazma Modal\'ı',
    '</div>',
    '<div>Faz 1 iskelet — Step\'ler buraya gelecek.</div>',
    opts.productId ? '<div style="margin-top:16px;font-size:12px;opacity:0.6;">Ürün: ' + String(opts.productId) + '</div>' : '',
  ].join('');

  shell.open(placeholder);

  return {
    close: shell.close,
  };
}
