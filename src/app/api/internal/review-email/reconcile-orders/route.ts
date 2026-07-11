import { NextRequest, NextResponse } from 'next/server';
import { getIkas } from '@/helpers/api-helpers';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { reconcileIkasOrdersForReviewRequests } from '@/lib/review-email/ikas-orders';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import { prisma } from '@/lib/prisma';
import { getEffectiveReviewEmailSettings } from '@/lib/review-email/settings';
import { ensureActiveIkasStoreInstallation, IkasInstallationError } from '@/lib/ikas-installation-lifecycle';

const CRON_SECRET = process.env.CRON_SECRET;

function authorize(request: NextRequest): string | null {
  if (!CRON_SECRET) return 'CRON_SECRET is not configured';
  return request.headers.get('authorization') === `Bearer ${CRON_SECRET}` ? null : 'Unauthorized';
}

function requiredText(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

export async function POST(request: NextRequest) {
  const authError = authorize(request);
  if (authError) return NextResponse.json({ error: authError }, { status: authError === 'Unauthorized' ? 401 : 500 });
  if (!isReviewEmailEnabled()) {
    return NextResponse.json({ error: 'review_email_feature_disabled' }, { status: 409 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const authorizedAppId = requiredText(body.authorizedAppId);
  const requestedStoreId = requiredText(body.storeId);
  if (!authorizedAppId) {
    return NextResponse.json({ error: 'invalid_reconcile_request' }, { status: 400 });
  }

  const authToken = await AuthTokenManager.get(authorizedAppId);
  if (!authToken) return NextResponse.json({ error: 'auth_token_not_found' }, { status: 404 });
  const storeId = authToken.merchantId;
  if (requestedStoreId && requestedStoreId !== storeId) {
    return NextResponse.json({ error: 'reconcile_tenant_mismatch' }, { status: 400 });
  }

  try {
    await ensureActiveIkasStoreInstallation(storeId, authorizedAppId);
  } catch (error) {
    if (error instanceof IkasInstallationError) {
      return NextResponse.json({ error: error.code }, { status: 409 });
    }
    throw error;
  }
  const settings = await getEffectiveReviewEmailSettings(prisma, storeId);
  if (!settings.enabled) {
    return NextResponse.json({ error: 'review_email_store_disabled' }, { status: 409 });
  }

  const result = await reconcileIkasOrdersForReviewRequests(getIkas(authToken), {
    storeId,
    authorizedAppId,
  });

  return NextResponse.json({ data: result });
}
