import { Cookies } from "react-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const GET_ALL_SIZE = createAsyncThunk(
  "size/GET_ALL_SIZE",
  async (search) => {
    let resp = instance.get(`/api/size/?search=${search}`);
    return (await resp).data;
  }
);

export const POST_ADD_SIZE = async (formSize) => {
  let resp = await instance.post("/api/size", formSize, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const PUT_UPDATE_SIZE = async ({ formSize, id }) => {
  let resp = await instance.put(`/api/size/${id}`, formSize, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const PUT_STATUS_SIZE = async (id) => {
  let resp = await instance.put(
    `/api/size/${id}/status`,
    {},
    {
      headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
    }
  );
  return resp;
};
