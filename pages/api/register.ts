import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import {
  createTokenWhenRegister,
  createUser,
  deleteAllExpiredSessions,
  getSessionByToken,
} from '../../util/database';
import { createSessionWithCookie } from '../../util/session';
// import { doesCsrfTokenMatchSessionToken, hashPassword } from '../../util/auth';
// import { createUser, getUserByUsername } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password, email } = req.body;

  // console.log(email);
  // console.log(username);
  // console.log(password);
  // console.log(sessionToken);
  await deleteAllExpiredSessions();

  const passwordHash = await hashPassword(password);

  const user = await createUser(username, email, passwordHash);

  // const userAlreadyExists =
  //   typeof (await getUserByUsername(username)) !== 'undefined';

  // if (userAlreadyExists) {
  //   return res.status(409).send({
  //     errors: [{ message: 'User already exists with username' }],
  //     user: null,
  //   });
  // }
  // const generatedToken = generateToken();
  const token = await createTokenWhenRegister(user.id);
  let session = await getSessionByToken(req.cookies.session);
  console.log('Session', session);
  // const passwordHash = await hashPassword(password);

  if (!session) {
    const result = await createSessionWithCookie(token);
    session = result.session;
    res.setHeader('Set-Cookie', result.sessionCookie);
  }
  // const user = await createUser(username, passwordHash);
  console.log(user);
  res.send({ user: user });
}
