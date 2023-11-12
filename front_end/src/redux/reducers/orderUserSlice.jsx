import { GET_ALL_ORDER_USER } from "../api/service/orderUserService";
import { createSlice } from "@reduxjs/toolkit";

const orderUserSlice = createSlice({
  name: "orderUser",
  initialState: {
    status: "",
    orders: [],
    totalPages: 1,
    size: 1,
    current: 1,
  },
  reducers: {
    updateOrderUser: (state, action) => {
      state.orders = state.orders.map((item) => {
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
      .addCase(GET_ALL_ORDER_USER.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GET_ALL_ORDER_USER.fulfilled, (state, action) => {
        state.status = "";
        state.orders = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.size = action.payload.size;
        state.current = action.payload.number + 1;
      });
  },
});

export const { changeCurrentPage, updateOrderUser } = orderUserSlice.actions;
export default orderUserSlice.reducer;
