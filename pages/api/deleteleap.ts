import { NextApiRequest, NextApiResponse } from 'next';
import { deleteLeap, isSessionTokenNotExpired } from '../../util/database';

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
    console.log('request to delete leap:', req.body.leap_id);
    const deletedLeap = await deleteLeap(
      req.body.leap_id,
      session,
      // req.body.location,
    );
    res.json(deletedLeap);
  }
}
