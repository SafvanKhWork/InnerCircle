import { Fragment, useState, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { url } from "./config";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/User/Profile";
import Post from "./components/Product/NewPost";
import Product from "./components/Product/Views/ProductPage";

let products;
(async () => {
  const { data } = await axios.get(`${url}/products`);
  products = data;
})();

const Landing = (props) => {
  return (
    <Router>
      <Stack>
        <Header status={props.status} />
      </Stack>
      <Box pt={12} m={1}>
        <Routes>
          <Route path="/">
            <Route index element={<Home products={products} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/product/post" element={<Post />} />
            <Route path="*" element={<div></div>} />
          </Route>
        </Routes>
      </Box>
    </Router>
  );
};

export default Landing;
