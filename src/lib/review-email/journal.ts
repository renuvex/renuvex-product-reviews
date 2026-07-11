import { createHash } from 'node:crypto';
import {
  GetObjectCommand,
  GetObjectRetentionCommand,
  HeadObjectCommand,
  ListObjectVersionsCommand,
  PutObjectCommand,
  S3Client,
  type ObjectLockMode,
} from '@aws-sdk/client-s3';
import { awsCredentialsProvider } from '@vercel/oidc-aws-credentials-provider';
import type { PrismaClient } from '@prisma/client';
import * as Sentry from '@sentry/nextjs';
import { canonicalJsonBytes, type CanonicalJsonValue } from '@/lib/review-email/canonical-json';
import { getReviewEmailJournalConfig, type ReviewEmailJournalConfig } from '@/lib/review-email/config';

const JOURNAL_SCHEMA_VERSION = '1';
const JOURNAL_CONTENT_TYPE = 'application/json';
const JOURNAL_PREFIX = 'erasure-journal/v1';

type JournalDb = Pick<PrismaClient, 'reviewEmailDataSubjectRun' | 'storeDataErasureRun'>;

export type ReviewEmailErasureJournalPayload = {
  schemaVersion: 1;
  runId: string;
  storeId: string;
  installationGeneration: number;
  action: 'erase';
  exactHashKeyVersion: number;
  foldedHashKeyVersion: number;
  normalizationVersion: number;
  foldedSubjectHash: string;
  exactSubjectLookupHashes: string[];
  foldedSubjectLookupHashes: string[];
  opaqueResourceIds: string[];
  rowCounts: Record<string, number>;
  actions: string[];
  createdAt: string;
  retentionBaseAt: string;
};

export type ReviewEmailStoreErasureJournalPayload = {
  schemaVersion: 1;
  runId: string;
  storeId: string;
  installationGeneration: number;
  action: 'store_uninstall';
  actions: string[];
  createdAt: string;
  retentionBaseAt: string;
};

export type ReviewEmailJournalPayload = ReviewEmailErasureJournalPayload | ReviewEmailStoreErasureJournalPayload;

export type VerifiedJournalEvidence = {
  key: string;
  payloadSha256: string;
  versionId: string;
  etag: string | null;
  checksumSha256: string;
  objectLockRetainUntil: Date;
};

export class ReviewEmailJournalError extends Error {
  constructor(public readonly code: string, public readonly retryable = false) {
    super(code);
    this.name = 'ReviewEmailJournalError';
  }
}

function resolveJournalConfig(config?: ReviewEmailJournalConfig): ReviewEmailJournalConfig {
  if (config) return config;
  try {
    return getReviewEmailJournalConfig();
  } catch {
    throw new ReviewEmailJournalError('journal_not_configured', true);
  }
}

function addDays(value: Date, days: number): Date {
  return new Date(value.getTime() + days * 24 * 60 * 60 * 1000);
}

function payloadSha256(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

function checksumSha256(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('base64');
}

function reportJournalConflict(): void {
  try {
    Sentry.captureException(new Error('Review email erasure journal conflict'), {
      tags: {
        source: 'review-email-journal',
        task: 'journal-conflict',
      },
    });
  } catch {
    // Observability must not alter the fail-closed journal result.
  }
}

export function buildReviewEmailJournalKey(runId: string, createdAt: Date): string {
  const year = createdAt.getUTCFullYear().toString().padStart(4, '0');
  const month = (createdAt.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = createdAt.getUTCDate().toString().padStart(2, '0');
  return `${JOURNAL_PREFIX}/${year}/${month}/${day}/${runId}.json`;
}

export function buildReviewEmailErasureJournalPayload(input: ReviewEmailErasureJournalPayload): ReviewEmailErasureJournalPayload {
  return {
    ...input,
    exactSubjectLookupHashes: [...new Set(input.exactSubjectLookupHashes)].sort(),
    foldedSubjectLookupHashes: [...new Set(input.foldedSubjectLookupHashes)].sort(),
    opaqueResourceIds: [...new Set(input.opaqueResourceIds)].sort(),
    actions: [...new Set(input.actions)].sort(),
    rowCounts: Object.fromEntries(Object.entries(input.rowCounts).sort(([left], [right]) => left.localeCompare(right))),
  };
}

export function buildReviewEmailStoreErasureJournalPayload(input: ReviewEmailStoreErasureJournalPayload): ReviewEmailStoreErasureJournalPayload {
  return { ...input, actions: [...new Set(input.actions)].sort() };
}

let journalClient: S3Client | null = null;

export function getReviewEmailJournalS3Client(config = getReviewEmailJournalConfig()): S3Client {
  if (journalClient) return journalClient;
  journalClient = new S3Client({
    region: config.region,
    ...(config.roleArn
      ? {
          credentials: awsCredentialsProvider({
            roleArn: config.roleArn,
            audience: config.oidcAudience,
            roleSessionName: 'renuvex-review-email-journal',
            clientConfig: { region: config.region },
          }),
        }
      : {}),
  });
  return journalClient;
}

function isPreconditionFailed(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const candidate = error as { name?: string; $metadata?: { httpStatusCode?: number } };
  return candidate.name === 'PreconditionFailed' || candidate.$metadata?.httpStatusCode === 412;
}

function requireMatchingMetadata(
  metadata: Record<string, string> | undefined,
  expected: { runId: string; installationGeneration: number; payloadSha256: string; action: ReviewEmailJournalPayload['action'] },
): void {
  if (
    metadata?.['journal-schema-version'] !== JOURNAL_SCHEMA_VERSION ||
    metadata?.['erasure-run-id'] !== expected.runId ||
    metadata?.['installation-generation'] !== String(expected.installationGeneration) ||
    metadata?.['journal-action'] !== expected.action ||
    metadata?.['payload-sha256'] !== expected.payloadSha256
  ) {
    throw new ReviewEmailJournalError('journal_conflict');
  }
}

async function verifyExistingJournalObject(
  client: S3Client,
  config: ReviewEmailJournalConfig,
  input: {
    key: string;
    runId: string;
    installationGeneration: number;
    expectedBytes: Buffer;
    expectedPayloadSha256: string;
    expectedRetainUntil: Date;
    action: ReviewEmailJournalPayload['action'];
  },
): Promise<VerifiedJournalEvidence> {
  const listed = await client.send(new ListObjectVersionsCommand({ Bucket: config.bucket, Prefix: input.key }));
  const versions = (listed.Versions ?? []).filter((version) => version.Key === input.key);
  const deleteMarkers = (listed.DeleteMarkers ?? []).filter((marker) => marker.Key === input.key);
  if (versions.length !== 1 || deleteMarkers.length !== 0 || !versions[0]?.VersionId) {
    throw new ReviewEmailJournalError('journal_conflict');
  }
  const versionId = versions[0].VersionId;
  const head = await client.send(new HeadObjectCommand({
    Bucket: config.bucket,
    Key: input.key,
    VersionId: versionId,
    ChecksumMode: 'ENABLED',
  }));
  requireMatchingMetadata(head.Metadata, {
    runId: input.runId,
    installationGeneration: input.installationGeneration,
    payloadSha256: input.expectedPayloadSha256,
    action: input.action,
  });
  if (
    head.ContentLength !== input.expectedBytes.length ||
    head.ContentType !== JOURNAL_CONTENT_TYPE ||
    head.ServerSideEncryption !== 'AES256' ||
    head.ChecksumSHA256 !== checksumSha256(input.expectedBytes)
  ) {
    throw new ReviewEmailJournalError('journal_conflict');
  }

  const retention = await client.send(new GetObjectRetentionCommand({
    Bucket: config.bucket,
    Key: input.key,
    VersionId: versionId,
  }));
  const mode = retention.Retention?.Mode as ObjectLockMode | undefined;
  const retainUntil = retention.Retention?.RetainUntilDate;
  if (mode !== 'GOVERNANCE' || !retainUntil || retainUntil < input.expectedRetainUntil) {
    throw new ReviewEmailJournalError('journal_conflict');
  }

  const object = await client.send(new GetObjectCommand({ Bucket: config.bucket, Key: input.key, VersionId: versionId }));
  const bytes = object.Body ? Buffer.from(await object.Body.transformToByteArray()) : Buffer.alloc(0);
  if (!bytes.equals(input.expectedBytes) || payloadSha256(bytes) !== input.expectedPayloadSha256) {
    throw new ReviewEmailJournalError('journal_conflict');
  }

  return {
    key: input.key,
    payloadSha256: input.expectedPayloadSha256,
    versionId,
    etag: head.ETag ?? null,
    checksumSha256: head.ChecksumSHA256,
    objectLockRetainUntil: retainUntil,
  };
}

async function persistVerifiedEvidence(
  db: JournalDb,
  runId: string,
  expected: { key: string; payloadSha256: string },
  evidence: VerifiedJournalEvidence,
): Promise<void> {
  const updated = await db.reviewEmailDataSubjectRun.updateMany({
    where: {
      id: runId,
      journalKey: expected.key,
      journalPayloadSha256: expected.payloadSha256,
      journalStatus: { in: ['intent_recorded', 'writing', 'write_uncertain', 'verified'] },
    },
    data: {
      journalVersionId: evidence.versionId,
      journalEtag: evidence.etag,
      journalChecksumSha256: evidence.checksumSha256,
      journalObjectLockRetainUntil: evidence.objectLockRetainUntil,
      journalStatus: 'verified',
      sanitizedErrorCode: null,
    },
  });
  if (updated.count !== 1) throw new ReviewEmailJournalError('journal_evidence_cas_failed', true);
}

async function putJournalObject(
  client: S3Client,
  config: ReviewEmailJournalConfig,
  input: {
    key: string;
    runId: string;
    installationGeneration: number;
    action: ReviewEmailJournalPayload['action'];
    bytes: Buffer;
    digest: string;
    retainUntil: Date;
  },
): Promise<VerifiedJournalEvidence> {
  try {
    const response = await client.send(new PutObjectCommand({
      Bucket: config.bucket,
      Key: input.key,
      Body: input.bytes,
      ContentType: JOURNAL_CONTENT_TYPE,
      ChecksumSHA256: checksumSha256(input.bytes),
      IfNoneMatch: '*',
      ServerSideEncryption: 'AES256',
      ObjectLockMode: 'GOVERNANCE',
      ObjectLockRetainUntilDate: input.retainUntil,
      Metadata: {
        'journal-schema-version': JOURNAL_SCHEMA_VERSION,
        'erasure-run-id': input.runId,
        'installation-generation': String(input.installationGeneration),
        'journal-action': input.action,
        'payload-sha256': input.digest,
      },
    }));
    if (!response.VersionId) throw new ReviewEmailJournalError('journal_version_id_missing', true);
    return {
      key: input.key,
      payloadSha256: input.digest,
      versionId: response.VersionId,
      etag: response.ETag ?? null,
      checksumSha256: response.ChecksumSHA256 ?? checksumSha256(input.bytes),
      objectLockRetainUntil: input.retainUntil,
    };
  } catch (error) {
    if (!isPreconditionFailed(error)) {
      if (error instanceof ReviewEmailJournalError) throw error;
      throw new ReviewEmailJournalError('journal_write_failed', true);
    }
  }

  return verifyExistingJournalObject(client, config, {
    key: input.key,
    runId: input.runId,
    installationGeneration: input.installationGeneration,
    action: input.action,
    expectedBytes: input.bytes,
    expectedPayloadSha256: input.digest,
    expectedRetainUntil: input.retainUntil,
  });
}

export async function writeReviewEmailErasureJournal(
  db: JournalDb,
  input: {
    runId: string;
    createdAt: Date;
    retentionBaseAt: Date;
    installationGeneration: number;
    payload: ReviewEmailErasureJournalPayload;
  },
  dependencies: { client?: S3Client; config?: ReviewEmailJournalConfig } = {},
): Promise<VerifiedJournalEvidence> {
  const config = resolveJournalConfig(dependencies.config);
  const client = dependencies.client ?? getReviewEmailJournalS3Client(config);
  const key = buildReviewEmailJournalKey(input.runId, input.createdAt);
  const bytes = canonicalJsonBytes(input.payload as unknown as CanonicalJsonValue);
  const digest = payloadSha256(bytes);
  const retainUntil = addDays(input.retentionBaseAt, config.objectLockRetentionDays);

  const intent = await db.reviewEmailDataSubjectRun.updateMany({
    where: {
      id: input.runId,
      OR: [
        { journalKey: null, journalPayloadSha256: null },
        { journalKey: key, journalPayloadSha256: digest },
      ],
    },
    data: {
      journalKey: key,
      journalPayloadSha256: digest,
      journalStatus: 'writing',
      journalRetentionBaseAt: input.retentionBaseAt,
      sanitizedErrorCode: null,
    },
  });
  if (intent.count !== 1) throw new ReviewEmailJournalError('journal_intent_conflict');

  let evidence: VerifiedJournalEvidence;
  try {
    evidence = await putJournalObject(client, config, {
      key,
      runId: input.runId,
      installationGeneration: input.installationGeneration,
      action: input.payload.action,
      bytes,
      digest,
      retainUntil,
    });
  } catch (error) {
    await db.reviewEmailDataSubjectRun.updateMany({
      where: { id: input.runId, journalKey: key, journalPayloadSha256: digest },
      data: {
        journalStatus: error instanceof ReviewEmailJournalError && error.code === 'journal_conflict' ? 'conflict' : 'write_uncertain',
        sanitizedErrorCode: error instanceof ReviewEmailJournalError ? error.code : 'journal_write_failed',
      },
    });
    if (error instanceof ReviewEmailJournalError && error.code === 'journal_conflict') reportJournalConflict();
    throw error;
  }
  await persistVerifiedEvidence(db, input.runId, { key, payloadSha256: digest }, evidence);
  return evidence;
}

export async function writeReviewEmailStoreErasureJournal(
  db: JournalDb,
  input: {
    runId: string;
    createdAt: Date;
    retentionBaseAt: Date;
    installationGeneration: number;
    payload: ReviewEmailStoreErasureJournalPayload;
  },
  dependencies: { client?: S3Client; config?: ReviewEmailJournalConfig } = {},
): Promise<VerifiedJournalEvidence> {
  const config = resolveJournalConfig(dependencies.config);
  const client = dependencies.client ?? getReviewEmailJournalS3Client(config);
  const key = buildReviewEmailJournalKey(input.runId, input.createdAt);
  const bytes = canonicalJsonBytes(input.payload as unknown as CanonicalJsonValue);
  const digest = payloadSha256(bytes);
  const retainUntil = addDays(input.retentionBaseAt, config.objectLockRetentionDays);
  const intent = await db.storeDataErasureRun.updateMany({
    where: {
      id: input.runId,
      OR: [
        { journalKey: null, journalPayloadSha256: null },
        { journalKey: key, journalPayloadSha256: digest },
      ],
    },
    data: {
      journalKey: key,
      journalPayloadSha256: digest,
      journalRetentionBaseAt: input.retentionBaseAt,
      journalStatus: 'writing',
      sanitizedErrorCode: null,
    },
  });
  if (intent.count !== 1) throw new ReviewEmailJournalError('journal_intent_conflict');
  try {
    const evidence = await putJournalObject(client, config, {
      key,
      runId: input.runId,
      installationGeneration: input.installationGeneration,
      action: input.payload.action,
      bytes,
      digest,
      retainUntil,
    });
    const persisted = await db.storeDataErasureRun.updateMany({
      where: { id: input.runId, journalKey: key, journalPayloadSha256: digest },
      data: {
        journalVersionId: evidence.versionId,
        journalEtag: evidence.etag,
        journalChecksumSha256: evidence.checksumSha256,
        journalRetainUntil: evidence.objectLockRetainUntil,
        journalStatus: 'verified',
        sanitizedErrorCode: null,
      },
    });
    if (persisted.count !== 1) throw new ReviewEmailJournalError('journal_evidence_cas_failed', true);
    return evidence;
  } catch (error) {
    await db.storeDataErasureRun.updateMany({
      where: { id: input.runId, journalKey: key, journalPayloadSha256: digest },
      data: {
        journalStatus: error instanceof ReviewEmailJournalError && error.code === 'journal_conflict' ? 'conflict' : 'write_uncertain',
        sanitizedErrorCode: error instanceof ReviewEmailJournalError ? error.code : 'journal_write_failed',
      },
    });
    if (error instanceof ReviewEmailJournalError && error.code === 'journal_conflict') reportJournalConflict();
    throw error;
  }
}

export const REVIEW_EMAIL_JOURNAL_GENESIS_KEY = `${JOURNAL_PREFIX}/coverage/genesis.json`;
