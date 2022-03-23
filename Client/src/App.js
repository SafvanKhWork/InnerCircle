import { useState, useEffect, Fragment } from "react";
import { Box, CircularProgress } from "@mui/material";

//
import { user } from "./data";
import AuthModel from "./components/Auth/AuthModel";
import Landing from "./Landing";
import axios from "axios";
import { url } from "./config";

let validToken;
const config = {
  headers: { Authorization: `Bearer ${user.token}` },
};
(async () => {
  validToken = (await axios.get(`${url}/user/me`, config)).status;
})();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [inProgress, setInProgress] = useState(true);

  useEffect(() => {
    const validat = setTimeout(() => {
      console.log(validToken);
      if (validToken === 200) {
        setIsLoggedIn(true);
        setInProgress(false);
      } else if (validToken !== 200) {
        setInProgress(false);
      }

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
