import { Router } from "express";
import {
  getGithubTrending,
  triggerGithubJob,
  getDevToTrending,
  triggerDevToJob,
} from "../controllers/trending.controller.js";

const router = Router();

router.get("/github", getGithubTrending);
router.post("/jobs/github-trending", triggerGithubJob);

router.get("/devto", getDevToTrending);
router.post("/jobs/devto-trending", triggerDevToJob);

export default router;
