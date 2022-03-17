import { useState } from "react";
import { Box } from "@mui/material";

//

import AuthModel from "./components/Auth/AuthModel";
import Landing from "./Landing";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
