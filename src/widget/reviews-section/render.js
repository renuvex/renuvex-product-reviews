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
import { settingText } from '../core/helpers.js';
import { beginReviewRequest, isCurrentReviewRequest } from './render/request-token.js';
import { SIZE_PRESETS, THUMBNAIL_PRESETS, THUMBNAIL_PRESETS_MOBILE } from './render/size-presets.js';
import { buildDisabledStateEl, buildEmptyReviewsState, buildFilteredEmptyReviewsState, buildReviewsErrorState } from './render/states.js';
import { applyManualTheme } from './render/theme-vars.js';
import { buildMediaGallery } from './render/media-gallery.js';
import { createReviewHandlers } from './render/handlers.js';
import { buildPaginationControl } from './render/pagination.js';
import {
  renderInProgress, pendingRender,
  setRenderInProgress, setPendingRender,
  currentOrderBy, currentPage, currentRatingFilter, currentHasImages, currentProductId, currentSettings, currentNextCursor,
  setCurrentOrderBy, setCurrentPage, setCurrentProductId, setCurrentSettings, setCurrentBadgeSettings, setCurrentProductName,
  setCurrentReviewsData, setCurrentNextCursor,
  mediaStripReviews, loadedLightboxReviews,
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

function mediaPlaySizeForThumbnail(thumbnailPx) {
  return Math.round(Math.max(36, Math.min(52, thumbnailPx * 0.38)));
}

function mediaPlayIconSizeForContainer(containerPx) {
  return Math.round(containerPx * 0.5);
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
  if (reviewsData !== null && reviewsData !== undefined) {
    setCurrentReviewsData(reviewsData);
    setCurrentNextCursor(reviewsData && reviewsData.data ? reviewsData.data.nextCursor : null);
  }

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
    var titleValue = settingText(settings.title, 'Müşteri Yorumları');
    var title = (layoutSupportsTitle && userShowsTitle) ? titleValue : '';

    var root = document.documentElement;

    applyManualTheme(root, settings);

    // Review CSS is injected into the shadow root (see attachShadowHost below),
    // not document.head — host-theme selector rules cannot cross that boundary.
    // CSS custom properties set on document.documentElement still inherit in.

    var radius = settings.borderRadius !== undefined ? settings.borderRadius : 8;

    // Widget size drives typography and layout-local review item media.
    // thumbnailSize drives only the top media gallery thumbnails.
    var sz = SIZE_PRESETS[settings.size] || SIZE_PRESETS.medium;
    var thumbPx = THUMBNAIL_PRESETS[settings.thumbnailSize] || THUMBNAIL_PRESETS.medium;
    // Mobile media gallery thumbnails match list/gallery review-item media size.
    // Card media stays square and keeps the desktop thumbnail value.
    var thumbPxMobile = thumbPx;
    if (settings.reviewLayout === 'list' || settings.reviewLayout === 'gallery') {
      thumbPxMobile = THUMBNAIL_PRESETS_MOBILE[settings.thumbnailSize] || THUMBNAIL_PRESETS_MOBILE.medium;
    }

    root.style.setProperty('--renuvex-pr-title-size', sz.titleSize + 'px');
    root.style.setProperty('--renuvex-pr-review-text-size', sz.reviewTextSize + 'px');
    root.style.setProperty('--renuvex-pr-review-title-size', sz.reviewTitleSize + 'px');
    root.style.setProperty('--renuvex-pr-author-size', sz.authorSize + 'px');
    root.style.setProperty('--renuvex-pr-reply-name-size', sz.replyNameSize + 'px');
    root.style.setProperty('--renuvex-pr-reply-text-size', sz.replyTextSize + 'px');
    root.style.setProperty('--renuvex-pr-radius', radius + 'px');
    root.style.setProperty('--renuvex-pr-radius-sm', Math.max(0, radius - 4) + 'px');
    root.style.setProperty('--renuvex-pr-media-gallery-title-size', sz.mediaGalleryTitleSize + 'px');
    root.style.setProperty('--renuvex-pr-avg-rating-size', sz.avgRatingSize + 'px');
    root.style.setProperty('--renuvex-pr-review-count-size', sz.reviewCountSize + 'px');
    root.style.setProperty('--renuvex-pr-compact-count-size', sz.compactCountSize + 'px');
    root.style.setProperty('--renuvex-pr-recommend-size', sz.recommendSize + 'px');
    root.style.setProperty('--renuvex-pr-btn-text-size', sz.btnTextSize + 'px');
    root.style.setProperty('--renuvex-pr-bar-label-size', sz.barLabelSize + 'px');
    root.style.setProperty('--renuvex-pr-minimal-avg-size', sz.minimalAvgSize + 'px');
    root.style.setProperty('--renuvex-pr-hero-avg-size', sz.heroAvgSize + 'px');
    // minimal/hero sayaç boyutu — her layout kendi izole değişkeni (recommend-size'ı
    // paylaşmaktan çıkarıldı). 14/16/18. avg gibi layout-spesifik tek kaynak.
    root.style.setProperty('--renuvex-pr-minimal-count-size', sz.minimalCountSize + 'px');
    root.style.setProperty('--renuvex-pr-hero-count-size', sz.heroCountSize + 'px');
    root.style.setProperty('--renuvex-pr-bar-count-size', sz.barCountSize + 'px');
    root.style.setProperty('--renuvex-pr-review-date-size', sz.reviewDateSize + 'px');
    root.style.setProperty('--renuvex-pr-filter-text-size', sz.filterTextSize + 'px');
    root.style.setProperty('--renuvex-pr-load-more-size', sz.loadMoreSize + 'px');
    root.style.setProperty('--renuvex-pr-load-more-min-height', sz.loadMoreMinHeight + 'px');
    root.style.setProperty('--renuvex-pr-load-more-pad-y', sz.loadMorePadY + 'px');
    root.style.setProperty('--renuvex-pr-load-more-pad-x', sz.loadMorePadX + 'px');
    root.style.setProperty('--renuvex-pr-load-more-mobile-min-height', sz.loadMoreMobileMinHeight + 'px');
    root.style.setProperty('--renuvex-pr-pagination-button-size', sz.paginationButtonSize + 'px');
    root.style.setProperty('--renuvex-pr-pagination-pad-x', sz.paginationPadX + 'px');
    root.style.setProperty('--renuvex-pr-pagination-gap', sz.paginationGap + 'px');
    root.style.setProperty('--renuvex-pr-pagination-margin-top', sz.paginationMarginTop + 'px');
    root.style.setProperty('--renuvex-pr-pagination-gap-min', sz.paginationGapMin + 'px');
    root.style.setProperty('--renuvex-pr-pagination-mobile-button-size', sz.paginationMobileButtonSize + 'px');
    root.style.setProperty('--renuvex-pr-pagination-mobile-font-size', sz.paginationMobileFontSize + 'px');
    root.style.setProperty('--renuvex-pr-pagination-mobile-gap', sz.paginationMobileGap + 'px');
    root.style.setProperty('--renuvex-pr-pagination-mobile-margin-top', sz.paginationMobileMarginTop + 'px');
    root.style.setProperty('--renuvex-pr-pagination-mobile-gap-min', sz.paginationMobileGapMin + 'px');
    root.style.setProperty('--renuvex-pr-read-more-size', sz.readMoreSize + 'px');
    root.style.setProperty('--renuvex-pr-thumbnail-size', thumbPx + 'px');
    root.style.setProperty('--renuvex-pr-thumbnail-size-mobile', thumbPxMobile + 'px');
    var mediaPlayPx = mediaPlaySizeForThumbnail(thumbPx);
    var mediaPlayPxMobile = mediaPlaySizeForThumbnail(thumbPxMobile);
    root.style.setProperty('--renuvex-pr-media-play-size', mediaPlayPx + 'px');
    root.style.setProperty('--renuvex-pr-media-play-icon-size', mediaPlayIconSizeForContainer(mediaPlayPx) + 'px');
    root.style.setProperty('--renuvex-pr-media-play-size-mobile', mediaPlayPxMobile + 'px');
    root.style.setProperty('--renuvex-pr-media-play-icon-size-mobile', mediaPlayIconSizeForContainer(mediaPlayPxMobile) + 'px');

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

      if (allCount === 0) {
        widget.classList.add('renuvex-pr-reviews-empty');
        widget.appendChild(buildEmptyReviewsState({
          iconPair: iconPair,
          writeButtonText: settingText(settings.writeButtonText, 'Yorum Yap'),
          emptyStateText: settingText(settings.emptyStateText, 'İlk yorumu yazarak diğer müşterilere yardımcı olun.'),
          onWriteClick: openWriteForm,
        }));
      } else {
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

        // Media gallery — state.mediaStripReviews is filled once in bootstrap
        // with `hasMedia=true` for media-enabled stores and `hasImages=true`
        // for image-only stores. It stays independent from sort/filter/load-more.
        // ADR_0007 keeps the fixed cap at 15. buildMediaGallery returns null
        // when disabled, the photo filter is active, or no media exists.
        var mediaGallerySection = buildMediaGallery({
          settings: settings,
          root: root,
          currentHasImages: currentHasImages,
          mediaStripReviews: mediaStripReviews,
          openReviewModal: openReviewModal,
          wireLightboxTrigger: wireLightboxTrigger,
        });
        if (mediaGallerySection) widget.appendChild(mediaGallerySection);

        if (reviews.length === 0) {
          widget.appendChild(buildFilteredEmptyReviewsState());
        } else {
          var reviewLayout = getReviewLayout(settings.reviewLayout);
          reviews.forEach(function (r) { widget.appendChild(reviewLayout.render(r, loadedLightboxReviews)); });
        }

        // Sayfalama / Daha Fazla — moda göre. numbered: offset tabanlı sayfa kontrolü
        // (append yok, liste o sayfanın dilimi); loadMore (varsayılan): mevcut
        // cursor-append "Daha Fazla" butonu.
        var paginationMode = settings.paginationMode === 'numbered' ? 'numbered' : 'loadMore';
        if (paginationMode === 'numbered') {
          var totalPages = (data.data && data.data.totalPages) || 1;
          if (totalPages > 1) {
            widget.appendChild(buildPaginationControl({
              page: (data.data && data.data.page) || currentPage || 1,
              totalPages: totalPages,
              onPageChange: handlers.onPageChange,
            }));
          }
        }

        // Daha Fazla butonu (yalnız loadMore modunda)
        var hasMore = paginationMode === 'loadMore' && data.data && data.data.hasMore;
        if (hasMore) {
          var loadMoreBtn = document.createElement('button');
          loadMoreBtn.className = 'renuvex-pr-load-more';
          var loadMoreLabel = document.createElement('span');
          loadMoreLabel.className = 'renuvex-pr-load-more-label';
          loadMoreLabel.setAttribute('aria-hidden', 'true');
          loadMoreBtn.appendChild(loadMoreLabel);
          function setLoadMoreText(text) {
            loadMoreLabel.textContent = text;
            loadMoreBtn.setAttribute('aria-label', text);
          }
          setLoadMoreText('Daha Fazla Göster');
          loadMoreBtn.onclick = async function () {
            loadMoreBtn.disabled = true;
            setLoadMoreText('Yükleniyor...');
            var token = beginReviewRequest();
            var productIdSnapshot = currentProductId;
            var orderBySnapshot = currentOrderBy;
            var pageSnapshot = currentPage;
            var ratingFilterSnapshot = currentRatingFilter;
            var hasImagesSnapshot = currentHasImages;
            var nextCursorSnapshot = currentNextCursor;
            var nextPage = pageSnapshot + 1;
            var moreData = await fetchReviews(productIdSnapshot, orderBySnapshot, nextPage, ratingFilterSnapshot, hasImagesSnapshot, null, nextCursorSnapshot);
            if (!isCurrentReviewRequest(token, {
              productId: productIdSnapshot,
              orderBy: orderBySnapshot,
              page: pageSnapshot,
              ratingFilter: ratingFilterSnapshot,
              hasImages: hasImagesSnapshot,
              nextCursor: nextCursorSnapshot,
            })) return;
            if (moreData && !isReviewsFetchError(moreData) && moreData.data && Array.isArray(moreData.data.reviews)) {
              var newReviews = getNewLoadedLightboxReviews(moreData.data.reviews);
              appendLoadedLightboxReviews(newReviews);
              setCurrentPage(nextPage);
              setCurrentNextCursor(moreData.data.nextCursor || null);
              var moreReviewLayout = getReviewLayout(currentSettings.reviewLayout);
              newReviews.forEach(function (r) {
                widget.insertBefore(moreReviewLayout.render(r, loadedLightboxReviews), loadMoreBtn);
              });
              if (!moreData.data.hasMore) loadMoreBtn.remove();
              else { loadMoreBtn.disabled = false; setLoadMoreText('Daha Fazla Göster'); }
            } else {
              loadMoreBtn.disabled = false;
              setLoadMoreText('Tekrar Dene');
            }
          };
          widget.appendChild(loadMoreBtn);
        }
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
