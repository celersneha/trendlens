import puppeteer from "puppeteer";
import fs from "fs";

export async function fetchDevToHtml() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.goto("https://dev.to/top/day", {
    waitUntil: "networkidle2",
  });

  const html = await page.content();

  fs.writeFileSync(__dirname + "/devtoTrending.html", html);

  await browser.close();
}
