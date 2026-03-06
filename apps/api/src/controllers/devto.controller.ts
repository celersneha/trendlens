import { Request, Response } from "express";
import { scrapeDevToTrending } from "../scraper";
import { prisma } from "../lib/db";
import { getOrScrapeAndStore } from "../utils/dbUtils";

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
