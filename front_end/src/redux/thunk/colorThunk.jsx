import {
  POST_ADD_COLOR,
  PUT_STATUS_COLOR,
  PUT_UPDATE_COLOR,
} from "../api/service/colorService";
import { addNewColor, updateColor } from "../reducers/colorSlice";

export const post_add_color = (formColor) => {
  return async function post_add_color_thunk(dispatch) {
    let resp = await POST_ADD_COLOR(formColor);
    if (resp.status === 201) {
      dispatch(addNewColor(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_update_color = ({ formColor, id }) => {
  return async function put_update_color_thunk(dispatch) {
    let resp = await PUT_UPDATE_COLOR({ formColor, id });
    if (resp.status === 200) {
      dispatch(updateColor(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_status_color = (id) => {
  return async function put_status_color_thunk(dispatch) {
    let resp = await PUT_STATUS_COLOR(id);
    if (resp.status === 200) {
      dispatch(updateColor(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};
