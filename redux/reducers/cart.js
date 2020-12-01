import { actionTypes } from "../actions";

const initialState = {
  itemIds: [],
  quantityByItemId: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_MULTIPLE_IN_CART: {
      const { ids } = action.payload;

      return ids.reduce(
        (acc, id) => {
          if (!state.itemIds.includes(id)) {
            acc.itemIds.push(id);
            acc.quantityByItemId[id] = (acc.quantityByItemId[id] || 0) + 1;
          }

          return acc;
        },
        { ...state }
      );
    }

    case actionTypes.REMOVE_MULTIPLE_FROM_CART: {
      const { ids } = action.payload;

      if (!ids) {
        return initialState;
      }

      return state.itemIds.reduce(
        (acc, existingItemId) => {
          if (!ids.includes(existingItemId)) {
            acc.itemIds.push(existingItemId);
            acc.quantityByItemId[existingItemId] =
              state.quantityByItemId[existingItemId];
          }
          return acc;
        },
        { itemIds: [], quantityByItemId: {} }
      );
    }

    case actionTypes.SET_QUANTITY_CART: {
      const { id, value } = action.payload;

      const quantityByItemId = {
        ...state.quantityByItemId,
        [id]: value
      };

      return { ...state, quantityByItemId };
    }

    default:
      return state;
  }
}
