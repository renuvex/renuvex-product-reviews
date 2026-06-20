type Env = Record<string, string | undefined>;

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
