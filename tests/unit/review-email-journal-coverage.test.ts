import { createHash } from 'node:crypto';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { canonicalJsonBytes } from '@/lib/review-email/canonical-json';

vi.mock('@/lib/review-email/data-subject', () => ({ replayReviewEmailDataSubjectJournalIntent: vi.fn() }));
vi.mock('@/lib/review-email/erasure', () => ({ replayStoreDataErasureJournalIntent: vi.fn() }));
vi.mock('@sentry/nextjs', () => ({ captureException: vi.fn() }));

import { runReviewEmailJournalCoverageCheck } from '@/lib/review-email/journal-coverage';

const config = {
  region: 'eu-central-1', bucket: 'journal-test', oidcAudience: 'sts.amazonaws.com',
  activeRetentionDays: 35, objectLockRetentionDays: 42,
};
const NOW = new Date('2026-07-10T12:00:00.000Z');
const GENESIS_KEY = 'erasure-journal/v1/coverage/genesis.json';

type ErasurePayload = {
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

type VersionFixture = {
  payload: ErasurePayload;
  key: string;
  versionId: string;
  isLatest: boolean;
  lastModified: Date;
};

type MarkerFixture = {
  key: string;
  versionId: string;
  isLatest: boolean;
  lastModified: Date;
};

function digest(bytes: Buffer, encoding: 'hex' | 'base64' = 'hex'): string {
  return createHash('sha256').update(bytes).digest(encoding);
}

function keyFor(runId: string, createdAt: Date): string {
  return `erasure-journal/v1/${createdAt.toISOString().slice(0, 10).replaceAll('-', '/')}/${runId}.json`;
}

function payload(runId: string, createdAt: Date): ErasurePayload {
  return {
    schemaVersion: 1,
    runId,
    storeId: 'store-1',
    installationGeneration: 1,
    action: 'erase',
    exactHashKeyVersion: 2,
    foldedHashKeyVersion: 2,
    normalizationVersion: 2,
    foldedSubjectHash: `h2f:2:${runId}`,
    exactSubjectLookupHashes: [`h2e:1:${runId}`, `h2e:2:${runId}`],
    foldedSubjectLookupHashes: [`h2f:1:${runId}`, `h2f:2:${runId}`],
    opaqueResourceIds: [`request:${runId}`],
    rowCounts: { requests: 1 },
    actions: ['conditionally_erase_order_details'],
    createdAt: createdAt.toISOString(),
    retentionBaseAt: createdAt.toISOString(),
  };
}

function version(runId: string, createdAt: Date, input: Partial<VersionFixture> = {}): VersionFixture {
  return {
    payload: payload(runId, createdAt),
    key: keyFor(runId, createdAt),
    versionId: `${runId}-v1`,
    isLatest: true,
    lastModified: createdAt,
    ...input,
  };
}

function storageEvidence(bytes: Buffer, metadata: Record<string, string>) {
  return {
    ContentLength: bytes.length,
    ContentType: 'application/json',
    ServerSideEncryption: 'AES256',
    ChecksumSHA256: digest(bytes, 'base64'),
    ETag: '"etag"',
    Metadata: metadata,
  };
}

function dayPrefix(key: string): string {
  return `${key.split('/').slice(0, 5).join('/')}/`;
}

async function runScenario(input: {
  versions?: VersionFixture[];
  markers?: MarkerFixture[];
  includeRuns?: boolean;
  replayOrphanIntents?: boolean;
  pagedPrefix?: string;
  pages?: Array<Record<string, unknown>>;
}) {
  const versions = input.versions ?? [];
  const markers = input.markers ?? [];
  const genesisBytes = canonicalJsonBytes({
    initialRetentionContract: {
      journalActiveRetentionDays: 35,
      journalObjectLockRetentionDays: 42,
      journalVersionTailDays: 7,
      longestRegisteredDatabaseRestoreWindowDays: 30,
    },
    journalCoverageStartAt: '2026-06-01T00:00:00.000Z',
    schemaVersion: 1,
  });
  const genesisDigest = digest(genesisBytes);
  const objectEvidence = new Map(versions.map((item) => {
    const bytes = canonicalJsonBytes(item.payload);
    return [`${item.key}:${item.versionId}`, { item, bytes, payloadDigest: digest(bytes) }] as const;
  }));
  const listedInputs: Array<Record<string, unknown>> = [];
  const send = vi.fn(async (command: { constructor: { name: string }; input: Record<string, unknown> }) => {
    const name = command.constructor.name;
    const commandInput = command.input;
    if (name === 'ListObjectVersionsCommand') {
      listedInputs.push(commandInput);
      const prefix = String(commandInput.Prefix);
      if (prefix === GENESIS_KEY) {
        return {
          Versions: [{ Key: GENESIS_KEY, VersionId: 'genesis-v1', IsLatest: true, LastModified: new Date('2026-06-01T00:00:00.000Z') }],
          DeleteMarkers: [],
        };
      }
      if (input.pagedPrefix === prefix && input.pages) {
        return input.pages[commandInput.KeyMarker ? 1 : 0] ?? { Versions: [], DeleteMarkers: [] };
      }
      return {
        Versions: versions
          .filter((item) => dayPrefix(item.key) === prefix)
          .map((item) => ({ Key: item.key, VersionId: item.versionId, IsLatest: item.isLatest, LastModified: item.lastModified })),
        DeleteMarkers: markers
          .filter((item) => dayPrefix(item.key) === prefix)
          .map((item) => ({ Key: item.key, VersionId: item.versionId, IsLatest: item.isLatest, LastModified: item.lastModified })),
      };
    }

    const isGenesis = commandInput.Key === GENESIS_KEY;
    const evidence = isGenesis
      ? null
      : objectEvidence.get(`${String(commandInput.Key)}:${String(commandInput.VersionId)}`);
    if (!isGenesis && !evidence) throw new Error(`missing fixture for ${String(commandInput.Key)}`);
    if (name === 'HeadObjectCommand') {
      return storageEvidence(isGenesis ? genesisBytes : evidence!.bytes, isGenesis ? {
        'journal-schema-version': '1',
        'erasure-run-id': 'coverage-genesis',
        'installation-generation': '0',
        'journal-action': 'coverage_genesis',
        'payload-sha256': genesisDigest,
      } : {
        'journal-schema-version': '1',
        'erasure-run-id': evidence!.item.payload.runId,
        'installation-generation': '1',
        'journal-action': 'erase',
        'payload-sha256': evidence!.payloadDigest,
      });
    }
    if (name === 'GetObjectCommand') {
      const bytes = isGenesis ? genesisBytes : evidence!.bytes;
      return { Body: { transformToByteArray: vi.fn().mockResolvedValue(bytes) } };
    }
    if (name === 'GetObjectLegalHoldCommand') return { LegalHold: { Status: 'ON' } };
    if (name === 'GetObjectRetentionCommand') {
      const base = new Date(evidence!.item.payload.retentionBaseAt);
      return { Retention: { Mode: 'GOVERNANCE', RetainUntilDate: new Date(base.getTime() + 42 * 86_400_000) } };
    }
    throw new Error(`unexpected command ${name}`);
  });
  const replayIntent = vi.fn().mockResolvedValue({ status: 'succeeded' });
  const update = vi.fn(async ({ data }: { data: Record<string, unknown> }) => ({ id: 'check-1', ...data }));
  const runs = input.includeRuns === false ? [] : versions.map((item) => {
    const evidence = objectEvidence.get(`${item.key}:${item.versionId}`)!;
    return {
      id: item.payload.runId,
      journalKey: item.key,
      journalPayloadSha256: evidence.payloadDigest,
      status: 'succeeded',
    };
  });
  const db = {
    reviewEmailJournalCoverageCheck: { create: vi.fn().mockResolvedValue({ id: 'check-1' }), update },
    reviewEmailDataSubjectRun: { findMany: vi.fn().mockResolvedValue(runs) },
    storeDataErasureRun: { findMany: vi.fn().mockResolvedValue([]) },
  };

  const result = await runReviewEmailJournalCoverageCheck(
    db as never,
    { now: NOW, replayOrphanIntents: input.replayOrphanIntents },
    { config, client: { send } as never, replayIntent },
  );
  return { result, replayIntent, listedInputs };
}

describe('review email journal coverage', () => {
  beforeEach(() => vi.spyOn(console, 'error').mockImplementation(() => undefined));
  afterEach(() => vi.restoreAllMocks());

  it('checks only the active horizon and replays an orphan intent before passing', async () => {
    const item = version('11111111-1111-4111-8111-111111111111', NOW);
    const { result, replayIntent, listedInputs } = await runScenario({
      versions: [item],
      includeRuns: false,
      replayOrphanIntents: true,
    });

    expect(result.status).toBe('passed');
    expect(replayIntent).toHaveBeenCalledWith(item.payload, expect.objectContaining({ key: item.key }), NOW);
    expect(listedInputs.map((entry) => entry.Prefix)).not.toContain('erasure-journal/v1/');
    expect(listedInputs.map((entry) => entry.Prefix)).toContain(dayPrefix(item.key));
  });

  it('ignores a boundary-day payload that predates the exact active horizon', async () => {
    const oldBoundaryItem = version(
      '22222222-2222-4222-8222-222222222222',
      new Date('2026-06-05T08:00:00.000Z'),
    );
    const { result } = await runScenario({ versions: [oldBoundaryItem], includeRuns: false });

    expect(result.status).toBe('passed');
    expect(result.checkedObjects).toBe(1);
  });

  it('accepts one latest lifecycle delete marker after active retention', async () => {
    const createdAt = new Date('2026-06-05T12:00:00.000Z');
    const item = version('33333333-3333-4333-8333-333333333333', createdAt, { isLatest: false });
    const marker = {
      key: item.key,
      versionId: 'marker-1',
      isLatest: true,
      lastModified: new Date('2026-07-10T12:00:00.000Z'),
    };
    const { result } = await runScenario({ versions: [item], markers: [marker] });

    expect(result.status).toBe('passed');
    expect(result.details).toMatchObject({ expectedLifecycleDeleteMarkers: 1 });
  });

  it.each([
    ['early', { isLatest: true, lastModified: new Date('2026-07-09T12:00:00.000Z') }],
    ['non-latest', { isLatest: false, lastModified: new Date('2026-07-10T12:00:00.000Z') }],
  ])('fails closed for a %s delete marker', async (_name, markerOverride) => {
    const createdAt = new Date('2026-06-05T12:00:00.000Z');
    const item = version('44444444-4444-4444-8444-444444444444', createdAt, { isLatest: false });
    const { result } = await runScenario({
      versions: [item],
      markers: [{ key: item.key, versionId: 'marker-1', ...markerOverride }],
    });

    expect(result.status).toBe('failed');
    expect(result.conflictingObjects).toBeGreaterThan(0);
  });

  it('fails closed for multiple markers and marker-only keys', async () => {
    const createdAt = new Date('2026-06-05T12:00:00.000Z');
    const item = version('55555555-5555-4555-8555-555555555555', createdAt, { isLatest: false });
    const markerTime = new Date('2026-07-10T12:00:00.000Z');
    const markerOnlyKey = keyFor('66666666-6666-4666-8666-666666666666', createdAt);
    const { result } = await runScenario({
      versions: [item],
      markers: [
        { key: item.key, versionId: 'marker-1', isLatest: true, lastModified: markerTime },
        { key: item.key, versionId: 'marker-2', isLatest: false, lastModified: markerTime },
        { key: markerOnlyKey, versionId: 'marker-only', isLatest: true, lastModified: markerTime },
      ],
    });

    expect(result.status).toBe('failed');
    expect(result.conflictingObjects).toBe(2);
  });

  it('uses both continuation markers when versions and markers span pages', async () => {
    const createdAt = new Date('2026-06-05T12:00:00.000Z');
    const first = version('77777777-7777-4777-8777-777777777777', createdAt, { isLatest: false });
    const second = version('88888888-8888-4888-8888-888888888888', new Date('2026-06-05T13:00:00.000Z'));
    const prefix = dayPrefix(first.key);
    const pages = [
      {
        Versions: [{ Key: first.key, VersionId: first.versionId, IsLatest: false, LastModified: first.lastModified }],
        DeleteMarkers: [],
        IsTruncated: true,
        NextKeyMarker: first.key,
        NextVersionIdMarker: first.versionId,
      },
      {
        Versions: [{ Key: second.key, VersionId: second.versionId, IsLatest: true, LastModified: second.lastModified }],
        DeleteMarkers: [{ Key: first.key, VersionId: 'marker-1', IsLatest: true, LastModified: NOW }],
        IsTruncated: false,
      },
    ];
    const { result, listedInputs } = await runScenario({
      versions: [first, second],
      pagedPrefix: prefix,
      pages,
    });

    expect(result.status).toBe('passed');
    expect(listedInputs).toContainEqual(expect.objectContaining({
      Prefix: prefix,
      KeyMarker: first.key,
      VersionIdMarker: first.versionId,
    }));
  });
});
