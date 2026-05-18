// product-widget/review-form-modal/steps/step-photos.js
// Step 2 — Fotoğraf yükleme (opsiyonel).
// Başlık + alt başlık + çerçeveli kart + büyük "Fotoğraf Ekle"
// butonu + thumbnail önizleme. Cloudinary upload akışı wizard içinde izole.

import { PUBLIC_API_KEY, API_BASE } from '../../../core/config.js';
import { fetchWithTimeout } from '../../../core/fetch.js';
import { isTrustedReviewImageUrl } from '../../../core/helpers.js';

var MAX_PHOTOS = 3;
var MAX_BYTES = 10 * 1024 * 1024;

export function createStepPhotos(state, opts) {
  opts = opts || {};
  var isExiting = false; // Geçiş başladığında UI güncellemesini durdurmak için bayrak
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

  // Upload button + hidden file input: button keeps keyboard semantics,
  // file input keeps the native picker contract.
  var uploadLabel = document.createElement('button');
  uploadLabel.type = 'button';
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
  card.appendChild(uploadLabel);
  card.appendChild(fileInput);

  // Önizleme listesi
  var previews = document.createElement('div');
  previews.className = 'ikr-fwizard-photo-previews';
  previews.setAttribute('aria-live', 'polite');
  card.appendChild(previews);

  root.appendChild(card);

  var blobMap = opts.blobMap || {}; // cloudUrl -> localBlobUrl haritalaması (flaş etkisini önlemek için)
  var urlToFinger = opts.urlToFinger || {}; // blobUrl veya cloudUrl -> parmak izi (silme anında fingerprint kaldırmak için)

  // State'teki tüm görselleri (bitenler ve yüklenmekte olanlar) tam reaktif olarak DOM'a yansıtır
  function syncUI() {
    if (isExiting) return;

    var completed = state.get().images || [];
    var pending = state.get().pendingImages || [];
    var all = completed.map(function (u) { return { url: u, isPending: false }; })
      .concat(pending.map(function (p) { return { url: p.url, file: p.file, isPending: true, error: p.error }; }));

    // Tam temizlik ve yeniden çizim — Index kaymalarını ve kırık ikonları kökten çözer.
    // blobMap sayesinde "flash" etkisi oluşmaz.
    previews.innerHTML = '';

    all.forEach(function (item) {
      var displayUrl = blobMap[item.url] || item.url;
      var node = createThumbNode(item, displayUrl);
      previews.appendChild(node);
    });

    updateAddButton();
  }

  function createThumbNode(item, displayUrl) {
    var node = document.createElement('div');
    node.className = 'ikr-fwizard-photo-thumb';

    var img = document.createElement('img');
    img.src = displayUrl;
    img.alt = '';
    img.style.cssText = 'width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;';
    node.appendChild(img);

    var overlay = document.createElement('div');
    overlay.className = 'ikr-fwizard-photo-loading';
    overlay.style.display = 'none';
    node.appendChild(overlay);

    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'ikr-fwizard-photo-remove';
    removeBtn.innerHTML = '&#x2715;';
    node.appendChild(removeBtn);

    updateThumbNode(node, item, displayUrl);
    return node;
  }

  function updateThumbNode(node, item, displayUrl) {
    var img = node.querySelector('img');
    if (img.src !== displayUrl) {
      img.src = displayUrl;
    }

    var overlay = node.querySelector('.ikr-fwizard-photo-loading');
    if (item.isPending && item.error) {
      overlay.style.display = 'flex';
      overlay.innerHTML = '<span class="ikr-upload-error">✗ ' + item.error + '</span>';
    } else {
      overlay.style.display = 'none';
    }

    var removeBtn = node.querySelector('.ikr-fwizard-photo-remove');
    removeBtn.onclick = function () {
      // urlToFinger haritasından bak (hem blob hem cloud URL'ler kayıtlı)
      // item.file fallback olarak kalır (ekstra güvence)
      var finger = urlToFinger[item.url] || (item.file ? (item.file.name + '_' + item.file.size) : null);
      if (item.url.startsWith('blob:')) {
        URL.revokeObjectURL(item.url);
      }

      // Parmak izini silsin (persistence hafızadan çıkar)
      if (finger) {
        var fings = (state.get().fingerprints || []).filter(function (f) { return f !== finger; });
        state.set({ fingerprints: fings });
      }

      if (item.isPending) {
        var p = (state.get().pendingImages || []).filter(function (x) { return x.url !== item.url; });
        state.set({ pendingImages: p });
      } else {
        var imgs = (state.get().images || []).filter(function (x) { return x !== item.url; });
        state.set({ images: imgs });
      }
    };
  }

  var PHOTO_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>';
  var PLUS_ICON = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';

  function updateAddButton() {
    var completedCount = (state.get().images || []).length;
    var pendingCount = (state.get().pendingImages || []).length;
    var totalCount = completedCount + pendingCount;
    var isFull = totalCount >= MAX_PHOTOS;

    if (totalCount > 0) {
      card.classList.add('ikr-fwizard-photo-card--compact');
      uploadLabel.innerHTML = PLUS_ICON;
    } else {
      card.classList.remove('ikr-fwizard-photo-card--compact');
      uploadLabel.innerHTML = PHOTO_ICON + '<span>Fotoğraf Ekle</span>';
    }

    if (isFull) {
      uploadLabel.style.display = 'none';
      uploadLabel.disabled = true;
      fileInput.disabled = true;
    } else {
      // Üst sınıra ulaşılmadığı sürece buton her zaman aktif — kullanıcı
      // mevcut yüklemelerin bitmesini beklemeden yeni foto seçebilir.
      // Paralel yüklemeler pendingImages içinde bağımsız izleniyor.
      uploadLabel.style.display = 'flex';
      uploadLabel.disabled = false;
      fileInput.disabled = false;
      uploadLabel.classList.remove('ikr-fwizard-photo-add--disabled');
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
        console.log('[ikr] Duplicate file detected, skipping:', file.name);
        continue;
      }

      if (file.size > MAX_BYTES) {
        var sizeMsg = '10MB\'dan daha büyük fotoğrafları yükleyemezsin.';
        if (opts.showToast) opts.showToast(sizeMsg, 'error');
        else alert(sizeMsg);
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
          var signRes = await fetchWithTimeout(API_BASE + '/api/public/upload/sign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storeId: PUBLIC_API_KEY }),
          });
          if (!signRes.ok) {
            if (signRes.status === 429) throw new Error('rate_limit');
            throw new Error('sign failed');
          }
          var sign = await signRes.json();
          if (!sign.folder) throw new Error('sign folder missing');
          var fd = new FormData();
          fd.append('file', f);
          fd.append('api_key', sign.api_key);
          fd.append('timestamp', sign.timestamp);
          fd.append('signature', sign.signature);
          fd.append('folder', sign.folder);

          var up = await fetch('https://api.cloudinary.com/v1_1/' + sign.cloud_name + '/image/upload', { method: 'POST', body: fd });
          var upData = await up.json();

          if (upData.secure_url && isTrustedReviewImageUrl(upData.secure_url)) {
            // KRİTİK KONTROL: Kullanıcı bu yükleme sürerken görseli silmiş mi?
            var stillPending = (state.get().pendingImages || []).some(function (p) { return p.url === objUrl; });
            if (!stillPending) {
              console.log('[ikr] Upload finished but image was already deleted by user. Aborting state update.');
              return;
            }

            // Flaş etkisini önlemek için yerel URL ile bulut URL'sini eşleştir
            blobMap[upData.secure_url] = objUrl;
            urlToFinger[upData.secure_url] = urlToFinger[objUrl]; // cloud URL → aynı parmak izi

            var p2 = (state.get().pendingImages || []).filter(function (p) { return p.url !== objUrl; });
            var c2 = (state.get().images || []).slice();
            c2.push(upData.secure_url);
            state.set({ pendingImages: p2, images: c2 });

            // Server-side pending registry — submit edilmezse cleanup cron'u
            // bu publicId'yi 24 saat sonra Cloudinary'den siler. Submit edilirse
            // /api/public/reviews POST'u kaydı atomik olarak temizler.
            // Fire-and-forget: registry hatası upload akışını bozmaz; haftalık
            // fallback cron yine de kaçırılanı yakalar.
            try {
              fetchWithTimeout(API_BASE + '/api/public/upload/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ storeId: PUBLIC_API_KEY, secureUrl: upData.secure_url }),
              }).catch(function () { /* sessiz */ });
            } catch (_) { /* sessiz */ }
          } else {
            throw new Error('invalid image url');
          }
        } catch (err) {
          console.error('[ikr] Image upload failed:', err);
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
    destroy: function () {
      isExiting = true; // Modal kapanırsa veya destroy olursa da koru
      fileInput.onchange = null;
      if (unsubscribe) unsubscribe();
    },
  };
}
