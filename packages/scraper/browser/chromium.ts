import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

const isProduction = process.env.NODE_ENV === "production";
let cachedExecutablePath: string | null = null;
let launchQueue: Promise<any> = Promise.resolve();
let browserLaunchInProgress = false;

// Queue to prevent concurrent browser launches (which cause ETXTBSY)
async function queuedLaunchBrowser() {
  return new Promise((resolve, reject) => {
    launchQueue = launchQueue
      .then(() => {
        if (browserLaunchInProgress) {
          return new Promise((waitResolve) => {
            const checkInterval = setInterval(() => {
              if (!browserLaunchInProgress) {
                clearInterval(checkInterval);
                waitResolve(null);
              }
            }, 100);
          });
        }
        return null;
      })
      .then(() => launchBrowserInternal())
      .then(resolve)
      .catch(reject);
  });
}

async function launchBrowserInternal() {
  if (isProduction) {
    // Production: Use @sparticuz/chromium-min with caching
    try {
      browserLaunchInProgress = true;

      // Use cached path if available
      if (!cachedExecutablePath) {
        console.log("Downloading Chromium for production...");
        cachedExecutablePath = await chromium.executablePath(
          `https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar`,
        );
        console.log("Chromium downloaded successfully:", cachedExecutablePath);
      }

      const browser = await puppeteer.launch({
        args: [
          ...chromium.args,
          "--disable-dev-shm-usage", // Disable shared memory (critical for servers)
          "--disable-gpu",
          "--disable-extensions",
          "--no-first-run",
          "--no-default-browser-check",
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath: cachedExecutablePath,
        headless: chromium.headless,
        timeout: 60000,
      });

      console.log("Browser launched successfully");
      return browser;
    } catch (error) {
      console.error("Failed to launch browser in production:", error);
      throw new Error(`Browser launch failed: ${error}`);
    } finally {
      browserLaunchInProgress = false;
    }
  } else {
    // Local: Use local Chrome/Chromium
    const localExecutablePath =
      process.platform === "win32"
        ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
        : process.platform === "darwin"
          ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
          : "/usr/bin/google-chrome";

    try {
      browserLaunchInProgress = true;

      const browser = await puppeteer.launch({
        executablePath: localExecutablePath,
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
        timeout: 30000,
      });

      console.log("Local browser launched successfully");
      return browser;
    } catch (error) {
      console.error("Failed to launch local browser:", error);
      throw new Error(`Browser launch failed: ${error}`);
    } finally {
      browserLaunchInProgress = false;
    }
  }
}

export async function launchBrowser() {
  return queuedLaunchBrowser();
}
