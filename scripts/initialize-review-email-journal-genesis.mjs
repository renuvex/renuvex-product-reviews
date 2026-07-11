import { createHash } from 'node:crypto';
import {
  GetObjectCommand,
  GetObjectLegalHoldCommand,
  GetObjectRetentionCommand,
  HeadObjectCommand,
  ListObjectVersionsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { calculateReviewEmailJournalRetention } from './calculate-review-email-journal-retention.mjs';

const apply = process.argv.includes('--apply');
const region = process.env.AWS_REVIEW_EMAIL_JOURNAL_REGION?.trim();
const bucket = process.env.AWS_REVIEW_EMAIL_JOURNAL_BUCKET?.trim();
const coverageStartAt = process.env.REVIEW_EMAIL_JOURNAL_COVERAGE_START_AT?.trim();
if (!region || !bucket || !coverageStartAt || !Number.isFinite(new Date(coverageStartAt).getTime())) {
  throw new Error('AWS_REVIEW_EMAIL_JOURNAL_REGION, AWS_REVIEW_EMAIL_JOURNAL_BUCKET, and an ISO REVIEW_EMAIL_JOURNAL_COVERAGE_START_AT are required');
}

const retention = calculateReviewEmailJournalRetention();
const key = 'erasure-journal/v1/coverage/genesis.json';
const payload = {
  initialRetentionContract: retention,
  journalCoverageStartAt: new Date(coverageStartAt).toISOString(),
  schemaVersion: 1,
};

function canonicalize(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`;
  return `{${Object.keys(value).sort().map((name) => `${JSON.stringify(name)}:${canonicalize(value[name])}`).join(',')}}`;
}

const bytes = Buffer.from(canonicalize(payload), 'utf8');
const payloadDigest = createHash('sha256').update(bytes).digest('hex');
const checksum = createHash('sha256').update(bytes).digest('base64');
const retentionBaseAt = new Date(Math.max(Date.now(), new Date(coverageStartAt).getTime()));
const retainUntil = new Date(retentionBaseAt.getTime() + retention.journalObjectLockRetentionDays * 24 * 60 * 60 * 1000);
if (!apply) {
  console.log(JSON.stringify({ mode: 'dry-run', bucket, region, key, payloadDigest, retainUntil: retainUntil.toISOString() }, null, 2));
  process.exit(0);
}

const client = new S3Client({ region });
try {
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: bytes,
    ContentType: 'application/json',
    ChecksumSHA256: checksum,
    IfNoneMatch: '*',
    ServerSideEncryption: 'AES256',
    ObjectLockMode: 'GOVERNANCE',
    ObjectLockRetainUntilDate: retainUntil,
    ObjectLockLegalHoldStatus: 'ON',
    Metadata: {
      'journal-schema-version': '1',
      'erasure-run-id': 'coverage-genesis',
      'installation-generation': '0',
      'journal-action': 'coverage_genesis',
      'payload-sha256': payloadDigest,
    },
  }));
  console.log(JSON.stringify({ status: 'created', key, payloadDigest }, null, 2));
} catch (error) {
  if (error?.$metadata?.httpStatusCode !== 412 && error?.name !== 'PreconditionFailed') throw error;
  const listed = await client.send(new ListObjectVersionsCommand({ Bucket: bucket, Prefix: key }));
  const versions = (listed.Versions ?? []).filter((version) => version.Key === key && version.VersionId);
  const markers = (listed.DeleteMarkers ?? []).filter((marker) => marker.Key === key);
  if (versions.length !== 1 || markers.length !== 0) throw new Error('journal genesis object has conflicting versions');
  const versionId = versions[0].VersionId;
  const [head, object, legalHold, objectRetention] = await Promise.all([
    client.send(new HeadObjectCommand({ Bucket: bucket, Key: key, VersionId: versionId, ChecksumMode: 'ENABLED' })),
    client.send(new GetObjectCommand({ Bucket: bucket, Key: key, VersionId: versionId })),
    client.send(new GetObjectLegalHoldCommand({ Bucket: bucket, Key: key, VersionId: versionId })),
    client.send(new GetObjectRetentionCommand({ Bucket: bucket, Key: key, VersionId: versionId })),
  ]);
  const existing = object.Body ? Buffer.from(await object.Body.transformToByteArray()) : Buffer.alloc(0);
  if (
    !existing.equals(bytes) ||
    head.ContentLength !== bytes.length ||
    head.ContentType !== 'application/json' ||
    head.ServerSideEncryption !== 'AES256' ||
    head.Metadata?.['payload-sha256'] !== payloadDigest ||
    head.Metadata?.['journal-schema-version'] !== '1' ||
    head.Metadata?.['erasure-run-id'] !== 'coverage-genesis' ||
    head.Metadata?.['installation-generation'] !== '0' ||
    head.Metadata?.['journal-action'] !== 'coverage_genesis' ||
    head.ChecksumSHA256 !== checksum ||
    legalHold.LegalHold?.Status !== 'ON' ||
    objectRetention.Retention?.Mode !== 'GOVERNANCE' ||
    !objectRetention.Retention.RetainUntilDate
  ) {
    throw new Error('journal genesis object conflicts with the approved coverage contract');
  }
  console.log(JSON.stringify({ status: 'already_verified', key, payloadDigest }, null, 2));
}
