import { Box } from "@mui/material";
import { Fragment, useState } from "react";
import SignIn from "./components/Auth/pages/SignIn";
import SignUp from "./components/Auth/pages/SignUp";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Header from "./components/Header";
import HeaderUnverified from "./components/HeaderUnverified";
import Home from "./pages/Home";
import VerifyEmail from "./components/Auth/pages/VerifyEmail";
import UpdatePassword from "./components/Auth/pages/UpdatePassword";
import Profile from "./pages/Profile";
import products from "./data";

function App() {
  const [isValidOTP, setIsValidOTP] = useState(false);
  const [isUser, setIsUser] = useState(true);
  const [hasPasswd, setHasPasswd] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const status = {
    isUser,
    setIsUser,
    hasPasswd,
    setHasPasswd,
    isLoggedIn,
    setIsLoggedIn,
    isValidOTP,
    setIsValidOTP,
  };

  return (
    <Fragment>
      {isLoggedIn ? <Header status={status} /> : <HeaderUnverified />}

      <Box pt={isLoggedIn ? 12 : 2} m={1}>
        <Router>
          <Routes>
            <Route path="/">
              <Home products={products} />
            </Route>
            <Route path="/signin">
              <SignIn status={status} />
            </Route>
            <Route path="/signup">
              <SignUp status={status} />
            </Route>
            <Route path="/verify">
              <VerifyEmail status={status} />
            </Route>
            <Route path="/password/reset">
              <UpdatePassword status={status} />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>
          </Routes>
        </Router>
      </Box>
    </Fragment>
  );
}

export default App;
