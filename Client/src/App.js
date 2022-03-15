import { Box } from "@mui/material";
import { Fragment, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//
import Header from "./components/UI/Header";
import Home from "./components/Home/Home";
import Authentication from "./components/Auth/Authentication";
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
      <Router>
        {isLoggedIn ? <Header status={status} /> : ""}

        <Box pt={isLoggedIn ? 12 : 2} m={1}>
          <Routes>
            {isLoggedIn ? (
              <Route path="/">
                <Route index element={<Home products={products} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="*" element={<div></div>} />
              </Route>
            ) : (
              <Route path="*" element={<Authentication status={status} />} />
            )}
          </Routes>
        </Box>
      </Router>
    </Box>
  );
}

export default App;
