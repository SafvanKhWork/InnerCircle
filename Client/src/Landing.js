import { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import AuthModel from "./components/Auth/AuthModel";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/User/Profile";
import Post from "./components/Product/NewPost";
import Product from "./components/Product/Views/ProductPage";
import axios from "axios";
import { url } from "./config";
import { useDispatch, useSelector } from "react-redux";
import { getToken, refreshUser } from "./store/User/userSlice";
import { refreshProductLists } from "./store/Products/productListSlice";

const Landing = (props) => {
  const products = useSelector((state) => state.products.discover);
  const token = useSelector(getToken);
  const dispatch = useDispatch();

  return (
    <Router>
      <Stack>
        <Header products={products} status={props.status} />
      </Stack>
      <Box pt={12} m={1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile profile />} />
          <Route path="/profile/:uname" element={<Profile />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/post" element={<Post />} />
          <Route path="*" element={<div></div>} />
        </Routes>
      </Box>
    </Router>
  );
};

export default Landing;
