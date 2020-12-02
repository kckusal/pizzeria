import axios from "axios";

export function makeAxiosRequest(url, method, data) {
  return axios.request({
    method,
    headers: {
      "Content-Type": "application/json"
    },
    url,
    data
  });
}

// Example POST method implementation:
export async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export class HttpResponseError extends Error {
  constructor(statusCode = "500", message = "Internal Server Error", ...rest) {
    super(rest);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpResponseError);
    }

    // Custom debugging information
    this.code = statusCode;
    this.message = message;
    this.date = new Date();
  }
}
