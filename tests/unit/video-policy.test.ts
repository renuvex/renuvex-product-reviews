import { describe, expect, it } from 'vitest';
import {
  VIDEO_MAX_BYTES,
} from '@/lib/media/constants';
import {
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
});
