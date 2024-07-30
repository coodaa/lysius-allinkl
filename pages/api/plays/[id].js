import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const play = await prisma.play.findUnique({
      where: { id: parseInt(id) },
      include: {
        images: true,
      },
    });

    if (!play) {
      return res.status(404).json({ error: "Play not found" });
    }

    res.status(200).json(play);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching play" });
  }
}
