import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
  comment?: CommentType;
  comments?: Omit<CommentType, 'email'>[];
};

export type CommentType = {
  id?: string;
  email: string;
  name: string;
  text: string;
};

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const eventId: string = req.query.eventId;

  if (req.method === 'POST') {
    const { email, name, text }: CommentType = req.body;

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

    console.log(req.body);
    const newComment = { id: new Date().toISOString(), email, name, text };

    res.status(201).json({ message: 'Added comment', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList: Omit<CommentType, 'email'>[] = [
      { id: 'c1', name: 'User1', text: 'Okay' },
      { id: 'c2', name: 'User2', text: 'Test' },
    ];

    res.status(200).json({ message: 'success', comments: dummyList });
  }
}

export default handler;
