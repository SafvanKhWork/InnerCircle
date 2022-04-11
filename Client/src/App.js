import { useState, useEffect, Fragment } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { url } from "./config";
import {
  getToken,
  refreshUser,
  getUser,
  refetchUser,
} from "./store/User/userSlice";
import AuthModel from "./components/Auth/AuthModel";
import Landing from "./Landing";
import {
  refreshCatagories,
  refreshFeed,
  refreshProductLists,
  refreshRecommandation,
  setCurrent,
  setSpecifiedList,
} from "./store/Products/productListSlice";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const inProgress = useSelector((state) => state.applicationState.loading);
  const [inProgress, setInProgress] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const discover = useSelector((state) => state.products.discover);
  let authHeader = {
    headers: { Authorization: `Bearer ${token}` },
  };
  useEffect(async () => {
    if (token && token !== "") {
      const refreshInterval = setInterval(async () => {
        const { data } = await axios.get(`${url}/user/me`, authHeader);
        if (data.circle.length === 0) {
          dispatch(setCurrent(discover));
        }
        if (data) {
          dispatch(refreshUser(data));
        }
        return () => {
          clearInterval(refreshInterval);
        };
      }, 10000);
    }
  }, []);
  useEffect(async () => {
    try {
      setInProgress(false);
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
  }, [token]);
  useEffect(async () => {
    try {
      if (token === "") {
        return;
      }
      const { data: discover } = await axios.get(`${url}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data: feed } = await axios.get(`${url}/feed`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data: catagories } = await axios.get(`${url}/catagories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const {
        data: [recommanded, recommandors],
      } = await axios.get(`${url}/recommanded`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        setSpecifiedList({
          recommandors,
          discover,
          feed,
          catagories,
          recommandation: recommanded,
        })
      );

      // if (discover) {
      //   dispatch(refreshProductLists(discover));
      // }
      // if (feed) {
      //   console.log(feed);
      //   dispatch(refreshFeed(feed));
      // }
      // if (catagories) {
      //   dispatch(refreshCatagories(catagories));
      // }
      // if (recommandation) {
      //   dispatch(refreshRecommandation(recommandation));
      // }
    } catch (error) {
      console.log({ ...error });
    }
  }, [token]);
  // useEffect(async () => {
  //   dispatch(refetchUser());
  // }, [token]);

  const status = {
    isLoggedIn,
    setIsLoggedIn,
    inProgress,
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
