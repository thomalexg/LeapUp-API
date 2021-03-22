import { NextApiRequest, NextApiResponse } from 'next';
import { getCategories } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const session = req.cookies.session;
  // // console.log(req.cookies);
  // // console.log('token in leaps', session);
  // const isValid = await isSessionTokenNotExpired(session);
  // // console.log('isValid in leaps', isValid);

  // if (!isValid) {
  //   return res.status(401).send({
  //     errors: [{ message: 'no valid token' }],
  //     user: null,
  //   });
  // }

  if (req.method === 'GET') {
    // console.log('request:', req);
    const getAllCategories = await getCategories();
    const categories = JSON.stringify(getAllCategories);
    res.json(categories);
  }
}
