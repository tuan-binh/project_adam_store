import { GET_ALL_PRODUCT } from "../api/service/productService";
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    status: "",
    products: [],
    totalPages: 1,
    size: 1,
    current: 1,
  },
  reducers: {
    addNewProduct: (state, action) => {
      if (state.products.length === state.size) {
        if (state.current === 1) {
          state.products.unshift(action.payload);
          state.products.pop();
        }
      } else {
        state.products.unshift(action.payload);
      }
    },
    updateProduct: (state, action) => {
      state.coupons = state.coupons.map((item) => {
        if (item.id === action.payload.id) {
          return (item = action.payload);
        } else {
          return item;
        }
      });
    },
    changeCurrentPage: (state, action) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_ALL_PRODUCT.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GET_ALL_PRODUCT.fulfilled, (state, action) => {
        state.status = "";
        state.products = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.size = action.payload.size;
        state.current = action.payload.number;
      });
  },
});

export const { changeCurrentPage, addNewProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
