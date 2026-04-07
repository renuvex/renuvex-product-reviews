// product-widget/review-form.js — Yorum formu (dosya upload + submit)

import { PUBLIC_API_KEY, API_BASE } from '../core/config.js';
import { fetchWithTimeout } from '../core/fetch.js';
import { renderStars } from '../core/helpers.js';
import { extractSlug } from '../core/helpers.js';

export function buildReviewForm(productId, productName) {
  var form = document.createElement('div');
  form.className = 'ikr-form';
  form.id = 'ikr-form-section';
  form.setAttribute('aria-label', 'Yorum formu');
  form.setAttribute('role', 'form');
  form.innerHTML = [
    '<div style="margin-top:0;"><label style="font-weight:600;" id="ikr-stars-label">Değerlendirme <span style="color:#dc2626;">*</span></label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>',
    '<label for="ikr-title" style="font-weight:600;margin-top:16px;display:block;">Başlık</label>',
    '<input type="text" id="ikr-title" class="ikr-input" placeholder="Kısa bir başlık ekleyin" aria-label="Yorum başlığı" maxlength="60">',
    '<label for="ikr-comment" style="font-weight:600;margin-top:16px;display:block;">Yorum</label>',
    '<textarea id="ikr-comment" class="ikr-textarea" placeholder="Deneyiminizi paylaşın..." rows="5" aria-label="Yorum" maxlength="2000"></textarea>',
    '<label for="ikr-name" style="font-weight:600;margin-top:16px;display:block;">Ad <span style="color:#dc2626;">*</span></label>',
    '<input type="text" id="ikr-name" class="ikr-input" placeholder="Adınız" aria-label="Ad" aria-required="true" maxlength="40">',
    '<div id="ikr-photo-section" style="margin-top:16px;">',
    '  <label style="font-weight:600;display:block;margin-bottom:8px;">Fotoğraf</label>',
    '  <label class="ikr-photo-btn" aria-label="Fotoğraf ekle"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg><input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Fotoğraf seç"></label>',
    '  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',
    '</div>',
    '<button id="ikr-submit" class="ikr-btn" aria-label="Gönder">Gönder</button>',
    '<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>',
  ].join('');
  var currentRating = 5;
  var uploadedImages = [];

  var starsWrap = renderStars(5, true, function(v) { currentRating = v; });
  form.querySelector('#ikr-stars-input').appendChild(starsWrap);

  var fileInput = form.querySelector('#ikr-file-input');
  var previewsDiv = form.querySelector('#ikr-photo-previews');
  var isUploading = false;

  var photoLabel = form.querySelector('label.ikr-photo-btn');
  var MAX_PHOTOS = 3;

  function updatePhotoLabel() {
    var count = uploadedImages.length;
    if (count >= MAX_PHOTOS) {
      fileInput.disabled = true;
      if (photoLabel) photoLabel.style.opacity = '0.4';
    } else {
      fileInput.disabled = false;
      if (photoLabel) photoLabel.style.opacity = '1';
    }
  }

  fileInput.onchange = async function(e) {
    if (isUploading) return;
    isUploading = true;
    fileInput.disabled = true;
    var remaining = MAX_PHOTOS - uploadedImages.length;
    var files = Array.from(e.target.files).slice(0, remaining);
    for (let fi = 0; fi < files.length; fi++) {
      let file = files[fi];
      if (file.size > 5 * 1024 * 1024) {
        alert(file.name + ' dosyası 5MB sınırını aşıyor. Lütfen daha küçük bir görsel seçin.');
        continue;
      }
      let item = document.createElement('div');
      item.className = 'ikr-preview-item';
      let objUrl = URL.createObjectURL(file);
      item.innerHTML = '<img class="ikr-preview-img" src="' + objUrl + '"><div class="ikr-preview-loading"><div class="ikr-spinner"></div></div>';
      previewsDiv.appendChild(item);
      let loadingEl = item.querySelector('.ikr-preview-loading');
      try {
        let signRes = await fetchWithTimeout(API_BASE + '/api/public/upload/sign', { method: 'POST' });
        if (!signRes.ok) throw new Error('sign failed');
        let sign = await signRes.json();
        let fd = new FormData();
        fd.append('file', file);
        fd.append('api_key', sign.api_key);
        fd.append('timestamp', sign.timestamp);
        fd.append('signature', sign.signature);
        fd.append('folder', 'review_images');
        let up = await fetch('https://api.cloudinary.com/v1_1/' + sign.cloud_name + '/image/upload', { method: 'POST', body: fd });
        let upData = await up.json();
        if (upData.secure_url) {
          let url = upData.secure_url;
          uploadedImages.push(url);
          loadingEl.innerHTML = '<span class="ikr-upload-check">✓</span>';
          setTimeout(function() {
            loadingEl.style.opacity = '0';
            loadingEl.style.transition = 'opacity 0.4s';
            setTimeout(function() {
              loadingEl.style.display = 'none';
              let removeBtn = document.createElement('button');
              removeBtn.className = 'ikr-preview-remove';
              removeBtn.innerHTML = '&#x2715;';
              removeBtn.setAttribute('aria-label', 'Fotoğrafı kaldır');
              removeBtn.onclick = function() {
                uploadedImages = uploadedImages.filter(function(u) { return u !== url; });
                item.remove();
                updatePhotoLabel();
              };
              item.appendChild(removeBtn);
            }, 400);
          }, 800);
        }
      } catch (err) {
        console.error('[ikr] Image upload failed:', err);
        loadingEl.innerHTML = '<span class="ikr-upload-error">✗</span>';
      }
    }
    isUploading = false;
    fileInput.value = '';
    updatePhotoLabel();
  };

  form.querySelector('#ikr-submit').onclick = async function() {
    var btn = this;
    var author = form.querySelector('#ikr-name').value.trim();
    var title = form.querySelector('#ikr-title').value.trim();
    var comment = form.querySelector('#ikr-comment').value.trim();
    var msgDiv = form.querySelector('#ikr-msg');
    if (!author) { msgDiv.innerHTML = '<div style="color:#dc2626;font-size:12px;margin-top:8px;">Lütfen adınızı girin.</div>'; return; }
    btn.disabled = true;
    btn.textContent = 'Gönderiliyor…';
    msgDiv.innerHTML = '';
    try {
      var pageSlug = extractSlug(window.location.href);
      var submitName = productName || (document.querySelector('h1') ? document.querySelector('h1').innerText.trim() : null);
      var r = await fetchWithTimeout(API_BASE + '/api/public/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: PUBLIC_API_KEY,
          productId: productId,
          slug: pageSlug || null,
          productName: submitName,
          author: author,
          title: title || null,
          comment: comment,
          rating: currentRating,
          images: uploadedImages,
        }),
      });
      if (r.ok) {
        form.innerHTML = '<div style="text-align:center;padding:30px 20px;"><div style="font-weight:700;font-size:14px;color:var(--ikr-color,#000);">Yorumunuz için teşekkürler!</div></div>';
      } else {
        var err = await r.json().catch(function() { return {}; });
        throw new Error(err.error || 'Yorum kaydedilemedi.');
      }
    } catch(e) {
      msgDiv.innerHTML = '<div style="color:#dc2626;font-size:12px;margin-top:8px;">' + e.message + '</div>';
      btn.disabled = false;
      btn.textContent = 'Gönder';
    }
  };

  return form;
}
