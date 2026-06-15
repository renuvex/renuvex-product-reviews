import { getTrustedReviewImages, isTrustedReviewImageUrl } from './helpers.js';

function isTrustedStreamUrl(value) {
  if (typeof value !== 'string' || !value) return false;
  try {
    var url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return false;
    var host = url.hostname.toLowerCase();
    return host === 'videodelivery.net' || host.endsWith('.videodelivery.net') ||
      host === 'cloudflarestream.com' || host.endsWith('.cloudflarestream.com');
  } catch (_) {
    return false;
  }
}

function isTrustedStreamThumbnailUrl(url) {
  if (!url || !isTrustedStreamUrl(url.href)) return false;
  return /\/thumbnails\/thumbnail\.(jpg|jpeg|png|webp|gif)$/i.test(url.pathname);
}

function positiveInt(value) {
  var number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.round(number) : 0;
}

export function streamPosterVariantUrl(value, opts) {
  opts = opts || {};
  if (typeof value !== 'string' || !value) return '';
  var url;
  try {
    url = new URL(value);
  } catch (_) {
    return value;
  }
  if (!isTrustedStreamThumbnailUrl(url)) return value;
  var width = positiveInt(opts.width);
  var height = positiveInt(opts.height);
  if (width) url.searchParams.set('width', String(width));
  if (height) url.searchParams.set('height', String(height));
  if (opts.fit === 'clip' || opts.fit === 'scale' || opts.fit === 'fill' || opts.fit === 'crop') {
    url.searchParams.set('fit', opts.fit);
  }
  return url.href;
}

export function streamPosterSrcSet(value, opts) {
  opts = opts || {};
  var width = positiveInt(opts.width);
  var height = positiveInt(opts.height);
  if (!width && !height) return '';
  var oneX = streamPosterVariantUrl(value, {
    width: width,
    height: height,
    fit: opts.fit,
  });
  var twoX = streamPosterVariantUrl(value, {
    width: width ? width * 2 : 0,
    height: height ? height * 2 : 0,
    fit: opts.fit,
  });
  if (!oneX || !twoX || oneX === value || twoX === value) return '';
  return oneX + ' 1x, ' + twoX + ' 2x';
}

export function getTrustedReviewMedia(review) {
  var result = [];
  var seen = {};
  var structured = review && Array.isArray(review.media) ? review.media : [];
  structured.forEach(function (item) {
    if (!item || typeof item !== 'object') return;
    if (item.type === 'video') {
      if (!isTrustedStreamUrl(item.url) || !isTrustedStreamUrl(item.posterUrl || item.thumbnailUrl)) return;
      var videoKey = 'video:' + item.url;
      if (seen[videoKey]) return;
      seen[videoKey] = true;
      result.push({
        type: 'video',
        url: item.url,
        posterUrl: item.posterUrl || item.thumbnailUrl,
        thumbnailUrl: item.thumbnailUrl || item.posterUrl,
        durationMs: typeof item.durationMs === 'number' ? item.durationMs : null,
        width: typeof item.width === 'number' ? item.width : null,
        height: typeof item.height === 'number' ? item.height : null,
        position: typeof item.position === 'number' ? item.position : result.length,
      });
      return;
    }
    if (item.type === 'image' && isTrustedReviewImageUrl(item.url)) {
      var imageKey = 'image:' + item.url.trim();
      if (seen[imageKey]) return;
      seen[imageKey] = true;
      result.push({
        type: 'image',
        url: item.url.trim(),
        thumbnailUrl: item.thumbnailUrl || null,
        posterUrl: null,
        durationMs: null,
        width: typeof item.width === 'number' ? item.width : null,
        height: typeof item.height === 'number' ? item.height : null,
        position: typeof item.position === 'number' ? item.position : result.length,
      });
    }
  });

  getTrustedReviewImages(review).forEach(function (url) {
    var key = 'image:' + url;
    if (seen[key]) return;
    seen[key] = true;
    result.push({ type: 'image', url: url, thumbnailUrl: null, posterUrl: null, durationMs: null, width: null, height: null, position: result.length });
  });

  return result.sort(function (a, b) { return a.position - b.position; });
}

export function getFirstTrustedReviewMedia(review) {
  var media = getTrustedReviewMedia(review);
  return media.length ? media[0] : null;
}

export function mediaPreviewUrl(item) {
  return item && item.type === 'video' ? item.posterUrl : item && item.url;
}

export function formatMediaDuration(durationMs) {
  if (typeof durationMs !== 'number' || durationMs <= 0) return '';
  var totalSeconds = Math.max(0, Math.round(durationMs / 1000));
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = String(totalSeconds % 60).padStart(2, '0');
  return minutes + ':' + seconds;
}
