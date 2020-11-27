import { isEmpty } from "lodash";

let throttled = {};

const throttleAction = ({ getState, dispatch }) => next => action => {
  const time = action?.throttle;
  const id = action?.id;

  if (!time) {
    return next(action);
  }

  const {
    [action.type]: existingActionType = {},
    ...restRequestTypes
  } = throttled;
  const { [id]: existingId, ...restRequests } = existingActionType;

  if (existingId) return;

  throttled[action.type] = throttled[action.type] || {};
  throttled[action.type][id] = true;

  setTimeout(() => {
    if (isEmpty(restRequests)) {
      throttled = restRequestTypes;
    } else {
      throttled[action.type] = restRequests;
    }
  }, time);

  next(action);
};

export default throttleAction;
