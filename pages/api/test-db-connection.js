import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log("Test DB connection handler called"); // Debugging-Ausgabe

  try {
    console.log("Attempting to execute test query...");
    // Versuchen, eine einfache Abfrage auszuführen, um die Datenbankverbindung zu überprüfen
    const result = await prisma.$queryRaw`SELECT 1 + 1 AS result`;
    console.log("Database connection successful:", result);
    res.status(200).json({ message: "Database connection successful", result });
  } catch (error) {
    console.error("Database connection failed:", error);
    res
      .status(500)
      .json({
        message: "Database connection failed",
        error: error.message,
        stack: error.stack,
      });
  }
}
