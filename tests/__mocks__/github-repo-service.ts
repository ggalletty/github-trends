import { HttpClient } from "../../src/common/infra/http-client";
import { GithubRepoService } from "../../src/repos/infra/github-repo-service";

const mockFetch: HttpClient = {
  get: <T>() =>
    import("../__stub__/github-repos-response").then(
      (res) => res.default
    ) as Promise<T>,
};

export const mockGithubRepoServiceFactory = () =>
  new GithubRepoService(mockFetch);
