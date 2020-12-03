import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";

import rootReducer from "./rootReducer";
import middlewares, { onStoreCreated } from "./middlewares/";
import { get, set } from "./utils/localStorage";

const isServer = typeof window === "undefined";
const dateToday = new Date().toISOString().slice(0, 10);

export const makeStore = context => {
  const existingState = get(
    isServer
      ? undefined
      : `${process.env.NEXT_PUBLIC_LOCALSTORAGE_STORED_REDUX_STATE_KEY}_${dateToday}`
  );

  const store = createStore(rootReducer, existingState, middlewares);

  onStoreCreated(store, { savedToLocalStorage: true, isServer });

  if (!isServer) {
    store.subscribe(
      // we can do store.getState() here to do stuffs
      // this subscription will be called every time some action is dispatched that changes some part of state
      () => {
        set(
          `${process.env.NEXT_PUBLIC_LOCALSTORAGE_STORED_REDUX_STATE_KEY}_${dateToday}`,
          store.getState()
        );
      }
    );
  }

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
