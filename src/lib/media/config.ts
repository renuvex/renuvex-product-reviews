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

export function getR2MediaConfig(env: Env = process.env) {
  return {
    endpoint: httpsBaseUrl(required(env, 'CLOUDFLARE_R2_ENDPOINT'), 'CLOUDFLARE_R2_ENDPOINT'),
    accessKeyId: required(env, 'CLOUDFLARE_R2_ACCESS_KEY_ID'),
    secretAccessKey: required(env, 'CLOUDFLARE_R2_SECRET_ACCESS_KEY'),
    masterBucket: required(env, 'CLOUDFLARE_R2_MASTER_BUCKET'),
    ingestBucket: required(env, 'CLOUDFLARE_R2_INGEST_BUCKET'),
    ingestPublicBaseUrl: httpsBaseUrl(required(env, 'CLOUDFLARE_R2_INGEST_PUBLIC_BASE_URL'), 'CLOUDFLARE_R2_INGEST_PUBLIC_BASE_URL'),
  };
}

export function getStreamMediaConfig(env: Env = process.env) {
  return {
    accountId: required(env, 'CLOUDFLARE_ACCOUNT_ID'),
    apiToken: required(env, 'CLOUDFLARE_STREAM_API_TOKEN'),
    customerCode: required(env, 'CLOUDFLARE_STREAM_CUSTOMER_CODE'),
    webhookSecret: required(env, 'CLOUDFLARE_STREAM_WEBHOOK_SECRET'),
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
