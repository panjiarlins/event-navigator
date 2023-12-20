import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    try {
      const userEmail: string = req.body.email;

      if (!userEmail || !userEmail.includes('@')) {
        res.status(422).json({ message: 'Invalid email address' });
        return;
      }

      const client = await MongoClient.connect(
        process.env.MONGODB_URI as string
      );
      const db = client.db('newsletter');
      await db.collection('newsletter').insertOne({ email: userEmail });
      await client.close();

      console.log(userEmail);
      res.status(201).json({ message: 'Signed up!' });
    } catch (error) {
      res.status(500).json({ message: JSON.stringify(error) });
    }
  }
}

export default handler;
