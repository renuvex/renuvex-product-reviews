// reviews-section/review-form-modal/steps/step-photos.js
// Step 2 — Fotoğraf yükleme (opsiyonel).
// Başlık + alt başlık + çerçeveli kart + büyük "Fotoğraf Ekle"
// butonu + thumbnail önizleme. AWS upload akışı wizard içinde izole.

import { PUBLIC_API_KEY, API_BASE } from '../../../core/config.js';
import { fetchWithTimeout } from '../../../core/fetch.js';
import { iconUseSvg, iconUseNode } from '../../../icons/star-sprite.js';
import { PHOTO_ICON, PLUS_ICON, UI_CLOSE } from '../../../icons/index.js';
import { reviewFormCopy } from '../copy.js';

export var MAX_PHOTOS = 3;
var MAX_BYTES = 10 * 1024 * 1024;

export function createStepPhotos(state, opts) {
  opts = opts || {};
  var isExiting = false; // Geçiş başladığında UI güncellemesini durdurmak için bayrak
  var hideAddButton = opts.hideAddButton === true;
  var revealAddButtonAfterMedia = opts.revealAddButtonAfterMedia === true;
  var ownsAddButton = !hideAddButton || revealAddButtonAfterMedia;
  var root = document.createElement('div');
  root.className = 'renuvex-pr-fwizard-step renuvex-pr-fwizard-step-photos';

  // Başlık
  if (!opts.hideHeading) {
    var title = document.createElement('div');
    title.className = 'renuvex-pr-fwizard-step-title renuvex-pr-fwizard-step-title--lg';
    title.textContent = reviewFormCopy('formStepPhotosTitle');
    root.appendChild(title);

  // Alt başlık
    var subtitle = document.createElement('div');
    subtitle.className = 'renuvex-pr-fwizard-step-subtitle';
    subtitle.textContent = reviewFormCopy('formStepPhotosSubtitle');
    root.appendChild(subtitle);
  }

  // Çerçeveli kart — upload butonu ve önizlemeler burada
  var card = document.createElement('div');
  card.className = 'renuvex-pr-fwizard-photo-card';
  if (opts.embeddedMedia) card.classList.add('renuvex-pr-fwizard-photo-card--embedded');

  // Upload button + hidden file input: button keeps keyboard semantics,
  // file input keeps the native picker contract.
  var uploadLabel = document.createElement('button');
  uploadLabel.type = 'button';
  uploadLabel.className = 'renuvex-pr-fwizard-photo-add';
  uploadLabel.setAttribute('aria-label', 'Fotoğraf ekle');
  // Button content (icon + label, and the compact "+" swap) is owned by
  // updateAddButton(), which syncUI() invokes synchronously below before the
  // element is shown — single source of truth, so no inline markup here.

  var fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.multiple = true;
  fileInput.style.display = 'none';
  if (ownsAddButton) card.appendChild(uploadLabel);
  card.appendChild(fileInput);

  // Önizleme listesi
  var previews = document.createElement('div');
  previews.className = 'renuvex-pr-fwizard-photo-previews';
  previews.setAttribute('aria-live', 'polite');
  card.appendChild(previews);

  root.appendChild(card);

  var revokeBlobUrl = opts.revokeBlobUrl || function (url) {
    if (url && typeof url === 'string' && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  };

  var blobMap = opts.blobMap || {}; // cloudUrl -> localBlobUrl haritalaması (flaş etkisini önlemek için)
  var urlToFinger = opts.urlToFinger || {}; // blobUrl veya cloudUrl -> parmak izi (silme anında fingerprint kaldırmak için)

  // State'teki tüm görselleri (bitenler ve yüklenmekte olanlar) tam reaktif olarak DOM'a yansıtır
  function imageItemKey(value) {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') return value.uploadSessionId || value.assetId || value.objectKey || value.previewUrl || '';
    return '';
  }

  function imageItemDisplayUrl(value) {
    if (typeof value === 'string') return blobMap[value] || value;
    if (value && typeof value === 'object') {
      var key = imageItemKey(value);
      return blobMap[key] || value.previewUrl || '';
    }
    return '';
  }

  function bufferToBase64(buffer) {
    var bytes = new Uint8Array(buffer);
    var binary = '';
    for (var i = 0; i < bytes.length; i += 0x8000) {
      var chunk = bytes.subarray(i, i + 0x8000);
      binary += String.fromCharCode.apply(null, Array.prototype.slice.call(chunk));
    }
    return btoa(binary);
  }

  async function fileSha256Base64(file) {
    if (!window.crypto || !window.crypto.subtle) throw new Error('checksum_unavailable');
    return bufferToBase64(await window.crypto.subtle.digest('SHA-256', await file.arrayBuffer()));
  }

  function syncUI() {
    if (isExiting) return;

    var completed = state.get().images || [];
    var pending = state.get().pendingImages || [];
    var all = completed.map(function (u) { return { url: imageItemKey(u), image: u, isPending: false }; })
      .concat(pending.map(function (p) { return { url: p.url, file: p.file, isPending: true, error: p.error }; }));

    // Tam temizlik ve yeniden çizim — Index kaymalarını ve kırık ikonları kökten çözer.
    // blobMap sayesinde "flash" etkisi oluşmaz.
    previews.innerHTML = '';

    all.forEach(function (item) {
      var displayUrl = item.image ? imageItemDisplayUrl(item.image) : (blobMap[item.url] || item.url);
      var node = createThumbNode(item, displayUrl);
      previews.appendChild(node);
    });

    updateAddButton();
  }

  function createThumbNode(item, displayUrl) {
    var node = document.createElement('div');
    node.className = 'renuvex-pr-fwizard-photo-thumb';

    var img = document.createElement('img');
    img.src = displayUrl;
    img.alt = '';
    img.style.cssText = 'width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;';
    node.appendChild(img);

    var overlay = document.createElement('div');
    overlay.className = 'renuvex-pr-fwizard-photo-loading';
    overlay.style.display = 'none';
    node.appendChild(overlay);

    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'renuvex-pr-fwizard-photo-remove';
    removeBtn.setAttribute('aria-label', 'Kaldır');
    var removeIcon = iconUseNode(UI_CLOSE);
    if (removeIcon) removeBtn.appendChild(removeIcon);
    node.appendChild(removeBtn);

    updateThumbNode(node, item, displayUrl);
    return node;
  }

  function updateThumbNode(node, item, displayUrl) {
    var img = node.querySelector('img');
    if (img.src !== displayUrl) {
      img.src = displayUrl;
    }

    var overlay = node.querySelector('.renuvex-pr-fwizard-photo-loading');
    if (item.isPending && item.error) {
      overlay.style.display = 'flex';
      overlay.textContent = '';
      var errorEl = document.createElement('span');
      errorEl.className = 'renuvex-pr-upload-error';
      errorEl.textContent = '✗ ' + item.error;
      overlay.appendChild(errorEl);
    } else {
      overlay.style.display = 'none';
      overlay.textContent = '';
    }

    var removeBtn = node.querySelector('.renuvex-pr-fwizard-photo-remove');
    removeBtn.onclick = function () {
      // urlToFinger haritasından bak (hem blob hem cloud URL'ler kayıtlı)
      // item.file fallback olarak kalır (ekstra güvence)
      var finger = urlToFinger[item.url] || (item.file ? (item.file.name + '_' + item.file.size) : null);
      var mappedBlobUrl = blobMap[item.url];
      var patch = {};

      // Parmak izini silsin (persistence hafızadan çıkar)
      if (finger) {
        patch.fingerprints = (state.get().fingerprints || []).filter(function (f) { return f !== finger; });
      }

      if (item.isPending) {
        patch.pendingImages = (state.get().pendingImages || []).filter(function (x) { return x.url !== item.url; });
      } else {
        patch.images = (state.get().images || []).filter(function (x) { return imageItemKey(x) !== item.url; });
      }

      state.set(patch);
      revokeBlobUrl(item.url);
      revokeBlobUrl(mappedBlobUrl);
      delete urlToFinger[item.url];
      if (mappedBlobUrl) delete urlToFinger[mappedBlobUrl];
      if (blobMap[item.url]) delete blobMap[item.url];
    };
  }

  function updateAddButton() {
    var completedCount = (state.get().images || []).length;
    var pendingCount = (state.get().pendingImages || []).length;
    var totalCount = completedCount + pendingCount;
    var isFull = totalCount >= MAX_PHOTOS;

    card.classList.toggle('renuvex-pr-fwizard-photo-card--compact', totalCount > 0);

    if (ownsAddButton) {
      uploadLabel.innerHTML = totalCount > 0
        ? iconUseSvg(PLUS_ICON)
        : iconUseSvg(PHOTO_ICON) + '<span>Fotoğraf Ekle</span>';
    }

    if (isFull) {
      if (ownsAddButton) uploadLabel.style.display = 'none';
      uploadLabel.disabled = true;
      fileInput.disabled = true;
    } else {
      // Üst sınıra ulaşılmadığı sürece buton her zaman aktif — kullanıcı
      // mevcut yüklemelerin bitmesini beklemeden yeni foto seçebilir.
      // Paralel yüklemeler pendingImages içinde bağımsız izleniyor.
      if (ownsAddButton) {
        uploadLabel.style.display = revealAddButtonAfterMedia && totalCount === 0 ? 'none' : 'flex';
      }
      uploadLabel.disabled = false;
      fileInput.disabled = false;
      uploadLabel.classList.remove('renuvex-pr-fwizard-photo-add--disabled');
    }
  }

  uploadLabel.addEventListener('click', function () {
    if (fileInput.disabled) return;
    fileInput.click();
  });

  fileInput.onchange = async function (e) {
    // Dosyaları HEMEN oku — value temizlenmeden önce.
    // Bazı tarayıcılarda value='' ataması e.target.files'ı boşaltır.
    // Üst sınır hem tamamlanan hem de bekleyen yüklemeleri kapsar — paralel
    // yüklemelerde toplam MAX_PHOTOS'u aşmamak için.
    var existingTotal = (state.get().images || []).length + (state.get().pendingImages || []).length;
    var files = Array.from(e.target.files).slice(0, MAX_PHOTOS - existingTotal);

    // Her seçimden sonra input'u temizle — aynı dosyanın tekrar seçilmesini sağlar.
    fileInput.value = '';

    // Mevcut foto sayılarını sonradan kullanmak için snapshot — hızlı geçiş
    // kararı bu değerlere bakar (önce HİÇ foto yoksa atlat).
    var pendingBefore = (state.get().pendingImages || []).length;
    var current = state.get().images || [];
    var preUploadCount = current.length;

    if (files.length === 0) return;
    var newPending = [];
    var filesToUpload = [];

    for (var fi = 0; fi < files.length; fi++) {
      var file = files[fi];
      var finger = file.name + '_' + file.size;

      // DUPLICATE KONTROLÜ: 
      // 1. Bekleyenler (pendingImages) içinde var mı?
      // 2. Hafızadaki parmak izleri (fingerprints) içinde var mı?
      // 3. Şu an seçilen yeni grupta (newPending) zaten eklendi mi?
      var isDup = (state.get().fingerprints || []).some(function (f) { return f === finger; }) ||
        newPending.some(function (n) { return (n.file.name + '_' + n.file.size) === finger; });

      if (isDup) {
        continue;
      }

      if (file.size > MAX_BYTES) {
        var sizeMsg = '10MB\'dan daha büyük fotoğrafları yükleyemezsin.';
        if (opts.showToast) opts.showToast(sizeMsg, 'error');
        else alert(sizeMsg);
        continue;
      }
      if (['image/jpeg', 'image/png', 'image/webp'].indexOf(file.type) === -1) {
        var typeMsg = 'Sadece JPG, PNG veya WebP fotograf yukleyebilirsin.';
        if (opts.showToast) opts.showToast(typeMsg, 'error');
        else alert(typeMsg);
        continue;
      }
      var objUrl = URL.createObjectURL(file);
      urlToFinger[objUrl] = finger; // blob URL → parmak izi (silme anında fingerprint kaldırabilmek için)
      newPending.push({ url: objUrl, file: file, error: null });
      filesToUpload.push({ url: objUrl, file: file });
      // Hemen parmak izini global hafızaya ekle
      var currentFings = (state.get().fingerprints || []).slice();
      currentFings.push(finger);
      state.set({ fingerprints: currentFings });
    }

    if (newPending.length === 0) return;

    var allPending = (state.get().pendingImages || []).concat(newPending);

    // Yükleme fonksiyonu (Döngüyü buraya alıyoruz ki erteleyebilelim)
    var runUploads = async function () {
      for (var i = 0; i < filesToUpload.length; i++) {
        var item = filesToUpload[i];
        var f = item.file;
        var objUrl = item.url;

        if (typeof window !== 'undefined' && window.__ikasPreviewMode) {
          var p1 = (state.get().pendingImages || []).filter(function (p) { return p.url !== objUrl; });
          var c1 = (state.get().images || []).slice();
          c1.push(objUrl);
          state.set({ pendingImages: p1, images: c1 });
          continue;
        }

        try {
          var checksumSha256 = await fileSha256Base64(f);
          var signRes = await fetchWithTimeout(API_BASE + '/api/public/upload/sign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              storeId: PUBLIC_API_KEY,
              fileName: f.name || 'review-image',
              contentType: f.type,
              bytes: f.size,
              checksumAlgorithm: 'SHA256',
              checksumSha256: checksumSha256,
            }),
          });
          if (!signRes.ok) {
            if (signRes.status === 429) throw new Error('rate_limit');
            throw new Error('sign failed');
          }
          var sign = await signRes.json();
          if (sign.provider === 'aws_s3') {
            if (!sign.uploadUrl || !sign.fields || !sign.assetId || !sign.uploadSessionId || !sign.objectKey) throw new Error('sign fields missing');
            var awsFd = new FormData();
            Object.keys(sign.fields).forEach(function (key) {
              awsFd.append(key, sign.fields[key]);
            });
            awsFd.append('file', f);
            var awsUpload = await fetch(sign.uploadUrl, { method: 'POST', body: awsFd });
            if (awsUpload.status !== 204) throw new Error('upload failed');
            var stillPendingAws = (state.get().pendingImages || []).some(function (p) { return p.url === objUrl; });
            if (!stillPendingAws) continue;
            var imageRef = {
              provider: 'aws_s3',
              assetId: sign.assetId,
              uploadSessionId: sign.uploadSessionId,
              objectKey: sign.objectKey,
              contentType: f.type,
              bytes: f.size,
              checksumAlgorithm: 'SHA256',
              checksumSha256: checksumSha256,
              previewUrl: objUrl,
            };
            var regRes = await fetchWithTimeout(API_BASE + '/api/public/upload/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                storeId: PUBLIC_API_KEY,
                provider: 'aws_s3',
                assetId: imageRef.assetId,
                uploadSessionId: imageRef.uploadSessionId,
                objectKey: imageRef.objectKey,
                contentType: imageRef.contentType,
                bytes: imageRef.bytes,
                checksumAlgorithm: imageRef.checksumAlgorithm,
                checksumSha256: imageRef.checksumSha256,
              }),
            });
            if (!regRes.ok) throw new Error('register failed');
            var key = imageItemKey(imageRef);
            blobMap[key] = objUrl;
            urlToFinger[key] = urlToFinger[objUrl];
            var pAws = (state.get().pendingImages || []).filter(function (p) { return p.url !== objUrl; });
            var cAws = (state.get().images || []).slice();
            cAws.push(imageRef);
            state.set({ pendingImages: pAws, images: cAws });
            continue;
          }
          throw new Error('unsupported image provider');
        } catch (err) {
          console.error('[renuvex-pr] Image upload failed:', err);
          var errMsg = err.message === 'rate_limit' ? 'Çok fazla deneme. Bekleyin.' : 'Yükleme başarısız.';

          if (opts.showToast) {
            opts.showToast(errMsg, 'error');
          }

          // Hata durumunda da eğer blob ise temizle (isteğe bağlı, ama genelde kalması zarar vermez)
          // Ancak burada kullanıcı hala "X" basıp silebilir, o yüzden silme anında temizlemek daha güvenli.

          var pErr = (state.get().pendingImages || []).map(function (p) {
            if (p.url === objUrl) {
              return { url: p.url, file: p.file, error: errMsg };
            }
            return p;
          });
          state.set({ pendingImages: pErr });
        }
      }
    };

    // HIZLI GEÇİŞ: Sadece adımda hiç foto yokken (ne tamamlanmış ne bekleyen)
    // ilk seçimde sonraki adıma atlat. Kullanıcı adım 3'e atladıktan sonra
    // geri gelip ek foto eklerse manuel akışta kalsın — beklenmedik atlama
    // yapmasın.
    if (preUploadCount === 0 && pendingBefore === 0) {
      isExiting = true; // DONDUR: Sayfa gidiyor, DOM değişimini yasakla
      var canNav = !opts.canNavigate || opts.canNavigate();
      if (canNav) state.goNext();
    }

    // Veri güncellemesini hemen yap (arka planda yükleme başlasın)
    state.set({ pendingImages: allPending });
    runUploads();
  };

  var unsubscribe = state.onChange(syncUI);
  syncUI();

  return {
    el: root,
    openPicker: function () {
      if (!fileInput.disabled) fileInput.click();
    },
    destroy: function () {
      isExiting = true; // Modal kapanırsa veya destroy olursa da koru
      fileInput.onchange = null;
      if (unsubscribe) unsubscribe();
    },
  };
}
