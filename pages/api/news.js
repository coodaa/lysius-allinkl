// pages/api/news.js

import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  try {
    // Abrufen der ersten Zeile aus der News-Tabelle
    const news = await prisma.News.findFirst();
    if (!news) {
      res.status(404).json({ error: "No news found" });
      return;
    }
    res.status(200).json(news);
  } catch (error) {
    console.error("Failed to fetch news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
