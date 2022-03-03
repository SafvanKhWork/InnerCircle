import { Box } from "@mui/material";
import { Fragment, useState } from "react";
import Header from "./components/Header";
import HeaderUnverified from "./components/HeaderUnverified";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import Profile from "./pages/Profile";
import products from "./data";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const status = { isLoggedIn, setIsLoggedIn };
  return (
    // <Fragment>
    //   {isLoggedIn ? <Header status={status} /> : ""}
    //   {!isLoggedIn ? <HeaderUnverified /> : ""}
    //   <Box pt={12} m={1}>
    //     {!isLoggedIn ? <Auth status={status} /> : ""}
    //     {isLoggedIn ? <Home products={products} /> : ""}
    //   </Box>
    // </Fragment>
    <Fragment>
      <Header status={status} />
      <Profile />
    </Fragment>
  );
}

export default App;
