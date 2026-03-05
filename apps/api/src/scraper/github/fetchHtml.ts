import fs from "fs";
import { launchBrowser } from "../browser/chromium";

export async function fetchGithubHTML() {
  const browser = await launchBrowser();

  const page = await browser.newPage();

  await page.goto("https://github.com/trending", {
    waitUntil: "networkidle2",
  });

  const html = await page.content();

  fs.writeFileSync("githubTrending.html", html);

  await browser.close();
}
