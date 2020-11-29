import { actionTypes } from "../actions";

const initialState = {
  darkMode: false,

  currency: {
    currentCode: "usd",
    allCodes: ["usd", "eur"],
    optionsByCode: {
      usd: {
        label: "US Dollar",
        symbol: "$",
        prefix: "$",
        suffix: ""
      },
      eur: { label: "Euro", symbol: "€", prefix: "€", suffix: "" }
    }
  },

  toasts: []
};

export default function reducer(state = initialState, action) {
  const newToast = action.payload?.toast;

  if (newToast) {
    state = { ...state, toasts: [newToast, ...state.toasts] };
  }

  switch (action.type) {
    case actionTypes.TOGGLE_NIGHT_MODE:
      return { ...state, darkMode: !state.darkMode };

    case actionTypes.CHANGE_CURRENCY:
      return {
        ...state,
        currency: { ...state.currency, currentCode: action.payload.code }
      };

    case actionTypes.ADD_TOAST:
      return { ...state, toasts: [...state.toasts, action.payload.toast] };

    case actionTypes.REMOVE_TOAST: {
      const toastId = action.payload.id;
      return {
        ...state,
        toasts: toastId
          ? state.toasts.filter(toast => toast.id !== toastId)
          : []
      };
    }

    default:
      return state;
  }
}
