import { useState, useEffect, Fragment } from "react";
import { Box, CircularProgress } from "@mui/material";

//
import { user } from "./data";
import AuthModel from "./components/Auth/AuthModel";
import Landing from "./Landing";
import axios from "axios";
import { url, token, setToken } from "./config";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  console.table(user);
  useEffect(async () => {
    const validat = setTimeout(() => {
      console.log(token !== false && user !== false);
      if (token !== false && user !== false) {
        window.localStorage.setItem("inner-circle-user", JSON.stringify(user));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInProgress(false);
      return () => {
        clearTimeout(validat);
      };
    }, 2000);
  }, []);
  const status = {
    isLoggedIn,
    setIsLoggedIn,
    inProgress,
    setInProgress,
  };

  return (
    <Fragment>
      {inProgress ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            py: 4,
          }}
        >
          <CircularProgress
            size={56}
            variant="indeterminate"
            sx={{ color: "#4db6ac" }}
          />
        </Box>
      ) : (
        <Box>
          {!isLoggedIn ? <AuthModel status={status} /> : ""}
          {isLoggedIn ? <Landing status={status} /> : ""}
        </Box>
      )}
    </Fragment>
  );
}

export default App;
