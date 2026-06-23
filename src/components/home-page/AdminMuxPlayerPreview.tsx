import { useEffect, type MouseEvent } from 'react';
import { ensureReviewMuxPlayerTheme, REVIEW_MUX_PLAYER_THEME } from '@/lib/mux-player/review-player-theme';

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
    void ensureReviewMuxPlayerTheme();
  }, []);

  return (
    <mux-player
      className={className}
      playback-id={playbackId}
      playback-token={playbackToken}
      thumbnail-token={thumbnailToken}
      poster={posterUrl || undefined}
      theme={REVIEW_MUX_PLAYER_THEME}
      accent-color="#ffffff"
      primary-color="#ffffff"
      secondary-color="#000000"
      stream-type="on-demand"
      preload="metadata"
      muted
      playsinline
      disable-tracking
      disable-cookies
      hotkeys="noarrowleft noarrowright"
      style={{
        '--controls-backdrop-color': 'rgba(0,0,0,0.58)',
        '--media-primary-color': '#ffffff',
        '--media-secondary-color': '#000000',
      }}
      onContextMenu={preventNativeVideoContextMenu}
    />
  );
}
