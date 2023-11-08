import authSlice from "./reducers/authSlice";
import categorySlice from "./reducers/categorySlice";
import { configureStore } from "@reduxjs/toolkit";
import couponSlice from "./reducers/couponSlice";
import productSlice from "./reducers/productSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    coupon: couponSlice,
    product: productSlice,
  },
});

export default store;
