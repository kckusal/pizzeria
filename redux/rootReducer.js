import { actionTypes } from "./actions";
import { HYDRATE } from "next-redux-wrapper";

export const initialState = {
  nightMode: false,
  currency: {
    name: "USD",
    label: "United States Dollar",
    prefix: "$",
    suffix: ""
  },
  placeholderImageUrl: "https://via.placeholder.com/150",
  toasts: []
};

function rootReducer(state, action) {
  const newToast = action.payload?.toast;

  if (newToast) {
    state = { ...state, toasts: [newToast, ...state.toasts] };
  }

  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    case actionTypes.TOGGLE_NIGHT_MODE:
      return { ...state, nightMode: !state.nightMode };

    case actionTypes.CHANGE_CURRENCY:
      return { ...state, currency: action.payload.currency };

    case actionTypes.ADD_TOAST:
      return { ...state, toasts: [...state.toasts, action.payload.toast] };

    case actionTypes.REMOVE_TOAST:
      const toastId = action.payload.toastId;
      return {
        ...state,
        toasts: toastId
          ? state.toasts.filter(toast => toast.id !== toastId)
          : []
      };

    default:
      return state;
  }
}

export default rootReducer;
