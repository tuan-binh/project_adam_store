import authSlice from "./reducers/authSlice";
import categorySlice from "./reducers/categorySlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
  },
});

export default store;
