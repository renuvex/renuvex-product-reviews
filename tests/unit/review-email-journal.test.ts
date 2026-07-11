import { createHash } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';

const { captureException } = vi.hoisted(() => ({ captureException: vi.fn() }));

vi.mock('@sentry/nextjs', () => ({ captureException }));

import { canonicalJsonBytes } from '@/lib/review-email/canonical-json';
import {
  buildReviewEmailErasureJournalPayload,
  buildReviewEmailJournalKey,
  writeReviewEmailErasureJournal,
} from '@/lib/review-email/journal';

const config = {
  region: 'eu-central-1',
  bucket: 'renuvex-review-email-erasure-journal-test',
  oidcAudience: 'sts.amazonaws.com',
  activeRetentionDays: 35,
  objectLockRetentionDays: 42,
};

function payload() {
  return buildReviewEmailErasureJournalPayload({
    schemaVersion: 1,
    runId: '11111111-1111-4111-8111-111111111111',
    storeId: 'store-1',
    installationGeneration: 2,
    action: 'erase',
    exactHashKeyVersion: 1,
    foldedHashKeyVersion: 1,
    normalizationVersion: 2,
    foldedSubjectHash: 'h2f:1:folded',
    exactSubjectLookupHashes: ['h2e:2:exact', 'h2e:1:exact', 'h2e:2:exact'],
    foldedSubjectLookupHashes: ['h2f:1:folded'],
    opaqueResourceIds: ['review:z', 'request:a', 'request:a'],
    rowCounts: { reviews: 1, requests: 1 },
    actions: ['delete_verified_reviews', 'close_analytics'],
    createdAt: '2026-07-10T12:00:00.000Z',
    retentionBaseAt: '2026-07-10T12:00:00.000Z',
  });
}

function db() {
  return {
    reviewEmailDataSubjectRun: {
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
  };
}

describe('review email erasure journal', () => {
  it('builds deterministic keys and canonical payload bytes', () => {
    expect(buildReviewEmailJournalKey('run-1', new Date('2026-07-10T12:00:00.000Z'))).toBe(
      'erasure-journal/v1/2026/07/10/run-1.json',
    );
    expect(payload().opaqueResourceIds).toEqual(['request:a', 'review:z']);
    expect(payload().exactSubjectLookupHashes).toEqual(['h2e:1:exact', 'h2e:2:exact']);
    expect(canonicalJsonBytes({ z: 1, a: ['b', 'a'] }).toString('utf8')).toBe('{"a":["b","a"],"z":1}');
    expect(() => canonicalJsonBytes({ invalid: '\ud800' })).toThrow('canonical_json_lone_surrogate');
  });

  it('recovers a successful PUT followed by a DB crash from a verified 412 object', async () => {
    const body = canonicalJsonBytes(payload());
    const digest = createHash('sha256').update(body).digest('hex');
    const checksum = createHash('sha256').update(body).digest('base64');
    const retainUntil = new Date('2026-08-21T12:00:00.000Z');
    const send = vi.fn()
      .mockRejectedValueOnce(Object.assign(new Error('exists'), { name: 'PreconditionFailed', $metadata: { httpStatusCode: 412 } }))
      .mockResolvedValueOnce({ Versions: [{ Key: 'erasure-journal/v1/2026/07/10/11111111-1111-4111-8111-111111111111.json', VersionId: 'v1' }], DeleteMarkers: [] })
      .mockResolvedValueOnce({
        ContentLength: body.length,
        ContentType: 'application/json',
        ServerSideEncryption: 'AES256',
        ChecksumSHA256: checksum,
        ETag: '"etag"',
        Metadata: {
          'journal-schema-version': '1',
          'erasure-run-id': '11111111-1111-4111-8111-111111111111',
          'installation-generation': '2',
          'journal-action': 'erase',
          'payload-sha256': digest,
        },
      })
      .mockResolvedValueOnce({ Retention: { Mode: 'GOVERNANCE', RetainUntilDate: retainUntil } })
      .mockResolvedValueOnce({ Body: { transformToByteArray: vi.fn().mockResolvedValue(body) } });
    const database = db();

    const result = await writeReviewEmailErasureJournal(database as never, {
      runId: '11111111-1111-4111-8111-111111111111',
      createdAt: new Date('2026-07-10T12:00:00.000Z'),
      retentionBaseAt: new Date('2026-07-10T12:00:00.000Z'),
      installationGeneration: 2,
      payload: payload(),
    }, { config, client: { send } as never });

    expect(result).toMatchObject({ versionId: 'v1', checksumSha256: checksum, payloadSha256: digest });
    expect(database.reviewEmailDataSubjectRun.updateMany).toHaveBeenLastCalledWith(expect.objectContaining({
      data: expect.objectContaining({ journalStatus: 'verified', journalVersionId: 'v1' }),
    }));
  });

  it('fails closed when 412 recovery finds another payload or an extra version', async () => {
    const send = vi.fn()
      .mockRejectedValueOnce(Object.assign(new Error('exists'), { name: 'PreconditionFailed', $metadata: { httpStatusCode: 412 } }))
      .mockResolvedValueOnce({
        Versions: [
          { Key: 'erasure-journal/v1/2026/07/10/11111111-1111-4111-8111-111111111111.json', VersionId: 'v1' },
          { Key: 'erasure-journal/v1/2026/07/10/11111111-1111-4111-8111-111111111111.json', VersionId: 'v2' },
        ],
        DeleteMarkers: [],
      });

    await expect(writeReviewEmailErasureJournal(db() as never, {
      runId: '11111111-1111-4111-8111-111111111111',
      createdAt: new Date('2026-07-10T12:00:00.000Z'),
      retentionBaseAt: new Date('2026-07-10T12:00:00.000Z'),
      installationGeneration: 2,
      payload: payload(),
    }, { config, client: { send } as never })).rejects.toMatchObject({ code: 'journal_conflict' });
    expect(captureException).toHaveBeenCalledWith(expect.any(Error), {
      tags: { source: 'review-email-journal', task: 'journal-conflict' },
    });
  });
});
