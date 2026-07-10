function envFlag(name: string): boolean {
  return process.env[name]?.trim().toLowerCase() === 'true';
}

function requiredSecret(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

export type ReviewRequestTokenKeyRing = {
  currentVersion: number;
  keys: ReadonlyMap<number, string>;
};

function positiveInt(value: string | undefined, name: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${name} must be a positive integer`);
  }
  return parsed;
}

export function isReviewEmailEnabled(): boolean {
  return envFlag('REVIEW_EMAIL_ENABLED');
}

export function getReviewEmailHashSecret(): string {
  return requiredSecret('REVIEW_EMAIL_HASH_SECRET');
}

export function getReviewEmailEncryptionKeyB64(): string {
  return requiredSecret('REVIEW_EMAIL_PII_ENCRYPTION_KEY_B64');
}

export function getReviewRequestTokenKeyRing(): ReviewRequestTokenKeyRing {
  const currentVersion = positiveInt(
    process.env.REVIEW_REQUEST_TOKEN_CURRENT_KEY_VERSION,
    'REVIEW_REQUEST_TOKEN_CURRENT_KEY_VERSION',
  );
  const raw = requiredSecret('REVIEW_REQUEST_TOKEN_KEYS_JSON');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('REVIEW_REQUEST_TOKEN_KEYS_JSON must be valid JSON');
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('REVIEW_REQUEST_TOKEN_KEYS_JSON must be a version-to-secret object');
  }

  const keys = new Map<number, string>();
  for (const [versionText, secret] of Object.entries(parsed)) {
    const version = positiveInt(versionText, 'review request token key version');
    if (typeof secret !== 'string' || secret.trim().length < 32) {
      throw new Error(`Review request token key v${version} must be at least 32 characters`);
    }
    keys.set(version, secret.trim());
  }
  if (!keys.has(currentVersion)) {
    throw new Error(`Current review request token key v${currentVersion} is missing from the key ring`);
  }
  return { currentVersion, keys };
}

export function getReviewRequestSessionSecret(): string {
  return requiredSecret('REVIEW_REQUEST_SESSION_SECRET');
}

export function getReviewRequestPublicBaseUrl(): URL {
  const raw = requiredSecret('REVIEW_REQUEST_PUBLIC_BASE_URL');
  const url = new URL(raw);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) {
    throw new Error('REVIEW_REQUEST_PUBLIC_BASE_URL must be a clean HTTPS origin');
  }
  return url;
}

export function assertReviewEmailRuntimeConfigured(): void {
  getReviewEmailHashSecret();
  getReviewEmailEncryptionKeyB64();
  getReviewRequestTokenKeyRing();
  getReviewRequestSessionSecret();
  getReviewRequestPublicBaseUrl();
}
