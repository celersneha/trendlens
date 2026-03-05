import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const isProduction = process.env.NODE_ENV === "production";
let cachedExecutablePath: string | null = null;

export async function launchBrowser() {
  if (isProduction) {
    // Production: Use @sparticuz/chromium-min with caching
    try {
      // Use cached path if available
      if (!cachedExecutablePath) {
        console.log("Downloading Chromium for production...");
        cachedExecutablePath = await chromium.executablePath(
          `https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar`,
        );
        console.log("Chromium downloaded successfully:", cachedExecutablePath);
      }

      return puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: cachedExecutablePath,
        headless: chromium.headless,
        timeout: 60000, // 60 second timeout for browser launch
      });
    } catch (error) {
      console.error("Failed to launch browser in production:", error);
      throw new Error(`Browser launch failed: ${error}`);
    }
  } else {
    // Local: Use local Chrome/Chromium
    const localExecutablePath =
      process.platform === "win32"
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" // Windows Chrome
        : process.platform === "darwin"
          ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" // macOS Chrome
          : "/usr/bin/google-chrome"; // Linux Chrome

    try {
      return puppeteer.launch({
        executablePath: localExecutablePath,
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        timeout: 30000, // 30 second timeout for local
      });
    } catch (error) {
      console.error("Failed to launch local browser:", error);
      throw new Error(`Browser launch failed: ${error}`);
    }
  }
}
