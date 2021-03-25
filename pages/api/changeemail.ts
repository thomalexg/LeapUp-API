import { NextApiRequest, NextApiResponse } from 'next';
import { serializeEmptyCookieServerSide } from '../../util/cookies';
import {
  changeEmailByUserId,
  deleteAllExpiredSessions,
  deleteLeap,
  deleteSessionByToken,
  isSessionTokenNotExpired,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, user_id } = req.body;
  const session = req.cookies.session;
  await deleteAllExpiredSessions();
  console.log('userid', user_id);
  console.log('email', email);
  const isValid = await isSessionTokenNotExpired(session);
  // console.log('isValid in leaps', isValid);

  if (!isValid) {
    return res.status(401).send({
      errors: [{ message: 'no valid token' }],
      user: null,
    });
  }

  await changeEmailByUserId(user_id, email, session);
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
