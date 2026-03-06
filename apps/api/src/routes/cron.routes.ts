import { Router, Request, Response } from "express";
import { executeCronJob } from "../utils/cronUtils.js";

const cronRouter = Router();

/**
 * GET /api/cron
 * Cron job endpoint that runs at midnight every day (invoked by Vercel)
 * Clears the database and re-seeds with latest trending data
 *
 * Headers:
 * - Authorization: Bearer <CRON_SECRET>
 */
cronRouter.get("/", async (req: Request, res: Response) => {
  try {
    // Verify the cron secret token from Authorization header
    const cronSecret = process.env.CRON_SECRET;
    const authHeader = req.headers.authorization;

    if (!cronSecret) {
      console.warn(
        "⚠️  WARNING: CRON_SECRET is not set in environment variables",
      );
    }

    if (process.env.NODE_ENV === "production") {
      if (!cronSecret || !authHeader) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized - Missing Authorization header",
        });
      }

      // Extract token from "Bearer <token>" format
      const providedSecret = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

      if (providedSecret !== cronSecret) {
        console.error("❌ Cron request failed: Invalid CRON_SECRET");
        return res.status(401).json({
          success: false,
          message: "Unauthorized - Invalid CRON_SECRET",
        });
      }
    }

    console.log(`✅ Cron job triggered at ${new Date().toISOString()}`);

    // Execute the cron job
    const result = await executeCronJob();

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Cron endpoint error:", errorMessage);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: errorMessage,
    });
  }
});

/**
 * GET /api/cron/status
 * Health check endpoint to verify cron service is running
 */
cronRouter.get("/status", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Cron service is running",
    timestamp: new Date().toISOString(),
  });
});

export default cronRouter;
