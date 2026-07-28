import { verify } from 'jsonwebtoken';
import {
  getRequiredIkasClientSecret,
  IkasClientSecretConfigurationError,
} from '@/lib/ikas-client-secret';

export type IkasAdminJwtClaims = {
  aud: string;
  sub: string;
  exp: number;
  iat: number;
};

export type IkasAdminJwtVerificationResult =
  | { status: 'valid'; claims: IkasAdminJwtClaims }
  | { status: 'invalid' }
  | { status: 'configuration_error' };

export class JwtHelpers {
  static verifyToken(token: string): IkasAdminJwtVerificationResult {
    let secret: string;
    try {
      secret = getRequiredIkasClientSecret();
    } catch (error) {
      if (error instanceof IkasClientSecretConfigurationError) {
        return { status: 'configuration_error' };
      }
      return { status: 'invalid' };
    }

    try {
      const payload = verify(token, secret, { algorithms: ['HS256'] });
      if (typeof payload !== 'object' || payload === null) return { status: 'invalid' };
      if (typeof payload.aud !== 'string' || payload.aud.trim().length === 0) return { status: 'invalid' };
      if (typeof payload.sub !== 'string' || payload.sub.trim().length === 0) return { status: 'invalid' };
      if (typeof payload.exp !== 'number' || !Number.isFinite(payload.exp)) return { status: 'invalid' };
      if (typeof payload.iat !== 'number' || !Number.isFinite(payload.iat)) return { status: 'invalid' };

      return {
        status: 'valid',
        claims: {
          aud: payload.aud,
          sub: payload.sub,
          exp: payload.exp,
          iat: payload.iat,
        },
      };
    } catch {
      return { status: 'invalid' };
    }
  }
}
