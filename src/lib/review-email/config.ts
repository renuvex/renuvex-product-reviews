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

export type ReviewEmailPiiKey = {
  hashSecret: string;
  encryptionKey: Buffer;
};

export type ReviewEmailPiiKeyRing = {
  currentVersion: number;
  keys: ReadonlyMap<number, ReviewEmailPiiKey>;
};

export type ReviewEmailJournalConfig = {
  region: string;
  bucket: string;
  roleArn?: string;
  oidcAudience: string;
  activeRetentionDays: number;
  objectLockRetentionDays: number;
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

export function isIkasAppDeletedWebhookVerified(): boolean {
  return envFlag('IKAS_APP_DELETED_WEBHOOK_VERIFIED');
}

export function getReviewEmailPiiKeyRing(): ReviewEmailPiiKeyRing {
  const currentVersion = positiveInt(process.env.REVIEW_EMAIL_PII_CURRENT_KEY_VERSION, 'REVIEW_EMAIL_PII_CURRENT_KEY_VERSION');
  const raw = requiredSecret('REVIEW_EMAIL_PII_KEYS_JSON');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('REVIEW_EMAIL_PII_KEYS_JSON must be valid JSON');
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('REVIEW_EMAIL_PII_KEYS_JSON must be a version-to-key object');
  }

  const keys = new Map<number, ReviewEmailPiiKey>();
  for (const [versionText, value] of Object.entries(parsed)) {
    const version = positiveInt(versionText, 'review email PII key version');
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error(`Review email PII key v${version} must be an object`);
    }
    const entry = value as Record<string, unknown>;
    const hashSecret = typeof entry.hashSecret === 'string' ? entry.hashSecret.trim() : '';
    const encryptionKeyB64 = typeof entry.encryptionKeyB64 === 'string' ? entry.encryptionKeyB64.trim() : '';
    const encryptionKey = Buffer.from(encryptionKeyB64, 'base64');
    if (hashSecret.length < 32) {
      throw new Error(`Review email PII hash key v${version} must be at least 32 characters`);
    }
    if (encryptionKey.length !== 32) {
      throw new Error(`Review email PII encryption key v${version} must decode to 32 bytes`);
    }
    keys.set(version, { hashSecret, encryptionKey });
  }
  if (!keys.has(currentVersion)) {
    throw new Error(`Current review email PII key v${currentVersion} is missing from the key ring`);
  }
  for (let version = 1; version <= currentVersion; version += 1) {
    if (!keys.has(version)) {
      throw new Error(`Review email PII key ring must retain v${version} until protected data is explicitly re-keyed or erased`);
    }
  }
  return { currentVersion, keys };
}

export function getReviewRequestTokenKeyRing(): ReviewRequestTokenKeyRing {
  const currentVersion = positiveInt(process.env.REVIEW_REQUEST_TOKEN_CURRENT_KEY_VERSION, 'REVIEW_REQUEST_TOKEN_CURRENT_KEY_VERSION');
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

export function getReviewEmailJournalConfig(): ReviewEmailJournalConfig {
  const activeRetentionDays = positiveInt(
    process.env.REVIEW_EMAIL_JOURNAL_ACTIVE_RETENTION_DAYS,
    'REVIEW_EMAIL_JOURNAL_ACTIVE_RETENTION_DAYS',
  );
  const objectLockRetentionDays = positiveInt(
    process.env.REVIEW_EMAIL_JOURNAL_OBJECT_LOCK_RETENTION_DAYS,
    'REVIEW_EMAIL_JOURNAL_OBJECT_LOCK_RETENTION_DAYS',
  );
  if (activeRetentionDays < 35 || objectLockRetentionDays !== activeRetentionDays + 7) {
    throw new Error('Review email journal retention contract is invalid');
  }
  const bucket = requiredSecret('AWS_REVIEW_EMAIL_JOURNAL_BUCKET');
  if (!/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(bucket)) {
    throw new Error('AWS_REVIEW_EMAIL_JOURNAL_BUCKET is invalid');
  }
  return {
    region: requiredSecret('AWS_REVIEW_EMAIL_JOURNAL_REGION'),
    bucket,
    roleArn: process.env.AWS_REVIEW_EMAIL_JOURNAL_ROLE_ARN?.trim() || undefined,
    oidcAudience: process.env.AWS_REVIEW_EMAIL_JOURNAL_OIDC_AUDIENCE?.trim() || 'sts.amazonaws.com',
    activeRetentionDays,
    objectLockRetentionDays,
  };
}

export function getReviewEmailRetentionMode(): 'report' | 'enforce' {
  const mode = process.env.REVIEW_EMAIL_RETENTION_MODE?.trim().toLowerCase() || 'report';
  if (mode !== 'report' && mode !== 'enforce') throw new Error('REVIEW_EMAIL_RETENTION_MODE must be report or enforce');
  return mode;
}

export function assertReviewEmailRuntimeConfigured(): void {
  if (!isIkasAppDeletedWebhookVerified()) {
    throw new Error('IKAS_APP_DELETED_WEBHOOK_VERIFIED must be true after provider-side verification');
  }
  getReviewEmailPiiKeyRing();
  getReviewRequestTokenKeyRing();
  getReviewRequestSessionSecret();
  getReviewRequestPublicBaseUrl();
  getReviewEmailJournalConfig();
}
