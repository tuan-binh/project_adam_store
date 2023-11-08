import { GET_ALL_COLOR } from "../api/service/colorService";
import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: { status: "", colors: [] },
  reducers: {
    addNewColor: (state, action) => {
      state.colors.push(action.payload);
    },
    updateColor: (state, action) => {
      state.colors = state.colors.map((item) => {
        if (item.id === action.payload.id) {
          return (item = action.payload);
        } else {
          return item;
        }
      });
    },
    enableEditItem: (state, action) => {
      state.colors = state.colors.map((item) => {
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
      state.colors = state.colors.map((item) => {
        item.isEdit = false;
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_ALL_COLOR.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GET_ALL_COLOR.fulfilled, (state, action) => {
        state.status = "";
        state.colors = action.payload.map((item) => ({
          ...item,
          isEdit: false,
        }));
      });
  },
});

export const { addNewColor, updateColor, enableEditItem, disabledEditItem } =
  colorSlice.actions;
export default colorSlice.reducer;
