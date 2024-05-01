// pages/api/income/index.ts

import {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {id} = req.query

  if (req.method === 'GET') {
    try {
      const incomes = await prisma.income.findMany({
        where: {
          user_id: String(id),
        }
      });
      res.status(200).json({status: 'success', data: incomes});
    } catch (error) {
      res.status(500).json({status: 'failed', data: error});
    }
  } else if (req.method === 'POST') {
    const {amount, note, date, category_id} = req.body;
    try {
      const income = await prisma.income.create({
        data: {
          amount: amount,
          note: note,
          date: new Date(date),
          user_id: String(id),
          category_id: category_id,
        },
      });
      res.status(201).json({status: 'success', data: income});
    } catch (error) {
      res.status(500).json({status: 'failed', data: error});
    }
  } else {
    res.status(405).json({error: 'Method Not Allowed'});
  }
}
