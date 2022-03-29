import { useState, useEffect, Fragment } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { initUser, getToken, refreshUser } from "./store/User/userSlice";

//
import AuthModel from "./components/Auth/AuthModel";
import Landing from "./Landing";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inProgress, setInProgress] = useState(true);
  const [user, setUser] = useState(undefined);
  const dispatch = useDispatch();
  let promisedUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.user.token);

  dispatch(refreshUser);
  setUser(promisedUser);
  console.log(user);

  useEffect(async () => {
    if (token) {
      const validat = setTimeout(() => {
        console.log(token && user._id !== "");
        if (user._id !== "") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
        if (isLoggedIn || !token || true) {
          setInProgress(false);
        }
        return () => {
          clearTimeout(validat);
        };
      }, 1000);
    }
  }, []);
  if (!inProgress) {
    console.log(user);
  }
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
