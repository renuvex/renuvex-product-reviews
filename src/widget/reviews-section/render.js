// reviews-section/render.js — Ana widget render fonksiyonu

import { fetchReviews, isReviewsFetchError } from './reviews-api.js';
import { openReviewModal } from './review-modal.js';
import { wireLightboxTrigger } from './lightbox-trigger.js';
// ADR_0024: PDP rating badge is now its own surface (src/widget/rating-badge/)
// and renders independently of the review section. render() no longer injects
// the badge — the rating-badge surface does it via its own lazy chunk with a
// LIGHT /api/public/ratings fetch. This keeps the BIG review-section content
// chunk out of "badge-enabled, no review mount" pages.
import { CLASSIC_CSS } from './styles.js';
import { getIconFromSettings } from '../icons/index.js';
import { getLayout, getLayoutsCSS } from '../summary-layouts/index.js';
import { getReviewLayout, getReviewLayoutsCSS } from '../review-layouts/index.js';
import { openWriteForm } from '../summary-layouts/shared/write-action.js';
import { createOwnedSlot, setSlotContext } from '../core/slot.js';
import { probeWidgetVisibility } from '../core/health.js';
import { attachShadowHost, injectShadowStyles, getOrCreateShadowContent, HOST_RESET_CSS } from '../core/shadow.js';
import { BASE_RESET_CSS } from '../shared/base-reset.js';
import { registerSpriteRoot } from '../icons/star-sprite.js';
import { isReviewsMountEnabled } from '../themes/current-adapter.js';
import { beginReviewRequest, isCurrentReviewRequest } from './render/request-token.js';
import { SIZE_PRESETS, THUMBNAIL_PRESETS } from './render/size-presets.js';
import { buildDisabledStateEl, buildReviewsErrorState } from './render/states.js';
import { applyManualTheme } from './render/theme-vars.js';
import { buildPhotoStrip } from './render/photo-strip.js';
import { createReviewHandlers } from './render/handlers.js';
import {
  renderInProgress, pendingRender,
  setRenderInProgress, setPendingRender,
  currentOrderBy, currentPage, currentRatingFilter, currentHasImages, currentProductId, currentSettings,
  setCurrentOrderBy, setCurrentPage, setCurrentProductId, setCurrentSettings, setCurrentBadgeSettings, setCurrentProductName,
  setCurrentReviewsData,
  photoStripReviews, loadedLightboxReviews,
  setLoadedLightboxReviews, getNewLoadedLightboxReviews, appendLoadedLightboxReviews,
} from '../core/state.js';

// Review section mount is OPT-IN: it renders only where the merchant places
// `<div data-renuvex-widget="reviews"></div>` in the theme. There is no
// auto-create — if the mount is absent, the review section simply does not
// render. (The PDP rating badge is a separate "badge" feature, injected
// independently of this mount.)
//
// ADR_0022 — Defense-in-depth gate. Even if the explicit mount exists, the
// runtime `reviewsMountEnabled` flag can be flipped off server-side to
// kill-switch the review section per merchant or per theme without a widget
// redeploy. Today the flag is true whenever any active-theme metadata is
// known (`buildPublicThemeRuntime`); the FALLBACK_RUNTIME path keeps it
// false, so the no-metadata case never renders.
function findReviewsMount() {
  if (!isReviewsMountEnabled()) return null;
  return document.querySelector('[data-renuvex-widget="reviews"]');
}

// ADR_0024: getRatingSummary() was here; removed with the badge inject call
// below. The rating badge surface now derives its avg/count from the LIGHT
// /api/public/ratings endpoint instead of mining it out of the full reviews
// payload — see src/widget/core/rating-summary.js fetchRatingSummary.

function getOrCreateReviewsSlot(anchorEl, productId) {
  var slot = anchorEl.querySelector('[data-renuvex-slot="product-reviews"]');
  if (!slot) {
    slot = createOwnedSlot({
      slot: 'product-reviews',
      className: 'renuvex-pr-reviews-slot',
      context: { surface: 'reviews', productId: productId || '' },
    });
    anchorEl.appendChild(slot);
  }
  setSlotContext(slot, { surface: 'reviews', productId: productId || '' });
  return slot;
}

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

  // Review interaction handlers (retry/filter/sort) are produced by a DI factory
  // that re-runs THIS render via injection — render/handlers.js never imports
  // render.js, so there is no circular import. The handlers read live state +
  // the shared request token, so behavior is identical to the former inline
  // closures.
  var handlers = createReviewHandlers({ render: render });

  try {
    // Başlık görünürlüğü:
    //   1) Layout title destekliyor mu (meta.supports.title !== false)?
    //   2) Admin "showTitle" toggle'ı kapalı mı?
    //   3) Geçerse input değeri kullanılır; boşsa default ("Müşteri Yorumları").
    // showTitle false kabul edilirse başlık tamamen render edilmez.
    var titleLayout = getLayout(settings.summaryLayout);
    var layoutSupportsTitle = !(titleLayout.meta && titleLayout.meta.supports && titleLayout.meta.supports.title === false);
    var userShowsTitle = settings.showTitle !== false;
    var titleValue = (settings.title || '').trim() || 'Müşteri Yorumları';
    var title = (layoutSupportsTitle && userShowsTitle) ? titleValue : '';

    var root = document.documentElement;

    applyManualTheme(root, settings);

    // Review CSS is injected into the shadow root (see attachShadowHost below),
    // not document.head — host-theme selector rules cannot cross that boundary.
    // CSS custom properties set on document.documentElement still inherit in.

    var radius = settings.borderRadius !== undefined ? settings.borderRadius : 8;

    // Widget size drives typography and layout-local review item media.
    // thumbnailSize drives only the top "Fotoğraflı Yorumlar" strip thumbnails.
    var sz = SIZE_PRESETS[settings.size] || SIZE_PRESETS.medium;
    var thumbPx = THUMBNAIL_PRESETS[settings.thumbnailSize] || THUMBNAIL_PRESETS.medium;
    // Photo strip (Fotoğraflı Yorumlar) thumbnail boyutu: list/gallery 3:4 PORTRE
    // olduğundan "Büyük" (140px) fazla yer kaplıyor → bu iki layout'ta büyük boyu
    // 110px'e (medium) sınırla; 3:4 ile yükseklik 146.66px olur. Card 1:1 kare
    // olduğundan büyük=140 aynen kalır. Yalnız büyük etkilenir (orta/küçük değişmez).
    if (settings.thumbnailSize === 'large' && (settings.reviewLayout === 'list' || settings.reviewLayout === 'gallery')) {
      thumbPx = THUMBNAIL_PRESETS.medium;
    }

    root.style.setProperty('--renuvex-pr-title-size', sz.titleSize + 'px');
    root.style.setProperty('--renuvex-pr-review-text-size', sz.reviewTextSize + 'px');
    root.style.setProperty('--renuvex-pr-review-title-size', sz.reviewTitleSize + 'px');
    root.style.setProperty('--renuvex-pr-author-size', sz.authorSize + 'px');
    root.style.setProperty('--renuvex-pr-reply-name-size', sz.replyNameSize + 'px');
    root.style.setProperty('--renuvex-pr-reply-text-size', sz.replyTextSize + 'px');
    root.style.setProperty('--renuvex-pr-radius', radius + 'px');
    root.style.setProperty('--renuvex-pr-radius-sm', Math.max(0, radius - 4) + 'px');
    root.style.setProperty('--renuvex-pr-photo-title-size', sz.photoTitleSize + 'px');
    root.style.setProperty('--renuvex-pr-avg-rating-size', sz.avgRatingSize + 'px');
    root.style.setProperty('--renuvex-pr-review-count-size', sz.reviewCountSize + 'px');
    root.style.setProperty('--renuvex-pr-compact-count-size', sz.compactCountSize + 'px');
    root.style.setProperty('--renuvex-pr-recommend-size', sz.recommendSize + 'px');
    root.style.setProperty('--renuvex-pr-btn-text-size', sz.btnTextSize + 'px');
    root.style.setProperty('--renuvex-pr-bar-label-size', sz.barLabelSize + 'px');
    root.style.setProperty('--renuvex-pr-minimal-avg-size', sz.minimalAvgSize + 'px');
    root.style.setProperty('--renuvex-pr-hero-avg-size', sz.heroAvgSize + 'px');
    root.style.setProperty('--renuvex-pr-bar-count-size', sz.barCountSize + 'px');
    root.style.setProperty('--renuvex-pr-review-date-size', sz.reviewDateSize + 'px');
    root.style.setProperty('--renuvex-pr-filter-text-size', sz.filterTextSize + 'px');
    root.style.setProperty('--renuvex-pr-load-more-size', sz.loadMoreSize + 'px');
    root.style.setProperty('--renuvex-pr-read-more-size', sz.readMoreSize + 'px');
    root.style.setProperty('--renuvex-pr-thumbnail-size', thumbPx + 'px');

    // Yıldız rengi tek kaynak: tüm rating yüzeyleri (özet, liste, rozetler)
    // --renuvex-pr-review-star-color'dan beslenir; boş yıldız da aynı renkte outline.
    // Runtime 6-char veya 8-char hex kabul eder; admin picker sadece opak hex yazar.
    var reviewStarColor = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(settings.reviewStarColor || '') ? settings.reviewStarColor : '#f59e0b';
    root.style.setProperty('--renuvex-pr-review-star-color', reviewStarColor);
    root.style.setProperty('--renuvex-pr-star-size', sz.reviewStarSize + 'px');
    root.style.setProperty('--renuvex-pr-avg-star-size', sz.avgStarSize + 'px');

    // Layout-spesifik boyut override'ları (opsiyonel).
    // Bir layout'un meta.sizeOverrides[size] objesi varsa, oradaki CSS değişkenleri
    // global SIZE_PRESETS değerlerinin üzerine yazılır. Sözleşme: { '--renuvex-pr-xxx': '14px', ... }.
    // Layout'lar bu alanı export etmek zorunda değil — yoksa global preset aynen geçerli kalır.
    function applyLayoutSizeOverrides(layout, sizeKey) {
      if (!layout || !layout.meta || !layout.meta.sizeOverrides) return;
      var ov = layout.meta.sizeOverrides[sizeKey];
      if (!ov) return;
      Object.keys(ov).forEach(function (k) { root.style.setProperty(k, ov[k]); });
    }
    applyLayoutSizeOverrides(getLayout(settings.summaryLayout), settings.size);
    applyLayoutSizeOverrides(getReviewLayout(settings.reviewLayout), settings.size);

    // İkon + stil seçimine göre SVG çifti (filled/empty) al — ICONS registry'sinden.
    // Used by the review section layouts below; the PDP rating badge runs in a
    // separate surface chunk (ADR_0024) and fetches its own iconPair there.
    var iconPair = getIconFromSettings(settings);

    // Review section is opt-in: render only where the merchant placed
    // <div data-renuvex-widget="reviews"></div>. No mount -> no review section.
    var anchorEl = findReviewsMount();
    if (!anchorEl) return;
    var reviewsSlot = getOrCreateReviewsSlot(anchorEl, productId);
    var container = document.getElementById('renuvex-reviews');
    if (!container) {
      container = document.createElement('div');
      container.id = 'renuvex-reviews';
      container.style.minHeight = '200px';
    }
    if (container.parentNode !== reviewsSlot) reviewsSlot.appendChild(container);

    // #renuvex-reviews stays in light DOM (badge scroll-to, health probe and the
    // mutation observer reference it by id); all review content renders inside its
    // shadow root so host-theme CSS cannot bleed in. CSS vars on documentElement
    // still inherit across the boundary.
    var sRoot = attachShadowHost(container);
    var allCSS = HOST_RESET_CSS + BASE_RESET_CSS + CLASSIC_CSS + getLayoutsCSS() + getReviewLayoutsCSS();
    injectShadowStyles(sRoot, allCSS);
    // All review content lives inside a persistent wrapper so replaceChildren
    // doesn't wipe the injected <style> or the sprite mirror, both of which
    // stay as direct children of sRoot.
    var contentEl = getOrCreateShadowContent(sRoot);

    if (settings.enabled === false) {
      container.style.minHeight = 'auto';
      contentEl.replaceChildren(buildDisabledStateEl(settings.borderRadius !== undefined ? settings.borderRadius : 8));

      setRenderInProgress(false);
      var p = pendingRender;
      setPendingRender(null);
      if (p) render(p.productId, p.settings, p.reviewsData, p.productName, p.orderBy, p.page, p.badgeSettings);
      return;
    }

    try {
      var data = reviewsData || {};
      var hasReviewsFetchError = isReviewsFetchError(data);
      var reviews = hasReviewsFetchError ? [] : ((data.data && data.data.reviews) || []);
      setLoadedLightboxReviews(reviews);

      // Önceki render içeriğini temizle. container (#renuvex-reviews) ışık DOM'da
      // sabit kalır (badge scroll-to + health probe + observer ona bağlı); içerik
      // ve listener'lar shadow wrapper'da yaşar — contentEl.replaceChildren
      // sadece içeriği temizler, sRoot direct child'ları (style, sprite mirror)
      // korunur. (cloneNode shadow root'u KOPYALAMAZ; host'u klonlamak izolasyonu bozardı.)
      contentEl.replaceChildren();

      var widget = document.createElement('section');
      widget.id = 'renuvex-reviews-widget';
      widget.setAttribute('aria-label', 'Ürün yorumları');
      widget.className = 'renuvex-pr-reviews-widget';
      widget.setAttribute('data-renuvex-surface', 'reviews');
      if (productId) {
        widget.setAttribute('data-renuvex-product-id', String(productId));
      }

      // Admin iframe önizlemesinde full-bleed (100vw + margin hack) iframe
      // viewport'u ile parent genişliği uyuşmadığında yatay scroll yaratıyor.
      // Preview'de widget'ı parent container'ına teslim ediyoruz — canlı
      // storefront'ta CSS kuralı aynen geçerli, sadece preview'de inline
      // override ile bypass ediliyor.
      if (typeof window !== 'undefined' && window.__ikasPreviewMode) {
        widget.style.width = '100%';
        widget.style.maxWidth = '100%';
        widget.style.marginLeft = '0';
        widget.style.marginRight = '0';
      }

      // Başlık — Eğer title varsa oluştur, yoksa (boş bırakıldıysa) hiç ekleme
      // Layout id class'ı ekleniyor (ör. renuvex-pr-title-compact) ki layout'lar
      // başlık hizasını kendi CSS'lerinde override edebilsin.
      if (title) {
        var h2 = document.createElement('div');
        var layoutId = settings.summaryLayout || 'classic';
        h2.className = 'renuvex-pr-title renuvex-pr-title-' + layoutId;
        h2.textContent = title;
        widget.appendChild(h2);
      }

      if (hasReviewsFetchError) {
        widget.appendChild(buildReviewsErrorState(data.message, handlers.onRetry));
        contentEl.appendChild(widget);
        // Mirror the global icon sprite into the shadow root so <use href="#id">
        // can resolve to cloned <symbol>s (sprite refs don't cross shadow).
        registerSpriteRoot(sRoot);
        probeWidgetVisibility(widget, 'reviews-widget', { productId: productId || '', reason: 'fetch_error' }, function () {
          return sRoot.getElementById('renuvex-reviews-widget');
        });
        return;
      }

      // Özet istatistik — ortalama puan + bar chart + write a review butonu
      var allCount = (data.data && data.data.allCount) || 0;
      var allRatingCounts = (data.data && data.data.ratingCounts) || null;
      var ratingCounts = allRatingCounts || [0, 0, 0, 0, 0];
      var avgRatingVal = (data.data && data.data.avgRating) || '0.0';
      if (!allRatingCounts && reviews.length > 0) {
        reviews.forEach(function (r) { if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating - 1]++; });
        var s = reviews.reduce(function (a, r) { return a + r.rating; }, 0);
        avgRatingVal = (s / reviews.length).toFixed(1);
      }

      if (allCount > 0) {
        var layout = getLayout(settings.summaryLayout);
        var summary = layout.render({
          widget: widget,
          productId: productId,
          data: data,
          settings: settings,
          iconPair: iconPair,
          allCount: allCount,
          ratingCounts: ratingCounts,
          avgRatingVal: avgRatingVal,
          currentRatingFilter: currentRatingFilter,
          currentOrderBy: currentOrderBy,
          currentHasImages: currentHasImages,
          onFilterChange: handlers.onFilterChange,
          onSortChange: handlers.onSortChange,
        });
        widget.appendChild(summary);
      } else {
        // Yorum yoksa sadece Yorum Yap butonu göster
        var emptyWriteBtn = document.createElement('button');
        emptyWriteBtn.className = 'renuvex-pr-write-btn';
        emptyWriteBtn.style.cssText = 'display:block;margin:16px auto 0;';
        emptyWriteBtn.textContent = settings.writeButtonText || 'Yorum Yap';
        emptyWriteBtn.onclick = openWriteForm;
        widget.appendChild(emptyWriteBtn);
      }

      // Fotoğraf şeridi — state.photoStripReviews bootstrap'ta tek seferlik
      // `hasImages=true&limit=15&orderBy=newest` ile dolduruldu. Filtreden
      // ("Fotoğraflı" sort) ve load-more'dan bağımsız; sadece cache TTL (1 dk)
      // sonra arka planda yenilenir (Strateji A — newest-first rotation).
      // ADR_0007: sabit 15 cap, admin ayarı yok. buildPhotoStrip null dönerse
      // (galeri kapalı / foto filtresi aktif / foto yok) hiç eklenmez.
      var photoSection = buildPhotoStrip({
        settings: settings,
        root: root,
        currentHasImages: currentHasImages,
        photoStripReviews: photoStripReviews,
        openReviewModal: openReviewModal,
        wireLightboxTrigger: wireLightboxTrigger,
      });
      if (photoSection) widget.appendChild(photoSection);

      if (reviews.length === 0) {
        var empty = document.createElement('p');
        empty.className = 'renuvex-pr-state-msg';
        empty.textContent = 'Henüz yorum yok.';
        widget.appendChild(empty);
      } else {
        var reviewLayout = getReviewLayout(settings.reviewLayout);
        reviews.forEach(function (r) { widget.appendChild(reviewLayout.render(r, loadedLightboxReviews)); });
      }

      // Daha Fazla butonu
      var hasMore = data.data && data.data.hasMore;
      if (hasMore) {
        var loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'renuvex-pr-load-more';
        loadMoreBtn.textContent = 'Daha Fazla Göster';
        loadMoreBtn.onclick = async function () {
          loadMoreBtn.disabled = true;
          loadMoreBtn.textContent = 'Yükleniyor...';
          var token = beginReviewRequest();
          var productIdSnapshot = currentProductId;
          var orderBySnapshot = currentOrderBy;
          var pageSnapshot = currentPage;
          var ratingFilterSnapshot = currentRatingFilter;
          var hasImagesSnapshot = currentHasImages;
          var nextPage = pageSnapshot + 1;
          var moreData = await fetchReviews(productIdSnapshot, orderBySnapshot, nextPage, ratingFilterSnapshot, hasImagesSnapshot);
          if (!isCurrentReviewRequest(token, {
            productId: productIdSnapshot,
            orderBy: orderBySnapshot,
            page: pageSnapshot,
            ratingFilter: ratingFilterSnapshot,
            hasImages: hasImagesSnapshot,
          })) return;
          if (moreData && !isReviewsFetchError(moreData) && moreData.data && Array.isArray(moreData.data.reviews)) {
            var newReviews = getNewLoadedLightboxReviews(moreData.data.reviews);
            appendLoadedLightboxReviews(newReviews);
            setCurrentPage(nextPage);
            var moreReviewLayout = getReviewLayout(currentSettings.reviewLayout);
            newReviews.forEach(function (r) {
              widget.insertBefore(moreReviewLayout.render(r, loadedLightboxReviews), loadMoreBtn);
            });
            if (!moreData.data.hasMore) loadMoreBtn.remove();
            else { loadMoreBtn.disabled = false; loadMoreBtn.textContent = 'Daha Fazla Göster'; }
          } else {
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Tekrar Dene';
          }
        };
        widget.appendChild(loadMoreBtn);
      }

      contentEl.appendChild(widget);
      // Mirror the global icon sprite into the shadow root (see note above).
      registerSpriteRoot(sRoot);
      probeWidgetVisibility(widget, 'reviews-widget', { productId: productId || '' }, function () {
        return sRoot.getElementById('renuvex-reviews-widget');
      });
    } catch (err) {
      console.error('[renuvex-pr] render error:', err);
      var errMsg = document.createElement('p');
      errMsg.style.cssText = 'text-align:center;color:#dc2626;';
      errMsg.textContent = 'Yorumlar yüklenirken bir hata oluştu.';
      if (contentEl) contentEl.replaceChildren(errMsg);
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
