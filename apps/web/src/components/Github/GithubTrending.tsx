import { fetchGithubTrending } from "@/services/trending.service";
import RepositoryCard from "./RepositoryCard";

export default async function GithubTrending() {
  const repos = await fetchGithubTrending();

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

        {repos.length === 0 ? (
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
