import {
  POST_ADD_COUPON,
  PUT_STATUS_COUPON,
  PUT_UPDATE_COUPON,
} from "../api/service/couponService";
import { addNewCoupon, updateCoupon } from "../reducers/couponSlice";

export const post_add_coupon = (formCoupon) => {
  return async function post_add_coupon_thunk(dispatch) {
    let response = await POST_ADD_COUPON(formCoupon);
    if (response.status === 201) {
      dispatch(addNewCoupon(response.data));
      return true;
    } else {
      return response.data;
    }
  };
};

export const put_update_coupon = ({ formCoupon, id }) => {
  return async function put_update_coupon_thunk(dispatch) {
    let response = await PUT_UPDATE_COUPON({ formCoupon, id });
    if (response.status === 200) {
      dispatch(updateCoupon(response.data));
      return true;
    } else {
      return response.data;
    }
  };
};

export const put_status_coupon = (id) => {
  return async function put_status_coupon_thunk(dispatch) {
    let response = await PUT_STATUS_COUPON(id);
    if (response.status === 200) {
      dispatch(updateCoupon(response.data));
      return true;
    } else {
      return response.data;
    }
  };
};
