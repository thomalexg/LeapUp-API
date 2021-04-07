import { NextApiRequest, NextApiResponse } from 'next';
import { getCategories } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {


  if (req.method === 'GET') {
    const getAllCategories = await getCategories();
    const categories = JSON.stringify(getAllCategories);
    res.json(categories);
  }
}
