import { POST_LOGIN, POST_REGISTER } from "../api/service/authService";
import { resetUser, setUser } from "../reducers/AuthSlice";

import { Cookies } from "react-cookie";

export const post_login = (formLogin) => {
  return async (dispatch) => {
    let response = await POST_LOGIN(formLogin);
    console.log(response);
    if (response.status === 200) {
      const data = response.data;
      const cookie = new Cookies();
      cookie.set("token", data.token, { path: "/" });
      cookie.set("roles", JSON.stringify(data.roles), { path: "/" });
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
      return true;
    } else {
      console.log("response -> ", response.data);
      return response.data;
    }
  };
};

export const post_register = (formRegister) => {
  return async () => {
    let response = await POST_REGISTER(formRegister);
    if (response.status === 201) {
      return true;
    } else {
      return response.data;
    }
  };
};

export const handle_logout = () => {
  return async (dispatch) => {
    const cookie = new Cookies();
    cookie.remove("token", { path: "/" });
    cookie.remove("roles", { path: "/" });
    localStorage.removeItem("user");
    dispatch(resetUser());
  };
};
