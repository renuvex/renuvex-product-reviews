// product-widget/review-form-modal/modal-shell.js
// Wizard modal'ın görsel kabuğu — backdrop, modal kutusu, close butonu, ESC,
// outside-click, body scroll lock. Step içeriğinden bağımsız: shell yalnızca
// "modal aç/kapat" sözleşmesini sağlar; içeriği `body` parametresiyle alır.
//
// Bağımsızlık: Mevcut review-modal'a hiçbir bağımlılık yok. Class'lar
// 'ikr-fwizard-' prefix'iyle izole.

export function createWizardShell(opts) {
  var onClose = opts && opts.onClose ? opts.onClose : function () {};
  // Faz 2+'da step ilerlerken outside-click davranışı değişebilir.
  // Şimdilik basit: dış tıklama her zaman kapatır.
  var allowOutsideClose = opts && opts.allowOutsideClose !== false;

  // ─── DOM ──────────────────────────────────────────────────────────
  var overlay = document.createElement('div');
  overlay.className = 'ikr-fwizard-overlay';
  overlay.tabIndex = -1;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Yorum yapma formu');

  var modal = document.createElement('div');
  modal.className = 'ikr-fwizard';
  overlay.appendChild(modal);

  var closeBtn = document.createElement('button');
  closeBtn.className = 'ikr-fwizard-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.innerHTML =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<line x1="18" y1="6" x2="6" y2="18"></line>' +
    '<line x1="6" y1="6" x2="18" y2="18"></line>' +
    '</svg>';
  modal.appendChild(closeBtn);

  var content = document.createElement('div');
  content.className = 'ikr-fwizard-content';
  modal.appendChild(content);

  // ─── State & cleanup ──────────────────────────────────────────────
  var isClosed = false;
  var returnFocusEl = null;
  var prevBodyOverflow = '';
  var prevBodyPaddingRight = '';

  function getReturnFocusElement() {
    var el = document.activeElement;
    if (!el || el === document.body || el === document.documentElement) return null;
    return el;
  }

  function restoreFocus(el) {
    if (!el || !document.contains(el) || typeof el.focus !== 'function') return;
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
    var active = document.activeElement;

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
    overlay.classList.remove('ikr-fwizard-open');
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      unlockBodyScroll();
      restoreFocus(returnFocusEl);
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
    if (initialBody) content.appendChild(initialBody);
    document.body.appendChild(overlay);
    lockBodyScroll();
    // Fade-in için bir tick bekle (DOM ekleme sonrası class transition tetiklensin)
    requestAnimationFrame(function () {
      overlay.classList.add('ikr-fwizard-open');
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
    toastEl.className = 'ikr-fwizard-toast ikr-fwizard-toast--' + type;
    toastEl.textContent = message;

    // Modal kutusunun içine ekleyelim ki z-index/scroll bağlamı aynı olsun
    modal.appendChild(toastEl);

    // 4 saniye sonra kalksın
    toastTimer = setTimeout(function () {
      if (toastEl) {
        toastEl.classList.add('ikr-fwizard-toast--exit');
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
