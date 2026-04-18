// pages/api/landingpageimg.js
import prisma from "../../lib/prisma";
import { withMiddleware } from "../../lib/apiMiddleware";

async function handler(req, res) {
  try {
    const images = await prisma.landingpageimg.findMany();
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images from database:", error);
    res.status(500).json({ error: "Error fetching images", details: error.message });
  }
}

export default withMiddleware(handler);
