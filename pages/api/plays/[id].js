import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const play = await prisma.play.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(play);
  } catch (error) {
    console.error("Error fetching play:", error);
    res.status(500).json({ error: "Error fetching play" });
  }
}
