// product-widget/review-form-modal/steps/step-photos.js
// Step 2 — Fotoğraf yükleme (opsiyonel).
// Loox tarzı: başlık + alt başlık + çerçeveli kart + büyük "Fotoğraf Ekle"
// butonu + thumbnail önizleme. Cloudinary upload akışı review-form.js'deki
// mantıkla aynı; sadece UI wizard'a uygun.

import { PUBLIC_API_KEY, API_BASE } from '../../../core/config.js';
import { fetchWithTimeout } from '../../../core/fetch.js';

var MAX_PHOTOS = 3;
var MAX_BYTES = 5 * 1024 * 1024;

export function createStepPhotos(state, opts) {
  opts = opts || {};
  var isExiting = false; // Geçiş başladığında UI güncellemesini durdurmak için bayrak
  var sessionFingerprints = (state.get().images || []).map(function() { return ''; }); // İlk yüklenenler için placeholder
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

  var blobMap = opts.blobMap || {}; // cloudUrl -> localBlobUrl haritalaması (flaş etkisini önlemek için)

  // State'teki tüm görselleri (bitenler ve yüklenmekte olanlar) tam reaktif olarak DOM'a yansıtır
  function syncUI() {
    if (isExiting) return;

    var completed = state.get().images || [];
    var pending = state.get().pendingImages || [];
    var all = completed.map(function (u) { return { url: u, isPending: false }; })
      .concat(pending.map(function (p) { return { url: p.url, isPending: true, error: p.error } }));

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
    node.innerHTML = '<img src="' + displayUrl + '" alt="" style="width:100%; height:100%; object-fit:cover; display:block; pointer-events:none; -webkit-user-drag:none; user-select:none;">';
    
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
      if (item.url.startsWith('blob:')) {
        URL.revokeObjectURL(item.url);
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
    var isUploading = pendingCount > 0;

    if (totalCount > 0) {
      card.classList.add('ikr-fwizard-photo-card--compact');
      uploadLabel.innerHTML = PLUS_ICON;
    } else {
      card.classList.remove('ikr-fwizard-photo-card--compact');
      uploadLabel.innerHTML = PHOTO_ICON + '<span>Fotoğraf Ekle</span>';
    }

    if (isFull) {
      uploadLabel.style.display = 'none';
      fileInput.disabled = true;
    } else {
      uploadLabel.style.display = 'flex';
      fileInput.disabled = isUploading;
      uploadLabel.classList.toggle('ikr-fwizard-photo-add--disabled', isUploading);
      uploadLabel.appendChild(fileInput);
    }
  }

  fileInput.onchange = async function (e) {
    var pendingCount = (state.get().pendingImages || []).length;
    if (pendingCount > 0) return;

    var current = state.get().images || [];
    var preUploadCount = current.length;
    var remaining = MAX_PHOTOS - current.length;
    // Mevcut parmak izlerini (isim+boyut) topla (hem pending hem bitmiş olanlar)
    var existingFingerprints = (state.get().images || []).map(function(url) {
      // images array'i sadece URL tuttuğu için burada meta veriye ihtiyacımız var.
      // Basitlik için pending listesindeki File objelerinden kontrol edeceğiz.
      return ''; // Sadece URL olanlar için şimdilik boş, aşağıda geliştirilecek.
    });
    
    var pendingFiles = (state.get().pendingImages || []);
    var files = Array.from(e.target.files).slice(0, remaining);

    if (files.length === 0) return;
    var newPending = [];
    var filesToUpload = [];
    
    for (var fi = 0; fi < files.length; fi++) {
      var file = files[fi];
      var finger = file.name + '_' + file.size;
      
      // DUPLICATE KONTROLÜ: 
      // 1. Bekleyenler (pendingImages) içinde var mı?
      // 2. Bitmiş olanlar (sessionFingerprints) içinde var mı?
      // 3. Şu an seçilen yeni grupta (newPending) zaten eklendi mi?
      var isDup = pendingFiles.some(function(p) { return p.file && (p.file.name + '_' + p.file.size) === finger; }) ||
                  sessionFingerprints.some(function(f) { return f === finger; }) ||
                  newPending.some(function(n) { return (n.file.name + '_' + n.file.size) === finger; });
      
      if (isDup) {
        console.log('[ikr] Duplicate file detected, skipping:', file.name);
        continue; 
      }

      if (file.size > MAX_BYTES) {
        alert(file.name + ' dosyası 5MB sınırını aşıyor. Lütfen daha küçük bir görsel seçin.');
        continue;
      }
      var objUrl = URL.createObjectURL(file);
      newPending.push({ url: objUrl, file: file, error: null });
      filesToUpload.push({ url: objUrl, file: file });
      // Hemen parmak izini takip listesine ekle ki bir sonraki seçimde yakalansın
      sessionFingerprints.push(finger);
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
          var signRes = await fetchWithTimeout(API_BASE + '/api/public/upload/sign', { method: 'POST' });
          if (!signRes.ok) {
            if (signRes.status === 429) throw new Error('rate_limit');
            throw new Error('sign failed');
          }
          var sign = await signRes.json();
          var fd = new FormData();
          fd.append('file', f);
          fd.append('api_key', sign.api_key);
          fd.append('timestamp', sign.timestamp);
          fd.append('signature', sign.signature);
          fd.append('folder', 'review_images');

          var up = await fetch('https://api.cloudinary.com/v1_1/' + sign.cloud_name + '/image/upload', { method: 'POST', body: fd });
          var upData = await up.json();

          if (upData.secure_url) {
            // KRİTİK KONTROL: Kullanıcı bu yükleme sürerken görseli silmiş mi?
            var stillPending = (state.get().pendingImages || []).some(function(p) { return p.url === objUrl; });
            if (!stillPending) {
              console.log('[ikr] Upload finished but image was already deleted by user. Aborting state update.');
              return; 
            }

            // Flaş etkisini önlemek için yerel URL ile bulut URL'sini eşleştir
            blobMap[upData.secure_url] = objUrl;
            // sessionFingerprints'e zaten ekleme anında (onchange) ekledik, burada tekrar gerek yok
            // ama listeyi güncel tutmak için yine de kalabilir.

            var p2 = (state.get().pendingImages || []).filter(function (p) { return p.url !== objUrl; });
            var c2 = (state.get().images || []).slice();
            c2.push(upData.secure_url);
            state.set({ pendingImages: p2, images: c2 });
          }
        } catch (err) {
          console.error('[ikr] Image upload failed:', err);
          var errMsg = err.message === 'rate_limit' ? 'Çok fazla deneme. Bekleyin.' : 'Yükleme başarısız.';
          
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

    // HIZLI GEÇİŞ: Sadece ilk kez fotoğraf seçildiğinde anında sonraki adıma geç
    if (preUploadCount === 0) {
      isExiting = true; // DONDUR: Sayfa gidiyor, DOM değişimini yasakla
      var canNav = !opts.canNavigate || opts.canNavigate();
      if (canNav) state.goNext();
    }

    // Veri güncellemesini hemen yap (arka planda yükleme başlasın)
    state.set({ pendingImages: allPending });
    runUploads();

    fileInput.value = '';
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
