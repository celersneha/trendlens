import { launchBrowser } from "../browser/chromium";
import { parseGithubTrending } from "./parseTrending";

export async function scrapeGithubTrending() {
  const browser = await launchBrowser();

  const page = await browser.newPage();

  // Set a realistic user agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );

  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    await page.goto("https://github.com/trending", {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });

    // Wait for articles to load
    await page.waitForSelector("article.Box-row", { timeout: 15000 });

    const repos = await parseGithubTrending(page);

    await browser.close();

    return repos;
  } catch (error) {
    await browser.close();
    throw error;
  }
}
