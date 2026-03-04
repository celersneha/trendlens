import puppeteer from "puppeteer";
import fs from "fs";

export async function fetchGithubHTML() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.goto("https://github.com/trending", {
    waitUntil: "networkidle2",
  });

  const html = await page.content();

  fs.writeFileSync("githubTrending.html", html);

  await browser.close();
}
