/** TYPES */
export const actionTypes = {
  HYDRATE: "HYDRATE",

  CHANGE_CURRENCY: "CHANGE_CURRENCY",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",

  ADD_TOAST: "ADD_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",

  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",

  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",

  SAVE_CART_REQUEST: "SAVE_CART_REQUEST",
  SAVE_CART_SUCCESS: "SAVE_CART_SUCCESS",
  SAVE_CART_FAILURE: "SAVE_CART_FAILURE",

  LOAD_MENU_REQUEST: "LOAD_MENU_REQUEST",
  LOAD_MENU_SUCCESS: "LOAD_MENU_SUCCESS",
  LOAD_MENU_FAILURE: "LOAD_MENU_FAILURE",

  CHECKOUT_SUCCESS: "CHECKOUT_SUCCESS",
  CHECKOUT_FAILURE: "CHECKOUT_FAILURE"
};

/** ACTION CREATORS */

export function changeCurrency(code) {
  return {
    type: actionTypes.CHANGE_CURRENCY,
    payload: {
      code,
      toast: {
        status: "info",
        title: "Currency changed!",
        description: `You are viewing the prices in ${code.toUpperCase()} now.`
      }
    }
  };
}

export function toggleNightMode() {
  return {
    type: actionTypes.TOGGLE_DARK_MODE
  };
}

export function addToast(toast) {
  return {
    type: actionTypes.ADD_TOAST,
    payload: {
      toast
    }
  };
}

export function removeToast(toastId = null) {
  return { type: actionTypes.REMOVE_TOAST, payload: { id: toastId } };
}

export function loginRequested() {
  return { type: actionTypes.LOGIN_REQUEST };
}

export function loginSucceeded(user = null, toast) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      user,
      toast
    }
  };
}

export function loginFailed(toast) {
  return { type: actionTypes.LOGIN_FAILURE, payload: { toast } };
}

export function logoutSucceeded(toast) {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
    payload: {
      toast
    }
  };
}

export function registerRequested() {
  return { type: actionTypes.REGISTER_REQUEST };
}

export function registerSucceeded(user, toast) {
  return { type: actionTypes.REGISTER_SUCCESS, payload: { user, toast } };
}

export function registerFailed(toast) {
  return { type: actionTypes.REGISTER_FAILURE, payload: { toast } };
}

export function saveCartSucceeded(cart, toast) {
  return {
    type: actionTypes.SAVE_CART_SUCCESS,
    payload: {
      cart,
      toast
    }
  };
}

export function saveCartFailed(toast) {
  return {
    type: actionTypes.SAVE_CART_FAILURE,
    payload: {
      toast
    }
  };
}

export function loadMenuSucceeded(items = []) {
  return { type: actionTypes.LOAD_MENU_SUCCESS, payload: { items } };
}

export function checkoutSucceeded(order, toast) {
  return {
    type: actionTypes.CHECKOUT_SUCCESS,
    payload: { order, toast }
  };
}

export function checkoutFailed(toast) {
  return {
    type: actionTypes.CHECKOUT_FAILURE,
    payload: { toast }
  };
}
