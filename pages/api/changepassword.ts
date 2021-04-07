import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import { serializeEmptyCookieServerSide } from '../../util/cookies';
import {
  changePasswordByUserId,
  deleteAllExpiredSessions,
  deleteLeap,
  deleteSessionByToken,
  isSessionTokenNotExpired
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { password, user_id } = req.body;
  const session = req.cookies.session;
  await deleteAllExpiredSessions();

  const isValid = await isSessionTokenNotExpired(session);


  if (!isValid) {
    return res.status(401).send({
      errors: [{ message: 'no valid token' }],
      user: null,
    });
  }

  const passwordHash = await hashPassword(password);


  await changePasswordByUserId(user_id, passwordHash, session);
  const changedPassword = await deleteLeap(
    req.body.leap_id,
    session,
    // req.body.location,
  );

  await deleteSessionByToken(session);
  const emptyCookie = serializeEmptyCookieServerSide('session');
  res.setHeader('Set-Cookie', emptyCookie);
  res.json(changedPassword);
}
