import { GetObjectRetentionCommand, ListObjectVersionsCommand, PutObjectRetentionCommand, S3Client } from '@aws-sdk/client-s3';
import { calculateReviewEmailJournalRetention } from './calculate-review-email-journal-retention.mjs';

const apply = process.argv.includes('--apply');
const approval = process.argv.find((value) => value.startsWith('--approved-change-id='))?.split('=')[1];
const region = process.env.AWS_REVIEW_EMAIL_JOURNAL_REGION?.trim();
const bucket = process.env.AWS_REVIEW_EMAIL_JOURNAL_BUCKET?.trim();
if (!region || !bucket) throw new Error('AWS_REVIEW_EMAIL_JOURNAL_REGION and AWS_REVIEW_EMAIL_JOURNAL_BUCKET are required');
if (apply && (!approval || approval.length < 8)) {
  throw new Error('--apply requires --approved-change-id=<separate-approved-change-id>');
}

const targetDays = calculateReviewEmailJournalRetention().journalObjectLockRetentionDays;
const client = new S3Client({ region });
const candidates = [];
let keyMarker;
let versionIdMarker;
do {
  const page = await client.send(new ListObjectVersionsCommand({
    Bucket: bucket,
    Prefix: 'erasure-journal/v1/',
    KeyMarker: keyMarker,
    VersionIdMarker: versionIdMarker,
  }));
  for (const version of page.Versions ?? []) {
    if (!version.Key || !version.VersionId || !version.LastModified) continue;
    const current = await client.send(new GetObjectRetentionCommand({ Bucket: bucket, Key: version.Key, VersionId: version.VersionId }));
    const desired = new Date(version.LastModified.getTime() + targetDays * 24 * 60 * 60 * 1000);
    const currentUntil = current.Retention?.RetainUntilDate;
    if (!currentUntil || currentUntil < desired) {
      candidates.push({ key: version.Key, versionId: version.VersionId, currentUntil: currentUntil?.toISOString() ?? null, desired });
    }
  }
  keyMarker = page.IsTruncated ? page.NextKeyMarker : undefined;
  versionIdMarker = page.IsTruncated ? page.NextVersionIdMarker : undefined;
} while (keyMarker);

if (!apply) {
  console.log(JSON.stringify({ mode: 'dry-run', targetDays, candidates: candidates.map(({ desired, ...item }) => ({ ...item, desired: desired.toISOString() })) }, null, 2));
  process.exit(0);
}

for (const candidate of candidates) {
  await client.send(new PutObjectRetentionCommand({
    Bucket: bucket,
    Key: candidate.key,
    VersionId: candidate.versionId,
    Retention: { Mode: 'GOVERNANCE', RetainUntilDate: candidate.desired },
  }));
}
console.log(JSON.stringify({ mode: 'applied', approval, targetDays, extendedVersions: candidates.length }, null, 2));
