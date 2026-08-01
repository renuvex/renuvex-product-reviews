import { NextResponse } from 'next/server';
import { authenticateIkasAdminRequest, ikasAdminAuthenticationResponse } from '@/lib/auth-helpers';
import { buildAdminReviewSummary } from '@/lib/admin-review-summary';
import { prisma } from '@/lib/prisma';
import { reportServerFailure } from '@/lib/server-failures';

function privateNoStoreJson(body: unknown, status = 200) {
  const response = NextResponse.json(body, { status });
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Pragma', 'no-cache');
  return response;
}

export async function GET(request: Request) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);

    const groups = await prisma.review.groupBy({
      by: ['status'],
      where: { storeId: auth.context.principal.merchantId },
      _count: { _all: true },
    });

    return privateNoStoreJson({ data: buildAdminReviewSummary(groups) });
  } catch {
    reportServerFailure('admin_review_summary_failed');
    return privateNoStoreJson({ error: 'admin_review_summary_failed' }, 500);
  }
}
