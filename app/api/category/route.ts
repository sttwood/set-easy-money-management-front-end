import {NextApiRequest, NextApiResponse} from 'next';
import {PrismaClient} from '@prisma/client';
import {NextRequest} from 'next/server';

const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const {name, type, user_id} = req.body
//   console.log(req)
//   if (req.method === 'GET') {
//     try {
//       const categories = await prisma.category.findMany({
//         where: {
//           user_id: String(user_id),
//         }
//       });
//       res.status(200).json({status: 'success', data: categories});
//     } catch (error) {
//       res.status(500).json({status: 'failed', data: error});
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const category = await prisma.category.create({
//         data: {
//           name: name,
//           type: type,
//           user_id: String(user_id)
//         },
//       });
//       res.status(201).json({status: 'success', data: category});
//     } catch (error) {
//       res.status(500).json({status: 'failed', data: error});
//     }
//   } else {
//     res.status(405).json({error: 'Method Not Allowed'});
//   }
// }

export async function GET() {
  try {
    const categories = await prisma.category.findMany()
    return new Response(JSON.stringify({status: 'success', data: categories}), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error creating category:', error);
    return new Response('Server Error, Get Category');
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {name, type, user_id} = body

  try {
    const category = await prisma.category.create({
      data: {
        name,
        type,
        user_id
      },
    });
    return new Response(JSON.stringify({status: 'success', data: category}), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error creating category:', error);
    return new Response('Server Error, POST Category');
  }
}