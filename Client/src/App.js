import { useState, useEffect, Fragment } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { url } from "./config";
import { getToken, refreshUser, getUser } from "./store/User/userSlice";
import AuthModel from "./components/Auth/AuthModel";
import Landing from "./Landing";
import { refreshProductLists } from "./store/Products/productListSlice";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  useEffect(async () => {
    try {
      if (token !== "") {
        let responseStatus;
        const authHeader = {
          headers: { Authorization: `Bearer ${token}` },
        };
        setInProgress(true);
        await (async () => {
          const response = await axios.get(`${url}/user/me`, authHeader);
          responseStatus = response.status;
          if (response.data) {
            const { data } = response;
            setInProgress(false);
            setIsLoggedIn(true);
            dispatch(refreshUser(data));
          }
        })();
      } else {
        throw new Error("No token found!");
      }
    } catch (error) {
      setIsLoggedIn(false);
      setInProgress(false);
    }
  }, []);
  useEffect(async () => {
    try {
      const { data } = await axios.get(`${url}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        dispatch(refreshProductLists(data));
      }
    } catch (error) {
      console.log(error.message);
    }
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
