import { Page } from "puppeteer";
import { devtoTrendingConfig } from "../config/devto.config.js";

interface DevToArticle {
  url: string;
  title: string;
  author: string;
  slug: string;
}

export async function parseDevToTrending(page: Page): Promise<DevToArticle[]> {
  const articles = await page.$$eval(
    devtoTrendingConfig.articleContainer,
    (elements) => {
      return elements
        .map((el) => {
          const href = el.getAttribute("href") || "";
          const title = el.textContent?.trim() || "";

          // Extract author and slug from href (format: /author/slug)
          const parts = href.split("/").filter((p) => p);
          const author = parts[0] || "";
          const slug = parts[1] || "";

          // Only include valid articles (must have author and slug)
          if (!author || !slug || title.length === 0) {
            return null;
          }

          return {
            url: href.startsWith("http") ? href : `https://dev.to${href}`,
            title,
            author,
            slug,
          };
        })
        .filter(
          (article): article is DevToArticle =>
            article !== null && article.author !== "" && article.slug !== "",
        )
        .slice(0, 15); // Limit to top 15 articles
    },
  );

  return articles;
}
