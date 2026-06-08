import { createHash, timingSafeEqual } from 'crypto';

const ALLOWED_RESOURCE_TYPES = new Set(['image']);
const ALLOWED_FORMATS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

export type ReviewMediaMetadataWrite = {
  assetId?: string;
  version?: string;
  resourceType?: string;
  format?: string;
  mimeType?: string;
  width?: number;
  height?: number;
  bytes?: number;
  metadataSource?: string;
  metadataStatus?: string;
  metadataFetchedAt?: Date;
};

export type CloudinaryUploadMetadataPayload = {
  assetId?: unknown;
  publicId?: unknown;
  version?: unknown;
  resourceType?: unknown;
  format?: unknown;
  width?: unknown;
  height?: unknown;
  bytes?: unknown;
  signature?: unknown;
};

type NormalizeUploadMetadataOptions = {
  expectedPublicId: string;
  apiSecret?: string | null;
  now?: Date;
};

function shortString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > maxLength) return undefined;
  return trimmed;
}

function normalizedPositiveInteger(value: unknown): number | undefined {
  const numberValue = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  if (!Number.isInteger(numberValue) || numberValue <= 0 || numberValue > 2147483647) return undefined;
  return numberValue;
}

function metadataVersion(value: unknown): string | undefined {
  if (typeof value !== 'string' && typeof value !== 'number') return undefined;
  return shortString(String(value), 64);
}

export function mimeTypeForReviewImageFormat(value: unknown): string | undefined {
  const format = shortString(value, 32)?.toLowerCase();
  if (!format) return undefined;
  if (format === 'jpg' || format === 'jpeg') return 'image/jpeg';
  if (format === 'png') return 'image/png';
  if (format === 'webp') return 'image/webp';
  if (format === 'gif') return 'image/gif';
  if (format === 'avif') return 'image/avif';
  return undefined;
}

function cloudinaryResponseSignature(publicId: string, version: string, apiSecret: string, algorithm: 'sha1' | 'sha256'): string {
  return createHash(algorithm)
    .update(`public_id=${publicId}&version=${version}${apiSecret}`, 'utf8')
    .digest('hex');
}

function safeHexEqual(expected: string, actual: string): boolean {
  const expectedBuffer = Buffer.from(expected, 'utf8');
  const actualBuffer = Buffer.from(actual, 'utf8');
  return expectedBuffer.length === actualBuffer.length && timingSafeEqual(expectedBuffer, actualBuffer);
}

export function verifyCloudinaryUploadResponseSignature(input: {
  publicId: string;
  version: string;
  signature: string;
  apiSecret: string;
}): boolean {
  return (
    safeHexEqual(cloudinaryResponseSignature(input.publicId, input.version, input.apiSecret, 'sha1'), input.signature) ||
    safeHexEqual(cloudinaryResponseSignature(input.publicId, input.version, input.apiSecret, 'sha256'), input.signature)
  );
}

export function normalizeCloudinaryUploadMetadata(
  payload: unknown,
  options: NormalizeUploadMetadataOptions
): ReviewMediaMetadataWrite | null {
  if (!payload || typeof payload !== 'object') return null;
  const record = payload as CloudinaryUploadMetadataPayload;
  const publicId = shortString(record.publicId, 512);
  const version = metadataVersion(record.version);
  const signature = shortString(record.signature, 128);
  const now = options.now ?? new Date();

  if (!publicId || publicId !== options.expectedPublicId || !version || !signature || !options.apiSecret) {
    return {
      metadataSource: 'upload_response',
      metadataStatus: 'pending',
      metadataFetchedAt: now,
    };
  }

  if (!verifyCloudinaryUploadResponseSignature({
    publicId,
    version,
    signature,
    apiSecret: options.apiSecret,
  })) {
    return {
      metadataSource: 'upload_response',
      metadataStatus: 'invalid_signature',
      metadataFetchedAt: now,
    };
  }

  const resourceType = shortString(record.resourceType, 32)?.toLowerCase() ?? 'image';
  const format = shortString(record.format, 32)?.toLowerCase();
  const width = normalizedPositiveInteger(record.width);
  const height = normalizedPositiveInteger(record.height);
  const bytes = normalizedPositiveInteger(record.bytes);

  if (!ALLOWED_RESOURCE_TYPES.has(resourceType) || !format || !ALLOWED_FORMATS.has(format) || !width || !height || !bytes) {
    return {
      assetId: shortString(record.assetId, 128),
      version,
      resourceType: ALLOWED_RESOURCE_TYPES.has(resourceType) ? resourceType : 'image',
      format: format && ALLOWED_FORMATS.has(format) ? format : undefined,
      mimeType: mimeTypeForReviewImageFormat(format),
      width,
      height,
      bytes,
      metadataSource: 'upload_response',
      metadataStatus: 'partial',
      metadataFetchedAt: now,
    };
  }

  return {
    assetId: shortString(record.assetId, 128),
    version,
    resourceType,
    format,
    mimeType: mimeTypeForReviewImageFormat(format),
    width,
    height,
    bytes,
    metadataSource: 'upload_response',
    metadataStatus: 'complete',
    metadataFetchedAt: now,
  };
}
