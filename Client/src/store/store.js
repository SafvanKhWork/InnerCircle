import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import productInViewReducer from "./Products/productInViewSlice";
import productListReducer from "./Products/productListSlice";
import userInViewReducer from "./User/userInViewSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userInView: userInViewReducer,
    products: productListReducer,
    productInView: productInViewReducer,
  },
});

export default store;
