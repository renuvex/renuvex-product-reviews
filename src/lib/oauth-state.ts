import { createHash, randomBytes } from 'node:crypto';
import { Redis } from '@upstash/redis';
import { z } from 'zod';

export const OAUTH_STATE_TTL_SECONDS = 10 * 60;

const oauthSecretSchema = z.string().regex(/^[a-f0-9]{64}$/);

export const ikasStoreNameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'storeName is required')
  .max(63, 'storeName is invalid')
  .regex(/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/, 'storeName is invalid');

export const oauthStateSchema = z.string().regex(/^[a-f0-9]{64}$/, 'Invalid state parameter');

const oauthStateTransactionSchema = z
  .object({
    version: z.literal(1),
    storeName: ikasStoreNameSchema,
    redirectUri: z.string().url(),
    createdAt: z.string().datetime(),
  })
  .strict();

export type OAuthStateTransactionV1 = z.infer<typeof oauthStateTransactionSchema>;

export class OAuthStateStoreError extends Error {
  readonly code = 'oauth_state_store_unavailable';

  constructor() {
    super('OAuth state storage is unavailable');
    this.name = 'OAuthStateStoreError';
  }
}

let oauthStateRedis: Redis | undefined;

function getOAuthStateRedis(): Redis {
  if (oauthStateRedis) return oauthStateRedis;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new OAuthStateStoreError();

  oauthStateRedis = new Redis({ url, token });
  return oauthStateRedis;
}

function sha256(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function transactionKey(browserBinding: string, state: string): string {
  return `oauth:state:v1:${sha256(browserBinding)}:${sha256(state)}`;
}

function dashboardBootstrapKey(browserBinding: string, storeName: string): string {
  return `oauth:dashboard-bootstrap:v1:${sha256(browserBinding)}:${sha256(storeName)}`;
}

export function createOAuthBrowserBinding(): string {
  return randomBytes(32).toString('hex');
}

export function isOAuthBrowserBinding(value: unknown): value is string {
  return oauthSecretSchema.safeParse(value).success;
}

export async function issueOAuthStateTransaction(input: {
  browserBinding: string;
  storeName: string;
  redirectUri: string;
}): Promise<{ state: string; expiresInSeconds: number }> {
  if (!isOAuthBrowserBinding(input.browserBinding)) throw new OAuthStateStoreError();

  const state = randomBytes(32).toString('hex');
  const transaction = oauthStateTransactionSchema.parse({
    version: 1,
    storeName: input.storeName,
    redirectUri: input.redirectUri,
    createdAt: new Date().toISOString(),
  });

  try {
    const created = await getOAuthStateRedis().set(transactionKey(input.browserBinding, state), transaction, {
      nx: true,
      ex: OAUTH_STATE_TTL_SECONDS,
    });
    if (created !== 'OK') throw new OAuthStateStoreError();
  } catch {
    throw new OAuthStateStoreError();
  }

  return { state, expiresInSeconds: OAUTH_STATE_TTL_SECONDS };
}

export async function consumeOAuthStateTransaction(input: {
  browserBinding: string;
  state: string;
}): Promise<OAuthStateTransactionV1 | null> {
  if (!isOAuthBrowserBinding(input.browserBinding) || !oauthStateSchema.safeParse(input.state).success) return null;

  let stored: unknown;
  try {
    stored = await getOAuthStateRedis().getdel<unknown>(transactionKey(input.browserBinding, input.state));
  } catch {
    throw new OAuthStateStoreError();
  }

  const parsed = oauthStateTransactionSchema.safeParse(stored);
  return parsed.success ? parsed.data : null;
}

export async function claimOAuthDashboardBootstrap(input: {
  browserBinding: string;
  storeName: string;
}): Promise<boolean> {
  const storeName = ikasStoreNameSchema.safeParse(input.storeName);
  if (!isOAuthBrowserBinding(input.browserBinding) || !storeName.success) return false;

  try {
    const created = await getOAuthStateRedis().set(
      dashboardBootstrapKey(input.browserBinding, storeName.data),
      { version: 1, createdAt: new Date().toISOString() },
      {
        nx: true,
        ex: OAUTH_STATE_TTL_SECONDS,
      },
    );
    return created === 'OK';
  } catch {
    throw new OAuthStateStoreError();
  }
}

export async function clearOAuthDashboardBootstrap(input: {
  browserBinding: string;
  storeName: string;
}): Promise<void> {
  const storeName = ikasStoreNameSchema.safeParse(input.storeName);
  if (!isOAuthBrowserBinding(input.browserBinding) || !storeName.success) return;

  try {
    await getOAuthStateRedis().del(dashboardBootstrapKey(input.browserBinding, storeName.data));
  } catch {
    throw new OAuthStateStoreError();
  }
}
