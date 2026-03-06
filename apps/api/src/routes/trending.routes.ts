import { Router } from "express";
import {
  getGithubTrending,
  getDevToTrending,
} from "../controllers/trending.controller.js";

const router = Router();

router.get("/github", getGithubTrending);

router.get("/devto", getDevToTrending);

export default router;
