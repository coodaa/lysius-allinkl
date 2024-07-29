// pages/api/plays.js
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const plays = await prisma.play.findMany();
      res.status(200).json(plays);
    } catch (error) {
      res.status(500).json({ error: "Database query error" });
    }
  } else if (req.method === "POST") {
    const { title, description, imageUrl, videoUrl } = req.body;
    try {
      const newPlay = await prisma.play.create({
        data: {
          title,
          description,
          imageUrl,
          videoUrl,
        },
      });
      res.status(201).json(newPlay);
    } catch (error) {
      res.status(500).json({ error: "Database insertion error" });
    }
  }
}
