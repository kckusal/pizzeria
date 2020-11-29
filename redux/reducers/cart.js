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

      return ids.reduce(
        (acc, id) => {
          if (state.itemIds.includes(id)) {
            acc.itemsIds = acc.itemIds.filter(itemId => id !== itemId);

            const { id, temp } = acc.quantityByItemId;
            acc.quantityByItemId = temp;
          }

          return acc;
        },
        { ...state }
      );
    }

    case actionTypes.INCREMENT_QUANTITY_CART: {
      const { id, step } = action.payload;

      const quantityByItemId = {
        ...state.quantityByItemId,
        [id]: state.quantityByItemId[id] + step
      };

      return { ...state, quantityByItemId };
    }

    case actionTypes.DECREMENT_QUANTITY_CART: {
      const { id, step } = action.payload;

      const quantityByItemId = {
        ...state.quantityByItemId,
        [id]: Math.max(state.quantityByItemId[id] - step, 0)
      };

      return { ...state, quantityByItemId };
    }

    default:
      return state;
  }
}
