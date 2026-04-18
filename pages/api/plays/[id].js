import prisma from "../../../lib/prisma";
import { withMiddleware } from "../../../lib/apiMiddleware";

async function handler(req, res) {
  const { id } = req.query;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const play = await prisma.play.findUnique({
      where: { id: numericId },
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

export default withMiddleware(handler);
