import { Cookies } from "react-cookie";
import instance from "../axios";

export const GET_RESULT_DASHBOARD = async () => {
  let resp = await instance.get(`/api/dashboard/result`, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};
