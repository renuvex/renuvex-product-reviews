// product-widget/render.js — Ana widget render fonksiyonu

import { getFirstTrustedReviewImage, getTrustedReviewImages, injectStyles, PHOTO_STRIP_THUMB_WIDTH, buildResponsiveImgAttrs, hideOnImageError } from '../core/helpers.js';
import { fetchReviews, isReviewsFetchError } from './bootstrap.js';
import { openReviewModal } from './review-modal.js';
import { injectRatingBadge } from './rating-badge.js';
import { CLASSIC_CSS } from '../themes/ozy/styles.js';
import { THEME_SINGLE_PRODUCT_CONTAINER } from '../themes/ozy/theme.js';
import { getIconFromSettings } from '../icons/index.js';
import { getLayout, getLayoutsCSS } from '../summary-layouts/index.js';
import { getReviewLayout, getReviewLayoutsCSS } from '../review-layouts/index.js';
import { openWriteForm } from '../summary-layouts/shared/write-action.js';
import { createOwnedSlot, setSlotContext } from '../core/slot.js';
import { probeWidgetVisibility } from '../core/health.js';
import {
  renderInProgress, pendingRender,
  setRenderInProgress, setPendingRender,
  currentOrderBy, currentPage, currentRatingFilter, currentHasImages, currentProductId, currentSettings, currentBadgeSettings, currentProductName,
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter, setCurrentHasImages, setCurrentProductId, setCurrentSettings, setCurrentBadgeSettings, setCurrentProductName,
  setCurrentReviewsData,
  photoStripReviews, loadedLightboxReviews,
  setLoadedLightboxReviews, appendLoadedLightboxReviews,
} from '../core/state.js';

// ─── CSS değişkenleri ────────────────────────────────────────────────────────
// Her UI elemanı kendi spesifik CSS değişkeniyle renklendirilir. Eski genel
// tema token'ları (--ikr-bg, --ikr-text vb.) kaldırıldı; her renk doğrudan
// schema'daki karşılığından veya sabit default'tan gelir.

// Yardımcı: hex → rgba string (alpha verilerek). Structural translucency
// (hover bg, border, track) türevleri için kullanılır.
// 6-char (#rrggbb) ve 8-char (#rrggbbaa) hex destekler.
function hexToRgba(hex, alpha) {
  var m = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(hex);
  if (!m) return 'rgba(0,0,0,' + alpha + ')';
  var r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function getOrCreateReviewsAnchor() {
  var anchorEl = document.getElementById('ikas-reviews-anchor');
  if (anchorEl) return anchorEl;

  anchorEl = document.createElement('div');
  anchorEl.id = 'ikas-reviews-anchor';
  anchorEl.setAttribute('data-ikr-auto-anchor', '1');

  var productContainer = null;
  try {
    productContainer = document.querySelector(THEME_SINGLE_PRODUCT_CONTAINER);
  } catch (_) {}

  if (productContainer && productContainer.parentNode) {
    productContainer.parentNode.insertBefore(anchorEl, productContainer.nextSibling);
    return anchorEl;
  }

  var fallbackParent = document.querySelector('main') || document.body;
  if (!fallbackParent) return null;
  fallbackParent.appendChild(anchorEl);
  return anchorEl;
}

function getOrCreateReviewsSlot(anchorEl, productId) {
  var slot = anchorEl.querySelector('[data-renuvex-slot="product-reviews"],[data-ikr-slot="product-reviews"]');
  if (!slot) {
    slot = createOwnedSlot({
      slot: 'product-reviews',
      legacySlot: 'product-reviews',
      className: 'renuvex-pr-reviews-slot ikr-reviews-slot',
      context: { surface: 'reviews', productId: productId || '' },
    });
    anchorEl.appendChild(slot);
  }
  setSlotContext(slot, { surface: 'reviews', productId: productId || '' });
  return slot;
}

// ─── Boyut Preset'leri ─────────────────────────────────────────────────────
// Küçük / Orta / Büyük — tüm font ve ikon boyutlarını tek seçimle belirler.
// Thumbnail boyutu ayrı preset (thumbnailSize).

var SIZE_PRESETS = {
  small: {
    titleSize: 20, reviewTextSize: 12, reviewTitleSize: 14, authorSize: 12,
    replyNameSize: 12, replyTextSize: 12, photoTitleSize: 14,
    avgRatingSize: 36, avgStarSize: 48, reviewCountSize: 16, recommendSize: 12,
    compactCountSize: 14,
    btnTextSize: 12, barLabelSize: 18, barCountSize: 12,
    reviewDateSize: 10, filterTextSize: 12, loadMoreSize: 12,
    readMoreSize: 10, reviewStarSize: 18,
    minimalAvgSize: 18,
    heroAvgSize: 74,
  },
  medium: {
    titleSize: 24, reviewTextSize: 14, reviewTitleSize: 16, authorSize: 14,
    replyNameSize: 13, replyTextSize: 13, photoTitleSize: 16,
    avgRatingSize: 46, avgStarSize: 58, reviewCountSize: 20, recommendSize: 14,
    compactCountSize: 16,
    btnTextSize: 14, barLabelSize: 22, barCountSize: 14,
    reviewDateSize: 12, filterTextSize: 14, loadMoreSize: 14,
    readMoreSize: 12, reviewStarSize: 22,
    minimalAvgSize: 22,
    heroAvgSize: 90,
  },
  large: {
    titleSize: 28, reviewTextSize: 16, reviewTitleSize: 18, authorSize: 16,
    replyNameSize: 15, replyTextSize: 15, photoTitleSize: 18,
    avgRatingSize: 56, avgStarSize: 68, reviewCountSize: 22, recommendSize: 16,
    compactCountSize: 18,
    btnTextSize: 16, barLabelSize: 26, barCountSize: 16,
    reviewDateSize: 14, filterTextSize: 16, loadMoreSize: 16,
    readMoreSize: 14, reviewStarSize: 26,
    minimalAvgSize: 26,
    heroAvgSize: 106,
  },
};

var THUMBNAIL_PRESETS = { small: 80, medium: 110, large: 140 };

function buildReviewsErrorState(message, onRetry) {
  var wrap = document.createElement('div');
  wrap.className = 'ikr-state-msg ikr-state-error';
  wrap.setAttribute('role', 'status');
  wrap.setAttribute('aria-live', 'polite');

  var text = document.createElement('div');
  text.className = 'ikr-state-error-text';
  text.textContent = message || 'Yorumlar şu anda yüklenemiyor.';
  wrap.appendChild(text);

  var retryBtn = document.createElement('button');
  retryBtn.type = 'button';
  retryBtn.className = 'ikr-state-retry';
  retryBtn.textContent = 'Tekrar Dene';
  retryBtn.onclick = async function () {
    retryBtn.disabled = true;
    retryBtn.textContent = 'Tekrar deneniyor...';
    await onRetry();
  };
  wrap.appendChild(retryBtn);

  return wrap;
}

function applyManualTheme(root, settings) {
  // Grup 1 — Genel
  // Widget container background/border always transparent (store theme owns it).

  // Grup 2 — Başlık & Özet
  var headerTitle = settings.headerTitleColor || '#111111';
  var headerAvg = settings.headerAvgColor || '#111111';
  var headerCount = settings.headerCountColor || '#111111';
  var headerRecommend = settings.headerRecommendColor || '#111111';

  // Grup 3 — Puan Dağılımı
  var barFill = settings.barFillColor || '#111111';
  var barTrack = settings.barTrackColor || '#e5e7eb';
  // Bar track stays independent so chart contrast can be tuned separately.
  var barCount = settings.barCountColor || '#111111';
  var barHoverBg = hexToRgba(barFill, 0.06);

  // Grup 6 — Yorum Kartı (reviewStarColor önce tanımlanmalı)
  var reviewStarColor = settings.reviewStarColor || '#f59e0b';

  // Grup 4 — Butonlar
  var btnBg = settings.btnBgColor || '#111111';
  var btnText = settings.btnTextColor || '#ffffff';
  var btnBorder = settings.btnBorderColor || '#111111';
  var filterBg = settings.filterBtnBgColor || '#111111';
  var filterText = settings.filterBtnTextColor || '#ffffff';
  var filterBorder = settings.filterBtnBorderColor || '#111111';

  // Grup 5 — Filtre Menüsü
  var filterMenuBg = settings.filterMenuBgColor || '#ffffff';
  var filterMenuBorder = settings.filterMenuBorderColor || '#e5e7eb';
  var filterItemText = settings.filterItemTextColor || '#111111';
  var filterItemHoverBg = settings.filterItemHoverBgColor || '#f3f4f6';
  var filterItemActive = settings.filterItemActiveColor || '#111111';

  // Grup 6 — Yorum Kartı (reviewStarColor yukarıda Grup 3'te tanımlandı)
  var reviewTitleColor = settings.reviewTitleColor || '#111111';
  var reviewAuthorColor = settings.reviewAuthorColor || '#111111';
  var reviewDateColor = settings.reviewDateColor || '#5e5e5e';
  var reviewBodyColor = settings.reviewBodyColor || '#111111';
  var reviewBorderColor = settings.reviewBorderColor || '#e5e7eb';

  // Grup 7 — Mağaza Yanıtı
  var replyBgVar = settings.replyBgColor || '#f9fafb';
  var replyBorderVar = settings.replyBorderColor || '#747474';
  var replyLabelColor = settings.replyLabelColor || '#111111';
  var replyTextVar = settings.replyTextColor || '#111111';

  // Grup 9 — Fotoğraf Galerisi
  var photoTitle = settings.photoTitleColor || '#111111';
  var photoImageBorder = hexToRgba('#111111', 0.05);
  var photoArrowBg = settings.photoArrowBgColor || '#ffffff';
  var photoArrowText = settings.photoArrowTextColor || '#111111';
  var photoArrowBorder = hexToRgba('#111111', 0.12);

  // Group 10 - Review form
  // Form tokens drive the modal review wizard.
  // The overlay color is intentionally not mapped here; it stays fixed.
  // Primary / secondary split: primary = titles, inputs; secondary = subtitles,
  // labels, notice, placeholder. Both opaque — no alpha derivatives.
  var formBg = settings.formBgColor || '#ffffff';
  var formPrimary = settings.formPrimaryTextColor || '#111111';
  var formSecondary = settings.formSecondaryTextColor || '#3b3b3b';
  var inputTextVar = settings.inputTextColor || formPrimary;
  var inputBorderVar = settings.inputBorderColor || '#d1d5db';
  var placeholderColor = settings.placeholderColor || '#9ca3af';
  var formStepBarColor = settings.formStepBarColor || '#111111';
  var formBtnBg = settings.formBtnBgColor || '#111111';
  var formBtnText = settings.formBtnTextColor || '#ffffff';
  var formBtnBorder = settings.formBtnBorderColor || '#111111';
  var formNavHoverBg = hexToRgba(formBtnBg, 0.06);
  var formBtnDisabledBg = hexToRgba(formBtnBg, 0.18);
  var formBtnDisabledText = hexToRgba(formBtnText, 0.85);
  var formSubtleBg = hexToRgba(formPrimary, 0.06);

  // Grup 11 — Daha Fazla Göster
  var loadMoreBg = settings.loadMoreBgColor || '#ffffff';
  var loadMoreText = settings.loadMoreTextColor || '#111111';
  var loadMoreBorder = settings.loadMoreBorderColor || '#111111';

  var vars = {
    // Grup 1 — Genel
    '--ikr-widget-bg': '#ffffff00',
    '--ikr-widget-border': '#ffffff00',

    // Grup 2 — Başlık & Özet
    '--ikr-header-title': headerTitle,
    '--ikr-header-avg': headerAvg,
    '--ikr-header-count': headerCount,
    '--ikr-header-recommend': headerRecommend,

    // Grup 3 — Puan Dağılımı
    '--ikr-bar-fill': barFill,
    '--ikr-bar-track': barTrack,
    '--ikr-bar-count': barCount,
    '--ikr-bar-hover-bg': barHoverBg,

    // Grup 4 — Butonlar
    '--ikr-btn-bg': btnBg,
    '--ikr-btn-text': btnText,
    '--ikr-btn-border': btnBorder,
    '--ikr-filter-btn-bg': filterBg,
    '--ikr-filter-btn-text': filterText,
    '--ikr-filter-btn-border': filterBorder,

    // Grup 5 — Filtre Menüsü
    '--ikr-filter-menu-bg': filterMenuBg,
    '--ikr-filter-menu-border': filterMenuBorder,
    '--ikr-filter-item-text': filterItemText,
    '--ikr-filter-item-hover-bg': filterItemHoverBg,
    '--ikr-filter-item-active': filterItemActive,

    // Grup 6 — Yorum Kartı
    '--ikr-review-title': reviewTitleColor,
    '--ikr-review-author': reviewAuthorColor,
    '--ikr-review-date': reviewDateColor,
    '--ikr-review-body': reviewBodyColor,
    '--ikr-review-border': reviewBorderColor,
    '--ikr-review-star-color': reviewStarColor,

    // Grup 7 — Mağaza Yanıtı
    '--ikr-reply-bg-color': replyBgVar,
    '--ikr-reply-border': replyBorderVar,
    '--ikr-reply-label': replyLabelColor,
    '--ikr-reply-text': replyTextVar,

    // Grup 9 — Fotoğraf Galerisi
    '--ikr-photo-title': photoTitle,
    '--ikr-photo-image-border': photoImageBorder,
    '--ikr-photo-arrow-bg': photoArrowBg,
    '--ikr-photo-arrow-text': photoArrowText,
    '--ikr-photo-arrow-border': photoArrowBorder,

    // Grup 10 — Form wizard
    '--ikr-fwizard-bg': formBg,
    '--ikr-fwizard-text': formPrimary,
    '--ikr-fwizard-secondary-text': formSecondary,
    '--ikr-fwizard-input-bg': formBg,
    '--ikr-fwizard-input-text': inputTextVar,
    '--ikr-fwizard-input-border': inputBorderVar,
    '--ikr-fwizard-placeholder': placeholderColor,
    '--ikr-fwizard-close-text': formPrimary,
    '--ikr-fwizard-close-hover-bg': formSubtleBg,
    '--ikr-fwizard-progress-bg': formSubtleBg,
    '--ikr-fwizard-progress-active': formStepBarColor,
    '--ikr-fwizard-btn-bg': formBtnBg,
    '--ikr-fwizard-btn-text': formBtnText,
    '--ikr-fwizard-btn-border': formBtnBorder,
    '--ikr-fwizard-btn-disabled-bg': formBtnDisabledBg,
    '--ikr-fwizard-btn-disabled-text': formBtnDisabledText,
    '--ikr-fwizard-nav-hover-bg': formNavHoverBg,

    // Grup 11 — Daha Fazla Göster
    '--ikr-load-more-bg': loadMoreBg,
    '--ikr-load-more-text': loadMoreText,
    '--ikr-load-more-border': loadMoreBorder,
  };

  Object.keys(vars).forEach(function (k) { root.style.setProperty(k, vars[k]); });

  if (typeof window !== 'undefined' && window.__ikasPreviewMode && document.body) {
    document.body.style.background = 'transparent';
    document.documentElement.style.background = 'transparent';
  }
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

    // injectStyles CSS'i enjekte eder; renk parametresi --ikr-color ve
    // --ikr-color-light için kullanılır. Bu token'lar artık kullanılmıyor
    // (tüm renkler spesifik var'lar üzerinden gidiyor), ama injectStyles
    // hâlâ CSS <style> elementini oluşturup/güncelliyor.
    injectStyles('#111111', CLASSIC_CSS + getLayoutsCSS() + getReviewLayoutsCSS());

    var radius = settings.borderRadius !== undefined ? settings.borderRadius : 8;

    // Boyut preset'inden değerleri oku
    var sz = SIZE_PRESETS[settings.size] || SIZE_PRESETS.medium;
    var thumbPx = THUMBNAIL_PRESETS[settings.thumbnailSize] || THUMBNAIL_PRESETS.medium;

    // Liste ve Galeri gibi tasarımlarda, üst galeri şeridi (thumbPx) boyutu
    // layout'un kendi fotoğraf genişliğinden beslenmeli (tutarlılık için).
    var reviewLayout = getReviewLayout(settings.reviewLayout);
    if (reviewLayout.meta && reviewLayout.meta.sizeOverrides && reviewLayout.meta.sizeOverrides[settings.size]) {
      var overrides = reviewLayout.meta.sizeOverrides[settings.size];
      var layoutPhotoW = overrides['--ikr-list-photo-w'] || overrides['--ikr-gallery-photo-w'];
      if (layoutPhotoW) {
        thumbPx = parseInt(layoutPhotoW);
      }
    }

    root.style.setProperty('--ikr-title-size', sz.titleSize + 'px');
    root.style.setProperty('--ikr-review-text-size', sz.reviewTextSize + 'px');
    root.style.setProperty('--ikr-review-title-size', sz.reviewTitleSize + 'px');
    root.style.setProperty('--ikr-author-size', sz.authorSize + 'px');
    root.style.setProperty('--ikr-reply-name-size', sz.replyNameSize + 'px');
    root.style.setProperty('--ikr-reply-text-size', sz.replyTextSize + 'px');
    root.style.setProperty('--ikr-radius', radius + 'px');
    root.style.setProperty('--ikr-radius-sm', Math.max(0, radius - 4) + 'px');
    root.style.setProperty('--ikr-photo-title-size', sz.photoTitleSize + 'px');
    root.style.setProperty('--ikr-avg-rating-size', sz.avgRatingSize + 'px');
    root.style.setProperty('--ikr-review-count-size', sz.reviewCountSize + 'px');
    root.style.setProperty('--ikr-compact-count-size', sz.compactCountSize + 'px');
    root.style.setProperty('--ikr-recommend-size', sz.recommendSize + 'px');
    root.style.setProperty('--ikr-btn-text-size', sz.btnTextSize + 'px');
    root.style.setProperty('--ikr-bar-label-size', sz.barLabelSize + 'px');
    root.style.setProperty('--ikr-minimal-avg-size', sz.minimalAvgSize + 'px');
    root.style.setProperty('--ikr-hero-avg-size', sz.heroAvgSize + 'px');
    root.style.setProperty('--ikr-bar-count-size', sz.barCountSize + 'px');
    root.style.setProperty('--ikr-review-date-size', sz.reviewDateSize + 'px');
    root.style.setProperty('--ikr-filter-text-size', sz.filterTextSize + 'px');
    root.style.setProperty('--ikr-load-more-size', sz.loadMoreSize + 'px');
    root.style.setProperty('--ikr-read-more-size', sz.readMoreSize + 'px');
    root.style.setProperty('--ikr-thumbnail-size', thumbPx + 'px');

    // Yıldız rengi tek kaynak: tüm rating yüzeyleri (özet, liste, rozetler)
    // --ikr-review-star-color'dan beslenir; boş yıldız da aynı renkte outline.
    // Runtime 6-char veya 8-char hex kabul eder; admin picker sadece opak hex yazar.
    var reviewStarColor = /^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/.test(settings.reviewStarColor || '') ? settings.reviewStarColor : '#f59e0b';
    root.style.setProperty('--ikr-review-star-color', reviewStarColor);
    root.style.setProperty('--ikr-star-size', sz.reviewStarSize + 'px');
    root.style.setProperty('--ikr-avg-star-size', sz.avgStarSize + 'px');

    // Layout-spesifik boyut override'ları (opsiyonel).
    // Bir layout'un meta.sizeOverrides[size] objesi varsa, oradaki CSS değişkenleri
    // global SIZE_PRESETS değerlerinin üzerine yazılır. Sözleşme: { '--ikr-xxx': '14px', ... }.
    // Layout'lar bu alanı export etmek zorunda değil — yoksa global preset aynen geçerli kalır.
    function applyLayoutSizeOverrides(layout, sizeKey) {
      if (!layout || !layout.meta || !layout.meta.sizeOverrides) return;
      var ov = layout.meta.sizeOverrides[sizeKey];
      if (!ov) return;
      Object.keys(ov).forEach(function (k) { root.style.setProperty(k, ov[k]); });
    }
    applyLayoutSizeOverrides(getLayout(settings.summaryLayout), settings.size);
    applyLayoutSizeOverrides(getReviewLayout(settings.reviewLayout), settings.size);

    // İkon + stil seçimine göre SVG çifti (filled/empty) al — ICONS registry'sinden
    var iconPair = getIconFromSettings(settings);

    var anchorEl = getOrCreateReviewsAnchor();
    if (!anchorEl) return;
    var reviewsSlot = getOrCreateReviewsSlot(anchorEl, productId);
    var container = document.getElementById('ikas-reviews');
    if (!container) {
      container = document.createElement('div');
      container.id = 'ikas-reviews';
      container.style.minHeight = '200px';
    }
    if (container.parentNode !== reviewsSlot) reviewsSlot.appendChild(container);

    if (settings.enabled === false) {
      container.style.minHeight = 'auto';
      container.innerHTML = '<div style="padding: 40px 20px; margin-top: 24px; text-align: center; color: #6e6d7a; font-family: Inter, sans-serif; border: 1px dashed #e3e1e5; border-radius: ' + (settings.borderRadius !== undefined ? settings.borderRadius : 8) + 'px; background: #fafafa; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #6e6d7a; margin-bottom: 4px;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><div style="font-weight: 500; font-size: 18px; color: #1a191a; letter-spacing: -0.01em;">Widget şu anda Pasif durumda</div><div style="font-size: 16px; color: #6e6d7a; max-width: 380px; line-height: 1.5;">Canlı mağazanızda müşterileriniz hiçbir yorum alanı görmeyecektir.</div></div>';

      setRenderInProgress(false);
      var p = pendingRender;
      setPendingRender(null);
      if (p) render(p.productId, p.settings, p.reviewsData, p.productName, p.orderBy, p.page, p.badgeSettings);
      return;
    }

    container.innerHTML = '<p class="ikr-state-msg ikr-state-loading">Yorumlar yükleniyor...</p>';

    try {
      var data = reviewsData || {};
      var hasReviewsFetchError = isReviewsFetchError(data);
      var reviews = hasReviewsFetchError ? [] : ((data.data && data.data.reviews) || []);
      var totalCount = hasReviewsFetchError ? 0 : ((data.data && data.data.totalCount) || 0);
      setLoadedLightboxReviews(reviews);

      // Önceki listener'ları temizle — parentNode her zaman var (anchorEl.appendChild ile eklendi)
      var fresh = container.cloneNode(false);
      container.parentNode.replaceChild(fresh, container);
      container = fresh;

      var widget = document.createElement('div');
      widget.id = 'ikas-reviews-widget';
      widget.className = 'renuvex-pr-reviews-widget';
      widget.setAttribute('data-renuvex-surface', 'reviews');
      widget.setAttribute('data-ikr-surface', 'reviews');
      if (productId) {
        widget.setAttribute('data-renuvex-product-id', String(productId));
        widget.setAttribute('data-ikr-product-id', String(productId));
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
      // Layout id class'ı ekleniyor (ör. ikr-title-compact) ki layout'lar
      // başlık hizasını kendi CSS'lerinde override edebilsin.
      if (title) {
        var h2 = document.createElement('div');
        var layoutId = settings.summaryLayout || 'classic';
        h2.className = 'ikr-title ikr-title-' + layoutId;
        h2.textContent = title;
        widget.appendChild(h2);
      }

      if (hasReviewsFetchError) {
        widget.appendChild(buildReviewsErrorState(data.message, async function () {
          var retried = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter, currentHasImages);
          await render(currentProductId, currentSettings, retried, currentProductName, currentOrderBy, 1, currentBadgeSettings);
        }));
        container.appendChild(widget);
        probeWidgetVisibility(widget, 'reviews-widget', { productId: productId || '', reason: 'fetch_error' });
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
          data: data,
          settings: settings,
          iconPair: iconPair,
          allCount: allCount,
          ratingCounts: ratingCounts,
          avgRatingVal: avgRatingVal,
          currentRatingFilter: currentRatingFilter,
          currentOrderBy: currentOrderBy,
          currentHasImages: currentHasImages,
          onFilterChange: async function (starVal) {
            setCurrentRatingFilter(currentRatingFilter === starVal ? null : starVal);
            setCurrentPage(1);
            var filtered = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter, currentHasImages);
            await render(currentProductId, currentSettings, filtered, currentProductName, currentOrderBy, 1);
          },
          onSortChange: async function (orderBy, isPhotos) {
            setCurrentPage(1);
            if (isPhotos) {
              setCurrentHasImages(true);
              setCurrentOrderBy('newest');
            } else {
              setCurrentHasImages(false);
              setCurrentOrderBy(orderBy);
            }
            var newData = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter, currentHasImages);
            await render(currentProductId, currentSettings, newData, currentProductName, currentOrderBy, 1);
          },
        });
        widget.appendChild(summary);
      } else {
        // Yorum yoksa sadece Yorum Yap butonu göster
        var emptyWriteBtn = document.createElement('button');
        emptyWriteBtn.className = 'ikr-write-btn';
        emptyWriteBtn.style.cssText = 'display:block;margin:16px auto 0;';
        emptyWriteBtn.textContent = settings.writeButtonText || 'Yorum Yap';
        emptyWriteBtn.onclick = openWriteForm;
        widget.appendChild(emptyWriteBtn);
      }

      // Fotoğraf şeridi — state.photoStripReviews bootstrap'ta tek seferlik
      // `hasImages=true&limit=15&orderBy=newest` ile dolduruldu. Filtreden
      // ("Fotoğraflı" sort) ve load-more'dan bağımsız; sadece cache TTL (1 dk)
      // sonra arka planda yenilenir (Strateji A — newest-first rotation).
      // ADR_0007: sabit 15 cap, admin ayarı yok.
      var stripReviews = (photoStripReviews || []).filter(function (r) {
        return getTrustedReviewImages(r).length > 0;
      });
      if (settings.showPhotoGallery !== false && !currentHasImages && stripReviews.length > 0) {
        var photoSection = document.createElement('div');
        photoSection.className = 'ikr-photo-section';

        // Strip üstündeki başlık — admin paneldeki "Genel → Görsel Galeri Başlığı"
        // ile özelleştirilebilir; toggle (showPhotoGalleryTitle) kapalıysa hiç render edilmez.
        // Boyut --ikr-photo-title-size, renk --ikr-photo-title CSS variable üzerinden.
        if (settings.showPhotoGalleryTitle !== false) {
          var photoTitleText = (settings.photoGalleryTitle || '').trim() || 'Fotoğraflı Yorumlar';
          var photoTitle = document.createElement('div');
          photoTitle.className = 'ikr-photo-title';
          photoTitle.textContent = photoTitleText;
          photoSection.appendChild(photoTitle);
        }

        // Thumbnail aspect ratio review layout'a göre otomatik:
        // card review fotoları 1:1 → strip de kare; list/gallery review fotoları
        // 3:4 portre → strip de portre. Tutarlı görsel akış.
        var thumbAspect = settings.reviewLayout === 'card' ? '1/1' : '3/4';
        root.style.setProperty('--ikr-photo-thumb-aspect', thumbAspect);

        var photoStrip = document.createElement('div');
        photoStrip.className = 'ikr-photo-strip';

        // Backend cap=15 garantili; defansif iç sınır da 15.
        // `<img>` width/height attribute'ları CSS `--ikr-photo-thumb-aspect` ile uyumlu
        // olmalı (card: 1/1, list/gallery: 3/4) — CLS rezervi tarayıcı tarafından doğru
        // hesaplanır. width PHOTO_STRIP_THUMB_WIDTH (300); height layout'a göre.
        var stripWidth = PHOTO_STRIP_THUMB_WIDTH;
        var stripHeight = settings.reviewLayout === 'card' ? PHOTO_STRIP_THUMB_WIDTH : Math.round(PHOTO_STRIP_THUMB_WIDTH * 4 / 3);
        var thumbCount = 0;
        stripReviews.forEach(function (r) {
          if (thumbCount >= 15) return;
          var firstImg = getFirstTrustedReviewImage(r);
          if (!firstImg) return;
          var thumb = document.createElement('img');
          var attrs = buildResponsiveImgAttrs(firstImg, PHOTO_STRIP_THUMB_WIDTH);
          thumb.src = attrs.src;
          thumb.srcset = attrs.srcset;
          // İlk 3 thumbnail above-the-fold ihtimaline karşı eager; gerisi lazy.
          // Strip her zaman summary altında; mobile'da bazen ilk render'da kısmen
          // viewport içinde olabiliyor — eager kuyruğu çok küçük tuttuk.
          thumb.loading = thumbCount < 3 ? 'eager' : 'lazy';
          thumb.decoding = 'async';
          thumb.width = stripWidth;
          thumb.height = stripHeight;
          thumb.className = 'ikr-photo-strip-thumb';
          thumb.alt = 'Yorum fotoğrafı';
          hideOnImageError(thumb);
          // Lightbox navigasyonu strip dataset'i içinde gezer — load-more sonrası
          // ana liste değişse bile lightbox tutarlı kalır (K1.b çözümü).
          (function (url, review) {
            thumb.onclick = function () { openReviewModal(review, url, stripReviews); };
          })(firstImg, r);
          photoStrip.appendChild(thumb);
          thumbCount++;
        });

        // Desktop ok butonları
        var prevArrow = document.createElement('button');
        prevArrow.className = 'ikr-photo-strip-arrow ikr-photo-strip-arrow-prev';
        prevArrow.innerHTML = '&#8249;';
        prevArrow.setAttribute('aria-label', 'Önceki');
        prevArrow.onclick = function () { photoStrip.scrollBy({ left: -200, behavior: 'smooth' }); };

        var nextArrow = document.createElement('button');
        nextArrow.className = 'ikr-photo-strip-arrow ikr-photo-strip-arrow-next';
        nextArrow.innerHTML = '&#8250;';
        nextArrow.setAttribute('aria-label', 'Sonraki');
        nextArrow.onclick = function () { photoStrip.scrollBy({ left: 200, behavior: 'smooth' }); };

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
        empty.className = 'ikr-state-msg';
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
        loadMoreBtn.className = 'ikr-load-more';
        loadMoreBtn.textContent = 'Daha Fazla Göster';
        loadMoreBtn.onclick = async function () {
          loadMoreBtn.disabled = true;
          loadMoreBtn.textContent = 'Yükleniyor...';
          var nextPage = currentPage + 1;
          var moreData = await fetchReviews(currentProductId, currentOrderBy, nextPage, currentRatingFilter, currentHasImages);
          if (moreData && !isReviewsFetchError(moreData) && moreData.data && Array.isArray(moreData.data.reviews)) {
            appendLoadedLightboxReviews(moreData.data.reviews);
            setCurrentPage(nextPage);
            var moreReviewLayout = getReviewLayout(currentSettings.reviewLayout);
            moreData.data.reviews.forEach(function (r) {
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

      container.appendChild(widget);
      probeWidgetVisibility(widget, 'reviews-widget', { productId: productId || '' });

      // Rating badge + JSON-LD — görünürlük/boyut "Yıldız Rozeti" widget'ından;
      // yıldız ikonu + rengi tek kaynaktan (reviews widget) — iconPair geçirilir.
      injectRatingBadge(allCount > 0 ? avgRatingVal : null, totalCount, productName, currentBadgeSettings, iconPair, currentProductId);


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
