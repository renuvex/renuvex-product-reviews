import { createSign, generateKeyPairSync } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { buildSnsStringToSign, type SnsMessageEnvelope } from '@/lib/email/ses-sns';

const persistMock = vi.hoisted(() => ({
  persistSesEmailEvent: vi.fn().mockResolvedValue({ status: 'created', matchedAttempt: false }),
}));

vi.mock('@/lib/prisma', () => ({ prisma: {} }));
vi.mock('@/lib/review-email/ses-events', () => persistMock);

const TOPIC_ARN = 'arn:aws:sns:eu-central-1:989086371563:renuvex-review-email-foundation-prod-events';
const SIGNING_CERT_URL = 'https://sns.eu-central-1.amazonaws.com/SimpleNotificationService-test.pem';

function signedNotification() {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const envelope: SnsMessageEnvelope = {
    Type: 'Notification',
    MessageId: 'sns-message-route-1',
    TopicArn: TOPIC_ARN,
    Subject: 'Amazon SES Email Event Notification',
    Message: JSON.stringify({
      eventType: 'Delivery',
      mail: {
        messageId: 'ses-message-route-1',
        destination: ['recipient@example.com'],
      },
    }),
    Timestamp: '2026-07-09T12:00:00.000Z',
    SignatureVersion: '2',
    SigningCertURL: SIGNING_CERT_URL,
    Signature: '',
  };

  const signer = createSign('RSA-SHA256');
  signer.update(buildSnsStringToSign(envelope), 'utf8');
  signer.end();
  envelope.Signature = signer.sign(privateKey, 'base64');

  return {
    envelope,
    publicKeyPem: publicKey.export({ type: 'spki', format: 'pem' }).toString(),
  };
}

describe('SES email event route', () => {
  const originalTopicArn = process.env.AWS_SES_EVENTS_SNS_TOPIC_ARN;

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    process.env.AWS_SES_EVENTS_SNS_TOPIC_ARN = TOPIC_ARN;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    if (originalTopicArn === undefined) {
      delete process.env.AWS_SES_EVENTS_SNS_TOPIC_ARN;
    } else {
      process.env.AWS_SES_EVENTS_SNS_TOPIC_ARN = originalTopicArn;
    }
  });

  it('fails closed when the expected SNS topic env is missing', async () => {
    delete process.env.AWS_SES_EVENTS_SNS_TOPIC_ARN;
    const { POST } = await import('@/app/api/internal/email-events/ses/route');
    const response = await POST(new Request('https://app.test/api/internal/email-events/ses', {
      method: 'POST',
      body: '{}',
    }));
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.error).toBe('ses_events_not_configured');
  });

  it('returns 400 for malformed JSON when configured', async () => {
    const { POST } = await import('@/app/api/internal/email-events/ses/route');
    const response = await POST(new Request('https://app.test/api/internal/email-events/ses', {
      method: 'POST',
      body: '{',
    }));
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toBe('invalid_json');
  });

  it('returns 401 for SNS messages from an unexpected topic', async () => {
    const { envelope, publicKeyPem } = signedNotification();
    envelope.TopicArn = 'arn:aws:sns:eu-central-1:989086371563:other-topic';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(publicKeyPem)));

    const { POST } = await import('@/app/api/internal/email-events/ses/route');
    const response = await POST(new Request('https://app.test/api/internal/email-events/ses', {
      method: 'POST',
      body: JSON.stringify(envelope),
    }));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.error).toBe('unexpected_topic');
  });

  it('accepts a valid signed SES notification without returning recipient PII', async () => {
    const { envelope, publicKeyPem } = signedNotification();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(publicKeyPem)));

    const { POST } = await import('@/app/api/internal/email-events/ses/route');
    const response = await POST(new Request('https://app.test/api/internal/email-events/ses', {
      method: 'POST',
      body: JSON.stringify(envelope),
    }));
    const body = await response.json();

    expect(response.status).toBe(202);
    expect(body.data).toEqual({
      status: 'accepted',
      messageType: 'Notification',
      messageId: 'sns-message-route-1',
      sesEventType: 'DELIVERY',
      sesMessageId: 'ses-message-route-1',
      persisted: { status: 'created', matchedAttempt: false },
    });
    expect(persistMock.persistSesEmailEvent).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(body)).not.toContain('recipient@example.com');
  });
});
