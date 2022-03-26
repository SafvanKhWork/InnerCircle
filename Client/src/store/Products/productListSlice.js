import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discover: [],
  feed: [],
  recommandations: [],
  catagory: [],
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    refreahProductLists: (state, { payload }) => {
      state.discover = payload.discover;
      state.feed = payload.feed;
      state.recommandations = payload.recommandations;
    },
    changeCatagory: (state, { payload }) => {
      state.catagory = payload;
    },
    refreshSpecifiedList: (state, { payload }) => {
      Object.keys(payload).forEach((field) => {
        state[field] = payload[field];
      });
    },
  },
});

export const { refreahProductLists, changeCatagory, refreshSpecifiedList } =
  productListSlice.actions;
export default productListSlice.reducer;
