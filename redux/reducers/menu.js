import { keyBy } from "lodash";

import { actionTypes } from "../actions";

const initialState = {
  itemIds: [],
  itemsById: {},
  updatedAt: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_MENU: {
      const { items } = action.payload;

      return {
        itemIds: items.map(item => item.id),
        itemsById: keyBy(items, "id"),
        updatedAt: new Date().toISOString()
      };
    }

    default:
      return state;
  }
}
