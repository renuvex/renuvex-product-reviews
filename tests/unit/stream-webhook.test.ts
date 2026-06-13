import { createHmac } from 'crypto';
import { describe, expect, it } from 'vitest';
import { verifyStreamWebhookSignature } from '@/lib/media/stream-webhook';

function signature(secret: string, time: number, body: string) {
  const digest = createHmac('sha256', secret).update(`${time}.${body}`, 'utf8').digest('hex');
  return `time=${time},sig1=${digest}`;
}

describe('Cloudflare Stream webhook verification', () => {
  const secret = 'test-stream-webhook-secret';
  const time = 1_750_000_000;
  const body = JSON.stringify({ uid: 'stream-1', readyToStream: true });

  it('accepts an intact raw body inside the freshness window', () => {
    expect(verifyStreamWebhookSignature({
      rawBody: body,
      signature: signature(secret, time, body),
      secret,
      nowMs: (time + 299) * 1000,
    })).toBe(true);
  });

  it('rejects body tampering, wrong secrets, and stale replay attempts', () => {
    const valid = signature(secret, time, body);
    expect(verifyStreamWebhookSignature({ rawBody: `${body} `, signature: valid, secret, nowMs: time * 1000 })).toBe(false);
    expect(verifyStreamWebhookSignature({ rawBody: body, signature: valid, secret: 'wrong', nowMs: time * 1000 })).toBe(false);
    expect(verifyStreamWebhookSignature({ rawBody: body, signature: valid, secret, nowMs: (time + 301) * 1000 })).toBe(false);
  });
});
