export interface RatingService {
  /** Returns an array of all starred repos IDs */
  getStarredItems: () => number[];
  /** Adds repo to starred list and returns the updated list */
  starItem: (repoId: number) => number[];
  /** Removes repo from starred list and returns the updated list */
  unstarItem: (repoId: number) => number[];
}
