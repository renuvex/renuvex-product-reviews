import { JwtHelpers } from '../helpers/jwt-helpers';

/**
 * Extracts user information (authorizedAppId and merchantId) from the Authorization header in the request.
 * 
 * @param request - The incoming NextRequest object from a route handler or middleware.
 * @returns An object containing authorizedAppId and merchantId if the JWT is valid, otherwise null.
 */
export function getUserFromRequest(request: Request) {
  // Development ortamında token doğrulamayı bypass et
  if (process.env.NODE_ENV === 'development' && process.env.DEV_MERCHANT_ID) {
    return {
      authorizedAppId: process.env.DEV_AUTHORIZED_APP_ID!,
      merchantId: process.env.DEV_MERCHANT_ID!,
    };
  }

  // Get the Authorization header from the request
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return null;

  // Remove "JWT " prefix and extract the token
  const token = authHeader.replace('JWT ', '');

  // Verify and decode the token
  const tokenData = JwtHelpers.verifyToken(token);
  if (!tokenData) return null;

  // Return relevant user information extracted from the token
  return {
    authorizedAppId: tokenData.aud as string,
    merchantId: tokenData.sub!,
  };
}