import { Cookies } from "react-cookie";
import instance from "../axios";

export const POST_ADD_PRODUCT_TO_FAVOURITE = async (idProduct) => {
  let resp = await instance.post(
    `/api/favourite/${idProduct}`,
    {},
    { headers: { Authorization: `Bearer ${new Cookies().get("token")}` } }
  );
  return resp;
};

export const DELETE_PRODUCT_IN_FAVOURITE = async (idProduct) => {
  let resp = await instance.delete(`/api/favourite/${idProduct}`, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const GET_CART_USER = async () => {
  let resp = await instance.get("/api/user/cart", {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const POST_ADD_PRODUCT_DETAIL_TO_CART = async (idProductDetail) => {
  let resp = await instance.post(
    `/api/cart/${idProductDetail}`,
    {},
    { headers: { Authorization: `Bearer ${new Cookies().get("token")}` } }
  );
  return resp;
};

export const PUT_CHANGE_QUANTITY_CARTITEM = async ({
  idCartItem,
  quantity,
}) => {
  let formData = new FormData();
  formData.append("quantity", quantity);
  let resp = await instance.put(`/api/cart/${idCartItem}`, formData, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const DELETE_CARTITEM = async (idCartItem) => {
  let resp = await instance.delete(`/api/cart/${idCartItem}`, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const DELETE_CLEAR_CART = async () => {
  let resp = await instance.delete("/api/cart", {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const PUT_UPDATE_INFO_USER = async (formUpdate) => {
  let resp = await instance.put("/api/user/update", formUpdate, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const PUT_CHANGE_PASSWORD_USER = async (formPassword) => {
  let resp = await instance.put("/api/user/password", formPassword, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};
