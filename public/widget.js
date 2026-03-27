;(function () {
  'use strict';

  // publicApiKey (= merchantId) is passed via the script src URL:
  // <script src="/widget.js?publicApiKey=MERCHANT_ID" async></script>
  const scriptTag = document.currentScript || (function () {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  const scriptSrc = scriptTag ? scriptTag.src : '';
  const urlParams = new URLSearchParams(scriptSrc.split('?')[1] || '');
  const PUBLIC_API_KEY = urlParams.get('publicApiKey');
  const API_BASE = scriptSrc ? scriptSrc.split('/widget.js')[0] : '';

  if (!PUBLIC_API_KEY) return; // No store key — do nothing

  // ── Styles ────────────────────────────────────────────────────────────────

  const CLASSIC_CSS = `
    #ikas-reviews-widget{font-family:-apple-system,sans-serif;color:#111;margin:40px 0;padding:0}
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

  function injectStyles(template, color) {
    let el = document.getElementById('ikr-styles');
    if (!el) {
      el = document.createElement('style');
      el.id = 'ikr-styles';
      document.head.appendChild(el);
    }
    const css = CSS_MAP[template] || CSS_MAP.classic;
    el.textContent = css;
    document.documentElement.style.setProperty('--ikr-color', color || '#111');
  }

  function formatDate(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function renderStars(rating, interactive, onChange) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:4px;';
    wrap.setAttribute('data-rating', rating);

    function update(hovered) {
      wrap.querySelectorAll('span').forEach((s, idx) => {
        s.textContent = idx < hovered ? '★' : '☆';
        s.style.color = idx < hovered ? '#f59e0b' : '#ddd';
      });
    }

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.textContent = i <= rating ? '★' : '☆';
      star.style.cssText = 'font-size:20px;color:' + (i <= rating ? '#f59e0b' : '#ddd') + ';cursor:' + (interactive ? 'pointer' : 'default') + ';transition:color .15s';
      if (interactive) {
        star.onmouseover = () => update(i);
        star.onclick = () => { wrap.setAttribute('data-rating', i); onChange && onChange(i); update(i); };
      }
      wrap.appendChild(star);
    }

    if (interactive) {
      wrap.onmouseleave = () => update(parseInt(wrap.getAttribute('data-rating') || '0'));
    }
    return wrap;
  }

  // ── Core render ───────────────────────────────────────────────────────────

  async function render(productId, settings) {
    const { widgetColor, widgetTitle, widgetTemplate } = settings;

    injectStyles(widgetTemplate, widgetColor);

    // Find or create container
    let container = document.getElementById('ikas-reviews');
    if (!container) {
      const anchorEl = document.getElementById('ikas-reviews-anchor');
      if (!anchorEl) return; // Anchor yoksa çalışma
      container = document.createElement('div');
      container.id = 'ikas-reviews';
      anchorEl.appendChild(container);
    }

    container.innerHTML = '<p style="text-align:center;padding:20px;">Yükleniyor...</p>';

    try {
      const res = await fetch(
        API_BASE + '/api/public/reviews?storeId=' + encodeURIComponent(PUBLIC_API_KEY) +
        '&productId=' + encodeURIComponent(productId)
      );
      const data = await res.json();
      const reviews = (data.data && data.data.reviews) || [];
      const totalCount = (data.data && data.data.totalCount) || 0;

      let html = '<div id="ikas-reviews-widget">';
      html += '<div class="ikr-header"><h2 class="ikr-title">' + widgetTitle + ' (' + totalCount + ')</h2></div>';

      if (reviews.length === 0) {
        html += '<p style="color:#888;text-align:center;padding:30px 0;">Henüz yorum yok.</p>';
      } else {
        reviews.forEach(function (r) {
          const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
          const images = r.images && Array.isArray(r.images) && r.images.length
            ? '<div class="ikr-gallery">' + r.images.map(function (img) {
                return '<img src="' + img + '" class="ikr-img" onclick="window.open(\'' + img + '\',\'_blank\')">';
              }).join('') + '</div>'
            : '';
          const reply = r.merchantReply
            ? '<div class="ikr-reply"><strong>Mağaza Yanıtı:</strong><br>' + r.merchantReply + '</div>'
            : '';
          html += '<div class="ikr-review">'
            + '<div><span class="ikr-author">' + r.author + '</span><span class="ikr-date">' + formatDate(r.createdAt) + '</span></div>'
            + '<div style="color:#f59e0b;margin-top:4px;">' + stars + '</div>'
            + '<p class="ikr-body">' + (r.comment || '') + '</p>'
            + images
            + reply
            + '</div>';
        });
      }

      html += '</div>';
      container.innerHTML = html;

      // ── Rating badge (ürün başlığının altına) ─────────────────────────────
      if (!document.getElementById('ikr-rating-badge')) {
        const avgRating = reviews.length
          ? (reviews.reduce(function (s, r) { return s + r.rating; }, 0) / reviews.length).toFixed(1)
          : null;
        const titleEl = document.querySelector('h1');
        if (titleEl && avgRating) {
          const badge = document.createElement('a');
          badge.id = 'ikr-rating-badge';
          badge.href = '#ikas-reviews';
          badge.style.cssText = 'display:inline-flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;';
          badge.innerHTML =
            '<span style="color:#f59e0b;font-size:16px;">' + '★'.repeat(Math.round(avgRating)) + '☆'.repeat(5 - Math.round(avgRating)) + '</span>' +
            '<span style="font-size:14px;color:#555;">' + avgRating + ' (' + totalCount + ' yorum)</span>';
          badge.onclick = function (e) {
            e.preventDefault();
            document.getElementById('ikas-reviews').scrollIntoView({ behavior: 'smooth' });
          };
          titleEl.parentNode.insertBefore(badge, titleEl.nextSibling);
        }
      }

      // ── Review form ───────────────────────────────────────────────────────
      const widgetEl = container.querySelector('#ikas-reviews-widget');
      const form = document.createElement('div');
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

      let currentRating = 5;
      const uploadedImages = [];

      const starsWrap = renderStars(5, true, function (v) { currentRating = v; });
      form.querySelector('#ikr-stars-input').appendChild(starsWrap);

      const fileInput = form.querySelector('#ikr-file-input');
      const previewsDiv = form.querySelector('#ikr-photo-previews');

      fileInput.onchange = async function (e) {
        const files = Array.from(e.target.files);
        for (const file of files) {
          if (file.size > 5 * 1024 * 1024) {
            alert(file.name + ' dosyası 5MB sınırını aşıyor. Lütfen daha küçük bir görsel seçin.');
            continue;
          }
          const item = document.createElement('div');
          item.className = 'ikr-preview-item';
          item.innerHTML = '<img class="ikr-preview-img" src="' + URL.createObjectURL(file) + '"><div class="ikr-preview-loading">...</div>';
          previewsDiv.appendChild(item);
          const loadingEl = item.querySelector('.ikr-preview-loading');
          try {
            const signRes = await fetch(API_BASE + '/api/public/upload/sign', { method: 'POST' });
            if (!signRes.ok) throw new Error('sign failed');
            const sign = await signRes.json();
            const fd = new FormData();
            fd.append('file', file);
            fd.append('api_key', sign.api_key);
            fd.append('timestamp', sign.timestamp);
            fd.append('signature', sign.signature);
            fd.append('folder', 'review_images');
            const up = await fetch('https://api.cloudinary.com/v1_1/' + sign.cloud_name + '/image/upload', { method: 'POST', body: fd });
            const upData = await up.json();
            if (upData.secure_url) {
              uploadedImages.push(upData.secure_url);
              loadingEl.textContent = '✓';
              loadingEl.style.color = '#059669';
            }
          } catch (_) {
            loadingEl.textContent = '✗';
            loadingEl.style.color = '#dc2626';
          }
        }
      };

      form.querySelector('#ikr-submit').onclick = async function () {
        const btn = this;
        const author = form.querySelector('#ikr-name').value.trim();
        const comment = form.querySelector('#ikr-comment').value.trim();
        const msgDiv = form.querySelector('#ikr-msg');
        if (!author) { alert('Lütfen adınızı girin.'); return; }
        btn.disabled = true;
        btn.textContent = 'Gönderiliyor...';
        msgDiv.innerHTML = '';
        try {
          const titleEl = document.querySelector('h1');
          const productName = titleEl ? titleEl.innerText.trim() : null;
          const pageSlug = window.location.pathname.replace(/^\//, '').split('?')[0].split('/')[0];
          const r = await fetch(API_BASE + '/api/public/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              storeId: PUBLIC_API_KEY,
              productId: productId,
              slug: pageSlug || null,
              productName: productName,
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
            const err = await r.json().catch(function () { return {}; });
            throw new Error(err.error || 'Yorum kaydedilemedi.');
          }
        } catch (e) {
          alert('Hata: ' + e.message);
          btn.disabled = false;
          btn.textContent = 'Yorumu Gönder';
        }
      };

    } catch (_) {
      container.innerHTML = '<p style="text-align:center;color:#dc2626;">Yorumlar yüklenirken bir hata oluştu.</p>';
    }
  }

  // ── Bootstrap ─────────────────────────────────────────────────────────────

  async function bootstrap(productId) {
    try {
      const res = await fetch(API_BASE + '/api/public/settings?publicApiKey=' + encodeURIComponent(PUBLIC_API_KEY));
      const settings = await res.json();
      await render(productId, settings);
    } catch (_) {
      await render(productId, { widgetColor: '#111', widgetTitle: 'Müşteri Yorumları', widgetTemplate: 'classic' });
    }
  }

  // ── iKAS Storefront Events integration ───────────────────────────────────
  // Fires only on product detail pages — no DOM polling, no false positives

  function getProductIdFromPage() {
    // Try IkasStorefront global (set before PRODUCT_VIEW fires)
    if (window.IkasStorefront && window.IkasStorefront.product && window.IkasStorefront.product.id) {
      return window.IkasStorefront.product.id;
    }
    // Try URL: /products/slug--PRODUCT_ID or /urun/slug--PRODUCT_ID
    const match = window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);
    if (match) return match[1];
    // Try URL query param ?productId=
    const qp = new URLSearchParams(window.location.search).get('productId');
    if (qp) return qp;
    return null;
  }

  function attachEvents() {
    if (window.IkasEvents) {
      window.IkasEvents.subscribe({
        id: 'ikas-reviews-widget',
        callback: function (event) {
          if (event && event.type === 'PRODUCT_VIEW') {
            const productId = event.data && event.data.productDetail && event.data.productDetail.id;
            if (productId) bootstrap(productId);
          }
        },
      });
      // Event may have already fired before this script loaded — try to render now
      const currentProductId = getProductIdFromPage();
      if (currentProductId) bootstrap(currentProductId);
    } else {
      // Fallback: wait for IkasEvents to become available (injected after DOM ready)
      let attempts = 0;
      const poll = setInterval(function () {
        attempts++;
        if (window.IkasEvents) {
          clearInterval(poll);
          attachEvents();
        } else if (attempts > 20) {
          clearInterval(poll);
        }
      }, 500);
    }
  }

  // ── Listing / Category badge ──────────────────────────────────────────────
  // JSON-LD ItemList'ten slug'ları okur, toplu API'ye gönderir,
  // her ürün linkinin içine mini rating badge ekler.

  var EXCLUDED = ['account', 'pages', 'blog', 'search', 'cart', 'checkout', 'siparis', 'odeme'];

  function getListingSlugs() {
    // Önce JSON-LD ItemList'ten dene (en güvenilir)
    var slugs = [];
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (var i = 0; i < scripts.length; i++) {
      try {
        var data = JSON.parse(scripts[i].textContent);
        if (data['@type'] === 'ItemList' && Array.isArray(data.itemListElement)) {
          data.itemListElement.forEach(function (item) {
            var url = (item.item && item.item.offers && item.item.offers.url) || '';
            if (!url) return;
            var path = new URL(url).pathname.replace(/^\//, '').split('?')[0].split('/')[0];
            if (path && !EXCLUDED.some(function (e) { return path.startsWith(e); })) {
              slugs.push(path);
            }
          });
          if (slugs.length) return [...new Set(slugs)];
        }
      } catch (_) {}
    }
    return [];
  }

  async function renderListingBadges() {
    var slugs = getListingSlugs();
    if (!slugs.length) return;

    var res;
    try {
      res = await fetch(API_BASE + '/api/public/ratings-by-slug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeId: PUBLIC_API_KEY, slugs: slugs }),
      });
    } catch (_) { return; }

    var json;
    try { json = await res.json(); } catch (_) { return; }
    var ratings = json.data || {};

    // Her unique slug için linki bul ve badge ekle
    // Aynı slug'a birden fazla link olabilir — Set ile tek badge ekle
    slugs.forEach(function (slug) {
      var rating = ratings[slug];
      if (!rating) return;

      // Bu slug'a ait tüm linkleri bul
      var links = document.querySelectorAll('a[href]');
      links.forEach(function (a) {
        if (a.getAttribute('data-ikr-badge')) return; // zaten işaretli
        try {
          var path = new URL(a.href).pathname.replace(/^\//, '').split('?')[0].split('/')[0];
          if (path !== slug) return;
        } catch (_) { return; }

        a.setAttribute('data-ikr-badge', '1');

        var badge = document.createElement('div');
        badge.setAttribute('data-ikr-listing-badge', '1');
        badge.style.cssText = 'display:flex;align-items:center;gap:3px;margin-top:4px;font-size:12px;color:#555;pointer-events:none;';
        badge.innerHTML =
          '<span style="color:#f59e0b;">' + '★'.repeat(Math.round(parseFloat(rating.avg))) + '☆'.repeat(5 - Math.round(parseFloat(rating.avg))) + '</span>' +
          '<span>' + rating.avg + ' (' + rating.count + ')</span>';

        // Link'in sonuna ekle
        a.appendChild(badge);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      attachEvents();
      renderListingBadges();
    });
  } else {
    attachEvents();
    renderListingBadges();
  }
})();
