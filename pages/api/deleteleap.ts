import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteFavoriteLeapByLeapId,
  deleteLeap,
  isSessionTokenNotExpired,
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

  if (req.method === 'POST') {
    await deleteFavoriteLeapByLeapId(req.body.leap_id, session);
    const deletedLeap = await deleteLeap(req.body.leap_id, session);
    res.json(deletedLeap);
  }
}
