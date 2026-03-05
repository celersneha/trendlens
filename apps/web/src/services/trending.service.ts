import { Repository, DevToArticle } from "@/types/repository";

export async function fetchGithubTrending(): Promise<Repository[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    console.log("Fetching GitHub trending from:", apiUrl);

    const response = await fetch(`${apiUrl}/api/trending/github`, {
      cache: "no-store",
    });

    console.log("GitHub API Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("GitHub data received:", data.data?.length || 0, "repos");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching trending repositories:", error);
    throw error;
  }
}

export async function fetchDevToTrending(): Promise<DevToArticle[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    console.log("Fetching DevTo trending from:", apiUrl);

    const response = await fetch(`${apiUrl}/api/trending/devto`, {
      cache: "no-store",
    });

    console.log("DevTo API Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("DevTo data received:", data.data?.length || 0, "articles");
    return data.data || [];
  } catch (error) {
    console.error("Error fetching trending articles:", error);
    throw error;
  }
}
