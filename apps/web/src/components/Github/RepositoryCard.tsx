import { Repository } from "@/types/repository";
import { FiStar, FiGitBranch, FiExternalLink } from "react-icons/fi";

interface RepositoryCardProps {
  repo: Repository;
}

export default function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all duration-300 group">
      <div className="flex flex-col h-full">
        {/* Repository Name & Link */}
        <div className="flex items-start justify-between mb-3">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-lg font-bold text-primary hover:text-accent transition-colors line-clamp-2 group-hover:underline"
          >
            {repo.owner} / {repo.name}
          </a>
          <FiExternalLink className="text-gray-400 group-hover:text-accent transition-colors ml-2 flex-shrink-0" />
        </div>

        {/* Description */}
        {repo.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {repo.description}
          </p>
        )}

        {/* Stats & Language */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-auto pt-4 border-t border-gray-100">
          {repo.language && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-accent"></span>
              <span className="font-medium">{repo.language}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <FiStar className="text-accent" />
            <span className="font-semibold">{repo.stars}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FiGitBranch className="text-secondary" />
            <span className="font-semibold">{repo.forks}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
