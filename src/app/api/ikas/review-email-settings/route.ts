import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth-helpers';
import { prisma } from '@/lib/prisma';
import {
  buildReviewEmailSettingsWrite,
  getEffectiveReviewEmailSettings,
  persistReviewEmailSettings,
  ReviewEmailSettingsError,
  serializeReviewEmailSettings,
} from '@/lib/review-email/settings';
import { AuthTokenManager } from '@/models/auth-token/manager';
import { getIkas } from '@/helpers/api-helpers';
import { buildOrderWebhookEndpoint, registerOrderWebhooks } from '@/lib/review-email/ikas-orders';

export async function GET(request: NextRequest) {
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const settings = await getEffectiveReviewEmailSettings(prisma, user.merchantId);
  return NextResponse.json({ data: serializeReviewEmailSettings(settings) });
}

export async function PUT(request: NextRequest) {
  try {
    const user = getUserFromRequest(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const data = buildReviewEmailSettingsWrite(body);
    if (data.enabled) {
      const authToken = await AuthTokenManager.get(user.authorizedAppId);
      if (!authToken) {
        throw new ReviewEmailSettingsError('auth_token_not_found', 'Auth token not found', 409);
      }
      try {
        await registerOrderWebhooks(
          getIkas(authToken),
          buildOrderWebhookEndpoint(request.headers.get('host') ?? ''),
        );
      } catch {
        await persistReviewEmailSettings(
          prisma,
          user.merchantId,
          { ...data, enabled: false },
          { status: 'error', verifiedAt: null, lastErrorCode: 'registration_failed' },
        );
        throw new ReviewEmailSettingsError('order_webhook_registration_failed', undefined, 502);
      }
    }

    const settings = await persistReviewEmailSettings(
      prisma,
      user.merchantId,
      data,
      data.enabled
        ? { status: 'verified', verifiedAt: new Date(), lastErrorCode: null }
        : {},
    );
    return NextResponse.json({ data: serializeReviewEmailSettings(settings) });
  } catch (error) {
    if (error instanceof ReviewEmailSettingsError) {
      return NextResponse.json({ error: error.code }, { status: error.status });
    }
    console.error('[review-email-settings] ERROR:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'review_email_settings_failed' }, { status: 500 });
  }
}
