import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const CI_ONLY_SECRET = 'ci-only-secret-00000000000000000000000000000000';
const ENV_FILES = ['.env', '.env.local', '.env.production', '.env.production.local'];
const SENSITIVE_ENV_PATTERN = /(?:SECRET|TOKEN|PASSWORD|PRIVATE_KEY|CREDENTIAL|DATABASE_URL|DIRECT_URL|AWS_PROFILE|OIDC)/i;
const PROVIDER_ENV_PREFIX_PATTERN = /^(?:AWS_|CF_|CLOUDFLARE_|IKAS_|KV_REST_|MUX_|QSTASH_|SENTRY_|SUPABASE_|UPSTASH_|VERCEL_)/i;

export function resolvePnpmCommand() {
  if (process.platform !== 'win32') return { file: 'pnpm', prefix: [] };

  for (const entry of (process.env.PATH || '').split(path.delimiter)) {
    if (!entry) continue;
    const cli = path.join(entry, 'node_modules', 'pnpm', 'bin', 'pnpm.cjs');
    if (existsSync(path.join(entry, 'pnpm.cmd')) && existsSync(cli)) {
      return { file: process.execPath, prefix: [cli] };
    }
  }

  throw new Error('Unable to resolve the pnpm JavaScript entrypoint');
}

function readWidgetBuildTime(repoRoot) {
  const manifest = JSON.parse(
    readFileSync(path.join(repoRoot, 'public', 'widget-runtime', 'build-manifest.json'), 'utf8'),
  );

  if (
    typeof manifest.builtAt !== 'string' ||
    Number.isNaN(Date.parse(manifest.builtAt)) ||
    new Date(manifest.builtAt).toISOString() !== manifest.builtAt
  ) {
    throw new Error('Committed widget manifest must contain a canonical builtAt timestamp');
  }

  return manifest.builtAt;
}

function sanitizedProcessEnvironment(repoRoot) {
  const sanitized = { ...process.env };

  for (const key of Object.keys(sanitized)) {
    if (SENSITIVE_ENV_PATTERN.test(key) || PROVIDER_ENV_PREFIX_PATTERN.test(key)) sanitized[key] = '';
  }

  for (const file of ENV_FILES) {
    try {
      const content = readFileSync(path.join(repoRoot, file), 'utf8');
      for (const line of content.split(/\r?\n/)) {
        const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=/);
        if (match) sanitized[match[1]] = '';
      }
    } catch (error) {
      if (!error || typeof error !== 'object' || error.code !== 'ENOENT') throw error;
    }
  }

  return sanitized;
}

export function createCiEnvironment(repoRoot, { widgetPublicOrigins = false } = {}) {
  const widgetBuildTime = readWidgetBuildTime(repoRoot);
  const environment = {
    ...sanitizedProcessEnvironment(repoRoot),
    ALLOW_LOCAL_STOREFRONT_WIDGET_URL: 'false',
    AWS_ACCESS_KEY_ID: '',
    AWS_EC2_METADATA_DISABLED: 'true',
    AWS_REVIEW_EMAIL_JOURNAL_BUCKET: 'renuvex-ci-review-email-journal',
    AWS_REVIEW_EMAIL_JOURNAL_REGION: 'eu-central-1',
    AWS_REVIEW_IMAGES_PUBLIC_BASE_URL: 'https://media.ci.invalid',
    AWS_SECRET_ACCESS_KEY: '',
    AWS_SESSION_TOKEN: '',
    AWS_SDK_LOAD_CONFIG: '0',
    AWS_WEB_IDENTITY_TOKEN_FILE: '',
    CI: 'true',
    CLIENT_SECRET: CI_ONLY_SECRET,
    CRON_SECRET: CI_ONLY_SECRET,
    DATABASE_URL: 'postgresql://ci:ci@127.0.0.1:1/renuvex_ci?schema=public',
    DIRECT_URL: 'postgresql://ci:ci@127.0.0.1:1/renuvex_ci?schema=public',
    IKAS_APP_DELETED_WEBHOOK_VERIFIED: 'false',
    KV_REST_API_TOKEN: 'ci-only-kv-token',
    KV_REST_API_URL: 'https://redis.ci.invalid',
    MEDIA_JOB_BASE_URL: 'https://app.ci.invalid',
    MUX_SIGNING_KEY_ID: 'ci-only-mux-signing-key',
    MUX_SIGNING_KEY_PRIVATE: CI_ONLY_SECRET,
    MUX_TOKEN_ID: 'ci-only-mux-token-id',
    MUX_TOKEN_SECRET: CI_ONLY_SECRET,
    MUX_VIDEO_QUALITY: 'basic',
    MUX_WEBHOOK_SECRET: CI_ONLY_SECRET,
    NEXT_PUBLIC_ADMIN_URL: 'https://{storeName}.ci.invalid/admin',
    NEXT_PUBLIC_CLIENT_ID: 'ci-only-client-id',
    NEXT_PUBLIC_DEPLOY_URL: 'https://app.ci.invalid',
    NEXT_PUBLIC_GRAPH_API_URL: 'https://api.ci.invalid/graphql',
    NEXT_PUBLIC_SENTRY_DSN: '',
    NEXT_TELEMETRY_DISABLED: '1',
    NODE_ENV: 'production',
    QSTASH_CURRENT_SIGNING_KEY: CI_ONLY_SECRET,
    QSTASH_NEXT_SIGNING_KEY: CI_ONLY_SECRET,
    QSTASH_TOKEN: CI_ONLY_SECRET,
    RENUVEX_CI_BUILD: 'true',
    RENUVEX_WIDGET_BUILD_TIME: widgetBuildTime,
    REVIEW_CURSOR_SECRET: CI_ONLY_SECRET,
    REVIEW_EMAIL_ENABLED: 'false',
    REVIEW_EMAIL_JOURNAL_ACTIVE_RETENTION_DAYS: '35',
    REVIEW_EMAIL_JOURNAL_OBJECT_LOCK_RETENTION_DAYS: '42',
    REVIEW_EMAIL_PII_CURRENT_KEY_VERSION: '1',
    REVIEW_EMAIL_PII_KEYS_JSON: JSON.stringify({
      1: {
        hashSecret: CI_ONLY_SECRET,
        encryptionKeyB64: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=',
      },
    }),
    REVIEW_EMAIL_RETENTION_MODE: 'report',
    REVIEW_IMAGE_PROVIDER: 'aws_s3',
    REVIEW_REQUEST_PUBLIC_BASE_URL: 'https://reviews.ci.invalid',
    REVIEW_REQUEST_SESSION_SECRET: CI_ONLY_SECRET,
    REVIEW_REQUEST_TOKEN_CURRENT_KEY_VERSION: '1',
    REVIEW_REQUEST_TOKEN_KEYS_JSON: JSON.stringify({ 1: CI_ONLY_SECRET }),
    SECRET_COOKIE_PASSWORD: CI_ONLY_SECRET,
    SENTRY_AUTH_TOKEN: '',
    SENTRY_DSN: '',
    STOREFRONT_WIDGET_API_BASE_URL: widgetPublicOrigins ? 'https://app.renuvex.app' : 'https://app.ci.invalid',
    STOREFRONT_WIDGET_BASE_URL: widgetPublicOrigins ? 'https://widget.renuvex.app' : 'https://widget.ci.invalid',
    STOREFRONT_WIDGET_READ_API_BASE_URL: widgetPublicOrigins ? 'https://widget.renuvex.app' : 'https://widget.ci.invalid',
    VERCEL_OIDC_TOKEN: '',
    VIDEO_REVIEWS_ENABLED: 'false',
  };

  return environment;
}
