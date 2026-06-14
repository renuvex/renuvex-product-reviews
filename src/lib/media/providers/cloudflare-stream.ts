import { getStreamMediaConfig } from '@/lib/media/config';
import { VIDEO_MAX_BYTES, VIDEO_MAX_DURATION_MS } from '@/lib/media/constants';

export type StreamVideo = {
  uid: string;
  creator?: string;
  duration?: number;
  size?: number;
  readyToStream?: boolean;
  requireSignedURLs?: boolean;
  thumbnail?: string;
  playback?: { hls?: string; dash?: string };
  status?: { state?: string; pctComplete?: number | string; errorReasonCode?: string; errorReasonText?: string };
  meta?: Record<string, unknown>;
};

type CloudflareEnvelope<T> = {
  success: boolean;
  result: T;
  errors?: Array<{ code?: number; message?: string }>;
};

export class StreamProviderError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = 'StreamProviderError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const config = getStreamMediaConfig();
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(config.accountId)}/stream${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.apiToken}`,
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });
  const body = await response.json() as CloudflareEnvelope<T>;
  if (!response.ok || !body.success) {
    const first = body.errors?.[0];
    throw new StreamProviderError(String(first?.code ?? response.status), first?.message ?? 'Cloudflare Stream request failed');
  }
  return body.result;
}

export async function findStreamVideoByCreator(creator: string): Promise<StreamVideo | null> {
  const result = await request<StreamVideo[]>(`?creator=${encodeURIComponent(creator)}`);
  return result.find((item) => item.creator === creator) ?? null;
}

export async function createStreamVideoFromUrl(input: { url: string; creator: string; name: string }) {
  return request<StreamVideo>('/copy', {
    method: 'POST',
    body: JSON.stringify({
      url: input.url,
      creator: input.creator,
      meta: { uploadSessionId: input.creator },
      name: input.name,
      requireSignedURLs: true,
      maxDurationSeconds: Math.floor(VIDEO_MAX_DURATION_MS / 1000),
      maxSizeBytes: VIDEO_MAX_BYTES,
      thumbnailTimestampPct: 0.1,
    }),
  });
}

export async function getStreamVideo(uid: string) {
  return request<StreamVideo>(`/${encodeURIComponent(uid)}`);
}

export async function setStreamVideoPublic(uid: string, isPublic: boolean) {
  return request<StreamVideo>(`/${encodeURIComponent(uid)}`, {
    method: 'POST',
    body: JSON.stringify({ requireSignedURLs: !isPublic }),
  });
}

export async function deleteStreamVideo(uid: string) {
  try {
    await request<unknown>(`/${encodeURIComponent(uid)}`, { method: 'DELETE' });
  } catch (error) {
    if (error instanceof StreamProviderError && (error.code === '1001' || error.code === '404')) return;
    throw error;
  }
}

export async function createStreamPlaybackToken(uid: string, expiresInSeconds = 15 * 60): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + Math.max(60, Math.min(3600, expiresInSeconds));
  const result = await request<{ token: string }>(`/${encodeURIComponent(uid)}/token`, {
    method: 'POST',
    body: JSON.stringify({ exp: expiresAt }),
  });
  return result.token;
}

export function buildSignedStreamPlaybackUrl(uid: string, token: string): string {
  const config = getStreamMediaConfig();
  return `https://customer-${config.customerCode}.cloudflarestream.com/${encodeURIComponent(token)}/manifest/video.m3u8`;
}

export function isTrustedStreamDeliveryUrl(value: string, providerAssetId?: string | null): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== 'https:' || url.username || url.password) return false;
  const host = url.hostname.toLowerCase();
  const trustedHost = host === 'videodelivery.net' || host.endsWith('.videodelivery.net') ||
    host === 'cloudflarestream.com' || host.endsWith('.cloudflarestream.com');
  if (!trustedHost) return false;
  if (!providerAssetId) return true;
  return url.pathname.split('/').some((segment) => segment === providerAssetId);
}
