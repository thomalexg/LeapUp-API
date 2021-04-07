import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../util/auth';
import {
  createTokenWhenRegister,
  createUser,
  deleteAllExpiredSessions,
  getSessionByToken
} from '../../util/database';
import { createSessionWithCookie } from '../../util/session';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username, password, email } = req.body;


  await deleteAllExpiredSessions();

  const passwordHash = await hashPassword(password);

  const user = await createUser(username, email, passwordHash);


  const token = await createTokenWhenRegister(user.id);
  let session = await getSessionByToken(req.cookies.session);


  if (!session) {
    const result = await createSessionWithCookie(token);
    session = result.session;
    res.setHeader('Set-Cookie', result.sessionCookie);
  }

  res.send({ user: user });
}
