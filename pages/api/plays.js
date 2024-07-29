import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  console.log("API handler called"); // Debugging-Ausgabe

  try {
    console.log("Attempting to fetch plays from the database...");
    const plays = await prisma.play.findMany();
    console.log("Plays fetched from database:", plays);
    res.status(200).json(plays);
  } catch (error) {
    console.error("Error fetching plays:", error);
    res
      .status(500)
      .json({ error: "Error fetching plays", details: error.message });
  }
}
