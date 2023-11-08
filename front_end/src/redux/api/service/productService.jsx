import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

export const GET_ALL_PRODUCT = createAsyncThunk(
  "product/GET_ALL_PRODUCT",
  async ({ search, category, page }) => {
    let response = await instance.get(
      `/api/products/?category=${category}&page=${page}&search=${search}`
    );
    return response.data;
  }
);
