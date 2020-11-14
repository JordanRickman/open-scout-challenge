import { NextApiRequest, NextApiResponse } from 'next';

import { getUsers, User } from '../../../data/userStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 400;
    res.end('Bad Request');
    return;
  }

  const user: string = req.query.user as string;
  const users = getUsers();
  if (users[user] !== undefined) {
    users[user].paid = true;
    res.statusCode = 205;
    res.end();
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
}