import { useState } from "react";
import { Box } from "@mui/material";

//
import { user } from "./data";
import AuthModel from "./components/Auth/AuthModel";
import Landing from "./Landing";
import axios from "axios";
import { url } from "./config";

let sver;
(async () => {
  sver = (await axios.get(`${url}/user/me`)).status;
})();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(sver);
  const status = {
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <Box>
      {!isLoggedIn ? <AuthModel status={status} /> : ""}
      {isLoggedIn ? <Landing status={status} /> : ""}
    </Box>
  );
}

export default App;
