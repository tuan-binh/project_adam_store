import { Cookies } from "react-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const GET_ALL_ORDER_USER = createAsyncThunk(
  "orderUser/GET_ALL_ORDER_USER",
  async ({ orderStatus, page }) => {
    let resp = await instance.get(
      `/api/user/orders/?orderStatus=${orderStatus}&page=${page}`,
      { headers: { Authorization: `Bearer ${new Cookies().get("token")}` } }
    );
    return resp.data;
  }
);

export const PUT_CHECK_OUT_USER = async (formCheckout) => {
  let resp = await instance.put("/api/order/checkout", formCheckout, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const PUT_CANCEL_ORDER = async (id) => {
  let resp = await instance.put(
    `/api/order/${id}/cancel`,
    {},
    {
      headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
    }
  );
  return resp;
};
