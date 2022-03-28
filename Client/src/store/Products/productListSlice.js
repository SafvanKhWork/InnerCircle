import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "../../config";

let authHeader;

const initialState = {
  discover: [],
  feed: [],
  recommandation: [],
  catagory: [],
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    refreshProductLists: async (state, { payload }) => {
      //Always runs at init
      try {
        authHeader = {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              window.localStorage.getItem("inner-circle-token")
            )}`,
          },
        };
        const { data } = await axios.get(
          `${url}/${payload ? "products/" + payload : "products"}`,
          authHeader
        );
        state.discover = data ? data : state.discover;
      } catch (error) {
        console.log(error.message);
      }
    },
    refreshCatagory: async (state, { payload }) => {
      try {
        const { data } = await axios.get(
          `${url}/products/catagory/${payload}`,
          authHeader
        );
        state.catagory = data ? data : [];
      } catch (error) {
        console.log(error.message);
      }
    },
    refreshFeed: async (state, { payload }) => {
      try {
        const { data } = await axios.get(`${url}/feed`, authHeader);
        state.feed = data ? data : data.feed;
      } catch (error) {
        console.log(error.message);
      }
    },
    refreshRecommandation: async (state, { payload }) => {
      try {
        const { data } = axios.get(`${url}/recommanded`, authHeader);
        state.recommandation = data ? data : state.recommandation;
      } catch (error) {
        console.log(error.message);
      }
    },
    setSpecifiedList: (state, { payload }) => {
      Object.keys(payload).forEach((field) => {
        state[field] = payload[field];
      });
    },
  },
});

export const { refreshProductLists, changeCatagory, refreshSpecifiedList } =
  productListSlice.actions;
export default productListSlice.reducer;
