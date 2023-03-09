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
  const getStoredIds = () =>
    Object.keys(localRatingServiceFactory().getStoredMap()).map(Number);
  expect(getStoredIds()).toEqual([]);

  const { next, invoke } = create();

  invoke(actions.starRepo({ id: 1, name: "foo" } as any));
  expect(getStoredIds()).toContain(1);

  invoke(actions.unstarRepo({ id: 1, name: "foo" } as any));
  expect(getStoredIds()).not.toContain(1);
});
