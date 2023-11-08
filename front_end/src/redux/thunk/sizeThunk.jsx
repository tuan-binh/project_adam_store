import {
  POST_ADD_SIZE,
  PUT_STATUS_SIZE,
  PUT_UPDATE_SIZE,
} from "../api/service/sizeService";
import { addNewSize, updateSize } from "../reducers/sizeSlice";

export const post_add_size = (formSize) => {
  return async function post_add_size_thunk(dispatch) {
    let resp = await POST_ADD_SIZE(formSize);
    if (resp.status === 201) {
      dispatch(addNewSize(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_update_size = ({ formSize, id }) => {
  return async function put_update_size_thunk(dispatch) {
    let resp = await PUT_UPDATE_SIZE({ formSize, id });
    if (resp.status === 200) {
      dispatch(updateSize(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};

export const put_status_size = (id) => {
  return async function put_status_size_thunk(dispatch) {
    let resp = await PUT_STATUS_SIZE(id);
    if (resp.status === 200) {
      dispatch(updateSize(resp.data));
      return true;
    } else {
      return resp.data;
    }
  };
};
