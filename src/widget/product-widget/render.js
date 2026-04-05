// product-widget/render.js — Ana widget render fonksiyonu

import { starsHTML, injectStyles } from '../core/helpers.js';
import { fetchReviews } from './bootstrap.js';
import { buildReviewEl } from './review-item.js';
import { buildReviewForm } from './review-form.js';
import { injectRatingBadge } from './rating-badge.js';
import { CLASSIC_CSS } from '../themes/ozy/styles.js';
import {
  renderInProgress, pendingRender,
  setRenderInProgress, setPendingRender,
  currentOrderBy, currentPage, currentRatingFilter, currentProductId, currentSettings, currentProductName,
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter, setCurrentProductId, setCurrentSettings, setCurrentProductName,
} from '../core/state.js';

export async function render(productId, settings, reviewsData, productName, orderBy, page) {
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

    var container = document.getElementById('ikas-reviews');
    if (!container) {
      var anchorEl = document.getElementById('ikas-reviews-anchor');
      if (!anchorEl) return;
      container = document.createElement('div');
      container.id = 'ikas-reviews';
      container.style.minHeight = '200px';
      anchorEl.appendChild(container);
    }

    container.innerHTML = '<p style="text-align:center;padding:40px;color:#999;font-size:14px;">Yorumlar yükleniyor...</p>';

    try {
      var data = reviewsData || {};
      var reviews = (data.data && data.data.reviews) || [];
      var totalCount = (data.data && data.data.totalCount) || 0;

      // Önceki listener'ları temizle
      var fresh = container.cloneNode(false);
      container.parentNode.replaceChild(fresh, container);
      container = fresh;

      var widget = document.createElement('div');
      widget.id = 'ikas-reviews-widget';

      // Başlık
      var h2 = document.createElement('h2');
      h2.className = 'ikr-title';
      h2.textContent = widgetTitle;
      widget.appendChild(h2);

      // Özet istatistik — ortalama puan + bar chart + write a review butonu
      var allCount = (data.data && data.data.allCount) || totalCount;
      var allRatingCounts = (data.data && data.data.ratingCounts) || null;
      var ratingCounts = allRatingCounts || [0, 0, 0, 0, 0];
      var avgRatingVal = (data.data && data.data.avgRating) || '0.0';
      if (!allRatingCounts && reviews.length > 0) {
        reviews.forEach(function(r) { if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating - 1]++; });
        var s = reviews.reduce(function(a, r) { return a + r.rating; }, 0);
        avgRatingVal = (s / reviews.length).toFixed(1);
      }

      if (allCount > 0) {
        var summary = document.createElement('div');
        summary.className = 'ikr-summary';

        // Sol — büyük ortalama puan
        var avgBox = document.createElement('div');
        avgBox.className = 'ikr-avgbox';
        avgBox.innerHTML =
          '<div class="ikr-avg-star">★</div>' +
          '<div class="ikr-avg-num">' + avgRatingVal + '</div>' +
          '<div class="ikr-avg-stars">' + starsHTML(parseFloat(avgRatingVal), null) + '</div>' +
          '<div class="ikr-avg-count">' + allCount.toLocaleString('tr-TR') + ' Yorum</div>';
        summary.appendChild(avgBox);

        // Orta — bar chart
        var bars = document.createElement('div');
        bars.className = 'ikr-bars';
        var barRows = [];
        for (var si = 5; si >= 1; si--) {
          var cnt = ratingCounts[si - 1];
          var pct = allCount > 0 ? Math.round((cnt / allCount) * 100) : 0;
          var isActive = currentRatingFilter === si;
          var row = document.createElement('div');
          row.className = 'ikr-bar-row' + (isActive ? ' ikr-bar-active' : '');
          if (currentRatingFilter && !isActive) row.style.opacity = '0.35';
          row.innerHTML =
            '<span class="ikr-bar-label">' + si + ' ★</span>' +
            '<div class="ikr-bar-track"><div class="ikr-bar-fill" style="width:' + pct + '%;"></div></div>' +
            '<span class="ikr-bar-count">' + cnt.toLocaleString('tr-TR') + '</span>';
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

        // Sağ — Yorum Yaz butonu
        var writeBtn = document.createElement('button');
        writeBtn.className = 'ikr-write-btn';
        writeBtn.textContent = 'Yorum Yaz';
        writeBtn.onclick = function() {
          var form = document.getElementById('ikr-form-section');
          if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        summary.appendChild(writeBtn);

        widget.appendChild(summary);

        // Tavsiye yüzdesi
        var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
        var recommendPct = allCount > 0 ? Math.round((recommendCount / allCount) * 100) : 0;
        if (recommendPct > 0) {
          var recommendEl = document.createElement('div');
          recommendEl.className = 'ikr-recommend';
          recommendEl.innerHTML = '<span class="ikr-recommend-pct">%' + recommendPct + '</span> bu ürünü tavsiye ediyor';
          widget.appendChild(recommendEl);
        }

        // Sıralama satırı
        var controlsRow = document.createElement('div');
        controlsRow.className = 'ikr-controls-row';
        var sortSelect = document.createElement('select');
        sortSelect.className = 'ikr-sort-select';
        [['newest','En Yeni'],['highest','En Yüksek Puan'],['lowest','En Düşük Puan']].forEach(function(opt) {
          var o = document.createElement('option');
          o.value = opt[0]; o.textContent = opt[1];
          sortSelect.appendChild(o);
        });
        sortSelect.value = currentOrderBy || 'newest';
        controlsRow.appendChild(sortSelect);
        widget.appendChild(controlsRow);
      } else {
        // Yorum yoksa sadece Yorum Yaz butonu göster
        var emptyWriteBtn = document.createElement('button');
        emptyWriteBtn.className = 'ikr-write-btn';
        emptyWriteBtn.textContent = 'İlk Yorumu Yaz';
        emptyWriteBtn.onclick = function() {
          var form = document.getElementById('ikr-form-section');
          if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        widget.appendChild(emptyWriteBtn);

        var sortSelect = document.createElement('select');
        sortSelect.className = 'ikr-sort-select';
        [['newest','En Yeni'],['highest','En Yüksek Puan'],['lowest','En Düşük Puan']].forEach(function(opt) {
          var o = document.createElement('option');
          o.value = opt[0]; o.textContent = opt[1];
          sortSelect.appendChild(o);
        });
        sortSelect.value = currentOrderBy || 'newest';
      }

      if (reviews.length === 0) {
        var empty = document.createElement('p');
        empty.style.cssText = 'color:#888;text-align:center;padding:30px 0;';
        empty.textContent = 'Henüz yorum yok.';
        widget.appendChild(empty);
      } else {
        reviews.forEach(function(r) { widget.appendChild(buildReviewEl(r)); });
      }

      // Daha Fazla butonu
      var hasMore = data.data && data.data.hasMore;
      if (hasMore) {
        var loadMoreBtn = document.createElement('button');
        loadMoreBtn.textContent = 'Daha Fazla Göster';
        loadMoreBtn.style.cssText = 'display:block;margin:20px auto 0;padding:10px 28px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;color:#555;font-size:14px;cursor:pointer;';
        loadMoreBtn.onclick = async function() {
          loadMoreBtn.disabled = true;
          loadMoreBtn.textContent = 'Yükleniyor...';
          var nextPage = currentPage + 1;
          var moreData = await fetchReviews(currentProductId, currentOrderBy, nextPage, currentRatingFilter);
          if (moreData && moreData.data && moreData.data.reviews) {
            setCurrentPage(nextPage);
            moreData.data.reviews.forEach(function(r) {
              widget.insertBefore(buildReviewEl(r), loadMoreBtn);
            });
            if (!moreData.data.hasMore) loadMoreBtn.remove();
            else { loadMoreBtn.disabled = false; loadMoreBtn.textContent = 'Daha Fazla Göster'; }
          } else {
            loadMoreBtn.remove();
          }
        };
        widget.appendChild(loadMoreBtn);
      }

      container.appendChild(widget);

      // Sıralama dropdown onChange
      sortSelect.onchange = async function() {
        setCurrentOrderBy(sortSelect.value);
        setCurrentPage(1);
        var newData = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter);
        await render(currentProductId, currentSettings, newData, currentProductName, currentOrderBy, 1);
      };

      // Lightbox modal — resim tıklaması
      container.addEventListener('click', function(e) {
        var img = e.target.closest('[data-ikr-img-url]');
        if (!img) return;
        var url = img.getAttribute('data-ikr-img-url');
        if (!url || url.indexOf('https://') !== 0) return;
        var overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
        var imgEl = document.createElement('img');
        imgEl.src = url;
        imgEl.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,0.5);object-fit:contain;';
        var closeBtn = document.createElement('button');
        closeBtn.textContent = '✕';
        closeBtn.style.cssText = 'position:absolute;top:16px;right:20px;background:none;border:none;color:#fff;font-size:28px;cursor:pointer;line-height:1;';
        closeBtn.onclick = function(ev) { ev.stopPropagation(); document.body.removeChild(overlay); };
        overlay.appendChild(imgEl);
        overlay.appendChild(closeBtn);
        overlay.onclick = function() { document.body.removeChild(overlay); };
        imgEl.onclick = function(ev) { ev.stopPropagation(); };
        document.body.appendChild(overlay);
      });

      // Rating badge + JSON-LD
      injectRatingBadge(allCount > 0 ? avgRatingVal : null, totalCount, productName);

      // Yorum formu
      buildReviewForm(widget, productId, productName);

    } catch (err) {
      console.error('[ikr] render error:', err);
      container.innerHTML = '<p style="text-align:center;color:#dc2626;">Yorumlar yüklenirken bir hata oluştu.</p>';
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
