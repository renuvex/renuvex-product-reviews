type Env = Record<string, string | undefined>;

const DEFAULT_VIDEO_UPLOAD_CHUNK_SIZE_KB = 8192;
const MIN_VIDEO_UPLOAD_CHUNK_SIZE_KB = 5120;
const MAX_VIDEO_UPLOAD_CHUNK_SIZE_KB = 30_720;
const VIDEO_UPLOAD_CHUNK_SIZE_STEP_KB = 256;
const DEFAULT_VIDEO_UPLOAD_CHUNK_ATTEMPTS = 5;
const MIN_VIDEO_UPLOAD_CHUNK_ATTEMPTS = 3;
const MAX_VIDEO_UPLOAD_CHUNK_ATTEMPTS = 8;

export class MediaConfigError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = 'MediaConfigError';
  }
}

function required(env: Env, name: string): string {
  const value = env[name]?.trim();
  if (!value) throw new MediaConfigError('missing_config', `${name} is not configured`);
  return value;
}

function httpsBaseUrl(value: string, name: string): string {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new MediaConfigError('invalid_config', `${name} must be a valid URL`);
  }
  if (parsed.protocol !== 'https:') throw new MediaConfigError('invalid_config', `${name} must use https`);
  parsed.pathname = parsed.pathname.replace(/\/$/, '');
  parsed.search = '';
  parsed.hash = '';
  return parsed.toString().replace(/\/$/, '');
}

export function isVideoReviewsGloballyEnabled(env: Env = process.env): boolean {
  return env.VIDEO_REVIEWS_ENABLED === 'true';
}

export function getMuxApiConfig(env: Env = process.env) {
  return {
    tokenId: required(env, 'MUX_TOKEN_ID'),
    tokenSecret: required(env, 'MUX_TOKEN_SECRET'),
    signingKeyId: required(env, 'MUX_SIGNING_KEY_ID'),
    signingKeyPrivate: required(env, 'MUX_SIGNING_KEY_PRIVATE'),
  };
}

export function getMuxWebhookConfig(env: Env = process.env) {
  return {
    webhookSecret: required(env, 'MUX_WEBHOOK_SECRET'),
  };
}

export function getMuxVideoQuality(env: Env = process.env): 'basic' | 'plus' {
  const value = required(env, 'MUX_VIDEO_QUALITY').toLowerCase();
  if (value !== 'basic' && value !== 'plus') {
    throw new MediaConfigError('invalid_config', 'MUX_VIDEO_QUALITY must be basic or plus');
  }
  return value;
}

function parsePositiveInteger(value: string | undefined): number | null {
  if (!value?.trim()) return null;
  const parsed = Number(value.trim());
  if (!Number.isInteger(parsed) || parsed <= 0) return null;
  return parsed;
}

function clampInteger(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeChunkSizeKb(value: number): number {
  const clamped = clampInteger(value, MIN_VIDEO_UPLOAD_CHUNK_SIZE_KB, MAX_VIDEO_UPLOAD_CHUNK_SIZE_KB);
  const normalized = Math.floor(clamped / VIDEO_UPLOAD_CHUNK_SIZE_STEP_KB) * VIDEO_UPLOAD_CHUNK_SIZE_STEP_KB;
  return clampInteger(normalized, MIN_VIDEO_UPLOAD_CHUNK_SIZE_KB, MAX_VIDEO_UPLOAD_CHUNK_SIZE_KB);
}

export function getVideoUploadClientConfig(env: Env = process.env) {
  const rawChunkSize = parsePositiveInteger(env.VIDEO_UPLOAD_CHUNK_SIZE_KB);
  const rawAttempts = parsePositiveInteger(env.VIDEO_UPLOAD_CHUNK_ATTEMPTS);
  return {
    chunkSizeKb: normalizeChunkSizeKb(rawChunkSize ?? DEFAULT_VIDEO_UPLOAD_CHUNK_SIZE_KB),
    chunkAttempts: clampInteger(
      rawAttempts ?? DEFAULT_VIDEO_UPLOAD_CHUNK_ATTEMPTS,
      MIN_VIDEO_UPLOAD_CHUNK_ATTEMPTS,
      MAX_VIDEO_UPLOAD_CHUNK_ATTEMPTS,
    ),
  };
}

export function getQStashMediaConfig(env: Env = process.env) {
  return {
    token: required(env, 'QSTASH_TOKEN'),
    currentSigningKey: required(env, 'QSTASH_CURRENT_SIGNING_KEY'),
    nextSigningKey: required(env, 'QSTASH_NEXT_SIGNING_KEY'),
  };
}

export function getMediaJobEndpoint(env: Env = process.env): string {
  const base = required(env, 'MEDIA_JOB_BASE_URL');
  return `${httpsBaseUrl(base, 'MEDIA_JOB_BASE_URL')}/api/internal/media-jobs`;
}
