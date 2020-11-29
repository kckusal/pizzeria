import { actionTypes } from "../actions";

const initialState = {
  authenticated: false,
  data: {
    name: "",
    email: "",
    phone: "",
    address: ""
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_REQUESTED:
      return {
        ...state,
        authenticated: null
      };

    case actionTypes.LOGIN_SUCCESSFUL:
      return {
        authenticated: true,
        data: action.payload.user || initialState.data
      };

    case actionTypes.LOGOUT_SUCCESSFUL:
      return initialState;

    default:
      return state;
  }
}
