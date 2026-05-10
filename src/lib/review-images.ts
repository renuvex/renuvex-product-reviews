const REVIEW_IMAGE_FOLDER = 'review_images';
const REVIEW_IMAGE_MAX_COUNT = 3;
const REVIEW_IMAGE_ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

type SanitizeResult =
  | { ok: true; urls: string[] }
  | { ok: false; error: 'missing_cloud' | 'not_array' | 'too_many' | 'invalid_url' };

export function getConfiguredCloudinaryCloudName(): string | null {
  const cloudName = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '').trim();
  return /^[A-Za-z0-9_-]+$/.test(cloudName) ? cloudName : null;
}

export function isTrustedReviewImageUrl(value: unknown, cloudName = getConfiguredCloudinaryCloudName()): value is string {
  if (typeof value !== 'string') return false;
  const urlValue = value.trim();
  if (!urlValue || urlValue.length > 2048 || !cloudName) return false;

  let url: URL;
  try {
    url = new URL(urlValue);
  } catch {
    return false;
  }

  if (
    url.protocol !== 'https:' ||
    url.hostname !== 'res.cloudinary.com' ||
    url.username ||
    url.password ||
    url.port ||
    url.search ||
    url.hash
  ) {
    return false;
  }

  const lowerPath = url.pathname.toLowerCase();
  if (lowerPath.includes('%2f') || lowerPath.includes('%5c')) return false;

  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length < 6) return false;
  if (parts[0] !== cloudName || parts[1] !== 'image' || parts[2] !== 'upload') return false;
  if (!/^v\d+$/.test(parts[3]) || parts[4] !== REVIEW_IMAGE_FOLDER) return false;
  if (parts.slice(5).some(part => part === '.' || part === '..')) return false;

  const fileName = parts[parts.length - 1];
  const extension = fileName.includes('.') ? fileName.split('.').pop()?.toLowerCase() : '';
  return !!extension && REVIEW_IMAGE_ALLOWED_EXTENSIONS.has(extension);
}

export function sanitizeReviewImageUrls(value: unknown, cloudName = getConfiguredCloudinaryCloudName()): SanitizeResult {
  if (value === undefined || value === null) return { ok: true, urls: [] };
  if (!Array.isArray(value)) return { ok: false, error: 'not_array' };
  if (value.length === 0) return { ok: true, urls: [] };
  if (!cloudName) return { ok: false, error: 'missing_cloud' };
  if (value.length > REVIEW_IMAGE_MAX_COUNT) return { ok: false, error: 'too_many' };

  const urls: string[] = [];
  for (const item of value) {
    if (!isTrustedReviewImageUrl(item, cloudName)) return { ok: false, error: 'invalid_url' };
    const normalized = item.trim();
    if (!urls.includes(normalized)) urls.push(normalized);
  }

  return { ok: true, urls };
}

export function parseStoredReviewImages(value: string | null | undefined, cloudName = getConfiguredCloudinaryCloudName()): string[] {
  if (!value || !cloudName) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((url): url is string => isTrustedReviewImageUrl(url, cloudName));
  } catch {
    return [];
  }
}

export function getReviewImagePublicId(url: string, cloudName = getConfiguredCloudinaryCloudName()): string | null {
  if (!isTrustedReviewImageUrl(url, cloudName)) return null;
  const parts = new URL(url).pathname.split('/').filter(Boolean);
  return parts.slice(4).join('/').replace(/\.[^.]+$/, '');
}
