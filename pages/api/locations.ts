import { NextApiRequest, NextApiResponse } from 'next';
import { getLocations } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    // console.log('still running get method');
    const rawLocations = await getLocations();
    // console.log('rawLeaps', rawLeaps);
    const locations = JSON.stringify(rawLocations);
    console.log('locations', locations);
    res.json(locations);
  }

  // if (req.method === 'POST') {
  //   // console.log('request:', req);
  //   const addedLeap = await addLeap(
  //     req.body.title,
  //     req.body.description,
  //     req.body.category_id,
  //     req.body.user_id,
  //     req.body.username,
  //     // req.body.location,
  //   );
  //   res.json(addedLeap);
  // }
}
