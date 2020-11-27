import { actionTypes } from "../actions";

const initialState = {
  items: {
    count: 0,
    allIds: [],
    byId: {}
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_MULTIPLE_IN_CART: {
      const items = action.payload.items;

      if (Array.isArray(items)) {
        const newIds = items.map(item => item.id);
        const newItemsById = items.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});

        return {
          items: {
            count: newIds.length,
            allIds: [...state.items.allIds, ...newIds],
            byId: { ...state.items.byId, ...newItemsById }
          }
        };
      }

      break;
    }

    case actionTypes.REMOVE_MULTIPLE_FROM_CART: {
      const ids = action.payload.ids;

      if (Array.isArray(ids)) {
        const remainingIds = state.items.filter(id => !ids.includes(id));

        const remainingItemsById = remainingIds.reduce((acc, id) => {
          acc[id] = state.items[id];
          return acc;
        }, {});

        return {
          items: {
            count: remainingIds.length,
            allIds: remainingIds,
            byId: remainingItemsById
          }
        };
      }

      break;
    }

    default:
      return state;
  }
}
