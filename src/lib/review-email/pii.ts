import { createCipheriv, createDecipheriv, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { getReviewEmailEncryptionKeyB64, getReviewEmailHashSecret } from '@/lib/review-email/config';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENCRYPTION_PREFIX = 'v1';

function base64UrlEncode(value: Buffer): string {
  return value.toString('base64url');
}

function base64UrlDecode(value: string): Buffer {
  return Buffer.from(value, 'base64url');
}

function encryptionKey(): Buffer {
  const key = Buffer.from(getReviewEmailEncryptionKeyB64(), 'base64');
  if (key.length !== 32) {
    throw new Error('REVIEW_EMAIL_PII_ENCRYPTION_KEY_B64 must decode to 32 bytes');
  }
  return key;
}

export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (!email || email.length > 320 || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

export function hashEmail(email: string, secret = getReviewEmailHashSecret()): string {
  return createHmac('sha256', secret).update(email, 'utf8').digest('hex');
}

export function constantTimeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, 'utf8');
  const right = Buffer.from(b, 'utf8');
  return left.length === right.length && timingSafeEqual(left, right);
}

export function encryptText(plainText: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const ciphertext = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [ENCRYPTION_PREFIX, base64UrlEncode(iv), base64UrlEncode(tag), base64UrlEncode(ciphertext)].join(':');
}

export function decryptText(encrypted: string): string {
  const [version, encodedIv, encodedTag, encodedCiphertext] = encrypted.split(':');
  if (version !== ENCRYPTION_PREFIX || !encodedIv || !encodedTag || !encodedCiphertext) {
    throw new Error('Unsupported encrypted text format');
  }
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), base64UrlDecode(encodedIv));
  decipher.setAuthTag(base64UrlDecode(encodedTag));
  return Buffer.concat([
    decipher.update(base64UrlDecode(encodedCiphertext)),
    decipher.final(),
  ]).toString('utf8');
}

export function protectedEmail(value: unknown): { email: string; hash: string; encrypted: string } | null {
  const email = normalizeEmail(value);
  if (!email) return null;
  return {
    email,
    hash: hashEmail(email),
    encrypted: encryptText(email),
  };
}
