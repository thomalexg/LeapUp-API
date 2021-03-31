import { NextApiRequest, NextApiResponse } from 'next';
import { doesPasswordMatchPasswordHash } from '../../util/auth';
import {
  createTokenWhenRegister,
  deleteAllExpiredSessions,
  deleteSessionByUserId,
  getSessionByToken,
  getUserWithHashedPasswordByUsername,
} from '../../util/database';
import { createSessionWithCookie } from '../../util/session';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password } = req.body;

  console.log('username', username);
  console.log('password', password);

  const user = await getUserWithHashedPasswordByUsername(username);
  console.log('user', user);

  if (!user) {
    return res.status(401).send({
      errors: [{ message: 'Username or password does not match' }],
      user: null,
    });
  }
  // const passwordHash = await hashPassword(password);

  await deleteSessionByUserId(user.id);
  await deleteAllExpiredSessions();
  const passwordMatches = await doesPasswordMatchPasswordHash(
    password,
    user.passwordHash,
  );
  console.log('passswordMatches', passwordMatches);
  // Error out if the password does not match the hash
  if (!passwordMatches) {
    return res.status(401).send({
      errors: [{ message: 'Username or password does not match' }],
      user: null,
    });
  }
  // const generatedToken = generateToken();
  const token = await createTokenWhenRegister(user.id);
  let session = await getSessionByToken(req.cookies.session);
  console.log('Session', session);

  if (!session) {
    const result = await createSessionWithCookie(token);
    session = result.session;
    res.setHeader('Set-Cookie', result.sessionCookie);
    console.log('should be an not empty cookie', result.sessionCookie);
  }
  res.send({
    user: { username: user.username, email: user.email, id: user.id },
  });
}
