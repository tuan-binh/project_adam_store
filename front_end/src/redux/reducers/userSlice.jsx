import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "",
    favourite: [],
    cart: [],
    users: [],
    userLogin: {},
  },
  reducers: {
    setUserLogin: (state, action) => {
      state.userLogin = action.payload;
    },
    setFavourite: (state, action) => {
      state.favourite = action.payload;
    },
    addProductIdToFavourite: (state, action) => {
      state.favourite.push(action.payload);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.userLogin, favourite: state.favourite })
      );
    },
    removeProductIdInFavourite: (state, action) => {
      state.favourite.splice(state.favourite.indexOf(action.payload), 1);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.userLogin, favourite: state.favourite })
      );
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addCartItem: (state, action) => {
      state.cart.push(action.payload);
    },
    changeQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return (item = action.payload);
        } else {
          return item;
        }
      });
    },
    removeCartItem: (state, action) => {
      state.cart.splice(
        state.cart.map((item) => item.id).indexOf(action.payload.id),
        1
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
    resetData: (state) => {
      state.status = "";
      state.favourite = [];
      state.cart = [];
      state.users = [];
      state.userLogin = {};
    },
  },
});

export const {
  setUserLogin,
  setFavourite,
  addProductIdToFavourite,
  removeProductIdInFavourite,
  setCart,
  addCartItem,
  changeQuantity,
  removeCartItem,
  clearCart,
  resetData,
} = userSlice.actions;
export default userSlice.reducer;
