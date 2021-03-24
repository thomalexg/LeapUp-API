import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import { serializeEmptyCookieServerSide } from '../../util/cookies';
import {
  changePasswordByUserId,
  deleteAllExpiredSessions,
  deleteLeap,
  deleteSessionByToken,
  isSessionTokenNotExpired,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { password, user_id } = req.body;
  const session = req.cookies.session;
  await deleteAllExpiredSessions();
  console.log('userid', user_id);
  console.log('password', password);
  const isValid = await isSessionTokenNotExpired(session);
  // console.log('isValid in leaps', isValid);

  if (!isValid) {
    return res.status(401).send({
      errors: [{ message: 'no valid token' }],
      user: null,
    });
  }
  console.log('running');
  const passwordHash = await hashPassword(password);
  console.log('passwordHash', passwordHash);

  await changePasswordByUserId(user_id, passwordHash, session);
  const changedPassword = await deleteLeap(
    req.body.leap_id,
    session,
    // req.body.location,
  );
  console.log('User with changed password', changedPassword);
  await deleteSessionByToken(session);
  const emptyCookie = serializeEmptyCookieServerSide('session');
  res.setHeader('Set-Cookie', emptyCookie);
  res.json(changedPassword);
}
