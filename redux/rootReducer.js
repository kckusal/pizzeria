import { combineReducers } from "redux";

import { HYDRATE } from "next-redux-wrapper";

import { actionTypes } from "./actions";
import app from "./reducers/app";
import constants from "./reducers/constants";
import cart from "./reducers/cart";
import user from "./reducers/user";

const mainReducer = combineReducers({
  app,
  constants,
  cart,
  user
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    default:
  }

  return mainReducer(state, action);
};

export default rootReducer;
