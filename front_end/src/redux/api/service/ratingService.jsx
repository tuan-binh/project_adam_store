import { Cookies } from "react-cookie";
import instance from "../axios";

export const POST_ADD_RATING_ORDER = async ({ formRating, idOrder }) => {
  let resp = await instance.post(`/api/rating/${idOrder}`, formRating, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};
