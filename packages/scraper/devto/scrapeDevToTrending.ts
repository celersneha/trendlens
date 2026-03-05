import { launchBrowser } from "../browser/chromium.js";
import { parseDevToTrending } from "./parseTrending.js";

export async function scrapeDevToTrending() {
  let browser: any = null;
  let page: any = null;

  try {
    browser = await launchBrowser();
    page = await browser.newPage();

    // Set realistic user agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    );

    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto("https://dev.to/top/day", {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    // Wait for articles to load - retry logic
    try {
      await page.waitForSelector("a.crayons-link.crayons-link--contentful", {
        timeout: 15000,
      });
    } catch (e) {
      // Fallback selector if main one fails
      console.log("Main selector failed, trying fallback...");
      await page.waitForSelector("article", { timeout: 10000 });
    }

    const articles = await parseDevToTrending(page);
    return articles;
  } catch (error) {
    console.error("Error scraping Dev.to trending:", error);
    throw error;
  } finally {
    // Ensure proper cleanup
    try {
      if (page) await page.close().catch(() => {});
      if (browser) await browser.close().catch(() => {});
    } catch (cleanupError) {
      console.error("Error during cleanup:", cleanupError);
    }
  }
}
