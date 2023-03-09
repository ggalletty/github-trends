import { PreloadedState } from "@reduxjs/toolkit";
import { cleanup, render, RenderOptions } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { afterEach } from "vitest";
import { AppStore, RootState, setupStore } from "../../src/common/state";

afterEach(() => {
  cleanup();
});

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => ({
  store,
  ...render(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...renderOptions,
  }),
});

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
