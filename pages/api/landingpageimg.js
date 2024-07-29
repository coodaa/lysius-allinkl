// pages/api/landingpageimg.js
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  console.log("API handler for landingpageimg called"); // Debugging-Ausgabe
  try {
    console.log("Attempting to fetch images from the database..."); // Debugging-Ausgabe
    const images = await prisma.landingpageimg.findMany();
    console.log("Images fetched from database:", images); // Debugging-Ausgabe
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images from database:", error); // Debugging-Ausgabe
    res
      .status(500)
      .json({ error: "Error fetching images", details: error.message });
  }
}
