import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('admin image preview contract', () => {
  it('loads signed AWS image thumbnails through the authenticated preview endpoint', () => {
    const homeSource = readFileSync(path.join(process.cwd(), 'src/features/review-moderation/ReviewModerationScreen.tsx'), 'utf8');
    const rowSource = readFileSync(path.join(process.cwd(), 'src/features/review-moderation/ReviewRow.tsx'), 'utf8');
    const routeSource = readFileSync(path.join(process.cwd(), 'src/app/api/admin/reviews/image-preview/route.ts'), 'utf8');

    expect(homeSource).toContain('/api/admin/reviews/image-preview?mediaId=');
    expect(homeSource).toContain('variant=${encodeURIComponent(variant)}');
    expect(homeSource).toContain("getImagePreviewUrl(media.id, 'w1200')");
    expect(homeSource).toContain("mediaPreview.type === 'image' ? 'Gorsel yukleniyor...'");
    expect(rowSource).toContain("getImagePreviewUrl(item.id, 'thumb_320x427')");
    expect(rowSource).toContain('ImageIcon');
    expect(rowSource).not.toContain('>IMG<');
    expect(routeSource).toContain("'thumb_320x427'");
    expect(routeSource).toContain("response.headers.set('Cache-Control', 'private, no-store')");
  });
});
