import puppeteer, { Browser } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const isProduction = process.env.NODE_ENV === "production";
let cachedExecutablePath: string | null = null;
let browserInstance: Browser | null = null;
let isLaunching = false;
let launchPromise: Promise<Browser> | null = null;

// Helper function to wait
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function launchBrowser(): Promise<Browser> {
  // If browser already exists and is connected, return it
  if (browserInstance && browserInstance.connected) {
    console.log("Reusing existing browser instance");
    return browserInstance;
  }

  // If browser is currently being launched, wait for that launch to complete
  if (isLaunching && launchPromise) {
    console.log("Waiting for ongoing browser launch...");
    return launchPromise;
  }

  // Start launching browser
  isLaunching = true;
  launchPromise = (async () => {
    try {
      if (isProduction) {
        // Production: Use @sparticuz/chromium-min with caching
        if (!cachedExecutablePath) {
          console.log("Downloading Chromium for production...");
          cachedExecutablePath = await chromium.executablePath(
            `https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar`,
          );
          console.log(
            "Chromium downloaded successfully:",
            cachedExecutablePath,
          );

          // Small delay to ensure file is ready
          await sleep(1000);
        }

        console.log("Launching browser in production...");
        browserInstance = await puppeteer.launch({
          args: [...chromium.args, "--single-process", "--no-zygote"],
          defaultViewport: chromium.defaultViewport,
          executablePath: cachedExecutablePath,
          headless: chromium.headless,
          timeout: 60000,
        });
      } else {
        // Local: Use local Chrome/Chromium
        const localExecutablePath =
          process.platform === "win32"
            ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "darwin"
              ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
              : "/usr/bin/google-chrome";

        console.log("Launching browser locally...");
        browserInstance = await puppeteer.launch({
          executablePath: localExecutablePath,
          headless: true,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          timeout: 30000,
        });
      }

      console.log("Browser launched successfully");
      return browserInstance;
    } catch (error) {
      console.error("Failed to launch browser:", error);
      browserInstance = null;
      throw new Error(`Browser launch failed: ${error}`);
    } finally {
      isLaunching = false;
      launchPromise = null;
    }
  })();

  return launchPromise;
}

export async function closeBrowser() {
  if (browserInstance) {
    console.log("Closing browser instance...");
    await browserInstance.close();
    browserInstance = null;
  }
}

// Cleanup on process exit
process.on("exit", () => {
  if (browserInstance) {
    browserInstance.close();
  }
});

process.on("SIGINT", async () => {
  await closeBrowser();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeBrowser();
  process.exit(0);
});
