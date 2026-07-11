import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { prisma } from '@/lib/prisma';
import { claimDueReviewEmailJobs } from '@/lib/review-email/jobs';
import { isReviewEmailEnabled } from '@/lib/review-email/config';

const CRON_SECRET = process.env.CRON_SECRET;

function authorize(request: NextRequest): string | null {
  if (!CRON_SECRET) return 'CRON_SECRET is not configured';
  return request.headers.get('authorization') === `Bearer ${CRON_SECRET}` ? null : 'Unauthorized';
}

export async function POST(request: NextRequest) {
  const authError = authorize(request);
  if (authError) return NextResponse.json({ error: authError }, { status: authError === 'Unauthorized' ? 401 : 500 });
  if (!isReviewEmailEnabled()) {
    return NextResponse.json({ error: 'review_email_feature_disabled' }, { status: 409 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const rawLimit = typeof body.limit === 'number' ? body.limit : 25;
  const leaseOwner = randomUUID();
  const jobs = await claimDueReviewEmailJobs(prisma, { limit: rawLimit, leaseOwner });

  return NextResponse.json({
    data: {
      claimed: jobs.length,
      jobs: jobs.map((job) => ({
        id: job.id,
        kind: job.kind,
        sequence: job.sequence,
        status: job.status,
        sendAfter: job.sendAfter,
        leaseOwner: job.leaseOwner,
        leaseExpiresAt: job.leaseExpiresAt,
        dispatchAttempts: job.dispatchAttempts,
      })),
    },
  });
}
