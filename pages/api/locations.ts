import { NextApiRequest, NextApiResponse } from 'next';
import { getLocations } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const rawLocations = await getLocations();

    const locations = JSON.stringify(rawLocations);

    res.json(locations);
  }
}
