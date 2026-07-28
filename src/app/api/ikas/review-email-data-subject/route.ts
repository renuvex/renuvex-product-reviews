import { createHash } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  authenticateIkasAdminRequest,
} from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import { checkFixedWindowRateLimit } from '@/lib/public-rate-limit';
import { IkasInstallationError } from '@/lib/ikas-installation-lifecycle';
import {
  createOrResumeReviewEmailDataSubjectRun,
  executeReviewEmailDataSubjectErasure,
  getReviewEmailDataSubjectRun,
  ReviewEmailDataSubjectError,
} from '@/lib/review-email/data-subject';
import { ReviewEmailJournalError } from '@/lib/review-email/journal';
import { normalizeReviewEmailFailure, reportReviewEmailFailure } from '@/lib/review-email/failures';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const eraseSchema = z.object({
  action: z.literal('erase'),
  email: z.string().min(3).max(320),
  confirmation: z.literal('ERASE_REVIEW_EMAIL_DATA'),
}).strict();

function privateResponse(body: unknown, init?: ResponseInit): NextResponse {
  const response = NextResponse.json(body, init);
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
}

async function enforceMerchantRateLimit(storeId: string): Promise<NextResponse | null> {
  const key = createHash('sha256').update(storeId, 'utf8').digest('hex');
  const limit = await checkFixedWindowRateLimit({
    key: `review_email_dsr:${key}`,
    max: 10,
    windowSec: 60,
    label: 'review-email-dsr',
  });
  if (limit.allowed) return null;
  const response = privateResponse({ error: 'rate_limited' }, { status: 429 });
  response.headers.set('Retry-After', String(limit.retryAfterSec));
  return response;
}

function errorResponse(error: unknown): NextResponse {
  if (error instanceof ReviewEmailDataSubjectError) {
    return privateResponse({ error: error.code }, { status: error.status });
  }
  if (error instanceof ReviewEmailJournalError) {
    return privateResponse({ error: error.code }, { status: error.retryable ? 503 : 409 });
  }
  if (error instanceof IkasInstallationError) {
    return privateResponse({ error: error.code }, { status: 409 });
  }
  reportReviewEmailFailure(
    'data_subject_erasure',
    normalizeReviewEmailFailure('data_subject_erasure', error),
  );
  return privateResponse({ error: 'review_email_data_subject_failed' }, { status: 500 });
}

export async function POST(request: NextRequest) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return privateResponse({ error: auth.code }, { status: auth.status });
    const user = auth.context.principal;
    const limited = await enforceMerchantRateLimit(user.merchantId);
    if (limited) return limited;

    const idempotencyKey = request.headers.get('idempotency-key')?.trim() ?? '';
    if (!UUID_PATTERN.test(idempotencyKey)) {
      return privateResponse({ error: 'invalid_idempotency_key' }, { status: 400 });
    }
    const parsed = eraseSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return privateResponse({ error: 'invalid_request' }, { status: 400 });

    const prepared = await createOrResumeReviewEmailDataSubjectRun(prisma, {
      storeId: user.merchantId,
      authorizedAppId: user.authorizedAppId,
      idempotencyKey,
      email: parsed.data.email,
    });
    const result = await executeReviewEmailDataSubjectErasure(prepared.run.id);
    return privateResponse({ data: result });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return privateResponse({ error: auth.code }, { status: auth.status });
    const user = auth.context.principal;
    const limited = await enforceMerchantRateLimit(user.merchantId);
    if (limited) return limited;
    const runId = new URL(request.url).searchParams.get('runId')?.trim() ?? '';
    if (!UUID_PATTERN.test(runId)) return privateResponse({ error: 'invalid_run_id' }, { status: 400 });
    const run = await getReviewEmailDataSubjectRun(user.merchantId, user.authorizedAppId, runId);
    if (!run) return privateResponse({ error: 'not_found' }, { status: 404 });
    return privateResponse({ data: run });
  } catch (error) {
    return errorResponse(error);
  }
}
