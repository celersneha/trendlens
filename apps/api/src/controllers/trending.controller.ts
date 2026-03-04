import { Request, Response } from "express";
import { scrapeGithubTrending } from "@repo/scraper/github";
import { scrapeDevToTrending } from "@repo/scraper/devto";

export async function getGithubTrending(req: Request, res: Response) {
  try {
    console.log("Scraping GitHub trending repositories...");
    const repos = await scrapeGithubTrending();

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

export async function triggerGithubJob(req: Request, res: Response) {
  try {
    console.log("Manually triggering GitHub scraping...");
    const repos = await scrapeGithubTrending();

    res.json({
      success: true,
      scraped: repos.length,
      data: repos,
    });
  } catch (error) {
    console.error("Error triggering GitHub job:", error);
    res.status(500).json({
      success: false,
      error: "Failed to trigger scraping job",
    });
  }
}

export async function getDevToTrending(req: Request, res: Response) {
  try {
    console.log("Scraping Dev.to trending articles...");
    const articles = await scrapeDevToTrending();

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

export async function triggerDevToJob(req: Request, res: Response) {
  try {
    console.log("Manually triggering Dev.to scraping...");
    const articles = await scrapeDevToTrending();

    res.json({
      success: true,
      scraped: articles.length,
      data: articles,
    });
  } catch (error) {
    console.error("Error triggering Dev.to job:", error);
    res.status(500).json({
      success: false,
      error: "Failed to trigger scraping job",
    });
  }
}
