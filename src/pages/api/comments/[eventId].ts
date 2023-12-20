import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  comment?: CommentType;
  comments?: CommentType[];
};

export type CommentType = {
  email: string;
  name: string;
  text: string;
  eventId: string;
  [key: string]: any;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const eventId = req.query.eventId as string;

    const client = await MongoClient.connect(process.env.MONGODB_URI as string);
    const db = client.db('events');

    if (req.method === 'POST') {
      const {
        email,
        name,
        text,
      }: Pick<CommentType, 'email' | 'name' | 'text'> = req.body;

      if (
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
      ) {
        res.status(422).json({ message: 'Invalid input' });
        return;
      }

      const newComment = { email, name, text, eventId } as CommentType;
      const result = await db.collection('comments').insertOne(newComment);

      res.status(201).json({ message: 'Added comment', comment: newComment });
    }

    if (req.method === 'GET') {
      const documents = await db
        .collection<CommentType>('comments')
        .find({ eventId })
        .sort({ _id: -1 })
        .toArray();

      res.status(200).json({ message: 'success', comments: documents });
    }

    await client.close();
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error) });
  }
}

export default handler;
