"use client";

import { useEffect, useState } from "react";
import { HackerNewsStory } from "@/types/repository";
import {
  FiUser,
  FiMessageSquare,
  FiTrendingUp,
  FiExternalLink,
} from "react-icons/fi";

interface HackerNewsStoryCardProps {
  story: HackerNewsStory;
}

export default function HackerNewsStoryCard({
  story,
}: HackerNewsStoryCardProps) {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    const calculateTimeAgo = () => {
      const minutes = Math.floor((Date.now() - story.time * 1000) / 1000 / 60);
      if (minutes < 60) {
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
          setTimeAgo(`${hours}h ago`);
        } else {
          const days = Math.floor(hours / 24);
          setTimeAgo(`${days}d ago`);
        }
      }
    };

    calculateTimeAgo();
    const interval = setInterval(calculateTimeAgo, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [story.time]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-accent transition-all duration-300 group">
      <div className="flex flex-col h-full">
        {/* Story Title & Link */}
        <div className="flex items-start justify-between mb-4">
          <a
            href={
              story.url || `https://news.ycombinator.com/item?id=${story.id}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-lg font-bold text-primary hover:text-accent transition-colors line-clamp-3 group-hover:underline"
          >
            {story.title}
          </a>
          <FiExternalLink className="text-gray-400 group-hover:text-accent transition-colors ml-2 flex-shrink-0" />
        </div>

        {/* Story Stats */}
        <div className="grid grid-cols-3 gap-3 text-sm mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-600">
            <FiTrendingUp className="text-accent" />
            <span className="font-semibold">{story.score}</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-600">
            <FiMessageSquare className="text-secondary" />
            <span className="font-semibold">{story.descendants}</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-600">
            <FiUser className="text-gray-400" />
            <span className="font-semibold truncate">{story.by}</span>
          </div>
        </div>

        {/* Time Info */}
        <div className="text-xs text-gray-500 mt-3">
          {timeAgo || "just now"}
        </div>
      </div>
    </div>
  );
}
