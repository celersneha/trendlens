"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiTrendingUp } from "react-icons/fi";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-primary border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <FiTrendingUp className="text-accent text-2xl group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold text-white">
              Trend<span className="text-accent">Lens</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive("/") ? "text-accent" : "text-gray-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/github"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive("/github") ? "text-accent" : "text-gray-300"
              }`}
            >
              GitHub
            </Link>
            <Link
              href="/devto"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive("/devto") ? "text-accent" : "text-gray-300"
              }`}
            >
              Dev.to
            </Link>
            <Link
              href="/hackernews"
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isActive("/hackernews") ? "text-accent" : "text-gray-300"
              }`}
            >
              Hacker News
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
