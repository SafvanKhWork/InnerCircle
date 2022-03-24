import { useState, useEffect, Fragment } from "react";
import { Box, CircularProgress } from "@mui/material";

//
import { setGlobelUser, setProductsList } from "./data";
import AuthModel from "./components/Auth/AuthModel";
import Landing from "./Landing";
import axios from "axios";
import { url, token } from "./config";

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

(async () => {
  const { data } = await axios.get(`${url}/products`);
  setProductsList(data);
})();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inProgress, setInProgress] = useState(true);

  useEffect(() => {
    let user, responseStatus;
    const getGlobelUser = async () => {
      const response = await axios.get(`${url}/user/me`, config);
      responseStatus = response.status;
      const { data } = response;
      user = data;
    };
    getGlobelUser();
    const validat = setTimeout(() => {
      if (responseStatus === 200) {
        setGlobelUser(user);
        window.localStorage.setItem("inner-circle-user", JSON.stringify(user));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInProgress(false);
      return () => {
        clearTimeout(validat);
      };
    }, 1000);
  }, []);

  const status = {
    isLoggedIn,
    setIsLoggedIn,
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
