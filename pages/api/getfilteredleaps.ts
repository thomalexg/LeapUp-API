import { NextApiRequest, NextApiResponse } from 'next';
import {
  getFilteredLeaps,
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

    const rawLeaps = await getFilteredLeaps(
      session,
      req.body.category_id,
      req.body.location_id,
      req.body.lastLoadedLeapId,
    );

    const leaps = JSON.stringify(rawLeaps);

    res.json(leaps);
  }
}
