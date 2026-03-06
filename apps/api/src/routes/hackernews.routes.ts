import { Router } from "express";
import {
  getHackerNewsTrending,
  refreshHackerNewsTrending,
} from "../controllers/hackernews.controller.js";

const hackerNewsRouter = Router();

/**
 * GET /api/trending/hackernews
 * Get trending stories from Hacker News
 */
hackerNewsRouter.get("/", getHackerNewsTrending);

/**
 * POST /api/trending/hackernews/refresh
 * Refresh Hacker News data from API
 */
hackerNewsRouter.post("/refresh", refreshHackerNewsTrending);

export default hackerNewsRouter;
