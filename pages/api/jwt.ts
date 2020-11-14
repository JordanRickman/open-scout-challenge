import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken';
import fs from 'fs';

const privateKey = fs.readFileSync('secrets/private_unencrypted.pem');
const publicKey = fs.readFileSync('secrets/public.pem'); // DEBUG

export default function hander(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.statusCode = 400;
    res.end('Bad Request');
  }

  const token = jwt.sign(
    {
      sub: 'anonymous',
      paid: true
    },
    privateKey,
    {
      algorithm: 'RS256',
      expiresIn: '15d'
    }
  );
  // DEBUG
  jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
    console.log(err);
    console.log(decoded);
  })

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(token);
}