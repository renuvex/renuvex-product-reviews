export function normalizeReviewImageStoreId(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const storeId = value.trim();
  return /^[A-Za-z0-9_-]{1,128}$/.test(storeId) ? storeId : null;
}
