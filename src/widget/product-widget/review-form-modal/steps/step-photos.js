// product-widget/review-form-modal/steps/step-photos.js
// Step 2 — Fotoğraf yükleme (opsiyonel).
// Loox tarzı: başlık + alt başlık + çerçeveli kart + büyük "Fotoğraf Ekle"
// butonu + thumbnail önizleme. Cloudinary upload akışı review-form.js'deki
// mantıkla aynı; sadece UI wizard'a uygun.

import { PUBLIC_API_KEY, API_BASE } from '../../../core/config.js';
import { fetchWithTimeout } from '../../../core/fetch.js';

var MAX_PHOTOS = 3;
var MAX_BYTES = 5 * 1024 * 1024;

export function createStepPhotos(state) {
  var root = document.createElement('div');
  root.className = 'ikr-fwizard-step ikr-fwizard-step-photos';

  // Başlık
  var title = document.createElement('div');
  title.className = 'ikr-fwizard-step-title ikr-fwizard-step-title--lg';
  title.textContent = 'Fotoğraflı değerlendirme';
  root.appendChild(title);

  // Alt başlık
  var subtitle = document.createElement('div');
  subtitle.className = 'ikr-fwizard-step-subtitle';
  subtitle.textContent = 'Fotoğraf ekleyebilirsiniz.';
  root.appendChild(subtitle);

  // Çerçeveli kart — upload butonu ve önizlemeler burada
  var card = document.createElement('div');
  card.className = 'ikr-fwizard-photo-card';

  // Upload butonu (label + gizli file input)
  var uploadLabel = document.createElement('label');
  uploadLabel.className = 'ikr-fwizard-photo-add';
  uploadLabel.setAttribute('aria-label', 'Fotoğraf ekle');
  uploadLabel.innerHTML =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>' +
    '<circle cx="8.5" cy="8.5" r="1.5"/>' +
    '<polyline points="21 15 16 10 5 21"/>' +
    '</svg>' +
    '<span>Fotoğraf Ekle</span>';

  var fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.multiple = true;
  fileInput.style.display = 'none';
  uploadLabel.appendChild(fileInput);
  card.appendChild(uploadLabel);

  // Önizleme listesi
  var previews = document.createElement('div');
  previews.className = 'ikr-fwizard-photo-previews';
  previews.setAttribute('aria-live', 'polite');
  card.appendChild(previews);

  root.appendChild(card);

  var isUploading = false;

  // State'te zaten foto varsa (geri-ileri gezintide) yeniden render et
  function rehydrate() {
    var existing = state.get().images || [];
    existing.forEach(function (url) {
      addThumb(url);
    });
    updateAddButton();
  }

  function updateAddButton() {
    var count = (state.get().images || []).length;
    if (count >= MAX_PHOTOS) {
      fileInput.disabled = true;
      uploadLabel.classList.add('ikr-fwizard-photo-add--disabled');
    } else {
      fileInput.disabled = false;
      uploadLabel.classList.remove('ikr-fwizard-photo-add--disabled');
    }
  }

  function addThumb(url) {
    var item = document.createElement('div');
    item.className = 'ikr-fwizard-photo-thumb';
    item.innerHTML = '<img src="' + url + '" alt="">';

    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'ikr-fwizard-photo-remove';
    removeBtn.setAttribute('aria-label', 'Fotoğrafı kaldır');
    removeBtn.innerHTML = '&#x2715;';
    removeBtn.onclick = function () {
      var imgs = (state.get().images || []).filter(function (u) { return u !== url; });
      state.set({ images: imgs });
      item.remove();
      updateAddButton();
    };
    item.appendChild(removeBtn);
    previews.appendChild(item);
  }

  function addPendingThumb(objUrl) {
    var item = document.createElement('div');
    item.className = 'ikr-fwizard-photo-thumb';
    item.innerHTML =
      '<img src="' + objUrl + '" alt="">' +
      '<div class="ikr-fwizard-photo-loading"><div class="ikr-spinner"></div></div>';
    previews.appendChild(item);
    return item;
  }

  fileInput.onchange = async function (e) {
    if (isUploading) return;
    isUploading = true;
    fileInput.disabled = true;

    var current = state.get().images || [];
    var remaining = MAX_PHOTOS - current.length;
    var files = Array.from(e.target.files).slice(0, remaining);

    for (var fi = 0; fi < files.length; fi++) {
      var file = files[fi];
      if (file.size > MAX_BYTES) {
        alert(file.name + ' dosyası 5MB sınırını aşıyor. Lütfen daha küçük bir görsel seçin.');
        continue;
      }
      var objUrl = URL.createObjectURL(file);
      var item = addPendingThumb(objUrl);
      var loadingEl = item.querySelector('.ikr-fwizard-photo-loading');

      // Preview modunda upload simüle et — gerçek Cloudinary isteği yok
      if (typeof window !== 'undefined' && window.__ikasPreviewMode) {
        var imgs = (state.get().images || []).slice();
        imgs.push(objUrl);
        state.set({ images: imgs });
        finalizeThumb(item, loadingEl, objUrl);
        continue;
      }

      try {
        var signRes = await fetchWithTimeout(API_BASE + '/api/public/upload/sign', { method: 'POST' });
        if (!signRes.ok) {
          if (signRes.status === 429) throw new Error('rate_limit');
          throw new Error('sign failed');
        }
        var sign = await signRes.json();
        var fd = new FormData();
        fd.append('file', file);
        fd.append('api_key', sign.api_key);
        fd.append('timestamp', sign.timestamp);
        fd.append('signature', sign.signature);
        fd.append('folder', 'review_images');
        var up = await fetch('https://api.cloudinary.com/v1_1/' + sign.cloud_name + '/image/upload', { method: 'POST', body: fd });
        var upData = await up.json();
        if (upData.secure_url) {
          var url = upData.secure_url;
          var imgs2 = (state.get().images || []).slice();
          imgs2.push(url);
          state.set({ images: imgs2 });
          finalizeThumb(item, loadingEl, url);
        }
      } catch (err) {
        console.error('[ikr] Image upload failed:', err);
        var errMsg = err.message === 'rate_limit'
          ? 'Çok fazla deneme. Lütfen bekleyin.'
          : 'Yükleme başarısız.';
        loadingEl.innerHTML = '<span class="ikr-upload-error">✗ ' + errMsg + '</span>';
      }
    }

    isUploading = false;
    fileInput.value = '';
    updateAddButton();

    // Auto-advance: Yükleme bittiyse ve en az bir foto varsa otomatik geç
    var finalImages = state.get().images || [];
    if (finalImages.length > 0) {
      setTimeout(function() {
        state.goNext();
      }, 1000); // 1 sn bekle ki "tik" işaretini görsün
    }
  };

  function finalizeThumb(item, loadingEl, finalUrl) {
    loadingEl.innerHTML = '<span class="ikr-upload-check">✓</span>';
    setTimeout(function () {
      loadingEl.style.opacity = '0';
      loadingEl.style.transition = 'opacity 0.4s';
      setTimeout(function () {
        loadingEl.style.display = 'none';
        var removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'ikr-fwizard-photo-remove';
        removeBtn.setAttribute('aria-label', 'Fotoğrafı kaldır');
        removeBtn.innerHTML = '&#x2715;';
        removeBtn.onclick = function () {
          var imgs = (state.get().images || []).filter(function (u) { return u !== finalUrl; });
          state.set({ images: imgs });
          item.remove();
          updateAddButton();
        };
        item.appendChild(removeBtn);
      }, 400);
    }, 600);
    updateAddButton();
  }

  rehydrate();

  return {
    el: root,
    destroy: function () {
      fileInput.onchange = null;
    },
  };
}
