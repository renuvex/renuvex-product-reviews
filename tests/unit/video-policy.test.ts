import { describe, expect, it } from 'vitest';
import {
  VIDEO_MAX_BYTES,
  VIDEO_MULTIPART_PART_BYTES,
} from '@/lib/media/constants';
import {
  hasIsoBaseMediaFtyp,
  normalizeCompletedParts,
  partitionVideoBytes,
  validateVideoUploadInput,
} from '@/lib/media/video-policy';

describe('video upload policy', () => {
  it('accepts supported media at the 150 MiB boundary', () => {
    expect(validateVideoUploadInput({ mimeType: 'video/mp4', bytes: VIDEO_MAX_BYTES })).toEqual({
      ok: true,
      mimeType: 'video/mp4',
      bytes: VIDEO_MAX_BYTES,
    });
    expect(validateVideoUploadInput({ mimeType: 'video/quicktime', bytes: 1 }).ok).toBe(true);
  });

  it('rejects unsupported types and invalid sizes', () => {
    expect(validateVideoUploadInput({ mimeType: 'video/webm', bytes: 100 })).toEqual({ ok: false, code: 'unsupported_type' });
    expect(validateVideoUploadInput({ mimeType: 'video/mp4', bytes: VIDEO_MAX_BYTES + 1 })).toEqual({ ok: false, code: 'invalid_size' });
    expect(validateVideoUploadInput({ mimeType: 'video/mp4', bytes: 1.5 })).toEqual({ ok: false, code: 'invalid_size' });
  });

  it('partitions a file into uniform 10 MiB parts except for the final part', () => {
    expect(partitionVideoBytes(VIDEO_MULTIPART_PART_BYTES * 2 + 7)).toEqual([
      { partNumber: 1, offset: 0, size: VIDEO_MULTIPART_PART_BYTES },
      { partNumber: 2, offset: VIDEO_MULTIPART_PART_BYTES, size: VIDEO_MULTIPART_PART_BYTES },
      { partNumber: 3, offset: VIDEO_MULTIPART_PART_BYTES * 2, size: 7 },
    ]);
  });

  it('normalizes completed parts and rejects duplicate or malformed entries', () => {
    expect(normalizeCompletedParts([
      { partNumber: 2, etag: '"two"' },
      { partNumber: 1, etag: '"one"' },
    ])).toEqual([
      { PartNumber: 1, ETag: '"one"' },
      { PartNumber: 2, ETag: '"two"' },
    ]);
    expect(normalizeCompletedParts([{ partNumber: 1, etag: 'a' }, { partNumber: 1, etag: 'b' }])).toBeNull();
    expect(normalizeCompletedParts([])).toBeNull();
  });

  it('recognizes the ISO Base Media ftyp box used by MP4 and MOV containers', () => {
    expect(hasIsoBaseMediaFtyp(Uint8Array.from([0, 0, 0, 24, 102, 116, 121, 112, 105, 115, 111, 109]))).toBe(true);
    expect(hasIsoBaseMediaFtyp(Uint8Array.from([0, 0, 0, 24, 109, 111, 111, 118, 0, 0, 0, 0]))).toBe(false);
  });
});
