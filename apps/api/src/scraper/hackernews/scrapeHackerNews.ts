import { HackerNewsStory } from "@prisma/client";

const HN_TOP_STORIES_URL =
  "https://hacker-news.firebaseio.com/v0/topstories.json";
const HN_ITEM_URL = "https://hacker-news.firebaseio.com/v0/item";
const LIMIT = 15; // Limit to top 15 stories

/**
 * Type definition for raw Hacker News API response
 */
interface HNRawStory {
  by?: string;
  descendants?: number;
  id: number;
  kids?: number[];
  score?: number;
  time?: number;
  title?: string;
  type: string;
  url?: string;
}

/**
 * Fetch story IDs from Hacker News top stories endpoint
 */
async function fetchTopStoryIds(): Promise<number[]> {
  try {
    console.log("Fetching top story IDs from Hacker News...");
    const response = await fetch(HN_TOP_STORIES_URL);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch top stories: ${response.status} ${response.statusText}`,
      );
    }

    const ids = (await response.json()) as number[];
    console.log(`Fetched ${ids.length} story IDs, limiting to ${LIMIT}`);

    return ids.slice(0, LIMIT);
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error fetching top story IDs:", errorMsg);
    throw new Error(`Failed to fetch Hacker News top stories: ${errorMsg}`);
  }
}

/**
 * Fetch individual story details
 */
async function fetchStoryDetails(id: number): Promise<HackerNewsStory | null> {
  try {
    const response = await fetch(`${HN_ITEM_URL}/${id}.json`);

    if (!response.ok) {
      console.warn(`Failed to fetch story ${id}: ${response.status}`);
      return null;
    }

    const story = (await response.json()) as HNRawStory;

    // Filter out non-story types and missing required fields
    if (
      story.type !== "story" ||
      !story.title ||
      !story.by ||
      story.score === undefined
    ) {
      return null;
    }

    return {
      id: story.id,
      title: story.title,
      url: story.url || null,
      by: story.by,
      score: story.score,
      time: story.time || 0,
      descendants: story.descendants || 0,
      type: story.type,
    };
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.warn(`Error fetching story ${id}:`, errorMsg);
    return null;
  }
}

/**
 * Main scraper function - fetches top stories and their details
 */
export async function scrapeHackerNewsTrending(): Promise<HackerNewsStory[]> {
  try {
    console.log("=== Starting Hacker News Scraper ===");
    const startTime = new Date();

    // Step 1: Get top story IDs
    const storyIds = await fetchTopStoryIds();
    console.log(`Retrieved ${storyIds.length} story IDs`);

    // Step 2: Fetch details for each story with rate limiting
    const stories: (HackerNewsStory | null)[] = [];

    for (let i = 0; i < storyIds.length; i++) {
      const id = storyIds[i];
      const story = await fetchStoryDetails(id);

      if (story) {
        stories.push(story);
      }

      // Rate limiting: 1 request per 100ms to avoid overwhelming API
      if (i < storyIds.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    // Filter out nulls and sort by score (descending)
    const filteredStories = stories.filter(
      (story) => story !== null,
    ) as HackerNewsStory[];
    const sortedStories = filteredStories.sort((a, b) => b.score - a.score);

    const endTime = new Date();
    const duration = Math.round(
      (endTime.getTime() - startTime.getTime()) / 1000,
    );

    console.log(
      `Successfully scraped ${sortedStories.length} stories in ${duration}s`,
    );
    console.log("=== Hacker News Scraper Complete ===\n");

    return sortedStories;
  } catch (error) {
    const errorMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Hacker News scraper failed:", errorMsg);
    throw error;
  }
}
