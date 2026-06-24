// reviews-section/render/theme-vars.js — admin color settings -> CSS variables.
//
// Maps the merchant's admin color settings onto --renuvex-pr-* CSS custom
// properties on document.documentElement. The variables inherit across the
// review section's shadow boundary, so setting them on :root still reaches the
// shadow-isolated review content. Each UI element reads its own specific
// variable; there are no generic theme tokens. Pure function — no DOM build, no
// render() call.

// Yardimci: hex -> rgba string (alpha verilerek). Structural translucency
// (hover bg, border, track) turevleri icin kullanilir.
// 6-char (#rrggbb) ve 8-char (#rrggbbaa) hex destekler.
export function hexToRgba(hex, alpha) {
  var m = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(hex);
  if (!m) return 'rgba(0,0,0,' + alpha + ')';
  var r = parseInt(m[1], 16), g = parseInt(m[2], 16), b = parseInt(m[3], 16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
}

function parseHexRgb(hex) {
  var m = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})?$/.exec(hex || '');
  if (!m) return null;
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

function channelToLinear(value) {
  var normalized = value / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : Math.pow((normalized + 0.055) / 1.055, 2.4);
}

function relativeLuminance(rgb) {
  return (0.2126 * channelToLinear(rgb.r)) +
    (0.7152 * channelToLinear(rgb.g)) +
    (0.0722 * channelToLinear(rgb.b));
}

function contrastRatio(a, b) {
  var l1 = relativeLuminance(a);
  var l2 = relativeLuminance(b);
  var light = Math.max(l1, l2);
  var dark = Math.min(l1, l2);
  return (light + 0.05) / (dark + 0.05);
}

export function getReadableControlColor(backgroundHex) {
  var bg = parseHexRgb(backgroundHex) || parseHexRgb('#ffffff');
  var dark = parseHexRgb('#111111');
  var light = parseHexRgb('#ffffff');
  return contrastRatio(dark, bg) >= contrastRatio(light, bg) ? '#111111' : '#ffffff';
}

export function getControlHoverBackground(controlColor) {
  return hexToRgba(controlColor, controlColor === '#ffffff' ? 0.1 : 0.06);
}

export function applyManualTheme(root, settings) {
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
  var stateTextColor = hexToRgba(reviewBodyColor, 0.65);

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

  // Group 10 - Review lightbox video player
  // These tokens are scoped to the product review lightbox only. Admin
  // moderation and future story/carousel players keep separate contracts.
  var reviewLightboxVideoIcon = settings.reviewLightboxVideoIconColor || '#ffffff';
  var reviewLightboxVideoProgress = settings.reviewLightboxVideoProgressColor || '#ffffff';
  var reviewLightboxVideoProgressTrack = settings.reviewLightboxVideoProgressTrackColor || '#000000';

  // Group 11 - Review form
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
  var formCloseText = getReadableControlColor(formBg);
  var formCloseHoverBg = getControlHoverBackground(formCloseText);

  // Grup 12 — Daha Fazla Göster
  var loadMoreBg = settings.loadMoreBgColor || '#ffffff';
  var loadMoreText = settings.loadMoreTextColor || '#111111';
  var loadMoreBorder = settings.loadMoreBorderColor || '#111111';

  // Grup 13 — Sayfalama (numbered). Pasif butonlar (bg/numara/kenarlık) + aktif sayfanın
  // BAĞIMSIZ renkleri (aktif bg + aktif numara). Numara Rengi yalnız pasif numaraları,
  // Aktif Numara Rengi yalnız aktif sayfayı etkiler — otomatik türetme yok.
  // Fallback'ler widgetDefs default'larıyla eşit olmalı.
  var paginationBg = settings.paginationBgColor || '#ffffff';
  var paginationText = settings.paginationTextColor || '#111111';
  var paginationBorder = settings.paginationBorderColor || '#e5e7eb';
  var paginationActiveBg = settings.paginationActiveBgColor || '#111111';
  var paginationActiveText = settings.paginationActiveTextColor || '#ffffff';

  var vars = {
    // Grup 1 — Genel
    '--renuvex-pr-widget-bg': '#ffffff00',
    '--renuvex-pr-widget-border': '#ffffff00',

    // Grup 2 — Başlık & Özet
    '--renuvex-pr-header-title': headerTitle,
    '--renuvex-pr-header-avg': headerAvg,
    '--renuvex-pr-header-count': headerCount,
    '--renuvex-pr-header-recommend': headerRecommend,

    // Grup 3 — Puan Dağılımı
    '--renuvex-pr-bar-fill': barFill,
    '--renuvex-pr-bar-track': barTrack,
    '--renuvex-pr-bar-count': barCount,
    '--renuvex-pr-bar-hover-bg': barHoverBg,

    // Grup 4 — Butonlar
    '--renuvex-pr-btn-bg': btnBg,
    '--renuvex-pr-btn-text': btnText,
    '--renuvex-pr-btn-border': btnBorder,
    '--renuvex-pr-filter-btn-bg': filterBg,
    '--renuvex-pr-filter-btn-text': filterText,
    '--renuvex-pr-filter-btn-border': filterBorder,

    // Grup 5 — Filtre Menüsü
    '--renuvex-pr-filter-menu-bg': filterMenuBg,
    '--renuvex-pr-filter-menu-border': filterMenuBorder,
    '--renuvex-pr-filter-item-text': filterItemText,
    '--renuvex-pr-filter-item-hover-bg': filterItemHoverBg,
    '--renuvex-pr-filter-item-active': filterItemActive,

    // Grup 6 — Yorum Kartı
    '--renuvex-pr-review-title': reviewTitleColor,
    '--renuvex-pr-review-author': reviewAuthorColor,
    '--renuvex-pr-review-date': reviewDateColor,
    '--renuvex-pr-review-body': reviewBodyColor,
    '--renuvex-pr-review-border': reviewBorderColor,
    '--renuvex-pr-state-text': stateTextColor,
    '--renuvex-pr-review-star-color': reviewStarColor,

    // Grup 7 — Mağaza Yanıtı
    '--renuvex-pr-reply-bg-color': replyBgVar,
    '--renuvex-pr-reply-border': replyBorderVar,
    '--renuvex-pr-reply-label': replyLabelColor,
    '--renuvex-pr-reply-text': replyTextVar,

    // Grup 9 — Fotoğraf Galerisi
    '--renuvex-pr-photo-title': photoTitle,
    '--renuvex-pr-photo-image-border': photoImageBorder,
    '--renuvex-pr-photo-arrow-bg': photoArrowBg,
    '--renuvex-pr-photo-arrow-text': photoArrowText,
    '--renuvex-pr-photo-arrow-border': photoArrowBorder,

    // Grup 10 — Review lightbox video player
    '--renuvex-pr-review-lightbox-video-icon': reviewLightboxVideoIcon,
    '--renuvex-pr-review-lightbox-video-progress': reviewLightboxVideoProgress,
    '--renuvex-pr-review-lightbox-video-progress-track': reviewLightboxVideoProgressTrack,

    // Grup 11 — Form wizard
    '--renuvex-pr-fwizard-bg': formBg,
    '--renuvex-pr-fwizard-text': formPrimary,
    '--renuvex-pr-fwizard-secondary-text': formSecondary,
    '--renuvex-pr-fwizard-input-bg': formBg,
    '--renuvex-pr-fwizard-input-text': inputTextVar,
    '--renuvex-pr-fwizard-input-border': inputBorderVar,
    '--renuvex-pr-fwizard-placeholder': placeholderColor,
    '--renuvex-pr-fwizard-close-text': formCloseText,
    '--renuvex-pr-fwizard-close-hover-bg': formCloseHoverBg,
    '--renuvex-pr-fwizard-progress-bg': formSubtleBg,
    '--renuvex-pr-fwizard-progress-active': formStepBarColor,
    '--renuvex-pr-fwizard-btn-bg': formBtnBg,
    '--renuvex-pr-fwizard-btn-text': formBtnText,
    '--renuvex-pr-fwizard-btn-border': formBtnBorder,
    '--renuvex-pr-fwizard-btn-disabled-bg': formBtnDisabledBg,
    '--renuvex-pr-fwizard-btn-disabled-text': formBtnDisabledText,
    '--renuvex-pr-fwizard-nav-hover-bg': formNavHoverBg,

    // Grup 12 — Daha Fazla Göster
    '--renuvex-pr-load-more-bg': loadMoreBg,
    '--renuvex-pr-load-more-text': loadMoreText,
    '--renuvex-pr-load-more-border': loadMoreBorder,

    // Grup 13 — Sayfalama
    '--renuvex-pr-pagination-bg': paginationBg,
    '--renuvex-pr-pagination-text': paginationText,
    '--renuvex-pr-pagination-border': paginationBorder,
    '--renuvex-pr-pagination-active-bg': paginationActiveBg,
    '--renuvex-pr-pagination-active-text': paginationActiveText,
  };

  Object.keys(vars).forEach(function (k) { root.style.setProperty(k, vars[k]); });

  if (typeof window !== 'undefined' && window.__ikasPreviewMode && document.body) {
    document.body.style.background = 'transparent';
    document.documentElement.style.background = 'transparent';
  }
}
