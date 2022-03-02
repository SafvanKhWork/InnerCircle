import { Box } from "@mui/material";
import { Fragment, useState } from "react";
import Header from "./components/Header";
import HeaderUnverified from "./components/HeaderUnverified";
import Feed from "./pages/Feed";
import Auth from "./pages/Authentication";

import products from "./data";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const status = { isLoggedIn, setIsLoggedIn };
  return (
    <Fragment>
      {isLoggedIn ? <Header status={status} /> : ""}
      {!isLoggedIn ? <HeaderUnverified /> : ""}
      <Box pt={12} m={1}>
        {!isLoggedIn ? <Auth status={status} /> : ""}
        {isLoggedIn ? <Feed products={products} /> : ""}
      </Box>
    </Fragment>
  );
}

export default App;
