import { useEffect, type MouseEvent } from 'react';
import {
  ADMIN_REVIEW_PLAYER_COLORS,
  ADMIN_REVIEW_MUX_PLAYER_THEME,
  ensureAdminReviewMuxPlayerTheme,
} from '@/lib/mux-player/review-player-theme';

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
    void ensureAdminReviewMuxPlayerTheme();
  }, []);

  return (
    <mux-player
      className={className}
      playback-id={playbackId}
      playback-token={playbackToken}
      thumbnail-token={thumbnailToken}
      poster={posterUrl || undefined}
      theme={ADMIN_REVIEW_MUX_PLAYER_THEME}
      accent-color={ADMIN_REVIEW_PLAYER_COLORS.controlForeground}
      primary-color={ADMIN_REVIEW_PLAYER_COLORS.controlForeground}
      secondary-color={ADMIN_REVIEW_PLAYER_COLORS.controlBackground}
      stream-type="on-demand"
      preload="metadata"
      muted
      playsinline
      disable-tracking
      disable-cookies
      hotkeys="noarrowleft noarrowright"
      style={{
        '--controls-backdrop-color': ADMIN_REVIEW_PLAYER_COLORS.controlsBackdrop,
        '--media-primary-color': ADMIN_REVIEW_PLAYER_COLORS.controlForeground,
        '--media-secondary-color': ADMIN_REVIEW_PLAYER_COLORS.controlBackground,
      }}
      onContextMenu={preventNativeVideoContextMenu}
    />
  );
}
