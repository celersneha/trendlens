import { Router, Request, Response } from "express";
import { executeCronJob } from "../utils/cronUtils.js";

const cronRouter = Router();

/**
 * POST /api/cron
 * Cron job endpoint that runs at midnight every day
 * Clears the database and re-seeds with latest trending data
 */
cronRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Verify the request is from Vercel cron
    // In production, you might want to add authentication here
    const authHeader = req.headers.authorization;

    if (process.env.NODE_ENV === "production" && !authHeader) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Missing authorization header",
      });
    }

    console.log(`Cron job triggered at ${new Date().toISOString()}`);

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
