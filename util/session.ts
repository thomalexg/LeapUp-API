import crypto from 'crypto';

export function generateToken() {
  return crypto.randomBytes(24).toString('base64');
}

// export async function createSessionWithCookie() {
//   const session = await createSessionWithFiveMinuteExpiry();
//   return {
//     session: session,
//     sessionCookie: serializeSecureCookieServerSide(
//       'session',
//       session.token,
//       60 * 5,
//     ),
//   };
// }
