import { GET_ALL_COUPON } from "../api/service/couponService";
import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupon",
  initialState: { status: "", coupons: [] },
  reducers: {
    addNewCoupon: (state, action) => {
      state.coupons.push(action.payload);
    },
    updateCoupon: (state, action) => {
      state.coupons = state.coupons.map((item) => {
        if (item.id === action.payload.id) {
          return (item = action.payload);
        } else {
          return item;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GET_ALL_COUPON.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GET_ALL_COUPON.fulfilled, (state, action) => {
        state.status = "";
        state.coupons = action.payload.map((item) => ({
          ...item,
          isEdit: false,
        }));
      });
  },
});

export const { addNewCoupon, updateCoupon } = couponSlice.actions;
export default couponSlice.reducer;
