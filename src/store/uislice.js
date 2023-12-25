import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  notification: null
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showNotification(state, action) {
      state.notification = { status: action.payload.status, title: action.payload.title, message : action.payload.message};
    },
    toogleShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
