import { Repo } from "./repo";

export interface RepoService {
  /**
   * Returns list of repos created within the last week sorted by star count.
   * @param fromDate The minimum repo creation date to look for.
   * @param size The maximum number of repos to return per page. Defaults to 10.
   */
  getTrendingRepos(fromDate: Date, size: number): Promise<Repo[]>;
}
