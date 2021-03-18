import { NextApiRequest, NextApiResponse } from 'next';
import {
  addLeap,
  getLeaps,
  isSessionTokenNotExpired,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = req.cookies.session;
  console.log(req.cookies);
  console.log('token in leaps', session);
  const isValid = await isSessionTokenNotExpired(session);
  console.log('isValid in leaps', isValid);

  if (!isValid) {
    return res.status(401).send({
      errors: [{ message: 'no valid token' }],
      user: null,
    });
  }

  if (req.method === 'GET') {
    console.log('still running get method');
    const rawLeaps = await getLeaps(session);
    console.log('rawLeaps', rawLeaps);
    const leaps = JSON.stringify(rawLeaps);
    res.json(leaps);
  }

  if (req.method === 'POST') {
    console.log('request:', req);
    const addedLeap = await addLeap(
      req.body.title,
      req.body.description,
      req.body.category_id,
      // req.body.user_id,
      // req.body.location,
    );
    res.json(addedLeap);
  }
}
