export const actionTypes = {
  CHANGE_CURRENCY: "CHANGE_CURRENCY",
  TOGGLE_NIGHT_MODE: "TOGGLE_NIGHT_MODE",

  ADD_TOAST: "ADD_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",

  HYDRATE: "HYDRATE"
};

export function changeCurrency(currency) {
  return {
    type: actionTypes.CHANGE_CURRENCY,
    payload: {
      currency,
      toast: {
        status: "info",
        title: "Currency changed!",
        description: `You are viewing the prices in ${currency.label} now.`,
        isClosable: true,
        duration: 9000,
        position: "bottom-right"
      }
    }
  };
}

export function toggleNightMode() {
  return {
    type: actionTypes.TOGGLE_NIGHT_MODE
  };
}

export function addToast(toast) {
  return {
    type: actionTypes.ADD_TOAST,
    payload: { toast }
  };
}

export function removeToast(toastId = null) {
  return { type: actionTypes.REMOVE_TOAST, payload: { toastId } };
}
