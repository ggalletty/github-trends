import { mockGithubRepoServiceFactory } from "../../../tests/__mocks__/github-repo-service";
import { FetchClient } from "../../common/infra/fetch-client";
import { HttpClient } from "../../common/infra/http-client";
import { Repo } from "../domain/repo";
import { RepoService } from "../domain/repo-service";

const BASE_URL = `https://api.github.com`;

/** Implementation of Repo service for GitHub.com */
export class GithubRepoService implements RepoService {
  constructor(private readonly httpClient: HttpClient) {}

  async getTrendingRepos(fromDate: Date, size: number = 10): Promise<Repo[]> {
    // Date format must be `YYY-MM-DD`
    const formattedDate = fromDate.toISOString().split("T")[0];

    return this.httpClient
      .get<any>(
        `${BASE_URL}/search/repositories?q=created:>${formattedDate}&sort=stars&order=desc&per_page=${size}`
      )
      .then((res) => res.items.map(this.mapToRepo));
  }

  /**
   * Maps GitHub repo objects to our own repo model.
   *
   * @param input Model object from GitHub
   */
  private mapToRepo(input: any): Repo {
    return {
      id: input.id,
      name: input.name,
      description: input.description,
      url: input.html_url,
      language: input.language,
      stars_count: input.stargazers_count,
      created_at: input.created_at,
    };
  }
}

/** Makes a GitHub repo service instance using fetch as client */
export const githubRepoFactory = () =>
  // use mock service for development as there's a rate limit
  import.meta.env.DEV
    ? mockGithubRepoServiceFactory()
    : new GithubRepoService(new FetchClient());

export default GithubRepoService;
