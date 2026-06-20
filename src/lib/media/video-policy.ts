import { createHash, randomBytes } from 'crypto';
import {
  VIDEO_ALLOWED_MIME_TYPES,
  VIDEO_MAX_BYTES,
} from '@/lib/media/constants';

export function validateVideoUploadInput(input: { mimeType: unknown; bytes: unknown }) {
  const mimeType = typeof input.mimeType === 'string' ? input.mimeType.trim().toLowerCase() : '';
  const bytes = Number(input.bytes);
  if (!VIDEO_ALLOWED_MIME_TYPES.has(mimeType)) return { ok: false as const, code: 'unsupported_type' };
  if (!Number.isInteger(bytes) || bytes <= 0 || bytes > VIDEO_MAX_BYTES) return { ok: false as const, code: 'invalid_size' };
  return { ok: true as const, mimeType, bytes };
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
