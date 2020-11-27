import { applyMiddleware, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";

import rootReducer, { initialState as preloadedState } from "./rootReducer";

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const makeStore = context => {
  const middlewares = bindMiddleware([]);
  const store = createStore(rootReducer, preloadedState, middlewares);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
