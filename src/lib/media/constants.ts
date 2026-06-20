export const VIDEO_PROVIDER = 'mux';

export const VIDEO_MAX_BYTES = 150 * 1024 * 1024;
export const VIDEO_MIN_DURATION_MS = 2_000;
export const VIDEO_MAX_DURATION_MS = 60_000;
export const VIDEO_UPLOAD_SESSION_TTL_MS = 24 * 60 * 60 * 1000;
export const MEDIA_JOB_STALE_LOCK_MS = 15 * 60 * 1000;
export const VIDEO_ASSET_RECONCILE_OFFSETS_MS = [
  10_000,
  20_000,
  30_000,
  45_000,
  60_000,
  90_000,
  120_000,
  180_000,
  300_000,
  600_000,
] as const;

export const VIDEO_ALLOWED_MIME_TYPES = new Set(['video/mp4', 'video/quicktime']);
export const VIDEO_TERMINAL_SESSION_STATUSES = new Set(['ready', 'failed', 'aborted', 'consumed']);

export const MEDIA_JOB_ACTIONS = {
  resolveVideoAsset: 'resolve_video_asset',
  publishVideo: 'publish_video',
  protectVideo: 'protect_video',
  cleanupVideo: 'cleanup_video',
  cleanupImage: 'cleanup_image',
  reconcileVideo: 'reconcile_video',
  expireUploadSession: 'expire_upload_session',
} as const;

export type MediaJobAction = typeof MEDIA_JOB_ACTIONS[keyof typeof MEDIA_JOB_ACTIONS];
