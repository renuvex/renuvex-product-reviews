export function matchesVideoModerationIntent(
  review: { status: string; moderationVersion: number } | null | undefined,
  expectedStatus: 'pending' | 'rejected',
  moderationVersion: number,
) {
  return !!review && review.status === expectedStatus && review.moderationVersion === moderationVersion;
}
