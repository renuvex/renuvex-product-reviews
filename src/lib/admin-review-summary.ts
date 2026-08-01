export interface AdminReviewSummary {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

interface ReviewStatusGroup {
  status: string;
  _count: { _all: number };
}

export const EMPTY_ADMIN_REVIEW_SUMMARY: AdminReviewSummary = {
  pending: 0,
  approved: 0,
  rejected: 0,
  total: 0,
};

export function buildAdminReviewSummary(groups: readonly ReviewStatusGroup[]): AdminReviewSummary {
  const summary = { ...EMPTY_ADMIN_REVIEW_SUMMARY };

  for (const group of groups) {
    const count = group._count._all;
    summary.total += count;
    if (group.status === 'pending' || group.status === 'approved' || group.status === 'rejected') {
      summary[group.status] += count;
    }
  }

  return summary;
}

export function isAdminReviewSummary(value: unknown): value is AdminReviewSummary {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const summary = value as Record<string, unknown>;
  return ['pending', 'approved', 'rejected', 'total'].every((key) => (
    typeof summary[key] === 'number' && Number.isFinite(summary[key]) && summary[key] >= 0
  ));
}
