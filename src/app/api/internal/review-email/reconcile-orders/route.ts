import { NextRequest, NextResponse } from 'next/server';
import { getIkas } from '@/helpers/api-helpers';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { reconcileIkasOrdersForReviewRequests } from '@/lib/review-email/ikas-orders';

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

  const body = await request.json().catch(() => ({})) as Record<string, unknown>;
  const authorizedAppId = requiredText(body.authorizedAppId);
  const storeId = requiredText(body.storeId);
  if (!authorizedAppId || !storeId) {
    return NextResponse.json({ error: 'invalid_reconcile_request' }, { status: 400 });
  }

  const authToken = await AuthTokenManager.get(authorizedAppId);
  if (!authToken) return NextResponse.json({ error: 'auth_token_not_found' }, { status: 404 });

  const result = await reconcileIkasOrdersForReviewRequests(getIkas(authToken), {
    storeId,
    authorizedAppId,
  });

  return NextResponse.json({ data: result });
}
