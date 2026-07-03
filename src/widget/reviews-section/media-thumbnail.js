import {
  buildReviewImageAttrs,
  hideOnImageError,
  REVIEW_MEDIA_DISPLAY_FALLBACK_SQUARE_HEIGHT,
  REVIEW_MEDIA_DISPLAY_FALLBACK_WIDTH,
  REVIEW_MEDIA_THUMB_WIDTH,
} from '../core/helpers.js';
import {
  mediaPreviewUrl,
  muxPosterSrcSet,
  muxPosterVariantUrl,
} from '../core/review-media.js';
import { iconUseNode } from '../icons/star-sprite.js';
import { PLAY_ICON } from '../icons/index.js';
import { wireLightboxTrigger } from './lightbox-trigger.js';

function positiveInt(value) {
  var number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.round(number) : 0;
}

function firstPositive() {
  for (var i = 0; i < arguments.length; i++) {
    var value = positiveInt(arguments[i]);
    if (value) return value;
  }
  return 0;
}

export function createMediaThumbnail(item, opts) {
  opts = opts || {};
  var sourceWidth = firstPositive(opts.sourceWidth, REVIEW_MEDIA_THUMB_WIDTH);
  var sourceHeight = firstPositive(opts.sourceHeight, sourceWidth);
  var displayWidth = firstPositive(opts.displayWidth, REVIEW_MEDIA_DISPLAY_FALLBACK_WIDTH);
  var displayHeight = firstPositive(opts.displayHeight, REVIEW_MEDIA_DISPLAY_FALLBACK_SQUARE_HEIGHT);
  var videoPosterOpts = item && item.type === 'video' ? {
    width: sourceWidth,
    height: sourceHeight,
    fit: 'crop',
  } : null;
  var previewUrl = videoPosterOpts
    ? muxPosterVariantUrl(item.posterUrl, videoPosterOpts)
    : mediaPreviewUrl(item);
  if (!previewUrl) return null;
  var img = document.createElement('img');
  var attrs = item.type === 'image'
    ? buildReviewImageAttrs(item, sourceWidth)
    : { src: previewUrl, srcset: muxPosterSrcSet(item.posterUrl, videoPosterOpts) };
  img.src = attrs.src;
  if (attrs.srcset) img.srcset = attrs.srcset;
  img.loading = opts.loading || 'lazy';
  img.decoding = 'async';
  if (item.type === 'image') img.setAttribute('data-renuvex-img-url', item.url);
  img.width = displayWidth;
  img.height = displayHeight;
  img.alt = '';
  hideOnImageError(img);

  if (item.type !== 'video') {
    img.className = opts.className || '';
    wireLightboxTrigger(img, opts.onOpen, opts.imageLabel || 'Yorum fotoğrafını büyüt');
    return img;
  }

  var button = document.createElement('button');
  button.type = 'button';
  button.className = (opts.className || '') + ' renuvex-pr-media-video-thumb';
  img.className = 'renuvex-pr-media-poster';
  button.appendChild(img);

  var play = document.createElement('span');
  play.className = 'renuvex-pr-media-play';
  var playIcon = iconUseNode(PLAY_ICON);
  if (playIcon) play.appendChild(playIcon);
  button.appendChild(play);

  wireLightboxTrigger(button, opts.onOpen, opts.videoLabel || 'Yorum videosunu oynat');
  return button;
}
