import { createVerify } from 'node:crypto';
import { REVIEW_EMAIL_ATTEMPT_TAG_NAME } from '@/lib/review-email/constants';

const SUPPORTED_SNS_TYPES = new Set([
  'Notification',
  'SubscriptionConfirmation',
  'UnsubscribeConfirmation',
]);

const SES_EVENT_TYPE_ALIASES = new Map([
  ['SEND', 'SEND'],
  ['REJECT', 'REJECT'],
  ['BOUNCE', 'BOUNCE'],
  ['COMPLAINT', 'COMPLAINT'],
  ['DELIVERY', 'DELIVERY'],
  ['DELIVERYDELAY', 'DELIVERY_DELAY'],
  ['DELIVERY_DELAY', 'DELIVERY_DELAY'],
  ['RENDERINGFAILURE', 'RENDERING_FAILURE'],
  ['RENDERING_FAILURE', 'RENDERING_FAILURE'],
]);

export type SesSnsMessageType = 'Notification' | 'SubscriptionConfirmation' | 'UnsubscribeConfirmation';

export interface VerifiedSesSnsMessage {
  messageId: string;
  topicArn: string;
  type: SesSnsMessageType;
  sesEventType: string | null;
  sesMessageId: string | null;
  attemptCorrelationId: string | null;
  bounceType: string | null;
  bounceSubType: string | null;
  complaintFeedbackType: string | null;
  providerTimestamp: Date | null;
}

export interface VerifySesSnsMessageOptions {
  expectedTopicArn: string;
  fetchCertificate?: typeof fetch;
}

export class SesSnsMessageError extends Error {
  constructor(
    public readonly code: string,
    message = code,
    public readonly status = 400,
  ) {
    super(message);
    this.name = 'SesSnsMessageError';
  }
}

export type SnsMessageEnvelope = {
  Type: SesSnsMessageType;
  MessageId: string;
  TopicArn: string;
  Message: string;
  Timestamp: string;
  SignatureVersion: string;
  Signature: string;
  SigningCertURL: string;
  Subject?: string;
  Token?: string;
  SubscribeURL?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  if (typeof value !== 'string' || value.length === 0) {
    throw new SesSnsMessageError('invalid_sns_message', `Missing SNS field: ${key}`);
  }
  return value;
}

function parseSnsEnvelope(rawBody: string): SnsMessageEnvelope {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    throw new SesSnsMessageError('invalid_json', 'Invalid JSON body');
  }

  if (!isRecord(parsed)) {
    throw new SesSnsMessageError('invalid_sns_message', 'SNS body must be an object');
  }

  const type = requireString(parsed, 'Type');
  if (!SUPPORTED_SNS_TYPES.has(type)) {
    throw new SesSnsMessageError('unsupported_sns_type', 'Unsupported SNS message type');
  }

  const envelope: SnsMessageEnvelope = {
    Type: type as SesSnsMessageType,
    MessageId: requireString(parsed, 'MessageId'),
    TopicArn: requireString(parsed, 'TopicArn'),
    Message: requireString(parsed, 'Message'),
    Timestamp: requireString(parsed, 'Timestamp'),
    SignatureVersion: requireString(parsed, 'SignatureVersion'),
    Signature: requireString(parsed, 'Signature'),
    SigningCertURL: requireString(parsed, 'SigningCertURL'),
  };

  if (typeof parsed.Subject === 'string' && parsed.Subject.length > 0) {
    envelope.Subject = parsed.Subject;
  }

  if (envelope.Type === 'SubscriptionConfirmation' || envelope.Type === 'UnsubscribeConfirmation') {
    envelope.Token = requireString(parsed, 'Token');
    envelope.SubscribeURL = requireString(parsed, 'SubscribeURL');
  }

  if (!Number.isFinite(Date.parse(envelope.Timestamp))) {
    throw new SesSnsMessageError('invalid_timestamp', 'SNS timestamp is invalid');
  }

  return envelope;
}

function snsTopicRegion(topicArn: string): string {
  const parts = topicArn.split(':');
  if (parts.length < 6 || parts[2] !== 'sns' || !parts[3]) {
    throw new SesSnsMessageError('invalid_topic_arn', 'SNS topic ARN is invalid', 401);
  }
  return parts[3];
}

function validateSigningCertUrl(signingCertUrl: string, expectedTopicArn: string): URL {
  let url: URL;
  try {
    url = new URL(signingCertUrl);
  } catch {
    throw new SesSnsMessageError('invalid_signing_cert_url', 'SNS signing certificate URL is invalid', 401);
  }

  const expectedHost = `sns.${snsTopicRegion(expectedTopicArn)}.amazonaws.com`;
  if (
    url.protocol !== 'https:' ||
    url.hostname.toLowerCase() !== expectedHost ||
    url.username ||
    url.password ||
    !url.pathname.startsWith('/SimpleNotificationService-') ||
    !url.pathname.endsWith('.pem')
  ) {
    throw new SesSnsMessageError('invalid_signing_cert_url', 'SNS signing certificate URL is not trusted', 401);
  }

  return url;
}

export function buildSnsStringToSign(envelope: SnsMessageEnvelope): string {
  if (envelope.Type === 'Notification') {
    const fields: string[] = [
      'Message',
      envelope.Message,
      'MessageId',
      envelope.MessageId,
    ];
    if (envelope.Subject) {
      fields.push('Subject', envelope.Subject);
    }
    fields.push(
      'Timestamp',
      envelope.Timestamp,
      'TopicArn',
      envelope.TopicArn,
      'Type',
      envelope.Type,
    );
    return `${fields.join('\n')}\n`;
  }

  return [
    'Message',
    envelope.Message,
    'MessageId',
    envelope.MessageId,
    'SubscribeURL',
    envelope.SubscribeURL ?? '',
    'Timestamp',
    envelope.Timestamp,
    'Token',
    envelope.Token ?? '',
    'TopicArn',
    envelope.TopicArn,
    'Type',
    envelope.Type,
    '',
  ].join('\n');
}

async function fetchSigningCertificate(url: URL, fetchCertificate: typeof fetch): Promise<string> {
  const response = await fetchCertificate(url);
  if (!response.ok) {
    throw new SesSnsMessageError('signing_cert_fetch_failed', 'SNS signing certificate fetch failed', 401);
  }

  const certificate = await response.text();
  if (!certificate.includes('-----BEGIN')) {
    throw new SesSnsMessageError('invalid_signing_certificate', 'SNS signing certificate is invalid', 401);
  }
  return certificate;
}

function verifySignature(envelope: SnsMessageEnvelope, certificatePem: string): boolean {
  const verifier = createVerify('RSA-SHA256');
  verifier.update(buildSnsStringToSign(envelope), 'utf8');
  verifier.end();
  return verifier.verify(certificatePem, envelope.Signature, 'base64');
}

type NormalizedSesEvent = Pick<
  VerifiedSesSnsMessage,
  | 'sesEventType'
  | 'sesMessageId'
  | 'attemptCorrelationId'
  | 'bounceType'
  | 'bounceSubType'
  | 'complaintFeedbackType'
  | 'providerTimestamp'
>;

const EMPTY_SES_EVENT: NormalizedSesEvent = {
  sesEventType: null,
  sesMessageId: null,
  attemptCorrelationId: null,
  bounceType: null,
  bounceSubType: null,
  complaintFeedbackType: null,
  providerTimestamp: null,
};

function boundedText(record: Record<string, unknown> | null, key: string, maxLength = 64): string | null {
  const value = record?.[key];
  return typeof value === 'string' && value.length > 0 && value.length <= maxLength ? value : null;
}

function eventTimestamp(parsed: Record<string, unknown>, eventType: string | null): Date | null {
  const sectionName = eventType === 'BOUNCE'
    ? 'bounce'
    : eventType === 'COMPLAINT'
      ? 'complaint'
      : eventType === 'DELIVERY'
        ? 'delivery'
        : eventType === 'DELIVERY_DELAY'
          ? 'deliveryDelay'
          : null;
  const section = sectionName && isRecord(parsed[sectionName]) ? parsed[sectionName] as Record<string, unknown> : null;
  const mail = isRecord(parsed.mail) ? parsed.mail as Record<string, unknown> : null;
  const raw = boundedText(section, 'timestamp', 64) ?? boundedText(mail, 'timestamp', 64);
  if (!raw) return null;
  const timestamp = new Date(raw);
  return Number.isNaN(timestamp.getTime()) ? null : timestamp;
}

function attemptCorrelationFromTags(mail: Record<string, unknown> | null): string | null {
  const tags = mail && isRecord(mail.tags) ? mail.tags as Record<string, unknown> : null;
  const values = tags?.[REVIEW_EMAIL_ATTEMPT_TAG_NAME];
  if (!Array.isArray(values) || values.length !== 1) return null;
  const value = values[0];
  return typeof value === 'string' && /^[a-f0-9]{32}$/.test(value) ? value : null;
}

function normalizeSesEventType(message: string): NormalizedSesEvent {
  try {
    const parsed = JSON.parse(message) as unknown;
    if (!isRecord(parsed)) {
      return EMPTY_SES_EVENT;
    }

    const rawEventType = typeof parsed.eventType === 'string' ? parsed.eventType : null;
    const normalizedKey = rawEventType?.replace(/[^A-Za-z]/g, '').toUpperCase() ?? '';
    const sesEventType = SES_EVENT_TYPE_ALIASES.get(normalizedKey) ?? null;

    const mail = isRecord(parsed.mail) ? parsed.mail as Record<string, unknown> : null;
    const rawMessageId = mail && typeof mail.messageId === 'string' ? mail.messageId : null;
    const sesMessageId = rawMessageId && rawMessageId.length <= 256 ? rawMessageId : null;
    const bounce = isRecord(parsed.bounce) ? parsed.bounce as Record<string, unknown> : null;
    const complaint = isRecord(parsed.complaint) ? parsed.complaint as Record<string, unknown> : null;

    return {
      sesEventType,
      sesMessageId,
      attemptCorrelationId: attemptCorrelationFromTags(mail),
      bounceType: boundedText(bounce, 'bounceType'),
      bounceSubType: boundedText(bounce, 'bounceSubType'),
      complaintFeedbackType: boundedText(complaint, 'complaintFeedbackType'),
      providerTimestamp: eventTimestamp(parsed, sesEventType),
    };
  } catch {
    return EMPTY_SES_EVENT;
  }
}

export async function verifySesSnsMessage(
  rawBody: string,
  options: VerifySesSnsMessageOptions,
): Promise<VerifiedSesSnsMessage> {
  if (!options.expectedTopicArn) {
    throw new SesSnsMessageError('missing_expected_topic', 'SES SNS topic ARN is not configured', 503);
  }

  const envelope = parseSnsEnvelope(rawBody);

  if (envelope.TopicArn !== options.expectedTopicArn) {
    throw new SesSnsMessageError('unexpected_topic', 'SNS topic ARN does not match the configured SES topic', 401);
  }

  if (envelope.SignatureVersion !== '2') {
    throw new SesSnsMessageError('unsupported_signature_version', 'SNS SignatureVersion must be 2', 401);
  }

  const signingCertUrl = validateSigningCertUrl(envelope.SigningCertURL, options.expectedTopicArn);
  const fetchCertificate = options.fetchCertificate ?? fetch;
  const certificatePem = await fetchSigningCertificate(signingCertUrl, fetchCertificate);

  if (!verifySignature(envelope, certificatePem)) {
    throw new SesSnsMessageError('invalid_signature', 'SNS signature is invalid', 401);
  }

  const event = envelope.Type === 'Notification'
    ? normalizeSesEventType(envelope.Message)
    : EMPTY_SES_EVENT;

  return {
    messageId: envelope.MessageId,
    topicArn: envelope.TopicArn,
    type: envelope.Type,
    sesEventType: event.sesEventType,
    sesMessageId: event.sesMessageId,
    attemptCorrelationId: event.attemptCorrelationId,
    bounceType: event.bounceType,
    bounceSubType: event.bounceSubType,
    complaintFeedbackType: event.complaintFeedbackType,
    providerTimestamp: event.providerTimestamp,
  };
}
