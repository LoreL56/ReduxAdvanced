import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartslice";
import uiSlice from "./uislice";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
