import { JwtPayload, verify } from 'jsonwebtoken';

/**
 * JWT helper methods
 */
export class JwtHelpers {
  /**
   * This api decodes and verify JWT Token by app secret
   *
   * @param token Encoded JWT Token string
   */
  static verifyToken(token: string) {
    try {
      return verify(token, process.env.CLIENT_SECRET || '', {}) as JwtPayload;
    } catch (e) {
      console.error('Error verifying token:', e);
      return;
    }
  }
}
