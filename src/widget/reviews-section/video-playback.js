import { streamPosterVariantUrl } from '../core/review-media.js';

export function shouldUseQualityWarmStart(navigatorRef) {
  var nav = navigatorRef || (typeof navigator !== 'undefined' ? navigator : null);
  var connection = nav && (nav.connection || nav.webkitConnection || nav.mozConnection);
  if (connection && connection.saveData === true) return false;
  var effectiveType = connection && typeof connection.effectiveType === 'string'
    ? connection.effectiveType.toLowerCase()
    : '';
  return effectiveType !== 'slow-2g' && effectiveType !== '2g';
}

function levelScore(level) {
  var width = Number(level && level.width);
  var height = Number(level && level.height);
  var bitrate = Number(level && (level.bitrate || level.bandwidth));
  if (Number.isFinite(width) || Number.isFinite(height)) {
    return (Number.isFinite(height) ? height : 0) * 100000 + (Number.isFinite(width) ? width : 0);
  }
  return Number.isFinite(bitrate) ? bitrate : 0;
}

export function pickWarmStartLevel(levels, video, windowRef) {
  if (!Array.isArray(levels) || !levels.length) return -1;
  var win = windowRef || (typeof window !== 'undefined' ? window : null);
  var rect = video && typeof video.getBoundingClientRect === 'function'
    ? video.getBoundingClientRect()
    : { width: 0, height: 0 };
  var baseWidth = Math.max(Number(rect.width) || 0, Number(video && video.clientWidth) || 0, 360);
  var baseHeight = Math.max(Number(rect.height) || 0, Number(video && video.clientHeight) || 0, 360);
  var rawDpr = Number(win && win.devicePixelRatio);
  var dpr = Number.isFinite(rawDpr) && rawDpr > 0 ? Math.min(rawDpr, 2) : 1;
  var maxWidth = Math.round(baseWidth * dpr * 1.15);
  var maxHeight = Math.round(baseHeight * dpr * 1.15);
  var bestIndex = -1;
  var bestScore = -1;
  var lowestIndex = 0;
  var lowestScore = Number.POSITIVE_INFINITY;

  levels.forEach(function (level, index) {
    var score = levelScore(level);
    if (score < lowestScore) {
      lowestScore = score;
      lowestIndex = index;
    }
    var width = Number(level && level.width);
    var height = Number(level && level.height);
    var widthFits = !Number.isFinite(width) || width <= maxWidth;
    var heightFits = !Number.isFinite(height) || height <= maxHeight;
    if (widthFits && heightFits && score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  return bestIndex >= 0 ? bestIndex : lowestIndex;
}

function attachQualityWarmStart(Hls, hls, video) {
  if (!shouldUseQualityWarmStart()) return;
  var eventName = Hls && Hls.Events && Hls.Events.MANIFEST_PARSED;
  if (!eventName || !hls || typeof hls.on !== 'function') return;
  var onManifestParsed = function () {
    if (typeof hls.off === 'function') hls.off(eventName, onManifestParsed);
    var level = pickWarmStartLevel(hls.levels, video);
    if (level >= 0) {
      try { hls.startLevel = level; } catch (_) {}
    }
  };
  hls.on(eventName, onManifestParsed);
}

export function attachReviewVideoPlayback(video, media) {
  var cancelled = false;
  var hls = null;
  video.controls = true;
  video.autoplay = false;
  video.preload = 'metadata';
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.poster = streamPosterVariantUrl(media.posterUrl || '', { width: 1280, height: 720, fit: 'clip' }) || media.posterUrl || '';

  if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = media.url;
  } else {
    import('hls.js').then(function (module) {
      if (cancelled) return;
      var Hls = module.default || module;
      if (!Hls || !Hls.isSupported || !Hls.isSupported()) {
        video.dispatchEvent(new Event('error'));
        return;
      }
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        capLevelToPlayerSize: true,
        backBufferLength: 30,
      });
      attachQualityWarmStart(Hls, hls, video);
      hls.loadSource(media.url);
      hls.attachMedia(video);
    }).catch(function () {
      if (!cancelled) video.dispatchEvent(new Event('error'));
    });
  }

  return function cleanup() {
    cancelled = true;
    try { video.pause(); } catch (_) {}
    if (hls) {
      try { hls.destroy(); } catch (_) {}
      hls = null;
    }
    video.removeAttribute('src');
    try { video.load(); } catch (_) {}
  };
}
