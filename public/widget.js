/* ikas Reviews Widget — built 2026-04-07T01:00:31.762Z | theme: default */
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
  var currentHasImages = false;
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
  function setCurrentHasImages(v) {
    currentHasImages = v;
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

  // src/widget/product-widget/review-modal.js
  function closeModal(overlay, onKeyDown, onPopState) {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("popstate", onPopState);
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }
  function buildRight(r) {
    var right = document.createElement("div");
    right.className = "ikr-modal-right";
    var scrollContent = document.createElement("div");
    scrollContent.className = "ikr-modal-scroll-content";
    var topRow = document.createElement("div");
    topRow.className = "ikr-modal-top-row";
    var starsEl = document.createElement("div");
    starsEl.className = "ikr-modal-stars";
    starsEl.innerHTML = starsHTML(r.rating, null);
    var dateEl = document.createElement("span");
    dateEl.className = "ikr-modal-date";
    dateEl.textContent = formatDate(r.createdAt);
    topRow.appendChild(starsEl);
    topRow.appendChild(dateEl);
    scrollContent.appendChild(topRow);
    if (r.title) {
      var titleEl = document.createElement("div");
      titleEl.className = "ikr-modal-title";
      titleEl.textContent = r.title;
      scrollContent.appendChild(titleEl);
    }
    var authorEl = document.createElement("div");
    authorEl.className = "ikr-modal-author";
    authorEl.textContent = r.author || "";
    scrollContent.appendChild(authorEl);
    if (r.comment && r.comment.trim()) {
      var bodyEl = document.createElement("div");
      bodyEl.className = "ikr-modal-body";
      bodyEl.textContent = r.comment.trim();
      scrollContent.appendChild(bodyEl);
    }
    if (r.merchantReply) {
      var replyEl = document.createElement("div");
      replyEl.className = "ikr-modal-reply";
      replyEl.innerHTML = '<div class="ikr-modal-reply-label">Ma\u011Faza Sahibi</div><div class="ikr-modal-reply-text">' + r.merchantReply + "</div>";
      scrollContent.appendChild(replyEl);
    }
    right.appendChild(scrollContent);
    return right;
  }
  function buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction) {
    var images = r.images && Array.isArray(r.images) ? r.images.filter(function(u) {
      return u && u.indexOf("https://") === 0;
    }) : [];
    var currentPhotoIdx = Math.min(photoIdx, images.length - 1);
    var left = document.createElement("div");
    left.className = "ikr-modal-left";
    var mainImg = document.createElement("img");
    var animClass = direction === "next" ? "ikr-modal-img-enter-right" : direction === "prev" ? "ikr-modal-img-enter-left" : "";
    mainImg.className = "ikr-modal-main-img" + (animClass ? " " + animClass : "");
    mainImg.src = images[currentPhotoIdx] || "";
    mainImg.alt = "Yorum foto\u011Fraf\u0131";
    left.appendChild(mainImg);
    var mobileClose = document.createElement("button");
    mobileClose.className = "ikr-modal-close-mobile";
    mobileClose.textContent = "\u2715";
    mobileClose.setAttribute("aria-label", "Kapat");
    mobileClose.onclick = function(e) {
      e.stopPropagation();
      requestClose();
    };
    left.appendChild(mobileClose);
    if (images.length > 1) {
      var thumbBar = document.createElement("div");
      thumbBar.className = "ikr-modal-thumbs";
      images.forEach(function(url, i) {
        var th = document.createElement("img");
        th.src = url;
        th.className = "ikr-modal-thumb" + (i === currentPhotoIdx ? " ikr-modal-thumb-active" : "");
        th.alt = "K\xFC\xE7\xFCk resim " + (i + 1);
        (function(idx) {
          th.onclick = function() {
            rebuildModal(r, reviewIdx, idx, reviewsWithPhotos, modal, requestClose, true);
          };
        })(i);
        thumbBar.appendChild(th);
      });
      left.appendChild(thumbBar);
    }
    var hasPrevPhoto = currentPhotoIdx > 0;
    var hasNextPhoto = currentPhotoIdx < images.length - 1;
    var hasPrevReview = reviewIdx > 0;
    var hasNextReview = reviewIdx < reviewsWithPhotos.length - 1;
    var hasPrev = hasPrevPhoto || hasPrevReview;
    var hasNext = hasNextPhoto || hasNextReview;
    if (hasPrev || hasNext) {
      var prevBtn = document.createElement("button");
      prevBtn.className = "ikr-modal-nav ikr-modal-nav-prev";
      prevBtn.innerHTML = "&#8249;";
      prevBtn.setAttribute("aria-label", "\xD6nceki");
      prevBtn.style.opacity = hasPrev ? "1" : "0.3";
      prevBtn.onclick = function(e) {
        e.stopPropagation();
        if (hasPrevPhoto) {
          rebuildModal(r, reviewIdx, currentPhotoIdx - 1, reviewsWithPhotos, modal, requestClose, true, "prev");
        } else if (hasPrevReview) {
          var prevReview = reviewsWithPhotos[reviewIdx - 1];
          var prevImages = (prevReview.images || []).filter(function(u) {
            return u && u.indexOf("https://") === 0;
          });
          rebuildModal(prevReview, reviewIdx - 1, prevImages.length - 1, reviewsWithPhotos, modal, requestClose, false, "prev");
        }
      };
      left.appendChild(prevBtn);
      var nextBtn = document.createElement("button");
      nextBtn.className = "ikr-modal-nav ikr-modal-nav-next";
      nextBtn.innerHTML = "&#8250;";
      nextBtn.setAttribute("aria-label", "Sonraki");
      nextBtn.style.opacity = hasNext ? "1" : "0.3";
      nextBtn.onclick = function(e) {
        e.stopPropagation();
        if (hasNextPhoto) {
          rebuildModal(r, reviewIdx, currentPhotoIdx + 1, reviewsWithPhotos, modal, requestClose, true, "next");
        } else if (hasNextReview) {
          var nextReview = reviewsWithPhotos[reviewIdx + 1];
          rebuildModal(nextReview, reviewIdx + 1, 0, reviewsWithPhotos, modal, requestClose, false, "next");
        }
      };
      left.appendChild(nextBtn);
    }
    return left;
  }
  function rebuildModal(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, photoOnly, direction) {
    if (photoOnly) {
      var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction);
      if (modal.firstChild) modal.replaceChild(newLeft, modal.firstChild);
    } else {
      var newLeft = buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose, direction);
      var newRight = buildRight(r);
      modal.innerHTML = "";
      modal.appendChild(newLeft);
      modal.appendChild(newRight);
    }
  }
  function openReviewModal(r, clickedUrl, allReviews) {
    var reviewsWithPhotos = (allReviews || []).filter(function(rv) {
      return rv.images && Array.isArray(rv.images) && rv.images.some(function(u) {
        return u && u.indexOf("https://") === 0;
      });
    });
    var reviewIdx = reviewsWithPhotos.findIndex(function(rv) {
      return rv === r || rv.id === r.id;
    });
    if (reviewIdx === -1) reviewIdx = 0;
    var images = r.images && Array.isArray(r.images) ? r.images.filter(function(u) {
      return u && u.indexOf("https://") === 0;
    }) : [];
    var photoIdx = Math.max(0, images.indexOf(clickedUrl));
    var overlay = document.createElement("div");
    overlay.className = "ikr-modal-overlay";
    var modal = document.createElement("div");
    modal.className = "ikr-modal";
    var closed = false;
    function onPopState() {
      if (closed) return;
      closed = true;
      closeModal(overlay, onKeyDown, onPopState);
    }
    function onKeyDown(e) {
      if (e.key === "Escape") requestClose();
    }
    function requestClose() {
      if (closed) return;
      closed = true;
      history.go(-1);
      closeModal(overlay, onKeyDown, onPopState);
    }
    document.addEventListener("keydown", onKeyDown);
    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = scrollbarWidth + "px";
    document.body.style.overflow = "hidden";
    history.pushState({ ikrModal: true }, "");
    window.addEventListener("popstate", onPopState);
    overlay.onclick = function() {
      requestClose();
    };
    modal.onclick = function(e) {
      e.stopPropagation();
    };
    modal.appendChild(buildLeft(r, reviewIdx, photoIdx, reviewsWithPhotos, modal, requestClose));
    modal.appendChild(buildRight(r));
    var modalWrap = document.createElement("div");
    modalWrap.className = "ikr-modal-wrap";
    modalWrap.appendChild(modal);
    var closeBtn = document.createElement("button");
    closeBtn.className = "ikr-modal-close";
    closeBtn.textContent = "\u2715";
    closeBtn.setAttribute("aria-label", "Kapat");
    closeBtn.onclick = function(e) {
      e.stopPropagation();
      requestClose();
    };
    modalWrap.appendChild(closeBtn);
    overlay.appendChild(modalWrap);
    document.body.appendChild(overlay);
  }

  // src/widget/product-widget/review-item.js
  function buildReviewEl(r, allReviews) {
    var reviewEl = document.createElement("div");
    reviewEl.className = "ikr-review";
    var topRow = document.createElement("div");
    topRow.className = "ikr-review-top";
    var leftTop = document.createElement("div");
    leftTop.className = "ikr-review-top-left";
    leftTop.innerHTML = starsHTML(r.rating, null) + (r.title ? '<span class="ikr-review-title">' + r.title + "</span>" : "");
    var dateEl = document.createElement("span");
    dateEl.className = "ikr-date";
    dateEl.textContent = formatDate(r.createdAt);
    topRow.appendChild(leftTop);
    topRow.appendChild(dateEl);
    reviewEl.appendChild(topRow);
    var authorEl = document.createElement("div");
    authorEl.className = "ikr-author";
    authorEl.textContent = r.author || "";
    reviewEl.appendChild(authorEl);
    var comment = (r.comment || "").trim();
    if (comment) {
      var body = document.createElement("div");
      body.className = "ikr-body ikr-body-clamped";
      body.textContent = comment;
      reviewEl.appendChild(body);
      var readMore = document.createElement("span");
      readMore.className = "ikr-read-more";
      readMore.textContent = "Devam\u0131n\u0131 oku";
      readMore.style.display = "none";
      reviewEl.appendChild(readMore);
      requestAnimationFrame(function() {
        if (body.scrollHeight > body.clientHeight + 2) {
          readMore.style.display = "inline";
          var expanded = false;
          readMore.onclick = function() {
            expanded = !expanded;
            body.classList.toggle("ikr-body-clamped", !expanded);
            readMore.textContent = expanded ? "Daha az g\xF6ster" : "Devam\u0131n\u0131 oku";
          };
        }
      });
    }
    if (r.images && Array.isArray(r.images) && r.images.length) {
      var gallery = document.createElement("div");
      gallery.className = "ikr-gallery";
      r.images.forEach(function(imgUrl) {
        if (!imgUrl || imgUrl.indexOf("https://") !== 0) return;
        var imgEl = document.createElement("img");
        imgEl.src = imgUrl;
        imgEl.className = "ikr-img";
        imgEl.setAttribute("data-ikr-img-url", imgUrl);
        (function(url) {
          imgEl.onclick = function() {
            openReviewModal(r, url, allReviews);
          };
        })(imgUrl);
        gallery.appendChild(imgEl);
      });
      reviewEl.appendChild(gallery);
    }
    if (r.merchantReply) {
      var replyEl = document.createElement("div");
      replyEl.className = "ikr-reply";
      replyEl.innerHTML = '<div class="ikr-reply-header"><span class="ikr-reply-label">Ma\u011Faza Sahibi</span></div><div class="ikr-reply-text">' + r.merchantReply + "</div>";
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
      '<input type="text" id="ikr-name" class="ikr-input" placeholder="Ad\u0131n\u0131z Soyad\u0131n\u0131z" aria-label="Ad\u0131n\u0131z Soyad\u0131n\u0131z" aria-required="true" maxlength="40">',
      '<label for="ikr-title" style="font-size:12px;font-weight:600;margin-top:8px;display:block;">Ba\u015Fl\u0131k <span style="font-weight:400;color:rgba(0,0,0,0.45);">(opsiyonel)</span></label>',
      '<input type="text" id="ikr-title" class="ikr-input" placeholder="Yorumunuzun k\u0131sa ba\u015Fl\u0131\u011F\u0131" aria-label="Yorum ba\u015Fl\u0131\u011F\u0131" maxlength="60">',
      '<label for="ikr-comment" style="font-size:12px;font-weight:600;margin-top:8px;display:block;">Yorumunuz</label>',
      '<textarea id="ikr-comment" class="ikr-textarea" placeholder="Yorumunuz..." rows="3" aria-label="Yorumunuz" maxlength="2000"></textarea>',
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
      var title = form.querySelector("#ikr-title").value.trim();
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
            title: title || null,
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
  .ikr-title{font-size:24px;font-weight:700;text-align:center;margin-bottom:24px}

  /* Summary \u2014 3 s\xFCtun: puan | barlar | buton */
  .ikr-summary{display:flex;align-items:center;gap:32px;padding:24px 28px;border-radius:6px;margin:0 auto 24px;flex-wrap:wrap;max-width:860px;}

  /* Sol \u2014 b\xFCy\xFCk ortalama */
  .ikr-avgbox{display:flex;flex-direction:column;align-items:flex-start;min-width:120px;gap:10px;}
  .ikr-avg-row1{display:flex;align-items:center;gap:8px;}
  .ikr-avg-star{font-size:46px;color:var(--ikr-color,#000);line-height:1;}
  .ikr-avg-num{font-size:46px;font-weight:600;line-height:1;color:rgba(0,0,0,1);}
  .ikr-avg-row2{display:flex;align-items:center;gap:6px;}
  .ikr-avg-stars{margin:4px 0 2px;font-size:15px;}
  .ikr-avg-count{font-size:16px;color:rgba(0,0,0,0.75);white-space:nowrap;font-weight:500;}

  /* Orta \u2014 bar chart */
  .ikr-bars{flex:1;display:flex;flex-direction:column;gap:10px;min-width:180px;max-width:500px;}
  .ikr-bar-row{display:flex;align-items:center;gap:8px;font-size:16px;color:rgba(0,0,0,0.75);cursor:pointer;border-radius:6px;padding:3px 6px;}
  .ikr-bar-row:hover{background:var(--ikr-color-light);}
  .ikr-bar-active{background:var(--ikr-color-light)!important;}
  .ikr-bar-label{min-width:28px;text-align:right;white-space:nowrap;}
  .ikr-bar-track{flex:1;background:rgba(0,0,0,0.10);border-radius:4px;height:10px;overflow:hidden;}
  .ikr-bar-fill{height:10px;background:var(--ikr-color,#000);border-radius:4px;}
  .ikr-bar-count{min-width:20px;text-align:right;color:rgba(0,0,0,0.75);font-size:14px;}

  /* Sa\u011F \u2014 Yorum Yaz butonu */
  .ikr-write-btn{background:var(--ikr-color,#000);color:#fff;padding:12px 24px;border-radius:6px;cursor:pointer;border:none;font-weight:700;font-size:14px;white-space:nowrap;align-self:center;}

  /* Tavsiye y\xFCzdesi */
  .ikr-recommend{font-size:14px;color:rgba(0,0,0,0.75);margin-top:2px;}
  .ikr-recommend-pct{font-weight:700;color:rgba(0,0,0,1);margin-right:3px;}

  /* Buton grubu */
  .ikr-btn-group{display:flex;align-items:center;gap:8px;align-self:center;}
  .ikr-filter-btn{display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:6px;border:2px solid var(--ikr-color,#000);background:#fff;color:var(--ikr-color,#000);cursor:pointer;}
  .ikr-filter-btn-active{background:var(--ikr-color,#000);color:#fff;}

  /* Filtre dropdown */
  .ikr-filter-wrap{position:relative;}
  .ikr-filter-menu{position:absolute;top:calc(100% + 6px);right:0;background:#fff;border:1px solid rgba(0,0,0,0.12);border-radius:6px;box-shadow:0 4px 16px rgba(0,0,0,0.12);min-width:180px;overflow:hidden;z-index:999;}
  .ikr-filter-item{padding:10px 16px;font-size:14px;color:rgba(0,0,0,0.75);cursor:pointer;}
  .ikr-filter-item:hover{background:rgba(0,0,0,0.04);}
  .ikr-filter-item-active{font-weight:700;color:var(--ikr-color,#000);}

  /* Foto\u011Frafl\u0131 Yorumlar b\xF6l\xFCm\xFC */
  .ikr-photo-section{margin-bottom:24px;}
  .ikr-photo-section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
  .ikr-photo-section-title{font-size:15px;font-weight:700;color:rgba(0,0,0,1);}
  .ikr-photo-section-all{font-size:13px;color:var(--ikr-color,#000);font-weight:600;cursor:pointer;}
  .ikr-photo-section-all:hover{opacity:0.75;}
  .ikr-photo-strip-wrap{position:relative;}
  .ikr-photo-strip{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
  .ikr-photo-strip::-webkit-scrollbar{display:none;}
  .ikr-photo-strip-thumb{width:80px;height:80px;object-fit:cover;border-radius:6px;cursor:zoom-in;flex-shrink:0;border:1px solid rgba(0,0,0,0.08);}
  .ikr-photo-strip-arrow{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.12);border-radius:6px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px;color:rgba(0,0,0,0.7);box-shadow:0 2px 8px rgba(0,0,0,0.08);}
  .ikr-photo-strip-arrow:hover{background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.08);}
  .ikr-photo-strip-arrow-prev{left:-16px;}
  .ikr-photo-strip-arrow-next{right:-16px;}
  @media(max-width:600px){.ikr-photo-strip-arrow{display:none;}}

  /* Yorumlar */
  .ikr-review{padding:20px 0;border-bottom:1px solid rgba(0,0,0,0.08);}
  .ikr-review-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;}
  .ikr-review-top-left{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:20px;}
  .ikr-review-title{font-weight:700;font-size:15px;color:rgba(0,0,0,1);}
  .ikr-author{font-size:13px;color:rgba(0,0,0,1);margin-top:3px;}
  .ikr-date{color:rgba(0,0,0,1);font-size:13px;white-space:nowrap;flex-shrink:0;}
  .ikr-body{margin-top:8px;line-height:1.65;color:rgba(0,0,0,1);font-size:14px;}
  .ikr-body-clamped{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;}
  .ikr-read-more{display:block;margin-top:4px;color:var(--ikr-color,#000);font-weight:600;cursor:pointer;font-size:13px;}
  .ikr-gallery{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap;}
  .ikr-img{width:90px;height:90px;object-fit:cover;border-radius:6px;border:1px solid rgba(0,0,0,0.10);cursor:zoom-in;}
  .ikr-reply{margin-top:12px;padding:12px 16px;background:rgba(0,0,0,0.03);border-radius:6px;border-left:3px solid var(--ikr-color,#000);}
  .ikr-reply-header{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .ikr-reply-label{font-weight:700;font-size:13px;color:rgba(0,0,0,1);}
  .ikr-reply-text{font-size:13px;color:rgba(0,0,0,0.75);line-height:1.6;}

  /* Form */
  .ikr-form{background:#fff;border:1px solid rgba(0,0,0,0.08);padding:25px;border-radius:6px;margin-top:30px}
  .ikr-input,.ikr-textarea{width:100%;padding:10px;margin-top:8px;border:1px solid rgba(0,0,0,0.15);border-radius:6px;font-size:14px;box-sizing:border-box;color:rgba(0,0,0,0.90)}
  .ikr-btn{background:var(--ikr-color,#000);color:#fff;padding:10px 25px;border-radius:6px;cursor:pointer;border:none;font-weight:600;margin-top:15px}
  .ikr-btn:disabled{opacity:.6;cursor:not-allowed}
  .ikr-photo-btn{background:rgba(0,0,0,0.04);color:rgba(0,0,0,0.60);padding:8px 15px;border-radius:6px;cursor:pointer;border:1px dashed rgba(0,0,0,0.20);font-size:13px;display:inline-block;margin-top:10px}
  .ikr-preview-item{position:relative;display:inline-block;margin-right:8px;margin-top:8px}
  .ikr-preview-img{width:60px;height:60px;object-fit:cover;border-radius:6px}
  .ikr-preview-loading{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,.7);display:flex;align-items:center;justify-content:center;font-size:10px;border-radius:6px}

  /* Review Modal */
  .ikr-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.50);z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;overscroll-behavior:contain;}
  .ikr-modal-wrap{position:relative;width:100%;max-width:813px;}
  .ikr-modal{background:#fff;border-radius:12px;overflow:hidden;display:flex;width:100%;height:584px;max-height:80vh;box-shadow:0 16px 48px rgba(0,0,0,0.25);}
  .ikr-modal-left{flex:0 0 438px;background:#222;position:relative;overflow:hidden;}
  .ikr-modal-main-img{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;display:block;}
  .ikr-modal-img-enter-right{animation:ikrSlideInRight 0.2s ease forwards;}
  .ikr-modal-img-enter-left{animation:ikrSlideInLeft 0.2s ease forwards;}
  @keyframes ikrSlideInRight{from{transform:translateX(60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  @keyframes ikrSlideInLeft{from{transform:translateX(-60px);opacity:0;}to{transform:translateX(0);opacity:1;}}
  .ikr-modal-close{position:absolute;top:-42px;right:0;background:#000;border:2px solid #000;color:#fff;font-size:14px;cursor:pointer;line-height:1;padding:0;border-radius:6px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;z-index:100000;box-shadow:0 2px 8px rgba(0,0,0,0.20);}
  .ikr-modal-close:hover{background:#222;border-color:#222;}
  @media(max-width:640px){.ikr-modal-close{display:none;}}
  .ikr-modal-close-mobile{display:none;position:absolute;top:12px;right:12px;background:rgba(0,0,0,0.45);border:none;color:#fff;width:32px;height:32px;border-radius:6px;font-size:15px;cursor:pointer;align-items:center;justify-content:center;line-height:1;z-index:2;}
  .ikr-modal-close-mobile:hover{background:rgba(0,0,0,0.70);}
  .ikr-modal-nav{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.45);border:none;color:#fff;width:36px;height:36px;border-radius:6px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;line-height:1;}
  .ikr-modal-nav-prev{left:10px;}
  .ikr-modal-nav-next{right:10px;}
  .ikr-modal-thumbs{position:absolute;bottom:12px;left:0;right:0;display:flex;justify-content:center;gap:6px;padding:0 12px;}
  .ikr-modal-thumb{width:52px;height:52px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid transparent;opacity:0.7;}
  .ikr-modal-thumb-active{border-color:#fff;opacity:1;}
  .ikr-modal-right{flex:1;min-height:0;overflow-y:auto;padding:0;display:flex;flex-direction:column;}
  .ikr-modal-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:4px;}
  .ikr-modal-stars{font-size:18px;}
  .ikr-modal-date{font-size:13px;color:rgba(0,0,0,1);white-space:nowrap;flex-shrink:0;}
  .ikr-modal-title{font-weight:700;font-size:15px;color:rgba(0,0,0,1);margin-bottom:2px;}
  .ikr-modal-author{font-size:13px;color:rgba(0,0,0,1);}
  .ikr-modal-scroll-content{padding:24px 24px 24px;display:flex;flex-direction:column;gap:10px;}
  .ikr-modal-body{font-size:14px;line-height:1.65;color:rgba(0,0,0,1);}
  .ikr-modal-reply{margin-top:8px;padding:12px 16px;background:rgba(0,0,0,0.03);border-radius:6px;border-left:3px solid var(--ikr-color,#000);}
  .ikr-modal-reply-label{font-weight:700;font-size:13px;color:rgba(0,0,0,1);margin-bottom:4px;}
  .ikr-modal-reply-text{font-size:13px;color:rgba(0,0,0,0.75);line-height:1.6;}

  /* Responsive */
  @media(max-width:640px){
    .ikr-modal-overlay{padding:0;background:rgba(0,0,0,0.50);}
    .ikr-modal-wrap{position:fixed;inset:0;overflow-y:auto;z-index:100000;width:100%;max-width:100%;overscroll-behavior:contain;}
    .ikr-modal{flex-direction:column;height:auto;border-radius:0;box-shadow:none;overflow:hidden;max-height:none;}
    .ikr-modal-left{flex:none;width:100%;aspect-ratio:3/4;overflow:hidden;}
    .ikr-modal-right{overflow-y:visible;flex:none;width:100%;}
    .ikr-modal-scroll-content{padding:16px 16px 48px;}
    .ikr-modal-close{display:none;}
    .ikr-modal-close-mobile{display:flex;}
  }
  @media(max-width:600px){
    .ikr-summary{flex-direction:column;align-items:stretch;gap:16px;padding:16px;}
    .ikr-avgbox{flex-direction:column;align-items:center;gap:10px;}
    .ikr-write-btn{flex:1;}
    .ikr-btn-group{width:100%;align-self:stretch;}
    .ikr-sort-select{margin-left:0;}
    .ikr-review-top-left{font-size:18px;flex-direction:column;align-items:flex-start;gap:4px;}
    .ikr-review-title{font-size:14px;}
    .ikr-author{font-size:12px;}
    .ikr-date{font-size:12px;}
    .ikr-body{font-size:13px;}
    .ikr-read-more{font-size:12px;}
    .ikr-reply-label{font-size:12px;}
    .ikr-reply-text{font-size:12px;}
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
          var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
          var recommendPct = allCount > 0 ? Math.round(recommendCount / allCount * 100) : 0;
          avgBox.innerHTML = '<div class="ikr-avg-row1"><span class="ikr-avg-star">\u2605</span><span class="ikr-avg-num">' + avgRatingVal + '</span></div><div class="ikr-avg-row2"><span class="ikr-avg-count">' + allCount.toLocaleString("tr-TR") + " Yorum</span></div>" + (recommendPct > 0 ? '<div class="ikr-recommend"><span class="ikr-recommend-pct">%' + recommendPct + "</span> bu \xFCr\xFCn\xFC tavsiye ediyor</div>" : "");
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
            row.innerHTML = '<span class="ikr-bar-label">' + si + ' \u2605</span><div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:' + pct + '%;"></div></div><span class="ikr-bar-count">(' + cnt.toLocaleString("tr-TR") + ")</span>";
            (function(starVal) {
              row.onclick = async function() {
                setCurrentRatingFilter(currentRatingFilter === starVal ? null : starVal);
                setCurrentPage(1);
                var filtered = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter, currentHasImages);
                await render(currentProductId, currentSettings, filtered, currentProductName, currentOrderBy, 1);
              };
            })(si);
            bars.appendChild(row);
            barRows.push(row);
          }
          summary.appendChild(bars);
          var btnGroup = document.createElement("div");
          btnGroup.className = "ikr-btn-group";
          var writeBtn = document.createElement("button");
          writeBtn.className = "ikr-write-btn";
          writeBtn.textContent = "Yorum Yap";
          writeBtn.onclick = function() {
            var form = document.getElementById("ikr-form-section");
            if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
          };
          btnGroup.appendChild(writeBtn);
          var filterWrap = document.createElement("div");
          filterWrap.className = "ikr-filter-wrap";
          var filterBtn = document.createElement("button");
          filterBtn.className = "ikr-filter-btn";
          filterBtn.setAttribute("aria-label", "Filtrele");
          filterBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>';
          var filterMenu = document.createElement("div");
          filterMenu.className = "ikr-filter-menu";
          filterMenu.style.display = "none";
          var filterOpts = [
            ["newest", "En Yeni", false],
            ["highest", "En Y\xFCksek Puan", false],
            ["lowest", "En D\xFC\u015F\xFCk Puan", false],
            ["photos", "Foto\u011Frafl\u0131", true]
          ];
          filterOpts.forEach(function(opt) {
            var isPhotos = opt[2];
            var isActive2 = isPhotos ? currentHasImages : !currentHasImages && (currentOrderBy || "newest") === opt[0];
            var item = document.createElement("div");
            item.className = "ikr-filter-item" + (isActive2 ? " ikr-filter-item-active" : "");
            item.textContent = opt[1];
            item.onclick = async function() {
              filterMenu.style.display = "none";
              filterBtn.classList.remove("ikr-filter-btn-active");
              setCurrentPage(1);
              if (isPhotos) {
                setCurrentHasImages(true);
                setCurrentOrderBy("newest");
              } else {
                setCurrentHasImages(false);
                setCurrentOrderBy(opt[0]);
              }
              var newData = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter, currentHasImages);
              await render(currentProductId, currentSettings, newData, currentProductName, currentOrderBy, 1);
            };
            filterMenu.appendChild(item);
          });
          filterBtn.onclick = function(e) {
            e.stopPropagation();
            var isOpen = filterMenu.style.display !== "none";
            filterMenu.style.display = isOpen ? "none" : "block";
            filterBtn.classList.toggle("ikr-filter-btn-active", !isOpen);
          };
          filterWrap.addEventListener("click", function(e) {
            e.stopPropagation();
          });
          widget.addEventListener("click", function(e) {
            if (!filterWrap.contains(e.target)) {
              filterMenu.style.display = "none";
              filterBtn.classList.remove("ikr-filter-btn-active");
            }
          });
          filterWrap.appendChild(filterBtn);
          filterWrap.appendChild(filterMenu);
          btnGroup.appendChild(filterWrap);
          summary.appendChild(btnGroup);
          widget.appendChild(summary);
        } else {
          var emptyWriteBtn = document.createElement("button");
          emptyWriteBtn.className = "ikr-write-btn";
          emptyWriteBtn.textContent = "\u0130lk Yorumu Yaz";
          emptyWriteBtn.onclick = function() {
            var form = document.getElementById("ikr-form-section");
            if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
          };
          widget.appendChild(emptyWriteBtn);
        }
        var allReviewsWithPhotos = reviews.filter(function(r) {
          return r.images && Array.isArray(r.images) && r.images.some(function(u) {
            return u && u.indexOf("https://") === 0;
          });
        });
        if (!currentHasImages && allReviewsWithPhotos.length > 0) {
          var photoSection = document.createElement("div");
          photoSection.className = "ikr-photo-section";
          var photoHeader = document.createElement("div");
          photoHeader.className = "ikr-photo-section-header";
          var photoTitle = document.createElement("span");
          photoTitle.className = "ikr-photo-section-title";
          photoTitle.textContent = "Foto\u011Frafl\u0131 Yorumlar";
          photoHeader.appendChild(photoTitle);
          photoSection.appendChild(photoHeader);
          var photoStrip = document.createElement("div");
          photoStrip.className = "ikr-photo-strip";
          var thumbCount = 0;
          allReviewsWithPhotos.forEach(function(r) {
            if (thumbCount >= 10) return;
            var firstImg = r.images.find(function(u) {
              return u && u.indexOf("https://") === 0;
            });
            if (!firstImg) return;
            var thumb = document.createElement("img");
            thumb.src = firstImg;
            thumb.className = "ikr-photo-strip-thumb";
            thumb.alt = "Yorum foto\u011Fraf\u0131";
            (function(url, review) {
              thumb.onclick = function() {
                openReviewModal(review, url, reviews);
              };
            })(firstImg, r);
            photoStrip.appendChild(thumb);
            thumbCount++;
          });
          var prevArrow = document.createElement("button");
          prevArrow.className = "ikr-photo-strip-arrow ikr-photo-strip-arrow-prev";
          prevArrow.innerHTML = "&#8249;";
          prevArrow.setAttribute("aria-label", "\xD6nceki");
          prevArrow.onclick = function() {
            photoStrip.scrollBy({ left: -200, behavior: "smooth" });
          };
          var nextArrow = document.createElement("button");
          nextArrow.className = "ikr-photo-strip-arrow ikr-photo-strip-arrow-next";
          nextArrow.innerHTML = "&#8250;";
          nextArrow.setAttribute("aria-label", "Sonraki");
          nextArrow.onclick = function() {
            photoStrip.scrollBy({ left: 200, behavior: "smooth" });
          };
          var stripWrap = document.createElement("div");
          stripWrap.className = "ikr-photo-strip-wrap";
          stripWrap.appendChild(prevArrow);
          stripWrap.appendChild(photoStrip);
          stripWrap.appendChild(nextArrow);
          photoSection.appendChild(stripWrap);
          widget.appendChild(photoSection);
        }
        if (reviews.length === 0) {
          var empty = document.createElement("p");
          empty.style.cssText = "color:#888;text-align:center;padding:30px 0;";
          empty.textContent = "Hen\xFCz yorum yok.";
          widget.appendChild(empty);
        } else {
          reviews.forEach(function(r) {
            widget.appendChild(buildReviewEl(r, reviews));
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
            var moreData = await fetchReviews(currentProductId, currentOrderBy, nextPage, currentRatingFilter, currentHasImages);
            if (moreData && moreData.data && moreData.data.reviews) {
              setCurrentPage(nextPage);
              moreData.data.reviews.forEach(function(r) {
                widget.insertBefore(buildReviewEl(r, moreData.data.reviews), loadMoreBtn);
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
  async function fetchReviews(productId, orderBy, page, ratingFilter, hasImages) {
    orderBy = orderBy || "newest";
    page = page || 1;
    var key = "ikr_reviews_" + PUBLIC_API_KEY + "_" + productId + "_" + orderBy + "_" + page + "_" + (ratingFilter || "") + "_" + (hasImages ? "1" : "0");
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
      var url = API_BASE + "/api/public/reviews?storeId=" + encodeURIComponent(PUBLIC_API_KEY) + "&productId=" + encodeURIComponent(productId) + "&orderBy=" + encodeURIComponent(orderBy) + "&page=" + encodeURIComponent(page) + (ratingFilter ? "&rating=" + encodeURIComponent(ratingFilter) : "") + (hasImages ? "&hasImages=true" : "");
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
