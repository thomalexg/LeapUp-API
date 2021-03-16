import { NextApiRequest, NextApiResponse } from 'next';
import {
  createSessionWithFiveMinuteExpiry,
  deleteAllExpiredSessions,
} from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const deleteExpired = await deleteAllExpiredSessions();
    const session = await createSessionWithFiveMinuteExpiry();
    res.json(session);
  }
}
