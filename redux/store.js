import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";

import rootReducer from "./rootReducer";
import middlewares, { onStoreCreated } from "./middlewares/";
import { get, set } from "./utils/localStorage";

const isServer = typeof window === "undefined";

export const makeStore = context => {
  const existingState = isServer
    ? undefined
    : get(process.env.NEXT_PUBLIC_LOCALSTORAGE_STORED_REDUX_STATE_KEY);

  const store = createStore(rootReducer, existingState, middlewares);

  onStoreCreated(store);

  if (!isServer) {
    store.subscribe(
      // we can do store.getState() here to do stuffs
      // this subscription will be called every time some action is dispatched that changes some part of state
      () => {
        set(
          process.env.NEXT_PUBLIC_LOCALSTORAGE_STORED_REDUX_STATE_KEY,
          store.getState()
        );
      }
    );
  }

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
