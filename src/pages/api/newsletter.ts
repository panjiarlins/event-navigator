import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const userEmail: string = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
