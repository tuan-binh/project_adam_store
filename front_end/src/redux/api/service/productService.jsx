import { Cookies } from "react-cookie";
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

export const POST_ADD_PRODUCT = async (formProduct) => {
  let resp = await instance.post(`/api/products`, formProduct, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const PUT_UPDATE_PRODUCT = async ({ formProduct, id }) => {
  let resp = await instance.put(`/api/products/${id}`, formProduct, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const PUT_STATUS_PRODUCT = async (id) => {
  let resp = await instance.put(
    `/api/products/${id}/status`,
    {},
    {
      headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
    }
  );
  return resp;
};

export const PUT_ADD_IMAGE_PRODUCT = async ({ formImageProduct, id }) => {
  let resp = await instance.put(`/api/products/${id}/image`, formImageProduct, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const DELETE_IMAGE_PRODUCT = async ({ idImage, idProduct }) => {
  let resp = await instance.delete(`/api/products/${idImage}/in/${idProduct}`, {
    headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
  });
  return resp;
};

export const POST_ADD_PRODUCT_DETAIL = async ({
  formProductDetail,
  idProduct,
}) => {
  let resp = await instance.post(
    `/api/products/${idProduct}`,
    formProductDetail,
    {
      headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
    }
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
    {
      headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
    }
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
    {
      headers: { Authorization: `Bearer ${new Cookies().get("token")}` },
    }
  );
  return resp;
};
