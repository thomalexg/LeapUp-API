import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteFavoriteLeap,
  isSessionTokenNotExpired
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
    const deletedLeap = await deleteFavoriteLeap(
      req.body.leap_id,
      req.body.user_id,
      session,
    );
    res.json(deletedLeap);
  }
}
