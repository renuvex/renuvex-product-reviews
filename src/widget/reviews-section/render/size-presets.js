// reviews-section/render/size-presets.js — Boyut preset tabloları.
//
// Küçük / Orta / Büyük — tüm font ve ikon boyutlarını tek seçimle belirler.
// Thumbnail boyutu ayrı preset (thumbnailSize). render.js bu tabloları okuyup
// --renuvex-pr-* CSS değişkenlerine yazar; layout meta.sizeOverrides bunların
// üzerine yazabilir.

export var SIZE_PRESETS = {
  small: {
    titleSize: 20, reviewTextSize: 12, reviewTitleSize: 14, authorSize: 12,
    replyNameSize: 12, replyTextSize: 12, photoTitleSize: 14,
    avgRatingSize: 36, avgStarSize: 48, reviewCountSize: 16, recommendSize: 12,
    compactCountSize: 14,
    btnTextSize: 12, barLabelSize: 18, barCountSize: 12,
    reviewDateSize: 10, filterTextSize: 12, loadMoreSize: 12,
    loadMoreMinHeight: 32, loadMorePadY: 7, loadMorePadX: 20,
    loadMoreMobileMinHeight: 36, loadMoreHitTarget: 44,
    paginationButtonSize: 32, paginationPadX: 7, paginationGap: 4,
    paginationMarginTop: 16, paginationGapMin: 18,
    paginationMobileButtonSize: 34, paginationMobileFontSize: 12,
    paginationMobileGap: 0, paginationMobileMarginTop: 14,
    paginationMobileGapMin: 14, paginationHitTarget: 44,
    readMoreSize: 10, reviewStarSize: 18,
    minimalAvgSize: 18,
    heroAvgSize: 74,
    minimalCountSize: 14, heroCountSize: 14,
  },
  medium: {
    titleSize: 24, reviewTextSize: 14, reviewTitleSize: 16, authorSize: 14,
    replyNameSize: 13, replyTextSize: 13, photoTitleSize: 16,
    avgRatingSize: 46, avgStarSize: 58, reviewCountSize: 20, recommendSize: 14,
    compactCountSize: 16,
    btnTextSize: 14, barLabelSize: 22, barCountSize: 14,
    reviewDateSize: 12, filterTextSize: 14, loadMoreSize: 13,
    loadMoreMinHeight: 36, loadMorePadY: 8, loadMorePadX: 24,
    loadMoreMobileMinHeight: 38, loadMoreHitTarget: 44,
    paginationButtonSize: 36, paginationPadX: 8, paginationGap: 5,
    paginationMarginTop: 18, paginationGapMin: 20,
    paginationMobileButtonSize: 36, paginationMobileFontSize: 13,
    paginationMobileGap: 2, paginationMobileMarginTop: 16,
    paginationMobileGapMin: 16, paginationHitTarget: 44,
    readMoreSize: 12, reviewStarSize: 22,
    minimalAvgSize: 22,
    heroAvgSize: 90,
    minimalCountSize: 16, heroCountSize: 16,
  },
  large: {
    titleSize: 28, reviewTextSize: 16, reviewTitleSize: 18, authorSize: 16,
    replyNameSize: 15, replyTextSize: 15, photoTitleSize: 18,
    avgRatingSize: 56, avgStarSize: 68, reviewCountSize: 22, recommendSize: 16,
    compactCountSize: 18,
    btnTextSize: 16, barLabelSize: 26, barCountSize: 16,
    reviewDateSize: 14, filterTextSize: 16, loadMoreSize: 14,
    loadMoreMinHeight: 40, loadMorePadY: 9, loadMorePadX: 28,
    loadMoreMobileMinHeight: 40, loadMoreHitTarget: 44,
    paginationButtonSize: 40, paginationPadX: 10, paginationGap: 6,
    paginationMarginTop: 20, paginationGapMin: 22,
    paginationMobileButtonSize: 40, paginationMobileFontSize: 14,
    paginationMobileGap: 2, paginationMobileMarginTop: 18,
    paginationMobileGapMin: 18, paginationHitTarget: 44,
    readMoreSize: 14, reviewStarSize: 26,
    minimalAvgSize: 26,
    heroAvgSize: 106,
    minimalCountSize: 18, heroCountSize: 18,
  },
};

export var THUMBNAIL_PRESETS = { small: 80, medium: 110, large: 140 };

// Mobil photo strip thumbnail — YALNIZ list/gallery (3:4 portre) için. Bu layout'ların
// yorum-içi görseli mobilde küçülüyor (review-layouts/*/index.js -mobile sizeOverrides:
// small 80 / medium 100 / large 110); photo strip de aynı değere insin ki mobilde
// strip ile yorum-içi görsel EŞİT olsun. card (1:1) item'ı mobilde küçülmez → bu
// tabloyu kullanmaz, masaüstü THUMBNAIL_PRESETS değeriyle sabit kalır.
export var THUMBNAIL_PRESETS_MOBILE = { small: 80, medium: 100, large: 110 };
