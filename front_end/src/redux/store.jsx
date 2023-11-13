import authSlice from "./reducers/authSlice";
import categorySlice from "./reducers/categorySlice";
import colorSlice from "./reducers/colorSlice";
import { configureStore } from "@reduxjs/toolkit";
import couponSlice from "./reducers/couponSlice";
import orderAdminSlice from "./reducers/orderAdminSlice";
import orderUserSlice from "./reducers/orderUserSlice";
import productSlice from "./reducers/productSlice";
import sizeSlice from "./reducers/sizeSlice";
import userAdminSlice from "./reducers/userAdminSlice";
import userSlice from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    coupon: couponSlice,
    product: productSlice,
    color: colorSlice,
    size: sizeSlice,
    user: userSlice,
    orderUser: orderUserSlice,
    orderAdmin: orderAdminSlice,
    userAdmin: userAdminSlice,
  },
});

export default store;
