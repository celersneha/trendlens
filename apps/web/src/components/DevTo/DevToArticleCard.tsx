import { DevToArticle } from "@/types/repository";

interface DevToArticleCardProps {
  article: DevToArticle;
}

export default function DevToArticleCard({ article }: DevToArticleCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-semibold text-blue-600 dark:text-blue-400 hover:underline"
      >
        {article.title}
      </a>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span>By</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {article.author}
          </span>
        </div>
        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
          {article.slug}
        </span>
      </div>
    </div>
  );
}
