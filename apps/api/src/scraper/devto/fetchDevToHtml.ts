import fs from "fs";
import { launchBrowser } from "../browser/chromium";

export async function fetchDevToHtml() {
  const browser = await launchBrowser();

  const page = await browser.newPage();

  await page.goto("https://dev.to/top/day", {
    waitUntil: "networkidle2",
  });

  const html = await page.content();

  fs.writeFileSync(__dirname + "/devtoTrending.html", html);

  await browser.close();
}
