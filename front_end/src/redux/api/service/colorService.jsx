import { configHeader } from "../../../utils/configHeader";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const GET_ALL_COLOR = createAsyncThunk(
  "color/GET_ALL_COLOR",
  async (search) => {
    let response = await instance.get(`/api/color/?search=${search}`);
    return response.data;
  }
);

export const POST_ADD_COLOR = async (formColor) => {
  let response = await instance.post(`/api/color`, formColor, configHeader);
  return response;
};

export const PUT_UPDATE_COLOR = async ({ formColor, id }) => {
  let response = await instance.put(
    `/api/color/${id}`,
    formColor,
    configHeader
  );
  return response;
};

export const PUT_STATUS_COLOR = async (id) => {
  let response = await instance.put(
    `/api/color/${id}/status`,
    {},
    configHeader
  );
  return response;
};
