import { NextApiRequest, NextApiResponse } from 'next';
import {
  isSessionTokenNotExpired,
  safeLeap,
  savedLeapByIds,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = req.cookies.session;

  const isValid = await isSessionTokenNotExpired(session);

  if (!isValid) {
    return res.status(401).send({
      errors: [{ message: 'no valid token' }],
      user: null,
    });
  }
  const leapIsAlreadySaved = await savedLeapByIds(
    req.body.user_id,
    req.body.leap_id,
  );

  if (leapIsAlreadySaved.length !== 0) {
    return res.status(401).send({
      errors: [{ message: 'leap already saved' }],
      user: null,
    });
  }
  if (req.method === 'POST') {
    const safedLeap = await safeLeap(req.body.user_id, req.body.leap_id);

    res.json(safedLeap);
  }
}
