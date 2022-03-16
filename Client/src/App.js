import { Box } from "@mui/material";
import { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//
import Header from "./components/UI/Header";
import Home from "./components/Home/Home";
import AuthModel from "./components/Auth/AuthModel";
import Profile from "./components/User/Profile";
import products from "./data";
import Product from "./components/Product/Views/ProductPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const status = {
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <Box>
      {!isLoggedIn ? <AuthModel status={status} /> : ""}
      {isLoggedIn ? (
        <Router>
          {isLoggedIn ? <Header status={status} /> : ""}
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
      ) : (
        ""
      )}
    </Box>
  );
}

export default App;
