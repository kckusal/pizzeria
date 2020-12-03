import { combineReducers } from "redux";

import { HYDRATE } from "next-redux-wrapper";

import { actionTypes } from "./actions";
import app from "./reducers/app";
import constants from "./reducers/constants";
import menu from "./reducers/menu";
import user from "./reducers/user";

const mainReducer = combineReducers({
  app,
  constants,
  menu,
  user
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: {
      return state;
    }

    default:
  }

  return mainReducer(state, action);
};

export default rootReducer;
