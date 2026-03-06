import { Request, Response } from "express";
import { scrapeGithubTrending } from "../scraper";
import { prisma } from "../lib/db";
import { getOrScrapeAndStore } from "../utils/dbUtils";

export async function getGithubTrending(req: Request, res: Response) {
  try {
    const repos = await getOrScrapeAndStore(
      prisma.githubRepository,
      scrapeGithubTrending,
    );
    res.json({
      success: true,
      count: repos.length,
      data: repos,
    });
  } catch (error) {
    console.error("Error fetching GitHub trending:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trending repositories",
    });
  }
}
