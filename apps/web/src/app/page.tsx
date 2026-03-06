"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  fetchGithubTrending,
  fetchDevToTrending,
  fetchHackerNewsTrending,
} from "@/services/trending.service";
import { Repository, DevToArticle, HackerNewsStory } from "@/types/repository";
import RepositoryCard from "@/components/Github/RepositoryCard";
import DevToArticleCard from "@/components/DevTo/DevToArticleCard";
import HackerNewsStoryCard from "@/components/HackerNews/HackerNewsStoryCard";
import { FiArrowRight, FiGithub, FiTrendingUp } from "react-icons/fi";
import { SiDevdotto } from "react-icons/si";

export default function Home() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [stories, setStories] = useState<HackerNewsStory[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const data = await fetchGithubTrending();
        setRepos(data);
      } catch (err) {
        console.error("Error loading GitHub trending:", err);
      } finally {
        setLoadingRepos(false);
      }
    };

    const loadArticles = async () => {
      try {
        const data = await fetchDevToTrending();
        setArticles(data);
      } catch (err) {
        console.error("Error loading Dev.to trending:", err);
      } finally {
        setLoadingArticles(false);
      }
    };

    const loadStories = async () => {
      try {
        const data = await fetchHackerNewsTrending();
        setStories(data);
      } catch (err) {
        console.error("Error loading Hacker News trending:", err);
      } finally {
        setLoadingStories(false);
      }
    };

    loadRepos();
    loadArticles();
    loadStories();
  }, []);

  const displayRepos = repos.slice(0, 6);
  const displayArticles = articles.slice(0, 6);
  const displayStories = stories.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className=" text-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover What&apos;s <span className="text-accent">Trending</span>
            </h1>
            <p className="text-xl text-primary max-w-2xl mx-auto">
              Stay updated with the latest trending repositories on GitHub and
              popular articles from Dev.to
            </p>
          </div>
        </div>
      </section>

      {/* GitHub Trending Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FiGithub className="text-3xl text-primary" />
              <h2 className="text-3xl font-bold text-primary">
                GitHub Trending
              </h2>
            </div>
            <Link
              href="/github"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              View All
              <FiArrowRight />
            </Link>
          </div>

          {loadingRepos ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading repositories...</p>
            </div>
          ) : displayRepos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No repositories available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayRepos.map((repo) => (
                <RepositoryCard
                  key={`${repo.owner}-${repo.name}`}
                  repo={repo}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dev.to Trending Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <SiDevdotto className="text-3xl text-primary" />
              <h2 className="text-3xl font-bold text-primary">
                Dev.to Trending
              </h2>
            </div>
            <Link
              href="/devto"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              View All
              <FiArrowRight />
            </Link>
          </div>

          {loadingArticles ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading articles...</p>
            </div>
          ) : displayArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArticles.map((article) => (
                <DevToArticleCard key={article.url} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hacker News Trending Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="text-3xl text-primary" />
              <h2 className="text-3xl font-bold text-primary">
                Hacker News Trending
              </h2>
            </div>
            <Link
              href="/hackernews"
              className="flex items-center gap-2 px-4 py-2 bg-accent text-primary font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              View All
              <FiArrowRight />
            </Link>
          </div>

          {loadingStories ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading stories...</p>
            </div>
          ) : displayStories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No stories available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayStories.map((story) => (
                <HackerNewsStoryCard key={story.id} story={story} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
