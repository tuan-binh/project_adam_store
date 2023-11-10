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
    updateProduct: (state, action) => {
      state.products = state.products.map((item) => {
        if (item.id === action.payload.id) {
          return (item = action.payload);
        } else {
          return item;
        }
      });
    },
    changeCurrentPage: (state, action) => {
      console.log(action.payload);
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
        state.current = action.payload.number + 1;
      });
  },
});

export const { changeCurrentPage, updateProduct } = productSlice.actions;
export default productSlice.reducer;
