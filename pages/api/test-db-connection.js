import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const result = await prisma.$queryRaw`SELECT 1 + 1 AS result`;
    console.log('Database connection successful:', result);
    res.status(200).json({ message: 'Database connection successful', result });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ message: 'Database connection failed', error });
  }
}

