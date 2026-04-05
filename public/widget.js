/* ikas Reviews Widget — built 2026-04-05T13:20:46.686Z | theme: default */
"use strict";
(() => {
  // src/widget/core/config.js
  var scriptTag = document.currentScript || (function() {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      if (scripts[i].src && scripts[i].src.indexOf("/widget.js") !== -1) return scripts[i];
    }
    return scripts[scripts.length - 1];
  })();
  var scriptSrc = scriptTag ? scriptTag.src : "";
  var urlParams = new URLSearchParams(scriptSrc.split("?")[1] || "");
  var PUBLIC_API_KEY = urlParams.get("publicApiKey");
  var API_BASE = scriptSrc ? scriptSrc.split("?")[0].replace(/\/widget\.js$/, "") : "";

  // src/widget/core/state.js
  var currentOrderBy = "newest";
  var currentPage = 1;
  var currentRatingFilter = null;
  var currentProductId = null;
  var currentSettings = null;
  var currentProductName = null;
  function setCurrentOrderBy(v) {
    currentOrderBy = v;
  }
  function setCurrentPage(v) {
    currentPage = v;
  }
  function setCurrentRatingFilter(v) {
    currentRatingFilter = v;
  }
  function setCurrentProductId(v) {
    currentProductId = v;
  }
  function setCurrentSettings(v) {
    currentSettings = v;
  }
  function setCurrentProductName(v) {
    currentProductName = v;
  }
  var renderInProgress = false;
  var pendingRender = null;
  function setRenderInProgress(v) {
    renderInProgress = v;
  }
  function setPendingRender(v) {
    pendingRender = v;
  }
  var ls = {
    rendered: false,
    inProgress: false,
    queued: false,
    navCleanup: false,
    lastPageView: 0
  };
  var ikrSlugMap = {};
  var lastClickedSlug = null;
  function setLastClickedSlug(v) {
    lastClickedSlug = v;
  }

  // src/widget/core/cache.js
  var _memCache = {};
  function cacheGet(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (_) {
      return _memCache[key] || null;
    }
  }
  function cacheSet(key, val) {
    try {
      sessionStorage.setItem(key, val);
    } catch (_) {
      _memCache[key] = val;
    }
  }

  // src/widget/core/helpers.js
  var STAR_COLOR = "var(--ikr-color,#f59e0b)";
  var SYSTEM_SLUGS = /^(account|pages|blog|search|cart|checkout|siparis|odeme|kategori|category|urun|products?)/;
  function extractSlug(url) {
    try {
      return new URL(url, window.location.origin).pathname.replace(/^\//, "").split("?")[0].split("/")[0];
    } catch (_) {
      return "";
    }
  }
  function starsHTML(rating, size) {
    var r = Math.round(parseFloat(rating)) || 0;
    var filled = "\u2605".repeat(Math.min(r, 5));
    var empty = "\u2606".repeat(Math.max(5 - r, 0));
    var style = "color:" + STAR_COLOR + ";" + (size ? "font-size:" + size + ";" : "");
    return '<span style="' + style + '">' + filled + empty + "</span>";
  }
  function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
  }
  function hexToRgb(hex) {
    var m = /^#([0-9A-Fa-f]{6})$/.exec(hex);
    if (!m) return null;
    return [parseInt(m[1].slice(0, 2), 16), parseInt(m[1].slice(2, 4), 16), parseInt(m[1].slice(4, 6), 16)];
  }
  function applyWidgetColor(color) {
    var validColor = /^#[0-9A-Fa-f]{6}$/.test(color) ? color : "#111111";
    document.documentElement.style.setProperty("--ikr-color", validColor);
    var rgb = hexToRgb(validColor);
    document.documentElement.style.setProperty("--ikr-color-light", rgb ? "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ",0.07)" : "rgba(17,17,17,0.07)");
  }
  function injectStyles(color, css) {
    var el = document.getElementById("ikr-styles");
    if (!el) {
      el = document.createElement("style");
      el.id = "ikr-styles";
      document.head.appendChild(el);
    }
    el.textContent = css;
    applyWidgetColor(color);
  }
  function renderStars(rating, interactive, onChange) {
    const wrap = document.createElement("div");
    wrap.style.cssText = "display:flex;gap:4px;";
    wrap.setAttribute("data-rating", rating);
    const stars = [];
    function update(hovered) {
      stars.forEach(function(s, idx) {
        s.textContent = idx < hovered ? "\u2605" : "\u2606";
        s.style.color = idx < hovered ? STAR_COLOR : "#ddd";
      });
    }
    for (var i = 1; i <= 5; i++) {
      (function(idx) {
        const star = document.createElement("span");
        star.textContent = idx <= rating ? "\u2605" : "\u2606";
        star.style.cssText = "font-size:20px;color:" + (idx <= rating ? STAR_COLOR : "#ddd") + ";cursor:" + (interactive ? "pointer" : "default") + ";transition:color .15s";
        if (interactive) {
          star.onmouseover = function() {
            update(idx);
          };
          star.onclick = function() {
            wrap.setAttribute("data-rating", idx);
            onChange && onChange(idx);
            update(idx);
          };
        }
        stars.push(star);
        wrap.appendChild(star);
      })(i);
    }
    if (interactive) {
      wrap.onmouseleave = function() {
        update(parseInt(wrap.getAttribute("data-rating") || "0"));
      };
    }
    return wrap;
  }

  // src/widget/core/fetch.js
  function fetchWithTimeout(url, options, ms) {
    var ctrl = new AbortController();
    var timer = setTimeout(function() {
      ctrl.abort();
    }, ms || 8e3);
    return fetch(url, Object.assign({}, options, { signal: ctrl.signal })).finally(function() {
      clearTimeout(timer);
    });
  }

  // src/widget/product-widget/review-item.js
  function buildReviewEl(r) {
    var reviewEl = document.createElement("div");
    reviewEl.className = "ikr-review";
    var meta = document.createElement("div");
    var authorEl = document.createElement("span");
    authorEl.className = "ikr-author";
    authorEl.textContent = r.author || "";
    var dateEl = document.createElement("span");
    dateEl.className = "ikr-date";
    dateEl.textContent = formatDate(r.createdAt);
    meta.appendChild(authorEl);
    meta.appendChild(dateEl);
    reviewEl.appendChild(meta);
    var starsWrapEl = document.createElement("div");
    starsWrapEl.style.marginTop = "4px";
    starsWrapEl.innerHTML = starsHTML(r.rating, null);
    reviewEl.appendChild(starsWrapEl);
    var body = document.createElement("p");
    body.className = "ikr-body";
    body.textContent = r.comment || "";
    reviewEl.appendChild(body);
    if (r.images && Array.isArray(r.images) && r.images.length) {
      var gallery = document.createElement("div");
      gallery.className = "ikr-gallery";
      r.images.forEach(function(imgUrl) {
        if (!imgUrl || imgUrl.indexOf("https://") !== 0) return;
        var imgEl = document.createElement("img");
        imgEl.src = imgUrl;
        imgEl.className = "ikr-img";
        imgEl.setAttribute("data-ikr-img-url", imgUrl);
        gallery.appendChild(imgEl);
      });
      reviewEl.appendChild(gallery);
    }
    if (r.merchantReply) {
      var replyEl = document.createElement("div");
      replyEl.className = "ikr-reply";
      var replyLabel = document.createElement("strong");
      replyLabel.textContent = "Ma\u011Faza Yan\u0131t\u0131:";
      replyEl.appendChild(replyLabel);
      replyEl.appendChild(document.createElement("br"));
      replyEl.appendChild(document.createTextNode(r.merchantReply));
      reviewEl.appendChild(replyEl);
    }
    return reviewEl;
  }

  // src/widget/product-widget/review-form.js
  function buildReviewForm(widgetEl, productId, productName) {
    var form = document.createElement("div");
    form.className = "ikr-form";
    form.id = "ikr-form-section";
    form.setAttribute("aria-label", "Yorum formu");
    form.setAttribute("role", "form");
    form.innerHTML = [
      '<h3 style="font-weight:700;margin-top:0;" id="ikr-form-title">Yorum Yap\u0131n</h3>',
      '<label for="ikr-name" style="font-size:12px;font-weight:600;">Ad\u0131n\u0131z Soyad\u0131n\u0131z</label>',
      '<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z Soyad\u0131n\u0131z" aria-label="Ad\u0131n\u0131z Soyad\u0131n\u0131z" aria-required="true">',
      '<label for="ikr-comment" style="font-size:12px;font-weight:600;margin-top:8px;display:block;">Yorumunuz</label>',
      '<textarea id="ikr-comment" class="ikr-textarea" placeholder="Yorumunuz..." rows="3" aria-label="Yorumunuz"></textarea>',
      '<div style="margin-top:10px;"><label style="font-size:12px;font-weight:600;" id="ikr-stars-label">Puan\u0131n\u0131z:</label><div id="ikr-stars-input" role="group" aria-labelledby="ikr-stars-label"></div></div>',
      '<div id="ikr-photo-section">',
      '  <label class="ikr-photo-btn" aria-label="Foto\u011Fraf ekle">\u{1F4F7} Foto\u011Fraf Ekle <input type="file" id="ikr-file-input" style="display:none" accept="image/*" multiple aria-label="Foto\u011Fraf se\xE7"></label>',
      '  <div id="ikr-photo-previews" style="margin-top:10px" aria-live="polite"></div>',
      "</div>",
      '<button id="ikr-submit" class="ikr-btn" aria-label="Yorumu g\xF6nder">Yorumu G\xF6nder</button>',
      '<div id="ikr-msg" style="margin-top:10px;" role="alert" aria-live="assertive"></div>'
    ].join("");
    widgetEl.appendChild(form);
    var currentRating = 5;
    var uploadedImages = [];
    var starsWrap = renderStars(5, true, function(v) {
      currentRating = v;
    });
    form.querySelector("#ikr-stars-input").appendChild(starsWrap);
    var fileInput = form.querySelector("#ikr-file-input");
    var previewsDiv = form.querySelector("#ikr-photo-previews");
    var isUploading = false;
    var photoLabel = form.querySelector("label.ikr-photo-btn");
    var MAX_PHOTOS = 3;
    function updatePhotoLabel() {
      var count = uploadedImages.length;
      if (count >= MAX_PHOTOS) {
        fileInput.disabled = true;
        if (photoLabel) photoLabel.style.opacity = "0.4";
      } else {
        fileInput.disabled = false;
        if (photoLabel) photoLabel.style.opacity = "1";
      }
    }
    fileInput.onchange = async function(e) {
      if (isUploading) return;
      isUploading = true;
      fileInput.disabled = true;
      var remaining = MAX_PHOTOS - uploadedImages.length;
      var files = Array.from(e.target.files).slice(0, remaining);
      for (var fi = 0; fi < files.length; fi++) {
        var file = files[fi];
        if (file.size > 5 * 1024 * 1024) {
          alert(file.name + " dosyas\u0131 5MB s\u0131n\u0131r\u0131n\u0131 a\u015F\u0131yor. L\xFCtfen daha k\xFC\xE7\xFCk bir g\xF6rsel se\xE7in.");
          continue;
        }
        var item = document.createElement("div");
        item.className = "ikr-preview-item";
        item.innerHTML = '<img class="ikr-preview-img" src="' + URL.createObjectURL(file) + '"><div class="ikr-preview-loading">...</div>';
        previewsDiv.appendChild(item);
        var loadingEl = item.querySelector(".ikr-preview-loading");
        try {
          var signRes = await fetchWithTimeout(API_BASE + "/api/public/upload/sign", { method: "POST" });
          if (!signRes.ok) throw new Error("sign failed");
          var sign = await signRes.json();
          var fd = new FormData();
          fd.append("file", file);
          fd.append("api_key", sign.api_key);
          fd.append("timestamp", sign.timestamp);
          fd.append("signature", sign.signature);
          fd.append("folder", "review_images");
          var up = await fetch("https://api.cloudinary.com/v1_1/" + sign.cloud_name + "/image/upload", { method: "POST", body: fd });
          var upData = await up.json();
          if (upData.secure_url) {
            uploadedImages.push(upData.secure_url);
            loadingEl.textContent = "\u2713";
            loadingEl.style.color = "#059669";
          }
        } catch (err) {
          console.error("[ikr] Image upload failed:", err);
          loadingEl.textContent = "\u2717";
          loadingEl.style.color = "#dc2626";
        }
      }
      isUploading = false;
      fileInput.value = "";
      updatePhotoLabel();
    };
    form.querySelector("#ikr-submit").onclick = async function() {
      var btn = this;
      var author = form.querySelector("#ikr-name").value.trim();
      var comment = form.querySelector("#ikr-comment").value.trim();
      var msgDiv = form.querySelector("#ikr-msg");
      if (!author) {
        msgDiv.innerHTML = '<div style="color:#dc2626;font-size:14px;margin-top:8px;">L\xFCtfen ad\u0131n\u0131z\u0131 girin.</div>';
        return;
      }
      btn.disabled = true;
      btn.textContent = "G\xF6nderiliyor...";
      msgDiv.innerHTML = "";
      try {
        var pageSlug = extractSlug(window.location.href);
        var submitName = productName || (document.querySelector("h1") ? document.querySelector("h1").innerText.trim() : null);
        var r = await fetchWithTimeout(API_BASE + "/api/public/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            storeId: PUBLIC_API_KEY,
            productId,
            slug: pageSlug || null,
            productName: submitName,
            author,
            comment,
            rating: currentRating,
            images: uploadedImages
          })
        });
        if (r.ok) {
          form.style.display = "none";
          var thankEl = document.createElement("div");
          thankEl.style.cssText = "text-align:center;padding:30px 20px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;margin-top:30px;";
          thankEl.innerHTML = '<div style="font-size:32px;margin-bottom:12px;">\u2713</div><div style="font-weight:700;font-size:16px;color:#059669;margin-bottom:8px;">Te\u015Fekk\xFCrler!</div><div style="color:#555;font-size:14px;">Yorumunuz incelemeye al\u0131nd\u0131.</div>';
          widgetEl.appendChild(thankEl);
        } else {
          var err = await r.json().catch(function() {
            return {};
          });
          throw new Error(err.error || "Yorum kaydedilemedi.");
        }
      } catch (e) {
        msgDiv.innerHTML = '<div style="color:#dc2626;font-size:14px;margin-top:8px;">' + e.message + "</div>";
        btn.disabled = false;
        btn.textContent = "Yorumu G\xF6nder";
      }
    };
  }

  // src/widget/product-widget/title-finder.js
  function findProductTitleEl(productName) {
    if (productName) {
      var allEls = document.querySelectorAll("h1,h2,h3,h4,h5,h6,div,span,p");
      for (var i = 0; i < allEls.length; i++) {
        var el = allEls[i];
        if (el.children.length === 0 && el.textContent.trim() === productName && el.tagName !== "TITLE" && !el.closest("[data-ikr-listing-badge]") && !el.closest("#ikas-reviews") && !el.closest("nav") && !el.closest("header") && !el.closest('[class*="breadcrumb"]') && !el.closest('[aria-label*="breadcrumb"]')) {
          return el;
        }
      }
    }
    return document.querySelector("h1");
  }

  // src/widget/product-widget/rating-badge.js
  function injectRatingBadge(avgRating, totalCount, productName) {
    var oldBadge = document.getElementById("ikr-rating-badge");
    if (oldBadge) oldBadge.remove();
    if (!avgRating) return;
    var oldJsonLd = document.getElementById("ikr-jsonld");
    if (oldJsonLd) oldJsonLd.remove();
    var jsonLdEl = document.createElement("script");
    jsonLdEl.id = "ikr-jsonld";
    jsonLdEl.type = "application/ld+json";
    jsonLdEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": productName || document.title,
      "url": window.location.href,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": avgRating,
        "reviewCount": totalCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    });
    document.head.appendChild(jsonLdEl);
    var titleEl = findProductTitleEl(productName);
    if (!titleEl || !titleEl.parentNode) return;
    var badge = document.createElement("a");
    badge.id = "ikr-rating-badge";
    badge.href = "#ikas-reviews";
    var titleAlign = window.getComputedStyle(titleEl).textAlign;
    var justifyVal = titleAlign === "center" ? "center" : titleAlign === "right" ? "flex-end" : "flex-start";
    badge.style.cssText = "display:flex;align-items:center;gap:5px;text-decoration:none;margin-bottom:10px;cursor:pointer;justify-content:" + justifyVal + ";";
    badge.innerHTML = starsHTML(avgRating, "16px") + '<span style="font-size:14px;color:#555;">' + avgRating + " (" + totalCount + " yorum)</span>";
    badge.onclick = function(e) {
      e.preventDefault();
      var rev = document.getElementById("ikas-reviews");
      if (rev) rev.scrollIntoView({ behavior: "smooth" });
    };
    titleEl.parentNode.insertBefore(badge, titleEl.nextSibling);
  }

  // src/widget/themes/ozy/styles.js
  var CLASSIC_CSS = `
  #ikas-reviews-widget{color:rgba(0,0,0,1);margin:40px 0;padding:0}
  .ikr-title{font-size:24px;font-weight:800;text-align:center;margin-bottom:24px}

  /* Summary \u2014 3 s\xFCtun: puan | barlar | buton */
  .ikr-summary{display:flex;align-items:center;gap:32px;padding:24px 28px;background:rgba(0,0,0,0.03);border-radius:16px;margin-bottom:24px;flex-wrap:wrap;max-width:780px;margin-left:auto;margin-right:auto;}

  /* Sol \u2014 b\xFCy\xFCk ortalama */
  .ikr-avgbox{display:flex;flex-direction:column;align-items:center;min-width:120px;gap:4px;}
  .ikr-avg-star{font-size:48px;color:var(--ikr-color,#000);line-height:1;}
  .ikr-avg-num{font-size:44px;font-weight:800;line-height:1;color:rgba(0,0,0,1);}
  .ikr-avg-stars{margin:4px 0 2px;font-size:16px;}
  .ikr-avg-count{font-size:14px;color:rgba(0,0,0,1);white-space:nowrap;font-weight:500;}

  /* Orta \u2014 bar chart */
  .ikr-bars{flex:1;display:flex;flex-direction:column;gap:6px;min-width:180px;max-width:400px;}
  .ikr-bar-row{display:flex;align-items:center;gap:8px;font-size:14px;color:rgba(0,0,0,0.75);cursor:pointer;border-radius:6px;padding:3px 6px;}
  .ikr-bar-row:hover{background:var(--ikr-color-light);}
  .ikr-bar-active{background:var(--ikr-color-light)!important;}
  .ikr-bar-label{min-width:28px;text-align:right;white-space:nowrap;}
  .ikr-bar-track{flex:1;background:rgba(0,0,0,0.10);border-radius:4px;height:8px;overflow:hidden;}
  .ikr-bar-fill{height:8px;background:var(--ikr-color,#000);border-radius:4px;}
  .ikr-bar-count{min-width:32px;text-align:right;color:rgba(0,0,0,0.75);}

  /* Sa\u011F \u2014 Yorum Yaz butonu */
  .ikr-write-btn{background:var(--ikr-color,#000);color:#fff;padding:12px 24px;border-radius:10px;cursor:pointer;border:none;font-weight:700;font-size:14px;white-space:nowrap;align-self:center;}

  /* Tavsiye y\xFCzdesi */
  .ikr-recommend{text-align:center;font-size:14px;color:rgba(0,0,0,1);margin:0 0 20px;}
  .ikr-recommend-pct{font-size:18px;font-weight:800;color:rgba(0,0,0,1);margin-right:5px;}

  /* S\u0131ralama sat\u0131r\u0131 */
  .ikr-controls-row{display:flex;align-items:center;justify-content:flex-end;margin-bottom:16px;}
  .ikr-sort-select{font-size:13px;padding:6px 10px;border:1px solid rgba(0,0,0,0.12);border-radius:8px;background:#fff;color:rgba(0,0,0,0.65);cursor:pointer;outline:none;}

  /* Yorumlar */
  .ikr-review{padding:25px 0;border-bottom:1px solid rgba(0,0,0,0.08)}
  .ikr-author{font-weight:700;font-size:15px;color:rgba(0,0,0,1)}
  .ikr-date{color:rgba(0,0,0,0.75);font-size:12px;margin-left:10px}
  .ikr-body{margin-top:10px;line-height:1.6;color:rgba(0,0,0,1)}
  .ikr-gallery{display:flex;gap:10px;margin-top:15px;flex-wrap:wrap}
  .ikr-img{width:100px;height:100px;object-fit:cover;border-radius:8px;border:1px solid rgba(0,0,0,0.10);cursor:zoom-in}
  .ikr-reply{margin-top:15px;padding:15px;background:rgba(0,0,0,0.03);border-radius:8px;border-left:3px solid rgba(0,0,0,0.90);font-size:14px;color:rgba(0,0,0,0.75)}

  /* Form */
  .ikr-form{background:#fff;border:1px solid rgba(0,0,0,0.08);padding:25px;border-radius:12px;margin-top:30px}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;border:1px solid rgba(0,0,0,0.15);border-radius:6px;font-size:14px;box-sizing:border-box;color:rgba(0,0,0,0.90)}
  .ikr-btn{background:var(--ikr-color,#000);color:#fff;padding:10px 25px;border-radius:6px;cursor:pointer;border:none;font-weight:600;margin-top:15px}
  .ikr-btn:disabled{opacity:.6;cursor:not-allowed}
  .ikr-photo-btn{background:rgba(0,0,0,0.04);color:rgba(0,0,0,0.60);padding:8px 15px;border-radius:6px;cursor:pointer;border:1px dashed rgba(0,0,0,0.20);font-size:13px;display:inline-block;margin-top:10px}
  .ikr-preview-item{position:relative;display:inline-block;margin-right:8px;margin-top:8px}
  .ikr-preview-img{width:60px;height:60px;object-fit:cover;border-radius:6px}
  .ikr-preview-loading{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;font-size:10px;border-radius:6px}

  /* Responsive */
  @media(max-width:600px){
    .ikr-summary{flex-direction:column;align-items:stretch;gap:16px;padding:16px;}
    .ikr-avgbox{flex-direction:row;justify-content:center;gap:12px;flex-wrap:wrap;}
    .ikr-write-btn{width:100%;}
    .ikr-sort-select{margin-left:0;}
  }
`;

  // src/widget/product-widget/render.js
  async function render(productId, settings, reviewsData, productName, orderBy, page) {
    if (renderInProgress) {
      setPendingRender({ productId, settings, reviewsData, productName, orderBy, page });
      return;
    }
    setRenderInProgress(true);
    setCurrentProductId(productId);
    setCurrentSettings(settings);
    setCurrentProductName(productName);
    if (orderBy) setCurrentOrderBy(orderBy);
    if (page) setCurrentPage(page);
    try {
      var widgetColor = settings.widgetColor;
      var widgetTitle = settings.widgetTitle;
      injectStyles(widgetColor, CLASSIC_CSS);
      var container = document.getElementById("ikas-reviews");
      if (!container) {
        var anchorEl = document.getElementById("ikas-reviews-anchor");
        if (!anchorEl) return;
        container = document.createElement("div");
        container.id = "ikas-reviews";
        container.style.minHeight = "200px";
        anchorEl.appendChild(container);
      }
      container.innerHTML = '<p style="text-align:center;padding:40px;color:#999;font-size:14px;">Yorumlar y\xFCkleniyor...</p>';
      try {
        var data = reviewsData || {};
        var reviews = data.data && data.data.reviews || [];
        var totalCount = data.data && data.data.totalCount || 0;
        var fresh = container.cloneNode(false);
        container.parentNode.replaceChild(fresh, container);
        container = fresh;
        var widget = document.createElement("div");
        widget.id = "ikas-reviews-widget";
        var h2 = document.createElement("h2");
        h2.className = "ikr-title";
        h2.textContent = widgetTitle;
        widget.appendChild(h2);
        var allCount = data.data && data.data.allCount || totalCount;
        var allRatingCounts = data.data && data.data.ratingCounts || null;
        var ratingCounts = allRatingCounts || [0, 0, 0, 0, 0];
        var avgRatingVal = data.data && data.data.avgRating || "0.0";
        if (!allRatingCounts && reviews.length > 0) {
          reviews.forEach(function(r) {
            if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating - 1]++;
          });
          var s = reviews.reduce(function(a, r) {
            return a + r.rating;
          }, 0);
          avgRatingVal = (s / reviews.length).toFixed(1);
        }
        if (allCount > 0) {
          var summary = document.createElement("div");
          summary.className = "ikr-summary";
          var avgBox = document.createElement("div");
          avgBox.className = "ikr-avgbox";
          avgBox.innerHTML = '<div class="ikr-avg-star">\u2605</div><div class="ikr-avg-num">' + avgRatingVal + '</div><div class="ikr-avg-stars">' + starsHTML(parseFloat(avgRatingVal), null) + '</div><div class="ikr-avg-count">' + allCount.toLocaleString("tr-TR") + " Yorum</div>";
          summary.appendChild(avgBox);
          var bars = document.createElement("div");
          bars.className = "ikr-bars";
          var barRows = [];
          for (var si = 5; si >= 1; si--) {
            var cnt = ratingCounts[si - 1];
            var pct = allCount > 0 ? Math.round(cnt / allCount * 100) : 0;
            var isActive = currentRatingFilter === si;
            var row = document.createElement("div");
            row.className = "ikr-bar-row" + (isActive ? " ikr-bar-active" : "");
            if (currentRatingFilter && !isActive) row.style.opacity = "0.35";
            row.innerHTML = '<span class="ikr-bar-label">' + si + ' \u2605</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:' + pct + '%;"></div></div><span class="ikr-bar-count">' + cnt.toLocaleString("tr-TR") + "</span>";
            (function(starVal) {
              row.onclick = async function() {
                setCurrentRatingFilter(currentRatingFilter === starVal ? null : starVal);
                setCurrentPage(1);
                var filtered = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter);
                await render(currentProductId, currentSettings, filtered, currentProductName, currentOrderBy, 1);
              };
            })(si);
            bars.appendChild(row);
            barRows.push(row);
          }
          summary.appendChild(bars);
          var writeBtn = document.createElement("button");
          writeBtn.className = "ikr-write-btn";
          writeBtn.textContent = "Yorum Yap";
          writeBtn.onclick = function() {
            var form = document.getElementById("ikr-form-section");
            if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
          };
          summary.appendChild(writeBtn);
          widget.appendChild(summary);
          var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
          var recommendPct = allCount > 0 ? Math.round(recommendCount / allCount * 100) : 0;
          if (recommendPct > 0) {
            var recommendEl = document.createElement("div");
            recommendEl.className = "ikr-recommend";
            recommendEl.innerHTML = '<span class="ikr-recommend-pct">%' + recommendPct + "</span> bu \xFCr\xFCn\xFC tavsiye ediyor";
            widget.appendChild(recommendEl);
          }
          var controlsRow = document.createElement("div");
          controlsRow.className = "ikr-controls-row";
          var sortSelect = document.createElement("select");
          sortSelect.className = "ikr-sort-select";
          [["newest", "En Yeni"], ["highest", "En Y\xFCksek Puan"], ["lowest", "En D\xFC\u015F\xFCk Puan"]].forEach(function(opt) {
            var o = document.createElement("option");
            o.value = opt[0];
            o.textContent = opt[1];
            sortSelect.appendChild(o);
          });
          sortSelect.value = currentOrderBy || "newest";
          controlsRow.appendChild(sortSelect);
          widget.appendChild(controlsRow);
        } else {
          var emptyWriteBtn = document.createElement("button");
          emptyWriteBtn.className = "ikr-write-btn";
          emptyWriteBtn.textContent = "\u0130lk Yorumu Yaz";
          emptyWriteBtn.onclick = function() {
            var form = document.getElementById("ikr-form-section");
            if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
          };
          widget.appendChild(emptyWriteBtn);
          var sortSelect = document.createElement("select");
          sortSelect.className = "ikr-sort-select";
          [["newest", "En Yeni"], ["highest", "En Y\xFCksek Puan"], ["lowest", "En D\xFC\u015F\xFCk Puan"]].forEach(function(opt) {
            var o = document.createElement("option");
            o.value = opt[0];
            o.textContent = opt[1];
            sortSelect.appendChild(o);
          });
          sortSelect.value = currentOrderBy || "newest";
        }
        if (reviews.length === 0) {
          var empty = document.createElement("p");
          empty.style.cssText = "color:#888;text-align:center;padding:30px 0;";
          empty.textContent = "Hen\xFCz yorum yok.";
          widget.appendChild(empty);
        } else {
          reviews.forEach(function(r) {
            widget.appendChild(buildReviewEl(r));
          });
        }
        var hasMore = data.data && data.data.hasMore;
        if (hasMore) {
          var loadMoreBtn = document.createElement("button");
          loadMoreBtn.textContent = "Daha Fazla G\xF6ster";
          loadMoreBtn.style.cssText = "display:block;margin:20px auto 0;padding:10px 28px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;color:#555;font-size:14px;cursor:pointer;";
          loadMoreBtn.onclick = async function() {
            loadMoreBtn.disabled = true;
            loadMoreBtn.textContent = "Y\xFCkleniyor...";
            var nextPage = currentPage + 1;
            var moreData = await fetchReviews(currentProductId, currentOrderBy, nextPage, currentRatingFilter);
            if (moreData && moreData.data && moreData.data.reviews) {
              setCurrentPage(nextPage);
              moreData.data.reviews.forEach(function(r) {
                widget.insertBefore(buildReviewEl(r), loadMoreBtn);
              });
              if (!moreData.data.hasMore) loadMoreBtn.remove();
              else {
                loadMoreBtn.disabled = false;
                loadMoreBtn.textContent = "Daha Fazla G\xF6ster";
              }
            } else {
              loadMoreBtn.remove();
            }
          };
          widget.appendChild(loadMoreBtn);
        }
        container.appendChild(widget);
        sortSelect.onchange = async function() {
          setCurrentOrderBy(sortSelect.value);
          setCurrentPage(1);
          var newData = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter);
          await render(currentProductId, currentSettings, newData, currentProductName, currentOrderBy, 1);
        };
        container.addEventListener("click", function(e) {
          var img = e.target.closest("[data-ikr-img-url]");
          if (!img) return;
          var url = img.getAttribute("data-ikr-img-url");
          if (!url || url.indexOf("https://") !== 0) return;
          var overlay = document.createElement("div");
          overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;";
          var imgEl = document.createElement("img");
          imgEl.src = url;
          imgEl.style.cssText = "max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,0.5);object-fit:contain;";
          var closeBtn = document.createElement("button");
          closeBtn.textContent = "\u2715";
          closeBtn.style.cssText = "position:absolute;top:16px;right:20px;background:none;border:none;color:#fff;font-size:28px;cursor:pointer;line-height:1;";
          closeBtn.onclick = function(ev) {
            ev.stopPropagation();
            document.body.removeChild(overlay);
          };
          overlay.appendChild(imgEl);
          overlay.appendChild(closeBtn);
          overlay.onclick = function() {
            document.body.removeChild(overlay);
          };
          imgEl.onclick = function(ev) {
            ev.stopPropagation();
          };
          document.body.appendChild(overlay);
        });
        injectRatingBadge(allCount > 0 ? avgRatingVal : null, totalCount, productName);
        buildReviewForm(widget, productId, productName);
      } catch (err) {
        console.error("[ikr] render error:", err);
        container.innerHTML = '<p style="text-align:center;color:#dc2626;">Yorumlar y\xFCklenirken bir hata olu\u015Ftu.</p>';
      }
    } finally {
      setRenderInProgress(false);
      if (pendingRender) {
        var next = pendingRender;
        setPendingRender(null);
        render(next.productId, next.settings, next.reviewsData, next.productName, next.orderBy, next.page);
      }
    }
  }

  // src/widget/product-widget/bootstrap.js
  var SETTINGS_CACHE_KEY = "ikr_settings_" + PUBLIC_API_KEY;
  var SETTINGS_CACHE_TTL = 60 * 1e3;
  var SETTINGS_404_TTL = 30 * 1e3;
  async function fetchSettings() {
    var staleEntry = null;
    var cached = cacheGet(SETTINGS_CACHE_KEY);
    if (cached) {
      try {
        var entry = JSON.parse(cached);
        if (entry && entry.t !== void 0) {
          if (entry.notFound) {
            if (Date.now() - entry.t < SETTINGS_404_TTL) return null;
            cacheSet(SETTINGS_CACHE_KEY, "");
          } else if (entry.v) {
            if (Date.now() - entry.t < SETTINGS_CACHE_TTL) return entry.v;
            staleEntry = entry.v;
            cacheSet(SETTINGS_CACHE_KEY, "");
          } else {
            cacheSet(SETTINGS_CACHE_KEY, "");
          }
        } else {
          cacheSet(SETTINGS_CACHE_KEY, "");
        }
      } catch (_) {
        cacheSet(SETTINGS_CACHE_KEY, "");
      }
    }
    try {
      var res = await fetchWithTimeout(API_BASE + "/api/public/settings?publicApiKey=" + encodeURIComponent(PUBLIC_API_KEY));
      if (!res.ok) {
        if (res.status === 404) {
          cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), notFound: true }));
        }
        return staleEntry || null;
      }
      var settings = await res.json();
      cacheSet(SETTINGS_CACHE_KEY, JSON.stringify({ t: Date.now(), v: settings }));
      return settings;
    } catch (err) {
      console.error("[ikr] fetchSettings error:", err);
      return staleEntry || null;
    }
  }
  var REVIEWS_CACHE_TTL = 60 * 1e3;
  async function fetchReviews(productId, orderBy, page, ratingFilter) {
    orderBy = orderBy || "newest";
    page = page || 1;
    var key = "ikr_reviews_" + PUBLIC_API_KEY + "_" + productId + "_" + orderBy + "_" + page + "_" + (ratingFilter || "");
    var staleReviews = null;
    var cached = cacheGet(key);
    if (cached) {
      try {
        var entry = JSON.parse(cached);
        if (entry && entry.t !== void 0 && entry.v) {
          if (Date.now() - entry.t < REVIEWS_CACHE_TTL) return entry.v;
          staleReviews = entry.v;
          cacheSet(key, "");
        } else {
          cacheSet(key, "");
        }
      } catch (_) {
        cacheSet(key, "");
      }
    }
    try {
      var url = API_BASE + "/api/public/reviews?storeId=" + encodeURIComponent(PUBLIC_API_KEY) + "&productId=" + encodeURIComponent(productId) + "&orderBy=" + encodeURIComponent(orderBy) + "&page=" + encodeURIComponent(page) + (ratingFilter ? "&rating=" + encodeURIComponent(ratingFilter) : "");
      var res = await fetchWithTimeout(url);
      if (!res.ok) return staleReviews || null;
      var data = await res.json();
      cacheSet(key, JSON.stringify({ t: Date.now(), v: data }));
      return data;
    } catch (err) {
      console.error("[ikr] fetchReviews error:", err);
      return staleReviews || null;
    }
  }
  var bootstrapCache = {};
  async function bootstrap(productId, productName) {
    if (bootstrapCache[productId]) return;
    bootstrapCache[productId] = true;
    var FALLBACK = { widgetColor: "#111", widgetTitle: "M\xFC\u015Fteri Yorumlar\u0131" };
    try {
      var settings = await fetchSettings();
      if (!settings) return;
      setCurrentOrderBy("newest");
      setCurrentPage(1);
      setCurrentRatingFilter(null);
      var reviewsData = await fetchReviews(productId, "newest", 1, null);
      await render(productId, settings, reviewsData, productName, "newest", 1);
    } catch (err) {
      console.error("[ikr] bootstrap error:", err);
      await render(productId, FALLBACK, null, productName);
    } finally {
      delete bootstrapCache[productId];
    }
  }
  function getProductFromPage() {
    try {
      var pageProps = window.__NEXT_DATA__ && window.__NEXT_DATA__.props && window.__NEXT_DATA__.props.pageProps;
      if (pageProps && pageProps.pageType === "PRODUCT" && pageProps.pageSpecificData && pageProps.pageSpecificData.id) {
        return { id: pageProps.pageSpecificData.id, name: pageProps.pageSpecificData.name || null };
      }
    } catch (_) {
    }
    if (window.IkasStorefront && window.IkasStorefront.product && window.IkasStorefront.product.id) {
      return { id: window.IkasStorefront.product.id, name: window.IkasStorefront.product.name || null };
    }
    var match = window.location.pathname.match(/--([a-f0-9-]{36})(?:\/|$|\?)/);
    if (match) return { id: match[1], name: null };
    var qp = new URLSearchParams(window.location.search).get("productId");
    if (qp) return { id: qp, name: null };
    return null;
  }

  // src/widget/listing-badges/collect.js
  function collectSlugs() {
    var map = {};
    var seen = {};
    document.querySelectorAll("a[href]").forEach(function(a) {
      try {
        var href = a.getAttribute("href");
        if (!href || href.charAt(0) === "#" || href.charAt(0) === "?") return;
        var slug = extractSlug(a.href);
        if (!slug || seen[slug]) return;
        if (!/^[a-z0-9][a-z0-9-]{2,}$/.test(slug)) return;
        if (SYSTEM_SLUGS.test(slug)) return;
        seen[slug] = true;
        map[slug] = null;
      } catch (_) {
      }
    });
    Object.keys(ikrSlugMap).forEach(function(slug) {
      map[slug] = ikrSlugMap[slug];
    });
    return map;
  }

  // src/widget/listing-badges/ratings.js
  var RATINGS_CACHE_TTL = 60 * 1e3;
  var RATINGS_BATCH_SIZE = 50;
  async function fetchRatings(slugs) {
    var ratingsKey = "ikr_ratings_" + PUBLIC_API_KEY;
    var ratings = {};
    var cached = cacheGet(ratingsKey);
    if (cached) {
      try {
        var entry = JSON.parse(cached);
        if (entry && entry.t !== void 0 && Date.now() - entry.t < RATINGS_CACHE_TTL) {
          ratings = entry.v || {};
        } else {
          cacheSet(ratingsKey, "");
        }
      } catch (_) {
        cacheSet(ratingsKey, "");
      }
    }
    var missing = slugs.filter(function(s) {
      return !ratings[s];
    });
    if (!missing.length) return ratings;
    var batches = [];
    for (var i = 0; i < missing.length; i += RATINGS_BATCH_SIZE) {
      batches.push(missing.slice(i, i + RATINGS_BATCH_SIZE));
    }
    var batchResults = await Promise.all(batches.map(function(batch) {
      var url = API_BASE + "/api/public/ratings-by-slug?storeId=" + encodeURIComponent(PUBLIC_API_KEY) + "&slugs=" + batch.map(encodeURIComponent).join(",");
      return fetchWithTimeout(url).then(function(res) {
        return res.ok ? res.json().then(function(j) {
          return j.data || {};
        }) : {};
      }).catch(function() {
        return {};
      });
    }));
    batchResults.forEach(function(data) {
      Object.keys(data).forEach(function(slug) {
        ratings[slug] = data[slug];
      });
    });
    cacheSet(ratingsKey, JSON.stringify({ t: Date.now(), v: ratings }));
    return ratings;
  }

  // src/widget/core/badge.js
  var BADGE_CSS = "display:flex;align-items:center;gap:3px;margin-top:0px;margin-bottom:4px;font-size:13px;color:#555;pointer-events:none;";
  function createBadgeEl(rating, justify) {
    var el = document.createElement("div");
    el.setAttribute("data-ikr-listing-badge", "1");
    el.style.cssText = BADGE_CSS + "justify-content:" + (justify || "flex-start") + ";";
    el.innerHTML = starsHTML(rating.avg, null) + "<span>" + rating.avg + " (" + rating.count + ")</span>";
    return el;
  }

  // src/widget/themes/ozy/theme.js
  var THEME_LISTING_TITLE_SELECTOR = ".product-name";
  var THEME_MODAL_SELECTOR = ".add-to-basket-modal";
  var THEME_MODAL_TITLE_SELECTOR = "h1.product-name";
  var THEME_SINGLE_PRODUCT_CONTAINER = ".single-product-container-main";
  var THEME_SINGLE_PRODUCT_NAME_LINK = ".single-product-product-name";
  var THEME_BANNER_CONTAINERS = [
    ".hero-image-banner-main",
    ".hero-image-main",
    ".home-slider-main",
    '[class*="hero-"]',
    '[class*="banner-"]',
    '[class*="slider-banner"]',
    '[class*="marquee"]'
  ].join(",");
  var THEME_PRODUCT_CONTAINERS = [
    ".category-products-main",
    // kategori / arama sonuçları grid'i
    ".products-slider-main",
    // ürün slider section
    ".infinite-scroll-component",
    // sonsuz scroll listing
    '[class*="product-list"]',
    // genel ürün listesi pattern'ı
    ".single-product-container-main",
    // tek ürün section (anasayfa embed)
    ".product-block-container"
    // blog sayfası ürün bloğu
  ].join(",");

  // src/widget/listing-badges/inject.js
  var TITLE_CLASS_SELECTOR = '[class*="productTitle"],[class*="productName"],[class*="product_title"],[class*="product_name"],[class*="product-title"],[class*="product-name"]';
  var STOCK_LABELS = /^(tükendi|sold out|out of stock|stokta yok|satıldı|unavailable)$/i;
  function findTitleEl(scope, productName) {
    var byTheme = scope.querySelector(THEME_LISTING_TITLE_SELECTOR);
    if (byTheme) return byTheme;
    if (scope.matches && scope.matches(TITLE_CLASS_SELECTOR)) return scope;
    var byClass = scope.querySelector(TITLE_CLASS_SELECTOR);
    if (byClass) return byClass;
    if (productName) {
      var all = scope.querySelectorAll("*");
      for (var i = 0; i < all.length; i++) {
        if (all[i].children.length === 0 && all[i].textContent.trim() === productName) return all[i];
      }
    }
    var candidates = scope.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, div");
    for (var j = 0; j < candidates.length; j++) {
      var cel = candidates[j];
      var text = cel.textContent.trim();
      if (!text || text.length < 2 || text.length > 150) continue;
      if (/^[\d\s.,₺$€£%]+$/.test(text)) continue;
      if (STOCK_LABELS.test(text)) continue;
      if (cel.closest("figure") || cel.closest("picture")) continue;
      if (cel.children.length > 1) continue;
      return cel;
    }
    return null;
  }
  function injectBadgeOnLink(a, rating, productName, currentSlug) {
    if (a.getAttribute("data-ikr-badge")) return;
    var slug = extractSlug(a.href);
    if (a.id === "ikr-rating-badge") {
      a.setAttribute("data-ikr-badge", "1");
      return;
    }
    if (slug === currentSlug && a.getAttribute("href") && a.getAttribute("href").charAt(0) === "#") {
      a.setAttribute("data-ikr-badge", "1");
      return;
    }
    if (a.closest("header") || a.closest("nav")) {
      a.setAttribute("data-ikr-badge", "1");
      return;
    }
    if (a.closest('[class*="basket"]') || a.closest('[class*="cart"]')) {
      a.setAttribute("data-ikr-badge", "1");
      return;
    }
    if (a.closest(THEME_SINGLE_PRODUCT_CONTAINER) && !a.closest(THEME_SINGLE_PRODUCT_NAME_LINK)) {
      a.setAttribute("data-ikr-badge", "1");
      return;
    }
    if (a.closest(THEME_BANNER_CONTAINERS)) {
      a.setAttribute("data-ikr-badge", "1");
      return;
    }
    var hasNestedA = !!a.querySelector("a[href]");
    var realText = Array.from(a.childNodes).filter(function(n) {
      return n.nodeType === 3;
    }).map(function(n) {
      return n.textContent.trim();
    }).join("").trim();
    var hasTitleEl = !!findTitleEl(a, productName);
    if (!realText && !hasTitleEl && !hasNestedA) {
      a.setAttribute("data-ikr-badge", "1");
      return;
    }
    a.setAttribute("data-ikr-badge", "1");
    if (hasNestedA) {
      a.querySelectorAll("a[href]").forEach(function(inner) {
        inner.setAttribute("data-ikr-badge", "1");
      });
      var nameEl = findTitleEl(a, productName);
      if (!nameEl || nameEl.querySelector("[data-ikr-listing-badge]")) return;
      var justify = window.getComputedStyle(nameEl).textAlign;
      nameEl.appendChild(createBadgeEl(rating, justify === "center" ? "center" : justify === "right" ? "flex-end" : "flex-start"));
      return;
    }
    var titleEl = findTitleEl(a, productName);
    if (titleEl && titleEl.querySelector("[data-ikr-listing-badge]")) return;
    if (titleEl) {
      var tAlign = window.getComputedStyle(titleEl).textAlign;
      titleEl.appendChild(createBadgeEl(rating, tAlign === "center" ? "center" : tAlign === "right" ? "flex-end" : "flex-start"));
    } else {
      var badge = createBadgeEl(rating, "flex-start");
      var first = a.firstElementChild;
      first ? a.insertBefore(badge, first) : a.appendChild(badge);
    }
  }
  function injectModalBadge(slugNameMap, ratings) {
    var modal = document.querySelector(THEME_MODAL_SELECTOR);
    if (!modal) return;
    var h1 = modal.querySelector(THEME_MODAL_TITLE_SELECTOR);
    if (!h1 || h1.querySelector("[data-ikr-listing-badge]")) return;
    var slug = null;
    if (lastClickedSlug && ratings[lastClickedSlug]) {
      slug = lastClickedSlug;
    }
    if (!slug) {
      var pageSlug = extractSlug(window.location.pathname);
      if (pageSlug && ratings[pageSlug]) slug = pageSlug;
    }
    if (!slug) {
      var h1Text = h1.textContent.trim();
      Object.keys(slugNameMap).forEach(function(s2) {
        if (slug) return;
        var name = slugNameMap[s2];
        if (name && name.trim() === h1Text && ratings[s2]) slug = s2;
      });
    }
    if (!slug) {
      var spContainer = document.querySelector(THEME_SINGLE_PRODUCT_CONTAINER);
      if (spContainer) {
        var spLink = spContainer.querySelector("a[href]");
        if (spLink) {
          var s = extractSlug(spLink.href);
          if (s && ratings[s]) slug = s;
        }
      }
    }
    if (!slug) {
      var h1Lower = h1.textContent.trim().toLowerCase();
      document.querySelectorAll("a[href]").forEach(function(a) {
        if (slug) return;
        if (a.closest("header") || a.closest("nav")) return;
        if (a.closest(THEME_SINGLE_PRODUCT_CONTAINER)) return;
        var aText = a.textContent.trim().toLowerCase();
        if (aText && aText === h1Lower) {
          var s2 = extractSlug(a.href);
          if (s2 && ratings[s2]) slug = s2;
        }
      });
    }
    if (!slug || !ratings[slug]) return;
    h1.appendChild(createBadgeEl(ratings[slug], "flex-start"));
  }
  function injectBadges(slugNameMap, ratings) {
    var currentSlug = extractSlug(window.location.pathname);
    var containers = document.querySelectorAll(THEME_PRODUCT_CONTAINERS);
    var links = [];
    containers.forEach(function(c) {
      if (c.tagName === "A" && c.href) {
        links.push(c);
      } else {
        c.querySelectorAll("a[href]").forEach(function(a) {
          links.push(a);
        });
      }
    });
    Object.keys(slugNameMap).forEach(function(slug) {
      var rating = ratings[slug];
      if (!rating) return;
      var productName = slugNameMap[slug];
      links.forEach(function(a) {
        if (extractSlug(a.href) !== slug) return;
        injectBadgeOnLink(a, rating, productName, currentSlug);
      });
    });
    injectModalBadge(slugNameMap, ratings);
  }

  // src/widget/listing-badges/index.js
  async function renderListingBadges() {
    if (ls.inProgress) {
      ls.queued = true;
      return;
    }
    if (ls.rendered) return;
    ls.rendered = true;
    ls.inProgress = true;
    try {
      var doCleanup = ls.navCleanup;
      if (doCleanup) ls.navCleanup = false;
      var slugNameMap = collectSlugs();
      if (!Object.keys(slugNameMap).length) {
        ls.rendered = false;
        return;
      }
      var results = await Promise.all([fetchSettings(), fetchRatings(Object.keys(slugNameMap))]);
      var settings = results[0];
      if (!settings) {
        ls.rendered = false;
        return;
      }
      var ratings = results[1];
      applyWidgetColor(settings.widgetColor);
      if (doCleanup) {
        document.querySelectorAll("[data-ikr-listing-badge]").forEach(function(el) {
          el.remove();
        });
        document.querySelectorAll("[data-ikr-badge]").forEach(function(el) {
          el.removeAttribute("data-ikr-badge");
        });
      }
      injectBadges(slugNameMap, ratings);
    } finally {
      ls.inProgress = false;
      if (ls.queued) {
        ls.queued = false;
        ls.rendered = false;
        renderListingBadges();
      }
    }
  }

  // src/widget/events.js
  var ikasEventsAttached = false;
  var modalClickAttached = false;
  function attachModalBadgeListener() {
    if (modalClickAttached) return;
    modalClickAttached = true;
    document.addEventListener("click", function(e) {
      var a = e.target.closest("a[href]");
      if (!a) return;
      if (a.closest("header") || a.closest("nav")) return;
      if (a.closest('[class*="basket"]') || a.closest('[class*="cart"]')) return;
      var slug = extractSlug(a.href);
      if (!slug || slug.length < 3) return;
      setLastClickedSlug(slug);
    }, true);
  }
  function attachEvents() {
    if (window.IkasEvents) {
      if (ikasEventsAttached) return;
      ikasEventsAttached = true;
      window.IkasEvents.subscribe({
        id: "ikas-reviews-widget",
        callback: function(event) {
          if (event && event.type === "VIEW_LISTING") {
            var products = event.data && event.data.productDetails;
            if (Array.isArray(products)) {
              products.forEach(function(p) {
                if (p && p.metaData && p.metaData.slug && p.name) {
                  ikrSlugMap[p.metaData.slug] = p.name;
                }
              });
            }
          }
          if (event && event.type === "PRODUCT_VIEW") {
            var productId = event.data && event.data.productDetail && event.data.productDetail.id;
            var productName = event.data && event.data.productDetail && event.data.productDetail.name;
            if (productId) {
              cacheSet("ikr_reviews_" + PUBLIC_API_KEY + "_" + productId, "");
              bootstrap(productId, productName);
            }
          }
          if (event && event.type === "PAGE_VIEW") {
            var now = Date.now();
            if (ls.lastPageView && now - ls.lastPageView < 800) return;
            ls.lastPageView = now;
            ls.navCleanup = true;
            ls.rendered = false;
            renderListingBadges();
          }
        }
      });
      var product = getProductFromPage();
      if (product) bootstrap(product.id, product.name);
      setTimeout(function() {
        if (!ls.rendered) renderListingBadges();
      }, 2e3);
    } else {
      let tryAttach2 = function() {
        if (window.IkasEvents) {
          attachEvents();
        } else if (attempts < 100) {
          attempts++;
          setTimeout(tryAttach2, 50);
        }
      };
      var tryAttach = tryAttach2;
      var attempts = 0;
      setTimeout(tryAttach2, 50);
    }
  }

  // src/widget/observer.js
  var mutationDebounceTimer = null;
  function startMutationObserver() {
    if (typeof MutationObserver === "undefined") return;
    var observer = new MutationObserver(function(mutations) {
      var hasRelevantMutation = mutations.some(function(m) {
        return Array.from(m.addedNodes).some(function(node) {
          if (node.nodeType !== 1) return false;
          if (node.hasAttribute && (node.hasAttribute("data-ikr-listing-badge") || node.id === "ikr-rating-badge" || node.id === "ikr-reviews-widget")) return false;
          if (node.closest && (node.closest("[data-ikr-listing-badge]") || node.closest("#ikr-rating-badge") || node.closest("#ikr-reviews-widget"))) return false;
          if (node.querySelector && node.querySelector("[data-ikr-listing-badge],#ikr-reviews-widget,#ikr-rating-badge")) return false;
          return true;
        });
      });
      if (!hasRelevantMutation) return;
      clearTimeout(mutationDebounceTimer);
      mutationDebounceTimer = setTimeout(function() {
        var hasUnbadged = Array.from(document.querySelectorAll("a[href]")).some(function(a) {
          if (a.getAttribute("data-ikr-badge")) return false;
          var path = extractSlug(a.href);
          return path && path.length >= 3 && !SYSTEM_SLUGS.test(path);
        });
        if (!hasUnbadged) return;
        ls.rendered = false;
        renderListingBadges();
      }, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // src/widget/index.js
  if (PUBLIC_API_KEY) {
    let init = function() {
      attachEvents();
      attachModalBadgeListener();
      startMutationObserver();
    };
    init2 = init;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
  var init2;
})();
