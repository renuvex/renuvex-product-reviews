import { createSign, generateKeyPairSync } from 'node:crypto';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildSnsStringToSign, verifySesSnsMessage } from '@/lib/email/ses-sns';

const TOPIC_ARN = 'arn:aws:sns:eu-central-1:989086371563:renuvex-review-email-foundation-prod-events';
const SIGNING_CERT_URL = 'https://sns.eu-central-1.amazonaws.com/SimpleNotificationService-test.pem';

function keyPair() {
  const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  return {
    privateKey,
    publicKeyPem: publicKey.export({ type: 'spki', format: 'pem' }).toString(),
  };
}

function signMessage(message: Record<string, unknown>, privateKey: ReturnType<typeof keyPair>['privateKey']): Record<string, unknown> {
  const signer = createSign('RSA-SHA256');
  signer.update(buildSnsStringToSign(message as Parameters<typeof buildSnsStringToSign>[0]), 'utf8');
  signer.end();
  return {
    ...message,
    Signature: signer.sign(privateKey, 'base64'),
  };
}

function notificationMessage(overrides: Record<string, unknown> = {}) {
  const base = {
    Type: 'Notification',
    MessageId: 'sns-message-1',
    TopicArn: TOPIC_ARN,
    Subject: 'Amazon SES Email Event Notification',
    Message: JSON.stringify({
      eventType: 'Bounce',
      mail: {
        messageId: 'ses-message-1',
        destination: ['customer@example.com'],
      },
      bounce: {
        bouncedRecipients: [{ emailAddress: 'customer@example.com' }],
      },
    }),
    Timestamp: '2026-07-09T12:00:00.000Z',
    SignatureVersion: '2',
    SigningCertURL: SIGNING_CERT_URL,
  };
  return { ...base, ...overrides };
}

describe('SES SNS event verification', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('rejects malformed JSON', async () => {
    await expect(verifySesSnsMessage('{', { expectedTopicArn: TOPIC_ARN })).rejects.toMatchObject({
      code: 'invalid_json',
      status: 400,
    });
  });

  it('rejects unsupported SNS message types', async () => {
    await expect(
      verifySesSnsMessage(JSON.stringify({ Type: 'Unknown' }), { expectedTopicArn: TOPIC_ARN }),
    ).rejects.toMatchObject({
      code: 'unsupported_sns_type',
      status: 400,
    });
  });

  it('rejects SignatureVersion values other than 2', async () => {
    const { privateKey, publicKeyPem } = keyPair();
    const signed = signMessage(notificationMessage({ SignatureVersion: '1' }), privateKey);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(publicKeyPem)));

    await expect(
      verifySesSnsMessage(JSON.stringify(signed), { expectedTopicArn: TOPIC_ARN }),
    ).rejects.toMatchObject({
      code: 'unsupported_signature_version',
      status: 401,
    });
  });

  it('rejects unexpected SNS topics', async () => {
    const { privateKey, publicKeyPem } = keyPair();
    const signed = signMessage(notificationMessage(), privateKey);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(publicKeyPem)));

    await expect(
      verifySesSnsMessage(JSON.stringify(signed), {
        expectedTopicArn: 'arn:aws:sns:eu-central-1:989086371563:other-topic',
      }),
    ).rejects.toMatchObject({
      code: 'unexpected_topic',
      status: 401,
    });
  });

  it('rejects non-AWS signing certificate URLs', async () => {
    const { privateKey, publicKeyPem } = keyPair();
    const signed = signMessage(notificationMessage({ SigningCertURL: 'https://example.com/cert.pem' }), privateKey);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(publicKeyPem)));

    await expect(
      verifySesSnsMessage(JSON.stringify(signed), { expectedTopicArn: TOPIC_ARN }),
    ).rejects.toMatchObject({
      code: 'invalid_signing_cert_url',
      status: 401,
    });
  });

  it('rejects invalid signatures', async () => {
    const { privateKey, publicKeyPem } = keyPair();
    const signed = signMessage(notificationMessage(), privateKey);
    signed.Signature = 'not-a-valid-signature';
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(publicKeyPem)));

    await expect(
      verifySesSnsMessage(JSON.stringify(signed), { expectedTopicArn: TOPIC_ARN }),
    ).rejects.toMatchObject({
      code: 'invalid_signature',
      status: 401,
    });
  });

  it('verifies a signed SES notification and returns only sanitized event metadata', async () => {
    const { privateKey, publicKeyPem } = keyPair();
    const signed = signMessage(notificationMessage(), privateKey);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(publicKeyPem)));

    const result = await verifySesSnsMessage(JSON.stringify(signed), { expectedTopicArn: TOPIC_ARN });

    expect(result).toEqual({
      messageId: 'sns-message-1',
      topicArn: TOPIC_ARN,
      type: 'Notification',
      sesEventType: 'BOUNCE',
      sesMessageId: 'ses-message-1',
    });
    expect(JSON.stringify(result)).not.toContain('customer@example.com');
  });

  it('verifies signed subscription confirmations without auto-confirming the URL', async () => {
    const { privateKey, publicKeyPem } = keyPair();
    const subscription = {
      Type: 'SubscriptionConfirmation',
      MessageId: 'sns-subscription-message-1',
      TopicArn: TOPIC_ARN,
      Message: 'You have chosen to subscribe to the topic.',
      Timestamp: '2026-07-09T12:00:00.000Z',
      SignatureVersion: '2',
      SigningCertURL: SIGNING_CERT_URL,
      Token: 'subscription-token',
      SubscribeURL: 'https://sns.eu-central-1.amazonaws.com/?Action=ConfirmSubscription&Token=subscription-token',
    };
    const signed = signMessage(subscription, privateKey);
    const fetchCertificate = vi.fn().mockResolvedValue(new Response(publicKeyPem));

    const result = await verifySesSnsMessage(JSON.stringify(signed), {
      expectedTopicArn: TOPIC_ARN,
      fetchCertificate,
    });

    expect(result.type).toBe('SubscriptionConfirmation');
    expect(fetchCertificate).toHaveBeenCalledWith(new URL(SIGNING_CERT_URL));
  });
});
