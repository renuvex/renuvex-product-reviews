import { config } from '@/globals/config';
import {
  consumeOAuthStateTransaction,
  ikasStoreNameSchema,
  isOAuthBrowserBinding,
  oauthStateSchema,
  OAuthStateStoreError,
} from '@/lib/oauth-state';
import { getSession } from '@/lib/session';
import { validateRequest } from '@/lib/validation';
import { OAuthAPI } from '@ikas/admin-api-client';
import moment from 'moment';
import { getIkas, getIkasV1 } from '@/helpers/api-helpers';
import { JwtHelpers } from '@/helpers/jwt-helpers';
import { TokenHelpers } from '@/helpers/token-helpers';
import { AuthToken } from '@/models/auth-token';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse, after } from 'next/server';
import z from 'zod';
import { ensureStorefrontScripts } from '@/lib/storefront-scripts';
import { buildProductWebhookEndpoint, registerProductWebhooks, syncAllProductsForStore } from '@/lib/product-snapshots';
import { isReviewEmailEnabled } from '@/lib/review-email/config';
import { buildOrderWebhookEndpoint, registerOrderWebhooks } from '@/lib/review-email/ikas-orders';
import { activateIkasStoreInstallation } from '@/lib/ikas-installation-lifecycle';
import { updateReviewEmailWebhookStateForInstallation } from '@/lib/review-email/settings';

const callbackSchema = z.object({
  code: z.string().min(1, 'Authorization code is required'),
  storeName: ikasStoreNameSchema,
  state: oauthStateSchema,
  signature: z.string().optional(),
});

/**
 * Handles the OAuth callback for Ikas.
 * Requires and atomically consumes browser-bound state, validates a supplied
 * code signature, exchanges the authorization code, and redirects.
 */
export async function GET(request: NextRequest) {
  try {
    // Parse the request URL to extract query parameters
    const url = new URL(request.url as string, `http://${request.headers.get('host')}`);
    const { searchParams } = url;

    // Validate the incoming request parameters (code, storeName, state, signature)
    const validation = validateRequest(callbackSchema, {
      code: searchParams.get('code'),
      storeName: searchParams.get('storeName'),
      state: searchParams.get('state'),
      signature: searchParams.get('signature') || undefined,
    });

    if (!validation.success) {
      // Invalid parameters
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { code, storeName, state, signature } = validation.data;

    // Validate code signature
    if (signature && !TokenHelpers.validateCodeSignature(code, signature, config.oauth.clientSecret!)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Bind the callback to the initiating browser and atomically consume state.
    const session = await getSession();
    if (!isOAuthBrowserBinding(session.oauthBrowserBinding)) {
      return NextResponse.json({ error: 'Invalid or expired OAuth state' }, { status: 400 });
    }

    const oauthTransaction = await consumeOAuthStateTransaction({
      browserBinding: session.oauthBrowserBinding,
      state,
    });
    if (!oauthTransaction || oauthTransaction.storeName !== storeName) {
      return NextResponse.json({ error: 'Invalid or expired OAuth state' }, { status: 400 });
    }

    // Exchange authorization code for access/refresh tokens
    const tokenResponse = await OAuthAPI.getTokenWithAuthorizationCode(
      {
        code: code as string,
        client_id: config.oauth.clientId!,
        client_secret: config.oauth.clientSecret!,
        redirect_uri: oauthTransaction.redirectUri,
      },
      {
        storeName: oauthTransaction.storeName,
      },
    );

    if (!tokenResponse.data) {
      // Failed to get token
      return NextResponse.json({ error: { statusCode: 500, message: 'Failed to retrieve token' } }, { status: 500 });
    }

    // Prepare a temporary token object
    const tokenTemp: Partial<AuthToken> = {
      accessToken: tokenResponse.data.access_token,
      refreshToken: tokenResponse.data.refresh_token,
      tokenType: tokenResponse.data.token_type,
      expiresIn: tokenResponse.data.expires_in,
      expireDate: '',
      scope: tokenResponse.data.scope,
      salesChannelId: null,
    };

    // Create an Ikas client with the new token
    const ikas = getIkas(tokenTemp as AuthToken);

    // Fetch merchant and authorized app details
    const [merchantResponse, authorizedAppResponse] = await Promise.all([ikas.queries.getMerchant(), ikas.queries.getAuthorizedApp()]);

    // Validate responses
    if (
      !merchantResponse.isSuccess ||
      !merchantResponse.data ||
      !authorizedAppResponse.isSuccess ||
      !authorizedAppResponse.data ||
      !authorizedAppResponse.data.getAuthorizedApp ||
      !merchantResponse.data.getMerchant
    ) {
      return NextResponse.json(
        {
          error: { statusCode: 403, message: 'Unable to retrieve merchant or authorized app' },
        },
        { status: 403 },
      );
    }

    // Extract necessary IDs and calculate token expiration date
    const authorizedAppId = authorizedAppResponse.data.getAuthorizedApp.id!;
    const merchantId = merchantResponse.data.getMerchant.id!;
    const expireDate = moment().add(tokenResponse.data.expires_in, 'seconds').toDate().toISOString();

    // Build the final AuthToken object
    const token: AuthToken = {
      ...tokenTemp,
      authorizedAppId,
      merchantId,
      expireDate,
      salesChannelId: authorizedAppResponse.data.getAuthorizedApp.salesChannelId || null,
    } as AuthToken;

    // Replace the merchant token and activate a new installation generation in
    // one transaction so stale uninstall events cannot target the new install.
    await activateIkasStoreInstallation(token);

    // Ensure storeSettings record exists for this merchant
    await prisma.storeSettings.upsert({
      where: { storeId: merchantId },
      update: {},
      create: { storeId: merchantId },
    });

    // Auto-inject widget script into all storefronts using non-destructive upsert.
    try {
      await ensureStorefrontScripts(ikas, merchantId, 'install', { scriptListClient: getIkasV1(token) });
    } catch (scriptError) {
      console.error('Widget script injection failed:', scriptError);
    }

    const host = request.headers.get('host');
    if (host) {
      try {
        await registerProductWebhooks(ikas, buildProductWebhookEndpoint(host));
      } catch (webhookError) {
        console.error('Product webhook registration failed:', webhookError);
      }

      const reviewEmailSettings = isReviewEmailEnabled()
        ? await prisma.reviewEmailSettings.findUnique({
            where: { storeId: merchantId },
            select: { enabled: true },
          })
        : null;
      if (reviewEmailSettings?.enabled) {
        let orderWebhookRegistered = false;
        try {
          await registerOrderWebhooks(ikas, buildOrderWebhookEndpoint(host));
          orderWebhookRegistered = true;
        } catch (webhookError) {
          await updateReviewEmailWebhookStateForInstallation(prisma, {
            storeId: merchantId,
            authorizedAppId,
            disable: true,
            webhookState: {
              status: 'error',
              verifiedAt: null,
              lastErrorCode: 'registration_failed',
            },
          }).catch(() => undefined);
          console.error('Order webhook registration failed:', webhookError);
        }
        if (orderWebhookRegistered) {
          await updateReviewEmailWebhookStateForInstallation(prisma, {
            storeId: merchantId,
            authorizedAppId,
            disable: false,
            webhookState: {
              status: 'verified',
              verifiedAt: new Date(),
              lastErrorCode: null,
            },
          });
        }
      }
    }

    // Backfill snapshots after the response is sent so a large catalog cannot
    // delay or fail the install; webhooks + /api/admin/sync-products recover misses.
    after(async () => {
      try {
        await syncAllProductsForStore(ikas, merchantId);
      } catch (productSyncError) {
        console.error('Initial product snapshot sync failed:', productSyncError);
      }
    });

    // Update session with the installation identity while retaining the opaque
    // browser binding for independent future OAuth transactions.
    session.expiresAt = new Date(Date.now() + 3600 * 1000);
    session.merchantId = merchantId;
    session.authorizedAppId = authorizedAppId;
    await session.save();

    // Create a JWT for the merchant and authorized app
    const jwtToken = JwtHelpers.createToken(merchantId, authorizedAppId);

    // Build the redirect URL for the admin panel
    const redirectUrl = `${config.adminUrl!.replace(
      '{storeName}',
      merchantResponse.data.getMerchant.storeName as string,
    )}/authorized-app/${authorizedAppId}`;

    // Build the callback URL with token and redirect info
    const callbackUrl = new URLSearchParams();
    callbackUrl.set('token', jwtToken);
    callbackUrl.set('redirectUrl', redirectUrl);
    callbackUrl.set('authorizedAppId', authorizedAppId);

    // Redirect the user to the callback URL
    return NextResponse.redirect(new URL(`/callback?${callbackUrl.toString()}`, oauthTransaction.redirectUri));
  } catch (error) {
    if (error instanceof OAuthStateStoreError) {
      console.error('[oauth-callback] oauth_state_store_unavailable');
      return NextResponse.json({ error: { statusCode: 503, message: 'Authorization temporarily unavailable' } }, { status: 503 });
    }
    console.error('[oauth-callback] callback_failed');
    return NextResponse.json({ error: { statusCode: 500, message: 'Callback failed' } }, { status: 500 });
  }
}
