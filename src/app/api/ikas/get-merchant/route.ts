import { GetMerchantQueryData } from '@/lib/ikas-client/generated/graphql';
import { getIkas } from '@/helpers/api-helpers';
import {
  authenticateIkasAdminRequest,
  ikasAdminAuthenticationResponse,
} from '@/lib/auth-helpers';
import { NextRequest, NextResponse } from 'next/server';
import { reportServerFailure } from '@/lib/server-failures';

export type GetMerchantApiResponse = {
  merchantInfo?: GetMerchantQueryData;
};

/**
 * Handles GET requests to fetch merchant information for the authenticated user.
 * - Authenticates the user from the request.
 * - Retrieves the auth token for the user's authorized app.
 * - Fetches merchant info using the Ikas API client.
 * - Returns the merchant info or an appropriate error response.
 */
export async function GET(request: NextRequest) {
  try {
    const auth = await authenticateIkasAdminRequest(request);
    if (!auth.ok) return ikasAdminAuthenticationResponse(auth);
    const { authToken, principal } = auth.context;

    // Initialize Ikas API client with the auth token
    const ikasClient = getIkas(authToken);

    // Fetch merchant information from Ikas API
    const merchantResponse = await ikasClient.queries.getMerchant();

    // Check if the API call was successful and merchant data is present
    if (merchantResponse.isSuccess && merchantResponse.data?.getMerchant) {
      if (merchantResponse.data.getMerchant.id !== principal.merchantId) {
        return ikasAdminAuthenticationResponse({ ok: false, code: 'unauthorized', status: 401 });
      }
      // Return the merchant information
      return NextResponse.json({ data: { merchantInfo: merchantResponse.data.getMerchant } });
    } else {
      // Merchant not found or API call failed
      return NextResponse.json({ error: 'Merchant not found' }, { status: 403 });
    }
  } catch {
    reportServerFailure('merchant_fetch_failed');
    return NextResponse.json({ error: 'merchant_fetch_failed' }, { status: 500 });
  }
}
