// product-widget/render.js — Ana widget render fonksiyonu

import { injectStyles, optimizeImageUrl } from '../core/helpers.js';
import { fetchReviews } from './bootstrap.js';
import { openReviewModal } from './review-modal.js';
import { buildReviewForm } from './review-form.js';
import { injectRatingBadge } from './rating-badge.js';
import { CLASSIC_CSS } from '../themes/ozy/styles.js';
import { getIconFromSettings } from '../icons.js';
import { getLayout, getLayoutsCSS } from '../summary-layouts/index.js';
import { getReviewLayout, getReviewLayoutsCSS } from '../review-layouts/index.js';
import { toggleWriteAccordion } from '../summary-layouts/shared/write-toggle.js';
import {
  renderInProgress, pendingRender,
  setRenderInProgress, setPendingRender,
  currentOrderBy, currentPage, currentRatingFilter, currentHasImages, currentProductId, currentSettings, currentBadgeSettings, currentProductName,
  setCurrentOrderBy, setCurrentPage, setCurrentRatingFilter, setCurrentHasImages, setCurrentProductId, setCurrentSettings, setCurrentBadgeSettings, setCurrentProductName,
  setCurrentReviewsData,
} from '../core/state.js';

// ─── Tema → CSS değişkenleri ────────────────────────────────────────────────
// Admin'den gelen 7 renk ayarı (bg, text, muted, reply, input + primaryColor
// ve primaryTextColor render() içinde) CSS değişkenlerine yazılır. styles.js
// tüm yüzey/yazı/border renklerini bu değişkenler üzerinden okur.

// Yardımcı: hex → rgba string (alpha verilerek). text-faint, border ve
// track-bg gibi türev renkleri ana renklerden alpha ile üretmek için.
// 6-char (#rrggbb) ve 8-char (#rrggbbaa) hex destekler.
// 8-char gelirse son byte alpha'sı vardır ama bu fonksiyon CALLER'ın verdigi
// alpha'yı kullanir — kullanim senaryosu "temel renk opak alinip azaltilmis
// saydamlikla bir yere uygulanmak" (ör. hover bg, border %8 opacity). Yani
// kullanici hex'inin kendi alpha'si yoksayilir, caller alpha'si hakim.
// rgba(...) dondurur cunku CSS alpha desteklesin diye.
function hexToRgba(hex, alpha) {
  var m = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(hex);
  if (!m) return 'rgba(0,0,0,' + alpha + ')';
  var r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

// ─── Boyut Preset'leri ─────────────────────────────────────────────────────
// Küçük / Orta / Büyük — tüm font ve ikon boyutlarını tek seçimle belirler.
// Thumbnail boyutu ayrı preset (thumbnailSize).

var SIZE_PRESETS = {
  small: {
    titleSize: 20, reviewTextSize: 12, reviewTitleSize: 14, authorSize: 12,
    replyNameSize: 12, replyTextSize: 12, photoTitleSize: 14,
    avgRatingSize: 36, avgStarSize: 48, reviewCountSize: 14, recommendSize: 12,
    btnTextSize: 12, barLabelSize: 18, barCountSize: 12,
    reviewDateSize: 10, filterTextSize: 12, loadMoreSize: 12,
    readMoreSize: 10, reviewStarSize: 18,
    minimalAvgSize: 18,
    heroAvgSize: 52,
  },
  medium: {
    titleSize: 24, reviewTextSize: 14, reviewTitleSize: 16, authorSize: 14,
    replyNameSize: 13, replyTextSize: 13, photoTitleSize: 16,
    avgRatingSize: 46, avgStarSize: 58, reviewCountSize: 16, recommendSize: 14,
    btnTextSize: 14, barLabelSize: 22, barCountSize: 14,
    reviewDateSize: 12, filterTextSize: 14, loadMoreSize: 14,
    readMoreSize: 12, reviewStarSize: 22,
    minimalAvgSize: 22,
    heroAvgSize: 64,
  },
  large: {
    titleSize: 28, reviewTextSize: 16, reviewTitleSize: 18, authorSize: 16,
    replyNameSize: 15, replyTextSize: 15, photoTitleSize: 18,
    avgRatingSize: 56, avgStarSize: 68, reviewCountSize: 18, recommendSize: 16,
    btnTextSize: 16, barLabelSize: 26, barCountSize: 16,
    reviewDateSize: 14, filterTextSize: 16, loadMoreSize: 16,
    readMoreSize: 14, reviewStarSize: 26,
    minimalAvgSize: 26,
    heroAvgSize: 76,
  },
};

var THUMBNAIL_PRESETS = { small: 80, medium: 110, large: 140 };

function applyManualTheme(root, settings) {
  var bg = settings.bgColor || '#ffffff';
  var text = settings.textColor || '#111111';
  var replyBg = settings.replyBgColor || '#f9fafb';
  var inputBg = settings.inputBgColor || '#ffffff';

  // Grup 1 — Genel
  var widgetBg      = settings.widgetBgColor     || '#ffffff00';
  var widgetBorder  = settings.widgetBorderColor || '#ffffff00';

  // Grup 2 — Başlık & Özet
  var headerTitle     = settings.headerTitleColor     || text;
  var headerAvg       = settings.headerAvgColor       || text;
  var headerCount     = settings.headerCountColor     || text;
  var headerRecommend = settings.headerRecommendColor || text;

  // Grup 3 — Puan Dağılımı
  var barFill   = settings.barFillColor   || text;
  var barTrack  = settings.barTrackColor  || '#e5e7eb';
  // Empty stars are shared by review items, rating inputs, and distribution stars.
  // Bar track stays independent so chart contrast can be tuned separately.
  var starEmpty = settings.starEmptyColor || '#e5e7eb';
  var barCount  = settings.barCountColor  || text;
  var barHoverBg = hexToRgba(barFill, 0.06);

  // Grup 4 — Butonlar
  var primary      = settings.primaryColor     || '#111111';
  var primaryText  = settings.primaryTextColor || '#ffffff';
  var btnBg        = settings.btnBgColor        || primary;
  var btnText      = settings.btnTextColor      || primaryText;
  var btnBorder    = settings.btnBorderColor    || primary;
  var filterBg     = settings.filterBtnBgColor     || '#111111';
  var filterText   = settings.filterBtnTextColor   || '#ffffff';
  var filterBorder = settings.filterBtnBorderColor || '#111111';

  // Grup 5 — Filtre Menüsü
  var filterMenuBg      = settings.filterMenuBgColor      || '#ffffff';
  var filterMenuBorder  = settings.filterMenuBorderColor  || '#e5e7eb';
  var filterItemText    = settings.filterItemTextColor    || text;
  var filterItemHoverBg = settings.filterItemHoverBgColor || '#f3f4f6';
  var filterItemActive  = settings.filterItemActiveColor  || '#111111';

  // Grup 6 — Yorum Kartı
  var reviewTitleColor = settings.reviewTitleColor || text;
  var reviewAuthorColor = settings.reviewAuthorColor || text;
  var reviewDateColor  = settings.reviewDateColor  || text;
  var reviewBodyColor  = settings.reviewBodyColor  || text;
  var reviewBorderColor = settings.reviewBorderColor || '#e5e7eb';
  var reviewStarColor  = settings.reviewStarColor  || '#f59e0b';

  // Grup 7 — Mağaza Yanıtı
  var replyBgVar      = settings.replyBgColor      || replyBg;
  var replyBorderVar  = settings.replyBorderColor  || '#747474';
  var replyLabelColor = settings.replyLabelColor   || text;
  var replyTextVar    = settings.replyTextColor    || text;

  // Grup 9 — Fotoğraf Galerisi
  var photoTitle        = settings.photoTitleColor       || text;
  var photoImageBorder  = settings.photoImageBorderColor || hexToRgba(text, 0.05);
  var photoArrowBg      = settings.photoArrowBgColor     || '#ffffff';
  var photoArrowText    = settings.photoArrowTextColor   || text;
  var photoArrowBorder  = settings.photoArrowBorderColor || hexToRgba(text, 0.12);

  // Group 10 - Review form
  // Shared form tokens drive both inline accordion form and wizard modal form.
  // The overlay color is intentionally not mapped here; it stays fixed.
  var formBg      = settings.formBgColor      || bg;
  var formText    = settings.formTextColor    || text;
  var formMuted   = hexToRgba(formText, 0.72);
  var inputBgVar  = settings.inputBgColor     || inputBg;
  var inputTextVar = settings.inputTextColor  || formText;
  var inputBorderVar = settings.inputBorderColor || hexToRgba(formText, 0.20);
  var placeholderColor = settings.placeholderColor || hexToRgba(formText, 0.42);
  var formSubtleBg = hexToRgba(formText, 0.06);

  // Grup 11 — Daha Fazla Göster
  var loadMoreBg     = settings.loadMoreBgColor     || '#ffffff00';
  var loadMoreText   = settings.loadMoreTextColor   || text;
  var loadMoreBorder = settings.loadMoreBorderColor || text;

  // Grup 12 — Modal
  var modalBg          = settings.modalBgColor          || bg;
  var modalCloseBg     = settings.modalCloseBgColor     || '#00000080';
  var modalCloseText   = settings.modalCloseTextColor   || primaryText;
  var modalCloseBorder = settings.modalCloseBorderColor || '#ffffff33';
  var modalNavBg       = settings.modalNavBgColor       || '#00000059';
  var modalNavText     = settings.modalNavTextColor     || '#ffffff';
  var modalNavBorder   = settings.modalNavBorderColor   || '#ffffff33';

  var vars = {
    // Grup 1 — Genel
    '--ikr-widget-bg':     widgetBg,
    '--ikr-widget-border': widgetBorder,

    // Grup 2 — Başlık & Özet
    '--ikr-header-title':     headerTitle,
    '--ikr-header-avg':       headerAvg,
    '--ikr-header-count':     headerCount,
    '--ikr-header-recommend': headerRecommend,

    // Grup 3 — Puan Dağılımı
    '--ikr-bar-fill':     barFill,
    '--ikr-bar-track':    barTrack,
    '--ikr-star-empty-color': starEmpty,
    '--ikr-bar-count':    barCount,
    '--ikr-bar-hover-bg': barHoverBg,

    // Grup 4 — Butonlar
    '--ikr-btn-bg':           btnBg,
    '--ikr-btn-text':         btnText,
    '--ikr-btn-border':       btnBorder,
    '--ikr-fwizard-cta-bg':   btnBg,
    '--ikr-fwizard-cta-text': btnText,
    '--ikr-fwizard-cta-border': btnBorder,
    '--ikr-fwizard-nav-text': btnBg,
    '--ikr-fwizard-nav-hover-bg': hexToRgba(btnBg, 0.06),
    '--ikr-filter-btn-bg':    filterBg,
    '--ikr-filter-btn-text':  filterText,
    '--ikr-filter-btn-border':filterBorder,

    // Grup 5 — Filtre Menüsü
    '--ikr-filter-menu-bg':       filterMenuBg,
    '--ikr-filter-menu-border':   filterMenuBorder,
    '--ikr-filter-item-text':     filterItemText,
    '--ikr-filter-item-hover-bg': filterItemHoverBg,
    '--ikr-filter-item-active':   filterItemActive,

    // Grup 6 — Yorum Kartı
    '--ikr-review-title':        reviewTitleColor,
    '--ikr-review-author':       reviewAuthorColor,
    '--ikr-review-date':         reviewDateColor,
    '--ikr-review-body':         reviewBodyColor,
    '--ikr-review-border':       reviewBorderColor,
    '--ikr-review-star-color':   reviewStarColor,

    // Grup 7 — Mağaza Yanıtı
    '--ikr-reply-bg-color':    replyBgVar,
    '--ikr-reply-border':      replyBorderVar,
    '--ikr-reply-label':       replyLabelColor,
    '--ikr-reply-text':        replyTextVar,

    // Grup 9 — Fotoğraf Galerisi
    '--ikr-photo-title':        photoTitle,
    '--ikr-photo-image-border': photoImageBorder,
    '--ikr-photo-arrow-bg':     photoArrowBg,
    '--ikr-photo-arrow-text':   photoArrowText,
    '--ikr-photo-arrow-border': photoArrowBorder,

    // Grup 10 — Form
    '--ikr-form-bg':          formBg,
    '--ikr-form-text':        formText,
    '--ikr-form-muted':       formMuted,
    '--ikr-input-bg-color':   inputBgVar,
    '--ikr-input-text-color': inputTextVar,
    '--ikr-input-border':     inputBorderVar,
    '--ikr-placeholder':      placeholderColor,
    '--ikr-fwizard-bg':       formBg,
    '--ikr-fwizard-text':     formText,
    '--ikr-fwizard-muted':    formMuted,
    '--ikr-fwizard-input-bg': inputBgVar,
    '--ikr-fwizard-input-text': inputTextVar,
    '--ikr-fwizard-input-border': inputBorderVar,
    '--ikr-fwizard-placeholder': placeholderColor,
    '--ikr-fwizard-close-text': formMuted,
    '--ikr-fwizard-close-hover-bg': formSubtleBg,
    '--ikr-fwizard-progress-bg': formSubtleBg,
    '--ikr-fwizard-progress-active': btnBg,

    // Grup 11 — Daha Fazla Göster
    '--ikr-load-more-bg':     loadMoreBg,
    '--ikr-load-more-text':   loadMoreText,
    '--ikr-load-more-border': loadMoreBorder,

    // Grup 12 — Modal
    '--ikr-modal-bg':           modalBg,
    '--ikr-modal-close-bg':     modalCloseBg,
    '--ikr-modal-close-text':   modalCloseText,
    '--ikr-modal-close-border': modalCloseBorder,
    '--ikr-modal-nav-bg':       modalNavBg,
    '--ikr-modal-nav-text':     modalNavText,
    '--ikr-modal-nav-border':   modalNavBorder,

    // Legacy (grup grup kaldırılacak)
    '--ikr-bg':         bg,
    '--ikr-surface':    bg,
    '--ikr-text':       text,
    '--ikr-text-faint': hexToRgba(text, 0.45),
    '--ikr-border':     hexToRgba(text, 0.12),
    '--ikr-track-bg':   hexToRgba(text, 0.22),
    '--ikr-reply-bg':   replyBg,
    '--ikr-input-bg':   inputBg,
    '--ikr-input-text': text,
  };

  Object.keys(vars).forEach(function(k) { root.style.setProperty(k, vars[k]); });

  if (typeof window !== 'undefined' && window.__ikasPreviewMode && document.body) {
    document.body.style.background = bg;
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

    var primaryColor = settings.primaryColor || '#111111';
    var primaryTextColor = settings.primaryTextColor || '#ffffff';

    injectStyles(primaryColor, CLASSIC_CSS + getLayoutsCSS() + getReviewLayoutsCSS());

    var radius = settings.borderRadius !== undefined ? settings.borderRadius : 8;

    // Boyut preset'inden değerleri oku
    var sz = SIZE_PRESETS[settings.size] || SIZE_PRESETS.medium;
    var thumbPx = THUMBNAIL_PRESETS[settings.thumbnailSize] || THUMBNAIL_PRESETS.medium;

    root.style.setProperty('--ikr-title-size', sz.titleSize + 'px');
    root.style.setProperty('--ikr-review-text-size', sz.reviewTextSize + 'px');
    root.style.setProperty('--ikr-review-title-size', sz.reviewTitleSize + 'px');
    root.style.setProperty('--ikr-author-size', sz.authorSize + 'px');
    root.style.setProperty('--ikr-reply-name-size', sz.replyNameSize + 'px');
    root.style.setProperty('--ikr-reply-text-size', sz.replyTextSize + 'px');
    root.style.setProperty('--ikr-color-text', primaryTextColor);
    root.style.setProperty('--ikr-radius', radius + 'px');
    root.style.setProperty('--ikr-radius-sm', Math.max(0, radius - 4) + 'px');
    root.style.setProperty('--ikr-photo-title-size', sz.photoTitleSize + 'px');
    root.style.setProperty('--ikr-avg-rating-size', sz.avgRatingSize + 'px');
    root.style.setProperty('--ikr-review-count-size', sz.reviewCountSize + 'px');
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

    // Review widget yıldız ayarları — badge'den bağımsız
    // 6-char veya 8-char hex (alpha dahil) kabul — react-colorful alpha slider uretebilir.
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
      Object.keys(ov).forEach(function(k) { root.style.setProperty(k, ov[k]); });
    }
    applyLayoutSizeOverrides(getLayout(settings.summaryLayout), settings.size);
    applyLayoutSizeOverrides(getReviewLayout(settings.reviewLayout), settings.size);

    // İkon + stil seçimine göre SVG çifti (filled/empty) al — ICONS registry'sinden
    var iconPair = getIconFromSettings(settings);

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

    container.innerHTML = '<p class="ikr-state-msg ikr-state-loading">Yorumlar yükleniyor...</p>';

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
          onFilterChange: async function(starVal) {
            setCurrentRatingFilter(currentRatingFilter === starVal ? null : starVal);
            setCurrentPage(1);
            var filtered = await fetchReviews(currentProductId, currentOrderBy, 1, currentRatingFilter, currentHasImages);
            await render(currentProductId, currentSettings, filtered, currentProductName, currentOrderBy, 1);
          },
          onSortChange: async function(orderBy, isPhotos) {
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
        emptyWriteBtn.textContent = 'Yorum Yap';
        emptyWriteBtn.onclick = toggleWriteAccordion;
        widget.appendChild(emptyWriteBtn);
      }


      // Accordion form — summary altı, yorum listesi üstü.
      // Sadece admin tercihi 'accordion' ise DOM'a ekle (Kusursuzluk/Performans).
      if (settings.reviewFormStyle !== 'modal') {
        var accordion = document.createElement('div');
        accordion.id = 'ikr-form-accordion';
        accordion.style.cssText = 'overflow:hidden;max-height:0px;opacity:0;transition:max-height 0.35s ease,opacity 0.25s ease;';
        accordion.appendChild(buildReviewForm(productId, productName));
        widget.appendChild(accordion);
      }

      // Fotoğraflı Yorumlar bölümü — sadece filtre aktif değilken göster
      var allReviewsWithPhotos = reviews.filter(function(r) {
        return r.images && Array.isArray(r.images) && r.images.some(function(u) { return u && (u.indexOf('https://') === 0 || u.indexOf('data:image/') === 0); });
      });
      if (settings.showPhotoGallery !== false && !currentHasImages && allReviewsWithPhotos.length > 0) {
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

        var thumbCount = 0;
        allReviewsWithPhotos.forEach(function(r) {
          if (thumbCount >= 10) return;
          var firstImg = r.images.find(function(u) { return u && (u.indexOf('https://') === 0 || u.indexOf('data:image/') === 0); });
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
        empty.className = 'ikr-state-msg';
        empty.textContent = 'Henüz yorum yok.';
        widget.appendChild(empty);
      } else {
        var reviewLayout = getReviewLayout(settings.reviewLayout);
        reviews.forEach(function(r) { widget.appendChild(reviewLayout.render(r, reviews)); });
      }

      // Daha Fazla butonu
      var hasMore = data.data && data.data.hasMore;
      if (hasMore) {
        var loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'ikr-load-more';
        loadMoreBtn.textContent = 'Daha Fazla Göster';
        loadMoreBtn.onclick = async function() {
          loadMoreBtn.disabled = true;
          loadMoreBtn.textContent = 'Yükleniyor...';
          var nextPage = currentPage + 1;
          var moreData = await fetchReviews(currentProductId, currentOrderBy, nextPage, currentRatingFilter, currentHasImages);
          if (moreData && moreData.data && moreData.data.reviews) {
            setCurrentPage(nextPage);
            var moreReviewLayout = getReviewLayout(currentSettings.reviewLayout);
            moreData.data.reviews.forEach(function(r) {
              widget.insertBefore(moreReviewLayout.render(r, moreData.data.reviews), loadMoreBtn);
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
