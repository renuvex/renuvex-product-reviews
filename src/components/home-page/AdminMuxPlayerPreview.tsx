import { useEffect, type MouseEvent } from 'react';

type AdminMuxPlayerPreviewProps = {
  playbackId: string;
  playbackToken: string;
  thumbnailToken: string;
  posterUrl?: string | null;
  className?: string;
};

function preventNativeVideoContextMenu(event: MouseEvent<HTMLElement>) {
  event.preventDefault();
}

export function AdminMuxPlayerPreview({
  playbackId,
  playbackToken,
  thumbnailToken,
  posterUrl,
  className,
}: AdminMuxPlayerPreviewProps) {
  useEffect(() => {
    void import('@mux/mux-player');
  }, []);

  return (
    <mux-player
      className={className}
      playback-id={playbackId}
      playback-token={playbackToken}
      thumbnail-token={thumbnailToken}
      poster={posterUrl || undefined}
      accent-color="#f8fafc"
      secondary-color="#111111"
      stream-type="on-demand"
      preload="metadata"
      muted
      playsinline
      disable-tracking
      disable-cookies
      hotkeys="noarrowleft noarrowright"
      style={{
        '--controls-backdrop-color': 'rgba(0,0,0,0.58)',
        '--media-range-bar-color': '#f8fafc',
        '--media-range-track-background': 'rgba(0,0,0,0.72)',
        '--media-time-range-buffered-color': 'rgba(255,255,255,0.28)',
      }}
      onContextMenu={preventNativeVideoContextMenu}
    />
  );
}
