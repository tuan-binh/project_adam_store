import {
  PUT_DELIVERY_ORDER,
  PUT_SUCCESS_ORDER,
} from "../api/service/orderAdminService";

import { updateOrderAdmin } from "../reducers/orderAdminSlice";

export const put_delivery_order = (id) => {
  return async function put_delivery_order_thunk(dispatch) {
    let resp = await PUT_DELIVERY_ORDER(id);
    if (resp.status === 200) {
      dispatch(updateOrderAdmin(resp.data));
    } else {
      return resp.data;
    }
  };
};

export const put_success_order = (id) => {
  return async function put_success_order_thunk(dispatch) {
    let resp = await PUT_SUCCESS_ORDER(id);
    if (resp.status === 200) {
      dispatch(updateOrderAdmin(resp.data));
    } else {
      return resp.data;
    }
  };
};
