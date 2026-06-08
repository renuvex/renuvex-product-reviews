import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const REVIEW_IMAGE_ROOT_FOLDER = 'review_images';
export const REVIEW_IMAGE_TENANT_FOLDER = 'stores';
export const LEGACY_TARGET_FOLDER = 'legacy';
export const ALLOWED_IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

export function argValue(argv, name) {
  const prefix = `--${name}=`;
  return argv.find((arg) => arg.startsWith(prefix))?.slice(prefix.length)?.trim() || null;
}

export function hasFlag(argv, name) {
  return argv.includes(`--${name}`);
}

function isPlaceholderCredentialValue(value) {
  if (!value) return false;
  return value === 'your_api_key' ||
    value === 'your-api-key' ||
    value === 'your_api_secret' ||
    value === 'your-api-secret' ||
    value.includes('BURAYA') ||
    value.includes('SECRET_DEGERINI');
}

export function loadLocalEnvFiles(cwd = process.cwd(), env = process.env) {
  for (const fileName of ['.env.local', '.env']) {
    const filePath = path.join(cwd, fileName);
    if (!fs.existsSync(filePath)) continue;
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const separatorIndex = line.indexOf('=');
      if (separatorIndex <= 0) continue;
      const key = line.slice(0, separatorIndex).trim();
      if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
      if (env[key] && !isPlaceholderCredentialValue(env[key])) continue;
      let value = line.slice(separatorIndex + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      env[key] = value;
    }
  }
  return env;
}

export function configuredCloudName(explicitCloudName, env = process.env) {
  const cloudName = (explicitCloudName || env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || env.CLOUDINARY_CLOUD_NAME || '').trim();
  if (cloudName === 'your_cloud_name' || cloudName === 'your-cloud-name') return null;
  return /^[A-Za-z0-9_-]+$/.test(cloudName) ? cloudName : null;
}

export function configuredCloudinaryApiCredentials(env = process.env) {
  const apiKey = (env.CLOUDINARY_API_KEY || '').trim();
  const apiSecret = (env.CLOUDINARY_API_SECRET || '').trim();
  if (
    isPlaceholderCredentialValue(apiKey) ||
    isPlaceholderCredentialValue(apiSecret)
  ) {
    return null;
  }
  return apiKey && apiSecret ? { apiKey, apiSecret } : null;
}

export function normalizeStoreId(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{1,128}$/.test(value.trim()) ? value.trim() : null;
}

export function parseLegacyImages(value) {
  if (!value) return { kind: 'empty', urls: [] };
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return { kind: 'not_array', urls: [] };
    const urls = [];
    for (const item of parsed) {
      if (typeof item !== 'string') continue;
      const normalized = item.trim();
      if (normalized && !urls.includes(normalized)) urls.push(normalized);
    }
    return { kind: 'array', urls };
  } catch {
    return { kind: 'invalid_json', urls: [] };
  }
}

export function cloudinaryImageParts(value) {
  if (typeof value !== 'string') return null;
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return null;
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
    return null;
  }

  const lowerPath = url.pathname.toLowerCase();
  if (lowerPath.includes('%2f') || lowerPath.includes('%5c')) return null;

  const parts = url.pathname.split('/').filter(Boolean);
  if (parts.length < 5 || parts[1] !== 'image' || parts[2] !== 'upload') return null;

  const versionIndex = parts.findIndex((part, index) => index >= 3 && /^v\d+$/.test(part));
  if (versionIndex < 0 || versionIndex >= parts.length - 1) return null;

  const fileName = parts[parts.length - 1];
  const extension = fileName.includes('.') ? fileName.split('.').pop()?.toLowerCase() : '';
  if (!extension || !ALLOWED_IMAGE_EXTENSIONS.has(extension)) return null;

  return {
    url,
    parts,
    cloudName: parts[0],
    version: parts[versionIndex],
    publicIdParts: parts.slice(versionIndex + 1),
    publicId: parts.slice(versionIndex + 1).join('/').replace(/\.[^.]+$/, ''),
    extension,
  };
}

export function classifyLegacyImageUrl(value, review, cloudName) {
  const storeId = normalizeStoreId(review?.storeId);
  const parsed = cloudinaryImageParts(value);
  if (!parsed) return { bucket: 'non_cloudinary_or_untrusted_shape', publicId: null, targetPublicId: null };
  if (cloudName && parsed.cloudName !== cloudName) return { bucket: 'foreign_cloudinary_cloud', publicId: parsed.publicId, targetPublicId: null };
  if (!storeId) return { bucket: 'invalid_store_id', publicId: parsed.publicId, targetPublicId: null };

  const id = parsed.publicIdParts;
  if (id[0] === REVIEW_IMAGE_ROOT_FOLDER && id[1] === REVIEW_IMAGE_TENANT_FOLDER && id[2] === storeId && id.length >= 4) {
    return { bucket: 'tenant_scoped_trusted', publicId: parsed.publicId, targetPublicId: parsed.publicId };
  }
  if (id[0] === REVIEW_IMAGE_ROOT_FOLDER && id[1] === REVIEW_IMAGE_TENANT_FOLDER && id[2] !== storeId) {
    return { bucket: 'tenant_scoped_wrong_store', publicId: parsed.publicId, targetPublicId: null };
  }
  if (id[0] === REVIEW_IMAGE_ROOT_FOLDER) {
    return {
      bucket: 'legacy_global_review_images',
      publicId: parsed.publicId,
      targetPublicId: buildLegacyTargetPublicId(review, parsed.publicId, 0),
    };
  }
  return { bucket: 'same_cloud_other_folder', publicId: parsed.publicId, targetPublicId: null };
}

export function buildLegacyTargetPublicId(review, sourcePublicId, position) {
  const storeId = normalizeStoreId(review?.storeId);
  if (!storeId || !review?.id) return null;
  const safePosition = Number.isInteger(position) && position >= 0 ? position : 0;
  const hash = crypto.createHash('sha1').update(`${review.id}\u0000${sourcePublicId}\u0000${safePosition}`).digest('hex').slice(0, 12);
  return `${REVIEW_IMAGE_ROOT_FOLDER}/${REVIEW_IMAGE_TENANT_FOLDER}/${storeId}/${LEGACY_TARGET_FOLDER}/${review.id}/${String(safePosition).padStart(2, '0')}-${hash}`;
}

export function classifyReviewImages(review, cloudName) {
  const parsed = parseLegacyImages(review.images);
  if (parsed.kind !== 'array') {
    return {
      parseKind: parsed.kind,
      items: [],
    };
  }

  return {
    parseKind: parsed.kind,
    items: parsed.urls.map((url, position) => {
      const classification = classifyLegacyImageUrl(url, review, cloudName);
      return {
        url,
        position,
        ...classification,
        targetPublicId: classification.bucket === 'legacy_global_review_images'
          ? buildLegacyTargetPublicId(review, classification.publicId, position)
          : classification.targetPublicId,
      };
    }),
  };
}

export function summarizeClassifiedReviews(reviews, cloudName) {
  const summary = {
    cloudName,
    reviewCount: reviews.length,
    rowsWithImagesText: 0,
    rowsWithValidJsonArray: 0,
    rowsWithReviewMedia: 0,
    rowsWithHasImagesTrue: 0,
    totalLegacyUrls: 0,
    buckets: {},
    statusBuckets: {},
    reviewsByBucket: {},
    duplicatePublicIds: [],
    duplicateTargetPublicIds: [],
    mediaVisibility: { visible: 0, hidden: 0 },
  };

  const publicIds = new Map();
  const targetPublicIds = new Map();

  for (const review of reviews) {
    if (review.images && review.images.trim() && review.images.trim() !== '[]') summary.rowsWithImagesText += 1;
    if (review.media?.length) summary.rowsWithReviewMedia += 1;
    if (review.hasImages) summary.rowsWithHasImagesTrue += 1;
    for (const media of review.media ?? []) media.visible ? summary.mediaVisibility.visible += 1 : summary.mediaVisibility.hidden += 1;

    const classified = classifyReviewImages(review, cloudName);
    if (classified.parseKind === 'array') summary.rowsWithValidJsonArray += 1;
    if (classified.parseKind !== 'array') {
      summary.buckets[classified.parseKind] = (summary.buckets[classified.parseKind] || 0) + 1;
      continue;
    }

    const reviewBuckets = new Set();
    for (const item of classified.items) {
      summary.totalLegacyUrls += 1;
      summary.buckets[item.bucket] = (summary.buckets[item.bucket] || 0) + 1;
      summary.statusBuckets[`${review.status}:${item.bucket}`] = (summary.statusBuckets[`${review.status}:${item.bucket}`] || 0) + 1;
      reviewBuckets.add(item.bucket);
      if (item.publicId) {
        const refs = publicIds.get(item.publicId) || [];
        refs.push(review.id);
        publicIds.set(item.publicId, refs);
      }
      if (item.targetPublicId) {
        const refs = targetPublicIds.get(item.targetPublicId) || [];
        refs.push(review.id);
        targetPublicIds.set(item.targetPublicId, refs);
      }
    }
    for (const bucket of reviewBuckets) summary.reviewsByBucket[bucket] = (summary.reviewsByBucket[bucket] || 0) + 1;
  }

  summary.duplicatePublicIds = [...publicIds.entries()]
    .filter(([, refs]) => refs.length > 1)
    .map(([publicId, refs]) => ({ publicId, refs: refs.length }));
  summary.duplicateTargetPublicIds = [...targetPublicIds.entries()]
    .filter(([, refs]) => refs.length > 1)
    .map(([publicId, refs]) => ({ publicId, refs: refs.length }));

  return summary;
}

export function isTrustedTenantUrl(value, cloudName, storeId) {
  const parsed = cloudinaryImageParts(value);
  if (!parsed || parsed.cloudName !== cloudName) return false;
  const normalizedStoreId = normalizeStoreId(storeId);
  const id = parsed.publicIdParts;
  return !!normalizedStoreId &&
    id[0] === REVIEW_IMAGE_ROOT_FOLDER &&
    id[1] === REVIEW_IMAGE_TENANT_FOLDER &&
    id[2] === normalizedStoreId &&
    id.length >= 4;
}
