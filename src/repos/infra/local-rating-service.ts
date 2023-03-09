import { STARS_STORAGE_KEY } from "../constants";
import { RatingService } from "../domain/rating-service";
import { Repo } from "../domain/repo";

/** An implementation of rating service which stores data to `localStorage` */
export class LocalRatingService implements RatingService {
  constructor(private key = STARS_STORAGE_KEY) {}

  getStarredItems(): Repo[] {
    return Object.values(this.getStoredMap);
  }

  starItem(repo: Repo): void {
    localStorage.setItem(
      this.key,
      JSON.stringify({ ...this.getStoredMap(), [repo.id]: repo })
    );
  }

  unstarItem(repo: Repo): void {
    const repos = this.getStarredItems();
    delete repos[repo.id];
    localStorage.setItem(this.key, JSON.stringify(repos));
  }

  getStoredMap(): Record<number, Repo> {
    return JSON.parse(localStorage.getItem(this.key) || "{}");
  }
}

export const localRatingServiceFactory = () => new LocalRatingService();

export default LocalRatingService;
