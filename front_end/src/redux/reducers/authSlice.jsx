import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    resetUser: () => {
      return null;
    },
  },
});

export const { setUser, resetUser } = authSlice.actions;
export default authSlice.reducer;
