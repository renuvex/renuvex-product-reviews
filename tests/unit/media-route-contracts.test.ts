import { beforeEach, describe, expect, it, vi } from 'vitest';

const qstashMock = vi.hoisted(() => ({
  verify: vi.fn(),
  processJob: vi.fn(),
  enqueueMediaProviderJob: vi.fn(),
  dispatchMediaProviderJob: vi.fn(),
}));
const sentryMock = vi.hoisted(() => ({
  captureException: vi.fn(),
}));
const muxMock = vi.hoisted(() => {
  class TestMuxProviderError extends Error {
    constructor(public readonly code: string, message = code, public readonly status?: number) {
      super(message);
      this.name = 'MuxProviderError';
    }
  }
  return {
    unwrapMuxWebhook: vi.fn(),
    MuxProviderError: TestMuxProviderError,
  };
});
const txMock = vi.hoisted(() => ({
  webhookEvent: {
    findUnique: vi.fn(),
    upsert: vi.fn(),
  },
  videoUploadSession: {
    findUnique: vi.fn(),
  },
}));
const prismaMock = vi.hoisted(() => ({
  $transaction: vi.fn((callback: (tx: typeof txMock) => unknown) => callback(txMock)),
  videoUploadSession: {
    findFirst: vi.fn(),
  },
}));

class TestSignatureError extends Error {
  constructor(message = 'invalid signature') {
    super(message);
    this.name = 'SignatureError';
  }
}

vi.mock('@upstash/qstash', () => ({
  SignatureError: TestSignatureError,
  Receiver: class {
    verify(input: unknown) {
      return qstashMock.verify(input);
    }
  },
}));

vi.mock('@/lib/media/config', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/lib/media/config')>();
  return {
    ...original,
    getQStashMediaConfig: () => ({
      token: 'token',
      currentSigningKey: 'current',
      nextSigningKey: 'next',
    }),
  };
});

vi.mock('@/lib/media/jobs', () => ({
  processMediaProviderJob: qstashMock.processJob,
  enqueueMediaProviderJob: qstashMock.enqueueMediaProviderJob,
  dispatchMediaProviderJob: qstashMock.dispatchMediaProviderJob,
}));
vi.mock('@/lib/media/providers/mux', () => muxMock);
vi.mock('@/lib/prisma', () => ({ prisma: prismaMock }));
vi.mock('@sentry/nextjs', () => sentryMock);

describe('media job route contracts', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    qstashMock.verify.mockResolvedValue(true);
    qstashMock.processJob.mockResolvedValue({ processed: false, reason: 'not_claimable' });
  });

  it('returns 401 when the QStash signature is missing', async () => {
    const { POST } = await import('@/app/api/internal/media-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/media-jobs', {
      method: 'POST',
      body: JSON.stringify({ jobId: 'job-1' }),
    }));

    expect(response.status).toBe(401);
    expect(qstashMock.verify).not.toHaveBeenCalled();
  });

  it('returns 401 when Receiver.verify throws SignatureError', async () => {
    qstashMock.verify.mockRejectedValue(new TestSignatureError());
    const { POST } = await import('@/app/api/internal/media-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/media-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'invalid' },
      body: JSON.stringify({ jobId: 'job-1' }),
    }));

    expect(response.status).toBe(401);
    expect(qstashMock.processJob).not.toHaveBeenCalled();
  });

  it('returns 400 for signed malformed JSON', async () => {
    const { POST } = await import('@/app/api/internal/media-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/media-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'valid' },
      body: '{',
    }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('invalid_json');
  });

  it('processes a valid signed job request', async () => {
    const { POST } = await import('@/app/api/internal/media-jobs/route');
    const response = await POST(new Request('https://app.test/api/internal/media-jobs', {
      method: 'POST',
      headers: { 'Upstash-Signature': 'valid' },
      body: JSON.stringify({ jobId: 'job-1' }),
    }));

    expect(response.status).toBe(200);
    expect(qstashMock.processJob).toHaveBeenCalledWith('job-1');
  });
});

describe('Mux webhook route contracts', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    prismaMock.$transaction.mockImplementation((callback: (tx: typeof txMock) => unknown) => callback(txMock));
    prismaMock.videoUploadSession.findFirst.mockResolvedValue(null);
    txMock.webhookEvent.findUnique.mockResolvedValue(null);
    txMock.webhookEvent.upsert.mockResolvedValue({ id: 'webhook-1' });
    txMock.videoUploadSession.findUnique.mockResolvedValue({ storeId: 'store-1', status: 'processing' });
    qstashMock.enqueueMediaProviderJob.mockResolvedValue({ id: 'job-1' });
    qstashMock.dispatchMediaProviderJob.mockResolvedValue(true);
  });

  it('returns 401 when Mux signature verification fails', async () => {
    muxMock.unwrapMuxWebhook.mockRejectedValue(new muxMock.MuxProviderError('invalid_signature', 'invalid'));
    const { POST } = await import('@/app/api/webhooks/mux/route');
    const response = await POST(new Request('https://app.test/api/webhooks/mux', {
      method: 'POST',
      headers: { 'mux-signature': 'bad' },
      body: '{}',
    }));

    expect(response.status).toBe(401);
    expect(txMock.webhookEvent.upsert).not.toHaveBeenCalled();
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('returns 503 when Mux webhook configuration is missing', async () => {
    const { MediaConfigError } = await import('@/lib/media/config');
    muxMock.unwrapMuxWebhook.mockRejectedValue(new MediaConfigError('missing_config', 'MUX_WEBHOOK_SECRET is not configured'));
    const { POST } = await import('@/app/api/webhooks/mux/route');
    const response = await POST(new Request('https://app.test/api/webhooks/mux', {
      method: 'POST',
      body: '{}',
    }));

    expect(response.status).toBe(503);
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('records unmatched Mux events as orphan audit rows without enqueueing work', async () => {
    muxMock.unwrapMuxWebhook.mockResolvedValue({
      id: 'evt-1',
      type: 'video.asset.ready',
      created_at: '2026-06-19T10:00:00.000Z',
      data: { id: 'asset-1', status: 'ready' },
    });
    const { POST } = await import('@/app/api/webhooks/mux/route');
    const response = await POST(new Request('https://app.test/api/webhooks/mux', {
      method: 'POST',
      body: JSON.stringify({ event: true }),
    }));

    expect(response.status).toBe(200);
    expect(txMock.webhookEvent.upsert).toHaveBeenCalledWith(expect.objectContaining({
      create: expect.objectContaining({ status: 'orphan', providerAssetId: 'asset-1' }),
    }));
    expect(qstashMock.enqueueMediaProviderJob).not.toHaveBeenCalled();
  });

  it('deduplicates already processed Mux events', async () => {
    txMock.webhookEvent.findUnique.mockResolvedValue({ status: 'processed' });
    muxMock.unwrapMuxWebhook.mockResolvedValue({
      id: 'evt-1',
      type: 'video.asset.ready',
      created_at: '2026-06-19T10:00:00.000Z',
      data: { id: 'asset-1', passthrough: '11111111-1111-4111-8111-111111111111' },
    });
    const { POST } = await import('@/app/api/webhooks/mux/route');
    const response = await POST(new Request('https://app.test/api/webhooks/mux', {
      method: 'POST',
      body: '{}',
    }));

    expect(response.status).toBe(200);
    expect(txMock.webhookEvent.upsert).not.toHaveBeenCalled();
    expect(qstashMock.enqueueMediaProviderJob).not.toHaveBeenCalled();
  });

  it('turns upload asset-created webhooks into resolve jobs', async () => {
    muxMock.unwrapMuxWebhook.mockResolvedValue({
      id: 'evt-upload-1',
      type: 'video.upload.asset_created',
      created_at: '2026-06-19T10:00:00.000Z',
      data: {
        id: 'upload-1',
        asset_id: 'asset-1',
        status: 'asset_created',
        new_asset_settings: { passthrough: '11111111-1111-4111-8111-111111111111' },
      },
    });
    const { POST } = await import('@/app/api/webhooks/mux/route');
    const response = await POST(new Request('https://app.test/api/webhooks/mux', {
      method: 'POST',
      body: '{}',
    }));

    expect(response.status).toBe(200);
    expect(qstashMock.enqueueMediaProviderJob).toHaveBeenCalledWith(
      txMock,
      expect.objectContaining({
        dedupeKey: 'resolve-video-asset:11111111-1111-4111-8111-111111111111',
        action: 'resolve_video_asset',
        payload: { sessionId: '11111111-1111-4111-8111-111111111111', providerUploadId: 'upload-1' },
      }),
    );
    expect(qstashMock.dispatchMediaProviderJob).toHaveBeenCalledWith('job-1');
  });

  it.each(['aborted', 'failed'])('routes late upload asset-created webhooks for %s sessions into cleanup jobs', async (status) => {
    txMock.videoUploadSession.findUnique.mockResolvedValue({ storeId: 'store-1', status });
    muxMock.unwrapMuxWebhook.mockResolvedValue({
      id: 'evt-upload-cleanup-1',
      type: 'video.upload.asset_created',
      created_at: '2026-06-19T10:00:00.000Z',
      data: {
        id: 'upload-1',
        asset_id: 'asset-1',
        status: 'asset_created',
        new_asset_settings: { passthrough: '11111111-1111-4111-8111-111111111111' },
      },
    });
    const { POST } = await import('@/app/api/webhooks/mux/route');
    const response = await POST(new Request('https://app.test/api/webhooks/mux', {
      method: 'POST',
      body: '{}',
    }));

    expect(response.status).toBe(200);
    expect(qstashMock.enqueueMediaProviderJob).toHaveBeenCalledWith(
      txMock,
      expect.objectContaining({
        dedupeKey: 'cleanup-video-asset:asset-1',
        action: 'cleanup_video',
        payload: {
          sessionId: '11111111-1111-4111-8111-111111111111',
          providerUploadId: 'upload-1',
          providerAssetId: 'asset-1',
        },
      }),
    );
    expect(qstashMock.dispatchMediaProviderJob).toHaveBeenCalledWith('job-1');
  });

  it('turns asset-ready webhooks into reconcile jobs', async () => {
    muxMock.unwrapMuxWebhook.mockResolvedValue({
      id: 'evt-asset-1',
      type: 'video.asset.ready',
      created_at: '2026-06-19T10:00:00.000Z',
      data: {
        id: 'asset-1',
        upload_id: 'upload-1',
        passthrough: '11111111-1111-4111-8111-111111111111',
        status: 'ready',
      },
    });
    const { POST } = await import('@/app/api/webhooks/mux/route');
    const response = await POST(new Request('https://app.test/api/webhooks/mux', {
      method: 'POST',
      body: '{}',
    }));

    expect(response.status).toBe(200);
    expect(qstashMock.enqueueMediaProviderJob).toHaveBeenCalledWith(
      txMock,
      expect.objectContaining({
        dedupeKey: 'reconcile-video:11111111-1111-4111-8111-111111111111',
        action: 'reconcile_video',
        payload: expect.objectContaining({
          sessionId: '11111111-1111-4111-8111-111111111111',
          providerUploadId: 'upload-1',
          providerAssetId: 'asset-1',
          checkIndex: 0,
        }),
      }),
    );
  });
});
