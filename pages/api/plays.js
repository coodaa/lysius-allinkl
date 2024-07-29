import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  console.log("API handler called"); // Debugging-Ausgabe
  try {
    console.log("Attempting to fetch plays from the database..."); // Debugging-Ausgabe
    const plays = await prisma.play.findMany();
    console.log("Plays fetched from database:", plays); // Debugging-Ausgabe
    res.status(200).json(plays);
  } catch (error) {
    console.error("Error fetching plays from database:", error); // Debugging-Ausgabe
    res.status(500).json({ error: "Error fetching plays" });
  }
}
