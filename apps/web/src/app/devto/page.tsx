"use client";

import { useEffect, useState } from "react";
import { fetchDevToTrending } from "@/services/trending.service";
import { DevToArticle } from "@/types/repository";
import DevToArticleCard from "@/components/DevTo/DevToArticleCard";
import { SiDevdotto } from "react-icons/si";

export default function DevToPage() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gray-50 text-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <SiDevdotto className="text-5xl text-accent" />
            <div>
              <h1 className="text-4xl font-bold">Dev.to Trending</h1>
              <p className="text-primary mt-2">
                Discover the most popular articles on Dev.to right now
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-accent"></div>
              <p className="text-gray-600 mt-4">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
              <p className="text-red-600 font-semibold">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-secondary transition-colors"
              >
                Retry
              </button>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                No articles available at the moment
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-gray-600">
                <p className="text-lg">
                  Showing{" "}
                  <span className="font-bold text-primary">
                    {articles.length}
                  </span>{" "}
                  trending articles
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <DevToArticleCard key={article.url} article={article} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
