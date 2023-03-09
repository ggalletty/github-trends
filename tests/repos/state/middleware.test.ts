import { vi } from "vitest";
import { localRatingServiceFactory } from "../../../src/repos/infra/local-rating-service";
import { actions } from "../../../src/repos/state";
import { middleware } from "../../../src/repos/state/middleware";

const create = () => {
  const store = { getState: vi.fn(() => ({})), dispatch: vi.fn() };
  const next = vi.fn();
  const invoke = (action) => middleware(store)(next)(action);
  return { store, next, invoke };
};

test("should apply side-effects when (un)starring repos", () => {
  expect(localRatingServiceFactory().getStarredItems()).toEqual([]);

  const { next, invoke } = create();

  invoke(actions.star(1));
  expect(localRatingServiceFactory().getStarredItems()).toContain(1);

  invoke(actions.unstar(1));
  expect(localRatingServiceFactory().getStarredItems()).not.toContain(1);
});
