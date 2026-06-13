// reviews-section/review-form-modal/steps/step-author.js
// Step 4 — Hakkınızda: Ad (zorunlu) + E-posta (opsiyonel) + Gönder.
// input'lar üstte, KVKK metni ortada, büyük submit alta gizli
// (footer'daki "Sonraki" yerine submit-CTA kullanılır).
//
// TODO faz 2: email backend'e gönderilmiyor, sadece state'te tutuluyor.
// "Verified buyer" feature ile birlikte eklenecek (Prisma migration +
// /api/public/reviews payload + ikas customer-match).

import { PUBLIC_API_KEY, API_BASE } from '../../../core/config.js';
import { fetchWithTimeout } from '../../../core/fetch.js';
import { extractSlug } from '../../../core/helpers.js';
import { validateStep } from '../wizard-state.js';
import { reviewFormCopy } from '../copy.js';

var NAME_MAX = 40;

export function createStepAuthor(state, opts) {
  opts = opts || {};
  var onValidityChange = opts.onValidityChange || function () { };
  var onSuccess = opts.onSuccess || function () { };

  var root = document.createElement('div');
  root.className = 'renuvex-pr-fwizard-step renuvex-pr-fwizard-step-author';

  // Başlık
  var title = document.createElement('div');
  title.className = 'renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg';
  title.textContent = reviewFormCopy('formStepAuthorTitle');
  root.appendChild(title);

  // Form alanı
  var form = document.createElement('div');
  form.className = 'renuvex-pr-fwizard-author-form';

  // Ad — zorunlu
  var nameWrap = document.createElement('div');
  nameWrap.className = 'renuvex-pr-fwizard-field';
  var nameLabel = document.createElement('label');
  nameLabel.className = 'renuvex-pr-fwizard-label';
  nameLabel.innerHTML = 'Adınız <span class="renuvex-pr-fwizard-required" aria-hidden="true">*</span>';
  var nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'renuvex-pr-fwizard-input';
  nameInput.maxLength = NAME_MAX;
  nameInput.setAttribute('aria-required', 'true');
  nameInput.value = state.get().author || '';
  nameWrap.appendChild(nameLabel);
  nameWrap.appendChild(nameInput);
  form.appendChild(nameWrap);

  // Email — opsiyonel
  var emailWrap = document.createElement('div');
  emailWrap.className = 'renuvex-pr-fwizard-field';
  var emailLabel = document.createElement('label');
  emailLabel.className = 'renuvex-pr-fwizard-label';
  emailLabel.textContent = 'E-posta (opsiyonel)';
  var emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.className = 'renuvex-pr-fwizard-input';
  emailInput.setAttribute('autocomplete', 'email');
  emailInput.value = state.get().email || '';
  emailWrap.appendChild(emailLabel);
  emailWrap.appendChild(emailInput);
  form.appendChild(emailWrap);

  // KVKK / yayın bilgilendirmesi
  var notice = document.createElement('div');
  notice.className = 'renuvex-pr-fwizard-notice';
  notice.textContent =
    'Gönder\'e tıklayarak yorumumun ürün sayfasında herkese açık şekilde yayınlanacağını kabul ediyorum.';
  form.appendChild(notice);

  // Hata / durum mesajı
  var msg = document.createElement('div');
  msg.className = 'renuvex-pr-fwizard-msg';
  msg.setAttribute('role', 'alert');
  msg.setAttribute('aria-live', 'assertive');
  form.appendChild(msg);

  // Step içi submit butonu (footer'da Sonraki yok, submit burada)
  var submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'renuvex-pr-fwizard-submit-btn';
  submitBtn.textContent = 'Gönder';
  form.appendChild(submitBtn);

  root.appendChild(form);

  function isValid() {
    return validateStep(4, state.get());
  }

  function applySubmitDisabled() {
    var disabled = !isValid();
    var pendingCount = (state.get().pendingImages || []).length;
    var isUploading = pendingCount > 0;
    var video = state.get().videoUpload;
    var isVideoPending = !!(video && video.status !== 'ready');

    if (isUploading || isVideoPending) {
      submitBtn.disabled = true;
      submitBtn.classList.add('renuvex-pr-fwizard-submit-btn--disabled');
      submitBtn.textContent = isVideoPending ? 'Video Hazırlanıyor...' : 'Fotoğraflar Yükleniyor...';
    } else {
      submitBtn.disabled = disabled;
      submitBtn.classList.toggle('renuvex-pr-fwizard-submit-btn--disabled', disabled);
      submitBtn.textContent = 'Gönder';
    }
  }

  nameInput.addEventListener('input', function () {
    state.set({ author: nameInput.value });
    applySubmitDisabled();
    onValidityChange(isValid());
  });
  emailInput.addEventListener('input', function () {
    // Sadece state'e yaz; payload'a dahil değil (faz 2)
    state.set({ email: emailInput.value });
  });

  applySubmitDisabled();
  // Mikro-defer: footer mount edildikten sonra validity'yi bildir
  setTimeout(function () { onValidityChange(isValid()); }, 0);

  function clearMessage() {
    msg.textContent = '';
  }

  function showInlineError(message) {
    clearMessage();
    var errorEl = document.createElement('div');
    errorEl.className = 'renuvex-pr-fwizard-msg-error';
    errorEl.textContent = message || '';
    msg.appendChild(errorEl);
  }

  submitBtn.onclick = async function () {
    if (submitBtn.disabled) return;
    var s = state.get();
    var author = (s.author || '').trim();
    var comment = (s.comment || '').trim();

    // E-posta format kontrolü (Tarayıcı native uyarısını tetikler)
    if (emailInput.value.trim() && !emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    if (!author) {
      showInlineError('Gerekli alan');
      return;
    }
    if (!s.rating) {
      showInlineError('Lütfen bir yıldız seçin.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('renuvex-pr-fwizard-submit-btn--disabled');
    var originalText = submitBtn.textContent;
    submitBtn.textContent = 'Gönderiliyor…';
    clearMessage();

    // Preview modunda submit simüle et (validasyonlar geçtikten sonra)
    if (typeof window !== 'undefined' && window.__ikasPreviewMode) {
      setTimeout(function () {
        if (s.videoUpload && s.videoUpload.status === 'ready') state.set({ videoSubmitted: true });
        onSuccess();
      }, 600);
      return;
    }

    try {
      var pageSlug = extractSlug(window.location.href);
      // s.productName comes from openReviewFormModal({productName}); the old
      // document.querySelector('h1') fallback was unreliable across themes and
      // doesn't help once the wizard renders inside a shadow root.
      var submitName = s.productName || null;
      var r = await fetchWithTimeout(API_BASE + '/api/public/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: PUBLIC_API_KEY,
          productId: s.productId || null,
          slug: pageSlug || null,
          productName: submitName,
          author: author,
          title: (s.title || '').trim() || null,
          comment: comment || null,
          rating: s.rating,
          images: s.videoUpload ? [] : (s.images || []),
          videoToken: s.videoUpload && s.videoUpload.status === 'ready' ? s.videoUpload.token : null,
          // NOT: email payload'a eklenmedi — faz 2 (verified buyer)
        }),
      }, 15000);
      if (r.ok) {
        if (s.videoUpload && s.videoUpload.status === 'ready') state.set({ videoSubmitted: true });
        onSuccess();
      } else {
        var err = await r.json().catch(function () { return {}; });
        throw new Error(err.error || 'Yorum kaydedilemedi.');
      }
    } catch (e) {
      var isAbort = e && (e.name === 'AbortError' || /signal/i.test(e.message || ''));
      var msgText = isAbort
        ? 'Bağlantı yavaş, lütfen tekrar deneyin.'
        : (e.message || 'Yorum gönderilemedi.');
      // Backend hataları tek kanal: sadece toast (inline ile çift mesaj önlenir)
      if (opts.showToast) {
        opts.showToast(msgText, 'error');
      } else {
        showInlineError(msgText);
      }
      submitBtn.disabled = false;
      submitBtn.classList.remove('renuvex-pr-fwizard-submit-btn--disabled');
      submitBtn.textContent = originalText;
    }
  };

  var unsubscribe = state.onChange(applySubmitDisabled);

  return {
    el: root,
    destroy: function () {
      submitBtn.onclick = null;
      if (unsubscribe) unsubscribe();
    },
  };
}
