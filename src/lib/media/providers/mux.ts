import Mux from '@mux/mux-node';
import type { Webhooks } from '@mux/mux-node/resources/webhooks';
import { getMuxApiConfig, getMuxWebhookConfig } from '@/lib/media/config';

// Signed direct-upload URL validity window (seconds). The shopper must finish
// the PUT within this; unrelated to video duration. Our DB session TTL is separate.
const UPLOAD_URL_TTL_SECONDS = 3600;

// Provider adapter for Mux (ADR_0032). I/O isolation only - no domain logic.
// Retry policy is per-operation (ADR_0032): idempotent reads/deletes may retry;
// non-idempotent creates (uploads.create / assets.createPlaybackId) pass
// { maxRetries: 0 } because Mux has no idempotency key and uploads.list cannot
// be filtered by passthrough, so a retried create cannot be de-duplicated.

export type MuxUpload = {
  id: string;
  url?: string;
  status: 'waiting' | 'asset_created' | 'errored' | 'cancelled' | 'timed_out';
  asset_id?: string | null;
  error?: { type?: string; message?: string } | null;
};

export type MuxPlaybackId = { id: string; policy?: string };

export type MuxAsset = {
  id: string;
  status: 'preparing' | 'ready' | 'errored';
  duration?: number;
  aspect_ratio?: string;
  playback_ids?: MuxPlaybackId[];
  upload_id?: string;
  passthrough?: string;
  errors?: { type?: string; messages?: string[] } | null;
};

export type MuxVideoQuality = 'basic' | 'plus';
export type MuxWebhookEvent = Webhooks.UnwrapWebhookEvent;

export class MuxProviderError extends Error {
  constructor(public readonly code: string, message: string, public readonly status?: number) {
    super(message);
    this.name = 'MuxProviderError';
  }
}

let cachedClient: Mux | null = null;
let cachedTokenId = '';

function client(): Mux {
  const config = getMuxApiConfig();
  if (!cachedClient || cachedTokenId !== config.tokenId) {
    cachedClient = new Mux({
      tokenId: config.tokenId,
      tokenSecret: config.tokenSecret,
      webhookSecret: null,
      jwtSigningKey: config.signingKeyId,
      jwtPrivateKey: config.signingKeyPrivate,
      maxRetries: 2,
      timeout: 15_000,
      logLevel: 'warn',
    });
    cachedTokenId = config.tokenId;
  }
  return cachedClient;
}

function statusOf(error: unknown): number | undefined {
  const status = (error as { status?: unknown })?.status;
  return typeof status === 'number' ? status : undefined;
}

export function isMuxNotFound(error: unknown): boolean {
  return statusOf(error) === 404;
}

function rethrow(error: unknown): never {
  const status = statusOf(error);
  const message = error instanceof Error ? error.message : 'Mux request failed';
  throw new MuxProviderError(status ? String(status) : 'mux_provider_error', message, status);
}

// --- Direct upload (resumable; the shopper PUTs to upload.url via UpChunk) ----
export async function createMuxDirectUpload(input: {
  corsOrigin: string;
  passthrough: string;
  videoQuality: MuxVideoQuality;
}): Promise<MuxUpload> {
  try {
    // maxRetries: 0 - a retried create could leak a second waiting upload that
    // cannot be looked up by passthrough; an unacknowledged upload self-expires.
    const upload = await client().video.uploads.create(
      {
        cors_origin: input.corsOrigin,
        timeout: UPLOAD_URL_TTL_SECONDS,
        new_asset_settings: {
          playback_policies: ['signed'],
          passthrough: input.passthrough,
          video_quality: input.videoQuality,
          max_resolution_tier: '1080p',
          meta: { external_id: input.passthrough },
        },
      },
      { maxRetries: 0 },
    );
    return upload as unknown as MuxUpload;
  } catch (error) {
    rethrow(error);
  }
}

export async function getMuxUpload(uploadId: string): Promise<MuxUpload> {
  try {
    return (await client().video.uploads.retrieve(uploadId)) as unknown as MuxUpload;
  } catch (error) {
    rethrow(error);
  }
}

export async function cancelMuxUpload(uploadId: string): Promise<void> {
  try {
    await client().video.uploads.cancel(uploadId);
  } catch (error) {
    // Cancel only succeeds while waiting; a finished/cancelled upload is benign.
    if (isMuxNotFound(error) || statusOf(error) === 409) return;
    rethrow(error);
  }
}

// --- Asset lifecycle ----------------------------------------------------------
export async function getMuxAsset(assetId: string): Promise<MuxAsset> {
  try {
    return (await client().video.assets.retrieve(assetId)) as unknown as MuxAsset;
  } catch (error) {
    rethrow(error);
  }
}

export async function deleteMuxAsset(assetId: string): Promise<void> {
  try {
    await client().video.assets.delete(assetId);
  } catch (error) {
    if (isMuxNotFound(error)) return;
    rethrow(error);
  }
}

// --- Playback IDs (moderation gate: signed=pending, public=approved) ----------
export async function createMuxPlaybackId(assetId: string, policy: 'public' | 'signed'): Promise<MuxPlaybackId> {
  try {
    // maxRetries: 0 - a retried create could add a duplicate playback ID; the
    // PID-convergence path (list -> keep canonical -> delete extras) reconciles.
    return (await client().video.assets.createPlaybackId(assetId, { policy }, { maxRetries: 0 })) as unknown as MuxPlaybackId;
  } catch (error) {
    rethrow(error);
  }
}

export async function deleteMuxPlaybackId(assetId: string, playbackId: string): Promise<void> {
  try {
    await client().video.assets.deletePlaybackId(assetId, playbackId);
  } catch (error) {
    if (isMuxNotFound(error)) return;
    rethrow(error);
  }
}

export async function listMuxPlaybackIds(assetId: string): Promise<MuxPlaybackId[]> {
  const asset = await getMuxAsset(assetId);
  return asset.playback_ids ?? [];
}

// --- Signed playback (admin preview only; never persisted) --------------------
export async function signMuxPlaybackToken(
  playbackId: string,
  type: 'video' | 'thumbnail',
  expiresInSeconds = 15 * 60,
  params?: Record<string, string>,
): Promise<string> {
  const config = getMuxApiConfig();
  try {
    return await client().jwt.signPlaybackId(playbackId, {
      type,
      keyId: config.signingKeyId,
      keySecret: config.signingKeyPrivate,
      expiration: `${Math.max(60, Math.min(3600, expiresInSeconds))}s`,
      ...(params ? { params } : {}),
    });
  } catch (error) {
    rethrow(error);
  }
}

export async function unwrapMuxWebhook(rawBody: string, headers: Headers): Promise<MuxWebhookEvent> {
  const config = getMuxWebhookConfig();
  const mux = new Mux({
    tokenId: null,
    tokenSecret: null,
    webhookSecret: config.webhookSecret,
    authorizationToken: null,
    maxRetries: 0,
    timeout: 5_000,
    logLevel: 'warn',
  });
  try {
    return await mux.webhooks.unwrap(rawBody, headers, config.webhookSecret);
  } catch (error) {
    rethrow(error);
  }
}

// --- URL builders + trust ----------------------------------------------------
export function buildMuxPlaybackUrl(publicPlaybackId: string): string {
  return `https://stream.mux.com/${encodeURIComponent(publicPlaybackId)}.m3u8`;
}

export function buildMuxSignedPlaybackUrl(playbackId: string, token: string): string {
  return `https://stream.mux.com/${encodeURIComponent(playbackId)}.m3u8?token=${encodeURIComponent(token)}`;
}

export function buildMuxPosterUrl(playbackId: string, token?: string): string {
  const base = `https://image.mux.com/${encodeURIComponent(playbackId)}/thumbnail.jpg`;
  return token ? `${base}?token=${encodeURIComponent(token)}` : base;
}

export function isTrustedMuxDeliveryUrl(value: string, playbackId?: string | null): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:' || url.username || url.password) return false;
  const host = url.hostname.toLowerCase();
  if (host !== 'stream.mux.com' && host !== 'image.mux.com') return false;
  if (!playbackId) return true;
  return url.pathname.split('/').some((segment) => segment === playbackId || segment === `${playbackId}.m3u8`);
}
