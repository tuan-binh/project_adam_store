import { GET_ALL_SIZE } from "../api/service/sizeService";
import { createSlice } from "@reduxjs/toolkit";

const sizeSlice = createSlice({
  name: "size",
  initialState: { status: "", sizes: [] },
  reducers: {
    addNewSize: (state, action) => {
      state.sizes.push(action.payload);
    },
    updateSize: (state, action) => {
      state.sizes = state.sizes.map((item) => {
        if (item.id === action.payload.id) {
          return (item = action.payload);
        } else {
          return item;
        }
      });
    },
    enableEditItem: (state, action) => {
      state.sizes = state.sizes.map((item) => {
        if (item.id === action.payload) {
          item.isEdit = true;
          return item;
        } else {
          item.isEdit = false;
          return item;
        }
      });
    },
    disabledEditItem: (state) => {
      state.sizes = state.sizes.map((item) => {
        item.isEdit = false;
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_ALL_SIZE.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GET_ALL_SIZE.fulfilled, (state, action) => {
        state.status = "";
        state.sizes = action.payload.map((item) => ({
          ...item,
          isEdit: false,
        }));
      });
  },
});

export const { addNewSize, updateSize, enableEditItem, disabledEditItem } =
  sizeSlice.actions;
export default sizeSlice.reducer;
