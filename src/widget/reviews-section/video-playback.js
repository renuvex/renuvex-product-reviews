export function attachReviewVideoPlayback(video, media) {
  var cancelled = false;
  var hls = null;
  video.controls = true;
  video.autoplay = false;
  video.preload = 'metadata';
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.poster = media.posterUrl || '';

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
        backBufferLength: 30,
      });
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
