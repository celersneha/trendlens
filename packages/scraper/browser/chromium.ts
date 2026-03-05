import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const isProduction = process.env.NODE_ENV === "production";

export async function launchBrowser() {
  if (isProduction) {
    // Production: Use @sparticuz/chromium-min
    const executablePath = await chromium.executablePath(
      `https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar`,
    );

    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });
  } else {
    // Local: Use local Chrome/Chromium
    // You can use Chrome, Chromium, or MS Edge depending on your system
    const localExecutablePath =
      process.platform === "win32"
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" // Windows Chrome
        : process.platform === "darwin"
          ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" // macOS Chrome
          : "/usr/bin/google-chrome"; // Linux Chrome

    return puppeteer.launch({
      executablePath: localExecutablePath,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }
}
