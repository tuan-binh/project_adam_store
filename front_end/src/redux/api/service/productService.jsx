import { Cookies } from "react-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../axios";

const configHeader = {
  headers: {
    Authorization: `Bearer ${new Cookies().get("token")}`,
  },
};

export const GET_ALL_PRODUCT = createAsyncThunk(
  "product/GET_ALL_PRODUCT",
  async ({ search, category, page }) => {
    let response = await instance.get(
      `/api/products/?category=${category}&page=${page}&search=${search}`
    );
    return response.data;
  }
);

export const POST_ADD_PRODUCT = async (formProduct) => {
  let resp = await instance.post(`/api/products`, formProduct, configHeader);
  return resp;
};

export const PUT_UPDATE_PRODUCT = async ({ formProduct, id }) => {
  let resp = await instance.put(
    `/api/products/${id}`,
    formProduct,
    configHeader
  );
  return resp;
};

export const PUT_STATUS_PRODUCT = async (id) => {
  let resp = await instance.put(`/api/products/${id}/status`, {}, configHeader);
  return resp;
};

export const PUT_ADD_IMAGE_PRODUCT = async ({ formImageProduct, id }) => {
  let resp = await instance.put(
    `/api/products/${id}/image`,
    formImageProduct,
    configHeader
  );
  return resp;
};

export const DELETE_IMAGE_PRODUCT = async ({ idImage, idProduct }) => {
  let resp = await instance.delete(
    `/api/products/${idImage}/in/${idProduct}`,
    configHeader
  );
  return resp;
};

export const POST_ADD_PRODUCT_DETAIL = async ({
  formProductDetail,
  idProduct,
}) => {
  let resp = await instance.post(
    `/api/products/${idProduct}`,
    formProductDetail,
    configHeader
  );
  return resp;
};

export const PUT_UPDATE_PRODUCT_DETAIL = async ({
  formProductDetail,
  idProductDetail,
  idProduct,
}) => {
  let resp = await instance.put(
    `/api/products/${idProductDetail}/in/${idProduct}`,
    formProductDetail,
    configHeader
  );
  return resp;
};

export const PUT_STATUS_PRODUCT_DETAIL = async ({
  idProductDetail,
  idProduct,
}) => {
  let resp = await instance.put(
    `/api/products/${idProductDetail}/in/${idProduct}/status`,
    {},
    configHeader
  );
  return resp;
};
