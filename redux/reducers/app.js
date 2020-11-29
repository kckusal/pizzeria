import { actionTypes } from "../actions";

const initialState = {
  darkMode: false,

  currency: {
    currentCode: null,
    allCodes: ["usd", "eur", "rub"],
    optionsByCode: {
      usd: {
        label: "US Dollar",
        symbol: "$",
        prefix: "$",
        suffix: "",
        ratePerDollar: 1
      },
      eur: {
        label: "Euro",
        symbol: "€",
        prefix: "€",
        suffix: "",
        ratePerDollar: 0.84
      },
      rub: {
        label: "Ruble",
        symbol: "₽",
        prefix: "",
        suffix: "руб",
        ratePerDollar: 76.08
      }
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

    case actionTypes.LOAD_MENU: {
      const items = action.payload.items;

      if (!state.currency.currentCode && items.length > 0) {
        return {
          ...state,
          currency: { ...state.currency, currentCode: items[0].currencyCode }
        };
      }

      return state;
    }

    default:
      return state;
  }
}
