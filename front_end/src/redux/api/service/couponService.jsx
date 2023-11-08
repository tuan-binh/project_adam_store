import { configHeader } from "../../../utils/configHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const GET_ALL_COUPON = createAsyncThunk(
  "coupon/GET_ALL_COUPON",
  async (search) => {
    let response = await instance.get(`/api/coupon/?search=${search}`);
    return response.data;
  }
);

export const POST_ADD_COUPON = async (formCoupon) => {
  let response = await instance.post("/api/coupon", formCoupon, configHeader);
  return response;
};

export const PUT_UPDATE_COUPON = async ({ formCoupon, id }) => {
  let response = await instance.put(
    `/api/coupon/${id}`,
    formCoupon,
    configHeader
  );
  return response;
};

export const PUT_STATUS_COUPON = async (id) => {
  let response = await instance.put(
    `/api/coupon/${id}/status`,
    {},
    configHeader
  );
  return response;
};
