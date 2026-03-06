import { DevToArticle } from "@/types/repository";
import { FiUser, FiExternalLink } from "react-icons/fi";

interface DevToArticleCardProps {
  article: DevToArticle;
}

export default function DevToArticleCard({ article }: DevToArticleCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all duration-300 group">
      <div className="flex flex-col h-full">
        {/* Article Title & Link */}
        <div className="flex items-start justify-between mb-4">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-lg font-bold text-primary hover:text-accent transition-colors line-clamp-3 group-hover:underline"
          >
            {article.title}
          </a>
          <FiExternalLink className="text-gray-400 group-hover:text-accent transition-colors ml-2 flex-shrink-0" />
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <FiUser className="text-accent" />
            <span className="font-medium">{article.author}</span>
          </div>
          {article.slug && (
            <span className="text-xs px-3 py-1 bg-secondary/20 text-primary rounded-full font-medium">
              {article.slug}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
