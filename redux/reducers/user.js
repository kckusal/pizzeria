import { createReducer } from "../utils/reducer";

const initialState = {
  loading: false,
  guest: {
    firstName: "Guest",
    lastName: "User",
    email: "",
    address: "",
    cart: {}
  },
  authenticated: null
};

const reducer = actionTypes => ({
  [actionTypes.LOGIN_REQUEST]: (state, action) => {
    state.loading = true;
  },

  [actionTypes.LOGIN_SUCCESS]: (state, action) => {
    state.loading = false;
    state.authenticated = action.payload.user;
  },

  [actionTypes.LOGIN_FAILURE]: (state, action) => {
    state.loading = false;
    state.authenticated = null;
  },

  [actionTypes.LOGOUT_SUCCESS]: (state, action) => {
    state.loading = false;
    state.authenticated = null;
  },

  [actionTypes.REGISTER_REQUEST]: (state, action) => {
    state.loading = true;
  },

  [actionTypes.REGISTER_SUCCESS]: (state, action) => {
    state.loading = false;
    state.authenticated = action.payload.user;
  },

  [actionTypes.REGISTER_FAILURE]: (state, action) => {
    state.loading = false;
    state.authenticated = null;
  },

  [actionTypes.SAVE_CART_SUCCESS]: (state, action) => {
    const { cart } = action.payload;

    if (state.authenticated) {
      state.authenticated.cart = cart;
    } else {
      state.guest.cart = cart;
    }
  },

  [actionTypes.CHECKOUT_SUCCESS]: (state, action) => {
    const { order } = action.payload;

    if (state.authenticated) {
      state.authenticated.cart = {};
      if (!state.authenticated.orders) {
        state.authenticated.orders = [order];
      } else {
        state.authenticated.orders.push(order);
      }
    } else {
      state.guest.cart = {};
    }
  }
});

export default createReducer(reducer, initialState);
