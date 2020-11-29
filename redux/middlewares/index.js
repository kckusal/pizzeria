import { applyMiddleware } from "redux";

import throttleAction from "./throttle";

let middlewares = [throttleAction];

if (process.env.NODE_ENV !== "production") {
  const { createLogger } = require("redux-logger");
  middlewares = [...middlewares, createLogger()];
} else {
  // example below
  /*
  let e = require('something-for-prod');
  let f = require('something-for-prod-2');
  middlewares = [...middlewares, e, f];
  */
}

export const onStoreCreated = (
  store,
  options = { savedToLocalStorage: false, isServer: false }
) => {
  const env = options.isServer ? "Server" : "Client";
  console.info(`[${env}]: Store created.`);
};

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");

    const composeEnhancers = composeWithDevTools({
      // Specify name here, actionsBlacklist, actionsCreators and other options if needed
      trace: true
    });

    return composeEnhancers(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export default bindMiddleware(middlewares);
