import { NextApiRequest, NextApiResponse } from 'next';
import { serializeEmptyCookieServerSide } from '../../util/cookies';
import { deleteSessionByToken } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.cookies.session;

  await deleteSessionByToken(token);

  const emptyCookie = serializeEmptyCookieServerSide('session');
  res.setHeader('Set-Cookie', emptyCookie);
  res.send('Nothing');
}
