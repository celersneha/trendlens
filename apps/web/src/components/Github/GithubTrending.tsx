"use client";

import { useEffect, useState } from "react";
import { fetchGithubTrending } from "@/services/trending.service";
import { Repository } from "@/types/repository";
import RepositoryCard from "./RepositoryCard";

export default function GithubTrending() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchGithubTrending();
        setRepos(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch repositories",
        );
        console.error("Error loading GitHub trending:", err);
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
            GitHub Trending
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover the most popular repositories on GitHub right now
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Loading repositories...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">Error: {error}</p>
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No repositories available at the moment
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {repos.map((repo) => (
              <RepositoryCard key={`${repo.owner}-${repo.name}`} repo={repo} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Showing {repos.length} repositories</p>
        </div>
      </main>
    </div>
  );
}
