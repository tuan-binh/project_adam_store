import { Cookies } from "react-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const GET_ALL_USER = createAsyncThunk(
  "userAdmin/GET_ALL_USER",
  async ({ search, page }) => {
    let resp = await instance.get(
      `/api/admin/users/?page=${page}&search=${search}`,
      {
        headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
      }
    );
    return resp.data;
  }
);

export const PUT_STATUS_USER = async (id) => {
  let resp = await instance.put(
    `/api/admin/user/${id}/status`,
    {},
    { headers: { Authorization: `Bearer ${new Cookies().get("token")}` } }
  );
  return resp;
};
