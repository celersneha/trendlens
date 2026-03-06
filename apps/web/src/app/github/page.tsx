"use client";

import { useEffect, useState } from "react";
import { fetchGithubTrending } from "@/services/trending.service";
import { Repository } from "@/types/repository";
import RepositoryCard from "@/components/Github/RepositoryCard";
import { FiGithub } from "react-icons/fi";

export default function GitHubPage() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className=" text-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <FiGithub className="text-5xl text-accent" />
            <div>
              <h1 className="text-4xl font-bold">GitHub Trending</h1>
              <p className="text-primary mt-2">
                Discover the most popular repositories on GitHub right now
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
              <p className="text-gray-600 mt-4">Loading repositories...</p>
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
          ) : repos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                No repositories available at the moment
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-gray-600">
                <p className="text-lg">
                  Showing{" "}
                  <span className="font-bold text-primary">{repos.length}</span>{" "}
                  trending repositories
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo) => (
                  <RepositoryCard
                    key={`${repo.owner}-${repo.name}`}
                    repo={repo}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
