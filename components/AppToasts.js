import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createStandaloneToast } from "@chakra-ui/react";

import { removeToast } from "redux/actions";

export default function AppToasts() {
  const dispatch = useDispatch();
  const toast = createStandaloneToast();

  const toasts = useSelector(state => state.app.toasts);

  useEffect(() => {
    if (toasts.length > 0) {
      toast(toasts[0]);
      dispatch(removeToast());
    }
  }, [toasts]);

  return null;
}
