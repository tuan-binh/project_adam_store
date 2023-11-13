import { Cookies } from "react-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const GET_ALL_CATEGORY = createAsyncThunk(
  "category/GET_ALL_CATEGORY",
  async (search) => {
    let response = await instance.get(`/api/categories/?search=${search}`);
    return response.data;
  }
);

export const POST_ADD_CATEGORY = async (formCategory) => {
  let response = await instance.post("/api/categories", formCategory, {
    headers: {
      Authorization: `Bearer ${new Cookies().get("token")}`,
    },
  });
  return response;
};

export const PUT_UPDATE_CATEGORY = async ({ formCategory, id }) => {
  let response = await instance.put(`/api/categories/${id}`, formCategory, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return response;
};

export const PUT_STATUS_CATEGORY = async (id) => {
  let response = await instance.put(
    `/api/categories/${id}/status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${new Cookies().get("token")}`,
      },
    }
  );
  return response;
};
