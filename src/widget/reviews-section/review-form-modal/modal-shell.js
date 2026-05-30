// reviews-section/review-form-modal/modal-shell.js
// Wizard modal'ın görsel kabuğu — backdrop, modal kutusu, close butonu, ESC,
// outside-click, body scroll lock. Step içeriğinden bağımsız: shell yalnızca
// "modal aç/kapat" sözleşmesini sağlar; içeriği `body` parametresiyle alır.
//
// Bağımsızlık: Mevcut review-modal'a hiçbir bağımlılık yok. Class'lar
// 'renuvex-pr-fwizard-' prefix'iyle izole.

import { wasLastInputKeyboard } from '../../shared/input-modality.js';
import { iconUseNode, registerSpriteRoot, unregisterSpriteRoot } from '../../icons/star-sprite.js';
import { UI_CLOSE } from '../../icons/index.js';
import { createOverlayShadowHost, injectShadowStyles, HOST_RESET_CSS } from '../../core/shadow.js';
import { BASE_RESET_CSS } from '../../shared/base-reset.js';
import { lockBodyScroll, restoreBodyScroll } from '../../core/body-scroll-lock.js';
import { getReturnFocusElement, restoreFocus, focusFirst, trapFocus } from '../../shared/focus-trap.js';
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
  var closeIcon = iconUseNode(UI_CLOSE);
  if (closeIcon) closeBtn.appendChild(closeIcon);
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

  // Wizard-specific focus entry: prefer the first STEP control (inside `content`)
  // over the close button, falling back to the overlay. Delegates to the shared
  // focus-trap module so the toolkit is not duplicated.
  function focusFirstWizardControl() {
    focusFirst(content, overlay);
  }

  function trapWizardFocus(e) {
    trapFocus(e, overlay, shadow && shadow.root);
  }

  function close() {
    if (isClosed) return;
    isClosed = true;
    document.removeEventListener('keydown', onKeyDown);
    overlay.removeEventListener('click', onOverlayClick);
    closeBtn.removeEventListener('click', close);
    // Move focus out NOW (not after the fade) so the closing modal does not show a
    // lingering focus ring on the active control during the 200ms fade-out. Keyboard
    // opens return focus to the trigger; pointer opens just blur the active control
    // (no sticky focus on the trigger for mouse/touch).
    if (openedByKeyboard) {
      restoreFocus(returnFocusEl);
    } else {
      var activeInShadow = shadow && shadow.root ? shadow.root.activeElement : null;
      if (activeInShadow && typeof activeInShadow.blur === 'function') {
        try { activeInShadow.blur(); } catch (_) {}
      }
    }
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
      restoreBodyScroll();
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
