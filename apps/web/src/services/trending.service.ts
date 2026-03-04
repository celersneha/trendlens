import { Repository, DevToArticle } from "@/types/repository";

export async function fetchGithubTrending(): Promise<Repository[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const response = await fetch(`${apiUrl}/api/trending/github`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch trending repositories");
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching trending repositories:", error);
    return [];
  }
}

export async function fetchDevToTrending(): Promise<DevToArticle[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const response = await fetch(`${apiUrl}/api/trending/devto`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch trending articles");
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching trending articles:", error);
    return [];
  }
}
