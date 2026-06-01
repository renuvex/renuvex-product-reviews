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

export var THUMBNAIL_PRESETS = { small: 80, medium: 110, large: 140 };
