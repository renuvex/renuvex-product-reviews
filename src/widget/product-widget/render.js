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

      // Başlık + sıralama dropdown
      var header = document.createElement('div');
      header.className = 'ikr-header';
      header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;';
      var h2 = document.createElement('h2');
      h2.className = 'ikr-title';
      h2.textContent = widgetTitle + ' (' + totalCount + ')';
      header.appendChild(h2);

      var sortSelect = document.createElement('select');
      sortSelect.style.cssText = 'font-size:13px;padding:6px 10px;border:1px solid #e5e7eb;border-radius:8px;background:#fff;color:#555;cursor:pointer;outline:none;';
      [['newest','En Yeni'],['highest','En Yüksek Puan'],['lowest','En Düşük Puan']].forEach(function(opt) {
        var o = document.createElement('option');
        o.value = opt[0]; o.textContent = opt[1];
        sortSelect.appendChild(o);
      });
      sortSelect.value = currentOrderBy || 'newest';
      header.appendChild(sortSelect);
      widget.appendChild(header);

      // Özet istatistik — ortalama puan + bar chart
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
        summary.style.cssText = 'display:flex;align-items:center;gap:24px;padding:20px;background:#f9f9f9;border-radius:12px;margin-bottom:20px;';

        var avgBox = document.createElement('div');
        avgBox.style.cssText = 'text-align:center;min-width:80px;';
        avgBox.innerHTML = '<div style="font-size:40px;font-weight:700;line-height:1;color:#111;">' + avgRatingVal + '</div>' +
          '<div style="margin:6px 0 4px;">' + starsHTML(parseFloat(avgRatingVal), null) + '</div>' +
          '<div style="font-size:12px;color:#888;">' + totalCount + ' yorum</div>';
        summary.appendChild(avgBox);

        var bars = document.createElement('div');
        bars.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:5px;';
        for (var si = 5; si >= 1; si--) {
          var cnt = ratingCounts[si - 1];
          var pct = reviews.length > 0 ? Math.round((cnt / reviews.length) * 100) : 0;
          var isActive = currentRatingFilter === si;
          var row = document.createElement('div');
          row.style.cssText = 'display:flex;align-items:center;gap:8px;font-size:12px;color:#555;cursor:pointer;border-radius:6px;padding:2px 4px;' + (isActive ? 'background:#fef9c3;' : '');
          row.innerHTML = '<span style="min-width:16px;text-align:right;">' + si + '</span>' +
            '<span style="color:#f59e0b;font-size:11px;">★</span>' +
            '<div style="flex:1;background:#e5e7eb;border-radius:4px;height:8px;">' +
              '<div style="width:' + pct + '%;background:#f59e0b;border-radius:4px;height:8px;transition:width 0.3s;"></div>' +
            '</div>' +
            '<span style="min-width:28px;">' + pct + '%</span>';
          (function(starVal) {
            row.onclick = async function() {
              setCurrentRatingFilter(currentRatingFilter === starVal ? null : starVal);
              setCurrentPage(1);
              var filtered = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter);
              await render(currentProductId, currentSettings, filtered, currentProductName, currentOrderBy, 1);
            };
          })(si);
          bars.appendChild(row);
        }
        summary.appendChild(bars);
        widget.appendChild(summary);

        if (currentRatingFilter) {
          var chip = document.createElement('div');
          chip.style.cssText = 'display:inline-flex;align-items:center;gap:8px;padding:6px 12px;background:#fef9c3;border:1px solid #fde047;border-radius:20px;font-size:13px;color:#555;margin-bottom:12px;';
          chip.innerHTML = currentRatingFilter + ' ★ gösteriliyor &nbsp;';
          var clearBtn = document.createElement('span');
          clearBtn.textContent = '✕';
          clearBtn.style.cssText = 'cursor:pointer;font-weight:bold;color:#888;';
          clearBtn.onclick = async function() {
            setCurrentRatingFilter(null);
            setCurrentPage(1);
            var allData = await fetchReviews(currentProductId, currentOrderBy, 1, null);
            await render(currentProductId, currentSettings, allData, currentProductName, currentOrderBy, 1);
          };
          chip.appendChild(clearBtn);
          widget.appendChild(chip);
        }
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
      var avgRating = reviews.length
        ? (reviews.reduce(function(s, r) { return s + r.rating; }, 0) / reviews.length).toFixed(1)
        : null;
      injectRatingBadge(avgRating, totalCount, productName);

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
