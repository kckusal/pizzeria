import produce from "immer";

import { actionTypes } from "../actions";

// creates a high-level reducer wrapped with Immer allowing Immutability within reduce functions
export const createReducer = (
  actionReduceFunction,
  initialState,
  useImmer = true
) => {
  const actionReduceObject = actionReduceFunction(actionTypes);
  let result;

  if (useImmer) {
    result = produce((draftState, action) => {
      const reduceFunction = actionReduceObject[action.type];
      if (reduceFunction) reduceFunction(draftState, action);
      // since none of the action type is matched
    }, initialState);
  } else {
    result = (state = initialState, action) => {
      const reduceFunction = actionReduceObject[action.type];
      return reduceFunction ? reduceFunction(state, action) : state;
    };
  }

  return result;
};
