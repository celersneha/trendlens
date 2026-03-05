import { Repository, DevToArticle } from "@/types/repository";

export async function fetchGithubTrending(): Promise<Repository[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    console.log("Fetching GitHub trending from:", apiUrl);
    
    const response = await fetch(`${apiUrl}/api/trending/github`, {
      next: { revalidate: 3600 },
    });

    console.log("GitHub API Response Status:", response.status);
    
    if (!response.ok) {
      console.error(`Failed to fetch trending repositories: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    console.log("GitHub data received:", data.data?.length || 0);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching trending repositories:", error);
    return [];
  }
}

export async function fetchDevToTrending(): Promise<DevToArticle[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    console.log("Fetching DevTo trending from:", apiUrl);
    
    const response = await fetch(`${apiUrl}/api/trending/devto`, {
      next: { revalidate: 3600 },
    });

    console.log("DevTo API Response Status:", response.status);
    
    if (!response.ok) {
      console.error(`Failed to fetch trending articles: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    console.log("DevTo data received:", data.data?.length || 0);
    return data.data || [];
  } catch (error) {
    console.error("Error fetching trending articles:", error);
    return [];
  }
}
