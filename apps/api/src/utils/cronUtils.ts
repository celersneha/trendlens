import {
  scrapeDevToTrending,
  scrapeGithubTrending,
  scrapeHackerNewsTrending,
} from "../scraper/index.js";
import { prisma } from "../lib/db.js";

interface CronResult {
  success: boolean;
  message: string;
  details?: {
    clearedDevToArticles: number;
    clearedGithubRepositories: number;
    clearedHackerNewsStories: number;
    scrapedDevToArticles: number;
    scrapedGithubRepositories: number;
    scrapedHackerNewsStories: number;
  };
  error?: string;
  timestamp?: string;
}

/**
 * Clear all records from the database
 * Deletes all DevTo articles, GitHub repositories, and Hacker News stories
 */
async function clearDatabase(): Promise<{
  devToCount: number;
  githubCount: number;
  hackerNewsCount: number;
}> {
  console.log("Starting database cleanup...");

  const devToCount = await prisma.devToArticle.deleteMany({});
  console.log(`Deleted ${devToCount.count} Dev.to articles`);

  const githubCount = await prisma.githubRepository.deleteMany({});
  console.log(`Deleted ${githubCount.count} GitHub repositories`);

  const hackerNewsCount = await prisma.hackerNewsStory.deleteMany({});
  console.log(`Deleted ${hackerNewsCount.count} Hacker News stories`);

  return {
    devToCount: devToCount.count,
    githubCount: githubCount.count,
    hackerNewsCount: hackerNewsCount.count,
  };
}

/**
 * Scrape and seed the database with latest trending data
 */
async function seedDatabase(): Promise<{
  devToCount: number;
  githubCount: number;
  hackerNewsCount: number;
}> {
  console.log("Starting database seeding...");

  let devToCount = 0;
  let githubCount = 0;
  let hackerNewsCount = 0;

  try {
    // Scrape DevTo trending
    console.log("Scraping Dev.to trending articles...");
    const devToArticles = await scrapeDevToTrending();

    if (devToArticles && devToArticles.length > 0) {
      await prisma.devToArticle.createMany({
        data: devToArticles,
      });
      devToCount = devToArticles.length;
      console.log(`Successfully seeded ${devToCount} Dev.to articles`);
    } else {
      console.log("No Dev.to articles found");
    }
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error scraping Dev.to:", errorMsg);
    throw new Error(`Failed to scrape Dev.to trending: ${errorMsg}`);
  }

  try {
    // Scrape GitHub trending
    console.log("Scraping GitHub trending repositories...");
    const githubRepositories = await scrapeGithubTrending();

    if (githubRepositories && githubRepositories.length > 0) {
      await prisma.githubRepository.createMany({
        data: githubRepositories,
      });
      githubCount = githubRepositories.length;
      console.log(`Successfully seeded ${githubCount} GitHub repositories`);
    } else {
      console.log("No GitHub repositories found");
    }
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error scraping GitHub:", errorMsg);
    throw new Error(`Failed to scrape GitHub trending: ${errorMsg}`);
  }

  try {
    // Scrape Hacker News trending
    console.log("Scraping Hacker News trending stories...");
    const hackerNewsStories = await scrapeHackerNewsTrending();

    if (hackerNewsStories && hackerNewsStories.length > 0) {
      await prisma.hackerNewsStory.createMany({
        data: hackerNewsStories,
      });
      hackerNewsCount = hackerNewsStories.length;
      console.log(`Successfully seeded ${hackerNewsCount} Hacker News stories`);
    } else {
      console.log("No Hacker News stories found");
    }
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error scraping Hacker News:", errorMsg);
    throw new Error(`Failed to scrape Hacker News trending: ${errorMsg}`);
  }

  return {
    devToCount,
    githubCount,
    hackerNewsCount,
  };
}

/**
 * Main cron job executor
 * 1. Clears all existing data
 * 2. Scrapes and seeds the database with latest trending data
 */
export async function executeCronJob(): Promise<CronResult> {
  const startTime = new Date();
  console.log(`\n========== CRON JOB STARTED ==========`);
  console.log(`Timestamp: ${startTime.toISOString()}`);

  try {
    // Step 1: Clear the database
    const clearResult = await clearDatabase();
    console.log("Database cleanup completed");

    // Step 2: Seed the database with fresh data
    const seedResult = await seedDatabase();
    console.log("Database seeding completed");

    const endTime = new Date();
    const duration = Math.round(
      (endTime.getTime() - startTime.getTime()) / 1000,
    );

    console.log(`========== CRON JOB COMPLETED ==========`);
    console.log(`Duration: ${duration}s\n`);

    return {
      success: true,
      message: "Cron job executed successfully",
      details: {
        clearedDevToArticles: clearResult.devToCount,
        clearedGithubRepositories: clearResult.githubCount,
        clearedHackerNewsStories: clearResult.hackerNewsCount,
        scrapedDevToArticles: seedResult.devToCount,
        scrapedGithubRepositories: seedResult.githubCount,
        scrapedHackerNewsStories: seedResult.hackerNewsCount,
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error(`Cron job failed: ${errorMessage}`);
    console.log(`========== CRON JOB FAILED ==========\n`);

    return {
      success: false,
      message: "Cron job failed during execution",
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };
  }
}
