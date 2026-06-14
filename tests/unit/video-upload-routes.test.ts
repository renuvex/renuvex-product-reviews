import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VIDEO_MULTIPART_PART_BYTES } from '@/lib/media/constants';

const prismaMock = vi.hoisted(() => ({
  videoUploadSession: { update: vi.fn(), updateMany: vi.fn(), findUnique: vi.fn() },
  $transaction: vi.fn(),
}));
const accessMock = vi.hoisted(() => ({ getVideoFeatureAccess: vi.fn(), verifyVideoReviewTarget: vi.fn() }));
const sessionMock = vi.hoisted(() => ({
  createReservedVideoSession: vi.fn(),
  getVideoSessionByToken: vi.fn(),
  markVideoSessionFailed: vi.fn(),
}));
const r2Mock = vi.hoisted(() => ({
  createVideoMultipartUpload: vi.fn(),
  signVideoUploadParts: vi.fn(),
  listVideoUploadParts: vi.fn(),
  completeVideoMultipartUpload: vi.fn(),
  headVideoMaster: vi.fn(),
  readVideoMasterPrefix: vi.fn(),
  abortVideoMultipartUpload: vi.fn(),
}));
const jobsMock = vi.hoisted(() => ({
  cancelSessionAndQueueCleanup: vi.fn(),
  dispatchMediaProviderJob: vi.fn(),
  enqueueMediaProviderJob: vi.fn(),
  failSessionAndQueueCleanup: vi.fn(),
}));

vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@/lib/media/access', () => accessMock);
vi.mock('@/lib/media/sessions', () => ({ ...sessionMock, VideoQuotaError: class VideoQuotaError extends Error {} }));
vi.mock('@/lib/media/providers/r2', () => r2Mock);
vi.mock('@/lib/media/jobs', () => jobsMock);
vi.mock('@/lib/media/config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/media/config')>();
  return {
    ...actual,
    getR2MediaConfig: vi.fn(() => ({})),
    getStreamMediaConfig: vi.fn(() => ({})),
    getQStashMediaConfig: vi.fn(() => ({})),
  };
});
vi.mock('@/lib/public-rate-limit', () => ({
  getClientIp: () => '127.0.0.1',
  checkFixedWindowRateLimit: vi.fn(async () => ({ allowed: true })),
}));

function session(overrides: Record<string, unknown> = {}) {
  return {
    id: '11111111-1111-4111-8111-111111111111',
    tokenHash: 'hash',
    storeId: 'store-1',
    productId: 'product-1',
    status: 'uploading',
    mimeType: 'video/mp4',
    bytes: VIDEO_MULTIPART_PART_BYTES + 5,
    fileFingerprint: null,
    r2UploadId: 'upload-1',
    masterObjectKey: 'review-videos/stores/store-1/session/master',
    ingestObjectKey: null,
    streamUid: null,
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

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  accessMock.getVideoFeatureAccess.mockResolvedValue({ enabled: true, reason: 'enabled', monthlyLimit: 5 });
  accessMock.verifyVideoReviewTarget.mockResolvedValue({ productId: 'product-1', slug: 'product', name: 'Product' });
  jobsMock.dispatchMediaProviderJob.mockResolvedValue(true);
  jobsMock.enqueueMediaProviderJob.mockResolvedValue({ id: 'job-1' });
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
    expect(r2Mock.createVideoMultipartUpload).not.toHaveBeenCalled();
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
  });

  it('reserves quota before creating a multipart upload and returns only client-safe state', async () => {
    const created = session({ status: 'initiated', r2UploadId: null });
    sessionMock.createReservedVideoSession.mockResolvedValue({ session: created, token: 'opaque-token'.padEnd(43, 'x') });
    r2Mock.createVideoMultipartUpload.mockResolvedValue('upload-1');
    const { POST } = await import('@/app/api/public/upload/video/initiate/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/initiate', {
      method: 'POST',
      body: JSON.stringify({ storeId: 'store-1', productId: 'product-1', mimeType: 'video/mp4', bytes: created.bytes }),
    }));
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(sessionMock.createReservedVideoSession).toHaveBeenCalledWith(expect.objectContaining({ monthlyLimit: 5 }));
    expect(r2Mock.createVideoMultipartUpload).toHaveBeenCalledWith(created.masterObjectKey, 'video/mp4');
    expect(body.data).toEqual(expect.objectContaining({ partSize: VIDEO_MULTIPART_PART_BYTES, partCount: 2, maxParallelParts: 3 }));
    expect(body.data).not.toHaveProperty('uploadId');
    expect(body.data).not.toHaveProperty('masterObjectKey');
  });
});

describe('video multipart parts', () => {
  it('lists provider parts and signs only missing parts by default', async () => {
    sessionMock.getVideoSessionByToken.mockResolvedValue(session());
    r2Mock.listVideoUploadParts.mockResolvedValue([{ partNumber: 1, etag: '"one"', size: VIDEO_MULTIPART_PART_BYTES }]);
    r2Mock.signVideoUploadParts.mockImplementation(async ({ partNumbers }) => partNumbers.map((partNumber: number) => ({ partNumber, uploadUrl: `https://r2.test/${partNumber}` })));
    const { POST } = await import('@/app/api/public/upload/video/parts/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/parts', {
      method: 'POST',
      body: JSON.stringify({ token: 'opaque-token' }),
    }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(r2Mock.signVideoUploadParts).toHaveBeenCalledWith(expect.objectContaining({ partNumbers: [2] }));
    expect(body.data.completed).toEqual([{ partNumber: 1, etag: '"one"', size: VIDEO_MULTIPART_PART_BYTES }]);
  });

  it('does not re-sign already completed parts even when explicitly requested', async () => {
    sessionMock.getVideoSessionByToken.mockResolvedValue(session());
    r2Mock.listVideoUploadParts.mockResolvedValue([{ partNumber: 1, etag: '"one"', size: VIDEO_MULTIPART_PART_BYTES }]);
    r2Mock.signVideoUploadParts.mockImplementation(async ({ partNumbers }) => partNumbers.map((partNumber: number) => ({ partNumber, uploadUrl: `https://r2.test/${partNumber}` })));
    const { POST } = await import('@/app/api/public/upload/video/parts/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/parts', {
      method: 'POST',
      body: JSON.stringify({ token: 'opaque-token', partNumbers: [1, 2] }),
    }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(r2Mock.signVideoUploadParts).toHaveBeenCalledWith(expect.objectContaining({ partNumbers: [2] }));
    expect(body.data.parts).toEqual([{ partNumber: 2, uploadUrl: 'https://r2.test/2' }]);
  });
});

describe('video upload complete and status', () => {
  it('validates the exact R2 part list and queues Stream processing once', async () => {
    const current = session();
    sessionMock.getVideoSessionByToken.mockResolvedValue(current);
    r2Mock.listVideoUploadParts.mockResolvedValue([
      { partNumber: 1, etag: '"one"', size: VIDEO_MULTIPART_PART_BYTES },
      { partNumber: 2, etag: '"two"', size: 5 },
    ]);
    r2Mock.headVideoMaster.mockResolvedValue({ bytes: current.bytes, mimeType: 'video/mp4' });
    r2Mock.readVideoMasterPrefix.mockResolvedValue(Uint8Array.from([0, 0, 0, 24, 102, 116, 121, 112, 105, 115, 111, 109]));
    const { POST } = await import('@/app/api/public/upload/video/complete/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/complete', {
      method: 'POST',
      body: JSON.stringify({ token: 'opaque-token', parts: [{ partNumber: 1, etag: '"one"' }, { partNumber: 2, etag: '"two"' }] }),
    }));

    expect(response.status).toBe(200);
    expect(r2Mock.completeVideoMultipartUpload).toHaveBeenCalledOnce();
    expect(jobsMock.enqueueMediaProviderJob).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
      dedupeKey: `prepare-stream:${current.id}`,
    }));
  });

  it('claims complete atomically so concurrent duplicates do not complete R2 twice', async () => {
    const current = session();
    sessionMock.getVideoSessionByToken.mockResolvedValue(current);
    r2Mock.listVideoUploadParts.mockResolvedValue([
      { partNumber: 1, etag: '"one"', size: VIDEO_MULTIPART_PART_BYTES },
      { partNumber: 2, etag: '"two"', size: 5 },
    ]);
    r2Mock.headVideoMaster.mockResolvedValue({ bytes: current.bytes, mimeType: 'video/mp4' });
    r2Mock.readVideoMasterPrefix.mockResolvedValue(Uint8Array.from([0, 0, 0, 24, 102, 116, 121, 112, 105, 115, 111, 109]));
    prismaMock.videoUploadSession.updateMany
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 0 });
    prismaMock.videoUploadSession.findUnique.mockResolvedValue({ status: 'completing' });
    let releaseComplete: (() => void) | undefined;
    r2Mock.completeVideoMultipartUpload.mockImplementationOnce(() => new Promise<void>((resolve) => {
      releaseComplete = resolve;
    }));
    const { POST } = await import('@/app/api/public/upload/video/complete/route');
    const requestBody = JSON.stringify({ token: 'opaque-token', parts: [{ partNumber: 1, etag: '"one"' }, { partNumber: 2, etag: '"two"' }] });
    const first = POST(new Request('https://app.test/api/public/upload/video/complete', { method: 'POST', body: requestBody }));
    const second = POST(new Request('https://app.test/api/public/upload/video/complete', { method: 'POST', body: requestBody }));

    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(r2Mock.completeVideoMultipartUpload).toHaveBeenCalledTimes(1);
    releaseComplete?.();
    const [firstResponse, secondResponse] = await Promise.all([first, second]);

    expect(firstResponse.status).toBe(200);
    expect(secondResponse.status).toBe(200);
    expect(r2Mock.completeVideoMultipartUpload).toHaveBeenCalledOnce();
  });

  it('is idempotent after processing starts and never completes R2 twice', async () => {
    sessionMock.getVideoSessionByToken.mockResolvedValue(session({ status: 'processing' }));
    const { POST } = await import('@/app/api/public/upload/video/complete/route');
    const response = await POST(new Request('https://app.test/api/public/upload/video/complete', {
      method: 'POST',
      body: JSON.stringify({ token: 'opaque-token', parts: [{ partNumber: 1, etag: '"one"' }] }),
    }));
    expect(response.status).toBe(200);
    expect(r2Mock.completeVideoMultipartUpload).not.toHaveBeenCalled();
  });

  it('returns sanitized processing status without playback or provider identifiers', async () => {
    sessionMock.getVideoSessionByToken.mockResolvedValue(session({ status: 'processing', streamUid: 'secret-provider-id' }));
    const { GET } = await import('@/app/api/public/upload/video/status/route');
    const response = await GET(new Request('https://app.test/api/public/upload/video/status?token=opaque-token'));
    const body = await response.json();
    expect(body.data.status).toBe('processing');
    expect(body.data).not.toHaveProperty('streamUid');
    expect(body.data).not.toHaveProperty('playbackUrl');
  });
});

describe('video upload cancellation', () => {
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
    expect(r2Mock.abortVideoMultipartUpload).not.toHaveBeenCalled();
  });
});
