import { NextApiRequest, NextApiResponse } from 'next';
import {
  getFilteredLeaps,
  isSessionTokenNotExpired,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = req.cookies.session;
  // console.log(req.cookies);
  // console.log('token in leaps', session);
  const isValid = await isSessionTokenNotExpired(session);
  // console.log('isValid in leaps', isValid);

  if (!isValid) {
    return res.status(401).send({
      errors: [{ message: 'no valid token' }],
      user: null,
    });
  }

  if (req.method === 'POST') {
    // console.log('still running get method of myleaps');
    // console.log('body', req.body);
    const rawLeaps = await getFilteredLeaps(
      session,
      req.body.category_id,
      req.body.location_id,
      req.body.lastLoadedLeapId,
    );
    console.log('request', req.body.location_id);
    const leaps = JSON.stringify(rawLeaps);
    // console.log('favorite leaps:', leaps);
    res.json(leaps);
  }
}
