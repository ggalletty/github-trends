import { vi, Mock } from "vitest";
import { setupStore } from "../../../src/common/state";
import { actions, thunks } from "../../../src/repos/state";

describe("repos state", () => {
  const store = setupStore();

  it("should support (un)starring repos", () => {
    store.dispatch(actions.starRepo({ id: 1, name: "foo" } as any));
    expect(store.getState().repos.starred.ids).toContain(1);
    store.dispatch(actions.unstarRepo({ id: 1, name: "foo" } as any));
    expect(store.getState().repos.starred.ids).not.toContain(1);
  });

  it("should fetch repos and update store", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(<any>{
      json: () =>
        Promise.resolve({
          items: [{ id: 1, name: "test" }],
        }),
    });

    await store.dispatch(thunks.fetchFromDate(new Date()));
    expect(store.getState().repos.repos.entities).toEqual({
      1: { id: 1, name: "test" },
    });
  });
});
