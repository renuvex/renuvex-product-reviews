import { createHmac } from 'crypto';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const qstashMock = vi.hoisted(() => ({
  verify: vi.fn(),
  processJob: vi.fn(),
}));
const configMock = vi.hoisted(() => ({
  getStreamMediaConfig: vi.fn(),
}));
const sentryMock = vi.hoisted(() => ({
  captureException: vi.fn(),
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
    getStreamMediaConfig: configMock.getStreamMediaConfig,
  };
});

vi.mock('@/lib/media/jobs', () => ({
  processMediaProviderJob: qstashMock.processJob,
}));
vi.mock('@sentry/nextjs', () => sentryMock);

const processingMock = vi.hoisted(() => ({
  findSessionForStreamVideo: vi.fn(),
  applyStreamVideoState: vi.fn(),
}));
const streamProviderMock = vi.hoisted(() => ({
  getStreamVideo: vi.fn(),
}));

vi.mock('@/lib/media/video-processing', () => processingMock);
vi.mock('@/lib/media/providers/cloudflare-stream', () => streamProviderMock);

function streamSignature(rawBody: string, time = Math.floor(Date.now() / 1000)) {
  const digest = createHmac('sha256', 'stream-secret').update(`${time}.${rawBody}`, 'utf8').digest('hex');
  return `time=${time},sig1=${digest}`;
}

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

describe('Cloudflare Stream webhook route contracts', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    configMock.getStreamMediaConfig.mockReturnValue({
      accountId: 'account',
      apiToken: 'token',
      customerCode: 'customer',
      webhookSecret: 'stream-secret',
    });
    processingMock.findSessionForStreamVideo.mockResolvedValue(null);
    streamProviderMock.getStreamVideo.mockResolvedValue(null);
  });

  it('returns 401 for an invalid Stream signature', async () => {
    const { POST } = await import('@/app/api/webhooks/cloudflare-stream/route');
    const response = await POST(new Request('https://app.test/api/webhooks/cloudflare-stream', {
      method: 'POST',
      headers: { 'Webhook-Signature': 'time=1,sig1=invalid' },
      body: '{}',
    }));

    expect(response.status).toBe(401);
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('returns 400 for validly signed malformed JSON', async () => {
    const rawBody = '{';
    const { POST } = await import('@/app/api/webhooks/cloudflare-stream/route');
    const response = await POST(new Request('https://app.test/api/webhooks/cloudflare-stream', {
      method: 'POST',
      headers: { 'Webhook-Signature': streamSignature(rawBody) },
      body: rawBody,
    }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('invalid_json');
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('returns 400 for a signed payload without a video uid', async () => {
    const rawBody = '{}';
    const { POST } = await import('@/app/api/webhooks/cloudflare-stream/route');
    const response = await POST(new Request('https://app.test/api/webhooks/cloudflare-stream', {
      method: 'POST',
      headers: { 'Webhook-Signature': streamSignature(rawBody) },
      body: rawBody,
    }));

    expect(response.status).toBe(400);
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('returns 503 for missing Stream configuration without reporting an operational exception', async () => {
    const { MediaConfigError } = await import('@/lib/media/config');
    configMock.getStreamMediaConfig.mockImplementationOnce(() => {
      throw new MediaConfigError('missing_config', 'Stream is not configured');
    });
    const { POST } = await import('@/app/api/webhooks/cloudflare-stream/route');
    const response = await POST(new Request('https://app.test/api/webhooks/cloudflare-stream', {
      method: 'POST',
      body: '{}',
    }));

    expect(response.status).toBe(503);
    expect(sentryMock.captureException).not.toHaveBeenCalled();
  });

  it('reports unexpected processing failures with the media-job task tags', async () => {
    const error = new Error('processing lookup failed');
    const rawBody = JSON.stringify({ uid: 'stream-1', readyToStream: false, status: { state: 'downloading' } });
    processingMock.findSessionForStreamVideo.mockRejectedValueOnce(error);
    const { POST } = await import('@/app/api/webhooks/cloudflare-stream/route');
    const response = await POST(new Request('https://app.test/api/webhooks/cloudflare-stream', {
      method: 'POST',
      headers: { 'Webhook-Signature': streamSignature(rawBody) },
      body: rawBody,
    }));

    expect(response.status).toBe(500);
    expect(sentryMock.captureException).toHaveBeenCalledOnce();
    expect(sentryMock.captureException).toHaveBeenCalledWith(error, {
      tags: { source: 'media-job', task: 'stream-webhook' },
    });
  });

  it('acknowledges an unmatched valid Stream webhook without mutation', async () => {
    const rawBody = JSON.stringify({ uid: 'stream-1', readyToStream: false, status: { state: 'downloading', pctComplete: 25 } });
    const { POST } = await import('@/app/api/webhooks/cloudflare-stream/route');
    const response = await POST(new Request('https://app.test/api/webhooks/cloudflare-stream', {
      method: 'POST',
      headers: { 'Webhook-Signature': streamSignature(rawBody) },
      body: rawBody,
    }));
    const body = await response.json();

    expect(response.status).toBe(202);
    expect(body).toEqual({ received: true, matched: false });
    expect(processingMock.applyStreamVideoState).not.toHaveBeenCalled();
  });

  it('hydrates a matched webhook from Stream before applying readiness state', async () => {
    const session = { id: '11111111-1111-4111-8111-111111111111' };
    const rawBody = JSON.stringify({
      uid: 'stream-1',
      creator: session.id,
      readyToStream: true,
      status: { state: 'ready', pctComplete: 100 },
    });
    const canonical = {
      uid: 'stream-1',
      readyToStream: true,
      duration: 12,
      size: 5_000_000,
      thumbnail: 'https://videodelivery.net/stream-1/thumbnails/thumbnail.jpg',
      playback: { hls: 'https://videodelivery.net/stream-1/manifest/video.m3u8' },
      status: { state: 'ready', pctComplete: 100 },
    };
    processingMock.findSessionForStreamVideo.mockResolvedValue(session);
    streamProviderMock.getStreamVideo.mockResolvedValue(canonical);
    processingMock.applyStreamVideoState.mockResolvedValue({ ok: true, status: 'ready' });

    const { POST } = await import('@/app/api/webhooks/cloudflare-stream/route');
    const response = await POST(new Request('https://app.test/api/webhooks/cloudflare-stream', {
      method: 'POST',
      headers: { 'Webhook-Signature': streamSignature(rawBody) },
      body: rawBody,
    }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ received: true, matched: true, status: 'ready' });
    expect(streamProviderMock.getStreamVideo).toHaveBeenCalledWith('stream-1');
    expect(processingMock.applyStreamVideoState).toHaveBeenCalledWith(session, canonical);
  });
});
