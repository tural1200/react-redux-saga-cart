import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: localStorage.getItem("cartTotalQuantity") ? JSON.parse(localStorage.getItem("cartTotalQuantity")) : 0,
  cartTotalAmount: 0,
  toast: false,
};

export const addToCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].productQuantity += 1;
        state.toast = true
      } else {
        const tempProduct = { ...action.payload, productQuantity: 1 };
        state.cartItems.push(tempProduct);
      };

      state.toast = true

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    toastHide: (state) => {
      state.toast = false;
    },

    removeFromCart: (state, action) => {
      const refreshedCart = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = refreshedCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].productQuantity > 1) {
        state.cartItems[itemIndex].productQuantity -= 1;
      } else if (state.cartItems[itemIndex].productQuantity === 1) {
        const refreshedCart = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = refreshedCart;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    getTotals: (state) => {
      const {total, quantity} = state.cartItems.reduce(
        (cartTotal, nextItem) => {
          const { price, productQuantity } = nextItem;
          const itemTotalPrice = price * productQuantity;

          cartTotal.total += itemTotalPrice;
          cartTotal.quantity += productQuantity;

          return cartTotal
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;

      localStorage.setItem("cartTotalQuantity", JSON.stringify(state.cartTotalQuantity))
    },
  },
});

export const {
  addToCart,
  toastHide,
  removeFromCart,
  decreaseCart,
  increaseCart,
  removeCart,
  getTotals
} = addToCartSlice.actions;

export default addToCartSlice.reducer;
