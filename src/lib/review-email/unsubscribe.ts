import { createHmac, randomBytes } from 'node:crypto';
import type { Prisma } from '@prisma/client';
import { getReviewRequestPublicBaseUrl, getReviewRequestTokenKeyRing, type ReviewRequestTokenKeyRing } from '@/lib/review-email/config';
import { REVIEW_EMAIL_CATEGORY } from '@/lib/review-email/constants';
import { piiHashVersion } from '@/lib/review-email/pii';
import { lockReviewEmailRecipient } from '@/lib/review-email/subject-lock';

const RAW_UNSUBSCRIBE_PATTERN = /^u([1-9][0-9]{0,8})\.([A-Za-z0-9_-]{43})$/;
const ACTIVE_JOB_STATUSES = ['pending', 'leased', 'dispatched', 'processing', 'retrying', 'awaiting_confirmation'] as const;

function unsubscribeHash(rawToken: string, secret: string): string {
  return createHmac('sha256', secret)
    .update('review-email:unsubscribe:v1\0', 'utf8')
    .update(rawToken, 'utf8')
    .digest('hex');
}

function parseRawUnsubscribeToken(rawToken: string): number | null {
  const match = RAW_UNSUBSCRIBE_PATTERN.exec(rawToken);
  const version = match ? Number(match[1]) : 0;
  return Number.isSafeInteger(version) && version > 0 ? version : null;
}

export function buildReviewEmailUnsubscribeUrl(rawToken: string): string {
  const url = new URL('/api/public/review-center/unsubscribe', getReviewRequestPublicBaseUrl());
  url.searchParams.set('token', rawToken);
  return url.toString();
}

export async function prepareReviewEmailUnsubscribeToken(
  tx: Prisma.TransactionClient,
  input: {
    storeId: string;
    recipientFoldedHash: string;
    recipientExactHash: string;
    recipientExactHashKeyVersion: number;
    recipientEmailNormalizationVersion: number;
    attemptId: string;
    keyRing?: ReviewRequestTokenKeyRing;
  },
): Promise<{ rawToken: string; unsubscribeUrl: string }> {
  if (piiHashVersion(input.recipientExactHash) !== input.recipientExactHashKeyVersion) {
    throw new Error('invalid_review_email_unsubscribe_recipient_snapshot');
  }
  const keyRing = input.keyRing ?? getReviewRequestTokenKeyRing();
  const secret = keyRing.keys.get(keyRing.currentVersion);
  if (!secret) throw new Error('Current review request token key is unavailable');
  const rawToken = `u${keyRing.currentVersion}.${randomBytes(32).toString('base64url')}`;
  await tx.reviewEmailUnsubscribeToken.create({
    data: {
      storeId: input.storeId,
      category: REVIEW_EMAIL_CATEGORY,
      recipientFoldedHash: input.recipientFoldedHash,
      recipientExactHash: input.recipientExactHash,
      recipientExactHashKeyVersion: input.recipientExactHashKeyVersion,
      recipientEmailNormalizationVersion: input.recipientEmailNormalizationVersion,
      tokenHash: unsubscribeHash(rawToken, secret),
      tokenKeyVersion: keyRing.currentVersion,
      status: 'active',
      createdFromAttemptId: input.attemptId,
    },
  });
  return { rawToken, unsubscribeUrl: buildReviewEmailUnsubscribeUrl(rawToken) };
}

export async function applyReviewEmailUnsubscribe(
  tx: Prisma.TransactionClient,
  rawToken: string,
  input: { now?: Date; keyRing?: ReviewRequestTokenKeyRing } = {},
): Promise<{ state: 'unsubscribed' | 'already_unsubscribed' }> {
  const now = input.now ?? new Date();
  const keyRing = input.keyRing ?? getReviewRequestTokenKeyRing();
  const version = parseRawUnsubscribeToken(rawToken);
  const secret = version ? keyRing.keys.get(version) : null;
  if (!version || !secret) throw new Error('invalid_review_email_unsubscribe_token');
  const token = await tx.reviewEmailUnsubscribeToken.findUnique({
    where: { tokenHash: unsubscribeHash(rawToken, secret) },
    include: {
      createdFromAttempt: {
        select: {
          recipientEmailEncrypted: true,
        },
      },
    },
  });
  if (!token || token.tokenKeyVersion !== version || token.status === 'revoked') {
    throw new Error('invalid_review_email_unsubscribe_token');
  }
  await lockReviewEmailRecipient(tx, {
    storeId: token.storeId,
    category: token.category,
    foldedSubjectHash: token.recipientFoldedHash,
  });
  const alreadyUsed = token.status === 'used';
  if (!alreadyUsed) {
    await tx.reviewEmailUnsubscribeToken.updateMany({
      where: { id: token.id, status: 'active' },
      data: { status: 'used', usedAt: now },
    });
  }
  await tx.reviewEmailSuppression.upsert({
    where: {
      storeId_emailHash_reason: {
        storeId: token.storeId,
        emailHash: token.recipientFoldedHash,
        reason: 'unsubscribe',
      },
    },
    create: {
      storeId: token.storeId,
      category: token.category,
      emailHash: token.recipientFoldedHash,
      recipientExactHash: token.recipientExactHash,
      recipientEmailEncrypted: token.createdFromAttempt?.recipientEmailEncrypted ?? null,
      reason: 'unsubscribe',
      source: 'recipient_one_click',
      status: 'active',
    },
    update: {
      category: token.category,
      status: 'active',
      recipientExactHash: token.recipientExactHash,
      recipientEmailEncrypted: token.createdFromAttempt?.recipientEmailEncrypted ?? undefined,
      releasedAt: null,
      expiresAt: null,
    },
  });
  await tx.reviewEmailBatch.updateMany({
    where: { storeId: token.storeId, recipientEmailFoldedHash: token.recipientFoldedHash, status: { in: ['scheduled', 'sending', 'active'] } },
    data: { emailAccessStatus: 'unsubscribed' },
  });
  await tx.reviewEmailJob.updateMany({
    where: {
      storeId: token.storeId,
      status: { in: [...ACTIVE_JOB_STATUSES] },
      OR: [
        { batch: { recipientEmailFoldedHash: token.recipientFoldedHash } },
        { request: { recipientEmailFoldedHash: token.recipientFoldedHash } },
      ],
    },
    data: { status: 'cancelled', completedAt: now, leaseOwner: null, leaseExpiresAt: null, lastErrorCode: 'recipient_unsubscribed' },
  });
  return { state: alreadyUsed ? 'already_unsubscribed' : 'unsubscribed' };
}
