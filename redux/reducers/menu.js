import { keyBy, orderBy } from "lodash";

import { createReducer } from "redux/utils/reducer";

const initialState = {
  loading: false,
  itemIds: [],
  itemsById: {},
  updatedAt: null
};

function reducer(actionTypes) {
  return {
    [actionTypes.LOAD_MENU_REQUEST]: (state, action) => {
      state.loading = true;
    },

    [actionTypes.LOAD_MENU_SUCCESS]: (state, action) => {
      const { items } = action.payload;

      const temp = keyBy(orderBy(items, ["createdAt"], ["desc"]), "_id");

      state.itemsById = temp;
      state.itemIds = Object.keys(temp);
      state.updatedAt = new Date().toISOString();
    },

    [actionTypes.LOAD_MENU_FAILURE]: (state, action) => {
      state.loading = false;
    }
  };
}

export default createReducer(reducer, initialState);
