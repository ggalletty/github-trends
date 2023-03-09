import { Repo } from "./repo";

export interface RatingService {
  /** Returns an array of all starred repos IDs */
  getStarredItems: () => Repo[];
  /** Adds repo to starred list and returns the updated list */
  starItem: (repo: Repo) => void;
  /** Removes repo from starred list and returns the updated list */
  unstarItem: (repo: Repo) => void;
}
