import { NextApiRequest, NextApiResponse } from 'next';
import { doesPasswordMatchPasswordHash } from '../../util/auth';
import { serializeEmptyCookieServerSide } from '../../util/cookies';
import {
  deleteAccount,
  deleteAllExpiredSessions,
  deleteAllLeapsByUserId,
  deleteFavoriteLeapByLeapId,
  deleteSessionByToken,
  getAllLeapIdsByUserId,
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

  const isValid = await isSessionTokenNotExpired(session);

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
  console.log('passwordMatches', passwordMatches);
  if (!passwordMatches) {
    return res.status(401).send({
      errors: [{ message: 'Username or password does not match' }],
      user: null,
    });
  }
  console.log('user_id', user_id);
  const deleteSafed = async () => {
    const rawLeapIds = await getAllLeapIdsByUserId(user_id);
    console.log('rawLeapIds', rawLeapIds);
    const leapIds = await rawLeapIds.map((elem) => elem.id);
    console.log('leapIds', leapIds);
    leapIds.forEach(
      async (id) => await deleteFavoriteLeapByLeapId(id, session),
    );
  };
  await deleteSafed();

  await deleteAllLeapsByUserId(user_id);
  // await deleteAllSafedLeapsByUserId(user_id);

  const result = await deleteAccount(user_id, session);

  await deleteSessionByToken(session);
  const emptyCookie = serializeEmptyCookieServerSide('session');
  res.setHeader('Set-Cookie', emptyCookie);
  res.json(result);
}
