import { sleep } from "@utils/demo";
import { getRandomNumber } from "@utils/number";

export interface GithubApiResponse {
  items: Array<{
    id: number;
    name: string;
    stargazers_count: number;
    full_name: string;
    html_url: string;
    owner: {
      login: string;
    };
    topics: string[];
  }>;
}

export async function fakeFetch(
  url: string,
  options: { signal: AbortSignal }
): Promise<{ json(): Promise<GithubApiResponse> }> {
  await sleep(getRandomNumber(100, 1000));

  const response: GithubApiResponse = {
    items: [],
  };

  for (let index = 0; index <= 10; index++) {
    response.items.push({
      id: index,
      name: `super_hacktoberfest_${index}`,
      full_name: `username/repo${index}`,
      stargazers_count: Math.round(getRandomNumber(0, 100)),
      html_url: "#",
      owner: {
        login: "username",
      },
      topics: ["react", "javascript", "blog", "computer science", "web"],
    });
  }

  return {
    json: () => new Promise((resolve) => resolve(response)),
  };
}
