import { fetchDevToTrending } from "@/services/trending.service";
import DevToArticleCard from "./DevToArticleCard";

export default async function DevToTrending() {
  const articles = await fetchDevToTrending();

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

        {articles.length === 0 ? (
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
