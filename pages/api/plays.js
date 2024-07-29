// pages/api/plays.js
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    console.log("Fetching plays from the database..."); // Debugging-Ausgabe
    const plays = await prisma.play.findMany();
    console.log("Plays fetched from database:", plays); // Debugging-Ausgabe
    res.status(200).json(plays);
  } catch (error) {
    console.error("Error fetching plays:", error);
    res
      .status(500)
      .json({ error: "Error fetching plays", details: error.message });
  }
}
