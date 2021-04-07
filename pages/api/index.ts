import { NextApiRequest, NextApiResponse } from 'next';
// import { createTeamMember, getTeamMembers } from '../../util/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.json('Hello');

  // if (req.method === 'POST') {
  //   const teamMember = await createTeamMember(
  //     req.body.firstName,
  //     req.body.lastName,
  //   );
  //   res.json(teamMember);
  // }
}
