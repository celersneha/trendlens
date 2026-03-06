import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import { scrapeHackerNewsTrending } from "../scraper/index.js";
import { getOrScrapeAndStore } from "../utils/dbUtils.js";

/**
 * GET /api/trending/hackernews
 * Returns Hacker News trending stories
 * If database is empty, fetches and seeds the data
 * Otherwise returns cached data from database
 */
export async function getHackerNewsTrending(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const stories = await getOrScrapeAndStore(
      prisma.hackerNewsStory,
      scrapeHackerNewsTrending,
    );

    res.status(200).json({
      success: true,
      data: stories,
      count: stories.length,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error fetching Hacker News trending:", errorMessage);

    res.status(500).json({
      success: false,
      message: "Failed to fetch Hacker News trending",
      error: errorMessage,
    });
  }
}

/**
 * GET /api/trending/hackernews/refresh
 * Force refresh Hacker News data from API
 */
export async function refreshHackerNewsTrending(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    // Clear existing data
    await prisma.hackerNewsStory.deleteMany({});
    console.log("Cleared Hacker News stories from database");

    // Fetch fresh data
    const stories = await scrapeHackerNewsTrending();

    // Store in database
    if (stories.length > 0) {
      await prisma.hackerNewsStory.createMany({ data: stories });
      console.log(`Stored ${stories.length} Hacker News stories`);
    }

    res.status(200).json({
      success: true,
      message: "Hacker News data refreshed successfully",
      data: stories,
      count: stories.length,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error refreshing Hacker News trending:", errorMessage);

    res.status(500).json({
      success: false,
      message: "Failed to refresh Hacker News trending",
      error: errorMessage,
    });
  }
}
