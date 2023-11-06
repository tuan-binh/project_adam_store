import instance from "../axios";

export const POST_LOGIN = async (formLogin) => {
  let response = await instance.post("/auth/login", formLogin);
  return response;
};

export const POST_REGISTER = async (formRegister) => {
  let response = await instance.post("/auth/register", formRegister);
  return response;
};
