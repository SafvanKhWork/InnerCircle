import SignIn from "./components/forms/SignIn";
import SignUp from "./components/forms/SignUp";
import VerifyEmail from "./components/forms/VerifyEmail";

import { useState, Fragment } from "react";

function App() {
  const [isUser, setIsUser] = useState(false);
  const [hasPasswd, setHasPasswd] = useState(true);
  return (
    <Fragment>
      {isUser ? (
        hasPasswd ? (
          <SignIn status={{ isUser, setIsUser, setHasPasswd }} />
        ) : (
          <VerifyEmail status={{ hasPasswd, setHasPasswd }} />
        )
      ) : (
        <SignUp status={{ isUser, setIsUser }} />
      )}
    </Fragment>
  );
}

export default App;
