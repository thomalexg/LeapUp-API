import crypto from 'crypto';
import { serializeSecureCookieServerSide } from './cookies';

export function generateToken() {
  return crypto.randomBytes(24).toString('base64');
}

export async function createSessionWithCookie(token) {
  return {
    session: token,
    sessionCookie: serializeSecureCookieServerSide(
      'session',
      token.token,
      60 * 60 * 24 * 30,
    ),
  };
}
