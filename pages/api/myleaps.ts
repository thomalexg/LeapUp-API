import { NextApiRequest, NextApiResponse } from 'next';
import { getLeapsById, isSessionTokenNotExpired } from '../../util/database';

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
    const rawLeaps = await getLeapsById(
      session,
      req.body.user_id,
      req.body.lastLoadedLeapId,
    );

    const leaps = JSON.stringify(rawLeaps);
    console.log('leaps with count', leaps);
    res.json(leaps);
  }
}
