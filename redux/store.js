import { createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";

import rootReducer from "./rootReducer";
import middlewares, { onStoreCreated } from "./middlewares/";
import { get, set } from "./utils/localStorage";

export const makeStore = context => {
  const existingState = get(
    process.env.NEXT_PUBLIC_LOCALSTORAGE_STORED_REDUX_STATE_KEY
  );

  const store = createStore(rootReducer, existingState, middlewares);

  onStoreCreated(store);

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

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
