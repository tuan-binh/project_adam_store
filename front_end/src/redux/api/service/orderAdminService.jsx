import { Cookies } from "react-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const GET_ALL_ORDER_ADMIN = createAsyncThunk(
  "orderAdmin/GET_ALL_ORDER_ADMIN",
  async ({ orderStatus, search, page }) => {
    let resp = await instance.get(
      `/api/order/admin/?orderStatus=${orderStatus}&page=${page}&search=${search}`,
      { headers: { Authorization: `Bearer ${new Cookies().get("token")}` } }
    );
    return resp.data;
  }
);

export const PUT_DELIVERY_ORDER = async (id) => {
  let resp = await instance.put(
    `/api/order/${id}/delivery`,
    {},
    { headers: { Authorization: `Bearer ${new Cookies().get("token")}` } }
  );
  return resp;
};

export const PUT_SUCCESS_ORDER = async (id) => {
  let resp = await instance.put(
    `/api/order/${id}/success`,
    {},
    { headers: { Authorization: `Bearer ${new Cookies().get("token")}` } }
  );
  return resp;
};
