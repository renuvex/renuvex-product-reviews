import { beforeEach, describe, expect, it, vi } from 'vitest';

const muxClientMock = vi.hoisted(() => ({
  uploadsCreate: vi.fn(),
  createPlaybackId: vi.fn(),
  signPlaybackId: vi.fn(),
  unwrapWebhook: vi.fn(),
}));

vi.mock('@mux/mux-node', () => ({
  default: class Mux {
    video = {
      uploads: {
        create: muxClientMock.uploadsCreate,
      },
      assets: {
        createPlaybackId: muxClientMock.createPlaybackId,
      },
    };
    jwt = {
      signPlaybackId: muxClientMock.signPlaybackId,
    };
    webhooks = {
      unwrap: muxClientMock.unwrapWebhook,
    };
  },
}));

function setMuxEnv() {
  process.env.MUX_TOKEN_ID = 'token-id';
  process.env.MUX_TOKEN_SECRET = 'token-secret';
  delete process.env.MUX_WEBHOOK_SECRET;
  process.env.MUX_SIGNING_KEY_ID = 'signing-key-id';
  process.env.MUX_SIGNING_KEY_PRIVATE = 'private-key';
}

describe('Mux provider adapter', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    setMuxEnv();
  });

  it('creates direct uploads with passthrough identity and no create retry', async () => {
    muxClientMock.uploadsCreate.mockResolvedValue({ id: 'upload-1', url: 'https://upload.mux.test' });
    const { createMuxDirectUpload } = await import('@/lib/media/providers/mux');

    const upload = await createMuxDirectUpload({
      corsOrigin: 'https://merchant.example',
      passthrough: 'session-1',
      videoQuality: 'basic',
    });

    expect(upload).toEqual({ id: 'upload-1', url: 'https://upload.mux.test' });
    expect(muxClientMock.uploadsCreate).toHaveBeenCalledWith(
      {
        cors_origin: 'https://merchant.example',
        timeout: 3600,
        new_asset_settings: {
          playback_policies: ['signed'],
          passthrough: 'session-1',
          video_quality: 'basic',
          max_resolution_tier: '1080p',
          meta: { external_id: 'session-1' },
        },
      },
      { maxRetries: 0 },
    );
  });

  it('creates playback ids with no create retry', async () => {
    muxClientMock.createPlaybackId.mockResolvedValue({ id: 'public-1', policy: 'public' });
    const { createMuxPlaybackId } = await import('@/lib/media/providers/mux');

    await expect(createMuxPlaybackId('asset-1', 'public')).resolves.toEqual({ id: 'public-1', policy: 'public' });
    expect(muxClientMock.createPlaybackId).toHaveBeenCalledWith('asset-1', { policy: 'public' }, { maxRetries: 0 });
  });

  it('signs admin playback tokens without persisting URL state', async () => {
    muxClientMock.signPlaybackId.mockResolvedValue('jwt-token');
    const { signMuxPlaybackToken } = await import('@/lib/media/providers/mux');

    await expect(signMuxPlaybackToken('signed-playback-1', 'thumbnail', 900, { width: '640' })).resolves.toBe('jwt-token');
    expect(muxClientMock.signPlaybackId).toHaveBeenCalledWith('signed-playback-1', {
      type: 'thumbnail',
      keyId: 'signing-key-id',
      keySecret: 'private-key',
      expiration: '900s',
      params: { width: '640' },
    });
  });

  it('verifies webhooks with only the webhook signing secret', async () => {
    delete process.env.MUX_TOKEN_ID;
    delete process.env.MUX_TOKEN_SECRET;
    delete process.env.MUX_SIGNING_KEY_ID;
    delete process.env.MUX_SIGNING_KEY_PRIVATE;
    process.env.MUX_WEBHOOK_SECRET = 'webhook-secret';
    muxClientMock.unwrapWebhook.mockResolvedValue({ id: 'evt-1', type: 'video.asset.ready', data: {} });
    const { unwrapMuxWebhook } = await import('@/lib/media/providers/mux');

    await expect(unwrapMuxWebhook('{"id":"evt-1"}', new Headers({ 'mux-signature': 'sig' }))).resolves.toEqual({
      id: 'evt-1',
      type: 'video.asset.ready',
      data: {},
    });
    expect(muxClientMock.unwrapWebhook).toHaveBeenCalledWith('{"id":"evt-1"}', expect.any(Headers), 'webhook-secret');
  });

  it('trusts only expected Mux delivery hosts over https', async () => {
    const { isTrustedMuxDeliveryUrl, parseMuxPlaybackIdFromDeliveryUrl } = await import('@/lib/media/providers/mux');

    expect(isTrustedMuxDeliveryUrl('https://stream.mux.com/public-1.m3u8')).toBe(true);
    expect(isTrustedMuxDeliveryUrl('https://image.mux.com/public-1/thumbnail.jpg')).toBe(true);
    expect(isTrustedMuxDeliveryUrl('http://stream.mux.com/public-1.m3u8')).toBe(false);
    expect(isTrustedMuxDeliveryUrl('https://evil.example/public-1.m3u8')).toBe(false);
    expect(isTrustedMuxDeliveryUrl('https://stream.mux.com/public-1/master.mp4')).toBe(false);
    expect(isTrustedMuxDeliveryUrl('https://stream.mux.com/public-1.m3u8', 'other-id')).toBe(false);
    expect(parseMuxPlaybackIdFromDeliveryUrl('https://stream.mux.com/public-1.m3u8')).toBe('public-1');
    expect(parseMuxPlaybackIdFromDeliveryUrl('https://image.mux.com/public-1/thumbnail.jpg?width=640')).toBe('public-1');
    expect(parseMuxPlaybackIdFromDeliveryUrl('https://stream.mux.com/public-1/master.mp4')).toBeNull();
    expect(parseMuxPlaybackIdFromDeliveryUrl('https://stream.mux.com/%E0%A4%A.m3u8')).toBeNull();
  });
});
