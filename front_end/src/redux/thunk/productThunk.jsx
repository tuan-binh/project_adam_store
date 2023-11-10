import {
  DELETE_IMAGE_PRODUCT,
  POST_ADD_PRODUCT,
  PUT_ADD_IMAGE_PRODUCT,
  PUT_STATUS_PRODUCT,
  PUT_UPDATE_PRODUCT,
} from "../api/service/productService";
import { changeCurrentPage, updateProduct } from "../reducers/productSlice";

export const post_add_product = (formProduct) => {
  return async function post_add_product_thunk(dispatch) {
    let resp = await POST_ADD_PRODUCT(formProduct);
    if (resp.status === 201) {
      dispatch(changeCurrentPage(1));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_update_product = ({ formProduct, id }) => {
  return async function put_update_product_thunk(dispatch) {
    let resp = await PUT_UPDATE_PRODUCT({ formProduct, id });
    if (resp.status === 200) {
      dispatch(updateProduct(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_status_product = (id) => {
  return async function put_status_product_thunk(dispatch) {
    let resp = await PUT_STATUS_PRODUCT(id);
    if (resp.status === 200) {
      dispatch(updateProduct(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_add_image_product = ({ formImageProduct, id }) => {
  return async function put_add_image_product_thunk(dispatch) {
    let resp = await PUT_ADD_IMAGE_PRODUCT({ formImageProduct, id });
    if (resp.status === 200) {
      dispatch(updateProduct(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const delete_image_product = ({ idImage, idProduct }) => {
  return async function delete_image_product_thunk(dispatch) {
    let resp = await DELETE_IMAGE_PRODUCT({ idImage, idProduct });
    if (resp.status === 200) {
      dispatch(updateProduct(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};
