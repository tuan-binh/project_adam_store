import {
  PUT_CANCEL_ORDER,
  PUT_CHECK_OUT_USER,
} from "../api/service/orderUserService";

import { updateOrderUser } from "../reducers/orderUserSlice";

export const put_check_out_user = (formCheckout) => {
  return async function put_check_out_user_thunk() {
    let resp = await PUT_CHECK_OUT_USER(formCheckout);
    if (resp.status === 200) {
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_cancel_order = (id) => {
  return async function put_cancel_order_thunk(dispatch) {
    let resp = await PUT_CANCEL_ORDER(id);
    if (resp.status === 200) {
      dispatch(updateOrderUser(resp.data));
    } else {
      return resp.data;
    }
  };
};
