// product-widget/render.js — Ana widget render fonksiyonu

import { starsHTML, injectStyles, optimizeImageUrl } from '../core/helpers.js';
import { fetchReviews } from './bootstrap.js';
import { buildReviewEl } from './review-item.js';
import { openReviewModal } from './review-modal.js';
import { buildReviewForm } from './review-form.js';
import { injectRatingBadge } from './rating-badge.js';
import { CLASSIC_CSS } from '../themes/ozy/styles.js';
import {
  renderInProgress, pendingRender,
  setRenderInProgress, setPendingRender,
  currentOrderBy, currentPage, currentRatingFilter, currentHasImages, currentProductId, currentSettings, currentBadgeSettings, currentProductName,
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter, setCurrentHasImages, setCurrentProductId, setCurrentSettings, setCurrentBadgeSettings, setCurrentProductName,
  setCurrentReviewsData,
} from '../core/state.js';

export async function render(productId, settings, reviewsData, productName, orderBy, page, badgeSettings) {
  if (renderInProgress) {
    setPendingRender({ productId, settings, reviewsData, productName, orderBy, page, badgeSettings });
    return;
  }
  setRenderInProgress(true);
  setCurrentProductId(productId);
  setCurrentSettings(settings);
  if (badgeSettings !== undefined) setCurrentBadgeSettings(badgeSettings);
  setCurrentProductName(productName);
  if (orderBy) setCurrentOrderBy(orderBy);
  if (page) setCurrentPage(page);
  if (reviewsData !== null && reviewsData !== undefined) setCurrentReviewsData(reviewsData);

  try {
    var primaryColor = settings.primaryColor || '#111111';
    var title = settings.title || 'Müşteri Yorumları';

    injectStyles(primaryColor, CLASSIC_CSS);

    var root = document.documentElement;
    var radius = settings.borderRadius !== undefined ? settings.borderRadius : 8;
    root.style.setProperty('--ikr-title-size', (settings.titleSize || 24) + 'px');
    root.style.setProperty('--ikr-review-text-size', (settings.reviewTextSize || 14) + 'px');
    root.style.setProperty('--ikr-author-size', (settings.authorSize || 14) + 'px');
    root.style.setProperty('--ikr-reply-name-size', (settings.replyNameSize || 14) + 'px');
    root.style.setProperty('--ikr-reply-text-size', (settings.replyTextSize || 14) + 'px');
    root.style.setProperty('--ikr-radius', radius + 'px');
    root.style.setProperty('--ikr-radius-sm', Math.max(0, radius - 4) + 'px');

    var container = document.getElementById('ikas-reviews');
    if (!container) {
      var anchorEl = document.getElementById('ikas-reviews-anchor');
      if (!anchorEl) return;
      container = document.createElement('div');
      container.id = 'ikas-reviews';
      container.style.minHeight = '200px';
      anchorEl.appendChild(container);
    }

    if (settings.enabled === false) {
      container.style.minHeight = 'auto';
      container.innerHTML = '<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: ' + (settings.borderRadius !== undefined ? settings.borderRadius : 8) + 'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget şu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canlı mağazanızda müşterileriniz hiçbir yorum alanı görmeyecektir.</div></div>';
      
      setRenderInProgress(false);
      var p = pendingRender;
      setPendingRender(null);
      if (p) render(p.productId, p.settings, p.reviewsData, p.productName, p.orderBy, p.page, p.badgeSettings);
      return;
    }

    container.innerHTML = '<p style="text-align:center;padding:40px;color:#999;font-size:14px;">Yorumlar yükleniyor...</p>';

    try {
      var data = reviewsData || {};
      var reviews = (data.data && data.data.reviews) || [];
      var totalCount = (data.data && data.data.totalCount) || 0;

      // Önceki listener'ları temizle — parentNode her zaman var (anchorEl.appendChild ile eklendi)
      var fresh = container.cloneNode(false);
      container.parentNode.replaceChild(fresh, container);
      container = fresh;

      var widget = document.createElement('div');
      widget.id = 'ikas-reviews-widget';

      // Başlık — div kullan, h2 mağaza teması tarafından override edilebilir
      var h2 = document.createElement('div');
      h2.className = 'ikr-title';
      h2.textContent = title;
      widget.appendChild(h2);

      // Özet istatistik — ortalama puan + bar chart + write a review butonu
      var allCount = (data.data && data.data.allCount) || 0;
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
        var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
        var recommendPct = allCount > 0 ? Math.round((recommendCount / allCount) * 100) : 0;
        avgBox.innerHTML =
          '<div class="ikr-avg-row1"><span class="ikr-avg-star">★</span><span class="ikr-avg-num">' + avgRatingVal + '</span></div>' +
          '<div class="ikr-avg-row2"><span class="ikr-avg-count">' + allCount.toLocaleString('tr-TR') + ' Yorum</span></div>' +
          (recommendPct > 0 ? '<div class="ikr-recommend"><span class="ikr-recommend-pct">%' + recommendPct + '</span> bu ürünü tavsiye ediyor</div>' : '');
        summary.appendChild(avgBox);

        // Orta — bar chart
        var bars = document.createElement('div');
        bars.className = 'ikr-bars';
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
            '<span class="ikr-bar-count">(' + cnt.toLocaleString('tr-TR') + ')</span>';
          (function(starVal) {
            row.onclick = async function() {
              setCurrentRatingFilter(currentRatingFilter === starVal ? null : starVal);
              setCurrentPage(1);
              var filtered = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter, currentHasImages);
              await render(currentProductId, currentSettings, filtered, currentProductName, currentOrderBy, 1);
            };
          })(si);
          bars.appendChild(row);
        }
        summary.appendChild(bars);

        // Sağ — Yorum Yap butonu
        var btnGroup = document.createElement('div');
        btnGroup.className = 'ikr-btn-group';

        var writeBtn = document.createElement('button');
        writeBtn.className = 'ikr-write-btn';
        writeBtn.textContent = 'Yorum Yap';
        writeBtn.onclick = function() {
          var accordion = document.getElementById('ikr-form-accordion');
          if (!accordion) return;
          var isOpen = accordion.style.maxHeight && accordion.style.maxHeight !== '0px';
          if (isOpen) {
            accordion.style.maxHeight = '0px';
            accordion.style.opacity = '0';
          } else {
            accordion.style.maxHeight = accordion.scrollHeight + 'px';
            accordion.style.opacity = '1';
            setTimeout(function() { accordion.style.maxHeight = 'none'; }, 360);
            setTimeout(function() {
              var stickyHeader = document.querySelector('header');
              var headerH = stickyHeader ? stickyHeader.getBoundingClientRect().height : 0;
              var top = accordion.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
              window.scrollTo({ top: top, behavior: 'smooth' });
            }, 50);
          }
        };
        btnGroup.appendChild(writeBtn);

        // Filtre — Yorum Yap'ın yanında
        var filterWrap = document.createElement('div');
        filterWrap.className = 'ikr-filter-wrap';

        var filterBtn = document.createElement('button');
        filterBtn.className = 'ikr-filter-btn';
        filterBtn.setAttribute('aria-label', 'Filtrele');
        filterBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>';

        var filterMenu = document.createElement('div');
        filterMenu.className = 'ikr-filter-menu';
        filterMenu.style.display = 'none';

        var filterOpts = [
          ['newest', 'En Yeni', false],
          ['highest', 'En Yüksek Puan', false],
          ['lowest', 'En Düşük Puan', false],
          ['photos', 'Fotoğraflı', true],
        ];
        filterOpts.forEach(function(opt) {
          var isPhotos = opt[2];
          var isActive = isPhotos ? currentHasImages : (!currentHasImages && (currentOrderBy || 'newest') === opt[0]);
          var item = document.createElement('div');
          item.className = 'ikr-filter-item' + (isActive ? ' ikr-filter-item-active' : '');
          item.textContent = opt[1];
          item.onclick = async function() {
            filterMenu.style.display = 'none';
            filterBtn.classList.remove('ikr-filter-btn-active');
            setCurrentPage(1);
            if (isPhotos) {
              setCurrentHasImages(true);
              setCurrentOrderBy('newest');
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
          var isOpen = filterMenu.style.display !== 'none';
          filterMenu.style.display = isOpen ? 'none' : 'block';
          filterBtn.classList.toggle('ikr-filter-btn-active', !isOpen);
        };

        filterWrap.addEventListener('click', function(e) { e.stopPropagation(); });
        widget.addEventListener('click', function(e) {
          if (!filterWrap.contains(e.target)) {
            filterMenu.style.display = 'none';
            filterBtn.classList.remove('ikr-filter-btn-active');
          }
        });

        filterWrap.appendChild(filterBtn);
        filterWrap.appendChild(filterMenu);
        btnGroup.appendChild(filterWrap);
        summary.appendChild(btnGroup);
        widget.appendChild(summary);
      } else {
        // Yorum yoksa sadece Yorum Yap butonu göster
        var emptyWriteBtn = document.createElement('button');
        emptyWriteBtn.className = 'ikr-write-btn';
        emptyWriteBtn.style.cssText = 'display:block;margin:16px auto 0;';
        emptyWriteBtn.textContent = 'Yorum Yap';
        emptyWriteBtn.onclick = function() {
          var accordion = document.getElementById('ikr-form-accordion');
          if (!accordion) return;
          var isOpen = accordion.style.maxHeight && accordion.style.maxHeight !== '0px';
          if (isOpen) {
            accordion.style.maxHeight = '0px';
            accordion.style.opacity = '0';
          } else {
            accordion.style.maxHeight = accordion.scrollHeight + 'px';
            accordion.style.opacity = '1';
            setTimeout(function() { accordion.style.maxHeight = 'none'; }, 360);
            setTimeout(function() {
              var stickyHeader = document.querySelector('header');
              var headerH = stickyHeader ? stickyHeader.getBoundingClientRect().height : 0;
              var top = accordion.getBoundingClientRect().top + window.pageYOffset - headerH - 16;
              window.scrollTo({ top: top, behavior: 'smooth' });
            }, 50);
          }
        };
        widget.appendChild(emptyWriteBtn);
      }

      // Accordion form — summary altı, yorum listesi üstü
      var accordion = document.createElement('div');
      accordion.id = 'ikr-form-accordion';
      accordion.style.cssText = 'overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;';
      accordion.appendChild(buildReviewForm(productId, productName));
      widget.appendChild(accordion);

      // Fotoğraflı Yorumlar bölümü — sadece filtre aktif değilken göster
      var allReviewsWithPhotos = reviews.filter(function(r) {
        return r.images && Array.isArray(r.images) && r.images.some(function(u) { return u && u.indexOf('https://') === 0; });
      });
      if (!currentHasImages && allReviewsWithPhotos.length > 0) {
        var photoSection = document.createElement('div');
        photoSection.className = 'ikr-photo-section';

        var photoHeader = document.createElement('div');
        photoHeader.className = 'ikr-photo-section-header';

        var photoTitle = document.createElement('span');
        photoTitle.className = 'ikr-photo-section-title';
        photoTitle.textContent = 'Fotoğraflı Yorumlar';

        photoHeader.appendChild(photoTitle);
        photoSection.appendChild(photoHeader);

        var photoStrip = document.createElement('div');
        photoStrip.className = 'ikr-photo-strip';

        var thumbCount = 0;
        allReviewsWithPhotos.forEach(function(r) {
          if (thumbCount >= 10) return;
          var firstImg = r.images.find(function(u) { return u && u.indexOf('https://') === 0; });
          if (!firstImg) return;
          var thumb = document.createElement('img');
          thumb.src = optimizeImageUrl(firstImg);
          thumb.className = 'ikr-photo-strip-thumb';
          thumb.alt = 'Yorum fotoğrafı';
          (function(url, review) {
            thumb.onclick = function() { openReviewModal(review, url, reviews); };
          })(firstImg, r);
          photoStrip.appendChild(thumb);
          thumbCount++;
        });

        // Desktop ok butonları
        var prevArrow = document.createElement('button');
        prevArrow.className = 'ikr-photo-strip-arrow ikr-photo-strip-arrow-prev';
        prevArrow.innerHTML = '&#8249;';
        prevArrow.setAttribute('aria-label', 'Önceki');
        prevArrow.onclick = function() { photoStrip.scrollBy({ left: -200, behavior: 'smooth' }); };

        var nextArrow = document.createElement('button');
        nextArrow.className = 'ikr-photo-strip-arrow ikr-photo-strip-arrow-next';
        nextArrow.innerHTML = '&#8250;';
        nextArrow.setAttribute('aria-label', 'Sonraki');
        nextArrow.onclick = function() { photoStrip.scrollBy({ left: 200, behavior: 'smooth' }); };

        var stripWrap = document.createElement('div');
        stripWrap.className = 'ikr-photo-strip-wrap';
        stripWrap.appendChild(prevArrow);
        stripWrap.appendChild(photoStrip);
        stripWrap.appendChild(nextArrow);
        photoSection.appendChild(stripWrap);
        widget.appendChild(photoSection);
      }

      if (reviews.length === 0) {
        var empty = document.createElement('p');
        empty.style.cssText = 'color:#888;text-align:center;padding:30px 0;';
        empty.textContent = 'Henüz yorum yok.';
        widget.appendChild(empty);
      } else {
        reviews.forEach(function(r) { widget.appendChild(buildReviewEl(r, reviews, currentSettings && currentSettings.showHelpful !== false)); });
      }

      // Daha Fazla butonu
      var hasMore = data.data && data.data.hasMore;
      if (hasMore) {
        var loadMoreBtn = document.createElement('button');
        loadMoreBtn.textContent = 'Daha Fazla Göster';
        loadMoreBtn.style.cssText = 'display:block;margin:20px auto 0;padding:10px 28px;border:1px solid rgba(0,0,0,0.30);border-radius:6px;background:#fff;color:rgba(0,0,0,0.75);font-size:14px;cursor:pointer;';
        loadMoreBtn.onclick = async function() {
          loadMoreBtn.disabled = true;
          loadMoreBtn.textContent = 'Yükleniyor...';
          var nextPage = currentPage + 1;
          var moreData = await fetchReviews(currentProductId, currentOrderBy, nextPage, currentRatingFilter, currentHasImages);
          if (moreData && moreData.data && moreData.data.reviews) {
            setCurrentPage(nextPage);
            moreData.data.reviews.forEach(function(r) {
              widget.insertBefore(buildReviewEl(r, moreData.data.reviews, currentSettings && currentSettings.showHelpful !== false), loadMoreBtn);
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

      // Rating badge + JSON-LD — admin "Yıldız Rozeti" widget ayarlarından beslenir
      injectRatingBadge(allCount > 0 ? avgRatingVal : null, totalCount, productName, currentBadgeSettings);


    } catch (err) {
      console.error('[ikr] render error:', err);
      container.innerHTML = '<p style="text-align:center;color:#dc2626;">Yorumlar yüklenirken bir hata oluştu.</p>';
    }
  } finally {
    setRenderInProgress(false);
    if (pendingRender) {
      var next = pendingRender;
      setPendingRender(null);
      render(next.productId, next.settings, next.reviewsData, next.productName, next.orderBy, next.page, next.badgeSettings);
    }
  }
}
