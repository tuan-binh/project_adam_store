import { GET_ALL_USER } from "../api/service/userAdminService";
import { createSlice } from "@reduxjs/toolkit";

const userAdminSlice = createSlice({
  name: "userAdmin",
  initialState: { status: "", users: [], totalPages: 1, size: 1, current: 1 },
  reducers: {
    updateUser: (state, action) => {
      state.users = state.users.map((item) => {
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
      .addCase(GET_ALL_USER.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GET_ALL_USER.fulfilled, (state, action) => {
        state.status = "";
        state.users = action.payload.content;
        state.totalPages = action.payload.totalPages;
        state.size = action.payload.size;
        state.current = action.payload.number + 1;
      });
  },
});

export const { updateUser, changeCurrentPage } = userAdminSlice.actions;
export default userAdminSlice.reducer;
