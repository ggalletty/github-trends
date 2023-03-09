import { createListenerMiddleware } from "@reduxjs/toolkit";
import { localRatingServiceFactory } from "../infra/local-rating-service";
import { actions } from ".";

const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: actions.starRepo,
  effect: (action) => {
    localRatingServiceFactory().starItem(action.payload);
  },
});

listener.startListening({
  actionCreator: actions.unstarRepo,
  effect: (action) => {
    localRatingServiceFactory().unstarItem(action.payload);
  },
});

export const { middleware } = listener;
