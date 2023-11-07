import { GET_ALL_CATEGORY } from "../api/service/categoryService";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: { status: "", categories: [] },
  reducers: {
    addNewCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      state.categories = state.categories.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GET_ALL_CATEGORY.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(GET_ALL_CATEGORY.fulfilled, (state, action) => {
      state.status = "";
      state.categories = action.payload;
    });
  },
});

export const { addNewCategory, updateCategory } = categorySlice.actions;
export default categorySlice.reducer;
