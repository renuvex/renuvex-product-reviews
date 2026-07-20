import { afterEach, describe, expect, it } from 'vitest';
import { getReviewEmailPiiKeyRing, type ReviewEmailPiiKeyRing } from '@/lib/review-email/config';
import {
  canonicalizeEmailIdentity,
  buildOrderProductFingerprint,
  buildOrderProductFingerprintCandidates,
  decryptText,
  encryptText,
  hashEmail,
  hashEmailCandidates,
  hashFoldedEmail,
  protectedEmail,
} from '@/lib/review-email/pii';

function keyRing(currentVersion: number, versions: number[]): ReviewEmailPiiKeyRing {
  return {
    currentVersion,
    keys: new Map(
      versions.map((version) => [
        version,
        {
          hashSecret: `hash-secret-version-${version}-with-at-least-32-characters`,
          encryptionKey: Buffer.alloc(32, version),
        },
      ]),
    ),
  };
}

describe('review email PII key ring', () => {
  afterEach(() => {
    delete process.env.REVIEW_EMAIL_PII_CURRENT_KEY_VERSION;
    delete process.env.REVIEW_EMAIL_PII_KEYS_JSON;
  });

  it('writes with the current version and reads ciphertext from a retained old version', () => {
    const oldRing = keyRing(1, [1]);
    const encryptedWithOldKey = encryptText('customer@example.com', oldRing);
    const rotatedRing = keyRing(2, [1, 2]);

    expect(encryptedWithOldKey.startsWith('e1:1:')).toBe(true);
    expect(decryptText(encryptedWithOldKey, rotatedRing)).toBe('customer@example.com');
    expect(encryptText('customer@example.com', rotatedRing).startsWith('e1:2:')).toBe(true);
  });

  it('uses the current hash for writes and every retained version for suppression lookup', () => {
    const ring = keyRing(2, [1, 2]);
    const email = protectedEmail(' Customer@Example.com ', ring);

    expect(email?.email).toBe('Customer@example.com');
    expect(email?.foldedCanonical).toBe('customer@example.com');
    expect(email?.hash).toBe(hashEmail('Customer@example.com', ring, 2));
    expect(email?.foldedHash).toBe(hashFoldedEmail('Customer@example.com', ring, 2));
    expect(email?.lookupHashes).toHaveLength(4);
    expect(hashEmailCandidates('Customer@example.com', ring)).toHaveLength(4);
    expect(hashEmail('Customer@example.com', ring, 2)).not.toBe(hashEmail('customer@example.com', ring, 2));
    expect(hashFoldedEmail('Customer@example.com', ring, 2)).toBe(hashFoldedEmail('customer@example.com', ring, 2));
  });

  it('keeps the local part exact, canonicalizes an IDN domain, and rejects unsupported SMTPUTF8 local parts', () => {
    expect(canonicalizeEmailIdentity('Case@BÜCHER.example')).toEqual({
      exactCanonical: 'Case@xn--bcher-kva.example',
      foldedCanonical: 'case@xn--bcher-kva.example',
      normalizationVersion: 2,
    });
    expect(canonicalizeEmailIdentity('müşteri@example.com')).toBeNull();
    expect(canonicalizeEmailIdentity('a..b@example.com')).toBeNull();
  });

  it('keeps provider-specific dots and plus tags while folding only local-part casing', () => {
    expect(canonicalizeEmailIdentity(' User.Name+tag@EXAMPLE.COM. ')).toEqual({
      exactCanonical: 'User.Name+tag@example.com',
      foldedCanonical: 'user.name+tag@example.com',
      normalizationVersion: 2,
    });
    expect(canonicalizeEmailIdentity('UserName@example.com')?.foldedCanonical).not.toBe(
      canonicalizeEmailIdentity('User.Name+tag@example.com')?.foldedCanonical,
    );
  });

  it.each([
    ['multiple separators', 'a@b@example.com'],
    ['leading local dot', '.user@example.com'],
    ['trailing local dot', 'user.@example.com'],
    ['consecutive local dots', 'user..name@example.com'],
    ['unicode local part', `m\u00fcsteri@example.com`],
    ['missing domain dot', 'user@localhost'],
    ['invalid domain label', 'user@-example.com'],
    ['local part over 64 characters', `${'a'.repeat(65)}@example.com`],
    ['domain label over 63 characters', `user@${'a'.repeat(64)}.com`],
    ['raw input over 320 characters', `${'a'.repeat(64)}@${'b'.repeat(250)}.com`],
  ])('rejects invalid canonical identity: %s', (_caseName, value) => {
    expect(canonicalizeEmailIdentity(value)).toBeNull();
  });

  it('fails closed when a ciphertext key version is removed too early', () => {
    const encryptedWithOldKey = encryptText('customer@example.com', keyRing(1, [1]));

    expect(() => decryptText(encryptedWithOldKey, keyRing(2, [2]))).toThrow('Review email PII key v1 is not configured');
  });

  it('keeps old receipt fingerprints discoverable across key rotation', () => {
    const rotatedRing = keyRing(2, [1, 2]);
    const input = { ikasOrderId: 'order-1', productId: 'product-1' };
    expect(buildOrderProductFingerprintCandidates(input, rotatedRing)).toEqual([
      buildOrderProductFingerprint(input, rotatedRing, 2),
      buildOrderProductFingerprint(input, rotatedRing, 1),
    ]);
  });

  it('rejects a runtime key ring that drops an earlier suppression-hash version', () => {
    process.env.REVIEW_EMAIL_PII_CURRENT_KEY_VERSION = '2';
    process.env.REVIEW_EMAIL_PII_KEYS_JSON = JSON.stringify({
      2: {
        hashSecret: 'hash-secret-version-2-with-at-least-32-characters',
        encryptionKeyB64: Buffer.alloc(32, 2).toString('base64'),
      },
    });

    expect(() => getReviewEmailPiiKeyRing()).toThrow('Review email PII key ring must retain v1');
  });
});
