import { NextApiRequest, NextApiResponse } from 'next';
import { addLeap, isSessionTokenNotExpired } from '../../util/database';

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
    const addedLeap = await addLeap(
      req.body.title,
      req.body.location,
      req.body.description,
      req.body.category_id,
      req.body.user_id,
      req.body.username,
      req.body.email,
    );
    res.json(addedLeap);
  }
}
