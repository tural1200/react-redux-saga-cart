import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoading: false,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getItemsFetch: (state) => {
      state.isLoading = true;
    },
    getItemsSuccess: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    getItemsFailure: (state) => {
      state.isLoading = false;
    },
  },
});

export const { getItemsFetch, getItemsSuccess, getItemsFailure } =
  productSlice.actions;

export default productSlice.reducer;
