// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { config } from '@/globals/config';
import { TOKEN_COOKIE } from '@/globals/constants';
import { getIronSession, type IronSession } from 'iron-session';
import { cookies } from 'next/headers';

export interface SessionData {
  merchantId?: string;
  authorizedAppId?: string;
  oauthBrowserBinding?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const session = await getIronSession(await cookies(), { password: config.cookiePassword || '', cookieName: TOKEN_COOKIE || '' });
  return session;
}
