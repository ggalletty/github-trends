import React from "react";
import App from "../src/App";
import { renderWithProviders, screen } from "./utils/test-utils";

describe("main app", () => {
  it("should render the title", () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/GitHub Trends/i)).toBeInTheDocument();
  });
});
