import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  itemCount: 0,
  changed: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    replaceCart(state,action)
    {
      state.itemCount = action.payload.itemCount;
      state.cartItems = action.payload.cartItems;
    },
    increment(state, action) {
      let index = state.cartItems.findIndex((x) => x.id === action.payload.id);
      if (index < 0) {
        action.payload.total = action.payload.price;
        state.cartItems.push(action.payload);
      } else {
        let foundItem = state.cartItems.find((x) => x.id === action.payload.id);
        foundItem.quantity++;
        foundItem.total = foundItem.total + foundItem.price;
      }
      state.itemCount++;
      state.changed = true;
    },
    decrement(state, action) {
      let index = state.cartItems.findIndex((x) => x.id === action.payload);
      if (index < 0) {
        //ERRORE non deve succedere
        console.log("ERRORE - oggetto da rimuovere non trovato");
      } else {
        let foundItem = state.cartItems[index];
        if (foundItem.quantity === 1) {
          state.cartItems.splice(index);
        } else {
          foundItem.quantity--;
          foundItem.total = foundItem.total - foundItem.price;
        }
        state.itemCount--;
        state.changed = true;
      }
    }
  },
});



export default cartSlice;
export const cartActions = cartSlice.actions;
