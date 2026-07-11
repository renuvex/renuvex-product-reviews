import { createHash } from 'node:crypto';
import {
  GetObjectCommand,
  GetObjectLegalHoldCommand,
  GetObjectRetentionCommand,
  HeadObjectCommand,
  ListObjectVersionsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import type { PrismaClient } from '@prisma/client';
import { canonicalJsonBytes, type CanonicalJsonValue } from '@/lib/review-email/canonical-json';
import { getReviewEmailJournalConfig, isReviewEmailEnabled, type ReviewEmailJournalConfig } from '@/lib/review-email/config';
import {
  getReviewEmailJournalS3Client,
  REVIEW_EMAIL_JOURNAL_GENESIS_KEY,
  type ReviewEmailErasureJournalPayload,
  type ReviewEmailJournalPayload,
  type ReviewEmailStoreErasureJournalPayload,
  type VerifiedJournalEvidence,
} from '@/lib/review-email/journal';
import { replayReviewEmailDataSubjectJournalIntent } from '@/lib/review-email/data-subject';
import { replayStoreDataErasureJournalIntent } from '@/lib/review-email/erasure';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

type CoverageDb = Pick<PrismaClient, 'reviewEmailJournalCoverageCheck' | 'reviewEmailDataSubjectRun' | 'storeDataErasureRun'>;
type ListedVersion = { key: string; versionId: string; isLatest: boolean; lastModified: Date };
type ListedDeleteMarker = { key: string; versionId: string; isLatest: boolean; lastModified: Date };
type ListedObjects = { versions: ListedVersion[]; deleteMarkers: ListedDeleteMarker[] };

function sha256(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('hex');
}

function checksumSha256(bytes: Uint8Array): string {
  return createHash('sha256').update(bytes).digest('base64');
}

function addDays(value: Date, days: number): Date {
  return new Date(value.getTime() + days * 24 * 60 * 60 * 1000);
}

function journalDayPrefix(value: Date): string {
  return `erasure-journal/v1/${value.toISOString().slice(0, 10).replaceAll('-', '/')}/`;
}

function activeDayPrefixes(start: Date, end: Date): string[] {
  const prefixes: string[] = [];
  const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
  const final = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));
  while (cursor <= final) {
    prefixes.push(journalDayPrefix(cursor));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return prefixes;
}

async function listVersionsForPrefix(client: S3Client, bucket: string, prefix: string): Promise<ListedObjects> {
  const versions: ListedVersion[] = [];
  const deleteMarkers: ListedDeleteMarker[] = [];
  let keyMarker: string | undefined;
  let versionIdMarker: string | undefined;
  do {
    const page = await client.send(new ListObjectVersionsCommand({
      Bucket: bucket,
      Prefix: prefix,
      KeyMarker: keyMarker,
      VersionIdMarker: versionIdMarker,
    }));
    for (const version of page.Versions ?? []) {
      if (!version.Key || !version.VersionId || !version.Key.startsWith(prefix)) continue;
      if (typeof version.IsLatest !== 'boolean' || !version.LastModified) {
        throw new Error('journal_version_listing_invalid');
      }
      versions.push({
        key: version.Key,
        versionId: version.VersionId,
        isLatest: version.IsLatest,
        lastModified: version.LastModified,
      });
    }
    for (const marker of page.DeleteMarkers ?? []) {
      if (!marker.Key || !marker.VersionId || !marker.Key.startsWith(prefix)) continue;
      if (typeof marker.IsLatest !== 'boolean' || !marker.LastModified) {
        throw new Error('journal_delete_marker_listing_invalid');
      }
      deleteMarkers.push({
        key: marker.Key,
        versionId: marker.VersionId,
        isLatest: marker.IsLatest,
        lastModified: marker.LastModified,
      });
    }
    if (page.IsTruncated && (!page.NextKeyMarker || !page.NextVersionIdMarker)) {
      throw new Error('journal_version_pagination_invalid');
    }
    keyMarker = page.IsTruncated ? page.NextKeyMarker : undefined;
    versionIdMarker = page.IsTruncated ? page.NextVersionIdMarker : undefined;
  } while (keyMarker);
  return { versions, deleteMarkers };
}

async function readObjectBytes(client: S3Client, config: ReviewEmailJournalConfig, item: ListedVersion) {
  const [head, object] = await Promise.all([
    client.send(new HeadObjectCommand({
      Bucket: config.bucket,
      Key: item.key,
      VersionId: item.versionId,
      ChecksumMode: 'ENABLED',
    })),
    client.send(new GetObjectCommand({ Bucket: config.bucket, Key: item.key, VersionId: item.versionId })),
  ]);
  const bytes = object.Body ? Buffer.from(await object.Body.transformToByteArray()) : Buffer.alloc(0);
  if (
    head.ContentLength !== bytes.length ||
    head.ContentType !== 'application/json' ||
    head.ServerSideEncryption !== 'AES256' ||
    head.ChecksumSHA256 !== checksumSha256(bytes)
  ) {
    throw new Error('journal_object_storage_contract_invalid');
  }
  const parsed = JSON.parse(bytes.toString('utf8')) as CanonicalJsonValue;
  if (!bytes.equals(canonicalJsonBytes(parsed))) throw new Error('journal_payload_not_canonical');
  return { head, bytes, payload: parsed as Record<string, unknown>, digest: sha256(bytes) };
}

async function readVerifiedGenesis(client: S3Client, config: ReviewEmailJournalConfig, item: ListedVersion) {
  const [{ head, payload, digest }, legalHold] = await Promise.all([
    readObjectBytes(client, config, item),
    client.send(new GetObjectLegalHoldCommand({ Bucket: config.bucket, Key: item.key, VersionId: item.versionId })),
  ]);
  if (
    head.Metadata?.['journal-schema-version'] !== '1' ||
    head.Metadata?.['erasure-run-id'] !== 'coverage-genesis' ||
    head.Metadata?.['installation-generation'] !== '0' ||
    head.Metadata?.['journal-action'] !== 'coverage_genesis' ||
    head.Metadata?.['payload-sha256'] !== digest ||
    legalHold.LegalHold?.Status !== 'ON'
  ) {
    throw new Error('journal_genesis_contract_invalid');
  }
  return payload;
}

function parseErasurePayload(value: Record<string, unknown>): ReviewEmailErasureJournalPayload {
  const stringArray = (candidate: unknown): candidate is string[] => Array.isArray(candidate) && candidate.every((item) => typeof item === 'string');
  const rowCounts = value.rowCounts;
  if (
    value.schemaVersion !== 1 || value.action !== 'erase' || typeof value.runId !== 'string' ||
    typeof value.storeId !== 'string' || !Number.isInteger(value.installationGeneration) ||
    !Number.isInteger(value.exactHashKeyVersion) || !Number.isInteger(value.foldedHashKeyVersion) ||
    !Number.isInteger(value.normalizationVersion) || typeof value.foldedSubjectHash !== 'string' ||
    !stringArray(value.exactSubjectLookupHashes) || !stringArray(value.foldedSubjectLookupHashes) || !stringArray(value.opaqueResourceIds) ||
    !stringArray(value.actions) || typeof value.createdAt !== 'string' || typeof value.retentionBaseAt !== 'string' ||
    !rowCounts || typeof rowCounts !== 'object' || Array.isArray(rowCounts) ||
    Object.values(rowCounts).some((count) => typeof count !== 'number' || !Number.isInteger(count) || count < 0)
  ) {
    throw new Error('journal_payload_schema_invalid');
  }
  return value as unknown as ReviewEmailErasureJournalPayload;
}

function parseStoreErasurePayload(value: Record<string, unknown>): ReviewEmailStoreErasureJournalPayload {
  const stringArray = (candidate: unknown): candidate is string[] => Array.isArray(candidate) && candidate.every((item) => typeof item === 'string');
  if (
    value.schemaVersion !== 1 || value.action !== 'store_uninstall' || typeof value.runId !== 'string' ||
    typeof value.storeId !== 'string' || !Number.isInteger(value.installationGeneration) ||
    !stringArray(value.actions) || typeof value.createdAt !== 'string' || typeof value.retentionBaseAt !== 'string'
  ) {
    throw new Error('journal_payload_schema_invalid');
  }
  return value as unknown as ReviewEmailStoreErasureJournalPayload;
}

function parseJournalPayload(value: Record<string, unknown>): ReviewEmailJournalPayload {
  if (value.action === 'erase') return parseErasurePayload(value);
  if (value.action === 'store_uninstall') return parseStoreErasurePayload(value);
  throw new Error('journal_payload_action_invalid');
}

async function readVerifiedErasurePayload(
  client: S3Client,
  config: ReviewEmailJournalConfig,
  item: ListedVersion,
): Promise<{ payload: ReviewEmailJournalPayload; evidence: VerifiedJournalEvidence }> {
  const [{ head, bytes, payload: raw, digest }, retention] = await Promise.all([
    readObjectBytes(client, config, item),
    client.send(new GetObjectRetentionCommand({ Bucket: config.bucket, Key: item.key, VersionId: item.versionId })),
  ]);
  const payload = parseJournalPayload(raw);
  const retentionBaseAt = new Date(payload.retentionBaseAt);
  const createdAt = new Date(payload.createdAt);
  if (!Number.isFinite(retentionBaseAt.getTime()) || !Number.isFinite(createdAt.getTime())) {
    throw new Error('journal_payload_timestamp_invalid');
  }
  const expectedKey = `erasure-journal/v1/${createdAt.toISOString().slice(0, 10).replaceAll('-', '/')}/${payload.runId}.json`;
  const retainUntil = retention.Retention?.RetainUntilDate;
  if (
    item.key !== expectedKey ||
    head.Metadata?.['journal-schema-version'] !== '1' ||
    head.Metadata?.['erasure-run-id'] !== payload.runId ||
    head.Metadata?.['installation-generation'] !== String(payload.installationGeneration) ||
    head.Metadata?.['journal-action'] !== payload.action ||
    head.Metadata?.['payload-sha256'] !== digest ||
    retention.Retention?.Mode !== 'GOVERNANCE' ||
    !retainUntil || retainUntil < addDays(retentionBaseAt, config.objectLockRetentionDays)
  ) {
    throw new Error('journal_object_contract_invalid');
  }
  return {
    payload,
    evidence: {
      key: item.key,
      payloadSha256: digest,
      versionId: item.versionId,
      etag: head.ETag ?? null,
      checksumSha256: head.ChecksumSHA256 ?? checksumSha256(bytes),
      objectLockRetainUntil: retainUntil,
    },
  };
}

export async function runReviewEmailJournalCoverageCheck(
  db: CoverageDb,
  input: { restoreTargetAt?: Date; replayOrphanIntents?: boolean; now?: Date } = {},
  dependencies: {
    client?: S3Client;
    config?: ReviewEmailJournalConfig;
    replayIntent?: (payload: ReviewEmailErasureJournalPayload, evidence: VerifiedJournalEvidence, now: Date) => Promise<unknown>;
    replayStoreIntent?: (payload: ReviewEmailStoreErasureJournalPayload, evidence: VerifiedJournalEvidence, now: Date) => Promise<unknown>;
  } = {},
) {
  const now = input.now ?? new Date();
  let config: ReviewEmailJournalConfig;
  try {
    config = dependencies.config ?? getReviewEmailJournalConfig();
  } catch {
    throw new Error('journal_coverage_not_configured');
  }
  const client = dependencies.client ?? getReviewEmailJournalS3Client(config);
  const replayIntent = dependencies.replayIntent ?? replayReviewEmailDataSubjectJournalIntent;
  const replayStoreIntent = dependencies.replayStoreIntent ?? replayStoreDataErasureJournalIntent;
  const check = await db.reviewEmailJournalCoverageCheck.create({
    data: { status: 'running', restoreTargetAt: input.restoreTargetAt ?? null },
  });
  try {
    const genesisListed = await listVersionsForPrefix(client, config.bucket, REVIEW_EMAIL_JOURNAL_GENESIS_KEY);
    const genesisItem = genesisListed.versions.filter((item) => item.key === REVIEW_EMAIL_JOURNAL_GENESIS_KEY);
    const genesisMarkers = genesisListed.deleteMarkers.filter((item) => item.key === REVIEW_EMAIL_JOURNAL_GENESIS_KEY);
    if (genesisItem.length !== 1 || genesisMarkers.length !== 0) {
      throw new Error('journal_genesis_missing_or_conflicting');
    }
    const genesis = await readVerifiedGenesis(client, config, genesisItem[0]!);
    const coverageStartAtValue = genesis.journalCoverageStartAt;
    if (typeof coverageStartAtValue !== 'string') throw new Error('journal_genesis_invalid');
    const coverageStartAt = new Date(coverageStartAtValue);
    if (!Number.isFinite(coverageStartAt.getTime())) throw new Error('journal_genesis_invalid');
    const earliestSafeRestoreAt = new Date(Math.max(
      coverageStartAt.getTime(),
      now.getTime() - config.activeRetentionDays * 24 * 60 * 60 * 1000,
    ));
    if (input.restoreTargetAt && input.restoreTargetAt < earliestSafeRestoreAt) {
      throw new Error('restore_target_outside_journal_coverage');
    }

    const listedPages = await Promise.all(
      activeDayPrefixes(earliestSafeRestoreAt, now).map((prefix) => listVersionsForPrefix(client, config.bucket, prefix)),
    );
    const versions = listedPages.flatMap((page) => page.versions);
    const deleteMarkers = listedPages.flatMap((page) => page.deleteMarkers);
    const allVersionKeys = new Set(versions.map((item) => item.key));
    const activeVersionsByKey = new Map<string, Array<{
      item: ListedVersion;
      verified: Awaited<ReturnType<typeof readVerifiedErasurePayload>>;
    }>>();
    for (const item of versions) {
      const verified = await readVerifiedErasurePayload(client, config, item);
      const createdAt = new Date(verified.payload.createdAt);
      if (createdAt < earliestSafeRestoreAt) continue;
      const entries = activeVersionsByKey.get(item.key) ?? [];
      entries.push({ item, verified });
      activeVersionsByKey.set(item.key, entries);
    }

    const markersByKey = new Map<string, ListedDeleteMarker[]>();
    for (const marker of deleteMarkers) {
      const entries = markersByKey.get(marker.key) ?? [];
      entries.push(marker);
      markersByKey.set(marker.key, entries);
    }

    let conflicts = 0;
    let expectedLifecycleDeleteMarkers = 0;
    const payloads = new Map<string, Awaited<ReturnType<typeof readVerifiedErasurePayload>>>();
    for (const [key, entries] of activeVersionsByKey) {
      if (entries.length !== 1) {
        conflicts += 1;
        continue;
      }
      const entry = entries[0]!;
      const markers = markersByKey.get(key) ?? [];
      if (markers.length === 0) {
        if (!entry.item.isLatest) {
          conflicts += 1;
          continue;
        }
      } else if (markers.length === 1) {
        const marker = markers[0]!;
        const earliestExpectedMarkerAt = addDays(entry.item.lastModified, config.activeRetentionDays);
        if (!marker.isLatest || entry.item.isLatest || marker.lastModified < earliestExpectedMarkerAt) {
          conflicts += 1;
          continue;
        }
        expectedLifecycleDeleteMarkers += 1;
      } else {
        conflicts += 1;
        continue;
      }
      const verified = entry.verified;
      if (payloads.has(verified.payload.runId)) {
        conflicts += 1;
        continue;
      }
      payloads.set(verified.payload.runId, verified);
    }
    for (const key of markersByKey.keys()) {
      if (activeVersionsByKey.has(key)) continue;
      if (allVersionKeys.has(key)) continue;
      conflicts += 1;
    }

    const runs = await db.reviewEmailDataSubjectRun.findMany({
      where: {
        createdAt: { gte: earliestSafeRestoreAt },
        OR: [{ journalStatus: 'verified' }, { status: { in: ['processing', 'succeeded', 'journal_pending', 'error'] } }],
      },
      select: { id: true, journalKey: true, journalPayloadSha256: true, status: true },
    });
    const storeRuns = await db.storeDataErasureRun.findMany({
      where: {
        createdAt: { gte: earliestSafeRestoreAt },
        OR: [{ journalStatus: 'verified' }, { status: { in: ['processing', 'pending', 'error', 'succeeded'] } }],
      },
      select: { id: true, journalKey: true, journalPayloadSha256: true, status: true },
    });
    let missingIntents = 0;
    const replayQueue: Array<Awaited<ReturnType<typeof readVerifiedErasurePayload>>> = [];
    const runStatuses = new Map([...runs, ...storeRuns].map((run) => [run.id, run.status]));
    for (const run of [...runs, ...storeRuns]) {
      const item = payloads.get(run.id);
      if (!item || item.evidence.key !== run.journalKey || item.evidence.payloadSha256 !== run.journalPayloadSha256) {
        missingIntents += 1;
        continue;
      }
      const complete = item.payload.action === 'erase'
        ? run.status === 'succeeded'
        : run.status === 'succeeded' || run.status === 'stale_ignored';
      if (!complete) {
        if (!input.replayOrphanIntents) missingIntents += 1;
        else replayQueue.push(item);
      }
    }

    let orphanIntents = 0;
    let supersededIntents = 0;
    const knownRunIds = new Set(runStatuses.keys());
    for (const [runId, item] of payloads) {
      if (knownRunIds.has(runId)) continue;
      if (item.payload.action === 'erase') {
        const terminalUninstall = [...payloads.values()].find((candidate) => (
          candidate.payload.action === 'store_uninstall' &&
          candidate.payload.storeId === item.payload.storeId &&
          candidate.payload.installationGeneration === item.payload.installationGeneration &&
          new Date(candidate.payload.createdAt) >= new Date(item.payload.createdAt) &&
          ['succeeded', 'stale_ignored'].includes(runStatuses.get(candidate.payload.runId) ?? '')
        ));
        if (terminalUninstall) {
          supersededIntents += 1;
          continue;
        }
      }
      orphanIntents += 1;
      if (input.replayOrphanIntents) replayQueue.push(item);
    }
    if (input.replayOrphanIntents) {
      replayQueue.sort((left, right) => Number(left.payload.action === 'store_uninstall') - Number(right.payload.action === 'store_uninstall'));
      for (const item of replayQueue) {
        if (item.payload.action === 'erase') await replayIntent(item.payload, item.evidence, now);
        else await replayStoreIntent(item.payload, item.evidence, now);
      }
    }

    const unresolvedOrphans = input.replayOrphanIntents ? 0 : orphanIntents;
    const status = conflicts === 0 && missingIntents === 0 && unresolvedOrphans === 0 ? 'passed' : 'failed';
    return await db.reviewEmailJournalCoverageCheck.update({
      where: { id: check.id },
      data: {
        status,
        coverageStartAt,
        earliestSafeRestoreAt,
        checkedObjects: [...activeVersionsByKey.values()].reduce((total, entries) => total + entries.length, 0) + 1,
        missingIntents,
        conflictingObjects: conflicts,
        orphanIntents,
        details: {
          replayOrphanIntents: input.replayOrphanIntents === true,
          activePrefixes: activeDayPrefixes(earliestSafeRestoreAt, now).length,
          expectedLifecycleDeleteMarkers,
          supersededIntents,
        },
        sanitizedErrorCode: status === 'passed' ? null : 'journal_coverage_incomplete',
        finishedAt: now,
      },
    });
  } catch (error) {
    const failure = normalizeReviewEmailFailure('journal_coverage', error, { retryable: true });
    await db.reviewEmailJournalCoverageCheck.update({
      where: { id: check.id },
      data: {
        status: 'failed',
        sanitizedErrorCode: failure.code,
        finishedAt: now,
      },
    });
    reportReviewEmailFailure('journal_coverage', failure, check.id);
    throw error;
  }
}

export function assertReviewEmailRestoreCanEnableOutbound(input: { coverageStatus: string }): void {
  if (isReviewEmailEnabled()) throw new Error('review_email_outbound_must_remain_disabled_during_restore');
  if (input.coverageStatus !== 'passed') throw new Error('review_email_journal_coverage_not_verified');
}
