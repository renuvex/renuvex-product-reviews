// reviews-section/render/media-gallery.js — media gallery section builder.
//
// Builds the "Müşteri Görselleri" horizontal media gallery shown above the review
// list. The dataset is filled once in bootstrap with `hasMedia=true` so
// approved videos remain visible even when new video uploads are disabled. It is
// independent of sort/filter/load-more and only refreshes after the cache TTL
// (Strateji A — newest-first rotation; ADR_0007: fixed 15 cap, no admin setting).
// Pure builder: returns the media gallery element, or null when the gallery should
// not render (gallery off, media/photo filter active, or no media reviews). It does NOT
// call render(); openReviewModal + wireLightboxTrigger are injected by the caller.

import { REVIEW_MEDIA_THUMB_WIDTH, settingText } from '../../core/helpers.js';
import { getFirstTrustedReviewMedia, getTrustedReviewMedia } from '../../core/review-media.js';
import { iconUseNode } from '../../icons/star-sprite.js';
import { UI_CARET_LEFT, UI_CARET_RIGHT } from '../../icons/index.js';
import { createMediaThumbnail } from '../media-thumbnail.js';

export function buildMediaGalleryPlaceholder(opts) {
  var settings = opts.settings || {};
  var root = opts.root;
  var currentMediaFilter = opts.currentMediaFilter || 'none';
  if (!(settings.showMediaGallery !== false && currentMediaFilter === 'none')) return null;

  var gallerySection = document.createElement('div');
  gallerySection.className = 'renuvex-pr-media-gallery-section renuvex-pr-media-gallery-section--placeholder';
  gallerySection.setAttribute('aria-hidden', 'true');

  var thumbAspect = settings.reviewLayout === 'card' ? '1/1' : '3/4';
  if (root) root.style.setProperty('--renuvex-pr-media-gallery-thumb-aspect', thumbAspect);

  if (settings.showMediaGalleryTitle !== false) {
    var galleryTitle = document.createElement('div');
    galleryTitle.className = 'renuvex-pr-media-gallery-title';
    galleryTitle.textContent = settingText(settings.mediaGalleryTitle, 'M\u00fc\u015fteri G\u00f6rselleri');
    gallerySection.appendChild(galleryTitle);
  }

  var stripWrap = document.createElement('div');
  stripWrap.className = 'renuvex-pr-media-gallery-strip-wrap';
  var mediaStrip = document.createElement('div');
  mediaStrip.className = 'renuvex-pr-media-gallery-strip';
  var placeholderThumb = document.createElement('div');
  placeholderThumb.className = 'renuvex-pr-media-gallery-thumb renuvex-pr-media-gallery-thumb--placeholder';
  mediaStrip.appendChild(placeholderThumb);
  stripWrap.appendChild(mediaStrip);
  gallerySection.appendChild(stripWrap);
  return gallerySection;
}

// opts: { settings, root, currentMediaFilter, openReviewModal, wireLightboxTrigger }
export function buildMediaGallery(opts) {
  var settings = opts.settings;
  var root = opts.root;
  var currentMediaFilter = opts.currentMediaFilter || 'none';
  var openReviewModal = opts.openReviewModal;

  var galleryReviews = (opts.mediaStripReviews || []).filter(function (r) {
    return getTrustedReviewMedia(r).length > 0;
  });
  if (!(settings.showMediaGallery !== false && currentMediaFilter === 'none' && galleryReviews.length > 0)) {
    return null;
  }

  var gallerySection = document.createElement('div');
  gallerySection.className = 'renuvex-pr-media-gallery-section';

  // Gallery üstündeki başlık — admin paneldeki "Medya Galeri Başlığı" ile
  // özelleştirilebilir; toggle kapalıysa hiç render edilmez.
  if (settings.showMediaGalleryTitle !== false) {
    var galleryTitleText = settingText(settings.mediaGalleryTitle, 'Müşteri Görselleri');
    var galleryTitle = document.createElement('div');
    galleryTitle.className = 'renuvex-pr-media-gallery-title';
    galleryTitle.textContent = galleryTitleText;
    gallerySection.appendChild(galleryTitle);
  }

  // Thumbnail aspect ratio review layout'a göre otomatik:
  // card review medyası 1:1 → gallery de kare; list/gallery review medyası
  // 3:4 portre → gallery de portre. Tutarlı görsel akış.
  var thumbAspect = settings.reviewLayout === 'card' ? '1/1' : '3/4';
  root.style.setProperty('--renuvex-pr-media-gallery-thumb-aspect', thumbAspect);

  var mediaStrip = document.createElement('div');
  mediaStrip.className = 'renuvex-pr-media-gallery-strip';

  // Backend cap=15 garantili; defansif iç sınır da 15.
  // `<img>` width/height attribute'ları CSS `--renuvex-pr-media-gallery-thumb-aspect` ile uyumlu
  // olmalı (card: 1/1, list/gallery: 3/4) — CLS rezervi tarayıcı tarafından doğru
  // hesaplanır. width REVIEW_MEDIA_THUMB_WIDTH (300); height layout'a göre.
  var stripWidth = REVIEW_MEDIA_THUMB_WIDTH;
  var stripHeight = settings.reviewLayout === 'card' ? REVIEW_MEDIA_THUMB_WIDTH : Math.round(REVIEW_MEDIA_THUMB_WIDTH * 4 / 3);
  var thumbCount = 0;
  galleryReviews.forEach(function (r) {
    if (thumbCount >= 15) return;
    var firstMedia = getFirstTrustedReviewMedia(r);
    if (!firstMedia) return;
    var thumb = createMediaThumbnail(firstMedia, {
      className: 'renuvex-pr-media-gallery-thumb',
      sourceWidth: REVIEW_MEDIA_THUMB_WIDTH,
      width: stripWidth,
      height: stripHeight,
      loading: thumbCount < 3 ? 'eager' : 'lazy',
      onOpen: function () { openReviewModal(r, firstMedia.url, galleryReviews, { source: 'mediaGallery' }); },
    });
    if (!thumb) return;
    // Lightbox navigasyonu gallery dataset'i içinde gezer — load-more sonrası
    // ana liste değişse bile lightbox tutarlı kalır (K1.b çözümü).
    mediaStrip.appendChild(thumb);
    thumbCount++;
  });

  // Desktop ok butonları
  var prevArrow = document.createElement('button');
  prevArrow.className = 'renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-prev';
  var prevArrowIcon = iconUseNode(UI_CARET_LEFT);
  if (prevArrowIcon) prevArrow.appendChild(prevArrowIcon);
  prevArrow.setAttribute('aria-label', 'Önceki');
  prevArrow.onclick = function () { mediaStrip.scrollBy({ left: -200, behavior: 'smooth' }); };

  var nextArrow = document.createElement('button');
  nextArrow.className = 'renuvex-pr-media-gallery-arrow renuvex-pr-media-gallery-arrow-next';
  var nextArrowIcon = iconUseNode(UI_CARET_RIGHT);
  if (nextArrowIcon) nextArrow.appendChild(nextArrowIcon);
  nextArrow.setAttribute('aria-label', 'Sonraki');
  nextArrow.onclick = function () { mediaStrip.scrollBy({ left: 200, behavior: 'smooth' }); };

  var stripWrap = document.createElement('div');
  stripWrap.className = 'renuvex-pr-media-gallery-strip-wrap';
  stripWrap.appendChild(prevArrow);
  stripWrap.appendChild(mediaStrip);
  stripWrap.appendChild(nextArrow);
  gallerySection.appendChild(stripWrap);

  return gallerySection;
}
