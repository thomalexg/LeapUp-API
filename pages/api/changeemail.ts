import { NextApiRequest, NextApiResponse } from 'next';
import { serializeEmptyCookieServerSide } from '../../util/cookies';
import {
  changeEmailByUserId,
  deleteAllExpiredSessions,
  deleteLeap,
  deleteSessionByToken,
  isSessionTokenNotExpired
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, user_id } = req.body;
  const session = req.cookies.session;
  await deleteAllExpiredSessions();
  const isValid = await isSessionTokenNotExpired(session);

  if (!isValid) {
    return res.status(401).send({
      errors: [{ message: 'no valid token' }],
      user: null,
    });
  }

  await changeEmailByUserId(user_id, email, session);
  const changedPassword = await deleteLeap(req.body.leap_id, session);
  await deleteSessionByToken(session);
  const emptyCookie = serializeEmptyCookieServerSide('session');
  res.setHeader('Set-Cookie', emptyCookie);
  res.json(changedPassword);
}
