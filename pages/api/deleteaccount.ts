import { NextApiRequest, NextApiResponse } from 'next';
import { doesPasswordMatchPasswordHash } from '../../util/auth';
import { serializeEmptyCookieServerSide } from '../../util/cookies';
import {
  deleteAccount,
  deleteAllExpiredSessions,
  deleteSessionByToken,
  getUserWithHashedPasswordByUsername,
  isSessionTokenNotExpired,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { password, user_id, username } = req.body;
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
  const user = await getUserWithHashedPasswordByUsername(username);
  console.log('user', user);

  if (!user) {
    return res.status(401).send({
      errors: [{ message: 'Username or password does not match' }],
      user: null,
    });
  }
  const passwordMatches = await doesPasswordMatchPasswordHash(
    password,
    user.passwordHash,
  );
  if (!passwordMatches) {
    return res.status(401).send({
      errors: [{ message: 'Username or password does not match' }],
      user: null,
    });
  }
  // await deleteSessionById(user_id);
  const result = await deleteAccount(user_id, session);

  await deleteSessionByToken(session);
  const emptyCookie = serializeEmptyCookieServerSide('session');
  res.setHeader('Set-Cookie', emptyCookie);
  res.json(result);
}
