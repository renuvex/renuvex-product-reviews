// reviews-section/review-form-modal/modal-shell.js
// Wizard modal'ın görsel kabuğu — backdrop, modal kutusu, close butonu, ESC,
// outside-click, body scroll lock. Step içeriğinden bağımsız: shell yalnızca
// "modal aç/kapat" sözleşmesini sağlar; içeriği `body` parametresiyle alır.
//
// Bağımsızlık: Mevcut review-modal'a hiçbir bağımlılık yok. Class'lar
// 'renuvex-pr-fwizard-' prefix'iyle izole.

import { wasLastInputKeyboard } from '../../shared/input-modality.js';
import { iconUseSvg, registerSpriteRoot, unregisterSpriteRoot } from '../../icons/star-sprite.js';
import { createOverlayShadowHost, injectShadowStyles, getActiveElementWithin, HOST_RESET_CSS } from '../../core/shadow.js';
import { BASE_RESET_CSS } from '../../shared/base-reset.js';
import { FWIZARD_CSS } from './styles.js';

export function createWizardShell(opts) {
  var onClose = opts && opts.onClose ? opts.onClose : function () {};
  // Faz 2+'da step ilerlerken outside-click davranışı değişebilir.
  // Şimdilik basit: dış tıklama her zaman kapatır.
  var allowOutsideClose = opts && opts.allowOutsideClose !== false;

  // ─── DOM ──────────────────────────────────────────────────────────
  var overlay = document.createElement('div');
  overlay.className = 'renuvex-pr-fwizard-overlay';
  overlay.tabIndex = -1;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Yorum yapma formu');

  var modal = document.createElement('div');
  modal.className = 'renuvex-pr-fwizard';
  overlay.appendChild(modal);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'renuvex-pr-fwizard-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.innerHTML =
    iconUseSvg('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>');
  modal.appendChild(closeBtn);

  var content = document.createElement('div');
  content.className = 'renuvex-pr-fwizard-content';
  modal.appendChild(content);

  // ─── State & cleanup ──────────────────────────────────────────────
  var isClosed = false;
  var shadow = null;
  var returnFocusEl = null;
  // Açılış kaynağı: klavyeden açıldıysa kapanışta odağı tetikleyiciye iade
  // ediyoruz (Tab akışı sürsün). Pointer/touch ile açıldıysa odağı doğal
  // olarak bırakıyoruz — yoksa mobilde trigger butonda sticky focus kalır.
  var openedByKeyboard = false;
  var prevBodyOverflow = '';
  var prevBodyPaddingRight = '';

  function getReturnFocusElement() {
    var el = document.activeElement;
    if (!el || el === document.body || el === document.documentElement) return null;
    return el;
  }

  function restoreFocus(el) {
    // isConnected (not document.contains) so focus works inside a shadow root.
    if (!el || !el.isConnected || typeof el.focus !== 'function') return;
    try {
      el.focus({ preventScroll: true });
    } catch (_) {
      try { el.focus(); } catch (_) {}
    }
  }

  function isVisibleFocusable(el) {
    if (!el || el.disabled) return false;
    if (el.getAttribute('aria-hidden') === 'true') return false;
    var style = window.getComputedStyle ? window.getComputedStyle(el) : null;
    if (style && (style.display === 'none' || style.visibility === 'hidden')) return false;
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  function getFocusableElements(container) {
    var selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    return Array.prototype.slice.call(container.querySelectorAll(selector)).filter(isVisibleFocusable);
  }

  function focusFirstWizardControl() {
    var contentFocusables = getFocusableElements(content);
    var allFocusables = getFocusableElements(overlay);
    var target = contentFocusables[0] || allFocusables[0] || overlay;
    restoreFocus(target);
  }

  function trapWizardFocus(e) {
    if (e.key !== 'Tab') return;
    var focusables = getFocusableElements(overlay);
    if (!focusables.length) {
      e.preventDefault();
      restoreFocus(overlay);
      return;
    }

    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    // Inside an open shadow root document.activeElement is the host, not the
    // focused control; read the root's activeElement so trap math is correct.
    var active = getActiveElementWithin(shadow && shadow.root);

    if (!overlay.contains(active)) {
      e.preventDefault();
      restoreFocus(first);
      return;
    }

    if (e.shiftKey && active === first) {
      e.preventDefault();
      restoreFocus(last);
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      restoreFocus(first);
    }
  }

  function lockBodyScroll() {
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    prevBodyOverflow = document.body.style.overflow;
    prevBodyPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = scrollbarWidth + 'px';
    }
  }

  function unlockBodyScroll() {
    document.body.style.overflow = prevBodyOverflow;
    document.body.style.paddingRight = prevBodyPaddingRight;
  }

  function close() {
    if (isClosed) return;
    isClosed = true;
    document.removeEventListener('keydown', onKeyDown);
    overlay.removeEventListener('click', onOverlayClick);
    closeBtn.removeEventListener('click', close);
    // Fade-out animasyonu
    overlay.classList.remove('renuvex-pr-fwizard-open');
    setTimeout(function () {
      // Stop observing this root, then remove the body-level shadow host —
      // disposing the host disposes the shadow root + overlay together.
      if (shadow) {
        unregisterSpriteRoot(shadow.root);
        if (shadow.host && shadow.host.parentNode) shadow.host.parentNode.removeChild(shadow.host);
      } else if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      unlockBodyScroll();
      // Sadece klavye kaynaklı açılışlarda odağı iade et.
      if (openedByKeyboard) restoreFocus(returnFocusEl);
      try { onClose(); } catch (e) { /* sessiz */ }
    }, 200); // CSS transition süresiyle eşleşmeli
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') {
      close();
      return;
    }
    trapWizardFocus(e);
  }

  function onOverlayClick(e) {
    // Sadece backdrop'a tıklanırsa kapat — modal içine tıklamaları yoksay.
    if (e.target === overlay && allowOutsideClose) close();
  }

  // ─── Event listeners ──────────────────────────────────────────────
  document.addEventListener('keydown', onKeyDown);
  overlay.addEventListener('click', onOverlayClick);
  closeBtn.addEventListener('click', close);

  // ─── Mount ────────────────────────────────────────────────────────
  function open(initialBody) {
    returnFocusEl = getReturnFocusElement();
    openedByKeyboard = wasLastInputKeyboard();
    if (initialBody) content.appendChild(initialBody);
    // Isolate the wizard in its own body-level shadow root. Host-theme CSS
    // cannot reach inside; FWIZARD_CSS is injected into the root; sprite
    // <use> refs resolve via a mirror of the global sprite (registered below).
    // BASE_RESET_CSS mirrors the section/lightbox surfaces so the wizard gets the
    // full ADR_0011 touch contract (touch-action:manipulation + deterministic
    // :active press dip), not just the tap-highlight reset HOST_RESET_CSS carries.
    shadow = createOverlayShadowHost();
    injectShadowStyles(shadow.root, HOST_RESET_CSS + BASE_RESET_CSS + FWIZARD_CSS);
    shadow.root.appendChild(overlay);
    registerSpriteRoot(shadow.root);
    lockBodyScroll();
    // Fade-in için bir tick bekle (DOM ekleme sonrası class transition tetiklensin)
    requestAnimationFrame(function () {
      overlay.classList.add('renuvex-pr-fwizard-open');
      focusFirstWizardControl();
    });
  }

  // ─── Toast ─────────────────────────────────────────────────────────
  // Loox tarzı üst-ortada kırmızı/yeşil bildirim çubuğu.
  var toastEl = null;
  var toastTimer = null;

  function showToast(message, type) {
    type = type || 'error';
    if (toastEl) {
      try { toastEl.remove(); } catch (e) {}
      toastEl = null;
    }
    if (toastTimer) { clearTimeout(toastTimer); toastTimer = null; }

    toastEl = document.createElement('div');
    toastEl.className = 'renuvex-pr-fwizard-toast renuvex-pr-fwizard-toast--' + type;
    toastEl.textContent = message;

    // Modal kutusunun içine ekleyelim ki z-index/scroll bağlamı aynı olsun
    modal.appendChild(toastEl);

    // 4 saniye sonra kalksın
    toastTimer = setTimeout(function () {
      if (toastEl) {
        toastEl.classList.add('renuvex-pr-fwizard-toast--exit');
        setTimeout(function () {
          if (toastEl) { try { toastEl.remove(); } catch (e) {} toastEl = null; }
        }, 300);
      }
    }, 4000);
  }

  // ─── Public API ───────────────────────────────────────────────────
  return {
    open: open,
    close: close,
    // İçerik konteyneri — step'ler buraya append edilecek (Faz 2+)
    content: content,
    // Outside-click davranışını dışarıdan değiştirmek için (Faz 2+: step 2'de kapatma)
    setAllowOutsideClose: function (v) { allowOutsideClose = !!v; },
    // CSS'in step'e göre koşullu kural yazabilmesi için modal kutusuna
    // data-step attribute'u koyar. Mobil layout'ta step 1'de X butonu
    // ve progress bar görünürlüğü buna göre değişir.
    setStepAttr: function (stepNum) {
      modal.setAttribute('data-step', String(stepNum));
    },
    focusFirstControl: focusFirstWizardControl,
    showToast: showToast,
  };
}
