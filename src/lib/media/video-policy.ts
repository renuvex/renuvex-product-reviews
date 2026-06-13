import { createHash, randomBytes } from 'crypto';
import {
  VIDEO_ALLOWED_MIME_TYPES,
  VIDEO_MAX_BYTES,
  VIDEO_MULTIPART_PART_BYTES,
} from '@/lib/media/constants';

export type VideoPart = {
  partNumber: number;
  offset: number;
  size: number;
};

export function validateVideoUploadInput(input: { mimeType: unknown; bytes: unknown }) {
  const mimeType = typeof input.mimeType === 'string' ? input.mimeType.trim().toLowerCase() : '';
  const bytes = Number(input.bytes);
  if (!VIDEO_ALLOWED_MIME_TYPES.has(mimeType)) return { ok: false as const, code: 'unsupported_type' };
  if (!Number.isInteger(bytes) || bytes <= 0 || bytes > VIDEO_MAX_BYTES) return { ok: false as const, code: 'invalid_size' };
  return { ok: true as const, mimeType, bytes };
}

export function partitionVideoBytes(bytes: number, partBytes = VIDEO_MULTIPART_PART_BYTES): VideoPart[] {
  if (!Number.isInteger(bytes) || bytes <= 0) throw new Error('bytes must be a positive integer');
  if (!Number.isInteger(partBytes) || partBytes < 5 * 1024 * 1024) throw new Error('partBytes must be at least 5 MiB');
  const result: VideoPart[] = [];
  for (let offset = 0, partNumber = 1; offset < bytes; offset += partBytes, partNumber += 1) {
    result.push({ partNumber, offset, size: Math.min(partBytes, bytes - offset) });
  }
  return result;
}

export function createOpaqueMediaToken(): string {
  return randomBytes(32).toString('base64url');
}

export function hashMediaToken(token: string): string {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

export function utcMonthStart(date = new Date()): Date {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

export function videoMasterObjectKey(storeId: string, sessionId: string): string {
  return `review-videos/stores/${encodeURIComponent(storeId)}/${sessionId}/master`;
}

export function videoIngestObjectKey(sessionId: string): string {
  return `ingest/${sessionId}`;
}

export function hasIsoBaseMediaFtyp(bytes: Uint8Array): boolean {
  if (bytes.byteLength < 12) return false;
  return String.fromCharCode(bytes[4], bytes[5], bytes[6], bytes[7]) === 'ftyp';
}

export function normalizeCompletedParts(value: unknown): Array<{ PartNumber: number; ETag: string }> | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > 10_000) return null;
  const seen = new Set<number>();
  const parts: Array<{ PartNumber: number; ETag: string }> = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const partNumber = Number((item as { partNumber?: unknown }).partNumber);
    const etag = typeof (item as { etag?: unknown }).etag === 'string' ? (item as { etag: string }).etag.trim() : '';
    if (!Number.isInteger(partNumber) || partNumber < 1 || partNumber > 10_000 || !etag || etag.length > 256 || seen.has(partNumber)) return null;
    seen.add(partNumber);
    parts.push({ PartNumber: partNumber, ETag: etag });
  }
  return parts.sort((a, b) => a.PartNumber - b.PartNumber);
}
