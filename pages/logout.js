import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { logoutSucceeded } from "redux/actions";

function Logout() {
  const dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    dispatch(
      logoutSucceeded({
        status: "info",
        title: "Logged out!",
        description: `You are viewing as a guest user now.`
      })
    );

    push("/login");
  }, []);

  return null;
}

export default Logout;
