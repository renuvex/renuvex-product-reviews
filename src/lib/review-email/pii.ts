import { createCipheriv, createDecipheriv, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { domainToASCII } from 'node:url';
import { getReviewEmailPiiKeyRing, type ReviewEmailPiiKeyRing } from '@/lib/review-email/config';
import { canonicalizeJson } from '@/lib/review-email/canonical-json';

const ENCRYPTION_PREFIX = 'e1';
const LEGACY_HASH_PREFIX = 'h1';
const EXACT_HASH_PREFIX = 'h2e';
const FOLDED_HASH_PREFIX = 'h2f';
const ORDER_PRODUCT_FINGERPRINT_PREFIX = 'op1';
const REVIEW_EMAIL_BATCH_FINGERPRINT_PREFIX = 'rb1';
const PROVIDER_MESSAGE_ID_HASH_PREFIX = 'pm1';
const EMAIL_NORMALIZATION_VERSION = 2;
const ASCII_LOCAL_PART = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]+$/;
const ASCII_DOMAIN_LABEL = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

export type CanonicalEmailIdentity = {
  exactCanonical: string;
  foldedCanonical: string;
  normalizationVersion: typeof EMAIL_NORMALIZATION_VERSION;
};

export type ProtectedEmail = CanonicalEmailIdentity & {
  email: string;
  hash: string;
  foldedHash: string;
  lookupHashes: string[];
  exactLookupHashes: string[];
  foldedLookupHashes: string[];
  hashKeyVersion: number;
  encrypted: string;
};

function base64UrlEncode(value: Buffer): string {
  return value.toString('base64url');
}

function base64UrlDecode(value: string): Buffer {
  return Buffer.from(value, 'base64url');
}

function keyForVersion(keyRing: ReviewEmailPiiKeyRing, version: number) {
  const key = keyRing.keys.get(version);
  if (!key) throw new Error(`Review email PII key v${version} is not configured`);
  return key;
}

function validAsciiLocalPart(localPart: string): boolean {
  return (
    localPart.length >= 1 &&
    localPart.length <= 64 &&
    ASCII_LOCAL_PART.test(localPart) &&
    !localPart.startsWith('.') &&
    !localPart.endsWith('.') &&
    !localPart.includes('..')
  );
}

function validAsciiDomain(domain: string): boolean {
  if (domain.length < 3 || domain.length > 253 || !domain.includes('.')) return false;
  return domain.split('.').every((label) => ASCII_DOMAIN_LABEL.test(label));
}

export function canonicalizeEmailIdentity(value: unknown): CanonicalEmailIdentity | null {
  if (typeof value !== 'string') return null;
  const raw = value.trim();
  if (!raw || raw.length > 320) return null;
  const separator = raw.lastIndexOf('@');
  if (separator <= 0 || separator !== raw.indexOf('@') || separator === raw.length - 1) return null;

  const localPart = raw.slice(0, separator);
  const rawDomain = raw.slice(separator + 1);
  if (!validAsciiLocalPart(localPart) || /[^\x00-\x7f]/.test(localPart)) return null;

  const asciiDomain = domainToASCII(rawDomain).toLowerCase().replace(/\.$/, '');
  if (!validAsciiDomain(asciiDomain)) return null;

  const exactCanonical = `${localPart}@${asciiDomain}`;
  if (Buffer.byteLength(exactCanonical, 'utf8') > 254) return null;
  return {
    exactCanonical,
    foldedCanonical: `${localPart.toLowerCase()}@${asciiDomain}`,
    normalizationVersion: EMAIL_NORMALIZATION_VERSION,
  };
}

export function normalizeEmail(value: unknown): string | null {
  return canonicalizeEmailIdentity(value)?.exactCanonical ?? null;
}

function hmacDigest(value: string, domain: string, keyRing: ReviewEmailPiiKeyRing, version: number): string {
  const key = keyForVersion(keyRing, version);
  return createHmac('sha256', key.hashSecret).update(domain, 'utf8').update('\0', 'utf8').update(value, 'utf8').digest('hex');
}

function legacyHashEmail(foldedEmail: string, keyRing: ReviewEmailPiiKeyRing, version: number): string {
  const key = keyForVersion(keyRing, version);
  const digest = createHmac('sha256', key.hashSecret).update(foldedEmail, 'utf8').digest('hex');
  return `${LEGACY_HASH_PREFIX}:${version}:${digest}`;
}

export function hashEmail(email: string, keyRing = getReviewEmailPiiKeyRing(), version = keyRing.currentVersion): string {
  const identity = canonicalizeEmailIdentity(email);
  if (!identity) throw new Error('Invalid exact email identity');
  return `${EXACT_HASH_PREFIX}:${version}:${hmacDigest(identity.exactCanonical, 'review-email:exact:v2', keyRing, version)}`;
}

export function hashFoldedEmail(email: string, keyRing = getReviewEmailPiiKeyRing(), version = keyRing.currentVersion): string {
  const identity = canonicalizeEmailIdentity(email);
  if (!identity) throw new Error('Invalid folded email identity');
  return `${FOLDED_HASH_PREFIX}:${version}:${hmacDigest(identity.foldedCanonical, 'review-email:folded:v2', keyRing, version)}`;
}

export function hashEmailCandidates(email: string, keyRing = getReviewEmailPiiKeyRing()): string[] {
  const identity = canonicalizeEmailIdentity(email);
  if (!identity) return [];
  const versions = [...keyRing.keys.keys()].sort((left, right) => right - left);
  return [
    ...versions.map((version) => hashEmail(identity.exactCanonical, keyRing, version)),
    ...versions.map((version) => legacyHashEmail(identity.foldedCanonical, keyRing, version)),
  ];
}

export function hashFoldedEmailCandidates(email: string, keyRing = getReviewEmailPiiKeyRing()): string[] {
  const identity = canonicalizeEmailIdentity(email);
  if (!identity) return [];
  const versions = [...keyRing.keys.keys()].sort((left, right) => right - left);
  return [
    ...versions.map((version) => hashFoldedEmail(identity.exactCanonical, keyRing, version)),
    ...versions.map((version) => legacyHashEmail(identity.foldedCanonical, keyRing, version)),
  ];
}

export function buildOrderProductFingerprint(
  input: { ikasOrderId: string; productId: string },
  keyRing = getReviewEmailPiiKeyRing(),
  version = keyRing.currentVersion,
): string {
  const canonical = `${input.ikasOrderId}\0${input.productId}`;
  return `${ORDER_PRODUCT_FINGERPRINT_PREFIX}:${version}:${hmacDigest(canonical, 'review-email:order-product:v1', keyRing, version)}`;
}

export function buildOrderProductFingerprintCandidates(
  input: { ikasOrderId: string; productId: string },
  keyRing = getReviewEmailPiiKeyRing(),
): string[] {
  return [...keyRing.keys.keys()]
    .sort((left, right) => right - left)
    .map((version) => buildOrderProductFingerprint(input, keyRing, version));
}

export type ReviewEmailBatchFingerprintInput = {
  schemaVersion: 1;
  storeId: string;
  installationGeneration: number;
  ikasOrderId: string;
  groupingMode: 'package';
  deliveryGroupKey: string;
};

export function buildReviewEmailBatchFingerprint(
  input: ReviewEmailBatchFingerprintInput,
  keyRing = getReviewEmailPiiKeyRing(),
  version = keyRing.currentVersion,
): string {
  const canonical = canonicalizeJson({
    deliveryGroupKey: input.deliveryGroupKey,
    groupingMode: input.groupingMode,
    ikasOrderId: input.ikasOrderId,
    installationGeneration: input.installationGeneration,
    schemaVersion: input.schemaVersion,
    storeId: input.storeId,
  });
  return `${REVIEW_EMAIL_BATCH_FINGERPRINT_PREFIX}:${version}:${hmacDigest(canonical, 'review-email:batch:v1', keyRing, version)}`;
}

export function buildReviewEmailBatchFingerprintCandidates(
  input: ReviewEmailBatchFingerprintInput,
  keyRing = getReviewEmailPiiKeyRing(),
): string[] {
  return [...keyRing.keys.keys()]
    .sort((left, right) => right - left)
    .map((version) => buildReviewEmailBatchFingerprint(input, keyRing, version));
}

export function hashProviderMessageId(
  providerMessageId: string,
  keyRing = getReviewEmailPiiKeyRing(),
  version = keyRing.currentVersion,
): string {
  return `${PROVIDER_MESSAGE_ID_HASH_PREFIX}:${version}:${hmacDigest(providerMessageId, 'review-email:provider-message:v1', keyRing, version)}`;
}

export function hashProviderMessageIdCandidates(
  providerMessageId: string,
  keyRing = getReviewEmailPiiKeyRing(),
): string[] {
  return [...keyRing.keys.keys()]
    .sort((left, right) => right - left)
    .map((version) => hashProviderMessageId(providerMessageId, keyRing, version));
}

export function piiHashVersion(value: string | null | undefined): number | null {
  if (!value) return null;
  const version = Number(value.split(':')[1]);
  return Number.isInteger(version) && version > 0 ? version : null;
}

export function constantTimeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, 'utf8');
  const right = Buffer.from(b, 'utf8');
  return left.length === right.length && timingSafeEqual(left, right);
}

export function encryptText(plainText: string, keyRing = getReviewEmailPiiKeyRing()): string {
  const version = keyRing.currentVersion;
  const key = keyForVersion(keyRing, version);
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key.encryptionKey, iv);
  const ciphertext = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [ENCRYPTION_PREFIX, version, base64UrlEncode(iv), base64UrlEncode(tag), base64UrlEncode(ciphertext)].join(':');
}

export function decryptText(encrypted: string, keyRing = getReviewEmailPiiKeyRing()): string {
  const [format, versionText, encodedIv, encodedTag, encodedCiphertext] = encrypted.split(':');
  const version = Number(versionText);
  if (format !== ENCRYPTION_PREFIX || !Number.isInteger(version) || version < 1 || !encodedIv || !encodedTag || !encodedCiphertext) {
    throw new Error('Unsupported encrypted text format');
  }
  const key = keyForVersion(keyRing, version);
  const decipher = createDecipheriv('aes-256-gcm', key.encryptionKey, base64UrlDecode(encodedIv));
  decipher.setAuthTag(base64UrlDecode(encodedTag));
  return Buffer.concat([decipher.update(base64UrlDecode(encodedCiphertext)), decipher.final()]).toString('utf8');
}

export function protectedEmail(value: unknown, keyRing = getReviewEmailPiiKeyRing()): ProtectedEmail | null {
  const identity = canonicalizeEmailIdentity(value);
  if (!identity) return null;
  const exactLookupHashes = hashEmailCandidates(identity.exactCanonical, keyRing);
  const foldedLookupHashes = hashFoldedEmailCandidates(identity.exactCanonical, keyRing);
  return {
    ...identity,
    email: identity.exactCanonical,
    hash: hashEmail(identity.exactCanonical, keyRing),
    foldedHash: hashFoldedEmail(identity.exactCanonical, keyRing),
    lookupHashes: foldedLookupHashes,
    exactLookupHashes,
    foldedLookupHashes,
    hashKeyVersion: keyRing.currentVersion,
    encrypted: encryptText(identity.exactCanonical, keyRing),
  };
}
