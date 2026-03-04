import puppeteer from "puppeteer";
import { parseDevToTrending } from "./parseTrending.js";

export async function scrapeDevToTrending() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  const page = await browser.newPage();

  // Set realistic user agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );

  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  try {
    await page.goto("https://dev.to/top/day", {
      waitUntil: "networkidle2",
      timeout: 30000,
    });

    // Wait for articles to load
    await page.waitForSelector("a.crayons-link.crayons-link--contentful", {
      timeout: 10000,
    });

    const articles = await parseDevToTrending(page);

    await browser.close();

    return articles;
  } catch (error) {
    await browser.close();
    throw error;
  }
}
