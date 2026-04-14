// product-widget/render.js — Ana widget render fonksiyonu

import { injectStyles, optimizeImageUrl } from '../core/helpers.js';
import { fetchReviews } from './bootstrap.js';
import { buildReviewEl } from './review-item.js';
import { openReviewModal } from './review-modal.js';
import { buildReviewForm } from './review-form.js';
import { injectRatingBadge } from './rating-badge.js';
import { CLASSIC_CSS } from '../themes/ozy/styles.js';
import { getIconFromSettings } from '../icons.js';
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
function hexToRgba(hex, alpha) {
  var m = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/.exec(hex);
  if (!m) return 'rgba(0,0,0,' + alpha + ')';
  var r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

// ─── Boyut Preset'leri ─────────────────────────────────────────────────────
// Küçük / Orta / Büyük — tüm font ve ikon boyutlarını tek seçimle belirler.
// Thumbnail boyutu ayrı preset (thumbnailSize).

var SIZE_PRESETS = {
  small: {
    titleSize: 20, reviewTextSize: 12, reviewTitleSize: 12, authorSize: 12,
    replyNameSize: 12, replyTextSize: 12, photoTitleSize: 14,
    avgRatingSize: 36, avgStarSize: 48, reviewCountSize: 14, recommendSize: 12,
    btnTextSize: 12, barLabelSize: 18, barCountSize: 12,
    reviewDateSize: 10, filterTextSize: 12, loadMoreSize: 12,
    readMoreSize: 10, helpfulSize: 10, reviewStarSize: 18,
  },
  medium: {
    titleSize: 24, reviewTextSize: 14, reviewTitleSize: 14, authorSize: 14,
    replyNameSize: 14, replyTextSize: 14, photoTitleSize: 16,
    avgRatingSize: 46, avgStarSize: 58, reviewCountSize: 16, recommendSize: 14,
    btnTextSize: 14, barLabelSize: 22, barCountSize: 14,
    reviewDateSize: 12, filterTextSize: 14, loadMoreSize: 14,
    readMoreSize: 12, helpfulSize: 12, reviewStarSize: 22,
  },
  large: {
    titleSize: 28, reviewTextSize: 16, reviewTitleSize: 16, authorSize: 16,
    replyNameSize: 16, replyTextSize: 16, photoTitleSize: 18,
    avgRatingSize: 56, avgStarSize: 68, reviewCountSize: 18, recommendSize: 16,
    btnTextSize: 16, barLabelSize: 26, barCountSize: 16,
    reviewDateSize: 14, filterTextSize: 16, loadMoreSize: 16,
    readMoreSize: 14, helpfulSize: 14, reviewStarSize: 26,
  },
};

var THUMBNAIL_PRESETS = { small: 60, medium: 90, large: 120 };

function applyManualTheme(root, settings) {
  var bg = settings.bgColor || '#ffffff';
  var text = settings.textColor || '#111111';
  var replyBg = settings.replyBgColor || '#f3f4f6';
  var inputBg = settings.inputBgColor || '#ffffff';

  // Grup 1 — Genel
  var widgetBg      = settings.widgetBgColor     || bg;
  var widgetBorder  = settings.widgetBorderColor || 'transparent';
  var separator     = settings.separatorColor    || hexToRgba(text, 0.08);

  // Grup 2 — Başlık & Özet
  var headerTitle     = settings.headerTitleColor     || text;
  var headerAvg       = settings.headerAvgColor       || text;
  var headerCount     = settings.headerCountColor     || text;
  var headerRecommend = settings.headerRecommendColor || text;

  // Grup 3 — Bar Chart
  var barLabel  = settings.barLabelColor  || text;
  var barFill   = settings.barFillColor   || text;
  var barTrack  = settings.barTrackColor  || hexToRgba(text, 0.10);
  var barCount  = settings.barCountColor  || text;
  var barHoverBg = settings.barHoverBgColor || hexToRgba(text, 0.05);

  // Grup 4 — Butonlar
  var primary      = settings.primaryColor     || '#111111';
  var primaryText  = settings.primaryTextColor || '#ffffff';
  var btnBg        = settings.btnBgColor        || primary;
  var btnText      = settings.btnTextColor      || primaryText;
  var btnBorder    = settings.btnBorderColor    || primary;
  var filterBg     = settings.filterBtnBgColor     || primary;
  var filterText   = settings.filterBtnTextColor   || primaryText;
  var filterBorder = settings.filterBtnBorderColor || primary;

  // Grup 5 — Filtre Menüsü
  var filterMenuBg      = settings.filterMenuBgColor      || bg;
  var filterMenuBorder  = settings.filterMenuBorderColor  || hexToRgba(text, 0.12);
  var filterItemText    = settings.filterItemTextColor    || text;
  var filterItemHoverBg = settings.filterItemHoverBgColor || hexToRgba(primary, 0.07);
  var filterItemActive  = settings.filterItemActiveColor  || primary;

  // Grup 6 — Yorum Kartı
  var reviewTitleColor = settings.reviewTitleColor || text;
  var reviewAuthorColor = settings.reviewAuthorColor || text;
  var reviewDateColor  = settings.reviewDateColor  || text;
  var reviewBodyColor  = settings.reviewBodyColor  || text;
  var reviewBorderColor = settings.reviewBorderColor || hexToRgba(text, 0.08);
  var reviewStarColor  = settings.reviewStarColor  || '#f59e0b';

  // Grup 7 — Mağaza Yanıtı
  var replyBgVar      = settings.replyBgColor      || replyBg;
  var replyBorderVar  = settings.replyBorderColor  || primary;
  var replyLabelColor = settings.replyLabelColor   || text;
  var replyTextVar    = settings.replyTextColor    || text;

  // Grup 8 — Faydalı Butonu
  var helpfulColor      = settings.helpfulColor      || hexToRgba(text, 0.45);
  var helpfulActiveColor = settings.helpfulActiveColor || primary;

  // Grup 9 — Fotoğraf Galerisi
  var photoBg     = settings.photoBgColor     || hexToRgba(text, 0.03);
  var photoBorder = settings.photoBorderColor || hexToRgba(text, 0.10);
  var photoTitle  = settings.photoTitleColor  || text;

  // Grup 10 — Form
  var formBg      = settings.formBgColor    || bg;
  var formBorder  = settings.formBorderColor || hexToRgba(text, 0.08);
  var inputBgVar  = settings.inputBgColor   || inputBg;
  var inputTextVar = settings.inputTextColor || text;
  var inputBorderVar = settings.inputBorderColor || hexToRgba(text, 0.20);
  var placeholderColor = settings.placeholderColor || hexToRgba(text, 0.35);

  // Grup 11 — Daha Fazla Göster
  var loadMoreBg     = settings.loadMoreBgColor     || bg;
  var loadMoreText   = settings.loadMoreTextColor   || text;
  var loadMoreBorder = settings.loadMoreBorderColor || hexToRgba(text, 0.30);

  // Grup 12 — Modal
  var modalBg          = settings.modalBgColor          || bg;
  var modalText        = settings.modalTextColor        || text;
  var modalCloseBg     = settings.modalCloseBgColor     || primary;
  var modalCloseText   = settings.modalCloseTextColor   || primaryText;
  var modalCloseBorder = settings.modalCloseBorderColor || primary;
  var modalNavBg       = settings.modalNavBgColor       || 'rgba(0,0,0,0.45)';
  var modalNavText     = settings.modalNavTextColor     || '#ffffff';
  var modalReplyBg     = settings.modalReplyBgColor     || replyBg;
  var modalReplyBorder = settings.modalReplyBorderColor || primary;

  var vars = {
    // Grup 1 — Genel
    '--ikr-widget-bg':     widgetBg,
    '--ikr-widget-border': widgetBorder,
    '--ikr-separator':     separator,

    // Grup 2 — Başlık & Özet
    '--ikr-header-title':     headerTitle,
    '--ikr-header-avg':       headerAvg,
    '--ikr-header-count':     headerCount,
    '--ikr-header-recommend': headerRecommend,

    // Grup 3 — Bar Chart
    '--ikr-bar-label':    barLabel,
    '--ikr-bar-fill':     barFill,
    '--ikr-bar-track':    barTrack,
    '--ikr-bar-count':    barCount,
    '--ikr-bar-hover-bg': barHoverBg,

    // Grup 4 — Butonlar
    '--ikr-btn-bg':           btnBg,
    '--ikr-btn-text':         btnText,
    '--ikr-btn-border':       btnBorder,
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

    // Grup 8 — Faydalı Butonu
    '--ikr-helpful-color':        helpfulColor,
    '--ikr-helpful-active-color': helpfulActiveColor,

    // Grup 9 — Fotoğraf Galerisi
    '--ikr-photo-bg':     photoBg,
    '--ikr-photo-border': photoBorder,
    '--ikr-photo-title':  photoTitle,

    // Grup 10 — Form
    '--ikr-form-bg':          formBg,
    '--ikr-form-border':      formBorder,
    '--ikr-input-bg-color':   inputBgVar,
    '--ikr-input-text-color': inputTextVar,
    '--ikr-input-border':     inputBorderVar,
    '--ikr-placeholder':      placeholderColor,

    // Grup 11 — Daha Fazla Göster
    '--ikr-load-more-bg':     loadMoreBg,
    '--ikr-load-more-text':   loadMoreText,
    '--ikr-load-more-border': loadMoreBorder,

    // Grup 12 — Modal
    '--ikr-modal-bg':           modalBg,
    '--ikr-modal-text':         modalText,
    '--ikr-modal-close-bg':     modalCloseBg,
    '--ikr-modal-close-text':   modalCloseText,
    '--ikr-modal-close-border': modalCloseBorder,
    '--ikr-modal-nav-bg':       modalNavBg,
    '--ikr-modal-nav-text':     modalNavText,
    '--ikr-modal-reply-bg':     modalReplyBg,
    '--ikr-modal-reply-border': modalReplyBorder,

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
    // Başlık ayarı: Eğer kullanıcı boş bıraktıysa null/empty olur,
    // varsayılan değeri veriyoruz ama boşsa hiç HTML oluşturmayacağız.
    var title = settings.title !== undefined ? settings.title : 'Müşteri Yorumları';

    var root = document.documentElement;

    applyManualTheme(root, settings);

    var primaryColor = settings.primaryColor || '#111111';
    var primaryTextColor = settings.primaryTextColor || '#ffffff';

    injectStyles(primaryColor, CLASSIC_CSS);

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
    root.style.setProperty('--ikr-bar-count-size', sz.barCountSize + 'px');
    root.style.setProperty('--ikr-review-date-size', sz.reviewDateSize + 'px');
    root.style.setProperty('--ikr-filter-text-size', sz.filterTextSize + 'px');
    root.style.setProperty('--ikr-load-more-size', sz.loadMoreSize + 'px');
    root.style.setProperty('--ikr-read-more-size', sz.readMoreSize + 'px');
    root.style.setProperty('--ikr-helpful-size', sz.helpfulSize + 'px');
    root.style.setProperty('--ikr-thumbnail-size', thumbPx + 'px');

    // Review widget yıldız ayarları — badge'den bağımsız
    var reviewStarColor = /^#[0-9A-Fa-f]{6}$/.test(settings.reviewStarColor || '') ? settings.reviewStarColor : '#f59e0b';
    root.style.setProperty('--ikr-review-star-color', reviewStarColor);
    root.style.setProperty('--ikr-star-size', sz.reviewStarSize + 'px');
    root.style.setProperty('--ikr-avg-star-size', sz.avgStarSize + 'px');
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
      if (title) {
        var h2 = document.createElement('div');
        h2.className = 'ikr-title';
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
        var summary = document.createElement('div');
        summary.className = 'ikr-summary';

        var recommendCount = (ratingCounts[3] || 0) + (ratingCounts[4] || 0);
        var recommendPct = allCount > 0 ? Math.round((recommendCount / allCount) * 100) : 0;

        // Blok: Ortalama puan
        var avgBlock = document.createElement('div');
        avgBlock.className = 'ikr-summary-block ikr-summary-avg';
        avgBlock.innerHTML =
          '<span class="ikr-avg-star ikr-icon">' + iconPair.filled + '</span>' +
          '<span class="ikr-avg-num">' + avgRatingVal + '</span>';
        summary.appendChild(avgBlock);

        // Blok: Toplam yorum sayısı
        var countBlock = document.createElement('div');
        countBlock.className = 'ikr-summary-block ikr-summary-count';
        countBlock.textContent = allCount.toLocaleString('tr-TR') + ' Yorum';
        summary.appendChild(countBlock);

        // Blok: Tavsiye yüzdesi (Ayar açıksa ve tavsiye varsa göster)
        if ((settings.showRecommendation !== false) && recommendPct > 0) {
          var recBlock = document.createElement('div');
          recBlock.className = 'ikr-summary-block ikr-summary-recommend';
          recBlock.innerHTML = '<span class="ikr-recommend-pct">%' + recommendPct + '</span> bu ürünü tavsiye ediyor';
          summary.appendChild(recBlock);
        }

        // Blok: Bar chart
        var barsBlock = document.createElement('div');
        barsBlock.className = 'ikr-summary-block ikr-summary-bars';
        for (var si = 5; si >= 1; si--) {
          var cnt = ratingCounts[si - 1];
          var pct = allCount > 0 ? Math.round((cnt / allCount) * 100) : 0;
          var isActive = currentRatingFilter === si;
          var row = document.createElement('div');
          row.className = 'ikr-bar-row' + (isActive ? ' ikr-bar-active' : '');
          if (currentRatingFilter && !isActive) row.style.opacity = '0.35';
          var starsHtml = '';
          for (var s = 1; s <= 5; s++) {
            starsHtml += '<span class="ikr-bar-star ikr-icon ' + (s <= si ? 'ikr-bar-star-filled' : 'ikr-bar-star-empty') + '">' + (s <= si ? iconPair.filled : iconPair.empty) + '</span>';
          }
          row.innerHTML =
            '<span class="ikr-bar-label">' + starsHtml + '</span>' +
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
          barsBlock.appendChild(row);
        }
        summary.appendChild(barsBlock);

        // Blok: Aksiyon satırı (Yorum Yap + filtre) — bar row ile hizalı
        var actionsBlock = document.createElement('div');
        actionsBlock.className = 'ikr-summary-block ikr-summary-actions';

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
        actionsBlock.appendChild(writeBtn);

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
        actionsBlock.appendChild(filterWrap);
        summary.appendChild(actionsBlock);
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
        return r.images && Array.isArray(r.images) && r.images.some(function(u) { return u && (u.indexOf('https://') === 0 || u.indexOf('data:image/') === 0); });
      });
      if (settings.showPhotoGallery !== false && !currentHasImages && allReviewsWithPhotos.length > 0) {
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
        reviews.forEach(function(r) { widget.appendChild(buildReviewEl(r, reviews, currentSettings && currentSettings.showHelpful !== false)); });
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
