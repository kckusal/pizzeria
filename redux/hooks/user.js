import { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  loginRequested,
  loginSucceeded,
  loginFailed,
  registerRequested,
  registerSucceeded,
  registerFailed
} from "redux/actions";
import { postData } from "utils/";

function useUser() {
  const dispatch = useDispatch();

  const authenticated = useSelector(state => state.user.authenticated !== null);
  const authInProgress = useSelector(state => state.user.loading);

  const data = useSelector(state =>
    state.user.authenticated === null
      ? state.user.guest || {}
      : state.user.authenticated || {}
  );

  const login = useCallback((email, password) => {
    dispatch(loginRequested());

    return postData(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      email,
      password
    })
      .then(response => {
        console.log("DATA", response);

        if (response.status === 200) {
          dispatch(
            loginSucceeded(response.data.user, {
              status: "success",
              title: "Login successful.",
              description: "Redirecting to today's menu..."
            })
          );
        } else {
          throw new Error(
            response.data?.message || "Some error occurred. Try later!"
          );
        }
      })
      .catch(err => {
        console.log("Login ERR: ", err);

        dispatch(
          loginFailed({
            status: "error",
            title: "Login Failed",
            description:
              err.response?.data ||
              err?.message ||
              "Some error occurred. Try later!"
          })
        );
      });
  });

  const register = useCallback(userData => {
    dispatch(registerRequested());

    return postData(`${process.env.NEXT_PUBLIC_API_URL}/register`, userData)
      .then(response => {
        console.log("Register Response", response);

        if (response.status === 200) {
          const { _id, message } = response.data;

          dispatch(
            registerSucceeded(
              { _id, ...userData },
              {
                status: "success",
                title: "Registration successful.",
                description: "Redirecting to today's menu..."
              }
            )
          );
        } else {
          throw new Error(
            response.data?.message || "Some error occurred. Try later!"
          );
        }
      })
      .catch(err => {
        console.log("Register ERR: ", err);

        dispatch(
          registerFailed({
            status: "error",
            title: "Register Failed",
            description:
              err.response?.data ||
              err?.message ||
              "Some error occurred. Try later!"
          })
        );
      });
  });

  return {
    authenticated,
    data,
    login,
    authInProgress,
    register
  };
}

export default useUser;
