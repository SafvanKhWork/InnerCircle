import { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, Stack } from "@mui/material";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Profile from "./components/User/Profile";
import { products } from "./data";
import Product from "./components/Product/Views/ProductPage";

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
            <Route path="*" element={<div></div>} />
          </Route>
        </Routes>
      </Box>
    </Router>
  );
};

export default Landing;
