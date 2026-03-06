export interface Repository {
  url: string;
  name: string;
  owner: string;
  description?: string;
  language?: string;
  stars: string;
  forks: string;
}
export interface DevToArticle {
  url: string;
  title: string;
  author: string;
  slug: string;
}
export interface HackerNewsStory {
  id: number;
  title: string;
  url: string | null;
  by: string;
  score: number;
  time: number;
  descendants: number;
  type: string;
}
