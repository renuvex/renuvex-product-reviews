import { createHash, randomUUID } from 'crypto';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import {
  CopyObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  GetObjectTaggingCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectTaggingCommand,
  S3Client,
  type _Object,
} from '@aws-sdk/client-s3';
import { getSignedUrl as getCloudFrontSignedUrl } from '@aws-sdk/cloudfront-signer';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { awsCredentialsProvider } from '@vercel/oidc-aws-credentials-provider';
import sharp, { type Sharp } from 'sharp';
import { normalizeReviewImageStoreId } from '@/lib/review-images';

export const AWS_REVIEW_IMAGE_PROVIDER = 'aws_s3';
export const AWS_REVIEW_IMAGE_MAX_BYTES = 10 * 1024 * 1024;
export const AWS_REVIEW_IMAGE_UPLOAD_TTL_SECONDS = 10 * 60;
export const AWS_REVIEW_IMAGE_UPLOAD_TTL_MS = AWS_REVIEW_IMAGE_UPLOAD_TTL_SECONDS * 1000;
export const AWS_REVIEW_IMAGE_PUBLIC_BASE_URL_FALLBACK = 'https://media.renuvex.app';
export const AWS_REVIEW_IMAGE_PRIVATE_PREFIX = 'review-images/v1/private';
export const AWS_REVIEW_IMAGE_PUBLIC_PREFIX = 'review-images/v1/public';

export const AWS_REVIEW_IMAGE_VARIANTS = [
  { id: 'w200', width: 200, fit: 'inside' },
  { id: 'w300', width: 300, fit: 'inside' },
  { id: 'w400', width: 400, fit: 'inside' },
  { id: 'w600', width: 600, fit: 'inside' },
  { id: 'w1200', width: 1200, fit: 'inside' },
  { id: 'thumb_320x427', width: 320, height: 427, fit: 'cover' },
  { id: 'thumb_640x854', width: 640, height: 854, fit: 'cover' },
] as const;

export const AWS_REVIEW_IMAGE_FORMATS = ['webp', 'jpeg'] as const;

export type AwsReviewImageVariantId = typeof AWS_REVIEW_IMAGE_VARIANTS[number]['id'];
export type AwsReviewImageFormat = typeof AWS_REVIEW_IMAGE_FORMATS[number];

export type AwsReviewImageVariantEntry = {
  id: AwsReviewImageVariantId;
  format: AwsReviewImageFormat;
  width: number;
  height: number;
  bytes: number;
  key: string;
  publicKey: string;
  url: string;
  contentType: string;
  checksumSha256: string;
};

export type AwsReviewImageVariantManifest = {
  schemaVersion: 1;
  provider: typeof AWS_REVIEW_IMAGE_PROVIDER;
  variantSetVersion: 'review-images-v1';
  storeId: string;
  assetId: string;
  source: {
    key: string;
    contentType: string;
    width: number;
    height: number;
    bytes: number;
    checksumAlgorithm: 'SHA256';
    checksumSha256: string;
  };
  generatedAt: string;
  variants: AwsReviewImageVariantEntry[];
};

export type AwsReviewImageRef = {
  provider: typeof AWS_REVIEW_IMAGE_PROVIDER;
  assetId: string;
  uploadSessionId: string;
  objectKey: string;
  contentType: string;
  bytes: number;
  checksumAlgorithm: 'SHA256';
  checksumSha256: string;
};

export type AwsReviewImagePublicDescriptor = {
  url: string;
  thumbnailUrl: string;
  variants: Array<{
    id: AwsReviewImageVariantId;
    format: AwsReviewImageFormat;
    width: number;
    height: number;
    url: string;
  }>;
};

export type AwsReviewImagesConfig = {
  region: string;
  bucket: string;
  publicBaseUrl: string;
  cloudFrontDistributionId?: string;
  roleArn?: string;
};

type ParsedAwsReviewImagePublicId = {
  storeId: string;
  assetId: string;
};

const ALLOWED_CONTENT_TYPES: Record<string, 'jpg' | 'png' | 'webp'> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const BASE64_SHA256_RE = /^(?:[A-Za-z0-9+/]{43}=|[A-Za-z0-9+/]{44})$/;
const HEX_SHA256_RE = /^[a-f0-9]{64}$/i;
const ASSET_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name}_missing`);
  return value;
}

export function getReviewImageProviderId(): string {
  return (process.env.REVIEW_IMAGE_PROVIDER || 'cloudinary').trim() || 'cloudinary';
}

export function isAwsReviewImageProviderEnabled(): boolean {
  return getReviewImageProviderId() === AWS_REVIEW_IMAGE_PROVIDER;
}

export function getAwsReviewImagesPublicBaseUrl(): string {
  const raw = (process.env.AWS_REVIEW_IMAGES_PUBLIC_BASE_URL || AWS_REVIEW_IMAGE_PUBLIC_BASE_URL_FALLBACK).trim();
  const parsed = new URL(raw);
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error('aws_review_images_public_base_url_invalid');
  }
  parsed.pathname = parsed.pathname.replace(/\/+$/, '');
  return parsed.href.replace(/\/$/, '');
}

export function getAwsReviewImagesConfig(): AwsReviewImagesConfig {
  return {
    region: requireEnv('AWS_REVIEW_IMAGES_REGION'),
    bucket: requireEnv('AWS_REVIEW_IMAGES_BUCKET'),
    publicBaseUrl: getAwsReviewImagesPublicBaseUrl(),
    cloudFrontDistributionId: process.env.AWS_REVIEW_IMAGES_CLOUDFRONT_DISTRIBUTION_ID?.trim() || undefined,
    roleArn: process.env.AWS_REVIEW_IMAGES_ROLE_ARN?.trim() || undefined,
  };
}

let s3Client: S3Client | null = null;
let cloudFrontClient: CloudFrontClient | null = null;

function awsReviewImagesCredentialConfig(config: AwsReviewImagesConfig) {
  return config.roleArn
    ? {
        credentials: awsCredentialsProvider({
          roleArn: config.roleArn,
          audience: process.env.AWS_REVIEW_IMAGES_OIDC_AUDIENCE?.trim() || 'sts.amazonaws.com',
          roleSessionName: 'renuvex-review-images-runtime',
          clientConfig: { region: config.region },
        }),
      }
    : {};
}

export function getAwsReviewImagesS3Client(): S3Client {
  if (s3Client) return s3Client;
  const config = getAwsReviewImagesConfig();
  s3Client = new S3Client({
    region: config.region,
    ...awsReviewImagesCredentialConfig(config),
  });
  return s3Client;
}

export function getAwsReviewImagesCloudFrontClient(): CloudFrontClient {
  if (cloudFrontClient) return cloudFrontClient;
  const config = getAwsReviewImagesConfig();
  cloudFrontClient = new CloudFrontClient({
    region: 'us-east-1',
    ...awsReviewImagesCredentialConfig(config),
  });
  return cloudFrontClient;
}

export function normalizeAwsReviewImageContentType(value: unknown): keyof typeof ALLOWED_CONTENT_TYPES | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(ALLOWED_CONTENT_TYPES, normalized)
    ? normalized as keyof typeof ALLOWED_CONTENT_TYPES
    : null;
}

export function normalizeAwsReviewImageBytes(value: unknown): number | null {
  const bytes = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  if (!Number.isInteger(bytes) || bytes <= 0 || bytes > AWS_REVIEW_IMAGE_MAX_BYTES) return null;
  return bytes;
}

export function normalizeAwsReviewImageChecksum(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const checksum = value.trim();
  return BASE64_SHA256_RE.test(checksum) ? checksum : null;
}

export function base64Sha256ToHex(value: string): string {
  return Buffer.from(value, 'base64').toString('hex');
}

export function hexSha256ToBase64(value: string): string {
  if (!HEX_SHA256_RE.test(value)) throw new Error('sha256_hex_invalid');
  return Buffer.from(value, 'hex').toString('base64');
}

export function createAwsReviewImageAssetId(): string {
  return randomUUID();
}

export function createAwsReviewImageUploadSessionId(): string {
  return randomUUID();
}

export function buildAwsReviewImagePublicId(storeId: string, assetId: string): string {
  return `${AWS_REVIEW_IMAGE_PROVIDER}:${storeId}:${assetId}`;
}

export function parseAwsReviewImagePublicId(publicId: string): ParsedAwsReviewImagePublicId | null {
  const parts = publicId.split(':');
  if (parts.length !== 3 || parts[0] !== AWS_REVIEW_IMAGE_PROVIDER) return null;
  const storeId = normalizeReviewImageStoreId(parts[1]);
  const assetId = normalizeAwsReviewImageAssetId(parts[2]);
  return storeId && assetId ? { storeId, assetId } : null;
}

export function normalizeAwsReviewImageAssetId(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  return ASSET_ID_RE.test(normalized) ? normalized : null;
}

export function normalizeAwsReviewImageUploadSessionId(value: unknown): string | null {
  return normalizeAwsReviewImageAssetId(value);
}

export function buildAwsReviewImageOriginalKey(input: {
  storeId: string;
  assetId: string;
  contentType: keyof typeof ALLOWED_CONTENT_TYPES;
}): string {
  const ext = ALLOWED_CONTENT_TYPES[input.contentType];
  return `${AWS_REVIEW_IMAGE_PRIVATE_PREFIX}/stores/${input.storeId}/assets/${input.assetId}/original.${ext}`;
}

export function buildAwsReviewImagePrivateVariantKey(storeId: string, assetId: string, variantId: string, format: AwsReviewImageFormat): string {
  return `${AWS_REVIEW_IMAGE_PRIVATE_PREFIX}/stores/${storeId}/assets/${assetId}/variants/${variantId}.${format}`;
}

export function buildAwsReviewImagePublicVariantKey(storeId: string, assetId: string, variantId: string, format: AwsReviewImageFormat): string {
  return `${AWS_REVIEW_IMAGE_PUBLIC_PREFIX}/stores/${storeId}/assets/${assetId}/variants/${variantId}.${format}`;
}

function buildAwsReviewImagePublicVariantKeys(storeId: string, assetId: string): string[] {
  const keys: string[] = [];
  for (const variant of AWS_REVIEW_IMAGE_VARIANTS) {
    for (const format of AWS_REVIEW_IMAGE_FORMATS) {
      keys.push(buildAwsReviewImagePublicVariantKey(storeId, assetId, variant.id, format));
    }
  }
  return keys;
}

function cloudFrontInvalidationPathForKey(key: string): string {
  return `/${key}`;
}

export function buildAwsReviewImagePublicUrl(key: string): string {
  const publicBaseUrl = getAwsReviewImagesPublicBaseUrl();
  return `${publicBaseUrl}/${key.split('/').map(encodeURIComponent).join('/')}`;
}

export function isTrustedAwsReviewImagePublicUrl(value: unknown, storeId?: unknown): value is string {
  if (typeof value !== 'string') return false;
  const raw = value.trim();
  if (!raw || raw.length > 2048) return false;
  const normalizedStoreId = normalizeReviewImageStoreId(storeId);
  if (!normalizedStoreId) return false;

  let url: URL;
  let base: URL;
  try {
    url = new URL(raw);
    base = new URL(getAwsReviewImagesPublicBaseUrl());
  } catch {
    return false;
  }
  if (
    url.protocol !== 'https:' ||
    url.hostname !== base.hostname ||
    url.username ||
    url.password ||
    url.port !== base.port ||
    url.search ||
    url.hash
  ) {
    return false;
  }
  const lowerPath = url.pathname.toLowerCase();
  if (lowerPath.includes('%2f') || lowerPath.includes('%5c')) return false;
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length !== 9) return false;
  if (
    parts[0] !== 'review-images' ||
    parts[1] !== 'v1' ||
    parts[2] !== 'public' ||
    parts[3] !== 'stores' ||
    parts[4] !== normalizedStoreId ||
    parts[5] !== 'assets' ||
    !normalizeAwsReviewImageAssetId(parts[6]) ||
    parts[7] !== 'variants'
  ) {
    return false;
  }
  const [variantId, extension, extra] = parts[8].split('.');
  if (extra !== undefined) return false;
  return AWS_REVIEW_IMAGE_VARIANTS.some((variant) => variant.id === variantId)
    && (extension === 'webp' || extension === 'jpeg');
}

export function sanitizeAwsReviewImageRef(value: unknown): AwsReviewImageRef | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (record.provider !== AWS_REVIEW_IMAGE_PROVIDER) return null;
  const assetId = normalizeAwsReviewImageAssetId(record.assetId);
  const uploadSessionId = normalizeAwsReviewImageUploadSessionId(record.uploadSessionId);
  const contentType = normalizeAwsReviewImageContentType(record.contentType);
  const bytes = normalizeAwsReviewImageBytes(record.bytes);
  const checksumSha256 = normalizeAwsReviewImageChecksum(record.checksumSha256);
  if (
    !assetId ||
    !uploadSessionId ||
    !contentType ||
    !bytes ||
    !checksumSha256 ||
    record.checksumAlgorithm !== 'SHA256' ||
    typeof record.objectKey !== 'string'
  ) {
    return null;
  }
  return {
    provider: AWS_REVIEW_IMAGE_PROVIDER,
    assetId,
    uploadSessionId,
    objectKey: record.objectKey,
    contentType,
    bytes,
    checksumAlgorithm: 'SHA256',
    checksumSha256,
  };
}

export function sanitizeAwsReviewImageRefs(value: unknown): { ok: true; refs: AwsReviewImageRef[] } | { ok: false; error: string } {
  if (value === undefined || value === null) return { ok: true, refs: [] };
  if (!Array.isArray(value)) return { ok: false, error: 'not_array' };
  if (value.length > 3) return { ok: false, error: 'too_many' };
  const refs: AwsReviewImageRef[] = [];
  const seen = new Set<string>();
  for (const item of value) {
    const ref = sanitizeAwsReviewImageRef(item);
    if (!ref) return { ok: false, error: 'invalid_ref' };
    if (seen.has(ref.assetId) || seen.has(ref.uploadSessionId)) return { ok: false, error: 'duplicate_ref' };
    seen.add(ref.assetId);
    seen.add(ref.uploadSessionId);
    refs.push(ref);
  }
  return { ok: true, refs };
}

export async function createAwsReviewImageUploadIntent(input: {
  storeId: string;
  contentType: keyof typeof ALLOWED_CONTENT_TYPES;
  bytes: number;
  checksumSha256: string;
}) {
  const config = getAwsReviewImagesConfig();
  const client = getAwsReviewImagesS3Client();
  const assetId = createAwsReviewImageAssetId();
  const uploadSessionId = createAwsReviewImageUploadSessionId();
  const objectKey = buildAwsReviewImageOriginalKey({
    storeId: input.storeId,
    assetId,
    contentType: input.contentType,
  });
  const expiresAt = new Date(Date.now() + AWS_REVIEW_IMAGE_UPLOAD_TTL_MS);
  const tagging = new URLSearchParams({
    renuvex_state: 'pending',
    renuvex_store_id: input.storeId,
    renuvex_asset_id: assetId,
    renuvex_upload_session_id: uploadSessionId,
  }).toString();

  const post = await createPresignedPost(client, {
    Bucket: config.bucket,
    Key: objectKey,
    Expires: AWS_REVIEW_IMAGE_UPLOAD_TTL_SECONDS,
    Fields: {
      'Content-Type': input.contentType,
      'x-amz-checksum-sha256': input.checksumSha256,
      'x-amz-meta-renuvex-store-id': input.storeId,
      'x-amz-meta-renuvex-asset-id': assetId,
      'x-amz-meta-renuvex-upload-session-id': uploadSessionId,
      'x-amz-tagging': tagging,
      success_action_status: '204',
    },
    Conditions: [
      ['content-length-range', 1, input.bytes],
      ['eq', '$Content-Type', input.contentType],
      ['eq', '$x-amz-checksum-sha256', input.checksumSha256],
      ['eq', '$x-amz-meta-renuvex-store-id', input.storeId],
      ['eq', '$x-amz-meta-renuvex-asset-id', assetId],
      ['eq', '$x-amz-meta-renuvex-upload-session-id', uploadSessionId],
      ['eq', '$x-amz-tagging', tagging],
      ['eq', '$success_action_status', '204'],
    ],
  });

  return {
    provider: AWS_REVIEW_IMAGE_PROVIDER,
    uploadMethod: 'post' as const,
    uploadUrl: post.url,
    fields: post.fields,
    assetId,
    uploadSessionId,
    objectKey,
    expiresAt,
    maxBytes: AWS_REVIEW_IMAGE_MAX_BYTES,
    checksumAlgorithm: 'SHA256' as const,
    publicUrl: null,
  };
}

function headerValue(value: string | undefined): string {
  return (value ?? '').trim();
}

function assertObjectKeyMatchesIntent(input: { key: string; storeId: string; assetId: string; contentType: keyof typeof ALLOWED_CONTENT_TYPES }) {
  const expected = buildAwsReviewImageOriginalKey(input);
  if (input.key !== expected) throw new Error('aws_review_image_key_mismatch');
}

async function bodyToBuffer(body: unknown): Promise<Buffer> {
  const stream = body as { transformToByteArray?: () => Promise<Uint8Array> };
  if (!stream?.transformToByteArray) throw new Error('aws_review_image_body_unavailable');
  return Buffer.from(await stream.transformToByteArray());
}

function checksumBufferBase64(buffer: Buffer): string {
  return createHash('sha256').update(buffer).digest('base64');
}

function encodeCopySource(bucket: string, key: string): string {
  return `${bucket}/${key.split('/').map(encodeURIComponent).join('/')}`;
}

function contentTypeForFormat(format: AwsReviewImageFormat): string {
  return format === 'webp' ? 'image/webp' : 'image/jpeg';
}

function metadataForVariant(input: {
  storeId: string;
  assetId: string;
  variantId: AwsReviewImageVariantId;
  format: AwsReviewImageFormat;
}): Record<string, string> {
  return {
    'renuvex-store-id': input.storeId,
    'renuvex-asset-id': input.assetId,
    'renuvex-variant-id': input.variantId,
    'renuvex-variant-format': input.format,
  };
}

async function putObjectTags(key: string, tagSet: Record<string, string>) {
  const config = getAwsReviewImagesConfig();
  await getAwsReviewImagesS3Client().send(new PutObjectTaggingCommand({
    Bucket: config.bucket,
    Key: key,
    Tagging: {
      TagSet: Object.entries(tagSet).map(([Key, Value]) => ({ Key, Value })),
    },
  }));
}

export async function validateAwsReviewImageOriginal(input: {
  storeId: string;
  assetId: string;
  uploadSessionId: string;
  objectKey: string;
  contentType: keyof typeof ALLOWED_CONTENT_TYPES;
  bytes: number;
  checksumSha256: string;
}) {
  assertObjectKeyMatchesIntent({
    key: input.objectKey,
    storeId: input.storeId,
    assetId: input.assetId,
    contentType: input.contentType,
  });
  const config = getAwsReviewImagesConfig();
  const client = getAwsReviewImagesS3Client();
  const [head, tagResult] = await Promise.all([
    client.send(new HeadObjectCommand({
      Bucket: config.bucket,
      Key: input.objectKey,
      ChecksumMode: 'ENABLED',
    })),
    client.send(new GetObjectTaggingCommand({ Bucket: config.bucket, Key: input.objectKey })),
  ]);

  if (head.ContentLength !== input.bytes) throw new Error('aws_review_image_size_mismatch');
  if (headerValue(head.ContentType).toLowerCase() !== input.contentType) throw new Error('aws_review_image_content_type_mismatch');
  if (headerValue(head.Metadata?.['renuvex-store-id']) !== input.storeId) throw new Error('aws_review_image_store_metadata_mismatch');
  if (headerValue(head.Metadata?.['renuvex-asset-id']) !== input.assetId) throw new Error('aws_review_image_asset_metadata_mismatch');
  if (headerValue(head.Metadata?.['renuvex-upload-session-id']) !== input.uploadSessionId) {
    throw new Error('aws_review_image_session_metadata_mismatch');
  }
  if (head.ChecksumSHA256 && head.ChecksumSHA256 !== input.checksumSha256) throw new Error('aws_review_image_checksum_header_mismatch');
  const tags = new Map((tagResult.TagSet ?? []).map((tag) => [tag.Key, tag.Value]));
  if (tags.size > 0) {
    if (tags.get('renuvex_store_id') !== input.storeId) throw new Error('aws_review_image_store_tag_mismatch');
    if (tags.get('renuvex_asset_id') !== input.assetId) throw new Error('aws_review_image_asset_tag_mismatch');
    if (tags.get('renuvex_upload_session_id') !== input.uploadSessionId) throw new Error('aws_review_image_session_tag_mismatch');
  }

  const original = await client.send(new GetObjectCommand({ Bucket: config.bucket, Key: input.objectKey }));
  const buffer = await bodyToBuffer(original.Body);
  if (buffer.length !== input.bytes) throw new Error('aws_review_image_body_size_mismatch');
  if (checksumBufferBase64(buffer) !== input.checksumSha256) throw new Error('aws_review_image_checksum_mismatch');
  return buffer;
}

async function buildVariant(input: {
  normalized: Sharp;
  storeId: string;
  assetId: string;
  variant: typeof AWS_REVIEW_IMAGE_VARIANTS[number];
  format: AwsReviewImageFormat;
}): Promise<AwsReviewImageVariantEntry> {
  const resized = input.normalized.clone().resize({
    width: input.variant.width,
    height: 'height' in input.variant ? input.variant.height : undefined,
    fit: input.variant.fit === 'cover' ? 'cover' : 'inside',
    withoutEnlargement: true,
  });
  const encoded = input.format === 'webp'
    ? await resized.webp({ quality: 82 }).toBuffer({ resolveWithObject: true })
    : await resized.jpeg({ quality: 86, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  const key = buildAwsReviewImagePrivateVariantKey(input.storeId, input.assetId, input.variant.id, input.format);
  const publicKey = buildAwsReviewImagePublicVariantKey(input.storeId, input.assetId, input.variant.id, input.format);
  const contentType = contentTypeForFormat(input.format);
  const checksumSha256 = checksumBufferBase64(encoded.data);
  await getAwsReviewImagesS3Client().send(new PutObjectCommand({
    Bucket: getAwsReviewImagesConfig().bucket,
    Key: key,
    Body: encoded.data,
    ContentType: contentType,
    CacheControl: 'private, max-age=0, no-store',
    ChecksumSHA256: checksumSha256,
    Metadata: metadataForVariant({
      storeId: input.storeId,
      assetId: input.assetId,
      variantId: input.variant.id,
      format: input.format,
    }),
    Tagging: new URLSearchParams({
      renuvex_state: 'private_ready',
      renuvex_store_id: input.storeId,
      renuvex_asset_id: input.assetId,
    }).toString(),
  }));
  return {
    id: input.variant.id,
    format: input.format,
    width: encoded.info.width,
    height: encoded.info.height,
    bytes: encoded.info.size,
    key,
    publicKey,
    url: buildAwsReviewImagePublicUrl(publicKey),
    contentType,
    checksumSha256,
  };
}

export async function generateAwsReviewImagePrivateVariants(input: {
  storeId: string;
  assetId: string;
  objectKey: string;
  contentType: keyof typeof ALLOWED_CONTENT_TYPES;
  bytes: number;
  checksumSha256: string;
  originalBuffer: Buffer;
}): Promise<AwsReviewImageVariantManifest> {
  const source = sharp(input.originalBuffer, { animated: false });
  const metadata = await source.metadata();
  if (!metadata.width || !metadata.height) throw new Error('aws_review_image_dimensions_missing');
  if ((metadata.pages ?? 1) > 1) throw new Error('aws_review_image_animated_unsupported');
  const normalized = sharp(input.originalBuffer, { animated: false }).rotate().toColorspace('srgb');
  const variants: AwsReviewImageVariantEntry[] = [];
  for (const variant of AWS_REVIEW_IMAGE_VARIANTS) {
    for (const format of AWS_REVIEW_IMAGE_FORMATS) {
      variants.push(await buildVariant({ normalized, storeId: input.storeId, assetId: input.assetId, variant, format }));
    }
  }
  await putObjectTags(input.objectKey, {
    renuvex_state: 'private_ready',
    renuvex_store_id: input.storeId,
    renuvex_asset_id: input.assetId,
  });
  return {
    schemaVersion: 1,
    provider: AWS_REVIEW_IMAGE_PROVIDER,
    variantSetVersion: 'review-images-v1',
    storeId: input.storeId,
    assetId: input.assetId,
    source: {
      key: input.objectKey,
      contentType: input.contentType,
      width: metadata.width,
      height: metadata.height,
      bytes: input.bytes,
      checksumAlgorithm: 'SHA256',
      checksumSha256: input.checksumSha256,
    },
    generatedAt: new Date().toISOString(),
    variants,
  };
}

export function parseAwsReviewImageVariantManifest(value: unknown): AwsReviewImageVariantManifest | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Partial<AwsReviewImageVariantManifest>;
  if (
    record.schemaVersion !== 1 ||
    record.provider !== AWS_REVIEW_IMAGE_PROVIDER ||
    record.variantSetVersion !== 'review-images-v1' ||
    typeof record.storeId !== 'string' ||
    typeof record.assetId !== 'string' ||
    !Array.isArray(record.variants)
  ) {
    return null;
  }
  return record as AwsReviewImageVariantManifest;
}

function chooseVariant(manifest: AwsReviewImageVariantManifest, variantId: AwsReviewImageVariantId, format: AwsReviewImageFormat): AwsReviewImageVariantEntry | null {
  return manifest.variants.find((variant) => variant.id === variantId && variant.format === format) ?? null;
}

export function buildAwsReviewImagePublicDescriptor(manifestValue: unknown): AwsReviewImagePublicDescriptor | null {
  const manifest = parseAwsReviewImageVariantManifest(manifestValue);
  if (!manifest) return null;
  const fallback = chooseVariant(manifest, 'w1200', 'jpeg') ?? chooseVariant(manifest, 'w1200', 'webp') ?? manifest.variants[0] ?? null;
  const thumbnail = chooseVariant(manifest, 'thumb_320x427', 'webp') ?? chooseVariant(manifest, 'w300', 'webp') ?? fallback;
  if (!fallback || !thumbnail) return null;
  return {
    url: buildAwsReviewImagePublicUrl(fallback.publicKey),
    thumbnailUrl: buildAwsReviewImagePublicUrl(thumbnail.publicKey),
    variants: manifest.variants.map((variant) => ({
      id: variant.id,
      format: variant.format,
      width: variant.width,
      height: variant.height,
      url: buildAwsReviewImagePublicUrl(variant.publicKey),
    })),
  };
}

export async function publishAwsReviewImageVariants(manifestValue: unknown) {
  const manifest = parseAwsReviewImageVariantManifest(manifestValue);
  if (!manifest) throw new Error('aws_review_image_manifest_invalid');
  const config = getAwsReviewImagesConfig();
  const client = getAwsReviewImagesS3Client();
  for (const variant of manifest.variants) {
    await client.send(new CopyObjectCommand({
      Bucket: config.bucket,
      Key: variant.publicKey,
      CopySource: encodeCopySource(config.bucket, variant.key),
      ContentType: variant.contentType,
      CacheControl: 'public, max-age=31536000, immutable',
      MetadataDirective: 'REPLACE',
      Metadata: metadataForVariant({
        storeId: manifest.storeId,
        assetId: manifest.assetId,
        variantId: variant.id,
        format: variant.format,
      }),
      TaggingDirective: 'REPLACE',
      Tagging: new URLSearchParams({
        renuvex_state: 'public_ready',
        renuvex_store_id: manifest.storeId,
        renuvex_asset_id: manifest.assetId,
      }).toString(),
    }));
    await client.send(new HeadObjectCommand({ Bucket: config.bucket, Key: variant.publicKey }));
  }
}

export async function invalidateAwsReviewImagePublicVariantPaths(keys: string[]) {
  const uniquePaths = [...new Set(keys.map(cloudFrontInvalidationPathForKey))].sort();
  if (uniquePaths.length === 0) return { invalidationIds: [] as string[] };
  const config = getAwsReviewImagesConfig();
  if (!config.cloudFrontDistributionId) throw new Error('AWS_REVIEW_IMAGES_CLOUDFRONT_DISTRIBUTION_ID_missing');
  const client = getAwsReviewImagesCloudFrontClient();
  const invalidationIds: string[] = [];
  for (let index = 0; index < uniquePaths.length; index += 1000) {
    const paths = uniquePaths.slice(index, index + 1000);
    const callerReference = `renuvex-review-images-${Date.now()}-${createHash('sha256').update(paths.join('\0')).digest('hex').slice(0, 24)}`;
    const result = await client.send(new CreateInvalidationCommand({
      DistributionId: config.cloudFrontDistributionId,
      InvalidationBatch: {
        CallerReference: callerReference,
        Paths: {
          Quantity: paths.length,
          Items: paths,
        },
      },
    }));
    if (result.Invalidation?.Id) invalidationIds.push(result.Invalidation.Id);
  }
  return { invalidationIds };
}

async function listFamilyObjects(prefix: string): Promise<_Object[]> {
  const config = getAwsReviewImagesConfig();
  const client = getAwsReviewImagesS3Client();
  const objects: _Object[] = [];
  let ContinuationToken: string | undefined;
  do {
    const result = await client.send(new ListObjectsV2Command({
      Bucket: config.bucket,
      Prefix: prefix,
      ContinuationToken,
      MaxKeys: 1000,
    }));
    objects.push(...(result.Contents ?? []));
    ContinuationToken = result.NextContinuationToken;
  } while (ContinuationToken);
  return objects;
}

export async function deleteAwsReviewImageFamily(storeId: string, assetId: string, options: { invalidatePublicVariants?: boolean } = {}) {
  const config = getAwsReviewImagesConfig();
  const privatePrefix = `${AWS_REVIEW_IMAGE_PRIVATE_PREFIX}/stores/${storeId}/assets/${assetId}/`;
  const publicPrefix = `${AWS_REVIEW_IMAGE_PUBLIC_PREFIX}/stores/${storeId}/assets/${assetId}/`;
  const objects = [
    ...(await listFamilyObjects(privatePrefix)),
    ...(await listFamilyObjects(publicPrefix)),
  ].flatMap((object) => object.Key ? [{ Key: object.Key }] : []);
  for (let index = 0; index < objects.length; index += 1000) {
    const batch = objects.slice(index, index + 1000);
    if (batch.length === 0) continue;
    await getAwsReviewImagesS3Client().send(new DeleteObjectsCommand({
      Bucket: config.bucket,
      Delete: { Objects: batch, Quiet: true },
    }));
  }
  if (options.invalidatePublicVariants) {
    await invalidateAwsReviewImagePublicVariantPaths(buildAwsReviewImagePublicVariantKeys(storeId, assetId));
  }
  return { deletedObjects: objects.length };
}

export async function listAwsReviewImageObjectFamilies(): Promise<Array<{
  publicId: string;
  storeId: string;
  assetId: string;
  createdAt: number;
}>> {
  const config = getAwsReviewImagesConfig();
  const client = getAwsReviewImagesS3Client();
  const families = new Map<string, { publicId: string; storeId: string; assetId: string; createdAt: number }>();
  const prefixes = [
    `${AWS_REVIEW_IMAGE_PRIVATE_PREFIX}/stores/`,
    `${AWS_REVIEW_IMAGE_PUBLIC_PREFIX}/stores/`,
  ];
  for (const Prefix of prefixes) {
    let ContinuationToken: string | undefined;
    do {
      const result = await client.send(new ListObjectsV2Command({
        Bucket: config.bucket,
        Prefix,
        ContinuationToken,
        MaxKeys: 1000,
      }));
      for (const object of result.Contents ?? []) {
        if (!object.Key) continue;
        const match = /^review-images\/v1\/(?:private|public)\/stores\/([^/]+)\/assets\/([^/]+)\//.exec(object.Key);
        if (!match) continue;
        const storeId = normalizeReviewImageStoreId(match[1]);
        const assetId = normalizeAwsReviewImageAssetId(match[2]);
        if (!storeId || !assetId) continue;
        const publicId = buildAwsReviewImagePublicId(storeId, assetId);
        const createdAt = object.LastModified?.getTime() ?? Date.now();
        const existing = families.get(publicId);
        families.set(publicId, {
          publicId,
          storeId,
          assetId,
          createdAt: existing ? Math.min(existing.createdAt, createdAt) : createdAt,
        });
      }
      ContinuationToken = result.NextContinuationToken;
    } while (ContinuationToken);
  }
  return [...families.values()];
}

export async function revokeAwsReviewImagePublicVariants(manifestValue: unknown, options: { invalidateCloudFront?: boolean } = { invalidateCloudFront: true }) {
  const manifest = parseAwsReviewImageVariantManifest(manifestValue);
  if (!manifest) throw new Error('aws_review_image_manifest_invalid');
  const config = getAwsReviewImagesConfig();
  const objects = manifest.variants.map((variant) => ({ Key: variant.publicKey }));
  for (let index = 0; index < objects.length; index += 1000) {
    await getAwsReviewImagesS3Client().send(new DeleteObjectsCommand({
      Bucket: config.bucket,
      Delete: { Objects: objects.slice(index, index + 1000), Quiet: true },
    }));
  }
  if (options.invalidateCloudFront !== false) {
    await invalidateAwsReviewImagePublicVariantPaths(manifest.variants.map((variant) => variant.publicKey));
  }
}

export function signAwsReviewImagePrivatePreviewUrl(input: {
  manifest: unknown;
  variantId?: AwsReviewImageVariantId;
  format?: AwsReviewImageFormat;
  ttlSeconds?: number;
}): string {
  const manifest = parseAwsReviewImageVariantManifest(input.manifest);
  if (!manifest) throw new Error('aws_review_image_manifest_invalid');
  const variant = chooseVariant(manifest, input.variantId ?? 'w1200', input.format ?? 'webp')
    ?? chooseVariant(manifest, 'w1200', 'jpeg')
    ?? manifest.variants[0];
  if (!variant) throw new Error('aws_review_image_preview_variant_missing');
  const keyPairId = requireEnv('AWS_REVIEW_IMAGES_CLOUDFRONT_KEY_PAIR_ID');
  const privateKeyB64 = requireEnv('AWS_REVIEW_IMAGES_CLOUDFRONT_PRIVATE_KEY_B64');
  const privateKey = Buffer.from(privateKeyB64, 'base64').toString('utf8').replace(/\\n/g, '\n');
  return getCloudFrontSignedUrl({
    url: buildAwsReviewImagePublicUrl(variant.key),
    keyPairId,
    privateKey,
    dateLessThan: new Date(Date.now() + (input.ttlSeconds ?? 15 * 60) * 1000).toISOString(),
  });
}
