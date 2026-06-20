import { beforeEach, describe, expect, it, vi } from 'vitest';

const prismaMock = vi.hoisted(() => ({
  videoUploadSession: { update: vi.fn(), updateMany: vi.fn(), findUnique: vi.fn() },
  $transaction: vi.fn(),
}));
const accessMock = vi.hoisted(() => ({ getVideoFeatureAccess: vi.fn(), verifyVideoReviewTarget: vi.fn() }));
const sessionMock = vi.hoisted(() => ({
  createReservedVideoSession: vi.fn(),
  getVideoSessionByToken: vi.fn(),
}));
const muxMock = vi.hoisted(() => ({
  createMuxDirectUpload: vi.fn(),
}));
const jobsMock = vi.hoisted(() => ({
  cancelSessionAndQueueCleanup: vi.fn(),
  dispatchMediaProviderJob: vi.fn(),
  enqueueMediaProviderJob: vi.fn(),
  failSessionAndQueueCleanup: vi.fn(),
}));
const configMock = vi.hoisted(() => ({
  getMuxApiConfig: vi.fn(),
  getMuxWebhookConfig: vi.fn(),
  getMuxVideoQuality: vi.fn(),
  getQStashMediaConfig: vi.fn(),
}));
const sentryMock = vi.hoisted(() => ({
  captureException: vi.fn(),
}));
const rateLimitMock = vi.hoisted(() => vi.fn());
const VideoQuotaErrorMock = vi.hoisted(() => class VideoQuotaError extends Error {});

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/access', () => accessMock);
vi.mock('@/lib/media/sessions', () => ({ ...sessionMock, VideoQuotaError: VideoQuotaErrorMock }));
vi.mock('@/lib/media/providers/mux', () => muxMock);
vi.mock('@/lib/media/jobs', () => jobsMock);
vi.mock('@sentry/nextjs', () => sentryMock);
vi.mock('@/lib/media/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/media/config')>();
  return {
    ...actual,
    ...configMock,
  };
});
vi.mock('@/lib/public-rate-limit', () => ({
  getClientIp: () => '127.0.0.1',
  checkFixedWindowRateLimit: rateLimitMock,
}));

const SESSION_ID = '11111111-1111-4111-8111-111111111111';

function session(overrides: Record<string, unknown> = {}) {
  return {
    id: SESSION_ID,
    tokenHash: 'hash',
    storeId: 'store-1',
    productId: 'product-1',
    status: 'uploading',
    mimeType: 'video/mp4',
    bytes: 1024,
    fileFingerprint: null,
    provider: 'mux',
    providerUploadId: 'upload-1',
    providerAssetId: null,
    signedPlaybackId: null,
    publicPlaybackId: null,
    publicId: null,
    playbackUrl: null,
    posterUrl: null,
    durationMs: null,
    quotaState: 'reserved',
    reservedMonth: new Date('2026-06-01T00:00:00.000Z'),
    expiresAt: new Date(Date.now() + 60_000),
    consumedAt: null,
    errorCode: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

function expectMediaJobCapture(error: Error, task: string) {
  expect(sentryMock.captureException).toHaveBeenCalledOnce();
  expect(sentryMock.captureException).toHaveBeenCalledWith(error, {
    tags: { source: 'media-job', task },
  });
}

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  configMock.getMuxApiConfig.mockReturnValue({});
  configMock.getMuxWebhookConfig.mockReturnValue({});
  configMock.getMuxVideoQuality.mockReturnValue('basic');
  configMock.getQStashMediaConfig.mockReturnValue({});
  rateLimitMock.mockResolvedValue({ allowed: true, retryAfterSec: 600 });
  accessMock.getVideoFeatureAccess.mockResolvedValue({
    enabled: true,
    reason: 'enabled',
    monthlyLimit: 5,
    reservedCount: 0,
    consumedCount: 0,
    usedCount: 0,
    remainingCount: 5,
  });
  accessMock.verifyVideoReviewTarget.mockResolvedValue({ productId: 'product-1', slug: 'product', name: 'Product' });
  muxMock.createMuxDirectUpload.mockResolvedValue({ id: 'upload-1', url: 'https://storage.googleapis.com/video-upload' });
  jobsMock.dispatchMediaProviderJob.mockResolvedValue(true);
  jobsMock.enqueueMediaProviderJob.mockResolvedValue({ id: 'job-1' });
  jobsMock.failSessionAndQueueCleanup.mockResolvedValue({ id: 'cleanup-job' });
  prismaMock.videoUploadSession.update.mockResolvedValue({});
  prismaMock.videoUploadSession.updateMany.mockResolvedValue({ count: 1 });
  prismaMock.$transaction.mockImplementation(async (callback) => callback({ videoUploadSession: prismaMock.videoUploadSession }));
});

describe('video upload initiate', () => {
  it('returns 400 for malformed JSON without reserving quota or creating provider state', async () => {
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      body: '{',
    }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('invalid_json');
    expect(sessionMock.createReservedVideoSession).not.toHaveBeenCalled();
    expect(muxMock.createMuxDirectUpload).not.toHaveBeenCalled();
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('fails closed when any feature gate is closed', async () => {
    accessMock.getVideoFeatureAccess.mockResolvedValue({ enabled: false, reason: 'quota_disabled', monthlyLimit: 0 });
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: 100 }),
    }));
    expect(response.status).toBe(403);
    expect(sessionMock.createReservedVideoSession).not.toHaveBeenCalled();
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('returns a specific quota error before provider work when the monthly quota is full', async () => {
    accessMock.getVideoFeatureAccess.mockResolvedValue({
      enabled: false,
      reason: 'quota_exceeded',
      monthlyLimit: 5,
      reservedCount: 1,
      consumedCount: 4,
      usedCount: 5,
      remainingCount: 0,
    });
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: 100 }),
    }));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({ error: 'video_quota_exceeded' });
    expect(sessionMock.createReservedVideoSession).not.toHaveBeenCalled();
    expect(muxMock.createMuxDirectUpload).not.toHaveBeenCalled();
  });

  it('returns Retry-After for initiate rate limiting', async () => {
    rateLimitMock.mockResolvedValue({ allowed: false, retryAfterSec: 321 });
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: 100 }),
    }));

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('321');
    await expect(response.json()).resolves.toEqual({ error: 'rate_limited' });
    expect(accessMock.getVideoFeatureAccess).not.toHaveBeenCalled();
  });

  it('keeps the transactional reservation authoritative after a positive capability check', async () => {
    sessionMock.createReservedVideoSession.mockRejectedValue(new VideoQuotaErrorMock());
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: 100 }),
    }));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({ error: 'video_quota_exceeded' });
    expect(accessMock.getVideoFeatureAccess).toHaveBeenCalledOnce();
    expect(muxMock.createMuxDirectUpload).not.toHaveBeenCalled();
  });

  it('returns 503 for missing provider configuration without reporting an operational exception', async () => {
    const { MediaConfigError } = await import('@/lib/media/config');
    configMock.getMuxApiConfig.mockImplementationOnce(() => {
      throw new MediaConfigError('missing_config', 'Mux is not configured');
    });
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: 100 }),
    }));

    expect(response.status).toBe(503);
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('does not require Mux webhook secret to initiate a direct upload', async () => {
    const created = session({ status: 'initiated', providerUploadId: null });
    sessionMock.createReservedVideoSession.mockResolvedValue({
      session: created,
      token: 'opaque-token'.padEnd(43, 'x'),
      expiryJob: { id: 'expiry-job' },
    });
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      headers: { origin: 'https://merchant.example' },
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: created.bytes }),
    }));

    expect(response.status).toBe(201);
    expect(configMock.getMuxApiConfig).toHaveBeenCalledOnce();
    expect(configMock.getMuxWebhookConfig).not.toHaveBeenCalled();
    expect(muxMock.createMuxDirectUpload).toHaveBeenCalledOnce();
  });

  it('reports unexpected initiate failures with the media-job task tags', async () => {
    const error = new Error('access lookup failed');
    accessMock.getVideoFeatureAccess.mockRejectedValueOnce(error);
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: 100 }),
    }));

    expect(response.status).toBe(500);
    expectMediaJobCapture(error, 'video-initiate');
  });

  it('reserves quota before creating a Mux direct upload and returns only client-safe state', async () => {
    const created = session({ status: 'initiated', providerUploadId: null });
    sessionMock.createReservedVideoSession.mockResolvedValue({
      session: created,
      token: 'opaque-token'.padEnd(43, 'x'),
      expiryJob: { id: 'expiry-job' },
    });
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      headers: { origin: 'https://merchant.example' },
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: created.bytes }),
    }));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(sessionMock.createReservedVideoSession).toHaveBeenCalledWith(expect.objectContaining({ monthlyLimit: 5 }));
    expect(muxMock.createMuxDirectUpload).toHaveBeenCalledWith({
      corsOrigin: 'https://merchant.example',
      passthrough: created.id,
      videoQuality: 'basic',
    });
    expect(prismaMock.videoUploadSession.update).toHaveBeenCalledWith({
      where: { id: created.id },
      data: { status: 'uploading', providerUploadId: 'upload-1' },
    });
    expect(jobsMock.dispatchMediaProviderJob).toHaveBeenCalledWith('expiry-job', expect.any(Number));
    expect(body.data).toEqual(expect.objectContaining({
      token: 'opaque-token'.padEnd(43, 'x'),
      uploadUrl: 'https://storage.googleapis.com/video-upload',
      chunkSize: 30_720,
    }));
    expect(body.data).not.toHaveProperty('providerUploadId');
    expect(body.data).not.toHaveProperty('providerAssetId');
  });

  it('queues cleanup when Mux upload creation fails after quota reservation', async () => {
    const created = session({ status: 'initiated', providerUploadId: null });
    const error = new Error('mux failed');
    sessionMock.createReservedVideoSession.mockResolvedValue({
      session: created,
      token: 'opaque-token'.padEnd(43, 'x'),
      expiryJob: { id: 'expiry-job' },
    });
    muxMock.createMuxDirectUpload.mockRejectedValue(error);
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      headers: { origin: 'https://merchant.example' },
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: created.bytes }),
    }));

    expect(response.status).toBe(500);
    expect(jobsMock.failSessionAndQueueCleanup).toHaveBeenCalledWith(created.id, 'initiate_failed', { providerUploadId: null });
    expectMediaJobCapture(error, 'video-initiate');
  });
});

describe('video upload complete and status', () => {
  it('returns 400 for malformed JSON without reporting an operational exception', async () => {
    const { POST } = await import('@/app/api/public/upload/video/complete/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/complete', {
      method: 'POST',
      body: '{',
    }));

    expect(response.status).toBe(400);
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('reports unexpected completion failures with the media-job task tags', async () => {
    const error = new Error('session lookup failed');
    sessionMock.getVideoSessionByToken.mockRejectedValueOnce(error);
    const { POST } = await import('@/app/api/public/upload/video/complete/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/complete', {
      method: 'POST',
      body: JSON.stringify({ token: 'opaque-token' }),
    }));

    expect(response.status).toBe(500);
    expectMediaJobCapture(error, 'video-complete');
  });

  it('claims upload completion atomically and queues Mux asset resolution once', async () => {
    const current = session();
    sessionMock.getVideoSessionByToken.mockResolvedValue(current);
    const { POST } = await import('@/app/api/public/upload/video/complete/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/complete', {
      method: 'POST',
      body: JSON.stringify({ token: 'opaque-token' }),
    }));

    expect(response.status).toBe(200);
    expect(prismaMock.videoUploadSession.updateMany).toHaveBeenCalledWith({
      where: { id: current.id, status: 'uploading' },
      data: { status: 'uploaded' },
    });
    expect(jobsMock.enqueueMediaProviderJob).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
      dedupeKey: `resolve-video-asset:${current.id}`,
      provider: 'mux',
      action: 'resolve_video_asset',
      payload: { sessionId: current.id, providerUploadId: 'upload-1' },
    }));
    expect(jobsMock.dispatchMediaProviderJob).toHaveBeenCalledWith('job-1');
  });

  it('does not enqueue duplicate resolution work when another request already claimed completion', async () => {
    const current = session();
    sessionMock.getVideoSessionByToken.mockResolvedValue(current);
    prismaMock.videoUploadSession.updateMany.mockResolvedValue({ count: 0 });
    const { POST } = await import('@/app/api/public/upload/video/complete/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/complete', {
      method: 'POST',
      body: JSON.stringify({ token: 'opaque-token' }),
    }));

    expect(response.status).toBe(200);
    expect(jobsMock.enqueueMediaProviderJob).not.toHaveBeenCalled();
    expect(jobsMock.dispatchMediaProviderJob).not.toHaveBeenCalled();
  });

  it('is idempotent after processing starts', async () => {
    sessionMock.getVideoSessionByToken.mockResolvedValue(session({ status: 'processing' }));
    const { POST } = await import('@/app/api/public/upload/video/complete/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/complete', {
      method: 'POST',
      body: JSON.stringify({ token: 'opaque-token' }),
    }));
    expect(response.status).toBe(200);
    expect(jobsMock.enqueueMediaProviderJob).not.toHaveBeenCalled();
  });

  it('returns ready idempotently after provider processing completes', async () => {
    sessionMock.getVideoSessionByToken.mockResolvedValue(session({ status: 'ready' }));
    const { POST } = await import('@/app/api/public/upload/video/complete/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/complete', {
      method: 'POST',
      body: JSON.stringify({ token: 'opaque-token' }),
    }));
    await expect(response.json()).resolves.toEqual({ data: { status: 'ready' } });
  });

  it('returns sanitized ready status without playback or provider identifiers', async () => {
    sessionMock.getVideoSessionByToken.mockResolvedValue(session({
      status: 'ready',
      durationMs: 12_000,
      providerUploadId: 'upload-1',
      providerAssetId: 'asset-1',
      signedPlaybackId: 'signed-playback-1',
      posterUrl: 'https://image.mux.com/signed-playback-1/thumbnail.jpg',
      playbackUrl: 'https://stream.mux.com/signed-playback-1.m3u8',
    }));
    const { GET } = await import('@/app/api/public/upload/video/status/route');
    const response = await GET(new Request('https://app.test/api/public/upload/video/status?token=opaque-token'));
    const body = await response.json();
    expect(body.data.status).toBe('ready');
    expect(body.data.durationMs).toBe(12_000);
    expect(body.data.posterUrl).toBeNull();
    expect(body.data).not.toHaveProperty('providerUploadId');
    expect(body.data).not.toHaveProperty('providerAssetId');
    expect(body.data).not.toHaveProperty('signedPlaybackId');
    expect(body.data).not.toHaveProperty('playbackUrl');
  });
});

describe('video upload cancellation', () => {
  it('returns 400 for malformed JSON without reporting an operational exception', async () => {
    const { DELETE } = await import('@/app/api/public/upload/video/route');
    const response = await DELETE(new Request('https://app.test/api/public/upload/video', {
      method: 'DELETE',
      body: '{',
    }));

    expect(response.status).toBe(400);
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('reports unexpected cancellation failures with the media-job task tags', async () => {
    const error = new Error('session lookup failed');
    sessionMock.getVideoSessionByToken.mockRejectedValueOnce(error);
    const { DELETE } = await import('@/app/api/public/upload/video/route');
    const response = await DELETE(new Request('https://app.test/api/public/upload/video', {
      method: 'DELETE',
      body: JSON.stringify({ token: 'opaque-token' }),
    }));

    expect(response.status).toBe(500);
    expectMediaJobCapture(error, 'video-cancel');
  });

  it('routes cancellation through the transactional cleanup outbox', async () => {
    const current = session();
    sessionMock.getVideoSessionByToken.mockResolvedValue(current);
    jobsMock.cancelSessionAndQueueCleanup.mockResolvedValue({ id: 'cleanup-job' });
    const { DELETE } = await import('@/app/api/public/upload/video/route');

    const response = await DELETE(new Request('https://app.test/api/public/upload/video', {
      method: 'DELETE',
      body: JSON.stringify({ token: 'opaque-token' }),
    }));

    expect(response.status).toBe(200);
    expect(jobsMock.cancelSessionAndQueueCleanup).toHaveBeenCalledWith(current.id);
  });
});
