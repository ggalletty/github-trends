import { test, vi } from "vitest";
import { FetchClient } from "../../../src/common/infra/fetch-client";

global.fetch = vi.fn().mockResolvedValue({ json: vi.fn() });

test("implementation should use `fetch`", () => {
  const client = new FetchClient();
  client.get("https://example.com");
  expect(global.fetch).toHaveBeenCalledWith("https://example.com");
});
