import { Page } from "puppeteer";
import { githubTrendingConfig } from "../config/githubTrending.config.js";

export async function parseGithubTrending(page: Page) {
  // Extract config values to pass as plain strings to avoid transpiler issues
  const configData = {
    url: githubTrendingConfig.url,
    repositoryName: githubTrendingConfig.repositoryName,
    owner: githubTrendingConfig.owner,
    description: githubTrendingConfig.description,
    language: githubTrendingConfig.language,
    stars: githubTrendingConfig.stars,
    forks: githubTrendingConfig.forks,
  };

  const repos = await page.$$eval(
    githubTrendingConfig.repositoryContainer,
    (elements, config) => {
      return elements.map((el) => {
        const url = el.querySelector(config.url);
        const name = el.querySelector(config.repositoryName);
        const owner = el.querySelector(config.owner);
        const description = el.querySelector(config.description);
        const language = el.querySelector(config.language);
        const stars = el.querySelector(config.stars);
        const forks = el.querySelector(config.forks);

        return {
          url: url && "href" in url ? url.href : "",
          name: name?.textContent?.trim() || "",
          owner: owner?.textContent?.trim() || "",
          description: description?.textContent?.trim() || "",
          language: language?.textContent?.trim() || "",
          stars: stars?.textContent?.trim() || "",
          forks: forks?.textContent?.trim() || "",
        };
      });
    },
    configData,
  );

  return repos;
}
