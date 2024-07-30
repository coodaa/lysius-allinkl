import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const play = await prisma.play.findUnique({
      where: { id: parseInt(id) },
    });

    if (!play) {
      return res.status(404).json({ error: "Play not found" });
    }

    res.status(200).json(play);
  } catch (error) {
    res.status(500).json({ error: "Error fetching play" });
  }
}
