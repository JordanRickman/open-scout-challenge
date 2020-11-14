import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

import { UserClientData } from '../../../../model/user';

/** User information only visible on the server side. */
type User = {
  userId: string;
  onePagersRead: string[];
  paid: boolean;
};

const FREE_READ_LIMIT = 2;

// In production, this data would go in some persistent datastore.
// For this mocked data point, save locally - lost between server restarts.
const users: {
  [id: string]: User;
} = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.statusCode = 400;
    res.end('Bad Request');
    return;
  }

  const user: string = req.query.user;
  const onePagerUrl: string = req.query.onePagerUrl;

  let responseJson: UserDataClient;
  if (users[user] === undefined) {
    const newUser = {
      userId: uuidv4(),
      onePagersRead: [onePagerUrl],
      paid: false
    };
    users[newUser.userId] = newUser;
    console.log('New User Created: '); // DEBUG
    console.log(`${newUser.userId}\t${newUser.onePagersRead.join(',')}`); // DEBUG
    res.statusCode = 201;
    responseJson = {
      userId: newUser.userId,
      allowed: true
    }
  } else {
    const userData = users[user];
    const readCount = userData.onePagersRead.includes(onePagerUrl) ?
        userData.onePagersRead.length : userData.onePagersRead.length + 1;
    if (!userData.paid && readCount > FREE_READ_LIMIT) {
      res.statusCode = 200;
      responseJson = {
        userId: user,
        allowed: false
      }
    } else {
      if (!userData.onePagersRead.includes(onePagerUrl)) {
        userData.onePagersRead.push(onePagerUrl);
      }
      responseJson = {
        userId: user,
        allowed: true
      }
    }
    console.log(`${userData.userId}\t${userData.onePagersRead.join(',')}`); // DEBUG
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(responseJson));
}