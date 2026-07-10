import { createHmac, randomBytes } from 'node:crypto';
import type { Prisma, PrismaClient } from '@prisma/client';
import {
  DEFAULT_TOKEN_EXPIRES_DAYS,
  REVIEW_REQUEST_SESSION_TTL_MINUTES,
} from '@/lib/review-email/constants';
import {
  getReviewRequestSessionSecret,
  getReviewRequestTokenKeyRing,
  type ReviewRequestTokenKeyRing,
} from '@/lib/review-email/config';
import { addDays } from '@/lib/review-email/time';

const RAW_TOKEN_PATTERN = /^v([1-9][0-9]{0,8})\.([A-Za-z0-9_-]{43})$/;
const RAW_SESSION_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const SUBMITTABLE_REQUEST_STATUSES = ['sending', 'sent', 'sent_unknown'] as const;
const CANCELLABLE_JOB_STATUSES = [
  'pending',
  'leased',
  'dispatched',
  'processing',
  'retrying',
  'awaiting_confirmation',
] as const;

type TokenDb = Pick<PrismaClient, 'reviewRequestToken'>;
type SessionDb = Pick<PrismaClient, '$transaction' | 'reviewRequestSession'>;

export class ReviewRequestTokenError extends Error {
  constructor(
    public readonly code: string,
    message = code,
    public readonly status = 400,
  ) {
    super(message);
    this.name = 'ReviewRequestTokenError';
  }
}

function parseRawReviewRequestToken(rawToken: string): { version: number } | null {
  const match = RAW_TOKEN_PATTERN.exec(rawToken);
  if (!match) return null;
  const version = Number(match[1]);
  return Number.isSafeInteger(version) && version > 0 ? { version } : null;
}

export function hashReviewRequestToken(rawToken: string, secret: string): string {
  return createHmac('sha256', secret).update(rawToken, 'utf8').digest('hex');
}

export function createRawReviewRequestToken(version: number): string {
  if (!Number.isSafeInteger(version) || version < 1) {
    throw new Error('Review request token key version must be a positive integer');
  }
  return `v${version}.${randomBytes(32).toString('base64url')}`;
}

export function hashReviewRequestSession(rawSession: string, secret = getReviewRequestSessionSecret()): string {
  return createHmac('sha256', secret).update(rawSession, 'utf8').digest('hex');
}

export function createRawReviewRequestSession(): string {
  return randomBytes(32).toString('base64url');
}

export async function prepareReviewRequestToken(
  tx: Prisma.TransactionClient,
  input: {
    requestId: string;
    attemptId: string;
    keyRing?: ReviewRequestTokenKeyRing;
  },
): Promise<{ id: string; rawToken: string; tokenHash: string; tokenKeyVersion: number }> {
  const keyRing = input.keyRing ?? getReviewRequestTokenKeyRing();
  const secret = keyRing.keys.get(keyRing.currentVersion);
  if (!secret) throw new Error('Current review request token key is unavailable');

  const rawToken = createRawReviewRequestToken(keyRing.currentVersion);
  const tokenHash = hashReviewRequestToken(rawToken, secret);
  const row = await tx.reviewRequestToken.create({
    data: {
      requestId: input.requestId,
      attemptId: input.attemptId,
      tokenHash,
      tokenKeyVersion: keyRing.currentVersion,
      status: 'prepared',
      expiresAt: null,
    },
    select: { id: true },
  });

  return {
    id: row.id,
    rawToken,
    tokenHash,
    tokenKeyVersion: keyRing.currentVersion,
  };
}

export async function activatePreparedReviewRequestToken(
  tx: Prisma.TransactionClient,
  input: { attemptId: string; sendInitiatedAt: Date },
): Promise<{ tokenId: string; requestId: string; expiresAt: Date }> {
  const token = await tx.reviewRequestToken.findUnique({
    where: { attemptId: input.attemptId },
    select: { id: true, requestId: true, status: true },
  });
  if (!token || token.status !== 'prepared') {
    throw new ReviewRequestTokenError('review_request_token_not_prepared', undefined, 409);
  }

  const expiresAt = addDays(input.sendInitiatedAt, DEFAULT_TOKEN_EXPIRES_DAYS);
  const activated = await tx.reviewRequestToken.updateMany({
    where: { id: token.id, status: 'prepared', expiresAt: null },
    data: { status: 'active', expiresAt },
  });
  if (activated.count !== 1) {
    throw new ReviewRequestTokenError('review_request_token_not_prepared', undefined, 409);
  }

  return { tokenId: token.id, requestId: token.requestId, expiresAt };
}

export async function resolveActiveReviewRequestToken(
  db: TokenDb,
  rawToken: string,
  now = new Date(),
  keyRing = getReviewRequestTokenKeyRing(),
) {
  const parsed = parseRawReviewRequestToken(rawToken);
  const secret = parsed ? keyRing.keys.get(parsed.version) : null;
  if (!parsed || !secret) {
    throw new ReviewRequestTokenError('invalid_review_request_token');
  }

  const tokenHash = hashReviewRequestToken(rawToken, secret);
  const token = await db.reviewRequestToken.findUnique({
    where: { tokenHash },
    include: {
      request: {
        include: {
          orderLineSnapshot: true,
        },
      },
    },
  });
  if (!token || token.tokenKeyVersion !== parsed.version) {
    throw new ReviewRequestTokenError('invalid_review_request_token');
  }

  if (token.status === 'active' && token.expiresAt && token.expiresAt <= now) {
    await db.reviewRequestToken.updateMany({
      where: { id: token.id, status: 'active', expiresAt: { lte: now } },
      data: { status: 'expired' },
    });
    throw new ReviewRequestTokenError('invalid_review_request_token');
  }

  if (
    token.status !== 'active' ||
    !token.expiresAt ||
    token.expiresAt <= now ||
    !SUBMITTABLE_REQUEST_STATUSES.includes(token.request.status as (typeof SUBMITTABLE_REQUEST_STATUSES)[number]) ||
    (token.request.expiresAt !== null && token.request.expiresAt <= now)
  ) {
    throw new ReviewRequestTokenError('invalid_review_request_token');
  }

  return token;
}

export async function exchangeReviewRequestTokenForSession(
  db: SessionDb & TokenDb,
  rawToken: string,
  input: {
    now?: Date;
    keyRing?: ReviewRequestTokenKeyRing;
    sessionSecret?: string;
  } = {},
): Promise<{
  rawSession: string;
  sessionId: string;
  expiresAt: Date;
  token: Awaited<ReturnType<typeof resolveActiveReviewRequestToken>>;
}> {
  const now = input.now ?? new Date();
  const token = await resolveActiveReviewRequestToken(db, rawToken, now, input.keyRing);
  const rawSession = createRawReviewRequestSession();
  const sessionHash = hashReviewRequestSession(rawSession, input.sessionSecret);
  const ttlExpiresAt = new Date(now.getTime() + REVIEW_REQUEST_SESSION_TTL_MINUTES * 60 * 1000);
  const tokenExpiresAt = token.expiresAt;
  if (!tokenExpiresAt) throw new ReviewRequestTokenError('invalid_review_request_token');
  const expiresAt = tokenExpiresAt < ttlExpiresAt ? tokenExpiresAt : ttlExpiresAt;

  const session = await db.$transaction(async (tx) => {
    const stillActive = await tx.reviewRequestToken.findFirst({
      where: { id: token.id, status: 'active', expiresAt: { gt: now } },
      select: { id: true },
    });
    if (!stillActive) throw new ReviewRequestTokenError('invalid_review_request_token');

    await tx.reviewRequestSession.updateMany({
      where: { tokenId: token.id, status: 'active' },
      data: { status: 'revoked', revokedAt: now, revocationReason: 'replaced' },
    });
    return tx.reviewRequestSession.create({
      data: {
        requestId: token.requestId,
        tokenId: token.id,
        sessionHash,
        status: 'active',
        expiresAt,
      },
      select: { id: true },
    });
  });

  return { rawSession, sessionId: session.id, expiresAt, token };
}

export async function resolveActiveReviewRequestSession(
  db: Pick<PrismaClient, 'reviewRequestSession'>,
  rawSession: string,
  now = new Date(),
  sessionSecret = getReviewRequestSessionSecret(),
) {
  if (!RAW_SESSION_PATTERN.test(rawSession)) {
    throw new ReviewRequestTokenError('invalid_review_request_session');
  }
  const sessionHash = hashReviewRequestSession(rawSession, sessionSecret);
  const session = await db.reviewRequestSession.findUnique({
    where: { sessionHash },
    include: {
      token: true,
      request: {
        include: { orderLineSnapshot: true },
      },
    },
  });
  if (!session) throw new ReviewRequestTokenError('invalid_review_request_session');

  if (session.status === 'active' && session.expiresAt <= now) {
    await db.reviewRequestSession.updateMany({
      where: { id: session.id, status: 'active', expiresAt: { lte: now } },
      data: { status: 'expired' },
    });
    throw new ReviewRequestTokenError('invalid_review_request_session');
  }

  if (
    session.status !== 'active' ||
    session.expiresAt <= now ||
    session.token.status !== 'active' ||
    !session.token.expiresAt ||
    session.token.expiresAt <= now ||
    !SUBMITTABLE_REQUEST_STATUSES.includes(session.request.status as (typeof SUBMITTABLE_REQUEST_STATUSES)[number]) ||
    (session.request.expiresAt !== null && session.request.expiresAt <= now)
  ) {
    throw new ReviewRequestTokenError('invalid_review_request_session');
  }

  return session;
}

export async function claimReviewRequestForSubmission(
  tx: Prisma.TransactionClient,
  input: {
    sessionId: string;
    tokenId: string;
    requestId: string;
    now?: Date;
  },
): Promise<void> {
  const now = input.now ?? new Date();
  const request = await tx.reviewRequest.updateMany({
    where: {
      id: input.requestId,
      submittedAt: null,
      status: { in: [...SUBMITTABLE_REQUEST_STATUSES] },
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
    data: { status: 'submitted', submittedAt: now },
  });
  if (request.count !== 1) throw new ReviewRequestTokenError('invalid_review_request_session');

  const session = await tx.reviewRequestSession.updateMany({
    where: {
      id: input.sessionId,
      requestId: input.requestId,
      tokenId: input.tokenId,
      status: 'active',
      expiresAt: { gt: now },
    },
    data: { status: 'consumed', consumedAt: now },
  });
  if (session.count !== 1) throw new ReviewRequestTokenError('invalid_review_request_session');

  const token = await tx.reviewRequestToken.updateMany({
    where: {
      id: input.tokenId,
      requestId: input.requestId,
      status: 'active',
      expiresAt: { gt: now },
    },
    data: { status: 'consumed', consumedAt: now },
  });
  if (token.count !== 1) throw new ReviewRequestTokenError('invalid_review_request_session');

  await tx.reviewRequestToken.updateMany({
    where: { requestId: input.requestId, id: { not: input.tokenId }, status: { in: ['prepared', 'active'] } },
    data: { status: 'revoked', revokedAt: now, revocationReason: 'request_submitted' },
  });
  await tx.reviewRequestSession.updateMany({
    where: { requestId: input.requestId, id: { not: input.sessionId }, status: 'active' },
    data: { status: 'revoked', revokedAt: now, revocationReason: 'request_submitted' },
  });
  await tx.reviewEmailJob.updateMany({
    where: { requestId: input.requestId, status: { in: [...CANCELLABLE_JOB_STATUSES] } },
    data: {
      status: 'cancelled',
      completedAt: now,
      leaseOwner: null,
      leaseExpiresAt: null,
      lastErrorCode: 'request_submitted',
    },
  });
}
