import { NextApiRequest, NextApiResponse } from 'next';
import {
  getLeapsByUsername,
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
    const rawLeaps = await getLeapsByUsername(
      session,
      req.body.username,
      req.body.lastLoadedLeapId,
    );
    const leaps = JSON.stringify(rawLeaps);
    res.json(leaps);
  }
}
