;(function () {
  'use strict';

  // publicApiKey (= merchantId) is passed via the script src URL:
  // <script src="/widget.js?publicApiKey=MERCHANT_ID" defer></script>
  const scriptTag = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf('/widget.js') !== -1) return scripts[i];
    }
    return scripts[scripts.length - 1];
  })();
  const scriptSrc = scriptTag ? scriptTag.src : '';
  const urlParams = new URLSearchParams(scriptSrc.split('?')[1] || '');
  const PUBLIC_API_KEY = urlParams.get('publicApiKey');
  const API_BASE = scriptSrc ? scriptSrc.split('?')[0].replace(/\/widget\.js$/, '') : '';

  if (!PUBLIC_API_KEY) return; // No store key — do nothing

  // ── Styles ────────────────────────────────────────────────────────────────

  const CLASSIC_CSS = `
    #ikas-reviews-widget{color:#111;margin:40px 0;padding:0}
    .ikr-header{border-bottom:2px solid #eee;padding-bottom:15px;margin-bottom:25px}
    .ikr-title{font-size:22px;font-weight:800}
    .ikr-review{padding:25px 0;border-bottom:1px solid #eee}
    .ikr-author{font-weight:700;font-size:15px}
    .ikr-date{color:#888;font-size:12px;margin-left:10px}
    .ikr-body{margin-top:10px;line-height:1.6;color:#333}
    .ikr-gallery{display:flex;gap:10px;margin-top:15px;flex-wrap:wrap}
    .ikr-img{width:100px;height:100px;object-fit:cover;border-radius:8px;border:1px solid #ddd;cursor:zoom-in}
    .ikr-reply{margin-top:15px;padding:15px;background:#f9f9f9;border-radius:8px;border-left:3px solid #111;font-size:14px}
    .ikr-form{background:#fff;border:1px solid #eee;padding:25px;border-radius:12px;margin-top:30px}
    .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;border:1px solid #ddd;border-radius:6px;font-size:14px;box-sizing:border-box}
    .ikr-btn{background:var(--ikr-color,#111);color:#fff;padding:10px 25px;border-radius:6px;cursor:pointer;border:none;font-weight:600;margin-top:15px}
    .ikr-btn:disabled{opacity:.6;cursor:not-allowed}
    .ikr-photo-btn{background:#f3f3f3;color:#444;padding:8px 15px;border-radius:6px;cursor:pointer;border:1px dashed #ccc;font-size:13px;display:inline-block;margin-top:10px}
    .ikr-preview-item{position:relative;display:inline-block;margin-right:8px;margin-top:8px}
    .ikr-preview-img{width:60px;height:60px;object-fit:cover;border-radius:6px}
    .ikr-preview-loading{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;font-size:10px;border-radius:6px}
  `;

  const CSS_MAP = { classic: CLASSIC_CSS };

  // ── Helpers ───────────────────────────────────────────────────────────────

  // [15] fetch with timeout — 8sn sonra abort
  function fetchWithTimeout(url, options, ms) {
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, ms || 8000);
    return fetch(url, Object.assign({}, options, { signal: ctrl.signal }))
      .finally(function () { clearTimeout(timer); });
  }

  // [5] URL parsing helper — tek yerden yönetim
  function extractSlug(url) {
    try {
      return new URL(url, window.location.origin).pathname.replace(/^\//, '').split('?')[0].split('/')[0];
    } catch (_) { return ''; }
  }

  // [4] Yıldız HTML helper — tek yerden yönetim
  var STAR_COLOR = '#f59e0b';
  function starsHTML(rating, size) {
    var r = Math.round(parseFloat(rating)) || 0;
    var filled = '★'.repeat(Math.min(r, 5));
    var empty = '☆'.repeat(Math.max(5 - r, 0));
    var style = 'color:' + STAR_COLOR + ';' + (size ? 'font-size:' + size + ';' : '');
    return '<span style="' + style + '">' + filled + empty + '</span>';
  }

  function injectStyles(template, color) {
    var el = document.getElementById('ikr-styles');
    if (!el) {
      el = document.createElement('style');
      el.id = 'ikr-styles';
      document.head.appendChild(el);
    }
    var css = CSS_MAP[template] || CSS_MAP.classic;
    el.textContent = css;
    document.documentElement.style.setProperty('--ikr-color', /^#[0-9A-Fa-f]{6}$/.test(color) ? color : '#111');
  }

  function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderStars(rating, interactive, onChange) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:4px;';
    wrap.setAttribute('data-rating', rating);
    const stars = [];

    function update(hovered) {
      stars.forEach(function (s, idx) {
        s.textContent = idx < hovered ? '★' : '☆';
        s.style.color = idx < hovered ? STAR_COLOR : '#ddd';
      });
    }

    for (var i = 1; i <= 5; i++) {
      (function (idx) {
        const star = document.createElement('span');
        star.textContent = idx <= rating ? '★' : '☆';
        star.style.cssText = 'font-size:20px;color:' + (idx <= rating ? STAR_COLOR : '#ddd') + ';cursor:' + (interactive ? 'pointer' : 'default') + ';transition:color .15s';
        if (interactive) {
          star.onmouseover = function () { update(idx); };
          star.onclick = function () { wrap.setAttribute('data-rating', idx); onChange && onChange(idx); update(idx); };
        }
        stars.push(star);
        wrap.appendChild(star);
      })(i);
    }

    if (interactive) {
      wrap.onmouseleave = function () { update(parseInt(wrap.getAttribute('data-rating') || '0')); };
    }
    return wrap;
  }

  // ── Core render ───────────────────────────────────────────────────────────

  // [2] render() race condition koruması — aynı anda sadece 1 render, pending slot ile istek kaybı önlenir
  var renderInProgress = false;
  var pendingRender = null;

  async function render(productId, settings, reviewsData, productName) {
    if (renderInProgress) {
      // Render devam ederken gelen isteği slot'a yaz; mevcut render bitince çalışır
      pendingRender = { productId: productId, settings: settings, reviewsData: reviewsData, productName: productName };
      return;
    }
    renderInProgress = true;

    try {
      var widgetColor = settings.widgetColor;
      var widgetTitle = settings.widgetTitle;
      var widgetTemplate = settings.widgetTemplate;

      injectStyles(widgetTemplate, widgetColor);

      // Find or create container
      var container = document.getElementById('ikas-reviews');
      if (!container) {
        var anchorEl = document.getElementById('ikas-reviews-anchor');
        if (!anchorEl) return;
        container = document.createElement('div');
        container.id = 'ikas-reviews';
        anchorEl.appendChild(container);
      }

      container.innerHTML = '<p style="text-align:center;padding:20px;">Yükleniyor...</p>';

      try {
        var data = reviewsData || {};
        var reviews = (data.data && data.data.reviews) || [];
        var totalCount = (data.data && data.data.totalCount) || 0;

        // [16] Önceki listener'ı temizle, clone ile tüm listener'ları sıfırla
        var fresh = container.cloneNode(false);
        container.parentNode.replaceChild(fresh, container);
        container = fresh;

        var widget = document.createElement('div');
        widget.id = 'ikas-reviews-widget';

        // Başlık
        var header = document.createElement('div');
        header.className = 'ikr-header';
        var h2 = document.createElement('h2');
        h2.className = 'ikr-title';
        h2.textContent = widgetTitle + ' (' + totalCount + ')';
        header.appendChild(h2);
        widget.appendChild(header);

        if (reviews.length === 0) {
          var empty = document.createElement('p');
          empty.style.cssText = 'color:#888;text-align:center;padding:30px 0;';
          empty.textContent = 'Henüz yorum yok.';
          widget.appendChild(empty);
        } else {
          reviews.forEach(function (r) {
            var reviewEl = document.createElement('div');
            reviewEl.className = 'ikr-review';

            // Yazar + tarih satırı
            var meta = document.createElement('div');
            var authorEl = document.createElement('span');
            authorEl.className = 'ikr-author';
            authorEl.textContent = r.author || '';
            var dateEl = document.createElement('span');
            dateEl.className = 'ikr-date';
            dateEl.textContent = formatDate(r.createdAt);
            meta.appendChild(authorEl);
            meta.appendChild(dateEl);
            reviewEl.appendChild(meta);

            // Yıldızlar — starsHTML sadece ★☆ unicode + renk, XSS yok
            var starsWrapEl = document.createElement('div');
            starsWrapEl.style.marginTop = '4px';
            starsWrapEl.innerHTML = starsHTML(r.rating, null);
            reviewEl.appendChild(starsWrapEl);

            // Yorum metni — textContent ile güvenli
            var body = document.createElement('p');
            body.className = 'ikr-body';
            body.textContent = r.comment || '';
            reviewEl.appendChild(body);

            // Görseller — DOM API ile güvenli src/data attr
            if (r.images && Array.isArray(r.images) && r.images.length) {
              var gallery = document.createElement('div');
              gallery.className = 'ikr-gallery';
              r.images.forEach(function (imgUrl) {
                if (!imgUrl || imgUrl.indexOf('https://') !== 0) return; // güvenli olmayan URL'leri atla
                var imgEl = document.createElement('img');
                imgEl.src = imgUrl;
                imgEl.className = 'ikr-img';
                imgEl.setAttribute('data-ikr-img-url', imgUrl);
                gallery.appendChild(imgEl);
              });
              reviewEl.appendChild(gallery);
            }

            // Mağaza yanıtı — textContent ile güvenli
            if (r.merchantReply) {
              var replyEl = document.createElement('div');
              replyEl.className = 'ikr-reply';
              var replyLabel = document.createElement('strong');
              replyLabel.textContent = 'Mağaza Yanıtı:';
              replyEl.appendChild(replyLabel);
              replyEl.appendChild(document.createElement('br'));
              replyEl.appendChild(document.createTextNode(r.merchantReply));
              reviewEl.appendChild(replyEl);
            }

            widget.appendChild(reviewEl);
          });
        }

        container.appendChild(widget);

        // image onclick — event delegation, URL protokol validasyonu ile güvenli
        container.addEventListener('click', function (e) {
          var img = e.target.closest('[data-ikr-img-url]');
          if (img) {
            var url = img.getAttribute('data-ikr-img-url');
            if (url && url.indexOf('https://') === 0) window.open(url, '_blank');
          }
        });

        // ── Rating badge (ürün başlığının altına) ─────────────────────────────
        // Önceki üründen kalan eski badge'i her zaman temizle
        var oldBadge = document.getElementById('ikr-rating-badge');
        if (oldBadge) oldBadge.remove();

        var avgRating = reviews.length
          ? (reviews.reduce(function (s, r) { return s + r.rating; }, 0) / reviews.length).toFixed(1)
          : null;
        if (avgRating) {
          // Listing badge'leri temizle (ürün sayfasında gereksiz)
          document.querySelectorAll('[data-ikr-listing-badge]').forEach(function (b) { b.remove(); });

          var titleEl = findProductTitleEl(productName);
          if (titleEl && titleEl.parentNode) {
            var badge = document.createElement('a');
            badge.id = 'ikr-rating-badge';
            badge.href = '#ikas-reviews';
            var titleAlign = window.getComputedStyle(titleEl).textAlign;
            var justifyVal = titleAlign === 'center' ? 'center' : titleAlign === 'right' ? 'flex-end' : 'flex-start';
            badge.style.cssText = 'display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;justify-content:' + justifyVal + ';';
            // [4] starsHTML helper kullanımı
            badge.innerHTML = starsHTML(avgRating, '16px') +
              '<span style="font-size:14px;color:#555;">' + avgRating + ' (' + totalCount + ' yorum)</span>';
            badge.onclick = function (e) {
              e.preventDefault();
              var rev = document.getElementById('ikas-reviews');
              if (rev) rev.scrollIntoView({ behavior: 'smooth' });
            };
            titleEl.parentNode.insertBefore(badge, titleEl.nextSibling);
          }
        }

        // ── Review form ───────────────────────────────────────────────────────
        var widgetEl = container.querySelector('#ikas-reviews-widget');
        var form = document.createElement('div');
        form.className = 'ikr-form';
        form.innerHTML = [
          '<h3 style="font-weight:700;margin-top:0;">Yorum Yapın</h3>',
          '<input type="text" id="ikr-name" class="ikr-input" placeholder="Adınız Soyadınız">',
          '<textarea id="ikr-comment" class="ikr-textarea" placeholder="Yorumunuz..." rows="3"></textarea>',
          '<div style="margin-top:10px;"><label style="font-size:12px;font-weight:600;">Puanınız:</label><div id="ikr-stars-input"></div></div>',
          '<div id="ikr-photo-section">',
          '  <label class="ikr-photo-btn">📷 Fotoğraf Ekle <input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple></label>',
          '  <div id="ikr-photo-previews" style="margin-top:10px"></div>',
          '</div>',
          '<button id="ikr-submit" class="ikr-btn">Yorumu Gönder</button>',
          '<div id="ikr-msg" style="margin-top:10px;"></div>',
        ].join('');
        widgetEl.appendChild(form);

        var currentRating = 5;
        var uploadedImages = [];

        var starsWrap = renderStars(5, true, function (v) { currentRating = v; });
        form.querySelector('#ikr-stars-input').appendChild(starsWrap);

        var fileInput = form.querySelector('#ikr-file-input');
        var previewsDiv = form.querySelector('#ikr-photo-previews');
        var isUploading = false;

        fileInput.onchange = async function (e) {
          if (isUploading) return; // concurrent upload engeli
          isUploading = true;
          fileInput.disabled = true;
          // Her yeni seçimde önceki upload'ları sıfırla — biriken görsel gönderimini önle
          uploadedImages = [];
          previewsDiv.innerHTML = '';
          var files = Array.from(e.target.files);
          for (var fi = 0; fi < files.length; fi++) {
            var file = files[fi];
            if (file.size > 5 * 1024 * 1024) {
              alert(file.name + ' dosyası 5MB sınırını aşıyor. Lütfen daha küçük bir görsel seçin.');
              continue;
            }
            var item = document.createElement('div');
            item.className = 'ikr-preview-item';
            item.innerHTML = '<img class="ikr-preview-img" src="' + URL.createObjectURL(file) + '"><div class="ikr-preview-loading">...</div>';
            previewsDiv.appendChild(item);
            var loadingEl = item.querySelector('.ikr-preview-loading');
            try {
              var signRes = await fetchWithTimeout(API_BASE + '/api/public/upload/sign', { method: 'POST' });
              if (!signRes.ok) throw new Error('sign failed');
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
                uploadedImages.push(upData.secure_url);
                loadingEl.textContent = '✓';
                loadingEl.style.color = '#059669';
              }
            } catch (err) {
              console.error('[ikr] Image upload failed:', err);
              loadingEl.textContent = '✗';
              loadingEl.style.color = '#dc2626';
            }
          }
          isUploading = false;
          fileInput.disabled = false;
          fileInput.value = '';
        };

        form.querySelector('#ikr-submit').onclick = async function () {
          var btn = this;
          var author = form.querySelector('#ikr-name').value.trim();
          var comment = form.querySelector('#ikr-comment').value.trim();
          var msgDiv = form.querySelector('#ikr-msg');
          if (!author) { alert('Lütfen adınızı girin.'); return; }
          btn.disabled = true;
          btn.textContent = 'Gönderiliyor...';
          msgDiv.innerHTML = '';
          try {
            // [5] extractSlug helper kullanımı
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
                comment: comment,
                rating: currentRating,
                images: uploadedImages
              }),
            });
            if (r.ok) {
              msgDiv.innerHTML = '<div style="color:#059669;font-weight:bold;">✓ Teşekkürler! Yorumunuz alındı.</div>';
              setTimeout(function () { location.reload(); }, 1500);
            } else {
              var err = await r.json().catch(function () { return {}; });
              throw new Error(err.error || 'Yorum kaydedilemedi.');
            }
          } catch (e) {
            alert('Hata: ' + e.message);
            btn.disabled = false;
            btn.textContent = 'Yorumu Gönder';
          }
        };

      } catch (err) {
        console.error('[ikr] render error:', err);
        container.innerHTML = '<p style="text-align:center;color:#dc2626;">Yorumlar yüklenirken bir hata oluştu.</p>';
      }
    } finally {
      renderInProgress = false;
      if (pendingRender) {
        var next = pendingRender;
        pendingRender = null;
        render(next.productId, next.settings, next.reviewsData, next.productName);
      }
    }
  }

  // ── Ürün başlığı elementi bulma (ürün sayfası badge'i için) ───────────────
  // [3] findNameEl'den ayrıldı — sadece ürün sayfası h1 tespiti
  function findProductTitleEl(productName) {
    if (productName) {
      var allEls = document.querySelectorAll('h1,h2,h3,h4,h5,h6,div,span,p');
      for (var i = 0; i < allEls.length; i++) {
        var el = allEls[i];
        if (el.children.length === 0 &&
            el.textContent.trim() === productName &&
            el.tagName !== 'TITLE' &&
            !el.closest('[data-ikr-listing-badge]') &&
            !el.closest('#ikas-reviews')) {
          return el;
        }
      }
    }
    return document.querySelector('h1');
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────

  const SETTINGS_CACHE_KEY = 'ikr_settings_' + PUBLIC_API_KEY;

  // [6] sessionStorage try-catch — private browsing / quota exceeded ortamları
  var _memCache = {};
  function cacheGet(key) {
    try { return sessionStorage.getItem(key); } catch (_) { return _memCache[key] || null; }
  }
  function cacheSet(key, val) {
    try { sessionStorage.setItem(key, val); } catch (_) { _memCache[key] = val; }
  }

  // [B] Settings cache TTL — 1 dakika
  var SETTINGS_CACHE_TTL = 1 * 60 * 1000;
  // 404 (store kurulmamış) için kısa TTL — 30 saniye
  var SETTINGS_404_TTL = 30 * 1000;

  async function fetchSettings() {
    var staleEntry = null;
    var cached = cacheGet(SETTINGS_CACHE_KEY);
    if (cached) {
      try {
        var entry = JSON.parse(cached);
        if (entry && entry.t !== undefined) {
          // 404 cache: notFound flag'i olan entry — kısa TTL kontrolü
          if (entry.notFound) {
            if (Date.now() - entry.t < SETTINGS_404_TTL) return null;
            cacheSet(SETTINGS_CACHE_KEY, '');
          } else if (entry.v) {
            // Geçerli cache — TTL dolmamışsa direkt döndür
            if (Date.now() - entry.t < SETTINGS_CACHE_TTL) return entry.v;
            // TTL dolmuş ama geçerli veri var — stale-if-error için sakla
            staleEntry = entry.v;
            cacheSet(SETTINGS_CACHE_KEY, '');
          } else {
            // Eski format — temizle
            cacheSet(SETTINGS_CACHE_KEY, '');
          }
        } else {
          cacheSet(SETTINGS_CACHE_KEY, '');
        }
      } catch (_) {
        cacheSet(SETTINGS_CACHE_KEY, '');
      }
    }
    try {
      var res = await fetchWithTimeout(API_BASE + '/api/public/settings?publicApiKey=' + encodeURIComponent(PUBLIC_API_KEY));
      if (!res.ok) {
        // 404 — store kurulmamış, notFound flag ile kısa TTL cache (thundering herd önlemi)
        if (res.status === 404) {
          cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), notFound: true }));
        }
        // 5xx — geçici hata, cache'leme; stale-if-error: eski geçerli cache varsa onu kullan
        return staleEntry || null;
      }
      var settings = await res.json();
      cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), v: settings }));
      return settings;
    } catch (err) {
      // Network hatası / timeout — cache'leme; stale-if-error: eski geçerli cache varsa kullan
      console.error('[ikr] fetchSettings error:', err);
      return staleEntry || null;
    }
  }

  // Reviews cache — fetchSettings ile aynı { t, v } TTL pattern'ı
  var REVIEWS_CACHE_TTL = 1 * 60 * 1000;

  async function fetchReviews(productId) {
    var key = 'ikr_reviews_' + PUBLIC_API_KEY + '_' + productId;
    var staleReviews = null;
    var cached = cacheGet(key);
    if (cached) {
      try {
        var entry = JSON.parse(cached);
        if (entry && entry.t !== undefined && entry.v) {
          if (Date.now() - entry.t < REVIEWS_CACHE_TTL) return entry.v;
          // TTL dolmuş ama geçerli veri var — stale-if-error için sakla
          staleReviews = entry.v;
          cacheSet(key, '');
        } else {
          cacheSet(key, '');
        }
      } catch (_) { cacheSet(key, ''); }
    }
    try {
      var res = await fetchWithTimeout(API_BASE + '/api/public/reviews?storeId=' + encodeURIComponent(PUBLIC_API_KEY) + '&productId=' + encodeURIComponent(productId));
      if (!res.ok) {
        // Hata — cache'leme; stale-if-error: eski geçerli cache varsa kullan
        return staleReviews || null;
      }
      var data = await res.json();
      cacheSet(key, JSON.stringify({ t: Date.now(), v: data }));
      return data;
    } catch (err) {
      console.error('[ikr] fetchReviews error:', err);
      return staleReviews || null;
    }
  }

  // [1] bootstrap — productId bazlı mutex (aynı ürün için çift çağrı engeli)
  var bootstrapCache = {};

  async function bootstrap(productId, productName) {
    if (bootstrapCache[productId]) return;
    bootstrapCache[productId] = true;
    var FALLBACK = { widgetColor: '#111', widgetTitle: 'Müşteri Yorumları', widgetTemplate: 'classic' };
    try {
      var settings = await fetchSettings();
      if (!settings) return;
      var reviewsData = await fetchReviews(productId);
      await render(productId, settings, reviewsData, productName);
    } catch (err) {
      console.error('[ikr] bootstrap error:', err);
      await render(productId, FALLBACK, null, productName);
    } finally {
      // SPA navigasyonunda farklı ürüne geçince tekrar çalışabilsin
      delete bootstrapCache[productId];
    }
  }

  // ── iKAS Storefront Events integration ───────────────────────────────────

  function getProductFromPage() {
    try {
      var pageProps = window.__NEXT_DATA__ && window.__NEXT_DATA__.props && window.__NEXT_DATA__.props.pageProps;
      if (pageProps && pageProps.pageType === 'PRODUCT' && pageProps.pageSpecificData && pageProps.pageSpecificData.id) {
        return { id: pageProps.pageSpecificData.id, name: pageProps.pageSpecificData.name || null };
      }
    } catch (_) {}
    if (window.IkasStorefront && window.IkasStorefront.product && window.IkasStorefront.product.id) {
      return { id: window.IkasStorefront.product.id, name: window.IkasStorefront.product.name || null };
    }
    var match = window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);
    if (match) return { id: match[1], name: null };
    var qp = new URLSearchParams(window.location.search).get('productId');
    if (qp) return { id: qp, name: null };
    return null;
  }

  var ikasEventsAttached = false;

  function attachEvents() {
    if (window.IkasEvents) {
      // Duplicate subscription önlemi — script iki kez çalışırsa tek subscription kalır
      if (ikasEventsAttached) return;
      ikasEventsAttached = true;
      window.IkasEvents.subscribe({
        id: 'ikas-reviews-widget',
        callback: function (event) {
          if (event && event.type === 'VIEW_LISTING') {
            var products = event.data && event.data.productDetails;
            if (Array.isArray(products)) {
              products.forEach(function (p) {
                if (p && p.metaData && p.metaData.slug && p.name) {
                  ikrSlugMap[p.metaData.slug] = p.name;
                }
              });
              // İlk açılışta PAGE_VIEW gelmeyebilir — debounce ile son VIEW_LISTING'den sonra render et
              clearTimeout(ikrListingDebounce);
              ikrListingDebounce = setTimeout(function() {
                renderListingBadges(listingBadgeGen);
              }, 200);
            }
          }
          if (event && event.type === 'PRODUCT_VIEW') {
            var productId = event.data && event.data.productDetail && event.data.productDetail.id;
            var productName = event.data && event.data.productDetail && event.data.productDetail.name;
            if (productId) {
              // SPA navigation: her ürün geçişinde reviews cache'ini temizle — taze veri çek
              cacheSet('ikr_reviews_' + PUBLIC_API_KEY + '_' + productId, '');
              bootstrap(productId, productName);
            }
          }
          if (event && event.type === 'PAGE_VIEW') {
            listingBadgeRendered = false;
            listingBadgeGen++;
            // VIEW_LISTING eventleri bazen PAGE_VIEW'dan sonra gelebiliyor —
            // kısa delay ile map'in dolmasını bekle
            var capturedGen = listingBadgeGen;
            setTimeout(function() {
              if (capturedGen === listingBadgeGen) renderListingBadges(listingBadgeGen);
            }, 300);
          }
        },
      });
      // Event daha önce tetiklendiyse sayfa verisinden ürün tespiti
      var product = getProductFromPage();
      if (product) bootstrap(product.id, product.name);
    } else {
      // Fallback: IkasEvents yüklenene kadar bekle
      var attempts = 0;
      function tryAttach() {
        if (window.IkasEvents) {
          attachEvents();
        } else if (attempts < 20) {
          attempts++;
          setTimeout(tryAttach, 500);
        }
      }
      setTimeout(tryAttach, 500);
    }
  }

  // ── Listing / Category badge ──────────────────────────────────────────────


  // [7] renderListingBadges cache — aynı sayfa için API tekrar çağrılmasın
  var listingBadgeRendered = false;
  // Generation counter — duplicate PAGE_VIEW event'lerinde eski in-flight render'ı iptal et
  var listingBadgeGen = 0;

  // VIEW_LISTING event'inden biriktirilen slug→name map
  var ikrSlugMap = {};
  var ikrListingDebounce = null;

  // [3] findNameEl — sadeleştirilmiş, tahmin edilebilir öncelik sırası
  function findNameEl(a, productName) {
    if (productName) {
      // 0. Bilinen product title class pattern'ları — öncelikli kontrol
      var titleByClass = a.querySelector('[class*="productTitle"],[class*="product-title"],[class*="product-name"],[class*="productName"]');
      if (titleByClass && titleByClass.textContent.trim() === productName) return titleByClass;
      // 1. Link içinde heading eşleştirme
      var headings = a.querySelectorAll('h1,h2,h3,h4,h5,h6');
      for (var i = 0; i < headings.length; i++) {
        if (headings[i].textContent.trim() === productName) return headings[i];
      }
      // 2. Link içinde leaf element eşleştirme
      var allEls = a.querySelectorAll('*');
      for (var j = 0; j < allEls.length; j++) {
        if (allEls[j].children.length === 0 && allEls[j].textContent.trim() === productName) return allEls[j];
      }
      // 3. ikas resmi tema — productCard/productContainer + textContainer pattern
      var card = a.parentElement && a.parentElement.parentElement;
      if (card && card.className && (card.className.indexOf('productCard') !== -1 || card.className.indexOf('productContainer') !== -1)) {
        var textContainer = card.querySelector('[class*="textContainer"]');
        if (textContainer) {
          var cardEls = textContainer.querySelectorAll('*');
          for (var k = 0; k < cardEls.length; k++) {
            if (cardEls[k].children.length === 0 && cardEls[k].textContent.trim() === productName) return cardEls[k];
          }
          return textContainer.firstElementChild || textContainer;
        }
      }
      // 4. Kardeş elementlerde ara
      var parent = a.parentElement;
      if (parent) {
        var siblings = parent.querySelectorAll('*');
        for (var s = 0; s < siblings.length; s++) {
          if (siblings[s] === a || a.contains(siblings[s])) continue;
          if (siblings[s].children.length === 0 && siblings[s].textContent.trim() === productName) return siblings[s];
        }
      }
    }
    // 5. Fallback: class bazlı seçiciler
    return a.querySelector('[class*="product-name"]') ||
      a.querySelector('[class*="product-title"]') ||
      a.querySelector('h2') ||
      a.querySelector('h3') ||
      null;
  }


  async function renderListingBadges(gen) {
    // [7] Ürün sayfasındaysa listing badge çalışmasın
    if (document.getElementById('ikas-reviews-anchor')) return;
    // [7] Aynı sayfa için tekrar API çağrısı yapma
    if (listingBadgeRendered) return;
    // Async await'lerden önce flag'i set et — paralel çağrıların çift badge inject etmesini engelle
    listingBadgeRendered = true;

    // SPA nav'da DOM'da kalan eski attribute'ları temizle (link elementleri yeniden kullanılıyor olabilir)
    document.querySelectorAll('[data-ikr-badge]').forEach(function (el) { el.removeAttribute('data-ikr-badge'); });
    document.querySelectorAll('[data-ikr-name]').forEach(function (el) { el.removeAttribute('data-ikr-name'); });

    var settings = await fetchSettings();
    // Generation kontrolü: await sırasında yeni PAGE_VIEW geldiyse bu render'ı iptal et
    if (gen !== undefined && gen !== listingBadgeGen) return;
    if (!settings) return;

    var slugNameMap = ikrSlugMap;
    var slugs = Object.keys(slugNameMap);
    if (!slugs.length) return;

    // Slug'ları 50'lik batch'lere böl — büyük kategorilerde oversized POST önlemi
    var SLUG_BATCH_SIZE = 50;
    var sortedSlugs = slugs.slice().sort();
    var ratingsKey = 'ikr_ratings_' + PUBLIC_API_KEY + '_' + sortedSlugs.join(',');
    var ratings = {};

    var ratingsCached = cacheGet(ratingsKey);
    if (ratingsCached) {
      try {
        var ratingsEntry = JSON.parse(ratingsCached);
        if (ratingsEntry && ratingsEntry.t !== undefined && Date.now() - ratingsEntry.t < 1 * 60 * 1000) {
          ratings = ratingsEntry.v || {};
        } else {
          cacheSet(ratingsKey, '');
        }
      } catch (_) { cacheSet(ratingsKey, ''); }
    }

    if (!Object.keys(ratings).length) {
      // Batch fetch: 50'lik gruplara böl, paralel gönder
      var batches = [];
      for (var bi = 0; bi < sortedSlugs.length; bi += SLUG_BATCH_SIZE) {
        batches.push(sortedSlugs.slice(bi, bi + SLUG_BATCH_SIZE));
      }
      var batchResults = await Promise.all(batches.map(function (batch) {
        return fetchWithTimeout(API_BASE + '/api/public/ratings-by-slug', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ storeId: PUBLIC_API_KEY, slugs: batch }),
        }).then(function (res) {
          if (!res.ok) { console.error('[ikr] ratings-by-slug HTTP error:', res.status); return {}; }
          return res.json().then(function (json) { return json.data || {}; });
        }).catch(function (err) {
          console.error('[ikr] ratings-by-slug fetch error:', err);
          return {};
        });
      }));
      batchResults.forEach(function (batchData) {
        Object.keys(batchData).forEach(function (slug) { ratings[slug] = batchData[slug]; });
      });
      if (Object.keys(ratings).length) {
        cacheSet(ratingsKey, JSON.stringify({ t: Date.now(), v: ratings }));
      }
    }

    // Generation kontrolü: fetch sırasında yeni PAGE_VIEW geldiyse badge inject etme
    if (gen !== undefined && gen !== listingBadgeGen) return;

    slugs.forEach(function (slug) {
      var rating = ratings[slug];
      if (!rating) return;
      var productName = slugNameMap[slug];

      var badgeAdded = false;
      var links = document.querySelectorAll('a[href]');
      links.forEach(function (a) {
        if (badgeAdded) return;
        if (a.getAttribute('data-ikr-badge')) return;
        // [5] extractSlug helper kullanımı
        var path = extractSlug(a.href);
        if (path !== slug) return;

        var nameEl = findNameEl(a, productName);
        if (!nameEl || !nameEl.parentNode) return;
        if (nameEl.getAttribute('data-ikr-name')) return;

        a.setAttribute('data-ikr-badge', '1');
        nameEl.setAttribute('data-ikr-name', '1');
        badgeAdded = true;

        var badge = document.createElement('div');
        badge.setAttribute('data-ikr-listing-badge', '1');
        var nameAlign = window.getComputedStyle(nameEl).textAlign;
        badge.style.cssText = 'display:flex;align-items:center;gap:3px;margin-top:2px;margin-bottom:2px;font-size:12px;color:#555;pointer-events:none;justify-content:' + (nameAlign === 'center' ? 'center' : nameAlign === 'right' ? 'flex-end' : 'flex-start') + ';';
        // [4] starsHTML helper kullanımı
        badge.innerHTML = starsHTML(rating.avg, null) + '<span>' + rating.avg + ' (' + rating.count + ')</span>';

        if (nameEl.tagName === 'A') {
          nameEl.appendChild(badge);
        } else {
          nameEl.parentNode.insertBefore(badge, nameEl.nextSibling);
        }
      });
    });
  }

  function init() {
    attachEvents();
    // renderListingBadges burada çağrılmıyor — ikas PAGE_VIEW event'i zaten tetikliyor.
    // Hem init() hem PAGE_VIEW çağrılırsa duplicate badge oluşuyor.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
