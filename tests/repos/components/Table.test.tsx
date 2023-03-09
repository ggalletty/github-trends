import React from "react";
import { vi } from "vitest";
import { Table } from "../../../src/repos/components/Table";
import { renderWithProviders, screen } from "../../utils/test-utils";

const mockCancellableFn = vi.fn().mockImplementation(() => ({
  abort: () => {},
}));

describe("repo table component", () => {
  it("should render and display expected headers", () => {
    renderWithProviders(
      <Table loading={false} repoList={[]} fetchRepos={mockCancellableFn} />
    );
    expect(screen.getByTestId("repo-table")).toBeInTheDocument();
    expect(screen.getByTestId("repo-table-headers")).toBeInTheDocument();
    // we expect the table to have five headers
    expect(screen.getByTestId("repo-table-headers").childElementCount).toBe(5);
  });
});
