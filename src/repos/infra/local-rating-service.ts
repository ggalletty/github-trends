import { STARS_STORAGE_KEY } from "../constants";
import { RatingService } from "../domain/rating-service";

/** An implementation of rating service which stores data to `localStorage` */
export class LocalRatingService implements RatingService {
  constructor(private key = STARS_STORAGE_KEY) {}

  getStarredItems(): number[] {
    return JSON.parse(localStorage.getItem(this.key) || "[]");
  }

  starItem(repoId: number): number[] {
    const result = this.getStarredItems().concat(repoId);
    localStorage.setItem(this.key, JSON.stringify(result));
    return result;
  }

  unstarItem(repoId: number): number[] {
    const result = this.getStarredItems().filter((id) => id !== repoId);
    localStorage.setItem(this.key, JSON.stringify(result));

    return result;
  }
}

export const localRatingServiceFactory = () => new LocalRatingService();

export default LocalRatingService;
