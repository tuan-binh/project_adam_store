import {
  DELETE_CARTITEM,
  DELETE_CLEAR_CART,
  DELETE_PRODUCT_IN_FAVOURITE,
  GET_CART_USER,
  POST_ADD_PRODUCT_DETAIL_TO_CART,
  POST_ADD_PRODUCT_TO_FAVOURITE,
  PUT_CHANGE_PASSWORD_USER,
  PUT_CHANGE_QUANTITY_CARTITEM,
  PUT_UPDATE_INFO_USER,
} from "../api/service/userService";
import {
  addCartItem,
  addProductIdToFavourite,
  changeQuantity,
  clearCart,
  removeCartItem,
  removeProductIdInFavourite,
  setCart,
  setUserLogin,
} from "../reducers/userSlice";

export const post_add_product_to_favourite = (idProduct) => {
  return async function post_add_product_to_favourite_thunk(dispatch) {
    let resp = await POST_ADD_PRODUCT_TO_FAVOURITE(idProduct);
    if (resp.status === 201) {
      dispatch(addProductIdToFavourite(idProduct));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const delete_product_in_favourite = (idProduct) => {
  return async function delete_product_in_favourite_thunk(dispatch) {
    let resp = await DELETE_PRODUCT_IN_FAVOURITE(idProduct);
    if (resp.status === 200) {
      dispatch(removeProductIdInFavourite(idProduct));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const get_cart_user = () => {
  return async function get_cart_user_thunk(dispatch) {
    let resp = await GET_CART_USER();
    if (resp.status === 200) {
      dispatch(setCart(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const post_add_product_detail_to_cart = (idProductDetail) => {
  return async function post_add_product_detail_to_cart_thunk(dispatch) {
    let resp = await POST_ADD_PRODUCT_DETAIL_TO_CART(idProductDetail);
    if (resp.status === 201) {
      dispatch(addCartItem(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_change_quantity_cartItem = ({ idCartItem, quantity }) => {
  return async function put_change_quantity_cartItem_thunk(dispatch) {
    let resp = await PUT_CHANGE_QUANTITY_CARTITEM({ idCartItem, quantity });
    if (resp.status === 200) {
      dispatch(changeQuantity(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const delete_cartItem = (idCartItem) => {
  return async function delete_cartItem_thunk(dispatch) {
    let resp = await DELETE_CARTITEM(idCartItem);
    if (resp.status === 200) {
      dispatch(removeCartItem(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const delete_clear_all = () => {
  return async function delete_clear_all_thunk(dispatch) {
    let resp = await DELETE_CLEAR_CART();
    if (resp.status === 200) {
      dispatch(clearCart());
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_update_info_user = (formUpdate) => {
  return async function put_update_info_user_thunk(dispatch) {
    let resp = await PUT_UPDATE_INFO_USER(formUpdate);
    if (resp.status === 200) {
      const oldUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...oldUser, ...resp.data })
      );
      dispatch(setUserLogin(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_change_password_user = (formPassword) => {
  return async function put_change_password_user_thunk() {
    let resp = await PUT_CHANGE_PASSWORD_USER(formPassword);
    if (resp.status === 200) {
      return true;
    } else {
      return resp.data;
    }
  };
};
