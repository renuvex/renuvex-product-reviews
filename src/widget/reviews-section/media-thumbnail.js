import { buildResponsiveImgAttrs, hideOnImageError } from '../core/helpers.js';
import {
  mediaPreviewUrl,
  muxPosterSrcSet,
  muxPosterVariantUrl,
} from '../core/review-media.js';
import { iconUseNode } from '../icons/star-sprite.js';
import { PLAY_ICON } from '../icons/index.js';
import { wireLightboxTrigger } from './lightbox-trigger.js';

export function createMediaThumbnail(item, opts) {
  opts = opts || {};
  var videoPosterOpts = item && item.type === 'video' ? {
    width: opts.width || opts.sourceWidth || 0,
    height: opts.height || opts.width || opts.sourceWidth || 0,
    fit: 'crop',
  } : null;
  var previewUrl = videoPosterOpts
    ? muxPosterVariantUrl(item.posterUrl, videoPosterOpts)
    : mediaPreviewUrl(item);
  if (!previewUrl) return null;
  var img = document.createElement('img');
  var attrs = item.type === 'image'
    ? buildResponsiveImgAttrs(previewUrl, opts.sourceWidth)
    : { src: previewUrl, srcset: muxPosterSrcSet(item.posterUrl, videoPosterOpts) };
  img.src = attrs.src;
  if (attrs.srcset) img.srcset = attrs.srcset;
  img.loading = opts.loading || 'lazy';
  img.decoding = 'async';
  if (item.type === 'image') img.setAttribute('data-renuvex-img-url', item.url);
  if (opts.width) img.width = opts.width;
  if (opts.height) img.height = opts.height;
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
