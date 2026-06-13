import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CopyObjectCommand,
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListPartsCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getR2MediaConfig } from '@/lib/media/config';
import { VIDEO_PART_URL_TTL_SECONDS } from '@/lib/media/constants';

let cachedClient: S3Client | null = null;
let cachedEndpoint = '';

function client() {
  const config = getR2MediaConfig();
  if (!cachedClient || cachedEndpoint !== config.endpoint) {
    cachedClient = new S3Client({
      region: 'auto',
      endpoint: config.endpoint,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
    cachedEndpoint = config.endpoint;
  }
  return { client: cachedClient, config };
}

function encodedCopySource(bucket: string, key: string) {
  return `${bucket}/${key.split('/').map(encodeURIComponent).join('/')}`;
}

export async function createVideoMultipartUpload(key: string, mimeType: string) {
  const { client: s3, config } = client();
  const result = await s3.send(new CreateMultipartUploadCommand({
    Bucket: config.masterBucket,
    Key: key,
    ContentType: mimeType,
    Metadata: { media: 'review-video' },
  }));
  if (!result.UploadId) throw new Error('r2_create_multipart_missing_upload_id');
  return result.UploadId;
}

export async function signVideoUploadParts(input: { key: string; uploadId: string; partNumbers: number[] }) {
  const { client: s3, config } = client();
  return Promise.all(input.partNumbers.map(async (partNumber) => ({
    partNumber,
    uploadUrl: await getSignedUrl(s3, new UploadPartCommand({
      Bucket: config.masterBucket,
      Key: input.key,
      UploadId: input.uploadId,
      PartNumber: partNumber,
    }), { expiresIn: VIDEO_PART_URL_TTL_SECONDS }),
    expiresAt: new Date(Date.now() + VIDEO_PART_URL_TTL_SECONDS * 1000).toISOString(),
  })));
}

export async function listVideoUploadParts(key: string, uploadId: string) {
  const { client: s3, config } = client();
  const parts: Array<{ partNumber: number; etag: string; size: number }> = [];
  let marker: string | undefined;
  do {
    const result = await s3.send(new ListPartsCommand({
      Bucket: config.masterBucket,
      Key: key,
      UploadId: uploadId,
      PartNumberMarker: marker,
    }));
    for (const part of result.Parts ?? []) {
      if (part.PartNumber && part.ETag) parts.push({ partNumber: part.PartNumber, etag: part.ETag, size: part.Size ?? 0 });
    }
    marker = result.IsTruncated ? result.NextPartNumberMarker : undefined;
  } while (marker);
  return parts;
}

export async function completeVideoMultipartUpload(input: { key: string; uploadId: string; parts: Array<{ PartNumber: number; ETag: string }> }) {
  const { client: s3, config } = client();
  await s3.send(new CompleteMultipartUploadCommand({
    Bucket: config.masterBucket,
    Key: input.key,
    UploadId: input.uploadId,
    MultipartUpload: { Parts: input.parts },
  }));
}

export async function abortVideoMultipartUpload(key: string, uploadId: string) {
  const { client: s3, config } = client();
  try {
    await s3.send(new AbortMultipartUploadCommand({ Bucket: config.masterBucket, Key: key, UploadId: uploadId }));
  } catch (error) {
    const name = error instanceof Error ? error.name : '';
    if (name !== 'NoSuchUpload' && name !== 'NotFound') throw error;
  }
}

export async function headVideoMaster(key: string) {
  const { client: s3, config } = client();
  const result = await s3.send(new HeadObjectCommand({ Bucket: config.masterBucket, Key: key }));
  return { bytes: result.ContentLength ?? 0, mimeType: result.ContentType ?? '' };
}

export async function readVideoMasterPrefix(key: string, length = 64): Promise<Uint8Array> {
  const { client: s3, config } = client();
  const result = await s3.send(new GetObjectCommand({
    Bucket: config.masterBucket,
    Key: key,
    Range: `bytes=0-${Math.max(0, length - 1)}`,
  }));
  if (!result.Body) return new Uint8Array();
  return result.Body.transformToByteArray();
}

export async function copyVideoMasterToIngest(masterKey: string, ingestKey: string, mimeType: string) {
  const { client: s3, config } = client();
  await s3.send(new CopyObjectCommand({
    Bucket: config.ingestBucket,
    Key: ingestKey,
    CopySource: encodedCopySource(config.masterBucket, masterKey),
    ContentType: mimeType,
    MetadataDirective: 'REPLACE',
    CacheControl: 'private, max-age=0, no-store',
  }));
  return `${config.ingestPublicBaseUrl}/${ingestKey.split('/').map(encodeURIComponent).join('/')}`;
}

export async function deleteVideoMaster(key: string) {
  const { client: s3, config } = client();
  await s3.send(new DeleteObjectCommand({ Bucket: config.masterBucket, Key: key }));
}

export async function deleteVideoIngest(key: string) {
  const { client: s3, config } = client();
  await s3.send(new DeleteObjectCommand({ Bucket: config.ingestBucket, Key: key }));
}
