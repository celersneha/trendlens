"use client";

import { useEffect, useState } from "react";
import { fetchDevToTrending } from "@/services/trending.service";
import { DevToArticle } from "@/types/repository";
import DevToArticleCard from "./DevToArticleCard";

export default function DevToTrending() {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchDevToTrending();
        setArticles(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch articles",
        );
        console.error("Error loading Dev.to trending:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <main className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Dev.to Trending
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover the most popular articles on Dev.to right now
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Loading articles...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No articles available at the moment
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <DevToArticleCard key={article.url} article={article} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Showing {articles.length} articles</p>
        </div>
      </main>
    </div>
  );
}
