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
      stream-type="on-demand"
      preload="metadata"
      muted
      playsinline
      disable-tracking
      disable-cookies
      hotkeys="noarrowleft noarrowright"
      onContextMenu={preventNativeVideoContextMenu}
    />
  );
}
