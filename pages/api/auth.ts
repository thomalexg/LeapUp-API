import { NextApiRequest, NextApiResponse } from 'next';
import { isSessionTokenNotExpired } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { token } = req.cookies;

  const isValid = await isSessionTokenNotExpired(token);

  res.send({
    valid: isValid,
  });
}
