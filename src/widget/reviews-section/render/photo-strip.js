// reviews-section/render/photo-strip.js — photo strip section builder.
//
// Builds the "Fotoğraflı Yorumlar" horizontal photo strip shown above the review
// list. The dataset (state.photoStripReviews) is filled once in bootstrap with
// `hasImages=true&limit=15&orderBy=newest`; it is independent of sort/filter/
// load-more and only refreshes after the cache TTL (Strateji A — newest-first
// rotation; ADR_0007: fixed 15 cap, no admin setting).
//
// Pure builder: returns the photoSection element, or null when the strip should
// not render (gallery off, photo filter active, or no photo reviews). It does
// NOT call render(); openReviewModal + wireLightboxTrigger are injected by the
// caller (render.js) to keep this module free of a render<->modal cycle.

import {
  getFirstTrustedReviewImage,
  getTrustedReviewImages,
  PHOTO_STRIP_THUMB_WIDTH,
  buildResponsiveImgAttrs,
  hideOnImageError,
  settingText,
} from '../../core/helpers.js';
import { iconUseNode } from '../../icons/star-sprite.js';
import { UI_CARET_LEFT, UI_CARET_RIGHT } from '../../icons/index.js';

// opts: { settings, root, currentHasImages, openReviewModal, wireLightboxTrigger }
export function buildPhotoStrip(opts) {
  var settings = opts.settings;
  var root = opts.root;
  var currentHasImages = opts.currentHasImages;
  var openReviewModal = opts.openReviewModal;
  var wireLightboxTrigger = opts.wireLightboxTrigger;

  var stripReviews = (opts.photoStripReviews || []).filter(function (r) {
    return getTrustedReviewImages(r).length > 0;
  });
  if (!(settings.showPhotoGallery !== false && !currentHasImages && stripReviews.length > 0)) {
    return null;
  }

  var photoSection = document.createElement('div');
  photoSection.className = 'renuvex-pr-photo-section';

  // Strip üstündeki başlık — admin paneldeki "Genel → Görsel Galeri Başlığı"
  // ile özelleştirilebilir; toggle (showPhotoGalleryTitle) kapalıysa hiç render edilmez.
  // Boyut --renuvex-pr-photo-title-size, renk --renuvex-pr-photo-title CSS variable üzerinden.
  if (settings.showPhotoGalleryTitle !== false) {
    var photoTitleText = settingText(settings.photoGalleryTitle, 'Fotoğraflı Yorumlar');
    var photoTitle = document.createElement('div');
    photoTitle.className = 'renuvex-pr-photo-title';
    photoTitle.textContent = photoTitleText;
    photoSection.appendChild(photoTitle);
  }

  // Thumbnail aspect ratio review layout'a göre otomatik:
  // card review fotoları 1:1 → strip de kare; list/gallery review fotoları
  // 3:4 portre → strip de portre. Tutarlı görsel akış.
  var thumbAspect = settings.reviewLayout === 'card' ? '1/1' : '3/4';
  root.style.setProperty('--renuvex-pr-photo-thumb-aspect', thumbAspect);

  var photoStrip = document.createElement('div');
  photoStrip.className = 'renuvex-pr-photo-strip';

  // Backend cap=15 garantili; defansif iç sınır da 15.
  // `<img>` width/height attribute'ları CSS `--renuvex-pr-photo-thumb-aspect` ile uyumlu
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
    thumb.className = 'renuvex-pr-photo-strip-thumb';
    thumb.alt = 'Yorum fotoğrafı';
    hideOnImageError(thumb);
    // Lightbox navigasyonu strip dataset'i içinde gezer — load-more sonrası
    // ana liste değişse bile lightbox tutarlı kalır (K1.b çözümü).
    (function (url, review) {
      wireLightboxTrigger(thumb, function () { openReviewModal(review, url, stripReviews); });
    })(firstImg, r);
    photoStrip.appendChild(thumb);
    thumbCount++;
  });

  // Desktop ok butonları
  var prevArrow = document.createElement('button');
  prevArrow.className = 'renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-prev';
  var prevArrowIcon = iconUseNode(UI_CARET_LEFT);
  if (prevArrowIcon) prevArrow.appendChild(prevArrowIcon);
  prevArrow.setAttribute('aria-label', 'Önceki');
  prevArrow.onclick = function () { photoStrip.scrollBy({ left: -200, behavior: 'smooth' }); };

  var nextArrow = document.createElement('button');
  nextArrow.className = 'renuvex-pr-photo-strip-arrow renuvex-pr-photo-strip-arrow-next';
  var nextArrowIcon = iconUseNode(UI_CARET_RIGHT);
  if (nextArrowIcon) nextArrow.appendChild(nextArrowIcon);
  nextArrow.setAttribute('aria-label', 'Sonraki');
  nextArrow.onclick = function () { photoStrip.scrollBy({ left: 200, behavior: 'smooth' }); };

  var stripWrap = document.createElement('div');
  stripWrap.className = 'renuvex-pr-photo-strip-wrap';
  stripWrap.appendChild(prevArrow);
  stripWrap.appendChild(photoStrip);
  stripWrap.appendChild(nextArrow);
  photoSection.appendChild(stripWrap);

  return photoSection;
}
