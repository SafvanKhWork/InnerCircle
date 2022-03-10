import { Box } from "@mui/material";
import { Fragment, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeaderUnverified from "./components/HeaderUnverified";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Profile from "./pages/Profile";
import products from "./data";
import Product from "./components/Product/ProductPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const status = {
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <Fragment>
      <Router>
        {isLoggedIn ? <Header status={status} /> : <HeaderUnverified />}

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
    </Fragment>
  );
}

export default App;
