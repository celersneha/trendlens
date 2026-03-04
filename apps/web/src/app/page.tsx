import GithubTrending from "@/components/Github/GithubTrending";
import DevToTrending from "@/components/DevTo/DevToTrending";

export const revalidate = 3600; // Revalidate every hour

export default function Home() {
  return (
    <div>
      <GithubTrending />
      <DevToTrending />
    </div>
  );
}
