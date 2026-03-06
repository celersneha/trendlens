import { Router } from "express";
import {
  getGithubTrending,
  getDevToTrending,
} from "../controllers/trending.controller.js";
import hackerNewsRouter from "./hackernews.routes.js";

const router = Router();

router.get("/github", getGithubTrending);

router.get("/devto", getDevToTrending);

router.use("/hackernews", hackerNewsRouter);

export default router;
