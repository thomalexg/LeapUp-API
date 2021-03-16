import { NextApiRequest, NextApiResponse } from 'next';
import { addLeap, getLeaps } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const rawLeaps = await getLeaps();
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
