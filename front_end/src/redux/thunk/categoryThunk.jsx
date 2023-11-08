import {
  POST_ADD_CATEGORY,
  PUT_STATUS_CATEGORY,
  PUT_UPDATE_CATEGORY,
} from "../api/service/categoryService";
import { addNewCategory, updateCategory } from "../reducers/categorySlice";

export const post_add_category = (formCategory) => {
  return async function post_add_category_thunk(dispatch) {
    let response = await POST_ADD_CATEGORY(formCategory);
    if (response.status === 201) {
      dispatch(addNewCategory(response.data));
      return true;
    } else {
      return response.data;
    }
  };
};

export const put_update_category = ({ formCategory, id }) => {
  return async function put_update_category_thunk(dispatch) {
    let response = await PUT_UPDATE_CATEGORY({ formCategory, id });
    if (response.status === 200) {
      dispatch(updateCategory(response.data));
      return true;
    } else {
      return response.data;
    }
  };
};

export const put_status_category = (id) => {
  return async function put_status_category_thunk(dispatch) {
    let response = await PUT_STATUS_CATEGORY(id);
    if (response.status === 200) {
      dispatch(updateCategory(response.data));
      return true;
    } else {
      return response.data;
    }
  };
};
