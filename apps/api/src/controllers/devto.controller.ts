import { Request, Response } from "express";
import { scrapeDevToTrending } from "../scraper/index.js";
import { prisma } from "../lib/db.js";
import { getOrScrapeAndStore } from "../utils/dbUtils.js";

export async function getDevToTrending(req: Request, res: Response) {
  try {
    const articles = await getOrScrapeAndStore(
      prisma.devToArticle,
      scrapeDevToTrending,
    );
    res.json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    console.error("Error fetching Dev.to trending:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trending articles",
    });
  }
}
